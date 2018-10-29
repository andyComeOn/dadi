<template>
    <div>
        <!-- 收货地址无 str -->
        <div class="addressNot" style="display:none;">
            <img src="../../../assets/images/shop/shouhuodizhi_404.png" alt="">
            <div class="newAddress">
                <p>+新建收货地址</p>
            </div>
        </div>
        <!-- 收货地址无 end -->
        <!-- 编辑收货地址 str -->
        <div class="editAddress">
            <ul>
                <li>
                    <p>收货人</p>
                    <input type="text" value="" placeholder="请输入收货地址...">
                </li>
                <li>
                    <p>手机号</p>
                    <input type="text" value="" placeholder="请输入手机号...">
                    <img class="text_close" src="../../../assets/images/shop/text_close.png" alt="">
                </li>
                <li>
                    <p>所在地区</p>
                    <!-- <input type="text" value="" placeholder="请输入收货地址..."> -->
                    <img class="ic_arrow" src="../../../assets/images/arrows/ic-arrow_10_18.png" alt="">
                </li>
                <li>
                    <p>详细地址</p>
                    <input type="text" value="" placeholder="请输入收货地址...">
                </li>
            </ul>
        </div>
        <!-- 编辑收货地址 end -->
    </div>
</template>
<style lang='less' scoped>
    @import './editAddress.less';
</style>

