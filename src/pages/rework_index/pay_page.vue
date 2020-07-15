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
		<div class="olinePay_box_content" v-if="order_id_info">
            <p class="store_name m-ellipsis">{{order_id_info.name}}</p>
            <div class="room_introduce">
                <span>订单号:</span>
                <span class="col-666">{{order_id_info.request_no}}</span>
                <span class="room_money col-666">&yen; {{order_id_info.amount}}</span>
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
        <ul class="mealList">
            <li class="walletPay">
                <p class="bd">取消规则<span>{{order_id_info.group.pre_cancel_time}}前免费取消</span></p>
            </li>
        </ul>
        <ul class="payChannel">
            <template>
                <div>
                    <li v-if="order_id_info.coupon_type != 3" class="wxPay" @click="selectPayChannel(0)">
                        <img class="hd" src="../../assets/images/shop/zhifu_wechat@1x.png" />
                        <p class="bd">微信支付</p>
                        <img class="ft" :src="radioStatus == 0 ? radioIconChecked : radioIcon" />
                    </li>
                </div>
            </template>
        </ul>
        <div class="payCell">
            <template v-if="this.setTime > 0">
                <div v-if="closeStatus > 0" class="onlinePay_btn_old">订单关闭，请重新下单</div>
                <div v-else class="onlinePay_btn" :class="{payCellBg: payType == '2' ? true : false}" @click="payMethod" >确认支付</div>
            </template>
            <template v-else>
                <div class="onlinePay_btn_old">已超时，请重新下单</div>
            </template>
        </div>
    </div>
</template>
<script>
import { order_detail, wx_pay, cancel_orderform, walletBalance, sendMobile, balancePay,balance_pay,integral_pay } from "@/api/api";
import { getCookie } from "@/utils/util";
import { fail } from 'assert';
export default {
    name: "onlinePay",
    components: {},
    data() {
        return {
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
        };
    },
    created() {
        this.order_id = this.$route.query.order_id;
        this.fetchOrderidInfo();            //拉取订单详情
    },
    mounted() {
        // 拉取定时器接口
        this.timerMethod();
    },
    methods: {
        //清除验证码
        delBtn(){
            this.codeMsgValue = "";
        },
        // 定时器的函数封装
        timerMethod(){
            // 满足预付，才触发倒计时执行；若是现付则不必执行倒计时。
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
        },
        // 拉取订单详情
        fetchOrderidInfo() {
            this.$http({
                method: "POST",
                url: order_detail,
                data: {
                    order_id: this.$route.query.order_id
                }
            }).then(res => {
                this.loading = false;
                if (res.data.status == 1) {
                    this.order_id_info = res.data.data;
                    this.setTime = res.data.data.count_down;
                    this.closeStatus = res.data.data.close_status;
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
                WeixinJSBridge.invoke(
                    "getBrandWCPayRequest",
                    jsApiParameters,
                    res => {
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
        // 支付成功toast中下面的点击按妞
        paySuccessMethod() {
            this.paySuccessToast = false;
            clearInterval(this.timer);
            this.$router.push({
                path:'reserveSuccess', 
                query:{order_id:this.order_id}
            });
        },
        // 支付成功二次提示toast中下面的跳转首页按妞
        paySuccessTwoMethod() {
            this.paySuccessTwoToast = false;
            clearInterval(this.timer);
            this.$router.push({
                path: "reserveSuccess",
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
                        path: "reserveIndex",
                        query: {}
                    });
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
@import "./pay_page.less";
</style>