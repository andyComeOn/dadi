<template>
    <div class="bd-box">
        <div class="head_ban">
            <img src="../../assets/images/active/people.png" />
            <div class="head_ban_box">
                <div class="coupon_code">
                    <h3>电子房券兑换</h3>
                    <div class="coupon_code_inp">
                        <input v-model="coupon_code" type="text" placeholder="请输入兑换码">
                    </div>
                    <div class="atonce_btn_box">
                        <div class="atonce_btn" @click="exchangeBtn()">立即兑换</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="active_rule">
            <h3>活动规则</h3>
            <p>1. 秋果酒店电子房券兑换码有效期至2020年12月31日，请在有效期内兑换，过期作废；</p>
            <p>2. 每个兑换码可兑换秋果酒店电子房券一张，房券兑换后请在一年内使用，过期作废；</p>
            <p>3. 进行房间兑换时，请在“秋果官方服务”微信公众号底部菜单“会员中心”中点击“我的会员”进入“我的优惠券”中根据门店房型进行预订；</p>
            <p>4. 兑换码所领取电子房券仅限“秋果官方服务”微信公众号上预订支付时使用，其它任何渠道下单或线下均无法使用；</p>
            <p>5. 如有任何疑问，可在微信公众号咨询或拨打秋果客服电话（周一至周五9:00—17:30）。<a href="tel:4000999682">4000-999-682</a>（周一至周五9:00—17:30）。</p>
        </div>
    </div>
</template>
<script>
import { couponExchange } from "@/api/api";
export default {
    data(){
        return {
            coupon_code:""          //兑换码
        }
    },
    methods:{
        exchangeBtn(){
            let Reg = /^[A-Za-z0-9]+$/;
            if(this.coupon_code == ""){
                this.$toast('优惠券码错误，请重新输入');
                return false;
            }else if(!Reg.test(this.coupon_code)){
                this.$toast('优惠券码错误，请重新输入');
                return false;
            }else{
                this.$http({
                    method: "POST",
                    url: couponExchange,
                    data: {
                        coupon_code:this.coupon_code
                    }
                }).then(res => {
                    if(res.data.status == 1){
                        this.$router.push({
                            path:"mine"
                        });
                    }else{
                        this.$toast(res.data.msg);
                    }
                });
            }
        }
    }
}
</script>
<style lang="less">
    @import './coupon_exchange.less';
</style>