import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// Find all .html files in root (not dist/)
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

let count = 0;
for (const f of files) {
  const filePath = path.join(rootDir, f);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Check if this file has a sidebarClick with catch-all showToast
  if (!content.includes("sidebarClick")) continue;
  if (!content.includes("机构管理")) continue;

  // Pattern: add org route before the final else
  // Variant 1: else { showToast('跳转至：' + el.textContent.trim()); }
  const pattern1 = "else { showToast('跳转至：' + el.textContent.trim()); }";
  const replacement1 = "else if (id === 'org') { window.location.href = 'org-management.html'; }\n  else { showToast('跳转至：' + el.textContent.trim()); }";

  // Variant 2: else { showToast('跳转至：' + id); }
  const pattern2 = "else { showToast('跳转至：' + id); }";
  const replacement2 = "else if (id === 'org') { window.location.href = 'org-management.html'; }\n  else { showToast('跳转至：' + id); }";

  let modified = false;

  if (content.includes(pattern1) && !content.includes("id === 'org'")) {
    content = content.replace(pattern1, replacement1);
    modified = true;
  }
  if (content.includes(pattern2) && !content.includes("id === 'org'")) {
    content = content.replace(pattern2, replacement2);
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Fixed:', f);
    count++;
  }
}

console.log('\nTotal fixed:', count);
