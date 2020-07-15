<template>
    <div class="shoppingDetailPage">
        <!-- 轮播 str -->
        <swiper :options="swiperIndexOption" ref="mySwiper" id="cardsBox" :style="{height:cardsBoxH + 'px'}">
            <!-- slides -->
            <swiper-slide  v-for='item in this.bannerArr'>
                <img style="width:100%;height:100%;" :src="item" alt="">
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
        <!-- 轮播 end -->
        <!-- product str -->
        <div class="product">
            <h3><span v-if='this.consume_type == 2 || this.consume_type == 3'>积分</span>{{shopName}}</h3>
            <p>{{shopDesc}}</p>
            <p v-if="this.shopMsg.coupon_name" style="color:#E0310D">购买商品赠送"{{shopMsg.coupon_name}}"</p>
            <div class="product_price">
                <span v-if='this.consume_type == 1'><i>￥</i>{{shopPrice}}</span>
                <span v-if='this.consume_type == 2'>{{goods_integral}}积分</span>
                <span v-if='this.consume_type == 3'><i>￥</i>{{shopPrice}}+{{goods_integral}}<i>积分</i></span>
                <span>￥{{shopOldPrice}}</span>
                <span v-if="this.is_member_consume == 1">会员折扣</span>
            </div>
        </div>
        <!-- product end -->
        <!-- 配送方式 str -->
        <div class="distribution" @click="shopDetailsBtn()">
            <span>配送方式</span>
            <p v-if='deliveryWay == 2'>门店自提</p>
            <p v-if='deliveryWay == 1'>物流配送</p>
            <p v-if='deliveryWay == 3'></p>
            <img src="../../../assets/images/arrows/ic-arrow_10_18.png" />
        </div>
        <!-- 配送方式 end -->
        <!-- 运费 str -->
        <div class="distribution freight" v-if="this.deliveryWay == 1">
            <span>运费</span>
            <p>￥{{freight_money}}</p>
        </div>
        <!-- 运费 end -->
        <!-- 规格 str -->
        <div class="distribution freight" @click="specsBtn()">
            <span>规格</span>
            <p>{{specs}}</p>
            <img src="../../../assets/images/arrows/ic-arrow_10_18.png" />
        </div>
        <!-- 规格 end -->
        <!-- shopDetails str -->
        <div class="shopDetails">
            <h3>商品详情</h3>
            <div id="shopDetailsImg" v-html="goods_detail"></div>
        </div>
        <!-- shopDetails end -->
        <!-- buy str -->
        <div class="buyPay">
            <div class="buyPaySetNum">
                <img :src="btnMinus" alt="" @click='minus()'>
                <span>{{payShopNum}}</span>
                <img :src="btnPlus" alt="" @click="plusSign()">
            </div>
            <div v-if="this.up_status != 2" class="buyPayBtn">
                <div v-if="consume_type == 1"  @click="buyPayBtn()">立即购买</div>
                <div v-if="consume_type == 2 || consume_type == 3" @click="buyPayBtn()">立即兑换</div>
            </div>
            <div v-else class="buyPayBtn">
                <div >该商品已下架</div>
            </div>
        </div>
        <!-- buy end -->
        <!-- 遮罩 str -->
        <div class="deliveryList" v-if='shopDetailsBox == true' @click.self="shopDetailsBoxBtn()">
            <!-- 配送方式 str -->
            <ul class="list" v-if="deliveryType == true">
                <li @click="delivery(2)" v-if="this.logistic_type == 2 || this.logistic_type == 3">
                    <img src="../../../assets/images/shop/peisong_mendian.png" alt="">
                    <p>门店自提</p>
                </li>
                <li @click="delivery(1)" v-if="this.logistic_type == 1 || this.logistic_type == 3">
                    <img src="../../../assets/images/shop/peisong_wuliu.png" alt="">
                    <p>物流配送</p>
                </li>
            </ul>
            <!-- 配送方式 end -->
            <!-- 规格 str -->
            <div class="speseBox" v-if="speceType == true">
                <h3>
                    <span>产品规格</span>
                    <!-- <img src="" /> -->
                </h3>
                <div class="shopMsg">
                    <img :src="this.shopMsg.goods_img" />
                    <div class="shopName">
                        <p style="-webkit-box-orient: vertical">{{this.shopMsg.goods_name}}</p>
                        <div class="product_price">
                            <span v-if='this.consume_type == 1'><i>￥</i>{{shopPrice}}</span>
                            <span v-if='this.consume_type == 2'>{{goods_integral}}积分</span>
                            <span v-if='this.consume_type == 3'><i>￥</i>{{shopPrice}}+{{goods_integral}}<i>积分</i></span>
                        </div>
                    </div>
                    <!-- <div class="shopName">{{this.shopMsg.desc}}</div> -->
                </div>
                <div class="shopSpese">
                    <p>产品规格</p>
                    <span :class="{shopSpeseActive:active == item.id}" v-for="(item,index) in this.shopMsg.spesArr" :key='index' @click="speceBtn(item.id,item.specs_name)">{{item.specs_name}}</span>
                </div>
                <!-- <div class="submitBtn" @click="buyPayBtn()">确认</div> -->
            </div>
            <!-- 规格 end -->
        </div>
        <!-- 遮罩 str -->
        
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
    </div>
