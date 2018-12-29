//时间格式处理
export function f(para){
	var d = para;
	var yyyy = d.getFullYear();
	var mm = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1): d.getMonth() + 1;
	var dd = d.getDate() < 10 ? '0' + d.getDate() : d.getDate(); 
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

// 当天年月日输出
export function YTD() {
	let d = new Date();
	return {
		kebab: f(d).yyyy + '-' + f(d).mm + '-' + f(d).dd,  //yyyy-mm-dd
		lfRule: f(d).yyyy + '/' + f(d).mm + '/' + f(d).dd, //yyyy/mm/dd
		rgRule: f(d).yyyy + '\\' + f(d).mm + '\\' + f(d).dd, //yyyy\mm\dd
		noRule: f(d).yyyy + f(d).mm + f(d).dd,    //yyyymmdd
	}
}

// 明天年月日输出
export function YTDRg() {
	let d = new Date();
	d.setDate(d.getDate() + 1); 
	return {
		kebab: f(d).yyyy + '-' + f(d).mm + '-' + f(d).dd,  //yyyy-mm-dd
		lfRule: f(d).yyyy + '/' + f(d).mm + '/' + f(d).dd, //yyyy/mm/dd
		rgRule: f(d).yyyy + '\\' + f(d).mm + '\\' + f(d).dd, //yyyy\mm\dd
		noRule: f(d).yyyy + f(d).mm + f(d).dd,    //yyyymmdd
	}
}

// 昨天年月日输出
export function YTDLf() {
	let d = new Date();
	d.setDate(d.getDate() - 1);
	return {
		kebab: f(d).yyyy + '-' + f(d).mm + '-' + f(d).dd,  //yyyy-mm-dd
		lfRule: f(d).yyyy + '/' + f(d).mm + '/' + f(d).dd, //yyyy/mm/dd
		rgRule: f(d).yyyy + '\\' + f(d).mm + '\\' + f(d).dd, //yyyy\mm\dd
		noRule: f(d).yyyy + f(d).mm + f(d).dd,    //yyyymmdd
	}
}

export function formatePara(para) {
	var a = para;
	return f(a).mm + '-' + f(a).dd
}

export function formateToday() {
	let d = new Date();
	return f(d).mm + '-' + f(d).dd
}

export function formateTomorrow() {
	var now = new Date();
	now.setDate(now.getDate()+1); 
	return f(now).mm + '-' + f(now).dd
}


// 日期的时间差，如2018-07-24与2018-07-22相差2天
export function dateEndMinusStart(p1, p2){
	let a = new Date(p1);
	let b = new Date(p2);
	return parseInt((b - a)/(24*3600*1000));
}

// 判断是否是今天的黎明00:01-05:59
export function isBeforeDawn(){
	let d = new Date(); 
	let h = d.getHours();
	return h < 6;
}
