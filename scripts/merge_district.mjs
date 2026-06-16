import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// ====== Phase 1: districtCategory → district in entry/exit files ======
const phase1Files = [
  'entry-form.html', 'entry-detail.html',
  'exit-form.html', 'exit-detail.html', 'exit-audit.html'
];

for (const f of phase1Files) {
  const fp = path.join(rootDir, f);
  let c = fs.readFileSync(fp, 'utf-8');
  const orig = c;

  // 1. Value: '鱼峰区属' → '鱼峰区' (only in districtCategory context)
  c = c.replace(/districtCategory:\s*'鱼峰区属'/g, "district: '鱼峰区'");
  c = c.replace(/districtCategory:\s*"鱼峰区属"/g, 'district: "鱼峰区"');

  // 2. Value: '市直属' stays the same, just rename field
  c = c.replace(/districtCategory:\s*'/g, "district: '");
  c = c.replace(/districtCategory:\s*"/g, 'district: "');

  // 3. Property access: .districtCategory → .district
  c = c.replace(/\.districtCategory\b/g, '.district');

  // 4. Comparison: districtCategory === '鱼峰区属' → district === '鱼峰区'
  c = c.replace(/district\s*===\s*'鱼峰区属'/g, "district === '鱼峰区'");
  c = c.replace(/district\s*===\s*"鱼峰区属"/g, 'district === "鱼峰区"');

  // 5. Display label: keep '区域归属', field ref already changed above

  if (c !== orig) {
    fs.writeFileSync(fp, c, 'utf-8');
    console.log('Phase1 OK:', f);
  } else {
    console.log('Phase1 skip:', f);
  }
}

// ====== Phase 2: schoolCategory → district in employ/promote/personal-center ======
const phase2Files = [
  'employ-form.html', 'employ-list-admin.html', 'employ-list-school.html',
  'employ-detail.html', 'promote-audit-school.html', 'promote-audit-third.html',
  'personal-center.html'
];

for (const f of phase2Files) {
  const fp = path.join(rootDir, f);
  let c = fs.readFileSync(fp, 'utf-8');
  const orig = c;

  // 1. schoolCategory: '市直属' → district: '市直属'
  c = c.replace(/schoolCategory:\s*'市直属'/g, "district: '市直属'");
  c = c.replace(/schoolCategory:\s*"市直属"/g, 'district: "市直属"');

  // 2. schoolCategory: '鱼峰区属' → district: '鱼峰区'
  c = c.replace(/schoolCategory:\s*'鱼峰区属'/g, "district: '鱼峰区'");
  c = c.replace(/schoolCategory:\s*"鱼峰区属"/g, 'district: "鱼峰区"');

  // 3. Property access: .schoolCategory → .district
  c = c.replace(/\.schoolCategory\b/g, '.district');

  // 4. Comparison: schoolCategory === '鱼峰区属' → district === '鱼峰区'
  c = c.replace(/schoolCategory\s*===\s*'鱼峰区属'/g, "district === '鱼峰区'");
  c = c.replace(/schoolCategory\s*===\s*"鱼峰区属"/g, 'district === "鱼峰区"');

  // 5. schoolCategory || → district ||
  c = c.replace(/schoolCategory\s*\|\|/g, 'district ||');

  // 6. Display label: 学校类别 → 区域归属 (in employ-detail)
  //    Already handled by property access rename

  if (c !== orig) {
    fs.writeFileSync(fp, c, 'utf-8');
    console.log('Phase2 OK:', f);
  } else {
    console.log('Phase2 skip:', f);
  }
}

console.log('\nDone.');
