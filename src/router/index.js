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

// 商城
import shoppIng from '../pages/shopPage/shoppIng/shoppIng.vue';
// 商品分类列表
import shopTypeLists from '../pages/shopPage/shoppIng/shopTypeLists.vue';
// 商城详情
import shoppIngDetails from '../pages/shopPage/shoppIngDetails/shoppIngDetails.vue';
//收货地址
import address from '../pages/shopPage/address/address.vue';
//我的钱包
import myWallet from '../pages/shopPage/myWallet/myWallet.vue';
//商城订单
import shopOrder from '../pages/shopPage/shopOrder/shopOrder.vue';
//订单详情
import orderDetails from '../pages/shopPage/order/orderDetails.vue';
//退款订单
import refundOrder from '../pages/shopPage/refundOrder/refundOrder.vue';
//配送方式
import deliveryWay from '../pages/shopPage/deliveryWay/deliveryWay.vue';
//确认订单
import payOrder from '../pages/shopPage/payOrder/payOrder.vue';
//充值详情
import topUpDetails from '../pages/shopPage/myWallet/topUpDetails.vue';
//充值明细
import topUpLists from '../pages/shopPage/myWallet/topUpLists.vue';
//账单详情
import billDetails from '../pages/shopPage/myWallet/billDetails.vue';
//充值规则
import topUpRule from '../pages/shopPage/myWallet/topUpRule.vue';
//编辑收货地址
import editAddress from '../pages/shopPage/address/editAddress.vue';
//支付页面
import payPage from '../pages/shopPage/payPage/payPage.vue';
//支付成功页面
import paySuccess from '../pages/shopPage/payPage/paySuccess.vue';




Vue.use(Router)

export default new Router({
	// mode:'history',
	routes: [
		// 首页
		{
			path: '/index',
			name: 'index',
			component: Index,
			meta: {
				// title: '秋果酒店'
				title: GlobalCpid == 1 ? "秋果酒店" : "华驿酒店-如家联盟"
			}
		},
		// 搜素结果页
		{
			path: '/searchResult',
			name: 'searchResult',
			component: SearchResult,
			meta: {
				title: '搜索结果'
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
		// 商城首页
		{
			path: '/shoppIng',
			name: 'shoppIng',
			component: shoppIng,
			meta:{
				title:'商城'
			}
		},
		// 商城列表
		{
			path: '/shopTypeLists',
			name: 'shopTypeLists',
			component: shopTypeLists,
			meta:{
				title:'商品-分类'
			}
		},
		//商城产品详情
		{
			path: '/shoppIngDetails',
			name: 'shoppIngDetails',
			component: shoppIngDetails,
			meta:{
				title:'商城'
			}
		},
		//收货地址
		{
			path: '/address',
			name: 'address',
			component: address,
			meta:{
				title:'收货地址'
			}
		}, 
		//我的钱包  
		{
			path: '/myWallet',
			name: 'myWallet',
			component: myWallet,
			meta:{
				title:'我的钱包'
			}
		}, 
		//商城订单  
		{
			path: '/shopOrder',
			name: 'shopOrder',
			component: shopOrder,
			meta:{
				title:'商城订单'
			}
		}, 
		//订单详情  
		{
			path: '/orderDetails',
			name: 'orderDetails',
			component: orderDetails,
			meta:{
				title:'订单详情'
			}
		}, 
		//退款订单  
		{
			path: '/refundOrder',
			name: 'refundOrder',
			component: refundOrder,
			meta:{
				title:'退款订单'
			}
		}, 
		//配送方式  
		{
			path: '/deliveryWay',
			name: 'deliveryWay',
			component: deliveryWay,
			meta:{
				title:'配送方式'
			}
		}, 
		//确认订单  
		{
			path: '/payOrder',
			name: 'payOrder',
			component: payOrder,
			meta:{
				title:'确认订单'
			}
		}, 
		//充值详情  
		{
			path: '/topUpDetails',
			name: 'topUpDetails',
			component: topUpDetails,
			meta:{
				title:'充值详情'
			}
		}, 
		//充值明细  
		{
			path: '/topUpLists',
			name: 'topUpLists',
			component: topUpLists,
			meta:{
				title:'充值明细'
			}
		}, 
		//账单详情  
		{
			path: '/billDetails',
			name: 'billDetails',
			component: billDetails,
			meta:{
				title:'账单详情'
			}
		}, 
		//充值规则
		{
			path:'/topUpRule',
			name:'topUpRule',
			component:topUpRule,
			meta:{
				title:'充值规则'
			}
		},
		//编辑收货地址  
		{
			path: '/editAddress',
			name: 'editAddress',
			component: editAddress,
			meta:{
				title:'编辑收货地址'
			}
		}, 
		//支付页面  
		{
			path: '/payPage',
			name: 'payPage',
			component: payPage,
			meta:{
				title:'在线支付'
			}
		}, 
		//支付成功页面
		{
			path:'/paySuccess',
			name:'paySuccess',
			component:paySuccess,
			meta:{
				title:'支付成功'
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
