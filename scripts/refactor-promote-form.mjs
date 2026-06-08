// Refactor promote-form.html: remove step wizard, use dropdowns for batch/type/level
import fs from 'fs';
import path from 'path';

const filePath = path.resolve('F:/qiao/project/generated-projects/liuzhou-edu-hr/promote-form.html');
let content = fs.readFileSync(filePath, 'utf8');
const NL = content.includes('\r\n') ? '\r\n' : '\n';

function log(msg) { console.log(msg); }
function ok(msg) { console.log('  ✓ ' + msg); }

// ============================================================
// UTILITY: Replace once, with error reporting
// ============================================================
function replaceOnce(from, to, label) {
  var idx = content.indexOf(from);
  if (idx === -1) {
    console.error('  ✗ FAILED: ' + label);
    console.error('    First 80 chars of search string: ' + JSON.stringify(from.substring(0, 80)));
    return false;
  }
  content = content.substring(0, idx) + to + content.substring(idx + from.length);
  ok(label);
  return true;
}

// ============================================================
// 1. CSS: Remove STEP INDICATOR block
// ============================================================
var stepBarCSS = NL +
'/* ===== STEP INDICATOR ===== */' + NL +
'.step-bar {' + NL +
'  display: flex; align-items: center; margin-bottom: 24px;' + NL +
'  padding: 16px 20px; background: #fff; border-radius: var(--radius-lg);' + NL +
'  border: 1px solid var(--border);' + NL +
'}' + NL +
'.step-item { display: flex; align-items: center; gap: 8px; }' + NL +
'.step-num {' + NL +
'  width: 28px; height: 28px; border-radius: 50%;' + NL +
'  display: flex; align-items: center; justify-content: center;' + NL +
'  font-size: 12px; font-weight: 600;' + NL +
'  border: 2px solid var(--border); color: var(--text-light);' + NL +
'  transition: var(--transition);' + NL +
'}' + NL +
'.step-item.active .step-num { background: var(--primary); color: #fff; border-color: var(--primary); }' + NL +
'.step-item.done .step-num { background: var(--success); color: #fff; border-color: var(--success); }' + NL +
'.step-label { font-size: 12px; color: var(--text-light); }' + NL +
'.step-item.active .step-label { color: var(--primary); font-weight: 500; }' + NL +
'.step-item.done .step-label { color: var(--success); }' + NL +
'.step-connector { flex: 1; height: 2px; background: var(--border); margin: 0 12px; }' + NL +
'.step-connector.done { background: var(--success); }' + NL;

replaceOnce(stepBarCSS, '', 'Remove step indicator CSS');

// ============================================================
// 2. CSS: Remove BATCH CARDS block
// ============================================================
var batchCardsCSS = NL +
'/* ===== BATCH CARDS ===== */' + NL +
'.batch-cards {' + NL +
'  display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));' + NL +
'  gap: 16px;' + NL +
'}' + NL +
'.batch-card {' + NL +
'  padding: 20px; border: 2px solid var(--border); border-radius: var(--radius-lg);' + NL +
'  cursor: pointer; transition: var(--transition);' + NL +
'}' + NL +
'.batch-card:hover { border-color: var(--accent); }' + NL +
'.batch-card.selected { border-color: var(--primary); background: var(--primary-light); }' + NL +
'.batch-card .batch-name { font-size: 15px; font-weight: 600; margin-bottom: 8px; }' + NL +
'.batch-card .batch-meta { font-size: 12px; color: var(--text-secondary); margin-bottom: 4px; }' + NL +
'.batch-card .batch-levels { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 8px; }' + NL +
'.batch-card .level-chip {' + NL +
'  padding: 2px 8px; background: var(--gray-bg);' + NL +
'  border-radius: 10px; font-size: 11px; color: var(--text-secondary);' + NL +
'}' + NL +
'.batch-card .batch-scope {' + NL +
'  display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 11px;' + NL +
'  margin-top: 8px;' + NL +
'}' + NL +
'.batch-card .batch-scope.city { background: #DBEAFE; color: #1E40AF; }' + NL +
'.batch-card .batch-scope.district { background: #FEF3C7; color: #92400E; }' + NL;

replaceOnce(batchCardsCSS, '', 'Remove batch cards CSS');

// ============================================================
// 3. CSS: Remove LEVEL TAGS block
// ============================================================
var levelTagsCSS = NL +
'/* ===== LEVEL TAGS ===== */' + NL +
'.level-card {' + NL +
'  background: #fff; border: 1px solid var(--border); border-radius: var(--radius-lg);' + NL +
'  padding: 24px; margin-bottom: 16px;' + NL +
'}' + NL +
'.level-card h3 { font-size: 14px; font-weight: 600; margin-bottom: 6px; }' + NL +
'.level-card .level-hint { font-size: 12px; color: var(--text-secondary); margin-bottom: 16px; }' + NL +
'.level-tags { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 16px; }' + NL +
'.level-tag {' + NL +
'  padding: 10px 20px; border: 2px solid var(--border);' + NL +
'  border-radius: 8px; cursor: pointer; transition: var(--transition);' + NL +
'  font-size: 14px; font-weight: 500;' + NL +
'}' + NL +
'.level-tag:hover { border-color: var(--accent); }' + NL +
'.level-tag.selected { border-color: var(--primary); background: var(--primary-light); color: var(--primary); }' + NL +
'.level-tag.disabled { opacity: 0.4; cursor: not-allowed; border-color: var(--border); background: var(--gray-bg); }' + NL +
'.level-tag .tag-arrow { margin: 0 4px; color: var(--text-light); }' + NL +
'.level-tag.selected .tag-arrow { color: var(--primary); }' + NL;

replaceOnce(levelTagsCSS, '', 'Remove level tags CSS');

// ============================================================
// 4. CSS: Replace ACTION BAR with SUBMIT BAR
// ============================================================
var actionBarCSS = NL +
'/* ===== ACTION BAR ===== */' + NL +
'.action-bar {' + NL +
'  position: sticky; bottom: 0; background: #fff;' + NL +
'  border-top: 1px solid var(--border); padding: 14px 24px;' + NL +
'  display: flex; align-items: center; justify-content: space-between;' + NL +
'  margin: 24px -24px -24px;' + NL +
'  box-shadow: 0 -2px 8px rgba(0,0,0,0.04);' + NL +
'}' + NL +
'.action-bar .btn-prev {' + NL +
'  padding: 8px 20px; font-size: 13px;' + NL +
'  border: 1px solid var(--border); border-radius: 6px;' + NL +
'  background: #fff; color: var(--text-secondary); cursor: pointer; font-family: inherit;' + NL +
'}' + NL +
'.action-bar .btn-prev:hover { background: var(--gray-bg); }' + NL +
'.action-bar .btn-next {' + NL +
'  padding: 8px 24px; font-size: 13px;' + NL +
'  border: none; border-radius: 6px;' + NL +
'  background: var(--primary); color: #fff; cursor: pointer;' + NL +
'  font-family: inherit; font-weight: 500;' + NL +
'}' + NL +
'.action-bar .btn-next:hover { background: var(--primary-dark); }' + NL +
'.action-bar .btn-next:disabled { opacity: 0.5; cursor: not-allowed; }' + NL;

var submitBarCSS = NL +
'/* ===== SUBMIT BAR ===== */' + NL +
'.submit-bar {' + NL +
'  position: sticky; bottom: 0; background: #fff;' + NL +
'  border-top: 1px solid var(--border); padding: 14px 24px;' + NL +
'  display: flex; align-items: center; justify-content: flex-end;' + NL +
'  margin: 24px -24px -24px;' + NL +
'  box-shadow: 0 -2px 8px rgba(0,0,0,0.04);' + NL +
'}' + NL +
'.submit-bar .btn-submit {' + NL +
'  padding: 10px 32px; font-size: 14px;' + NL +
'  border: none; border-radius: 6px;' + NL +
'  background: var(--primary); color: #fff; cursor: pointer;' + NL +
'  font-family: inherit; font-weight: 500;' + NL +
'}' + NL +
'.submit-bar .btn-submit:hover { background: var(--primary-dark); }' + NL +
'.submit-bar .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }' + NL;

