//baseUrl
export const baseUrl = 'www.test.zhaojin9.com';
//cpid
// global.GlobalCpid = sessionStorage.getItem(CPID);
global.GlobalCpid = 1;


// Stroe-酒店
export const store_list = '/api/Store/store_list'  // 门店列表（查询酒店）   

export const store_detail = '/api/StoreRoomType/store_detail'    // 门店详情 (房间列表)


// Index-首页
export const slt_location = '/api/Index/slt_location'     //定位当前城市    

export const getCityList = '/api/Index/getCityList'     //获取城市列表    

export const getHotcity = '/api/Index/getHotcity'      //获取热门城市    

export const getStorecity = '/api/Index/getStorecity'     //门店城市统计

// 授权-模拟登陆
export const oauth = '/api/Index/oauth'       //授权  

export const getCompanyInfo = '/api/Index/getCompanyInfo'     //

export const login_test = '/api/login/login_test?cpid=' + GlobalCpid;   // 模拟登陆


// Public-公共
export const DistributionBanner = '/api/Banner/DistributionBanner'  // 轮播图

export const image_upload = '/api/UploadImg/image_upload'  // 上传图片（数据流图片）

export const sendMobile = '/api/Login/sendMobile?cpid=' + GlobalCpid;  // 发送短信


// UserInfo-用户中心
export const userInfo = '/api/User/userInfo?cpid=' + GlobalCpid;  // 用户个人信息

export const update_user = '/api/User/update_user'   // 修改用户信息(生日)

export const check_mobile = '/api/User/check_mobile?cpid=' + GlobalCpid;   // 更换手机号（校验验证码）

export const user_member = '/api/User/user_member'   // 会员中心

export const user_auth = '/api/User/user_auth'   // 实名认证（二期）

export const user_card_privilege = '/api/User/user_card_privilege?cpid=' + GlobalCpid;  //生成订单



// UserActivity-用户活动
export const get_coupon = '/api/Coupon/get_coupon' // 领取优惠卷

export const coupon_list = '/api/Coupon/coupon_list' // 优惠卷列表

export const del_coupon = '/api/Coupon/del_coupon' // 优惠卷过期删除（后台）

export const collect_list = '/api/User/collect_list' // 用户收藏列表

export const add_collect = '/api/User/add_collect?cpid=' + GlobalCpid // 添加收藏

export const del_collect = '/api/User/del_collect' // 删除收藏

export const integral_detail = '/api/Credit/integral_detail'   // 积分明细列表

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






//微信分享
export const wxShare = '/api/Index/wx_share?cpid=' + GlobalCpid;       //获取参数
