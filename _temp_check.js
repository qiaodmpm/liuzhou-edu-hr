
// ========== ICONS ==========
var ICON_DEFS = {
  home: 'home', chart: 'chart', users: 'users', 'user-plus': 'userp',
  'user-minus': 'userx', settings: 'settings', 'trending-up': 'arrowup',
  briefcase: 'search', 'check-circle': 'file', 'log-out': 'clock',
  'alert-circle': 'warn', user: 'user', building: 'building',
  file: 'file', key: 'key', list: 'list', shield: 'shield', clock: 'clock'
};

var ICON_SVGS = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  userp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>',
  userx: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="23" y1="11" x2="17" y2="11"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  arrowup: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
  file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  warn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="6" x2="9" y2="6.01"/><line x1="15" y1="6" x2="15" y2="6.01"/><line x1="9" y1="10" x2="9" y2="10.01"/><line x1="15" y1="10" x2="15" y2="10.01"/><line x1="9" y1="14" x2="9" y2="14.01"/><line x1="15" y1="14" x2="15" y2="14.01"/><path d="M9 18h6v4H9z"/></svg>',
  key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>',
  list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'
};

// ========== DEFAULT DATA ==========
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
      { id: 'employ', label: '聘用手续办理', icon: 'file', group: '聘用管理', order: 1, route: '', status: 'active' },
      { id: 'contract-entry', label: '教师入职管理', icon: 'userp', group: '编外教师管理', order: 1, route: '', status: 'active' },
      { id: 'contract-exit', label: '教师离职管理', icon: 'userx', group: '编外教师管理', order: 2, route: '', status: 'active' },
      { id: 'retire', label: '退休呈报', icon: 'clock', group: '人事管理', order: 1, route: '', status: 'active' },
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

// ========== STATE ==========
var draftConfig = null;       // 内存编辑副本
var savedConfig = null;       // 已保存快照
var editingMenuId = null;
var deletingMenuId = null;
var selectedIcon = 'file';
var currentUser = {};
var pendingStatusMenuId = null;
var deletingGroupName = null;
var editingGroupName = null;

// ========== ICON PICKER ==========
var ICON_LIST = [
  { id: 'home', label: '首页' }, { id: 'chart', label: '台账' }, { id: 'users', label: '编制' },
  { id: 'userp', label: '入编' }, { id: 'userx', label: '出编' }, { id: 'settings', label: '设置' },
  { id: 'arrowup', label: '晋升' }, { id: 'search', label: '招聘' }, { id: 'file', label: '文件' },
  { id: 'clock', label: '时间' }, { id: 'warn', label: '举报' }, { id: 'user', label: '账号' },
  { id: 'building', label: '机构' }, { id: 'key', label: '权限' }, { id: 'list', label: '日志' },
  { id: 'shield', label: '安全' }
];

function renderIconPicker() {
  var html = '';
  for (var i = 0; i < ICON_LIST.length; i++) {
    var ico = ICON_LIST[i];
    var sel = ico.id === selectedIcon ? ' selected' : '';
    html += '<div class="icon-option' + sel + '" onclick="selectIcon(\'' + ico.id + '\')">';
    html += '<span class="icon-svg">' + (ICON_SVGS[ico.id] || '') + '</span>';
    html += ico.label;
    html += '</div>';
  }
  document.getElementById('iconPicker').innerHTML = html;
}

function selectIcon(id) {
  selectedIcon = id;
  document.getElementById('fIcon').value = id;
  renderIconPicker();
}

