<template>
    <div>
        <div class="refundOrderBox">
            <!-- 商品详情 str -->
            <div class="refundOrder">
                <img src="../../../assets/images/shop/my_gouwu.png" alt="" />
                <p class="">飞利浦男士多功能电动剃须刀送礼专用剃须刀</p>
                <span>礼盒装型号</span>
            </div>
            <!-- 商品详情 end -->
            <!-- 退款金额 str -->
            <div class="refundPrice">
                <p class="">
                    <span>退款金额</span>
                    <span>￥234.00</span>
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
                <p>
                    <span>运单号</span>
                    <input type="text" value="" placeholder="请输入运单号..." />
                </p>
                <div class="refundExplainText">
                    <h3>退款说明</h3>
                    <textarea name="" rows="4" placeholder="请输入备注信息..."></textarea>
                </div>
            </div>
            <!-- refundExplain end -->
            <!-- footer str -->
            <div class="refundFooter">提交</div>
            <!-- footer end -->
            <!-- 退款金额详情 str -->
            <div class="refundBox">
                <div class="priceDetail">
                    <h3>
                        <img src="../../../assets/images/shop/popup_close.png" alt="" />
                        <span>金额明细</span>
                    </h3>
                    <p>
                        <span>商品金额</span>
                        <span>￥234.00</span>
                    </p>
                    <p>
                        <span>运费</span>
                        <span>￥234.00</span>
                    </p>
                    <p>
                        <span>满减优惠</span>
                        <span>￥234.00</span>
                    </p>
                    <div class="priceMoney">
                        <span>实付金额</span>
                        <span>￥234.00</span>
                    </div>
                </div>
            </div>
            <!-- 退款金额详情 end -->
        </div>
    </div>
</template>
<style lang='less'>
    @import './refundOrder.less';
</style>