</template>
<script>
import { slider } from "vue-concise-slider"; // 引入slider组件
import wx from 'weixin-js-sdk';
import { shopDetails,DistributionBanner,goodsPrice,wxShare } from "../../../api/api.js";
export default {
    name: "shoppIngDetails",
    components: {
        slider
    },
    data() {
        return {
            cardsBoxH: "",
            bannerArr:[],               //轮播图数据
            loading: false,              // toast控制开关
            loadingTxt: "数据加载中",    // toast中文案
            delayToast: false,          // tips开关
            delayToastTxt: "",          // tips文案
            shopName: "",               //商品名称
            shopDesc: "",               //商品简介
            shopPrice: "",              //商品价格
            shopOldPrice: "",           //商品划线价格
            freight_money: "",          //运费
            specs: "",                  //规格
            payShopNum: "1",            //购买数量
            max_num: "",                //最大购买量
            btnPlus: require("../../../assets/images/shop/plus_normal@1x.png"), // “加”按钮图片默认的src 
            btnMinus: require("../../../assets/images/shop/jian_disable@1x.png"),  // “减”按钮图片默认的src  
            btnPlusDisable: require("../../../assets/images/shop/plus_disable@1x.png"), // “加”按钮图片disable
            btnPlusNormal: require("../../../assets/images/shop/plus_normal@1x.png"),  // “加”按钮图片normal
            btnMinusDisable: require("../../../assets/images/shop/jian_disable@1x.png"),  // “减”按钮图片disable
            btnMinusNormal: require("../../../assets/images/shop/jian_normal@1x.png") ,  //“减”按钮图片normal
            shopDetailsBox: false,      //配送方式显示隐藏
            deliveryWay: "",             //配送方式
            logistic_type:'',           //配送方式 1邮寄  2自提 3邮寄+自提
            consume_type:'',            //消费方式  1现金  2积分  3现金加积分 
            goods_integral:'',          //积分
            up_status:'',               //是否下架   1上架    2下架
            is_member_consume:"",       //是否享受权益   1是   2否
            goods_detail:"",            //商品详情
            swiperIndexOption: {  
                autoplay: 3000,
                grabCursor : true,
                loop:true,
                setWrapperSize :true,
                autoHeight: true,
                pagination: '.swiper-pagination',
                paginationType: 'fraction',
                paginationClickable :true,
                mousewheelControl : true,
                debugger: true,
                observer:true,
                observeParents:true,
            },
            shopMsg:"",                 //详细信息
            active:"",
            speceType:false,
            deliveryType:false
        };
    },
    created(){
        let shopTitle = decodeURIComponent(this.$route.query.goodsName);
        document.title = shopTitle;
        this.shopName = shopTitle;
    },
    methods: {
        //点击规格
        specsBtn(){
            this.shopDetailsBox = true;
            this.speceType = true;
            this.deliveryType = false;
        },
        //点击遮罩
        shopDetailsBoxBtn(){
            this.shopDetailsBox = false;
            this.speceType = false;
            this.deliveryType = false;
        },
        //点击规格
        speceBtn(id,name){
            this.active = id;
            this.specs = name;
            this.shopDetailsBox = false;
            this.speceType = false;
            this.deliveryType = false;
        },
        //获取微信分享的参数
        getShareData(){
            //获取 微信分享参数
            var dataObj = {
                url: location.href
            };
            this.$http({
                url: wxShare,
                method: "POST",
                data: dataObj
            }).then(res => {
                if(res.data.status == 1){
                    this.appId = res.data.data.appid;
                    this.timestamp = res.data.data.timestamp;
                    this.nonceStr = res.data.data.noncestr;
                    this.signature = res.data.data.signature;
                    this.shareUrl = window.location.href;
                    this.share(this.shopName,this.shopDesc,this.shareUrl, res.data.data.share_img);
                }else{
                    this.delayToast = true;
                    this.delayToastTxt = res.data.msg;
                    setTimeout(()=>{
                        this.delayToast = false;
                    },1500);
                }
            });
        },
        //微信分享
        share(shareName,shareDesc,shareUrl,shareImg) {
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: this.appId, // 必填，公众号的唯一标识
                timestamp: this.timestamp, // 必填，生成签名的时间戳
                nonceStr: this.nonceStr, // 必填，生成签名的随机串
                signature: this.signature, // 必填，签名
                jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表
            });
            //获取“分享给朋友”按钮点击状态及自定义分享内容接口
            wx.onMenuShareAppMessage({
                title: shareName,  // 分享标题
                desc: shareDesc, // 分享描述
                link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: shareImg, // 分享图标
                success: function() {
                }
            });
            //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
            wx.onMenuShareTimeline({
                title: shareName,
                desc: shareDesc,
                link: shareUrl,
                imgUrl: shareImg,
                success: function() {
                }
            });
        },
        //选择配送方式
        shopDetailsBtn(){
            if(this.logistic_type == 1){
                this.delayToast = true;
                this.delayToastTxt = "仅支持物流配送";
                setTimeout(()=>{
                    this.delayToast = false;
                },1500);
            }else if(this.logistic_type == 2){
                this.delayToast = true;
                this.delayToastTxt = "仅支持门店自提";
                setTimeout(()=>{
                    this.delayToast = false;
                },1500);
            }else{
                this.shopDetailsBox = true;
                this.speceType = false;
                this.deliveryType = true;
            }
        },
        fetchGoodsDetail() {                // 拉取商品详情
            this.loading = true;           //loading
            this.$http({
                url: shopDetails,
                method: "POST",
                data: {
                    id: this.$route.query.shopId
                }
            }).then(res => {
                this.loading = false;                               //loading
                if (res.data.status == 1) {
                    this.shopMsg = res.data.data;                   //详细信息
                    this.bannerArr = res.data.data.goods_banner;    //商品banner
                    this.shopDesc = res.data.data.desc;             //商品描述
                    this.shopPrice = res.data.data.goods_price;     //商品价格
                    this.shopOldPrice = res.data.data.lineation_price; //商品划线价格
                    this.freight_money = res.data.data.freight_money; //运费
                    this.max_num = res.data.data.max_num;           //最大购买量
                    this.logistic_type = res.data.data.logistic_type;           //配送方式 1邮寄  2自提 3邮寄+自提
                    this.deliveryWay = res.data.data.logistic_type;
                    this.consume_type = res.data.data.consume_type;             //消费方式
                    this.up_status = res.data.data.up_status;                   //是否上架  1上架   2下架
                    this.goods_integral = res.data.data.goods_integral;         //积分
                    this.is_member_consume = res.data.data.is_member_consume;   //是否享受权益
                    this.goods_detail = res.data.data.goods_detail;             //商品详情
                    if(this.up_status == 2){
                        this.delayToastTxt = "该商品已下架";
                        this.delayToast = true;
                        setTimeout(()=>{
                            this.delayToast = false;
                        },1500);
                    }
                    this.getShareData();                            //获取微信分享参数
                } else {
                    this.delayToastTxt = res.data.msg;
                    this.delayToast = true;
                    setTimeout(()=>{
                        this.delayToast = false;
                    },1500);
                }
            });
        },
        minus() {
            if (this.payShopNum == 1) {
                this.btnMinus = this.btnMinusDisable;
                this.delayToastTxt = "已经是最小购买量了";
                this.delayToast = true;
                setTimeout(() => {
                    this.delayToast = false;
                }, 1500);
                return false;
            } else {
                this.btnMinus = this.btnMinusNormal;
                this.btnPlus = this.btnPlusNormal;
                this.payShopNum--;
            }
        },
        plusSign() {
            if (this.payShopNum == this.max_num) {
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
                this.payShopNum++;
            }
        },
        // 配送方式选择
        delivery(type) {
            this.deliveryWay = type;
            this.shopDetailsBox = false;
        },
        buyPayBtn() {               // 立即购买
            if (this.deliveryWay == 1 || this.deliveryWay ==2) {
                if(this.active){
                    this.loading = true;                //loading
                    this.$http({
                        url:goodsPrice,
                        method:"POST",
                        data:{
                            id:this.$route.query.shopId,            //商品Id
                            number:this.payShopNum,                 //购买数量
                            coupon_id:'',                           //优惠券id
                            spec_id:this.active
                        }
                    }).then((res)=>{
                        this.loading = false;                //loading
                        if(res.data.status == 1){
                            this.$router.push({
                                path: "payOrder",
                                query: {
                                    shopId: this.$route.query.shopId,       //商品id
                                    payShopNum: this.payShopNum,            //购买数量
                                    deliveryWay: this.deliveryWay,          //配送方式
                                    spec_id:this.active
                                }
                            });
                        }else{
                            this.delayToast = true;                     //错误提示打开
                            this.delayToastTxt = res.data.msg;      //错误提示信息
                            setTimeout(()=>{
                                this.delayToast = false;                //错误提示关闭
                            },1500);
                            return false;
                        }
                    });
                }else{
                    this.delayToast = true;                     //错误提示打开
                    this.delayToastTxt = "请选择规格";      //错误提示信息
                    setTimeout(()=>{
                        this.delayToast = false;                //错误提示关闭
                        this.shopDetailsBox = true;
                        this.speceType = true;
                        this.deliveryType = false;
                    },1500);
                    return false;
                }
            } else {
                this.delayToast = true;                     //错误提示打开
                this.delayToastTxt = '请选择配送方式';      //错误提示信息
                setTimeout(()=>{
                    this.delayToast = false;                //错误提示关闭
                    this.shopDetailsBox = true;
                    this.speceType = false;
                    this.deliveryType = true;
                },1500);
            }
        },
        goodsPriceMsg(){            //商品价格计算
            this.loading = true;                //loading
            this.$http({
                url:goodsPrice,
                method:"POST",
                data:{
                    id:this.$route.query.shopId,            //商品Id
                    number:this.payShopNum,                 //购买数量
                    coupon_id:'',                           //优惠券id
                }
            }).then((res)=>{
                this.loading = false;                //loading
                if(res.data.status == 1){

                }else{
                    this.delayToast = true;                     //错误提示打开
                    this.delayToastTxt = res.data.msg;      //错误提示信息
                    setTimeout(()=>{
                        this.delayToast = false;                //错误提示关闭
                    },1500);
                }
            });
        }
    },
    mounted() {
        this.fetchGoodsDetail();        // 调取商品详情方法
        this.$nextTick(() => {
            let cardsBox = document.querySelector("#cardsBox");
            let cardsBoxH = cardsBox.clientWidth;
            this.cardsBoxH = cardsBoxH;
        });
    }
};
</script>
<style lang='less' scoped>
    @import "shoppingDetails.less";
</style>
<style lang="less" scoped>
    .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
        width:34px;
        height:19px;
        background:rgba(0,0,0,0.2);
        border-radius: 9.5px;
        float:right;
        right:0;
        margin-left:80%;
        font-size:12px;
        color:#fff;
    }
</style>
<style lang="less">
    #shopDetailsImg{
        p{
            img{
                width: 100% !important;
            }
        }
    }
</style>

