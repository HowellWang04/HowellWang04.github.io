// Renders public/resume/guanhao-wang-cv-{en,zh}.pdf from src/data/resume.json with headless Chrome,
// using the site's fonts. Run with `npm run resume:pdf`; set CHROME_PATH if Chrome lives elsewhere.
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const chrome = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const site = "https://howellwang04.github.io";
const resumes = JSON.parse(readFileSync("src/data/resume.json", "utf8"));

const escape = (text) => text.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const absolute = (url) => (url.startsWith("/") ? site + url : url);

// Same split as ResumeSection.astro: the date goes to the right, the role joins the detail line.
const splitEntry = (entry) => {
  const [name, role] = entry.title.split("  |  ");
  const [date, ...details] = entry.meta ? entry.meta.split("  ·  ") : [];
  return { name, date, details: [role, ...details].filter(Boolean).join(" · ") };
};

const renderEntry = (entry) => {
  if (entry.description) {
    return `<div class="skill"><span class="name">${escape(entry.title)}</span><span>${escape(entry.description)}</span></div>`;
  }
  const { name, date, details } = splitEntry(entry);
  const link = entry.links?.[0];
  const title = link ? `<a href="${escape(absolute(link.url))}">${escape(name)}<span class="arrow">↗</span></a>` : escape(name);
  return `<div class="entry">
    <div class="head"><span class="name">${title}</span>${date ? `<span class="date">${escape(date)}</span>` : ""}</div>
    ${details ? `<p class="meta">${escape(details)}</p>` : ""}
    ${entry.bullets ? `<ul>${entry.bullets.map((b) => `<li>${escape(b)}</li>`).join("")}</ul>` : ""}
  </div>`;
};

const renderPage = (resume, language) => `<!doctype html>
<html lang="${language === "zh" ? "zh-CN" : "en"}">
<head>
<meta charset="utf-8" />
<link href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400..700;1,8..60,400..700&display=block" rel="stylesheet" />
<link href="https://cdn.jsdelivr.net/npm/lxgw-wenkai-gb-web@1.522.0/lxgwwenkaigb-regular/result.css" rel="stylesheet" />
<link href="https://cdn.jsdelivr.net/npm/lxgw-wenkai-gb-web@1.522.0/lxgwwenkaigb-medium/result.css" rel="stylesheet" />
<style>
  @page { size: A4; margin: 11mm 14mm 10mm; }
  /* Black and white only: no accent colour, grey just for secondary details. */
  :root { --ink: #000; --muted: #444; --accent: #000; --rule: #000; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: "Source Serif 4", "LXGW WenKai GB", Georgia, serif; font-size: 9.2pt; line-height: 1.36; color: var(--ink); -webkit-print-color-adjust: exact; }
  a { color: inherit; text-decoration: none; }
  p, li { text-wrap: pretty; }
  h1, h2 { font-family: "Courier Prime", "LXGW WenKai GB Medium", "Courier New", monospace; font-weight: 700; font-synthesis-weight: none; }
  h1 { font-size: 22pt; line-height: 1.1; letter-spacing: -0.01em; }
  .contact { margin-top: 5pt; color: var(--muted); font-size: 9pt; }
  .contact a { color: var(--accent); text-decoration: underline; text-underline-offset: 1.5pt; text-decoration-thickness: 0.5pt; }
  .contact .sep { margin: 0 5pt; color: var(--rule); }
  .summary { margin-top: 5pt; }
  section { margin-top: 10pt; }
  h2 { padding-bottom: 3pt; border-bottom: 0.6pt solid var(--rule); color: var(--accent); font-size: 9.4pt; letter-spacing: 0.1em; text-transform: uppercase; }
  :lang(zh-CN) h2 { letter-spacing: 0.04em; }
  .entry { margin-top: 6pt; break-inside: avoid; }
  .head { display: flex; justify-content: space-between; align-items: baseline; gap: 12pt; }
  .name { font-family: "Source Serif 4", "LXGW WenKai GB Medium", Georgia, serif; font-weight: 600; font-size: 9.8pt; font-synthesis-weight: none; }
  .arrow { margin-left: 2.5pt; color: var(--accent); font-size: 8pt; font-weight: 400; }
  .date { flex-shrink: 0; color: var(--muted); font-size: 8.8pt; font-variant-numeric: tabular-nums; }
  .meta { margin-top: 0.5pt; color: var(--muted); font-size: 8.6pt; font-style: italic; }
  :lang(zh-CN) .meta { font-style: normal; }
  ul { margin-top: 2.5pt; padding-left: 11pt; }
  li { margin-top: 1pt; }
  li::marker { color: var(--accent); }
  .skills { margin-top: 4pt; }
  .skill { display: grid; grid-template-columns: 40mm 1fr; gap: 8pt; margin-top: 2pt; }
  .skill .name { font-size: 9.2pt; white-space: nowrap; }
</style>
</head>
<body>
  <header>
    <h1>${escape(resume.name)}</h1>
    <p class="contact">${resume.contact.split("  |  ").map(escape).join('<span class="sep">|</span>')}${resume.links
      .map((link) => `<span class="sep">|</span><a href="${escape(link.url)}">${escape(link.label)}</a>`)
      .join("")}</p>
    <p class="summary">${escape(resume.summary)}</p>
  </header>
  ${resume.sections
    .map((section) => {
      const isSkills = section.entries.every((entry) => entry.description);
      return `<section><h2>${escape(section.title)}</h2>${isSkills ? '<div class="skills">' : ""}${section.entries.map(renderEntry).join("")}${isSkills ? "</div>" : ""}</section>`;
    })
    .join("")}
</body>
</html>`;

const workDir = mkdtempSync(join(tmpdir(), "resume-pdf-"));
try {
  for (const language of ["en", "zh"]) {
    const html = join(workDir, `${language}.html`);
    const pdf = resolve(`public/resume/guanhao-wang-cv-${language}.pdf`);
    writeFileSync(html, renderPage(resumes[language], language));
    execFileSync(chrome, [
      "--headless",
      "--disable-gpu",
      `--user-data-dir=${join(workDir, "profile")}`,
      "--no-pdf-header-footer",
      "--virtual-time-budget=20000",
      `--print-to-pdf=${pdf}`,
      pathToFileURL(html).href,
    ], { stdio: "inherit" });
    console.log(`Wrote ${pdf}`);
  }
} finally {
  rmSync(workDir, { recursive: true, force: true });
}
