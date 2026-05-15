# Design Token — 吉林教辅综合管理平台设计规范 V1.0

来源：`jilin-jiafu-mgmt.cicd.chaodao.cn`，作为柳州教育人事管理平台后续迭代的样式基准。

---

## 一、颜色体系

### 主色系 Primary Blue

| Token | 色值 | 用途 |
|-------|------|------|
| Primary/50 | `#EFF7FF` | 背景（浅蓝色） |
| Primary/300 | `#3A5FB5` | 辅助蓝·流程（标签文字） |
| Primary/500 | `#1456F0` | 主色·按钮·链接 |
| Primary/700 | `#0E3EC0` | Hover·Active |
| Primary/900 | `#00267E` | 深蓝文字强调 |

### 语义色 Semantic

| Token | 文字色 | 背景色 | 用途 |
|-------|--------|--------|------|
| Warning | `#F55706` | `#FFF9F1` | 待审核·警告 |
| Description | `#C15C2B` | `#FFF9F1` | 各种说明性文字 |
| Danger | `#F4523B` | `#FFF6F5` | 已驳回·错误 |
| Success | `#2E9221` | `#EAFFE7` | 已通过·成功 |
| Info | `#3A5FB5` | `#F4F9FF` | 进行中·信息类 |
| Teal | `#646A73` | `#F5F6F7` | 已完成·已结束·已归档·非重点 |

### 中性色 Neutral Gray

| Token | 色值 | 用途 |
|-------|------|------|
| N50 | `#F5F7FB` | 页面背景 |
| N100 | `#F5F6F7` | 输入框（展示内容） |
| N200 | `#DFE0E3` | 描边·分割线 |
| N300 | `#BBBECD` | 禁用 |
| N400 | `#868F9F` | icon |
| N600 | `#9298A1` | 说明文字·icon |
| N800 | `#646A73` | 次要文字 |
| N900 | `#000000` | 主要文字·正文 |

### 装饰渐变背景

| 色值 | 用途 |
|------|------|
| `#E6F0FF` → `#FFFFFF` | 深蓝色装饰背景 |
| `#EBF7FF` → `#FFFFFF` | 天蓝色装饰背景 |
| `#F4FAFF` → `#FFFFFF` | 浅水蓝色装饰背景 |
| `#FFFCF7` → `#FFFFFF` | 浅橙色装饰背景 |
| `#FFF1F1` → `#FFFFFF` | 警告提示背景 |
| `#ECF9F7` → `#FFFFFF` | 数据展示背景 |
| `#EFF9FF` → `#FFFFFF` | 流程默认背景 |
| `#9486FF` → `#1456F0` | 流程默认背景选中 |

---

## 二、字体层级

| 层级 | 字号/行高 | 字重 | 颜色 | 使用场景 |
|------|----------|------|------|----------|
| H1 | 24px / 36 | SemiBold (600) | `#000` | 页面大标题 |
| H2 | 20px / 30 | SemiBold (600) | `#000` | 页面/内容大标题 |
| H3 module | 18px / 28 | SemiBold (600) | `#000` | 模块/内容标题 |
| H3 modal | 16px / 24 | SemiBold (600) | `#000` | 弹窗标题·模块小标题 |
| Body | 14px / 24 | Regular (400) | `#1F232A` | 核心正文·最常用 |
| Body secondary | 14px / 24 | Regular (400) | `#646A73` | 面包屑·辅助说明 |
| Caption | 12px / 18 | Regular (400) | `#000` | 标签文字·辅助说明 |

字体栈：`"PingFang SC", "Microsoft YaHei", "Source Han Sans SC", "Noto Sans SC", sans-serif`

---

## 三、间距阶梯

全部为 4px 或 8px 的倍数：

```
4, 8, 12, 16, 20, 24, 32, 36, 40, 44, 60, 68, 76, 80
```

---

## 四、圆角

| 圆角值 | 适用场景 |
|--------|----------|
| R=2 | 标签 / 按钮 mini |
| R=6 | 按钮 / 输入框 |
| R=12 | 大面板 / 浮窗 / 下拉 / 卡片 |
| R=999 | 胶囊标签 / 菜单 / 按钮 |

---

## 五、阴影体系

| 级别 | 色值 | 透明度 | 参数 (x,y,blur,spread) | 用途 |
|------|------|--------|----------------------|------|
| Level 1 | `#0000FF` | 6% | (0, 2, 8, 0) | 卡片/面板阴影 |
| Level 2 | `#0000FF` | 8% | (0, 2, 8, 2) | 浮窗阴影 |
| Level 3 | `#0000FF` | 8% | (0, 3, 9, 0) | 蓝色系背景页面卡片阴影 |

---

## 六、布局规范

| 区域 | 尺寸 | 说明 |
|------|------|------|
| 整体视口（管理后台） | **1440px** | 基准设计尺寸 |
| 登录/注册页视口 | **1920px** | 全宽背景装饰 |
| 侧边导航宽度 | **240px** | 兼顾菜单收纳与可读性 |
| 内容区宽度 | **1160px** | 留白舒适 |
| 顶部信息栏高度 | **80px** | 头像背景图为入口 |
| 菜单切换Tab高度 | **38px** | 最高层级模块切换 |
| 表格表头高度 | **52px** | — |
| 列表数据行高度 | **60px** | — |

---

## 七、按钮尺寸

| 尺寸 | 高度 | 用途 |
|------|------|------|
| 特大 | 44px | 登录注册、强转化场景 |
| 中大型 | 40px | 页面首屏主操作、关键流程提交 |
| 标准 | 36px | 常规操作（查询、确定、提交） |
| 弹窗/表单 | 32px | 弹窗按钮、分页器、表单操作 |
| 列表内 | 26px | 表格行内操作按钮 |

---

## 八、CSS 变量速查

```css
:root {
  --color-primary:       #1456f0;
  --color-900:           #00267e;
  --color-700:           #0e3ec0;
  --color-300:           #3a5fb5;
  --color-50:            #eff7ff;
  --color-black:         #000000;
  --neutral-bg:          #f5f7fb;
  --neutral-input:       #f5f6f7;
  --neutral-border:      #dfe0e3;
  --neutral-disabled:    #bbbecd;
  --neutral-icon:        #868f9f;
  --neutral-secondary:   #9298a1;
  --neutral-text2:       #646a73;
  --color-warning:       #f55706;
  --color-danger:        #f4523b;
  --color-success:       #2e9221;
  --neutral-placeholder: #868e9e;

  --shadow-1:  0 2px 8px 0 rgba(0, 0, 0, 0.06);
  --shadow-2:  0 2px 8px 2px rgba(0, 0, 0, 0.08);
  --shadow-3:  0 3px 9px 0 rgba(0, 0, 0, 0.08);

  --radius-sm:  2px;
  --radius-md:  6px;
  --radius-lg:  12px;
  --radius-pill: 999px;

  --font-h1:  600 24px/36px;
  --font-h2:  600 20px/30px;
  --font-h3:  600 18px/28px;
  --font-h4:  600 16px/24px;
  --font-body: 400 14px/24px;
  --font-caption: 400 12px/18px;

  --sidebar-w: 240px;
  --topbar-h:  80px;
  --tab-h:     38px;
  --table-th:  52px;
  --table-row: 60px;

  --btn-xl:  44px;
  --btn-lg:  40px;
  --btn-md:  36px;
  --btn-sm:  32px;
  --btn-xs:  26px;
}
```
