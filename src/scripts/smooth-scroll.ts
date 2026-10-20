// Shared scrolling setup: Lenis smooths the page scroll, GSAP drives Lenis from its ticker, and ScrollTrigger
// stays in sync with Lenis. Import { gsap, ScrollTrigger } from here for scroll or timeline animations.
// People who ask for reduced motion keep the browser's native scrolling, so `lenis` is undefined for them.
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Lenis's own anchor handling is off: Astro's router also handles in-page links, and the two together land
// in the wrong place.
export const lenis = reducedMotion ? undefined : new Lenis({ autoRaf: false });

if (lenis) {
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

// After a page change, start the new page where Astro put it (the top). ScrollTrigger remembers the old page's
// scroll position and would restore it on refresh, and Lenis would keep its own copy of it, so clear both.
// Astro only scrolls to the top after astro:after-swap, which is why this waits for astro:page-load.
document.addEventListener("astro:page-load", () => {
  ScrollTrigger.clearScrollMemory("manual");
  ScrollTrigger.refresh();
  lenis?.resize();
  lenis?.reset();
});

export { gsap, ScrollTrigger };
