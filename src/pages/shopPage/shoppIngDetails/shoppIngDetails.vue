<template>
    <div>
        <!-- <div style="width:70%;margin:20px auto;height:400px"> -->
            <!-- 配置slider组件 -->
            <slider ref="slider" :options="options" @slide='slide'>
                <!-- 直接使用slideritem slot -->
                <slideritem v-for="(item,index) in someList" :key="index" :style="item.style">{{item.html}}</slideritem>
                <!-- 设置loading,可自定义 -->
                <div slot="loading">loading...</div>
            </slider>
        <!-- </div> -->
        <!-- 轮播 str -->
        <!-- <div class="rollImg">
            <img src="../../../assets/images/shop/2@1x.png" alt="">
        </div> -->
        <!-- 轮播 end -->
        <!-- product str -->
        <div class="product">
            <h3>飞利浦（PHILIPS）男士电动剃须刀多飞利浦（PHILIPS）男士电动剃须刀多飞利浦（PHILIPS）男士电动剃须刀多飞利浦（PHILIPS）男士电动剃须刀多</h3>
            <p>精美礼盒装，多功能畅销款。狂欢价999元，活动库存有限手</p>
            <div class="product_price">
                <span><i>￥</i>400.00</span>
                <span>￥300.00</span>
                <span>会员折扣</span>
            </div>
        </div>
        <!-- product end -->
        <!-- 配送方式 str -->
        <div class="distribution">
            <router-link :to='{path:"deliveryWay"}'>
                <span>配送方式</span>
                <input type="text" value="" placeholder="请选择配送方式..." disabled />
                <img src="../../../assets/images/arrows/ic-arrow_10_18.png" />
            </router-link>
        </div>
        <!-- 配送方式 end -->
        <!-- 运费 str -->
        <div class="distribution freight">
            <span>运费</span>
            <input type="text" value="" placeholder="￥0.00" />
        </div>
        <!-- 运费 end -->
        <!-- buy str -->
        <div class="buyPay">
            <span>-</span>
            <input type="text" value='1' placeholder="" disabled />
            <span>+</span>
            <router-link :to='{path:"payOrder"}'>
                <div class="buyPayBtn">立即购买</div>
            </router-link>
        </div>
        <!-- buy end -->
        <!-- shopDetails str -->
        <div class="shopDetails">
            <h3>商品详情</h3>
            <img src="../../../assets/images/shop/banner@1x.png" alt="">
        </div>
        <!-- shopDetails end -->
    </div>
</template>
<script>
    import { slider, slideritem } from 'vue-concise-slider';// 引入slider组件
    // import wx from "weixin-js-sdk";
    // import { showQsCode, login_test, wxShare } from "../../api/api.js";
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
                someList:[],
                //Sliding configuration [obj]
                options: {
                    currentPage: 0,
                    thresholdDistance:500,
                    thresholdTime:100,
                    // autoplay:1000,
                    loop:true,
                    // direction:'vertical',
                    loopedSlides:1,
                    slidesToScroll:1,
                    timingFunction: 'ease',
                    // speed: 300
                }
            };
        },
        computed: {
            
        },
        mounted() {
            let that = this;
            setTimeout(function () {
                that.someList = [{
                    html: '图片是线上的才可以哦',
                    style: {
                        'background': '#aaa'
                    }
                },{
                    html: 'slide2',
                    style: {
                    'background': '#4bbfc3'
                    }
                },{
                    html: 'slide3',
                    style: {
                    'background': '#7baabe'
                    }
                }]
            }, 0)
        },
        methods: {
            slide (data) {
                console.log(data)
            },
        }
    };
</script>
<style lang='less' scoped>
    @import 'shoppingDetails.less';
</style>
