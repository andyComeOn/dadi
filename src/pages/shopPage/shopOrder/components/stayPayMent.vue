<template>
    <div>
        <!-- lists str -->
        <scroller :on-refresh="refresh" :on-infinite="infinite" v-if="this.noShopLists == false">
            <div class="shopLists">
                <div class="shopListBox" v-for='item in shopOrderArr'>
                    <router-link :to="{path:'orderDetails',query:{orderId:item.id}}">
                        <p class="orderNum">{{item.order_number}}
                            <span v-if="item.status == 1">物流·待付款</span>
                            <span v-if="item.status == 2">物流·待发货</span>
                            <span v-if="item.status == 3">物流·待收货</span>
                            <span v-if="item.status == 4">物流·已收货</span>
                            <span v-if="item.status == 5">物流·已取消</span>
                            <span v-if="item.status == 6">物流·已关闭</span>
                            <span v-if="item.status == 7">物流·退款中</span>
                            <span v-if="item.status == 8">物流·已退款</span>
                            <span v-if="item.status == 9">物流·退款拒绝</span>
                            <span v-if="item.status == 10">自提·待付款</span>
                            <span v-if="item.status == 11">自提·待领取</span>
                            <span v-if="item.status == 12">自提·已领取</span>
                            <span v-if="item.status == 13">自提·已取消</span>
                            <span v-if="item.status == 14">自提·已关闭</span>
                            <span v-if="item.status == 15">自提·退款中</span>
                            <span v-if="item.status == 16">自提·退款完成</span>
                            <span v-if="item.status == 17">自提·退款拒绝</span>
                            <span v-if="item.status == 18">自提·退款申请</span>
                            <span v-if="item.status == 19">物流·退款申请</span>
                            <!-- status 物流待付款 1 物流 待发货2 物流 待收货3 物流 已收货(完成)4 物流 已取消5 
                            物流 已关闭 6 物流 退款中 7 物流 已退款 8 物流 退款拒绝9 自提 待付款10 自提 待领取11 自提 已领取12 自提 已取消13 自提 已关闭14 自提退款中15 自提  退款完成 16 自提  退款拒绝  17 -->
                        </p>
                        <div class="shopDetails">
                            <div class="order_lists_bg">
                                <img :src="item.goods_img" alt="">
                            </div>
                            <p>{{item.goods_name}}</p>
                            <span>{{item.specs}}</span>
                        </div>
                        <p class="orderPrice">
                            <span>共{{item.num}}件</span>
                            <span v-if="item.payment_type == 1">实付金额:￥{{item.practical_price}}</span>
                            <span v-if="item.payment_type == 2">实付金额:{{item.integral}}积分</span>
                            <span v-if="item.payment_type == 3">实付金额:￥{{item.practical_price}}+{{item.integral}}积分</span>
                        </p>
                    </router-link>
                    <div v-if="item.status == 1 || item.status == 10" class="orderBtn">
                        <!-- <b>提货码：<i>{{item.pick_code}}</i></b> -->
                        <span @click="changeOrder(item.id,1)">取消订单</span>
                        <span class="orderBtnActive" @click="goPayBtn(item.id,item.practical_price,item.goods_integral,item.payment_type)">去支付</span>
                    </div>
                    <div v-if="item.status == 2 || item.status == 11" class="orderBtn">
                        <!-- <b>提货码：<i>{{item.pick_code}}</i></b> -->
                        <router-link :to="{path:'refundOrder',query:{orderId:item.id}}">
                            <span>申请退款</span>
                        </router-link>
                        <router-link :to="{path:'shoppIngDetails',query:{shopId:item.goods_id,goodsName:encodeURIComponent(item.goods_name)}}">
                            <span class="orderBtnActive">再次购买</span>
                        </router-link>
                    </div>
                    <div v-if="item.status == 3" class="orderBtn">
                        <!-- <b>提货码：<i>{{item.pick_code}}</i></b> -->
                        <router-link :to="{path:'refundOrder',query:{orderId:item.id}}">
                            <span>申请退款</span>
                        </router-link>
                        <span v-if="item.pick_type == 1" class="orderBtnActive" @click="changeOrder(item.id,3)">确认收货</span>
                        <router-link :to="{path:'shoppIngDetails',query:{shopId:item.goods_id,goodsName:encodeURIComponent(item.goods_name)}}">
                            <span class="orderBtnActive">再次购买</span>
                        </router-link>
                    </div>
                    <div v-if="item.status == 4 || item.status == 12" class="orderBtn">
                        <!-- <b>提货码：<i>{{item.pick_code}}</i></b> -->
                        <router-link :to="{path:'refundOrder',query:{orderId:item.id}}">
                            <span>申请退款</span>
                        </router-link>
                        <router-link :to="{path:'shoppIngDetails',query:{shopId:item.goods_id,goodsName:encodeURIComponent(item.goods_name)}}">
                            <span class="orderBtnActive">再次购买</span>
                        </router-link>
                    </div>
                    <div v-if="item.status == 5 || item.status == 13" class="orderBtn">
                        <!-- <b>提货码：<i>{{item.pick_code}}</i></b> -->
                        <router-link :to="{path:'shoppIngDetails',query:{shopId:item.goods_id,goodsName:encodeURIComponent(item.goods_name)}}">
                            <span class="orderBtnActive">再次购买</span>
                        </router-link>
                    </div>
                    <div v-if="item.status == 6 || item.status == 14" class="orderBtn">
                        <!-- <b>提货码：<i>{{item.pick_code}}</i></b> -->
                        <router-link :to="{path:'shoppIngDetails',query:{shopId:item.goods_id,goodsName:encodeURIComponent(item.goods_name)}}">
                            <span class="orderBtnActive">再次购买</span>
                        </router-link>
                    </div>
                    <div v-if="item.status == 7 || item.status == 15" class="orderBtn">
                        <!-- <b>提货码：<i>{{item.pick_code}}</i></b> -->
                        <router-link :to="{path:'shoppIngDetails',query:{shopId:item.goods_id,goodsName:encodeURIComponent(item.goods_name)}}">
                            <span class="orderBtnActive">再次购买</span>
                        </router-link>
                    </div>
                    <div v-if="item.status == 8 || item.status == 16" class="orderBtn">
                        <!-- <b>提货码：<i>{{item.pick_code}}</i></b> -->
                        <router-link :to="{path:'shoppIngDetails',query:{shopId:item.goods_id,goodsName:encodeURIComponent(item.goods_name)}}">
                            <span class="orderBtnActive">再次购买</span>
                        </router-link>
                    </div>
                    <div v-if="item.status == 9 || item.status == 17" class="orderBtn">
                        <span v-if="item.deliver_status == 2 && item.pick_type == 1" class="orderBtnActive" @click="changeOrder(item.id,3)">确认收货</span>
                        <router-link :to="{path:'refundOrder',query:{orderId:item.id}}">
                            <span>申请退款</span>
                        </router-link>
                        <router-link :to="{path:'shoppIngDetails',query:{shopId:item.goods_id,goodsName:encodeURIComponent(item.goods_name)}}">
                            <span class="orderBtnActive">再次购买</span>
                        </router-link>
                    </div>
                    <div v-if="item.status == 18 || item.status == 19" class="orderBtn">
                        <span class="orderBtnActive" @click="changeOrder(item.id,4)">取消退款申请</span>
                        <router-link :to="{path:'shoppIngDetails',query:{shopId:item.goods_id,goodsName:encodeURIComponent(item.goods_name)}}">
                            <span class="orderBtnActive">再次购买</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </scroller>
        <!-- lists end -->
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
                <span @click="isGiveBoxWrapShow = false">关闭</span>
                <span @click="queryBtn()">确定</span>
            </div>
        </div>
        <!-- 放弃支付 end -->
        <!-- no orderLists str -->
        <div class="noShopLists" v-show="noShopLists">
            <img src="../../../../assets/images/shop/dingdan_404.png" alt="">
            <p>暂无订单</p>
        </div> 
        <!-- no orderLists end -->
    </div>
