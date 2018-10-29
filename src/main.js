// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Loading from './components/loading'
import store from './store/store'
import * as myFilter from './filters'

Object.keys(myFilter).forEach(key => {
	Vue.filter(key, myFilter[key])
})

import axios from 'axios'
Vue.prototype.$http = axios

// 引入muse-ui
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';

// 引入一些公共的样式
import './assets/less/app.less'

// 引入饿了么移动端mint-ui
// import { Field, Search } from 'mint-ui';
// Vue.component(Field.name, Field);
// Vue.component(Search.name, Search);
// import 'mint-ui/lib/style.css'

// 引入weui
import 'weui/dist/style/weui.min.css';

// 引入腾讯移动统计
import MtaH5 from 'mta-h5-analysis';

// 引入cookie、获取url参数的接口
import { getCookie, setCookie, getUrlParam } from '@/utils/util';

// 引入api和login.js
import { check_login } from "@/api/api";

// 引入swiper插件
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
Vue.use(VueAwesomeSwiper);


Vue.use(Loading);
Vue.use(MuseUI);

//登录检查
let tg = getUrlParam('tg');
var param = {
	tg: tg
}

axios.post(check_login, param).then((res) => {
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
		if (res.data.data.coupon_flag == 0) {
			setCookie("isYouzan", 0); // 判断是不是有赞用户 1是(弹系统维护提示) 0不是（不弹）
		} else {
			setCookie("isYouzan", 1); // 判断是不是有赞用户 1是(弹系统维护提示) 0不是（不弹）
		}
	}
});

MtaH5.init({
	"sid": 500647079, //必填，统计用的appid
	"cid": "", //如果开启自定义事件，此项目为必填，否则不填
	"autoReport": 0,//是否开启自动上报(1:init完成则上报一次,0:使用pgv方法才上报)
	"senseHash": 0, //hash锚点是否进入url统计
	"senseQuery": 0, //url参数是否进入url统计
	"performanceMonitor": 0,//是否开启性能监控
	"ignoreParams": [] //开启url参数上报时，可忽略部分参数拼接上报
});
MtaH5.pgv();

router.beforeEach((to, from, next) => {
	//路由改变，改变页面title
	if (to.meta.title) {
		document.title = to.meta.title;
		MtaH5.pgv();
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