replaceOnce(actionBarCSS, submitBarCSS, 'Replace action bar CSS with submit bar CSS');

// ============================================================
// 5. CSS: Add new SELECTION SECTIONS CSS before UTILITY
// ============================================================
var selectionCSS = NL +
'/* ===== SELECTION SECTIONS ===== */' + NL +
'.selection-section {' + NL +
'  background: #fff; border: 1px solid var(--border);' + NL +
'  border-radius: var(--radius-lg); padding: 20px; margin-bottom: 16px;' + NL +
'}' + NL +
'.selection-section .section-title {' + NL +
'  font-size: 14px; font-weight: 600; margin-bottom: 12px;' + NL +
'  padding-bottom: 8px; border-bottom: 1px solid var(--border);' + NL +
'}' + NL +
'.selection-row {' + NL +
'  display: flex; align-items: center; gap: 12px; margin-bottom: 8px;' + NL +
'}' + NL +
'.selection-row label {' + NL +
'  font-size: 13px; color: var(--text-secondary); min-width: 70px; flex-shrink: 0;' + NL +
'}' + NL +
'.selection-row select {' + NL +
'  flex: 1; padding: 8px 12px; font-size: 13px;' + NL +
'  border: 1px solid var(--border); border-radius: 6px;' + NL +
'  font-family: inherit; background: #fff; cursor: pointer;' + NL +
'}' + NL +
'.selection-row select:focus {' + NL +
'  outline: none; border-color: var(--accent);' + NL +
'  box-shadow: 0 0 0 2px rgba(59,130,246,0.1);' + NL +
'}' + NL +
'.batch-detail {' + NL +
'  margin-top: 12px; padding: 12px 16px;' + NL +
'  background: var(--bg); border-radius: 6px;' + NL +
'  font-size: 12px; color: var(--text-secondary); line-height: 1.8;' + NL +
'}' + NL +
'' + NL;

// Insert before the UTILITY section
var utilityMarker = NL + '/* ===== UTILITY ===== */';
var idx = content.indexOf(utilityMarker);
if (idx >= 0) {
  content = content.substring(0, idx) + selectionCSS + content.substring(idx);
  ok('Add selection sections CSS');
} else {
  console.error('  ✗ FAILED: Add selection sections CSS - UTILITY marker not found');
}

// ============================================================
// 6. HTML: Remove step-bar element
// ============================================================
var stepBarHTML = NL +
'  <!-- Step indicator -->' + NL +
'  <div class="step-bar" id="stepBar"></div>';

replaceOnce(stepBarHTML, NL + '  <!-- Step indicator removed -->', 'Remove step bar HTML');

// ============================================================
// 7. JS: Remove currentStep, STEP_LABELS, STEP_COUNT from state var section
// ============================================================
replaceOnce(
  'var currentStep = 1;' + NL,
  '', 'Remove currentStep variable');

replaceOnce(
  'var STEP_LABELS = [\'选择批次\', \'选择晋升类型\', \'选择目标等级\', \'填写申报信息\', \'上传附件\'];' + NL +
  'var STEP_COUNT = 5;' + NL + NL,
  '', 'Remove STEP_LABELS and STEP_COUNT');

// ============================================================
// 8. JS: Replace renderStepIndicator with empty
// ============================================================
var renderStepIndicatorFunc =
'function renderStepIndicator() {' + NL +
'  var html = \'\';' + NL +
'  for (var i = 1; i <= STEP_COUNT; i++) {' + NL +
'    if (i > 1) {' + NL +
'      html += \'<div class="step-connector\' + (i <= currentStep ? \' done\' : \'\') + \'"></div>\';' + NL +
'    }' + NL +
'    var cls = \'\';' + NL +
'    if (i < currentStep) cls = \'done\';' + NL +
'    else if (i === currentStep) cls = \'active\';' + NL +
'    html += \'<div class="step-item \' + cls + \'">\';' + NL +
'    html += \'<div class="step-num">\' + (i < currentStep ? \'&#10003;\' : i) + \'</div>\';' + NL +
'    html += \'<span class="step-label">\' + STEP_LABELS[i - 1] + \'</span>\';' + NL +
'    html += \'</div>\';' + NL +
'  }' + NL +
'  document.getElementById(\'stepBar\').innerHTML = html;' + NL +
'}' + NL + NL;

replaceOnce(renderStepIndicatorFunc, '', 'Remove renderStepIndicator');

// ============================================================
// 9. JS: Remove renderStep1_BatchSelect + selectBatch
// ============================================================
var step1Funcs =
'function renderStep1_BatchSelect() {' + NL +
'  var batches = getOpenBatches();' + NL +
'  var html = \'\';' + NL +
'' + NL +
'  if (batches.length === 0) {' + NL +
'    html += \'<div class="form-card" style="text-align:center;padding:60px 20px;">\';' + NL +
'    html += \'<div style="font-size:40px;margin-bottom:12px;color:var(--text-light);">&#128203;</div>\';' + NL +
'    html += \'<div style="font-size:14px;color:var(--text-secondary);margin-bottom:8px;">当前没有开放的晋升批次</div>\';' + NL +
'    html += \'<div style="font-size:12px;color:var(--text-light);">请等待管理员开启新的晋升批次后再进行申报</div>\';' + NL +
'    html += \'</div>\';' + NL +
'  } else {' + NL +
'    html += \'<div class="batch-cards">\';' + NL +
'    batches.forEach(function (b) {' + NL +
'      var selCls = selectedBatch && selectedBatch.id === b.id ? \' selected\' : \'\';' + NL +
'      html += \'<div class="batch-card\' + selCls + \'" onclick="selectBatch(\\\'\' + b.id + \'\\\')">\';' + NL +
'      html += \'<div class="batch-name">\' + b.name + \'</div>\';' + NL +
'      html += \'<div class="batch-meta">申报时间：\' + formatDate(b.startTime) + \' 至 \' + formatDate(b.endTime) + \'</div>\';' + NL +
'      var scopeLabel = SCOPE_MAP[b.scope] || b.scope;' + NL +
'      var scopeCls = b.scope === \'all\' ? \'city\' : \'district\';' + NL +
'      html += \'<span class="batch-scope \' + scopeCls + \'">\' + scopeLabel + \'</span>\';' + NL +
'      html += \'<div class="batch-levels">\';' + NL +
'      b.allowedLevels.forEach(function (lv) {' + NL +
'        html += \'<span class="level-chip">\' + lv + \'</span>\';' + NL +
'      });' + NL +
'      html += \'</div>\';' + NL +
'      html += \'</div>\';' + NL +
'    });' + NL +
'    html += \'</div>\';' + NL +
'  }' + NL +
'' + NL +
'  document.getElementById(\'contentArea\').innerHTML = html;' + NL +
'}' + NL +
'' + NL +
'function selectBatch(id) {' + NL +
'  var batches = getOpenBatches();' + NL +
'  for (var i = 0; i < batches.length; i++) {' + NL +
'    if (batches[i].id === id) { selectedBatch = batches[i]; break; }' + NL +
'  }' + NL +
'  selectedLevel = null;' + NL +
'  renderStep1_BatchSelect();' + NL +
'}' + NL + NL;

replaceOnce(step1Funcs, '', 'Remove renderStep1_BatchSelect + selectBatch');

