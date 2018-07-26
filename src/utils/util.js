// 获取参数
export function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.hash.substr(1).match(reg);
	if (r != null){
		return unescape(r[2]);
	}
	else {
		return document.location.href.split("?")[1];
	}
	return null;
}

// 获取cookie

export function getCookie(name) {
    var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}