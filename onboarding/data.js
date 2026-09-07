/* ============================================================
   data.js —— 入项须知内容数据（来源：CarOS_Nori_2026_wiki 飞书文档）
   ------------------------------------------------------------
   ★ 替换说明：内容更新时直接修改本文件对应字段即可，
     页面（index.html/app.js/chat.js）无需任何改动。
     原文：https://thundersoft.feishu.cn/docx/WaSedIF3AoAZPax7fwKcSF9EnVf
   ============================================================ */

/* ============ 1. 新手入项引导（流程 + 任务清单 + 直达链接，三合一） ============ */
/* t=任务 u=直达链接(可选) 勾选进度存 localStorage */
var ONBOARD_FLOW = [
  {
    title: '通读项目 Wiki',
    duration: '第 1 天',
    detail: '先完整阅读 CarOS_Nori_2026 项目 Wiki 原文，建立对项目（滴水OS 2.0 / 8X97 平台 POC 项目）的整体认知。',
    points: [
      '重点看「项目重要资料」和「项目管理系统」两节',
      '记住自己所在模块的接口人是谁',
      '不清楚的记下来，先问接口人或导师',
      '本文档可随时从本页顶部「原文 Wiki」进入'
    ],
    tasks: [
      { t: '通读项目 Wiki 原文，建立项目整体认知', u: 'https://thundersoft.feishu.cn/docx/WaSedIF3AoAZPax7fwKcSF9EnVf' },
      { t: '重点阅读「项目重要资料」「项目管理系统」两节', u: 'https://thundersoft.feishu.cn/docx/WaSedIF3AoAZPax7fwKcSF9EnVf' },
      { t: '记住自己所在模块的接口人' },
      { t: '整理疑问清单，找接口人或导师确认' }
    ]
  },
  {
    title: '申请账号与权限',
    duration: '第 1–2 天',
    detail: '按下表提交各系统权限申请，等待开通期间可并行做后续步骤。',
    points: [
      '研发代码权限：易链 elink.thundersoft.com/#/user/project',
      'BUG/任务管理：禅道（项目名 CarOS_Nori_2026，见「禅道权限申请流程」）',
      'Gerrit：公钥需添加在北京主服务器（找 SCM-王小琪）',
      '飞书权限：找 PM-彭志平、尹晟宇 或 TPM-吕洪山、代庆晨'
    ],
    tasks: [
      { t: '易链申请研发代码权限', u: 'https://elink.thundersoft.com/#/user/project' },
      { t: '禅道权限申请（项目名 CarOS_Nori_2026）', u: 'https://thundersoft.feishu.cn/docx/QtcxdvBGToBpDaxt8TicZsHfnng' },
      { t: 'Gerrit 公钥添加到北京主服务器（找 SCM-王小琪）', u: 'http://10.0.232.2/gerrit/' },
      { t: '飞书项目权限开通（找 PM-彭志平、尹晟宇 / TPM-吕洪山、代庆晨）' }
    ]
  },
  {
    title: '下载代码并编译',
    duration: '第 2–3 天',
    detail: '按所在基线选择 manifest 分支下载代码，参照《项目快速上手指南》完成首次编译。',
    points: [
      'ADP 分支 ES6：kepler-hampden-nori-v5170r21.1-16-base.xml',
      'A 样分支 ES6：kepler-hampden-nori-v5170r21.1-16-A0base.xml',
      'ES4.1 对应把 21.1 换成 1701.1',
      '编译时注意勾选自己需要的镜像类型（见 Qfile & Fastboot 镜像编译）',
      '分支策略详见 wiki 内《HPC-分支策略》PPT'
    ],
    tasks: [
      { t: '确认所在基线，选定 manifest 分支（ES6/ES4.1 × ADP/A 样）', u: 'https://thundersoft.feishu.cn/docx/BVGtdTBcEoxh3Nx2FnkcNfhBnhh' },
      { t: 'repo 下载代码，通读《8x97 HGY ES6 nori 项目快速上手指南》', u: 'https://thundersoft.feishu.cn/docx/YXC2dQj6DoPcPLx2u84c9WE0n4g' },
      { t: '完成首次编译，勾选所需镜像类型（Qfile & Fastboot）' },
      { t: '了解分支策略（见 HPC_Tarkine Wiki《分支策略》PPT）', u: 'https://thundersoft.feishu.cn/docx/BVGtdTBcEoxh3Nx2FnkcNfhBnhh' }
    ]
  },
  {
    title: '熟悉流程与规范',
    duration: '第 3–5 天',
    detail: '了解任务流转、BUG 处理、代码提交与工时填写等日常流程，避免协作踩坑。',
    points: [
      '任务管理：禅道按一级 feature 粒度，可用 taskID 提交代码',
      'BUG 流程：见 wiki《BUG处理流程》',
      '测试规范：见《滴水OS|测试流程规范V2.1》',
      '工时周报：每周四、五填写工时和周报到「人员投入计划_周报」'
    ],
    tasks: [
      { t: '阅读《入项流程》文档', u: 'https://thundersoft.feishu.cn/docx/P5pGdKCeUo3ptkxYAeVcVHgSnSc' },
      { t: '阅读《BUG 处理流程》', u: 'https://thundersoft.feishu.cn/docx/MaapdSXSGoly6FxJo80cf0B4nhe' },
      { t: '阅读《滴水OS|测试流程规范 V2.1》', u: 'https://thundersoft.feishu.cn/docx/XKX1dE07woxnhNxsLRDcTjMTnTf' },
      { t: '周四/周五填写工时与周报（人员投入计划_周报）', u: 'https://thundersoft.feishu.cn/wiki/B2P7ws5oYiUycLkk3MccaX3EnP6' }
    ]
  },
  {
    title: '领取任务并加入协作',
    duration: '第 1 周内',
    detail: '向所在模块接口人认领第一个任务，加入项目日会/周会，走完一次完整交付。',
    points: [
      '第一个任务找本模块接口人确认',
      '项目日会（平台）：vc.feishu.cn/j/448189617',
      '项目周会（ALL）：vc.feishu.cn/j/326621636',
      '遇到问题先查 OpenGrok 代码，再问接口人'
    ],
    tasks: [
      { t: '向本模块接口人认领第一个任务' },
      { t: '加入项目日会（平台）', u: 'https://vc.feishu.cn/j/448189617' },
      { t: '加入项目周会（ALL）', u: 'https://vc.feishu.cn/j/326621636' },
      { t: '凭 taskID 完成一次代码提交并通过 Gerrit 评审', u: 'http://10.0.232.2/gerrit/' },
      { t: '遇到问题先查 OpenGrok 代码，再问接口人', u: 'http://192.168.6.247:8080/source/xref/' }
    ]
  }
];