// ============================================================
// 10. JS: Remove renderStep2_PromotionType + selectTransferType
// ============================================================
var step2Funcs =
'function renderStep2_PromotionType() {' + NL +
'  var currentCatLabel = getTeacherCategoryLabel();' + NL +
'  var fromNum = extractCurrentLevelNumber();' + NL +
'  var applicableLevels = getApplicableLevels(selectedBatch);' + NL +
'  var levelPreview = applicableLevels.map(function(l) { return l.toLabel; }).join(\'/\');' + NL +
'  if (!levelPreview) levelPreview = \'无可申报等级\';' + NL +
'' + NL +
'  var html = \'\';' + NL +
'  html += \'<div class="form-card" style="text-align:center;padding:24px;">\';' + NL +
'  html += \'<h3 style="margin-bottom:20px;">请选择晋升类型</h3>\';' + NL +
'' + NL +
'  // Promote card' + NL +
'  var promoteSelected = selectedTransferType === \'promote\' ? \' selected\' : \'\';' + NL +
'  html += \'<div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;">\';' + NL +
'  html += \'<div class="transfer-type-card\' + promoteSelected + \'" onclick="selectTransferType(\\\'\' + \'promote\' + \'\\\')" style="flex:1;min-width:240px;max-width:360px;padding:24px;border:2px solid \' + (selectedTransferType === \'promote\' ? \'var(--primary)\' : \'var(--border)\') + \';border-radius:12px;cursor:pointer;transition:var(--transition);">\';' + NL +
'  html += \'<div style="font-size:32px;margin-bottom:8px;">&#127956;</div>\';' + NL +
'  html += \'<div style="font-size:16px;font-weight:600;margin-bottom:8px;">晋升</div>\';' + NL +
'  html += \'<div style="font-size:12px;color:var(--text-secondary);line-height:1.6;">在本岗位类别内跨级或逐级<br>晋升至更高等级</div>\';' + NL +
'  html += \'<div style="margin-top:12px;padding:8px 12px;background:var(--bg);border-radius:6px;font-size:12px;color:var(--text-secondary);">\';' + NL +
'  html += \'当前：\' + currentCatLabel + \' \' + CURRENT_TEACHER.currentPost + \'<br>可申报：\' + levelPreview;' + NL +
'  html += \'</div></div>\';' + NL +
'' + NL +
'  // Transfer card' + NL +
'  var transferSelected = selectedTransferType === \'transfer\' ? \' selected\' : \'\';' + NL +
'  html += \'<div class="transfer-type-card\' + transferSelected + \'" onclick="selectTransferType(\\\'\' + \'transfer\' + \'\\\')" style="flex:1;min-width:240px;max-width:360px;padding:24px;border:2px solid \' + (selectedTransferType === \'transfer\' ? \'var(--primary)\' : \'var(--border)\') + \';border-radius:12px;cursor:pointer;transition:var(--transition);">\';' + NL +
'  html += \'<div style="font-size:32px;margin-bottom:8px;">&#128260;</div>\';' + NL +
'  html += \'<div style="font-size:16px;font-weight:600;margin-bottom:8px;">转岗</div>\';' + NL +
'  html += \'<div style="font-size:12px;color:var(--text-secondary);line-height:1.6;">跨岗位类别调动至<br>其他岗位类别</div>\';' + NL +
'  html += \'<div style="margin-top:12px;padding:8px 12px;background:var(--bg);border-radius:6px;font-size:12px;color:var(--text-secondary);">\';' + NL +
'  html += \'当前：\' + currentCatLabel + \'<br>需选择目标类别和等级\';' + NL +
'  html += \'</div></div>\';' + NL +
'  html += \'</div>\';' + NL +
'' + NL +
'  html += \'</div>\';' + NL +
'  document.getElementById(\'contentArea\').innerHTML = html;' + NL +
'}' + NL +
'' + NL +
'function selectTransferType(type) {' + NL +
'  selectedTransferType = type;' + NL +
'  if (type === \'transfer\') {' + NL +
'    selectedLevel = null;' + NL +
'  }' + NL +
'  selectedTransferCategory = null;' + NL +
'  selectedTransferLevel = null;' + NL +
'  renderStep2_PromotionType();' + NL +
'}' + NL + NL;

replaceOnce(step2Funcs, '', 'Remove renderStep2_PromotionType + selectTransferType');

