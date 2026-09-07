/* ============================================================
   config.js —— 默认配置（可被页面设置面板中的 localStorage 覆盖）
   ============================================================ */

var OB_CONFIG = {
  /* LLM 接口：OpenAI 兼容 Chat Completions 地址。
     默认 DeepSeek；如需切换 OpenAI，改为
     https://api.openai.com/v1/chat/completions；切换智谱 GLM 改为
     https://open.bigmodel.cn/api/paas/v4/chat/completions（在页面设置面板中修改） */
  apiBase: 'https://api.deepseek.com/chat/completions',

  /* 默认模型名（DeepSeek deepseek-chat；OpenAI 可改为 gpt-4o-mini，智谱可改为 glm-4-flash 等） */
  model: 'deepseek-chat',

  /* 请求超时（毫秒） */
  timeout: 60000,

  /* 历史消息保存上限（条数，超出后从最旧开始截断） */
  maxHistory: 50,

  /* 原始文档外链（飞书 wiki，需登录访问） */
  wikiUrl: 'https://thundersoft.feishu.cn/docx/WaSedIF3AoAZPax7fwKcSF9EnVf?from=from_copylink',

  /* localStorage 键名 */
  ls: {
    apiKey: 'ob-api-key',
    apiBase: 'ob-api-base',
    model: 'ob-model',
    history: 'ob-chat-history',
    checklist: 'ob-checklist',
    theme: 'ob-theme'
  }
};
