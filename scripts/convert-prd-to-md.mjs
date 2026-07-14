import { readFileSync, writeFileSync } from 'fs';

const html = readFileSync('docs/PRD_系统基础模块.html', 'utf8');
const bodyMatch = html.match(/<body>([\s\S]*)<\/body>/);
const body = bodyMatch[1];

let md = '';

// Helper: process inline HTML to Markdown
function inline(s) {
  return s
    .replace(/<strong>([\s\S]*?)<\/strong>/g, '**$1**')
    .replace(/<b>([\s\S]*?)<\/b>/g, '**$1**')
    .replace(/<code>([\s\S]*?)<\/code>/g, '`$1`')
    .replace(/<span class="feat-priority p0">([^<]*)<\/span>/g, '`P0`')
    .replace(/<span class="feat-priority p1">([^<]*)<\/span>/g, '`P1`')
    .replace(/<span class="feat-priority p2">([^<]*)<\/span>/g, '`P2`')
    .replace(/<span class="feat-id">([^<]*)<\/span>/g, '`$1`')
    .replace(/<span class="feat-name">([^<]*)<\/span>/g, '**$1**')
    .replace(/<span class="status-badge[^"]*">([^<]*)<\/span>/g, '[$1]')
    .replace(/<span class="bg-[^"]*"[^>]*>([^<]*)<\/span>/g, '`$1`')
    .replace(/<a href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g, '[$2]($1)')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<span style="([^"]*)"[^>]*>/g, '')
    .replace(/<\/span>/g, '')
    // Convert table tags to readable separators
    .replace(/<\/tr>/g, '\n')
    .replace(/<tr[^>]*>/g, '')
    .replace(/<\/t[hd]>/g, ' | ')
    .replace(/<t[hd][^>]*>/g, '')
    // Strip remaining HTML tags that shouldn't appear inline
    .replace(/<\/?(table|div|thead|tbody|colgroup|col)[^>]*>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/&emsp;/g, ' ').replace(/&#128269;/g, '🔍');
}

