global.GlobalCpid = 1;

// 头条活动
export const exchangeApi = '/api/Toutiao/conversion?cpid=' + GlobalCpid;  //

export const exchange_codeApi = '/api/Toutiao/message?cpid=' + GlobalCpid;

// 全民营销
export const staffIndexApi = '/api/ActivityOrder/activity_list?cpid=' + GlobalCpid;

export const createOrderApi = '/api/ActivityOrder/create_order?cpid=' + GlobalCpid;

export const staffOrderDetails = '/api/ActivityOrder/detail?cpid=' + GlobalCpid;

export const payStaffApi = '/api/WxPay/activity_pay?cpid=' + GlobalCpid;
