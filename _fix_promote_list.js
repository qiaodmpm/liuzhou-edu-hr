var fs = require('fs');
var c = fs.readFileSync('promote-list-admin.html', 'utf8');

// 1. Replace card CSS with table CSS
var oldCSS = '.school-group { background: #fff; border-radius: var(--radius-lg); border: 1px solid var(--border); box-shadow: var(--shadow-sm); margin-bottom: 12px; overflow: hidden; }' +
'.school-group-header { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; cursor: pointer; transition: var(--transition); user-select: none; }' +
'.school-group-header:hover { background: #FAFBFC; }' +
'.school-group-header .sg-left { display: flex; align-items: center; gap: 10px; }' +
'.school-group-header .expand-icon { transition: transform var(--transition); font-size: 12px; color: var(--text-light); }' +
'.school-group-header.open .expand-icon { transform: rotate(90deg); }' +
'.school-group-name { font-size: 14px; font-weight: 600; color: var(--text); }' +
'.school-group-count { font-size: 12px; color: var(--text-secondary); background: var(--gray-bg); padding: 2px 10px; border-radius: 10px; }' +
'.school-group-body { display: none; padding: 0 18px 16px; }' +
'.school-group-header.open + .school-group-body { display: block; }' +
'.batch-summary-card { background: #FAFBFC; border: 1px solid var(--border); border-radius: 8px; padding: 14px 16px; margin-bottom: 10px; }' +
'.batch-summary-card .summary-header { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; font-weight: 600; font-size: 13px; color: var(--text); }' +
'.batch-summary-card .summary-stats { display: flex; flex-wrap: wrap; gap: 16px; font-size: 12px; color: var(--text-secondary); margin-bottom: 6px; }' +
'.batch-summary-card .summary-stats .stat-item strong { color: var(--text); }' +
'.batch-summary-card .summary-types { display: flex; gap: 6px; margin-bottom: 10px; }' +
'.batch-summary-card .type-tag { padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 500; background: #EFF6FF; color: var(--primary); }' +
'.batch-summary-card .summary-actions { display: flex; gap: 8px; padding-top: 10px; border-top: 1px solid var(--border); }' +
'.batch-summary-card .summary-actions .action-link { font-size: 12px; }';

var newCSS = '.school-group-table { width: 100%; border-collapse: collapse; font-size: 13px; }' +
'.school-group-table th { padding: 10px 14px; text-align: left; font-weight: 600; font-size: 11px; color: var(--text-secondary); background: #F8FAFC; border-bottom: 2px solid var(--border); white-space: nowrap; }' +
'.school-group-table th.center { text-align: center; }' +
'.school-group-table td { padding: 10px 14px; border-bottom: 1px solid var(--border); vertical-align: middle; }' +
'.school-group-table td.center { text-align: center; }' +
'.school-group-table tr:hover { background: #FAFBFC; }' +
'.school-group-table tr:last-child td { border-bottom: none; }' +
'.school-group-table .sg-school { font-weight: 600; color: var(--text); }' +
'.school-group-table .sg-category { font-size: 11px; color: var(--text-light); margin-top: 2px; }' +
'.school-group-table .sg-batch { font-size: 12px; }' +
'.school-group-table .stat-num { font-weight: 600; }' +
'.school-group-table .stat-pending { color: var(--warning); }' +
'.school-group-table .stat-approved { color: var(--success); }' +
'.school-group-table .stat-rejected { color: var(--danger); }' +
'.school-group-table .action-cell { white-space: nowrap; }';

if (c.indexOf(oldCSS) === -1) {
  console.log('ERROR: Old CSS not found');
  process.exit(1);
}
c = c.replace(oldCSS, newCSS);

