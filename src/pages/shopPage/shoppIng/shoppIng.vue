<template>
    <div style="margin-bottom:65px;">
        <div class="shoppIng">
            <!-- 轮播 str -->
            <div class="goodsBanner">
                <swiper style="height:240px;":options="swiperIndexOption" ref="mySwiper">
                    <!-- slides -->
                    <swiper-slide style="height:240px;" v-for='(item,index) in this.bannerArr' :key="index">
                        <a v-if="item.url != ''" :href="item.url">
                            <img style="height:240px;" :src="item.img" />
                        </a>
                        <img v-else :src="item.img" />
                    </swiper-slide>
                    <!-- Optional controls -->
                    <div class="swiper-pagination"  slot="pagination"></div>
                </swiper>
            </div>
            <!-- 轮播 end -->
            <!-- nav str -->
            <div style="padding:0px 15px;position:absolute;top:205px;left:0;width:100%;z-index:999;">
                <ul class="navLists clearfix">
                    <li v-for="(item,index) in shopTypeArr" :key="index">
                        <router-link :to='{path:"shopTypeLists",query:{shopType:item.id,shopTitle:encodeURIComponent(item.category_name)}}'>
                            <dl>
                                <dt v-if="item.category_img != ''" style="background:#fff;">
                                    <img :src="item.category_img" alt="">
                                </dt>
                                <dt v-else></dt>
                                <dd>{{item.category_name}}</dd>
                            </dl>
                        </router-link>
                    </li>
                </ul>
            </div>
            <!-- nav end -->
        </div>
        <!-- 分类列表 str -->
        <div class="brand">
            <!-- <div v-if="this.location1.status != 0" @click="getCoupon">
                <img class="active" :src="this.location1.img" />
            </div> -->
            <div v-if="this.location1.status != 0">
                <template v-if="this.location1.url == ''">
                    <img class="active" :src="this.location1.img" />
                </template>
                <template v-else>
                    <a :href="this.location1.url">
                        <img class="active" :src="this.location1.img" />
                    </a>
                </template>
            </div>
            <div v-for="(item,index) in goodsInfoArr" :key="index">
                <router-link v-if="item.goods.length != ''" :to='{path:"shopTypeLists",query:{shopType:item.id,shopTitle:encodeURIComponent(item.category_name)}}'>
                    <img class="brand_title" :src="item.title_img" />
                </router-link>
                <ul class="brandLists" v-if="item.goods.length != ''">
                    <li v-for="(goodsItem, goodsIndex) in item.goods" :key="goodsIndex">
                        <dl @click="hrefShopDetail(goodsItem.id,goodsItem.stock,goodsItem.goods_name)">
                            <dt class="cardsBox1" :style="{height:cardsBoxH + 'px'}">
                                <img  style="width:100%;height:100%;" :src="goodsItem.goods_img" />
                                <img class="cardsBox1_bz" v-if="goodsItem.stock == 0" src="../../../assets/images/yishouqin.png" alt="">
                            </dt>
                            <dd>
                                <p>
                                    <span class="marking_give" v-if='goodsItem.is_send_coupon ==1'>赠</span>
                                    <span class="marking_integral" v-if='goodsItem.consume_type == 2 || goodsItem.consume_type == 3'>积分</span>
                                    {{goodsItem.goods_name}}
                                </p>
                                <h2 v-if='goodsItem.consume_type == 1'><span>&yen;</span>{{goodsItem.goods_price}}</h2>
                                <h2 v-if='goodsItem.consume_type == 2'>{{goodsItem.goods_integral}}<span>积分</span></h2>
                                <h2 v-if='goodsItem.consume_type == 3'><span>&yen;</span>{{goodsItem.goods_price}}+{{goodsItem.goods_integral}}<i>积分</i></h2>
                            </dd>
                        </dl>
                    </li>
                </ul>
            </div>
            <div v-if="this.location2.status != 0">
                <template v-if="this.location2.url == ''">
                    <img class="brand_footer" :src="this.location2.img" />
                </template>
                <template v-else>
                    <a :href="this.location2.url">
                        <img class="brand_footer" :src="this.location2.img" />
                    </a>
                </template>
            </div>
            <!-- <div class="noShopLists">
                <img src="../../../assets/images/shop/dingdan_404.png" />
                <p>暂无商品</p>
            </div> -->
        </div>
        <!-- 分类列表 end -->
        <!-- 客服 str -->
        <div class="service">
            <h3>
                <span>都市里的世外桃源</span>
            </h3>
            <dl>
                <dt>{{this.setting.title}}</dt>
                <dd>
                    <img :src="this.setting.title_img" />
                </dd>
            </dl>
            <p>{{this.setting.time}}</p>
            <a :href="'tel:' + this.setting.tel">{{this.setting.tel}}</a>
        </div>
        <!-- 客服 end -->
        <!-- footer str -->
        <ul class="footer">
            <li>
                <dl>
                    <dt><img src="../../../assets/images/shop/table_shangpin_selected@1x.png" alt=""></dt>
                    <dd>全部商品</dd>
                </dl>
            </li>
            <li>
                <router-link to="Mine">
                    <dl>
                        <dt><img src="../../../assets/images/shop/table_order_normal@1x.png" alt=""></dt>
                        <dd>我的</dd>
                    </dl>
                </router-link>
            </li>
        </ul>
        <!-- footer end -->
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
        <!-- 活动页弹屏 -->
        <div class="play_screen_box" v-show="playScreenBox == true">
            <div class="play_screen">
                <img class="play_screen_x" @click="playScreenBox = false" src="../../../assets/images/active/text_close.png" />
                <img class="play_screen_bg" @click="playScreenBtn()" src="../../../assets/images/play_screen.png" />
            </div>
            
        </div>
    </div>