// Split body into blocks for processing
function extractBlocks(html) {
  const blocks = [];
  let pos = 0;
  while (pos < html.length) {
    // Skip whitespace
    const wsp = html.substring(pos).match(/^\s*/);
    pos += wsp[0].length;
    if (pos >= html.length) break;

    const rest = html.substring(pos);

    // Comments
    if (rest.startsWith('<!--')) {
      const end = rest.indexOf('-->');
      pos += end + 3;
      continue;
    }

    // Script/style
    if (rest.match(/^<(script|style|nav|header)/)) {
      const tag = rest.match(/^<(\w+)/)[1];
      const closeIdx = rest.indexOf('</' + tag + '>');
      if (closeIdx >= 0) { pos += closeIdx + tag.length + 3; continue; }
    }

    // Mermaid
    if (rest.match(/^<pre class="mermaid">/)) {
      const end = rest.indexOf('</pre>');
      if (end >= 0) {
        let content = rest.substring(20, end).trim();
        content = content.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
        blocks.push({ type: 'mermaid', content });
        pos += end + 6;
        continue;
      }
    }

    // Pre/code blocks (JSON data)
    if (rest.match(/^<pre><code>/)) {
      const end = rest.indexOf('</code></pre>');
      if (end >= 0) {
        let content = rest.substring(11, end).trim();
        content = content.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"');
        blocks.push({ type: 'code', content, lang: 'json' });
        pos += end + 13;
        continue;
      }
    }

    // Standalone opening <pre> (without code tag)
    if (rest.startsWith('<pre>')) {
      const end = rest.indexOf('</pre>');
      if (end >= 0) {
        let content = rest.substring(5, end).trim();
        content = content.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"');
        blocks.push({ type: 'code', content, lang: '' });
        pos += end + 6;
        continue;
      }
    }

    // Section title
    const secMatch = rest.match(/^<div class="section-title">(.*?)<\/div>/);
    if (secMatch) {
      blocks.push({ type: 'h2', content: inline(secMatch[1].trim()) });
      pos += secMatch[0].length;
      continue;
    }

    // Sub title
    const subMatch = rest.match(/^<div class="sub-title">(.*?)<\/div>/);
    if (subMatch) {
      blocks.push({ type: 'h3', content: inline(subMatch[1].trim()) });
      pos += subMatch[0].length;
      continue;
    }

    // Table
    if (rest.startsWith('<table>')) {
      const end = rest.indexOf('</table>');
      if (end >= 0) {
        const tableHtml = rest.substring(0, end + 8);
        blocks.push({ type: 'table', content: tableHtml });
        pos += end + 8;
        continue;
      }
    }

    // Table-wrap
    if (rest.match(/^<div class="table-wrap">/)) {
      let depth = 1, end = 30;
      for (let i = 30; i < rest.length && depth > 0; i++) {
        if (rest.substring(i, i + 4) === '<div') depth++;
        if (rest.substring(i, i + 6) === '</div>') { depth--; if (depth === 0) { end = i + 6; break; } }
      }
      const wrapHtml = rest.substring(0, end);
      // Extract table inside
      const tblMatch = wrapHtml.match(/<table>([\s\S]*?)<\/table>/);
      if (tblMatch) {
        blocks.push({ type: 'table', content: tblMatch[0] });
      }
      pos += end;
      continue;
    }

    // Feat card
    if (rest.match(/^<div class="feat-card">/)) {
      let depth = 1, end = 23;
      for (let i = 23; i < rest.length && depth > 0; i++) {
        if (rest.substring(i, i + 4) === '<div') depth++;
        if (rest.substring(i, i + 6) === '</div>') { depth--; if (depth === 0) { end = i + 6; break; } }
      }
      blocks.push({ type: 'feat-card', content: rest.substring(0, end) });
      pos += end;
      continue;
    }

    // Card grid with cards
    if (rest.match(/^<div class="card-grid">/)) {
      let depth = 1, end = 23;
      for (let i = 23; i < rest.length && depth > 0; i++) {
        if (rest.substring(i, i + 4) === '<div') depth++;
        if (rest.substring(i, i + 6) === '</div>') { depth--; if (depth === 0) { end = i + 6; break; } }
      }
      const gridHtml = rest.substring(0, end);
      // Extract card items
      const cards = [];
      const cardMatches = gridHtml.matchAll(/<div class="card">([\s\S]*?)<\/div>\s*(?=<div|$)/g);
      for (const cm of cardMatches) {
        const cardBody = cm[1];
        const h4Match = cardBody.match(/<h4>(.*?)<\/h4>/);
        const pMatch = cardBody.match(/<p>(.*?)<\/p>/);
        cards.push({ h4: h4Match ? inline(h4Match[1]) : '', p: pMatch ? inline(pMatch[1]) : '' });
      }
      blocks.push({ type: 'cards', content: cards });
      pos += end;
      continue;
    }

    // Flow box (contains mermaid or text) - extract inner mermaid
    if (rest.match(/^<div class="flow-box">/)) {
      let depth = 1, end = 22;
      for (let i = 22; i < rest.length && depth > 0; i++) {
        if (rest.substring(i, i + 4) === '<div') depth++;
        if (rest.substring(i, i + 6) === '</div>') { depth--; if (depth === 0) { end = i + 6; break; } }
      }
      const flowHtml = rest.substring(0, end);
      // Extract mermaid inside flow-box
      const merMatch = flowHtml.match(/<pre class="mermaid">([\s\S]*?)<\/pre>/);
      if (merMatch) {
        let merContent = merMatch[1].trim();
        merContent = merContent.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
        blocks.push({ type: 'mermaid', content: merContent });
      }
      pos += end;
      continue;
    }

    // Paragraph
    if (rest.startsWith('<p')) {
      const end = rest.indexOf('</p>');
      if (end >= 0) {
        const pText = rest.substring(0, end).replace(/<[^>]+>/g, '').trim();
        if (pText) blocks.push({ type: 'p', content: inline(rest.substring(rest.indexOf('>') + 1, end)) });
        pos += end + 4;
        continue;
      }
    }

    // DL (standalone, not inside feat-card)
    if (rest.startsWith('<dl')) {
      const end = rest.indexOf('</dl>');
      if (end >= 0) {
        const dlHtml = rest.substring(0, end + 5);
        const dts = dlHtml.matchAll(/<dt>(.*?)<\/dt>/g);
        const dds = dlHtml.matchAll(/<dd>([\s\S]*?)<\/dd>/g);
        const dtArr = [...dts].map(m => inline(m[1].trim()));
        const ddArr = [...dds].map(m => inline(m[1].trim()));
        for (let j = 0; j < Math.max(dtArr.length, ddArr.length); j++) {
          if (dtArr[j] && ddArr[j]) blocks.push({ type: 'dl', dt: dtArr[j], dd: ddArr[j] });
        }
        pos += end + 5;
        continue;
      }
    }

    // HR - skip (not Feishu compatible)
    if (rest.startsWith('<hr')) {
      pos += rest.indexOf('>') + 1;
      continue;
    }

    // Closing div, skip
    if (rest.match(/^<\/div>/)) {
      pos += 6;
      continue;
    }

    // Plain text / unknown - advance one char
    pos++;
  }
  return blocks;
}

