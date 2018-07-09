import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/Index/Index'
import HotelDetail from '../pages/HotelDetail/HotelDetail'
import Nearby from '../pages/Nearby/Nearby'
import SearchResult from '../pages/SearchResult/SearchResult'
import Order from '../pages/Order/Order'
import Login from '../pages/Login/Login'
import OldPhoneNum from '../pages/OldPhoneNum/OldPhoneNum'
import NewPhoneNum from '../pages/NewPhoneNum/NewPhoneNum'

// 我的-下面的list组件 
import Mine from '../pages/Mine/Mine'

// 个人中心
import PersonalCenter from '../pages/PersonalCenter/PersonalCenter'
// 推荐好友
import RecommendF from '../pages/RecommendF/RecommendF'
// 我的优惠券
import MyCoupon from '../pages/MyCoupon/MyCoupon'
// 我的积分
import MyPoint from '../pages/MyPoint/MyPoint'
// 我的收藏
import MyCollect from '../pages/MyCollect/MyCollect'
// 会员特权
import Vip from '../pages/Vip/Vip'
// 帮助中心
import HelpCenter from '../pages/HelpCenter/HelpCenter'


Vue.use(Router)

export default new Router({
	routes: [
		// 首页
		{
			path: '/index',
			name: 'index',
			component: Index
		},
		// 搜素结果页
		{
			path: '/searchResult',
			name: 'searchResult',
			component: SearchResult
		},
		// 酒店详情页
		{
			path: '/hotelDetail',
			name: 'hotelDetail',
			component: HotelDetail
		},
		// 附近的酒店
		{
			path: '/nearby',
			name: 'nearby',
			component: Nearby
		},
		// 订单页
		{
			path: '/order',
			name: 'order',
			component: Order
		},
		// 我的
		{
			path: '/mine',
			name: 'mine',
			component: Mine
		},
		//个人中心
		{
			path: '/personalCenter',
			name: 'personalCenter',
			component: PersonalCenter
		},
		//推荐好友
		{
			path: '/recommendF',
			name: 'recommendF',
			component: RecommendF
		},
		//我的优惠券
		{
			path: '/myCoupon',
			name: 'myCoupon',
			component: MyCoupon
		},
		//我的积分
		{
			path: '/myPoint',
			name: 'myPoint',
			component: MyPoint
		},
		//我的收藏
		{
			path: '/myCollect',
			name: 'myCollect',
			component: MyCollect
		},
		//会员特权
		{
			path: '/vip',
			name: 'vip',
			component: Vip
		},
		// 帮助中心
		{
			path: '/helpCenter',
			name: 'helpCenter',
			component: HelpCenter
		},



		// 更改原手机号
		{
			path: '/oldPhoneNum',
			name: 'oldPhoneNum',
			component: OldPhoneNum
		},
		// 提交新手机号
		{
			path: '/newPhoneNum',
			name: 'newPhoneNum',
			component: NewPhoneNum
		},

		// 登录
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		
		// 根
		{
			path: '/',
			redirect: '/index'
		},
		{
			path: '*',
			redirect: '/'
		},
	]
})
