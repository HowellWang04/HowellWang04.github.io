export type ProjectText = { en: string; zh: string };

export type ProjectDetails = {
  role?: ProjectText;
  team?: ProjectText;
  duration?: ProjectText;
  stack?: { name: string; use: ProjectText }[];
  contributionGroups?: { title: ProjectText; tools: string; summary: ProjectText; details: ProjectText[] }[];
  contributions?: ProjectText[];
  links?: { label: ProjectText; url: string }[];
};

// Add only confirmed personal responsibilities, tools, and results.
// Describe contributions as an action, the work you owned, and its impact.
export const projectDetails: Record<string, ProjectDetails> = {
  "project-fireflies": {
    role: { en: "Interaction design, hardware integration, firmware & Unity control", zh: "交互设计、硬件整合、固件与 Unity 控制端开发" },
    team: { en: "Solo project", zh: "个人独立完成" },
    duration: { en: "In development", zh: "开发中" },
    contributionGroups: [
      {
        title: { en: "Kuramoto synchronization", zh: "Kuramoto 藏本同步模型" },
        tools: "C++ · Phase oscillators · Kuramoto model",
        summary: {
          en: "Adapted Yoshiki Kuramoto's phase oscillator model to let individual fireflies gradually synchronize their flashes, with disturbance weakening their shared rhythm.",
          zh: "基于日本物理学家 Yoshiki Kuramoto 的藏本相位振子模型，实现萤火虫从独立闪烁到逐渐同步的变化，并让外界扰动削弱群体节奏。",
        },
        details: [
          {
            en: "Each firefly maintains its own phase. The swarm sums the sine of phase differences between individuals, scales the result by coupling strength and elapsed time, and normalizes it by swarm size to adjust each phase.",
            zh: "每只萤火虫维护独立相位。灯群累加个体间相位差的正弦值，按群体数量归一化，再结合耦合强度与时间步长更新相位。",
          },
          {
            en: "Unity commands smoothly raise or lower coupling for either interactive swarm. Disturbance reduces coupling and adds individual phase drift. The background swarm keeps zero coupling and ignores synchronization commands.",
            zh: "Unity 指令平滑调整两组互动灯群的耦合强度。扰动会降低耦合并增加个体相位漂移；背景灯群始终保持零耦合，不接受同步指令。",
          },
        ],
      },
      {
        title: { en: "Sensing & ecological response", zh: "传感与生态响应" },
        tools: "ESP32 · LD2410B · Analog light sensors",
        summary: {
          en: "Built two independent interaction zones that turn nearby movement and bright light into faster movement, fewer visible fireflies, and dimmer flashes, followed by gradual recovery.",
          zh: "构建两组独立互动区，将附近人体移动与强光转化为飞行加速、可见萤火虫减少和闪光变暗，并在干扰减弱后逐步恢复。",
        },
        details: [
          {
            en: "Each zone uses its own LD2410B radar and analog light sensor. Radar distance and movement energy filter the motion input; stationary targets do not add disturbance. Light readings are mapped between configurable thresholds.",
            zh: "每个区域使用独立的 LD2410B 雷达与模拟光照传感器。通过距离和运动能量筛选人体移动输入，静止目标不增加扰动；光照读数按可配置阈值映射。",
          },
          {
            en: "Motion and light combine into a smoothed disturbance value for each zone. That value changes motion, brightness, visible population, and phase behavior without affecting the other interaction zone or the natural background.",
            zh: "人体移动和光照合成为各区域独立的平滑扰动值，同时调节移动、亮度、可见数量与相位行为，不影响另一互动区或自然背景。",
          },
        ],
      },
      {
        title: { en: "LED swarm animation", zh: "LED 灯群动画" },
        tools: "Arduino · FastLED · WS2812B",
        summary: {
          en: "Configured 420 addressable LEDs across three strips, animating two interactive groups of eight fireflies and a natural background of 35 independent fireflies.",
          zh: "使用三条灯带共 420 颗可寻址 LED，呈现两组各 8 只的互动萤火虫，以及 35 只独立闪烁的自然背景萤火虫。",
        },
        details: [
          {
            en: "Each firefly has a position, direction, random turning time, and blink phase. Movement reflects at strip boundaries, while brightness envelopes soften the light pulses. The background uses a slower cycle and a cosine envelope.",
            zh: "每只萤火虫拥有位置、方向、随机转向时间与闪烁相位，在灯带边界折返，并通过亮度包络柔化明暗变化。背景灯群采用更慢的周期与余弦亮度包络。",
          },
          {
            en: "Separated individual motion and brightness logic, swarm coupling, and hardware input and LED output into distinct firmware files, allowing behavior to be tuned independently of wiring and communication.",
            zh: "将个体运动与亮度、群体耦合、硬件输入与 LED 输出分别组织在不同固件文件中，使行为参数可独立于接线和通信进行调整。",
          },
        ],
      },
      {
        title: { en: "Unity control & soundscape", zh: "Unity 控制与声音环境" },
        tools: "Unity · C# · UDP · TextMesh Pro · AudioSource",
        summary: {
          en: "Connected the installation to a Unity control panel for synchronization, sensor overrides, live telemetry, and gradual mixing of nature and city sounds.",
          zh: "通过 Unity 控制面板连接装置，实现同步控制、传感器覆盖、实时遥测，以及自然声与城市声的渐变混合。",
        },
        details: [
          {
            en: "UDP carries sensor telemetry and commands between ESP32 and Unity. Commands include unique IDs and acknowledgements; disturbance override buttons wait for confirmation before updating their state. Device discovery and connection feedback support setup and monitoring.",
            zh: "通过 UDP 在 ESP32 与 Unity 之间传输传感器遥测和控制指令。指令携带唯一 ID 并返回确认，扰动覆盖按钮收到确认后才更新状态；设备发现与连接反馈支持布置和监控。",
          },
          {
            en: "Unity maps disturbance to city sound intensity and blends the soundscape over time. Separate automatic and manual controls manage nature audio, city audio, light input, and disturbance for demonstrations and calibration.",
            zh: "Unity 将扰动映射为城市声强度，并随时间平滑混合声音。自然声、城市声、光照输入与扰动分别提供自动及手动控制，便于演示和调试。",
          },
        ],
      },
    ],
    links: [
      { label: { en: "GitHub repository", zh: "GitHub 仓库" }, url: "https://github.com/HowellWang04/Grad-App-Project-Fireflies" },
      { label: { en: "Firmware documentation", zh: "固件文档" }, url: "https://github.com/HowellWang04/Grad-App-Project-Fireflies/blob/main/firmware/fireflies_main/README.md" },
      { label: { en: "Kuramoto model reference", zh: "藏本模型参考文献" }, url: "https://arxiv.org/html/2602.20505v1#S3" },
    ],
  },
  "project-sand": {
    role: { en: "Gameplay systems & environmental effects", zh: "玩法系统与环境效果开发" },
    team: { en: "Personal project", zh: "个人项目" },
    duration: { en: "In development", zh: "开发中" },
    contributionGroups: [
      {
        title: { en: "Economy & ecological tradeoffs", zh: "经济与生态取舍" },
        tools: "Unity · C#",
        summary: {
          en: "Connected planting costs, factory income, mining payouts, and pollution so that funding restoration also creates environmental pressure.",
          zh: "连接植树成本、工厂收入、采矿收益与污染，让筹集治沙资金的过程同时带来生态压力。",
        },
        details: [
          {
            en: "Factories generate continuous income with diminishing returns and an overall cap, while mining pays out in timed stages. Affordability checks connect the available budget to planting, construction, and extraction.",
            zh: "工厂持续产出收入，并设有边际收益递减与总收入上限。采矿收益按时间分阶段发放，资金检查将预算与植树、建厂、开采操作连接起来。",
          },
          {
            en: "Factory pollution periodically removes trees and updates the environmental state. Players can demolish factories to stop their ongoing ecological cost.",
            zh: "工厂污染定期移除树木并更新环境状态，玩家可以拆除工厂，停止其持续造成的生态损耗。",
          },
        ],
      },
      {
        title: { en: "Terrain placement & land use", zh: "地形放置与土地利用" },
        tools: "Unity Terrain · C# · Coroutines",
        summary: {
          en: "Built shared occupancy rules for trees and factories, making planting, construction, and mining change the same landscape.",
          zh: "为树木与工厂建立共用的空间占用规则，让植树、建设与采矿共同改变场景中的土地。",
        },
        details: [
          {
            en: "Trees occupy shuffled free grid cells, sample terrain height, and grow through scale animation with randomized prefabs, rotation, and final size.",
            zh: "树木放置在打乱顺序的空闲网格中，采样地形高度，并通过缩放动画生长，预制体、朝向和最终尺寸随机变化。",
          },
          {
            en: "Factories cluster around existing plants and reserve their footprints to prevent factory overlap. Placement first avoids trees, then allows clearing when space is limited. Mining removes trees within a sampled circular area.",
            zh: "工厂围绕已有厂区聚集，通过占地网格避免彼此重叠。放置时优先避开树木，空间不足时允许清除占地内的树木。采矿则移除随机圆形区域内的植被。",
          },
        ],
      },
      {
        title: { en: "Environmental feedback", zh: "环境反馈" },
        tools: "C# · uGUI",
        summary: {
          en: "Mapped player decisions to an environmental index that controls wind, sand density, heat haze, and the transition toward a clear sky.",
          zh: "将玩家决策映射为环境指数，控制风力、沙尘浓度、热浪与晴空过渡。",
        },
        details: [
          {
            en: "Normalized tree, factory, and mining counts feed a weighted environmental score. A shared effects API blends between parameter snapshots, while planting thresholds progressively reduce sand and heat and change sky clarity and cloud coverage.",
            zh: "将树木、工厂与采矿数量归一化后计算加权环境指数，通过统一特效接口在参数快照间平滑过渡。植树阈值逐步降低沙尘和热浪，并改变天空清晰度与云量。",
          },
          {
            en: "The decision UI connects planting, construction, demolition, and mining actions to the economy and placement systems. Environment and money events refresh the displayed state.",
            zh: "决策界面将植树、建厂、拆厂与采矿操作连接到经济和放置系统，通过环境与资金事件刷新显示状态。",
          },
        ],
      },
      {
        title: { en: "Sand & heat rendering", zh: "风沙与热浪渲染" },
        tools: "URP 17.4 · HLSL · Render Graph",
        summary: {
          en: "Implemented coordinated ground sand, airborne sand, and heat distortion to make environmental change visible throughout the scene.",
          zh: "实现同步变化的地表流沙、空中扬沙与热浪扭曲，让环境状态通过场景画面直接呈现。",
        },
        details: [
          {
            en: "A shared global wind vector drives shader scrolling. Airborne sand uses layered transparent surfaces with noise, scene depth fading, and distance fading to soften intersections and layer boundaries.",
            zh: "通过统一全局风向向量驱动着色器滚动。空中扬沙使用多层透明面片，结合噪声、场景深度淡出和距离淡出，柔化与场景的交界及图层边缘。",
          },
          {
            en: "A custom URP renderer feature supports Render Graph and distorts the scene color for heat haze. Depth and world height masks control where the distortion appears.",
            zh: "自定义 URP Renderer Feature 支持 Render Graph，通过扭曲场景颜色实现热浪，并以深度与世界高度遮罩控制效果范围。",
          },
        ],
      },
    ],
    links: [
      { label: { en: "GitHub repository", zh: "GitHub 仓库" }, url: "https://github.com/hwx676767/0714-WGH-sand" },
    ],
  },
  "coal-echoes": {
    role: { en: "Game design, interaction systems & environment integration", zh: "游戏设计、交互系统与场景整合" },
    team: { en: "Personal portfolio project with AI assistance and third party assets", zh: "个人作品集项目，结合 AI 辅助开发与第三方美术资源" },
    duration: { en: "2026 · In development", zh: "2026 年 · 开发中" },
    contributionGroups: [
      {
        "title": {
          "en": "Rendering & visual effects",
          "zh": "渲染与视觉效果"
        },
        "tools": "HDRP · Shader Graph · VFX Graph · HLSL",
        "summary": {
          "en": "Created sandstorm and heat haze effects, and rendered the camera's live view of the scene in a newspaper ink style for the game's opening transition.",
          "zh": "实现沙尘与热浪效果，并将相机在场景中的实际画面渲染为报纸纸墨效果，作为游戏开场的转场画面。"
        },
        "details": [
          {
            "en": "Uses HDRP 17.4.0 with Shader Graph and VFX Graph, Local Volumetric Fog for sandstorms, and Custom Pass for heat haze.",
            "zh": "使用 HDRP 17.4.0、Shader Graph 与 VFX Graph，通过 Local Volumetric Fog 表现沙尘，通过 Custom Pass 实现热浪。"
          },
          {
            "en": "The newspaper effect copies the menu camera's color buffer after post processing, processes it on the GPU, and displays it in a RawImage. It combines grayscale, subtle halftone dots, paper grain, and uneven ink coverage. The halftone algorithm adapts Daniel Ilett's MIT licensed work.",
            "zh": "报纸效果在后处理结束后复制菜单相机色缓冲，经 GPU 处理后交给 RawImage 显示。效果结合灰阶、细网点、纸纹与缺墨处理，其中半调算法改写自 Daniel Ilett 的 MIT 许可作品。"
          }
        ]
      },
      {
        "title": {
          "en": "Opening sequence",
          "zh": "开场演出"
        },
        "tools": "DOTween · RenderTexture · TerrainData · HDRI Sky",
        "summary": {
          "en": "Synchronized the photograph transition, sky motion, sand accumulation, and material aging. Restored original resources when the sequence ends or is interrupted.",
          "zh": "同步照片转场、天空运动、积沙与材质老化。演出结束或中断时恢复原资源。"
        },
        "details": [
          {
            "en": "uGUI and TextMesh Pro build the newspaper and player interfaces. DOTween enlarges the newspaper photograph over 1.8 seconds, then fades its ink effect over 1.4 seconds. UIEffect 5.11.7 supplies dissolve and page turning light effects.",
            "zh": "使用 uGUI 与 TextMesh Pro 构建报纸和玩家界面。DOTween 先用 1.8 秒放大照片，再用 1.4 秒消退纸墨效果。UIEffect 5.11.7 用于溶解与翻页光影。"
          },
          {
            "en": "Seven material pairs across eight dormitory renderers drive the aging transition. Three RenderTextures blend clean and weathered base colors in linear space, while normal strength, window properties, and rain stains change in sync. Temporary resources are released and original materials restored on completion or interruption.",
            "zh": "通过七组材质与八个宿舍楼 Renderer 实现老化渐变。三个 RenderTexture 在线性颜色空间混合干净与斑驳底色，同步插值法线强度、窗框属性及雨水痕。结束或中断时释放临时资源并恢复原材质。"
          },
          {
            "en": "The opening timeline synchronizes temporary terrain height animation with an independent HDRI sky rotation and material aging. Terrain collision retains the final height data; the original terrain references and sky settings are restored when the transition ends or is interrupted.",
            "zh": "开场时间轴同步驱动临时地形高度动画、独立 HDRI 天空旋转与材质老化。地形碰撞保留最终高度数据，转场结束或中断时恢复原地形引用与天空设置。"
          }
        ]
      },
      {
        "title": {
          "en": "Terrain & environment",
          "zh": "地形与场景"
        },
        "tools": "MapMagic · DEM · C++ · OpenGL · Python",
        "summary": {
          "en": "Integrated measured terrain and offline transition results into MapMagic, using a shared height source for terrain geometry and slope materials.",
          "zh": "将实测地形与离线过渡结果接入 MapMagic，让地形几何和坡度材质共用同一高度源。"
        },
        "details": [
          {
            "en": "MapMagic manages fixed terrain tiles and LOD using stitched USGS Sheep Range DEM data. A shared C# height source feeds terrain geometry and slope materials. Terrain Tools 5.3.2 supports local editing.",
            "zh": "MapMagic 基于拼接后的 USGS Sheep Range DEM 管理固定地块与 LOD。C# 高度源同时供给地形几何与坡度材质，Terrain Tools 5.3.2 用于局部地形编辑。"
          },
          {
            "en": "Gradient Terrain Authoring reconstructs terrain transitions. C++ and OpenGL perform the offline solve; Python processes data, refines the solution, and validates results. Unity reads the measured heights and the precomputed 800 metre transition.",
            "zh": "使用 Gradient Terrain Authoring 重建地形过渡。C++ 与 OpenGL 执行离线求解，Python 处理数据、精化求解并验证结果，Unity 读取实测高度与预计算的 800 米过渡结果。"
          },
          {
            "en": "Integrated industrial environment assets and a moving cableway with the terrain to support the exploration route.",
            "zh": "将工业场景资源、运行索道与地形整合，支撑探索路线。"
          }
        ]
      },
      {
        "title": {
          "en": "Interaction & saves",
          "zh": "交互与存档"
        },
        "tools": "Unity · C# · Input System · JsonUtility",
        "summary": {
          "en": "Built photography, album, scrapbook, and diary systems so players can collect photographs, arrange records, and save their exploration progress.",
          "zh": "实现拍照、相册、手账与日记系统，让玩家收集照片、整理记录，并保存探索进度。"
        },
        "details": [
          {
            "en": "Designed the narrative framework and the four-level exploration route around working class memories shaped by the 1970s, using photography, diary entries, and scrapbooking as the core interactions.",
            "zh": "围绕 1970 年代特定时代下的工人阶级记忆设计叙事框架和四个关卡的探索路线，以摄影、日记与手账组织核心交互。"
          },
          {
            "en": "Connected photography to Echo discoveries, using target framing and visibility checks to link photographed objects with narrative discoveries. Unity 6000.4.6f1 and C# implement the interactions, with Input System 1.19 handling player input.",
            "zh": "将拍照与回响发现连接，通过目标构图与可见性判断，将被拍摄物品与叙事发现关联。使用 Unity 6000.4.6f1 与 C# 实现交互，通过 Input System 1.19 处理玩家输入。"
          },
          {
            "en": "Used JsonUtility to read and write save and diary data. Photos, scrapbook layouts, Echo discoveries, and the grandfather's diary use separate local storage directories.",
            "zh": "使用 JsonUtility 读写存档与日记数据，照片、手账布局、回响发现和爷爷日记分别使用独立本地存储目录。"
          }
        ]
      },
      {
        "title": {
          "en": "Development tools",
          "zh": "开发工具"
        },
        "tools": "Blender · Python · MCP · Git LFS",
        "summary": {
          "en": "Modeled and generated assets with Blender and Python, used AI assistance for scene work, and managed large assets with Git LFS.",
          "zh": "使用 Blender 与 Python 建模和生成资源，通过 AI 辅助场景操作，以 Git LFS 管理大型资源。"
        },
        "details": [
          {
            "en": "Blender 5.2.2 and Python support modeling and parametric generation. Environments also integrate Industrial Harbour, RocksGobi, Lands, and RockyDesert assets, with a CC0 sky HDRI from Poly Haven.",
            "zh": "使用 Blender 5.2.2 与 Python 进行建模和参数化生成。场景同时整合 Industrial Harbour、RocksGobi、Lands 与 RockyDesert 资源，天空采用 Poly Haven 的 CC0 HDRI。"
          },
          {
            "en": "Unity MCP and Unity AI Assistant assist with scene operations and Console inspection; Blender MCP supports the art workflow. Git and Git LFS manage source files and large assets.",
            "zh": "通过 Unity MCP 与 Unity AI Assistant 辅助场景操作和 Console 检查，使用 Blender MCP 辅助美术工作流，通过 Git 与 Git LFS 管理源码和大型资源。"
          }
        ]
      }
    ],
    links: [
      { label: { en: "GitHub repository", zh: "GitHub 仓库" }, url: "https://github.com/HowellWang04/Grad-App-Project-Coal" },
      { label: { en: "Technical documentation", zh: "技术栈文档" }, url: "https://github.com/HowellWang04/Grad-App-Project-Coal/blob/main/Docs/tech-stack.md" },
      { label: { en: "Halftone algorithm source", zh: "半调算法来源" }, url: "https://github.com/daniel-ilett/shaders-halftone" },
    ],
  },
  "mask": {
    links: [
      {
        label: { en: "Jam submission", zh: "参赛页面" },
        url: "https://globalgamejam.org/games/2026/mask-6-4",
      },
    ],
  },
  "seafloor-revival": {
    role: { en: "UI development", zh: "UI 开发" },
    team: { en: "6 credited creators", zh: "6 位署名作者" },
    duration: {
      en: "July 30 to August 3, 2025 · Jam window",
      zh: "2025 年 7 月 30 日至 8 月 3 日 · 赛事制作期",
    },
    stack: [
      {
        name: "Unity",
        use: {
          en: "UI layout, component configuration, and reference binding.",
          zh: "UI 布局、组件配置与引用绑定。",
        },
      },
      {
        name: "C#",
        use: { en: "UI data interfaces and an animated clock.", zh: "UI 数据接口与动态时钟。" },
      },
    ],
    contributions: [
      {
        en: "Configured Unity UI layouts, components, and references for the resource bar, population display, and time panel.",
        zh: "完成 Unity UI 布局、组件配置与引用绑定，整合资源栏、人口信息区及时间面板。",
      },
      {
        en: "Implemented UI data interfaces to synchronize five resource counts, the sea hare count, and the shelter population with the display.",
        zh: "编写 UI 数据接口，将五类资源数量、海兔数量和避难所人口同步至界面。",
      },
      {
        en: "Developed an animated UI clock that maps cycle timing to hand rotation, providing a visual indicator of progress through the current cycle.",
        zh: "开发动态 UI 时钟，将循环计时进度映射为指针旋转，直观呈现当前周期的时间进度。",
      },
    ],
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
  "la-luna": {
    role: { en: "Gameplay & card design", zh: "游戏玩法与卡牌设计" },
    team: { en: "3 person team", zh: "三人团队" },
    stack: [
      {
        name: "Figma",
        use: { en: "Designing and laying out the guidebook together with the team.", zh: "与团队协作设计和排版游戏说明书。" },
      },
    ],
    contributions: [
      { en: "Designed one third of the game's cards.", zh: "设计了游戏中三分之一的卡牌。" },
      { en: "Drafted the first version of the gameplay.", zh: "制定了最初版本的游戏玩法。" },
      { en: "Made the guidebook in Figma together with the team.", zh: "与团队合作，使用 Figma 制作游戏说明书。" },
    ],
    links: [
      { label: { en: "Guidebook PDF", zh: "说明书 PDF" }, url: "/la-luna-guidebook.pdf" },
    ],
  },
};
