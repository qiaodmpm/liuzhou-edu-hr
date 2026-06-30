# 优化方案：登录页角色 Tab 合并（4→2）

> 日期：2026-06-17 | 状态：✅ 已实施

---

## 1. 现状

当前登录页使用 **4 个角色 Tab**：

```
[ 市管理员 ] [ 区管理员 ] [ 校管理员 ] [ 教师 ]
```

每个 Tab 下各有一组演示账号卡片。切换 Tab 时：
- 清空表单
- 更新 placeholder（管理员用「手机号/账号」，教师用「身份证号/手机号」）
- 重新渲染该角色对应的演示账号

## 2. 优化后

合并为 **2 个 Tab**：

```
[ 管理员 ] [ 教师 ]
```

| Tab | 包含角色 | 演示账号数 |
|-----|---------|:--:|
| **管理员** | 市管理员 + 区管理员 + 校管理员 | 3 |
| **教师** | 教师 | 1（可扩展） |

## 3. 改动分析

### 3.1 视觉改动

```
改前：                                改后：
┌──────────────────────────────┐      ┌──────────────────────────────┐
│ [市管理员][区管理员][校管理员][教师] │      │ [  管理员  ][  教师  ]        │
├──────────────────────────────┤      ├──────────────────────────────┤
│ ┌──────────────────────┐     │      │ ┌──────────────────────┐     │
│ │ 张建国（市管理员）     │     │      │ │ 张建国（市管理员）     │     │
│ │ 手机号：13807720001   │     │      │ │ 手机号：13807720001   │     │
│ └──────────────────────┘     │      │ ├──────────────────────┤     │
│                              │      │ │ 李振华（区管理员）     │     │
│ （仅1条，因为只显示当前Tab）   │      │ │ 手机号：13807720002   │     │
│                              │      │ ├──────────────────────┤     │
│                              │      │ │ 王玉兰（校管理员）     │     │
│                              │      │ │ 手机号：13807720003   │     │
│                              │      │ └──────────────────────┘     │
└──────────────────────────────┘      └──────────────────────────────┘
```

### 3.2 JS 数据结构改动

```javascript
// 改前：按角色分 4 组
const demoAccounts = {
  city:     [{ role:'city',     roleLabel:'市管理员', name:'张建国', ... }],
  district: [{ role:'district', roleLabel:'区管理员', name:'李振华', ... }],
  school:   [{ role:'school',   roleLabel:'校管理员', name:'王玉兰', ... }],
  teacher:  [{ role:'teacher',  roleLabel:'教师',     name:'陈明辉', ... }]
};

// 改后：按大类分 2 组
const demoAccounts = {
  admin: [   // ← 合并 city + district + school
    { role:'city',     roleLabel:'市管理员', name:'张建国', id:'13807720001', badgeClass:'badge-city' },
    { role:'district', roleLabel:'区管理员', name:'李振华', id:'13807720002', badgeClass:'badge-district' },
    { role:'school',   roleLabel:'校管理员', name:'王玉兰', id:'13807720003', badgeClass:'badge-school' }
  ],
  teacher: [
    { role:'teacher',  roleLabel:'教师',     name:'陈明辉', id:'450200199001011234', badgeClass:'badge-teacher' }
  ]
};
```

### 3.3 Tab 切换逻辑

```javascript
// 改前：currentRole ∈ {city, district, school, teacher}
// 改后：currentRole ∈ {admin, teacher}

roleTabs.addEventListener('click', function(e) {
  // ...同上...
  currentRole = tab.dataset.role;  // 'admin' 或 'teacher'

  if (currentRole === 'teacher') {
    accountLabel.textContent = '身份证号 / 手机号';
    accountInput.placeholder = '请输入身份证号或已绑定的手机号';
  } else {
    // admin 统一
    accountLabel.textContent = '手机号 / 账号';
    accountInput.placeholder = '请输入手机号或账号';
  }
  // ...
});
```

### 3.4 登录逻辑

**无需改动**。演示账号卡片中已包含 `role` 字段（`city`/`district`/`school`），登录成功后会写入 `localStorage.currentUser.role`。现有逻辑完全兼容——它只是从匹配的 demo account 对象中读取 `role`，不依赖 Tab 名称。

```javascript
// 这段逻辑不变，matched.role 来自卡片数据
localStorage.setItem("currentUser", JSON.stringify({
  role: matched.role,    // 'city' | 'district' | 'school' | 'teacher'
  name: matched.name,
  id: matched.id
}));
```

### 3.5 HTML 改动

```html
<!-- 改前：4 个 tab -->
<button class="role-tab active" data-role="city">市管理员</button>
<button class="role-tab" data-role="district">区管理员</button>
<button class="role-tab" data-role="school">校管理员</button>
<button class="role-tab" data-role="teacher">教 师</button>

<!-- 改后：2 个 tab -->
<button class="role-tab active" data-role="admin">管理员</button>
<button class="role-tab" data-role="teacher">教 师</button>
```

### 3.6 Badge 颜色

现有 4 种 badge 颜色保持不变，管理员 Tab 下的 3 张卡片各有独立颜色：

| 角色 | Badge 颜色 | CSS |
|------|-----------|-----|
| 市管理员 | 蓝色 | `badge-city` |
| 区管理员 | 黄色 | `badge-district` |
| 校管理员 | 绿色 | `badge-school` |
| 教师 | 紫色 | `badge-teacher` |

## 4. 改动清单

| 位置 | 改动内容 | 改动量 |
|------|---------|:--:|
| HTML `#roleTabs` | 4 个 `<button>` → 2 个 | ~4 行 |
| JS `demoAccounts` 对象 | 4 个 key → 2 个 key（city/district/school 合并为 admin） | ~10 行 |
| JS tab 切换逻辑 | `currentRole === 'teacher'` 判断保持不变，else 分支统一处理 admin | 无需改动 |
| JS `renderDemoAccounts` | 无需改动（仍按 `currentRole` 取数组渲染） | 无需改动 |
| JS 登录逻辑 | 无需改动（matched.role 来自卡片数据） | 无需改动 |
| CSS | 无需改动（`.role-tab` 等宽自适应，2 个 Tab 更宽更舒适） | 无需改动 |

> **总改动量极小**：约 14 行，仅涉及 HTML 结构和数据分组，不影响任何业务逻辑。

## 5. 边界场景

| 场景 | 处理 |
|------|------|
| 管理员 Tab 下输入教师身份证号 | 遍历 admin 数组找不到 → 提示"账号或密码错误" |
| 教师 Tab 下输入管理员手机号 | 遍历 teacher 数组找不到 → 走 `teacher_accounts` localStorage 查询 → 找不到 → 同上 |
| 管理员 Tab 默认选中 | 初始 `currentRole = 'admin'`，渲染 3 张管理员卡片 |
| 演示账号卡片点击 | 自动填充对应账号 ID + 密码，角色信息内嵌在卡片 JS 对象中 |

## 6. 收益

- **UI 更简洁**：4 个拥挤的 Tab 缩减为 2 个宽敞的 Tab
- **认知负担降低**：用户只需区分「我是管理员」还是「我是教师」，具体管理员类型从卡片中区分
- **移动端友好**：2 个 Tab 在小屏幕上不会折行（4 个 Tab 在 480px 下会折行）
- **扩展性好**：未来新增管理员角色（如系统管理员）只需在 `admin` 数组追加，无需新增 Tab
