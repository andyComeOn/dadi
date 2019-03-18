<template>
    <div>
        <!-- 品牌制造商直供 str -->
        <scroller :on-refresh="refresh" :on-infinite="infinite">
            <ul class="brandLists" v-if="this.noShopLists == false">
                <li v-for="(item,index) in shopTypeListsArr" :key="index">
                    <!-- <router-link :to='{path:"shoppIngDetails",query:{shopId:item.id}}'> -->
                    <dl @click="hrefShopDetail(item.id,item.stock)">
                        <dt id="cardsBox" :style="{height:cardsBoxH + 'px'}">
                            <img style="width:100%;height:100%;" :src="item.goods_img" alt="">
                            <img class="cardsBox_bz" v-if="item.stock == 0" src="../../../assets/images/yishouqin.png" alt="">
                        </dt>
                        <dd>
                            <p><span v-if='item.consume_type == 2 || item.consume_type == 3'>积分</span>{{item.goods_name}}</p>
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
        </scroller>
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
    import { shopTypeLists } from "../../../api/api.js";
    export default {
        name: "shoppIng",
        components: {},
        data() {
            return {
                cardsBoxH:"",
                shopTypeListsArr:[],
                loading:false,
                loadingTxt:"加载中...",
                delayToast:false,
                delayToastTxt:"",
                pageIndex:0,            //当前页
                noShopLists:false
            };
        },
        computed: {},
        created(){
            let shopTitle = decodeURIComponent(this.$route.query.shopTitle);
            document.title = shopTitle;
        },
        mounted() {
            
        },
        methods: {
            refresh (done) {                     //刷新时清空列表
                this.shopTypeListsArr.length = 0;
                this.pageIndex = 1;
                // setTimeout(() => {
                    this.goodsLists(this.pageIndex);
                    done(true);
                // }, 1500);
            },
            infinite (done) {                    //加载
                this.pageIndex++;
                // setTimeout(() => {
                    this.goodsLists(this.pageIndex);
                    done(true);
                // }, 1500);
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
                    console.log(res);
                    this.loading = false;                               //关闭loading
                    if (res.data.status == 1) {
                        if(res.data.data.length != 0){
                            this.noShopLists = false;
                            for(let i in res.data.data){
                                this.shopTypeListsArr.push(res.data.data[i]);
                            }
                        }else if(res.data.data.length == 0 && this.pageIndex == 1){
                            this.noShopLists = true;
                            this.$nextTick(() => {
                                // 由卡片的宽度-->给卡片的高赋值
                                let cardsBox = document.querySelector("#cardsBox");
                                let cardsBoxH = cardsBox.clientWidth;
                                this.cardsBoxH = cardsBoxH;
                            });
                        }else{
                            this.delayToast = true;
                            this.delayToastTxt = res.data.msg;              //错误信息
                            setTimeout(() => {
                                this.delayToast = false;
                            }, 1500);
                            return false;
                        }
                    } else {
                        this.delayToast = true;
                        this.delayToastTxt = res.data.msg;              //错误信息
                        setTimeout(() => {
                            this.delayToast = false;
                        }, 1500);
                        return false;
                    }
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
 