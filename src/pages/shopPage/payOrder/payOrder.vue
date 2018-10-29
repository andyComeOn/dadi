<template>
    <div>
        <div class="payOrderBox">
            <!-- 物流地址 str -->
            <router-link :to='{path:"editAddress"}'>
                <div class="logistics">
                    <!-- <h3>乘风破浪15808978960</h3>
                    <p>北京市朝阳区霄云路35号6-5号</p> -->
                    <span>请添加收货地址</span>
                    <img src="../../../assets/images/arrows/ic-arrow_10_18.png" alt="">
                </div>
            </router-link>
            <!-- 物流地址 end -->
            <!-- 商品信息 str -->
            <div class="shopDetails">
                <img src="../../../assets/images/shop/home-duihuan@1x.png" alt="">
                <p class="shopName">利浦（PHILIPS）男士电动剃须刀多功</p>
                <p class="shopSize">规格：红色</p>
                <p class="shopNum">X1</p>
                <p class="shopPrice"><span>￥</span>555.00</p>
            </div>
            <!-- 商品信息 end -->
            <div class="pickGoodsWay">
                <ul>
                    <li>
                        <span>数量</span>
                        <img src="../../../assets/images/shop/jian_normal@1x.png" alt="" />
                        <input type="text" value="" placeholder="" />
                        <img src="../../../assets/images/shop/plus_disable@1x.png" alt="" />
                    </li>
                    <li>
                        <span>提货方式</span>
                        <span>门店自取</span>
                        <img src="../../../assets/images/arrows/ic-arrow_10_18.png" alt="">
                    </li>
                    <li>
                        <span>可提货门店</span>
                        <img src="../../../assets/images/arrows/ic-arrow_10_18.png" alt="">
                    </li>
                </ul>
            </div>
            <!-- 优惠券 str -->
            <div class="quanLists">
                <p>
                    <span>优惠券</span>
                    <span>无可用</span>
                    <img src="../../../assets/images/arrows/ic-arrow_10_18.png" alt="">
                </p>
                <div class="billMsg">
                    <h3>发票信息<span>选填</span></h3>
                    <textarea name="" rows="2" placeholder="请输入发票信息"></textarea>
                </div>
            </div>
            <!-- 优惠券 end -->
            <!-- footer str -->
            <div class="payFooter">
                <p>应付款金额<span>￥555.00</span></p>
                <span class="payBtn">支付</span>
            </div>
            <!-- footer end -->
            <!-- 弹窗 str -->
            <div class="payBox" style="display:none;">
                <!-- 优惠券 str -->
                <div class="payCoupon" style='display:none;'>
                    <h3>
                        <img src="../../../assets/images/shop/popup_close.png" alt="">
                        <span>优惠券</span>
                    </h3>
                    <ul>
                        <li>
                            <p>满550元减199元</p>
                            <p>限定日期 2018.10.12-2018.10.25</p>
                            <img src="../../../assets/images/shop/checkbox_normal@1x.png" alt="">
                        </li>
                        <li>
                            <p>满550元减199元</p>
                            <p>限定日期 2018.10.12-2018.10.25</p>
                            <img src="../../../assets/images/shop/checkbox_normal@1x.png" alt="">
                            <span>￥555.00</span>
                        </li>
                        <li>
                            <p>满550元减199元</p>
                            <p>限定日期 2018.10.12-2018.10.25</p>
                            <img src="../../../assets/images/shop/checkbox_normal@1x.png" alt="">
                            <span>￥555.00</span>
                        </li>
                        <li>
                            <p>满550元减199元</p>
                            <p>限定日期 2018.10.12-2018.10.25</p>
                            <img src="../../../assets/images/shop/checkbox_normal@1x.png" alt="">
                            <span>￥555.00</span>
                        </li>
                    </ul>
                </div>
                <!-- 优惠券 end -->
                <!-- 可提货门店 str -->
                <div class="pickGoodsStore" style="display:none;">
                    <h3>
                        <span>可提货门店</span>
                        <img src="../../../assets/images/shop/popup_close.png" alt="">
                    </h3>
                    <ul>
                        <li>秋果-新国展首都机场店</li>
                        <li>秋果-三元桥店</li>
                        <li>秋果-华茂店</li>
                    </ul>
                </div>
                <!-- 可提货门店 end -->
                <!-- 支付方式 str -->
                <div class="payWay" style="display:none;">
                    <h3>
                        <img src="../../../assets/images/shop/popup_close.png" alt="">
                        <span>支付方式</span>
                    </h3>
                    <ul>
                        <li>
                            <img src="../../../assets/images/shop/zhifu_wechat@1x.png" alt="">
                            <span>微信支付</span>
                            <img src="../../../assets/images/shop/checkbox_selected@1x.png" alt="">
                        </li>
                        <li>
                            <img src="../../../assets/images/shop/zhifu_qianbao@1x.png" alt="">
                            <span>钱包支付(余额￥456.00)</span>
                            <img src="../../../assets/images/shop/checkbox_normal@1x.png" alt="">
                        </li>
                        <li>
                            &nbsp;
                        </li>
                    </ul>
                    <div class="payBtnOk">
                        确认支付
                    </div>
                </div>
                <!-- 支付方式 ebd -->
                <!-- 输入短信验证码 str -->
                <div class="msgCode" style="display:none;">
                    <h3>
                        <span>输入短信验证码</span>
                        <img src="../../../assets/images/shop/popup_close.png" alt="">
                    </h3>
                    <p class="">已发送至手机号136＊＊＊＊8987</p>
                    <div class="msgCodeInp">
                        <input type="text" value="" placeholder="" />
                        <img src="../../../assets/images/shop/text_close.png" alt="">
                        <span>发送验证码</span>
                    </div>
                    <div class="msgPayBtn">
                        <p>确认支付<span>￥555.00</span></p>
                    </div>
                </div>
                <!-- 输入短信验证码 end -->
                <!-- 放弃支付 str -->
                <div class="giveBox" style="display:none;">
                    <p>确认要放弃支付吗？</p>
                    <span>继续支付</span>
                    <span>确认放弃</span>
                </div>
                <!-- 放弃支付 end -->
            </div>
            <!-- 弹窗 end -->
        </div>
        <!-- hint box str -->
        <div class="hintBox" style="display:none;">
            <span>还未添加收货地址</span>
        </div>
        <!-- hint box end -->
    </div>
</template>
<style lang="less" scoped>
    @import './payOrder.less';
</style>

