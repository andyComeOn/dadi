<template>
    <div class="olinePay_box">
        <!-- toas提示(loading) -->
        <div v-show="loading">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">{{loadingTxt}}</p>
            </div>
        </div>
        <!-- dialog(支付成功) -->
        <div v-show="paySuccessToast">
            <div class="z-mask-transparent-pay"></div>
            <div class="z-toast-pay">
                <p class="z-toast-pay-head">提示</p>
                <p class="z-toast-pay-body">支付完成</p>
                <p class="z-toast-pay-footer" @click="paySuccessMethod">我知道了</p>
            </div>
        </div>
        <!-- dialog(支付成功避免二次显示倒计时支付) -->
        <div v-show="paySuccessTwoToast">
            <div class="z-mask-transparent-pay"></div>
            <div class="z-toast-pay">
                <p class="z-toast-pay-head">提示</p>
                <p class="z-toast-pay-body">您已经支付了</p>
                <p class="z-toast-pay-footer" @click="paySuccessTwoMethod">我知道了</p>
            </div>
        </div>
        <!-- 钱包支付toast提示 -->
        <div v-show="walletPayToast">
            <div class="z-mask-transparent"></div>
            <div class="z-toast">
                <i class="z-toast-icon"></i>
                <p class="z-toast-content">{{walletPayToastTxt}}</p>
            </div>
        </div>
        <!-- toast（delay=>z）str -->
        <div v-show="delayToast">
            <div class="z-mask-transparent"></div>
            <div class="z-toast">
                <i class="z-toast-icon"></i>
                <p class="z-toast-content">{{delayToastTxt}}</p>
            </div>
        </div>
        <!-- toast（delay=>z）end -->
        <!-- 支付剩余时间 -->
		<div class="olinePay_box_time">
            <h1 v-text="getTime"></h1>
            <p>支付剩余时间</p>
		</div>

        <!-- 订单详情 -->
		<div class="olinePay_box_content" v-if="order_id_info">
            <p class="store_name m-ellipsis">{{order_id_info.name}}</p>
            <div class="room_introduce">
                <span>订单号:</span>
                <span class="col-666">{{order_id_info.request_no}}</span>
                <!-- str -- 全民营销用券支付  0普通  1单位 2个人 -- str -->
                <template v-if="this.is_type == 0">
                    <div v-if="order_id_info.integral_status != 1">
                        <span class="room_money col-666">&yen; {{order_id_info.amount}}</span>
                    </div>
                    <div v-else>
                        <span class="room_money col-666">{{order_id_info.integral_amount}}积分</span>
                    </div>
                </template>
                <template v-else>
                    <div>
                        <span class="room_money col-666">&yen;0</span>
                    </div>
                </template>
                <!-- end -- 全民营销用券支付  0普通  1单位 2个人 -- end -->
            </div>
            <div class="room_introduce">
                <span>房&nbsp;&nbsp;&nbsp;&nbsp;型:</span>
                <span class="col-666">{{order_id_info.room_name}}</span>
            </div>
            <div class="room_introduce">
                <span>间&nbsp;&nbsp;&nbsp;&nbsp;数:</span>
                <span class="col-666">{{order_id_info.room_sum}}间</span>
                <span class="room_hint col-666">在线支付</span>
            </div>
            <div class="calendar">
                <span>预&nbsp;&nbsp;&nbsp;&nbsp;定:</span>
                <span class="calendar_time col-666">
                    {{order_id_info.start_time|filterTimeMM}}月{{order_id_info.start_time|filterTimeDD}}日 - {{order_id_info.end_time|filterTimeMM}}月{{order_id_info.end_time|filterTimeDD}}日
                </span>
                <span class="col-666">共{{order_id_info.occupancy_day_num}}晚</span>
            </div>
        </div>

        <!-- 一些规则 -->
        <ul class="mealList">
            <li class="wxPay">
                <template>
                    <p class="bd" v-if="this.is_type == 0">早餐<span>{{order_id_info.group.breakfast}}</span></p>
                    <p class="bd" v-else>早餐<span>活动产品不含早餐</span></p>
                </template>
            </li>
            <li class="walletPay">
                <p class="bd">取消规则<span>{{order_id_info.group.pre_cancel_time}}前免费取消</span></p>
            </li>
            <li class="walletPay">
                <p class="bd">退房规则<span>延迟退房{{order_id_info.group.delay_room}}</span></p>
            </li>
        </ul>

        <!-- 区分之前的正常支付，还是电子卖房券 -->
        <ul class="payChannel">
            <!-- 全民营销用券支付  0普通  1单位 2个人 -->
            <template v-if="this.is_type == 0">
                <div v-if="order_id_info.integral_status != 1">
                    <li v-if="order_id_info.coupon_type != 3" class="wxPay" @click="selectPayChannel(0)">
                        <img class="hd" src="../../assets/images/shop/zhifu_wechat@1x.png" />
                        <p class="bd">微信支付</p>
                        <img class="ft" :src="radioStatus == 0 ? radioIconChecked : radioIcon" />
                    </li>
                    <li class="walletPay" @click="selectPayChannel(1)">
                        <img class="hd" src="../../assets/images/shop/zhifu_qianbao@1x.png" />
                        <p class="bd">钱包支付 <span>(余额 ¥{{ balance.avail_amount }})</span> </p>
                        <img class="ft" :src="radioStatus == 1 ? radioIconChecked : radioIcon" />
                    </li>
                </div>
                <div v-else>
                    <li class="walletPay" @click="selectPayChannel(2)">
                        <img class="hd" src="../../assets/images/shop/jifen.png" />
                        <p class="bd">积分兑换 <span>(剩余积分{{ balance.credit }})</span> </p>
                        <img class="ft" :src="radioStatus == 2 ? radioIconChecked : radioIcon" />
                    </li>
                </div>
            </template>

            <!-- 电子房券cell -->
            <template v-else>
                <ul class="mealList">
                    <li class="wxPay" @click="showCouponMask">
                        <p class="bd">电子房券 <span>{{this.coupon_text}}</span></p>
                        <img src="../../assets/images/arrows/ic-arrow_10_18.png" />
                    </li>
                </ul>
            </template>

        </ul>

        <!-- 超时提示 -->
        <div class="payCell">
            <template v-if="this.setTime > 0">
                <div v-if="closeStatus > 0" class="onlinePay_btn_old">订单关闭，请重新下单</div>
                <div v-else class="onlinePay_btn" :class="{payCellBg: payType == '2' ? true : false}" @click="payChannelMethod" >确认支付</div>
            </template>
            <template v-else>
                <div class="onlinePay_btn_old">已超时，请重新下单</div>
            </template>
        </div>

        <!-- str -- 优惠券选择 -- str -->
        <div class="weui-mask" @click.stop="hideCouponMask" v-show="isCouponMask == true">
            <div class="couponMaskWrap" id="weui-actionsheet" @click.stop="showCouponMask">
                <div class="couponTitle">
                    <span>优惠券</span>
                    <img @click.stop="hideCouponMask" src="../../assets/images/coupon/popup_close.png" alt="">
                </div>
                <ul class="weui-actionsheet__menu couponMeun" v-if="this.couponArr.length > 0">
                    <!-- 循环下面的整体 -->
                    <li class="zb-actionsheet__bd" v-for="(item,index) in this.couponArr" :key="index">
                        <div class="weui-cells zb-weui-cells weui-cells_checkbox">
                            <label class="weui-cell zb-weui-cell weui-check__label" :for="item.id" @click.stop="checkboxCoupon(item.id,item.coupon_ccc)">
                                <div class="weui-cell__bd div zb-weui-cell__hd">
                                    <h4>{{item.coupon_name}}</h4>
                                    <p>有效期:{{item.validity_end_time}}</p>
                                </div>
                                <div class="weui-cell__hd div" >
                                    <input type="checkbox" class="weui-check" :disabled='item.coupon_ccc == 3' :id="item.id" @click.stop>
                                    <i :class="{'weui-icon-checked':true,'coupon_ccc':item.coupon_ccc == 3}"></i>
                                </div>
                            </label>
                            <template>
                                <p class="free_room_coupon">电子房券</p>
                            </template>
                        </div>
                    </li>
                </ul>
            </div>
        </div>


        <!-- 钱包支付验证码弹框 -->
        <div class="walletPayCodeToast" v-if='isWalletPayCodeToastShow' @click.stop.prevent.self="walletPayToastMethod">
            <div class="walletPayCodeWrap">
                <h3>
                    <span>输入短信验证码</span>
                    <img src="../../assets/images/icon/ic-close-card.png" @click.stop="walletPayToastMethod"/>
                </h3>
                <p class="tips">已发送至手机号{{userTel}}</p>
				<div class="codeBox">
					<div class="codeInput">
						<input v-model="codeMsgValue" type="number" class="ipt">
						<span v-if="codeMsgValue != ''" class="delBtn" @click='delBtn'></span>
					</div>
					<div class="codeBtn" v-if='sendMsgType == true' @click.stop="getCodeEv()">获取验证码</div>
					<div class="codeMsg" v-else>{{this.setTimeCode}}s后重新发送</div>
				</div>

				<div class="payBar">

                    <template v-if="this.is_type == 0">
                        <div v-if="order_id_info.integral_status != 1">
                            <p class="payBarTxt" v-if="codeMsgValue.length == 4" @click.stop="balancePayMethod(1)">确认支付&yen;{{order_id_info.amount}}</p>
                            <p class="payBarTxt_nor" v-else>确认支付&yen;{{order_id_info.amount}}</p>
                        </div>
                        <div v-else>
                            <p class="payBarTxt" v-if="codeMsgValue.length == 4" @click.stop="balancePayMethod(2)">确认支付{{order_id_info.integral_amount}}积分</p>
                            <p class="payBarTxt_nor" v-else>确认支付{{order_id_info.integral_amount}}积分</p>
                        </div>
                    </template>
                    
                    <template v-else>
                        <div>
                            <p class="payBarTxt" v-if="codeMsgValue.length == 4" @click.stop="balancePayMethod(3)">确认支付&yen;0</p>
                            <p class="payBarTxt_nor" v-else>确认支付&yen;0</p>
                        </div>
                    </template>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import { order_detail, wx_pay, cancel_orderform, walletBalance, sendMobile, balancePay,balance_pay,integral_pay,coupon_pay } from "@/api/api";
