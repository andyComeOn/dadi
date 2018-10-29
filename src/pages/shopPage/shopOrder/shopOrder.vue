<template>
    <div>
        <div class="shopOrderLists"> 
            <!-- nav str -->
            <ul class="shopOrderNav">
                <li>
                    <span class="shopOrderNavActive">全部</span>
                </li>
                <li>
                    <span>待付款</span>
                </li>
                <li>
                    <span>待收货</span>
                </li>
                <li>
                    <span>已收货</span>
                </li>
                <!-- <li>
                    <span>退款订单</span>
                </li> -->
            </ul>
            <!-- nav end -->
            <!-- lists str -->
            <div class="shopLists">
                <div class="shopListBox">
                    <router-link :to="{path:'shopOrderDetail'}">
                        <p class="orderNum">订单编号:S20180827171900001<span>已付款</span></p>
                        <div class="shopDetails">
                            <img src="../../../assets/images/shop/home-duihuan@1x.png" alt="">
                            <p>飞利浦（PHILIPS）男士电动剃须刀多</p>
                            <span>礼盒装型号</span>
                        </div>
                        <p class="orderPrice"><span>共1件</span>实付金额:￥222.00</p>
                    </router-link>
                    <div class="orderBtn">
                        <span class="orderBtnActive">申请退款</span>
                        <span>确认收货</span>
                    </div>
                </div>
                <div class="shopListBox">
                    <router-link :to="{path:'refundOrder'}">
                        <p class="orderNum">订单编号:S20180827171900001<span>已付款</span></p>
                        <div class="shopDetails">
                            <img src="../../../assets/images/shop/home-duihuan@1x.png" alt="">
                            <p>飞利浦（PHILIPS）男士电动剃须刀多</p>
                            <span>礼盒装型号</span>
                        </div>
                    </router-link>
                    <p class="orderPrice"><span>共1件</span>实付金额:￥222.00</p>
                    <div class="orderBtn">
                        <span class="orderBtnActive">申请退款</span>
                        <span>确认收货</span>
                    </div>
                </div>
                <div class="shopListBox">
                    <p class="orderNum">订单编号:S20180827171900001<span>已付款</span></p>
                    <div class="shopDetails">
                        <img src="../../../assets/images/shop/home-duihuan@1x.png" alt="">
                        <p>飞利浦（PHILIPS）男士电动剃须刀多</p>
                        <span>礼盒装型号</span>
                    </div>
                    <p class="orderPrice"><span>共1件</span>实付金额:￥222.00</p>
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
<style lang='less'>
    @import './shopOrder.less';
</style>
