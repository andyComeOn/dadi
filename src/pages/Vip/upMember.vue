<template>
    <div class="memberBox">
        <div class="member_logo">
            <img class="member_bg" src="../../assets/images/member/shengji_huiyuan.png" />
            <img class="huayi_logo" src="../../assets/images/member/huayi.png" />
        </div>
        <div class="memberDetails">
            <p class="member_title">会员升级</p>
            <div class="cardType" @click="cardShowBtn()">
                <p>升级卡的类型</p>
                <span class="cardKind">{{cardName}}</span>
                <img src="../../assets/images/member/list_fullfill.png" alt="">
            </div>
            <div class="cardType">
                <p>推荐码</p>
                <input type="text" v-model="username" value="" placeholder="请填写推荐码" />
            </div>
            <div class="cardType">
                <p>支付金额</p>
                <span class="cardMoney">
                    <i>￥</i>{{cardMoney}}
                </span>
            </div>
            <p class="memberHint">
                <img src="../../assets/images/member/tishi.png" />
                <span>如果是店员推荐请输入店员账号</span>
            </p>
        </div>
        <div class="memberFooter">
            <div class="memberBtn" @click="memberBtn()">
                确认升级
            </div>
        </div>
        <van-popup v-model="cardShow" position="bottom" >
            <van-picker show-toolbar title="升级卡的类型" :visible-item-count="3" :columns="cardArr" @confirm="onConfirm" @cancel="onCancel" />
        </van-popup>
    </div>
</template>
<script>
import {memberMsg,payMember} from '@/api/api';
import wx from "weixin-js-sdk";
export default {
    data() {
        return {
            cardArr:[],
            cardShow:false,
            cardName:"",
            cardMoney:"",
            cardId:"",
            username:""
        }
    },
    methods: {
        onConfirm(picker) {
            this.cardName = picker.text;
            this.cardMoney = picker.fee;
            this.cardId = picker.id;
            this.cardShow = false;
        },
        onCancel() {
            this.cardShow = false;
        },
        cardShowBtn(){
            this.cardShow = true;
        },
        memberBtn(){
            let _this = this;
            let jsApiParameters = {};
            let onBridgeReady = function() {
                WeixinJSBridge.invoke(
                    "getBrandWCPayRequest",
                    jsApiParameters,
                    res => {
                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                            _this.$toast('支付成功');
                            setTimeout(function(){
                                _this.$router.push({path:'/Vip'});
                            },1500);
                        }
                        if (res.err_msg == "get_brand_wcpay_request:cancel") {
                            _this.$toast('取消支付');
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
            this.$http({
                method:"POST",
                url:payMember,
                data:{
                    group_id:this.cardId,
                    amount:this.cardMoney,
                    username:this.username
                }
            }).then(res=>{
                if(res.data.status == 1){
                    jsApiParameters = res.data.data;
                    callpay();
                }else{
                    _this.$toast(res.data.msg);
                }
            });
        }
    },
    mounted() {
        this.$http({
            method: "POST",
            url: memberMsg,
            data: {}
        }).then(res=>{
            if(res.data.status == 1){
                this.cardArr = res.data.data;
                this.cardName = this.cardArr[0].text;
                this.cardMoney = this.cardArr[0].fee;
                this.cardId = this.cardArr[0].id;
            }else{
                this.$toast(res.data.msg);
            }
        });
    },
    beforeCreate () {
        document.querySelector('body').setAttribute('style', 'background-color:#fff;');
    },
    beforeDestroy () {
        document.querySelector('body').removeAttribute('style');
    }
}
</script>
<style lang="less" scoped>
    @import './upMember.less';
</style>
