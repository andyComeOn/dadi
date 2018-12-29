// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Loading from './components/loading'
import store from './store/store'
import * as myFilter from './filters'
// import QS from "qs";

Object.keys(myFilter).forEach(key => {
	Vue.filter(key, myFilter[key])
})

import axios from 'axios'
Vue.prototype.$http = axios

// 引入muse-ui
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
Vue.use(MuseUI);

// 引入一些公共的样式
import './assets/less/app.less'

// 引入weui
import 'weui/dist/style/weui.min.css';

// 引入腾讯移动统计
import MtaH5 from 'mta-h5-analysis';

// 引入cookie、获取url参数的接口
import { setCookie, getUrlParam } from '@/utils/util';

// 引入api和login.js
import { check_login, check_login1 } from "@/api/api";

//vue-scroller
import VueScroller from 'vue-scroller';
Vue.use(VueScroller);

//引入复制功能
import VueClipboard from 'vue-clipboard2';
Vue.use(VueClipboard);

// 引入swiper插件
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
Vue.use(VueAwesomeSwiper);

Vue.use(Loading);

//登录检查
let tg = getUrlParam('tg');
let myRouteInfo = encodeURIComponent(window.location.href);
var param = {
	tg: tg,
	form: myRouteInfo
}

axios.post(check_login, param).then((res) => {
	// else if (res.data.status == -100)  用户违规操作，禁止用户操作
	if (res.data.status == 0) {
		window.location.href = res.data.data;
	} else {
		setCookie("userInfoTel", res.data.data.mobile);  //手机号
		setCookie("userVipStatus", res.data.data.status);  //会员状态（0待审、1正常、2锁定）
		setCookie("userUid", res.data.data.uid);
		setCookie("userInfoIsRealname", res.data.data.is_realname); //真实姓名
		setCookie("userInfoGroupid", res.data.data.group_id);  //会员组id
		setCookie("nickname", encodeURI(res.data.data.nickname));		//昵称
		setCookie("openid", res.data.data.openid);  //openid
		setCookie("avatar", res.data.data.avatar);  //avatar
		setCookie('avail_amount',res.data.data.avail_amount);
		if (res.data.data.coupon_flag == 0) {
			setCookie("isYouzan", 0); // 判断是不是有赞用户 1是(弹系统维护提示) 0不是（不弹）
		} else {
			setCookie("isYouzan", 1); // 判断是不是有赞用户 1是(弹系统维护提示) 0不是（不弹）
		}
	}
});

// 11.9按照产品需求修改代码备份
// axios.post(check_login, param).then((res) => {
// 	if (res.data.status == 0) {
// 		window.location.href = res.data.data;
// 	} else {
// 		if (res.data.data.is_focus_wx == 0) {
// 			// 跳到公众号历史列表页
// 			window.location.href = "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=Mzg3NDAxMTM0Mw==&scene=126#wechat_redirect";
// 		} else {
// 			setCookie("userInfoTel", res.data.data.mobile);  //手机号
// 			setCookie("userVipStatus", res.data.data.status);  //会员状态（0待审、1正常、2锁定）
// 			setCookie("userUid", res.data.data.uid);
// 			setCookie("userInfoIsRealname", res.data.data.is_realname); //真实姓名
// 			setCookie("userInfoGroupid", res.data.data.group_id);  //会员组id
// 			setCookie("nickname", encodeURI(res.data.data.nickname));		//昵称
// 			setCookie("openid", res.data.data.openid);  //openid
// 			setCookie("avatar", res.data.data.avatar);  //avatar
// 			if (res.data.data.coupon_flag == 0) {
// 				setCookie("isYouzan", 0); // 判断是不是有赞用户 1是(弹系统维护提示) 0不是（不弹）
// 			} else {
// 				setCookie("isYouzan", 1); // 判断是不是有赞用户 1是(弹系统维护提示) 0不是（不弹）
// 			}
// 		}
// 	}
// });


// 测试发版时候切记要注释腾讯统计代码
// MtaH5.init({
// 	"sid": 500647079, //必填，统计用的appid
// 	"cid": "", // 如果开启自定义事件，此项目为必填，否则不填
// 	"autoReport": 0, // 是否开启自动上报(1:init完成则上报一次,0:使用pgv方法才上报)
// 	"senseHash": 0, // hash锚点是否进入url统计
// 	"senseQuery": 0, // url参数是否进入url统计
// 	"performanceMonitor": 0, // 是否开启性能监控
// 	"ignoreParams": [] //开启url参数上报时，可忽略部分参数拼接上报
// });
// MtaH5.pgv();

router.beforeEach((to, from, next) => {
	//路由改变，改变页面title
	if (to.meta.title) {
		document.title = to.meta.title;
		// 测试发版时候切记要注释腾讯统计代码
		// MtaH5.pgv();
		let bgColor1 = "#FFFFFF";
		let bgColor2 = "#EFF1F0";
		if (to.meta.title == "会员特权") {
			document.getElementsByTagName("body")[0].style.backgroundColor = bgColor1;
		} else {
			document.getElementsByTagName("body")[0].style.backgroundColor = bgColor2;
		}
	}
	next();
	// NProgress.start();
	// console.log(sessionStorage);
	// if (to.path == '/login') {
	//   sessionStorage.removeItem('user');
	// }

	// let user = JSON.parse(sessionStorage.getItem('CPID'));
	// if (!user && to.path != '/login') {
	//   next({ path: '/login' })
	// } else {
	//   next()
	// }

	// let INFO = sessionStorage.getItem('CPID');
	// if (!INFO) {
	// 	// next({ path: '/error' })
	// 	debugger;
	// 	this.$router.push({path:'/error'});
	// } else {
	// 	next()
	// }
})

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