/* ============ 2. 须知要点卡片 ============ */
var GUIDE_CARDS = [
  {
    icon: 'key',
    category: '账号权限',
    items: [
      '易链：研发代码权限管理 elink.thundersoft.com/#/user/project',
      '禅道：BUG 管理 + 任务管理（项目名 CarOS_Nori_2026），权限见「禅道权限申请流程」',
      'Gerrit：主服务器在北京 IDC，各 site 为 mirror；公钥加在主 Gerrit（找 SCM-王小琪）',
      '权限问题接口人：PM-彭志平、尹晟宇 / TPM-吕洪山、代庆晨'
    ]
  },
  {
    icon: 'env',
    category: '代码与编译',
    items: [
      '分支命名规则：见 wiki《HPC-分支策略》PPT',
      'ADP 分支 ES6：kepler-hampden-nori-v5170r21.1-16-base.xml',
      'A 样分支 ES6：kepler-hampden-nori-v5170r21.1-16-A0base.xml',
      'ES4.1 分支：将 21.1 替换为 1701.1',
      '上手文档：《8x97 HGY ES6 nori 项目快速上手指南》',
      '编译勾选所需镜像类型；VB 注意事项见 wiki'
    ]
  },
  {
    icon: 'chat',
    category: '找谁办事（接口人）',
    items: [
      'Android：隋忠（实境空间-刘哲峰 / 灵动岛、休息室-代庆晨 / AIOS融合-尹一男）',
      'BSP：田鑫（屏幕-WiFi/BT-李仕奇 / GNSS-马克松 / IMU-丁敏）',
      'MCU：赵国辉 ｜ Linux：鲁泽强、李旸',
      'Razor-ware：卓兵、侯仕杰 ｜ Audio：刘志浩',
      '测试：李舒唯 ｜ 台架：申娜、胡朝伟 ｜ 需求：刘明皓',
      '设备：申娜、吕秀丽 ｜ SCM：王小琪'
    ]
  },
  {
    icon: 'tool',
    category: '管理系统速查',
    items: [
      'Gerrit 代码评审：http://10.0.232.2/gerrit/（内网）',
      'OpenGrok 代码检索：http://192.168.6.247:8080/source/xref/（内网）',
      'Jenkins 构建：http://10.0.54.250:8080/（内网，VB/DB 各 job 见 wiki）',
      '飞书资料存档：drive 目录「CarOS_Nori_2026 项目成果物」',
      '邮件组：HPC_TARKINE_All@thundersoft.com'
    ]
  },
  {
    icon: 'rule',
    category: '流程规范',
    items: [
      '入项流程：wiki《入项流程》文档',
      'BUG 处理：《BUG处理流程》（责任者-侯欣桐）',
      '测试：《滴水OS|测试流程规范V2.1》+ 车展测试用例（李舒唯）',
      '禅道权限申请：《禅道权限申请流程》（吕秀丽）',
      '工时调整：《工时调整申请流程》（刘宸旭）',
      '以上文档均可从 wiki「项目重要资料」一节直达'
    ]
  },
  {
    icon: 'doc',
    category: '常用文档入口',
    items: [
      '项目需求：PRD_滴水OS 2.0 / 需求文档 / FeatureList',
      '计划：CarOS_Nori_2026 项目计划表 + 各 WBS',
      '设计文档：飞书设计文档目录（李旸、代庆晨维护）',
      '刷机烧写：8x97 域控 fastboot 刷机手顺等（见 wiki 第九节）',
      '问题跟进：CarOS_Nori_2026 问题跟进表 / 风险&依赖表',
      '全部资料以 wiki 原文第九、十节为准'
    ]
  }
];

