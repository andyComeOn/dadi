<template>
    <div class="hotel-detail">
        <!-- toast提示 -->
        <div v-show="isRoomDetailToastVisible">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">数据加载中</p>
            </div>
        </div>
        <div class="main" v-if="data_room.length>0">
            <!-- 广告 -->
            <div class="banner-box">
                <!-- <div class="banner"> -->
                <swiper class="zb-swiper" :options="swiperOption" ref="mySwiper" @someSwiperEvent="swiperCallback(1)">
                    <swiper-slide v-for="item in bannerList" :key="item.id" @click="swiperSlideFun(item.id)">
                        <router-link :to="{path:'hotelDetailBannerLink',query:{store_id:watchObj.store_id}}" class="hotel-detail-banner-link">
                            <img :src="item.img" alt="">
                        </router-link>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
                <!-- </div> -->

                <!-- <div class="collect" @click="addCollect">
                    <img v-if="is_collect==1" :src="collectIconActive" alt="">
                    <img v-if="is_collect==0" :src="collectIcon" alt="">
                </div> -->
            </div>
            <!-- 酒店位置说明 -->
            <div class="detail">
                <div class="name">{{data_store.store_name}}</div>
                <ul class="location-wrapper">
                    <li class="location">{{data_store.address}}</li>
                    <li class="location-info"> {{data_store.introduce}}</li>
                </ul>
            </div>

            <!-- 酒店详情查看更多 -->
            <div class="detail-more-container">
                <div class="detail-more-wrapper">
                    <div class="lf">
                        <span class="wifi">免费wifi</span>
                        <span class="luggage">免费行李寄存</span>
                    </div>
                    <div class="rg">
                        <router-link :to=" { path: 'hotelLabel', query: { store_id: watchObj.store_id }}" tag="div">
                            <span class="btn-more">更多</span>
                        </router-link>
                    </div>
                </div>
            </div>

            <!-- 入离时间展示 -->
            <div class="come-go-box">
                <div class="come-go">
                    <div class="come" @click="triggerCalendar">
                        <span>入住</span>
                        <span>{{zbInitCalendar.start.mm}}月{{zbInitCalendar.start.dd}}日</span>
                    </div>
                    <span class="total">共{{count}}晚</span>

                    <div class="go" @click="triggerCalendar">
                        <span>离店</span>
                        <span>{{zbInitCalendar.end.mm}}月{{zbInitCalendar.end.dd}}日</span>
                    </div>
                </div>
            </div>
            <!-- 日历组件dialog -->
            <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="zbCalendarVisible">
                <Calendar ref="Calendar" :markDateMore="zbInitCalendar" @isToday="clickToday" @calendarTitleBackEmit="calendarTitleBackEmitFun">
                </Calendar>
            </mu-dialog>

            <!-- 预定组件-后来取消引入 -->
            <!-- <reserveItem :condition="watchObj"></reserveItem> -->

            <!-- 搜索到list -->
            <div class="reverse-wrapper">
                <ul class="list">
                    <li v-for="(item,index) in data_room" :key="index">
                        <!-- 左边图片展示 -->
                        <div class="lf"><img :src="item.room_img" alt=""></div>
                        <!-- 中间 -->
                        <div class="md">
                            <!-- 大标题 -->
                            <p class="name m-ellipsis">{{item.name}}</p>
                            <!-- 酒店设施集合 -->
                            <div class="labels">{{item.introduce}}</div>
                            <!-- 价格（新、旧） -->
                            <div class="price">
                                <span class="price-new">&yen;{{item.discount_price}}</span>
                                <span class="price-old">&yen;{{item.market_amount}}</span>
                            </div>
                        </div>
                        <!-- 右侧预定按钮 -->
                        <div class="rg">
                            <span class="book" @click="bookFun(item.is, item.store_id,item.id, begin, finish)">
                                预订
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 该门店下架时候展示 -->
        <div v-else v-show="isShow" class="no-store">
            <img src="../../assets/images/404/xiajia.png" alt="">
            <p>该酒店已下架</p>
        </div>
    </div>
