
var ICONS = {
  home: '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
  chart: '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  userp: '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>',
  monitor: '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
  userx: '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="18" y1="8" x2="23" y2="13"/><line x1="23" y1="8" x2="18" y2="13"/></svg>',
  arrowup: '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>',
  shield: '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  search: '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  file: '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
  clock: '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  dollar: '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  warn: '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  star: '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  users: '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  building: '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="6" x2="15" y2="6"/><line x1="9" y1="10" x2="15" y2="10"/><line x1="9" y1="14" x2="15" y2="14"/><line x1="9" y1="18" x2="12" y2="18"/></svg>',
  key: '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>',
  list: '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>'
};
var MENU_ICONS = { workbench:'home', dashboard:'chart', entry:'userp', staffing:'monitor', exit:'userx', promote:'arrowup', postset:'shield', recruit:'search', employ:'file', retire:'clock', salary:'dollar', ethics:'warn', honor:'star', account:'users', org:'building', perm:'key', log:'list' };

var ROLES = {
  city: { name:'张建国', short:'市', sidebar:{ top:[{id:'workbench',icon:'home',label:'工作台'},{id:'dashboard',icon:'chart',label:'数据概览'}], groups:[{name:'编制管理',items:[{id:'staffing',label:'编制使用申请'},{id:'entry',label:'入编申请',badge:3},{id:'exit',label:'教师出编管理'}]},{name:'岗位管理',items:[{id:'postset',label:'岗位设置申请'},{id:'promote',label:'岗位晋升申请',badge:5},{id:'recruit',label:'招聘岗位申请'}]},{name:'聘用管理',items:[{id:'employ',label:'聘用手续办理'}]},{name:'人事管理',items:[{id:'retire',label:'退休呈报'},{id:'salary',label:'工资核定申请'},{id:'ethics',label:'师德师风举报'},{id:'honor',label:'荣誉申请'}]},{name:'系统设置',items:[{id:'account',label:'账号管理'},{id:'org',label:'机构管理'},{id:'perm',label:'角色权限'},{id:'log',label:'操作日志'}]}]}},
  district: { name:'李振华', short:'区', sidebar:{ top:[{id:'workbench',icon:'home',label:'工作台'},{id:'dashboard',icon:'chart',label:'数据概览'}], groups:[{name:'编制管理',items:[{id:'staffing',label:'编制使用申请'},{id:'entry',label:'入编申请',badge:1},{id:'exit',label:'教师出编管理'}]},{name:'岗位管理',items:[{id:'postset',label:'岗位设置申请'},{id:'promote',label:'岗位晋升申请',badge:3},{id:'recruit',label:'招聘岗位申请'}]},{name:'聘用管理',items:[{id:'employ',label:'聘用手续办理'}]},{name:'人事管理',items:[{id:'retire',label:'退休呈报'},{id:'salary',label:'工资核定申请'},{id:'ethics',label:'师德师风举报'},{id:'honor',label:'荣誉申请'}]},{name:'系统设置',items:[{id:'account',label:'账号管理'}]}]}},
  school: { name:'王玉兰', short:'校', sidebar:{ top:[{id:'workbench',icon:'home',label:'工作台'},{id:'dashboard',icon:'chart',label:'数据概览'}], groups:[{name:'编制管理',items:[{id:'staffing',label:'编制使用申请'},{id:'entry',label:'入编申请'},{id:'exit',label:'教师出编管理'}]},{name:'岗位管理',items:[{id:'postset',label:'岗位设置申请'},{id:'promote',label:'岗位晋升申请',badge:2},{id:'recruit',label:'招聘岗位申请'}]},{name:'聘用管理',items:[{id:'employ',label:'聘用手续办理'}]},{name:'人事管理',items:[{id:'retire',label:'退休呈报'},{id:'salary',label:'工资核定申请'},{id:'ethics',label:'师德师风举报'},{id:'honor',label:'荣誉申请'}]},{name:'系统设置',items:[{id:'account',label:'账号管理'}]}]}},
  teacher: { name:'陈明辉', short:'师', sidebar:{ top:[{id:'workbench',icon:'home',label:'工作台'}], groups:[{name:'业务申请',items:[{id:'promote',label:'岗位晋升申请'},{id:'ethics',label:'师德师风举报'},{id:'honor',label:'荣誉申请'}]}]}}
};

// ===== DEMO DATA =====
var CATEGORY_MAP = { manage: '管理岗位', professional: '专业技术岗位', skill: '工勤技能岗位' };


var DEMO_RECORDS = [
  { id: 'PR20260515001', batchId: 'PB20260501001', batchName: '2026年春季专业技术岗位晋升',
    teacherName: '李明华', gender: '男', ethnicity: '汉族', birthDate: '1975-03',
    workStartTime: '1997-09', education: '本科', graduateTime: '1997-07',
    currentPost: '专业技术岗位七级', appointTime: '2020-09',
    targetLevel: '六级', fromLevel: '七级',
    schoolName: '柳州市第八中学', schoolCategory: '鱼峰区属',
    remark: '', status: 'pending_first', submitTime: '2026-05-15 09:00:00' },
  { id: 'PR20260515002', batchId: 'PB20260501001', batchName: '2026年春季专业技术岗位晋升',
    teacherName: '王小燕', gender: '女', ethnicity: '壮族', birthDate: '1982-11',
    workStartTime: '2005-08', education: '硕士研究生', graduateTime: '2005-06',
    currentPost: '专业技术岗位十级', appointTime: '2021-03',
    targetLevel: '九级', fromLevel: '十级',
    schoolName: '柳州市第八中学', schoolCategory: '鱼峰区属',
    remark: '', status: 'pending_first', submitTime: '2026-05-15 10:00:00' },
  { id: 'PR20260512001', batchId: 'PB20260501001', batchName: '2026年春季专业技术岗位晋升',
    teacherName: '陈建军', gender: '男', ethnicity: '汉族', birthDate: '1978-06',
    workStartTime: '2000-09', education: '本科', graduateTime: '2000-07',
    currentPost: '专业技术岗位九级', appointTime: '2021-09',
    targetLevel: '八级', fromLevel: '九级',
    schoolName: '柳州市第八中学', schoolCategory: '鱼峰区属',
    remark: '', status: 'first_approved', submitTime: '2026-05-12 09:00:00',
    firstReviewer: '周敏', firstReviewTime: '2026-05-13 14:00:00' },
  { id: 'PR20260512002', batchId: 'PB20260501001', batchName: '2026年春季专业技术岗位晋升',
    teacherName: '孙丽华', gender: '女', ethnicity: '汉族', birthDate: '1985-02',
    workStartTime: '2007-08', education: '本科', graduateTime: '2007-06',
    currentPost: '专业技术岗位十级', appointTime: '2022-09',
    targetLevel: '九级', fromLevel: '十级',
    schoolName: '柳州市第八中学', schoolCategory: '鱼峰区属',
    remark: '', status: 'first_approved', submitTime: '2026-05-12 11:00:00',
    firstReviewer: '周敏', firstReviewTime: '2026-05-13 15:00:00' },
  { id: 'PR20260510001', batchId: 'PB20260501001', batchName: '2026年春季专业技术岗位晋升',
    teacherName: '张丽萍', gender: '女', ethnicity: '苗族', birthDate: '1987-09',
    workStartTime: '2009-08', education: '本科', graduateTime: '2009-07',
    currentPost: '专业技术岗位十级', appointTime: '2023-03',
    targetLevel: '九级', fromLevel: '十级',
    schoolName: '柳州市第八中学', schoolCategory: '鱼峰区属',
    remark: '', status: 'first_rejected', submitTime: '2026-05-10 08:30:00',
    firstRejectReason: '近三年考核结果未填写完整' },
  { id: 'PR20260505001', batchId: 'PB20260501001', batchName: '2026年春季专业技术岗位晋升',
    teacherName: '刘美玲', gender: '女', ethnicity: '汉族', birthDate: '1979-04',
    workStartTime: '2001-09', education: '博士研究生', graduateTime: '2001-06',
    currentPost: '专业技术岗位七级', appointTime: '2021-03',
    targetLevel: '六级', fromLevel: '七级',
    schoolName: '柳州市第八中学', schoolCategory: '鱼峰区属',
    remark: '', status: 'second_approved', submitTime: '2026-05-05 08:00:00' },
  { id: 'PR20260503001', batchId: 'PB20260501001', batchName: '2026年春季专业技术岗位晋升',
    teacherName: '赵伟强', gender: '男', ethnicity: '汉族', birthDate: '1983-12',
    workStartTime: '2006-08', education: '本科', graduateTime: '2006-06',
    currentPost: '专业技术岗位九级', appointTime: '2022-09',
    targetLevel: '八级', fromLevel: '九级',
    schoolName: '柳州市第八中学', schoolCategory: '鱼峰区属',
    remark: '', status: 'second_rejected', submitTime: '2026-05-03 09:00:00',
    secondRejectReason: '公示材料不完整' },
  { id: 'PR20260420001', batchId: 'PB20260415001', batchName: '2026年鱼峰区专项晋升',
    teacherName: '周文斌', gender: '男', ethnicity: '汉族', birthDate: '1976-08',
    workStartTime: '1998-09', education: '本科', graduateTime: '1998-07',
    currentPost: '工勤技能岗位七级', appointTime: '2019-03',
    targetLevel: '六级', fromLevel: '七级',
    schoolName: '柳州市第八中学', schoolCategory: '鱼峰区属',
    remark: '', status: 'completed', submitTime: '2026-04-03 08:00:00', completeTime: '2026-04-22 09:00:00' }
];