// ========== DATA ==========
function loadConfig() {
  var raw = localStorage.getItem('menu_config');
  if (raw) {
    try { savedConfig = JSON.parse(raw); } catch(e) { savedConfig = null; }
  }
  if (!savedConfig || !savedConfig.menus || !savedConfig.groupOrder) {
    savedConfig = JSON.parse(JSON.stringify(getDefaultConfig()));
  }
  // 迁移：补全"编外教师管理"分组及菜单项（兼容旧版持久化配置）
  if (savedConfig.groupOrder.indexOf('编外教师管理') === -1) {
    var gi = savedConfig.groupOrder.indexOf('聘用管理');
    if (gi >= 0) savedConfig.groupOrder.splice(gi + 1, 0, '编外教师管理');
    else savedConfig.groupOrder.push('编外教师管理');
  }
  var hasCE = false, hasCX = false;
  for (var i = 0; i < savedConfig.menus.length; i++) {
    if (savedConfig.menus[i].id === 'contract-entry') hasCE = true;
    if (savedConfig.menus[i].id === 'contract-exit') hasCX = true;
  }
  if (!hasCE) savedConfig.menus.push({ id: 'contract-entry', label: '教师入职管理', icon: 'userp', group: '编外教师管理', order: 1, route: '', status: 'active' });
  if (!hasCX) savedConfig.menus.push({ id: 'contract-exit', label: '教师离职管理', icon: 'userx', group: '编外教师管理', order: 2, route: '', status: 'active' });
  // 迁移：补全公告管理菜单项
  var hasAnn = false;
  for (var j = 0; j < savedConfig.menus.length; j++) {
    if (savedConfig.menus[j].id === 'announcement') { hasAnn = true; break; }
  }
  if (!hasAnn) savedConfig.menus.push({ id: 'announcement', label: '公告管理', icon: 'file', group: '系统设置', order: 6, route: 'announcement-management.html', status: 'active' });
  draftConfig = JSON.parse(JSON.stringify(savedConfig));
}

function isDirty() {
  return JSON.stringify(draftConfig) !== JSON.stringify(savedConfig);
}

function updateSaveBtn() {
  var btn = document.getElementById('saveBtn');
  if (isDirty()) {
    btn.textContent = '💾 保存配置';
    btn.className = 'btn btn-primary btn-sm';
    btn.disabled = false;
  } else {
    btn.textContent = '✓ 已保存';
    btn.className = 'btn btn-outline btn-sm';
    btn.disabled = true;
  }
}

