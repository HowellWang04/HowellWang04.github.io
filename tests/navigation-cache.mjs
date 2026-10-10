import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

// Exercise Astro's real loader and swap functions with a fresh cache entry from
// the previous deployment. This checks navigation behavior without a browser.

const router = fs.readFileSync('node_modules/astro/dist/transitions/router.js', 'utf8');
const fetchHTML = router.slice(router.indexOf('async function fetchHTML('), router.indexOf('function getFallback('));
const loader = router.slice(router.indexOf('  async function defaultLoader('), router.indexOf('  async function abortAndRecreateMostRecentTransition(')).replaceAll('import.meta.env.DEV', 'false');
const swaps = fs.readFileSync('node_modules/astro/dist/transitions/swap-functions.js', 'utf8').replace(/export \{[\s\S]*?\};/g, '');
const componentScript = (file) => [...fs.readFileSync(file, 'utf8').matchAll(/<script>([\s\S]*?)<\/script>/g)].map((match) => ts.transpile(match[1].replaceAll('import.meta.env.PUBLIC_BUILD_ID', '"new-release"'), { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext })).join('\n');
const currentCSS = '/_astro/current-coal.css';
const oldCSS = '/_astro/previous-teal.css';

class Root {
  data = new Map([['data-theme', 'portfolio-light']]);
  dataset = { get theme() { return this.root.data.get('data-theme'); }, set theme(value) { this.root.data.set('data-theme', value); } };
  style = {};
  lang = 'en';
  constructor() { this.dataset.root = this; }
  get attributes() { return [...this.data].map(([name, value]) => ({ name, value })); }
  removeAttribute(name) { this.data.delete(name); }
  setAttribute(name, value) { this.data.set(name, value); }
}

class Link {
  constructor(href) { this.href = href; }
  getAttribute(name) { return name === 'href' ? this.href : null; }
  matches(selector) { return selector === 'link[rel=stylesheet]'; }
  remove() { this.parent.children = this.parent.children.filter((el) => el !== this); }
}

class Page {
  documentElement = new Root();
  listeners = new Map();
  constructor(css) {
    this.head = {
      children: [],
      append(...children) { for (const child of children) { child.parent = this; this.children.push(child); } },
      querySelector(selector) { const href = selector.match(/href="([^"]+)"/)?.[1]; return this.children.find((el) => el.href === href) ?? null; },
    };
    this.head.append(new Link(css));
  }
  querySelector(selector) { return selector.includes('astro-view-transitions-enabled') ? {} : this.head.querySelector(selector); }
  querySelectorAll(selector) { return selector === 'head link[rel=stylesheet]' ? this.head.children : []; }
  addEventListener(name, fn) { if (!this.listeners.has(name)) this.listeners.set(name, []); this.listeners.get(name).push(fn); }
  dispatch(name, event) { for (const fn of this.listeners.get(name) ?? []) fn(event); }
}

const failures = [];
for (const theme of ['portfolio-light', 'dark']) {
  const document = new Page(currentCSS);
  document.documentElement.dataset.theme = theme;
  const requests = [];
  // A previously visited target page is still fresh under GitHub Pages max-age=600.
  const cachedPages = new Map(['/projects', '/cv', '/'].map((path) => [new URL(path + '?filter=all#work', 'https://example.test').href, oldCSS]));
  const context = vm.createContext({
    document, URL, console,
    window: { matchMedia: () => ({ matches: theme === 'dark' }) },
    localStorage: { getItem: () => theme },
    DOMParser: class { parseFromString(css) { return new Page(css); } },
    preloadStyleLinks: () => [],
    fetch: async (href) => {
      requests.push(href);
      return { headers: { get: () => 'text/html' }, text: async () => cachedPages.get(href) ?? currentCSS, redirected: false };
    },
    parser: undefined,
  });
  vm.runInContext(fetchHTML + loader + swaps + componentScript('src/components/ThemeToggle.astro') + componentScript('src/layouts/BaseLayout.astro'), context);
  for (const path of ['/projects', '/cv', '/']) {
    const original = new URL(path + '?filter=all#work', 'https://example.test');
    const event = { to: original, signal: { aborted: false }, preventDefault() { throw new Error('Unexpected navigation cancellation'); } };
    context.event = event;
    event.loader = vm.runInContext('defaultLoader.bind(null, event)', context);
    document.dispatch('astro:before-preparation', event);
    await event.loader();
    document.dispatch('astro:before-swap', event);
    vm.runInContext('swapRootAttributes(event.newDocument); swapHeadElements(event.newDocument);', context);
    document.dispatch('astro:page-load', {});
    try {
      assert.equal(document.documentElement.dataset.theme, theme, 'theme mode changed');
      assert.equal(document.head.children[0].href, currentCSS, 'palette switched to previous stylesheet');
      assert.equal(event.to.href, original.href, 'navigation changed the user URL');
      assert.equal(new URL(requests.at(-1)).searchParams.get('filter'), 'all');
      console.log(`PASS ${theme} ${path} keeps current palette and mode`);
    } catch (error) {
      failures.push(error);
      console.log(`FAIL ${theme} ${path} mode=${document.documentElement.dataset.theme} stylesheet=${document.head.children[0].href}`);
    }
  }
  assert.equal(requests.length, 3, 'navigation should fetch once per page');
}
if (failures.length) process.exitCode = 1;
