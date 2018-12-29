<template>
    <div>
        <div class="refundOrderBox">
            <!-- 商品详情 str -->
            <div class="refundOrder">
                <img :src="this.orderMsg.goods_img" alt="" />
                <p class="">{{this.orderMsg.goods_name}}</p>
                <span>{{this.orderMsg.specs}}</span>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
            </div>
            <!-- 商品详情 end -->
            <!-- 退款金额 str -->
            <div class="refundPrice">
                <p class="" @click="refundPriceTC()">
                    <span>退款金额</span>
                    <span v-if="this.orderMsg.payment_type == 1">￥{{this.orderMsg.practical_price}}</span>
                    <span v-if="this.orderMsg.payment_type == 2">{{this.orderMsg.integral}}积分</span>
                    <span v-if="this.orderMsg.payment_type == 3">￥{{this.orderMsg.practical_price}}+{{this.orderMsg.integral}}积分</span>
                    <img src="../../../assets/images/arrows/ic-arrow_10_18.png" />
                </p>
                <p class="">
                    <span>退还方式</span>
                    <span>退回原支付方</span>
                </p>
            </div> 
            <h3 class="refundHint">预计1-7个工作日内到账</h3>
            <!-- 退款金额 end -->
            <!-- refundExplain str -->
            <div class="refundExplain">
                <div class="refundExplainText">
                    <h3>退款说明</h3>
                    <textarea v-model="userRemark" type="text" name="" rows="4" placeholder="请输入运单号等相关备注信息..."></textarea>
                </div>
            </div>
            <!-- refundExplain end -->
            <!-- footer str -->
            <div class="refundFooter" @click="shopRefund()">提交</div>
            <!-- footer end -->
            <!-- 遮罩 str -->
            <div class="refundBox" v-if="refundBox == true" @click.self="refundBoxBtn()">
                <!-- 退款金额详情 str -->
                <div class="priceDetail" v-if="priceDetailBox == true">
                    <h3>
                        <img src="../../../assets/images/shop/popup_close.png" alt="" @click="priceDetailBtn()" />
                        <span>金额明细</span>
                    </h3>
                    <p>
                        <span>商品金额</span>
                        <!-- <span v-if="this.orderMsg.payment_type == 1">￥{{this.orderMsg.goods_price}} X {{this.orderMsg.num}}</span>
                        <span v-if="this.orderMsg.payment_type == 2">￥{{this.orderMsg.goods_integral}} X {{this.orderMsg.num}}</span>
                        <span  v-if="this.orderMsg.payment_type == 3">（￥{{this.orderMsg.goods_price}} + {{this.orderMsg.goods_integral}}积分） X {{this.orderMsg.num}}</span> -->
                        <span v-if="this.orderMsg.payment_type == 1">￥{{this.orderMsg.practical_price}}</span>
                        <span v-if="this.orderMsg.payment_type == 2">{{this.orderMsg.integral}}积分</span>
                        <span v-if="this.orderMsg.payment_type == 3">￥{{this.orderMsg.practical_price}}+{{this.orderMsg.integral}}积分</span>
                    </p>
                    <p v-if="this.orderMsg.pick_type == 1">
                        <span>运费</span>
                        <span>￥{{this.orderMsg.freight_money}}</span>
                    </p>
                    <p>
                        <span>满减优惠</span>
                        <span>￥{{this.orderMsg.coupon_money}}</span>
                    </p>
                    <div class="priceMoney">
                        <span>实付金额</span>
                        <span v-if="this.orderMsg.payment_type == 1">￥{{this.orderMsg.practical_price}}</span>
                        <span v-if="this.orderMsg.payment_type == 2">{{this.orderMsg.goods_integral}}积分</span>
                        <span v-if="this.orderMsg.payment_type == 3">￥{{this.orderMsg.practical_price}}+{{this.orderMsg.goods_integral}}积分</span>
                    </div>
                </div>
                <!-- 退款金额详情 end -->
                <!-- 提示 str -->
                <div class="hintBox" v-if="hintBox == true">
                    <div class="hintMsg">
                        <h3>您的退款申请成功已提交，1-7个工作日将完成退款。</h3>
                        <router-link :to="{path:'orderDetails',query:{orderId:this.$route.query.orderId}}">
                            <p>我知道了</p>
                        </router-link>
                    </div>
                </div>
                <!-- 提示 end -->
            </div>
            <!-- 遮罩 end -->
        </div>
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
<style lang='less' scoped>
    @import './refundOrder.less';
</style>
<script>
    import {orderDetails,shopRefundMoney} from '../../../api/api.js';
    export default {
        name: "refundOrder",
        components: {
            
        },
        data() {  
            return {
                orderMsg:"",            //订单详情
                refundBox:false,     //遮罩
                hintBox:false,          //hint
                priceDetailBox:false,   //退款金额明细
                userRemark:"",          //用户备注
                loading: false,                 //loading是否显示
                loadingTxt: "加载中...",        //loading信息
                delayToast: false,             //提示信息开关
                delayToastTxt: "",             //提示信息
            }
        },
        methods: {
            orderDetailsMsg(){          //获取商城订单详情
                this.loading = true;            //loading
                this.$http({
                    url:orderDetails,
                    method:"POST",
                    data:{
                        order_id:this.$route.query.orderId
                    }
                }).then((res)=>{
                    this.loading = false;            //loading
                    if(res.data.status == 1){
                        console.log(res.data.data);
                        this.orderMsg = res.data.data;      //订单详情
                        if(res.data.data.refund_status == 1){
                            this.delayToast = true;
                            this.delayToastTxt = '订单已退款';
                            setTimeout(()=>{
                                this.delayToast = false;
                                this.$router.push({path:'shopping'});
                            },1500);
                        }
                    }else{
                        this.delayToast = true;
                        this.delayToastTxt = res.data.msg;
                        setTimeout(()=>{
                            this.delayToast = false;
                        },1500);
                    }
                })
            },
            refundPriceTC(){            //退款金额明细弹窗
                this.refundBox = true;      
                this.priceDetailBox = true;
            },
            refundBoxBtn(){             //遮罩关闭
                this.refundBox = false;      
                this.priceDetailBox = false;
                this.hintBox = false;
            },
            priceDetailBtn(){
                this.refundBox = false;
                this.priceDetailBox = false;
            },
            shopRefund(){           //提交（退款）
                this.loading = true;            //loading
                this.$http({
                    url:shopRefundMoney,
                    method:"POST",
                    data:{
                        order_id:this.orderMsg.id,           //订单id
                        remark:this.userRemark,                  //用户备注
                    }
                }).then((res)=>{
                    this.loading = false;            //loading
                    if(res.data.status == 1){
                        this.refundBox = true;
                        this.hintBox = true;
                    }else{
                        this.delayToast = true;
                        this.delayToastTxt = res.data.msg;
                        setTimeout(()=>{
                            this.delayToast = false;
                        },1500);
                    }
                });
            }
        },
        mounted() {
            this.orderDetailsMsg();     //获取商城订单详情
        }
    }
</script>
