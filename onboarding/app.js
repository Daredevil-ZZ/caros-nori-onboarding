/* ============================================================
   app.js —— 页面渲染与交互（数据驱动，内容来自 data.js）
   ============================================================ */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- 卡片图标（内联 SVG） ---------- */
  var ICONS = {
    key: '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>',
    env: '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    rule: '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></svg>',
    chat: '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
    tool: '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    doc: '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>'
  };

  /* ==========================================================
     1. 新手入项引导渲染（流程步骤 + 任务勾选 + 直达链接）
     ========================================================== */
  function renderFlow() {
    var KEY = OB_CONFIG.ls.checklist;
    var saved = {};
    try { saved = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { saved = {}; }

    var list = $('#flow-list');
    var numEl = $('#cl-num');
    var pctEl = $('#cl-pct');
    var barEl = $('#cl-bar');
    var tipEl = $('#cl-done-tip');

    var all = [];
    ONBOARD_FLOW.forEach(function (s, si) {
      s.tasks.forEach(function (_, ti) { all.push('s' + si + '-' + ti); });
    });
    function isDone(id) { return saved[id] === true; }
    function stepEl(si) { return document.querySelector('.flow-step[data-si="' + si + '"]'); }

    function refresh() {
      var doneCount = all.filter(isDone).length;
      var pct = all.length ? Math.round(doneCount / all.length * 100) : 0;
      numEl.textContent = doneCount + ' / ' + all.length;
      pctEl.textContent = pct + '%';
      barEl.style.width = pct + '%';
      tipEl.style.display = (all.length && doneCount === all.length) ? 'block' : 'none';

      ONBOARD_FLOW.forEach(function (s, si) {
        var done = 0;
        s.tasks.forEach(function (_, ti) { if (isDone('s' + si + '-' + ti)) done++; });
        var el = stepEl(si);
        if (!el) return;
        $('.flow-stepnum', el).textContent = done + '/' + s.tasks.length;
        $('.flow-gbar-in', el).style.width = (s.tasks.length ? done / s.tasks.length * 100 : 0) + '%';
        el.classList.toggle('step-done', done === s.tasks.length && s.tasks.length > 0);
      });
    }

    /* 渲染步骤 */
    var html = ONBOARD_FLOW.map(function (s, si) {
      var items = s.tasks.map(function (task, ti) {
        var id = 's' + si + '-' + ti;
        var link = task.u
          ? '<a class="cl-go" href="' + esc(task.u) + '" target="_blank" rel="noopener" title="打开直达链接">直达 ↗</a>'
          : '';
        return '<label class="cl-item' + (isDone(id) ? ' done' : '') + '" data-id="' + id + '">' +
          '<input type="checkbox"' + (isDone(id) ? ' checked' : '') + ' />' +
          '<span class="cl-box"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>' +
          '<span class="cl-text">' + esc(task.t) + '</span>' + link +
        '</label>';
      }).join('');
      return '<div class="flow-step reveal" data-si="' + si + '">' +
        '<div class="flow-rail"><span class="flow-n">' + (si + 1) + '</span></div>' +
        '<div class="flow-card">' +
          '<button class="flow-head" type="button">' +
            '<span class="flow-title">' + esc(s.title) + '<span class="tl-tag">' + esc(s.duration) + '</span></span>' +
            '<span class="flow-head-side"><span class="flow-stepnum">0/' + s.tasks.length + '</span><span class="flow-arrow">▾</span></span>' +
          '</button>' +
          '<div class="flow-body"><div class="flow-body-in">' +
            '<p class="flow-detail">' + esc(s.detail) + '</p>' +
            (s.points && s.points.length
              ? '<ul class="flow-points">' + s.points.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul>'
              : '') +
            '<div class="flow-gbar"><div class="flow-gbar-in"></div></div>' +
            '<div class="cl-items">' + items + '</div>' +
          '</div></div>' +
        '</div>' +
      '</div>';
    }).join('');
    list.innerHTML = html;

    /* 展开/收起（手风琴） */
    $$('.flow-step', list).forEach(function (el) {
      $('.flow-head', el).addEventListener('click', function () {
        var open = el.classList.contains('open');
        $$('.flow-step.open', list).forEach(function (o) {
          o.classList.remove('open');
          $('.flow-body', o).style.maxHeight = '';
        });
        if (!open) {
          el.classList.add('open');
          var b = $('.flow-body', el);
          b.style.maxHeight = b.scrollHeight + 'px';
        }
      });
    });

    /* 勾选交互 */
    $$('.cl-item', list).forEach(function (item) {
      $('input[type="checkbox"]', item).addEventListener('change', function () {
        var id = item.dataset.id;
        if (this.checked) { saved[id] = true; item.classList.add('done'); }
        else { delete saved[id]; item.classList.remove('done'); }
        localStorage.setItem(KEY, JSON.stringify(saved));
        refresh();
        var step = item.closest('.flow-step');
        if (step && step.classList.contains('open')) {
          var b = $('.flow-body', step);
          b.style.maxHeight = b.scrollHeight + 'px';
        }
      });
    });

    /* 重置 */
    $('#cl-reset').addEventListener('click', function () {
      saved = {};
      localStorage.removeItem(KEY);
      $$('.cl-item', list).forEach(function (item) {
        $('input[type="checkbox"]', item).checked = false;
        item.classList.remove('done');
      });
      refresh();
    });

    refresh();

    /* 默认展开第一个未完成的步骤 */
    (function () {
      var target = ONBOARD_FLOW.length - 1;
      for (var si = 0; si < ONBOARD_FLOW.length; si++) {
        var stepDone = ONBOARD_FLOW[si].tasks.every(function (_, ti) { return isDone('s' + si + '-' + ti); });
        if (!stepDone) { target = si; break; }
      }
      var el = stepEl(target);
      if (el) {
        el.classList.add('open');
        var b = $('.flow-body', el);
        b.style.maxHeight = b.scrollHeight + 'px';
      }
    })();
  }

  /* ==========================================================
     2. 须知卡片渲染
     ========================================================== */
  function renderGuide() {
    var html = GUIDE_CARDS.map(function (c) {
      var items = c.items.map(function (it) { return '<li>' + esc(it) + '</li>'; }).join('');
      return '<div class="gcard reveal">' +
        '<div class="gcard-head"><span class="gcard-ico">' + (ICONS[c.icon] || ICONS.doc) + '</span>' +
        '<h3>' + esc(c.category) + '</h3></div>' +
        '<ul>' + items + '</ul>' +
      '</div>';
    }).join('');
    $('#guide-grid').innerHTML = html;
  }

  /* ==========================================================
     3. FAQ 渲染（折叠展开）
     ========================================================== */
  function renderFaq() {
    var html = FAQ_LIST.map(function (f) {
      return '<div class="faq reveal">' +
        '<div class="faq-q"><span>' + esc(f.q) + '</span><span class="faq-arrow">▾</span></div>' +
        '<div class="faq-a"><div class="faq-a-in">' + esc(f.a) + '</div></div>' +
      '</div>';
    }).join('');
    var grid = $('#faq-grid');
    grid.innerHTML = html;

    $$('.faq', grid).forEach(function (el) {
      $('.faq-q', el).addEventListener('click', function () {
        var open = el.classList.contains('open');
        // 手风琴：先收起其他已展开项
        $$('.faq.open', grid).forEach(function (o) {
          o.classList.remove('open');
          $('.faq-a', o).style.maxHeight = '';
        });
        if (!open) {
          el.classList.add('open');
          var a = $('.faq-a', el);
          a.style.maxHeight = a.scrollHeight + 'px';
        }
      });
    });
  }

  /* ==========================================================
     3.5 资料导航渲染（RESOURCE_GROUPS + SYSTEM_LIST）
     ========================================================== */
  function renderResources() {
    var groupsHtml = RESOURCE_GROUPS.map(function (g, gi) {
      var rows = g.entries.map(function (e) {
        var right;
        if (e.u) {
          right = '<a class="res-link" href="' + esc(e.u) + '" target="_blank" rel="noopener" title="打开链接">直达 ↗</a>';
        } else {
          right = '<span class="res-tag">wiki 内</span>';
        }
        var owner = e.o ? '<span class="res-owner">责任人：' + esc(e.o) + '</span>' : '';
        return '<div class="res-row reveal" data-q="' + esc((e.t + ' ' + (e.o || '')).toLowerCase()) + '">' +
          '<span class="res-dot"></span>' +
          '<span class="res-main"><span class="res-name">' + esc(e.t) + '</span>' + owner + '</span>' +
          '<span class="res-side">' + right + '</span>' +
        '</div>';
      }).join('');
      return '<div class="res-group" data-gid="' + gi + '">' +
        '<h4 class="res-gname"><span class="res-gico">' + (gi + 1) + '</span>' + esc(g.name) + '<span class="res-count">' + g.entries.length + '</span></h4>' +
        '<div class="res-rows">' + rows + '</div>' +
      '</div>';
    }).join('');
    $('#res-groups').innerHTML = groupsHtml;

    /* 系统卡片 */
    var sysHtml = SYSTEM_LIST.map(function (s) {
      var tag = s.i
        ? '<span class="sys-tag tag-in">内网</span>'
        : (s.u ? '<span class="sys-tag tag-link">可直达</span>' : '<span class="sys-tag tag-wiki">wiki 内</span>');
      var action;
      if (s.u) {
        action = '<a class="sys-go" href="' + esc(s.u) + '" target="_blank" rel="noopener">进入系统 ↗</a>';
      } else {
        action = '<span class="sys-go sys-go-na">查看 wiki</span>';
      }
      var note = s.x ? '<p class="sys-note">' + esc(s.x) + '</p>' : '';
      return '<div class="sys-card reveal">' +
        '<div class="sys-head">' +
          '<span class="sys-ico">' + esc(s.n.charAt(0)) + '</span>' +
          '<div><h4>' + esc(s.n) + '</h4>' + tag + '</div>' +
        '</div>' +
        '<p class="sys-desc">' + esc(s.d) + '</p>' + note +
        '<div class="sys-foot">' +
          '<span class="sys-owner">' + esc(s.o || '') + '</span>' +
          action +
        '</div>' +
      '</div>';
    }).join('');
    $('#sys-grid').innerHTML = sysHtml;

    /* 搜索过滤 */
    var input = $('#res-search');
    var hint = $('#res-hint');
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      var match = 0;
      RESOURCE_GROUPS.forEach(function (g, gi) {
        var groupEl = document.querySelector('.res-group[data-gid="' + gi + '"]');
        var shown = 0;
        Array.prototype.forEach.call(groupEl.querySelectorAll('.res-row'), function (row) {
          var hit = !q || (row.dataset.q && row.dataset.q.indexOf(q) > -1);
          row.style.display = hit ? '' : 'none';
          if (hit) shown++;
        });
        groupEl.style.display = shown ? '' : 'none';
        match += shown;
      });
      var sysCards = Array.prototype.slice.call(document.querySelectorAll('.sys-card'));
      var sysShown = 0;
      sysCards.forEach(function (card) {
        var hit = !q || (card.textContent.toLowerCase().indexOf(q) > -1);
        card.style.display = hit ? '' : 'none';
        if (hit) sysShown++;
      });
      hint.textContent = q ? ('匹配：文档 ' + match + ' 条 / 系统 ' + sysShown + ' 个') : '';
    });
  }

  /* ==========================================================
     4. 滚动淡入（IntersectionObserver）
     ========================================================== */
  function initReveal() {
    var els = $$('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ==========================================================
     5. 导航：滚动状态 / 汉堡菜单 / 锚点
     ========================================================== */
  function initNav() {
    var nav = $('#nav');
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 8);
    }, { passive: true });

    var burger = $('#nav-burger');
    var links = $('#nav-links');
    burger.addEventListener('click', function () {
      burger.classList.toggle('open');
      links.classList.toggle('open');
    });
    $$('a', links).forEach(function (a) {
      a.addEventListener('click', function () {
        burger.classList.remove('open');
        links.classList.remove('open');
      });
    });
  }

  /* ==========================================================
     6. 统计数字 & wiki 外链
     ========================================================== */
  function initMeta() {
    if (typeof ONBOARD_FLOW !== 'undefined') $('#stat-steps').textContent = ONBOARD_FLOW.length + ' 步';
    if (typeof GUIDE_CARDS !== 'undefined') $('#stat-cards').textContent = GUIDE_CARDS.length + ' 类';
    if (typeof FAQ_LIST !== 'undefined') $('#stat-faq').textContent = FAQ_LIST.length + ' 条';
    if (typeof OB_CONFIG !== 'undefined') {
      ['#wiki-link', '#wiki-link-ft'].forEach(function (s) {
        var el = $(s);
        if (el) el.href = OB_CONFIG.wikiUrl;
      });
    }
  }

  /* ==========================================================
     7. 设置弹窗（Key / Base / 模型，localStorage 持久化）
     ========================================================== */
  function initSettingModal() {
    var modal = $('#setting-modal');
    var open = function () {
      $('#set-key').value = localStorage.getItem(OB_CONFIG.ls.apiKey) || '';
      $('#set-base').value = localStorage.getItem(OB_CONFIG.ls.apiBase) || OB_CONFIG.apiBase;
      $('#set-model').value = localStorage.getItem(OB_CONFIG.ls.model) || OB_CONFIG.model;
      modal.classList.add('on');
      modal.setAttribute('aria-hidden', 'false');
    };
    var close = function () {
      modal.classList.remove('on');
      modal.setAttribute('aria-hidden', 'true');
    };

    $('#chat-setting-btn').addEventListener('click', open);
    modal.addEventListener('click', function (ev) {
      if (ev.target.dataset && ev.target.dataset.close !== undefined) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('on')) close();
    });

    $('#set-save-btn').addEventListener('click', function () {
      var key = $('#set-key').value.trim();
      var base = $('#set-base').value.trim();
      var model = $('#set-model').value.trim();

      if (base) localStorage.setItem(OB_CONFIG.ls.apiBase, base); else localStorage.removeItem(OB_CONFIG.ls.apiBase);
      if (model) localStorage.setItem(OB_CONFIG.ls.model, model); else localStorage.removeItem(OB_CONFIG.ls.model);
      if (key) localStorage.setItem(OB_CONFIG.ls.apiKey, key); else localStorage.removeItem(OB_CONFIG.ls.apiKey);

      // 通知聊天模块刷新状态
      document.dispatchEvent(new CustomEvent('ob-config-changed'));
      close();
    });
  }

  /* ==========================================================
     7.5 主题切换（深色 / 白色简洁，localStorage 持久化）
     ========================================================== */
  var SUN_PATH = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>';
  var MOON_PATH = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
  function initTheme() {
    var KEY = OB_CONFIG.ls.theme;
    var theme = localStorage.getItem(KEY);
    if (theme !== 'light' && theme !== 'dark') theme = 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    var btn = $('#theme-toggle');
    var icon = $('#theme-icon');
    function sync() {
      var cur = document.documentElement.getAttribute('data-theme');
      icon.innerHTML = cur === 'light' ? MOON_PATH : SUN_PATH;
      btn.title = cur === 'light' ? '切换到深色主题' : '切换到白色简洁主题';
    }
    sync();
    btn.addEventListener('click', function () {
      var cur = document.documentElement.getAttribute('data-theme');
      var next = cur === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem(KEY, next);
      sync();
    });
  }

  /* ==========================================================
     8. 打开助手的三处入口（导航/Hero/FAQ）
     ========================================================== */
  function initAskEntries() {
    ['#nav-ask-btn', '#hero-ask-btn', '#faq-ask-btn'].forEach(function (s) {
      var el = $(s);
      if (el) el.addEventListener('click', function () {
        document.dispatchEvent(new CustomEvent('ob-open-chat'));
      });
    });
  }

  /* ==========================================================
     8.5 视图路由：按导航栏切换内容页（点导航才显示对应 section）
     ========================================================== */
  var VIEWS = ['flow', 'guide', 'resources', 'faq'];
  function showView(id) {
    if (VIEWS.indexOf(id) < 0) id = 'flow';
    $$('.section').forEach(function (s) { s.classList.remove('active'); });
    var el = document.getElementById(id);
    if (!el) return;
    el.classList.add('active');
    /* 切换后触发该视图内元素的淡入 */
    requestAnimationFrame(function () {
      $$('.reveal', el).forEach(function (r) { r.classList.add('in'); });
      /* flow 视图展开步骤的 maxHeight 需在可见后重算（首次渲染时 section 隐藏，scrollHeight 为 0） */
      if (id === 'flow') {
        $$('.flow-step.open .flow-body', el).forEach(function (b) { b.style.maxHeight = b.scrollHeight + 'px'; });
      }
    });
    /* 高亮当前导航项 */
    $$('.nav-links a[data-view]').forEach(function (a) {
      a.classList.toggle('on', a.dataset.view === id);
    });
    /* 同步 URL hash（不触发滚动默认行为） */
    if (location.hash.slice(1) !== id) history.replaceState(null, '', '#' + id);
    /* 滚动到该 section 顶部（留出导航栏高度） */
    var top = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top: top < 0 ? 0 : top, behavior: 'smooth' });
  }
  function initRouter() {
    $$('[data-view]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        showView(a.dataset.view);
      });
    });
    window.addEventListener('hashchange', function () {
      var h = location.hash.slice(1);
      if (VIEWS.indexOf(h) >= 0) showView(h);
    });
    var h0 = location.hash.slice(1);
    showView(VIEWS.indexOf(h0) >= 0 ? h0 : 'flow');
  }

  /* ==========================================================
     9. 初始化
     ========================================================== */
  function init() {
    renderFlow();
    renderGuide();
    renderResources();
    renderFaq();
    initReveal();
    initNav();
    initMeta();
    initSettingModal();
    initAskEntries();
    initTheme();
    initRouter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