/* ============ 3. FAQ 常见问题 ============ */
var FAQ_LIST = [
  {
    q: '代码用哪个分支下载？',
    a: '看你的基线：ES6 用 kepler-hampden-nori-v5170r21.1-16-base.xml（ADP）或 -A0base.xml（A 样）；ES4.1 把版本号 21.1 换成 1701.1。具体下载步骤参照《8x97 HGY ES6 nori 项目快速上手指南》，分支策略见《HPC-分支策略》PPT。'
  },
  {
    q: '研发代码权限在哪里申请？',
    a: '在易链（elink.thundersoft.com/#/user/project）申请项目研发代码权限；禅道权限参照《禅道权限申请流程》；Gerrit 公钥需要添加到北京主服务器上，各 site 的 mirror 只提供下载，找 SCM-王小琪处理。'
  },
  {
    q: 'BUG 提到哪个系统？怎么管理任务？',
    a: '统一用禅道，项目名 CarOS_Nori_2026。禅道主要用于 BUG 管理，任务管理粒度为一级 feature，可以凭 taskID 进行代码提交。BUG 的流转处理见《BUG处理流程》。'
  },
  {
    q: '遇到问题该找谁？',
    a: '先按模块找接口人：Android-隋忠、BSP-田鑫、MCU-赵国辉、Linux-鲁泽强/李旸、Audio-刘志浩、测试-李舒唯、台架-申娜/胡朝伟；权限和项目层面的事找 PM-彭志平、尹晟宇 或 TPM-吕洪山、代庆晨；SCM/Gerrit 问题找王小琪。'
  },
  {
    q: 'Jenkins 构建怎么选 job？',
    a: 'Jenkins 地址 http://10.0.54.250:8080/（内网）。8X97 的 VB 用 8x97_Verify_Build_Parallel_Trigger，8775 的 VB 用 VerifyBuild_for_CarOS；DailyBuild 同理分 8x97 和 8775 两个 job。新 manifest（无 DB 的）CODE_TYPE 选 ALL_USE_NEWCODE，BUILD_MODE 选 FULL_BUILD。'
  },
  {
    q: '工时和周报什么时候填？',
    a: '项目成员每周四、五填写工时和周报到「人员投入计划_周报」。工时调整需走《工时调整申请流程》（刘宸旭）。'
  },
  {
    q: '项目会议怎么加入？',
    a: '项目日会（平台）链接：vc.feishu.cn/j/448189617；项目周会（ALL）链接：vc.feishu.cn/j/326621636。具体时间以飞书日历邀请为准。'
  },
  {
    q: '在哪里查源代码和设计文档？',
    a: '源代码用 OpenGrok：192.168.6.247:8080/source/xref/ 或 10.8.136.217:8180/（内网）。设计文档在飞书设计文档目录（李旸、代庆晨维护）；需求类看 PRD_滴水OS 2.0 和 FeatureList，均在 wiki「项目重要资料」一节有入口。'
  }
];

/* ============ 4. 资料导航（对应 wiki「九、项目重要资料」） ============ */
/* t=文档名 o=责任者 u=直达链接(可选) */
var RESOURCE_GROUPS = [
  {
    name: '立项与需求',
    entries: [
      { t: 'CarOS_Nori_2026 KickOff 资料（内部用）', o: '彭志平、吕洪山', u: 'https://thundersoft.feishu.cn/docx/F7ZTdqHKGo4IwQx6xiXcrrbGnyg' },
      { t: 'PRD_滴水OS 2.0', o: '李涛涛、夏晓、胡帆、方慧琳', u: 'https://thundersoft.feishu.cn/docx/DFH9dHKvlokp2fxV0GKcCSW9nld' },
      { t: 'CarOS_Nori_2026 需求文档', o: '彭志平、刘明皓、吕秀丽', u: 'https://thundersoft.feishu.cn/sheets/Md05sTKqdhoTCYt6Kvycy6HGnrd' },
      { t: '北京车展点检维度 FeatureList', o: '彭志平、刘明皓、吕秀丽' },
      { t: '滴水OS 2.0_Featurelist', o: '彭志平、刘明皓、吕秀丽', u: 'https://thundersoft.feishu.cn/sheets/E3brsPTeRhd4vAtb49PcqGQBnod' }
    ]
  },
  {
    name: '设计 · 计划 · UIUX',
    entries: [
      { t: '项目设计文档目录', o: '李旸、代庆晨', u: 'https://thundersoft.feishu.cn/drive/folder/TqmEfU4AalTJmEdplLucDzavnag?from=space_personal_filelist' },
      { t: '滴水OS_CarOS_Nori_2026 项目计划表.xlsx', o: '彭志平、吕洪山', u: 'https://thundersoft.feishu.cn/file/ZBOsb98KvoVoGNxDtfuc3Z5kndc' },
      { t: 'CarOS_Nori_2026 平台化 WBS', o: '彭志平、吕洪山', u: 'https://thundersoft.feishu.cn/base/I1bTbSqn6a9gXNsgDoZcMik4nHe' },
      { t: 'CarOS_Nori_2026 北京车展 WBS', o: '彭志平、吕洪山', u: 'https://thundersoft.feishu.cn/base/OMU6b2baCaGylRsyMG9c6BnrndO' },
      { t: 'UX 设计 AquaDrive-OS-2.0-Design', o: '周海翔' },
      { t: 'UI 设计 Reality-Space-DEMO-2.0-2025', o: '周海翔' }
    ]
  },
  {
    name: '流程规范（新人必读）',
    entries: [
      { t: '《入项流程》', o: '吕秀丽', u: 'https://thundersoft.feishu.cn/docx/P5pGdKCeUo3ptkxYAeVcVHgSnSc' },
      { t: '《禅道权限申请流程》', o: '吕秀丽', u: 'https://thundersoft.feishu.cn/docx/QtcxdvBGToBpDaxt8TicZsHfnng' },
      { t: '《工时调整申请流程》', o: '刘宸旭', u: 'https://thundersoft.feishu.cn/docx/PFv0dHH5eo4M2QxCyUac8kZnnBh' },
      { t: '《BUG 处理流程》', o: '侯欣桐', u: 'https://thundersoft.feishu.cn/docx/MaapdSXSGoly6FxJo80cf0B4nhe' },
      { t: '《滴水OS|测试流程规范 V2.1》', o: '李舒唯', u: 'https://thundersoft.feishu.cn/docx/XKX1dE07woxnhNxsLRDcTjMTnTf' },
      /* 链接为飞书检索到的「滴水OS2.1台架 | 北京车展测试用例」，疑似该文档已更名，待核实 */
      { t: '《滴水OS2.0 北京车展测试用例》', o: '李舒唯', u: 'https://thundersoft.feishu.cn/sheets/C2LzsHqpBhWoXOtYR3kc5swNncg' }
    ]
  },
  {
    name: '烧写与设备',
    entries: [
      { t: '8397 使用 xpcat 刷机流程', o: '李旸、吕洪山', u: 'https://thundersoft.feishu.cn/wiki/Cc3bwUcT3iLTUvkKiPVcGUx7nmd' },
      { t: '8x97 域控 fastboot 刷机手顺', o: '李旸、吕洪山', u: 'https://thundersoft.feishu.cn/wiki/Kmrgw3fJxiysM1ke4N7cG40Vnme' },
      { t: '高通 8775 设备烧写', o: '李旸、吕洪山' },
      { t: '高通 HPC_Tarkine 车机样板接口连线规则及刷机流程', o: '李旸、吕洪山', u: 'https://thundersoft.feishu.cn/wiki/XLb4wl7XTiKPorkoSencpH94n1e' },
      { t: 'CarOS_Nori8775platform 设备管理表', o: '尹晟宇、吕秀丽' }
    ]
  },
  {
    name: '跟踪 · 会议 · 存档',
    entries: [
      { t: 'CarOS_Nori_2026 问题跟进表', o: 'PM/TPM/ARCH', u: 'https://thundersoft.feishu.cn/sheets/CFYIstoj0hR4fQtbdfIcpTRrnsf' },
      { t: 'CarOS_Nori_2026 风险 & 依赖表', o: 'PM/TPM/ARCH', u: 'https://thundersoft.feishu.cn/sheets/DY4rsRiNqhA4CStjKuCcm6jRngd' },
      { t: '项目日会（平台）', o: 'PM-彭志平、尹晟宇', u: 'https://vc.feishu.cn/j/448189617' },
      { t: '项目周会（ALL）', o: 'PM-彭志平、尹晟宇', u: 'https://vc.feishu.cn/j/326621636' },
      { t: '项目成果物（飞书目录）', o: 'PM/TPM', u: 'https://thundersoft.feishu.cn/drive/folder/Ns14fnVgdlkUvUdTASDcC2bfnrC' }
    ]
  }
];

