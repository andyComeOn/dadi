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
import { Field, Search } from 'mint-ui';
Vue.component(Field.name, Field);
Vue.component(Search.name, Search);
import 'mint-ui/lib/style.css'

// 引入weui
import 'weui/dist/style/weui.min.css';

// 引入cookie、获取url参数的接口
import { getCookie, setCookie, getUrlParam } from '@/utils/util';

// 引入api
import { login_test, userInfo } from "@/api/api";

// 引入swiper插件
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
Vue.use(VueAwesomeSwiper);


Vue.use(Loading);
Vue.use(MuseUI);

// 获取cookie
let mycookie = getCookie('auth_user_1');
// console.log('cookie='+ mycookie);

// 获取参数的cpid
let CPID = getUrlParam('cpid');
// console.log(CPID);

// sessionStorage.setItem('CPID', CPID);
// console.log(sessionStorage.getItem('CPID'));
// cookie为空，调取登陆接口

var param = { cpid: 1 };
axios.post(login_test, param).then(res => {
	if(res.data.status==1){
		axios.post(userInfo, param).then(res=>{
			if(res.data.status==1){
				setCookie("userInfoTel",res.data.data.mobile);  //手机号
				setCookie("userInfoIsRealname",res.data.data.is_realname); //真实姓名
				setCookie("userInfoGroupid",res.data.data.group_id);  //会员组id
			}
		}).catch()
	}
}).catch(function (err) { console.log(err) });


// 在点击预定时候判断有没有绑定手机号
// 若没有绑定，使用路由监听跳到绑定手机号（登陆）页面
// console.log(sessionStorage);
router.beforeEach((to, from, next) => {
	//路由改变，改变页面title
	if (to.meta.title) {
		document.title = to.meta.title;
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
