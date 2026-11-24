// Doodled headings (.doodle-heading): a highlighter swipe behind the words, then line-drawn icons beside them, drawn
// in as the heading scrolls into view. Scrolling back up plays the drawing in reverse. Import this on any page that
// has such headings.
import { gsap } from "./smooth-scroll";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);

// Fit a heading's doodle to its text: the highlighter runs behind the words and the icons (each drawn in a 48 x 32
// box) sit in a row just right of them.
const layoutDoodle = (heading: HTMLElement) => {
  const svg = heading.querySelector<SVGSVGElement>(".doodle-stroke")!;
  const line = svg.querySelector<SVGPathElement>(".doodle-line")!;
  const icons = [...svg.querySelectorAll<SVGGElement>(".doodle-icon")];
  const range = document.createRange();
  range.selectNodeContents(heading.querySelector("[data-en]")!);
  const box = heading.getBoundingClientRect();
  const em = parseFloat(getComputedStyle(heading).fontSize);
  // A long heading can wrap on a narrow screen, so measure each line of the words on its own.
  const lines: { left: number; right: number; top: number; bottom: number }[] = [];
  for (const rect of range.getClientRects()) {
    if (!rect.width) continue;
    const row = lines.find((line) => Math.abs(line.top - rect.top) < em / 2);
    if (row) {
      row.left = Math.min(row.left, rect.left);
      row.right = Math.max(row.right, rect.right);
      row.bottom = Math.max(row.bottom, rect.bottom);
    } else {
      lines.push({ left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom });
    }
  }
  if (!lines.length) return;

  // One swipe of a highlighter behind the lower part of each line: it starts a little before the words, rises a
  // touch as a hand drifts, and runs a little past the end.
  line.setAttribute("d", lines.map((row) => {
    const left = row.left - box.left;
    const w = row.right - row.left;
    const x = (fraction: number) => left + w * fraction;
    const y = row.top - box.top + (row.bottom - row.top) * 0.6;
    return `M ${x(0) - 0.25 * em} ${y + 0.06 * em}` +
      ` C ${x(0.35)} ${y + 0.02 * em}, ${x(0.7)} ${y - 0.04 * em}, ${x(1) + 0.2 * em} ${y - 0.1 * em}`;
  }).join(" "));

  // The icons sit right of the last line, centred on it, each tilted a little and alternately one way and the other.
  const last = lines[lines.length - 1];
  const scale = (1.3 * em) / 48;
  const tilts = [-8, 6, -4];
  const iconY = (last.top + last.bottom) / 2 - box.top - 16 * scale;
  icons.forEach((icon, index) => {
    const iconX = last.right - box.left + (0.45 + index * 1.6) * em;
    icon.setAttribute("transform", `translate(${iconX} ${iconY}) scale(${scale}) rotate(${tilts[index % 3]} 24 16)`);
  });

  svg.setAttribute("width", String(box.width + em));
  svg.setAttribute("height", String(box.height + em));
  svg.setAttribute("viewBox", `0 0 ${box.width + em} ${box.height + em}`);
};

let teardownDoodles: (() => void) | undefined;
let setupRun = 0;

const setupDoodles = async () => {
  teardownDoodles?.();
  teardownDoodles = undefined;
  // This runs on load, on astro:page-load and on a language switch; only the latest run may finish setting up.
  const run = ++setupRun;
  const main = document.querySelector<HTMLElement>("main");
  const doodles = [...(main?.querySelectorAll<HTMLElement>(".doodle-heading") ?? [])];
  if (!main || !doodles.length) return;

  // The doodle is fitted to the heading's measured text, so wait for the web fonts (briefly) before measuring.
  await Promise.race([document.fonts.ready, new Promise((resolve) => setTimeout(resolve, 1500))]);
  if (!main.isConnected || run !== setupRun) return;

  // No animation, but the doodles still need fitting to their headings.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    doodles.forEach(layoutDoodle);
    return;
  }

  // As each heading arrives, the highlighter swipe goes on first, then after a short lift of the pen the icons
  // beside it, one after another: the outline, then the details. The pieces get time in proportion to their
  // length, so the pen moves at an even speed, and it lifts briefly between icons.
  const strokes: SVGGeometryElement[] = [];
  const draws = doodles.map((doodle) => {
    layoutDoodle(doodle);
    const highlight = doodle.querySelector<SVGPathElement>(".doodle-line")!;
    const icons = [...doodle.querySelectorAll<SVGGElement>(".doodle-icon")].map((icon) =>
      [...icon.querySelectorAll<SVGGeometryElement>("path, circle")]);
    const pieces = icons.flat();
    strokes.push(highlight, ...pieces);
    const lengths = pieces.map((stroke) => stroke.getTotalLength());
    const total = lengths.reduce((sum, length) => sum + length, 0) || 1;
    // Start undrawn: the from-values inside a scroll-linked timeline aren't applied until the first scroll.
    gsap.set([highlight, ...pieces], { drawSVG: "0%" });
    const draw = gsap.timeline({
      scrollTrigger: {
        trigger: doodle,
        start: "top 90%",
        end: "top 40%",
        scrub: 0.4,
        onRefresh: () => layoutDoodle(doodle),
      },
    });
    draw.fromTo(highlight, { drawSVG: "0%" }, { drawSVG: "100%", ease: "power1.inOut", duration: 0.7 });
    draw.to({}, { duration: 0.15 });
    let index = 0;
    icons.forEach((icon, iconIndex) => {
      if (iconIndex) draw.to({}, { duration: 0.08 });
      icon.forEach((stroke) => {
        draw.fromTo(stroke, { drawSVG: "0%" }, { drawSVG: "100%", ease: "none", duration: lengths[index++] / total });
      });
    });
    return draw;
  });

  teardownDoodles = () => {
    draws.forEach((draw) => {
      draw.scrollTrigger?.kill(true);
      draw.kill();
    });
    gsap.set(strokes, { clearProps: "all" });
  };
};

setupDoodles();
// Astro fires astro:page-load on the first visit too, but only at window load; only a page that hasn't been set up
// yet gets set up then.
let setUpMain = document.querySelector("main");
document.addEventListener("astro:page-load", () => {
  const main = document.querySelector("main");
  if (main === setUpMain) return;
  setUpMain = main;
  setupDoodles();
});
// A language switch rewrites the text, so fit and rebuild everything for the new language.
document.addEventListener("portfolio:language-change", setupDoodles);
document.addEventListener("astro:before-swap", () => {
  teardownDoodles?.();
  teardownDoodles = undefined;
});