/* —— 直达链接待补充（飞书检索未命中，可能在云盘文件夹内或需更高权限）：
   北京车展点检维度 FeatureList、AquaDrive-OS-2.0-Design、Reality-Space-DEMO-2.0-2025、
   高通 8775 设备烧写、CarOS_Nori8775platform 设备管理表。
   拿到链接后在上方对应条目补 u 字段即可。 */

/* ============ 5. 系统速查（对应 wiki「十、项目管理系统」） ============ */
/* n=系统名 d=用途 u=主入口(可选) i=是否内网 o=维护人 x=补充说明(可选) */
var SYSTEM_LIST = [
  {
    n: '飞书',
    d: '项目资料存档 / 文档协作 / 审批沟通',
    u: 'https://thundersoft.feishu.cn/drive/folder/Ns14fnVgdlkUvUdTASDcC2bfnrC',
    i: false,
    o: 'PM-彭志平、尹晟宇；TPM-吕洪山、代庆晨',
    x: '资料存档位置见左侧成果物目录'
  },
  {
    n: '禅道',
    d: 'BUG 管理 + 任务管理；任务粒度一级 feature，可凭 taskID 提交代码',
    i: false,
    o: 'PM-彭志平、尹晟宇；TPM-吕洪山、代庆晨',
    x: '项目名：CarOS_Nori_2026'
  },
  {
    n: 'DB / VB',
    d: '内部软件发版（各 site mirror 存放）',
    u: 'https://pan.thundersoft.com/web/index.html#group/329463/2104465255563264/CarOS_Nori_2026/CarOS_Nori_2026/2104465255563264/group%3A2104465255563264%2F/0.9711031691367594',
    i: false,
    o: 'PM-彭志平'
  },
  {
    n: 'Gerrit',
    d: '代码托管与 Code Review；公钥需加在北京主服务器，各 site 为 mirror 仅提供下载',
    u: 'http://10.0.232.2/gerrit/',
    i: true,
    o: 'SCM-王小琪'
  },
  {
    n: 'Jenkins',
    d: 'CI 构建；8X97 / 8775 的 VB、DB 各自有独立 job',
    u: 'http://10.0.54.250:8080/',
    i: true,
    o: 'SCM-王小琪',
    x: '新 manifest（无 DB）选 CODE_TYPE=ALL_USE_NEWCODE、BUILD_MODE=FULL_BUILD'
  },
  {
    n: 'OpenGrok',
    d: '源码检索（xref）',
    u: 'http://192.168.6.247:8080/source/xref/',
    i: true,
    o: 'SCM-王小琪、隋忠'
  },
  {
    n: '邮件组',
    d: '项目邮件沟通',
    i: false,
    o: 'PM-彭志平、尹晟宇',
    x: 'HPC_TARKINE_All@thunderxauto.com / @thundersoft.com'
  },
  {
    n: '易链',
    d: '研发代码权限管理',
    u: 'https://elink.thundersoft.com/#/user/project',
    i: false,
    o: 'PM/TPM/ARCH'
  },
  {
    n: '工时周报',
    d: '每周四、五填写工时与周报',
    u: 'https://thundersoft.feishu.cn/wiki/B2P7ws5oYiUycLkk3MccaX3EnP6',
    i: false,
    o: 'PM-彭志平、尹晟宇',
    x: '填写到《人员投入计划_周报》'
  }
];