import { getCookie } from "@/utils/util";
import { Toast } from 'vant';
export default {
    name: "onlinePay",
    data() {
        return {
            // 优惠券
            initCoupon: [],
            coupon_text:"", //需要电子房券*
            isCouponMask:false,
            is_type:"", //0普通 1单位 2个人  用券支付
            setTime: "", //15分钟即900s，自己调整!
            getTime: "", //15:00
            order_id_info: "",
            loading: true,
            delayToast:false,
            delayToastTxt:"",
            paySuccessToast: false, //支付成功toast
            paySuccessTwoToast: false, // 支付后toast二次提示，引导进入首页
            timer: "",
            loadingTxt: "数据加载中",
			payType: "1",  // 该订单的默认支付类型赋值为现付
			store_type: "1",  // 区别全日房和时租房
            payChannel: [
                {imgIcon: require("../../assets/images/shop/zhifu_wechat@1x.png"), txt: "微信支付", clickIcon: "../../assets/images/shop/checkbox_normal@1x.png"},
                {imgIcon: require("../../assets/images/shop/zhifu_qianbao@1x.png"), txt: "钱包支付", clickIcon: "../../assets/images/shop/checkbox_normal@1x.png"}
            ],
            balance: "",
            radioIcon: require("../../assets/images/icon/ic-radio.png"), // radio的选中与否的icon
            radioIconChecked: require("../../assets/images/icon/ic-radio-ed.png"), // radio的选中与否的icon
            radioStatus: 0,     // 默认的radio的状态是0
            walletPayToastTxt: "", // 钱包支付Toast文案
            walletPayToast: false, // 钱包支付Toast控制
			isWalletPayCodeToastShow: false, // 钱包支付验证码toast控制
			setTimeCode: 59,
            userTel: getCookie('userInfoTel'),  // 手机号获取
            sendMsgType:true,           //获取验证码状态
            closeStatus:"",             //订单状态
            codeMsgValue: "",  // 验证码
            couponArr:[]
        };
    },
    created() {
        this.order_id = this.$route.query.order_id;
        this.payType = this.$route.query.payType;
        this.fetchOrderidInfo();            //拉取订单详情
    },
    mounted() {
        // 拉取定时器接口
        this.timerMethod();
        // 调取“拉取用户钱包余额”函数
        this.fetchWalletBalance();
    },
    methods: {
        //选择房券
        checkboxCoupon(_id,is_coupon_ccc){
            if(is_coupon_ccc == 3){
                Toast('不可选择该优惠券');
                return false;
            }else{
                if(this.initCoupon.length == 0){
                    for(var j=0;j<this.couponArr.length;j++){
                        if(this.couponArr[j].id == _id){
                            this.couponArr[j].is_true = true;
                            this.couponArr[j].coupon_ccc = 2;
                        }
                    }
                    this.initCoupon.push(_id);
                }else{
                    if(this.initCoupon.indexOf(_id) == -1){
                        for(var i=0;i<this.couponArr.length;i++){
                            if(this.couponArr[i].id == _id){
                                this.couponArr[i].is_true = true;
                                this.couponArr[i].coupon_ccc = 2;
                            }
                        }
                        this.initCoupon.push(_id);
                    }else{
                        for(var k=0;k<this.couponArr.length;k++){
                            if(this.couponArr[k].id == _id){
                                this.couponArr[k].is_true = "";
                                this.couponArr[k].coupon_ccc = 1;
                            }
                        }
                        let i = this.initCoupon.indexOf(_id);
                        this.initCoupon.splice(i,1);
                    }
                }
                if(this.initCoupon.length != 0){
                    this.coupon_text = '已经选择电子房券*' + this.initCoupon.length;
                }else{
                    this.coupon_text = "需要电子房券*" + this.order_id_info.order_coupon_all;
                }
                if(this.initCoupon.length == this.order_id_info.order_coupon_all){
                    for(var m=0;m<this.couponArr.length;m++){
                        if(this.couponArr[m].coupon_ccc == 1){
                            this.couponArr[m].coupon_ccc = 3;
                        }
                    }
                    this.isCouponMask = false;
                }else{
                    for(var m=0;m<this.couponArr.length;m++){
                        if(this.couponArr[m].coupon_ccc == 3){
                            this.couponArr[m].coupon_ccc = 1;
                        }
                    }
                }
            }
        },
        // 展示优惠券遮罩
        showCouponMask() {
            this.isCouponMask = true;
        },
        // 隐藏优惠券遮罩
        hideCouponMask() {
            this.isCouponMask = false;
        },
        //清除验证码
        delBtn(){
            this.codeMsgValue = "";
        },
        // 定时器的函数封装
        timerMethod(){
            // 满足预付，才触发倒计时执行；若是现付则不必执行倒计时。
            if (this.payType == 2) {
                this.timer = setInterval(() => {
                    if (this.setTime >= 0) {
                        let tmpMin = Math.floor(this.setTime / 60);
                        let min = tmpMin < 10 ? "0" + tmpMin : tmpMin;
                        let tmpSec = Math.floor(this.setTime % 60);
                        let sec = tmpSec < 10 ? "0" + tmpSec : tmpSec;
                        this.getTime = min + ":" + sec;
                        this.setTime--;
                    } else {
                        clearInterval(this.timer);
                        this.isWalletPayCodeToastShow = false;  //超时隐藏钱包支付弹窗
                    }
                }, 1000);
            }
        },
        // 拉取订单详情
        fetchOrderidInfo() {
            this.$http({
                method: "POST",
                url: order_detail,
                data: {
                    order_id: this.order_id
                }
            }).then(res => {
                this.loading = false;
                if (res.data.status == 1) {
                    this.order_id_info = res.data.data;
                    this.setTime = res.data.data.count_down;
                    this.is_type = res.data.data.is_type;
                    this.closeStatus = res.data.data.close_status;
                    if(res.data.data.coupon){
                        let _couponArr = res.data.data.coupon;
                        for(var i=0;i<_couponArr.length;i++){
                            _couponArr[i].is_true = "";
                            _couponArr[i].coupon_ccc = 1;
                        }
                        this.couponArr = _couponArr;
                        console.log(this.couponArr);
                    }
                    this.coupon_text="需要电子房券*" + res.data.data.order_coupon_all;
                    if(res.data.data.integral_status == 1){
                        this.radioStatus = 2;
                    }else if(res.data.data.coupon_type == 3){
                        this.radioStatus = 1;
                    }
                    if(res.data.data.count_down > 0){
                        if(res.data.data.close_status > 0){
                            this.delayToast = true;
                            this.delayToastTxt = '订单创建失败，已为您退款。请重新下单！';
                            setTimeout(()=>{
                                this.delayToast = false;
                            },1500);
                        }else if(res.data.data.pay_status == 1 && res.data.data.close_status == 0){
                            this.paySuccessTwoToast = true;
                        }else if(res.data.data.pay_status == 0){
                            this.delayToast = true;
                            this.delayToastTxt = '等待支付';
                            setTimeout(()=>{
                                this.delayToast = false;
                            },1500);
                        }
                    }else{
                        this.delayToast = true;
                        this.delayToastTxt = '已超时，请重新下单';
                        setTimeout(()=>{
                            this.delayToast = false;
                        },1500);
                    }
                }else{
                    this.delayToast = true;
                    this.delayToastTxt = res.data.msg;
                    setTimeout(()=>{
                        this.delayToast = false;
                    },1500);
                }
            });
        },
        // 立即支付按钮
        payMethod() {
            this.loadingTxt = "微信支付调取中";
            this.loading = true;
            let _this = this;
            let jsApiParameters = {};
            let onBridgeReady = function() {
                WeixinJSBridge.invoke( "getBrandWCPayRequest", jsApiParameters, res => {
                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                            _this.paySuccessToast = true;
                        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                            alert("取消支付");
                            window.location.reload();
                        } else {

                        }
                    }
                );
            };
            let callpay = function() {
                if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                        document.addEventListener(
                            "WeixinJSBridgeReady",
                            onBridgeReady,
                            false
                        );
                    } else if (document.attachEvent) {
                        document.attachEvent(
                            "WeixinJSBridgeReady",
                            onBridgeReady
                        );
                        document.attachEvent(
                            "onWeixinJSBridgeReady",
                            onBridgeReady
                        );
                    }
                } else {
                    onBridgeReady();
                }
            };
            // 请求支付接口
            this.$http({
                method: "POST",
                url: wx_pay,
                data: {
                    orderid: this.order_id
                }
            }).then(res => {
                if (res.data.status == 1) {
                    this.loading = false;
                    jsApiParameters = JSON.parse(res.data.data);
                    callpay();
                } else {
                    this.loading = false;
                    alert(res.data.msg);
                    // 调取取消订单方法（这是临时为了解决啥问题后台让调的）
                    // 这是为了解决微信支付时，临近15min，禁止交易。
                    // （如：有一个老人在倒计时14:40秒去支付，可能在输密码过程中，倒计时已经走完）
                    this.cancal();
                }
            });
        },

        // 支付渠道的判断
        payChannelMethod(){
            if(this.is_type != 0){
                if(this.initCoupon.length < this.order_id_info.order_coupon_all){
                    Toast("选择电子房券不能少于需要电子房券");
                }else if(this.initCoupon.length > this.order_id_info.order_coupon_all){
                    Toast("选择电子房券不能大于需要电子房券");
                }else{
                    this.isWalletPayCodeToastShow = true;
                }
            }else{
                if (this.radioStatus === 0) {
                    this.payMethod();       //微信支付
                } else if(this.radioStatus == 1) {
                    if ( Number(this.balance) < Number(this.order_id_info.amount) ) {
                        this.walletPayToastTxt = "钱包余额不足";
                        this.walletPayToast = true;
                        setTimeout(() => {
                            this.walletPayToast = false;
                        }, 1500);
                    } else {
                        this.isWalletPayCodeToastShow = true;
                    }
                }else{
                    this.isWalletPayCodeToastShow = true;
                }
            }

        },
        //订单详情
        payOrderDetails(){
            this.$router.push({
                path:"orderDetail",
                query:{
                    order_id:this.$route.query.order_id
                }
            });
        },
        // 支付成功toast中下面的点击按妞
        paySuccessMethod() {
            this.paySuccessToast = false;
            clearInterval(this.timer);
            this.$router.push({
                path:'orderDetail',
                query:{order_id:this.order_id}
            });
        },
        // 支付成功二次提示toast中下面的跳转首页按妞
        paySuccessTwoMethod() {
            this.paySuccessTwoToast = false;
            clearInterval(this.timer);
            this.$router.push({
                path: "/",
                query: {}
            });
        },
        // 取消订单
        cancal() {
            this.$http({
                method: "POST",
                url: cancel_orderform,
                data: {
                    order_id: this.order_id,
                    status: 0
                }
            }).then(res => {
                if (res.data.status == 1) {
                    clearInterval(this.timer);
                    this.$router.push({
                        path: "/",
                        query: {}
                    });
                }
            });
        },
        // 选取支付渠道
        selectPayChannel(ind) {
            this.radioStatus = ind;
        },
        // 拉取用户钱包余额
        fetchWalletBalance(){
            this.$http({
                method: "POST",
                url: walletBalance,
                data: {}
            }).then(res => {
                if (res.data.status == 1) {
                    this.balance = res.data.data;
                }else{
                    this.delayToast = true;
                    this.delayToastTxt = res.data.msg;
                    setTimeout(()=>{
                        this.delayToast = false;
                    },1500);
                }
            });
        },
		// 获取验证码
		getCodeEv() {
            let codeType;
            if(this.is_type == 0){
                if(this.radioStatus == 2){
                    codeType = 12;
                }else{
                    codeType = 11;
                }
            }else{
                codeType = 14;
            }
            this.$http({
                method: "POST",
                url: sendMobile,
                data: {
                    mobile: this.userTel,
                    type:codeType
                }
            }).then(res => {
                if (res.data.status == 1) {
                    this.setTimeCode = 59; // 重新赋值
                    this.sendMsgType = false;
                    let timer = setInterval(() => {
                        if (this.setTimeCode >= 0) {
                            let tmpSec = parseInt(this.setTimeCode);
                            this.setTimeCode--;
                        } else {
                            clearInterval(timer);
                            this.sendMsgType = true;
                        }
                    }, 1000);
                } else {
                    this.walletPayToastTxt = res.data.msg;
                    this.walletPayToast = true;
                    setTimeout(() => {
                        this.walletPayToast = false;
                    }, 1500);
                }
            });
		},
		// 确认使用钱包支付
		balancePayMethod(ind){
            if(ind == 1){
                this.balancePay();  //余额支付
            }else if(ind == 2){
                this.integralPay();   //积分支付
            }else if(ind == 3){
                this.couponPay();    //优惠券支付
            }
        },

        couponPay(){ //券支付
            this.loading = true;            //loading
            this.$http({
                url:coupon_pay,
                method:"POST",
                data:{
                    order_id: this.order_id,                 //订单id
                    code: this.codeMsgValue,                 //验证码
                    mobile: getCookie("userInfoTel"),        //手机号
                    coupon_ids:this.initCoupon.toString()
                }
            }).then((res)=>{
                this.loading = false;            //loading
                if(res.data.status == 1){
                    this.isWalletPayCodeToastShow = false;
                    this.walletPayToastTxt = res.data.msg;
                    this.walletPayToast = true;
                    setTimeout(() => {
                        this.walletPayToast = false;
                        this.$router.push({
                            path:'orderDetail',
                            query:{order_id:this.order_id}
                        });
                    }, 1500);
                }else{
                    this.walletPayToastTxt = res.data.msg;
                    this.walletPayToast = true;
                    setTimeout(() => {
                        this.walletPayToast = false;
                    }, 1500);
                }
            });
        },

        //余额支付
        balancePay(){
            this.loading = true;            //loading
            this.$http({
                url:balance_pay,
                method:"POST",
                data:{
                    order_id: this.order_id,                 //订单id
                    code: this.codeMsgValue,                 //验证码
                    mobile: getCookie("userInfoTel"),        //手机号
                }
            }).then((res)=>{
                this.loading = false;            //loading
                if(res.data.status == 1){
                    this.isWalletPayCodeToastShow = false;
                    this.walletPayToastTxt = res.data.msg;
                    this.walletPayToast = true;
					setTimeout(() => {
                        this.walletPayToast = false;
                        this.$router.push({
                            path:'orderDetail',
                            query:{order_id:this.order_id}
                        });
					}, 1500);
                }else{
                    this.walletPayToastTxt = res.data.msg;
					this.walletPayToast = true;
					setTimeout(() => {
						this.walletPayToast = false;
					}, 1500);
                }
            });
        },
        //积分支付
        integralPay(){
            this.loading = true;            //loading
            this.$http({
                url:integral_pay,
                method:"POST",
                data:{
                    order_id: this.order_id,                 //订单id
                    code: this.codeMsgValue,                 //验证码
                    mobile: getCookie("userInfoTel"),        //手机号
                }
            }).then((res)=>{
                this.loading = false;            //loading
                if(res.data.status == 1){
                    this.isWalletPayCodeToastShow = false;
                    this.walletPayToastTxt = res.data.msg;
                    this.walletPayToast = true;
					setTimeout(() => {
                        this.walletPayToast = false;
                        this.$router.push({
                            path:'orderDetail',
                            query:{order_id:this.order_id}
                        });
					}, 1500);
                }else{
                    this.walletPayToastTxt = res.data.msg;
					this.walletPayToast = true;
					setTimeout(() => {
						this.walletPayToast = false;
					}, 1500);
                }
            });
        },
		// 钱包支付toast的操作
		walletPayToastMethod(){
			this.isWalletPayCodeToastShow = false;
		}
    }
};
</script>
<style lang="less" scoped>
@import "./onlinePay";
</style>