// ============================================================
// 11. JS: Remove renderStep3_LevelSelect + selectLevel + onTransferCatChange + onTransferLevelChange
// ============================================================
var step3Funcs =
'function renderStep3_LevelSelect() {' + NL +
'  if (!selectedBatch) {' + NL +
'    document.getElementById(\'contentArea\').innerHTML = \'\';' + NL +
'    return;' + NL +
'  }' + NL +
'' + NL +
'  var html = \'\';' + NL +
'  var currentCatLabel = getTeacherCategoryLabel();' + NL +
'' + NL +
'  if (selectedTransferType === \'transfer\') {' + NL +
'    // ===== TRANSFER MODE =====' + NL +
'    var batchTypes = selectedBatch.promoteTypes || [\'mgmt\',\'prof\',\'labor\'];' + NL +
'    var currentCat = getTeacherCategory();' + NL +
'    var availableCats = batchTypes.filter(function(c) { return c !== currentCat; });' + NL +
'' + NL +
'    html += \'<div class="form-card" style="padding:24px;">\';' + NL +
'    html += \'<h3>选择转岗目标</h3>\';' + NL +
'    html += \'<div class="level-hint">当前批次：\' + selectedBatch.name + \' | 当前岗位类别：<strong>\' + currentCatLabel + \'</strong> | 类型：<strong>转岗</strong></div>\';' + NL +
'' + NL +
'    if (availableCats.length === 0) {' + NL +
'      html += \'<div style="padding:20px;text-align:center;color:var(--text-light);">当前批次无可转岗的岗位类别</div>\';' + NL +
'    } else {' + NL +
'      html += \'<div class="form-grid" style="margin-top:16px;">\';' + NL +
'      html += \'<div class="form-item"><span class="label">目标岗位类别</span><select id="transferCat" onchange="onTransferCatChange()" style="padding:8px 12px;font-size:13px;border:1px solid var(--border);border-radius:6px;font-family:inherit;">\';' + NL +
'      html += \'<option value="">请选择</option>\';' + NL +
'      availableCats.forEach(function(c) {' + NL +
'        html += \'<option value="\' + c + \'"\' + (selectedTransferCategory === c ? \' selected\' : \'\') + \'>\' + CATEGORY_LABELS[c] + \'</option>\';' + NL +
'      });' + NL +
'      html += \'</select></div>\';' + NL +
'' + NL +
'      html += \'<div class="form-item"><span class="label">目标岗位等级</span><select id="transferLv" onchange="onTransferLevelChange()" style="padding:8px 12px;font-size:13px;border:1px solid var(--border);border-radius:6px;font-family:inherit;">\';' + NL +
'      html += \'<option value="">请先选择类别</option>\';' + NL +
'      if (selectedTransferCategory) {' + NL +
'        var transferLevels = getTransferLevels(selectedTransferCategory);' + NL +
'        transferLevels.forEach(function(lv) {' + NL +
'          html += \'<option value="\' + lv.label + \'"\' + (selectedTransferLevel === lv.label ? \' selected\' : \'\') + \'>\' + lv.label + \'</option>\';' + NL +
'        });' + NL +
'      }' + NL +
'      html += \'</select></div>\';' + NL +
'      html += \'</div>\';' + NL +
'' + NL +
'      if (selectedTransferLevel) {' + NL +
'        var tNum = extractLevelNumber(selectedTransferLevel);' + NL +
'        var remaining = getRemainingQuota(CURRENT_TEACHER.schoolName, tNum);' + NL +
'        var exempt = isExemptFromQuota(tNum);' + NL +
'        var quotaCls = \'quota-hint\' + (!exempt && remaining <= 0 ? \' danger\' : \'\');' + NL +
'        html += \'<div class="\' + quotaCls + \'" style="margin-top:12px;">目标\' + selectedTransferLevel + \'：\';' + NL +
'        if (exempt) { html += \'不限名额\'; }' + NL +
'        else { html += \'剩余可申报 <span class="quota-number">\' + remaining + \'</span> 个岗位\' + (remaining <= 0 ? \'（无可申报岗位数）\' : \'\'); }' + NL +
'        html += \'</div>\';' + NL +
'      }' + NL +
'    }' + NL +
'    html += \'</div>\';' + NL +
'' + NL +
'  } else {' + NL +
'    // ===== PROMOTE MODE (cross-level) =====' + NL +
'    var applicableLevels = getApplicableLevels(selectedBatch);' + NL +
'    html += \'<div class="level-card">\';' + NL +
'    html += \'<h3>选择目标晋升等级</h3>\';' + NL +
'    html += \'<div class="level-hint">当前批次：\' + selectedBatch.name + \' | 您当前岗位等级：<strong>\' + CURRENT_TEACHER.currentPost + \'</strong> | 类型：<strong>晋升（可跨级）</strong></div>\';' + NL +
'' + NL +
'    if (applicableLevels.length === 0) {' + NL +
'      html += \'<div style="padding:20px;text-align:center;color:var(--text-light);">\';' + NL +
'      html += \'当前批次无可申报的晋升等级（您当前岗位为\' + CURRENT_TEACHER.currentPost + \'）\';' + NL +
'      html += \'</div>\';' + NL +
'    } else {' + NL +
'      html += \'<div class="level-tags">\';' + NL +
'      applicableLevels.forEach(function (level) {' + NL +
'        var targetNum = level.to;' + NL +
'        var remaining = getRemainingQuota(CURRENT_TEACHER.schoolName, targetNum);' + NL +
'        var exempt = isExemptFromQuota(targetNum);' + NL +
'        var disabled = false;' + NL +
'' + NL +
'        if (!exempt && remaining <= 0) disabled = true;' + NL +
'' + NL +
'        var selCls = \'\';' + NL +
'        if (selectedLevel && selectedLevel.toLabel === level.toLabel && selectedLevel.fromLabel === level.fromLabel) {' + NL +
'          selCls = \' selected\';' + NL +
'        }' + NL +
'        if (disabled) selCls += \' disabled\';' + NL +
'' + NL +
'        html += \'<div class="level-tag\' + selCls + \'"\';' + NL +
'        if (!disabled) {' + NL +
'          html += \' onclick="selectLevel(\\\'\' + level.fromLabel + \'\\\', \\\'\' + level.toLabel + \'\\\')"\';' + NL +
'        }' + NL +
'        html += \'>\';' + NL +
'        html += level.fromLabel + \'<span class="tag-arrow">→</span>\' + level.toLabel;' + NL +
'        html += \'<div style="font-size:10px;color:var(--text-light);">剩余 \' + remaining + \'</div>\';' + NL +
'        html += \'</div>\';' + NL +
'      });' + NL +
'      html += \'</div>\';' + NL +
'' + NL +
'      applicableLevels.forEach(function (level) {' + NL +
'        var targetNum = level.to;' + NL +
'        var remaining = getRemainingQuota(CURRENT_TEACHER.schoolName, targetNum);' + NL +
'        var exempt = isExemptFromQuota(targetNum);' + NL +
'        var quotaCls = \'quota-hint\';' + NL +
'        if (!exempt && remaining <= 0) quotaCls += \' danger\';' + NL +
'        html += \'<div class="\' + quotaCls + \'" style="margin-right:8px;">\';' + NL +
'        html += \'目标\' + level.toLabel + \'：\';' + NL +
'        if (exempt) { html += \'不限名额\'; }' + NL +
'        else { html += \'剩余可申报 <span class="quota-number">\' + remaining + \'</span> 个岗位\' + (remaining <= 0 ? \'（无可申报岗位数）\' : \'\'); }' + NL +
'        html += \'</div>\';' + NL +
'      });' + NL +
'    }' + NL +
'    html += \'</div>\';' + NL +
'  }' + NL +
'  document.getElementById(\'contentArea\').innerHTML = html;' + NL +
'}' + NL +
'' + NL +
'function selectLevel(fromLabel, toLabel) {' + NL +
'  selectedLevel = { fromLabel: fromLabel, toLabel: toLabel };' + NL +
'  renderStep3_LevelSelect();' + NL +
'}' + NL +
'' + NL +
'function onTransferCatChange() {' + NL +
'  var sel = document.getElementById(\'transferCat\');' + NL +
'  if (!sel) return;' + NL +
'  selectedTransferCategory = sel.value || null;' + NL +
'  selectedTransferLevel = null;' + NL +
'  if (selectedTransferCategory) {' + NL +
'    selectedLevel = { fromLabel: CURRENT_TEACHER.currentPost, toLabel: null };' + NL +
'  } else {' + NL +
'    selectedLevel = null;' + NL +
'  }' + NL +
'  renderStep3_LevelSelect();' + NL +
'}' + NL +
'' + NL +
'function onTransferLevelChange() {' + NL +
'  var sel = document.getElementById(\'transferLv\');' + NL +
'  if (!sel) return;' + NL +
'  selectedTransferLevel = sel.value || null;' + NL +
'  if (selectedTransferLevel && selectedLevel) {' + NL +
'    selectedLevel.toLabel = selectedTransferLevel;' + NL +
'  }' + NL +
'  renderStep3_LevelSelect();' + NL +
'}' + NL + NL;

replaceOnce(step3Funcs, '', 'Remove renderStep3_LevelSelect + selectLevel + transfer handlers');

// ============================================================
// 12. JS: Remove renderStep4_Form
// ============================================================
var step4Func =
'function renderStep4_Form() {' + NL +
'  var targetNum = selectedLevel ? extractLevelNumber(selectedLevel.toLabel) : 0;' + NL +
'  var fromNum = selectedLevel ? extractLevelNumber(selectedLevel.fromLabel) : 0;' + NL +
'  var isSenior3 = (fromNum === 4 && targetNum === 3); // 四级→三级' + NL +
'  var promotionType = isSenior3 ? \'senior_3\' : \'regular\';' + NL +
'' + NL +
'  var html = \'\';' + NL +
'' + NL +
'  if (isSenior3) {' + NL +
'    html += \'<div class="promotion-type-badge senior_3">专项申报表 — 四级晋升三级</div>\';' + NL +
'    html += renderSenior3Form();' + NL +
'  } else {' + NL +
'    html += \'<div class="promotion-type-badge regular">通用基本信息表</div>\';' + NL +
'    html += renderRegularForm();' + NL +
'  }' + NL +
'' + NL +
'  document.getElementById(\'contentArea\').innerHTML = html;' + NL +
'}' + NL + NL;

replaceOnce(step4Func, '', 'Remove renderStep4_Form');

// ============================================================
// 13. JS: Remove renderStep5_Upload
// ============================================================
var step5Func =
'function renderStep5_Upload() {' + NL +
'  var html = \'\';' + NL +
'' + NL +
'  html += \'<div class="form-card">\';' + NL +
'  html += \'<h3>附件材料 <span style="color:var(--text-light);font-size:12px;">（选填）</span></h3>\';' + NL +
'  html += \'<div class="upload-area" onclick="document.getElementById(\\\'fileInput\\\').click()">\';' + NL +
'  html += \'<div class="upload-icon">&#128206;</div>\';' + NL +
'  html += \'<div class="upload-text">点击选择文件上传</div>\';' + NL +
'  html += \'<div class="upload-hint">支持 PDF、Word (.doc/.docx)、图片 (.jpg/.png)，单个文件不超过 20MB</div>\';' + NL +
'  html += \'</div>\';' + NL +
'  html += \'<input type="file" id="fileInput" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" style="display:none" onchange="handleFileUpload(this)">\';' + NL +
'' + NL +
'  html += \'<div class="file-list" id="fileList">\';' + NL +
'  uploadedFiles.forEach(function (f, i) {' + NL +
'    html += \'<div class="file-item"><span class="file-name">\' + f.name + \'</span><span class="file-size">\' + formatSize(f.size) + \'</span><span class="file-remove" onclick="removeFile(\' + i + \')">移除</span></div>\';' + NL +
'  });' + NL +
'  html += \'</div></div>\';' + NL +
'' + NL +
'  document.getElementById(\'contentArea\').innerHTML = html;' + NL +
'' + NL +
'  // Bind drag events on upload area' + NL +
'  var area = document.querySelector(\'.upload-area\');' + NL +
'  if (area) {' + NL +
'    area.addEventListener(\'dragover\', function (e) { e.preventDefault(); area.style.borderColor = \'var(--primary)\'; area.style.background = \'var(--primary-light)\'; });' + NL +
'    area.addEventListener(\'dragleave\', function (e) { e.preventDefault(); area.style.borderColor = \'\'; area.style.background = \'\'; });' + NL +
'    area.addEventListener(\'drop\', function (e) {' + NL +
'      e.preventDefault();' + NL +
'      area.style.borderColor = \'\';' + NL +
'      area.style.background = \'\';' + NL +
'      handleFiles(e.dataTransfer.files);' + NL +
'    });' + NL +
'  }' + NL +
'}' + NL + NL;