// ========== RENDER ==========
function renderAll() {
  var groups = {};
  // Build group map
  for (var i = 0; i < draftConfig.menus.length; i++) {
    var m = draftConfig.menus[i];
    var g = m.group || '';
    if (!groups[g]) groups[g] = [];
    groups[g].push(m);
  }
  // Sort menus within each group by order
  for (var key in groups) {
    groups[key].sort(function(a, b) { return a.order - b.order; });
  }

  var html = '';
  var totalCount = 0;

  // Render groups in groupOrder
  for (var gi = 0; gi < draftConfig.groupOrder.length; gi++) {
    var gname = draftConfig.groupOrder[gi];
    var groupMenus = groups[gname] || [];

    var isTop = gname === '';
    var groupIdx = gi;
    var hasMenus = groupMenus.length > 0;
    var isFirst = (groupIdx === 0);
    var isLast = (groupIdx === draftConfig.groupOrder.length - 1);

    html += '<div class="group-card' + (hasMenus ? '' : ' empty-group') + '">';
    html += '<div class="group-card-header">';
    html += '<span class="group-name' + (isTop ? ' top-level' : '') + '">' + (isTop ? '▎顶部独立项' : escapeHtml(gname)) + '</span>';
    // Group sort buttons
    if (!isTop) {
      html += '<button class="btn-icon" ' + (isFirst ? 'disabled' : '') + ' onclick="moveGroupUp(' + groupIdx + ')" title="上移分组">↥</button>';
      html += '<button class="btn-icon" ' + (isLast ? 'disabled' : '') + ' onclick="moveGroupDown(' + groupIdx + ')" title="下移分组">↧</button>';
      html += '<button class="btn-icon" onclick="openEditGroupModal(\'' + escapeAttr(gname) + '\')" title="编辑组名">✎</button>';
    }
    html += '<button class="btn-xs btn-xs-outline" onclick="openAddMenuModal(\'' + escapeAttr(gname) + '\')">+ 添加到此组</button>';
    if (!isTop) {
      html += '<button class="btn-xs btn-xs-danger" onclick="openDeleteGroupModal(\'' + escapeAttr(gname) + '\')">删除分组</button>';
    }
    html += '</div>';
    html += '<div class="group-card-body">';

    if (!hasMenus) {
      html += '<div style="text-align:center;padding:16px;font-size:12px;color:var(--text-light);">此分组暂无菜单</div>';
    }

    for (var mi = 0; mi < groupMenus.length; mi++) {
      var menu = groupMenus[mi];
      var disabled = menu.status === 'inactive';
      var isFirstItem = (mi === 0);
      var isLastItem = (mi === groupMenus.length - 1);

      html += '<div class="menu-row' + (disabled ? ' disabled' : '') + '">';
      html += '<span class="menu-seq">' + (mi + 1) + '</span>';
      html += '<span class="menu-row-icon-svg">' + (ICON_SVGS[menu.icon] || '') + '</span>';
      html += '<span class="menu-row-label">' + escapeHtml(menu.label) + '</span>';
      html += '<div class="menu-row-actions">';
      // Status toggle
      if (menu.status === 'active') {
        html += '<button class="btn-xs btn-xs-primary" onclick="openStatusModal(\'' + menu.id + '\',\'disable\')">启用</button>';
      } else {
        html += '<button class="btn-xs btn-xs-outline" onclick="openStatusModal(\'' + menu.id + '\',\'enable\')">停用</button>';
      }
      // Sort buttons
      html += '<button class="btn-icon" ' + (isFirstItem ? 'disabled' : '') + ' onclick="moveItemUp(\'' + menu.id + '\')" title="上移">↑</button>';
      html += '<button class="btn-icon" ' + (isLastItem ? 'disabled' : '') + ' onclick="moveItemDown(\'' + menu.id + '\')" title="下移">↓</button>';
      // Edit / Delete
      html += '<button class="btn-xs btn-xs-outline" onclick="openEditMenuModal(\'' + menu.id + '\')">编辑</button>';
      html += '<button class="btn-xs btn-xs-danger" onclick="openDeleteMenuModal(\'' + menu.id + '\')">删除</button>';
      html += '</div>';
      html += '</div>';
      totalCount++;
    }

    html += '</div></div>';
  }

  // Show any groups not in groupOrder
  for (var gk in groups) {
    if (draftConfig.groupOrder.indexOf(gk) !== -1) continue;
    var orphanMenus = groups[gk];
    if (!orphanMenus.length) continue;
    html += '<div class="group-card" style="opacity:0.7;">';
    html += '<div class="group-card-header">';
    html += '<span class="group-name' + (gk === '' ? ' top-level' : '') + '">' + (gk === '' ? '▎顶部独立项' : escapeHtml(gk)) + ' (未排序)</span>';
    html += '</div><div class="group-card-body">';
    for (var oi = 0; oi < orphanMenus.length; oi++) {
      var om = orphanMenus[oi];
      html += '<div class="menu-row"><span class="menu-seq">' + (oi + 1) + '</span><span class="menu-row-icon-svg">' + (ICON_SVGS[om.icon] || '') + '</span><span class="menu-row-label">' + escapeHtml(om.label) + '</span><span style="font-size:11px;color:var(--text-light);">等待保存排序</span></div>';
      totalCount++;
    }
    html += '</div></div>';
  }

  document.getElementById('menuGroups').innerHTML = html || '<div style="text-align:center;padding:60px;color:var(--text-light);background:#fff;border-radius:var(--radius-lg);border:1px solid var(--border);">暂无菜单，请点击"新增菜单"或"重置为默认"</div>';
  document.getElementById('menuCount').textContent = '共 ' + totalCount + ' 个菜单项 · ' + draftConfig.groupOrder.length + ' 个分组';
  updateSaveBtn();
}

// ========== GROUP OPERATIONS ==========
function moveGroupUp(idx) {
  if (idx <= 0) return;
  var tmp = draftConfig.groupOrder[idx];
  draftConfig.groupOrder[idx] = draftConfig.groupOrder[idx - 1];
  draftConfig.groupOrder[idx - 1] = tmp;
  renderAll();
}

function moveGroupDown(idx) {
  if (idx >= draftConfig.groupOrder.length - 1) return;
  var tmp = draftConfig.groupOrder[idx];
  draftConfig.groupOrder[idx] = draftConfig.groupOrder[idx + 1];
  draftConfig.groupOrder[idx + 1] = tmp;
  renderAll();
}

function openAddGroupModal() {
  document.getElementById('fGroupName').value = '';
  document.getElementById('groupModal').classList.add('show');
}

function closeGroupModal() {
  document.getElementById('groupModal').classList.remove('show');
}