/* ============ 6. 知识库（注入 AI 助手 system prompt） ============ */
/* 内容 = CarOS_Nori_2026_wiki 全文，助手据此回答细节问题 */
var KNOWLEDGE_BASE = [
  '【CarOS_Nori_2026 项目入项知识库（来源：项目飞书 wiki 全文 + 真实链接）】',
  '',
  '一、项目背景：由滴水智行发起，基于 8X97 平台、软件 5170-21.1 基线为 base 的内部 POC 项目。以 8X97 平台化为基座，实现新版实境空间、全新休息室、AIOS 与座舱融合等核心功能的滴水OS 2.0；展示形式为支持远近端屏幕交互的台架。',
  '主要里程碑：4 月底北京车展、10 月下旬闭门会、27 年 1 月初北美 CES。',
  '',
  '二、项目目标：1) Ecokpit 10.0 & 滴水OS 2.0 功能迭代；2) 8X97 A 样周边件点亮和 BSP 支持；3) 8X97 平台上 Linux 系统功能实现和移植；4) AIOS 座舱侧功能开发；5) HGY & HQX 基线升级；6) 实现全新实境空间功能；7) 平台化任务开发；8) 全新休息室。',
  '',
  '三、项目范围：',
  '3.1 范围：8X97 平台化任务开发、Android 媒体等架构调整、BSP、MCU（上电）、LINUX、Kanzi UI/UE 集成、视觉、声学、生态、实境空间融合、全新休息室、AIOS 功能开发、AIOS 模型部署支持。',
  '3.2 可交付成果及验收标准：文档=概要设计/系统架构/重点问题跟踪文档；北京车展=8X97 台架+双 AIBOX；闭门会/CES=TBD；验收标准=系统稳定，无 S、A级 bug。',
  '',
  '四、项目计划：4.1 整体计划见 wiki；4.2 开发计划见《滴水OS_CarOS_Nori_2026项目计划表.xlsx》。',
  '',
  '五、项目设备：5.1 设备需求统计见 wiki 与《CarOS_Nori8775platform 设备管理表》（尹晟宇、吕秀丽）。',
  '',
  '六、项目团队（模块-接口人-成员）：',
  '1. Android-隋忠：实境空间-刘哲峰；灵动岛-代庆晨；AIUI-刘宸旭；AIOS融合-尹一男；全新休息室-代庆晨；组件-隋忠。',
  '2. BSP-田鑫：屏幕-李仕奇、马克松、丁敏；WIFI、BT-李仕奇；GNSS-马克松；IMU-丁敏。',
  '3. MCU-赵国辉。',
  '4. Linux-鲁泽强/李旸：Middle-崔柳、APP-胡浦俊、system-哲峰、曹阳、泽强。',
  '5. Razor-ware-卓兵、侯仕杰。',
  '6. Audio-刘志浩。',
  '7. 测试-李舒唯。',
  '8. 台架-申娜/胡朝伟。',
  '9. 需求管理-刘明皓。',
  '10. 设备管理-申娜、吕秀丽。',
  'PM-彭志平、尹晟宇；TPM-吕洪山、代庆晨；ARCH-李旸、刘哲峰。',
  '',
  '七、代码下载及编译：分支命名规则和策略见《HPC-分支策略-20230418.pptx》。VB 有注意事项；Qfile & Fastboot 镜像编译时注意勾选自己需要的镜像类型（参考 HPC_build.jpeg）。',
  '分支说明：ADP 分支 ES6=kepler-hampden-nori-v5170r21.1-16-base.xml；ES4.1=kepler-hampden-nori-v5170r1701.1-16-base.xml。A 样分支 ES6=kepler-hampden-nori-v5170r21.1-16-A0base.xml；ES4.1=kepler-hampden-nori-v5170r1701.1-16-A0base.xml。',
  '快速上手指南：《8x97 HGY ES6 nori 项目快速上手指南》https://thundersoft.feishu.cn/docx/YXC2dQj6DoPcPLx2u84c9WE0n4g 、《8x97 HGY ES4.1 A0base 项目快速上手指南》、《8x97 HGY ES4.1 nori 项目快速上手指南》、《8x97 HGY REL1 nori 项目快速上手指南》。分支策略相关可参考 HPC_Tarkine Wiki https://thundersoft.feishu.cn/docx/BVGtdTBcEoxh3Nx2FnkcNfhBnhh。',
  '',
  '八、项目成果物（飞书目录）：https://thundersoft.feishu.cn/drive/folder/Ns14fnVgdlkUvUdTASDcC2bfnrC',
  '',
  '九、项目重要资料：',
  '1. KickOff 资料（彭志平、吕洪山）：https://thundersoft.feishu.cn/docx/F7ZTdqHKGo4IwQx6xiXcrrbGnyg',
  '2. 需求：PRD_滴水OS 2.0 https://thundersoft.feishu.cn/docx/DFH9dHKvlokp2fxV0GKcCSW9nld、CarOS_Nori_2026 需求文档 https://thundersoft.feishu.cn/sheets/Md05sTKqdhoTCYt6Kvycy6HGnrd、北京车展点检维度 FeatureList、滴水OS 2.0_Featurelist https://thundersoft.feishu.cn/sheets/E3brsPTeRhd4vAtb49PcqGQBnod（李涛涛、夏晓、胡帆、方慧琳；彭志平、刘明皓、吕秀丽）。',
  '3. 设计文档飞书目录 https://thundersoft.feishu.cn/drive/folder/TqmEfU4AalTJmEdplLucDzavnag（李旸、代庆晨）；计划：项目计划表.xlsx https://thundersoft.feishu.cn/file/ZBOsb98KvoVoGNxDtfuc3Z5kndc、平台化 WBS https://thundersoft.feishu.cn/base/I1bTbSqn6a9gXNsgDoZcMik4nHe、北京车展 WBS https://thundersoft.feishu.cn/base/OMU6b2baCaGylRsyMG9c6BnrndO（彭志平、吕洪山）；UIUX：AquaDrive-OS-2.0-Design（UX）、Reality-Space--DEMO-2.0-2025（UI）（周海翔）。',
  '4. 烧写指南：8397 使用 xpcat 刷机流程 https://thundersoft.feishu.cn/wiki/Cc3bwUcT3iLTUvkKiPVcGUx7nmd、8x97 域控 fastboot 刷机手顺 https://thundersoft.feishu.cn/wiki/Kmrgw3fJxiysM1ke4N7cG40Vnme、高通 8775 设备烧写、高通 HPC_Tarkine 车机样板接口连线规则以及刷机流程 https://thundersoft.feishu.cn/wiki/XLb4wl7XTiKPorkoSencpH94n1e（李旸、吕洪山）。',
  '5. 设备管理表：CarOS_Nori8775platform 设备管理表（尹晟宇、吕秀丽）。',
  '6. 项目日会 vc.feishu.cn/j/448189617（平台）、项目周会 vc.feishu.cn/j/326621636（ALL）。',
  '8. 风险&依赖：CarOS_Nori_2026 问题跟进表 https://thundersoft.feishu.cn/sheets/CFYIstoj0hR4fQtbdfIcpTRrnsf、风险&依赖表 https://thundersoft.feishu.cn/sheets/DY4rsRiNqhA4CStjKuCcm6jRngd（PM/TPM/ARCH）。',
  '9. 重要流程：测试《滴水OS|测试流程规范V2.1》https://thundersoft.feishu.cn/docx/XKX1dE07woxnhNxsLRDcTjMTnTf（李舒唯）；测试 case《滴水OS2.0 北京车展测试用例》https://thundersoft.feishu.cn/sheets/C2LzsHqpBhWoXOtYR3kc5swNncg（李舒唯）；bug 处理《BUG处理流程》https://thundersoft.feishu.cn/docx/MaapdSXSGoly6FxJo80cf0B4nhe（侯欣桐）；入项《入项流程》https://thundersoft.feishu.cn/docx/P5pGdKCeUo3ptkxYAeVcVHgSnSc（吕秀丽）；禅道权限申请《禅道权限申请流程》https://thundersoft.feishu.cn/docx/QtcxdvBGToBpDaxt8TicZsHfnng（吕秀丽）；工时调整《工时调整申请流程》https://thundersoft.feishu.cn/docx/PFv0dHH5eo4M2QxCyUac8kZnnBh（刘宸旭）。',
  '',
  '十、项目管理系统：',
  '1. 飞书（项目资料存档）：https://thundersoft.feishu.cn/drive/folder/Ns14fnVgdlkUvUdTASDcC2bfnrC（PM-彭志平、尹晟宇；TPM-吕洪山、代庆晨；ARCH-李旸、刘哲峰）。',
  '2. 禅道：BUG 管理；任务粒度一级 feature，可凭 taskID 提交代码；项目名 CarOS_Nori_2026。',
  '3. DB/VB（内部软件发版，各 site mirror）云盘：CarOS_Nori_2026 https://pan.thundersoft.com/web/index.html#group/329463/2104465255563264/CarOS_Nori_2026/CarOS_Nori_2026/2104465255563264/group%3A2104465255563264%2F/0.9711031691367594 ；CarOS_Nori https://pan.thundersoft.com/web/index.html#group/325241/1965488703799296/CarOS_Nori/CarOS_Nori/1965488703799296/group%3A1965488703799296%2F/0.7001324923392481（PM-彭志平）。',
  '4. Gerrit：主服务器北京 IDC，各 site 为 mirror 只提供下载，公钥需加在主 Gerrit；地址 http://10.0.232.2/gerrit/（SCM-王小琪）。',
  '5. Jenkins（内网 http://10.0.54.250:8080/）：8X97VB=8x97_Verify_Build_Parallel_Trigger；8775VB=VerifyBuild_for_CarOS；8X97DB=DailyBuild_8x97_for_Airliner_Parallel；8775DB=DailyBuild_for_Airliner_Parallel。新 manifest（无 DB）CODE_TYPE 用 ALL_USE_NEWCODE，BUILD_MODE 用 FULL_BUILD（SCM-王小琪）。',
  '6. OpenGrok（源码检索 xref）：http://192.168.6.247:8080/source/xref/ 或 http://10.8.136.217:8180/（王小琪、隋忠）。',
  '7. 邮件组：HPC_TARKINE_All@thunderxauto.com / HPC_TARKINE_All@thundersoft.com（PM-彭志平、尹晟宇）。',
  '8. 易链（研发代码权限管理）：https://elink.thundersoft.com/#/user/project。',
  '9. 工时：每周四、五填写工时和周报到《人员投入计划_周报》https://thundersoft.feishu.cn/wiki/B2P7ws5oYiUycLkk3MccaX3EnP6。',
  '',
  '十一、入项流程要点（来源《入项流程》https://thundersoft.feishu.cn/docx/P5pGdKCeUo3ptkxYAeVcVHgSnSc，吕秀丽；文中代码为示例，具体以实际项目为准）：',
  '1. 配置电脑编译环境：sudo apt-get install python2.7 bison g++-multilib git gperf libxml2-utils make zip flex curl libncurses5-dev libssl-dev zlib1g-dev gawk minicom openjdk-8-jdk exfat-fuse device-tree-compiler liblz4-tool gcc openssl m4 lib32stdc++6 lib32z1 bc picocom android-tools-adb android-tools-fastboot。',
  '2. 配置 git：sudo apt-get install git core；git config --global user.name 你的ldap用户名；git config --global user.email 你的ldap用户名@thundersoft.com；ssh-keygen -t rsa -C 邮箱；将 ~/.ssh/id_rsa.pub 内容添加到 Gerrit 服务器（如 http://10.2.12.42/gerrit）。',
  '3. 配置 repo：git clone git://192.168.100.149/tools/repo.git；sudo mv repo/repo /usr/bin/；sudo chmod a+x /usr/bin/repo；repo init -u ssh:ldap用户名@192.168.100.149:29418/platform/manifest -b 分支 -m manifest.xml；repo sync --no-tags -c -j3。',
  '4. 易链申请入项与代码下载权限：https://elink.thundersoft.com 搜索项目名申请加入并申请代码下载权限。',
  '5. 代码下载后编译参考《CarOS入项指南（小白菜版）》。',
  '',
  '十二、禅道权限申请流程（来源 https://thundersoft.feishu.cn/docx/QtcxdvBGToBpDaxt8TicZsHfnng，吕秀丽）：',
  '1. 登录 https://autozentao.thundersoft.com/biz，账号=入职创建的 ldap 账号与密码。',
  '2. 开通角色权限：将信息提供给 @王甜甜 开通角色权限。',
  '3. 项目权限：角色权限开通后若看不到项目，联系项目 PM 添加项目权限。',
  '4. PM 开通项目权限：禅道→执行→选项目→团队→团队管理，为开发人员添加权限。',
  '5. 常见问题见《禅道常见问题》。',
  '',
  '十三、工时调整申请流程（来源 https://thundersoft.feishu.cn/docx/PFv0dHH5eo4M2QxCyUac8kZnnBh，刘宸旭）：',
  '1. 飞书左侧→集团工作平台→我的门户→工时，进入工时管理。',
  '2. 选日期范围→搜索查询工时，确认每天合计 8.0、时间与项目正确。',
  '3. 异常则点「工时调整/非常规工时调整」：上周工时调整需在本周三 23:59 前提交；更早时段用「非常规工时调整」。',
  '4. 填调整表：调整项目名+类型(调出=减少该项目工时/调入=增加)+姓名+时间；A 转 B 项目需填两次(一次 A 转出、一次 B 转入)；外包/特殊员工在对应位置填写。',
  '5. 提交或保存；在「我的请求」管理流程。',
  '',
  '十四、BUG 处理流程（来源《BUG处理流程》https://thundersoft.feishu.cn/docx/MaapdSXSGoly6FxJo80cf0B4nhe，侯欣桐）：',
  '角色：Bug 管理员(全局监控/推动/协调多模块/组织专题评审)、模块负责人、研发、质量管理、测试。',
  '状态流转：New→Assigned→In Progress→Resolved-Fixed→Verifying→Verified/Reopened→Closed；其它 Pending/Duplicate/Won\'t Fix/Not a Bug。',
  '时间要求(测试优先级 A/B/C)：提交 A≤1h/B≤4h；接收确认 A≤30min/B≤2h；初步分析 A≤2h/B≤4h(手中 Bug≤5 个 4h，>5 个 1 工作日)；修复 A≤1 工作日/B≤3 工作日；验收 A≤4h/B≤1 工作日；最终确认 A≤1 工作日/B≤2 工作日。',
  '双维度优先级：测试维度 A/B/C(严重程度) + 研发维度 P0/P1/P2/P3；长期未解自动升级(P3>1 月→P2，P2>2 周→P1，超期 50% 升 1 级)。',
  '提 Bug 必填证据：截图(现象/操作路径/错误)+logcat 日志(含问题前后 5min，命名 [Bug号]_[日期]_[简述].log)+录屏(A/B 必需,720p+,1-3min)+环境信息(版本/设备/系统/网络/复现概率:必现/高频>70%/中频30-70%/低频<30%)。',
  '研发修复后必交自测报告：Bug ID/修复人/版本/commit；根因；修复方案；自测(原场景+边界+回归+性能)；结论；附件(diff/日志/截图)。',
  '模块负责人每 2 天跟踪 1 次，每周五 Bug 周报；状态更新需含状态/进度%/工作内容/问题/阻塞/下一步/预计完成/风险。',
  '多模块 Bug：Bug 管理员识别→分层分析(界面/业务逻辑/数据服务/系统硬件)→责任划分(主责模块+子任务树)→并行开发→集成联调→整体验证。',
  '专题评审触发：超期 3 天/责任争议/重大决策/影响扩大；30min 内发起，2h 内召开，限时 30-60min，会后 4h 出纪要。验收不通过→Reopened，优先级自动升一级，重新分配原研发。',
  '',
  '十五、测试流程规范 V2.1（来源《滴水OS|测试流程规范V2.1》https://thundersoft.feishu.cn/docx/XKX1dE07woxnhNxsLRDcTjMTnTf，李舒唯）：',
  '流程：需求评审(PRD/UI-UE 设计，拉齐理解)→用例设计与评审(场景法+等价类+边界值，轻量用例，覆盖核心/异常/兼容)→用例执行→BUG 管理。',
  '用例执行：每周输出一版结果，逐模块测试，核心优先；BUG 及时录禅道(等级/复现步骤/预期)，贴 bug 路径到测试报告；测试接口人每 1-2 天同步进度质量，每周汇总报告。',
  'BUG 录入模板(禅道)：标题=【平台/硬件版本】+【模块】+核心现象+(复现率如 5/5)；正文必填【测试环境】(如 8775mini+aibox+远端屏+中控屏；软件版本:域控镜像/installation/VR/aibox/模型/特殊推包)【操作步骤】【测试结果】【期待结果】【恢复】【发生时间】【发生频率】【log及复现视频】【周边确认】；必填所属模块/严重程度/优先级/bug 类型；大文件传云盘贴路径。',
  'Bug Reopen 规范：只有现象和手法一模一样才 reopen，否则另起 bug；reopen 后更新正文所有必填+【回归信息】(首次/第二次/第三次发生的时间与 log)；开发确认非同源需另起票时，开发在解决方案 comment 后指回测试，测试新起票并在当前票备注关联新票 link 后关闭当前票。Bug 严重等级见《软件测试缺陷等级定义.xlsx》。',
  '',
  '十六、烧写与设备：',
  '(1) 8397 使用 xpcat 刷机流程（来源 https://thundersoft.feishu.cn/wiki/Cc3bwUcT3iLTUvkKiPVcGUx7nmd，李旸、吕洪山）：申请高通账号(createpoint.qti.qualcomm.com，公司邮箱注册，登录时 8x97 地区选 TX)；装 QPM3(Linux: sudo dpkg -i QualcommPackageManager3.3.0.127.1.Linux-x86.deb)，登录后 Tools 搜 pcat 安装并下载驱动；刷机：adb 线接 USB0→拆板两开关拨 on 开 9008 模式→上电→xPCATpp 左上连接设备→选版本、改 UFS 类型→点下载→完成后断电、开关拨回、adb 线换 USB2、上电。',
  '(2) 8x97 域控 fastboot 刷机手顺（来源 https://thundersoft.feishu.cn/wiki/Kmrgw3fJxiysM1ke4N7cG40Vnme，李旸、吕洪山）：主机接 fastboot 与 linux 系统接口，进入前关闭域控电源；sudo minicom 后开电源并快速按↓直到不弹加载代码；新终端 fastboot devices 查看是否进入；脚本位置 SA8797P.HGY.5.1.7.0/common/build，执行 python/python3 fastboot_complete.py --st=ufs --pf=nonsafe_ivi_pvm_lagvm；完成后接 adb 接口、重新上电、完成其他刷写。',
  '(3) 滴水OS|8775 A 样板刷机指南 V6.0（来源 https://thundersoft.feishu.cn/wiki/XLb4wl7XTiKPorkoSencpH94n1e，李旸、吕洪山）：',
  '  刷写层级：改基线需刷 SAIL/CDT/UFS Provision/SOC，正常 SOC 更新只刷 content.xml；全套顺序 CDT→UFS provision→content.xml。',
  '  常见问题：只刷 SOC Meta 失败=版本间 data 分区或基线差异，需重刷 UFS provision 或全套；系统起不来看不到 adb devices=USB 驱动不足，换强驱动 PC/供电 hub/typeC 直连。',
  '  基线版本：44.1a(SAIL=SPINOR.7z；MCU A0/A1=MCUImage20241130_A1.s19，A2+=MCU-RB8-8775platform-CarOs_Alga-Develop.zip；CDT=LEMANSAU_ADP_0.1.0.bin)；11.1a(SAIL=Sail-11.1-20250121_IPCC-Patch.7z；MCU A0/A1=product_0123_A1.s19，A2+=product_0120.s19；CDT=cdt.bin)。',
  '  Fastboot 刷写：接电源/网线或串口/ADB；ssh root@192.168.10.67 进 QNX，reset -f & 进 fastboot(或串口长按↓/q)；fastboot devices 确认；进 SOC 版本文件夹根目录执行 fastboot_flash.bat 或 fastboot_flash.sh；重启。',
  '  QFIL 刷写(SAIL/CDT/UFS Provision/SOC)：短接引脚进 EDL(9008)；SAIL 选 Flat build+prog_firehose_ddr.elf+ramprogram0.xml/patch0.xml+Storage Type=spinor(必须选 spinor 否则系统无法启动)；CDT 替换 rawprogram3.xml 中 cdt 文件名；UFS Provision 勾选 Provision+provision_default.xml；SOC Meta 选 contents.xml 点 Download Content。',
  '  PCAT 刷写(首次空板)：装 QPM/QUD；SAIL 选 meta contents.xml+pro_firehose_ddr.elf+MEMORY_TYPE_SPINOR+flavor sail_nor；CDT/UFS Provision/SOC 类似。',
  '  SoftSKU AAAA 激活：sku_cli getOemId 查(OEMID 0x0 需先刷 OEM_ID，一次性不可逆)；fastboot flash secdata sec_oemid_only_8775.elf；放 pfm 到 /mnt/etc/softsku/；sku_cli -u AAAA -b /mnt/etc/softsku/ activate；SOC 重刷后需再次激活。',
  '  8775 端侧模型部署：adb push RubikM 到 /data/local/tmp/；chmod a+x ./*；./start_server_Minicpm.sh& 与 ./start_server_Gesture.sh&；htp_backend_ext_config.json 的 device_id 0=第一块 NPU/1=第二块；改 init.qcom.rc 加自启服务后 adb push 回 /vendor/etc/init/hw/；ps -ef|grep RubikM 检查。',
  '  Installation 版本：adb root/remount/reboot/remount 后 py installtion.py；AVM 虚拟流用 Windows 跑 push.bat；后排屏 USB touch 绑定改 /vendor/etc/input-port-associations.xml(display129=大屏,130/3=后排屏，touch 反了互换 130/3)。',
  '  调试：安卓 adb logcat>log.txt；QNX 配 PC IPv4 192.168.10.XXX，ping 192.168.10.67，ssh root@192.168.10.67，slog2info>log.txt。',
  '',
  '附：2026 北京车展 wiki、滴水 2.0 北京车展显示数据格式定义（见 wiki 末尾相关节点）。'
].join('\n');
