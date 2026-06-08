# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**柳州教育人事管理平台** — a pure front-end HTML/CSS/JS demo application for Liuzhou City's education HR management. All data is mocked with hardcoded JavaScript demo data. No backend, no database, no frontend framework.

The platform covers 11 HR business modules: 编制使用申请 (staffing), 教师入编 (entry), 教师出编 (exit), 岗位晋升 (promotion), 岗位设置 (post setting), 招聘 (recruitment), 聘用手续, 退休呈报, 工资核定, 师德师风举报, and 荣誉申请.

## Tech Stack

- **Language**: HTML5 + CSS3 + Vanilla JavaScript (ES2020+)
- **Font**: Noto Sans SC via Google Fonts
- **Build**: `node scripts/build.mjs` — copies .html files + src/ + docs/ to `dist/`
- **Deploy**: Docker (nginx) + Kubernetes manifests in `manifests/`
- **No dependencies**: No npm packages beyond the build script

## Project Structure

```
/
├── index.html                          # Login page with role selection + demo accounts
├── workbench.html                      # Role-based dashboard (workbench)
├── staffing-*.html                     # 编制使用申请 (staffing application) module
├── entry-*.html                        # 教师入编 (teacher entry) module
├── exit-*.html                         # 教师出编 (teacher exit) module
├── promote-*.html                      # 岗位晋升 (post promotion) module
├── post-*.html                         # 岗位设置 (post setting) module
├── recruit-*.html                      # 招聘 (recruitment) module
├── 教师入编*.html / 教师出编*.html       # Chinese-named pages (older/migrated modules)
├── 审核*.html                          # Audit pages with Chinese names
├── src/styles.css                      # Shared CSS (minimal, most styles are page-inline)
├── scripts/build.mjs                   # Build script
├── docs/                               # PRDs, business rules, design specs
│   ├── PRD_*.md                        # Module-level PRD documents
│   ├── 业务规则_*.md                    # Business rules per module
│   ├── 产品设计方案_柳州教育人事管理平台.md # Product design overview
│   └── change-log.md                   # Iteration log
├── manifests/                          # Kubernetes deployment files
├── nginx.conf                          # Static file server config
└── Dockerfile                          # nginx-based container image
```

## Page Naming Conventions

| Pattern | Purpose | Example |
|---------|---------|---------|
| `*-form.html` | Creation/edit form | `entry-form.html`, `promote-form.html` |
| `*-detail.html` | Detail view (read-only or with actions) | `staffing-detail.html`, `recruit-detail.html` |
| `*-list-*.html` | List/management page by role | `promote-list-school.html`, `recruit-list-admin.html` |
| `*-audit-*.html` | Audit/approval page by stage | `post-audit-first.html`, `promote-audit-third.html` |
| `*-batch.html` | Batch operations | `recruit-batch.html`, `promote-batch.html` |
| `*-hr-entry.html` | HR result entry | `promote-hr-entry.html` |
| `*-application.html` | Application listing | `staffing-application.html` |

## Architecture Patterns

### Design System
Every page uses inline `<style>` with CSS custom properties (tokens):
```css
:root {
  --primary: #1E40AF; --primary-dark: #1E3A8A; --primary-light: #EFF6FF;
  --accent: #3B82F6;
  --text: #1E293B; --text-secondary: #64748B; --text-light: #94A3B8;
  --border: #E2E8F0; --bg: #F8FAFC;
  --danger: #EF4444; --success: #10B981; --warning: #F59E0B;
  --radius: 8px; --radius-lg: 12px;
  --shadow: 0 4px 24px rgba(0,0,0,0.08); --shadow-lg: 0 12px 48px rgba(0,0,0,0.12);
  --transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  --sidebar-w: 240px;
}
```
Always use these CSS tokens — never hardcode colors.