var STATUS_LABEL_MAP = {
  pending_first: '待一审',
  first_approved: '一审通过',
  first_rejected: '一审驳回',
  pending_second: '待二审',
  second_approved: '二审通过',
  second_rejected: '二审驳回',
  pending_third: '待三审',
  third_rejected: '三审驳回',
  completed: '已完成'
};

// ===== POSITION EMPLOYED DATA (for summary table) =====
var POST_EMPLOYED_DATA = {
  '柳州市第八中学': {
    mgmt: {
      '4': { career: 0, control: 0, over: 0 },
      '5': { career: 1, control: 0, over: 0 },
      '6': { career: 1, control: 1, over: 0 },
      '7': { career: 1, control: 0, over: 0 },
      '8': { career: 1, control: 1, over: 0 },
      '9': { career: 1, control: 0, over: 0 },
      '10': { career: 0, control: 0, over: 0 }
    },
    prof: {
      '3': { career: 0, control: 0, over: 0 },
      '4': { career: 0, control: 0, over: 0 },
      '5': { career: 3, control: 1, over: 0 },
      '6': { career: 5, control: 1, over: 0 },
      '7': { career: 4, control: 2, over: 0 },
      '8': { career: 12, control: 2, over: 0 },
      '9': { career: 15, control: 3, over: 0 },
      '10': { career: 10, control: 3, over: 0 },
      '11': { career: 6, control: 2, over: 0 },
      '12': { career: 6, control: 2, over: 0 },
      '13': { career: 2, control: 0, over: 0 }
    },
    labor: {
      '1': { career: 0, control: 0, over: 0 },
      '2': { career: 1, control: 0, over: 0 },
      '3': { career: 2, control: 0, over: 0 },
      '4': { career: 5, control: 0, over: 0 },
      '5': { career: 6, control: 0, over: 0 },
      'common': { career: 2, control: 0, over: 0 }
    }
  },
  '柳州高级中学': {
    mgmt: {
      '4': { career: 0, control: 0, over: 0 },
      '5': { career: 1, control: 0, over: 0 },
      '6': { career: 2, control: 0, over: 0 },
      '7': { career: 3, control: 0, over: 0 },
      '8': { career: 2, control: 0, over: 0 },
      '9': { career: 1, control: 0, over: 0 },
      '10': { career: 1, control: 0, over: 0 }
    },
    prof: {
      '3': { career: 1, control: 0, over: 0 },
      '4': { career: 3, control: 0, over: 0 },
      '5': { career: 9, control: 0, over: 0 },
      '6': { career: 18, control: 0, over: 0 },
      '7': { career: 17, control: 0, over: 0 },
      '8': { career: 23, control: 0, over: 0 },
      '9': { career: 30, control: 0, over: 0 },
      '10': { career: 23, control: 0, over: 0 },
      '11': { career: 9, control: 0, over: 0 },
      '12': { career: 9, control: 0, over: 0 },
      '13': { career: 3, control: 0, over: 0 }
    },
    labor: {
      '1': { career: 0, control: 0, over: 0 },
      '2': { career: 1, control: 0, over: 0 },
      '3': { career: 2, control: 0, over: 0 },
      '4': { career: 5, control: 0, over: 0 },
      '5': { career: 5, control: 0, over: 0 },
      'common': { career: 2, control: 0, over: 0 }
    }
  },
  '鱼峰区实验小学': {
    mgmt: {
      '4': { career: 0, control: 0, over: 0 },
      '5': { career: 0, control: 0, over: 0 },
      '6': { career: 0, control: 0, over: 0 },
      '7': { career: 1, control: 0, over: 0 },
      '8': { career: 2, control: 0, over: 0 },
      '9': { career: 1, control: 0, over: 0 },
      '10': { career: 1, control: 0, over: 0 }
    },
    prof: {
      '3': { career: 0, control: 0, over: 0 },
      '4': { career: 0, control: 0, over: 0 },
      '5': { career: 1, control: 0, over: 0 },
      '6': { career: 2, control: 0, over: 0 },
      '7': { career: 2, control: 0, over: 0 },
      '8': { career: 8, control: 0, over: 0 },
      '9': { career: 11, control: 0, over: 0 },
      '10': { career: 8, control: 0, over: 0 },
      '11': { career: 7, control: 0, over: 0 },
      '12': { career: 7, control: 0, over: 0 },
      '13': { career: 2, control: 0, over: 0 }
    },
    labor: {
      '1': { career: 0, control: 0, over: 0 },
      '2': { career: 0, control: 0, over: 0 },
      '3': { career: 1, control: 0, over: 0 },
      '4': { career: 2, control: 0, over: 0 },
      '5': { career: 1, control: 0, over: 0 },
      'common': { career: 1, control: 0, over: 0 }
    }
  },
  '柳州市第一中学': {
    mgmt: {
      '4': { career: 0, control: 0, over: 0 },
      '5': { career: 1, control: 0, over: 0 },
      '6': { career: 2, control: 0, over: 0 },
      '7': { career: 2, control: 0, over: 0 },
      '8': { career: 2, control: 0, over: 0 },
      '9': { career: 1, control: 0, over: 0 },
      '10': { career: 0, control: 0, over: 0 }
    },
    prof: {
      '3': { career: 1, control: 0, over: 0 },
      '4': { career: 2, control: 0, over: 0 },
      '5': { career: 6, control: 0, over: 0 },
      '6': { career: 12, control: 0, over: 0 },
      '7': { career: 11, control: 0, over: 0 },
      '8': { career: 16, control: 0, over: 0 },
      '9': { career: 21, control: 0, over: 0 },
      '10': { career: 16, control: 0, over: 0 },
      '11': { career: 8, control: 0, over: 0 },
      '12': { career: 7, control: 0, over: 0 },
      '13': { career: 2, control: 0, over: 0 }
    },
    labor: {
      '1': { career: 0, control: 0, over: 0 },
      '2': { career: 1, control: 0, over: 0 },
      '3': { career: 2, control: 0, over: 0 },
      '4': { career: 4, control: 0, over: 0 },
      '5': { career: 5, control: 0, over: 0 },
      'common': { career: 2, control: 0, over: 0 }
    }
  }
};

