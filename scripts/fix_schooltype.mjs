import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

const files = [
  'entry-form.html',
  'entry-detail.html',
  'exit-form.html',
  'exit-detail.html',
  'exit-audit.html'
];

let total = 0;

for (const f of files) {
  const filePath = path.join(rootDir, f);
  let c = fs.readFileSync(filePath, 'utf-8');
  const original = c;

  // 1. Replace field name in data objects: schoolType: → districtCategory:
  c = c.replace(/\bschoolType:/g, 'districtCategory:');

  // 2. Replace property access: .schoolType → .districtCategory
  c = c.replace(/\.schoolType\b/g, '.districtCategory');

  // 3. Replace display label "学校类型" where it shows district category
  //    Look for: 学校类型</div><div ...>' + (r.schoolType  or  (record.schoolType
  c = c.replace(
    /(<div class="info-label">)学校类型(<\/div><div class="info-value">[^<]*\(r\.)districtCategory/g,
    '$1区域归属$2districtCategory'
  );
  c = c.replace(
    /(<div class="info-label">)学校类型(<\/div><div class="info-value">[^<]*\(record\.)districtCategory/g,
    '$1区域归属$2districtCategory'
  );

  if (c !== original) {
    fs.writeFileSync(filePath, c, 'utf-8');
    const changes = (original.match(/schoolType/g) || []).length;
    console.log('Fixed: ' + f + ' (' + changes + ' occurrences)');
    total += changes;
  } else {
    console.log('Skip: ' + f + ' (no changes)');
  }
}

console.log('\nTotal occurrences replaced: ' + total);
