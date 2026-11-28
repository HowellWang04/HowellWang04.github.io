export type ProjectText = { en: string; zh: string };

export type ProjectDetails = {
  role?: ProjectText;
  team?: ProjectText;
  duration?: ProjectText;
  stack?: { name: string; use: ProjectText }[];
  contributionGroups?: { title: ProjectText; tools: string; summary: ProjectText; details: ProjectText[] }[];
  contributions?: ProjectText[];
  links?: { label: ProjectText; url: string }[];
  photos?: { src: string; alt: string; caption: ProjectText }[];
};

// Add only confirmed personal responsibilities, tools, and results.
// Describe contributions as an action, the work you owned, and its impact.
export const projectDetails: Record<string, ProjectDetails> = {
  "project-fireflies": {
    role: { en: "Interaction design, hardware build, firmware & Unity sound", zh: "交互设计、硬件搭建、固件与 Unity 声音" },
    team: { en: "Solo project", zh: "个人独立完成" },
    duration: { en: "June 2026", zh: "2026 年 6 月" },
    contributionGroups: [
      {
        title: { en: "Kuramoto synchronization", zh: "Kuramoto 藏本同步" },
        tools: "C/C++ · Arduino · FireflySwarm.cpp",
        summary: {
          en: "Gave each simulated firefly its own flashing rhythm, then used Kuramoto coupling to draw the two interactive groups toward a shared phase.",
          zh: "让每只模拟萤火虫拥有独立的闪烁节奏，再通过藏本耦合把两组互动灯群拉向共同的相位。",
        },
        details: [
          {
            en: "Each firefly follows its own phase. Following the Kuramoto phase coupling formula, FireflySwarm.cpp sums the sine of the phase differences between fireflies, scales it by coupling strength and divides it by the swarm count, pulling active fireflies toward a shared rhythm. A disruption term adds each firefly's own phase drift.",
            zh: "每只萤火虫按自己的相位闪烁。FireflySwarm.cpp 按藏本相位耦合公式累加个体间相位差的正弦值，乘以耦合强度并除以群体数量，把活跃的萤火虫拉向共同节奏。另有一项相位扰动为每只萤火虫加入各自的相位漂移。",
          },
          {
            en: "The lights move between three states. When independent, each point follows its own phase. When synchronized, coupling draws the interactive groups together. When disturbed, points dim, disperse and fall out of step. The background strip keeps its independent rhythm.",
            zh: "灯光在三种状态之间变化。独立时每个光点按自己的相位闪烁，同步时耦合把互动灯群拉到一起，受扰时光点变暗、散开并失去同步。背景灯带始终保持独立的节奏。",
          },
        ],
      },
      {
        title: { en: "Sensing & disturbance mapping", zh: "传感与扰动映射" },
        tools: "ESP32-WROOM · HLK-LD2410B · TEMT6000",
        summary: {
          en: "The firmware turns radar and light input from two interactive zones into a shared response across motion, brightness and rhythm.",
          zh: "固件把两个互动区的雷达与光照输入转化为同一套响应，同时作用于移动、亮度与节奏。",
        },
        details: [
          {
            en: "The mmWave radar reports motion, presence and distance, and the light sensor reports brightness as an ADC reading. The firmware smooths the disturbance of each interactive swarm and maps it to effect strength, with effect = disturbance^0.70.",
            zh: "毫米波雷达上报移动、存在与距离，光照传感器以 ADC 读数上报亮度。固件对每组互动灯群的扰动值做平滑，再映射为效果强度，effect = disturbance^0.70。",
          },
          {
            en: "As the effect rises, fewer points stay visible (count − effect × 4), travel along the strip quickens (1.5 + effect × 4.5), the overall light fades (1 − effect × 0.90), phase alignment weakens, and the rhythm spreads out.",
            zh: "效果越强，可见的光点越少（count − effect × 4），沿灯带移动越快（1.5 + effect × 4.5），整体亮度越低（1 − effect × 0.90），相位对齐越弱，节奏也随之散开。",
          },
          {
            en: "Distance lets visitors discover the trigger by walking, as radar turns physical presence into a local change they can see. Bright light carries the same idea to a larger scale and can raise disturbance even when a visitor keeps their distance.",
            zh: "距离让参与者在走动中自己发现触发方式，雷达把人的在场变成看得见的局部变化。强光把同一想法放大，即使参与者保持距离，亮光也会提高扰动。",
          },
        ],
      },
      {
        title: { en: "LED swarms & installation build", zh: "LED 灯群与装置搭建" },
        tools: "WS2812B · ESP32-WROOM · Firefly.cpp",
        summary: {
          en: "Laid out three swarms on addressable LED strips. Two interactive zones each run 8 simulated fireflies on 60 LEDs, and a background of 35 fireflies on 300 LEDs flickers slower and dimmer, independent of visitor input.",
          zh: "在可寻址 LED 灯带上布置三组灯群。左右两个互动区各用 60 颗 LED 模拟 8 只萤火虫，背景用 300 颗 LED 模拟 35 只，闪烁更慢更暗，不受参与者影响。",
        },
        details: [
          {
            en: "Each simulated firefly cycles through a lit and an off window, and a brightness envelope makes it brighten and fade within the lit window. Individually addressed pixels let the fireflies move, flicker and disappear. The ESP32-WROOM reads the sensors, updates firefly states and drives the strips, coded in C/C++ with the Arduino framework.",
            zh: "每只模拟萤火虫在亮灯窗口与熄灭窗口之间循环，亮度包络让它在亮灯窗口内渐亮渐暗。逐颗寻址的像素让萤火虫可以移动、闪烁和消失。ESP32-WROOM 读取传感器、更新萤火虫状态并驱动灯带，用 C/C++ 与 Arduino 框架编写。",
          },
          {
            en: "Bench tests of the sensor wiring came before installation. The lights are routed against black fabric, which hides the strip path and the wiring so each LED reads as a separate point of light in the dark room.",
            zh: "安装前先在桌面上测试传感器接线，再把灯带沿黑布布置。黑布遮住灯带走线与接线，让每颗 LED 在暗室里都像一个独立的光点。",
          },
        ],
      },
      {
        title: { en: "Unity soundscape", zh: "Unity 声音环境" },
        tools: "Unity · UDP",
        summary: {
          en: "The ESP32 sends a disturbance value to the installation computer over UDP on the local network, and Unity uses it to crossfade the soundscape between nature and city.",
          zh: "ESP32 通过局域网 UDP 把扰动值发送到装置电脑，Unity 据此在自然声与城市声之间做交叉渐变。",
        },
        details: [
          {
            en: "The soundscape starts with water, wind and insects. As disturbance increases, city audio rises and the nature track recedes.",
            zh: "声音从水声、风声和虫鸣开始。扰动升高时，城市声渐强，自然声退后。",
          },
          {
            en: "Unity sets target volumes for the nature and city tracks from the disturbance value, and the fade follows those targets.",
            zh: "Unity 根据扰动值设定自然声与城市声的目标音量，渐变跟随这些目标音量进行。",
          },
        ],
      },
    ],
    links: [
      { label: { en: "GitHub repository", zh: "GitHub 仓库" }, url: "https://github.com/HowellWang04/Vanishing-Fireflies" },
      { label: { en: "Firmware documentation", zh: "固件文档" }, url: "https://github.com/HowellWang04/Vanishing-Fireflies/blob/main/firmware/fireflies_main/README.md" },
      { label: { en: "Kuramoto model reference", zh: "藏本模型参考文献" }, url: "https://arxiv.org/html/2602.20505v1#S3" },
    ],
  },
  "project-sand": {
    role: { en: "Gameplay systems, C# programming & art direction", zh: "玩法系统、C# 编程与美术指导" },
    team: { en: "Solo project", zh: "个人独立完成" },
    duration: { en: "January 2026", zh: "2026 年 1 月" },
    contributionGroups: [
      {
        title: { en: "Economy & ecological tradeoffs", zh: "经济与生态取舍" },
        tools: "Unity 6 · C#",
        summary: {
          en: "Put mining, factories and tree planting on the same land. Mining makes quick money, factories pay over time, and planting commits money before the landscape recovers.",
          zh: "让采矿、工厂与植树发生在同一片土地上。采矿快速回款，工厂持续产出收入，植树则要先投入资金，之后土地才慢慢恢复。",
        },
        details: [
          {
            en: "By default, mining costs 450 and pays out 900 in three stages, a factory costs 1,200, and planting costs 2 per tree. Factory income starts at 1.5 per second for the first factory with a soft cap of 6 per second, so diminishing returns limit income while the ecological cost keeps growing.",
            zh: "默认参数下，采矿花费 450，分三个阶段共返还 900，建厂花费 1,200，植树每棵花费 2。第一座工厂每秒产出 1.5，总收入的软上限为每秒 6，边际收益递减限制了收入，生态代价却持续增长。",
          },
          {
            en: "Each factory's pollution removes 0.6 trees per second by default, even with the economy toggle off. A timer batches tree removal and refreshes the environment. Removing factories stops their pollution so vegetation can recover.",
            zh: "默认每座工厂每秒因污染移除 0.6 棵树，即使关闭经济开关也照常进行。计时器把树木移除分批处理并刷新环境状态。拆除工厂会停止其污染，让植被得以恢复。",
          },
        ],
      },
      {
        title: { en: "Placement & land use", zh: "放置与土地利用" },
        tools: "Unity 6 · C# · Inspector",
        summary: {
          en: "Planting, construction and mining change the same map. Trees occupy free terrain cells, factories reserve a footprint, and mining clears trees in a circular area.",
          zh: "植树、建厂与采矿改变的是同一张地图。树木占用空闲的地形格，工厂预留占地范围，采矿清除圆形区域内的树木。",
        },
        details: [
          {
            en: "DesertEnvironmentUI sends plant, build and mine actions to the simulation layer, which covers environment, economy and placement and tracks money, pollution and the environment index.",
            zh: "DesertEnvironmentUI 把植树、建厂和采矿操作发送给模拟层。模拟层负责环境、经济与放置，跟踪资金、污染和环境指数。",
          },
          {
            en: "Tree, factory and mining parameters are tuned in Unity inspectors.",
            zh: "树木、工厂与采矿的参数都在 Unity 的 Inspector 中调节。",
          },
        ],
      },
      {
        title: { en: "Environment index & feedback", zh: "环境指数与反馈" },
        tools: "C# · DesertFxAPI · FxSnapshot",
        summary: {
          en: "A weighted environment index built from tree, factory and mining counts drives wind, airborne sand, heat haze and the sky.",
          zh: "由树木、工厂和采矿数量加权得到环境指数，驱动风、空中扬沙、热浪与天空的变化。",
        },
        details: [
          {
            en: "E = clamp(0.55t − 0.30f − 0.25m + 0.50, 0, 1), where t, f and m are the normalized tree, factory and mining counts. A higher E weakens wind and heat haze and makes airborne sand sparser and slower, and blue sky emerges as vegetation grows. By default 15,000 trees give full sky clearing, and the HUD shows the score and the sky blend separately.",
            zh: "E = clamp(0.55t − 0.30f − 0.25m + 0.50, 0, 1)，其中 t、f、m 分别是归一化后的树木、工厂与采矿数量。E 越高，风和热浪越弱，扬沙越稀越慢，蓝天随植被增长而出现。默认 15,000 棵树对应天空完全放晴，HUD 分别显示环境分数与天空混合程度。",
          },
          {
            en: "FxSnapshot stores wind, sand, heat distortion and sky settings. DesertFxAPI captures the current values and supplies the target state, and a smoothstep curve eases the progress while each setting interpolates between snapshots, so several effects respond to the same change together.",
            zh: "FxSnapshot 保存风、沙、热浪扭曲与天空的设置。DesertFxAPI 捕获当前数值并给出目标状态，各项设置在快照之间插值，进度由 smoothstep 曲线缓动，让多个视觉效果对同一变化一起响应。",
          },
        ],
      },
      {
        title: { en: "Sand & heat rendering", zh: "风沙与热浪渲染" },
        tools: "Unity 6 · URP · Shader · Renderer Feature",
        summary: {
          en: "Wrote ground sand, airborne sand and heat distortion effects that respond to the wind and the state of the environment.",
          zh: "编写了地表流沙、空中扬沙和热浪扭曲三种效果，随风和环境状态变化。",
        },
        details: [
          {
            en: "Ground sand uses one wind vector and three parallax layers. Far, middle and near layers move at different rates, scrolled by GPU time without accumulating UV offsets on the CPU. The shader blends them and clips low alpha areas before output.",
            zh: "地表流沙用一个风向向量驱动三层视差。远、中、近三层以不同速度移动，滚动由 GPU 时间驱动，不在 CPU 上累加 UV 偏移。着色器混合三层，并在输出前裁掉低透明度区域。",
          },
          {
            en: "Airborne sand is drawn as near, middle and far sheets. Dual noise varies density within each sheet, scene depth fading softens intersections with the ground, and camera distance and edge fades soften the boundaries.",
            zh: "空中扬沙由近、中、远三层面片构成。双重噪声改变每层面片内的浓度，场景深度淡出柔化与地面的交界，相机距离淡出与边缘淡出柔化面片边界。",
          },
          {
            en: "Heat distortion is a masked fullscreen pass enqueued by a URP renderer feature, with exposed strength, noise and scroll controls. Two noise samples offset the scene color lookup, and depth and world height mask the distortion so it stays within the intended range.",
            zh: "热浪扭曲是一个带遮罩的全屏 Pass，由 URP Renderer Feature 加入渲染队列，强度、噪声与滚动参数均可调节。两次噪声采样偏移场景颜色的采样位置，深度与世界高度遮罩把扭曲限制在预期范围内。",
          },
        ],
      },
    ],
    links: [
      { label: { en: "Design document PDF", zh: "设计文档 PDF" }, url: "/design-docs/desert-restoration-simulator-design-doc.pdf" },
      { label: { en: "GitHub repository", zh: "GitHub 仓库" }, url: "https://github.com/HowellWang04/Desert-Restoration-Simulator" },
    ],
  },
  "coal-echoes": {
    role: { en: "Story & level design, gameplay systems, scene & terrain build", zh: "叙事与关卡设计、玩法系统、场景与地形搭建" },
    team: { en: "Solo project", zh: "个人独立完成" },
    duration: { en: "August 2026", zh: "2026 年 8 月" },
    contributionGroups: [
      {
        title: { en: "Emotional Curve and Story", zh: "情绪曲线与故事" },
        tools: "Four levels · Diary · Camera · Scrapbook",
        summary: {
          en: "Designed a four level route from the factory gate to the ridge, with an emotional curve that moves from loss and curiosity through regret to quiet acceptance.",
          zh: "设计了从厂门到山脊的四个关卡，情绪曲线从失落与好奇出发，经过遗憾，最后落在平静的接受。",
        },
        details: [
          {
            en: "At the factory gate the player reads the diary, takes a photo and cuts the chain. Room 207 holds the mountain map, the lower station has the old cableway to fix and ride, and at the upper station the last diary entry reveals that the two workers never made the trip.",
            zh: "在厂门，玩家阅读日记、拍下照片并剪断铁链。207 宿舍里藏着上山的地图，下站要修好老索道并乘坐上山。到了上站，最后一篇日记揭示两位工人始终没有成行。",
          },
          {
            en: "In Room 207 the diary tells the player what to look for, and light leads the eye from the doorway to the drawer.",
            zh: "在 207 宿舍，日记告诉玩家要找什么，光线把视线从门口引向抽屉。",
          },
          {
            en: "The first three levels take place in daylight. Night falls during the cableway ride, and the plant below is completely unlit. The orange sand haze is removed, a low moon lights the cableway towers, the plant buildings and the dormitory through cold fog, and the final photo frames the dark plant under the night sky.",
            zh: "前三关都在白天进行。夜幕在乘坐索道的途中降临，山下的厂区一盏灯也没有。橙色的沙尘被去掉，低垂的月亮透过冷雾照亮索道塔、厂房和宿舍楼，最后一张照片拍下夜空下漆黑的厂区。",
          },
        ],
      },
      {
        title: { en: "Capture Hub", zh: "拍照中枢" },
        tools: "Unity 6 · CameraStateMachine · EchoTargetDetector",
        summary: {
          en: "Made photography the way the player learns the story. When the camera points at an Echo, a trace of grandpa's time, the frame turns yellow, and the saved photo records it.",
          zh: "让拍照成为玩家了解故事的方式。镜头对准回响，也就是外公那个年代留下的痕迹时，取景框会变黄，保存的照片会记录下这次发现。",
        },
        details: [
          {
            en: "A state machine moves the camera through Disabled, Active, Capturing and Reviewing and blocks illegal jumps. The shutter works in fullscreen only. The target is locked on the shutter press, then a coroutine hides the HUD, fires the flash, captures, and saves the Echo.",
            zh: "状态机让相机在 Disabled、Active、Capturing、Reviewing 四个状态之间切换，并阻止非法跳转。只有全屏模式下才能按快门。按下快门时锁定目标，随后协程隐藏 HUD、触发闪光、截取画面并保存回响。",
          },
          {
            en: "While the camera is active, the detector checks every frame that the target sits near the center and is large enough, within distance, stand point and focal length limits. An occlusion check uses a center ray plus 3 of 4 inner samples, and Echoes that require focus also check the blur circle.",
            zh: "相机处于 Active 状态时，检测器每帧检查目标是否位于画面中央且足够大，并满足距离、站位和焦距限制。遮挡检测使用中心射线加四个内部采样点中的三个，需要对焦的回响还会检查弥散圆。",
          },
          {
            en: "Picking up grandpa's diary is what turns Echoes on. Tools found by inspecting, such as the lock pick and bolt cutter, open ways forward without the camera. Main story Echoes are photographed to continue, and optional Echoes add context.",
            zh: "拾起外公的日记后回响才会开启。通过检视找到的工具，例如开锁工具和断线钳，不用相机也能打开前路。主线回响需要拍下才能继续，可选回响则补充背景。",
          },
        ],
      },
      {
        title: { en: "Scripts and Persistence", zh: "脚本与存档" },
        tools: "ScrapBookCanvas · JSON · persistentDataPath",
        summary: {
          en: "Built the album and scrapbook that carry each photo forward. Echo photos get a warm frame in the album, and in the scrapbook their text becomes a handwritten note taped to the photo.",
          zh: "实现了承接每张照片的相册与手账。回响照片在相册里带有暖色边框，到了手账里，它的文字会变成贴在照片上的手写便签。",
        },
        details: [
          {
            en: "Every photo is saved as a PNG, and a right click sends it from the album to the scrapbook. There the player drags, rotates and resizes photos, stickers and text, and the layout is saved between sessions.",
            zh: "每张照片保存为 PNG，右键即可从相册送入手账。玩家在手账里拖动、旋转和缩放照片、贴纸与文字，布局会在两次游玩之间保留。",
          },
          {
            en: "Captured photos, Echo texts, registered scrapbook photos, the canvas layout and discovered Echoes are kept in separate files under Application.persistentDataPath, so a photograph keeps its discovery state and handwritten note when the player returns. Grandpa's diary pages are pure data loaded from a JSON file.",
            zh: "拍摄的照片、回响文字、已登记的手账照片、画布布局和已发现的回响分别保存在 Application.persistentDataPath 下的独立文件里，玩家回来时照片仍保有发现状态和手写便签。外公的日记页是纯数据，从 JSON 文件加载。",
          },
        ],
      },
      {
        title: { en: "Terrain Workflow", zh: "地形工作流" },
        tools: "USGS 1 m DEM · Poisson solver · MapMagic 2",
        summary: {
          en: "Turned a real 1 m elevation survey of Nevada's Sheep Range into the game's enclosed valley, a stand-in for the bare stone ridges of Shitanjing.",
          zh: "把内华达州 Sheep Range 的 1 米实测高程数据做成游戏里的封闭山谷，用来代替石炭井光秃的石山。",
        },
        details: [
          {
            en: "Shitanjing only has 30 m data, which looks blurry to the player, while Sheep Range has the same bare rock, a similar 700 m rise and a 1 m survey. A single block did not fit the map, so I ringed a flatter plant site with three real survey pieces as high ground and joined them with the Poisson solver from Gradient Terrain Authoring (Guérin et al. 2022).",
            zh: "石炭井只有 30 米精度的数据，玩家看起来会很模糊，而 Sheep Range 有同样裸露的岩石、相近的 700 米落差和 1 米精度的实测数据。单块数据放不进地图，于是用三块真实测绘地形作为高地围住较平坦的厂区，再用 Gradient Terrain Authoring（Guérin 等，2022）中的 Poisson 求解器把它们接合起来。",
          },
          {
            en: "MapMagic 2 spreads the solved heights over 36 tiles with LOD, and slope rules pick sand or rock. One-shot editor scripts back up the scene, write only the tiles that changed, and match tile edges before saving.",
            zh: "MapMagic 2 把求解后的高度铺到 36 个带 LOD 的地块上，并按坡度规则选择沙或岩石。一次性的编辑器脚本先备份场景，只写入发生变化的地块，对齐地块边缘后再保存。",
          },
          {
            en: "Verification reads all 58 terrains back and compares them with the solver's result. Where pinned survey edges left visible straight creases across the hillside, a second Poisson pass spreads each bend over 60 to 100 m and leaves roads and the factory untouched.",
            zh: "验证环节把全部 58 块地形读回，与求解器的结果比对。固定为实测高度的边缘会在山坡上留下明显的直线折痕，第二遍 Poisson 求解把每处转折摊开到 60 至 100 米，道路和厂区保持不动。",
          },
        ],
      },
      {
        title: { en: "Group Photograph", zh: "合影" },
        tools: "Unity · Claude Code · Codex MCP",
        summary: {
          en: "One gate, two eras. A staged photograph gives the player a viewpoint to find again.",
          zh: "同一座大门，两个年代。一张摆拍的合影，给玩家留下一个要重新找到的视角。",
        },
        details: [
          {
            en: "The protagonist carries one old photo of twelve new workers at the plant gate on 3 October 1980. Its background is the game's own gate, rendered in Unity and set back to 1980 with fresh paint and a red banner.",
            zh: "主角随身带着一张老照片，是 1980 年 10 月 3 日十二位新工人在厂区大门前的合影。它的背景就是游戏里的大门，在 Unity 中渲染，并用新刷的油漆和红色横幅还原到 1980 年。",
          },
          {
            en: "Claude cannot generate images, so it cannot draw people or faces. Instead it wrote the prompt and called OpenAI's GPT image model through the Codex MCP, which added only the workers.",
            zh: "Claude 不能生成图像，画不了人物和面孔。所以由它撰写提示词，通过 Codex MCP 调用 OpenAI 的 GPT 图像模型，只添加工人。",
          },
          {
            en: "A script then cut the people out and placed them back onto the untouched render, and a second script aged it into a black and white print. That print is the exact image the player finds in the game.",
            zh: "随后一个脚本把人物抠出来放回未改动的渲染图，另一个脚本把它做旧成黑白照片。这张照片就是玩家在游戏里找到的那一张。",
          },
        ],
      },
      {
        title: { en: "Newspaper Print", zh: "报纸印刷" },
        tools: "HDRP · HLSL",
        summary: {
          en: "The menu photograph uses the actual plant view and carries the player from newsprint into the scene.",
          zh: "菜单上的照片用的是真实的厂区视角，把玩家从报纸带进场景。",
        },
        details: [
          {
            en: "For the newspaper, a pass films the plant every frame after color grading. A shader turns the color into gray ink, raises the contrast, makes the ink light and uneven, and lays it over an AI generated newsprint texture.",
            zh: "报纸照片由一个 Pass 在调色之后逐帧拍摄厂区。着色器把颜色转成灰色油墨，提高对比度，让墨色变浅且不均匀，再叠在 AI 生成的新闻纸纹理上。",
          },
          {
            en: "The shader also holds a halftone dot grid adapted from Daniel Ilett's Halftone Shader Graph (MIT), which I converted from a URP Shader Graph into a fullscreen HLSL shader for HDRP. The dots surface faintly in the opening transition, when Start New Game zooms the photo to fill the screen.",
            zh: "着色器里还有一套半调网点，改写自 Daniel Ilett 的 Halftone Shader Graph（MIT），我把它从 URP Shader Graph 转成了 HDRP 的全屏 HLSL 着色器。网点只在开场转场中隐约出现，也就是点击 Start New Game 后照片放大到铺满屏幕的时候。",
          },
        ],
      },
      {
        title: { en: "Playtest and Iteration", zh: "试玩与迭代" },
        tools: "3 players · UI · Level design · Onboarding",
        summary: {
          en: "Invited three players from different backgrounds, grouped their feedback by design area, and iterated on the interface, the ridge photo and the onboarding.",
          zh: "邀请三位背景不同的玩家试玩，按设计领域整理反馈，并针对界面、山脊照片和新手引导逐项迭代。",
        },
        details: [
          {
            en: "Player A pointed out that the tabs on the left of the Player Panel did not look like tabs, because the whole panel was one color tone. Each of the four tabs became an index tab with its own muted color, and the open tab sticks out further than the others.",
            zh: "玩家 A 指出玩家面板左侧的标签看起来不像标签，因为整个面板只有一种色调。四个标签各自改成带有柔和颜色的索引标签，当前打开的标签比其他的更突出。",
          },
          {
            en: "At the ridge, Player B took the photo as soon as the frame turned yellow, and the old mine tower blocked part of the plant. The Echo check still passed because the tower did not count as an obstacle. I moved the tower west of the station and the photo spot to the east railing, so the dormitory and the flagpole are in view.",
            zh: "在山脊上，玩家 B 在取景框一变黄时就按下快门，老矿塔挡住了一部分厂区。由于矿塔不算遮挡物，回响检测仍然通过。我把矿塔移到车站西侧，把拍摄点移到东侧栏杆，让宿舍楼和旗杆都进入画面。",
          },
          {
            en: "Player C found the guidance in the first level too rough, since it unlocked too many things at once. Tabs now open one at a time, in the order the first level teaches them, each with its own task hint. A planned per level Echo counter was dropped at the design stage, and each Echo photo goes into the scrapbook with the protagonist's note to Grandpa instead.",
            zh: "玩家 C 觉得第一关的引导太粗糙，一次解锁的东西太多。现在标签按第一关教学的顺序逐个开启，每个都有自己的任务提示。原计划的每关回响计数器在设计阶段就被放弃，每张回响照片改为带着主角写给外公的便签进入手账。",
          },
        ],
      },
    ],
    links: [
      { label: { en: "GitHub repository", zh: "GitHub 仓库" }, url: "https://github.com/HowellWang04/Coal-Echoes" },
      { label: { en: "Technical documentation", zh: "技术栈文档" }, url: "https://github.com/HowellWang04/Coal-Echoes/blob/main/Docs/tech-stack.en.md" },
      { label: { en: "Halftone algorithm source", zh: "半调算法来源" }, url: "https://github.com/daniel-ilett/shaders-halftone" },
    ],
  },
  "against-the-current": {
    role: { en: "Environment art", zh: "环境美术" },
    team: { en: "Solo project", zh: "个人独立完成" },
    duration: { en: "March 2026", zh: "2026 年 3 月" },
    stack: [
      {
        name: "Unreal Engine",
        use: {
          en: "Blockout, cliff and ground materials, vegetation, height fog, sky atmosphere, and color grading.",
          zh: "场景白盒、崖壁与地面材质、植被、高度雾、天空大气与调色。",
        },
      },
    ],
    contributions: [
      {
        en: "Built a 3D environment study of the Three Gorges and the river trackers who hauled wooden boats upstream. It began on a visit to Chongqing with my mother, where I watched performers haul towropes and sing trackers' work songs.",
        zh: "以三峡和拉着木船逆流而上的纤夫为题材制作三维环境习作。起因是和母亲去重庆时，看到表演者拉着纤绳、唱着纤夫号子。",
      },
      {
        en: "Told the story through the space itself. A narrow bank leaves little room to move, the figures lean in the direction of the pull, and the towline gives the eye a path from the workers on land to the boat on the water.",
        zh: "用空间本身讲故事。狭窄的河岸几乎没有活动的余地，人物朝着拉纤的方向前倾，纤绳把视线从岸上的纤夫引向水面上的船。",
      },
      {
        en: "Blocked out three large shapes first, the cliffs, the open river and the boat, under high contrast lighting so each silhouette reads before the warmer grade is introduced.",
        zh: "先用白盒确立崖壁、开阔的江面和船三个大形体，并用高对比光照检查每个剪影，之后才加入偏暖的调色。",
      },
      {
        en: "Built the cliff material from a world projected texture masked by vertex color, followed by a detail pass and a distance overlay. At river level, small plants and uneven ground mark the transition from water to rock.",
        zh: "崖壁材质采用世界空间投射的纹理，以顶点色作遮罩，再叠加细节层与远景叠加层。在江面高度，小型植物与起伏的地面衔接水面和岩石。",
      },
      {
        en: "Explored the tracker through pose studies and AI-assisted character exploration. A forward lean and bent knees suggest the weight of the pull, and the head wrap and rope give the figure a clear silhouette against the rock.",
        zh: "通过姿态研究和 AI 辅助的角色探索推敲纤夫形象。身体前倾、膝盖弯曲表现拉纤的重量，头巾和纤绳让人物在岩石背景前有清晰的剪影。",
      },
      {
        en: "Lowered global saturation and adjusted gamma and gain separately to control the tonal range. Height fog and sky atmosphere shape the far bank so distant cliffs recede behind the foreground, and a color review called out a bank that looked too green.",
        zh: "降低全局饱和度，并分别调整 gamma 与 gain 来控制影调范围。高度雾与天空大气塑造远岸，让远处的崖壁退到前景之后。调色评审中还指出了一处偏绿的河岸。",
      },
    ],
    links: [
      { label: { en: "Design document PDF", zh: "设计文档 PDF" }, url: "/design-docs/against-the-current-design-doc.pdf" },
    ],
  },
  "mask": {
    role: { en: "Programming, Level 2", zh: "程序，负责第二关" },
    team: { en: "Team of five", zh: "五人团队" },
    duration: { en: "January 2026 · Global Game Jam 2026", zh: "2026 年 1 月 · Global Game Jam 2026" },
    contributions: [
      {
        en: "Built the subway commute level, where phone messages from coworkers, HR, a boss, and a friend interrupt the player on a timed run to work.",
        zh: "制作地铁通勤关卡，玩家在限时赶去上班的途中，不断被同事、HR、上司和朋友的手机消息打断。",
      },
      {
        en: "Built the phone dialogue system: branching chat conversations are stored as editable ScriptableObject assets and shown as chat bubbles with choices.",
        zh: "开发手机对话系统，分支聊天对话以可编辑的 ScriptableObject 资源存储，以聊天气泡和选项的形式呈现。",
      },
      {
        en: "Later migrated the project from Tuanjie Engine to Unity 6 and published a web build with an English and Chinese language toggle.",
        zh: "之后将项目从团结引擎迁移到 Unity 6，并发布带中英文切换的网页版。",
      },
    ],
    links: [
      {
        label: { en: "Play on itch.io", zh: "在 itch.io 试玩" },
        url: "https://hawang2004.itch.io/mask",
      },
      { label: { en: "GitHub repository", zh: "GitHub 仓库" }, url: "https://github.com/HowellWang04/GGJ-2026-MASK" },
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
      { label: { en: "GitHub repository", zh: "GitHub 仓库" }, url: "https://github.com/HowellWang04/Game-Toolkit-2025-Seafloor-Revival" },
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
    photos: [
      {
        src: "/la-luna-prototype.jpg",
        alt: "La Luna: Star Sweeper paper prototype with the guidebook, moon board, cards, pawns and stones",
        caption: {
          en: "The printed paper prototype we playtested, with the guidebook, moon board, action and special cards, pawns, and black and white stones.",
          zh: "我们用于试玩的纸质原型，包括说明书、月面棋盘、行动卡与特殊卡、棋子，以及黑白棋子。",
        },
      },
    ],
  },
  "qna-rag": {
    role: { en: "Student & staff frontends, production deployment, CI & measurement", zh: "学生端与助教端前端、生产部署、CI 与性能测量" },
    team: { en: "2 person team, course project for COMPSCI 639 AI-Assisted Full Stack Software Development", zh: "两人团队，COMPSCI 639 AI-Assisted Full Stack Software Development 课程项目" },
    duration: { en: "Fall 2026 · Completed", zh: "2026 年秋季 · 已完成" },
    contributionGroups: [
      {
        title: { en: "AI answers & citations", zh: "AI 回答与引用来源" },
        tools: "React · TypeScript · Vite · Tailwind CSS",
        summary: {
          en: "Built how AI answers appear to students and staff: an AI-generated badge and warning, a numbered source list, and live updates while an answer is being written.",
          zh: "负责 AI 回答在学生端与助教端的呈现，包括 AI 生成标识与提示、编号来源列表，以及回答生成期间的实时更新。",
        },
        details: [
          {
            en: "Post bodies render as plain text, so citations became a structured field. Past threads open inside the same app through a course-scoped link, uploaded files are fetched with the login token and opened as non-HTML files, and other sources open at their exact line, page, or quoted text.",
            zh: "帖子正文按纯文本显示，因此引用来源设计为结构化字段。历史帖子通过带课程参数的链接在应用内打开，上传文件携带登录令牌获取并以非 HTML 方式打开，其他来源直接定位到对应行号、页码或引用文字。",
          },
          {
            en: "Built the staff pages for registering course resources and comparing configurations against the design document's contract before the backend existed, so nothing had to change when it landed. The question page polls every 5 seconds while an answer is pending.",
            zh: "在后端完成之前，依据设计文档约定的接口开发了助教端的课程资料登记与配置对比页面，后端上线后前端无需改动。问题页面在回答生成期间每 5 秒轮询一次状态。",
          },
        ],
      },
      {
        title: { en: "Production deployment & CI", zh: "生产部署与 CI" },
        tools: "Docker Compose · Nginx · Google Cloud · GitLab CI",
        summary: {
          en: "Wrote the production stack and deploy pipeline that run the board, a vector database, a local language model, and two embedding servers on a single 4 vCPU cloud VM.",
          zh: "编写生产环境编排与部署流水线，在一台 4 核云服务器上同时运行问答平台、向量数据库、本地大语言模型与两个嵌入模型服务。",
        },
        details: [
          {
            en: "The AI services expose no public ports, and the backend does not wait for them to start, so the board stays usable while models load. Deploys run from a protected production branch through GitLab CI.",
            zh: "AI 服务不对外开放端口，后端也不依赖它们启动完成，因此模型加载期间平台仍可正常使用。部署通过 GitLab CI 从受保护的 production 分支执行。",
          },
          {
            en: "Measured memory on the VM itself: with every model loaded the stack peaked at 10.5 of 15.6 GiB, enough to keep the large gte-Qwen2 embedding model resident. The same test showed its default warmup never finishes on CPU, so it is turned off.",
            zh: "在服务器上实测内存，所有模型加载后峰值为 10.5 GiB（共 15.6 GiB），足以让大型 gte-Qwen2 嵌入模型常驻。同一测试还发现其默认预热在 CPU 上永远无法完成，因此将其关闭。",
          },
        ],
      },
      {
        title: { en: "Concurrency fix & code review", zh: "并发修复与代码审查" },
        tools: "FastAPI · SQLAlchemy · MySQL",
        summary: {
          en: "Reviewed every backend merge request and found a database connection leak that only appears at production speed.",
          zh: "审查了所有后端合并请求，并发现一个只在生产环境速度下才会出现的数据库连接耗尽问题。",
        },
        details: [
          {
            en: "Each answer takes about 28 seconds on the VM, and queued automatic answers each held a database connection while waiting. Fifteen of them would empty the pool and every page would fail. A 16 session probe confirmed it, and running automatic answers one at a time cut peak connections from 16 to 7.",
            zh: "服务器上每条回答约需 28 秒，排队中的自动回答各自占用一个数据库连接，15 条即可耗尽连接池，导致所有页面报错。通过 16 个会话的并发探测确认了该问题，改为逐条生成自动回答后，峰值连接数从 16 降至 7。",
          },
          {
            en: "Review also caught a chunker that dropped words at window boundaries, damaged ZIP uploads returning server errors instead of a clear upload error, and a successful index build being marked as failed.",
            zh: "审查中还发现了分块器在窗口边界丢失词语、损坏的 ZIP 上传返回服务器错误而非明确的上传错误，以及成功的索引构建被误标为失败等问题。",
          },
        ],
      },
      {
        title: { en: "RAG configuration evaluation", zh: "RAG 配置评估" },
        tools: "Ollama · qwen2.5 · MiniLM · gte-Qwen2 · Chroma",
        summary: {
          en: "Compared eight configurations across chunking, embedding model, threshold, prompt, and generation model on 14 ground truth questions against the deployed system.",
          zh: "在已部署的系统上，用 14 道标准答案问题对比了分块方式、嵌入模型、阈值、提示词与生成模型共八组配置。",
        },
        details: [
          {
            en: "Type-tailored chunking was the best single change, raising retrieval hits from 77% to 85% while cutting average generation time from 23.5 to 15.5 seconds. A stricter threshold and a larger 3B model both made answers worse.",
            zh: "按资料类型分块是效果最好的单项改动，检索命中率从 77% 提升到 85%，平均生成时间从 23.5 秒降到 15.5 秒。更严格的阈值和更大的 3B 模型反而让回答质量下降。",
          },
          {
            en: "The 0.35 threshold was calibrated from measured similarity scores, keeping out-of-scope questions unanswered in every run. Also wrote one of the three hardening system prompts.",
            zh: "0.35 的相似度阈值依据实测分数校准，在所有配置中都能正确拒答课程范围外的问题。另外编写了三种加固系统提示词中的一种。",
          },
        ],
      },
    ],
    links: [
      { label: { en: "Course website", zh: "课程网站" }, url: "https://aicoding.cs.wisc.edu/fa26/schedule.html" },
      { label: { en: "Email me for repository access", zh: "邮件申请仓库访问" }, url: "mailto:gwang284@wisc.edu?subject=QnA%20source%20code%20access" },
    ],
  },
};