### Page Layout
All internal pages follow this layout (from top to bottom):
1. **Top navbar** (`.topnav`) — fixed, 56px, gradient blue background
2. **Sidebar** (`.sidebar`) — fixed left, 240px, dark blue, role-aware menu items
3. **Main content** (`.main`) — left margin = `var(--sidebar-w)`, top margin = 56px
4. **Breadcrumb** (`.breadcrumb`) — at top of main area
5. **Page header** (`.page-header`) — title + action buttons

When creating a new page, copy the navbar + sidebar + CSS variable block from an existing page. The sidebar is frozen — do not add/remove menu items unless explicitly asked (per project memory).

### Role System
- 4 roles: `city` (市管理员), `district` (区管理员), `school` (校管理员), `teacher` (教师)
- Current user stored in `localStorage` as `currentUser` (JSON with `role`, `name`, `id`)
- Login redirects from `index.html` to `workbench.html`
- `workbench.html` handles role-based routing to module pages
- Each page reads `currentUser` from localStorage to control permissions

### Mock Data
All data is hardcoded in-page JavaScript arrays/objects. Common patterns:
- `mockData`, `mockRecords`, `demoAccounts` — static data arrays
- `getStatusClass()`, `getStatusText()` — status label helpers
- Filtering/sorting done client-side in the same page
- No AJAX, no fetch, no API calls

### Common UI Components (inline HTML patterns)
- **Modals**: `<div class="modal-overlay">` + `<div class="modal">`, toggled by `.show` class
- **Status badges**: colored spans using `--danger`/`--success`/`--warning` tokens
- **Toast notifications**: fixed-position div, auto-dismiss after 2.5s
- **Tabular data**: `<table>` with sticky header, search/filter bar above
- **Pagination**: `.pagination` bar at bottom of lists
- **Tabs**: `.tabs` / `.tab` buttons for switching views
- **Loading states**: `.loading-spinner` or inline text for async simulation
- **Empty states**: "暂无数据" message when table is empty
- **Error states**: `window.onerror` handler for debug info (standard across all pages)

## Business Logic by Module

### 编制使用申请 (Staffing Application)
- School creates applications under a batch, with dual-track (事业编/控制数)
- Two-stage approval: school → district (or city for 市直属)
- Batch management by district/city admin
- Result entry by admin after offline 编办 approval

### 教师入编 (Teacher Entry) — PRD v2.0
- **Dual-track**: 事业编 (实名制, 1 person per form) vs 控制数 (备案制, batch upload)
- **Single-step approval**: school → district or city (终审)
- **30-day modification window**: approving admin can revert "approved" → "rejected" within 30 days
- **City admin is read-only**: can view all records but cannot approve
- No batch mode, no draft state
- Reference: `docs/PRD_教师入编模块.md`

### 岗位晋升 (Post Promotion) — 3-stage approval
- Batch published by admin → teacher applies → school first review → admin second review (material check) → school enters HR result → admin third review (final confirm)
- Dual form types: regular promotion vs 四级→三级 special form
- Real-time "remaining quota" calculation to prevent over-quota
- Reference: `docs/PRD_岗位晋升申请模块.md`, `docs/技术方案_岗位晋升申请模块.md`

### 招聘 (Recruitment) — Only 3-stage approval module
- school → district (初审) → city (终审). 市直属 skips district.
- Reference existing `recruit-*.html` files.

## Commands

```bash
npm run build    # Build: copies files to dist/
npm install      # No real dependencies (only for build script)
```

## Key Constraints from Project Memory

- **Sidebar is frozen**: Do not modify sidebar menu items unless specifically asked.
- **post-detail.html**: Do not optimize or modify this file (project decision).
- **Error debugging**: When a page "won't open" or displays blank, first add the standard `window.onerror` handler pattern.

## Files to Reference for Common Patterns

| Need | Reference File |
|------|---------------|
| New list page with sidebar | `promote-list-admin.html` or `recruit-list-admin.html` |
| New form page | `entry-form.html` (dual-track) or `promote-form.html` (standard form) |
| New audit/approval page | `post-audit-first.html` or `promote-audit-second.html` |
| New detail page | `promote-detail.html` or `entry-detail.html` |
| CSS token system | Any existing page's `:root` block |
