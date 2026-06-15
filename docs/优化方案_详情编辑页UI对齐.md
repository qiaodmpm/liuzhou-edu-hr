# 优化方案：编制岗位台账详情/编辑页 UI 对齐项目规范

> 日期：2026-06-15 | 状态：方案确认中，暂未实施

---

## 一、现状问题

`org-ledger-detail.html` 当前 UI 存在以下与项目规范不一致的地方：

| # | 问题 | 位置 | 项目规范 |
|---|------|------|----------|
| 1 | 底部操作栏用内联 style | 编辑模式底部 `取消编辑` / `保存修改` | 项目使用 `.submit-bar` 类（`employ-form.html:200`） |
| 2 | 返回链接用内联 style | 标题上方 `← 返回列表` | 应放在 `.breadcrumb` 中，作为面包屑的一部分 |
| 3 | 缺少 `.submit-bar` CSS | CSS 中无此定义 | 需补充 |
| 4 | 缺少 `fieldset`/`legend` 分组样式 | CSS 中无此定义 | 项目使用 `fieldset` + `legend` 分组表单区块 |
| 5 | 数字输入框宽度不一致 | 编制/岗位/职数字段 | 使用 `style="width:80px"` 内联，应统一 |
| 6 | 表内输入框无统一 class | 岗位结构、领导职数表格 | 应使用 `.form-group input` 统一风格 |
| 7 | section 标题用 `h3` 裸样式 | "事业编制""控制数""岗位结构"等 | 项目使用 `.section-title` 或 `fieldset legend` |
| 8 | 页头按钮区用内联布局 | 审核通过/退回/校正按钮 | 无统一 class |
| 9 | 底部操作栏缺少背景区分 | 编辑模式底部 | 应为 sticky 或有视觉分隔 |

---

## 二、CSS 补充

```css
/* Submit bar — 对齐 employ-form.html:200 */
.submit-bar {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px 0; gap: 12px;
}

/* Fieldset / legend — 对齐项目规范 */
fieldset {
  border: 1px solid var(--border); border-radius: var(--radius);
  padding: 16px; margin-bottom: 16px;
}
legend {
  font-size: 13px; font-weight: 600; color: var(--primary);
  padding: 0 8px;
}

/* Section title — 对齐 employ-form.html:129 */
.section-title {
  font-size: 13px; font-weight: 600; color: var(--primary);
  margin-bottom: 10px; display: flex; align-items: center; gap: 6px;
}

/* Number input in table cells — 统一宽度 */
.table-input-num {
  width: 80px; padding: 6px 8px; font-size: 12px;
  border: 1px solid var(--border); border-radius: 4px;
  font-family: inherit; text-align: center;
}
.table-input-num:focus {
  border-color: var(--accent); outline: none;
  box-shadow: 0 0 0 2px rgba(59,130,246,0.1);
}

/* Read-only table cell display */
.table-cell-ro {
  padding: 6px 8px; font-size: 13px; font-weight: 500;
}
```

---

## 三、结构改动

### 3.1 返回链接 → 面包屑

**改动前**（内联 div）：
```html
<div style="margin-bottom:12px;">
  <a href="org-ledger-admin.html" style="font-size:12px;color:...">← 返回列表</a>
</div>
```

**改动后**（面包屑）：
```html
<div class="breadcrumb">
  <a href="workbench.html">工作台</a> / 
  <a href="org-ledger-admin.html">编制岗位台账</a> / 
  <span id="breadcrumbSchool">柳州市第八中学</span>
</div>
```
> 返回列表通过点击面包屑中的"编制岗位台账"实现，不再需要单独的"← 返回列表"链接。

### 3.2 底部操作栏 → `.submit-bar`

**改动前**（内联 style）：
```html
<div style="display:flex;justify-content:space-between;align-items:center;padding:16px 0;">
  <a class="btn btn-outline" href="...">取消编辑</a>
  <button class="btn btn-primary" onclick="saveEdit()">保存修改</button>
</div>
```

**改动后**（使用 `.submit-bar`）：
```html
<div class="submit-bar">
  <a class="btn btn-outline" href="...">取消编辑</a>
  <button class="btn btn-primary" onclick="saveEdit()">保存修改</button>
</div>
```

