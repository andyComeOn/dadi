// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Loading from './components/loading'
import store from './store/store'

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

// 引入zepto（当前项目无用） 
// import $ from 'zepto';




Vue.use(Loading)

Vue.use(MuseUI);


// router.beforeEach((to, from, next) => {
// 	//NProgress.start();
// 	if (to.path == '/login') {
// 	  sessionStorage.removeItem('user');
// 	}
// 	let user = JSON.parse(sessionStorage.getItem('user'));
// 	if (!user && to.path != '/login') {
// 	  next({ path: '/login' })
// 	} else {
// 	  next()
// 	}
// })

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
