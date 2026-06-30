/**
 * 柳州教育人事管理平台 — 统一操作日志模块
 * 用法：<script src="../src/logger.js"></script> 之后调用 writeLog({...})
 * 存储键：operation_logs（localStorage），上限 5000 条，超出自动裁剪最早 1000 条
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'operation_logs';
  var MAX_COUNT = 5000;
  var TRIM_SIZE = 1000;

  // 模块枚举
  var MODULES = [
    'staffing', 'entry', 'exit', 'promote', 'post', 'recruit',
    'employ', 'retire', 'salary', 'ethics', 'honor',
    'org', 'account', 'perm', 'log', 'menu', 'system'
  ];

  // 操作类型枚举
  var ACTION_TYPES = [
    'login', 'logout', 'create', 'update', 'delete',
    'submit', 'approve', 'reject', 'revoke',
    'disable', 'enable', 'reset_pwd', 'export'
  ];

  function generateId() {
    return 'log_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 6);
  }

  function getOperatorInfo() {
    try {
      var raw = localStorage.getItem('currentUser');
      if (!raw) return null;
      var user = JSON.parse(raw);
      // 查找所属单位
      var orgName = '';
      var orgId = '';
      var orgDistrict = '';

      if (user.org) {
        orgName = user.org;
      }

      // 尝试从 org_directory 获取更准确的单位信息
      try {
        var orgsRaw = localStorage.getItem('org_directory');
        if (orgsRaw) {
          var orgs = JSON.parse(orgsRaw);
          // 按学校名匹配
          for (var i = 0; i < orgs.length; i++) {
            if (orgs[i].name === user.school || orgs[i].name === orgName) {
              orgId = orgs[i].orgId || '';
              orgDistrict = orgs[i].district || '';
              orgName = orgs[i].name || orgName;
              break;
            }
          }
          // 如果是教育局账号，按区域匹配
          if (!orgId && user.district) {
            for (var j = 0; j < orgs.length; j++) {
              if (orgs[j].district === user.district && orgs[j].orgType === '教育局') {
                orgId = orgs[j].orgId || '';
                orgDistrict = orgs[j].district || '';
                if (!orgName) orgName = orgs[j].name || '';
                break;
              }
            }
          }
        }
      } catch (e) { /* ignore */ }

      return {
        operatorId: user.id || '',
        operatorName: user.name || '',
        operatorRole: user.role || '',
        orgId: orgId,
        orgName: orgName || user.school || user.org || '',
        orgDistrict: orgDistrict || user.district || ''
      };
    } catch (e) {
      return null;
    }
  }

  /**
   * 写入操作日志
   * @param {Object} entry - 日志条目（以下字段由调用方提供，其余自动补全）
   *   module      {string} 功能模块（必填）
   *   actionType  {string} 操作类型（必填）
   *   targetType  {string} 操作对象类型
   *   targetId    {string} 操作对象ID
   *   targetName  {string} 操作对象名称
   *   detail      {string} 操作详情描述
   *   result      {string} 'success' | 'fail'（默认 success）
   *   failReason  {string} 失败原因（result=fail 时）
   */
  window.writeLog = function (entry) {
    if (!entry || !entry.module || !entry.actionType) {
      console.warn('[Logger] 缺少必填字段 module/actionType，日志未写入');
      return;
    }

    var operatorInfo = getOperatorInfo();
    if (!operatorInfo) {
      // 即使没有操作人信息也写入（可能在登录页调用）
      operatorInfo = { operatorId: '', operatorName: '', operatorRole: '', orgId: '', orgName: '', orgDistrict: '' };
    }

    var logEntry = {
      id: generateId(),
      operatorId: entry.operatorId || operatorInfo.operatorId,
      operatorName: entry.operatorName || operatorInfo.operatorName,
      operatorRole: entry.operatorRole || operatorInfo.operatorRole,
      orgId: entry.orgId || operatorInfo.orgId,
      orgName: entry.orgName || operatorInfo.orgName,
      orgDistrict: entry.orgDistrict || operatorInfo.orgDistrict,
      module: entry.module,
      actionType: entry.actionType,
      actionName: entry.actionName || getActionName(entry.actionType),
      targetType: entry.targetType || '',
      targetId: entry.targetId || '',
      targetName: entry.targetName || '',
      detail: entry.detail || '',
      result: entry.result || 'success',
      failReason: entry.failReason || '',
      ip: entry.ip || '--',
      createdAt: entry.createdAt || formatLogTime(new Date())
    };

    try {
      var logs = [];
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        logs = JSON.parse(raw);
        if (!Array.isArray(logs)) logs = [];
      }
      logs.unshift(logEntry);

      // 超出上限则裁剪
      if (logs.length > MAX_COUNT) {
        logs = logs.slice(0, MAX_COUNT - TRIM_SIZE);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    } catch (e) {
      console.error('[Logger] 写入日志失败:', e);
    }
  };

  function getActionName(actionType) {
    var map = {
      'login': '登录',
      'logout': '登出',
      'create': '新增',
      'update': '修改',
      'delete': '删除',
      'submit': '提交',
      'approve': '审核通过',
      'reject': '审核驳回',
      'revoke': '撤回',
      'disable': '停用',
      'enable': '启用',
      'reset_pwd': '重置密码',
      'export': '导出'
    };
    return map[actionType] || actionType;
  }

  function formatLogTime(date) {
    var y = date.getFullYear();
    var M = String(date.getMonth() + 1).padStart(2, '0');
    var d = String(date.getDate()).padStart(2, '0');
    var h = String(date.getHours()).padStart(2, '0');
    var m = String(date.getMinutes()).padStart(2, '0');
    var s = String(date.getSeconds()).padStart(2, '0');
    return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
  }

  // 暴露工具方法
  window.getOperationLogs = function () {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  };

  window.clearOperationLogs = function () {
    localStorage.removeItem(STORAGE_KEY);
  };

  console.log('[Logger] 操作日志模块已加载 (上限' + MAX_COUNT + '条)');
})();
