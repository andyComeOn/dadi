<template>
    <div>
        <div class="shopOrderDetails">
            <!-- 状态信息 str -->
            <div class="typeMsg">
                <h3>
                    <img src="../../../assets/images/shop/oder_fukuan.png">
                    <span>等待付款</span>
                </h3>
                <p class="typeMsgHint">您的订单已提交成功，请尽快支付</p>
                <span class="orderTime">2018-10-23 12:00</span>
                <div class="addressMsg">
                    <div class="address">
                        <h3>
                            <img src="../../../assets/images/my/my_dizhi.png" alt="">
                            <span>乘风破浪</span>
                            <span>158****9800</span>
                        </h3>
                        <p class="addressDetails">地址：北京市朝阳区霄云路35号6-5号</p>
                    </div>
                </div>
            </div>
            <!-- 状态信息 end -->
            <!-- 商品信息 str -->
            <div class="shopMsgBox">
                <div class="shopMsg">
                    <img src="../../../assets/images/shop/my_jiudian.png" alt="">
                    <p>飞利浦男士多功能电动剃须刀礼飞利浦男士多功能电动剃须刀礼</p>
                    <span>数量：1 产品：剃须刀</span>
                    <h3>¥ 599.00</h3>
                </div>
            </div>
            <!-- 商品信息 end -->
            <!-- 商品金额 str -->
            <div class="shopPriceBox">
                <div class="shopPrice">
                    <p>商品金额<span>¥559.00</span></p>
                    <p>商品金额<span>¥559.00</span></p>
                    <p>商品金额<span>¥559.00</span></p>
                    <div class="shopPriceBtn">
                        <span>实付金额</span>
                        <span>￥333.00</span>
                    </div>
                </div>
            </div>
            <!-- 商品金额 end -->
            <!-- 订单号 str -->
            <div class="orderNumBox">
                <div class="orderNum">
                    <p>
                        <span>订单号：S20180827171900001</span>
                        <span>复制</span>
                    </p>
                    <p>下单日期: 2018.01.01 15:00</p>
                    <p>支付方式：微信支付</p>
                    <p>配送方式：门店自取</p>
                </div>
            </div>
            <!-- 订单号 end -->
            <!-- orderFooter str -->
            <div class="orderBtn">
                <span>申请退款</span>
                <span class="orderBtnActive">确认收货</span>
            </div>
            <!-- orderFooter end -->
        </div>
    </div>
</template>
<style lang='less'>
    @import './orderDetails.less';
</style>
