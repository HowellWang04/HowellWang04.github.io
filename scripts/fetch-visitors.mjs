// Fetches how many people came from each country from GoatCounter and writes them to src/data/visitors.json for
// the visitors page. Needs a GoatCounter API key in GOATCOUNTER_TOKEN; without one it leaves the file as it is.
import { readFile, writeFile } from "node:fs/promises";

const token = process.env.GOATCOUNTER_TOKEN;
const config = await readFile(new URL("../src/config.ts", import.meta.url), "utf8");
const code = config.match(/GOATCOUNTER_CODE\s*=\s*['"]([^'"]*)['"]/)?.[1];

if (!token || !code) {
  console.log("fetch-visitors: no GoatCounter code or token, keeping the current visitor data.");
  process.exit(0);
}

const api = `https://${code}.goatcounter.com/api/v0`;
// Count from well before the site started counting, so the numbers cover all time. Locations are kept per day, so
// the range runs to the end of tomorrow; ending at the current hour leaves today out of them.
const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
const range = `start=2020-01-01T00:00:00Z&end=${tomorrow}T23:59:59Z`;

const get = async (path) => {
  const response = await fetch(`${api}${path}`, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error(`GoatCounter ${path} answered ${response.status}: ${(await response.text()).slice(0, 200)}`);
  }
  return response.json();
};

// The site sends a "visit" event once per browser (see BaseHead.astro), so counting that one path counts people
// rather than pages looked at. Its id is needed to pick it out; it isn't there until the first visit.
const findVisitPath = async () => {
  for (let after = 0; ;) {
    const { paths, more } = await get(`/paths?limit=200${after ? `&after=${after}` : ""}`);
    const visit = paths.find((path) => path.path === "visit");
    if (visit) return visit.id;
    // Stop if the list doesn't move on, so a paging hiccup can't loop forever.
    if (!more || !paths.length || paths.at(-1).id <= after) return undefined;
    after = paths.at(-1).id;
  }
};

try {
  const visitPath = await findVisitPath();
  if (visitPath === undefined) {
    await writeFile(new URL("../src/data/visitors.json", import.meta.url), JSON.stringify({ total: 0, countries: [] }, null, 2) + "\n");
    console.log("fetch-visitors: no visits counted yet.");
    process.exit(0);
  }
  const only = `${range}&include_paths=${visitPath}`;
  const { total } = await get(`/stats/total?${only}`);

  // Locations come 100 at a time. An id can carry a region after the country ("US-WI"); the map works by country.
  const counts = new Map();
  for (let offset = 0; ; offset += 100) {
    const page = await get(`/stats/locations?${only}&limit=100&offset=${offset}`);
    for (const { id, count } of page.stats) {
      const country = String(id ?? "").split("-")[0].toUpperCase();
      if (/^[A-Z]{2}$/.test(country)) counts.set(country, (counts.get(country) ?? 0) + count);
    }
    if (!page.more) break;
  }

  const countries = [...counts].map(([code, count]) => ({ code, count })).sort((a, b) => b.count - a.count);
  const data = { total, countries };
  await writeFile(new URL("../src/data/visitors.json", import.meta.url), JSON.stringify(data, null, 2) + "\n");
  console.log(`fetch-visitors: ${total} visitors from ${countries.length} countries.`);
} catch (error) {
  // A GoatCounter hiccup shouldn't stop the site from deploying; the page just shows the data it already has.
  console.warn(`fetch-visitors: ${error.message}, keeping the current visitor data.`);
}
