<template>
    <div>
        <!-- 充值金额 str -->
        <div class="topUp">
            <p>充值金额</p>
            <div class="topUpVal">
                <span>￥</span>
                <input type="text" value="" placeholder="请输入充值金额..." />
            </div>
        </div>
        <!-- 充值金额 end -->
        <!-- 充值方式 str -->
        <ul class="payWay_package">
            <li>
                <p>支付方式<span>微信支付</span></p>
            </li>
            <li>
                <img src="../../../assets/images/shop/qianbao_yue.png" alt="">
                <p>支付方式<span>￥333.00</span></p>
            </li>
        </ul>
        <!-- 充值方式 end -->
        <!-- 充值按钮 str -->
        <div class="packAgeBtn">
            <router-link :to='{path:"topUpDetails"}'>
                <p>充值</p>
            </router-link>
        </div>
        <!-- 充值按钮 end -->
        <!-- 充值明细 str -->
        <div class="topUpMsg">
            <p>
                <router-link :to="{path:'topUpLists'}">
                    <span>充值明细</span>
                </router-link>
                <span>规则</span>
            </p>
        </div>
        <!-- 充值明细 end -->
        <!-- 充值提示 str -->
        <div class="topUpHint" style="display:none;">
            <span>充值失败</span>
        </div>
        <!-- 充值提示 end -->
    </div>
</template>
<style lang='less' scoped>
    @import './myWallet.less';
</style>