replaceOnce(step5Func, '', 'Remove renderStep5_Upload');

// ============================================================
// 14. JS: Remove renderActionBar, nextStep, prevStep
// ============================================================
var navFuncs =
'function renderActionBar() {' + NL +
'  var html = \'<div>\';' + NL +
'  if (currentStep > 1) {' + NL +
'    html += \'<button class="btn-prev" onclick="prevStep()">上一步</button>\';' + NL +
'  }' + NL +
'  html += \'</div>\';' + NL +
'  html += \'<div>\';' + NL +
'  if (currentStep < STEP_COUNT) {' + NL +
'    html += \'<button class="btn-next" onclick="nextStep()">下一步</button>\';' + NL +
'  } else {' + NL +
'    html += \'<button class="btn-next" onclick="submitApplication()">提交申报</button>\';' + NL +
'  }' + NL +
'  html += \'</div>\';' + NL +
'  document.getElementById(\'actionBar\').innerHTML = html;' + NL +
'}' + NL + NL +
'function nextStep() {' + NL +
'  // Validate current step' + NL +
'  if (currentStep === 1) {' + NL +
'    if (!selectedBatch) {' + NL +
'      showToast(\'请先选择晋升批次\', \'warning\');' + NL +
'      return;' + NL +
'    }' + NL +
'  }' + NL +
'  if (currentStep === 2) {' + NL +
'    if (selectedTransferType === \'promote\') {' + NL +
'      var applicable = getApplicableLevels(selectedBatch);' + NL +
'      if (applicable.length === 0) {' + NL +
'        showToast(\'当前批次无可申报的晋升等级\', \'warning\');' + NL +
'        return;' + NL +
'      }' + NL +
'    }' + NL +
'  }' + NL +
'  if (currentStep === 3) {' + NL +
'    if (selectedTransferType === \'promote\') {' + NL +
'      if (!selectedLevel || !selectedLevel.toLabel) {' + NL +
'        showToast(\'请先选择目标等级\', \'warning\');' + NL +
'        return;' + NL +
'      }' + NL +
'      var targetNum = extractLevelNumber(selectedLevel.toLabel);' + NL +
'      if (!isExemptFromQuota(targetNum)) {' + NL +
'        var remaining = getRemainingQuota(CURRENT_TEACHER.schoolName, targetNum);' + NL +
'        if (remaining <= 0) {' + NL +
'          showToast(\'目标等级无可申报岗位数\', \'warning\');' + NL +
'          return;' + NL +
'        }' + NL +
'      }' + NL +
'    } else {' + NL +
'      if (!selectedTransferCategory || !selectedTransferLevel) {' + NL +
'        showToast(\'请选择转岗目标类别和等级\', \'warning\');' + NL +
'        return;' + NL +
'      }' + NL +
'      if (!selectedLevel) { selectedLevel = { fromLabel: CURRENT_TEACHER.currentPost, toLabel: selectedTransferLevel }; }' + NL +
'    }' + NL +
'  }' + NL +
'  if (currentStep === 4) {' + NL +
'    // Collect any edited fields' + NL +
'    collectSenior3Form();' + NL +
'    var targetNum = selectedLevel ? extractLevelNumber(selectedLevel.toLabel) : 0;' + NL +
'    var fromNum = selectedLevel ? extractLevelNumber(selectedLevel.fromLabel) : 0;' + NL +
'    if (fromNum === 4 && targetNum === 3) {' + NL +
'      // Validate senior_3 required fields' + NL +
'      var required = [' + NL +
'        { key: \'schoolMajor\', label: \'毕业学校及专业\' },' + NL +
'        { key: \'graduateTime\', label: \'毕业时间\' },' + NL +
'        { key: \'workStartTime\', label: \'参加工作时间\' },' + NL +
'        { key: \'profYears\', label: \'从事本专业时间\' },' + NL +
'        { key: \'qualName\', label: \'专业技术资格名称\' },' + NL +
'        { key: \'qualTime\', label: \'取得资格时间\' },' + NL +
'        { key: \'employStart\', label: \'聘用时间起\' },' + NL +
'        { key: \'employEnd\', label: \'聘用时间止\' },' + NL +
'        { key: \'targetStart\', label: \'拟聘起始时间\' },' + NL +
'        { key: \'targetEnd\', label: \'拟聘截止时间\' },' + NL +
'        { key: \'publicMethod\', label: \'公示方式\' },' + NL +
'        { key: \'publicStart\', label: \'公示开始时间\' },' + NL +
'        { key: \'publicEnd\', label: \'公示结束时间\' }' + NL +
'      ];' + NL +
'      for (var i = 0; i < required.length; i++) {' + NL +
'        if (!senior3Form[required[i].key]) {' + NL +
'          showToast(\'请填写\' + required[i].label, \'warning\');' + NL +
'          return;' + NL +
'        }' + NL +
'      }' + NL +
'    }' + NL +
'  }' + NL +
'' + NL +
'  currentStep++;' + NL +
'  renderPage();' + NL +
'}' + NL +
'' + NL +
'function prevStep() {' + NL +
'  if (currentStep > 1) {' + NL +
'    currentStep--;' + NL +
'    renderPage();' + NL +
'  }' + NL +
'}' + NL + NL;

replaceOnce(navFuncs, '', 'Remove renderActionBar, nextStep, prevStep');

// ============================================================
// 15. JS: Replace renderPage() with new renderContent()
// ============================================================
var oldRenderPage =
'function renderPage() {' + NL +
'  // Show reject notice in edit mode (remove existing first to prevent duplicates)' + NL +
'  var existing = document.getElementById(\'rejectNoticeArea\');' + NL +
'  if (existing) existing.remove();' + NL +
'  if (pageMode === \'edit\' && rejectInfo) {' + NL +
'    document.getElementById(\'pageSubtitle\').insertAdjacentHTML(\'afterend\', \'<div id="rejectNoticeArea">\' + renderRejectNotice() + \'</div>\');' + NL +
'  }' + NL +
'' + NL +
'  renderStepIndicator();' + NL +
'' + NL +
'  if (currentStep === 1) {' + NL +
'    renderStep1_BatchSelect();' + NL +
'  } else if (currentStep === 2) {' + NL +
'    renderStep2_PromotionType();' + NL +
'  } else if (currentStep === 3) {' + NL +
'    renderStep3_LevelSelect();' + NL +
'  } else if (currentStep === 4) {' + NL +
'    renderStep4_Form();' + NL +
'  } else if (currentStep === 5) {' + NL +
'    renderStep5_Upload();' + NL +
'  }' + NL +
'' + NL +
'  renderActionBar();' + NL +
'}' + NL + NL;

