//时间格式处理

function f(para){
	var d = para;
	var yyyy = d.getFullYear();
	var mm = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1): d.getMonth() + 1;
	var dd = d.getDate() + 1 < 10 ? '0' + d.getDate() : d.getDate(); 
	var hh = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
	var MM = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
	var ss = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
	var o = {
		yyyy : yyyy,
		mm : mm,
		dd : dd,
		hh : hh,
		MM : MM,
		ss : ss 
	}
	return o
}

export function formateToday() {
	let d = new Date();
	return f(d).mm + '-' + f(d).dd
}

export function formatePara(para) {
	var a = para;
	return f(a).mm + '-' + f(a).dd
}

export function formateTomorrow() {
	var now = new Date();
	now.setDate(now.getDate()+1); 
	return f(now).mm + '-' + f(now).dd
}

