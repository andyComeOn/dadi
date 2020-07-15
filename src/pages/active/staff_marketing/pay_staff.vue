<template>
    <div>
        <div class="shopDetails">
            <h3>您将选购以下商品</h3>
            <div class="shopLists">
                <p v-for="item in shopArr">
                    <span>{{item.name}}</span>
                    <span>X{{item.num}}</span>
                </p>
            </div>
        </div>
        <div class="shop_money_box">
            <div class="shop_money">
                <img class="shop_money_icon" src="../../../assets/images/active/staff_index/money.png" />
                <h3>
                    总价: &yen;<span class="amount">{{this.sumAmount}}</span>
                </h3>
                <p>选择支付方式</p>
                <div class="choose_way">
                    <!-- <img src="../images/head_line/wx_icon.png" /> -->
                    <span>微信支付</span>
                    <!-- <img src="../images/head_line/check.png" /> -->
                </div>
            </div>
        </div>
        <div class="payBtn_box">
            <div class="pay_btn" @click="payBtn()">立即支付</div>
        </div>
        <!-- toast(loading=>weui) -->
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
    </div>
</template>
<script>
    import { staffOrderDetails,payStaffApi } from '../../../api/active.js';
    import { Toast } from 'vant';
    export default {
        data(){
            return {
                shopArr:[],
                loading:false,
                loadingTxt:"数据加载中",
                paySuccessToast:false,
                paySuccessTwoToast:false,
                sumAmount:""
            }
        },
        methods: {
            payBtn(){
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
                    url: payStaffApi,
                    data: {
                        order_id:this.$route.query.order_id
                    }
                }).then(res => {
                    if (res.data.status == 1) {
                        this.loading = false;
                        jsApiParameters = JSON.parse(res.data.data);
                        callpay();
                    } else {
                        this.loading = false;
                        Toast(res.data.msg);
                        // 调取取消订单方法（这是临时为了解决啥问题后台让调的）
                        // 这是为了解决微信支付时，临近15min，禁止交易。
                        // （如：有一个老人在倒计时14:40秒去支付，可能在输密码过程中，倒计时已经走完）
                        // this.cancal();
                    }
                });
            },
            // 支付成功toast中下面的点击按妞
            paySuccessMethod() {
                this.paySuccessToast = false;
                this.$router.push({path:'myCoupon'});
            },
            // 支付成功二次提示toast中下面的跳转首页按妞
            paySuccessTwoMethod() {
                this.paySuccessTwoToast = false;
                this.$router.push({path: "/"});
            },
        },
        mounted() {
            this.loading = true;
            this.$http({
                url:staffOrderDetails,
                method:"POST",
                data:{
                    order_id:this.$route.query.order_id
                }
            }).then(res => {
                this.loading = false;
                if(res.data.status == 1){
                    this.sumAmount = res.data.data.data.amount;
                    this.shopArr = res.data.data.info;
                }else{
                    Toast(res.data.msg);
                }
            });
        },
    }
</script>
<style lang="less" scoped>
    @import './pay_staff.less';
</style>