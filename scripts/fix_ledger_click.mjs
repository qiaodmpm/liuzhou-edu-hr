import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

function findHtmlFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'dist' || entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'scripts') continue;
      results.push(...findHtmlFiles(fullPath));
    } else if (entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const ledgerHandler = `  if (id === 'ledger') { var lr = currentUser.role || currentRole; window.location.href = (lr === 'city' || lr === 'district') ? 'org-ledger-admin.html' : lr === 'school' ? 'org-ledger-school.html' : 'workbench.html'; return; }`;

const files = findHtmlFiles(rootDir);
let fixedCount = 0;

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Skip if already has ledger handler or no sidebarClick
  if (content.includes("id === 'ledger'")) continue;
  if (!content.includes('function sidebarClick')) continue;
  if (!content.includes("id:'ledger'") && !content.includes("id: 'ledger'")) continue;

  // Find sidebarClick function body and insert handler at the end before catch-all
  // Strategy: find the last "if" or "else if" in sidebarClick before the catch-all

  const fnStart = content.indexOf('function sidebarClick');
  const fnBodyStart = content.indexOf('{', fnStart) + 1;

  // Find the matching closing brace of sidebarClick
  let depth = 1;
  let fnBodyEnd = fnBodyStart;
  for (let i = fnBodyStart; i < content.length && depth > 0; i++) {
    if (content[i] === '{') depth++;
    else if (content[i] === '}') depth--;
    if (depth === 0) fnBodyEnd = i;
  }

  const fnBody = content.substring(fnBodyStart, fnBodyEnd);

  // Try to find insertion point - before the catch-all line
  let insertionPoint = -1;

  // Common catch-all patterns
  const patterns = [
    "else { showToast('跳转至：' + el.textContent.trim())",
    "else { showToast('跳转至：' + (el.querySelector",
    "else { window.location.href = '#'",
    "showToast('跳转至：' + el.textContent.trim())",
    "showToast('跳转至：' + (el.querySelector('.menu-label')",
    "else { showToast(el.textContent.trim()",
    "else { showToast('功能开发中",
    "else if (id === 'dashboard')",
  ];

  for (const pat of patterns) {
    const idx = fnBody.lastIndexOf(pat);
    if (idx >= 0) {
      insertionPoint = fnBodyStart + fnBody.lastIndexOf('\n', idx);
      break;
    }
  }

  if (insertionPoint < 0) {
    // Fallback: find the last "return; }" or last "}" before closing
    const lines = fnBody.split('\n');
    // Insert before the last non-empty line
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].trim() && !lines[i].trim().startsWith('//')) {
        // Insert a new line with the handler before this line
        const charIdx = fnBodyStart + fnBody.split('\n').slice(0, i).join('\n').length + (i > 0 ? 1 : 0);
        insertionPoint = charIdx;
        break;
      }
    }
  }

  if (insertionPoint >= 0) {
    content = content.substring(0, insertionPoint) + '\n' + ledgerHandler + '\n' + content.substring(insertionPoint);
    fs.writeFileSync(filePath, content, 'utf-8');
    fixedCount++;
    console.log('Fixed:', path.relative(rootDir, filePath));
  } else {
    console.log('SKIP (no insertion point):', path.relative(rootDir, filePath));
  }
}

console.log(`\nTotal files fixed: ${fixedCount}`);