function addGroup() {
  var name = document.getElementById('fGroupName').value.trim();
  if (!name) { showToast('请输入分组名称', 'warning'); return; }
  if (draftConfig.groupOrder.indexOf(name) !== -1) { showToast('分组已存在', 'warning'); return; }
  // Also check existing menus for group name with different case
  for (var i = 0; i < draftConfig.groupOrder.length; i++) {
    if (draftConfig.groupOrder[i].toLowerCase() === name.toLowerCase()) { showToast('分组已存在（不区分大小写）', 'warning'); return; }
  }
  draftConfig.groupOrder.push(name);

  closeGroupModal();
  showToast('分组「' + name + '」已添加', 'success');
  if (typeof writeLog === 'function') writeLog({ module: 'menu', actionType: 'create', targetType: 'group', targetName: name, detail: '新增菜单分组', result: 'success' });
  renderAll();
}

function openEditGroupModal(gname) {
  editingGroupName = gname;
  document.getElementById('fEditGroupName').value = gname;
  document.getElementById('editGroupModal').classList.add('show');
}

function closeEditGroupModal() {
  document.getElementById('editGroupModal').classList.remove('show');
  editingGroupName = null;
}

function saveEditGroup() {
  var newName = document.getElementById('fEditGroupName').value.trim();
  if (!newName) { showToast('请输入分组名称', 'warning'); return; }
  if (newName === editingGroupName) { closeEditGroupModal(); return; }
  // Check uniqueness
  for (var i = 0; i < draftConfig.groupOrder.length; i++) {
    if (draftConfig.groupOrder[i].toLowerCase() === newName.toLowerCase() && draftConfig.groupOrder[i] !== editingGroupName) {
      showToast('分组名称已存在', 'warning'); return;
    }
  }
  // Update groupOrder
  for (var j = 0; j < draftConfig.groupOrder.length; j++) {
    if (draftConfig.groupOrder[j] === editingGroupName) {
      draftConfig.groupOrder[j] = newName;
      break;
    }
  }
  // Update all menus in this group
  for (var k = 0; k < draftConfig.menus.length; k++) {
    if (draftConfig.menus[k].group === editingGroupName) {
      draftConfig.menus[k].group = newName;
    }
  }

  closeEditGroupModal();
  showToast('分组已更名为「' + newName + '」', 'success');
  if (typeof writeLog === 'function') writeLog({ module: 'menu', actionType: 'update', targetType: 'group', targetName: newName, detail: '重命名菜单分组：' + editingGroupName + ' → ' + newName, result: 'success' });
  renderAll();
}

function openDeleteGroupModal(gname) {
  deletingGroupName = gname;
  document.getElementById('deleteGroupTargetLabel').textContent = gname;
  // Count menus in this group
  var count = 0;
  for (var i = 0; i < draftConfig.menus.length; i++) {
    if ((draftConfig.menus[i].group || '') === gname) count++;
  }
  document.getElementById('deleteGroupSubMsg').textContent = '组内 ' + count + ' 个菜单将一并删除，此操作不可恢复。';
  document.getElementById('deleteGroupModal').classList.add('show');
}

function closeDeleteGroupModal() {
  document.getElementById('deleteGroupModal').classList.remove('show');
  deletingGroupName = null;
}

function confirmDeleteGroup() {
  if (deletingGroupName === null || deletingGroupName === undefined) return;
  var gname = deletingGroupName;
  // Remove group from groupOrder
  draftConfig.groupOrder = draftConfig.groupOrder.filter(function(g) { return g !== gname; });
  // Remove all menus in this group
  draftConfig.menus = draftConfig.menus.filter(function(m) { return (m.group || '') !== gname; });

  closeDeleteGroupModal();
  showToast('分组「' + gname + '」及组内菜单已删除', 'success');
  if (typeof writeLog === 'function') writeLog({ module: 'menu', actionType: 'delete', targetType: 'group', targetName: gname, detail: '删除菜单分组及组内所有菜单', result: 'success' });
  renderAll();
}

