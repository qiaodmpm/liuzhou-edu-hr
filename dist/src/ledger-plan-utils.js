/**
 * 柳州教育人事管理平台 — 编制岗位台账计划记录工具库
 * 纯函数集合，不操作 DOM 或 localStorage
 * 用法：<script src="../src/ledger-plan-utils.js"></script>
 *       window.LedgerPlanUtils.createPlanRecord(...)
 */
(function () {
  'use strict';

  // ============================================================
  // 常量
  // ============================================================

  var PLAN_SOURCE = { ONLINE: 'online', OFFLINE: 'offline' };

  var PLAN_STATUS = {
    ACTIVE: 'active',                    // 有效
    EXHAUSTED: 'exhausted',             // 已用完
    EXPIRING_OCCUPIED: 'expiring_occupied', // 过期但有占用（允许入编）
    EXPIRED: 'expired'                  // 已到期（彻底失效）
  };

  var EXPIRE_WARN_DAYS = 60;

  var STATUS_LABEL = {
    active: '有效',
    exhausted: '已用完',
    expiring_occupied: '过期·有占用',
    expired: '已到期'
  };

  var STATUS_CLASS = {
    active: 'green',
    exhausted: 'gray',
    expiring_occupied: 'orange',
    expired: 'red'
  };

  // ============================================================
  // 计划记录 CRUD
  // ============================================================

  /**
   * 生成计划编号 PLAN-{C|K}-{日期}{随机序号}
   */
  function generatePlanId(track) {
    var now = new Date();
    var d = now.getFullYear().toString() +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0');
    var seq = String(Math.floor(Math.random() * 900) + 100);
    return 'PLAN-' + track + '-' + d + seq;
  }

  /**
   * 创建计划记录（初始模板）
   * @param {object} opts
   * @param {string} opts.track - 'C' | 'K'
   * @param {string} [opts.id]
   * @param {string} [opts.source] - 'online' | 'offline'
   * @returns {object}
   */
  function createPlanRecord(opts) {
    var now = new Date().toISOString().slice(0, 10);
    var approvedCount = opts.approvedCount || 0;
    var record = {
      id: opts.id || generatePlanId(opts.track || 'C'),
      source: opts.source || 'offline',
      // 线上来源
      sourceBatchId: opts.sourceBatchId || '',
      sourceSubmissionId: opts.sourceSubmissionId || '',
      // 线下来源
      offlineDocNo: opts.offlineDocNo || '',
      offlineApprovedBy: opts.offlineApprovedBy || '',
      // 批复内容
      approvedCount: approvedCount,
      occupiedCount: opts.occupiedCount || 0,     // 已被占用但未入编（含招聘途中和推迟办理）
      usedCount: opts.usedCount || 0,              // 已入编（终态）
      // 有效期
      validStart: opts.validStart || '',
      validEnd: opts.validEnd || '',
      // 状态（由 computePlanStatus 判定）
      status: PLAN_STATUS.ACTIVE,
      // 使用类型明细（每类型：批复/占用/入编/暂缓/未使用）
      useTypes: opts.useTypes || {
        publicRecruit: { approved: 0, occupied: 0, enrolled: 0, unused: 0 },
        selfRecruit: { approved: 0, occupied: 0, enrolled: 0, unused: 0 },
        talentMid: { approved: 0, occupied: 0, enrolled: 0, unused: 0 },
        talentHigh: { approved: 0, occupied: 0, enrolled: 0, unused: 0 },
        transfer: { approved: 0, occupied: 0, enrolled: 0, unused: 0 },
        other: { approved: 0, occupied: 0, enrolled: 0, unused: 0 }
      },
      // 附件
      attachment: opts.attachment || null,    // { name, size, type } or null
      // 关联聘用
      linkedEmployIds: opts.linkedEmployIds || [],
      // 元数据
      createdAt: opts.createdAt || now,
      createdBy: opts.createdBy || '',
      updatedAt: now,
      notes: opts.notes || ''
    };
    // 初始化状态
    record.status = computePlanStatus(record);
    return record;
  }

  // ============================================================
  // 计算字段
  // ============================================================

  /**
   * 计算计划剩余可用名额
   */
  function remainingCount(plan) {
    if (!plan) return 0;
    return Math.max(0, (plan.approvedCount || 0) - (plan.occupiedCount || 0) - (plan.usedCount || 0));
  }

  /**
   * 获取今天的日期字符串 YYYY-MM-DD
   */
  function todayStr() {
    return new Date().toISOString().slice(0, 10);
  }

  /**
   * 判定计划状态（基于日期和数值）
   */
  function computePlanStatus(plan, refDate) {
    var ref = refDate || todayStr();
    var adj = plan.approvedCount || 0;
    var occupied = plan.occupiedCount || 0;
    var used = plan.usedCount || 0;
    var remain = adj - occupied - used;
    // 已用完
    if (remain <= 0 && adj > 0) {
      return PLAN_STATUS.EXHAUSTED;
    }
    // 已过期且有占用 → 允许入编
    if (plan.validEnd && plan.validEnd < ref && occupied > 0) {
      return PLAN_STATUS.EXPIRING_OCCUPIED;
    }
    // 已过期且无占用 → 彻底失效
    if (plan.validEnd && plan.validEnd < ref) {
      return PLAN_STATUS.EXPIRED;
    }
    return PLAN_STATUS.ACTIVE;
  }

  /**
   * 刷新计划状态（原地修改）
   */
  function refreshStatus(plan, refDate) {
    if (!plan) return plan;
    plan.status = computePlanStatus(plan, refDate);
    return plan;
  }

  /**
   * 是否即将到期
   */
  function isExpiringSoon(plan, refDate) {
    if (!plan || !plan.validEnd) return false;
    var ref = refDate || todayStr();
    var daysLeft = Math.ceil((new Date(plan.validEnd) - new Date(ref)) / 86400000);
    return daysLeft > 0 && daysLeft <= EXPIRE_WARN_DAYS && remainingCount(plan) > 0;
  }

  /**
   * 获取到期剩余天数
   */
  function daysUntilExpire(plan, refDate) {
    if (!plan || !plan.validEnd) return null;
    var ref = refDate || todayStr();
    return Math.ceil((new Date(plan.validEnd) - new Date(ref)) / 86400000);
  }

  // ============================================================
  // 聚合计算
  // ============================================================

  /**
   * 从计划记录数组计算聚合值
   * @returns {{ approvedPlan, usedPlan, unusedPlan, unusedActive, unusedExpired }}
   */
  function computeAggregates(plans, refDate) {
    if (!plans || plans.length === 0) {
      return { approvedPlan: 0, occupiedPlan: 0, usedPlan: 0, unusedPlan: 0, expiredOccupiedPlan: 0 };
    }
    var ref = refDate || todayStr();
    var approvedPlan = 0;
    var occupiedPlan = 0;
    var usedPlan = 0;
    var unusedActive = 0;
    var expiredOccupiedPlan = 0;

    for (var i = 0; i < plans.length; i++) {
      var p = plans[i];
      var st = computePlanStatus(p, ref);

      if (st === PLAN_STATUS.EXPIRED) {
        // 彻底失效，不计入任何统计
      } else if (st === PLAN_STATUS.EXPIRING_OCCUPIED) {
        // 过期但有占用：占用计入过期占用，不计入有效统计
        expiredOccupiedPlan += (p.occupiedCount || 0);
      } else {
        // ACTIVE 或 EXHAUSTED
        approvedPlan += (p.approvedCount || 0);
        occupiedPlan += (p.occupiedCount || 0);
        usedPlan += (p.usedCount || 0);
        if (st !== PLAN_STATUS.EXHAUSTED) {
          unusedActive += remainingCount(p);
        }
      }
    }

    return {
      approvedPlan: approvedPlan,
      occupiedPlan: occupiedPlan,
      usedPlan: occupiedPlan + usedPlan,
      unusedPlan: unusedActive,
      expiredOccupiedPlan: expiredOccupiedPlan
    };
  }

  /**
   * 计算可申请编制数
   */
  function computeAvailable(quota, actual, plans, refDate) {
    var agg = computeAggregates(plans, refDate);
    return Math.max(0, (quota || 0) - (actual || 0) - agg.approvedPlan - (agg.expiredOccupiedPlan || 0));
  }

  // ============================================================
  // 联动操作（为本阶段预留，后续模块改造时使用）
  // ============================================================

  /**
   * 扣减计划记录已使用数
   */
  function consumePlan(plan, count, entryId) {
    if (!plan) return plan;
    plan.usedCount = (plan.usedCount || 0) + count;
    plan.updatedAt = todayStr();
    if (entryId) {
      plan.notes = (plan.notes ? plan.notes + '; ' : '') + '入编(' + entryId + ') +' + count + '人';
    }
    return refreshStatus(plan);
  }

  /**
   * 聘用核减联动
   */
  function applyCancelReduction(plan, cancelCount, context) {
    if (!plan || cancelCount <= 0) return { success: true };
    if (cancelCount > (plan.occupiedCount || 0)) {
      return { success: false, error: '核减数(' + cancelCount + ')超过已占用数(' + plan.occupiedCount + ')' };
    }
    plan.occupiedCount -= cancelCount;
    plan.updatedAt = todayStr();
    plan.notes = (plan.notes ? plan.notes + '; ' : '')
      + '聘用(' + (context.employId || '') + ')核减' + cancelCount + '人'
      + (context.positionName ? '(岗位:' + context.positionName + ')' : '')
      + (context.cancelDocNo ? ',依据:' + context.cancelDocNo : '');
    if (context.employId && plan.linkedEmployIds.indexOf(context.employId) === -1) {
      plan.linkedEmployIds.push(context.employId);
    }
    return { success: true, plan: refreshStatus(plan) };
  }

  /**
   * 校验补录数据
   */
  var USE_TYPE_KEYS = ['publicRecruit','selfRecruit','talentMid','talentHigh','transfer','other'];
  var USE_TYPE_LABELS = {
    publicRecruit:'统一公开招聘', selfRecruit:'自主实施招聘',
    talentMid:'中高级人才招聘', talentHigh:'引进高层次人才',
    transfer:'调动', other:'其他'
  };

  function validateBackfill(data, existingPlans) {
    var errors = [];
    if (!data.offlineDocNo || !data.offlineDocNo.trim()) errors.push('请填写批复文号');
    if (existingPlans && existingPlans.some(function (p) { return p.offlineDocNo === data.offlineDocNo; })) {
      errors.push('该文号已存在');
    }
    if (!data.validStart) errors.push('请选择有效期起始');
    if (!data.validEnd) errors.push('请选择有效期截止');
    if (data.validStart && data.validEnd && data.validEnd < data.validStart) {
      errors.push('截止日期不能早于起始日期');
    }
    // Validate useTypes (required)
    if (!data.useTypes) {
      errors.push('使用类型分布为必填项');
      return { valid: false, errors: errors };
    }
    var totalApproved = 0, totalOccupied = 0, totalEnrolled = 0;
    for (var i = 0; i < USE_TYPE_KEYS.length; i++) {
      var key = USE_TYPE_KEYS[i];
      var row = data.useTypes[key] || { approved:0, occupied:0, enrolled:0 };
      var a = row.approved || 0;
      var o = row.occupied || 0;
      var e = row.enrolled || 0;
      if (a < 0) { errors.push((i+1) + '. ' + USE_TYPE_LABELS[key] + '批复人数不能为负'); continue; }
      if (o < 0 || o > a) { errors.push((i+1) + '. ' + USE_TYPE_LABELS[key] + '已占用人数(' + o + ')不能超过批复人数(' + a + ')'); continue; }
      if (e < 0 || e > a - o) { errors.push((i+1) + '. ' + USE_TYPE_LABELS[key] + '已入编人数(' + e + ')不能超过可用数(' + (a-o) + ')'); continue; }
      totalApproved += a; totalOccupied += o; totalEnrolled += e;
    }
    if (totalApproved === 0) {
      errors.push('使用类型批复人数合计不能为 0，请至少填写一个类型的批复人数');
    }
    return { valid: errors.length === 0, errors: errors,
      totals: { approved: totalApproved, occupied: totalOccupied, enrolled: totalEnrolled }
    };
  }

  // ============================================================
  // 导出
  // ============================================================

  window.LedgerPlanUtils = {
    PLAN_SOURCE: PLAN_SOURCE,
    PLAN_STATUS: PLAN_STATUS,
    STATUS_LABEL: STATUS_LABEL,
    STATUS_CLASS: STATUS_CLASS,
    EXPIRE_WARN_DAYS: EXPIRE_WARN_DAYS,
    generatePlanId: generatePlanId,
    createPlanRecord: createPlanRecord,
    remainingCount: remainingCount,
    computePlanStatus: computePlanStatus,
    refreshStatus: refreshStatus,
    isExpiringSoon: isExpiringSoon,
    daysUntilExpire: daysUntilExpire,
    computeAggregates: computeAggregates,
    computeAvailable: computeAvailable,
    consumePlan: consumePlan,
    applyCancelReduction: applyCancelReduction,
    validateBackfill: validateBackfill,
    todayStr: todayStr
  };

})();
