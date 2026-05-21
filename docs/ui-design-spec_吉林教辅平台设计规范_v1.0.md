# 吉林教辅综合管理平台 — 设计规范 & 组件库 v1.0

> **来源**：`jilin-jiafu-mgmt.cicd.chaodao.cn`
> **用途**：柳州教育人事管理平台及同类政务教育管理系统的 UI 基准规范
> **调用规则**：创建新项目或设计新页面时，必须参考本规范的所有参数，不得随意偏离

---

## 目录

1. [色彩体系](#1-色彩体系)
2. [字体层级](#2-字体层级)
3. [间距阶梯](#3-间距阶梯)
4. [圆角体系](#4-圆角体系)
5. [阴影体系](#5-阴影体系)
6. [布局规范](#6-布局规范)
7. [页面壳 Shell](#7-页面壳-shell)
8. [按钮 Button](#8-按钮-button)
9. [输入框 / 下拉框 / 日期选择器](#9-输入框--下拉框--日期选择器)
10. [下拉菜单面板](#10-下拉菜单面板)
11. [数据表格 Table](#11-数据表格-table)
12. [状态指示器 Status](#12-状态指示器-status)
13. [标签/徽章 Badge](#13-标签徽章-badge)
14. [进度条 Progress Bar](#14-进度条-progress-bar)
15. [卡片面板 Card](#15-卡片面板-card)
16. [弹窗 Modal](#16-弹窗-modal)
17. [Tab 切换](#17-tab-切换)
18. [进度步骤条 Steps](#18-进度步骤条-steps)
19. [装饰元素](#19-装饰元素)
20. [空态页](#20-空态页)
21. [CSS 变量速查](#21-css-变量速查)
22. [HTML 模板](#22-html-模板)
23. [创建新页面检查清单](#23-创建新页面检查清单)

---

## 1. 色彩体系

### 1.1 主色系 Primary Blue

| Token | 色值 | 用途 |
|-------|------|------|
| Primary/50 | `#EFF7FF` | 背景（浅蓝色）、选中项背景 |
| Primary/300 | `#3A5FB5` | 辅助蓝·流程（标签文字）、进行中状态 |
| Primary/500 | `#1456F0` | **主色**·按钮·链接·激活态 |
| Primary/700 | `#0E3EC0` | Hover·Active 按压态 |
| Primary/900 | `#00267E` | 深蓝文字强调 |

### 1.2 语义色 Semantic

| Token | 文字色 | 背景色 | 边框色 | 用途 |
|-------|--------|--------|--------|------|
| Warning | `#F55706` | `#FFF9F1` | `#FFE7CC` | 待审核·警告 |
| Description | `#C15C2B` | `#FFF9F1` | `#FFE7CC` | 说明性文字 |
| Danger | `#F4523B` | `#FFF6F5` | `#FFDFDA` | 已驳回·错误·删除 |
| Success | `#2E9221` | `#EAFFE7` | `#DBF4D8` | 已通过·成功 |
| Info | `#3A5FB5` | `#F4F9FF` | `#D5E7FC` | 进行中·信息类 |
| Teal | `#646A73` | `#F5F6F7` | `#E3E5E6` | 已完成·已结束·已归档·非重点 |

### 1.3 中性色 Neutral Gray

| Token | 色值 | 用途 |
|-------|------|------|
| N50 | `#F5F7FB` | **页面背景** |
| N100 | `#F5F6F7` | 输入框背景（disabled/readonly）、表头背景 |
| N200 | `#DFE0E3` | **描边·分割线** |
| N300 | `#BBBECD` | 禁用态 |
| N400 | `#868F9F` | 图标 |
| N600 | `#9298A1` | 说明文字·placeholder·次要图标 |
| N800 | `#646A73` | **次要文字**·面包屑·辅助说明 |
| N900 | `#000000` | **主要文字·正文** |

### 1.4 装饰渐变背景

| 色值渐变 | 用途 |
|----------|------|
| `#E6F0FF` → `#FFFFFF` | 深蓝色装饰背景 |
| `#EBF7FF` → `#FFFFFF` | 天蓝色装饰背景 |
| `#F4FAFF` → `#FFFFFF` | 浅水蓝色装饰背景 |
| `#FFFCF7` → `#FFFFFF` | 浅橙色装饰背景 |
| `#FFF1F1` → `#FFFFFF` | 警告提示背景 |
| `#ECF9F7` → `#FFFFFF` | 数据展示背景 |
| `#EFF9FF` → `#FFFFFF` | 流程默认背景 |
| `#EFEFFF` → `#FFFFFF` | 流程默认渐变 |
| `#9486FF` → `#1456F0` | 流程默认背景选中（深） |

---

## 2. 字体层级

| 层级 | 字号 / 行高 | 字重 | 颜色 | 使用场景 |
|------|------------|------|------|----------|
| H1 页面大标题 | 24px / 36 | SemiBold (600) | `#000` | 页面的大标题 |
| H2 内容大标题 | 20px / 30 | SemiBold (600) | `#000` | 公告名称、页面主标题 |
| H3 模块标题 | 18px / 28 | SemiBold (600) | `#000` | 部分页面标题、审核记录 |
| H4 弹窗小标题 | 16px / 24 | SemiBold (600) | `#000` | 弹窗标题·模块小标题·上传文件 |
| Body 默认正文 | 14px / 24 | Regular (400) | `#1F232A` | **核心正文·最常用** |
| Body 次要文字 | 14px / 24 | Regular (400) | `#646A73` | 面包屑·辅助说明 |
| Caption 辅助说明 | 12px / 18 | Regular (400) | — | 标签文字·辅助说明次要文字 |

**字体栈**：
```css
font-family: "PingFang SC", "Microsoft YaHei", "Source Han Sans SC", "Noto Sans SC", sans-serif;
```

---

## 3. 间距阶梯

全部为 **4px 或 8px 的倍数**：

```
4, 8, 12, 16, 20, 24, 32, 36, 40, 44, 60, 68, 76, 80
```

| 间距 | 典型应用 |
|------|----------|
| 4px | 元素间最小间距 |
| 8px | 图标与文字间距、标题 bar 间距 |
| 12px | 输入框内部 padding、表格列间距 |
| 16px | 卡片内 padding、常规元素间距 |
| 20px | 卡片 content padding |
| 24px | 页面标题区、模块间距 |
| 32px | 大模块间距 |
| 40px | 页面左右边距 |
| 60px | 表格行高 |
| 80px | 顶部信息栏高度 |

---

## 4. 圆角体系

| 圆角值 | CSS | 适用场景 |
|--------|-----|----------|
| R=0 | `0` | 标签 |
| R=2 | `2px` | 标签 / 按钮 mini |
| R=6 | `6px` | **按钮 / 输入框 / 下拉框** |
| R=12 | `12px` | 大面板 / 浮窗 / 下拉面板 / 卡片 / 弹窗 |
| R=999 | `999px` | 胶囊标签 / 胶囊按钮 |

---

## 5. 阴影体系

| 级别 | CSS 值 | 用途 |
|------|--------|------|
| Level 1 | `0 2px 8px 0 rgba(0, 0, 255, 0.06)` | 卡片 / 面板阴影 |
| Level 2 | `0 2px 8px 2px rgba(0, 0, 255, 0.08)` | 浮窗阴影 |
| Level 3 | `0 3px 9px 0 rgba(0, 0, 255, 0.08)` | 蓝色系背景页面卡片 / 下拉面板 |

---

## 6. 布局规范

| 区域 | 尺寸 | 说明 |
|------|------|------|
| 整体视口（管理后台） | **1440px** | 基于 1440px 设计，适配主流分辨率 |
| 登录/注册页视口 | **1920px** | 全宽背景装饰 |
| 侧边导航宽度 | **240px** | 兼顾菜单收纳与可读性 |
| 内容区宽度 | **1160px** | `1440 - 240 - 40(边距) = 1160` |
| 内容区栅格 | **12 列**，列间距 4px |
| 顶部信息栏高度 | **80px** | 头像背景图为个人中心入口 |
| 顶部 Tab 高度 | **38px** | 页面最高层级模块切换 |
| 表格表头高度 | **52px** | — |
| 表格数据行高度 | **60px** | — |

---

## 7. 页面壳 Shell

### 7.1 整体结构

```
┌──────────────────────────────────────────────────┐
│██████████ 20px 蓝色装饰条 #1456F0 (全窗口宽) ███████│
├──────────────────────────────────────────────────┤
│ ▌系统名称 v1.0      │ Tab1 │ Tab2 │ Tab3 │ 56px │ ← site-header
├────────────────────┴───────┴──────┴──────┴───────┤
│ ┌──────────┐ ┌──────────────────────────────────┐ │
│ │ 侧栏     │ │  内容区 1160px                    │ │
│ │ 240px    │ │                                  │ │
│ │          │ │  ▌ 页面标题 (20px SemiBold)       │ │
│ │ 菜单项    │ │  面包屑 (14px #646A73)            │ │
│ │          │ │                                  │ │
│ └──────────┘ └──────────────────────────────────┘ │
└──────────────────────────────────────────────────┘
```

### 7.2 顶部导航栏 `site-header`

```css
.site-header {
  height: 56px;
  background: #FFFFFF;
  border-bottom: 1px solid #DFE0E3;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  padding: 0 24px;
  display: flex;
  align-items: center;
  z-index: 10;
}
```

Logo 区格式：
```html
<div class="site-logo">
  <div class="logo-bar"></div>  <!-- 4px × 22px, #1456F0, rounded 2px -->
  <span class="logo-name">系统名称</span>  <!-- 15px, SemiBold, #1456F0 -->
  <span class="logo-version">v1.0</span>  <!-- 12px, Regular, #9298A1 -->
</div>
```

### 7.3 侧边导航 `sidebar`

```css
.sidebar {
  width: 240px;
  background: #FFFFFF;
  border-right: 1px solid #DFE0E3;
}
```

菜单项样式：
```css
/* 默认 */
.menu-item {
  height: 44px;
  padding: 0 16px;
  font-size: 14px;
  color: #646A73;
}

/* hover */
.menu-item:hover {
  color: #1456F0;
  background: #F5F7FB;
}

/* 激活 */
.menu-item.active {
  color: #1456F0;
  background: #EFF7FF;
  font-weight: 600;
}

/* 分组标题 */
.menu-group-title {
  font-size: 12px;
  color: #9298A1;
  padding: 12px 16px 8px;
  text-transform: uppercase;
}
```

### 7.4 页面标题

每个内容页的标题区使用统一格式：
```html
<div class="page-title">
  <div class="title-bar"></div>  <!-- 4px × 24px, #1456F0 -->
  <span>页面标题</span>           <!-- 20px, SemiBold, #1456F0 -->
</div>
```

```css
.page-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}
.page-title .title-bar {
  width: 4px;
  height: 24px;
  background: #1456F0;
  flex-shrink: 0;
}
.page-title span {
  font-size: 20px;
  font-weight: 600;
  color: #1456F0;
  line-height: 30px;
}
```

### 7.5 面包屑

```html
<div class="breadcrumb">工作台 / 模块名 / 当前页</div>
```

```css
.breadcrumb {
  font-size: 14px;
  color: #646A73;
  line-height: 24px;
  margin-bottom: 16px;
}
```

---

## 8. 按钮 Button

### 8.1 尺寸档位

| 档位 | 高度 | 水平 padding | 字号 | 用途 |
|------|:---:|------------|------|------|
| XL | 44px | 0 32px | 16px | 登录/注册、强转化入口 |
| LG | 40px | 0 24px | 14px | 页面首屏主操作、表单提交 |
| MD | 36px | 0 20px | 14px | 常规操作（查询、确定、提交） |
| SM | 32px | 0 16px | 14px | 弹窗按钮、分页器翻页 |
| XS | 26px | 0 12px | 14px | **表格行内操作按钮** |

所有按钮统一圆角：**6px**

### 8.2 颜色变体

**Primary 主按钮**（常规）
```css
.btn-primary {
  background: #1456F0;
  color: #FFFFFF;
  border: none;
}
.btn-primary:hover { background: #0E3EC0; }
.btn-primary:disabled { background: #BBBECD; cursor: not-allowed; }
```

**Primary Gradient 主按钮**（渐变强调，用于重要操作）
```css
.btn-primary-gradient {
  background: linear-gradient(to right, #1456F0, #7687FF);
  color: #FFFFFF;
  border: none;
}
```

**Default 默认按钮**
```css
.btn-default {
  background: #FFFFFF;
  color: #000000;
  border: 1px solid #DFE0E3;
}
.btn-default:hover { border-color: #1456F0; color: #1456F0; }
```

**Outline 描边按钮**（表格内操作）
```css
.btn-outline-primary {
  background: #FFFFFF;
  color: #1456F0;
  border: 1px solid #1456F0;
  height: 26px;
  border-radius: 6px;
}
.btn-outline-secondary {
  background: #FFFFFF;
  color: #868F9F;
  border: 1px solid #868F9F;
  height: 26px;
  border-radius: 6px;
}
```

**Danger 危险按钮**
```css
.btn-danger {
  background: #F4523B;
  color: #FFFFFF;
  border: none;
}
```

**Text/Link 文字按钮**
```css
.btn-link {
  background: transparent;
  color: #1456F0;
  border: none;
  padding: 0;
}
```

---

## 9. 输入框 / 下拉框 / 日期选择器

### 9.1 双尺寸规范

| 场景 | 高度 | 字号 | placeholder 颜色 | 圆角 | 边框 |
|------|:---:|------|-----------------|:---:|------|
| 表单填写 | 44px | 14px | `#9298A1` | 6px | `#DFE0E3` |
| 列表筛选 | 36px | 14px | `#9298A1` | 6px | `#DFE0E3` |

### 9.2 状态样式

```css
/* 默认未输入/未选择 */
.input-default {
  background: #FFFFFF;
  border: 1px solid #DFE0E3;
  color: #9298A1;
}

/* 聚焦 */
.input-focus {
  border-color: #1456F0;
  box-shadow: 0 0 0 2px rgba(20,86,240,0.1);
}

/* 已输入/已选择 */
.input-filled {
  background: #FFFFFF;
  border: 1px solid #DFE0E3;
  color: #000000;
}

/* 禁用/只读 */
.input-disabled {
  background: #F5F6F7;
  border: 1px solid #DFE0E3;
  color: #9298A1;
  cursor: not-allowed;
}

/* 错误 */
.input-error {
  border-color: #F4523B;
}
```

### 9.3 内部间距

- 文字距边框：**左 12px，上下居中**
- Label 与输入框间距：8px
- Label 字体：14px Regular `#000`

### 9.4 日期范围选择器

两个日期输入框之间用 **36px × 36px** 方形连接块，`bg-[#F5F6F7] border-[#DFE0E3]`，内写 "至" 字（14px `#000`）。

---

## 10. 下拉菜单面板

```css
.dropdown-panel {
  background: #FFFFFF;
  border: 1px solid #DFE0E3;
  border-radius: 6px;
  box-shadow: 0 3px 9px 0 rgba(0,0,255,0.08);  /* Level 3 */
}

/* 选项 */
.dropdown-option {
  font-size: 14px;
  line-height: 24px;
  padding: 14px 12px;
  color: #000000;
}

/* hover */
.dropdown-option:hover { background: #F5F7FB; }

/* 选中 */
.dropdown-option.selected {
  background: #EFF7FF;
  color: #1456F0;
}
```

---

## 11. 数据表格 Table

### 11.1 尺寸规范

| 元素 | 高度 | 背景 | 文字 |
|------|:---:|------|------|
| 表头行 | 52px | `#F5F7FB` | 12px SemiBold `#868E9E` |
| 数据行 | 60px | `#FFF` | 14px `#000` |
| 行分隔线 | 1px | `#DFE0E3` | — |
| 斑马纹（偶数行） | 60px | `#F5F7FB` | 同数据行 |

### 11.2 列对齐规则

```css
/* 表头 */
.table th {
  height: 52px;
  padding: 0 16px;
  font-size: 12px;
  font-weight: 600;
  color: #868E9E;
  background: #F5F7FB;
  text-align: left;
  white-space: nowrap;
}

/* 数据单元格 */
.table td {
  height: 60px;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 400;
  color: #000000;
  border-bottom: 1px solid #DFE0E3;
}

/* hover 态 */
.table tr:hover td {
  background: #EFF7FF;
}

/* 链接列 */
.table td a {
  color: #1455EF;
  text-decoration: underline;
}

/* 序号列 — 较窄，左对齐 */
/* 操作列 — 右对齐 */
```

### 11.3 空态

表格无数据时显示空态插图 + "暂无数据" 文字（参见 [空态页](#20-空态页)）。

---

## 12. 状态指示器 Status

使用 **6px 圆点 + 14px 文字** 的行内组合：

| 状态 | 圆点色 | 文字色 | 文案示例 |
|------|--------|--------|----------|
| 待审核/待处理 | `#CCCCCC` (80% opacity) | `#000` | 待审核 |
| 通过/成功 | `#2D9221` | `#000` | 审核通过、已入围、已通过 |
| 不通过/失败 | `#F3523B` | `#000` | 审核不通过、未入围、已驳回 |

```html
<span class="status-dot status-success"></span>
<span class="status-text">审核通过</span>
```

```css
.status-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 12px;
  vertical-align: middle;
}
.status-pending   { background: #CCCCCC; }
.status-success   { background: #2D9221; }
.status-danger    { background: #F3523B; }
.status-text {
  font-size: 14px;
  line-height: 24px;
  color: #000000;
}
```

---

## 13. 标签/徽章 Badge

| 类型 | 背景 | 文字色 | 边框 | 用途 |
|------|------|--------|------|------|
| Primary | `#EFF7FF` | `#1456F0` | — | 信息标签 |
| Success | `#EAFFE7` | `#2E9221` | `#DBF4D8` | 已通过 |
| Danger | `#FFF6F5` | `#F4523B` | `#FFDFDA` | 已驳回 |
| Warning | `#FFF9F1` | `#F55706` | `#FFE7CC` | 待审核·警告 |
| Info | `#F4F9FF` | `#3A5FB5` | `#D5E7FC` | 进行中 |
| Teal/Default | `#F5F6F7` | `#646A73` | — | 已归档·非重点 |

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  font-size: 12px;
  line-height: 18px;
  border-radius: 999px;  /* 胶囊形 */
  font-weight: 500;
}
```

---

## 14. 进度条 Progress Bar

```css
.progress-track {
  width: 80px;
  height: 4px;
  background: #E7E7E7;
  border-radius: 5px;
}

.progress-fill {
  height: 4px;
  border-radius: 5px;
  background: linear-gradient(to right, #2DD417, #9CE792);
}

.progress-label {
  font-size: 12px;
  line-height: 18px;
}
.progress-label .label-name  { color: #636A73; }    /* "待申报：" */
.progress-label .label-value { color: #2D9221; }    /* "78%" */
```

---

## 15. 卡片面板 Card

```
┌───────────────────────────────────┐
│ 卡片标题 (14px SemiBold #000)      │ ← header, 14px padding-y, 20px padding-x
├───────────────────────────────────┤
│                                   │
│ 内容区                             │ ← padding: 20px
│                                   │
└───────────────────────────────────┘
```

```css
.card {
  background: #FFFFFF;
  border: 1px solid #DFE0E3;
  border-radius: 12px;
  box-shadow: 0 2px 8px 0 rgba(0,0,255,0.06);  /* Level 1 */
}

.card-header {
  padding: 14px 20px;
  font-size: 14px;
  font-weight: 600;
  color: #000000;
  background: #FAFBFC;
  border-bottom: 1px solid #DFE0E3;
}

.card-body {
  padding: 20px;
}
```

---

## 16. 弹窗 Modal

```
┌─────────────────────────────────┐
│ ▌ 标题 (16px SemiBold)    [✕]   │ ← header, 同 card-header
├─────────────────────────────────┤
│                                 │
│ 弹窗内容                         │
│                                 │
├─────────────────────────────────┤
│              [取消]  [确定]      │ ← footer, 按钮 32px (SM)
└─────────────────────────────────┘
```

```css
/* 蒙层 */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* 弹窗本体 */
.modal-container {
  background: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 2px 8px 2px rgba(0,0,255,0.08);  /* Level 2 */
  min-width: 440px;
  max-width: 880px;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  padding: 14px 20px;
  font-size: 16px;
  font-weight: 600;
  border-bottom: 1px solid #DFE0E3;
}

.modal-body {
  padding: 20px;
}

.modal-footer {
  padding: 12px 20px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid #DFE0E3;
}
```

弹窗按钮统一使用 SM 档 (32px)，圆角 6px。

---

## 17. Tab 切换

```css
.tab-nav {
  display: flex;
  align-items: stretch;
  height: 38px;
}

.tab-btn {
  padding: 0 20px;
  font-size: 14px;
  font-weight: 500;
  color: #646A73;
  border: none;
  background: transparent;
  cursor: pointer;
  position: relative;
}

.tab-btn:hover {
  color: #1456F0;
  background: #F5F7FB;
}

.tab-btn.active {
  color: #1456F0;
  font-weight: 600;
}

/* 激活指示条 */
.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 16px;
  right: 16px;
  height: 3px;
  background: #1456F0;
  border-radius: 3px 3px 0 0;
}
```

---

## 18. 进度步骤条 Steps

用于审批流程等步骤展示：

```css
/* 步骤圆点 */
.step-dot {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
}

/* 连线 */
.step-line {
  flex: 1;
  height: 2px;
  margin: 0 8px;
}

/* Done 已完成 */
.step-dot.done    { background: #2E9221; color: #FFF; }
.step-line.done   { background: #2E9221; }

/* Current 进行中 */
.step-dot.current {
  background: #1456F0;
  color: #FFF;
  box-shadow: 0 0 0 6px rgba(20,86,240,0.12);
}
.step-line.current { background: #DFE0E3; }

/* Pending 待处理 */
.step-dot.pending  { background: #F5F7FB; color: #9298A1; border: 2px solid #DFE0E3; }
.step-line.pending { background: #DFE0E3; }

/* Rejected 驳回 */
.step-dot.rejected { background: #FFF6F5; color: #F4523B; border: 2px solid #F4523B; }
```

---

## 19. 装饰元素

### 19.1 顶部蓝色装饰条

所有管理后台页面顶部必须包含：
```html
<div style="width:100%; height:20px; background:#1456F0;"></div>
```

### 19.2 默认头像

```html
<img src="assets/avatar-default.png" alt="默认头像"
     style="width:200px; height:200px; border-radius:50%; object-fit:cover;">
```

### 19.3 弹窗装饰

- 弹窗区域背景渐变：`linear-gradient(to right, #F4FBFF, #F5F5FF)` 或 `linear-gradient(to top, #FFF, #E5F4FF)`
- 用于弹窗顶部或内容区的浅色装饰背景

---

## 20. 空态页

两种风格，用于无数据、无权限、搜索无结果等场景：

### 样式 1：简约
- 插图尺寸约 93×114px
- 插图下方文字："暂无数据"，16px `#868E9E`

### 样式 2：丰富
- 插图尺寸约 140×140px
- 包含更多图形细节

```html
<div class="empty-state">
  <img src="assets/empty.png" alt="暂无数据" class="empty-img">
  <p class="empty-text">暂无数据</p>
</div>
```

```css
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  gap: 16px;
}
.empty-text {
  font-size: 16px;
  color: #868E9E;
}
```

---

## 21. CSS 变量速查

在新页面中直接复制以下 `:root` 块：

```css
:root {
  /* 主色系 */
  --color-primary:       #1456F0;
  --color-primary-900:   #00267E;
  --color-primary-700:   #0E3EC0;
  --color-primary-300:   #3A5FB5;
  --color-primary-50:    #EFF7FF;

  /* 语义色 — 文字 */
  --color-warning:       #F55706;
  --color-danger:        #F4523B;
  --color-success:       #2E9221;
  --color-info:          #3A5FB5;
  --color-teal:          #646A73;

  /* 语义色 — 背景 */
  --color-warning-bg:    #FFF9F1;
  --color-danger-bg:     #FFF6F5;
  --color-success-bg:    #EAFFE7;
  --color-info-bg:       #F4F9FF;
  --color-teal-bg:       #F5F6F7;

  /* 中性色 */
  --neutral-bg:          #F5F7FB;
  --neutral-input:       #F5F6F7;
  --neutral-border:      #DFE0E3;
  --neutral-disabled:    #BBBECD;
  --neutral-icon:        #868F9F;
  --neutral-secondary:   #9298A1;
  --neutral-text2:       #646A73;
  --neutral-placeholder: #868E9E;

  /* 文字色 */
  --text-primary:        #000000;
  --text-secondary:      #646A73;
  --text-light:          #9298A1;
  --text-link:           #1455EF;
  --text-placeholder:    #9298A1;
  --text-white:          #FFFFFF;

  /* 圆角 */
  --radius-sm:   2px;
  --radius-md:   6px;
  --radius-lg:   12px;
  --radius-full: 999px;

  /* 阴影 */
  --shadow-card:   0 2px 8px 0 rgba(0, 0, 255, 0.06);
  --shadow-float:  0 2px 8px 2px rgba(0, 0, 255, 0.08);
  --shadow-popup:  0 3px 9px 0 rgba(0, 0, 255, 0.08);

  /* 字体 */
  --font-h1:     600 24px/36px var(--font-stack);
  --font-h2:     600 20px/30px var(--font-stack);
  --font-h3:     600 18px/28px var(--font-stack);
  --font-h4:     600 16px/24px var(--font-stack);
  --font-body:   400 14px/24px var(--font-stack);
  --font-caption: 400 12px/18px var(--font-stack);
  --font-stack:  "PingFang SC", "Microsoft YaHei", "Source Han Sans SC", "Noto Sans SC", sans-serif;

  /* 布局 */
  --sidebar-w:  240px;
  --content-w:  1160px;
  --topbar-h:   56px;
  --tab-h:      38px;
  --table-th:   52px;
  --table-row:  60px;

  /* 组件尺寸 */
  --input-lg:   44px;
  --input-md:   36px;
  --btn-xl:     44px;
  --btn-lg:     40px;
  --btn-md:     36px;
  --btn-sm:     32px;
  --btn-xs:     26px;
}
```

---

## 22. HTML 模板

创建新页面时，从以下模板开始：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>页面标题 - 柳州教育人事管理平台</title>
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --color-primary:       #1456F0;
  --color-primary-900:   #00267E;
  --color-primary-700:   #0E3EC0;
  --color-primary-300:   #3A5FB5;
  --color-primary-50:    #EFF7FF;
  --color-warning:       #F55706;
  --color-danger:        #F4523B;
  --color-success:       #2E9221;
  --color-info:          #3A5FB5;
  --color-teal:          #646A73;
  --color-warning-bg:    #FFF9F1;
  --color-danger-bg:     #FFF6F5;
  --color-success-bg:    #EAFFE7;
  --color-info-bg:       #F4F9FF;
  --color-teal-bg:       #F5F6F7;
  --neutral-bg:          #F5F7FB;
  --neutral-input:       #F5F6F7;
  --neutral-border:      #DFE0E3;
  --neutral-disabled:    #BBBECD;
  --neutral-icon:        #868F9F;
  --neutral-secondary:   #9298A1;
  --neutral-text2:       #646A73;
  --neutral-placeholder: #868E9E;
  --text-primary:        #000000;
  --text-secondary:      #646A73;
  --text-light:          #9298A1;
  --text-link:           #1455EF;
  --text-placeholder:    #9298A1;
  --text-white:          #FFFFFF;
  --radius-sm:   2px;
  --radius-md:   6px;
  --radius-lg:   12px;
  --radius-full: 999px;
  --shadow-card:   0 2px 8px 0 rgba(0,0,255,0.06);
  --shadow-float:  0 2px 8px 2px rgba(0,0,255,0.08);
  --shadow-popup:  0 3px 9px 0 rgba(0,0,255,0.08);
  --font-h1:     600 24px/36px var(--font-stack);
  --font-h2:     600 20px/30px var(--font-stack);
  --font-h3:     600 18px/28px var(--font-stack);
  --font-h4:     600 16px/24px var(--font-stack);
  --font-body:   400 14px/24px var(--font-stack);
  --font-caption: 400 12px/18px var(--font-stack);
  --font-stack:  "PingFang SC", "Microsoft YaHei", "Source Han Sans SC", "Noto Sans SC", sans-serif;
  --sidebar-w:  240px;
  --content-w:  1160px;
  --topbar-h:   56px;
  --tab-h:      38px;
  --table-th:   52px;
  --table-row:  60px;
  --input-lg:   44px;
  --input-md:   36px;
  --btn-xl:     44px;
  --btn-lg:     40px;
  --btn-md:     36px;
  --btn-sm:     32px;
  --btn-xs:     26px;
}

body {
  font: var(--font-body);
  font-family: var(--font-stack);
  background: var(--neutral-bg);
  color: var(--text-primary);
  min-height: 100vh;
}

/* —— 顶部蓝色装饰条 —— */
.top-blue-bar {
  width: 100%;
  height: 20px;
  background: #1456F0;
}

/* —— 顶部导航 —— */
.site-header {
  height: var(--topbar-h);
  background: #FFFFFF;
  border-bottom: 1px solid var(--neutral-border);
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  display: flex;
  align-items: center;
  padding: 0 24px;
}
.site-logo { display: flex; align-items: center; gap: 10px; }
.site-logo .bar { width: 4px; height: 22px; background: var(--color-primary); border-radius: 2px; }
.site-logo .name { font-size: 15px; font-weight: 600; color: var(--color-primary); }
.site-logo .version { font-size: 12px; color: var(--neutral-secondary); margin-left: 4px; }

/* —— 侧边导航 —— */
.sidebar {
  width: var(--sidebar-w);
  background: #FFFFFF;
  border-right: 1px solid var(--neutral-border);
  overflow-y: auto;
  flex-shrink: 0;
}
.menu-group-title { font-size: 12px; color: var(--neutral-secondary); padding: 12px 16px 8px; }
.menu-item {
  display: flex; align-items: center; gap: 8px;
  height: 44px; padding: 0 16px;
  font-size: 14px; color: var(--neutral-text2); cursor: pointer;
}
.menu-item:hover { color: var(--color-primary); background: var(--neutral-bg); }
.menu-item.active { color: var(--color-primary); background: var(--color-primary-50); font-weight: 600; }

/* —— 内容区 —— */
.main-layout { display: flex; min-height: calc(100vh - 20px - var(--topbar-h)); }
.content-area { flex: 1; padding: 24px; overflow-y: auto; }

/* —— 页面标题 —— */
.page-title { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; }
.page-title .bar { width: 4px; height: 24px; background: var(--color-primary); flex-shrink: 0; }
.page-title span { font: var(--font-h2); color: var(--color-primary); }

/* —— 面包屑 —— */
.breadcrumb { font-size: 14px; color: var(--text-secondary); margin-bottom: 16px; }

/* —— 卡片 —— */
.card {
  background: #FFFFFF;
  border: 1px solid var(--neutral-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  margin-bottom: 20px;
}
.card-header {
  padding: 14px 20px;
  font-size: 14px; font-weight: 600;
  border-bottom: 1px solid var(--neutral-border);
  background: #FAFBFC;
}
.card-body { padding: 20px; }

/* —— 按钮 —— */
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: var(--radius-md); cursor: pointer;
  font-family: var(--font-stack); font-size: 14px;
  border: none; transition: background 0.2s;
}
.btn-primary { background: var(--color-primary); color: #FFF; }
.btn-primary:hover { background: var(--color-primary-700); }
.btn-primary:disabled { background: var(--neutral-disabled); cursor: not-allowed; }
.btn-default { background: #FFF; color: var(--text-primary); border: 1px solid var(--neutral-border); }
.btn-default:hover { border-color: var(--color-primary); color: var(--color-primary); }
.btn-danger { background: var(--color-danger); color: #FFF; }
.btn-link { background: transparent; color: var(--color-primary); border: none; }
/* 尺寸 */
.btn-xl { height: var(--btn-xl); padding: 0 32px; font-size: 16px; }
.btn-lg { height: var(--btn-lg); padding: 0 24px; }
.btn-md { height: var(--btn-md); padding: 0 20px; }
.btn-sm { height: var(--btn-sm); padding: 0 16px; }
.btn-xs { height: var(--btn-xs); padding: 0 12px; }

/* —— 输入框 —— */
.input {
  height: var(--input-lg);
  border: 1px solid var(--neutral-border);
  border-radius: var(--radius-md);
  padding: 0 12px;
  font-family: var(--font-stack); font-size: 14px;
  color: var(--text-primary);
  background: #FFF;
}
.input::placeholder { color: var(--text-placeholder); }
.input:focus { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 2px rgba(20,86,240,0.1); }
.input:disabled { background: var(--neutral-input); color: var(--neutral-secondary); cursor: not-allowed; }
.input-sm { height: var(--input-md); }  /* 列表筛选用 */

/* —— 表格 —— */
.table { width: 100%; border-collapse: collapse; }
.table th {
  height: var(--table-th); padding: 0 16px;
  font-size: 12px; font-weight: 600; color: var(--neutral-placeholder);
  background: var(--neutral-bg); text-align: left; white-space: nowrap;
}
.table td {
  height: var(--table-row); padding: 0 16px;
  font-size: 14px; color: var(--text-primary);
  border-bottom: 1px solid var(--neutral-border);
}
.table tr:hover td { background: var(--color-primary-50); }
.table a { color: var(--text-link); text-decoration: underline; cursor: pointer; }

/* —— 状态指示器 —— */
.status-dot {
  display: inline-block; width: 6px; height: 6px;
  border-radius: 50%; margin-right: 12px; vertical-align: middle;
}
.status-dot.pending  { background: #CCCCCC; }
.status-dot.success  { background: #2D9221; }
.status-dot.danger   { background: #F3523B; }

/* —— 标签 —— */
.badge {
  display: inline-flex; align-items: center;
  padding: 4px 12px; font-size: 12px; line-height: 18px;
  border-radius: var(--radius-full); font-weight: 500;
}
.badge-primary  { background: var(--color-primary-50); color: var(--color-primary); }
.badge-success  { background: var(--color-success-bg); color: var(--color-success); }
.badge-danger   { background: var(--color-danger-bg);  color: var(--color-danger); }
.badge-warning  { background: var(--color-warning-bg); color: var(--color-warning); }
.badge-info     { background: var(--color-info-bg);    color: var(--color-info); }
.badge-teal     { background: var(--color-teal-bg);    color: var(--color-teal); }

/* —— 弹窗 —— */
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
}
.modal-container {
  background: #FFF; border-radius: var(--radius-lg);
  box-shadow: var(--shadow-float);
  min-width: 440px; max-width: 880px; max-height: 80vh; overflow-y: auto;
}
.modal-header { padding: 14px 20px; font-size: 16px; font-weight: 600; border-bottom: 1px solid var(--neutral-border); }
.modal-body { padding: 20px; }
.modal-footer { padding: 12px 20px; display: flex; justify-content: flex-end; gap: 12px; border-top: 1px solid var(--neutral-border); }

/* —— 进度条 —— */
.progress-track { width: 80px; height: 4px; background: #E7E7E7; border-radius: 5px; overflow: hidden; }
.progress-fill { height: 100%; border-radius: 5px; background: linear-gradient(to right, #2DD417, #9CE792); }
.progress-label { font-size: 12px; line-height: 18px; }
.progress-label .name  { color: #636A73; }
.progress-label .value { color: #2D9221; }
</style>
</head>
<body>

<!-- 顶部蓝色装饰条 -->
<div class="top-blue-bar"></div>

<!-- 顶部导航栏 -->
<header class="site-header">
  <div class="site-logo">
    <div class="bar"></div>
    <span class="name">柳州教育人事管理平台<span class="version">v1.0</span></span>
  </div>
  <!-- Tab 导航（可选） -->
</header>

<div class="main-layout">
  <!-- 侧边导航 -->
  <nav class="sidebar" id="sidebar">
    <!-- 菜单项由 JS 动态渲染 -->
  </nav>

  <!-- 主内容区 -->
  <main class="content-area" id="mainContent">
    <!-- 页面标题 -->
    <div class="page-title">
      <div class="bar"></div>
      <span>页面标题</span>
    </div>
    <!-- 面包屑 -->
    <div class="breadcrumb">模块名 / 当前页</div>

    <!-- 页面内容 -->
    <div class="card">
      <div class="card-header">卡片标题</div>
      <div class="card-body">内容</div>
    </div>
  </main>
</div>

<script>
// 页面业务逻辑
</script>
</body>
</html>
```

---

## 23. 创建新页面检查清单

每创建一个新页面，必须逐项确认：

- [ ] 顶部 **20px 蓝色装饰条** `#1456F0` 全窗口宽
- [ ] 顶部导航栏 **56px** 白底，logo 包含 **4px 蓝色竖条**
- [ ] 侧边导航 **240px** 宽，菜单项 **44px** 高
- [ ] 页面标题使用 **4px 蓝竖条 + 20px SemiBold** 格式
- [ ] 所有颜色值来自本规范的 `:root` 变量
- [ ] 按钮高度符合 **XL/LG/MD/SM/XS** 五档，圆角 **6px**
- [ ] 表单输入框高度 **44px**，列表筛选输入框高度 **36px**，圆角 **6px**
- [ ] 表格表头 **52px**，数据行 **60px**，表头文字 12px `#868E9E`
- [ ] 状态使用 **6px 圆点 + 文字** 或 **胶囊标签**（按场景）
- [ ] 卡片圆角 **12px**，阴影 Level 1
- [ ] 弹窗圆角 **12px**，阴影 Level 2，按钮 32px
- [ ] 字体栈 `"PingFang SC", "Microsoft YaHei", "Source Han Sans SC", "Noto Sans SC", sans-serif`
- [ ] 间距使用 **4px/8px 倍数**阶梯
- [ ] 无数据场景显示空态插图
- [ ] 圆角不出现 8px — 用 6px 或 12px 替代
- [ ] 主色不出现 `#1E40AF` — 用 `#1456F0` 替代

---

> **维护说明**：本规范基于吉林教辅综合管理平台设计规范 v1.0 整理，覆盖 page1（基础规范）、page2（组件库一：表单）、page3（组件库二：表格/按钮/状态）、page4（装饰元素）、page5（Demo 展示）。后续随参考平台版本迭代持续更新。
