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
                    <p>个人账户余额<span>￥{{avail_amount}}</span></p>
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
                    <span>规则</span>
                </p>
            </div>
            <!-- 充值明细 end -->
            <!-- 充值提示 str -->
            <div class="topUpHint" style="display:none;">
                <span>充值失败</span>
            </div>
            <!-- 充值提示 end -->
        </div>
    </div>
</template>
<style lang='less' scoped>
    @import './myWallet.less';
</style>
<script>
    import wx from "weixin-js-sdk";
    import {topUpMoney} from '../../../api/api.js';
    import {getCookie} from '../../../utils/util.js';
    export default {
        name: "payOrder",
        components: {
            
        },
        data() {  
            return {
                avail_amount:'',    //个人账户余额
                topUpAmount:'',     //充值金额
            }
        },
        methods: {
            topUpBtn(){    //充值
                let reg = new RegExp(/^[+]{0,1}(\d+)$/);
                if(!reg.test(this.topUpAmount)){
                    alert('充值金额有误');
                    return false;
                }
                console.log(this.topUpAmount);
                this.$http({
                    url:topUpMoney,
                    method:"POST",
                    data:{
                        amount:this.topUpAmount
                    }
                }).then(res=>{
                    if(res.data.status == 1){
                        let wxMsg = JSON.parse(res.data.data);
                        wx.chooseWXPay({
                            timestamp: wxMsg.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                            nonceStr: wxMsg.nonceStr, // 支付签名随机串，不长于 32 位
                            package: wxMsg.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                            signType: wxMsg.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                            paySign: wxMsg.paySign, // 支付签名
                            success: function (res) {
                                // 支付成功后的回调函数
                                alert(JSON.stringify(res));
                            }
                        });
                    }else{

                    }
                });
            }
        },
        mounted() {
            //个人账户余额
            this.avail_amount = getCookie('avail_amount');
        }
    }
</script>