// ========== MENU ITEM OPERATIONS ==========
function openStatusModal(id, action) {
  pendingStatusMenuId = id;
  var menu = null;
  for (var i = 0; i < draftConfig.menus.length; i++) {
    if (draftConfig.menus[i].id === id) { menu = draftConfig.menus[i]; break; }
  }
  if (!menu) return;
  var label = menu.label;
  if (action === 'disable') {
    document.getElementById('statusModalTitle').textContent = '确认停用';
    document.getElementById('statusModalMsg').innerHTML = '确定停用菜单「<strong>' + escapeHtml(label) + '</strong>」？';
    document.getElementById('statusConfirmBtn').className = 'btn btn-primary';
    document.getElementById('statusConfirmBtn').textContent = '确认停用';
  } else {
    document.getElementById('statusModalTitle').textContent = '确认启用';
    document.getElementById('statusModalMsg').innerHTML = '确定启用菜单「<strong>' + escapeHtml(label) + '</strong>」？';
    document.getElementById('statusConfirmBtn').className = 'btn btn-primary';
    document.getElementById('statusConfirmBtn').textContent = '确认启用';
  }
  document.getElementById('statusModal').classList.add('show');
}

function closeStatusModal() {
  document.getElementById('statusModal').classList.remove('show');
  pendingStatusMenuId = null;
}

function confirmToggleStatus() {
  if (!pendingStatusMenuId) return;
  for (var i = 0; i < draftConfig.menus.length; i++) {
    if (draftConfig.menus[i].id === pendingStatusMenuId) {
      var newStatus = draftConfig.menus[i].status === 'active' ? 'inactive' : 'active';
      draftConfig.menus[i].status = newStatus;
      break;
    }
  }

  closeStatusModal();
  showToast('菜单状态已更新', 'success');
  if (typeof writeLog === 'function') writeLog({ module: 'menu', actionType: 'update', targetType: 'menu', targetId: pendingStatusMenuId, detail: '切换菜单启停状态', result: 'success' });
  renderAll();
}

function moveItemUp(id) {
  var menu = null;
  for (var i = 0; i < draftConfig.menus.length; i++) {
    if (draftConfig.menus[i].id === id) { menu = draftConfig.menus[i]; break; }
  }
  if (!menu) return;
  // Find previous item in same group
  var sameGroup = [];
  for (var j = 0; j < draftConfig.menus.length; j++) {
    if ((draftConfig.menus[j].group || '') === (menu.group || '')) {
      sameGroup.push(draftConfig.menus[j]);
    }
  }
  sameGroup.sort(function(a, b) { return a.order - b.order; });
  var idx = -1;
  for (var k = 0; k < sameGroup.length; k++) {
    if (sameGroup[k].id === id) { idx = k; break; }
  }
  if (idx <= 0) return;
  // Swap order values
  var prev = sameGroup[idx - 1];
  var tmpOrder = menu.order;
  menu.order = prev.order;
  prev.order = tmpOrder;
  renderAll();
}

function moveItemDown(id) {
  var menu = null;
  for (var i = 0; i < draftConfig.menus.length; i++) {
    if (draftConfig.menus[i].id === id) { menu = draftConfig.menus[i]; break; }
  }
  if (!menu) return;
  var sameGroup = [];
  for (var j = 0; j < draftConfig.menus.length; j++) {
    if ((draftConfig.menus[j].group || '') === (menu.group || '')) {
      sameGroup.push(draftConfig.menus[j]);
    }
  }
  sameGroup.sort(function(a, b) { return a.order - b.order; });
  var idx = -1;
  for (var k = 0; k < sameGroup.length; k++) {
    if (sameGroup[k].id === id) { idx = k; break; }
  }
  if (idx < 0 || idx >= sameGroup.length - 1) return;
  var next = sameGroup[idx + 1];
  var tmpOrder = menu.order;
  menu.order = next.order;
  next.order = tmpOrder;
  renderAll();
}

// ========== ADD/EDIT MODAL ==========
function openAddMenuModal(prefillGroup) {
  editingMenuId = null;
  document.getElementById('menuModalTitle').textContent = '新增菜单';
  document.getElementById('fLabel').value = '';
  document.getElementById('fId').value = '';
  document.getElementById('fId').disabled = false;
  document.getElementById('fId').style.background = '#fff';
  document.getElementById('fRoute').value = '';
  document.getElementById('fOrder').value = '';
  document.getElementById('menuSaveBtn').textContent = '确认新增';

  // Populate group dropdown
  populateGroupSelect(prefillGroup || '');

  selectedIcon = 'file';
  document.getElementById('fIcon').value = 'file';
  renderIconPicker();

  document.getElementById('menuModal').classList.add('show');
}

