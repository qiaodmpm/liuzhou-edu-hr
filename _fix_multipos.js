var fs = require("fs");
var src = fs.readFileSync("employ-form.html", "utf8");

// ===== STEP 1: Update formData declaration =====
src = src.replace(
  "var formData = {\n  // 招聘类\n  rosterRows: [],       // 附件5 花名册行\n  recordCards: [],      // 附件6 备案表（每个花名册行对应一个）\n  personAttachments: {}, // 人员附件 keyed by rosterRow index: { 0: [{name,size}], 1: [...] }\n  summaryForm: {},      // 附件4 基本情况表\n  // 调动类\n  transferRows: [],     // 附件1 交流备案表行\n  transferForm: {}      // 附件2 交流登记表\n};",
  "var formData = {\n  // 招聘类 — 多岗位数组\n  positions: [],        // [{ batchId, batchName, positionName, planCount, completedCount, rosterRows:[], recordCards:[], personAttachments:{} }]\n  summaryForm: {},      // 附件4 基本情况表\n  // 调动类\n  transferRows: [],     // 附件1 交流备案表行\n  transferForm: {}      // 附件2 交流登记表\n};"
);

// ===== STEP 2: Update getTotalCount =====
src = src.replace(
  "function getTotalCount() {\n  if (businessType === 'recruitment') return formData.rosterRows.length;\n  return formData.transferRows.length;\n}",
  "function getTotalCount() {\n  if (businessType === 'recruitment') {\n    var t = 0;\n    formData.positions.forEach(function(p) { t += (p.rosterRows||[]).length; });\n    return t;\n  }\n  return formData.transferRows.length;\n}"
);

// ===== STEP 3: Update initFormData =====
src = src.replace(
  "function initFormData() {\n  if (businessType === 'recruitment') {\n    if (formData.rosterRows.length === 0) {\n      formData.rosterRows = [{ seq:1, name:'', gender:'', birth:'', eduDegree:'', gradSchool:'', score:'', rank:'', title:'', position:'', method:'career', source:'', originalUnit:'', spouse:'', remark:'' }];\n    }\n    if (!formData.rosterMeta) {\n      formData.rosterMeta = { positionName: '' };\n    }\n    if (!formData.personAttachments) {\n      formData.personAttachments = {};\n    }",
  "function initFormData() {\n  if (businessType === 'recruitment') {\n    if (formData.positions.length === 0) {\n      addPosition();\n    }"
);

// ===== STEP 4: Replace renderRecruitmentForms and related functions =====
// Find the full renderRecruitmentForms function
var rrfStart = src.indexOf("function renderRecruitmentForms()");
var rrfEnd = src.indexOf("function openRecordCardModal");
var rrfCode = src.substring(rrfStart, rrfEnd);

