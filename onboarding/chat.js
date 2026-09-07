/* ============================================================
   chat.js —— 悬浮 AI 对话助手
   · 面板开关 / 消息渲染 / 建议问题
   · callLLM：OpenAI 兼容 Chat Completions（SSE 流式）
   · system prompt = 角色设定 + KNOWLEDGE_BASE（data.js）
   · 历史持久化 localStorage（截断至 maxHistory）
   ============================================================ */
(function () {
  'use strict';

  var $ = function (s) { return document.querySelector(s); };

  /* ---------- 配置读取（localStorage 优先，config.js 兜底） ---------- */
  function cfg() {
    return {
      apiKey: localStorage.getItem(OB_CONFIG.ls.apiKey) || '',
      apiBase: localStorage.getItem(OB_CONFIG.ls.apiBase) || OB_CONFIG.apiBase,
      model: localStorage.getItem(OB_CONFIG.ls.model) || OB_CONFIG.model
    };
  }

  /* ---------- system prompt 组装 ---------- */
  function buildSystemPrompt() {
    var kb = (typeof KNOWLEDGE_BASE !== 'undefined') ? KNOWLEDGE_BASE : '';
    return [
      '你是「项目入项助手」，专门帮助新加入 CarOS_Nori_2026 项目的成员快速了解入项须知。',
      '',
      '回答要求：',
      '1. 优先且仅依据下方《项目入项知识库》回答；知识库中给出具体文档名、责任人、链接（飞书/内网地址）的，务必在回答中引用，让新人能直接点击或找人，不要泛泛而谈。',
      '2. 知识库中未覆盖的信息，明确说明「知识库未覆盖」，并建议咨询对应接口人或导师，不要编造。',
      '3. 用简体中文，简洁、分点、可操作；涉及流程按步骤给出；涉及系统/文档给出链接或入口；涉及找人给出接口人姓名。',
      '4. 若问题与项目入项无关，礼貌地把话题引导回入项相关内容。',
      '',
      '《项目入项知识库》：',
      kb
    ].join('\n');
  }

  /* ==========================================================
     历史消息管理（只保存 user/assistant 轮次，不含 system）
     ========================================================== */
  var history = [];
  function loadHistory() {
    try {
      var raw = localStorage.getItem(OB_CONFIG.ls.history);
      var arr = raw ? JSON.parse(raw) : [];
      if (Array.isArray(arr)) history = arr; else history = [];
    } catch (e) { history = []; }
  }
  function saveHistory() {
    try {
      localStorage.setItem(OB_CONFIG.ls.history, JSON.stringify(
        history.slice(-OB_CONFIG.maxHistory)
      ));
    } catch (e) {}
  }

  /* ==========================================================
     callLLM —— OpenAI 兼容接口，SSE 流式
     messages: [{role, content}]
     ========================================================== */
  function callLLM(messages, onChunk, onDone, onError) {
    var c = cfg();
    if (!c.apiKey) {
      onError('KEY_MISSING');
      return null;
    }

    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, OB_CONFIG.timeout || 60000);

    fetch(c.apiBase, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + c.apiKey
      },
      body: JSON.stringify({
        model: c.model,
        messages: messages,
        stream: true,
        temperature: 0.3
      })
    }).then(function (res) {
      clearTimeout(timer);
      if (!res.ok) {
        return res.text().then(function (t) {
          throw { code: 'HTTP_' + res.status, detail: t.slice(0, 300) };
        });
      }
      if (!res.body) { // 不支持流式时退化为整体解析
        return res.json().then(function (data) {
          var text = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || '';
          onChunk(text);
          onDone();
        });
      }

      var reader = res.body.getReader();
      var decoder = new TextDecoder('utf-8');
      var buf = '';
      var full = '';

      function pump() {
        return reader.read().then(function (r) {
          if (r.done) { onDone(full); return; }
          buf += decoder.decode(r.value, { stream: true });
          var lines = buf.split('\n');
          buf = lines.pop(); // 末尾可能是不完整行，留在缓冲
          lines.forEach(function (line) {
            line = line.trim();
            if (line.indexOf('data:') !== 0) return;
            var payload = line.slice(5).trim();
            if (!payload || payload === '[DONE]') return;
            try {
              var json = JSON.parse(payload);
              var delta = json.choices && json.choices[0] &&
                          (json.choices[0].delta || json.choices[0].message);
              var piece = delta && (delta.content || '');
              if (piece) { full += piece; onChunk(piece); }
            } catch (e) { /* 忽略无法解析的行 */ }
          });
          return pump();
        });
      }
      return pump();
    }).catch(function (err) {
      clearTimeout(timer);
      if (err && err.code) {
        onError(err.code + (err.detail ? ':' + err.detail : ''));
      } else if (err && err.name === 'AbortError') {
        onError('TIMEOUT');
      } else {
        onError('NETWORK');
      }
    });

    return controller;
  }

  /* ==========================================================
     UI 渲染
     ========================================================== */
  var panel, body, input, sendBtn, fab, statusEl;

  function msgHtml(role, text, cls) {
    return '<div class="msg ' + role + '">' +
      '<span class="m-ava">' + (role === 'ai' ? 'AI' : '我') + '</span>' +
      '<div class="m-bubble' + (cls ? ' ' + cls : '') + '">' + text + '</div>' +
    '</div>';
  }

  function appendMsg(role, text, cls) {
    var div = document.createElement('div');
    div.innerHTML = msgHtml(role, text, cls);
    var el = div.firstChild;
    body.appendChild(el);
    scrollBottom();
    return el;
  }

  function scrollBottom() {
    body.scrollTop = body.scrollHeight;
  }

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function welcomeMsg() {
    if (history.length === 0) {
      appendMsg('ai',
        '你好！我是入项助手 👋\n我可以回答关于本项目入项流程、账号权限、环境配置、规范约定等问题。\n\n' +
        '先在右上角 ⚙ 设置中填入 API Key（如 DeepSeek deepseek-chat Key）即可开始提问。');
    }
  }

  /* ---------- 建议问题 ---------- */
  var SUGGESTS = [
    '入项流程有哪些步骤？',
    '权限申请怎么提交？多久开通？',
    '本地环境依赖装失败怎么办？',
    '第一个任务怎么选？'
  ];
  function renderSuggests() {
    var wrap = $('#chat-suggest');
    wrap.innerHTML = SUGGESTS.map(function (s) {
      return '<button class="suggest-chip">' + esc(s) + '</button>';
    }).join('');
    wrap.addEventListener('click', function (ev) {
      var chip = ev.target.closest('.suggest-chip');
      if (chip && !busy) {
        input.value = chip.textContent;
        send();
      }
    });
  }

  /* ---------- 错误提示映射 ---------- */
  function errorText(code) {
    if (code === 'KEY_MISSING') {
      return '⚠ 还未配置 API Key。点击右上角 ⚙ 打开设置，填入你的 Key（智谱/OpenAI 等兼容接口均可）。';
    }
    if (code === 'HTTP_401') return '⚠ API Key 无效或已过期（401），请到设置中检查。';
    if (code === 'HTTP_429') return '⚠ 请求过于频繁或额度不足（429），稍后再试。';
    if (code === 'TIMEOUT') return '⚠ 请求超时，请稍后重试或更换模型。';
    if (code === 'NETWORK') return '⚠ 网络错误：无法连接接口地址。若为内网环境请检查代理或更换可访问的接口。';
    var m = /^HTTP_(\d+)/.exec(code);
    if (m) return '⚠ 接口返回错误 ' + m[1] + '，请检查接口地址与模型名。' + (code.split(':')[1] ? '\n' + code.split(':')[1] : '');
    return '⚠ 出现未知错误：' + code;
  }

  /* ==========================================================
     发送与接收
     ========================================================== */
  var busy = false;

  function send() {
    var text = input.value.trim();
    if (!text || busy) return;

    var c = cfg();
    if (!c.apiKey) {
      // 未配置 Key：提示 + 弹出设置
      panel.classList.add('on');
      panel.setAttribute('aria-hidden', 'false');
      fab.classList.add('hidden');
      appendMsg('ai', errorText('KEY_MISSING'));
      document.dispatchEvent(new CustomEvent('ob-open-setting'));
      return;
    }

    input.value = '';
    input.style.height = 'auto';
    busy = true;
    sendBtn.disabled = true;
    statusEl.textContent = '思考中…';

    appendMsg('me', esc(text));
    history.push({ role: 'user', content: text });
    saveHistory();

    // 加载中三点
    var loadingEl = appendMsg('ai', '<span class="typing"><i></i><i></i><i></i></span>');

    var bubble = null;
    var acc = '';

    var msgs = [{ role: 'system', content: buildSystemPrompt() }]
      .concat(history.slice(-20)); // 最多带最近 20 轮上下文

    callLLM(msgs, function (chunk) {
      if (!bubble) {
        loadingEl.remove();
        bubble = appendMsg('ai', '').querySelector('.m-bubble');
      }
      acc += chunk;
      bubble.textContent = acc;
      scrollBottom();
    }, function () {
      if (!bubble) loadingEl.remove();
      if (acc) {
        history.push({ role: 'assistant', content: acc });
        saveHistory();
      } else if (bubble) {
        bubble.textContent = '（模型未返回内容，请重试或更换模型）';
      }
      busy = false;
      sendBtn.disabled = false;
      statusEl.textContent = '基于入项知识库';
      input.focus();
    }, function (code) {
      loadingEl.remove();
      appendMsg('ai', esc(errorText(code)), 'err');
      busy = false;
      sendBtn.disabled = false;
      statusEl.textContent = '基于入项知识库';
    });
  }

  /* ==========================================================
     面板开关
     ========================================================== */
  function openPanel() {
    panel.classList.add('on');
    panel.setAttribute('aria-hidden', 'false');
    fab.classList.add('hidden');
    scrollBottom();
    input.focus();
  }
  function closePanel() {
    panel.classList.remove('on');
    panel.setAttribute('aria-hidden', 'true');
    fab.classList.remove('hidden');
  }

  /* ==========================================================
     初始化
     ========================================================== */
  function init() {
    panel = $('#chat-panel');
    body = $('#chat-body');
    input = $('#chat-input');
    sendBtn = $('#chat-send-btn');
    fab = $('#chat-fab');
    statusEl = $('#chat-status');

    loadHistory();

    // 恢复历史
    history.forEach(function (m) {
      appendMsg(m.role === 'assistant' ? 'ai' : 'me', esc(m.content));
    });
    if (history.length === 0) welcomeMsg();

    renderSuggests();

    fab.addEventListener('click', openPanel);
    $('#chat-close-btn').addEventListener('click', closePanel);

    $('#chat-clear-btn').addEventListener('click', function () {
      history = [];
      saveHistory();
      body.innerHTML = '';
      welcomeMsg();
    });

    sendBtn.addEventListener('click', send);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        send();
      }
    });
    // 输入框自适应高度
    input.addEventListener('input', function () {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 110) + 'px';
    });

    // 外部入口：打开聊天 / 打开设置
    document.addEventListener('ob-open-chat', openPanel);
    document.addEventListener('ob-open-setting', function () {
      var btn = $('#chat-setting-btn');
      if (btn) btn.click();
    });

    // 配置变更时更新状态提示
    document.addEventListener('ob-config-changed', function () {
      var c = cfg();
      statusEl.textContent = c.apiKey ? '已就绪 · ' + c.model : '基于入项知识库（未配置 Key）';
    });
    var c0 = cfg();
    if (c0.apiKey) statusEl.textContent = '已就绪 · ' + c0.model;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
