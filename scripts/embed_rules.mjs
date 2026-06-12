import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prdPath = path.join(__dirname, '..', 'docs', '飞书_编制使用申请模块_PRD.md');
const doc = fs.readFileSync(prdPath, 'utf-8');

// Read the pre-built content from a separate file
const contentPath = path.join(__dirname, 'section5_content.md');
const s5 = fs.readFileSync(contentPath, 'utf-8');

const s5_start = doc.indexOf('## 5. 功能清单');
const s7_start = doc.indexOf('## 7. 数据模型');
let result = doc.slice(0, s5_start) + s5 + doc.slice(s7_start);
fs.writeFileSync(prdPath, result, 'utf-8');
console.log('Rules embedded. Total lines:', result.split('\n').length);
