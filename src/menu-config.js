/**
 * 柳州教育人事管理平台 — 统一侧边栏菜单模块
 * 从 localStorage.menu_config 读取菜单配置，结合 role_permissions 过滤角色可见项
 * 用法：<script src="../src/menu-config.js"></script>
 *        renderSidebarMenu('sidebarMenu', currentRole, 'activeMenuId');
 */
(function () {
  'use strict';

  // ===== SVG 图标库 =====
  var ICONS = {
    home: '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    chart: '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
    users: '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    userp: '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>',
    userx: '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="23" y1="11" x2="17" y2="11"/></svg>',
    settings: '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    arrowup: '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
    search: '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
    file: '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
    clock: '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    warn: '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    user: '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    building: '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="6" x2="9" y2="6.01"/><line x1="15" y1="6" x2="15" y2="6.01"/><line x1="9" y1="10" x2="9" y2="10.01"/><line x1="15" y1="10" x2="15" y2="10.01"/><line x1="9" y1="14" x2="9" y2="14.01"/><line x1="15" y1="14" x2="15" y2="14.01"/><path d="M9 18h6v4H9z"/></svg>',
    key: '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>',
    list: '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
    shield: '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    'check-circle': '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    'log-out': '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>'
  };

  // ===== 默认菜单配置 =====
  function getDefaultConfig() {
    return {
      groupOrder: ['', '编制管理', '岗位管理', '聘用管理', '编外教师管理', '人事管理', '系统设置'],
      menus: [
        { id: 'workbench', label: '工作台', icon: 'home', group: '', order: 1, route: 'workbench.html', status: 'active' },
        { id: 'ledger', label: '编制岗位台账', icon: 'chart', group: '', order: 2, route: 'org-ledger-admin.html', status: 'active' },
        { id: 'staffing', label: '编制使用申请', icon: 'users', group: '编制管理', order: 1, route: 'staffing-application.html', status: 'active' },
        { id: 'entry', label: '入编申请', icon: 'userp', group: '编制管理', order: 2, route: '', status: 'active' },
        { id: 'exit', label: '教师出编管理', icon: 'userx', group: '编制管理', order: 3, route: '', status: 'active' },
        { id: 'postset', label: '岗位设置申请', icon: 'settings', group: '岗位管理', order: 1, route: '', status: 'active' },
        { id: 'promote', label: '岗位晋升申请', icon: 'arrowup', group: '岗位管理', order: 2, route: '', status: 'active' },
        { id: 'recruit', label: '招聘岗位申请', icon: 'search', group: '岗位管理', order: 3, route: '', status: 'active' },
        { id: 'employ', label: '聘用手续办理', icon: 'check-circle', group: '聘用管理', order: 1, route: '', status: 'active' },
        { id: 'contract-entry', label: '教师入职管理', icon: 'userp', group: '编外教师管理', order: 1, route: '', status: 'active' },
        { id: 'contract-exit', label: '教师离职管理', icon: 'userx', group: '编外教师管理', order: 2, route: '', status: 'active' },
        { id: 'retire', label: '退休呈报', icon: 'log-out', group: '人事管理', order: 1, route: '', status: 'active' },
        { id: 'ethics', label: '师德师风举报', icon: 'warn', group: '人事管理', order: 2, route: '', status: 'active' },
        { id: 'account', label: '账号管理', icon: 'user', group: '系统设置', order: 1, route: 'account-management.html', status: 'active' },
        { id: 'org', label: '机构管理', icon: 'building', group: '系统设置', order: 2, route: 'org-management.html', status: 'active' },
        { id: 'menuMgr', label: '菜单管理', icon: 'file', group: '系统设置', order: 3, route: 'menu-management.html', status: 'active' },
        { id: 'perm', label: '角色权限', icon: 'key', group: '系统设置', order: 4, route: 'perm-management.html', status: 'active' },
        { id: 'log', label: '操作日志', icon: 'list', group: '系统设置', order: 5, route: 'log-management.html', status: 'active' },
        { id: 'announcement', label: '公告管理', icon: 'file', group: '系统设置', order: 6, route: 'announcement-management.html', status: 'active' }
      ]
    };
  }

  // ===== 默认角色权限 =====
  var DEFAULT_ROLE_PERMS = {
    system: ['workbench', 'ledger', 'staffing', 'entry', 'exit', 'postset', 'promote', 'recruit', 'employ', 'contract-entry', 'contract-exit', 'retire', 'ethics', 'account', 'org', 'menuMgr', 'perm', 'log', 'announcement'],
    city: ['workbench', 'ledger', 'staffing', 'entry', 'exit', 'postset', 'promote', 'recruit', 'employ', 'contract-entry', 'contract-exit', 'retire', 'ethics', 'account', 'org', 'perm', 'log', 'announcement'],
    district: ['workbench', 'ledger', 'staffing', 'entry', 'exit', 'postset', 'promote', 'recruit', 'employ', 'contract-entry', 'contract-exit', 'retire', 'ethics', 'account', 'org', 'announcement'],
    school: ['workbench', 'ledger', 'staffing', 'entry', 'exit', 'postset', 'promote', 'recruit', 'employ', 'contract-entry', 'contract-exit', 'account', 'org', 'announcement'],
    teacher: []
  };

  /**
   * 迁移：确保配置含"编外教师管理"分组及两个菜单项（兼容旧版持久化配置）
   */
  function ensureContractMenus(cfg) {
    if (!cfg || !cfg.menus || !cfg.groupOrder) return cfg;
    if (cfg.groupOrder.indexOf('编外教师管理') === -1) {
      var gi = cfg.groupOrder.indexOf('聘用管理');
      if (gi >= 0) cfg.groupOrder.splice(gi + 1, 0, '编外教师管理');
      else cfg.groupOrder.push('编外教师管理');
    }
    var hasEntry = false, hasExit = false;
    for (var i = 0; i < cfg.menus.length; i++) {
      if (cfg.menus[i].id === 'contract-entry') hasEntry = true;
      if (cfg.menus[i].id === 'contract-exit') hasExit = true;
    }
    if (!hasEntry) cfg.menus.push({ id: 'contract-entry', label: '教师入职管理', icon: 'userp', group: '编外教师管理', order: 1, route: '', status: 'active' });
    if (!hasExit) cfg.menus.push({ id: 'contract-exit', label: '教师离职管理', icon: 'userx', group: '编外教师管理', order: 2, route: '', status: 'active' });
    return cfg;
  }

  /** 迁移：补全公告管理菜单项（兼容旧版持久化配置） */
  function ensureAnnouncementMenu(cfg) {
    if (!cfg || !cfg.menus) return cfg;
    var has = false;
    for (var i = 0; i < cfg.menus.length; i++) {
      if (cfg.menus[i].id === 'announcement') { has = true; break; }
    }
    if (!has) {
      cfg.menus.push({ id: 'announcement', label: '公告管理', icon: 'file', group: '系统设置', order: 6, route: 'announcement-management.html', status: 'active' });
    }
    return cfg;
  }

  /**
   * 读取菜单配置（menu_config），不存在时返回默认；自动迁移补全编外教师管理与公告管理
   */
  function getMenuConfig() {
    try {
      var raw = localStorage.getItem('menu_config');
      if (raw) {
        var cfg = JSON.parse(raw);
        if (cfg && cfg.menus && cfg.groupOrder) return ensureAnnouncementMenu(ensureContractMenus(cfg));
      }
    } catch (e) {}
    return ensureAnnouncementMenu(ensureContractMenus(getDefaultConfig()));
  }

  /**
   * 获取当前角色允许查看的菜单 ID 列表
   */
  /**
   * 迁移：非教师角色若已含 employ 权限，则补全两个编外教师管理菜单权限（兼容旧版持久化权限）
   */
  function ensureContractPerms(role, ids) {
    if (role !== 'teacher' && ids && ids.indexOf('employ') !== -1) {
      if (ids.indexOf('contract-entry') === -1) ids.push('contract-entry');
      if (ids.indexOf('contract-exit') === -1) ids.push('contract-exit');
    }
    return ids;
  }

  /** 迁移：非教师角色补全公告管理菜单权限（兼容旧版持久化权限） */
  function ensureAnnouncementPerm(role, ids) {
    if (role !== 'teacher' && ids && ids.indexOf('announcement') === -1) {
      ids.push('announcement');
    }
    return ids;
  }

  function getRolePermittedMenuIds(role) {
    try {
      var raw = localStorage.getItem('role_permissions');
      if (raw) {
        var perms = JSON.parse(raw);
        // Direct match by role key (system, city, district, school, teacher)
        if (perms[role] && perms[role].permissions && Array.isArray(perms[role].permissions)) {
          return ensureAnnouncementPerm(role, ensureContractPerms(role, perms[role].permissions));
        }
        // Fallback: try matching by label
        var labelMap = { '系统管理员':'system','市管理员':'city','区管理员':'district','校管理员':'school','教师':'teacher' };
        for (var key in perms) {
          if (perms[key].label && labelMap[perms[key].label] === role && perms[key].permissions) {
            return ensureAnnouncementPerm(role, ensureContractPerms(role, perms[key].permissions));
          }
        }
      }
    } catch (e) {}
    return ensureAnnouncementPerm(role, ensureContractPerms(role, (DEFAULT_ROLE_PERMS[role] || []).slice()));
  }

  /**
   * 获取当前角色的菜单列表（按 groupOrder 分组、按 order 排序）
   */
  function getMenusForRole(role) {
    var cfg = getMenuConfig();
    var permittedIds = getRolePermittedMenuIds(role);
    var permittedSet = {};
    for (var i = 0; i < permittedIds.length; i++) {
      permittedSet[permittedIds[i]] = true;
    }

    // Filter menus: active + role has permission
    var filtered = cfg.menus.filter(function(m) {
      return m.status === 'active' && permittedSet[m.id];
    });

    // Sort by groupOrder then by order within group
    filtered.sort(function(a, b) {
      var gaIdx = cfg.groupOrder.indexOf(a.group || '');
      var gbIdx = cfg.groupOrder.indexOf(b.group || '');
      if (gaIdx === -1) gaIdx = 999;
      if (gbIdx === -1) gbIdx = 999;
      if (gaIdx !== gbIdx) return gaIdx - gbIdx;
      return a.order - b.order;
    });

    return { menus: filtered, groupOrder: cfg.groupOrder };
  }

  /**
   * 渲染侧边栏菜单到指定容器
   * @param {string} containerId - 容器元素 ID
   * @param {string} role - 当前角色
   * @param {string} activeId - 当前活跃菜单项 ID
   * @param {object} extraItems - 可选的额外独立项 { top: [], groups: [] }
   */
  window.renderSidebarMenu = function (containerId, role, activeId, extraItems) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var result = getMenusForRole(role);
    var menus = result.menus;

    // If extraItems provided, prepend to menus
    if (extraItems) {
      if (extraItems.top) {
        for (var ti = extraItems.top.length - 1; ti >= 0; ti--) {
          menus.unshift(extraItems.top[ti]);
        }
      }
    }

    // Group menus
    var groups = {};
    var topItems = [];
    for (var i = 0; i < menus.length; i++) {
      var m = menus[i];
      var g = m.group || '';
      if (g === '') {
        topItems.push(m);
      } else {
        if (!groups[g]) groups[g] = [];
        groups[g].push(m);
      }
    }

    var html = '';

    // Render top items
    for (var j = 0; j < topItems.length; j++) {
      var t = topItems[j];
      html += '<a class="menu-item' + (t.id === activeId ? ' active' : '') + '" onclick="sidebarClick(\'' + t.id + '\')">';
      html += (ICONS[t.icon] || ICONS['file'] || '');
      html += '<span class="menu-label">' + escHtml(t.label) + '</span>';
      html += '</a>';
    }

    // Render grouped items
    var groupOrder = result.groupOrder || [];
    for (var gi = 0; gi < groupOrder.length; gi++) {
      var gname = groupOrder[gi];
      if (gname === '') continue;
      var groupMenus = groups[gname];
      if (!groupMenus || !groupMenus.length) continue;

      html += '<div class="menu-group">' + escHtml(gname) + '</div>';
      for (var mi = 0; mi < groupMenus.length; mi++) {
        var gm = groupMenus[mi];
        html += '<a class="menu-item' + (gm.id === activeId ? ' active' : '') + '" onclick="sidebarClick(\'' + gm.id + '\')">';
        html += (ICONS[gm.icon] || ICONS['file'] || '');
        html += '<span class="menu-label">' + escHtml(gm.label) + '</span>';
        html += '</a>';
      }
    }

    container.innerHTML = html;
  };

  // Utility
  function escHtml(s) {
    if (!s) return '';
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  console.log('[MenuConfig] 统一菜单模块已加载');
})();
