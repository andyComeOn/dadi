//时间格式处理
export function filterTime(a) {
	const index = a.indexOf("-");
	return a.slice(index + 1, index + 6);
}

// 过滤后台时间格式"2018-08-09 12:00:00"的月份
export function filterTimeMM(a) {
	const index = a.indexOf("-");
	return a.slice(index + 1, index + 3);
}
// 过滤后台时间格式"2018-08-09 12:00:00"的天
export function filterTimeDD(a) {
	const index = a.indexOf("-");
	return a.slice(index + 4, index + 6);
}
// 过滤后台时间格式"2018-08"的天
export function filterTimeYY(a) {
	return a.slice(0, 4);
}
// 过滤后台时间格式"2018-08-09 12:00:00"的年月日
export function filterTimeYTD(a) {
	let index = a.indexOf(" ");
	return a.slice(0, index);
}
// 过滤后台时间格式"2018-08-09 12:00:00"的年月日
export function filterTimeYTD_HHMM(a) {
	return a.slice(0, 16);
}
// 过滤不同的状态
export function filterStatus(b) {
	if (b == 0) {
		return '<span style="color:#30B097">待付款</span>';
	} else if (b == 1 || b == 2) {
		return '<span style="color:#30B097">待入住</span>';
	} else if (b == 3) {
		return '<span style="color:#30B097">入住中</span>';
	} else if (b == 4 || b == 5) {
		return '<span style="color:#30B097">已完成</span>';
	} else if (b == 6 || b == 15) {
		return "申请退款中";
	} else if (b == 7) {
		return '<span style="color:#F7543E">已拒单</span>';
	} else if (b == 8) {
		return "已取消";
	} else if (b == 9) {
		return "退款结束";
	} else {
		return "已关闭";
	}
}
// 过滤优惠券  后台时间格式"2018-08"的天
export function filterCouponStoreflag(a) {
	if (a == 0) {
		return '通用';
	} else if (a == 1) {
		return '指定';
	}
}
// 过滤优惠券状态，如：0=>未使用;1=>已使用;2=>已过期;-1=>已失效;
export function filterCouponStatusLab(a) {
	if (a == 0) {
		return '未使用';
	} else if (a == 1) {
		return '已使用';
	} else {
		return '已过期';
	}
}
// 过滤金额如：50.00 => 50
export function filterMoneyInt(a) {
	let index = a.indexOf(".");
	return a.slice(0, index);
}
// 保留2位小数点：50.3999 => 50.40
export function Fixto2(a) {
	return Math.round(a * 100) / 100;
}
// 过滤是否有房
export function filterIsHasRoom(a) {
	if (a == 1) {
		return "预订";
	} else {
		return "满房";
	}
}
// 会员等级（0,1,2）文案不同
export function filterVipTxt(a){
	if (a==1) {
		return "酒店与住店当天13:00办理入住，离店13:00办理退房，如您在13:00前未到达，可能需要等待方能入住，具体以酒店安排为准。"
	} else if (a==2){
		return "酒店与住店当天15:00办理入住，离店15:00办理退房，如您在15:00前未到达，可能需要等待方能入住，具体以酒店安排为准。"
	} else {
		return "酒店与住店当天12:00办理入住，离店12:00之前办理退房。"
	}
}
// 过滤酒店设施
export function filterLabel(a) {
	if (a == 1) {
		return "免费wifi";
	} else if (a == 2) {
		return "停车场";
	} else if (a == 3) {
		return "行李寄存";
	} else if (a == 4) {
		return "携带宠物";
	} else if (a == 5) {
		return "接送机";
	} else if (a == 6) {
		return "会议室";
	} else if (a == 7) {
		return "健身中心";
	} else if (a == 8) {
		return "24小时前台";
	} else if (a == 9) {
		return "商务中心";
	} else if (a == 10) {
		return "游泳池";
	} else if (a == 11) {
		return "ATM机";
	} else if (a == 12) {
		return "前台保险柜";
	} else if (a == 13) {
		return "中餐";
	} else if (a == 14) {
		return "西餐";
	} else if (a == 15) {
		return "宴会厅";
	} else if (a == 16) {
		return "酒吧";
	} else if (a == 17) {
		return "咖啡厅";
	} else if (a == 18) {
		return "茶室";
	} else if (a == 19) {
		return "刷卡服务";
	} else if (a == 20) {
		return "沙滩";
	} else if (a == 21) {
		return "沙滩娱乐";
	} else if (a == 22) {
		return "残疾人服务";
	} else if (a == 23) {
		return "叫车服务";
	} else if (a == 24) {
		return "叫醒服务";
	} else if (a == 25) {
		return "代订火车票";
	} else if (a == 26) {
		return "代订飞机票";
	} else if (a == 27) {
		return "专职行李员";
	} else if (a == 28) {
		return "洗衣服务";
	} else if (a == 29) {
		return "擦鞋";
	} else if (a == 30) {
		return "送餐服务";
	} else if (a == 31) {
		return "旅游服务";
	} else if (a == 32) {
		return "租车服务";
	} else if (a == 33) {
		return "雨伞租借";
	} else if (a == 34) {
		return "医疗支援";
	} else if (a == 35) {
		return "货币兑换";
	} else {
		return "美容美发";
	}
}
