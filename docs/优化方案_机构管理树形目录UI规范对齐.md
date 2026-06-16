# 优化方案：机构管理 — 左侧树形目录 UI 规范对齐

> 日期：2026-06-16 | 状态：方案确认中，暂未实施

---

## 1. 当前 UI 问题

对比项目现有设计模式，左侧树面板存在以下不符合规范的地方：

| # | 问题 | 当前实现 | 项目规范 |
|---|------|---------|---------|
| 1 | **emoji 图标** | 📁/📂 文件夹 emoji | 项目统一使用 SVG 图标（sidebar 菜单、表单、tab 均无 emoji） |
| 2 | **展开箭头** | `▶` 纯文本字符 | 应使用 SVG chevron（参考 sidebar toggle 的 `<polyline points="15 18 9 12 15 6"/>`） |
| 3 | **标题样式** | `text-transform: uppercase` + 11px 灰色字 | 中文无需 uppercase；应参考 `.side-history h4`（13px/600）或 `.form-card h2`（15px/600） |
| 4 | **选中态竖线** | `border-left: 3px solid --accent` | 侧边栏暗色背景用竖线合理；白色卡片中用竖线视觉弱，推荐用 `--primary-light` 背景色差更明显 |
| 5 | **根节点分隔** | `border-bottom: 1px solid --border` | 和 list-card、form-card 的边框一致，OK；但根节点字号与普通节点相同（13px），层级感不足 |
| 6 | **hover 态** | `background: --gray-bg (#F1F5F9)` | 正确，与 table row hover 一致 |
| 7 | **active 态** | `background: --primary-light` + `color: --primary` | 正确，与 sidebar `.menu-item.active` 一致 |
| 8 | **数量 badge** | `--text-light` + `--gray-bg` 背景，无边框 | 可参考 filter-tab `.count`（10px/opacity:0.7），建议统一 |
| 9 | **树面板容器** | `box-shadow: --shadow-sm` | 与其他 card 一致，OK |

---

## 2. 逐项修复方案

### 2.1 emoji → SVG 图标

**当前**：
```html
<span>📁</span> 鱼峰区
<span>📂</span> 鱼峰区  <!-- 展开态 -->
```

**修复**：去掉 emoji，改用统一 SVG 文件夹图标：

```html
<!-- 折叠态 -->
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5">
  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
</svg>

<!-- 展开态：open folder -->
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5">
  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v1"/>
  <path d="M2 11l2.5-4h15L22 11"/>
</svg>
```

> 简化方案：始终用折叠文件夹 SVG，不区分展开/折叠态（因方案已决定不展示子节点，无需表达展开状态）。

### 2.2 `▶` → SVG Chevron

**当前**：
```html
<span class="tree-arrow">▶</span>
```

**修复**：使用与 sidebar toggle 一致的 SVG：
```html
<svg class="tree-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <polyline points="9 18 15 12 9 6"/>
</svg>
```

CSS 旋转：
```css
.tree-arrow { transition: transform 0.2s; opacity: 0.4; flex-shrink: 0; }
.tree-arrow.expanded { transform: rotate(90deg); }
```

### 2.3 标题样式对齐

**当前**：
```css
.tree-panel-title { padding: 10px 16px 8px; font-size: 11px; font-weight: 600;
  color: var(--text-light); letter-spacing: 1px; text-transform: uppercase; }
```

**修复**：去掉 `text-transform`，字号对齐 `.side-history h4`：
```css
.tree-panel-title { padding: 12px 16px 10px; font-size: 12px; font-weight: 600;
  color: var(--text-secondary); letter-spacing: 0.5px; }
```

> 去掉 uppercase（中文不适用），字色从 `--text-light` 改为 `--text-secondary` 保持可读性。

### 2.4 选中态优化

**当前**：
```css
.tree-node.active { background: var(--primary-light); color: var(--primary);
  font-weight: 500; border-left-color: var(--accent); }
```

项目 `.form-card` 内部选中态参考 — 侧边栏用竖线是因为暗背景；白色卡片中 `--primary-light` 背景已经足够表达选中。竖线保留也不冲突。

**建议微调**：加深 active 背景对比度，去掉竖线（白色卡片中不够显眼）：
```css
.tree-node.active { background: #DBEAFE; color: var(--primary); font-weight: 500; }
```

> `#DBEAFE` 比 `--primary-light (#EFF6FF)` 略深，选中态更明确。

### 2.5 根节点层级区分

**当前**：根节点 13px/600，子节点 13px/400 — 只有粗细差别。

**修复**：
```css
.tree-node.root { font-weight: 600; font-size: 14px; color: var(--text);
  border-bottom: 1px solid var(--border); margin-bottom: 4px; padding: 9px 16px 11px; }
.tree-node.root .tree-dot { width: 8px; height: 8px; background: var(--primary); }
```

> 根节点字号略大（14px），圆点略大（8px）且用 `--primary` 色。

### 2.6 数量 badge 统一

**当前**：
```css
.tree-count { font-size: 11px; color: var(--text-light); background: var(--gray-bg);
  padding: 1px 7px; border-radius: 10px; font-weight: 500; }
```

**对齐 filter-tab `.count`**：
```css
.tree-count { font-size: 10px; color: var(--text-light); margin-left: auto; }
```

