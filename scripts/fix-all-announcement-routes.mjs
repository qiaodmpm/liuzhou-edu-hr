import { readFileSync, writeFileSync } from 'fs';
import { readdirSync } from 'fs';

const files = readdirSync('.').filter(f => f.endsWith('.html') && !f.startsWith('dist'));

let fixed = 0;

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  if (!content.includes('function sidebarClick')) continue;
  if (/announcement.*announcement-management/.test(content)) continue;

  // Find sidebarClick function boundaries
  const fnStart = content.indexOf('function sidebarClick');
  let fnEnd = content.indexOf('\nfunction ', fnStart + 10);
  if (fnEnd < 0) fnEnd = content.indexOf('\n</script>', fnStart);
  if (fnEnd < 0) fnEnd = content.indexOf('\n<script', fnStart + 10);
  if (fnEnd < 0) fnEnd = content.length;

  const fnBody = content.substring(fnStart, fnEnd);
  const lines = fnBody.split('\n');

  // Find last showToast line position
  let insertBeforeLine = -1;
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];
    if (line.includes('showToast(') || (line.trim().startsWith('else ') && line.includes('showToast'))) {
      insertBeforeLine = i;
      break;
    }
  }

  if (insertBeforeLine < 0) {
    // No showToast fallback - insert before closing }
    insertBeforeLine = lines.length - 1;
  }

  // Calculate absolute position
  let charCount = 0;
  for (let i = 0; i < insertBeforeLine; i++) {
    charCount += lines[i].length + 1; // +1 for newline
  }
  const absInsertPos = fnStart + charCount;

  // Determine indent from previous line
  const prevLine = lines[insertBeforeLine - 1] || '';
  const indentMatch = prevLine.match(/^(\s*)/);
  const indent = indentMatch ? indentMatch[1] : '  ';

  const routeLine = indent + "if (id === 'announcement') { window.location.href = 'announcement-management.html'; return; }";

  const newContent = content.substring(0, absInsertPos) + routeLine + '\n' + content.substring(absInsertPos);

  writeFileSync(file, newContent);
  fixed++;
  console.log('FIXED: ' + file);
}

console.log('\nTotal fixed: ' + fixed);
