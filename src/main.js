// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Loading from './components/loading'
import store from './store/store'
import axios from 'axios'
Vue.prototype.$http = axios
// import VueAxios from 'vue-axios'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import './assets/less/app.less'
import { Field } from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.component(Field.name, Field);

// Vue.use(VueAxios, axios)
Vue.use(Loading)
Vue.use(MuseUI);


new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
