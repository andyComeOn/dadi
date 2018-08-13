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
// 过滤不同的状态
export function filterStatus(b) {
	if (b == 0) {
		return '<span style="color:#30B097">待付款</span>';
	} else if (b == 1 || b == 2) {
		return '<span style="color:#30B097">待入住</span>';
	} else if (b == 3) {
		return '<span style="color:#30B097">入住中</span>';
	} else if (b == 4) {
		return '<span style="color:#30B097">已完成</span>';
	} else if (b == 5) {
		return '<span style="color:#30B097">已完成</span>';
	} else if (b == 6) {
		return "申请退款中";
	} else if (b == 7) {
		return '<span style="color:#F7543E">被拒单</span>';
	} else if (b == 8) {
		return "已取消";
	} else {
		return "退款结束";
	}
}

