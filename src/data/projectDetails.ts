export type ProjectText = { en: string; zh: string };

export type ProjectDetails = {
  context?: ProjectText;
  role?: ProjectText;
  team?: ProjectText;
  duration?: ProjectText;
  stack?: { name: string; use: ProjectText }[];
  contributions?: ProjectText[];
  challenge?: ProjectText;
  approach?: ProjectText;
  outcome?: ProjectText;
  reflection?: ProjectText;
  links?: { label: ProjectText; url: string }[];
};

// Add only confirmed personal responsibilities, tools, and results.
// Describe contributions as an action, the work you owned, and its impact.
export const projectDetails: Record<string, ProjectDetails> = {
  "seafloor-revival": {
    context: {
      en: "A team project for GMTK Game Jam 2025, exploring civilization building through recurring environmental disasters.",
      zh: "GMTK Game Jam 2025 团队作品，围绕循环来袭的环境灾难，探索文明建设与重建。",
    },
    role: { en: "UI development & art integration", zh: "UI 开发与美术资源接入" },
    team: { en: "6 credited creators", zh: "6 位署名作者" },
    duration: {
      en: "July 30 to August 3, 2025 · Jam window",
      zh: "2025 年 7 月 30 日至 8 月 3 日 · 赛事制作期",
    },
    stack: [
      {
        name: "Unity",
        use: {
          en: "UI construction, component reference wiring, and art asset integration.",
          zh: "UI 构建、组件引用连接与美术资源接入。",
        },
      },
      {
        name: "C#",
        use: { en: "Programming for my UI implementation work.", zh: "用于 UI 实现相关的编程工作。" },
      },
    ],
    contributions: [
      {
        en: "Built all of the game's UI in Unity, taking ownership of interface construction within the team.",
        zh: "负责游戏全部 UI 的构建，承担团队中的界面实现工作。",
      },
      {
        en: "Wired UI component references as part of the C# implementation.",
        zh: "完成 UI 组件引用连接及相关 C# 实现。",
      },
      {
        en: "Processed and integrated art assets for use in the game interface.",
        zh: "处理并接入美术资源，将其应用到游戏界面中。",
      },
    ],
    outcome: {
      en: "A playable browser prototype is available on itch.io. The project page notes that some features are still in development.",
      zh: "已在 itch.io 发布可直接在浏览器中试玩的原型。项目页面注明部分功能仍在开发中。",
    },
    links: [
      {
        label: { en: "Play on itch.io", zh: "在 itch.io 试玩" },
        url: "https://nikolai16.itch.io/seafloor-revival",
      },
      {
        label: { en: "Jam submission", zh: "参赛页面" },
        url: "https://itch.io/jam/gmtk-2025/rate/3783873",
      },
    ],
  },
};
