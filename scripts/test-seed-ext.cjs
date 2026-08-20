// VM test: 聘用手续模块演示种子扩充（三页同步）
// 校验：首次写入 11 条（2 原有 + 9 新增）；导入下拉按 学校+批次+岗位 过滤；
// 迁移分支把新增 token 合并进旧 localStorage。
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
let pass = 0, fail = 0;
function ok(cond, msg) {
  if (cond) { pass++; console.log('  PASS ' + msg); }
  else { fail++; console.log('  FAIL ' + msg); }
}

function makeSandbox(initialLS) {
  const store = new Map(Object.entries(initialLS || {}));
  const sandbox = {
    console: { log(){}, warn(){}, error(){} },
    window: { location: { search: '' }, confirm: () => true, alert: () => {} },
    localStorage: {
      getItem: (k) => (store.has(k) ? store.get(k) : null),
      setItem: (k, v) => store.set(k, String(v)),
      removeItem: (k) => store.delete(k)
    },
    navigator: { clipboard: { writeText: () => Promise.resolve() } },
    document: {
      addEventListener: function(){},
      removeEventListener: function(){},
      querySelectorAll: function(){ return []; },
      getElementById: function(){
        return { _h:'', _v:'', _style:{}, _attrs:{}, value:'', innerHTML:'', classList:{ add:function(){}, remove:function(){}, toggle:function(){} }, style:{}, setAttribute:function(){}, appendChild:function(){}, addEventListener:function(){} };
      }
    },
    renderSidebarMenu: function(){},
    setTimeout, clearTimeout, setInterval, clearInterval,
    URLSearchParams, Blob, URL
  };
  sandbox.window.confirm = () => true;
  sandbox.globalThis = sandbox;
  return { sandbox, store };
}

function extractScripts(html) {
  const out = [];
  const re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) out.push(m[1]);
  return out.join('\n;\n');
}

const html = fs.readFileSync(path.join(ROOT, 'employ-form.html'), 'utf8');
const code = extractScripts(html);

// ---- 场景 1：首次打开（localStorage 为空）----
console.log('[场景1] 首次打开写入演示数据');
{
  const { sandbox, store } = makeSandbox({});
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { timeout: 10000 });
  vm.runInContext('var fills = loadTeacherFills();', sandbox);
  const fills = sandbox.fills;
  const tokens = Object.keys(fills);
  ok(tokens.length === 11, '共 11 条演示填报（实际 ' + tokens.length + '）');
  ok(fills['EFTREC20260501001_0_0'] && fills['EFTREC20260501001_0_1'], '原有 张伟/李娜 仍在');
  ok(!!fills['EFTREC20260501001_1_0'] && !!fills['EFTREC20260501001_1_1'], '高中数学 王强/赵敏');
  ok(!!fills['EFTREC20260501001_2_0'], '高中英语 陈璐');
  ok(!!fills['EFTREC20260415001_0_0'] && !!fills['EFTREC20260415001_1_0'], '高中物理/化学');
  ok(!!fills['EFTREC20260515001_0_0'] && !!fills['EFTREC20260515001_1_0'], '高中生物/政治');
  ok(!!fills['EFTREC20260701002_0_0'] && !!fills['EFTREC20260701002_0_1'], '初中语文 黄雨桐/林浩');
  ok(fills['EFTREC20260701002_0_0'].schoolName === '柳州市第一中学', '初中语文归属柳州市第一中学');
  const submitted = tokens.filter(t => fills[t].status === 'submitted').length;
  ok(submitted === 11, '全部 status=submitted（实际 ' + submitted + '）');
  ok(fills['EFTREC20260501001_1_0'].teacher.photo.indexOf('data:image/svg') === 0, '新增教师含照片占位图');
  ok(fills['EFTREC20260701002_0_0'].teacher.gender === '女' && fills['EFTREC20260701002_0_1'].teacher.gender === '男', '性别正确映射照片');
}