const sections = body.split(/<!-- =+ \d+\. /);
// First section is header/nav stuff, rest are numbered sections

// Process each section
let sectionNum = 1;
for (const section of sections) {
  if (sectionNum === 1) {
    // Skip the first part (before section 1)
    sectionNum++;
    continue;
  }

  const blocks = extractBlocks(section);

  // Section title from comment
  const secTitleMatch = section.match(/^([^\-]+)/);
  if (secTitleMatch && !blocks.some(b => b.type === 'h2')) {
    // Don't add duplicate titles
  }

  for (const block of blocks) {
    switch (block.type) {
      case 'h2':
        md += '\n## ' + block.content + '\n\n';
        break;
      case 'h3':
        md += '\n### ' + block.content + '\n\n';
        break;
      case 'mermaid':
        md += '```mermaid\n' + block.content + '\n```\n\n';
        break;
      case 'code':
        md += '```' + (block.lang || '') + '\n' + block.content + '\n```\n\n';
        break;
      case 'table':
        md += htmlTableToMd(block.content) + '\n';
        break;
      case 'feat-card':
        md += featCardToMd(block.content);
        break;
      case 'cards':
        for (const c of block.content) {
          md += '- **' + c.h4 + '**：' + c.p + '\n';
        }
        md += '\n';
        break;
      case 'p':
        md += block.content + '\n\n';
        break;
      case 'dl':
        md += '**' + block.dt + '**：' + block.dd + '\n\n';
        break;
      case 'hr':
        break;
    }
  }
  sectionNum++;
}

function htmlTableToMd(tableHtml) {
  const rows = tableHtml.match(/<tr[^>]*>[\s\S]*?<\/tr>/g);
  if (!rows || rows.length === 0) return '';
  let result = '';
  let isFirst = true;
  for (const row of rows) {
    const cells = [];
    const cellMatches = row.matchAll(/<t[hd]([^>]*)>([\s\S]*?)<\/t[hd]>/g);
    for (const cm of cellMatches) {
      let cellContent = inline(cm[2].trim()).replace(/\|/g, '\\|').replace(/\n/g, ' ');
      cells.push(cellContent);
    }
    if (cells.length > 0) {
      result += '| ' + cells.join(' | ') + ' |\n';
      if (isFirst) {
        result += '| ' + cells.map(() => '---').join(' | ') + ' |\n';
        isFirst = false;
      }
    }
  }
  return result;
}

