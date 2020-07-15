//截取url参数方法
// import { getUrlParam } from '@/utils/util';
//baseUrl
// export const baseUrl = 'm.wei.ddyg.cn';
//cpid
// global.GlobalCpid = getUrlParam('cpid');
global.GlobalCpid = 1;

// 把获取到的cpid输出
export const baseCpid = GlobalCpid;

// Stroe-酒店
export const store_list = '/api/Store/store_list?cpid=' + GlobalCpid  // 门店列表（查询酒店）   

export const store_detail = '/api/StoreRoomType/store_detail?cpid=' + GlobalCpid  // 门店详情 (房间列表)

export const storeLogo = '/api/Login/getStore?cpid=' + GlobalCpid;      //获取门店logo和店名

export const store_introduce = '/api/StoreRoomType/store_introduce?cpid=' + GlobalCpid; //获取门店的更多说明



// Index-首页
export const slt_location = '/api/Index/slt_location?cpid=' + GlobalCpid     //定位当前城市    

export const getCityList = '/api/Index/getCityList?cpid=' + GlobalCpid;    //获取城市列表    

export const getHotcity = '/api/Index/getHotcity?cpid=' + GlobalCpid;     //获取热门城市    

export const getStorecity = '/api/Index/getStorecity?cpid=' + GlobalCpid;    //热门城市

export const oauth  = '/api/Accredit/oauth?cpid=' + GlobalCpid;      //oauth

export const setCookieTest  = '/api/Accredit/setCookieTest?cpid=' + GlobalCpid; 

export const getCookieTest  = '/api/Accredit/getCookieTest?cpid=' + GlobalCpid; 

// 授权-模拟登陆
export const getCompanyInfo = '/api/Index/getCompanyInfo'     // 暂时没用

export const login_test = '/api/login/login_test?cpid=' + GlobalCpid;   // 模拟登陆

export const login = '/api/Login/login?cpid=' + GlobalCpid;     //登录接口

export const check_login = '/api/Accredit/check_login?cpid=' + GlobalCpid;   //检查登录

export const check_login1 = '/api/Accredit/test/?cpid=1';   // 检查登录




// Public-公共
export const DistributionBanner = '/api/Banner/DistributionBanner?cpid=' + GlobalCpid;  // 轮播图

export const image_upload = '/api/UploadImg/image_upload?cpid=' + GlobalCpid;  // 上传图片（数据流图片）

export const deleteImg = '/api/UploadImg/del_file?cpid=' + GlobalCpid;          //删除图片         

export const sendMobile = '/api/Login/sendMobile?cpid=' + GlobalCpid;  // 发送短信


// UserInfo-用户中心
export const userInfo = '/api/User/userInfo?cpid=' + GlobalCpid;  // 用户个人信息

export const update_user = '/api/User/update_user?cpid=' + GlobalCpid;   // 修改用户信息(生日)

export const check_mobile = '/api/User/check_mobile?cpid=' + GlobalCpid;   // 更换手机号（校验验证码）

export const user_member = '/api/User/user_member'   // 会员中心

export const user_auth = '/api/User/user_auth'   // 实名认证（二期）

export const user_card_privilege = '/api/User/user_card_privilege?cpid=' + GlobalCpid;  //会员卡种接口

export const residentList = '/api/User/residentList?cpid=' + GlobalCpid;  //拉取常用联系人list

export const addResident = '/api/User/addResident?cpid=' + GlobalCpid;  //添加常用联系人

export const deleteDntList = '/api/User/deleteDntList?cpid=' + GlobalCpid;  //del常用联系人

export const apiAddInvoice = '/api/User/add_invoice?cpid=' + GlobalCpid;  //添加发票抬头

export const apiInvoiceDetail = '/api/User/invoice_detail?cpid=' + GlobalCpid;  //发票详情

export const apiInvoiceList = '/api/User/invoice_list?cpid=' + GlobalCpid;  //发票列表

export const apiInvoiceUpdate = '/api/User/invoice_update?cpid=' + GlobalCpid;  //修改发票抬头

export const apiDelInvoice = '/api/User/invoice_del?cpid=' + GlobalCpid;  //删除发票



// UserActivity-用户活动
export const get_coupon = '/api/Coupon/get_coupon' // 领取优惠卷

export const coupon_list = '/api/Coupon/coupon_list?cpid=' + GlobalCpid // 优惠卷列表

