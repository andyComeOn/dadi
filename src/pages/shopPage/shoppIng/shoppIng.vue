<template>
    <div>
        <div class="shoppIng">
            <!-- 轮播 str -->
            <div class="goodsBanner" id="goodsBanner">
                <router-link :to='{path:"shoppIngDetails"}'>
                    <img src="../../../assets/images/bg/bg-jifenmignxi.png" alt="">
                </router-link>

                <!-- <swiper class="" :options="goodsOption" ref="mySwiper" @someSwiperEvent="goodsSwiperCallback(1)">
                    <swiper-slide v-for="(item,index) in data_store.img_logo" :key="index" @click="goodsSwiperSlideFun(index)">
                        <router-link :to="{path:'hotelDetailBannerLink',query:{store_id:watchObj.store_id}}" class="hotel-detail-banner-link">
                            <img :src="item" alt="" style="display:block;width:100%;">
                        </router-link>
                    </swiper-slide>
                    <div class="swiper-pagination" style="line-height:5px;bottom:5px;" slot="pagination"></div>
                </swiper> -->
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
                                <!-- m-ellipsis-2 -->
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
import { shopLists, shopType } from "../../../api/api.js";
export default {
    name: "shoppIng",
    components: {},
    data() {
        return {
            shopListsArr: [],
            shopTypeArr: []
        };
    },
    computed: {},
    mounted() {
        this.$http({
            url: shopType,
            method: "POST",
            data: {}
        })
            .then(res => {
                if (res.data.status == 1) {
                    this.shopTypeArr = res.data.data;
                }
            })
            .catch(err => {
                console.log(err);
            });
        this.$http({
            url: shopLists,
            method: "POST",
            data: {}
        }).then(res => {
            if (res.data.status == 1) {
                this.shopListsArr = res.data.data;
                console.log(res);
            } else {
                alert("获取失败");
            }
        });
    },
    methods: {
        // banner重置宽高
        setBannerSize() {
            let goodsBanner = document.querySelector(
                "#goodsBanner"
            );
            let hotelDetailBannerW = goodsBanner.clientWidth;
            let hotelDetailBannerH = (hotelDetailBannerW * 320) / 750;
            this.hotelDetailBannerH = hotelDetailBannerH;
        },
        // swiper回调
        goodsSwiperCallback(val) {
            console.log(val);
        },
        // swiper-slide的点击
        goodsSwiperSlideFun(val) {
            console.log(val);
        },
    }
};
</script>
<style lang="less" scoped>
@import "./shopping.less";
</style>
 