### 3.3 表单区块 → `fieldset` + `legend`

**改动前**（`.form-card` + `h3`）：
```html
<div class="form-card">
  <h2>机构基础信息</h2>
  ...
</div>
<div class="form-card">
  <h2>编制信息</h2>
  <h3>事业编制</h3>
  ...
</div>
```

**改动后**（`fieldset` + `legend`）：
```html
<div class="form-card">
  <fieldset>
    <legend>机构基础信息</legend>
    ...
  </fieldset>
  <fieldset>
    <legend>事业编制</legend>
    ...
  </fieldset>
  <fieldset>
    <legend>控制数</legend>
    ...
  </fieldset>
</div>
```

### 3.4 表格内输入框 → `.table-input-num`

**改动前**：
```html
<input type="number" min="0" value="5" 
  onchange="ledger.authLeader=parseInt(this.value)||0"
  style="width:80px;">
```

**改动后**：
```html
<input type="number" min="0" class="table-input-num" value="5"
  onchange="ledger.authLeader=parseInt(this.value)||0">
```

### 3.5 页头操作区 → 独立 `.page-header` 规范

**改动后**：状态 badge 和操作按钮整合到 `.page-header-right`：
```html
<div class="page-header">
  <div class="page-header-left">
    <h1>柳州市第八中学 — 编制岗位台账</h1>
    <div class="subtitle">更新日期：2026-06-15 ｜ <span class="status-badge active">已生效</span></div>
  </div>
  <div class="page-header-right">
    <button class="btn btn-sm btn-warning" onclick="openCorrectModal()">校正台账</button>
    <a class="btn btn-sm btn-outline" href="...&mode=edit">编辑台账</a>
  </div>
</div>
```

---

## 四、编辑模式布局对比

### 改动前

```
┌─ ← 返回列表 ───────────────────────────────────────┐
│  柳州市第八中学 — 编制岗位台账                         │
│  更新日期：2026-06-15 ｜ 编辑中                        │
│  （操作按钮区为空，已移至底部）                           │
├─────────────────────────────────────────────────────┤
│  ┌─ 机构基础信息 ─────────────────────────────────┐  │
│  │  单位全称 [柳州市第八中学]                       │  │
│  │  ...                                          │  │
│  └───────────────────────────────────────────────┘  │
│  ...                                                │
├─────────────────────────────────────────────────────┤
│  [取消编辑]                              [保存修改]    │  ← 内联 style
└─────────────────────────────────────────────────────┘
```

### 改动后

```
│  工作台 / 编制岗位台账 / 柳州市第八中学                 │  ← 面包屑（含返回）
├─────────────────────────────────────────────────────┤
│  柳州市第八中学 — 编制岗位台账                         │
│  更新日期：2026-06-15 ｜ 编辑中                        │
├─────────────────────────────────────────────────────┤
│  ┌─ 机构基础信息 ─────────────────────────────────┐  │
│  │  单位全称 [柳州市第八中学]                       │  │
│  │  ...                                          │  │
│  └───────────────────────────────────────────────┘  │
│  ┌─ 事业编制 ─────────────────────────────────────┐  │
│  │  ...                                          │  │
│  └───────────────────────────────────────────────┘  │
│  ...                                                │
├─────────────────────────────────────────────────────┤
│  [取消编辑]                              [保存修改]    │  ← .submit-bar
└─────────────────────────────────────────────────────┘
```

---

## 五、改动清单

| # | 改动项 | 说明 |
|---|--------|------|
| 1 | CSS 新增 | `.submit-bar`、`fieldset`、`legend`、`.section-title`、`.table-input-num`、`.page-header-left`、`.page-header-right` |
| 2 | 返回链接 | 从内联 div 移至面包屑中，删除独立返回链接 |
| 3 | 底部操作栏 | 内联 style → `.submit-bar` |
| 4 | 表单分组 | `.form-card h3` → `fieldset legend` |
| 5 | 页头 | 左右分栏布局（标题左 + 按钮右） |
| 6 | 数字输入框 | 内联 `style="width:80px"` → `class="table-input-num"` |
| 7 | 编制/岗位/职数区域 | 使用 `fieldset` 包裹，`legend` 做标题 |
