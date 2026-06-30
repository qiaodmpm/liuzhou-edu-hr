/**
 * 柳州教育人事管理平台 — 编制岗位台账数据迁移脚本
 * 负责将旧格式台账数据迁移至新格式（含 careerPlans / controlPlans 数组）
 * 用法：<script src="../src/ledger-migrate.js"></script>
 *       window.LedgerMigrate.migrateLedger(ledger, submissions)
 */
(function () {
  'use strict';

  var LPU = window.LedgerPlanUtils;

  // ============================================================
  // useForms → useTypes 映射
  // ============================================================

  var USE_TYPE_KEYS = ['publicRecruit', 'selfRecruit', 'talentMid', 'talentHigh', 'transfer', 'other'];

  function migrateUseTypes(useForms, finalApprovedDetails) {
    var types = {};
    for (var i = 0; i < USE_TYPE_KEYS.length; i++) {
      types[USE_TYPE_KEYS[i]] = { approved: 0, occupied: 0, enrolled: 0, unused: 0 };
    }
    // 从 useForms 读取学校申报数
    if (useForms) {
      for (var k = 0; k < USE_TYPE_KEYS.length; k++) {
        var key = USE_TYPE_KEYS[k];
        if (useForms[key] && typeof useForms[key].num === 'number') {
          types[key].approved = useForms[key].num;
        }
      }
    }
    // 从 finalApprovedDetails 读取编办确认数（覆盖学校申报数）
    if (finalApprovedDetails && finalApprovedDetails.length) {
      for (var j = 0; j < finalApprovedDetails.length; j++) {
        var d = finalApprovedDetails[j];
        var fk = d.formType || d.type;
        if (fk && types[fk] && typeof d.finalNum === 'number') {
          types[fk].approved = d.finalNum;
        }
      }
    }
    return types;
  }

  // ============================================================
  // 从编制申请生成计划记录
  // ============================================================

  function planFromSubmission(sub, track) {
    var approvedCount = sub.finalApprovedCount || sub.totalStaff || 0;
    // 如果 finalApprovedDetails 有明细，用明细求和
    if (sub.finalApprovedDetails && sub.finalApprovedDetails.length) {
      var sum = 0;
      for (var i = 0; i < sub.finalApprovedDetails.length; i++) {
        sum += (sub.finalApprovedDetails[i].finalNum || 0);
      }
      if (sum > 0) approvedCount = sum;
    }

    var plan = LPU.createPlanRecord({
      track: track,
      id: 'PLAN-' + track + '-' + (sub.id || ''),
      source: 'online',
      sourceBatchId: sub.batchId || '',
      sourceSubmissionId: sub.id || '',
      approvedCount: approvedCount,
      adjustedApprovedCount: approvedCount,
      occupiedCount: 0,    // 保守为 0，无法从现有数据推算
      usedCount: 0,        // 保守为 0，无法从现有数据推算
      validStart: sub.validStart || '',
      validEnd: sub.validEnd || '',
      useTypes: migrateUseTypes(sub.useForms, sub.finalApprovedDetails),
      linkedEmployIds: [],
      createdAt: sub.approveDate || sub.submitDate || '',
      createdBy: '系统迁移',
      notes: '从编制使用申请记录自动迁移（已使用数为估算值，请核实）'
    });

    return plan;
  }

  // ============================================================
  // 迁移单个台账
  // ============================================================

  /**
   * 迁移单个台账从旧格式到新格式（原地修改）
   * @param {object} ledger - 台账对象
   * @param {object[]} [allSubmissions] - 全部编制申请
   * @returns {{ migrated: boolean, pendingBackfill: object|null }}
   */
  function migrateLedger(ledger, allSubmissions) {
    // 已有 plans 数组 → 仅刷新状态
    if (ledger.careerPlans && Array.isArray(ledger.careerPlans) && ledger.careerPlans.length > 0) {
      for (var i = 0; i < ledger.careerPlans.length; i++) {
        LPU.refreshStatus(ledger.careerPlans[i]);
      }
      if (ledger.controlPlans) {
        for (var j = 0; j < ledger.controlPlans.length; j++) {
          LPU.refreshStatus(ledger.controlPlans[j]);
        }
      }
      // 重新计算聚合值
      syncAggregatesFromPlans(ledger);
      return { migrated: false, pendingBackfill: null };
    }

    // 初始化 plans 数组
    ledger.careerPlans = [];
    ledger.controlPlans = [];

    var submissions = allSubmissions || [];
    var schoolSubs = submissions.filter(function (s) {
      return s.school === ledger.schoolName && s.status === 'approved';
    });

    // 迁移事业编
    var careerSubs = schoolSubs.filter(function (s) { return s.staffingType === 'career'; });
    for (var ci = 0; ci < careerSubs.length; ci++) {
      ledger.careerPlans.push(planFromSubmission(careerSubs[ci], 'C'));
    }

    // 迁移控制数
    var controlSubs = schoolSubs.filter(function (s) { return s.staffingType === 'control'; });
    for (var ki = 0; ki < controlSubs.length; ki++) {
      ledger.controlPlans.push(planFromSubmission(controlSubs[ki], 'K'));
    }

    // 检测差额
    var careerOnlineTotal = 0;
    for (var ci2 = 0; ci2 < ledger.careerPlans.length; ci2++) {
      careerOnlineTotal += ledger.careerPlans[ci2].adjustedApprovedCount;
    }
    var controlOnlineTotal = 0;
    for (var ki2 = 0; ki2 < ledger.controlPlans.length; ki2++) {
      controlOnlineTotal += ledger.controlPlans[ki2].adjustedApprovedCount;
    }

    var pendingBackfill = {};
    var careerDiff = (ledger.careerApprovedPlan || 0) - careerOnlineTotal;
    var controlDiff = (ledger.controlApprovedPlan || 0) - controlOnlineTotal;

    if (careerDiff > 0) pendingBackfill.career = careerDiff;
    if (controlDiff > 0) pendingBackfill.control = controlDiff;

    if (pendingBackfill.career || pendingBackfill.control) {
      ledger._pendingBackfill = pendingBackfill;
    } else {
      delete ledger._pendingBackfill;
    }

    // 从 plans 重新计算聚合值
    syncAggregatesFromPlans(ledger);

    return {
      migrated: true,
      pendingBackfill: (pendingBackfill.career || pendingBackfill.control) ? pendingBackfill : null
    };
  }

  /**
   * 从 plans 数组同步聚合字段
   */
  function syncAggregatesFromPlans(ledger) {
    var careerAgg = LPU.computeAggregates(ledger.careerPlans || []);
    ledger.careerApprovedPlan = careerAgg.approvedPlan;
    ledger.careerUsedPlan = careerAgg.usedPlan;

    var controlAgg = LPU.computeAggregates(ledger.controlPlans || []);
    ledger.controlApprovedPlan = controlAgg.approvedPlan;
    ledger.controlUsedPlan = controlAgg.usedPlan;
  }

  /**
   * 检查台账是否需要迁移
   */
  function needsMigration(ledger) {
    if (!ledger) return false;
    return !ledger.careerPlans || !Array.isArray(ledger.careerPlans) || ledger.careerPlans.length === 0;
  }

  // ============================================================
  // 导出
  // ============================================================

  window.LedgerMigrate = {
    migrateLedger: migrateLedger,
    needsMigration: needsMigration,
    syncAggregatesFromPlans: syncAggregatesFromPlans
  };

})();