var newRRF =
`function renderRecruitmentForms() {
  var h = '';
  formData.positions.forEach(function(pos, pi) {
    var batchName = pos.batchName || '';
    var posName = pos.positionName || '';
    h += '<div class="form-card" id="posCard_' + pi + '">';
    h += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--border);">';
    h += '<h2 style="font-size:15px;font-weight:600;margin:0;padding:0;border:none;"><span class="card-icon">&#128203;</span>拟聘岗位 ' + (pi+1) + (posName?' &mdash; '+escapeHtml(posName):'') + '</h2>';
    if (formData.positions.length > 1) {
      h += '<span onclick="removePosition('+pi+')" style="font-size:12px;color:var(--danger);cursor:pointer;padding:4px 10px;border:1px solid var(--danger);border-radius:4px;">× 移除此岗位</span>';
    }
    h += '</div>';

    // Batch select + position name select
    var openBatches = getCompletedRecruitBatches();
    h += '<div class="modal-row" style="margin-bottom:10px;">';
    h += '<div class="mg"><span style="font-size:11px;color:var(--text-secondary);">关联招聘批次 <span class="req">*</span></span>';
    h += '<select onchange="onPositionBatchChange('+pi+',this.value)" style="width:100%;padding:6px 8px;font-size:12px;border:1px solid var(--border);border-radius:4px;font-family:inherit;">';
    h += '<option value="">— 请选择批次 —</option>';
    openBatches.forEach(function(b) {
      h += '<option value="'+b.id+'"'+(b.id===pos.batchId?' selected':'')+'>'+escapeHtml(b.name)+'</option>';
    });
    h += '</select></div>';
    h += '<div class="mg"><span style="font-size:11px;color:var(--text-secondary);">招聘岗位名称 <span class="req">*</span></span>';
    h += '<select onchange="onPositionNameChange('+pi+',this.value)" style="width:100%;padding:6px 8px;font-size:12px;border:1px solid var(--border);border-radius:4px;font-family:inherit;">';
    h += '<option value="">— 请先选择批次 —</option>';
    h += '</select></div>';
    h += '</div>';

    // Summary
    var planC = pos.planCount || 0;
    var compC = pos.completedCount || 0;
    var currC = (pos.rosterRows||[]).length;
    h += '<div style="display:flex;gap:16px;flex-wrap:wrap;padding:8px 12px;background:#F8FAFC;border:1px solid var(--border);border-radius:6px;margin-bottom:10px;">';
    h += '<div><span style="font-size:11px;color:var(--text-secondary);">招聘单位</span><div style="font-size:13px;font-weight:500;">'+escapeHtml(currentSchool)+'</div></div>';
    h += '<div><span style="font-size:11px;color:var(--text-secondary);">招聘计划（人）</span><div style="font-size:13px;font-weight:500;">'+(planC||'—')+'</div></div>';
    h += '<div><span style="font-size:11px;color:var(--text-secondary);">已完成招聘（人）</span><div style="font-size:13px;font-weight:500;">'+(compC||'0')+'</div></div>';
    h += '<div><span style="font-size:11px;color:var(--text-secondary);">本次办理聘用（人）</span><div style="font-size:13px;font-weight:500;color:var(--primary);">'+currC+'</div></div>';
    h += '</div>';

    // Roster table
    h += '<div class="dyn-table-wrap">';
    h += '<table class="dyn-table" id="rosterTable_'+pi+'">';
    h += '<thead><tr><th>序号</th><th>姓名 <span class="req">*</span></th><th>性别</th><th>出生年月</th><th>学历学位</th>';
    h += '<th>毕业学校及专业</th><th>综合成绩</th><th>综合排名</th><th>职称</th>';
    h += '<th>拟聘岗位</th><th>用人方式</th><th>原单位</th><th>配偶</th><th>备注</th>';
    h += '<th>操作</th><th style="width:30px;"></th></tr></thead><tbody id="rosterBody_'+pi+'">';
    var rows = pos.rosterRows || [];
    rows.forEach(function(row, ri) {
      var hasCard = pos.recordCards && pos.recordCards[ri] && pos.recordCards[ri].idNumber;
      var pAtt = (pos.personAttachments||{})[ri] || [];
      h += '<tr>';
      h += '<td>'+(ri+1)+'</td>';
      h += '<td><input value="'+escapeHtml(row.name||'')+'" data-pos="'+pi+'" data-idx="'+ri+'" data-field="name"></td>';
      h += '<td><select data-pos="'+pi+'" data-idx="'+ri+'" data-field="gender"><option value="">—</option><option value="男"'+(row.gender==='男'?' selected':'')+'>男</option><option value="女"'+(row.gender==='女'?' selected':'')+'>女</option></select></td>';
      h += '<td><input value="'+escapeHtml(row.birth||'')+'" data-pos="'+pi+'" data-idx="'+ri+'" data-field="birth" placeholder="1990-01"></td>';
      h += '<td><input value="'+escapeHtml(row.eduDegree||'')+'" data-pos="'+pi+'" data-idx="'+ri+'" data-field="eduDegree"></td>';
      h += '<td><input value="'+escapeHtml(row.gradSchool||'')+'" data-pos="'+pi+'" data-idx="'+ri+'" data-field="gradSchool"></td>';
      h += '<td><input value="'+escapeHtml(row.score||'')+'" data-pos="'+pi+'" data-idx="'+ri+'" data-field="score" style="max-width:60px;"></td>';
      h += '<td><input value="'+escapeHtml(row.rank||'')+'" data-pos="'+pi+'" data-idx="'+ri+'" data-field="rank" style="max-width:50px;"></td>';
      h += '<td><input value="'+escapeHtml(row.title||'')+'" data-pos="'+pi+'" data-idx="'+ri+'" data-field="title"></td>';
      h += '<td><input value="'+escapeHtml(row.position||'')+'" data-pos="'+pi+'" data-idx="'+ri+'" data-field="position"></td>';
      h += '<td><select data-pos="'+pi+'" data-idx="'+ri+'" data-field="method"><option value="career"'+(row.method==='career'?' selected':'')+'>实名编制</option><option value="control"'+(row.method==='control'?' selected':'')+'>聘用教师控制数</option></select></td>';
      h += '<td><input value="'+escapeHtml(row.originalUnit||'')+'" data-pos="'+pi+'" data-idx="'+ri+'" data-field="originalUnit"></td>';
      h += '<td><input value="'+escapeHtml(row.spouse||'')+'" data-pos="'+pi+'" data-idx="'+ri+'" data-field="spouse"></td>';
      h += '<td><input value="'+escapeHtml(row.remark||'')+'" data-pos="'+pi+'" data-idx="'+ri+'" data-field="remark"></td>';
      h += '<td style="white-space:nowrap;">';
      if (hasCard) {
        h += '<a onclick="openRecordCardModal('+pi+','+ri+')" style="font-size:11px;color:var(--primary);cursor:pointer;text-decoration:underline;">查看备案表</a>';
      } else {
        h += '<a onclick="openRecordCardModal('+pi+','+ri+')" style="font-size:11px;color:var(--success);cursor:pointer;font-weight:500;">录入备案表</a>';
      }
      h += ' <span style="color:var(--text-light);">|</span> ';
      h += '<a onclick="openPersonFileModal('+pi+','+ri+')" style="font-size:11px;color:var(--accent);cursor:pointer;">上传材料'+(pAtt.length?'('+pAtt.length+')':'')+'</a>';
      h += '</td>';
      h += '<td class="row-del"'+(rows.length>1?' onclick="removeRosterRow('+pi+','+ri+')"':'')+' style="color:'+(rows.length>1?'var(--danger)':'var(--text-light)')+';">'+(rows.length>1?'×':'')+'</td>';
      h += '</tr>';
    });
    h += '</tbody></table></div>';
    h += '<button class="add-row-btn" onclick="addRosterRow('+pi+')">＋ 添加一行</button>';
    h += '</div>';
  });

  // Add position button
  h += '<div style="text-align:center;margin-bottom:20px;">';
  h += '<button class="btn btn-outline" onclick="addPosition()" style="border-style:dashed;">＋ 添加拟聘岗位</button>';
  h += '</div>';

  // 附件4: 基本情况表
  var sf = formData.summaryForm;
  var totalPlan = 0, totalCurrent = 0, totalCompleted = 0;
  formData.positions.forEach(function(p) {
    totalPlan += (p.planCount||0);
    totalCurrent += (p.rosterRows||[]).length;
    totalCompleted += (p.completedCount||0);
  });
  h += '<div class="form-card">';
  h += '<h2><span class="card-icon">&#128202;</span>附件4：《公开招聘工作人员基本情况表》<span style="font-size:11px;font-weight:400;color:var(--text-light);">（自动汇总计算，仅需补充存档和舆情信息）</span></h2>';
  h += '<div class="section-title">招聘计划完成情况 <span class="auto-fill-tag">自动汇总</span></div>';
  h += '<div class="form-row-3"><div class="form-group"><label>原计划招聘人数</label><input value="'+(totalPlan||0)+'" id="sf_originalPlan" onchange="updateSF()"></div>';
  h += '<div class="form-group"><label>核减或取消计划数</label><input value="'+(sf.cancelCount||0)+'" id="sf_cancelCount" onchange="updateSF()"></div>';
  h += '<div class="form-group"><label>实际招聘计划</label><input value="'+(totalPlan-(sf.cancelCount||0))+'" id="sf_actualPlan" readonly style="background:var(--gray-bg);"></div></div>';
  h += '<div class="form-row-3"><div class="form-group"><label>已办理聘用手续人数</label><input value="'+(totalCompleted||0)+'" id="sf_completedCount" onchange="updateSF()"></div>';
  h += '<div class="form-group"><label>本次办理手续人数</label><input value="'+totalCurrent+'" readonly style="background:var(--gray-bg);"></div>';
  h += '<div class="form-group"><label>还需暂缓办理人数</label><input value="'+(sf.deferCount||0)+'" id="sf_deferCount" onchange="updateSF()"></div></div>';
  h += '<div style="margin-top:12px;" class="section-title">材料存档备查情况</div>';
  h += '<div class="checkbox-group">';
  var ckItems = { 公告:'公告证明材料', 成绩:'成绩汇总表', 批复:'批复材料', 体检:'体检表', 考察:'考察材料', 证件:'证件复印件' };
  Object.keys(ckItems).forEach(function(k) {
    h += '<label><input type="checkbox" '+(sf.材料存档[k]?'checked':'')+' onchange="sf.材料存档[\''+k+'\']=this.checked"> '+ckItems[k]+'</label>';
  });
  h += '</div>';
  h += '<div class="form-group" style="margin-top:8px;"><label>其他已存档材料</label><input value="'+escapeHtml(sf.其他存档||'')+'" onchange="sf.其他存档=this.value"></div>';
  h += '<div class="form-row" style="margin-top:8px;">';
  h += '<div class="form-group"><label>是否有负面舆情</label><select onchange="sf.负面舆情=this.value===\'true\'"><option value="false"'+(sf.负面舆情?'':' selected')+'>否</option><option value="true"'+(sf.负面舆情?' selected':'')+'>是</option></select></div>';
  h += '<div class="form-group"><label>是否有举报投诉</label><select onchange="sf.举报投诉=this.value===\'true\'"><option value="false"'+(sf.举报投诉?'':' selected')+'>否</option><option value="true"'+(sf.举报投诉?' selected':'')+'>是</option></select></div>';
  h += '</div>';
  h += '</div>';

  return h;
}

function addPosition() {
  formData.positions.push({
    batchId: '',
    batchName: '',
    positionIndex: -1,
    positionName: '',
    planCount: 0,
    completedCount: 0,
    rosterRows: [{ seq:1, name:'', gender:'', birth:'', eduDegree:'', gradSchool:'', score:'', rank:'', title:'', position:'', method:'career', source:'', originalUnit:'', spouse:'', remark:'' }],
    recordCards: [],
    personAttachments: {}
  });
  renderPage();
  // Initialize position name dropdown for the new card
  var pi = formData.positions.length - 1;
  initPosNameDropdown(pi);
}

function removePosition(pi) {
  if (formData.positions.length <= 1) return;
  formData.positions.splice(pi, 1);
  renderPage();
}

function onPositionBatchChange(pi, batchId) {
  if (!batchId) {
    formData.positions[pi].batchId = '';
    formData.positions[pi].batchName = '';
    formData.positions[pi].positionName = '';
    formData.positions[pi].planCount = 0;
    formData.positions[pi].completedCount = 0;
    renderPage();
    return;
  }
  var batches = getCompletedRecruitBatches();
  var batch = batches.find(function(b) { return b.id === batchId; });
  formData.positions[pi].batchId = batchId;
  formData.positions[pi].batchName = batch ? batch.name : '';
  formData.positions[pi].positionName = '';
  formData.positions[pi].planCount = 0;
  formData.positions[pi].completedCount = 0;
  renderPage();
  initPosNameDropdown(pi);
}

function initPosNameDropdown(pi) {
  // Load position names from the recruit batch records
  var pos = formData.positions[pi];
  if (!pos || !pos.batchId) return;
  try {
    var recruitRecs = JSON.parse(localStorage.getItem('recruit_records') || '[]');
    var batchRecs = recruitRecs.filter(function(r) { return r.batchId === pos.batchId && r.status === 'completed'; });
    var selectEl = document.querySelector('#posCard_' + pi + ' select[onchange*="onPositionNameChange(' + pi + ',this.value)"]');
    if (!selectEl) return;
    selectEl.innerHTML = '<option value="">— 请选择岗位 —</option>';
    var seen = {};
    batchRecs.forEach(function(rec) {
      if (!rec.formData || !rec.formData.positions) return;
      rec.formData.positions.forEach(function(p) {
        if (p.positionName && !seen[p.positionName]) {
          seen[p.positionName] = { count: p.count || 0 };
        }
      });
    });
    Object.keys(seen).forEach(function(name) {
      selectEl.innerHTML += '<option value="' + escapeHtml(name) + '">' + escapeHtml(name) + '（计划' + (seen[name].count||0) + '人）</option>';
    });
    // Also calculate completed count from employ_records
    try {
      var employRecs = JSON.parse(localStorage.getItem('employ_records') || '[]');
      selectEl.innerHTML += '<option value="__calc__" disabled>——</option>';
    } catch(e) {}
  } catch(e) {}
}

function onPositionNameChange(pi, posName) {
  var pos = formData.positions[pi];
  if (!pos) return;
  pos.positionName = posName;
  // Calculate plan count
  if (posName && pos.batchId) {
    try {
      var recruitRecs = JSON.parse(localStorage.getItem('recruit_records') || '[]');
      var batchRecs = recruitRecs.filter(function(r) { return r.batchId === pos.batchId && r.status === 'completed'; });
      var planC = 0;
      batchRecs.forEach(function(rec) {
        if (rec.formData && rec.formData.positions) {
          rec.formData.positions.forEach(function(p) {
            if (p.positionName === posName) planC += parseInt(p.count) || 0;
          });
        }
      });
      pos.planCount = planC;
      // Calculate completed count
      try {
        var employRecs = JSON.parse(localStorage.getItem('employ_records') || '[]');
        pos.completedCount = employRecs.filter(function(r) {
          return r.recruitBatchId === pos.batchId && r.status === 'completed';
        }).length;
      } catch(e) {}
    } catch(e) {}
  }
  renderPage();
}

function addRosterRow(pi) {
  var pos = formData.positions[pi];
  if (!pos) return;
  pos.rosterRows.push({ seq:(pos.rosterRows.length+1), name:'', gender:'', birth:'', eduDegree:'', gradSchool:'', score:'', rank:'', title:'', position:'', method:'career', source:'', originalUnit:'', spouse:'', remark:'' });
  renderPage();
}

function removeRosterRow(pi, ri) {
  var pos = formData.positions[pi];
  if (!pos || pos.rosterRows.length <= 1) return;
  pos.rosterRows.splice(ri, 1);
  if (pos.recordCards) pos.recordCards.splice(ri, 1);
  renderPage();
}
`;

