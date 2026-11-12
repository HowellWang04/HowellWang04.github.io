// While PageCurtain covers the window for a page change, its element carries data-covering, and it fires
// portfolio:curtain-up once it has lifted far enough to show the page. Entrance animations wait for that,
// or they would play out of sight behind the curtain.
export const afterCurtain = () =>
  new Promise<void>((resolve) => {
    if (!document.querySelector("[data-page-curtain]")?.hasAttribute("data-covering")) return resolve();
    document.addEventListener("portfolio:curtain-up", () => resolve(), { once: true });
  });
