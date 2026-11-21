// Fetches what I've been playing on my Switch from Nintendo's Parental Controls service (through nxapi, an unofficial
// client) and writes it to src/data/nintendo.json for the home page. Needs the Parental Controls session token in
// NINTENDO_PCTL_TOKEN; without one it leaves the file as it is. The console has to be linked to the Parental
// Controls app, and only play since linking is recorded.
import { writeFile } from "node:fs/promises";
import { addUserAgent } from "nxapi";
import MoonApi from "nxapi/moon";

const token = process.env.NINTENDO_PCTL_TOKEN;
if (!token) {
  console.log("fetch-nintendo: no Parental Controls token, keeping the current Nintendo data.");
  process.exit(0);
}

addUserAgent("guanhao-me-site/1.0");

// Nintendo turns away app versions it considers too old, and nxapi's built-in one falls behind. Apple's public
// store listing always has the current version, so ask it first.
const appVersion = async () => {
  try {
    const response = await fetch("https://itunes.apple.com/lookup?bundleId=com.nintendo.znma");
    return (await response.json()).results?.[0]?.version ?? "2.7.0";
  } catch {
    return "2.7.0";
  }
};

try {
  const version = await appVersion();
  const auth = await MoonApi.loginWithSessionToken(token);
  // Nintendo only seems to check the version shown to users; the internal build just needs to be recent enough.
  const build = "999";
  const moon = MoonApi.createWithSavedToken({
    ...auth,
    znma_version: version,
    znma_build: build,
    znma_useragent: `moon_ANDROID/${version} (com.nintendo.znma; build:${build}; ANDROID 26)`,
  });

  const { items: devices } = await moon.getDevices();
  const titles = new Map();
  let seconds = 0;
  let days = 0;
  for (const { deviceId } of devices) {
    // Daily summaries cover about the last month.
    const { items } = await moon.getDailySummaries(deviceId);
    for (const day of items) {
      if (day.playingTime > 0) days++;
      seconds += day.playingTime;
      const names = new Map(day.playedApps.map((app) => [app.applicationId, app]));
      const players = [...day.devicePlayers, ...(day.anonymousPlayer ? [day.anonymousPlayer] : [])];
      for (const { playedApps } of players) {
        for (const { applicationId, playingTime } of playedApps) {
          const app = names.get(applicationId);
          const entry = titles.get(applicationId) ?? {
            id: applicationId,
            name: app?.title ?? applicationId,
            image: app?.imageUri.large ?? null,
            seconds: 0,
          };
          entry.seconds += playingTime;
          titles.set(applicationId, entry);
        }
      }
    }
  }

  // The three games played most lately.
  const recent = [...titles.values()]
    .sort((a, b) => b.seconds - a.seconds)
    .slice(0, 3)
    .map(({ id, name, image, seconds }) => ({ id, name, image, minutes: Math.round(seconds / 60) }));
  const data = { minutesRecent: Math.round(seconds / 60), daysPlayed: days, recent };
  await writeFile(new URL("../src/data/nintendo.json", import.meta.url), JSON.stringify(data, null, 2) + "\n");
  console.log(`fetch-nintendo: app ${version}, ${devices.length} consoles, ${days} days played, ${recent.length} games lately.`);
} catch (error) {
  // An unofficial client breaks now and then; that shouldn't stop the site from deploying.
  console.warn(`fetch-nintendo: ${error.message}, keeping the current Nintendo data.`);
}
