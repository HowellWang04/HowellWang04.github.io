// Fetches the Steam numbers for the home page (level, game count, recently played games) and writes them to
// src/data/steam.json. Needs a Steam Web API key in STEAM_API_KEY; without one it leaves the file as it is.
// The profile has to be public for Steam to share the game details.
import { readFile, writeFile } from "node:fs/promises";

const key = process.env.STEAM_API_KEY;
const config = await readFile(new URL("../src/config.ts", import.meta.url), "utf8");
const steamId = config.match(/STEAM_ID\s*=\s*['"](\d+)['"]/)?.[1];

if (!key || !steamId) {
  console.log("fetch-steam: no Steam API key or Steam ID, keeping the current Steam data.");
  process.exit(0);
}

const get = async (path) => {
  const response = await fetch(`https://api.steampowered.com/${path}&key=${key}&steamid=${steamId}`);
  if (!response.ok) throw new Error(`Steam ${path.split("?")[0]} answered ${response.status}`);
  return (await response.json()).response;
};

// The store gives each game's header image. Newer games keep it under a hashed path, so the URL can't be guessed.
const headerImage = async (appid) => {
  const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appid}&filters=basic`);
  const details = response.ok ? (await response.json())[appid] : undefined;
  return details?.success ? details.data.header_image : null;
};

try {
  const [{ player_level }, { game_count }, { games = [] }] = await Promise.all([
    get("IPlayerService/GetSteamLevel/v1/?"),
    get("IPlayerService/GetOwnedGames/v1/?include_played_free_games=1"),
    get("IPlayerService/GetRecentlyPlayedGames/v1/?"),
  ]);

  // The three games played most in the last two weeks.
  const top = [...games].sort((a, b) => b.playtime_2weeks - a.playtime_2weeks).slice(0, 3);
  const recent = await Promise.all(top.map(async (game) => ({
    appid: game.appid,
    name: game.name,
    minutesTwoWeeks: game.playtime_2weeks,
    image: await headerImage(game.appid),
  })));
  const data = {
    level: player_level,
    gameCount: game_count,
    minutesTwoWeeks: games.reduce((sum, game) => sum + game.playtime_2weeks, 0),
    recent,
  };
  await writeFile(new URL("../src/data/steam.json", import.meta.url), JSON.stringify(data, null, 2) + "\n");
  console.log(`fetch-steam: level ${data.level}, ${data.gameCount} games, ${recent.length} played recently.`);
} catch (error) {
  // A Steam hiccup shouldn't stop the site from deploying; the card just shows the data it already has.
  console.warn(`fetch-steam: ${error.message}, keeping the current Steam data.`);
}