var newRenderContent =
'function renderContent() {' + NL +
'  // Show reject notice in edit mode (remove existing first to prevent duplicates)' + NL +
'  var existing = document.getElementById(\'rejectNoticeArea\');' + NL +
'  if (existing) existing.remove();' + NL +
'  if (pageMode === \'edit\' && rejectInfo) {' + NL +
'    document.getElementById(\'pageSubtitle\').insertAdjacentHTML(\'afterend\', \'<div id="rejectNoticeArea">\' + renderRejectNotice() + \'</div>\');' + NL +
'  }' + NL +
'' + NL +
'  var html = \'\';' + NL +
'  var hasBatch = selectedBatch !== null;' + NL +
'' + NL +
'  // === Section 1: Batch Selection ===' + NL +
'  html += \'<div class="selection-section">\';' + NL +
'  html += \'<div class="section-title">选择批次</div>\';' + NL +
'  html += \'<div class="selection-row">\';' + NL +
'  html += \'<label>晋升批次</label>\';' + NL +
'  html += \'<select id="batchSelect" onchange="onBatchChange()">\';' + NL +
'  html += \'<option value="">请选择批次</option>\';' + NL +
'  var _batches = getOpenBatches();' + NL +
'  if (_batches.length === 0) {' + NL +
'    html += \'<option value="" disabled>当前没有开放的晋升批次</option>\';' + NL +
'  }' + NL +
'  for (var bIdx = 0; bIdx < _batches.length; bIdx++) {' + NL +
'    var b = _batches[bIdx];' + NL +
'    html += \'<option value="\' + escapeHtml(b.id) + \'"\' + (selectedBatch && selectedBatch.id === b.id ? \' selected\' : \'\') + \'>\' + escapeHtml(b.name || b.id) + \'</option>\';' + NL +
'  }' + NL +
'  html += \'</select>\';' + NL +
'  html += \'</div>\';' + NL +
'' + NL +
'  if (selectedBatch) {' + NL +
'    html += \'<div class="batch-detail">\';' + NL +
'    html += \'申报时间：\' + (selectedBatch.startTime || \'—\') + \' 至 \' + (selectedBatch.endTime || \'—\') + \'<br>\';' + NL +
'    var _scopeLabel = SCOPE_MAP[selectedBatch.scope] || selectedBatch.scope || \'—\';' + NL +
'    if (selectedBatch.scope) html += \'适用范围：\' + _scopeLabel + \'<br>\';' + NL +
'    if (selectedBatch.allowedLevels && selectedBatch.allowedLevels.length > 0) html += \'允许等级：\' + selectedBatch.allowedLevels.join(\'、\') + \'<br>\';' + NL +
'    if (selectedBatch.remark) html += \'备注：\' + escapeHtml(selectedBatch.remark);' + NL +
'    html += \'</div>\';' + NL +
'  }' + NL +
'  html += \'</div>\';' + NL +
'' + NL +
'  // === Section 2: Promotion Type (only if batch selected) ===' + NL +
'  if (selectedBatch) {' + NL +
'    html += \'<div class="selection-section">\';' + NL +
'    html += \'<div class="section-title">选择晋升类型</div>\';' + NL +
'    html += \'<div class="selection-row">\';' + NL +
'    html += \'<label>晋升类型</label>\';' + NL +
'    html += \'<select id="promotionType" onchange="onTypeChange()">\';' + NL +
'    html += \'<option value="">请选择晋升类型</option>\';' + NL +
'    html += \'<option value="promote"\' + (selectedTransferType === \'promote\' ? \' selected\' : \'\') + \'>晋升（在本岗位类别内跨级晋升）</option>\';' + NL +
'    html += \'<option value="transfer"\' + (selectedTransferType === \'transfer\' ? \' selected\' : \'\') + \'>转岗（跨岗位类别调动）</option>\';' + NL +
'    html += \'</select>\';' + NL +
'    html += \'</div>\';' + NL +
'    html += \'</div>\';' + NL +
'' + NL +
'    // === Section 3: Level Selection ===' + NL +
'    if (selectedTransferType === \'promote\') {' + NL +
'      html += \'<div class="selection-section">\';' + NL +
'      html += \'<div class="section-title">选择目标等级</div>\';' + NL +
'      var _applicableLevels = getApplicableLevels(selectedBatch);' + NL +
'      html += \'<div class="selection-row">\';' + NL +
'      html += \'<label>目标等级</label>\';' + NL +
'      html += \'<select id="targetLevel" onchange="onLevelChange()">\';' + NL +
'      html += \'<option value="">请选择目标等级</option>\';' + NL +
'      for (var lIdx = 0; lIdx < _applicableLevels.length; lIdx++) {' + NL +
'        var lv = _applicableLevels[lIdx];' + NL +
'        var tNum = lv.to;' + NL +
'        var remaining = getRemainingQuota(CURRENT_TEACHER.schoolName, tNum);' + NL +
'        var exempt = isExemptFromQuota(tNum);' + NL +
'        var label = lv.fromLabel + \'→\' + lv.toLabel;' + NL +
'        if (!exempt) { label += \'（剩余\' + remaining + \'）\'; }' + NL +
'        else { label += \'（不限名额）\'; }' + NL +
'        var sel = selectedLevel && selectedLevel.toLabel === lv.toLabel && selectedLevel.fromLabel === lv.fromLabel ? \' selected\' : \'\';' + NL +
'        if (!exempt && remaining <= 0) {' + NL +
'          html += \'<option value="\' + lv.fromLabel + \'|\' + lv.toLabel + \'" disabled>\' + label + \'（已满）</option>\';' + NL +
'        } else {' + NL +
'          html += \'<option value="\' + lv.fromLabel + \'|\' + lv.toLabel + \'"\' + sel + \'>\' + label + \'</option>\';' + NL +
'        }' + NL +
'      }' + NL +
'      html += \'</select>\';' + NL +
'      html += \'</div>\';' + NL +
'      html += \'<div class="batch-detail">\';' + NL +
'      _applicableLevels.forEach(function(lv) {' + NL +
'        var tNum2 = lv.to;' + NL +
'        var rem2 = getRemainingQuota(CURRENT_TEACHER.schoolName, tNum2);' + NL +
'        var ex2 = isExemptFromQuota(tNum2);' + NL +
'        html += \'目标\' + lv.toLabel + \'：\' + (ex2 ? \'不限名额\' : \'剩余可申报 <strong>\' + rem2 + \'</strong> 个岗位\' + (rem2 <= 0 ? \'（已满）\' : \'\')) + \'<br>\';' + NL +
'      });' + NL +
'      html += \'</div>\';' + NL +
'      html += \'</div>\';' + NL +
'    } else if (selectedTransferType === \'transfer\') {' + NL +
'      html += renderTransferSection();' + NL +
'    }' + NL +
'  }' + NL +
'' + NL +
'  // === Section 4: Form ===' + NL +
'  html += renderFormSection();' + NL +
'' + NL +
'  // === Section 5: Upload ===' + NL +
'  html += renderUploadSection();' + NL +
'' + NL +
'  // === Submit Button ===' + NL +
'  html += \'<div class="submit-bar"><button class="btn-submit" onclick="submitApplication()" id="submitBtn">提交申报</button></div>\';' + NL +
'' + NL +
'  document.getElementById(\'contentArea\').innerHTML = html;' + NL +
'' + NL +
'  // Bind drag events on upload area' + NL +
'  bindUploadEvents();' + NL +
'}' + NL + NL;

replaceOnce(oldRenderPage, newRenderContent, 'Replace renderPage with new renderContent');

// ============================================================
// 16. Add new helper functions after renderContent
// We'll insert before the SUBMIT section
// ============================================================
var submitMarker = NL +
'// ===== SUBMIT =====' + NL;

