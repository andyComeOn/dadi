//时间格式处理
export function filterTime(a) {
	const index = a.indexOf("-");
	return a.slice(index + 1, index + 6);
}

export function filterTimeMM(a) {
	const index = a.indexOf("-");
	return a.slice(index + 1, index + 3);
}

export function filterTimeDD(a) {
	const index = a.indexOf("-");
	return a.slice(index + 4, index + 6);
}
export function filterStatus(b) {
	if (b == 0) {
		return "待付款";
	} else if (b == 1 || b == 2) {
		return "待入住";
	} else if (b == 3) {
		return '<span style="color:#30B097">入住中</span>';
	} else if (b == 4) {
		return "已完成";
	} else if (b == 5) {
		return "已完成";
	} else if (b == 6) {
		return "申请退款中";
	} else if (b == 7) {
		return "被拒单";
	} else if (b == 8) {
		return "已取消";
	} else {
		return "退款结束";
	}
}

