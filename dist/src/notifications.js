/**
 * 柳州教育人事管理平台 — 统一通知消息工具模块
 * 提供 addNotification() 和 getNotifications() 工具函数
 * 用法：<script src="../src/notifications.js"></script>
 *       addNotification('u001', '审批通过', '编制申请已通过', 'staffing', 'staffing-detail.html?id=S2026-C01');
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'notifications';
  var MAX_NOTIFICATIONS = 200; // 最多保留 200 条（超出删除最早的）

  /**
   * 获取通知列表
   * @param {string} [userId] - 可选，按用户 ID 过滤
   * @param {number} [limit] - 返回条数，默认 20
   * @returns {Array} 通知数组（按时间倒序）
   */
  function getNotifications(userId, limit) {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var list = raw ? JSON.parse(raw) : [];
      if (userId) {
        list = list.filter(function (n) { return n.userId === userId; });
      }
      list.sort(function (a, b) { return new Date(b.createTime) - new Date(a.createTime); });
      return list.slice(0, limit || 20);
    } catch (e) {
      return [];
    }
  }

  /**
   * 获取未读通知数
   * @param {string} userId
   * @returns {number}
   */
  function getUnreadCount(userId) {
    var list = getNotifications(userId, MAX_NOTIFICATIONS);
    return list.filter(function (n) { return !n.isRead; }).length;
  }

  /**
   * 添加一条通知
   * @param {Object} opts
   * @param {string} opts.userId      - 接收人 ID
   * @param {string} opts.title       - 通知标题
   * @param {string} opts.content     - 通知内容
   * @param {string} opts.module      - 来源模块（staffing/entry/exit/post/promote/recruit/employ/ledger/org/contract-entry/contract-exit）
   * @param {string} [opts.linkUrl]   - 跳转链接
   * @param {string} [opts.type]      - 类型：approve|reject|submit|system|security，默认 system
   */
  function addNotification(opts) {
    if (!opts || !opts.userId || !opts.title) {
      console.warn('[notifications] addNotification: userId and title are required');
      return null;
    }
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var list = raw ? JSON.parse(raw) : [];
      var notif = {
        id: 'notif_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
        userId: opts.userId,
        title: opts.title,
        content: opts.content || '',
        type: opts.type || 'system',
        module: opts.module || '',
        recordId: opts.recordId || '',
        linkUrl: opts.linkUrl || '',
        isRead: false,
        createTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
      };
      list.unshift(notif);
      // 超过上限删除最早的
      if (list.length > MAX_NOTIFICATIONS) {
        list = list.slice(0, MAX_NOTIFICATIONS);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      return notif;
    } catch (e) {
      console.error('[notifications] Failed to add notification:', e);
      return null;
    }
  }

  /**
   * 标记通知已读
   * @param {string} notifId
   */
  function markAsRead(notifId) {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var list = raw ? JSON.parse(raw) : [];
      for (var i = 0; i < list.length; i++) {
        if (list[i].id === notifId) {
          list[i].isRead = true;
          break;
        }
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {}
  }

  /**
   * 标记某用户所有通知已读
   * @param {string} userId
   */
  function markAllAsRead(userId) {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var list = raw ? JSON.parse(raw) : [];
      for (var i = 0; i < list.length; i++) {
        if (list[i].userId === userId) {
          list[i].isRead = true;
        }
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {}
  }

  // 暴露到全局
  window.Notifications = {
    get: getNotifications,
    getUnreadCount: getUnreadCount,
    add: addNotification,
    markAsRead: markAsRead,
    markAllAsRead: markAllAsRead
  };
})();
