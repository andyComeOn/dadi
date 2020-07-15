import Vue from 'vue'
import App from './App'
import router from './router'
import Loading from './components/loading' // 感觉 Loading 没起到啥作用
import store from './store/store' // 感觉 store 没起到啥作用
import * as myFilter from './filters'

Object.keys(myFilter).forEach(key => {
	Vue.filter(key, myFilter[key])
})

import axios from 'axios'
Vue.prototype.$http = axios;

// 引入muse-ui
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
Vue.use(MuseUI);

// 引入一些公共的样式
import './assets/less/app.less'

// 引入weui
import 'weui/dist/style/weui.min.css';

// 引入cookie、获取url参数的接口
import { setCookie, getUrlParam } from '@/utils/util';

// 引入api和login.js
import { check_login } from "@/api/api";

//vue-scroller
import VueScroller from 'vue-scroller';
Vue.use(VueScroller);

import Vant from "vant";
import "vant/lib/index.css";
Vue.use(Vant);

//引入复制功能
import VueClipboard from 'vue-clipboard2';
Vue.use(VueClipboard);

//引入 图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
	// error: 'dist/error.png',
	loading: require('./assets/images/active/know_qiuguo/banner_qg.jpg'),// 懒加载使用的图片
})

// 引入swiper插件
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
Vue.use(VueAwesomeSwiper);

Vue.use(Loading);
let attention;
router.beforeEach((to, from, next) => {
	attention = to.name;
	//路由改变，改变页面title
	if (to.meta.title) {
		document.title = to.meta.title;
		_hmt.push(['_trackPageview', '/#' + to.fullPath]);
		let bgColor1 = "#FFFFFF";
		let bgColor2 = "#EFF1F0";
		if (to.meta.title == "会员特权") {
			document.getElementsByTagName("body")[0].style.backgroundColor = bgColor1;
		} else if (to.meta.title == "发票抬头") {
			// console.log(123);
			document.getElementsByTagName("body")[0].style.backgroundColor = bgColor1;
			// console.log(456);
		} else {
			document.getElementsByTagName("body")[0].style.backgroundColor = bgColor2;
		}
	}
	next();
})

//登录检查
axios.post(check_login).then((res) => {
	// else if (res.data.status == -100)  用户违规操作，禁止用户操作
	if (res.data.status == 0) {
		var tg = getUrlParam('tg');		//分销
		let cpid = 1;		//获取cpid
		// let myRouteInfo = window.location.href + '?v=' + Math.random();		//获取当前地址
		let myRouteInfo = window.location.href;		//获取当前地址
		var URL;			//给微信传的callback里面的url   redirect_uri
		if(!tg){			//是否添加分销
			URL =  res.data.data.url + '/Accredit/oauthback?cpid=' + cpid + '&ref=' + myRouteInfo;
		}else{
			URL =  res.data.data.url + '/Accredit/oauthback?cpid=' + cpid + '&ref=' + myRouteInfo + '&recom=' + tg;
		}
		let urlEncodeData = encodeURIComponent(URL);		//加密给微信传的callback里面的url
		let appId = res.data.data.wx_appid;					//获取appId
		let testUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId + '&redirect_uri=' + urlEncodeData + '&response_type=code&scope=snsapi_userinfo&state=#wechat_redirect';
		window.location.href = testUrl;			//跳转地址
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
		setCookie('is_company',res.data.data.is_company); // 普通 个人 单位
		// 下面这2句代码，是微平台开始上线时，我们公司使用的是有赞的系统，为了给这部分人的一个友好提示
		if (res.data.data.coupon_flag == 0) {
			setCookie("isYouzan", 0); // 判断是不是有赞用户 1是(弹系统维护提示) 0不是（不弹）
		} else {
			setCookie("isYouzan", 1); // 判断是不是有赞用户 1是(弹系统维护提示) 0不是（不弹）
		}

		// 20190513配合徐威测试：该用户作为新用户，一般是没关注，渠道会让其扫自己的二维码，扫完地址是公众号的首页，
		// 点击菜单，进入预定页，由于没有关注，徐威让我跳到下面的url页面，该页面中微信老版本是有关注公众号按钮。现在微信把关注公众号按钮干了。
		// 解决方案是引导页面
		if( attention == "reserveIndex" || attention == "staffIndex" || attention == "trueGo" || attention == "sellTicket"){

		}else{
			if (res.data.data.is_focus_wx == 0 ) {
				var _host = window.location.host;
				if (_host == 'm.crs.ddyg.cn') {
					window.location.href = "http://www.crs.ddyg.cn/api/Accredit/guideFocus";
				} else if (_host == 'm.devtest.ddyg.cn') {
					window.location.href = "http://www.devtest.ddyg.cn/api/Accredit/guideFocus";
				} else {
					window.location.href = "http://www.wei.ddyg.cn/api/Accredit/guideFocus";
				}
			}
		}
	}
});



new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