function featCardToMd(fcHtml) {
  let result = '';
  // Extract header
  const headerMatch = fcHtml.match(/<div class="feat-header">([\s\S]*?)<\/div>/);
  if (headerMatch) {
    const idMatch = headerMatch[1].match(/<span class="feat-id">([^<]+)<\/span>/);
    const nameMatch = headerMatch[1].match(/<span class="feat-name">([^<]+)<\/span>/);
    const priMatch = headerMatch[1].match(/<span class="feat-priority[^"]*">([^<]+)<\/span>/);
    if (idMatch && nameMatch) {
      result += '#### `' + idMatch[1].trim() + '` ' + nameMatch[1].trim();
      if (priMatch) result += ' `' + priMatch[1].trim() + '`';
      result += '\n\n';
    }
  }

  // Extract dl content
  const dlMatch = fcHtml.match(/<dl[^>]*>([\s\S]*?)<\/dl>/);
  if (!dlMatch) return result + '\n---\n\n';

  const dlHtml = dlMatch[1];
  // Split by <dt> tags
  const dtSplit = dlHtml.split(/<dt>/);
  for (let i = 1; i < dtSplit.length; i++) {
    const part = dtSplit[i];
    const dtEnd = part.indexOf('</dt>');
    if (dtEnd < 0) continue;
    const dtText = inline(part.substring(0, dtEnd).trim());
    const afterDt = part.substring(dtEnd + 5);
    // Extract dd content
    const ddMatch = afterDt.match(/<dd>([\s\S]*?)<\/dd>/);
    if (!ddMatch) continue;
    let ddContent = inline(ddMatch[1].trim());

    // Split dd content into paragraphs (separated by 2+ newlines from <br><br>)
    const paragraphs = ddContent.split(/\n{2,}/).map(p => p.trim()).filter(p => p.length > 0);

    if (paragraphs.length >= 2) {
      // Multi-paragraph content - format each paragraph
      result += '**' + dtText + '**：\n\n';
      for (const para of paragraphs) {
        // Check if this paragraph contains numbered items (split by single newlines from <br>)
        const items = para.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        if (items.length >= 2 && items.every(l => /^\d+\.\s/.test(l) || /^[-•]/.test(l))) {
          // Numbered list items
          for (const item of items) {
            result += item.replace(/^\s+/, '') + '\n';
          }
          result += '\n';
        } else if (items.length >= 2) {
          // Multiple lines but not all numbered - could be table data, join with separators
          // Try to detect table-like data (items with consistent structure)
          const hasTableLike = items.some(l => l.includes('对应模块') || l.includes('待办变化'));
          if (hasTableLike) {
            // Format as bullet list for readability
            for (const item of items) {
              result += '- ' + item.replace(/^\s+/, '') + '\n';
            }
            result += '\n';
          } else {
            result += para.replace(/\n/g, ' ') + '\n\n';
          }
        } else {
          result += para + '\n\n';
        }
      }
    } else {
      // Single paragraph - check for numbered items
      const lines = ddContent.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      if (lines.length >= 2 && lines.every(l => /^\d+\.\s/.test(l))) {
        result += '**' + dtText + '**：\n\n';
        for (const line of lines) {
          result += line.replace(/^\s+/, '') + '\n';
        }
        result += '\n';
      } else {
        ddContent = ddContent.replace(/\n/g, ' ');
        result += '**' + dtText + '**：' + ddContent + '\n\n';
      }
    }
  }

  result += '\n';
  return result;
}

// Clean up
md = md.replace(/\n{4,}/g, '\n\n\n');
md = md.replace(/\n---\n+/g, '\n\n');

// Add header
const header = '# PRD 系统基础模块 — 柳州教育人事管理平台\n\n' +
  '> 产品需求文档 · 登录 / 工作台 / 个人中心 / 忘记密码\n\n' +
  '> 📅 2026-07-10 &nbsp; 📌 Version 2.5（正式版） &nbsp; 📎 父文档：PRD_总纲_柳州教育人事管理平台.md\n\n';

md = header + md;

// Add footer
md += '\n\n' +
  '> 柳州教育人事管理平台 · 系统基础模块 PRD · Version 2.5（正式版） · 2026-07-10\n\n' +
  '> 父文档：PRD_总纲_柳州教育人事管理平台.md · 内部文档\n';

writeFileSync('docs/PRD_系统基础模块.md', md);
console.log('Done. Lines:', md.split('\n').length, 'Chars:', md.length);
