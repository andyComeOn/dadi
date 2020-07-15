<template>
    <div>
        <div class="payWay">
            <ul>
                <li v-for='(item,index) in payWayArr' @click="payWayBoxBtn(index)" :key="index">
                    <img :src="item.payWayIcon" alt="">
                    <span>{{item.payWayName}}</span>
                    <img v-if='index == choosePayWayInd && consumeType != 2' :src="choosePayWayImg" alt="">
                    <img v-else-if="consumeType != 2" :src="choosePayWayNoImg" alt="">
                </li>
                <li class="payMoney">
                    <span>需支付</span>
                    <span v-if="this.$route.query.consumeType == 1">￥<i>{{this.$route.query.totalPrices}}</i></span>
                    <span v-if="this.$route.query.consumeType == 2"><b>{{this.$route.query.totalIntegral}}</b>积分</span>
                    <span v-if="this.$route.query.consumeType == 3">￥<i>{{this.$route.query.totalPrices}}</i>+<b>{{this.$route.query.totalIntegral}}</b>积分</span>
                </li>
            </ul>
            <div class="payBtnOk" @click="payBtnOk()">
                <p>确认支付</p>
            </div>
        </div>
        
        <!-- 遮罩 str -->
        <div class="payBox" v-if='payBox == true' @click.self="payBoxBtn()">
            <!-- 输入短信验证码 str -->
            <div class="msgCode" v-if="msgCodeBox == true">
                <h3>
                    <span>输入短信验证码</span>
                    <img src="../../../assets/images/shop/popup_close.png" alt="" @click.stop="msgCodeBtn()">
                </h3>
                <p class="">已发送至手机号{{mobile}}</p>
                <div class="msgCodeInp">
                    <input v-model="codeMsgValue" type="text" value="" placeholder="" />
                    <img v-if="codeMsgValue != ''" src="../../../assets/images/shop/text_close.png" alt="" @click="codeMsgValue = ''">
                    <span v-if='sendCodeMsg == true' @click="sendCode()">发送验证码</span>
                    <span class="codeMsg" v-else>{{getTime}}s后重发</span>
                </div>
                <div class="msgPayBtn" v-if='codeMsgValue.length  != 4'>
                    <p v-if="this.consumeType == 3">确认支付￥<span>{{totalPrices}}</span>+{{totalIntegral}}积分</p>
                    <p v-if="this.consumeType == 2">确认支付<span>{{totalIntegral}}积分</span></p>
                    <p v-if="this.consumeType == 1">确认支付<span>￥{{totalPrices}}</span></p>
                </div>
                <div v-else class="msgPayBtnActive" @click="balancePayBtn()">
                    <p v-if="this.consumeType == 3">确认支付￥<span>{{totalPrices}}</span>+{{totalIntegral}}积分</p>
                    <p v-if="this.consumeType == 2">确认支付<span>{{totalIntegral}}积分</span></p>
                    <p v-if="this.consumeType == 1">确认支付<span>￥{{totalPrices}}</span></p>
                </div>
            </div>
            <!-- 输入短信验证码 end -->
            <!-- dialog(支付成功) -->
            <div v-show="paySuccessToast">
                <div class="z-mask-transparent-pay"></div>
                <div class="z-toast-pay">
                    <p class="z-toast-pay-head">提示</p>
                    <p class="z-toast-pay-body" v-if="this.$route.query.consumeType == 1">支付完成￥<i>{{this.$route.query.totalPrices}}</i></p>
                    <p class="z-toast-pay-body" v-if="this.$route.query.consumeType == 2">支付完成<b>{{this.$route.query.totalIntegral}}</b>积分</p>
                    <p class="z-toast-pay-body" v-if="this.$route.query.consumeType == 3">支付完成￥<i>{{this.$route.query.totalPrices}}</i>+<b>{{this.$route.query.totalIntegral}}</b>积分</p>
                    <p class="z-toast-pay-footer" @click="paySuccessMethod">我知道了</p>
                </div>
            </div>
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
</template>
<style lang="less" scoped>
    @import "./payPage.less";
