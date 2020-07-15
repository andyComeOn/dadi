<template>
    <div>
        <!-- 品牌制造商直供 str -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list v-model="isLoading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
                <div class="title_img_box" v-if="this.noShopLists == false">
                    <img class="title_img" :src="this.title_img" />
                </div>
                <ul class="brandLists" v-if="this.noShopLists == false">
                    <li v-for="(item,index) in shopTypeListsArr" :key="index">
                        <!-- <router-link :to='{path:"shoppIngDetails",query:{shopId:item.id}}'> -->
                        <dl @click="hrefShopDetail(item.id,item.stock,item.goods_name)">
                            <dt class="cardsBox" :style="{height:cardsBoxH + 'px'}">
                                <img style="width:100%;height:100%;" :src="item.goods_img" alt="">
                                <img class="cardsBox_bz" v-if="item.stock == 0" src="../../../assets/images/yishouqin.png" alt="">
                            </dt>
                            <dd>
                                <p>
                                    <span class="marking_give" v-if='item.is_send_coupon ==1'>赠</span>
                                    <span class="marking_integral" v-if='item.consume_type == 2 || item.consume_type == 3'>积分</span>
                                    {{item.goods_name}}
                                </p>
                                <h2 v-if="item.consume_type == 1"><span>￥</span>{{item.goods_price}}</h2>
                                <h2 v-if="item.consume_type == 2">{{item.goods_integral}}<span>积分</span></h2>
                                <h2 v-if="item.consume_type == 3"><span>￥</span>{{item.goods_price}}+{{item.goods_integral}}<span>积分</span></h2>
                            </dd>
                        </dl>
                    </li>
                </ul>
                <div class="noShopLists" v-show="noShopLists">
                    <img src="../../../assets/images/shop/dingdan_404.png" alt="">
                    <p>暂无商品</p>
                </div>
            </van-list>
        </van-pull-refresh>
        <!-- 品牌制造商直供 end -->
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
    import wx from 'weixin-js-sdk';
    import { shopTypeLists,wxShare } from "../../../api/api.js";
    export default {
        name: "shoppIng",
        components: {},
        data() {
            return {
                cardsBoxH:"",
                shopTypeListsArr:[],
                title_img:"",
                loading:false,
                loadingTxt:"加载中...",
                delayToast:false,
                delayToastTxt:"",
                pageIndex:0,                    //当前页
                noShopLists:false,
                isLoading:false,
                finished: false,
                shareData:"",                   //微信数据
                shareName:"",                   //标题
                shareDesc:""                    //分享描述
            };
        },
        created(){
            let shopTitle = decodeURIComponent(this.$route.query.shopTitle);
            document.title = shopTitle;
            this.shareName = shopTitle;
        },
        methods: {
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
                        this.shareData = res.data.data;
                        var shareUrl = window.location.href;
                        var shareName = this.shareName;
                        var shareDesc = this.shareDesc;
                        var shareImg = res.data.data.share_img;
                        this.share(shareName,shareDesc,shareUrl,shareImg);
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
                    appId: this.shareData.appid, // 必填，公众号的唯一标识
                    timestamp: this.shareData.timestamp, // 必填，生成签名的时间戳
                    nonceStr: this.shareData.noncestr, // 必填，生成签名的随机串
                    signature: this.shareData.signature, // 必填，签名
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
                    success: function() {}
                });
            },
            onRefresh() {           //刷新时清空列表
                this.shopTypeListsArr.length = 0;
                this.pageIndex = 1;
                this.goodsLists(this.pageIndex);
            },
            onLoad () {                    //加载
                this.pageIndex++;
                this.goodsLists(this.pageIndex);
            },
            goodsLists(pageIndex){                          //商品分类列表
                this.loading = true;                        //打开loading
                this.$http({
                    url: shopTypeLists,
                    method: "POST",
                    data: {
                        category_id: this.$route.query.shopType,
                        page:pageIndex,
                        pagesize:10
                    }
                }).then(res => {
                    this.loading = false;                               //关闭loading
                    if (res.data.status == 1) {
                        this.shareDesc = res.data.data.share_desc;      //分享描述
                        if(res.data.data.goodsInfo.length > 0){
                            this.noShopLists = false;
                            for(let i in res.data.data.goodsInfo){
                                this.shopTypeListsArr.push(res.data.data.goodsInfo[i]);
                            }
                            this.title_img = res.data.data.title_img;
                            this.isLoading = false;
                        }else if(res.data.data.goodsInfo.length == 0 && this.pageIndex == 1){
                            this.noShopLists = true;
                            this.$nextTick(() => {
                                // 由卡片的宽度-->给卡片的高赋值
                                let cardsBox = document.querySelector(".cardsBox");
                                let cardsBoxH = cardsBox.clientWidth;
                                this.cardsBoxH = cardsBoxH;
                            });
                            this.isLoading = false;
                            this.finished = true;
                        }else{
                            this.delayToast = true;
                            this.delayToastTxt = res.data.msg;
                            setTimeout(() => {
                                this.delayToast = false;
                            }, 1500);
                            this.isLoading = false;
                            this.finished = true;
                            return false;
                        }
                    } else {
                        this.delayToast = true;
                        this.delayToastTxt = res.data.msg;
                        setTimeout(() => {
                            this.delayToast = false;
                        }, 1500);
                        this.finished = true;
                        return false;
                    }
                    this.getShareData();                //获取微信分享数据
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
            }
        }
    };
</script>
<style lang="less" scoped>
    @import "./shopping.less";
</style>
<style lang="less" scoped>
    .brandLists{
        padding:8px 8px;
    }
    .noShopLists{
        text-align:center;
        margin-top:150px;
        img{
            display:inline-block;
            width:110px;
            height:65px;
        }
        p{
            font-size:14px;
            color:#666;
            margin-top:15px;
        }
    }
</style>
 