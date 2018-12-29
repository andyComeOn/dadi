<template>
    <div class="shoppingDetailPage">
        <!-- 轮播 str -->
        <swiper style="height:310px;" ref="mySwiper">
            <!-- slides -->
            <swiper-slide style="height:310px;" v-for='item in this.bannerArr'>
                <img style="width:100%;height:310px;" :src="item" alt="">
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
        <!-- 轮播 end -->
        <!-- product str -->
        <div class="product">
            <h3><span v-if='this.consume_type == 2 || this.consume_type == 3'>积分</span>{{shopName}}</h3>
            <p>{{shopDesc}}</p>
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
        <div class="distribution freight">
            <span>规格</span>
            <p>{{specs}}</p>
        </div>
        <!-- 规格 end -->
        <!-- shopDetails str -->
        <div class="shopDetails">
            <h3>商品详情</h3>
            <div v-html="goods_detail"></div>
            <!-- <img src="../../../assets/images/shop/banner@1x.png" alt=""> -->
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
        <!-- 配送方式 str -->
        <div class="deliveryList" v-if='shopDetailsBox == true' @click.self="shopDetailsBox = false">
            <ul class="list">
                <li @click="delivery(2)" v-if="this.logistic_type == 2 || this.logistic_type == 3">
                    <img src="../../../assets/images/shop/peisong_mendian.png" alt="">
                    <p>门店自提</p>
                </li>
                <li @click="delivery(1)" v-if="this.logistic_type == 1 || this.logistic_type == 3">
                    <img src="../../../assets/images/shop/peisong_wuliu.png" alt="">
                    <p>物流配送</p>
                </li>
            </ul>
        </div>
        <!-- 配送方式 end -->
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
import { shopDetails,DistributionBanner,goodsPrice } from "../../../api/api.js";
import { setTimeout } from 'timers';
export default {
    name: "shoppIngDetails",
    components: {
        slider
    },
    data() {
        return {
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
        };
    },
    computed: {},
    methods: {
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
                    this.bannerArr = res.data.data.goods_banner;    //商品banner
                    this.shopName = res.data.data.goods_name;       //商品名称
                    this.shopDesc = res.data.data.desc;             //商品描述
                    this.shopPrice = res.data.data.goods_price;     //商品价格
                    this.shopOldPrice = res.data.data.lineation_price; //商品划线价格
                    this.freight_money = res.data.data.freight_money; //运费
                    this.specs = res.data.data.specs;               //规格
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
                        console.log(res);
                        this.$router.push({
                            path: "payOrder",
                            query: {
                                shopId: this.$route.query.shopId,       //商品id
                                payShopNum: this.payShopNum,            //购买数量
                                deliveryWay: this.deliveryWay           //配送方式
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
            } else {
                this.delayToast = true;                     //错误提示打开
                this.delayToastTxt = '请选择配送方式';      //错误提示信息
                setTimeout(()=>{
                    this.delayToast = false;                //错误提示关闭
                    this.shopDetailsBox = true;
                },1500);
            }
        },
        getBannerImg(){
            var mySwiper = new Swiper('.swiper-container', { 
                // notNextTick: true,
                autoplay: 3000,
                grabCursor : true,
                setWrapperSize :true,
                autoHeight: true,
                pagination: '.swiper-pagination',
                paginationType: 'fraction',
                paginationClickable :true,
                mousewheelControl : true,
                debugger: true,
                observer:true,
                observeParents:true,
            });
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
                    console.log(res);
                    return true;
                }else{
                    this.delayToast = true;                     //错误提示打开
                    this.delayToastTxt = res.data.msg;      //错误提示信息
                    setTimeout(()=>{
                        this.delayToast = false;                //错误提示关闭
                    },1500);
                    return false;
                }
            });
        }
    },
    mounted() {
        this.fetchGoodsDetail();        // 调取商品详情方法
        this.getBannerImg();
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
