import { readFileSync, writeFileSync } from 'fs';

const ANNOUNCEMENT_ROUTE = "  if (id === 'announcement') { window.location.href = 'announcement-management.html'; return; }";

const FILES = [
  'account-management.html',
  'announcement-detail.html',
  'announcement-management.html',
  'entry-detail.html',
  'entry-form.html',
  'exit-audit.html',
  'exit-detail.html',
  'exit-form.html',
  'post-audit-first.html',
  'post-audit-second.html',
  'post-detail.html',
  'post-form.html',
  'promote-audit-school.html',
  'promote-audit-second.html',
  'promote-audit-third.html',
  'promote-detail.html',
  'promote-form.html',
  'recruit-audit-first.html',
  'staffing-application.html',
  'staffing-form.html',
  'workbench.html',
  '审核教师入编页（主管单位视角）.html',
  '审核编制使用申请页（主管单位视角）.html',
  '教师入编管理（主管单位视角）.html',
  '教师入编管理（学校管理员视角）.html',
  '教师出编管理（主管单位视角）.html',
  '教师出编管理（学校管理员视角）.html',
];

for (const file of FILES) {
  let content = readFileSync(file, 'utf8');

  // Check if already has the route
  if (/id\s*===?\s*'announcement'/.test(content)) {
    console.log('SKIP (already has route): ' + file);
    continue;
  }

  // Find sidebarClick function boundaries
  const fnStart = content.indexOf('function sidebarClick');
  if (fnStart < 0) {
    console.log('SKIP (no sidebarClick): ' + file);
    continue;
  }

  // Find the function end - look for the closing brace before next function/script
  let searchStart = fnStart;
  // Find the last showToast inside the sidebarClick
  // Strategy: find all showToast calls in the file, keep the one inside sidebarClick

  // Find next function or </script> after sidebarClick
  let fnEnd = content.indexOf('\nfunction ', fnStart + 10);
  if (fnEnd < 0) fnEnd = content.indexOf('\nfunction(', fnStart + 10);
  if (fnEnd < 0) fnEnd = content.indexOf('\n</script>', fnStart);
  if (fnEnd < 0) fnEnd = content.indexOf('\n<script', fnStart + 10);
  if (fnEnd < 0) fnEnd = content.length;

  const fnBody = content.substring(fnStart, fnEnd);

  // Find the last showToast in the function body
  const showToastMatches = [...fnBody.matchAll(/showToast\(/g)];
  if (showToastMatches.length === 0) {
    // No showToast fallback - insert before the closing }
    const lastBrace = fnBody.lastIndexOf('}');
    const insertPos = fnStart + lastBrace;
    const newContent = content.substring(0, insertPos) + '\n' + ANNOUNCEMENT_ROUTE + '\n' + content.substring(insertPos);
    writeFileSync(file, newContent);
    console.log('FIXED (before closing brace): ' + file);
    continue;
  }

  // Get the last showToast position + the full line before it
  const lastShowToastIdx = showToastMatches[showToastMatches.length - 1].index;

  // Find the start of the line containing this showToast
  const lineStart = fnBody.lastIndexOf('\n', lastShowToastIdx);
  const lineContent = fnBody.substring(lineStart + 1, fnBody.indexOf('\n', lastShowToastIdx));

  // Insert announcement route before this line
  const insertPos = fnStart + lineStart + 1; // after the newline
  const newContent = content.substring(0, insertPos) + ANNOUNCEMENT_ROUTE + '\n' + content.substring(insertPos);

  writeFileSync(file, newContent);
  console.log('FIXED: ' + file + ' (before: ' + lineContent.trim().substring(0, 40) + '...)');
}