</style>
<script>
    import {WxPayGoods,sendMobile,balancePay,walletBalance,orderDetails} from '../../../api/api.js';
    import { getCookie } from "../../../utils/util.js";
    import wx from "weixin-js-sdk";
    export default {
        name: "payPage",
        components: {
            
        },
        data() {  
            return {
                payWayArr: [
                    {
                        payWayIcon: require("../../../assets/images/shop/zhifu_wechat@1x.png"),
                        payWayName: "微信支付"
                    },
                    {
                        payWayIcon: require("../../../assets/images/shop/zhifu_qianbao@1x.png"),
                        payWayName: ""
                    }
                ],
                choosePayWayInd: 0,
                choosePayWayNoImg: require("../../../assets/images/shop/checkbox_normal@1x.png"),
                choosePayWayImg: require("../../../assets/images/shop/checkbox_selected@1x.png"),
                loading: false,             // loading是否显示
                loadingTxt: "加载中...",    
                delayToast: false,
                delayToastTxt: "",
                mobile:"",                  //手机号
                codeMsgValue:"",            //验证码输入
                sendCodeMsg:true,           //切换发送验证码
                setTime: 58,
                getTime: "59",
                consumeType:"",             //支付方式  1现金  2积分  3现金加积分
                totalPrices:"",             //总价格
                totalIntegral:"",           //总积分
                avail_amount:"",            //钱包余额
                MobileType:8,               //默认钱包支付
                payBox:false,               //遮罩
                msgCodeBox:false,           //短信验证弹窗
                paySuccessToast:false,      //支付成功后弹窗
            }
        },
        created () {
            this.walletMsg();           //获取钱包余额
        },
        methods: {
            paySuccessMethod(){        //支付成功后跳转
                this.$router.push({path:'paySuccess',query:{orderId:this.$route.query.orderId}});
            },
            payWayBoxBtn(payWayNum) {           //选择支付方式
                if(this.$route.query.consumeType == 2){
                    // this.delayToastTxt = '不用选择支付方式';
                    // this.delayToast = true;
                    // setTimeout(() => {
                    //     this.delayToast = false;
                    // }, 1500);
                    // this.choosePayWayInd = -1;
                    // return false;
                }else{
                    this.choosePayWayInd = payWayNum;           //0微信   1钱包
                }
            },
            payBtnOk(){                 //确定支付
                this.loading = true;
                let _this = this;
                let jsApiParameters = {};
                let onBridgeReady = function() {
                    WeixinJSBridge.invoke(
                        "getBrandWCPayRequest",
                        jsApiParameters,
                        res => {
                            if (res.err_msg == "get_brand_wcpay_request:ok") {
                                _this.payBox = true;
                                _this.paySuccessToast = true;
                            }
                            if (res.err_msg == "get_brand_wcpay_request:cancel") {
                                alert("取消支付");
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
                if(this.consumeType == 1 || this.consumeType == 3){         //确定支付方式   现金支付及积分支付
                    if(this.choosePayWayInd == 0){          //现金支付
                        this.$http({
                            url:WxPayGoods,
                            method:'POST',
                            data:{
                                order_id:this.$route.query.orderId
                            }
                        }).then(res=>{
                            this.loading = false;            //loading
                            if(res.data.status == 1){
                                // alert(res.data.data);
                                jsApiParameters = JSON.parse(res.data.data);
                                callpay();
                            }else{
                                this.delayToastTxt = res.data.msg;
                                this.delayToast = true;
                                setTimeout(() => {
                                    this.delayToast = false;
                                }, 1500);
                                return false;
                            }
                        });
                    }else if(this.choosePayWayInd == 1){    //钱包支付
                        this.loading = false;            //loading
                        if(Number(this.avail_amount) < Number(this.$route.query.totalPrices)){
                            this.delayToastTxt = '钱包余额不足';
                            this.delayToast = true;
                            setTimeout(() => {
                                this.delayToast = false;
                            }, 1500);
                        }else{
                            this.payBox = true;             //遮罩
                            this.msgCodeBox = true;         //短信验证码弹窗
                        }
                    }else{                                  //选择支付方式提示
                        this.loading = false;            //loading
                        this.delayToastTxt = '请选择支付方式';
                        this.delayToast = true;
                        setTimeout(() => {
                            this.delayToast = false;
                        }, 1500);
                        return false;
                    }
                }else{      //积分支付
                    this.loading = false;            //loading
                    this.payBox = true;             //遮罩
                    this.msgCodeBox = true;         //短信验证码弹窗
                }
            },
            sendCode(){                         //发送验证码按钮
                this.loading = true;            //loading
                if(this.consumeType == 2){          //积分支付
                    this.MobileType = 9;
                }
                this.$http({
                    url:sendMobile,
                    method:'POST',
                    data:{
                        mobile:getCookie('userInfoTel'),
                        type:this.MobileType
                    }
                }).then(res=>{
                    console.log(res);
                    this.loading = false;            //loading
                    if(res.data.status == 1){
                        this.sendCodeMsg = false;
                        let timer = setInterval(() => {
                            if (this.setTime >= 0) {
                                let tmpMin = Math.floor(this.setTime / 60);
                                let min = tmpMin < 10 ? "0" + tmpMin : tmpMin;
                                let tmpSec = Math.floor(this.setTime % 60);
                                let sec = tmpSec < 10 ? "0" + tmpSec : tmpSec;
                                this.getTime = sec;
                                this.setTime--;
                            } else {
                                clearInterval(timer);
                                this.sendCodeMsg = true;
                                this.setTime = 58;
                                this.getTime = 59;
                            }
                        }, 1000);
                    }else{
                        this.delayToastTxt = res.data.msg;
                        this.delayToast = true;
                        setTimeout(() => {
                            this.delayToast = false;
                        }, 1500);
                        return false;
                    }
                });
            },
            balancePayBtn(){                    //确认支付
                this.loading = true;            //loading
                this.$http({
                    url:balancePay,
                    method:"POST",
                    data:{
                        order_id:this.$route.query.orderId,                       //订单id
                        code:this.codeMsgValue,                                 //验证码
                        mobile:getCookie("userInfoTel"),                        //手机号
                    }
                }).then((res)=>{
                    this.loading = false;            //loading
                    if(res.data.status == 1){
                        this.payBox = false;            
                        this.msgCodeBox = false;
                        this.$router.push({path:'paySuccess',query:{orderId:this.$route.query.orderId}});
                    }else{
                        this.delayToastTxt = res.data.msg;
                        this.delayToast = true;
                        setTimeout(() => {
                            this.delayToast = false;
                        }, 1500);
                        return false;
                    }
                });
            },
            msgCodeBtn(){                       //短信弹窗关闭按钮
                this.payBox = false;            //遮罩
                this.msgCodeBox = false;        //发送短信弹窗
            },
            payBoxBtn(){                        //遮罩全部关闭
                this.payBox = false;            //遮罩
                this.msgCodeBox = false;        //发送短信弹窗
            },
            walletMsg(){                        //钱包余额
                this.loading = true;            //loading
                this.$http({
                    url:walletBalance,
                    method:"POST",
                    data:{}
                }).then((res)=>{
                    this.loading = false;            //loading
                    if(res.data.status == 1){
                        this.avail_amount = res.data.data.avail_amount;
                        this.payWayArr[1].payWayName = '钱包余额(' + res.data.data.avail_amount + ")";
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
            this.mobile = getCookie("userInfoTel").substr(0, 3) + "****" + getCookie("userInfoTel").substr(7);  //手机号
            this.consumeType = this.$route.query.consumeType;           //支付方式  1现金   2积分  3现金加积分this.$route.query.consumeType
            this.totalPrices = this.$route.query.totalPrices;           //总价格
            this.totalIntegral = this.$route.query.totalIntegral;       //总积分
            this.$http({
                url:orderDetails,
                method:"POST",
                data:{
                    order_id:this.$route.query.orderId
                }
            }).then(res=>{
                if(res.data.status == 1){
                    console.log(res);
                    if(res.data.data.status != 1 && res.data.data.status != 10){
                        this.payBox = true;
                        this.paySuccessToast = true;
                    }
                }else{
                    this.delayToast = true;
                    this.delayToastTxt = res.data.msg;
                    setTimeout(()=>{
                        this.delayToast = false;
                    },1500)
                }
            })
        }
    }
</script>