src = src.substring(0, rrfStart) + newRRF + src.substring(rrfEnd);

// ===== STEP 5: Update openRecordCardModal and saveRecordCard to accept (pi, ri) =====
// Replace function signature
src = src.replace(
  "function openRecordCardModal(idx) {",
  "function openRecordCardModal(pi, idx) {"
);
// Update references inside openRecordCardModal to use positions[pi].rosterRows/recordCards
src = src.replace(
  "var row = formData.rosterRows[idx];",
  "var pos = formData.positions[pi]; if (!pos) return; var row = pos.rosterRows[idx];"
);
src = src.replace(
  "var card = formData.recordCards[idx] || {};",
  "var card = (pos.recordCards||[])[idx] || {};"
);
// Update dc function references inside the modal
src = src.replace(
  /dc\(idx/g, "dc(pi, idx"
);
// Update onclick saveRecordCard
src = src.replace(
  "saveRecordCard(",
  "saveRecordCard(pi,"
);

// Update saveRecordCard function
src = src.replace(
  "function saveRecordCard(idx) {",
  "function saveRecordCard(pi, idx) {"
);
src = src.replace(
  "formData.recordCards[idx] = formData.recordCards[idx] || {};\n  Object.keys(card).forEach(function(k) { formData.recordCards[idx][k] = card[k]; });",
  "if (!formData.positions[pi].recordCards) formData.positions[pi].recordCards = [];\n  formData.positions[pi].recordCards[idx] = formData.positions[pi].recordCards[idx] || {};\n  Object.keys(card).forEach(function(k) { formData.positions[pi].recordCards[idx][k] = card[k]; });"
);

// ===== STEP 6: Update person file functions =====
src = src.replace(
  "function openPersonFileModal(idx) {",
  "function openPersonFileModal(pi, idx) {"
);
src = src.replace(
  "var row = formData.rosterRows[idx];",
  "var pos = formData.positions[pi]; if (!pos) return; var row = pos.rosterRows[idx];"
);
src = src.replace(
  "var files = formData.personAttachments[idx] || [];",
  "var files = (pos.personAttachments||{})[idx] || [];"
);
src = src.replace(
  "if (!formData.personAttachments[idx]) formData.personAttachments[idx] = [];\n    formData.personAttachments[idx].push({ name: f.name, size: f.size });",
  "if (!formData.positions[pi].personAttachments) formData.positions[pi].personAttachments = {};\n    if (!formData.positions[pi].personAttachments[idx]) formData.positions[pi].personAttachments[idx] = [];\n    formData.positions[pi].personAttachments[idx].push({ name: f.name, size: f.size });"
);
src = src.replace(
  "function handlePersonFileUpload(idx) {",
  "function handlePersonFileUpload(pi, idx) {"
);
src = src.replace(
  "function previewPersonFile(rowIdx, fileIdx) {",
  "function previewPersonFile(pi, rowIdx, fileIdx) {"
);
src = src.replace(
  "var files = formData.personAttachments[rowIdx] || [];",
  "var pos = formData.positions[pi]; if (!pos) return; var files = (pos.personAttachments||{})[rowIdx] || [];"
);
src = src.replace(
  "function downloadPersonFile(rowIdx, fileIdx) {",
  "function downloadPersonFile(pi, rowIdx, fileIdx) {"
);
src = src.replace(
  "var files = formData.personAttachments[rowIdx] || [];",
  "var pos = formData.positions[pi]; if (!pos) return; var files = (pos.personAttachments||{})[rowIdx] || [];"
);
src = src.replace(
  "function removePersonFile(rowIdx, fileIdx) {",
  "function removePersonFile(pi, rowIdx, fileIdx) {"
);
src = src.replace(
  "if (!formData.personAttachments[rowIdx]) return;\n  formData.personAttachments[rowIdx].splice(fileIdx, 1);\n  if (formData.personAttachments[rowIdx].length === 0) delete formData.personAttachments[rowIdx];",
  "var pos = formData.positions[pi]; if (!pos || !pos.personAttachments || !pos.personAttachments[rowIdx]) return;\n  pos.personAttachments[rowIdx].splice(fileIdx, 1);\n  if (pos.personAttachments[rowIdx].length === 0) delete pos.personAttachments[rowIdx];"
);

// Update onclick references in person file functions
src = src.replace(/onclick="removePersonFile\((\d+),(\d+)\)"/g, 'onclick="removePersonFile(pi,$1,$2)"');
// Actually the onclick is built dynamically - the variable reference should use proper concatenation

// ===== STEP 7: Update bindRosterTableEvents =====
src = src.replace(
  "function bindRosterTableEvents() {",
  "function bindRosterTableEvents() {\n  document.querySelectorAll('[data-pos]').forEach(function(el) {"
);
src = src.replace(
  "  document.querySelectorAll('#rosterBody input, #rosterBody select').forEach(function(el) {",
  "    if (!el.dataset || el.dataset.bound) return; el.dataset.bound = '1';"
);
// Replace the event binding
src = src.replace(
  "    el.onchange = function() {\n      var idx = parseInt(this.dataset.idx);\n      var field = this.dataset.field;\n      if (isNaN(idx) || !field) return;\n      if (!formData.rosterRows[idx]) return;\n      formData.rosterRows[idx][field] = this.value;\n      // 联动更新备案表\n      updateRecordCard(idx);\n    };\n  });\n}",
  "    el.onchange = function() {\n      var pi = parseInt(this.dataset.pos);\n      var idx = parseInt(this.dataset.idx);\n      var field = this.dataset.field;\n      if (isNaN(pi) || isNaN(idx) || !field || !formData.positions[pi]) return;\n      if (!formData.positions[pi].rosterRows[idx]) return;\n      formData.positions[pi].rosterRows[idx][field] = this.value;\n    };\n  });\n}"
);

// ===== STEP 8: Update submitForm validation =====
src = src.replace(
  "// 招聘类校验\n  if (businessType === 'recruitment') {\n    var valid = true;\n    formData.rosterRows.forEach(function(row, i) {\n      if (!row.name) { showToast('花名册第'+(i+1)+'行：请填写姓名', 'warning'); valid = false; }\n    });\n    if (!valid) return;\n    // 检查至少一行有名字\n    var hasName = formData.rosterRows.some(function(r) { return r.name; });\n    if (!hasName) { showToast('请至少填写一条花名册记录', 'warning'); return; }\n    // 校验招聘岗位名称\n    if (!formData.rosterMeta || !formData.rosterMeta.positionName) { showToast('请填写招聘岗位名称', 'warning'); return; }\n    // 校验每行是否已保存备案表\n    formData.rosterRows.forEach(function(row, i) {\n      if (row.name && (!formData.recordCards[i] || !formData.recordCards[i].idNumber)) {\n        showToast('请为「' + row.name + '」填写聘用备案表（点击操作列\"录入聘用备案表\"）', 'warning');\n        valid = false;\n      }\n    });\n    if (!valid) return;\n  }",
  "// 招聘类校验\n  if (businessType === 'recruitment') {\n    var valid = true;\n    if (formData.positions.length === 0) { showToast('请至少添加一个拟聘岗位', 'warning'); return; }\n    formData.positions.forEach(function(pos, pi) {\n      if (!pos.batchId) { showToast('拟聘岗位'+(pi+1)+'：请选择关联招聘批次', 'warning'); valid = false; return; }\n      if (!pos.positionName) { showToast('拟聘岗位'+(pi+1)+'：请选择招聘岗位名称', 'warning'); valid = false; return; }\n      (pos.rosterRows||[]).forEach(function(row, ri) {\n        if (!row.name) { showToast('拟聘岗位'+(pi+1)+'花名册第'+(ri+1)+'行：请填写姓名', 'warning'); valid = false; }\n        if (row.name && (!pos.recordCards || !pos.recordCards[ri] || !pos.recordCards[ri].idNumber)) {\n          showToast('拟聘岗位'+(pi+1)+'：请为「' + row.name + '」填写聘用备案表', 'warning');\n          valid = false;\n        }\n      });\n    });\n    if (!valid) return;\n    var hasAnyName = formData.positions.some(function(p) { return (p.rosterRows||[]).some(function(r) { return r.name; }); });\n    if (!hasAnyName) { showToast('请至少填写一条花名册记录', 'warning'); return; }\n  }"
);

// ===== STEP 9: Update loadForEdit =====
src = src.replace(
  "if (rec.formData) {\n    formData = JSON.parse(JSON.stringify(rec.formData));\n  }",
  "if (rec.formData) {\n    formData = JSON.parse(JSON.stringify(rec.formData));\n    if (!formData.positions) { formData.positions = []; }\n  }"
);

// ===== STEP 10: Fix dc function inside openRecordCardModal to use pi parameter =====
// The dc function is defined inside openRecordCardModal - we need to make it accept (pi, idx)
src = src.replace(
  "function dc(i,f){ return \"data-card=\\\\"+i+"+'\\" data-cfield=\\"'+f+'\\"\'',
  "function dc(i,f){ return \"data-card=\\\\"+i+'\\" data-cfield=\\"'+f+'\\" data-pos=\\"'+pi+'\\"\'"
);
// Wait, the dc function is in the original openRecordCardModal but we already replaced it in step 5.
// Let me check what the current dc function looks like.

// Actually, since we replaced the function signature and dc calls, the dc function inside needs updating.
// Let me find and fix it.
src = src.replace(
  'function dc(i,f){ return \'data-card="\'+i+\'" data-cfield="\'+f+\'"\'; }',
  'function dc(i,f){ return \'data-card="\'+i+\'" data-cfield="\'+f+\'" data-pos="\'+pi+\'"\'; }'
);

// ===== STEP 11: Update saveRecordCard to read from correct data-pos elements =====
src = src.replace(
  "modal.querySelectorAll('[data-card]').forEach(function(el) {",
  "modal.querySelectorAll('[data-card][data-pos=\"'+pi+'\"]').forEach(function(el) {"
);

// Clean up
src = src.replace(/\n{3,}/g, '\n\n');

fs.writeFileSync("employ-form.html", src, "utf8");
console.log("Done");
