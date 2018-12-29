<template>
    <div>
        <div class="shopOrderDetails">
            <!-- 状态信息 str -->
            <div class="typeMsg">
                <div v-if="this.orderMsg.status == 1">
                    <h3>
                        <img src="../../../assets/images/shop/order-daifukuan.png">
                        <span>物流·待付款</span>
                    </h3>
                    <p class="typeMsgHint">您的订单已提交成功，等待支付。</p>
                    <span class="orderTime">{{this.orderMsg.add_time}}</span>
                </div>
                <div v-if="this.orderMsg.status == 2">
                    <h3>
                        <img src="../../../assets/images/shop/oder_fahuo.png">
                        <span>物流·待发货</span>
                    </h3>
                    <p class="typeMsgHint">付款成功，卖家备货中。</p>
                    <span class="orderTime">{{this.orderMsg.add_time}}</span>
                </div>
                <div v-if="this.orderMsg.status == 3">
                    <h3>
                        <img src="../../../assets/images/shop/oder_fahuo.png">
                        <span>物流·待收货</span>
                    </h3>
                    <p class="typeMsgHint">快件已发出，正在发往目标城市。</p>
                    <span class="orderTime">{{this.orderMsg.add_time}}</span>
                </div>
                <div v-if="this.orderMsg.status == 4">
                    <h3>
                        <!-- <img src="../../../assets/images/shop/.png"> -->
                        <span>物流·已收货</span>
                    </h3>
                    <p class="typeMsgHint">您的订单已签收。</p>
                    <span class="orderTime">{{this.orderMsg.add_time}}</span>
                </div>
                <div v-if="this.orderMsg.status == 5">
                    <h3>
                        <img src="../../../assets/images/shop/order-yiquxiao.png">
                        <span>物流·已取消</span>
                    </h3>
                    <p class="typeMsgHint">您的订单已提交成功，请尽快支付</p>
                    <span class="orderTime">{{this.orderMsg.add_time}}</span>
                </div>
                <div v-if="this.orderMsg.status == 6">
                    <h3>
                        <img src="../../../assets/images/shop/order-yiguanbi.png">
                        <span>物流·已关闭</span>
                    </h3>
                    <!-- <p class="typeMsgHint">您的订单已提交成功，请尽快支付</p> -->
                    <span class="orderTime">{{this.orderMsg.add_time}}</span>
                </div>
                <div v-if="this.orderMsg.status == 7">
                    <h3>
                        <img src="../../../assets/images/shop/order-tuikuanzhong.png">
                        <span>物流·退款中</span>
                    </h3>
                    <p class="typeMsgHint">退款申请提交，等待商家反馈。</p>
                    <span class="orderTime">{{this.orderMsg.add_time}}</span>
                </div>
                <div v-if="this.orderMsg.status == 8">
                    <h3>
                        <img src="../../../assets/images/shop/order-yituikuan.png">
                        <span>物流·已退款</span>
                    </h3>
                    <p class="typeMsgHint">您的订单已退款成功。</p>
                    <span class="orderTime">{{this.orderMsg.add_time}}</span>
                </div>
                <div v-if="this.orderMsg.status == 9">
                    <h3>
                        <img src="../../../assets/images/shop/order-jujue.png">
                        <span>物流·退款拒绝</span>
                    </h3>
                    <p class="typeMsgHint">{{this.orderMsg.postil}}</p>
                    <span class="orderTime">{{this.orderMsg.add_time}}</span>
                </div>
                <div v-if="this.orderMsg.status == 10">
                    <h3>
                        <img src="../../../assets/images/shop/order-daifukuan.png">
                        <span>自提·待付款</span>
                    </h3>
                    <p class="typeMsgHint">您的订单已提交成功，等待支付。</p>
                    <span class="orderTime">{{this.orderMsg.add_time}}</span>
                </div>
                <div v-if="this.orderMsg.status == 11">
                    <h3>
                        <img src="../../../assets/images/shop/order-weilingqu.png">
                        <span>自提·待领取</span>
                    </h3>
                    <p class="typeMsgHint">我们已经为您备好货，请您来领取。</p>
                    <span class="orderTime">{{this.orderMsg.add_time}}</span>
                </div>
                <div v-if="this.orderMsg.status == 12">
                    <h3>
                        <img src="../../../assets/images/shop/oder_fukuan.png">
                        <span>自提·已领取</span>
                    </h3>
                    <p class="typeMsgHint">商品已领取，欢迎下次光临。</p>
                    <span class="orderTime">{{this.orderMsg.add_time}}</span>
                </div>
                <div v-if="this.orderMsg.status == 13">
                    <h3>
                        <img src="../../../assets/images/shop/order-yiquxiao.png">
                        <span>自提·已取消</span>
                    </h3>
                    <p class="typeMsgHint">您的订单已成功取消。</p>
                    <span class="orderTime">{{this.orderMsg.add_time}}</span>
                </div>
                <div v-if="this.orderMsg.status == 14">
                    <h3>
                        <img src="../../../assets/images/shop/order-yiguanbi.png">
                        <span>自提·已关闭</span>
                    </h3>
                    <!-- <p class="typeMsgHint">您的订单已提交成功，请尽快支付</p> -->
                    <span class="orderTime">{{this.orderMsg.add_time}}</span>
                </div>
                <div v-if="this.orderMsg.status == 15">
                    <h3>
                        <img src="../../../assets/images/shop/order-tuikuanzhong.png">
                        <span>自提·退款中</span>
                    </h3>
                    <p class="typeMsgHint">退款申请提交，等待商家反馈。</p>
                    <span class="orderTime">{{this.orderMsg.add_time}}</span>
                </div>
                <div v-if="this.orderMsg.status == 16">
                    <h3>
                        <img src="../../../assets/images/shop/order-tihuochenggong.png">
                        <span>自提·退款完成</span>
                    </h3>
                    <p class="typeMsgHint">您的订单已退款成功。</p>
                    <span class="orderTime">{{this.orderMsg.add_time}}</span>
                </div>
                <div v-if="this.orderMsg.status == 17">
                    <h3>
                        <img src="../../../assets/images/shop/order-jujue.png">
                        <span>自提·退款拒绝</span>
                    </h3>
                    <p class="typeMsgHint">{{this.orderMsg.postil}}</p>
                    <span class="orderTime">{{this.orderMsg.add_time}}</span>
                </div>
                <div v-if="this.orderMsg.status == 18">
                    <h3>
                        <img src="../../../assets/images/shop/order-jujue.png">
                        <span>自提·退款申请</span>
                    </h3>
                    <p class="typeMsgHint">{{this.orderMsg.postil}}</p>
                    <span class="orderTime">{{this.orderMsg.add_time}}</span>
                </div>
                <div v-if="this.orderMsg.status == 19">
                    <h3>
                        <img src="../../../assets/images/shop/order-jujue.png">
                        <span>物流·退款申请</span>
                    </h3>
                    <p class="typeMsgHint">{{this.orderMsg.postil}}</p>
                    <span class="orderTime">{{this.orderMsg.add_time}}</span>
                </div>
                <!-- 收货地址 str -->
                <div class="addressMsg" v-if="this.orderMsg.pick_type == 1">
                    <div class="address">
                        <h3>
                            <img src="../../../assets/images/my/my_dizhi.png" alt="">
                            <span>{{this.orderMsg.name}}</span>
                            <span>{{this.orderMsg.mobile}}</span>
                        </h3>
                        <p class="addressDetails">地址：{{this.orderMsg.address}}</p>
                    </div>
                </div>
                <!-- 收货地址 end -->
                <!-- 提货码 str -->
                <div class="addressMsg addressMsg_code">
                    <div class="pick_Code" v-if="this.orderMsg.pick_type == 2">
                        <img src="../../../assets/images/shop/order_tihuoma.png" alt="">
                        <span>提货码</span>
                        <i>{{this.orderMsg.pick_code}}</i>
                    </div>
                </div>
                <!-- 提货码 end -->
            </div>
            <!-- 状态信息 end -->
            <!-- 商品信息 str -->
            <div :class="{shopMsgBox:true,shopMsgBox_code:isTrue}">
                <div class="shopMsg">
                    <img :src="this.orderMsg.goods_img" alt="">
                    <p>{{this.orderMsg.goods_name}}</p>
                    <span style="width:100%;text-overflow:ellipsis; white-space:nowrap; overflow:hidden;">数量:{{this.orderMsg.num}}&nbsp;&nbsp;&nbsp;&nbsp;规格:{{this.orderMsg.specs}}</span>
                    <h3 v-if="this.orderMsg.payment_type == 1">￥{{this.orderMsg.practical_price}}</h3>
                    <h3 v-if="this.orderMsg.payment_type == 2">{{this.orderMsg.goods_integral}}积分</h3>
                    <h3  v-if="this.orderMsg.payment_type == 3">￥{{this.orderMsg.practical_price}} + {{this.orderMsg.goods_integral}}积分</h3>
                </div>
            </div>
            <!-- 商品信息 end -->
            <!-- 商品金额 str -->
            <div class="shopPriceBox">
                <div class="shopPrice">
                    <p>
                        商品金额
                        <span v-if="this.orderMsg.payment_type == 1">￥{{this.orderMsg.practical_price}}</span>
                        <span v-if="this.orderMsg.payment_type == 2">{{this.orderMsg.integral}}积分</span>
                        <span  v-if="this.orderMsg.payment_type == 3">￥{{this.orderMsg.practical_price}} + {{this.orderMsg.integral}}积分</span>
                    </p>
                    <p v-if="this.orderMsg.pick_type == 1">
                        运费
                        <span>￥{{this.orderMsg.freight_money}}</span>
                    </p>
                    <p>
                        满减优惠
                        <span>￥{{this.orderMsg.coupon_money}}</span>
                    </p>
                    <div class="shopPriceBtn">
                        <span>实付金额</span>
                        <span v-if="this.orderMsg.payment_type == 1">￥<i>{{this.orderMsg.practical_price}}</i></span>
                        <span v-if="this.orderMsg.payment_type == 2"><i>{{this.orderMsg.integral}}</i>积分</span>
                        <span v-if="this.orderMsg.payment_type == 3">￥<i>{{this.orderMsg.practical_price}}</i>+{{this.orderMsg.integral}}积分</span>
                    </div>
                </div>
            </div>
            <!-- 商品金额 end -->
            <!-- 订单号 str -->
            <div class="orderNumBox">
                <div class="orderNum">
                    <p>
                        <span>订单号：{{this.orderMsg.order_number}}</span>
                        <span v-clipboard:copy="copyUrl" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</span>
                    </p>
                    <p>下单日期: {{this.orderMsg.add_time}}</p>
                    <p v-if="this.orderMsg.online_pay_type == 1">
                        <span>支付方式：钱包支付</span>
                    </p>
                    <p v-if="this.orderMsg.online_pay_type == 2">
                        <span>支付方式：微信支付</span>
                    </p>
                    <p v-if="this.orderMsg.online_pay_type == 3">
                        <span>支付方式：支付宝支付</span>
                    </p>
                    <p v-if="this.orderMsg.online_pay_type == 4">
                        <span>支付方式：积分兑换</span>
                    </p>
                    <p>
                        <span v-if="this.orderMsg.pick_type == 1">配送方式：物流配送</span>
                        <span v-if="this.orderMsg.pick_type == 2">配送方式：门店自取</span>
                    </p>
                </div>
            </div>
            <!-- 订单号 end -->
            <!-- orderFooter str -->
            <div v-if="this.orderMsg.status == 1 || this.orderMsg.status == 10" class="orderBtn">
                <span class="orderBtnActive" @click="goPayBtn()">去支付</span>
                <span class="orderBtnActive" @click="changeOrder(1)">取消订单</span>
            </div>
            <div v-if="this.orderMsg.status == 2 || this.orderMsg.status == 11" class="orderBtn">
                <router-link :to="{path:'refundOrder',query:{orderId:this.orderMsg.id}}">
                    <span>申请退款</span>
                </router-link>
                <router-link :to="{path:'shoppIngDetails',query:{shopId:this.orderMsg.goods_id}}">
                    <span class="orderBtnActive">再次购买</span>
                </router-link>
            </div>
            <div v-if="this.orderMsg.status == 3" class="orderBtn">
                <router-link :to="{path:'refundOrder',query:{orderId:this.orderMsg.id}}">
                    <span>申请退款</span>
                </router-link>
                <span class="orderBtnActive"  @click="changeOrder(3)">确认收货</span>
                <router-link :to="{path:'shoppIngDetails',query:{shopId:this.orderMsg.goods_id}}">
                    <span class="orderBtnActive">再次购买</span>
                </router-link>
            </div>
            <div v-if="this.orderMsg.status == 4 || this.orderMsg.status == 12" class="orderBtn">
                <router-link :to="{path:'refundOrder',query:{orderId:this.orderMsg.id}}">
                    <span>申请退款</span>
                </router-link>
                <router-link :to="{path:'shoppIngDetails',query:{shopId:this.orderMsg.goods_id}}">
                    <span class="orderBtnActive">再次购买</span>
                </router-link>
            </div>
            <div v-if="this.orderMsg.status == 5 || this.orderMsg.status == 13" class="orderBtn">
                <router-link :to="{path:'shoppIngDetails',query:{shopId:this.orderMsg.goods_id}}">
                    <span class="orderBtnActive">再次购买</span>
                </router-link>
            </div>
            <div v-if="this.orderMsg.status == 6 || this.orderMsg.status == 14" class="orderBtn">
                <router-link :to="{path:'shoppIngDetails',query:{shopId:this.orderMsg.goods_id}}">
                    <span class="orderBtnActive">再次购买</span>
                </router-link>
            </div>
            <div v-if="this.orderMsg.status == 7 || this.orderMsg.status == 15" class="orderBtn">
                <router-link :to="{path:'shoppIngDetails',query:{shopId:this.orderMsg.goods_id}}">
                    <span class="orderBtnActive">再次购买</span>
                </router-link>
            </div>
            <div v-if="this.orderMsg.status == 8 || this.orderMsg.status == 16" class="orderBtn">
                <router-link :to="{path:'shoppIngDetails',query:{shopId:this.orderMsg.goods_id}}">
                    <span class="orderBtnActive">再次购买</span>
                </router-link>
            </div>
            <div v-if="this.orderMsg.status == 9 || this.orderMsg.status == 17" class="orderBtn">
                <router-link :to="{path:'refundOrder',query:{orderId:this.orderMsg.id}}">
                    <span>申请退款</span>
                </router-link>
                <router-link :to="{path:'shoppIngDetails',query:{shopId:this.orderMsg.goods_id}}">
                    <span class="orderBtnActive">再次购买</span>
                </router-link>
            </div>
            <div v-if="this.orderMsg.status == 18" class="orderBtn">
                <span class="orderBtnActive" @click="changeOrder(4)">取消退款申请</span>
                <router-link :to="{path:'shoppIngDetails',query:{shopId:this.orderMsg.goods_id}}">
                    <span class="orderBtnActive">再次购买</span>
                </router-link>
            </div>
            <div v-if="this.orderMsg.status == 19" class="orderBtn">
                <span class="orderBtnActive" @click="changeOrder(4)">取消退款申请</span>
                <router-link :to="{path:'shoppIngDetails',query:{shopId:this.orderMsg.goods_id}}">
                    <span class="orderBtnActive">再次购买</span>
                </router-link>
            </div>
            <!-- orderFooter end -->
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
        <!-- 放弃支付(二次弹窗) str -->
        <div class="giveBoxWrap" v-show="isGiveBoxWrapShow">
            <div class="giveBox">
                <p>{{hintMsg}}</p>
                <span @click="isGiveBoxWrapShow = false">取消</span>
                <span @click="queryBtn()">确认</span>
            </div>
        </div>
        <!-- 放弃支付 end -->
    </div>