// Level mapping helpers
var CN_LEVEL_TO_KEY = {
  '三级': '3', '四级': '4', '五级': '5', '六级': '6', '七级': '7',
  '八级': '8', '九级': '9', '十级': '10', '十一级': '11', '十二级': '12', '十三级': '13',
  '一级': '1', '二级': '2', '普通工': 'common'
};
var KEY_TO_CN_LEVEL = {
  '3': '三级', '4': '四级', '5': '五级', '6': '六级', '7': '七级',
  '8': '八级', '9': '九级', '10': '十级', '11': '十一级', '12': '十二级', '13': '十三级',
  '1': '一级', '2': '二级', 'common': '普通工'
};
var MGMT_GRADE_LABELS_FULL = { '4': '四级', '5': '五级', '6': '六级', '7': '七级', '8': '八级', '9': '九级', '10': '十级' };
var MGMT_GRADES_SUMMARY = ['4', '5', '6', '7', '8', '9', '10'];
var PROF_LABELS_FLAT = { '3': '三级', '4': '四级', '5': '五级', '6': '六级', '7': '七级', '8': '八级', '9': '九级', '10': '十级', '11': '十一级', '12': '十二级', '13': '十三级' };
var PROF_SUMMARY = ['3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];
var LABOR_GRADE_LABELS = { '1': '一级', '2': '二级', '3': '三级', '4': '四级', '5': '五级', 'common': '普通工' };
var LABOR_SUMMARY = ['1', '2', '3', '4', '5', 'common'];

function getEmployedVal(schoolName, category, grade, subType) {
  var school = POST_EMPLOYED_DATA[schoolName];
  if (!school) return 0;
  var cat = school[category];
  if (!cat) return 0;
  var gd = cat[grade];
  if (!gd) return 0;
  if (subType === 'total') return (gd.career || 0) + (gd.control || 0) + (gd.over || 0);
  return gd[subType] || 0;
}

function parseCategoryFromPost(currentPost) {
  if (!currentPost) return { category: 'prof', label: '专业技术岗位' };
  if (currentPost.indexOf('管理') >= 0) return { category: 'mgmt', label: '管理岗位' };
  if (currentPost.indexOf('工勤') >= 0) return { category: 'labor', label: '工勤技能岗位' };
  return { category: 'prof', label: '专业技术岗位' };
}

function levelToKey(level) {
  if (!level) return '';
  return CN_LEVEL_TO_KEY[level] || level;
}

function getCategoryLabel(catKey) {
  if (catKey === 'mgmt' || catKey === 'manage') return '管理岗位';
  if (catKey === 'labor' || catKey === 'skill') return '工勤技能岗位';
  if (catKey === 'prof' || catKey === 'professional') return '专业技术岗位';
  return '专业技术岗位';
}

function getCategoryPrefix(currentPost) {
  if (!currentPost) return '专业技术岗位';
  if (currentPost.indexOf('管理') >= 0) return '管理岗位';
  if (currentPost.indexOf('工勤') >= 0) return '工勤技能岗位';
  return '专业技术岗位';
}

var CURRENT_SCHOOL = '柳州市第八中学';
var currentRole = 'school';
var selectedBatchId = null;
var currentStatusFilter = 'all';
var currentYearFilter = 'all';
var searchQuery = '';

// ===== DATA LAYER =====
function loadBatches() {
  var s = localStorage.getItem('promote_batches');
  if (s) {
    try {
      var data = JSON.parse(s);
      DEMO_BATCHES.forEach(function(db) {
        var existing = data.filter(function(b) { return b.id === db.id; });
        if (existing.length > 0) {
          existing.forEach(function(eb) { eb.status = db.status; });
        } else {
          data.push(JSON.parse(JSON.stringify(db)));
        }
      });
      return data;
    } catch(e) {}
  }
  localStorage.setItem('promote_batches', JSON.stringify(DEMO_BATCHES));
  return JSON.parse(JSON.stringify(DEMO_BATCHES));
}
function saveBatches(batches) { localStorage.setItem('promote_batches', JSON.stringify(batches)); }

function loadRecords() {
  var s = localStorage.getItem('promote_records');
  if (s) { try { return JSON.parse(s); } catch(e) {} }
  localStorage.setItem('promote_records', JSON.stringify(DEMO_RECORDS));
  return JSON.parse(JSON.stringify(DEMO_RECORDS));
}
function saveRecords(r) { localStorage.setItem('promote_records', JSON.stringify(r)); }

function resetDemoData() {
  localStorage.removeItem('promote_records');
  localStorage.removeItem('promote_batches');
  location.reload();
}

// ===== UI HELPERS =====
function showToast(msg, type) { var el = document.createElement('div'); el.className = 'toast ' + (type||''); el.textContent = msg; document.getElementById('toastContainer').appendChild(el); setTimeout(function(){el.remove();}, 2000); }
function escapeHtml(str) { if (!str) return ''; return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;'); }
function toggleUserMenu() { document.getElementById('userDropdown').classList.toggle('show'); }
document.addEventListener('click', function(e) { if (!e.target.closest('.topnav-user')) document.getElementById('userDropdown').classList.remove('show'); });
function toggleSidebar() { document.getElementById('sidebar').classList.toggle('collapsed'); }
function openModal(html, extraClass) {
  var modalEl = document.getElementById('modalContent');
  modalEl.innerHTML = html;
  modalEl.className = 'modal' + (extraClass ? ' ' + extraClass : '');
  document.getElementById('modalOverlay').classList.add('show');
}
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('show');
  document.getElementById('modalContent').className = 'modal';
}
document.getElementById('modalOverlay').addEventListener('click', function(e) { if (e.target === this) closeModal(); });

function switchRole(role) {
  if (role === 'school') return;
  if (role === 'district') { window.location.href = 'promote-list-admin.html?role=district'; }
  else if (role === 'city') { window.location.href = 'promote-list-admin.html?role=city'; }
  else if (role === 'teacher') { window.location.href = 'promote-list-teacher.html'; }
}

// ===== SIDEBAR =====
function renderSidebar() {
  var roleData = ROLES[currentRole]; if (!roleData) return;
  var s = roleData.sidebar, html = '';
  (s.top||[]).forEach(function(i) { html += '<a class="menu-item' + (i.id==='promote'?' active':'') + '" onclick="sidebarClick(this,\'' + i.id + '\')">' + (ICONS[i.icon]||'') + '<span class="menu-label">' + i.label + '</span></a>'; });
  (s.groups||[]).forEach(function(g) { html += '<div class="menu-group">' + g.name + '</div>'; g.items.forEach(function(i) { html += '<a class="menu-item' + (i.id==='promote'?' active':'') + '" onclick="sidebarClick(this,\'' + i.id + '\')">' + (ICONS[MENU_ICONS[i.id]||'file']) + '<span class="menu-label">' + i.label + '</span>' + (i.badge?'<span class="menu-badge">'+i.badge+'</span>':'') + '</a>'; }); });
  document.getElementById('sidebarMenu').innerHTML = html;
  document.querySelectorAll('.role-switch-btn').forEach(function(b){ b.classList.toggle('active', b.dataset.role===currentRole); });
  var n = document.querySelector('.topnav-user span'); if(n) n.textContent = roleData.name;
  var a = document.querySelector('.topnav-user .avatar'); if(a) a.textContent = roleData.short;
}

function sidebarClick(el, id) {
  document.querySelectorAll('.sidebar-menu .menu-item').forEach(function(i){i.classList.remove('active');}); el.classList.add('active');
  if (id==='workbench') { window.location.href='workbench.html'; return; }
  if (id==='postset') { window.location.href='post-list-school.html'; return; }
  if (id==='entry') { window.location.href='教师入编管理（学校管理员视角）.html'; return; }
  if (id==='exit') { window.location.href='教师出编管理（学校管理员视角）.html'; return; }
  if (id==='staffing') { window.location.href='staffing-application.html'; return; }
  if (id==='promote') return;
  if (id==='recruit') { window.location.href='recruit-list-school.html'; return; }
  showToast('跳转至：' + (el.querySelector('.menu-label')?el.querySelector('.menu-label').textContent:id));
}

// ===== DATA HELPERS =====
function getSchoolBatches() {
  return loadBatches().filter(function(b) {
    return b.schoolName === CURRENT_SCHOOL;
  });
}

function getSchoolRecords() {
  var records = loadRecords();
  return records.filter(function(r) { return r.schoolName === CURRENT_SCHOOL; });
}

function getBatchStats(batchId) {
  var records = getSchoolRecords().filter(function(r) { return r.batchId === batchId; });
  return {
    total: records.length,
    pending: records.filter(function(r) { return r.status === 'pending_first' || r.status === 'pending_second' || r.status === 'pending_third'; }).length,
    approved: records.filter(function(r) { return r.status === 'first_approved' || r.status === 'second_approved' || r.status === 'completed'; }).length,
    rejected: records.filter(function(r) { return r.status === 'first_rejected' || r.status === 'second_rejected' || r.status === 'third_rejected'; }).length
  };
}

function getFilteredRecords() {
  var records = getSchoolRecords();
  if (selectedBatchId) {
    records = records.filter(function(r) { return r.batchId === selectedBatchId; });
  }
  if (currentStatusFilter === 'pending') records = records.filter(function(r) { return r.status === 'pending_first' || r.status === 'pending_second' || r.status === 'pending_third'; });
  else if (currentStatusFilter === 'approved') records = records.filter(function(r) { return r.status === 'first_approved' || r.status === 'second_approved' || r.status === 'completed'; });
  else if (currentStatusFilter === 'rejected') records = records.filter(function(r) { return r.status === 'first_rejected' || r.status === 'second_rejected' || r.status === 'third_rejected'; });
  if (searchQuery) {
    var q = searchQuery.toLowerCase();
    records = records.filter(function(r) { return (r.teacherName||'').toLowerCase().indexOf(q) >= 0 || (r.currentPost||'').toLowerCase().indexOf(q) >= 0; });
  }
  return records;
}

function getStatusBadgeClass(status) {
  if (status === 'pending_first' || status === 'pending_second' || status === 'pending_third') return 'review';
  if (status === 'first_approved') return 'pending';
  if (status === 'second_approved') return 'approved';
  if (status === 'first_rejected' || status === 'second_rejected' || status === 'third_rejected') return 'rejected';
  if (status === 'completed') return 'completed';
  return 'pending';
}

// ===== RENDER BATCH CARDS =====
function renderBatchCards() {
  var batches = getSchoolBatches();
  if (currentYearFilter !== 'all') {
    batches = batches.filter(function(b) { return b.year === currentYearFilter; });
  }
  if (batches.length === 0) {
    return '<div class="empty-state"><div class="empty-icon">📋</div><div class="empty-text">暂无可用的晋升批次</div></div>';
  }
  var h = '<div class="batch-list">';
  batches.forEach(function(b) {
    var stats = getBatchStats(b.id);
    var isSelected = b.id === selectedBatchId;
    var pendingPct = stats.total > 0 ? Math.round(stats.pending / stats.total * 100) : 0;
    var approvedPct = stats.total > 0 ? Math.round(stats.approved / stats.total * 100) : 0;
    var rejectedPct = stats.total > 0 ? Math.round(stats.rejected / stats.total * 100) : 0;

    h += '<div class="batch-card' + (isSelected ? ' selected' : '') + '" onclick="selectBatch(\'' + b.id + '\')">';
    h += '<div class="batch-card-header">';
    h += '<span class="batch-card-name" onclick="event.stopPropagation();showBatchDetail(\'' + b.id + '\')" title="点击查看批次详情">' + b.name + '</span>';
    h += '<span class="batch-card-status ' + b.status + '">' + ({ pending: '未开始', open: '进行中', closed: '已关闭' })[b.status] || b.status + '</span>';
    h += '</div>';
    h += '<div class="batch-card-meta">';
    h += '<span>📅 ' + b.startTime + ' ~ ' + b.endTime + '</span>';
    h += '</div>';
    h += '<div class="batch-card-progress">';
    h += '<div class="batch-card-progress-text">待审核 ' + stats.pending + ' | 已通过 ' + stats.approved + ' | 已驳回 ' + stats.rejected + '</div>';
    h += '<div class="progress-bar">';
    if (approvedPct > 0) h += '<div class="progress-fill completed" style="width:' + approvedPct + '%"></div>';
    if (pendingPct > 0) h += '<div class="progress-fill reviewing" style="width:' + pendingPct + '%"></div>';
    if (rejectedPct > 0) h += '<div class="progress-fill warning" style="width:' + rejectedPct + '%"></div>';
    h += '</div></div>';
        if (b.status === 'pending') {
      h += '<div class="batch-card-actions">';
      h += '<button class="batch-card-action-btn" onclick="event.stopPropagation();showEditModal(\'' + b.id + '\')">编辑</button>';
      h += '<button class="batch-card-action-btn" onclick="event.stopPropagation();startBatch(\'' + b.id + '\')" style="color:var(--success)">开启</button>';
      h += '<button class="batch-card-action-btn danger" onclick="event.stopPropagation();deleteBatch(\'' + b.id + '\')">删除</button>';
      h += '</div>';
    } else if (b.status === 'open') {
      h += '<div class="batch-card-actions">';
      h += '<button class="batch-card-action-btn" onclick="event.stopPropagation();showEditModal(\'' + b.id + '\')">编辑</button>';
      h += '<button class="batch-card-action-btn danger" onclick="event.stopPropagation();closeBatch(\'' + b.id + '\')">关闭</button>';
      h += '</div>';
    } else if (b.status === 'closed') {
      h += '<div class="batch-card-actions">';
      h += '<button class="batch-card-action-btn" onclick="event.stopPropagation();showEditModal(\'' + b.id + '\')">编辑</button>';
      h += '</div>';
    }    h += '</div>';
  });
  h += '</div>';
  return h;
}

// ===== RENDER RIGHT COLUMN =====
function renderRightColumn() {
  var allRecords = getSchoolRecords();
  if (selectedBatchId) {
    allRecords = allRecords.filter(function(r) { return r.batchId === selectedBatchId; });
  }
  var counts = {
    all: allRecords.length,
    pending: allRecords.filter(function(r) { return r.status === 'pending_first' || r.status === 'pending_second' || r.status === 'pending_third'; }).length,
    approved: allRecords.filter(function(r) { return r.status === 'first_approved' || r.status === 'second_approved' || r.status === 'completed'; }).length,
    rejected: allRecords.filter(function(r) { return r.status === 'first_rejected' || r.status === 'second_rejected' || r.status === 'third_rejected'; }).length
  };

  var batchLabel = selectedBatchId ? getSchoolBatches().find(function(b){return b.id===selectedBatchId;}) : null;
  var h = '<div class="col-right-header"><span class="section-title">' + (batchLabel ? batchLabel.name : '申报记录') + '</span></div>';

  // Require batch selection
  if (!selectedBatchId) {
    h += '<div class="table-card"><div class="empty-state"><div class="empty-icon">📋</div><div class="empty-text">请先选择左侧批次查看申报记录</div></div></div>';
    document.getElementById('mainContent').innerHTML = '<div class="two-col-row"><div class="col-left"><div class="col-left-header"><span class="section-title">可审核批次</span></div>' + renderBatchCards() + '</div><div class="col-right">' + h + '</div></div>';
    return;
  }

  // Status pills
  h += '<div class="status-filters">';
  var filters = [
    { key: 'all', label: '全部 (' + counts.all + ')' },
    { key: 'pending', label: '待审核 (' + counts.pending + ')' },
    { key: 'approved', label: '已通过 (' + counts.approved + ')' },
    { key: 'rejected', label: '已驳回 (' + counts.rejected + ')' }
  ];
  filters.forEach(function(f) {
    h += '<button class="status-fbtn' + (currentStatusFilter===f.key?' active':'') + '" onclick="setStatusFilter(\'' + f.key + '\')">' + f.label + '</button>';
  });
  h += '</div>';

  // Search
  h += '<div class="filter-bar"><input type="text" placeholder="搜索姓名/现聘岗位..." value="' + (searchQuery||'') + '" oninput="searchQuery=this.value;renderMain()"></div>';

  // Table
  var records = getFilteredRecords();
  if (records.length === 0) {
    h += '<div class="table-card"><div class="empty-state"><div class="empty-icon">📋</div><div class="empty-text">暂无匹配的申报记录</div></div></div>';
  } else {
    var batches = loadBatches();
    var batchMap = {};
    batches.forEach(function(b) { batchMap[b.id] = b; });
    var hasFirstApproved = records.some(function(r) { return r.status === 'first_approved'; });
    h += '<div class="table-card"><div class="table-scroll"><table class="list-table"><thead>';
    h += '<tr>';
    if (hasFirstApproved) h += '<th class="col-cb sticky-left" style="left:0"><input type="checkbox" class="select-all-cb" onchange="toggleSelectAll(this)" title="全选待提交记录"></th>';
    h += '<th class="col-seq sticky-left" style="left:' + (hasFirstApproved ? 36 : 0) + 'px">序号</th>';
    h += '<th class="cell-name">姓名</th>';
    h += '<th class="cell-gender">性别</th>';
    h += '<th class="cell-ethnicity">民族</th>';
    h += '<th class="cell-birth">出生年月</th>';
    h += '<th class="cell-work-start">参加工作时间</th>';
    h += '<th class="cell-edu">学历</th>';
    h += '<th class="cell-grad-time">毕业时间</th>';
    h += '<th class="cell-current-post">现聘岗位（职务）</th>';
    h += '<th class="cell-appoint-time">现聘岗位时间</th>';
    h += '<th class="cell-target-post">拟聘岗位的类别等级（职务）</th>';
    h += '<th class="cell-transfer-type">晋升类型</th>';
    h += '<th class="cell-status sticky-right-2" style="right:84px">状态</th>';
    h += '<th class="cell-action sticky-right" style="right:0">操作</th>';
    h += '</tr></thead><tbody>';
    var idx = 1;
    records.forEach(function(r) {
      var batch = batchMap[r.batchId] || {};
      var targetPostLabel = (CATEGORY_MAP[batch.category] || '') + r.targetLevel;
      var remarkText = r.remark || r.firstRejectReason || r.secondRejectReason || '';
      var cbLeft = hasFirstApproved ? 36 : 0;
      h += '<tr>';
      if (hasFirstApproved) {
        if (r.status === 'first_approved') {
          h += '<td class="col-cb sticky-left" style="left:0"><input type="checkbox" class="record-cb" value="' + r.id + '" onchange="updateBatchBar()"></td>';
        } else {
          h += '<td class="col-cb sticky-left" style="left:0"></td>';
        }
      }
      h += '<td class="col-seq sticky-left" style="left:' + cbLeft + 'px">' + idx + '</td>';
      h += '<td class="cell-name"><strong>' + (r.teacherName||'—') + '</strong></td>';
      h += '<td class="cell-gender">' + (r.gender||'—') + '</td>';
      h += '<td class="cell-ethnicity">' + (r.ethnicity||'—') + '</td>';
      h += '<td class="cell-birth">' + (r.birthDate||'—') + '</td>';
      h += '<td class="cell-work-start">' + (r.workStartTime||'—') + '</td>';
      h += '<td class="cell-edu">' + (r.education||'—') + '</td>';
      h += '<td class="cell-grad-time">' + (r.graduateTime||'—') + '</td>';
      h += '<td class="cell-current-post">' + (r.currentPost||'—') + '</td>';
      h += '<td class="cell-appoint-time">' + (r.appointTime||'—') + '</td>';
      h += '<td class="cell-target-post">' + (targetPostLabel||'—') + '</td>';
      h += '<td class="cell-transfer-type">' + (r.transferType === 'transfer' ? '转岗' : '晋升') + '</td>';
      var cls = getStatusBadgeClass(r.status);
      h += '<td class="cell-status sticky-right-2" style="right:84px"><span class="status-badge ' + cls + '">' + (STATUS_LABEL_MAP[r.status]||r.status) + '</span></td>';
      h += '<td class="cell-action sticky-right" style="right:0">' + getActionLinks(r) + '</td>';
      h += '</tr>';
      idx++;
    });
    h += '</tbody></table></div>';
    // Batch bar
    if (hasFirstApproved) {
      h += '<div class="batch-bar" id="batchBar"><div class="batch-count">已选 <strong id="selectedCount">0</strong> 条待提交记录</div><button class="btn btn-primary" id="batchSubmitBtn" disabled onclick="showBatchSubmitModal()">请勾选待提交记录</button></div>';
    }
    h += '</div>';
  }
  return h;
}

function getActionLinks(record) {
  var s = record.status;
  var h = '<div class="action-links">';
  if (s === 'pending_first') {
    h += '<a class="action-link" onclick="auditRecord(\'' + record.id + '\')">审核</a>';
  } else if (s === 'second_rejected') {
    h += '<a class="action-link" onclick="modifyRecord(\'' + record.id + '\')">修改</a>';
    h += '<a class="action-link warn" onclick="rejectToTeacher(\'' + record.id + '\')">驳回教师</a>';
  } else if (s === 'second_approved') {
    h += '<a class="action-link" onclick="enterHrResult(\'' + record.id + '\')">录入人社结果</a>';
  } else {
    h += '<a class="action-link" onclick="viewDetail(\'' + record.id + '\')">查看</a>';
  }
  h += '</div>';
  return h;
}

// ===== SCHOOL SWITCHER =====
function getAvailableSchools() {
  var records = loadRecords();
  var schools = [];
  var seen = {};
  records.forEach(function(r) {
    var name = r.schoolName || '';
    if (name && !seen[name]) { seen[name] = true; schools.push(name); }
  });
  return schools;
}

function initSchoolSelect() {
  var sel = document.getElementById('schoolSelect');
  if (!sel) return;
  var schools = getAvailableSchools();
  sel.innerHTML = '';
  schools.forEach(function(s) {
    var opt = document.createElement('option');
    opt.value = s; opt.textContent = s;
    if (s === CURRENT_SCHOOL) opt.selected = true;
    sel.appendChild(opt);
  });
  if (schools.length === 0) {
    var opt = document.createElement('option');
    opt.value = CURRENT_SCHOOL; opt.textContent = CURRENT_SCHOOL; opt.selected = true;
    sel.appendChild(opt);
  }
}

function switchSchool(schoolName) {
  CURRENT_SCHOOL = schoolName;
  selectedBatchId = null;
  currentStatusFilter = 'all';
  currentYearFilter = 'all';
  searchQuery = '';
  renderMain();
}

// ===== RENDER MAIN =====
function renderMain() {
  // Auto-select latest open batch
  if (!selectedBatchId) {
    var openBatches = getSchoolBatches().filter(function(b) { return b.status === 'open'; });
    if (openBatches.length > 0) {
      openBatches.sort(function(a, b) { return (b.startTime || '').localeCompare(a.startTime || ''); });
      selectedBatchId = openBatches[0].id;
    }
  }
  initSchoolSelect();
  var h = '<div class="two-col-row">';
  h += '<div class="col-left">';
  h += '<div class="col-left-header"><span class="section-title">晋升批次</span><button class="btn btn-primary btn-sm" onclick="showCreateModal()" style="margin-left:auto">+ 创建批次</button></div>';
  h += '<div style="margin-bottom:10px"><select class="year-filter-select" onchange="setYearFilter(this.value)"><option value="all"' + (currentYearFilter==='all'?' selected':'') + '>全部年度</option><option value="2024"' + (currentYearFilter==='2024'?' selected':'') + '>2024</option><option value="2025"' + (currentYearFilter==='2025'?' selected':'') + '>2025</option><option value="2026"' + (currentYearFilter==='2026'?' selected':'') + '>2026</option><option value="2027"' + (currentYearFilter==='2027'?' selected':'') + '>2027</option></select></div>';
  h += renderBatchCards();
  h += '</div>';
  h += '<div class="col-right">';
  h += renderRightColumn();
  h += '</div>';
  h += '</div>';
  document.getElementById('mainContent').innerHTML = h;
}

// ===== INTERACTIONS =====
function selectBatch(id) {
  if (selectedBatchId !== id) { selectedBatchId = id; }
  currentStatusFilter = 'all';
  searchQuery = '';
  renderMain();
}

function setStatusFilter(f) { currentStatusFilter = f; renderMain(); }

function showBatchDetail(batchId) {
  var batches = loadBatches();
  var batch = null;
  for (var i = 0; i < batches.length; i++) { if (batches[i].id === batchId) { batch = batches[i]; break; } }
  if (!batch) return;
  var stats = getBatchStats(batchId);
  var typeLabels = (batch.promoteTypes && batch.promoteTypes.length ? batch.promoteTypes : (batch.category ? [batch.category] : [])).map(function(t) { return getCategoryLabel(t); });
  var h = '<div class="modal-header"><h3>批次详情</h3><button class="modal-close" onclick="closeModal()">✕</button></div>';
  h += '<div class="modal-body">';
  h += '<table class="detail-table"><tbody>';
  h += '<tr><td class="dt-label">批次名称</td><td>' + batch.name + '</td></tr>';
  h += '<tr><td class="dt-label">批次编号</td><td>' + batch.id + '</td></tr>';
  h += '<tr><td class="dt-label">晋升类别</td><td>' + (typeLabels.length > 0 ? typeLabels.join('、') : '—') + '</td></tr>';
  h += '<tr><td class="dt-label">年度</td><td>' + (batch.year || '—') + '</td></tr>';
  h += '<tr><td class="dt-label">申报时间</td><td>' + batch.startTime + ' ~ ' + batch.endTime + '</td></tr>';
  h += '<tr><td class="dt-label">备注说明</td><td>' + (batch.remark || '—') + '</td></tr>';
  h += '</tbody></table>';
  h += '<div style="margin-top:16px"><strong style="font-size:13px">申报统计</strong></div>';
  h += '<table class="detail-table" style="margin-top:8px"><tbody>';
  if (stats.pending > 0) h += '<tr><td class="dt-label">待审核</td><td>' + stats.pending + '</td></tr>';
  if (stats.approved > 0) h += '<tr><td class="dt-label">已通过</td><td>' + stats.approved + '</td></tr>';
  if (stats.rejected > 0) h += '<tr><td class="dt-label">已驳回</td><td>' + stats.rejected + '</td></tr>';
  h += '<tr style="border-top:2px solid var(--border)"><td class="dt-label"><strong>合计</strong></td><td><strong>' + stats.total + '</strong></td></tr>';
  h += '</tbody></table>';
  h += '</div>';
  h += '<div class="modal-footer"><button class="btn-outline" onclick="closeModal()">关闭</button></div>';
  openModal(h);
}

function toggleSelectAll(el) {
  var cbs = document.querySelectorAll('.record-cb');
  cbs.forEach(function(cb) { cb.checked = el.checked; });
  updateBatchBar();
}

function updateBatchBar() {
  var cbs = document.querySelectorAll('.record-cb:checked');
  var cnt = document.getElementById('selectedCount');
  var btn = document.getElementById('batchSubmitBtn');
  var allCb = document.querySelector('.select-all-cb');
  if (cnt) cnt.textContent = cbs.length;
  if (btn) {
    if (cbs.length > 0) {
      btn.disabled = false;
      btn.textContent = '批量提交至主管部门（已选 ' + cbs.length + ' 条）';
    } else {
      btn.disabled = true;
      btn.textContent = '请勾选待提交记录';
    }
  }
  if (allCb) {
    var allRecords = document.querySelectorAll('.record-cb');
    allCb.checked = allRecords.length > 0 && cbs.length === allRecords.length;
  }
}

// ===== BATCH SUBMIT MODAL =====
function renderSubmitPersonTable(selected) {
  var h = '<div class="section-subtitle" style="font-size:13px;font-weight:600;color:var(--text);margin-bottom:8px;">待提交人员清单（' + selected.length + ' 人）</div>';
  h += '<table class="submit-person-table"><thead><tr>';
  h += '<th>序号</th><th>姓名</th><th>晋升类型</th><th>现聘岗位类别等级</th><th>拟聘岗位类别等级</th>';
  h += '</tr></thead><tbody>';
  selected.forEach(function(r, idx) {
    var isTransfer = r.transferType === 'transfer';
    var promoLabel = isTransfer ? '转岗' : '晋升';
    var promoCls = isTransfer ? 'transfer' : 'promote';
    var srcPost = r.currentPost || '—';
    var tgtCatPrefix = getCategoryPrefix(r.currentPost);
    if (isTransfer && r._targetCategory) {
      tgtCatPrefix = getCategoryLabelFromRaw(r._targetCategory);
    }
    var tgtLabel = tgtCatPrefix + (r.targetLevel || '—');
    h += '<tr>';
    h += '<td>' + (idx + 1) + '</td>';
    h += '<td><strong>' + escapeHtml(r.teacherName) + '</strong></td>';
    h += '<td><span class="type-tag ' + promoCls + '">' + promoLabel + '</span></td>';
    h += '<td>' + escapeHtml(srcPost) + '</td>';
    h += '<td>' + escapeHtml(tgtLabel) + '</td>';
    h += '</tr>';
  });
  h += '</tbody></table>';
  return h;
}

function getCategoryLabelFromRaw(catStr) {
  if (!catStr) return '专业技术岗位';
  if (catStr === 'mgmt' || catStr.indexOf('管理') >= 0) return '管理岗位';
  if (catStr === 'labor' || catStr.indexOf('工勤') >= 0) return '工勤技能岗位';
  return '专业技术岗位';
}

function computeSubmitChanges(schoolName, selected) {
  var deltas = { mgmt: {}, prof: {}, labor: {} };
  var notes = { mgmt: {}, prof: {}, labor: {} };
  var allGrades = { mgmt: MGMT_GRADES_SUMMARY, prof: PROF_SUMMARY, labor: LABOR_SUMMARY };
  ['mgmt', 'prof', 'labor'].forEach(function(cat) {
    allGrades[cat].forEach(function(g) {
      deltas[cat][g] = { total: 0, career: 0, control: 0, over: 0 };
      notes[cat][g] = [];
    });
  });
  selected.forEach(function(r) {
    var src = parseCategoryFromPost(r.currentPost);
    var srcGrade = levelToKey(r.fromLevel);
    var tgtCat = src.category;
    if (r.transferType === 'transfer' && r._targetCategory) {
      if (r._targetCategory === 'mgmt' || r._targetCategory.indexOf('管理') >= 0) tgtCat = 'mgmt';
      else if (r._targetCategory === 'labor' || r._targetCategory.indexOf('工勤') >= 0) tgtCat = 'labor';
      else tgtCat = 'prof';
    }
    var tgtGrade = levelToKey(r.targetLevel);
    var promoType = r.transferType === 'transfer' ? '转岗' : '晋升';
    var staffType = r._staffType || 'career';
    var srcCatLabel = getCategoryLabel(src.category);
    var tgtCatLabel = getCategoryLabel(tgtCat);
    if (srcGrade && deltas[src.category] && deltas[src.category][srcGrade]) {
      deltas[src.category][srcGrade].total -= 1;
      deltas[src.category][srcGrade][staffType] -= 1;
      notes[src.category][srcGrade].push({ name: r.teacherName, type: 'down', promoType: promoType, detail: '→ ' + tgtCatLabel + (r.targetLevel || '') });
    }
    if (tgtGrade && deltas[tgtCat] && deltas[tgtCat][tgtGrade]) {
      deltas[tgtCat][tgtGrade].total += 1;
      deltas[tgtCat][tgtGrade][staffType] += 1;
      notes[tgtCat][tgtGrade].push({ name: r.teacherName, type: 'up', promoType: promoType, detail: '← ' + srcCatLabel + (r.fromLevel || '') });
    }
  });
  return { deltas: deltas, notes: notes };
}

function getQuotaForSchool(schoolName) {
  var postRecords = [];
  try { postRecords = JSON.parse(localStorage.getItem('post_records') || 'null') || []; } catch(e) {}
  var quota = null;
  postRecords.forEach(function(r) {
    if (r.schoolName === schoolName && (r.status === 'completed' || r.status === 'second_review' || r.status === 'first_approved')) {
      quota = r;
    }
  });
  return quota;
}

function renderSubmitSummary(schoolName, selected) {
  var employed = POST_EMPLOYED_DATA[schoolName];
  if (!employed) {
    return '<div class="modal-summary-section"><div class="section-subtitle">岗位聘用汇总表 — ' + escapeHtml(schoolName) + '</div><div style="text-align:center;color:var(--text-light);padding:16px;font-size:12px;">暂无该学校的聘用数据</div></div>';
  }
  var changes = computeSubmitChanges(schoolName, selected);
  var deltas = changes.deltas;
  var noteData = changes.notes;
  var quota = getQuotaForSchool(schoolName);
  var sections = [
    { cat: 'mgmt', title: '管理岗位', grades: MGMT_GRADES_SUMMARY, labels: MGMT_GRADE_LABELS_FULL, hasHighland: false },
    { cat: 'prof', title: '专业技术岗位', grades: PROF_SUMMARY, labels: PROF_LABELS_FLAT, hasHighland: true },
    { cat: 'labor', title: '工勤技能岗位', grades: LABOR_SUMMARY, labels: LABOR_GRADE_LABELS, hasHighland: false }
  ];

  function getQuotaVal(cat, g) {
    if (!quota) return 0;
    if (cat === 'mgmt') return (quota.mgmtLevels && quota.mgmtLevels[g]) || 0;
    if (cat === 'labor') return (quota.laborLevels && quota.laborLevels[g]) || 0;
    if (cat === 'prof' && quota.profLevels) {
      var v = 0;
      ['senior','vice','middle','junior'].forEach(function(layer) {
        if (quota.profLevels[layer] && quota.profLevels[layer].levels && quota.profLevels[layer].levels[g]) {
          v = quota.profLevels[layer].levels[g];
        }
      });
      return v;
    }
    return 0;
  }

  function cellWithDelta(cat, g, subKey) {
    var current = getEmployedVal(schoolName, cat, g, subKey);
    var d = deltas[cat] && deltas[cat][g] ? (deltas[cat][g][subKey] || 0) : 0;
    var after = current + d;
    if (d === 0) {
      var zc = current === 0 ? ' data-zero' : '';
      return '<td class="' + zc + '">' + current + '</td>';
    }
    var dc = d > 0 ? ' up' : ' down';
    return '<td><span class="cv">' + current + '</span><span class="ar">→' + after + '</span><span class="dt' + dc + '">' + (d > 0 ? '+' : '') + d + '</span></td>';
  }

  function renderNoteCell(cat, selected) {
    var catLabel = getCategoryLabel(cat);
    var pathCounts = {};
    selected.forEach(function(r) {
      var src = parseCategoryFromPost(r.currentPost);
      if (src.category !== cat) return;
      var promoType = r.transferType === 'transfer' ? '转岗' : '晋升';
      var srcFull = getCategoryLabel(src.category) + (r.fromLevel || '');
      var tgtCatLabel = getCategoryLabel(src.category);
      if (r.transferType === 'transfer' && r._targetCategory) {
        tgtCatLabel = getCategoryLabelFromRaw(r._targetCategory);
      }
      var tgtFull = tgtCatLabel + (r.targetLevel || '');
      var path = srcFull + ' ' + promoType + ' → ' + tgtFull;
      pathCounts[path] = (pathCounts[path] || 0) + 1;
    });
    var lines = [];
    for (var path in pathCounts) {
      lines.push(path + '：' + pathCounts[path] + '人');
    }
    if (lines.length === 0) return '<div style="color:var(--text-light);font-size:10px;text-align:center;">—</div>';
    var h = '';
    lines.forEach(function(line) {
      h += '<div class="note-item">' + escapeHtml(line) + '</div>';
    });
    return h;
  }

  var h = '<div class="modal-summary-section">';
  h += '<div class="section-subtitle">岗位聘用汇总表 — ' + escapeHtml(schoolName) + '</div>';

  // Top summary row
  var careerTotal = 0, controlTotal = 0;
  ['mgmt','prof','labor'].forEach(function(c) {
    var gs = c === 'mgmt' ? MGMT_GRADES_SUMMARY : (c === 'labor' ? LABOR_SUMMARY : PROF_SUMMARY);
    gs.forEach(function(g) { careerTotal += getEmployedVal(schoolName, c, g, 'career'); controlTotal += getEmployedVal(schoolName, c, g, 'control'); });
  });
  var realTotal = careerTotal + controlTotal;
  h += '<table class="summary-top-table" style="width:100%;margin-bottom:12px;"><tr>';
  h += '<th>定编人数</th><td>实名编<b>' + (quota ? (quota.careerStaffQuota || 0) : '—') + '</b>+控制数<b>' + (quota ? (quota.authControlNo || 0) : '—') + '</b>（合计<b>' + (quota ? (quota.totalControlQuota || 0) : '—') + '</b>）</td>';
  h += '<th>实有人数</th><td>实名编<b>' + careerTotal + '</b>+控制数<b>' + controlTotal + '</b>（合计<b>' + realTotal + '</b>）</td>';
  h += '<th>小高地岗位</th><td><b>' + (quota ? (quota.highlandPosts || 0) : '—') + '</b></td>';
  h += '</tr></table>';

  function shortGrade(label) { return (label || '').replace('级', ''); }

  sections.forEach(function(sec) {
    var grades = sec.grades;
    var subRows = [
      { sub: '合计', key: 'total' },
      { sub: '实名编', key: 'career' },
      { sub: '控制数', key: 'control' },
      { sub: '超岗聘用数', key: 'over' }
    ];
    if (sec.cat === 'prof') {
      subRows.push({ sub: '小高地岗位', key: 'over' });
    }
    var nRows = 2 + subRows.length;
    h += '<table class="modal-summary-table"><tbody>';
    // Header row
    h += '<tr><td class="cat-title" rowspan="' + nRows + '">' + sec.title + '</td>';
    h += '<th>等级</th><th></th>';
    grades.forEach(function(g) { h += '<th>' + shortGrade(sec.labels[g] || g) + '</th>'; });
    h += '<th class="note-col">备注</th></tr>';
    // 核准岗位数 row
    h += '<tr><td class="row-label">核准岗位数</td><td></td>';
    grades.forEach(function(g) {
      var qv = getQuotaVal(sec.cat, g);
      h += '<td' + (qv === 0 ? ' class="data-zero"' : '') + '>' + (qv != null ? qv : '—') + '</td>';
    });
    h += '<td></td></tr>';
    // 实聘数 sub-rows
    var noteHtml = renderNoteCell(sec.cat, selected);
    subRows.forEach(function(sr, idx) {
      h += '<tr>';
      if (idx === 0) {
        h += '<td class="row-label" rowspan="' + subRows.length + '">实聘数</td>';
      }
      h += '<td class="row-label" style="font-weight:400;color:var(--text-light);">' + sr.sub + '</td>';
      grades.forEach(function(g) {
        h += cellWithDelta(sec.cat, g, sr.key);
      });
      if (idx === 0) {
        h += '<td class="note-col" rowspan="' + subRows.length + '">' + noteHtml + '</td>';
      }
      h += '</tr>';
    });
    h += '</tbody></table>';
  });
  h += '</div>';
  return h;
}

function renderSubmitWarning(schoolName, selected) {
  var quota = getQuotaForSchool(schoolName);
  if (!quota) return '';
  var changes = computeSubmitChanges(schoolName, selected);
  var deltas = changes.deltas;
  var warnings = [];
  var checkCat = function(cat, grades, getQuotaVal) {
    grades.forEach(function(g) {
      var current = getEmployedVal(schoolName, cat, g, 'total');
      var delta = deltas[cat] && deltas[cat][g] ? (deltas[cat][g].total || 0) : 0;
      var after = current + delta;
      var quotaVal = getQuotaVal(g);
      if (quotaVal > 0 && after > quotaVal) {
        var label = getCategoryLabel(cat);
        var gradeLabel = KEY_TO_CN_LEVEL[g] || g;
        warnings.push(label + gradeLabel + '：核准 ' + quotaVal + ' 人，提交后实聘 ' + after + ' 人，超岗 ' + (after - quotaVal) + ' 人');
      }
    });
  };
  checkCat('mgmt', MGMT_GRADES_SUMMARY, function(g) { return (quota.mgmtLevels && quota.mgmtLevels[g]) || 0; });
  checkCat('prof', PROF_SUMMARY, function(g) {
    var v = 0;
    if (!quota.profLevels) return 0;
    ['senior','vice','middle','junior'].forEach(function(layer) {
      if (quota.profLevels[layer] && quota.profLevels[layer].levels && quota.profLevels[layer].levels[g]) {
        v = quota.profLevels[layer].levels[g];
      }
    });
    return v;
  });
  checkCat('labor', LABOR_SUMMARY, function(g) { return (quota.laborLevels && quota.laborLevels[g]) || 0; });
  if (warnings.length === 0) return '';
  var h = '<div class="over-quota-warning"><div class="warn-title">⚠ 超岗警告</div>';
  warnings.forEach(function(w) { h += '<div class="warn-item">· ' + w + '</div>'; });
  h += '</div>';
  return h;
}

function showBatchSubmitModal() {
  var cbs = document.querySelectorAll('.record-cb:checked');
  if (cbs.length === 0) { showToast('请先勾选待提交的记录', 'warning'); return; }
  var ids = [];
  cbs.forEach(function(cb) { ids.push(cb.value); });
  var records = loadRecords();
  var selected = records.filter(function(r) { return ids.indexOf(r.id) >= 0; });
  var schoolName = CURRENT_SCHOOL;

  var c = '<div class="modal-header"><h3>批量提交确认</h3><button class="modal-close" onclick="closeModal()">×</button></div>';
  c += '<div class="modal-body">';
  c += '<p style="font-size:13px;color:var(--text-secondary);margin-bottom:12px;">确认将以下 <strong>' + selected.length + '</strong> 条记录提交至主管部门进行二审：</p>';
  try {
    c += renderSubmitPersonTable(selected);
    c += renderSubmitSummary(schoolName, selected);
    c += renderSubmitWarning(schoolName, selected);
  } catch(e) {
    c += '<div style="padding:12px;background:#FEF2F2;border-left:3px solid var(--danger);border-radius:6px;font-size:12px;color:#991B1B;">渲染汇总表出错：' + e.message + '，请刷新页面后重试</div>';
  }
  c += '</div>';
  c += '<div class="modal-footer"><button class="btn-cancel" onclick="closeModal()">取消</button><button class="btn btn-primary" onclick="doBatchSubmit()">确认提交</button></div>';
  openModal(c, 'modal-wide');
}

function doBatchSubmit() {
  var cbs = document.querySelectorAll('.record-cb:checked');
  var ids = [];
  cbs.forEach(function(cb) { ids.push(cb.value); });
  var records = loadRecords();
  var now = new Date().toISOString().replace('T',' ').substring(0,19);
  records.forEach(function(r) {
    if (ids.indexOf(r.id) >= 0 && r.status === 'first_approved') {
      r.status = 'pending_second';
      if (!r.timeline) r.timeline = [];
      r.timeline.push({ time: now, action: '学校批量提交至主管部门', operator: '王玉兰' });
    }
  });
  saveRecords(records);
  closeModal();
  showToast('已成功提交 ' + ids.length + ' 条记录', 'success');
  renderMain();
}

// ===== NAVIGATION =====
function auditRecord(id) { window.location.href = 'promote-audit-school.html?id=' + id; }
function modifyRecord(id) { window.location.href = 'promote-audit-school.html?id=' + id + '&mode=modify'; }
function enterHrResult(id) { window.location.href = 'promote-hr-entry.html?id=' + id; }
function viewDetail(id) { window.location.href = 'promote-detail.html?id=' + id; }
function rejectToTeacher(id) {
  var records = loadRecords();
  var r = records.find(function(x) { return x.id === id; });
  if (!r) return;
  r.status = 'first_rejected';
  r.firstRejectReason = '主管部门驳回后退回教师';
  saveRecords(records);
  showToast('已驳回至教师', 'success');
  renderMain();
}

// ===== YEAR FILTER =====
function setYearFilter(year) {
  currentYearFilter = year;
  selectedBatchId = null;
  currentStatusFilter = 'all';
  searchQuery = '';
  renderMain();
}

// ===== BATCH CRUD =====
function generateBatchId() {
  var now = new Date();
  var y = now.getFullYear();
  var m = ('0' + (now.getMonth() + 1)).slice(-2);
  var d = ('0' + now.getDate()).slice(-2);
  var rand = ('000' + Math.floor(Math.random() * 1000)).slice(-3);
  return 'PB' + y + m + d + rand;
}

function showCreateModal() {
  var h = '<div class="modal-header"><h3>创建晋升批次</h3><button class="modal-close" onclick="closeModal()">✕</button></div>';
  h += '<div class="modal-body">';
  h += '<div class="form-group"><label>批次名称<span class="required-star">*</span></label><input type="text" id="batchName" placeholder="请输入批次名称"></div>';
  h += '<div class="form-group"><label>年度<span class="required-star">*</span></label><select id="batchYear"><option value="2024">2024</option><option value="2025">2025</option><option value="2026" selected>2026</option><option value="2027">2027</option></select></div>';
  h += '<div class="form-group"><label>晋升类别<span class="required-star">*</span></label><div class="checkbox-group"><label class="checkbox-item"><input type="checkbox" value="manage" class="batch-category-cb"> 管理岗位</label><label class="checkbox-item"><input type="checkbox" value="professional" class="batch-category-cb" checked> 专业技术岗位</label><label class="checkbox-item"><input type="checkbox" value="skill" class="batch-category-cb"> 工勤技能岗位</label></div></div>';
  h += '<div class="form-group"><label>申报开始时间<span class="required-star">*</span></label><input type="date" id="batchStartTime"></div>';
  h += '<div class="form-group"><label>申报截止时间<span class="required-star">*</span></label><input type="date" id="batchEndTime"></div>';
  h += '<div class="form-group"><label>备注说明</label><textarea id="batchRemark" placeholder="选填"></textarea></div>';
  h += '</div>';
  h += '<div class="modal-footer"><button class="btn-cancel" onclick="closeModal()">取消</button><button class="btn btn-primary" onclick="saveBatch(null)">确认创建</button></div>';
  openModal(h);
}

function showEditModal(batchId) {
  var batches = loadBatches();
  var b = null;
  for (var i = 0; i < batches.length; i++) { if (batches[i].id === batchId) { b = batches[i]; break; } }
  if (!b) return;
  var cats = b.categories || [b.category] || [];
  var h = '<div class="modal-header"><h3>编辑晋升批次</h3><button class="modal-close" onclick="closeModal()">✕</button></div>';
  h += '<div class="modal-body">';
  h += '<div class="form-group"><label>批次名称<span class="required-star">*</span></label><input type="text" id="batchName" value="' + (b.name || '').replace(/"/g, '&quot;') + '"></div>';
  h += '<div class="form-group"><label>年度<span class="required-star">*</span></label><select id="batchYear"><option value="2024"' + (b.year==='2024'?' selected':'') + '>2024</option><option value="2025"' + (b.year==='2025'?' selected':'') + '>2025</option><option value="2026"' + (b.year==='2026'?' selected':'') + '>2026</option><option value="2027"' + (b.year==='2027'?' selected':'') + '>2027</option></select></div>';
  h += '<div class="form-group"><label>晋升类别<span class="required-star">*</span></label><div class="checkbox-group"><label class="checkbox-item"><input type="checkbox" value="manage" class="batch-category-cb"' + (cats.indexOf('manage')>=0?' checked':'') + '> 管理岗位</label><label class="checkbox-item"><input type="checkbox" value="professional" class="batch-category-cb"' + (cats.indexOf('professional')>=0?' checked':'') + '> 专业技术岗位</label><label class="checkbox-item"><input type="checkbox" value="skill" class="batch-category-cb"' + (cats.indexOf('skill')>=0?' checked':'') + '> 工勤技能岗位</label></div></div>';
  h += '<div class="form-group"><label>申报开始时间<span class="required-star">*</span></label><input type="date" id="batchStartTime" value="' + (b.startTime||'') + '"></div>';
  h += '<div class="form-group"><label>申报截止时间<span class="required-star">*</span></label><input type="date" id="batchEndTime" value="' + (b.endTime||'') + '"></div>';
  h += '<div class="form-group"><label>备注说明</label><textarea id="batchRemark">' + (b.remark||'') + '</textarea></div>';
  h += '</div>';
  h += '<div class="modal-footer"><button class="btn-cancel" onclick="closeModal()">取消</button><button class="btn btn-primary" onclick="saveBatch(\'' + batchId + '\')">保存修改</button></div>';
  openModal(h);
}

function saveBatch(editId) {
  var nameEl = document.getElementById('batchName');
  var yearEl = document.getElementById('batchYear');
  var startEl = document.getElementById('batchStartTime');
  var endEl = document.getElementById('batchEndTime');
  var remarkEl = document.getElementById('batchRemark');
  var cbs = document.querySelectorAll('.batch-category-cb:checked');
  if (!nameEl.value.trim()) { showToast('请输入批次名称', 'warning'); return; }
  if (cbs.length === 0) { showToast('请至少选择一个晋升类别', 'warning'); return; }
  if (!startEl.value) { showToast('请选择申报开始时间', 'warning'); return; }
  if (!endEl.value) { showToast('请选择申报截止时间', 'warning'); return; }
  if (startEl.value > endEl.value) { showToast('截止时间不能早于开始时间', 'warning'); return; }

  var categories = [];
  cbs.forEach(function(cb) { categories.push(cb.value); });
  var batches = loadBatches();

  if (editId) {
    // Update existing
    for (var i = 0; i < batches.length; i++) {
      if (batches[i].id === editId) {
        batches[i].name = nameEl.value.trim();
        batches[i].year = yearEl.value;
        batches[i].category = categories[0];
        batches[i].categories = categories;
        batches[i].startTime = startEl.value;
        batches[i].endTime = endEl.value;
        batches[i].remark = remarkEl ? remarkEl.value.trim() : '';
        break;
      }
    }
    saveBatches(batches);
    closeModal();
    showToast('批次已更新', 'success');
  } else {
    // Create new
    var newBatch = {
      id: generateBatchId(),
      name: nameEl.value.trim(),
      category: categories[0],
      categories: categories,
      year: yearEl.value,
      status: 'open',
      allowedLevels: [],
      startTime: startEl.value,
      endTime: endEl.value,
      scope: 'school',
      scopeAreas: [],
      schoolName: CURRENT_SCHOOL,
      createdBy: 'school',
      remark: remarkEl ? remarkEl.value.trim() : ''
    };
    batches.push(newBatch);
    saveBatches(batches);
    closeModal();
    showToast('批次已创建', 'success');
  }
  renderMain();
}

function closeBatch(id) {
  if (!confirm('确认关闭该批次？关闭后教师将无法继续提交申报。')) return;
  var batches = loadBatches();
  for (var i = 0; i < batches.length; i++) {
    if (batches[i].id === id) {
      batches[i].status = 'closed';
      break;
    }
  }
}

function startBatch(id) {
  var batches = loadBatches();
  var batch = batches.find(function(b) { return b.id === id; });
  if (!batch || batch.status !== 'pending') { showToast('只能开启未开始的批次', 'warning'); return; }

  var h = '<div style="padding:4px;">';
  h += '<h3 style="margin-bottom:16px;">开启批次</h3>';
  h += '<div style="margin-bottom:16px;padding:12px 16px;background:var(--bg);border-radius:6px;">';
  h += '<div style="font-size:13px;font-weight:600;margin-bottom:4px;">' + escapeHtml(batch.name) + '</div>';
  h += '<div style="font-size:12px;color:var(--text-secondary);">晋升类别：';
  (batch.promoteTypes || []).forEach(function(t) {
    h += '<span class="type-tag ' + t + '">' + (CATEGORY_MAP[t] || t) + '</span>';
  });
  h += '</div></div>';

  h += '<div class="form-group"><label>申报开始时间 <span style="color:var(--danger)">*</span></label>';
  h += '<input type="date" id="batchStartTime" value="' + escapeHtml(batch.startTime || '') + '"></div>';
  h += '<div class="form-group"><label>申报截止时间 <span style="color:var(--danger)">*</span></label>';
  h += '<input type="date" id="batchEndTime" value="' + escapeHtml(batch.endTime || '') + '"></div>';
  h += '<div class="form-group"><label>备注说明 <span style="color:var(--text-light);font-weight:400;">(选填)</span></label>';
  h += '<textarea id="batchRemark" placeholder="选填">' + escapeHtml(batch.remark || '') + '</textarea></div>';

  h += '<div class="modal-buttons" style="margin-top:20px;">';
  h += '<button class="btn-cancel" onclick="closeModal()">取消</button>';
  h += '<button class="btn-confirm success" onclick="doStartBatch(\'' + id + '\')">确认开启</button>';
  h += '</div></div>';

  openModal(h);
}

function doStartBatch(id) {
  var startTime = document.getElementById('batchStartTime').value;
  var endTime = document.getElementById('batchEndTime').value;
  var remark = document.getElementById('batchRemark').value.trim();
  if (!startTime || !endTime) { showToast('请填写申报时间', 'warning'); return; }
  if (startTime >= endTime) { showToast('截止时间必须晚于开始时间', 'warning'); return; }
  var batches = loadBatches();
  var batch = batches.find(function(b) { return b.id === id; });
  if (!batch || batch.status !== 'pending') { showToast('只能开启未开始的批次', 'warning'); closeModal(); return; }
  batch.startTime = startTime;
  batch.endTime = endTime;
  batch.remark = remark;
  batch.status = 'open';
  saveBatches(batches);
  closeModal();
  renderCards();
  showToast('批次已开启，教师可开始申报', 'success');
}

function deleteBatch(id) {
  if (!confirm('确认删除该批次？删除后不可恢复。')) return;
  var batches = loadBatches();
  var idx = batches.findIndex(function(b) { return b.id === id; });
  if (idx === -1 || batches[idx].status !== 'pending') { showToast('只能删除未开始的批次', 'warning'); return; }
  batches.splice(idx, 1);
  saveBatches(batches);
  renderCards();
  showToast('批次已删除', 'success');
}
  }
  saveBatches(batches);
  showToast('批次已关闭', 'success');
  renderMain();
}

// ===== INIT =====
function init() {
  renderSidebar();
  renderMain();
}
init();
