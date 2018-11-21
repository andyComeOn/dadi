<template>
    <div>
        <div class="shopOrderLists"> 
            <!-- lists str -->
            <div class="shopLists">
                <div class="shopListBox" v-for='item in shopOrderArr'>
                    <router-link :to="{path:'shopOrderDetail'}">
                        <p class="orderNum">订单编号:{{item.order_number}}
                            <span v-if="item.status == 0">待付款</span>
                            <span v-if="item.status == 1">已付款</span>
                            <span v-if="item.status == 2">发货中</span>
                            <span v-if="item.status == 3">已收货</span>
                            <span v-if="item.status == 4">退款</span>
                            <span v-if="item.status == 5">取消</span>
                            <span v-if="item.status == 6">已关闭</span>
                        </p>
                        <div class="shopDetails">
                            <img src="../../../../assets/images/shop/home-duihuan@1x.png" alt="">
                            <p>{{item.goods_name}}</p>
                            <span>{{item.specs}}</span>
                        </div>
                        <p class="orderPrice"><span>共{{item.num}}件</span>实付金额:￥{{item.practical_price}}</p>
                    </router-link>
                    <div class="orderBtn">
                        <span class="orderBtnActive">申请退款</span>
                        <span>确认收货</span>
                    </div>
                </div>
            </div>
            <!-- lists end -->
        </div>
    </div>
</template>
<script>
    import {shopOrderLists} from '../../../../api/api.js';
    export default {
        name: "shopOrder",
        components: {
            
        },
        data() {  
            return {
                shopOrderArr:[],    //订单列表
            }
        },
        methods: {
            shopOrderList(shopOrderType){
                this.$http({
                    url:shopOrderLists,
                    method:"POST",
                    data:{
                        type:shopOrderType
                    }
                }).then(res=>{
                    if(res.data.status == 1){
                        console.log(res);
                        this.shopOrderArr = res.data.data;
                    }else{
                        alert('获取失败');
                    }
                });
            }
        },
        mounted() {
            //待收货
            this.shopOrderList(2);
        }
    }
</script>
<style lang='less' scoped>
    @import '../shopOrder.less';
</style>