</template>
<style lang='less' scoped>
    @import './orderDetails.less';
</style>
<script>
    import {orderDetails,orderTypeChange} from '../../../api/api.js';
    export default {
        name: "orderDetails",
        components: {
            
        },
        data() {  
            return {
                isGiveBoxWrapShow:false,
                orderMsg:'',        //订单详情信息
                isTrue:false,
                loading: false,                 //loading是否显示
                loadingTxt: "加载中...",        //loading信息
                delayToast: false,             //提示信息开关
                delayToastTxt: "",             //提示信息
                hintMsg:"",                    //提示信息
                type_num:"",                   //
                copyUrl:""
            }
        },
        methods: {
            onCopy(e){
                console.log(e);
                this.delayToast = true;
                this.delayToastTxt = "复制成功";
                setTimeout(()=>{
                    this.delayToast = false;
                },1500);
            },
            onError(e){
                console.log(e);
            },
            orderDetailMsg(){           //订单详情
                this.$http({
                    url:orderDetails,
                    method:"POST",
                    data:{
                        order_id:this.$route.query.orderId      //订单详情
                    }
                }).then((res)=>{
                    if(res.data.status == 1){
                        console.log(res);
                        this.orderMsg = res.data.data;          //订单详情
                        this.copyUrl = this.orderMsg.order_number;
                        if(this.orderMsg.pick_type == 1){
                            this.isTrue = false;
                        }else{
                            this.isTrue = true;
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
            changeOrder(typeNum){               //改变状态
                this.isGiveBoxWrapShow = true;
                this.type_num = typeNum;
                if(typeNum == 1){
                    this.hintMsg = "确定取消支付吗？";
                }else if(typeNum == 3){
                    this.hintMsg = "确定收到商品吗？";
                }else if(typeNum == 4){
                    this.hintMsg = "确定取消申请退款吗？";
                }
            },
            queryBtn(){
                this.loading = true;                    //loading
                this.$http({
                    url:orderTypeChange,
                    method:"POST",
                    data:{
                        type:this.type_num,
                        order_id:this.orderMsg.id
                    }
                }).then((res)=>{
                    this.loading = false;
                    if(res.data.status == 1){
                        console.log(res);
                        this.orderDetailMsg();          //订单详情
                        this.isGiveBoxWrapShow = false;
                    }else{
                        this.delayToast = true;
                        this.delayToastTxt = res.data.msg;
                        setTimeout(()=>{
                            this.delayToast = false;
                        },1500);
                    }
                });
            },
            goPayBtn(){            //去支付按钮跳转带收银台
                this.$router.push({
                    path:"payPage",
                    query:{
                        orderId:this.orderMsg.id,
                        consumeType:this.orderMsg.payment_type,
                        totalIntegral:this.orderMsg.goods_integral,
                        totalPrices:this.orderMsg.practical_price
                    }
                });
            }
        },
        mounted() {
            this.orderDetailMsg();          //订单详情
        }
    }
</script>
