import { readFileSync, writeFileSync } from 'fs';

const NEW_RENDER_SIDEBAR = `function renderSidebar(){
  if (currentRole === 'teacher') {
    var rd = ROLES.teacher; if (!rd || !rd.sidebar) { document.getElementById('sidebarMenu').innerHTML = ''; return; }
    var h = '';
    (rd.sidebar.top||[]).forEach(function(i){h+='<a class="menu-item" onclick="sidebarClick(this,\\''+i.id+'\\')">'+(ICONS[i.icon]||'')+'<span class="menu-label">'+i.label+'</span></a>';});
    (rd.sidebar.groups||[]).forEach(function(g){h+='<div class="menu-group">'+g.name+'</div>';g.items.forEach(function(i){h+='<a class="menu-item" onclick="sidebarClick(this,\\''+i.id+'\\')">'+(ICONS[MENU_ICONS[i.id]||'file'])+'<span class="menu-label">'+i.label+'</span>'+(i.badge?'<span class="menu-badge">'+i.badge+'</span>':'')+'</a>';});});
    document.getElementById('sidebarMenu').innerHTML = h;
  } else {
    renderSidebarMenu('sidebarMenu', currentRole, 'MIGRATE_ACTIVE_ID');
  }
}`;

const SIDEBAR_CLICK_ONE_ARG = `function sidebarClick(el, id) {
  if (arguments.length === 1) { id = el; el = null; }
  if (el) { document.querySelectorAll('.sidebar-menu .menu-item').forEach(function(i){i.classList.remove('active');}); el.classList.add('active'); }`;

const ROUTE_INSERT = `
  if (id === 'announcement') { window.location.href = 'announcement-management.html'; return; }
  if (id === 'menuMgr') { window.location.href = 'menu-management.html'; return; }
  if (id === 'perm') { window.location.href = 'perm-management.html'; return; }
  if (id === 'log') { window.location.href = 'log-management.html'; return; }`;

// Map of file -> active menu ID
const ACTIVE_IDS = {
  'employ-list-admin.html': 'employ',
  'employ-list-school.html': 'employ',
  'employ-form.html': 'employ',
  'employ-detail.html': 'employ',
  'employ-audit-first.html': 'employ',
  'employ-audit-second.html': 'employ',
  'employ-hr-entry.html': 'employ',
};

for (const [file, activeId] of Object.entries(ACTIVE_IDS)) {
  let content = readFileSync(file, 'utf8');
  const orig = content;

  // 1. Add menu-config.js before first <script>
  content = content.replace('<script>', '<script src="src/menu-config.js"></script>\n<script>');

  // 2. Replace renderSidebar
  const rsReplacement = NEW_RENDER_SIDEBAR.replace('MIGRATE_ACTIVE_ID', activeId);
  content = content.replace(/function renderSidebar\(\)\{[\s\S]*?document\.getElementById\('sidebarMenu'\)\.innerHTML=h;[\s\S]*?\}/, rsReplacement);

  // 3. Update sidebarClick to handle 1-arg (replace signature + old el.classList.add line)
  content = content.replace(
    /function sidebarClick\(el,\s*id\)\s*\{\s*\n\s*el\.classList\.add\('active'\);/,
    SIDEBAR_CLICK_ONE_ARG
  );

  // 4. Add routes before the last showToast line
  if (content.includes('showToast(')) {
    content = content.replace(
      /(\s*)(showToast\([^;]+;\s*\})/m,
      ROUTE_INSERT + '\n$1$2'
    );
  }

  if (content !== orig) {
    writeFileSync(file, content);
    console.log('Updated: ' + file);
  } else {
    console.log('NO CHANGE: ' + file);
  }
}