function openEditMenuModal(id) {
  var menu = null;
  for (var i = 0; i < draftConfig.menus.length; i++) {
    if (draftConfig.menus[i].id === id) { menu = draftConfig.menus[i]; break; }
  }
  if (!menu) return;

  editingMenuId = id;
  document.getElementById('menuModalTitle').textContent = '编辑菜单';
  document.getElementById('fLabel').value = menu.label;
  document.getElementById('fId').value = menu.id;
  document.getElementById('fId').disabled = true;
  document.getElementById('fId').style.background = '#F8FAFC';
  document.getElementById('fRoute').value = menu.route || '';
  document.getElementById('fOrder').value = menu.order;
  document.getElementById('menuSaveBtn').textContent = '确认保存';

  populateGroupSelect(menu.group || '');
  selectedIcon = menu.icon || 'file';
  document.getElementById('fIcon').value = selectedIcon;
  renderIconPicker();

  document.getElementById('menuModal').classList.add('show');
}

function closeMenuModal() {
  document.getElementById('menuModal').classList.remove('show');
  editingMenuId = null;
}

function populateGroupSelect(selected) {
  var sel = document.getElementById('fGroup');
  var html = '<option value="">(顶部独立项)</option>';
  for (var i = 0; i < draftConfig.groupOrder.length; i++) {
    var g = draftConfig.groupOrder[i];
    if (g === '') continue;
    html += '<option value="' + escapeAttr(g) + '"' + (g === selected ? ' selected' : '') + '>' + escapeHtml(g) + '</option>';
  }
  sel.innerHTML = html;
}

function saveMenuItem() {
  var label = document.getElementById('fLabel').value.trim();
  if (!label) { showToast('请输入菜单名称', 'warning'); return; }
  var id = document.getElementById('fId').value.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!id) { showToast('请输入菜单标识', 'warning'); return; }
  var group = document.getElementById('fGroup').value;
  var route = document.getElementById('fRoute').value.trim();
  var icon = selectedIcon;
  var orderStr = document.getElementById('fOrder').value.trim();

  if (editingMenuId) {
    // Edit existing
    for (var i = 0; i < draftConfig.menus.length; i++) {
      if (draftConfig.menus[i].id === editingMenuId) {
        var oldGroup = draftConfig.menus[i].group;
        draftConfig.menus[i].label = label;
        draftConfig.menus[i].group = group;
        draftConfig.menus[i].route = route;
        draftConfig.menus[i].icon = icon;
        // If group changed, auto-assign order to end of new group
        if (group !== (oldGroup || '')) {
          var maxOrder = 0;
          for (var j = 0; j < draftConfig.menus.length; j++) {
            if ((draftConfig.menus[j].group || '') === group && draftConfig.menus[j].id !== editingMenuId) {
              if (draftConfig.menus[j].order > maxOrder) maxOrder = draftConfig.menus[j].order;
            }
          }
          draftConfig.menus[i].order = orderStr ? parseInt(orderStr) : maxOrder + 1;
        } else if (orderStr) {
          draftConfig.menus[i].order = parseInt(orderStr);
        }
        break;
      }
    }
    showToast('菜单「' + label + '」已更新', 'success');
  } else {
    // New - check id uniqueness
    for (var k = 0; k < draftConfig.menus.length; k++) {
      if (draftConfig.menus[k].id === id) { showToast('菜单标识已存在', 'warning'); return; }
    }
    var maxOrder = 0;
    for (var m = 0; m < draftConfig.menus.length; m++) {
      if ((draftConfig.menus[m].group || '') === group) {
        if (draftConfig.menus[m].order > maxOrder) maxOrder = draftConfig.menus[m].order;
      }
    }
    var newOrder = orderStr ? parseInt(orderStr) : maxOrder + 1;
    draftConfig.menus.push({
      id: id, label: label, icon: icon, group: group,
      order: newOrder, route: route, status: 'active'
    });
    showToast('菜单「' + label + '」已添加', 'success');
  }


  closeMenuModal();
  renderAll();

  if (typeof writeLog === 'function') {
    writeLog({ module: 'menu', actionType: editingMenuId ? 'update' : 'create', targetType: 'menu', targetId: editingMenuId || id, targetName: label, detail: editingMenuId ? '编辑菜单' : '新增菜单', result: 'success' });
  }
}

