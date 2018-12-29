<template>
    <div>
        <div class="myWalletBox">
            <!-- 充值金额 str -->
            <div class="topUp">
                <p>充值金额</p>
                <div class="topUpVal">
                    <span>￥</span>
                    <input v-model="topUpAmount" type="number" value="" placeholder="请输入充值金额..." />
                </div>
            </div>
            <!-- 充值金额 end -->
            <!-- 充值方式 str -->
            <ul class="payWay_package">
                <li>
                    <p>支付方式<span>微信支付</span></p>
                </li>
                <li>
                    <img src="../../../assets/images/shop/qianbao_yue.png" alt="">
                    <p>个人账户余额<span>￥{{this.avail_amount}}</span></p>
                </li>
            </ul>
            <!-- 充值方式 end -->
            <!-- 充值按钮 str -->
            <div class="packAgeBtn">
                <p @click="topUpBtn()">充值</p>
            </div>
            <!-- 充值按钮 end -->
            <!-- 充值明细 str -->
            <div class="topUpMsg">
                <p>
                    <router-link :to="{path:'topUpLists'}">
                        <span class="topUpMsgAfter">充值明细</span>
                    </router-link>
                    <router-link :to="{path:'topUpRule'}">
                        <span>规则</span>
                    </router-link>
                </p>
            </div>
            <!-- 充值明细 end -->
            <!-- 遮罩 str -->
            <div class="topUpBox" v-show="topUpBox">
                <!-- dialog(支付成功) str-->
                <div v-show="paySuccessToast">
                    <div class="z-mask-transparent-pay"></div>
                    <div class="z-toast-pay">
                        <p class="z-toast-pay-head">提示</p>
                        <p class="z-toast-pay-body">充值完成</p>
                        <p class="z-toast-pay-footer" @click="paySuccessMethod">我知道了</p>
                    </div>
                </div>
                <!-- dialog(支付成功) end-->
            </div>
            <!-- 遮罩 end -->
            <!-- toast(loading=>weui)  str -->
            <div v-show="loading">
                <div class="weui-mask_transparent"></div>
                <div class="weui-toast">
                    <i class="weui-loading weui-icon_toast"></i>
                    <p class="weui-toast__content">{{loadingTxt}}</p>
                </div>
            </div>
            <!-- toast(loading=>weui)  end -->
            <!-- toast（delay=>z）str -->
            <div v-show="delayToast">
                <div class="z-mask-transparent"></div>
                <div class="z-toast">
                    <i class="z-toast-icon"></i>
                    <p class="z-toast-content">{{delayToastTxt}}</p>
                </div>
            </div>
            <!-- toast（delay=>z）end -->
        </div>
    </div>
</template>
<style lang='less' scoped>
    @import './myWallet.less';
</style>
<script>
    import wx from "weixin-js-sdk";
    import {topUpMoney,walletBalance} from '../../../api/api.js';
    import {getCookie} from '../../../utils/util.js';
    export default {
        name: "payOrder",
        components: {
            
        },
        data() {  
            return {
                avail_amount:'',            //个人账户余额
                topUpAmount:'',             //充值金额
                loading:"",                 //loading
                loadingTxt:"",              //
                delayToast:"",              //
                delayToastTxt:"",           //
                topUpBox:false,             //遮罩
                paySuccessToast:false,      //成功提示
                topUpId:""
            }
        },
        methods: {
            paySuccessMethod(){         //跳转到订单详情页面
                this.$router.push({path:"topUpDetails",query:{topUpId:this.topUpId}})
            },
            topUpBtn(){    //充值
                let reg = new RegExp(/^[+]{0,1}(\d+)$/);
                if(!reg.test(this.topUpAmount)){
                    this.delayToast = true;
                    this.delayToastTxt = "充值金额有误！"
                    setTimeout(()=>{
                        this.delayToast = false;
                    },1500);
                    return false;
                }
                let _this = this;
                let jsApiParameters = {};
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
                let onBridgeReady = function() {
                    WeixinJSBridge.invoke(
                        "getBrandWCPayRequest",
                        jsApiParameters,
                        res => {
                            if (res.err_msg == "get_brand_wcpay_request:ok") {
                                _this.topUpBox = true;
                                _this.paySuccessToast = true;
                            }
                            if (res.err_msg == "get_brand_wcpay_request:cancel") {
                                alert("取消支付");
                            }
                        }
                    );
                };
                this.$http({
                    url:topUpMoney,
                    method:"POST",
                    data:{
                        amount:this.topUpAmount
                    }
                }).then(res=>{
                    if(res.data.status == 1){
                        let wxMsg = res.data.data;
                        this.topUpId = wxMsg.recharge_id;
                        jsApiParameters = res.data.data;
                        callpay();
                    }else{
                        this.delayToast = true;
                        this.delayToastTxt = res.data.msg;
                        setTimeout(()=>{
                            this.delayToast = false;
                        },1500);
                    }
                });
            },
            walletMsg(){                        //钱包余额
                this.loading = true;            //loading
                this.$http({
                    url:walletBalance,
                    method:"POST",
                    data:{

                    }
                }).then((res)=>{
                    this.loading = false;            //loading
                    if(res.data.status == 1){
                        this.avail_amount = res.data.data.avail_amount;
                    }else{
                        this.delayToastTxt = res.data.msg;
                        this.delayToast = true;
                        setTimeout(() => {
                            this.delayToast = false;
                        }, 1500);
                        return false;
                    }
                });
            }
        },
        mounted() {
            //个人账户余额
            this.walletMsg();
        }
    }
</script>


