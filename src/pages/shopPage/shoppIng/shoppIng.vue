<template>
    <div>
        <scroller :on-refresh="refresh" :on-infinite="infinite">
            <div class="shoppIng">
                <!-- 轮播 str -->
                <div class="goodsBanner">
                    <swiper style="height:180px;" ref="mySwiper">
                        <!-- slides -->
                        <swiper-slide style="height:180px;" v-for='(item,index) in this.bannerArr' :key="index">
                            <a :href="item.url">
                                <img :src="item.img" alt="">
                            </a>
                        </swiper-slide>
                        <!-- Optional controls -->
                        <div class="swiper-pagination"  slot="pagination"></div>
                    </swiper>
                </div>
                <!-- 轮播 end -->
                <!-- nav str -->
                <ul class="navLists clearfix">
                    <li v-for="(item,index) in shopTypeArr" :key="index">
                        <router-link :to='{path:"shopTypeLists",query:{shopType:item.id,shopTitle:encodeURIComponent(item.category_name)}}'>
                            <dl>
                                <dt>
                                    <img :src="item.category_img" alt="">
                                </dt>
                                <dd>{{item.category_name}}</dd>
                            </dl>
                        </router-link>
                    </li>
                </ul>
                <!-- nav end -->
            </div>
            <!-- 品牌制造商直供 str -->
            <div class="brand">
                <h3><span>品牌制造商直供</span></h3>
                <ul class="brandLists" v-if="this.noShopLists == false">
                    <li v-for="(item, index) in shopListsArr" :key="index">
                        <dl @click="hrefShopDetail(item.id,item.stock)">
                            <dt id="cardsBox1" :style="{height:cardsBoxH + 'px'}">
                                <img  style="width:100%;height:100%;" :src="item.goods_img" alt="">
                                <img class="cardsBox1_bz" v-if="item.stock == 0" src="../../../assets/images/yishouqin.png" alt="">
                            </dt>
                            <dd>
                                <p class=""><span v-if='item.consume_type == 2 || item.consume_type == 3'>积分</span>{{item.goods_name}}</p>
                                <h2 v-if='item.consume_type == 1'><span>￥</span>{{item.goods_price}}</h2>
                                <h2 v-if='item.consume_type == 2'>{{item.goods_integral}}<span>积分</span></h2>
                                <h2 v-if='item.consume_type == 3'><span>￥</span>{{item.goods_price}}+{{item.goods_integral}}<i>积分</i></h2>
                            </dd>
                        </dl>
                    </li>
                </ul>
                <div class="noShopLists" v-show="noShopLists">
                    <img src="../../../assets/images/shop/dingdan_404.png" alt="">
                    <p>暂无商品</p>
                </div>
            </div>
            <!-- 品牌制造商直供 end -->
        </scroller>
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
    </div>
</template>
<script>
    import { shopIndexPage } from "../../../api/api.js";
    export default {
        name: "shoppIng",
        components: {

        },
        data() {
            return {
                cardsBoxH:"",
                shopListsArr: [],           //商品列表数据    
                shopTypeArr: [],            //商品分类
                bannerArr:[],               //轮播图数据
                loading: false,              // toast控制开关
                loadingTxt: "数据加载中",    // toast中文案
                delayToast: false,          // tips开关
                delayToastTxt: "",          // tips文案
                pageIndex:0,                //当前页
                mySwiper:"",                //
                noShopLists:false,
            };
        },
        methods: {
            refresh (done) {                     //刷新是商品列表清空
                this.shopListsArr.length = 0;
                this.pageIndex = 1;
                // setTimeout(() => {
                    this.getShopIndexPage(this.pageIndex);
                    done();
                // }, 500);
            },
            infinite (done) {                    //加载
                this.loading = true;            //loading
                this.pageIndex++;
                // setTimeout(() => {
                    this.getShopIndexPage(this.pageIndex);
                    done(true);
                // }, 500);
            },
            getShopIndexPage(pageIndex){        //获取首页内容
                this.loading = true;            //loading
                this.$http({
                    url:shopIndexPage,
                    method:"POST",
                    data:{
                        type_id:6,          //		轮播图广告位ID		
                        banner_sum:5,       //		轮播图数量		
                        page:pageIndex,             //当前页	
                        pagesize:10,        //		每页数量
                    }
                }).then((res)=>{
                    this.loading = false;            //loading
                    if(res.data.status == 1){
                        this.shopTypeArr = res.data.data.categoryList;          //商品分类数据
                        if(res.data.data.goodsInfo.length != 0){
                            this.noShopLists = false;
                            for(let i in res.data.data.goodsInfo){
                                this.shopListsArr.push(res.data.data.goodsInfo[i]);     //商品列表
                            }
                        }else if(res.data.data.goodsInfo.length == 0 && this.pageIndex == 1){
                            this.noShopLists = true;
                            this.$nextTick(() => {
                                // 由卡片的宽度-->给卡片的高赋值
                                let cardsBox = document.querySelector("#cardsBox1");
                                let cardsBoxH = cardsBox.clientWidth;
                                this.cardsBoxH = cardsBoxH;
                            });
                        }else{
                            this.delayToast = true;
                            this.delayToastTxt = '没有更多商品了！';
                            setTimeout(()=>{
                                this.delayToast = false;  
                            },1500);
                        }
                        this.bannerArr = res.data.data.img;                     //轮播图片信息
                        this.mySwiper = new Swiper('.swiper-container', { 
                                notNextTick: true,
                                autoplay: 3000,
                                grabCursor : true,
                                setWrapperSize :true,
                                autoHeight: true,
                                pagination : '.swiper-pagination',
                                paginationClickable :true,
                                mousewheelControl : true,
                                debugger: true,
                                observer:true,
                                observeParents:true,
                            });
                    }else{
                        this.delayToast = true;
                        this.delayToastTxt = res.data.msg;
                        setTimeout(()=>{
                            this.delayToast = false;  
                        },1500);
                    }
                }).catch((err)=>{
            　　　　console.log(err);
            　　});
            },
            hrefShopDetail(shopId,stockNum){
                if(stockNum != 0){
                    this.$router.push({path:'shoppIngDetails',query:{shopId:shopId}});
                }else{
                    this.delayToast = true;
                    this.delayToastTxt = '该商品已售罄';
                    setTimeout(()=>{
                        this.delayToast = false;  
                    },1500);
                }
            }
        },
        mounted() {
            
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
    .brandLists{
        padding:0px 8px;
    }
    ._v-container{
        background:#f6f6f6;
    }
    .noShopLists{
        text-align: center;
        margin-top: 30px;
        img{
            display: inline-block;
            width: 110px;
            height: 65px;
        }
        p{
        font-size: 14px;
        color: #666;
        margin-top: 15px;
    }
}
</style>
 