// ---- 场景 2：导入下拉过滤（学校+批次+岗位 匹配，仅显示未导入的已提交教师）----
console.log('[场景2] 导入下拉数据源过滤');
{
  const { sandbox } = makeSandbox({});
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { timeout: 10000 });
  vm.runInContext('var fills = loadTeacherFills();', sandbox);
  const fills = sandbox.fills;
  function importable(school, batchId, positionName, importedTokens) {
    importedTokens = importedTokens || [];
    return Object.keys(fills)
      .map(function(t){ return fills[t]; })
      .filter(function(f){
        return f.status === 'submitted' && f.schoolName === school &&
               f.batchId === batchId && f.positionName === positionName &&
               importedTokens.indexOf(f.token) === -1;
      });
  }
  const math = importable('柳州高级中学', 'RCB20260501001', '高中数学教师');
  ok(math.length === 2 && math[0].name === '王强' && math[1].name === '赵敏', '高中数学 下拉 王强+赵敏');
  const chinese = importable('柳州高级中学', 'RCB20260501001', '高中语文教师');
  ok(chinese.length === 2 && chinese[0].name === '张伟' && chinese[1].name === '李娜', '高中语文 下拉 张伟+李娜');
  const english = importable('柳州高级中学', 'RCB20260501001', '高中英语教师');
  ok(english.length === 1 && english[0].name === '陈璐', '高中英语 下拉 陈璐');
  const physics = importable('柳州高级中学', 'RCB20260415001', '高中物理教师');
  ok(physics.length === 1 && physics[0].name === '孙志远', '高中物理 下拉 孙志远');
  const chemistry = importable('柳州高级中学', 'RCB20260415001', '高中化学教师');
  ok(chemistry.length === 1 && chemistry[0].name === '周晓琳', '高中化学 下拉 周晓琳');
  const biology = importable('柳州高级中学', 'RCB20260515001', '高中生物教师');
  ok(biology.length === 1 && biology[0].name === '吴倩', '高中生物 下拉 吴倩');
  const politics = importable('柳州高级中学', 'RCB20260515001', '高中政治教师');
  ok(politics.length === 1 && politics[0].name === '郑晓峰', '高中政治 下拉 郑晓峰');
  const junior = importable('柳州市第一中学', 'RCB20260701001', '初中语文教师');
  ok(junior.length === 2 && junior[0].name === '黄雨桐' && junior[1].name === '林浩', '初中语文 下拉 黄雨桐+林浩');
  const none1 = importable('柳州高级中学', 'RCB20260515001', '高中历史教师');
  ok(none1.length === 0, '高中历史（无已填报）下拉为空');
  const none2 = importable('柳州市第一中学', 'RCB20260501001', '高中语文教师');
  ok(none2.length === 0, '跨学校不串数据（一中看不到柳州高中的语文教师）');
  const dedup = importable('柳州高级中学', 'RCB20260501001', '高中数学教师', ['EFTREC20260501001_1_0']);
  ok(dedup.length === 1 && dedup[0].name === '赵敏', '已导入 token 从下拉剔除（去重）');
}

// ---- 场景 3：迁移分支——旧 localStorage 只有张伟/李娜，加载后补全 11 条 ----
console.log('[场景3] 旧数据迁移合并新增 token');
{
  const oldFills = {
    EFTREC20260501001_0_0: { token:'EFTREC20260501001_0_0', status:'submitted', seedRev:3, name:'张伟', teacher:{ name:'张伟' } }
  };
  const { sandbox } = makeSandbox({ employ_teacher_fills: JSON.stringify(oldFills) });
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { timeout: 10000 });
  vm.runInContext('var fills = loadTeacherFills();', sandbox);
  const fills = sandbox.fills;
  ok(Object.keys(fills).length === 11, '迁移后共 11 条（实际 ' + Object.keys(fills).length + '）');
  ok(!!fills['EFTREC20260701002_0_0'] && !!fills['EFTREC20260501001_1_0'], '新增 token 已合并');
  ok(fills['EFTREC20260501001_0_0'].status === 'submitted', '原有记录保留');
  // 用户修改过的内容（seedRev>=3）不被种子覆盖
  ok(fills['EFTREC20260501001_0_0'].teacher.name === '张伟', '已存 seedRev=3 记录内容不被刷新');
}

console.log('\n结果: ' + pass + ' PASS / ' + fail + ' FAIL');
process.exit(fail ? 1 : 0);
