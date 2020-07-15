<template>
    <div>
        <div class="payOrderBox">
            <!-- 物流地址 str=======    物流信息     ============= -->
            <router-link :to='{path:"address",query:{shopId:this.$route.query.shopId,payShopNum:this.shopNum,deliveryWay:this.deliveryWay,spec_id:this.$route.query.spec_id}}' v-if="deliveryWay == 1">
                <div class="logistics">
                    <div v-if="this.siteAddressMsg != ''">
                        <h3>{{this.siteAddressMsg.name}}&nbsp;&nbsp;&nbsp;&nbsp;{{this.siteAddressMsg.mobile}}</h3>
                        <p>
                            <i v-if="this.siteAddressMsg.is_default == 1">默认</i>
                            {{this.siteAddressMsg.province + this.siteAddressMsg.city + this.siteAddressMsg.area + this.siteAddressMsg.address_detail}}
                            <img src="../../../assets/images/arrows/ic-arrow_10_18.png" alt="">
                        </p>
                    </div>
                    <span v-if="this.siteAddressMsg == ''">请添加收货地址</span>
                </div>
            </router-link>
            <!-- 物流地址 end=========   物流信息     ================== -->
            <!-- 商品信息 str -->
            <div class="shopDetails">
                <div class="goods_bg">
                    <img :src="this.shopDetailsMsg.goods_img" alt="">
                </div>
                <p class="shopName"><span v-if="this.shopDetailsMsg.consume_type == 2 || this.shopDetailsMsg.consume_type == 3">积分</span>{{this.shopDetailsMsg.goods_name}}</p>
                <p class="shopSize">规格：{{this.shopDetailsMsg.specs}}</p>
                <p class="shopNum">X{{shopNum}}</p>
                <p class="shopPrice" v-if="this.shopDetailsMsg.consume_type == 1"><span>￥</span>{{shopPrice}}</p>
                <p class="shopPrice" v-if="this.shopDetailsMsg.consume_type == 2">{{goods_integral}}<span>积分</span></p>
                <p class="shopPrice" v-if="this.shopDetailsMsg.consume_type == 3"><span>￥</span>{{shopPrice}}+{{goods_integral}}<span>积分</span></p>
            </div>
            <!-- 商品信息 end -->
            <!--  -->
            <div class="pickGoodsWay">
                <ul>
                    <li>
                        <span>数量</span>
                        <img :src="btnMinus" @click="minus()" />
                        <i>{{shopNum}}</i>
                        <img :src="btnPlus" @click="plusSign()" />
                    </li>
                    <li @click="pickUpWay()">
                        <span>配送方式</span>
                        <span v-if='deliveryWay == 2'>门店自取</span>
                        <span v-if='deliveryWay == 1'>物流配送</span>
                        <img src="../../../assets/images/arrows/ic-arrow_10_18.png" alt="">
                    </li>
                    <li v-if="deliveryWay == 2" @click='storeLists()'>
                        <span>可提货门店</span>
                        <span></span>
                        <img src="../../../assets/images/arrows/ic-arrow_10_18.png" alt="">
                    </li>
                    <!-- 运费 str -->
                    <li v-if="this.deliveryWay == 1">
                        <span>运费</span>
                        <span>￥{{freight_money}}</span>
                    </li>
                    <!-- 运费 end -->
                </ul>
            </div>
            <!-- 优惠券 str -->
            <div class="quanLists">
                <div class="couponBox" @click="couponBoxBtn()" v-if="this.shopDetailsMsg.consume_type == 1">
                    <p>
                        <span>优惠券</span>
                        <span>{{this.couponTitle}}</span>
                        <img src="../../../assets/images/arrows/ic-arrow_10_18.png" alt="">
                    </p>
                </div>
                <div class="billMsg billMsg_border">
                    <h3>发票信息</h3>
                    <textarea v-model="user_remark" name="" rows="3" placeholder="请输入发票信息(选填)"></textarea>
                </div>
                <div class="billMsg">
                    <h3>备注</h3>
                    <textarea v-model="user_comment" name="" rows="3" placeholder="请输入备注信息(选填)"></textarea>
                </div>
            </div>
            <!-- 优惠券 end -->
            <!-- footer str -->
            <div class="payFooter">
                <p v-if="this.shopDetailsMsg.consume_type == 1">应付款金额<span>￥{{totalPrices}}</span></p>
                <p v-if="this.shopDetailsMsg.consume_type == 2">应付款金额<span>{{totalIntegral}}积分</span></p>
                <p v-if="this.shopDetailsMsg.consume_type == 3">应付款金额<span>￥{{totalPrices}}+{{totalIntegral}}<i>积分</i></span></p>
                <span v-if="this.shopDetailsMsg.consume_type == 1 || this.shopDetailsMsg.consume_type == 3" class="payBtn" @click="payBtn()">支付</span>
                <span v-if="this.shopDetailsMsg.consume_type == 2" class="payBtn" @click="payBtn()">兑换</span>
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
                        <li v-for='(item,index) in couponArr' @click='couponChoose(item.min_amount,index,item.id,item.amount)' :key="index">
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
                    <div class="storeLists">
                        <ul>
                            <li v-for="item in this.storeArr">{{item}}</li>
                        </ul>
                    </div>
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
                        <input v-model="codeMsgValue" type="text" value="" placeholder="" />
                        <img v-if="codeMsgValue != ''" src="../../../assets/images/shop/text_close.png" alt="" @click="codeMsgValue = ''">
                        <span v-if='sendCodeMsg == true' @click="sendCode()">发送验证码</span>
                        <span class="codeMsg" v-else>{{getTime}}s后重发</span>
                    </div>
                    <div class="msgPayBtn" v-if='codeMsgValue.length  != 4'>
                        <p v-if="shopDetailsMsg.consume_type == 3">确认支付<span>￥{{totalPrices}}+{{totalIntegral}}积分</span></p>
                        <p v-if="shopDetailsMsg.consume_type == 2">确认支付{{totalIntegral}}积分</span></p>
                        <p v-if="shopDetailsMsg.consume_type == 1">确认支付<span>￥{{totalPrices}}</span></p>
                    </div>
                    <div v-else class="msgPayBtnActive" @click="balancePayBtn()">
                        <p v-if="shopDetailsMsg.consume_type == 3">确认支付<span>￥{{totalPrices}}+{{totalIntegral}}积分</span></p>
                        <p v-if="shopDetailsMsg.consume_type == 2">确认支付{{totalIntegral}}积分</span></p>
                        <p v-if="shopDetailsMsg.consume_type == 1">确认支付<span>￥{{totalPrices}}</span></p>
                    </div>
                </div>
                <!-- 输入短信验证码 end -->
                <!-- 配送方式 str -->
                <div class="shopDetailsBox" v-if='shopDetailsBox == true'>
                    <ul class="deliveryLists">
                        <li @click="delivery(2)" v-if='this.logistic_type == 2 || this.logistic_type == 3'>
                            <img src="../../../assets/images/shop/peisong_mendian.png" alt="">
                            <p>门店自提</p>
                        </li>
                        <li @click="delivery(1)" v-if='this.logistic_type == 1 || this.logistic_type == 3'>
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
import { shopDetails,usableCoupon,WxPayGoods,placeOrder,getCookieTest,sendMobile,balancePay,goodsPrice,goodsOrderAddress,userInfo} from "../../../api/api.js";
import { getCookie } from "../../../utils/util.js";
import { setTimeout } from 'timers';
export default {
    name: "payOrder",
    components: {},
    data() {
        return {
            // new============================================
            shopDetailsMsg:"",          //商品详情
            shopNum: "",                //商品购买数量
            order_id:"",                //订单id
            couponTitle:"",             //优惠券信息
            couponAmount:0,             //优惠券金额
            codeMsgValue:"",            //验证码信息
            logistic_type:"",           //配送方式 1邮寄  2自提 3邮寄+自提
            freight_money:"",           //运费
            goods_integral:"",          //积分
            totalPrices: "",            //总价格
            totalIntegral:"",          //总积分
            MobileType:8,               //默认余额支付
            siteAddressMsg:"",          //默认地址数据
            // new============================================
            loading: true, // loading是否显示
            loadingTxt: "加载中...",
            delayToast: false,
            delayToastTxt: "",
            shopPrice: "", //商品价格
            max_num: "", //最大购买量
            deliveryWay: "", //1门店自提  2物流配送
            payBox: false, //弹窗背景
            storeBox: false, //门店弹窗
            shopDetailsBox: false, //配送方式弹窗
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
                    payWayName: "钱包支付(余额¥"+ getCookie("avail_amount") + ")"
                }
            ],
            choosePayWayInd: -1,
            choosePayWayNoImg: require("../../../assets/images/shop/checkbox_normal@1x.png"),
            choosePayWayImg: require("../../../assets/images/shop/checkbox_selected@1x.png"),
            
            couponArr: [], //优惠券
            coupon_id: "", //优惠券
            user_remark: "", //发票信息,
            user_comment:"", //用户备注
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
            storeArr:[],            //可提货门店
            address_id:"",          //地址id
        };
    },
    watch:{
        user_remark(a,b){
            if(a.length > 200){
                this.delayToast = true;
                this.delayToastTxt = "超过最长字符(200)";
                setTimeout(()=>{
                    this.delayToast = false;
                },1500);
                this.user_remark = b;
            }
        },
        user_comment(a,b){
            if(a.length > 200){
                this.delayToast = true;
                this.delayToastTxt = "超过最长字符(200)";
                setTimeout(()=>{
                    this.delayToast = false;
                },1500);
                this.user_comment = b;
            }
        }
    },
    mounted() {
        let specId = this.$route.query.spec_id;
        this.shopNum = this.$route.query.payShopNum;            //购买数量
        this.avail_amount = getCookie("avail_amount");          //钱包余额
        this.payWayArr[1].payWayName =
            "钱包支付(余额¥" + this.avail_amount + ")";          //设置钱包余额
        this.mobile = getCookie("userInfoTel").substr(0, 3) + "****" + getCookie("userInfoTel").substr(7); //手机号
        this.deliveryWay = this.$route.query.deliveryWay;       //配送方式
        this.goodsPriceMsg();                                   //获取总价格和总积分
        this.fetchGoodsDetail(specId);                                //获取商品详情
        // this.goodsAddressSite();                                //获取下单地址
    },
    methods: {               
        fetchGoodsDetail(specId) {                //获取商品详情
            this.loading = true;            //loading
            this.$http({
                url: shopDetails,
                method: "POST",
                data: {
                    id: this.$route.query.shopId,
                    spec_id:specId
                }
            }).then(res => {
                console.log(res);
                this.loading = false;                   //loading
                if (res.data.status == 1) {
                    this.shopDetailsMsg = res.data.data;                //商品详情
                    this.shopPrice = res.data.data.goods_price;         //商品价格
                    this.shopNum = this.$route.query.payShopNum;        //商品购买数量（路由带）
                    this.max_num = res.data.data.max_num;               //最大购买量
                    this.storeArr = res.data.data.store_name.split(',');
                    // 判断显示“加”后者“减”号
                    if(this.shopNum == this.shopDetailsMsg.max_num){
                        this.btnPlus = this.btnPlusDisable;
                        this.btnMinus = this.btnMinusNormal;
                    }else if(this.shopNum == 1){
                        this.btnPlus = this.btnPlusNormal;
                        this.btnMinus = this.btnMinusDisable;
                    }else{
                        this.btnPlus = this.btnPlusNormal;
                        this.btnMinus = this.btnMinusNormal;
                    }
                    this.logistic_type = res.data.data.logistic_type;           //配送方式 1邮寄  2自提 3邮寄+自提
                    this.freight_money = res.data.data.freight_money;           //运费
                    this.goods_integral = res.data.data.goods_integral;         //积分
                    if(this.shopDetailsMsg.address_id !="" && this.$route.query.addressId == undefined ){
                        this.goodsAddressSite(this.shopDetailsMsg.address_id);
                        this.address_id = this.shopDetailsMsg.address_id;
                        console.log("地址" + this.address_id)
                    }else if(this.$route.query.addressId){
                        this.goodsAddressSite(this.$route.query.addressId);
                        this.address_id = this.$route.query.addressId;
                    }else{
                        this.address_id = "";
                    }
                } else {
                    this.delayToast = true;
                    this.delayToastTxt = res.data.msg;
                    setTimeout(()=>{
                        this.delayToast = false;
                    });
                }
            });
        },
        minus() {           //减少购买数量
            this.btnPlus = this.btnPlusNormal;
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
                this.goodsPriceMsg();       //商品价格计算
            }
        },
        plusSign() {        //增加购买数量
            this.btnMinus = this.btnMinusNormal;
            if (this.shopNum == this.max_num) {
                this.btnPlus = this.btnPlusDisable;
                this.delayToastTxt = "已经是最大购买量了";
                this.delayToast = true;
                setTimeout(() => {
                    this.delayToast = false;
                }, 1500);
                return false;
            } else {
                this.shopNum++;
                this.goodsPriceMsg();       //商品价格计算
            }
        },
        pickUpWay() {                   //提货方式弹窗
            if(this.logistic_type == 1){
                this.delayToast = true;
                this.delayToastTxt = '仅支持物流配送';
                setTimeout(()=>{
                    this.delayToast = false;
                },1500);
            }else if(this.logistic_type == 2){
                this.delayToast = true;
                this.delayToastTxt = '仅支持门店自提';
                setTimeout(()=>{
                    this.delayToast = false;
                },1500);
            }else{
                this.payBox = true;
                this.shopDetailsBox = true;
            }   
        },
        delivery(wayType) {             //配送方式选择
            this.deliveryWay = wayType;
            this.goodsPriceMsg();
            this.payBox = false;
            this.shopDetailsBox = false;
        },
        storeLists() {          //门店列表弹窗
            this.payBox = true;
            this.storeBox = true;
        },
        payBoxBtn() {           //全部弹窗设置为false
            this.payBox = false;
            this.storeBox = false;
            this.shopDetailsBox = false;
            this.couponBox = false;
            this.payWayBox = false;
            this.msgCodeBox = false; // 钱包支付弹窗
        },
        couponBoxBtn() {            //可用优惠券
            this.loading = true;            //loading
            this.$http({
                url: usableCoupon,
                method: "POST",
                data: {
                    id: this.$route.query.shopId,
                    number: this.$route.query.payShopNum
                }
            }).then(res => {
                this.loading = false;               //loading
                if (res.data.status == 1) {
                    this.couponArr = res.data.data;                //优惠券信息
                    if(res.data.data.length == 0){          
                        // this.couponTitle = "暂无优惠券";            //优惠券表题
                        this.delayToastTxt = "暂无优惠券";
                        this.delayToast = true;
                        setTimeout(() => {
                            this.delayToast = false;
                        }, 1500);
                        return false;
                    }else{
                        this.payBox = true;
                        this.couponBox = true;
                    }
                } else {
                    this.delayToastTxt = res.data.msg;
                    this.delayToast = true;
                    setTimeout(() => {
                        this.delayToast = false;
                    }, 1500);
                    return false;
                }
            });
        },
        storeCrossBtn() {            // 可提货门店关闭弹窗
            this.payBox = false;
            this.storeBox = false;
        },
        couponCrossBtn() {            //  优惠券关闭
            this.payBox = false;
            this.couponBox = false;
        },
        couponChoose(sumAmount,couponChooseInd, coupon_id,couponAmount) {
            //优惠券选择
            this.chooseImg = require("../../../assets/images/shop/checkbox_selected@1x.png");
            this.payBox = false;
            this.couponBox = false;
            this.couponChooseInd = couponChooseInd;
            this.coupon_id = coupon_id; //优惠券
            this.goodsPriceMsg();
            this.couponTitle = "满" + sumAmount + "减" + couponAmount;
        },
        payBtn() {                      //支付方式弹窗  //下单
            //如果是积分加运费时需要以下判断
            let consume_type;
            if(this.shopDetailsMsg.freight_type == 2 && this.shopDetailsMsg.consume_type == 2 && this.deliveryWay == 1){
                consume_type = 3;
            }else{
                consume_type = this.shopDetailsMsg.consume_type
            }
            if(!getCookie('userInfoTel')){
                this.$router.push({path:'Login',query:{loginPage:3,shopId:this.$route.query.shopId}});
            }else{
               this.loading = true;                             //loading
                this.$http({                      
                    url: placeOrder,
                    method: "POST",
                    data: {
                        logistic_type: this.deliveryWay,        //配送方式
                        id: this.$route.query.shopId,           //商品id
                        number: this.shopNum,                   //数量
                        coupon_id: this.coupon_id,              //优惠券id
                        mobile: getCookie("userInfoTel"),       //手机号
                        user_remark: this.user_remark,          //订单留言
                        user_comment:this.user_comment,
                        address_id:this.address_id, //地址id
                        spec_id: this.$route.query.spec_id,           //规格id
                    }
                }).then(res => {
                    this.loading = false;            //loading
                    if (res.data.status == 1) {
                        console.log(res);
                        this.order_id = res.data.data.order_id;     //订单id
                        //获得订单号和支付方式然后跳转到收银台
                        this.$router.push({
                            path:"payPage",
                            query:{
                                orderId:this.order_id,
                                consumeType:consume_type,
                                totalIntegral:this.totalIntegral,
                                totalPrices:this.totalPrices
                            }
                        });
                    } else {
                        this.delayToastTxt = res.data.msg;
                        this.delayToast = true;
                        setTimeout(() => {
                            this.delayToast = false;
                        }, 1500);
                        return false;
                    }
                });
            }
            
        },
        payWayBoxBtn(payWayNum) {           //选择支付方式
            this.choosePayWayInd = payWayNum;
        },
        payWayClose() {             //支付方式关闭
            this.payBox = false;
            this.payWayBox = false;
        },
        payBtnOk() {                 //确认支付
            if (this.choosePayWayInd == 0) {
                this.loading = true;            //loading
                this.$http({
                    url:WxPayGoods,
                    method:'POST',
                    data:{
                        order_id:this.order_id
                    }
                }).then(res=>{
                    this.loading = false;            //loading
                    if(res.data.status == 1){
                        alert(JSON.parse(res.data.data));
                        let wxMsg = JSON.parse(res.data.data);
                        // wx.chooseWXPay({
                        //     timestamp: wxMsg.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        //     nonceStr: wxMsg.nonceStr, // 支付签名随机串，不长于 32 位
                        //     package: wxMsg.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                        //     signType: wxMsg.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        //     paySign: wxMsg.paySign, // 支付签名
                        //     success: function (res) {
                        //         // 支付成功后的回调函数
                        //         alert(JSON.stringify(res));
                        //     }
                        // });
                    }else{
                        this.delayToastTxt = res.data.msg;
                        this.delayToast = true;
                        setTimeout(() => {
                            this.delayToast = false;
                        }, 1500);
                        return false;
                    }
                });
            } else if (this.choosePayWayInd == 1) {
                let balanceMsg = getCookie('avail_amount');
                if(balanceMsg < 0){
                    this.delayToastTxt = "账户余额不足，请充值";
                    this.delayToast = true;
                    setTimeout(() => {
                        this.delayToast = false;
                    }, 1500);
                    return false;
                }else{
                    this.payWayBox = false;
                    this.msgCodeBox = true;
                }
            } else {
                this.delayToastTxt = "请选择支付方式";
                this.delayToast = true;
                setTimeout(() => {
                    this.delayToast = false;
                }, 1500);
                return false;
            }
            
        },
        msgCodeBtn() {      //钱包余额弹窗关闭
            this.isGiveBoxWrapShow = true;
        },
        sendCode() {        // 钱包支付-获取支付验证码
            this.loading = true;            //loading
            if(this.shopDetailsMsg.consume_type == 2){          //积分支付
                this.MobileType = 9;
            }
            this.$http({
                url:sendMobile,
                method:'POST',
                data:{
                    mobile:getCookie('userInfoTel'),
                    type:this.MobileType
                }
            }).then(res=>{
                console.log(res);
                this.loading = false;            //loading
                if(res.data.status == 1){
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
                }else{
                    this.delayToastTxt = res.data.msg;
                    this.delayToast = true;
                    setTimeout(() => {
                        this.delayToast = false;
                    }, 1500);
                    return false;
                }
            });
        },
        balancePayBtn(){            //余额支付
            this.loading = true;            //loading
            this.$http({
                url:balancePay,
                method:"POST",
                data:{
                    order_id:this.order_id,                 //订单id
                    code:this.codeMsgValue,                                //验证码
                    mobile:getCookie("userInfoTel"),                       //手机号
                }
            }).then((res)=>{
                this.loading = false;            //loading
                if(res.data.status == 1){
                    this.payBox = false;            
                    this.msgCodeBox = false;
                    this.$router.push({path:'/shopOrder'});
                }else{
                    this.delayToastTxt = res.data.msg;
                    this.delayToast = true;
                    setTimeout(() => {
                        this.delayToast = false;
                    }, 1500);
                    return false;
                }
            });
        },
        goodsPriceMsg(){            //商品价格计算
            this.loading = true;            //loading
            this.$http({
                url:goodsPrice,
                method:"POST",
                data:{
                    id:this.$route.query.shopId,            //商品Id
                    number:this.shopNum,                 //购买数量
                    coupon_id:this.coupon_id,                           //优惠券id
                    logistic_type:this.deliveryWay
                }
            }).then((res)=>{
                this.loading = false;            //loading
                if(res.data.status == 1){
                    let goodsPriceMsg = res.data.data;
                    this.totalIntegral = goodsPriceMsg.integral;            //总积分
                    this.totalPrices = goodsPriceMsg.price;                 //总价格
                    if(this.coupon_id == ""){
                        this.couponTitle = goodsPriceMsg.coupon_detail;    //几张优惠券可用
                    }
                }else if(res.data.status == -4){
                    this.delayToastTxt = res.data.msg;
                    this.delayToast = true;
                    setTimeout(() => {
                        this.delayToast = false;
                    }, 1500);
                    return false;
                }else{
                    this.delayToastTxt = res.data.msg;
                    this.delayToast = true;
                    setTimeout(() => {
                        this.delayToast = false;
                    }, 1500);
                    return false;
                }
            })
        },
        goodsAddressSite(addressId){         //获取订单地址
            this.$http({
                url:goodsOrderAddress,
                method:"POST",
                data:{
                    address_id:addressId
                }
            }).then((res)=>{
                if(res.data.status == 1){
                    console.log(res);
                    this.siteAddressMsg = res.data.data;           //订单默认收货地址
                }else{
                    this.delayToastTxt = res.data.msg;
                    this.delayToast = true;
                    setTimeout(() => {
                        this.delayToast = false;
                    }, 1500);
                    return false;
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
    @import "./payOrder.less";
</style>