// 2. Replace renderSchoolGroups with renderSchoolTable
var oldFunc = "function renderSchoolGroups(records) {\n" +
"  if (records.length === 0) {\n" +
"    return '<div class=\"table-card\"><div class=\"empty-state\"><div class=\"empty-icon\">📋</div><div class=\"empty-text\">暂无匹配的申报记录</div></div></div>';\n" +
"  }\n" +
"  var groups = getSchoolBatchGroups(records);\n" +
"  var h = '';\n" +
"  groups.forEach(function(g) {\n" +
"    var hasPendingSecond = g.statusCounts['pending_second'] > 0;\n" +
"    var hasPendingThird = g.statusCounts['pending_third'] > 0;\n" +
"    var canAuditSchool = hasPendingSecond || hasPendingThird;\n" +
"    var statusLabels = { pending_first: '待一审', first_approved: '一审通过', first_rejected: '一审驳回', pending_second: '待二审', second_approved: '二审通过', second_rejected: '二审驳回', pending_third: '待三审', third_rejected: '三审驳回', completed: '已完成' };\n" +
"    var typeNames = { mgmt: '管理岗', prof: '专技岗', labor: '工勤岗' };\n" +
"    var statusParts = [];\n" +
"    Object.keys(statusLabels).forEach(function(k) {\n" +
"      if (g.statusCounts[k]) statusParts.push(statusLabels[k] + ' ' + g.statusCounts[k]);\n" +
"    });\n" +
"    var typeParts = [];\n" +
"    Object.keys(typeNames).forEach(function(k) {\n" +
"      if (g.typeCounts[k]) typeParts.push(typeNames[k] + ' ' + g.typeCounts[k] + '人');\n" +
"    });\n" +
"\n" +
"    h += '<div class=\"school-group\">';\n" +
"    h += '<div class=\"school-group-header open\" onclick=\"toggleSchoolGroup(this)\">';\n" +
"    h += '<div class=\"sg-left\"><span class=\"expand-icon\">▶</span>';\n" +
"    h += '<span class=\"school-group-name\">' + g.schoolName + '</span>';\n" +
"    if (g.category) h += '<span class=\"cat-badge ' + (g.category === '鱼峰区属' ? 'district' : 'city') + '\">' + g.category + '</span>';\n" +
"    h += '</div>';\n" +
"    h += '<span class=\"school-group-count\">共 ' + g.records.length + ' 人</span>';\n" +
"    h += '</div>';\n" +
"    h += '<div class=\"school-group-body\">';\n" +
"    h += '<div class=\"batch-summary-card\">';\n" +
"    h += '<div class=\"summary-header\">📋 ' + (g.batchName || '未知批次') + '</div>';\n" +
"    h += '<div class=\"summary-stats\">';\n" +
"    h += '<span class=\"stat-item\">状态分布：<strong>' + (statusParts.join(' | ') || '—') + '</strong></span>';\n" +
"    h += '</div>';\n" +
"    h += '<div class=\"summary-stats\">';\n" +
"    h += '<span class=\"stat-item\">申报类别：<strong>' + (typeParts.join('、') || '—') + '</strong></span>';\n" +
"    h += '</div>';\n" +
"    h += '<div class=\"summary-actions\">';\n" +
"    h += '<button class=\"btn btn-outline btn-sm\" onclick=\"viewSchoolDetail(\\'" + g.schoolName.replace(/'/g,\"\\\\'\") + "\\',\\'" + (g.batchId||'') + "\\')\">查看申报详情</button>';\n" +
"    if (hasPendingSecond && canAuditSchool) {\n" +
"      var firstRec = g.records[0];\n" +
"      h += '<button class=\"btn btn-primary btn-sm\" onclick=\"secondReview(\\'" + (firstRec.id||'') + "\\',\\'" + g.schoolName.replace(/'/g,\"\\\\'\") + "\\',\\'" + (g.batchId||'') + "\\')\">进入二审</button>';\n" +
"    }\n" +
"    if (hasPendingThird && canAuditSchool) {\n" +
"      var firstRec3 = g.records[0];\n" +
"      h += '<button class=\"btn btn-primary btn-sm\" onclick=\"thirdReview(\\'" + (firstRec3.id||'') + "\\',\\'" + g.schoolName.replace(/'/g,\"\\\\'\") + "\\',\\'" + (g.batchId||'') + "\\')\">进入三审</button>';\n" +
"    }\n" +
"    h += '</div>';\n" +
"    h += '</div>';\n" +
"    h += '</div></div>';\n" +
"  });\n" +
"  return h;\n" +
"}";

var newFunc = "function renderSchoolGroups(records) {\n" +
"  if (records.length === 0) {\n" +
"    return '<div class=\"table-card\"><div class=\"empty-state\"><div class=\"empty-icon\">📋</div><div class=\"empty-text\">暂无匹配的申报记录</div></div></div>';\n" +
"  }\n" +
"  var groups = getSchoolBatchGroups(records);\n" +
"  var statusLabels = { pending_first: '待一审', first_approved: '一审通过', first_rejected: '一审驳回', pending_second: '待二审', second_approved: '二审通过', second_rejected: '二审驳回', pending_third: '待三审', third_rejected: '三审驳回', completed: '已完成' };\n" +
"  var typeNames = { mgmt: '管理岗', prof: '专技岗', labor: '工勤岗' };\n" +
"  var h = '<div class=\"table-card\"><div class=\"table-scroll\"><table class=\"school-group-table\"><thead><tr>';\n" +
"  h += '<th>学校</th><th class=\"center\">批次</th><th class=\"center\">申报人数</th><th class=\"center\">待审核</th><th class=\"center\">已通过</th><th class=\"center\">已驳回</th><th class=\"center\">操作</th>';\n" +
"  h += '</tr></thead><tbody>';\n" +
"  groups.forEach(function(g) {\n" +
"    var hasPendingSecond = g.statusCounts['pending_second'] > 0;\n" +
"    var hasPendingThird = g.statusCounts['pending_third'] > 0;\n" +
"    var canAuditSchool = hasPendingSecond || hasPendingThird;\n" +
"\n" +
"    var pendingCount = (g.statusCounts['pending_school']||0) + (g.statusCounts['first_approved']||0) + (g.statusCounts['pending_second']||0) + (g.statusCounts['pending_third']||0);\n" +
"    var completedCount = (g.statusCounts['completed']||0) + (g.statusCounts['second_approved']||0) + (g.statusCounts['third_approved']||0);\n" +
"    var rejectedCount = (g.statusCounts['first_rejected']||0) + (g.statusCounts['second_rejected']||0) + (g.statusCounts['third_rejected']||0);\n" +
"\n" +
"    h += '<tr>';\n" +
"    h += '<td><div class=\"sg-school\">' + g.schoolName + '</div>' + (g.category ? '<div class=\"sg-category\">' + g.category + '</div>' : '') + '</td>';\n" +
"    h += '<td class=\"center\"><div class=\"sg-batch\">' + (g.batchName || '—') + '</div></td>';\n" +
"    h += '<td class=\"center\"><span class=\"stat-num\">' + g.records.length + '</span></td>';\n" +
"    h += '<td class=\"center\">' + (pendingCount > 0 ? '<span class=\"stat-num stat-pending\">' + pendingCount + '</span>' : '<span style=\"color:var(--text-light);\">0</span>') + '</td>';\n" +
"    h += '<td class=\"center\">' + (completedCount > 0 ? '<span class=\"stat-num stat-approved\">' + completedCount + '</span>' : '<span style=\"color:var(--text-light);\">0</span>') + '</td>';\n" +
"    h += '<td class=\"center\">' + (rejectedCount > 0 ? '<span class=\"stat-num stat-rejected\">' + rejectedCount + '</span>' : '<span style=\"color:var(--text-light);\">0</span>') + '</td>';\n" +
"    h += '<td class=\"center action-cell\">';\n" +
"    h += '<button class=\"btn btn-outline btn-sm\" onclick=\"viewSchoolDetail(\\'' + g.schoolName.replace(/'/g,\"\\\\'\") + '\\',\\'' + (g.batchId||'') + '\\')\">查看明细</button>';\n" +
"    if (hasPendingSecond && canAuditSchool) {\n" +
"      var firstRec = g.records[0];\n" +
"      h += '<button class=\"btn btn-primary btn-sm\" style=\"margin-left:4px;\" onclick=\"secondReview(\\'' + (firstRec.id||'') + '\\',\\'' + g.schoolName.replace(/'/g,\"\\\\'\") + '\\',\\'' + (g.batchId||'') + '\\')\">二审</button>';\n" +
"    }\n" +
"    if (hasPendingThird && canAuditSchool) {\n" +
"      var firstRec3 = g.records[0];\n" +
"      h += '<button class=\"btn btn-primary btn-sm\" style=\"margin-left:4px;\" onclick=\"thirdReview(\\'' + (firstRec3.id||'') + '\\',\\'' + g.schoolName.replace(/'/g,\"\\\\'\") + '\\',\\'' + (g.batchId||'') + '\\')\">三审</button>';\n" +
"    }\n" +
"    h += '</td></tr>';\n" +
"  });\n" +
"  h += '</tbody></table></div></div>';\n" +
"  return h;\n" +
"}";

if (c.indexOf(oldFunc) === -1) {
  console.log('ERROR: Old renderSchoolGroups not found');
  process.exit(1);
}
c = c.replace(oldFunc, newFunc);

// 3. Remove toggleSchoolGroup function
var toggleFunc = "function toggleSchoolGroup(header) {\n" +
"  header.classList.toggle('open');\n" +
"  var body = header.nextElementSibling;\n" +
"  if (body) body.style.display = body.style.display === 'none' || body.style.display === '' ? 'block' : 'none';\n" +
"}";

c = c.replace(toggleFunc, '');

fs.writeFileSync('promote-list-admin.html', c, 'utf8');
console.log('Done');

// Verify syntax
var m = c.match(/<script>([\s\S]*?)<\/script>/);
try { new Function(m[1]); console.log('Syntax OK'); } catch(e) { console.log('ERROR: ' + e.message.substring(0,60)); }
