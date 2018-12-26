<template>
    <div>
        <div class="payOrderBox">
            <!-- 物流地址 str -->
            <!-- <router-link :to='{path:"editAddress"}'>
                <div class="logistics"> -->
            <!-- <h3>乘风破浪15808978960</h3>
                    <p>北京市朝阳区霄云路35号6-5号</p> -->
            <!-- <span>请添加收货地址</span>
                    <img src="../../../assets/images/arrows/ic-arrow_10_18.png" alt="">
                </div>
            </router-link> -->
            <!-- 物流地址 end -->
            <!-- 商品信息 str -->

            <!-- toast(loading=>weui) -->
            <div v-show="loading">
                <div class="weui-mask_transparent"></div>
                <div class="weui-toast">
                    <i class="weui-loading weui-icon_toast"></i>
                    <p class="weui-toast__content">{{loadingTxt}}</p>
                </div>
            </div>
            <!-- toast（delay=>z） -->
            <div v-show="delayToast">
                <div class="z-mask-transparent"></div>
                <div class="z-toast">
                    <i class="z-toast-icon"></i>
                    <p class="z-toast-content">{{delayToastTxt}}</p>
                </div>
            </div>
            <div class="shopDetails">
                <img src="../../../assets/images/shop/home-duihuan@1x.png" alt="">
                <p class="shopName">{{shopName}}</p>
                <p class="shopSize">规格：{{shopSize}}</p>
                <p class="shopNum">X{{shopNum}}</p>
                <p class="shopPrice"><span>￥</span>{{shopPrice}}</p>
            </div>
            <!-- 商品信息 end -->
            <div class="pickGoodsWay">
                <ul>
                    <li>
                        <span>数量</span>
                        <img :src="btnMinus" alt="" @click="minus()" />
                        <input type="text" v-model="shopNum" value="" placeholder="" disabled />
                        <img :src="btnPlus" alt="" @click="plusSign()" />
                    </li>
                    <li @click="pickUpWay()">
                        <span>提货方式</span>
                        <span v-if='deliveryWay == 1'>门店自取</span>
                        <span v-if='deliveryWay == 2'>物流配送</span>
                        <img src="../../../assets/images/arrows/ic-arrow_10_18.png" alt="">
                    </li>
                    <li v-if="deliveryWay == 1" @click='storeLists()'>
                        <span>可提货门店</span>
                        <span></span>
                        <img src="../../../assets/images/arrows/ic-arrow_10_18.png" alt="">
                    </li>
                    <li v-if='deliveryWay == 2'>
                        <span>运费</span>
                        <span>{{freight_money}}</span>
                    </li>
                </ul>
            </div>
            <!-- 优惠券 str -->
            <div class="quanLists">
                <div class="couponBox" @click="couponBoxBtn()">
                    <p>
                        <span>优惠券</span>
                        <span>无可用</span>
                        <img src="../../../assets/images/arrows/ic-arrow_10_18.png" alt="">
                    </p>
                </div>
                <div class="billMsg">
                    <h3>发票信息<span>选填</span></h3>
                    <textarea v-model="user_remark" name="" rows="2" placeholder="请输入发票信息"></textarea>
                </div>
            </div>
            <!-- 优惠券 end -->
            <!-- footer str -->
            <div class="payFooter">
                <p>应付款金额<span>￥{{totalPrices}}</span></p>
                <span class="payBtn" @click="payBtn()">支付</span>
            </div>
            <!-- footer end -->
            <!-- 弹窗 str -->
            <div class="payBox" v-if='payBox == true' @click.self="payBoxBtn()">
                <!-- 优惠券 str -->
                <div class="payCoupon" v-if="couponBox == true">
                    <h3>
                        <img src="../../../assets/images/shop/popup_close.png" alt="" @click="couponCrossBtn()">
                        <span>优惠券</span>
                    </h3>
                    <ul>
                        <li v-for='(item,index) in couponArr' @click='couponChoose(index,item.id)' :key="index">
                            <p>满{{item.min_amount}}元减{{item.amount}}</p>
                            <p>限定日期{{item.validity_begin_time}}-{{item.validity_end_time}}</p>
                            <img v-if='index == couponChooseInd' :src="chooseImg" alt="">
                            <img v-else :src="chooseNoImg" alt="">
                        </li>
                    </ul>
                </div>
                <!-- 优惠券 end -->
                <!-- 可提货门店 str -->
                <div class="pickGoodsStore" v-if='storeBox == true'>
                    <h3>
                        <span>可提货门店</span>
                        <img src="../../../assets/images/shop/popup_close.png" alt="" @click="storeCrossBtn()">
                    </h3>
                    <ul>
                        <li>秋果-新国展首都机场店</li>
                    </ul>
                </div>
                <!-- 可提货门店 end -->
                <!-- 支付方式 str -->
                <div class="payWay" v-if="payWayBox == true">
                    <h3>
                        <img src="../../../assets/images/shop/popup_close.png" alt="" @click="payWayClose()">
                        <span>支付方式</span>
                    </h3>
                    <ul>
                        <li v-for='(item,index) in payWayArr' @click="payWayBoxBtn(index)" :key="index">
                            <img :src="item.payWayIcon" alt="">
                            <span>{{item.payWayName}}</span>
                            <img v-if='index == choosePayWayInd' :src="choosePayWayImg" alt="">
                            <img v-else :src="choosePayWayNoImg" alt="">
                        </li>
                        <li>&nbsp;</li>
                    </ul>
                    <div class="payBtnOk" @click="payBtnOk()">
                        确认支付
                    </div>
                </div>
                <!-- 支付方式 ebd -->
                <!-- 输入短信验证码 str -->
                <div class="msgCode" v-if='msgCodeBox == true'>
                    <h3>
                        <span>输入短信验证码</span>
                        <img src="../../../assets/images/shop/popup_close.png" alt="" @click="msgCodeBtn()">
                    </h3>
                    <p class="">已发送至手机号{{mobile}}</p>
                    <div class="msgCodeInp">
                        <input type="text" value="" placeholder="" />
                        <img src="../../../assets/images/shop/text_close.png" alt="">
                        <span v-if='sendCodeMsg == true' @click="sendCode()">发送验证码</span>
                        <span class="codeMsg" v-else>{{getTime}}s后重发</span>
                    </div>
                    <div class="msgPayBtn">
                        <p>确认支付<span>￥{{totalPrices}}</span></p>
                    </div>
                </div>
                <!-- 输入短信验证码 end -->

                <!-- 配送方式 str -->
                <div class="shopDetailsBox" v-if='shopDetailsBox == true'>
                    <ul class="deliveryLists">
                        <li @click="delivery(1)">
                            <img src="../../../assets/images/shop/peisong_mendian.png" alt="">
                            <p>门店自提</p>
                        </li>
                        <li @click="delivery(2)">
                            <img src="../../../assets/images/shop/peisong_wuliu.png" alt="">
                            <p>物流配送</p>
                        </li>
                    </ul>
                </div>
                <!-- 配送方式 end -->
            </div>
            <!-- 弹窗 end -->
            <!-- 放弃支付(二次弹窗) str -->
            <div class="giveBoxWrap" v-show="isGiveBoxWrapShow">
                <div class="giveBox">
                    <p>确认要放弃支付吗？</p>
                    <span @click="isGiveBoxWrapShow = false">继续支付</span>
                    <span @click="isGiveBoxWrapShow = false">确认放弃</span>
                </div>
            </div>
            <!-- 放弃支付 end -->
        </div>

        <!-- hint box str -->
        <div class="hintBox" style="display:none;">
            <span>还未添加收货地址</span>
        </div>
        <!-- hint box end -->
    </div>