</template>
<script>
    import {shopOrderLists,orderTypeChange} from '../../../../api/api.js';
    export default {
        name: "shopOrder",
        components: {
            
        },
        data() {  
            return {
                shopOrderArr:[],                //订单列表
                loading: false,                 //loading是否显示
                loadingTxt: "加载中...",        //loading信息
                delayToast: false,             //提示信息开关
                delayToastTxt: "",             //提示信息
                paymentType:"",                //支付方式
                orderMoney:"",                 //订单金额
                pageIndex:0,                   //当前页
                isGiveBoxWrapShow:false,       //
                hintMsg:"",                    //退款提示语
                order_id:"",                   //订单id
                type_num:"",                   //状态号
                noShopLists:false
            }
        },
        methods: {
            refresh (done) {                     //刷新是清空数据
                this.shopOrderArr.length = 0;
                this.pageIndex = 1;
                // setTimeout(() => {
                    this.shopOrderList(1,this.pageIndex);
                    done();
                // }, 1500);
            },
            infinite (done) {                    //加载
                this.pageIndex++;
                // setTimeout(() => {
                    this.shopOrderList(1,this.pageIndex);
                    done(true);
                // }, 1500);
            },
            shopOrderList(shopOrderType,pageIndex){           //订单列表
                this.loading = true;                //loading
                this.$http({
                    url:shopOrderLists,
                    method:"POST",
                    data:{
                        type:shopOrderType,
                        page:pageIndex,
                        pageSize:10
                    }
                }).then(res=>{
                    this.loading = false;            //loading
                    if(res.data.status == 1){
                        if(res.data.data.length != 0){
                            this.noShopLists = false;
                            for(let i in res.data.data){
                                this.shopOrderArr.push(res.data.data[i]);
                            }
                        }else if(res.data.data.length == 0 && this.pageIndex == 1){
                            this.noShopLists = true;
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
            changeOrder(orderId,typeNum){               //改变状态
                this.order_id = orderId;
                this.type_num = typeNum;
                this.isGiveBoxWrapShow = true;
                if(typeNum == 1){
                    this.hintMsg = "确定取消订单吗？";
                }else if(typeNum == 3){
                    this.hintMsg = "确定收到商品吗？";
                }else if(typeNum == 4){
                    this.hintMsg = "确定取消申请退款吗？";
                }
            },
            queryBtn(){             //状态改变
                this.loading = true;                    //loading
                this.$http({
                    url:orderTypeChange,
                    method:"POST",
                    data:{
                        type:this.type_num,
                        order_id:this.order_id
                    }
                }).then((res)=>{
                    this.shopOrderArr.length = 0;
                    if(res.data.status == 1){
                        this.isGiveBoxWrapShow = false;
                        console.log(res);
                        this.shopOrderList(1);
                    }else{
                        this.delayToast = true;
                        this.delayToastTxt = res.data.msg;
                        setTimeout(()=>{
                            this.delayToast = false;
                        },1500);
                    }
                });
            },
            goPayBtn(orderId,orderMoney,orderIntegral,paymentType){            //去支付按钮跳转带收银台
                this.$router.push({
                    path:"payPage",
                    query:{
                        orderId:orderId,
                        consumeType:paymentType,
                        totalIntegral:orderIntegral,
                        totalPrices:orderMoney
                    }
                });
            }
        },
        mounted() {
        }
    }
</script>
<style lang='less' scoped>
    @import '../shopOrder.less';
</style>
<style lang="less" scoped>
    .noShopLists{
        position: fixed;
        top:50%;
        left:50%;
        transform: translateY(-50%);
        margin-left:-55px;
    }
</style>

