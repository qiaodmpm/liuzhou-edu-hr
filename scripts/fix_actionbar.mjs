import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, '..', 'org-ledger-school.html');
let c = fs.readFileSync(filePath, 'utf-8');

// Remove 返回工作台 button and change flex direction
c = c.replace(
  "var h = '<div style=\"display:flex;justify-content:space-between;align-items:center;padding:16px 0;\">';\n\th += '<button class=\"btn btn-outline\" onclick=\"window.location.href=\\'workbench.html\\'\">返回工作台</button>';\n\n\tvar canSubmit",
  "var h = '<div style=\"display:flex;justify-content:flex-end;align-items:center;padding:16px 0;gap:8px;\">';\n\n\tvar canSubmit"
);

fs.writeFileSync(filePath, c, 'utf-8');
console.log('Done');