// ========== DELETE ==========
function openDeleteMenuModal(id) {
  deletingMenuId = id;
  for (var i = 0; i < draftConfig.menus.length; i++) {
    if (draftConfig.menus[i].id === id) {
      document.getElementById('deleteTargetLabel').textContent = draftConfig.menus[i].label;
      break;
    }
  }
  document.getElementById('deleteModal').classList.add('show');
}

function closeDeleteModal() {
  document.getElementById('deleteModal').classList.remove('show');
  deletingMenuId = null;
}

function confirmDeleteMenu() {
  if (!deletingMenuId) return;
  var label = '';
  draftConfig.menus = draftConfig.menus.filter(function(m) {
    if (m.id === deletingMenuId) { label = m.label; return false; }
    return true;
  });

  closeDeleteModal();
  showToast('菜单「' + label + '」已删除', 'success');
  if (typeof writeLog === 'function') writeLog({ module: 'menu', actionType: 'delete', targetType: 'menu', targetId: deletingMenuId, targetName: label, detail: '删除菜单', result: 'success' });
  renderAll();
}

// ========== RESET ==========
function resetToDefault() {
  document.getElementById('resetModal').classList.add('show');
}

function closeResetModal() {
  document.getElementById('resetModal').classList.remove('show');
}

function confirmReset() {
  draftConfig = JSON.parse(JSON.stringify(getDefaultConfig()));

  closeResetModal();
  showToast('已重置为默认配置，请点击"保存配置"生效', 'success');
  if (typeof writeLog === 'function') writeLog({ module: 'menu', actionType: 'update', targetType: 'menu', detail: '重置菜单为默认配置（未保存）', result: 'success' });
  renderAll();
}

// ========== SAVE WITH VALIDATION ==========
function saveConfig() {
  // 1. Check id uniqueness
  var idSet = {};
  for (var i = 0; i < draftConfig.menus.length; i++) {
    var mid = draftConfig.menus[i].id;
    if (idSet[mid]) { showToast('菜单标识「' + mid + '」重复，请修复后再保存', 'error'); return; }
    idSet[mid] = true;
  }
  // 2. Check order uniqueness within each group + auto-fix
  var groupOrders = {};
  for (var j = 0; j < draftConfig.menus.length; j++) {
    var g = draftConfig.menus[j].group || '';
    if (!groupOrders[g]) groupOrders[g] = [];
    groupOrders[g].push(draftConfig.menus[j]);
  }
  var fixed = false;
  for (var gk in groupOrders) {
    var items = groupOrders[gk];
    items.sort(function(a, b) { return a.order - b.order; });
    var seen = {};
    for (var k = 0; k < items.length; k++) {
      if (seen[items[k].order]) {
        // Auto renumber with gaps of 10
        for (var r = 0; r < items.length; r++) {
          items[r].order = (r + 1) * 10;
        }
        fixed = true;
        break;
      }
      seen[items[k].order] = true;
    }
  }
  // 3. Clean groupOrder - remove non-existent groups
  var actualGroups = {};
  for (var m = 0; m < draftConfig.menus.length; m++) {
    actualGroups[draftConfig.menus[m].group || ''] = true;
  }
  draftConfig.groupOrder = draftConfig.groupOrder.filter(function(g) { return actualGroups[g]; });
  // Add missing groups to end
  for (var ag in actualGroups) {
    if (draftConfig.groupOrder.indexOf(ag) === -1 && ag !== '') {
      draftConfig.groupOrder.push(ag);
    }
  }
  // Ensure '' is first in groupOrder
  if (draftConfig.groupOrder.indexOf('') === 0) {
    // Already first, fine
  } else if (draftConfig.groupOrder.indexOf('') > 0) {
    draftConfig.groupOrder = draftConfig.groupOrder.filter(function(g) { return g !== ''; });
    draftConfig.groupOrder.unshift('');
  }

  // Persist to localStorage
  savedConfig = JSON.parse(JSON.stringify(draftConfig));
  localStorage.setItem('menu_config', JSON.stringify(savedConfig));

  var msg = '菜单配置已保存';
  if (fixed) msg += '（排序号已自动修复）';
  showToast(msg, 'success');
  if (typeof writeLog === 'function') writeLog({ module: 'menu', actionType: 'update', targetType: 'menu', detail: '保存菜单配置', result: 'success' });
  renderAll();
}

