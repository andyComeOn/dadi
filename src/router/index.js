import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/Index/Index'
import HotelDetail from '../pages/HotelDetail/HotelDetail'
import Nearby from '../pages/Nearby/Nearby'
import SearchResult from '../pages/SearchResult/SearchResult'
import Login from '../pages/Login/Login'
import Mine from '../pages/Mine/Mine'
Vue.use(Router)

export default new Router({
	routes: [
		// 首页
		{
			path: '/index',
			name: 'Index',
			component: Index
		},
		// 搜素结果页
		{
			path: '/searchResult',
			name: 'SearchResult',
			component: SearchResult
		},
		// 酒店详情页
		{
			path: '/hotelDetail',
			name: 'HotelDetail',
			component: HotelDetail
		},
		// 附近的酒店
		{
			path: '/nearby',
			name: 'Nearby',
			component: Nearby
		},
		// 我的
		{
			path: '/mine',
			name: 'Mine',
			component: Mine
		},
		// 登录
		{
			path: '/login',
			name: 'Login',
			component: Login
		},
		// 根
		{
			path: '/',
			redirect: '/Index'
		},
		{
			path: '*',
			redirect: '/'
		},
	]
})
