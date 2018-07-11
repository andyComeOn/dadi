// 获取参数
// export function getUrlParam(name) {
// 	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
// 	var r = window.location.search.substr(1).match(reg);
// 	if (r != null){
// 		return unescape(r[2]);
// 	}
// 	else {
// 		return document.location.href.split("?")[1];
// 	}
// 	return null;
// }

export function getUrlParam(name) { 
	        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	        var r = window.location.href.substr(1).match(reg); 
	        if (r != null) return unescape(r[2]); 
	        return null; 
	    } 