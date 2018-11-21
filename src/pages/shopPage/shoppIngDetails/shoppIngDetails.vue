<template>
    <div class="shoppingDetailPage">
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
        <!-- 轮播 str -->
        <slider ref="slider" :options="options" @slide='slide'>
            <!-- 直接使用slideritem slot -->
            <slideritem v-for="(item,index) in someList" :key="index" :style="item.style">{{item.html}}</slideritem>
            <!-- 设置loading,可自定义 -->
            <div slot="loading">loading...</div>
        </slider>
        <!-- 轮播 end -->
        <!-- product str -->
        <div class="product">
            <h3>{{shopName}}</h3>
            <p>{{shopDesc}}</p>
            <div class="product_price">
                <span><i>￥</i>{{shopPrice}}</span>
                <span>￥{{shopOldPrice}}</span>
                <span>会员折扣</span>
            </div>
        </div>
        <!-- product end -->
        <!-- 配送方式 str -->
        <div class="distribution" @click="shopDetailsBox = true">
            <span>配送方式</span>
            <p v-if='deliveryWay == 1'>门店自提</p>
            <p v-if='deliveryWay == 2'>物流配送</p>
            <img src="../../../assets/images/arrows/ic-arrow_10_18.png" />
        </div>
        <!-- 配送方式 end -->
        <!-- 运费 str -->
        <div class="distribution freight">
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
            <img src="../../../assets/images/shop/banner@1x.png" alt="">
        </div>
        <!-- shopDetails end -->
        <!-- buy str -->
        <div class="buyPay">
            <div class="buyPaySetNum">
                <img :src="btnMinus" alt="" @click='minus()'>
                <input type="text" v-model="payShopNum" value='' placeholder="" disabled />
                <img :src="btnPlus" alt="" @click="plusSign()">
            </div>
            <div class="buyPayBtn" @click="buyPayBtn()">立即购买</div>
        </div>
        <!-- buy end -->
        <!-- 配送方式 str -->
        <div class="deliveryList" v-if='shopDetailsBox == true' @click.self="shopDetailsBox = false">
            <ul class="list">
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
</template>
<script>
import { slider, slideritem } from "vue-concise-slider"; // 引入slider组件
// import wx from "weixin-js-sdk";
import { shopDetails } from "../../../api/api.js";
// import { getCookie } from "@/utils/util";
export default {
    name: "shoppIngDetails",
    components: {
        slider,
        slideritem
    },
    data() {
        return {
            //Image list
            someList: [],
            //Sliding configuration [obj]
            options: {
                currentPage: 0,
                thresholdDistance: 500,
                thresholdTime: 100,
                // autoplay:1000,
                loop: true,
                // direction:'vertical',
                loopedSlides: 1,
                slidesToScroll: 1,
                timingFunction: "ease"
                // speed: 300
            },
            loading: true,   // toast控制开关
            loadingTxt: "数据加载中",  // toast中文案
            delayToast: false,  // tips开关
            delayToastTxt: "",  // tips文案
            shopName: "", //商品名称
            shopDesc: "", //商品简介
            shopPrice: "", //商品价格
            shopOldPrice: "", //商品划线价格
            freight_money: "", //运费
            specs: "", //规格
            payShopNum: "1", //购买数量
            max_num: "", //最大购买量
            btnPlus: require("../../../assets/images/shop/plus_normal@1x.png"), // “加”按钮图片默认的src 
            btnMinus: require("../../../assets/images/shop/jian_disable@1x.png"),  // “减”按钮图片默认的src  
            btnPlusDisable: require("../../../assets/images/shop/plus_disable@1x.png"), // “加”按钮图片disable
            btnPlusNormal: require("../../../assets/images/shop/plus_normal@1x.png"),  // “加”按钮图片normal
            btnMinusDisable: require("../../../assets/images/shop/jian_disable@1x.png"),  // “减”按钮图片disable
            btnMinusNormal: require("../../../assets/images/shop/jian_normal@1x.png") ,  //“减”按钮图片normal
            shopDetailsBox: false, //配送方式显示隐藏
            deliveryWay: 1 //配送方式
        };
    },
    computed: {},
    mounted() {
        let that = this;
        setTimeout(function() {
            that.someList = [
                {
                    html: "图片是线上的才可以哦",
                    style: {
                        background: "#aaa"
                    }
                },
                {
                    html: "slide2",
                    style: {
                        background: "#4bbfc3"
                    }
                },
                {
                    html: "slide3",
                    style: {
                        background: "#7baabe"
                    }
                }
            ];
        }, 0);
        // 调取商品详情方法
        this.fetchGoodsDetail();
    },
    methods: {
        slide(data) {
            // console.log(data)
        },
        // 拉取商品详情
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
                    this.shopDesc = res.data.data.desc; //商品描述
                    this.shopPrice = res.data.data.goods_price; //商品价格
                    this.shopOldPrice = res.data.data.lineation_price; //商品划线价格
                    this.freight_money = res.data.data.freight_money; //运费
                    this.specs = res.data.data.specs; //规格
                    this.max_num = res.data.data.max_num; //最大购买量
                } else {
                    this.loadingTxt = "数据异常";
                    this.loading = true;
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
        // 立即购买
        buyPayBtn() {
            if (this.deliveryWay) {
                this.$router.push({
                    path: "payOrder",
                    query: {
                        shopId: this.$route.query.shopId,
                        payShopNum: this.payShopNum,
                        deliveryWay: this.deliveryWay
                    }
                });
            } else {
                alert("请选择配送方式！");
            }
        }
    }
};
</script>
<style lang='less' scoped>
@import "shoppingDetails.less";
</style>