idx = content.indexOf(submitMarker);
if (idx === -1) {
  console.error('  ✗ FAILED: Could not find SUBMIT marker');
} else {
  // Insert new handler functions before SUBMIT section
  var newHandlers = NL +
'// ===== EVENT HANDLERS =====' + NL +
'function onBatchChange() {' + NL +
'  var sel = document.getElementById(\'batchSelect\');' + NL +
'  if (!sel) return;' + NL +
'  var id = sel.value;' + NL +
'  if (id) {' + NL +
'    var _batches = getOpenBatches();' + NL +
'    for (var i = 0; i < _batches.length; i++) {' + NL +
'      if (_batches[i].id === id) { selectedBatch = _batches[i]; break; }' + NL +
'    }' + NL +
'  } else {' + NL +
'    selectedBatch = null;' + NL +
'  }' + NL +
'  selectedTransferType = null;' + NL +
'  selectedLevel = null;' + NL +
'  selectedTransferCategory = null;' + NL +
'  selectedTransferLevel = null;' + NL +
'  renderContent();' + NL +
'}' + NL +
'' + NL +
'function onTypeChange() {' + NL +
'  var sel = document.getElementById(\'promotionType\');' + NL +
'  if (!sel) return;' + NL +
'  selectedTransferType = sel.value || null;' + NL +
'  selectedLevel = null;' + NL +
'  selectedTransferCategory = null;' + NL +
'  selectedTransferLevel = null;' + NL +
'  if (selectedTransferType === \'transfer\') {' + NL +
'    selectedLevel = { fromLabel: CURRENT_TEACHER.currentPost, toLabel: null };' + NL +
'  }' + NL +
'  renderContent();' + NL +
'}' + NL +
'' + NL +
'function onLevelChange() {' + NL +
'  var sel = document.getElementById(\'targetLevel\');' + NL +
'  if (!sel) return;' + NL +
'  var val = sel.value;' + NL +
'  if (val) {' + NL +
'    var parts = val.split(\'|\');' + NL +
'    if (parts.length === 2) {' + NL +
'      selectedLevel = { fromLabel: parts[0], toLabel: parts[1] };' + NL +
'    }' + NL +
'  } else {' + NL +
'    selectedLevel = null;' + NL +
'  }' + NL +
'  renderContent();' + NL +
'}' + NL +
'' + NL +
'function onTransferCatChange() {' + NL +
'  var sel = document.getElementById(\'transferCat\');' + NL +
'  if (!sel) return;' + NL +
'  selectedTransferCategory = sel.value || null;' + NL +
'  selectedTransferLevel = null;' + NL +
'  if (selectedTransferCategory && selectedLevel) {' + NL +
'    selectedLevel.toLabel = null;' + NL +
'  }' + NL +
'  renderContent();' + NL +
'}' + NL +
'' + NL +
'function onTransferLevelChange() {' + NL +
'  var sel = document.getElementById(\'transferLv\');' + NL +
'  if (!sel) return;' + NL +
'  selectedTransferLevel = sel.value || null;' + NL +
'  if (selectedTransferLevel && selectedLevel) {' + NL +
'    selectedLevel.toLabel = selectedTransferLevel;' + NL +
'  }' + NL +
'  renderContent();' + NL +
'}' + NL + NL +

'// ===== RENDER SECTIONS =====' + NL +
'function renderTransferSection() {' + NL +
'  var _html = \'\';' + NL +
'  var batchTypes = selectedBatch.promoteTypes || [\'mgmt\',\'prof\',\'labor\'];' + NL +
'  var currentCat = getTeacherCategory();' + NL +
'  var availableCats = batchTypes.filter(function(c) { return c !== currentCat; });' + NL +
'' + NL +
'  _html += \'<div class="selection-section">\';' + NL +
'  _html += \'<div class="section-title">选择转岗目标</div>\';' + NL +
'  _html += \'<div class="batch-detail">当前批次：\' + selectedBatch.name + \' | 当前岗位类别：<strong>\' + getTeacherCategoryLabel() + \'</strong> | 类型：<strong>转岗</strong></div>\';' + NL +
'' + NL +
'  if (availableCats.length === 0) {' + NL +
'    _html += \'<div style="padding:12px;text-align:center;color:var(--text-light);">当前批次无可转岗的岗位类别</div>\';' + NL +
'  } else {' + NL +
'    _html += \'<div style="margin-top:12px;">\';' + NL +
'    _html += \'<div class="selection-row">\';' + NL +
'    _html += \'<label>目标类别</label>\';' + NL +
'    _html += \'<select id="transferCat" onchange="onTransferCatChange()">\';' + NL +
'    _html += \'<option value="">请选择</option>\';' + NL +
'    availableCats.forEach(function(c) {' + NL +
'      _html += \'<option value="\' + c + \'"\' + (selectedTransferCategory === c ? \' selected\' : \'\') + \'>\' + CATEGORY_LABELS[c] + \'</option>\';' + NL +
'    });' + NL +
'    _html += \'</select></div>\';' + NL +
'' + NL +
'    _html += \'<div class="selection-row">\';' + NL +
'    _html += \'<label>目标等级</label>\';' + NL +
'    _html += \'<select id="transferLv" onchange="onTransferLevelChange()">\';' + NL +
'    if (selectedTransferCategory) {' + NL +
'      var transferLevels = getTransferLevels(selectedTransferCategory);' + NL +
'      _html += \'<option value="">请选择</option>\';' + NL +
'      transferLevels.forEach(function(lv) {' + NL +
'        _html += \'<option value="\' + lv.label + \'"\' + (selectedTransferLevel === lv.label ? \' selected\' : \'\') + \'>\' + lv.label + \'</option>\';' + NL +
'      });' + NL +
'    } else {' + NL +
'      _html += \'<option value="">请先选择类别</option>\';' + NL +
'    }' + NL +
'    _html += \'</select></div>\';' + NL +
'' + NL +
'    if (selectedTransferLevel) {' + NL +
'      var _tNum = extractLevelNumber(selectedTransferLevel);' + NL +
'      var _rem = getRemainingQuota(CURRENT_TEACHER.schoolName, _tNum);' + NL +
'      var _ex = isExemptFromQuota(_tNum);' + NL +
'      _html += \'<div class="batch-detail">目标\' + selectedTransferLevel + \'：\';' + NL +
'      if (_ex) { _html += \'不限名额\'; }' + NL +
'      else { _html += \'剩余可申报 \' + _rem + \' 个岗位\' + (_rem <= 0 ? \'（已满）\' : \'\'); }' + NL +
'      _html += \'</div>\';' + NL +
'    }' + NL +
'    _html += \'</div>\';' + NL +
'  }' + NL +
'  _html += \'</div>\';' + NL +
'  return _html;' + NL +
'}' + NL +
'' + NL +
'function renderFormSection() {' + NL +
'  var _html = \'\';' + NL +
'  var targetNum = selectedLevel ? extractLevelNumber(selectedLevel.toLabel) : 0;' + NL +
'  var fromNum = selectedLevel ? extractLevelNumber(selectedLevel.fromLabel) : 0;' + NL +
'  var isSenior3 = (fromNum === 4 && targetNum === 3);' + NL +
'' + NL +
'  if (isSenior3) {' + NL +
'    _html += \'<div class="promotion-type-badge senior_3">专项申报表 — 四级晋升三级</div>\';' + NL +
'    _html += renderSenior3Form();' + NL +
'  } else {' + NL +
'    _html += \'<div class="promotion-type-badge regular">通用基本信息表</div>\';' + NL +
'    _html += renderRegularForm();' + NL +
'  }' + NL +
'  return _html;' + NL +
'}' + NL +
'' + NL +
'function renderUploadSection() {' + NL +
'  var _html = \'\';' + NL +
'  _html += \'<div class="form-card">\';' + NL +
'  _html += \'<h3>附件材料 <span style="color:var(--text-light);font-size:12px;">（选填）</span></h3>\';' + NL +
'  _html += \'<div class="upload-area" onclick="document.getElementById(\\\'fileInput\\\').click()">\';' + NL +
'  _html += \'<div class="upload-icon">&#128206;</div>\';' + NL +
'  _html += \'<div class="upload-text">点击选择文件上传</div>\';' + NL +
'  _html += \'<div class="upload-hint">支持 PDF、Word (.doc/.docx)、图片 (.jpg/.png)，单个文件不超过 20MB</div>\';' + NL +
'  _html += \'</div>\';' + NL +
'  _html += \'<input type="file" id="fileInput" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" style="display:none" onchange="handleFileUpload(this)">\';' + NL +
'  _html += \'<div class="file-list" id="fileList">\';' + NL +
'  uploadedFiles.forEach(function (f, i) {' + NL +
'    _html += \'<div class="file-item"><span class="file-name">\' + f.name + \'</span><span class="file-size">\' + formatSize(f.size) + \'</span><span class="file-remove" onclick="removeFile(\' + i + \')">移除</span></div>\';' + NL +
'  });' + NL +
'  _html += \'</div></div>\';' + NL +
'  return _html;' + NL +
'}' + NL +
'' + NL +
'function bindUploadEvents() {' + NL +
'  var area = document.querySelector(\'.upload-area\');' + NL +
'  if (area) {' + NL +
'    area.addEventListener(\'dragover\', function (e) { e.preventDefault(); area.style.borderColor = \'var(--primary)\'; area.style.background = \'var(--primary-light)\'; });' + NL +
'    area.addEventListener(\'dragleave\', function (e) { e.preventDefault(); area.style.borderColor = \'\'; area.style.background = \'\'; });' + NL +
'    area.addEventListener(\'drop\', function (e) {' + NL +
'      e.preventDefault();' + NL +
'      area.style.borderColor = \'\';' + NL +
'      area.style.background = \'\';' + NL +
'      handleFiles(e.dataTransfer.files);' + NL +
'    });' + NL +
'  }' + NL +
'}' + NL + NL;

  content = content.substring(0, idx) + newHandlers + content.substring(idx);
  ok('Add new event handlers and render section functions');
}

