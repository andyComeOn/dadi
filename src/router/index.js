import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/Index/Index'


// Error
import Error from '../pages/Error/Error'
// 首页banner广告
import Ad from '../pages/Ad/Ad'
// 酒店详情
import HotelDetail from '../pages/HotelDetail/HotelDetail'
// 酒店详情-查看酒店更多标签
import HotelLabel from '../pages/HotelLabel/HotelLabel'
// 酒店详情-banner-点击之后跳转到酒店图片集和页
import HotelDetailBannerLink from '../pages/HotelDetailBannerLink/HotelDetailBannerLink'


import Nearby from '../pages/Nearby/Nearby'
import SearchResult from '../pages/SearchResult/SearchResult'
// 订单
import Order from '../pages/Order/Order'

// 订单列表
import OrderList from '../pages/OrderList/OrderList'

// 订单列表中每条订单-点击之后进入的详情页
import OrderDetail from '../pages/OrderDetail/OrderDetail'


//  订单列表中每条订单-下面的按钮跳转的页面-退款申请页
import ApplyMoney from '../pages/ApplyMoney/ApplyMoney'


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
// 提现
import extractMoney from '../pages/extractMoney/extractMoney'
// 提现
// import extractCheck from '../pages/extractCheck/extractCheck'
//在线支付
import onlinePay from '../pages/onlinePay/onlinePay.vue'
//秋果注册条款
import Clause from '../pages/Clause/Clause.vue'
//用户用联系信息List
import UserInfo from '../pages/UserInfo/UserInfo.vue'
//添加常用联系人信息
import AddContact from '../pages/AddContact/AddContact.vue'

Vue.use(Router)

export default new Router({
	routes: [
		// 首页
		{
			path: '/index',
			name: 'index',
			component: Index,
			meta: {
				title: '秋果酒店'
			}
		},
		// 搜素结果页
		{
			path: '/searchResult',
			name: 'searchResult',
			component: SearchResult,
			meta: {
				title: '秋果酒店'
			}
		},
		// 酒店详情页
		{
			path: '/hotelDetail',
			name: 'hotelDetail',
			component: HotelDetail,
			meta: {
				title: '酒店详情'
			}
		},
		// 推荐好友-点我推广
		{
			path: '/ad',
			name: 'ad',
			component: Ad,
			meta: {
				title: '广告'
			}
		},
		// 酒店详情页-查看更多酒店标签
		{
			path: '/hotelLabel',
			name: 'hotelLabel',
			component: HotelLabel,
			meta: {
				title: '酒店介绍'
			}
		},
		// 酒店详情-banner-点击之后跳转到酒店图片集和页
		{
			path: '/hotelDetailBannerLink',
			name: 'hotelDetailBannerLink',
			component: HotelDetailBannerLink,
			meta: {
				title: '酒店图片'
			}
		},
		// 附近的酒店
		{
			path: '/nearby',
			name: 'nearby',
			component: Nearby,
			meta: {
				title: '附近的酒店'
			}
		},
		// 订单页
		{
			path: '/order',
			name: 'order',
			component: Order,
			meta: {
				title: '订单填写'
			}
		},
		// 订单的列表页
		{
			path: '/orderList',
			name: 'orderList',
			component: OrderList,
			meta: {
				title: '订单'
			}
		},

		// 订单的列表页中每条订单的详情页
		{
			path: '/orderDetail',
			name: 'orderDetail',
			component: OrderDetail,
			meta: {
				title: '订单详情'
			}
		},
		// 我的
		{
			path: '/mine',
			name: 'mine',
			component: Mine,
			meta: {
				title: '我的'
			}
		},
		//个人中心
		{
			path: '/personalCenter',
			name: 'personalCenter',
			component: PersonalCenter,
			meta: {
				title: '个人中心'
			}
		},
		//推荐好友
		{
			path: '/recommendF',
			name: 'recommendF',
			component: RecommendF,
			meta: {
				title: '邀请好友'
			}
		},
		//我的优惠券
		{
			path: '/myCoupon',
			name: 'myCoupon',
			component: MyCoupon,
			meta: {
				title: '优惠券'
			}
		},
		//我的积分
		{
			path: '/myPoint',
			name: 'myPoint',
			component: MyPoint,
			meta: {
				title: '我的积分'
			}
		},
		//我的收藏
		{
			path: '/myCollect',
			name: 'myCollect',
			component: MyCollect,
			meta: {
				title: '我的收藏'
			}
		},
		//会员特权
		{
			path: '/vip',
			name: 'vip',
			component: Vip,
			meta: {
				title: '会员特权'
			}
		},
		// 帮助中心
		{
			path: '/helpCenter',
			name: 'helpCenter',
			component: HelpCenter,
			meta: {
				title: '帮助中心'
			}
		},
		// 用户常用联系人信息
		{
			path: '/userInfo',
			name: 'userInfo',
			component: UserInfo,
			meta: {
				title: '常用信息'
			}
		},
		// 添加常用联系人
		{
			path: '/addContact',
			name: 'addContact',
			component: AddContact,
			meta: {
				title: '新增旅客'
			}
		},
		// 推荐好友-规则
		{
			path: '/rule',
			name: 'rule',
			component: Rule,
			meta: {
				title: '规则'
			}
		},

		// 推荐好友-点我推广
		{
			path: '/qsPush',
			name: 'qsPush',
			component: QSPush,
			meta: {
				title: '二维码'
			}
		},

		// 推荐好友-奖励明细
		{
			path: '/praise',
			name: 'praise',
			component: Praise,
			meta: {
				title: '奖励明细'
			}
		},

		// 推荐好友-助力好友
		{
			path: '/helpFriend',
			name: 'helpFriend',
			component: HelpFriend,
			meta: {
				title: '助力好友'
			}
		},
		// 推荐好友-提现明细
		{
			path: '/pickCash',
			name: 'pickCash',
			component: PickCash,
			meta: {
				title: '提现明细'
			}
		},
		//提现
		{
			path: '/extractMoney',
			name: 'extractMoney',
			component: extractMoney,
			meta: {
				title: '奖励提现'
			}
		},
		// //提现审核
		// {
		// 	path:'/extractCheck',
		// 	name:'extractCheck',
		// 	component:extractCheck,
		// 	meta:{
		// 		title:'奖励提现'
		// 	}
		// },
		//在线支付
		{
			path: '/onlinePay',
			name: 'onlinePay',
			component: onlinePay,
			meta: {
				title: '在线支付'
			}
		},
		// 订单列表页的申请退款按钮-跳的页面
		{
			path: '/applyMoney',
			name: 'applyMoney',
			component: ApplyMoney,
			meta: {
				title: '申请退款'
			}
		},
		// 更改原手机号
		{
			path: '/oldPhoneNum',
			name: 'oldPhoneNum',
			component: OldPhoneNum,
			meta: {
				title: '手机号'
			}
		},
		// 提交新手机号
		{
			path: '/newPhoneNum',
			name: 'newPhoneNum',
			component: NewPhoneNum,
			meta: {
				title: '手机号'
			}
		},
		// 登录
		{
			path: '/login',
			name: 'login',
			component: Login,
			meta: {
				title: '登录'
			}
		},
		// 注册条款
		{
			path: '/clause',
			name: 'clause',
			component: Clause,
			meta: {
				title: '注册条款'
			}
		},

		{
			path: '/error',
			name: 'error',
			component: Error
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
