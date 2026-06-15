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

const files = findHtmlFiles(rootDir);
let updatedCount = 0;

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  // Skip already-updated files
  if (content.includes("id === 'ledger'")) continue;

  // 1. Replace sidebar config id
  if (content.includes("id:'dashboard'") || content.includes('id:"dashboard"') || content.includes("id: 'dashboard'")) {
    content = content.replace(/id\s*:\s*['"]dashboard['"]/g, "id:'ledger'");
    changed = true;
  }

  // 2. Replace label
  if (content.includes('数据概览')) {
    content = content.replace(/数据概览/g, '编制岗位台账');
    changed = true;
  }

  // 3. Add ledger handler to sidebarClick - insert before the catch-all else
  if (changed && content.includes('function sidebarClick')) {
    // Pattern A: final else { showToast(...) }
    if (content.includes("else { showToast('跳转至：' + el.textContent.trim())")) {
      content = content.replace(
        /(\s+else \{ showToast\('跳转至：' \+ el\.textContent\.trim\(\)\))/,
        "  else if (id === 'ledger') { var _r = currentUser.role || currentRole; window.location.href = (_r === 'city' || _r === 'district') ? 'org-ledger-admin.html' : _r === 'school' ? 'org-ledger-school.html' : 'workbench.html'; }\n$1"
      );
      changed = true;
    }
    // Pattern B: else { window.location.href = '#' }
    else if (content.includes("window.location.href = '#'") && content.includes('sidebarClick')) {
      content = content.replace(
        /(\s+else \{ window\.location\.href = '#')/,
        "  else if (id === 'ledger') { var _r2 = currentUser.role || currentRole; window.location.href = (_r2 === 'city' || _r2 === 'district') ? 'org-ledger-admin.html' : _r2 === 'school' ? 'org-ledger-school.html' : 'workbench.html'; return; }\n$1"
      );
      changed = true;
    }
    // Pattern C: dashboard case exists but no ledger case
    else if (content.includes("id === 'dashboard'")) {
      content = content.replace(
        /(\s+)(else )?if \(id === 'dashboard'\)/g,
        "$1else if (id === 'ledger') { var _r3 = currentUser.role || currentRole; window.location.href = (_r3 === 'city' || _r3 === 'district') ? 'org-ledger-admin.html' : _r3 === 'school' ? 'org-ledger-school.html' : 'workbench.html'; }\n$1$2if (id === 'dashboard'"
      );
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    updatedCount++;
    console.log('Updated:', path.relative(rootDir, filePath));
  }
}

console.log(`\nTotal files updated: ${updatedCount}`);
