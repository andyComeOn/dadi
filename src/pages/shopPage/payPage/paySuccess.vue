<template>
    <div>
        <scroller :on-refresh="refresh" :on-infinite="infinite">
            <div class="paySucBox">
                <img class="paySucImg" src="../../../assets/images/shop/zhifuchengong.png" alt="">
                <h3>支付成功</h3>
                <p class="payMoney" v-if="paySucLists.payment_type == 1">实付款:现金￥{{paySucLists.practical_price}}</p>
                <p class="payMoney" v-if="paySucLists.payment_type == 2">实付款:{{paySucLists.integral}}积分</p>
                <p class="payMoney" v-if="paySucLists.payment_type == 3">实付款:现金￥{{paySucLists.practical_price}}+{{paySucLists.integral}}积分</p>
                <div class="paySucBtn">
                    <router-link :to="{path:'orderDetails',query:{orderId:this.$route.query.orderId}}">
                        <span class="lookOrder">查看订单</span>
                    </router-link>
                    <router-link :to="{path:'mine'}">
                        <span>个人中心</span>
                    </router-link>
                </div>
                <ul>
                    <li v-if="paySucLists.pick_type == 1">
                        <span>收货人</span>{{paySucLists.name}}&nbsp;&nbsp;&nbsp;&nbsp;{{paySucLists.mobile}}
                    </li>
                    <li v-if="paySucLists.pick_type == 1">
                        <span>地址</span>{{paySucLists.address}}
                    </li>
                    <li>
                        <span>订单号</span>{{paySucLists.order_number}}
                    </li>
                </ul>
            </div>
            <h3 class="paySucLists">
                <span>为您推荐</span>
            </h3>
            <ul class="brandLists">
                <li v-for="(item,index) in goodsListsArr" :key="index">
                    <router-link :to='{path:"shoppIngDetails",query:{shopId:item.id}}'>
                        <dl>
                            <dt>
                                <img :src="item.goods_img" alt="">
                            </dt>
                            <dd>
                                <p><span v-if='item.consume_type == 2 || item.consume_type == 3'>积分</span>{{item.goods_name}}</p>
                                <h2 v-if="item.consume_type == 1"><span>￥</span>{{item.goods_price}}</h2>
                                <h2 v-if="item.consume_type == 2">{{item.goods_integral}}<span>积分</span></h2>
                                <h2 v-if="item.consume_type == 3"><span>￥</span>{{item.goods_price}}+{{item.goods_integral}}<span>积分</span></h2>
                            </dd>
                        </dl>
                    </router-link>
                </li>
            </ul>
            <div class="noShopLists" v-show="noShopLists">
                <img src="../../../assets/images/shop/dingdan_404.png" alt="">
                <p>暂无商品</p>
            </div>
        </scroller>
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
<script>
    import {paySuccess} from '../../../api/api.js';
    export default {
        name: "paySuccess",
        components: {
            
        },
        data() {  
            return {
                loading:false,
                loadingTxt:'加载中...',
                delayToast:false,
                delayToastTxt:'',
                paySucLists:"",             //成功信息
                goodsListsArr:[],           //商品数组
                pageIndex:0,                //页数
                noShopLists:false           //暂无商品
            }
        },
        methods: {
            refresh (done) {                     //刷新时清空列表
                this.pageIndex = 1;
                this.goodsListsArr.length = 0;
                setTimeout(() => {
                    this.getPaySucMsg(this.pageIndex);
                    done(true);
                }, 1500);
            },
            infinite (done) {                    //加载
                this.pageIndex ++;
                setTimeout(() => {
                    this.getPaySucMsg(this.pageIndex);
                    done(true);
                }, 1500);
            },
            getPaySucMsg(pageIndex){
                this.loading = true;
                this.$http({
                    url:paySuccess,
                    method:"POST",
                    data:{
                        order_id:this.$route.query.orderId,
                        page:pageIndex,
                        pagesize:10
                    }
                }).then(res=>{
                    this.loading = false;
                    if(res.data.status == 1){
                        let paySucMsg = res.data.data;
                        this.paySucLists = paySucMsg.order_info;
                        if(res.data.data.goods_info.length != 0){
                            for(let i in res.data.data.goods_info){
                                this.goodsListsArr.push(res.data.data.goods_info[i]);
                            }
                        }else if(res.data.data.goods_info.length == 0 && this.pageIndex == 1){
                            this.noShopLists = true;
                        }else{
                            this.delayToast = true;
                            this.delayToastTxt = res.data.msg;              //错误信息
                            setTimeout(() => {
                                this.delayToast = false;
                            }, 1500);
                            return false;
                        }
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
            
        }
    }
</script>
<style lang="less" scoped>
    @import './paySuccess.less';
    @import '../shoppIng/shopping.less';
</style>