</template>

<script>
import {
    store_detail,
    DistributionBanner,
    add_collect,
    order_form
} from "@/api/api";
import { getCookie } from "@/utils/util";
import { f, dateEndMinusStart } from "@/utils/date"; // 引入封装时间函数
import Calendar from "@/components/calendar/calendar.vue"; // 引入日历组件
import { swiper, swiperSlide } from "vue-awesome-swiper"; // 引入swipe组件
export default {
    name: "hotel-detail",
    components: {
        Calendar,
        swiper,
        swiperSlide
    },
    data() {
        return {
            // swiper相关参数
            swiperOption: {
                notNextTick: true,
                autoplay: false,
                preventClicks: true,
                direction: "horizontal",
                grabCursor: true,
                setWrapperSize: true,
                autoHeight: false,
                pagination: ".swiper-pagination",
                paginationClickable: true,
                mousewheelControl: false,
                observeParents: true,
                debugger: true
            },
            isRoomDetailToastVisible:true,
            isShow:false,
            bannerList: [],  // 拉取banner信息
            // 请求数据需要传的参数
            watchObj: {
                cpid: "1",
                store_id: "",
                begin: "",
                finish: ""
            },
            // 接收http请求返回的数据
            data_room: [],
            data_store: {},
            count: "", // 几晚
            begin: "",
            finish: "",
            is_collect: "", //该门店是否被收藏
            collectIcon: require("../../assets/images/collect.png"),
            collectIconActive: require("../../assets/images/collect-active.png"),

            // 日历组件dialog是否显示
            zbCalendarVisible: false,
            // 初始化日历日期
            zbInitCalendar: {
                start: {
                    yyyy: "",
                    mm: "",
                    dd: ""
                },
                end: {
                    yyyy: "",
                    mm: "",
                    dd: ""
                }
            }
        };
    },
    created() {
        // 获取路由参数
        var routePara = {
            store_id: this.$route.query.store_id,
            begin: this.$route.query.begin,
            finish: this.$route.query.finish
        };
        // 如果从订单列表页的“再次预定”按钮过来只带store_id参数，无begin、finish参数
        if (routePara.begin == undefined || routePara.finish == undefined) {
            var d = new Date();
            var dd = new Date();
            dd.setDate(dd.getDate() + 1);
            this.watchObj.begin = f(d).yyyy + "-" + f(d).mm + "-" + f(d).dd;
            this.watchObj.finish = f(dd).yyyy + "-" + f(dd).mm + "-" + f(dd).dd;
            this.watchObj.store_id = routePara.store_id;
            this.zbInitCalendar.start.yyyy = f(d).yyyy;
            this.zbInitCalendar.start.mm = f(d).mm;
            this.zbInitCalendar.start.dd = f(d).dd;
            this.zbInitCalendar.end.yyyy = f(dd).yyyy;
            this.zbInitCalendar.end.mm = f(dd).mm;
            this.zbInitCalendar.end.dd = f(dd).dd;
        } else {
            // 给date()中监听数据进行赋值
            this.watchObj.store_id = routePara.store_id;
            this.watchObj.begin = routePara.begin;
            this.watchObj.finish = routePara.finish;
            // 初始化日历中的值
            let beginArr = routePara.begin.split("-");
            let endArr = routePara.finish.split("-");
            this.zbInitCalendar.start.yyyy = beginArr[0];
            this.zbInitCalendar.start.mm = beginArr[1];
            this.zbInitCalendar.start.dd = beginArr[2];
            this.zbInitCalendar.end.yyyy = endArr[0];
            this.zbInitCalendar.end.mm = endArr[1];
            this.zbInitCalendar.end.dd = endArr[2];
        }

        // 拉取数据
        this.fetchData(this.watchObj);
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper;
        }
    },
    mounted() {
        // 拉取banner信息
        this.fetchBannerData({ cpid: 1, type_id: 1 });
    },
    watch: {
        watchObj: {
            handler(newValue, oldValue) {
                this.fetchData(newValue);
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        // 拉取banner详情
        fetchBannerData(param) {
            this.$http({
                method: "POST",
                url: DistributionBanner,
                data: param
            }).then(res => {
                if (res.data.status == 1) {
                    this.bannerList = res.data.data;
                } else {
                }
            });
        },
        // 拉取门店详情
        fetchData(param) {
            this.$http({
                method: "POST",
                url: store_detail,
                data: param
            }).then(res => {
                this.isRoomDetailToastVisible = false;
                if (res.data.status == 1) {
                    // 房间类型list
                    this.data_room = res.data.data.data_room;
                    // 房间介绍
                    this.data_store = res.data.data.data_store;
                    // 入店、离店、共几晚
                    this.begin = res.data.data.begin;
                    this.finish = res.data.data.finish;
                    this.count = res.data.data.count;
                    // 是否收藏
                    this.is_collect = res.data.data.is_collect;
                } else {
                    this.isShow = true;
                }
            });
        },

        // 点击预定
        bookFun(isHasRoom, store_id, room_id, begin, finish) {
            let tmp = getCookie("userInfoTel");
            if (!tmp) {
                this.$router.push({
                    path: "/login",
                    query: {}
                });
                return;
            }
            if (isHasRoom == 1) {
                this.$router.push({
                    path: "/order",
                    query: {
                        store_id: store_id,
                        room_id: room_id,
                        begin: begin,
                        finish: finish
                    }
                });
            } else {
                alert("不可预订");
            }
        },

        // 触发日历dialog
        triggerCalendar() {
            this.zbCalendarVisible = true;
        },

        // 入住-离店
        clickToday(value) {
            this.zbCalendarVisible = false;

            // 入住时间
            let tmpB = value[0].split("/");
            this.zbInitCalendar.start.yyyy = tmpB[0];
            this.zbInitCalendar.start.mm = tmpB[1];
            this.zbInitCalendar.start.dd = tmpB[2];
            this.watchObj.begin = tmpB[0] + "-" + tmpB[1] + "-" + tmpB[2];

            // 离店时间
            let tmpF = value[1].split("/");
            this.zbInitCalendar.end.yyyy = tmpF[0];
            this.zbInitCalendar.end.mm = tmpF[1];
            this.zbInitCalendar.end.dd = tmpF[2];
            this.watchObj.finish = tmpF[0] + "-" + tmpF[1] + "-" + tmpF[2];

            //共几晚
            this.count = dateEndMinusStart(value[0], value[1]);
        },

        // 日历组件的title-若用户不选取日历，点击返回使日历弹窗消失
        calendarTitleBackEmitFun() {
            this.zbCalendarVisible = false;
        },

        // swiper回调
        swiperCallback(val) {
            console.log(val);
        },

        // swiper-slide的点击
        swiperSlideFun(val) {
            console.log(val);
        },

        // 点击收藏按钮
        addCollect() {
            if (this.is_collect == 1) return;
            let p = {
                store_id: this.watchObj.store_id
            };
            this.$http({
                method: "POST",
                url: add_collect,
                data: p
            }).then(res => {
                console.log(res.data);
                if (res.data.status == 1) {
                    this.fetchData(this.watchObj);
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
// banner的box
.banner-box {
    position: relative;
    .zb-swiper {
        width: 100%;
        height: 100%;
        margin: 0 auto;
    }
    .collect {
        width: 32px;
        height: 32px;
        position: absolute;
        bottom: -16px;
        right: 15px;
        z-index: 10;
        img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
        }
    }
}
// 酒店的位置
.detail {
    padding: 10px 15px;
    position: relative;
    &:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 1px;
        background: #e5e5e5;
        transform: scaleY(0.5);
    }
    .name {
        height: 22px;
        line-height: 22px;
        font-size: 16px;
        color: #333333;
        letter-spacing: 0;
    }
    .location-wrapper {
        width: 100%;
        padding-left: 22px;
        background: url("../../assets/images/hotel-label/ic_dingwei.png")
            no-repeat 3px 3px;
        background-size: 13px 15px;
    }
}

// 查看更多
.detail-more-container {
    background: #eff1f0;
    padding-bottom: 5px;
    .detail-more-wrapper {
        height: 40px;
        padding: 10px 15px;
        background: #fff;
        font-size: 14px;
        color: #666;
        .lf {
            height: 20px;
            float: left;
            span {
                display: inline-block;
                height: 20px;
                line-height: 20px;
                padding-left: 26px;
                margin-right: 12px;
                &.wifi {
                    background: url("../../assets/images/hotel-label/ic_wifi.png")
                        no-repeat left center;
                    background-size: 18px 18px;
                }
                &.luggage {
                    background: url("../../assets/images/hotel-label/ic_luggage.png")
                        no-repeat left center;
                    background-size: 18px 18px;
                }
            }
        }
        .rg {
            height: 20px;
            float: right;
            font-size: 12px;
            span {
                display: inline-block;
                line-height: 20px;
                height: 20px;
                padding-right: 14px;
                background: url("../../assets/images/arrows/ic-arrow_10_18.png")
                    no-repeat right center;
                background-size: 5px 9px;
            }
        }
    }
}

// 入离店展示
.come-go-box {
    height: 70px;
    padding-bottom: 5px;
    background: #e5e5e5;
    .come-go {
        height: 65px;
        text-align: center;
        background: #fff;
        padding: 0 15px;
        position: relative;
        .come,
        .go {
            float: left;
            height: 65px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            span {
                &:nth-child(1) {
                    color: #999;
                }
                &:nth-child(2) {
                    color: #333;
                }
            }
        }
        .go {
            float: right;
        }
        .total {
            position: absolute;
            width: 40px;
            height: 22px;
            line-height: 22px;
            border: 1px solid #ccc;
            border-radius: 3px;
            top: 50%;
            left: 50%;
            margin: -11px 0 0 -40px;
        }
    }
}

// 预定的list
.reverse-wrapper {
    .list {
        padding: 0 15px;
        li {
            padding: 10px 0 5px 0;
            height: 88px;
            position: relative;
            display: flex;
            flex-direction: row;
            &:after {
                content: "";
                position: absolute;
                left: 0;
                bottom: 0;
                right: 0;
                height: 1px;
                background: #e5e5e5;
                transform: scaleY(0.5);
            }
            // 左边图片展示
            .lf {
                width: 83px;
                height: 73px;
                margin-right: 10px;
                img {
                    width: 83px;
                    height: 73px;
                }
            }
            // 中间
            .md {
                flex: 1;
                height: 73px;
                padding: 8px 0 0 0;
                color: rgba(153, 153, 153, 1);
                // 酒店名称
                .name {
                    height: 20px;
                    font-size: 14px;
                    color: rgba(51, 51, 51, 1);
                    line-height: 20px;
                }
                // 酒店房间标签
                .labels {
                    height: 16px;
                    line-height: 16px;
                    font-size: 12px;
                    margin-bottom: 6px;
                }
                // 价格
                .price {
                    height: 19px;
                    vertical-align: bottom;
                    .price-new {
                        line-height: 19px;
                        margin-right: 5px;
                        color: #ffba56;
                        font-size: 16px;
                    }
                    .price-old {
                        color: #cccccc;
                        font-size: 10px;
                        line-height: 14px;
                        text-decoration: line-through;
                    }
                }
            }
            // 右侧预定按钮
            .rg {
                width: 44px;
                height: 73px;
                line-height: 73px;
                .book {
                    display: inline-block;
                    width: 44px;
                    height: 27px;
                    line-height: 27px;
                    text-align: center;
                    color: rgba(255, 255, 255, 1);
                    font-size: 14px;
                    background: rgba(48, 176, 151, 1);
                    border-radius: 5px;
                }
            }
        }
    }
}

// -------------------无酒店--------------------
.no-store{
    margin-top:170px; 
    img{
        display: block;
        width: 152px;
        height: 108px;
        margin: 0 auto;
    }
    p{
        line-height: 20px;
        font-size: 14px;
        color: #666;
        text-align: center;
    }
}
</style>