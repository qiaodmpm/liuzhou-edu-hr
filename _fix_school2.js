var fs = require('fs');
var c = fs.readFileSync('promote-audit-school.html', 'utf8');

// Check file is valid
if (c.indexOf('<!DOCTYPE html>') !== 0) {
  console.log('ERROR: File does not start with DOCTYPE');
  process.exit(1);
}

// 1. Button text and handler
c = c.replace('onclick="showRejectModal()">审核驳回</button>', 'onclick="doRejectNoPromotion()">不予晋升</button>');

// 2. Replace the full reject function section
var rejectStart = c.indexOf('function showRejectModal()');
if (rejectStart < 0) { console.log('showRejectModal not found'); process.exit(1); }

// Find the end - next function or comment
var markers = ['function now()', '// ===== TIMELINE', '// ===== SCHOOL'];
var rejectEnd = c.length;
for (var i = 0; i < markers.length; i++) {
  var idx = c.indexOf(markers[i], rejectStart + 10);
  if (idx > 0 && idx < rejectEnd) rejectEnd = idx;
}

var newFunc = '';
newFunc += 'function doRejectNoPromotion() {\n';
newFunc += '  if (!currentRecord) return;\n';
newFunc += "  if (!confirm('确认不予晋升？该教师本次晋升申请将终止，无法恢复。')) return;\n";
newFunc += '  var records = loadRecords();\n';
newFunc += '  var idx = records.findIndex(function(r) { return r.id === currentRecord.id; });\n';
newFunc += "  if (idx === -1) { showToast('记录不存在', 'warning'); return; }\n";
newFunc += '  var approverName = ROLES[currentRole].name;\n';
newFunc += '  var time = now();\n';
newFunc += '  if (schoolFiles.length > 0) {\n';
newFunc += '    if (!records[idx].schoolAttachments) records[idx].schoolAttachments = [];\n';
newFunc += '    schoolFiles.forEach(function(f) { records[idx].schoolAttachments.push(f); });\n';
newFunc += '  }\n';
newFunc += "  records[idx].status = 'first_rejected';\n";
newFunc += '  records[idx].firstReviewer = approverName;\n';
newFunc += '  records[idx].firstReviewTime = time;\n';
newFunc += "  records[idx].firstRejectReason = '学校审核不予晋升';\n";
newFunc += '  records[idx].timeline = records[idx].timeline || [];\n';
newFunc += "  records[idx].timeline.push({ time: time, action: '学校不予晋升', operator: approverName, opinion: '学校审核不予晋升' });\n";
newFunc += '  saveRecords(records);\n';
newFunc += "  showToast('已标记为不予晋升', 'success');\n";
newFunc += "  setTimeout(function() { window.location.href = 'promote-list-school.html'; }, 1000);\n";
newFunc += '}\n\n';

c = c.substring(0, rejectStart) + newFunc + c.substring(rejectEnd);

fs.writeFileSync('promote-audit-school.html', c, 'utf8');
console.log('Done');

// Verify
var m = c.match(/<script>([\s\S]*?)<\/script>/);
if (!m) { console.log('ERROR: No script tag found'); process.exit(1); }
try { new Function(m[1]); console.log('Syntax OK'); } catch(e) { console.log('ERROR: ' + e.message.substring(0,60)); }
console.log('doRejectNoPromotion: ' + (c.indexOf('doRejectNoPromotion') > -1 ? 'OK' : 'MISSING'));
