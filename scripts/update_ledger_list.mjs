import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, '..', 'org-ledger-admin.html');
let content = fs.readFileSync(filePath, 'utf-8');

// Find markers
const startMarker = '  // Filter bar';
const endMarker = "  document.getElementById('mainContent').innerHTML = h;";
const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker, startIdx);
if (startIdx < 0 || endIdx < 0) { console.log('Markers not found'); process.exit(1); }

const replacement = `  // Filter bar (outside list card, matching post-list-admin pattern)
  h += '<div class="filter-bar">';
  h += '<div class="filter-tabs">';
  h += '<button class="filter-tab' + (filterStatus==='all'?' active':'') + '" onclick="filterStatus=\\'all\\';currentPage=1;renderList()">全部</button>';
  h += '<button class="filter-tab' + (filterStatus==='pending'?' active':'') + '" onclick="filterStatus=\\'pending\\';currentPage=1;renderList()">待审核</button>';
  h += '<button class="filter-tab' + (filterStatus==='active'?' active':'') + '" onclick="filterStatus=\\'active\\';currentPage=1;renderList()">已生效</button>';
  h += '<button class="filter-tab' + (filterStatus==='draft'?' active':'') + '" onclick="filterStatus=\\'draft\\';currentPage=1;renderList()">待提交</button>';
  h += '</div>';
  h += '<select onchange="filterDistrict=this.value;currentPage=1;renderList()"><option value="all"' + (filterDistrict==='all'?' selected':'') + '>全部区域</option><option value="市直属"' + (filterDistrict==='市直属'?' selected':'') + '>市直属</option><option value="鱼峰区"' + (filterDistrict==='鱼峰区'?' selected':'') + '>鱼峰区</option><option value="城中区"' + (filterDistrict==='城中区'?' selected':'') + '>城中区</option></select>';
  h += '<input placeholder="搜索学校..." value="' + escapeHtml(searchText) + '" oninput="searchText=this.value;currentPage=1;renderList()" style="width:180px;padding:6px 10px;font-size:12px;border:1px solid var(--border);border-radius:6px;font-family:inherit;">';
  h += '</div>';

  // Table with pagination
  var totalItems = filteredLedgers.length;
  var totalPages = Math.ceil(totalItems / pageSize);
  if (currentPage > totalPages) currentPage = totalPages || 1;
  var startIdxI = (currentPage - 1) * pageSize;
  var pageData = filteredLedgers.slice(startIdxI, startIdxI + pageSize);

  h += '<div class="list-card">';
  h += '<div class="table-scroll">';
  h += '<table class="list-table">';
  h += '<thead><tr>';
  h += '<th>学校编号</th><th>学校名称</th><th>所属区域</th><th>学校类型</th><th>机构级别</th>';
  h += '<th>核定编制数</th><th>实有在编人数</th><th>核定控制数</th><th>实有控制数</th><th>岗位总量</th>';
  h += '<th>提交时间</th><th>状态</th><th>操作</th>';
  h += '</tr></thead><tbody>';

  pageData.forEach(function(d) {
    var comp = getComputed(d);
    var isDraft = !d.submittedAt;
    var status = d.status || 'active';
    var statusLabel, statusCls;
    if (isDraft) { statusLabel = '待提交'; statusCls = 'none'; }
    else if (status === 'pending') { statusLabel = '待审核'; statusCls = 'pending'; }
    else { statusLabel = '已生效'; statusCls = 'active'; }

    h += '<tr>';
    h += '<td class="col-id">' + escapeHtml(d.schoolId||'—') + '</td>';
    h += '<td class="col-name">' + escapeHtml(d.schoolName) + '</td>';
    h += '<td>' + escapeHtml(d.district) + '</td>';
    h += '<td>' + escapeHtml(d.schoolType) + '</td>';
    h += '<td>' + escapeHtml(d.orgLevel) + '</td>';
    h += '<td class="col-num">' + d.careerQuota + '</td>';
    h += '<td class="col-num">' + d.careerActual + '</td>';
    h += '<td class="col-num">' + d.controlQuota + '</td>';
    h += '<td class="col-num">' + d.controlActual + '</td>';
    h += '<td class="col-num">' + comp.totalPosts + '</td>';
    h += '<td>' + (d.submittedAt ? d.submittedAt.substring(5) : '—') + '</td>';
    h += '<td><span class="status-badge ' + statusCls + '">' + statusLabel + '</span></td>';
    h += '<td class="col-action"><div class="action-links">';
    if (isDraft) {
      h += '<a class="action-link" href="org-ledger-detail.html?school=' + encodeURIComponent(d.schoolName) + '&mode=view">查看</a>';
    } else if (status === 'pending') {
      h += '<a class="action-link" href="org-ledger-detail.html?school=' + encodeURIComponent(d.schoolName) + '&mode=review">审核</a>';
    } else {
      h += '<a class="action-link" href="org-ledger-detail.html?school=' + encodeURIComponent(d.schoolName) + '&mode=view">查看</a>';
    }
    h += '</div></td>';
    h += '</tr>';
  });
  h += '</tbody></table>';
  h += '</div>';

  // Pagination
  h += '<div class="pagination">';
  h += '<span>共 ' + totalItems + ' 条</span>';
  h += '<div class="pagination-btns">';
  h += '<button onclick="goPage(' + (currentPage - 1) + ')"' + (currentPage <= 1 ? ' disabled' : '') + '>◀</button>';
  for (var p = 1; p <= totalPages; p++) {
    h += '<button onclick="goPage(' + p + ')"' + (p === currentPage ? ' class="active"' : '') + '>' + p + '</button>';
  }
  h += '<button onclick="goPage(' + (currentPage + 1) + ')"' + (currentPage >= totalPages ? ' disabled' : '') + '>▶</button>';
  h += '</div>';
  h += '<span>' + pageSize + ' 条/页</span>';
  h += '</div>';

  if (totalItems === 0) {
    h += '<div style="text-align:center;padding:48px 20px;">';
    h += '<div style="font-size:36px;margin-bottom:8px;">📋</div>';
    h += '<div style="font-size:14px;color:var(--text-secondary);">暂无匹配的学校台账</div>';
    h += '</div>';
  }

  h += '</div>';

`;

content = content.slice(0, startIdx) + replacement + content.slice(endIdx);
fs.writeFileSync(filePath, content, 'utf-8');
console.log('Updated. New length:', content.split('\n').length);