export const del_coupon = '/api/Coupon/del_coupon' // 优惠卷过期删除（后台）

export const collect_list = '/api/User/collect_list?cpid=' + GlobalCpid // 用户收藏列表

export const add_collect = '/api/User/add_collect?cpid=' + GlobalCpid // 添加收藏

export const del_collect = '/api/User/del_collect?cpid=' + GlobalCpid // 删除收藏

export const integral_detail = '/api/Credit/integral_detail?cpid=' + GlobalCpid;  // 积分明细列表

export const activity_ranking = '/api/Distribution/activity_ranking?cpid=' + GlobalCpid;  // 邀请好友排名榜

export const user_help = '/api/User/user_help' // 帮助中心

export const history_list = '/api/User/history_list' // 浏览历史列表

export const history_del = '/api/User/history_del' // 删除浏览历史

export const my_comment = '/api/Comment/my_comment' // 我的点评（二期）





// 分销相关
export const awardLists = '/api/Distribution/reward_list?cpid=' + GlobalCpid;    //奖励明细

export const withdrawMoney = '/api/Distribution/withdraw_detail?cpid=' + GlobalCpid;   //提现明细

export const showQsCode = '/api/Distribution/getEWM?cpid=' + GlobalCpid;               //二维码接口

export const extractMoney = '/api/Distribution/withdraw?cpid=' + GlobalCpid;         //提现

export const user_distribution = '/api/Distribution/distribution_userinfo?cpid=' + GlobalCpid;  //分销主页


// Order-订单
export const order_form = '/api/Order/order_form?cpid=' + GlobalCpid;    //订单预览页面

export const increase_room_num = '/api/Order/increase_room_num?cpid=' + GlobalCpid;    //订单预览页面

export const helpFriend = '/api/Distribution/subordinate?cpid=' + GlobalCpid;       //助力好友

export const create_order = '/api/Order/create_order?cpid=' + GlobalCpid;  //生成订单

export const order_list = '/api/Order/order_list?cpid=' + GlobalCpid;  //生成订单

export const cancel_orderform = '/api/Order/cancel_orderform?cpid=' + GlobalCpid;  //取消订单

export const delete_order = '/api/Order/delete_order?cpid=' + GlobalCpid;  //删除订单

export const order_detail = 'api/Order/order_detail?cpid=' + GlobalCpid;  //订单详情

export const order_cost_detail = '/api/Order/order_cost_detail?cpid=' + GlobalCpid;  //订单费用明细

export const order_preserver = '/api/Order/order_preserver?cpid=' + GlobalCpid;  //维权（申请退款）

export const balance_pay = '/api/Order/balance_pay?cpid=' + GlobalCpid;       //钱包支付（酒店订单）

export const integral_pay = '/api/Order/integral_pay?cpid=' + GlobalCpid;       //积分支付

export const coupon_pay = '/api/Order/activity_coupon?cpid=' + GlobalCpid;      //券支付全民营销

//微信分享
export const wxShare = '/api/Index/wx_share?cpid=' + GlobalCpid;       //获取参数


// UserAccount-用户账户
export const wx_pay = '/api/WxPay/pay?cpid=' + GlobalCpid;       //微信支付


