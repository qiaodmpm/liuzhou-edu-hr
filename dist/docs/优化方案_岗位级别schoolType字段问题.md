# 优化方案：岗位级别 `schoolType` 字段问题

> 日期：2026-06-16 | 状态：方案确认中，暂未实施

---

## 1. 问题

`schoolType` 出现在三个不该出现的地方：

| 位置 | 所属层级 | 当前字段 | 问题 |
|------|---------|---------|------|
| 编制使用申请记录 | 申请记录级 | `s.schoolType` | 学校和类型是 1:1 关系，存了冗余 |
| 招聘岗位表单 | 岗位级 | `pos.schoolType` | 岗位属于某所学校，学校类型是学校属性，不应挂在岗位字段上 |
| 岗位晋升审核记录 | 审核记录级 | `record.schoolType` | 同上，从学校名即可查到类型 |

**本质问题**：`schoolType` 是学校的属性，不是申请/岗位/记录的属性。把它拷贝到子对象上是**反范式的冗余**。

---

## 2. 数据来源分析

三个模块的 `schoolType` 写入方式完全相同：

```javascript
// 编制使用申请 — staffing-detail.html
schoolType: sd.st    // 从 SCHOOL_DATA 读

// 招聘岗位 — recruit-form.html  
schoolType: sd.schoolType  // 从 SCHOOL_DATA 读

// 岗位晋升 — promote-audit-second.html
schoolType: '自治区示范高中'  // 硬编码在记录中
```

**全部是创建时从 SCHOOL_DATA / org_directory 拷贝到记录中，之后仅用于展示。**

---

## 3. 优化方案

### 方案：去掉冗余字段，展示时动态读取

**原则**：`schoolType` 只存一处（机构目录 `org_directory`），其他模块通过 `orgName` 查找。

#### 改动

| 模块 | 当前 | 改为 |
|------|------|------|
| 编制使用申请列表 | `<td>s.schoolType</td>` | `<td>` + `getSchoolType(s.orgName)` + `</td>` |
| 编制使用申请详情 | 展示 `s.schoolType` | 同上 |
| 招聘岗位表单 | `pos.schoolType` 字段 | **删除**，审核展示时动态读取 |
| 招聘岗位审核 | `fv('学校类型', pos.schoolType)` | `fv('学校类型', getSchoolType(record.schoolName))` |
| 岗位晋升审核 | `record.schoolType` | 同上，动态读取 |
| 招聘 SCHOOL_DATA | `schoolType` 字段 | **删除**，从 org_directory 读 |

#### 工具函数

```javascript
function getSchoolType(schoolName) {
  var dir = JSON.parse(localStorage.getItem('org_directory') || '[]');
  for (var i = 0; i < dir.length; i++) {
    if (dir[i].orgName === schoolName) return dir[i].schoolType;
  }
  return '—';
}
```

#### 受影响文件

| 文件 | 改动 |
|------|------|
| `staffing-application.html` | 列表展示改为动态读取 |
| `staffing-detail.html` | 记录对象去掉 `schoolType` 字段，详情展示改为动态读取 |
| `recruit-form.html` | SCHOOL_DATA 去掉 `schoolType`，岗位对象去掉 `schoolType` 字段 |
| `recruit-audit-first.html` | 展示改为动态读取 |
| `recruit-audit-second.html` | 同上 |
| `recruit-detail.html` | 同上 |
| `promote-audit-second.html` | 记录对象去掉 `schoolType`，展示改为动态读取 |
| `promote-audit-third.html` | 同上 |

约 **8 个文件**。

---

## 4. 收益

- `schoolType` 成为单一数据源（机构目录），不会出现记录中存的类型和机构目录不一致的情况
- 招聘岗位对象减少一个冗余字段
- 与 `schoolType` + `schoolCategory` 合并方案（上一个优化方案）配合后，全站学校类型字段彻底归一

---

## 5. 与 `schoolType`/`schoolCategory` 合并方案的协同

前一个方案提出合并 `schoolType` + `schoolCategory` → 扩展 `schoolType` 枚举。本方案去掉子对象中的冗余拷贝，两个方案叠加后：

```
改前：
  机构目录          →  schoolType + schoolCategory（两个字段）
  编制申请记录       →  schoolType（冗余拷贝）
  招聘岗位           →  schoolType（冗余拷贝）
  岗位晋升记录       →  schoolType（冗余拷贝）

改后：
  机构目录          →  schoolType（合并后，唯一数据源）
  编制申请/招聘/晋升  →  不存 schoolType，展示时查找 org_directory
```

---

## 6. 实施建议

优先实施 `schoolType`/`schoolCategory` 合并，再实施本方案去掉冗余拷贝。两步改动叠加后净效果：

| 指标 | 改前 | 改后 |
|------|:--:|:--:|
| 机构目录字段数 | 21（含 schoolCategory） | 20 |
| schoolType 存储点 | 4 处 | 1 处（机构目录） |
| 不一致风险 | 有（拷贝值可能过期） | 无 |
| 招聘岗位字段数 | 含 pos.schoolType | 去掉 |
