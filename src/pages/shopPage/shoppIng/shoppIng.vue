<template>
    <div>
        <div class="shoppIng">
            <!-- 轮播 str -->
            <div class="goodsBanner">
                <!-- <router-link :to='{path:"shoppIngDetails"}'>
                    <img src="../../../assets/images/bg/bg-jifenmignxi.png" alt="">
                </router-link> -->
                <swiper style="height:180px;" ref="mySwiper">
                    <!-- slides -->
                    <swiper-slide style="height:180px;" v-for='item in this.bannerArr'>
                        <img :src="item.img" alt="">
                    </swiper-slide>
                    <!-- Optional controls -->
                    <div class="swiper-pagination"  slot="pagination"></div>
                </swiper>
            </div>
            <!-- 轮播 end -->
            <!-- nav str -->
            <ul class="navLists clearfix">
                <li v-for="(item,index) in shopTypeArr" :key="index">
                    <router-link :to='{path:"shopTypeLists",query:{shopType:item.id}}'>
                        <dl>
                            <dt>
                                <img v-if='item.id == 1' src="../../../assets/images/shop/home_shuimian.png" alt="">
                                <img v-if='item.id == 2' src="../../../assets/images/shop/home-ziying.png" alt="">
                                <img v-if='item.id == 3' src="../../../assets/images/shop/home-techan@1x.png" alt="">
                                <img v-if='item.id == 4' src="../../../assets/images/shop/home-duihuan@1x.png" alt="">
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
            <ul class="brandLists">
                <li v-for="(item, index) in shopListsArr" :key="index">
                    <router-link :to='{path:"shoppIngDetails",query:{shopId:item.id}}'>
                        <dl>
                            <dt>
                                <img :src="item.goods_img" alt="">
                            </dt>
                            <dd>
                                <p class=""><span v-if='item.consume_type == 2'>积分</span>{{item.goods_name}}</p>
                                <h2><span>￥</span>{{item.goods_price}}</h2>
                            </dd>
                        </dl>
                    </router-link>
                </li>
            </ul>
        </div>
        <!-- 品牌制造商直供 end -->
    </div>
</template>
<script>
    import { shopLists, shopType,DistributionBanner } from "../../../api/api.js";
    export default {
        name: "shoppIng",
        components: {

        },
        data() {
            return {
                shopListsArr: [],           //商品列表数据    
                shopTypeArr: [],            //商品分类
                bannerArr:[],               //轮播图数据
            };
        },
        methods: {

        },
        mounted() {
            this.$http({                        //获取商品分类
                url: shopType,
                method: "POST",
                data: {}
            }).then(res => {
                if (res.data.status == 1) {
                    this.shopTypeArr = res.data.data;       //商品分类数据
                }else{
                    alert('获取商品分类失败');
                }
            });
            this.$http({                        //获取商品列表
                url: shopLists,
                method: "POST",
                data: {}
            }).then(res => {
                if (res.data.status == 1) {
                    // console.log(res);
                    this.shopListsArr = res.data.data;      //商品列表数据
                } else {
                    alert("获取失败");
                }
            });
            this.$http({
                url:DistributionBanner,
                method:"POST",
                data:{
                    type_id:6,                  //广告位置
                    banner_sum:5                //获取图片数量
                }
            }).then(res=>{
                if(res.data.status == 1){
                    this.bannerArr = res.data.data;             //轮播图片信息
                    var mySwiper = new Swiper('.swiper-container', { 
                            // notNextTick: true,
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
                        }) 
                }else{
                    alert('获取轮播图失败');
                }
            });
        },
    };
</script>
<style lang="less" scoped>
    @import "./shopping.less";
</style>
<style lang="">
    .goodsBanner .swiper-container-autoheight  .swiper-pagination-bullet{
        width: 5px;
        height: 5px;
        border-radius: 100%;
        background: rgba(225,225,225,0.7);
    }
    .goodsBanner .swiper-container-autoheight .swiper-pagination-bullets .swiper-pagination-bullet-active{
        width: 12px!important;
        height: 5px!important;
        background: #fff!important;
        border-radius: 2px!important;
    }
</style>
 