// 商城部分接口-商品--Goods
export const shopType = '/api/Goods/category_list?cpid=' + GlobalCpid;  //   商品分类
// 商品列表
export const shopLists = '/api/Goods/goods_list?cpid=' + GlobalCpid;  // 商品列表
// 商品分类列表
export const shopTypeLists = '/api/Goods/category_goods?cpid=' + GlobalCpid;  // 商品分类列表
// 商品详情
export const shopDetails = '/api/Goods/goods_detail?cpid=' + GlobalCpid;  // 商品详情
// 充值
export const topUpMoney = '/api/WxPay/recharge_pay?cpid=' + GlobalCpid;     //充值
// 可用优惠券
export const usableCoupon = '/api/Goods/available_coupon?cpid=' + GlobalCpid;   //可用优惠券
// 充值明细列表
export const topUpLists = '/api/ShopOrder/recharge_list?cpid=' + GlobalCpid;    //充值列表
// 充值详情
export const topUpDetails = '/api/ShopOrder/recharge_detail?cpid=' + GlobalCpid;    //充值详情
// 下单
export const placeOrder = '/api/Goods/add_order?cpid=' + GlobalCpid;    //下单 
// 商品微信支付
export const WxPayGoods = '/api/WxPay/shop_pay?cpid=' + GlobalCpid;      //商品微信支付
// 商城订单列表
export const shopOrderLists = '/api/ShopOrder/order_list?cpid=' + GlobalCpid;       //商城订单列表
// 余额积分支付
export const balancePay = '/api/ShopOrder/goods_pay?cpid=' + GlobalCpid;        //余额积分支付
// 商品价格计算
export const goodsPrice = '/api/Goods/price?cpid=' + GlobalCpid;                //商品价格计算
// 获取下单地址
export const goodsOrderAddress = '/api/User/default_address?cpid=' + GlobalCpid;        //获取下单地址
// 获取用户收货地址列表
export const getUserGoodsAddress = '/api/User/user_address?cpid=' + GlobalCpid;     //获取用户收货地址列表
// 新增地址
export const NewAddress = '/api/User/add_address?cpid=' + GlobalCpid;           //新增地址
// 获取用户收货地址详情
export const getAddressDetails = '/api/User/addressInfo?cpid=' + GlobalCpid;        //获取用户收货地址详情
// 修改收货地址
export const amendAddress = '/api/User/update_address?cpid=' + GlobalCpid;          //修改收货地址
// 商城订单状态改变
export const orderTypeChange = '/api/ShopOrder/status_change?cpid=' + GlobalCpid;       //商城订单状态改变
// 订单详情
export const orderDetails = '/api/ShopOrder/order_detail?cpid=' + GlobalCpid;           //订单详情
// 商城申请退款
export const shopRefundMoney = '/api/ShopOrder/refund?cpid=' + GlobalCpid;                  //商城申请退款
// 获取用户钱包余额
export const walletBalance = '/api/User/userAccountDetail?cpid=' + GlobalCpid;           //获取用户钱包余额
// 省市区联动
export const getCityLists ='/api/User/getCityList?cpid=' + GlobalCpid;                  //获取省市区联动
// 商城首页接口(后来新增)
export const shopIndexPage = '/api/Goods/mainPage?cpid=' + GlobalCpid;                        //商城首页接口
// 删除地址
export const delAddress = '/api/User/del_address?cpid=' + GlobalCpid;                   //删除地址
//支付成功页面
export const paySuccess = '/api/ShopOrder/pay_success_page?cpid=' + GlobalCpid;         //支付成功页面
//我的评论列表
export const myRemarkLists = '/api/Comment/my_comment?cpid=' + GlobalCpid;          //我的评论列表
//评论标签
export const remarkTags = '/api/Comment/comment_tag?cpid=' + GlobalCpid;            //评论标签
//添加评论
export const addRemark = '/api/Comment/add_comment?cpid=' + GlobalCpid;             //添加评论
//删除评论接口
export const deleteRemark = '/api/Comment/del_comment?cpid=' + GlobalCpid;
//商城首页领取优惠券
export const getCoupon = '/api/User/send_coupon?cpid=' + GlobalCpid;



//华驿相关
//会员卡信息
export const memberMsg = '/api/CardGroup/card_list?cpid=' + GlobalCpid;             //华驿会员卡信息
//会员卡升级支付
export const payMember = '/api/WxPay/card_pay?cpid=' + GlobalCpid;                  //会员卡升级支付

//活动相关
export const couponExchange = '/api/Coupon/get_code_coupon?cpid=' + GlobalCpid;     //优惠券兑换
//大转盘奖品
export const bigDialList = '/api/Prize/prize_list?cpid=' + GlobalCpid;     //大转盘奖品
//大转盘抽奖  
export const drawPrize = '/api/Prize/draw_prize?cpid=' + GlobalCpid;     //大转盘抽奖
//邮寄奖品
export const getInformation = '/api/Prize/get_information?cpid=' + GlobalCpid;            //邮寄奖品


// 返工房
export const getFillInOrder = '/appact/Store/order_form?cpid=' + GlobalCpid;
export const getStoreLists = '/appact/Store/store_list?cpid=' + GlobalCpid;
export const getStoreDetail = '/appact/Store/store_detail?cpid=' + GlobalCpid;
export const getOrderId = '/appact/Store/create_order?cpid=' + GlobalCpid;
