import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/Index/Index'

// 酒店详情
import HotelDetail from '../pages/HotelDetail/HotelDetail'
// 酒店详情-查看酒店更多标签
import HotelLabel from '../pages/HotelLabel/HotelLabel'

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

// 推荐好友-规则
import Rule from '../pages/Rule/Rule'
// 推荐好友-点我推广
import QSPush from '../pages/QSPush/QSPush'
// 推荐好友-奖励明细
import Praise from '../pages/Praise/Praise'
// 推荐好友-提现明细
import PickCash from '../pages/PickCash/PickCash'
// 推荐好友-我的下线
import HelpFriend from '../pages/HelpFriend/HelpFriend'


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
		// 酒店详情页-查看更多酒店标签
		{
			path: '/hotelLabel',
			name: 'hotelLabel',
			component: HotelLabel
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
		// 推荐好友-规则
		{
			path: '/rule',
			name: 'rule',
			component: Rule
		},

		// 推荐好友-点我推广
		{
			path: '/qsPush',
			name: 'qsPush',
			component: QSPush
		},

		// 推荐好友-奖励明细
		{
			path: '/praise',
			name: 'praise',
			component: Praise
		},

		// 推荐好友-助力好友
		{
			path: '/helpFriend',
			name: 'helpFriend',
			component: HelpFriend
		},
		// 推荐好友-提现明细
		{
			path: '/pickCash',
			name: 'pickCash',
			component: PickCash
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