</template>
<script>
import {
    shopDetails,
    usableCoupon,
    WxPay,
    placeOrder,
    getCookieTest,
    sendMobile
} from "../../../api/api.js";
import { getCookie } from "../../../utils/util.js";
export default {
    name: "payOrder",
    components: {},
    data() {
        return {
            loading: true, // loading是否显示
            loadingTxt: "加载中...",
            delayToast: false,
            delayToastTxt: "",
            shopName: "", //商品姓名
            shopSize: "", //商品规格
            shopPrice: "", //商品价格
            shopNum: "", //商品购买数量
            max_num: "", //最大购买量
            deliveryWay: "", //1门店自提  2物流配送
            payBox: false, //弹窗背景
            storeBox: false, //门店弹窗
            shopDetailsBox: false, //配送方式弹窗
            freight_money: "", //运费
            couponBox: false, //优惠券弹窗
            chooseNoImg: require("../../../assets/images/shop/checkbox_normal@1x.png"), //选择图标
            chooseImg: require("../../../assets/images/shop/checkbox_selected@1x.png"), //选择图标
            couponChooseInd: -1,
            payWayBox: false, //支付方式弹窗
            payWayArr: [
                {
                    payWayIcon: require("../../../assets/images/shop/zhifu_wechat@1x.png"),
                    payWayName: "微信支付"
                },
                {
                    payWayIcon: require("../../../assets/images/shop/zhifu_qianbao@1x.png"),
                    payWayName: "钱包支付(余额¥456.00)"
                }
            ],
            choosePayWayInd: -1,
            choosePayWayNoImg: require("../../../assets/images/shop/checkbox_normal@1x.png"),
            choosePayWayImg: require("../../../assets/images/shop/checkbox_selected@1x.png"),
            totalPrices: "", //总价格
            couponArr: [], //优惠券
            coupon_id: "", //优惠券
            user_remark: "", //发票信息
            avail_amount: "", //钱包余额
            msgCodeBox: false, //钱包支付验证码弹窗
            mobile: "", //手机号
            setTime: 58,
            getTime: "59",
            sendCodeMsg: true,
            btnPlus: require("../../../assets/images/shop/plus_normal@1x.png"), // “加”按钮图片默认的src
            btnMinus: require("../../../assets/images/shop/jian_disable@1x.png"), // “减”按钮图片默认的src
            btnPlusDisable: require("../../../assets/images/shop/plus_disable@1x.png"), // “加”按钮图片disable
            btnPlusNormal: require("../../../assets/images/shop/plus_normal@1x.png"), // “加”按钮图片normal
            btnMinusDisable: require("../../../assets/images/shop/jian_disable@1x.png"), // “减”按钮图片disable
            btnMinusNormal: require("../../../assets/images/shop/jian_normal@1x.png"), //“减”按钮图片normal
            isGiveBoxWrapShow: false, // 确认要放弃支付是否显示
        };
    },
    mounted() {
        this.avail_amount = getCookie("avail_amount"); //钱包余额
        this.payWayArr[1].payWayName =
            "钱包支付(余额¥" + this.avail_amount + ")"; //设置钱包余额
        this.mobile =
            getCookie("userInfoTel").substr(0, 3) +
            "****" +
            getCookie("userInfoTel").substr(7); //手机号
        this.deliveryWay = this.$route.query.deliveryWay; //配送方式
        this.fetchGoodsDetail();
    },
    methods: {
        fetchGoodsDetail() {
            this.$http({
                url: shopDetails,
                method: "POST",
                data: {
                    id: this.$route.query.shopId
                }
            }).then(res => {
                if (res.data.status == 1) {
                    this.loading = false;
                    this.shopName = res.data.data.goods_name; //商品名称
                    this.shopSize = res.data.data.specs; //商品规格
                    this.shopPrice = res.data.data.goods_price; //商品价格
                    this.shopNum = this.$route.query.payShopNum; //商品购买数量（路由带）
                    this.totalPrices = this.shopPrice * this.shopNum; // 用户应付费
                    this.max_num = res.data.data.max_num; //最大购买量
                    this.freight_money = res.data.data.freight_money; //运费
                } else {
                    this.loadingTxt = "数据异常";
                    this.loading = true;
                }
            });
        },
        minus() {
            //减少购买数量
            if (this.shopNum == 1) {
                this.btnMinus = this.btnMinusDisable;
                this.delayToastTxt = "已经是最小购买量了";
                this.delayToast = true;
                setTimeout(() => {
                    this.delayToast = false;
                }, 1500);
                return false;
            } else {
                this.shopNum--;
                this.totalPrices = (
                    (this.shopPrice * 100 * this.shopNum) /
                    100
                ).toFixed(2);
            }
        },
        plusSign() {
            //增加购买数量
            if (this.shopNum == this.max_num) {
                this.btnPlus = this.btnPlusDisable;
                this.delayToastTxt = "已经是最大购买量了";
                this.delayToast = true;
                setTimeout(() => {
                    this.delayToast = false;
                }, 1500);
                return false;
            } else {
                this.btnMinus = this.btnMinusNormal;
                this.btnPlus = this.btnPlusNormal;
                this.shopNum++;
                this.totalPrices = (
                    (this.shopPrice * 100 * this.shopNum) /
                    100
                ).toFixed(2);
            }
        },
        pickUpWay() {
            //提货方式弹窗
            this.payBox = true;
            this.shopDetailsBox = true;
        },
        delivery(wayType) {
            //配送方式选择
            this.deliveryWay = wayType;
            this.payBox = false;
            this.shopDetailsBox = false;
        },
        storeLists() {
            //门店列表弹窗
            this.payBox = true;
            this.storeBox = true;
        },
        payBoxBtn() {
            //全部弹窗设置为false
            this.payBox = false;
            this.storeBox = false;
            this.shopDetailsBox = false;
            this.couponBox = false;
            this.payWayBox = false;
            this.msgCodeBox = false; // 钱包支付弹窗
        },
        couponBoxBtn() {
            //  优惠券弹窗
            this.payBox = true;
            this.couponBox = true;
            //可用优惠券
            this.$http({
                url: usableCoupon,
                method: "POST",
                data: {
                    id: this.$route.query.shopId,
                    number: this.$route.query.payShopNum
                }
            }).then(res => {
                if (res.data.status == 1) {
                    console.log(res);
                    this.couponArr = res.data.data;
                } else {
                }
            });
        },
        storeCrossBtn() {
            // 可提货门店关闭弹窗
            this.payBox = false;
            this.storeBox = false;
        },
        couponCrossBtn() {
            //  优惠券关闭
            this.payBox = false;
            this.couponBox = false;
        },
        couponChoose(couponChooseInd, coupon_id) {
            //优惠券选择
            this.chooseImg = require("../../../assets/images/shop/checkbox_selected@1x.png");
            this.payBox = false;
            this.couponBox = false;
            this.couponChooseInd = couponChooseInd;
            this.coupon_id = coupon_id; //优惠券
        },
        payBtn() {
            //支付方式弹窗
            this.$http({
                url: placeOrder,
                method: "POST",
                data: {
                    logistic_type: this.deliveryWay, //配送方式
                    id: this.$route.query.shopId, //商品id
                    number: this.shopNum, //数量
                    coupon_id: this.coupon_id, //优惠券id
                    address: "", //地址
                    mobile: getCookie("userInfoTel"), //手机号
                    name: "", //姓名
                    user_remark: this.user_remark //订单留言
                }
            }).then(res => {
                if (res.data.status == 1) {
                    console.log(res);
                    this.payBox = true;
                    this.payWayBox = true;
                } else {
                    alert("获取失败");
                }
            });
        },
        payWayBoxBtn(payWayNum) {
            //选择支付方式
            // this.payBox = false;
            // this.payWayBox = false;
            this.choosePayWayInd = payWayNum;
        },
        payWayClose() {
            //支付方式关闭
            this.payBox = false;
            this.payWayBox = false;
        },
        payBtnOk() {
            //确认支付
            if (this.choosePayWayInd == 0) {
                alert("微信支付");
            } else if (this.choosePayWayInd == 1) {
                this.payWayBox = false;
                this.msgCodeBox = true;
            } else {
                alert("请选择支付方式");
            }
            // this.$http({
            //     url:WxPay,
            //     method:'POST',
            //     data:{
            //         order_id:''
            //     }
            // }).then(res=>{
            //     if(res.data.status == 1){
            //         console.log(res);
            //     }else{
            //         alert(123);
            //     }
            // });
        },
        msgCodeBtn() {
            //钱包余额弹窗关闭
            // alert("钱包余额弹窗关闭");
            this.isGiveBoxWrapShow = true;
        },
        sendCode() {
            // 钱包支付-获取支付验证码
            // this.$http({
            //     url:sendMobile,
            //     method:'POST',
            //     data:{
            //         mobile:getCookie('userInfoTel'),
            //         type:4
            //     }
            // }).then(res=>{
            //     console.log(res);
            //     if(res.data.status == 1){
            //         console.log(res);
            //     }else{

            //     }
            // });
            this.sendCodeMsg = false;
            let timer = setInterval(() => {
                if (this.setTime >= 0) {
                    let tmpMin = Math.floor(this.setTime / 60);
                    let min = tmpMin < 10 ? "0" + tmpMin : tmpMin;
                    let tmpSec = Math.floor(this.setTime % 60);
                    let sec = tmpSec < 10 ? "0" + tmpSec : tmpSec;
                    this.getTime = sec;
                    this.setTime--;
                } else {
                    clearInterval(timer);
                    this.sendCodeMsg = true;
                    this.setTime = 58;
                    this.getTime = 59;
                }
            }, 1000);
        }
    }
};
</script>

<style lang="less" scoped>
@import "./payOrder.less";
</style>

