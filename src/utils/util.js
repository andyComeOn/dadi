import axios from 'axios';
import { check_login } from "@/api/api";

// 获取url参数
export function getUrlParam(name) {
	//方法一：截取不到#后面的参数
	// var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	// var r = window.location.search.substr(1).match(reg);
	// if (r != null) return unescape(r[2]);
	// return null;
	//方法二：
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}

/**
 * @desc 设置cookie
 * @param name - 设置cookie的名字
 * @param value - 设置cookie的value
*/
export function setCookie(name, value) {
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}


// 获取cookie
export function getCookie(name) {
	var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	return v ? v[2] : null;
}

// 拉取授权接口
export function fetchCheckLogin(param) {
	return axios.post(check_login, param);
}