</template>
<script>
    import wx from 'weixin-js-sdk';
    import { shopIndexPage,getCoupon,wxShare } from "../../../api/api.js";
    import { Dialog } from 'vant';
    export default {
        name: "shoppIng",
        data() {
            return {
                cardsBoxH:"",
                shopListsArr: [],           //商品列表数据    
                shopTypeArr: [],            //商品分类
                goodsInfoArr:[],
                bannerArr:[],               //轮播图数据
                loading: false,              // toast控制开关
                loadingTxt: "数据加载中",    // toast中文案
                delayToast: false,          // tips开关
                delayToastTxt: "",          // tips文案
                noShopLists:false,          //
                setting:"",              //售后服务
                coupon_status:"",           //1已领取，2未领取
                location1:"",
                location2:"",   
                swiperIndexOption: {  
                    notNextTick: true,
                    autoplay: 2000,
                    loop:true,
                    grabCursor : true,
                    setWrapperSize :true,
                    autoHeight: true,
                    pagination : '.swiper-pagination',
                    paginationClickable :true,
                    mousewheelControl : true,
                    debugger: true,
                    observer:true,
                    observeParents:true,
                },
                shareData:"",                   //微信分享参数
                playScreenBox:false,            //大转盘开关
            };
        },
        methods: {
            //获取微信分享的参数
            getShareData(){
                this.$http({
                    url: wxShare,
                    method: "POST",
                    data: {
                        url: location.href
                    }
                }).then(res => {
                    if(res.data.status == 1){
                        this.shareData = res.data.data;
                        this.hideMenuItems();
                    }else{
                        this.delayToast = true;
                        this.delayToastTxt = res.data.msg;
                        setTimeout(()=>{
                            this.delayToast = false;
                        },1500);
                    }
                });
            },
            //
            hideMenuItems(){
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: this.shareData.appid, // 必填，公众号的唯一标识
                    timestamp: this.shareData.timestamp, // 必填，生成签名的时间戳
                    nonceStr: this.shareData.noncestr, // 必填，生成签名的随机串
                    signature: this.shareData.signature, // 必填，签名
                    jsApiList: ["hideMenuItems"] // 必填，需要使用的JS接口列表
                });
                wx.ready(function(){
                    wx.hideMenuItems({
                        menuList: [
                            "menuItem:share:timeline", 
                            "menuItem:copyUrl", 
                            "menuItem:share:appMessage", 
                            "menuItem:share:qq", 
                            "menuItem:share:weiboApp", 
                            "menuItem:favorite", 
                            "menuItem:share:facebook", 
                            "menuItem:share:QZone", 
                            "menuItem:editTag", 
                            "menuItem:delete", 
                            "menuItem:copyUrl", 
                            "menuItem:originPage", 
                            "menuItem:readMode", 
                            "menuItem:openWithQQBrowser", 
                            "menuItem:openWithSafari", 
                            "menuItem:share:email", 
                            "menuItem:share:brand"] 
                    });
                });
            },
            getShopIndexPage(){        //获取首页内容
                this.loading = true;            //loading
                this.$http({
                    url:shopIndexPage,
                    method:"POST"
                }).then((res)=>{
                    this.loading = false;            //loading
                    if(res.data.status == 1){
                        this.shopTypeArr = res.data.data.categoryList;          //商品分类数据
                        this.goodsInfoArr = res.data.data.goodsInfo;            //商品分类（title+shop）
                        this.location1 = res.data.data.location1;
                        this.location2 = res.data.data.location2;
                        this.bannerArr = res.data.data.img;                     //轮播图片信息
                        this.setting = res.data.data.setting;                   //售后服务
                        this.coupon_status = res.data.data.coupon_status;       //是否领取优惠券  1已领取  2未领取
                        // this.getShareData();        //获取微信分享
                        if(res.data.data.prize_flag == 0){                      //大转盘开关prize_flag 0未参与   1已参与  
                            this.playScreenBox = true;
                        }
                    }else{
                        this.delayToast = true;
                        this.delayToastTxt = res.data.msg;
                        setTimeout(()=>{
                            this.delayToast = false;  
                        },1500);
                    }
                });
            },
            hrefShopDetail(shopId,stockNum,goodsName){
                if(stockNum != 0){
                    this.$router.push({path:'shoppIngDetails',query:{shopId:shopId,goodsName:encodeURIComponent(goodsName)}});
                }else{
                    this.delayToast = true;
                    this.delayToastTxt = '该商品已售罄';
                    setTimeout(()=>{
                        this.delayToast = false;  
                    },1500);
                }
            },
            //领取优惠券
            getCoupon(){
                if(this.coupon_status == 2){
                    this.loading = true;            //loading
                    this.$http({
                        url:getCoupon,
                        method:"POST",
                        data:{
                            coupon_type_id:20,
                            number:1
                        }
                    }).then((res)=>{
                        this.loading = false;            //loading
                        if(res.data.status == 1){
                            this.delayToast = true;
                            this.delayToastTxt = "领取成功，请到“我的优惠券”查看";
                            setTimeout(()=>{
                                this.delayToast = false;
                            },1500);
                        }else{
                            this.delayToast = true;
                            this.delayToastTxt = res.data.msg;
                            setTimeout(()=>{
                                this.delayToast = false;
                            },1500);
                        }
                    });
                }else{
                    this.delayToast = true;
                    this.delayToastTxt = "您已领过此优惠券，请到“我的优惠券”查看";
                    setTimeout(()=>{
                        this.delayToast = false;
                    },1500);
                }
            },
            playScreenBtn(){
                this.$router.push({path:'/big_dial'});
            }
        },
        mounted() {
            this.getShopIndexPage();
            Dialog.close();
        },
    };
</script>
<style lang="less" scoped>
    @import "./shopping.less";
</style>
<style lang="less">
    .goodsBanner .swiper-container .swiper-pagination .swiper-pagination-bullet{
        width: 5px!important;
        height: 5px!important;
        border-radius: 100%!important;
        background: rgba(225,225,225,0.7)!important;
    }
    .goodsBanner .swiper-container .swiper-pagination .swiper-pagination-bullet-active{
        width: 12px!important;
        height: 5px!important;
        background: #fff!important;
        border-radius: 2px!important;
    }
    .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
        bottom:40px;
    }
</style>
 