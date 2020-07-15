<template>
    <div class="bd-box">
        <div class="ban-bd"></div>
        <div class="conversion-box">
            <div class="inp-box-bd">
                <div class="inp-box">
                    <div class="coupon_code">
                        <input v-model="coupon_code" type="text" placeholder="请输入兑换码">
                    </div>
                </div>
                <div class="atonce-box">
                    <div class="atonce-btn" @click="exchangeBtn()"></div>
                </div>
            </div>
        </div>
        <div class="active-rule">
            <h3>抵用券使用说</h3>
            <p>兑换码有效期至2019年10月31日，请在有效期内兑换，过期作废；</p>
            <p>每个兑换码可兑换一张秋果酒店抵用券，秋果酒店抵用券有30元、50元、100元等不同面额，30元为全部店面通用券，50元为指定店面抵用券（北京西客站南广场店、北京立水桥地铁站店、重庆来福士广场店、重庆解放碑店、成都春熙路店），100元为指定店面抵用券（武汉同济医院店、杭州未来科技城店、西安北大街店、哈尔滨西站店）；</p>
            <p>抵用券有效期自领取之日起三个月内有效（如有不同，以发券时说明为准），2019年9月30日、10月1-5日、12月24日、12月31日、2020年1月1-2日、1月26-28日期间不可用；</p>
            <p>每个秋果会员账户限领取三张抵用券，每张订单可用一张，除会员折扣外，其它优惠不可叠加；</p>
            <p>兑换码所领取抵用券仅限“秋果官方服务”微信公众号上预订支付时使用，其它任何渠道下单或线下均无法使用；</p>
            <p>如有任何疑问，可在微信公众号咨询或拨打秋果客服电话<a href="tel:4000999682">4000-999-682</a>（周一至周五9:00—17:30）。</p>
            <h3>会员卡使用说明</h3>
            <p>兑换码有效期至2019年10月31日，请在有效期内兑换，过期作废；</p>
            <p>每个兑换码可兑换一领取秋果酒店金卡会员一张，仅限领取人使用，如会员原先会员级别低于等于金卡，会员等级直接升级为金卡，如会员原先会员等级高于金卡，兑换后会员级别无变动；</p>
            <p>每个秋果会员账户限领取一次会员级别，可享受该级别会员待遇，包括：会员折扣、会员早餐、延时退房等，具体以秋果酒店公布信息为准；</p>
            <p>所领取会员资质不享有邀请特权，所享受免费早餐、延时退房等会员权益仅本人享用；</p>
            <p>如有任何疑问，可在微信公众号咨询或拨打秋果客服电话<a href="tel:4000999682">4000-999-682</a>（周一至周五9:00—17:30）。</p>
        </div>
        <div class="hint-box">
            <img src="../../assets/images/active/slogan.png" alt="">
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
                        // this.$toast(res.data.msg);
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