> 去掉背景和 padding，和 filter-tab 的 `.count` 完全一致：`font-size:10px; opacity:0.7`。

---

## 3. 完整修复后 CSS

```css
/* Tree panel */
.tree-panel {
  width: 220px; flex-shrink: 0;
  background: #fff; border: 1px solid var(--border);
  border-radius: var(--radius-lg); box-shadow: var(--shadow-sm);
  overflow-y: auto; padding: 4px 0;
  align-self: flex-start; position: sticky; top: 80px;
  max-height: calc(100vh - 56px - 120px);
}
.tree-panel-title {
  padding: 12px 16px 10px; font-size: 12px; font-weight: 600;
  color: var(--text-secondary); letter-spacing: 0.5px;
}
.tree-node {
  padding: 8px 16px; cursor: pointer; font-size: 13px;
  display: flex; align-items: center; gap: 8px;
  transition: var(--transition); color: var(--text);
}
.tree-node:hover { background: var(--gray-bg); }
.tree-node.active { background: #DBEAFE; color: var(--primary); font-weight: 500; }
.tree-node.root {
  font-weight: 600; font-size: 14px;
  border-bottom: 1px solid var(--border); margin-bottom: 4px;
  padding: 10px 16px 12px;
}
.tree-node.root .tree-dot { width: 8px; height: 8px; background: var(--primary); }

/* Icons */
.tree-icon { width: 16px; height: 16px; opacity: 0.4; flex-shrink: 0; color: var(--text-secondary); }
.tree-arrow { width: 14px; height: 14px; opacity: 0.35; flex-shrink: 0;
  transition: transform 0.2s; cursor: pointer; }
.tree-arrow.expanded { transform: rotate(90deg); }
.tree-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }

/* Badge */
.tree-count { font-size: 10px; color: var(--text-light); margin-left: auto; }
.tree-count.zero { opacity: 0.4; }
```

---

## 4. 修复后树节点渲染（JS）

```javascript
function renderTree() {
  var groups = buildTreeData();
  var userDistrict = currentUser.district || '';
  var isDistrictAdmin = currentUser.role === 'district';

  var h = '';

  // 根节点：柳州市
  if (!isDistrictAdmin) {
    var totalActive = orgDirectory.filter(function(o) { return o.status === 'active'; }).length;
    h += '<div class="tree-node root' + (treeState.selectedDistrict === 'all' ? ' active' : '') + '" onclick="selectDistrict(\'all\')">';
    h += '<span class="tree-dot"></span> 柳州市';
    h += '<span class="tree-count">' + totalActive + '</span>';
    h += '</div>';
  }

  var districts = isDistrictAdmin ? [userDistrict] : DISTRICTS;

  for (var i = 0; i < districts.length; i++) {
    var d = districts[i];
    var schools = groups[d] || [];
    var activeCount = schools.filter(function(o) { return o.status === 'active'; }).length;
    var isExpanded = treeState.expandedDistricts[d];
    var isSelected = treeState.selectedDistrict === d;

    if (isSelected && !isExpanded) {
      treeState.expandedDistricts[d] = true;
      isExpanded = true;
    }

    h += '<div class="tree-node' + (isSelected ? ' active' : '') + '" onclick="selectDistrict(\'' + escAttr(d) + '\')">';

    // SVG 文件夹图标（无 emoji）
    h += '<svg class="tree-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">';
    h += '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>';
    h += '</svg>';

    h += escHtml(d);
    h += '<span class="tree-count' + (activeCount === 0 ? ' zero' : '') + '">' + activeCount + '</span>';
    h += '</div>';

    // 二级节点（学校列表 —— 将在简化方案中去掉）
    // ...
  }

  document.getElementById('treePanel').innerHTML = '<div class="tree-panel-title">区域目录</div>' + h;
}
```

---

## 5. 效果对比

```
改前（不规范）：                          改后（规范）：
┌──────────────────┐                    ┌──────────────────┐
│ 区域目录          │                    │ 区域目录          │
│                  │                    │                  │
│ ● 全部机构    15 │                    │ ● 柳州市      15 │
│ ▸ 📁 市直属   7  │                    │ 📁 市直属     7  │
│ ▾ 📂 鱼峰区   6  │                    │ 📁 鱼峰区     6  │
│    柳州八中      │                    │ 📁 城中区     1  │
│    柳州十三中    │                    │ 📁 柳江区     1  │
│    二十五中      │                    │ 📁 柳北区     0  │
│ ▸ 📁 城中区   1  │                    │ ...              │
└──────────────────┘                    └──────────────────┘
  ✗ emoji 图标                            ✓ SVG 图标统一
  ✗ ▶ 文本箭头                            ✓ SVG chevron
  ✗ uppercase 中文                        ✓ 去掉
  ✗ badge 带背景                          ✓ 纯文字 badge
```

---

## 6. 改动清单

| # | 文件 | 改动 |
|---|------|------|
| 1 | `org-management.html` CSS | 重写 `.tree-panel*` / `.tree-node*` / `.tree-count` 系列样式 |
| 2 | `org-management.html` CSS | 新增 `.tree-icon` 样式 |
| 3 | `org-management.html` JS | `renderTree()` 中 emoji → SVG 图标 |
| 4 | `org-management.html` JS | `renderTree()` 中 "全部机构" → "柳州市" |

仅一个文件，约 30 行 CSS + 15 行 JS 改动。