// ========== SIDEBAR ==========

  var ROUTES = {
    account: 'account-management.html', org: 'org-management.html',
    perm: 'perm-management.html', log: 'log-management.html', menuMgr: 'menu-management.html', announcement: 'announcement-management.html',
    'contract-entry': 'contract-entry-list-admin.html', 'contract-exit': 'contract-exit-list-admin.html'
  };
  var dest = ROUTES[id];
  if (dest) window.location.href = dest;
}

// ========== UTILS ==========
function toggleUserMenu() { document.getElementById('userDropdown').classList.toggle('show'); }

  var ROLES = {
    system:   { label:'系统管理员', name:'赵建国' },
    city:     { label:'市管理员', name:'张建国' },
    district: { label:'区管理员', name:'李振华' },
    school:   { label:'校管理员', name:'王玉兰' },
    teacher:  { label:'教 师',   name:'陈明辉' }
  };
  var dots = { system: 'system', city: 'city', district: 'district', school: 'school', teacher: 'teacher' };
  var html = '';
  for (var key in ROLES) {
    var cfg = ROLES[key];
    var activeClass = (currentUser.role === key) ? ' active' : '';
    html += '<button class="role-switch-btn' + activeClass + '" onclick="switchRole(\'' + key + '\')">';
    html += '<span class="role-switch-dot ' + dots[key] + '"></span>';
    html += '<span class="role-switcher-name">' + cfg.label + '</span>';
    html += '<span style="font-size:10px;color:rgba(255,255,255,0.3);margin-left:auto;">' + escapeHtml(cfg.name) + '</span>';
    html += '</button>';
  }
  document.getElementById('roleBtns').innerHTML = html;
}


function showToast(msg, type) {
  var t = document.getElementById('toast');
  t.textContent = msg; t.className = 'toast ' + (type || 'success') + ' show';
  setTimeout(function() { t.classList.remove('show'); }, 2500);
}

function escapeHtml(s) { if (!s) return ''; return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function escapeAttr(s) { if (!s) return ''; return String(s).replace(/'/g,"\\'").replace(/"/g,'&quot;'); }

// ========== INIT ==========
function init() {
  var raw = localStorage.getItem('currentUser');
  if (raw) { try { currentUser = JSON.parse(raw); } catch(e) {} }
  if (!currentUser || !currentUser.role) { currentUser = { role: 'system', name: '赵建国', id: '13807720000' }; }

  if (currentUser.role !== 'system') {
    document.getElementById('mainContent').innerHTML =
      '<div class="breadcrumb"><a href="workbench.html">首页</a> &nbsp;/&nbsp; <span>菜单管理</span></div>' +
      '<div style="text-align:center;padding:60px;color:var(--text-light);background:#fff;border-radius:var(--radius-lg);border:1px solid var(--border);">' +
      '<p style="font-size:16px;">您无权访问菜单管理</p><p style="font-size:13px;margin-top:8px;">仅系统管理员可管理菜单</p></div>';
    return;
  }

  document.getElementById('userName').textContent = currentUser.name || '赵建国';
  document.getElementById('userAvatar').textContent = (currentUser.name || '赵')[0];
  loadConfig();
  renderIconPicker(); // Prepare icon picker
  renderAll();
}

// Unsaved changes warning on page leave
window.addEventListener('beforeunload', function(e) {
  if (isDirty()) {
    e.preventDefault();
    e.returnValue = '您有未保存的修改，确定离开吗？';
  }
});

// Close modals on overlay click
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-overlay')) e.target.classList.remove('show');
  if (!e.target.closest('#userDropdown') && !e.target.closest('.topnav-user')) {
    document.getElementById('userDropdown').classList.remove('show');
  }
});

init();