// ============================================================
// 17. Update loadForEdit: remove currentStep = 4, use renderContent
// ============================================================
replaceOnce(
  '  // Jump directly to the form step so teacher can edit' + NL +
  '  currentStep = 4;' + NL +
  '  renderPage();',
  '  renderContent();',
  'Update loadForEdit to use renderContent');

// ============================================================
// 18. Update init() to remove step param logic, use renderContent
// Also remove the single-batch auto-select (user chooses explicitly now)
// But keep batch param pre-selection for edit mode
// ============================================================
var oldInit =
'    var batchParam = params.get(\'batch\');' + NL +
'    var batches = getOpenBatches();' + NL +
'    if (batchParam) {' + NL +
'      var matched = batches.find(function(b) { return b.id === batchParam; });' + NL +
'      if (matched) selectedBatch = matched;' + NL +
'    } else if (batches.length === 1) {' + NL +
'      selectedBatch = batches[0];' + NL +
'    }' + NL +
'    renderPage();';

var newInit =
'    var batchParam = params.get(\'batch\');' + NL +
'    var batches = getOpenBatches();' + NL +
'    if (batchParam) {' + NL +
'      var matched = batches.find(function(b) { return b.id === batchParam; });' + NL +
'      if (matched) selectedBatch = matched;' + NL +
'    }' + NL +
'    renderContent();';

replaceOnce(oldInit, newInit, 'Update init to use renderContent, remove auto-select');

// ============================================================
// 19. Update submitApplication validation reference
// The submit function still references currentStep indirectly through the validation
// that was in nextStep(). We need to add validation to submitApplication() itself.
// ============================================================
// Actually, submitApplication already has its own validation (quota check, duplicate check).
// But it needs the batch/type/level checks that were in nextStep().
// Let's add them at the beginning of submitApplication.

var submitStart =
'function submitApplication() {' + NL +
'  // Prevent duplicate application for same batch (only allow if editing a rejected record)' + NL +
'  if (pageMode !== \'edit\') {';

// We need to add validation BEFORE the duplicate check
var submitStartNew =
'function submitApplication() {' + NL +
'  // Validate selections' + NL +
'  if (!selectedBatch) {' + NL +
'    showToast(\'请先选择晋升批次\', \'warning\');' + NL +
'    return;' + NL +
'  }' + NL +
'  if (!selectedTransferType) {' + NL +
'    showToast(\'请先选择晋升类型\', \'warning\');' + NL +
'    return;' + NL +
'  }' + NL +
'  if (!selectedLevel || !selectedLevel.toLabel) {' + NL +
'    showToast(\'请先选择目标等级\', \'warning\');' + NL +
'    return;' + NL +
'  }' + NL +
'  // Check quota' + NL +
'  var targetNum = extractLevelNumber(selectedLevel.toLabel);' + NL +
'  if (!isExemptFromQuota(targetNum)) {' + NL +
'    var rem = getRemainingQuota(CURRENT_TEACHER.schoolName, targetNum);' + NL +
'    if (rem <= 0) {' + NL +
'      showToast(\'目标等级无可申报岗位数\', \'warning\');' + NL +
'      return;' + NL +
'    }' + NL +
'  }' + NL +
'  // Validate transfer selections' + NL +
'  if (selectedTransferType === \'transfer\') {' + NL +
'    if (!selectedTransferCategory || !selectedTransferLevel) {' + NL +
'      showToast(\'请选择转岗目标类别和等级\', \'warning\');' + NL +
'      return;' + NL +
'    }' + NL +
'  }' + NL +
'  // Validate senior_3 form fields' + NL +
'  collectSenior3Form();' + NL +
'  var s3TargetNum = extractLevelNumber(selectedLevel.toLabel);' + NL +
'  var s3FromNum = extractLevelNumber(selectedLevel.fromLabel);' + NL +
'  if (s3FromNum === 4 && s3TargetNum === 3) {' + NL +
'    var required = [' + NL +
'      { key: \'schoolMajor\', label: \'毕业学校及专业\' },' + NL +
'      { key: \'graduateTime\', label: \'毕业时间\' },' + NL +
'      { key: \'workStartTime\', label: \'参加工作时间\' },' + NL +
'      { key: \'profYears\', label: \'从事本专业时间\' },' + NL +
'      { key: \'qualName\', label: \'专业技术资格名称\' },' + NL +
'      { key: \'qualTime\', label: \'取得资格时间\' },' + NL +
'      { key: \'employStart\', label: \'聘用时间起\' },' + NL +
'      { key: \'employEnd\', label: \'聘用时间止\' },' + NL +
'      { key: \'targetStart\', label: \'拟聘起始时间\' },' + NL +
'      { key: \'targetEnd\', label: \'拟聘截止时间\' },' + NL +
'      { key: \'publicMethod\', label: \'公示方式\' },' + NL +
'      { key: \'publicStart\', label: \'公示开始时间\' },' + NL +
'      { key: \'publicEnd\', label: \'公示结束时间\' }' + NL +
'    ];' + NL +
'    for (var i = 0; i < required.length; i++) {' + NL +
'      if (!senior3Form[required[i].key]) {' + NL +
'        showToast(\'请填写\' + required[i].label, \'warning\');' + NL +
'        return;' + NL +
'      }' + NL +
'    }' + NL +
'  }' + NL +
'  // Prevent duplicate application for same batch (only allow if editing a rejected record)' + NL +
'  if (pageMode !== \'edit\') {';

replaceOnce(submitStart, submitStartNew, 'Add validation checks to submitApplication');

// ============================================================
// 20. Remove quota check that was duplicated in submitApplication
// (the one that was already there after the duplicate check)
// We need to find and remove the old quota check
// ============================================================
var oldQuotaCheck = NL +
'  // Check quota for the target level' + NL +
'  var targetNum = extractLevelNumber(selectedLevel.toLabel);' + NL +
'  if (!isExemptFromQuota(targetNum)) {' + NL +
'    var remaining = getRemainingQuota(CURRENT_TEACHER.schoolName, targetNum);' + NL +
'    if (remaining <= 0) {' + NL +
'      showToast(\'无可申报岗位数，无法提交\', \'warning\');' + NL +
'      return;' + NL +
'    }' + NL +
'  }' + NL;

replaceOnce(oldQuotaCheck, '', 'Remove duplicate quota check in submitApplication');

// ============================================================
// 21. Remove unused action-bar HTML element
// ============================================================
var actionBarHTML = NL +
'  <!-- Action bar -->' + NL +
'  <div class="action-bar" id="actionBar"></div>';

replaceOnce(actionBarHTML, '', 'Remove action bar HTML');

// ============================================================
// Write result
// ============================================================
fs.writeFileSync(filePath, content, 'utf8');
console.log('\n✅ All changes applied successfully!');
