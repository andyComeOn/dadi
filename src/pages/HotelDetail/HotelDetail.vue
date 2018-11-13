<template>
    <div class="hotel-detail">
        <!-- toast(loading=>weui) -->
        <div v-show="loading">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">数据加载中</p>
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
        <div class="main" v-if="data_store">
            <!-- 广告 -->
            <div class="banner-box" id="hotelDetailBanner" :style="{height: hotelDetailBannerH + 'px'}">
                <swiper class="zb-swiper" :options="swiperOption" ref="mySwiper" @someSwiperEvent="swiperCallback(1)">
                    <swiper-slide v-for="(item,index) in data_store.img_logo" :key="index" @click="swiperSlideFun(index)">
                        <router-link :to="{path:'hotelDetailBannerLink',query:{store_id:watchObj.store_id}}" class="hotel-detail-banner-link">
                            <img :src="item" alt="" style="display:block;width:100%;">
                        </router-link>
                    </swiper-slide>
                    <div class="swiper-pagination" style="line-height:5px;bottom:5px;" slot="pagination"></div>
                </swiper>
                <div class="z-swiper-intro" v-if="data_store.img_logo">
                    <img src="../../assets/images/icon/ic-hotel-detail.png" alt="">共{{data_store.img_logo.length}}张
                </div>
                <div class="collect" @click="collectCtrl">
                    <img v-if="is_collect==1" :src="collectIconActive" alt="">
                    <img v-if="is_collect==0" :src="collectIcon" alt="">
                </div>
            </div>
            <!-- 酒店位置说明 -->
            <div class="detail">
                <div class="name m-ellipsis">{{data_store.store_name}}</div>
                <ul class="location-wrapper" @click="openMap">
                    <li class="location m-ellipsis">{{data_store.address}}</li>
                    <li class="location-info m-ellipsis"> {{data_store.introduce}}</li>
                </ul>
                <a :href="'tel:' + data_store.tel" class="call"><img src="../../assets/images/icon/ic-call.png" alt=""></a>
            </div>
            <!-- 酒店详情查看更多 -->
            <div class="detail-more-container">
                <div class="detail-more-wrapper">
                    <div class="lf">
                        <span class="all-hours">24小时前台</span>
                        <span class="wifi">免费wifi</span>
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
            <div class="roomtype-list-wrapper">
                <ul class="list">
                    <li v-for="(item,index) in data_room" :key="index" @click.stop="showToastMethod(item.id)">
                        <!-- 左边图片展示 -->
                        <div class="lf"><img :src="item.room_img" alt=""></div>
                        <!-- 中间 -->
                        <div class="md">
                            <!-- 大标题 -->
                            <p class="name m-ellipsis">{{item.name}}</p>
                            <!-- 房型主标签展示 -->
                            <div class="labels m-ellipsis">
                                {{item.area}} 、{{item.bed_type}}、{{item.window}} 、{{item.floor}}层
                            </div>
                            <!-- 价格（新、旧）din -->
                            <div class="price">
                                <span class="price-new">&yen;{{item.discount_price}}</span>
                                <span class="price-old">&yen;{{item.market_amount}}</span>
                                <!-- <span>{{item.group_name | filterCardType }} {{ item.promo | filterDiscount}}折</span> -->
                            </div>
                        </div>
                        <!-- 右侧预定按钮 -->
                        <div class="rg">
                            <span class="book" :class="{isHasRoom: item.is==2 ? true : false}" @click.stop="bookFun(item.is, item.store_id,item.id, begin, finish)">
                                {{item.is|filterIsHasRoom}}
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 每个item点击之后出现toast，展示其详情 -->
            <div class="item-toast-container">
                <div class="item-toast" v-for="(item,index) in itemToastArr" :key="index" v-show="item.isShow" >
                    <!-- ="touchmoveP" @scroll.prevent @touchmove.prevent -->
                    <div class="item-toast-wrapper">
                        <div class="item-toast-title">
                            <div class="item-toast-title-wrapper">
                                <div class="content">{{item.name}}</div>
                                <div class="close-btn" @click="closeToast(item.id)"><img class="img" src="../../assets/images/icon/ic-close-toast.png" alt=""></div>
                            </div>
                        </div>
                        <div class="item-toast-banner" id="hotelDetailBanner" :style="{height: hotelDetailBannerH + 'px'}">
                            <swiper class="zb-swiper" :options="swiperToastOption" ref="mySwiper" @someSwiperEvent="swiperToastCallback(1)">
                                <swiper-slide v-for="(itemSon,indexSon) in item.roomTypeList" :key="indexSon" @click="swiperToastSlideFun(indexSon)">
                                    <img :src="itemSon" alt="" style="display:block;width:100%;">
                                </swiper-slide>
                                <div class="swiper-pagination" style="line-height:5px;bottom:5px;" slot="pagination"></div>
                            </swiper>
                        </div>
                        <div class="item-toast-info">
                            <div class="item-toast-tags">
                                <div class="item-toast-tags-wrapper">
                                    <span class="tag">面积&nbsp;&nbsp;
                                        <span class="ftc333">{{item.area}}</span>
                                    </span>
                                    <span class="tag">楼层&nbsp;&nbsp;
                                        <span class="ftc333">{{item.floor}}</span>
                                    </span>
                                    <span class="tag">房型&nbsp;&nbsp;
                                        <span class="ftc333">{{item.name}}</span>
                                    </span>
                                    <span class="tag">无烟&nbsp;&nbsp;
                                        <span class="ftc333">{{item.cigarette}}</span>
                                    </span>
                                    <span class="tag">窗户&nbsp;&nbsp;
                                        <span class="ftc333">{{item.window}}</span>
                                    </span>
                                    <span class="tag">宽带&nbsp;&nbsp;
                                        <span class="ftc333">{{item.broadband}}</span>
                                    </span>
                                    <span class="tag">床型&nbsp;&nbsp;
                                        <span class="ftc333">{{item.bed_type}}</span>
                                    </span>
                                    <span class="tag">加床&nbsp;&nbsp;
                                        <span class="ftc333">{{item.bed}}</span>
                                    </span>
                                </div>
                            </div>
                            <ul class="item-toast-labels">
                                <li class="label-item">
                                    <div class="label-item-head">
                                        媒体科技
                                    </div>
                                    <div class="label-item-body">
                                        {{item.media}}
                                    </div>
                                </li>
                                <li class="label-item">
                                    <div class="label-item-head">
                                        食品饮品
                                    </div>
                                    <div class="label-item-body">
                                        {{item.food}}
                                    </div>
                                </li>
                                <li class="label-item">
                                    <div class="label-item-head">
                                        浴室
                                    </div>
                                    <div class="label-item-body">
                                        {{item.bathroom}}
                                    </div>
                                </li>
                                <li class="label-item">
                                    <div class="label-item-head">
                                        便利设施
                                    </div>
                                    <div class="label-item-body">
                                        {{item.facility}}
                                    </div>
                                </li>
                                <li class="label-item">
                                    <div class="label-item-head">
                                        床品
                                    </div>
                                    <div class="label-item-body">
                                        {{item.bed}}
                                    </div>
                                </li>
                                <li class="label-item">
                                    <div class="label-item-head">
                                        其它
                                    </div>
                                    <div class="label-item-body">
                                        {{item.other}}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 该门店下架时候展示 -->
        <div v-else class="no-store">
            <img src="../../assets/images/404/xiajia.png" alt="">
            <p>该酒店已下架</p>
        </div>
    </div>
</template>

<script>
import { store_detail, add_collect, del_collect, wxShare } from "@/api/api";
import { getCookie } from "@/utils/util";
import { f, dateEndMinusStart } from "@/utils/date"; // 引入封装时间函数
import Calendar from "@/components/calendar/calendar.vue"; // 引入日历组件
import { swiper, swiperSlide } from "vue-awesome-swiper"; // 引入swipe组件
import wx from "weixin-js-sdk";
export default {
    name: "hotel-detail",
    components: {
        Calendar,
        swiper,
        swiperSlide
    },
    data() {
        return {
            // 门店详情banner-swiper相关参数
            swiperOption: {
                autoplay: 3000,
                speed: 1000,   // 这个参数是一张轮播照片从左边播到右边用时1000毫秒
                loop: true, 
                initialSlide : 1,
                notNextTick: true,
                preventClicks: true,
                direction: "horizontal",
                grabCursor: true,
                setWrapperSize: true,
                autoHeight: true,
                pagination: ".swiper-pagination",
                paginationType: "custom",
                paginationCustomRender: function(swiper, current, total) {
                    const activeColor = "#30B097";
                    const normalColor = "rgba(255,255,255,0.5)";
                    let color = "";
                    let paginationStyle = "";
                    let html = "";
                    for (let i = 1; i <= total; i++) {
                        if (i === current) {
                            color = activeColor;
                        } else {
                            color = normalColor;
                        }
                        paginationStyle = `background:${color};opacity:1;margin-right:4px;width:5px;height:5px;`;
                        html += `<span class="swiper-pagination-bullet" style=${paginationStyle}></span>`;
                    }
                    return html;
                },
                paginationClickable: true,
                mousewheelControl: false,
                observeParents: true,
                debugger: true
            },
            // 房型toast中bannner-swiper的参数
            swiperToastOption: {
                notNextTick: true,
                autoplay: false,
                preventClicks: true,
                direction: "horizontal",
                grabCursor: true,
                setWrapperSize: true,
                autoHeight: true,
                pagination: ".swiper-pagination",
                paginationType: "custom",
                paginationCustomRender: function(swiper, current, total) {
                    const activeColor = "#30B097";
                    const normalColor = "rgba(255,255,255,0.5)";
                    let color = "";
                    let paginationStyle = "";
                    let html = "";
                    for (let i = 1; i <= total; i++) {
                        if (i === current) {
                            color = activeColor;
                        } else {
                            color = normalColor;
                        }
                        paginationStyle = `background:${color};opacity:1;margin-right:4px;width:5px;height:5px;`;
                        html += `<span class="swiper-pagination-bullet" style=${paginationStyle}></span>`;
                    }
                    return html;
                },
                paginationClickable: true,
                mousewheelControl: false,
                observeParents: true,
                debugger: true
            },
            loading: true,
            delayToast: false,
            delayToastTxt: "",
            itemToast: false, //itemToast是否展示
            // 请求数据需要传的参数
            watchObj: {
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
            collectId: "", //收藏id
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
            },
            appId: "", // 必填，公众号的唯一标识
            timestamp: "", // 必填，生成签名的时间戳
            nonceStr: "", // 必填，生成签名的随机串
            signature: "", // 必填，签名
            longitude: "",  // 经度
            latitude: "",   // 维度

            // longitude: getCookie("userLongitude"),
            // latitude: getCookie("userLatitude"),
            hotelDetailBannerH: "", //酒店详情banner的高
            itemToastArr: []
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
        // this.fetchData(this.watchObj);
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper;
        }
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
    mounted() {
        // 调取getAppInfo
        // this.getAppInfo();
        // 调取banner赋值函数
        this.setBannerSize();
        // this.fetchData(this.watchObj);
    },
    methods: {
        // 拉取门店详情
        fetchData(param) {
            this.$http({
                method: "POST",
                url: store_detail,
                data: param
            }).then(res => {
                this.loading = false;
                if (res.data.status == 1) {
                    // 房间类型list
                    this.data_room = res.data.data.data_room;
                    let tmpItemToastArr = res.data.data.data_room;
                    this.ItemToastArrMethod();
                    // 房间介绍
                    this.data_store = res.data.data.data_store;
                    // 该门店经纬度赋值
                    this.longitude = this.data_store.longitude;
                    this.latitude = this.data_store.latitude;
                    // console.log(this.longitude + "--" + this.latitude);
                    // 入店、离店、共几晚
                    this.begin = res.data.data.begin;
                    this.finish = res.data.data.finish;
                    this.count = res.data.data.count;
                    // 是否收藏
                    this.is_collect = res.data.data.is_collect;
                    // 收藏的id
                    this.collectId = res.data.data.collect_id;
                    // 调取getAppInfo
                    this.getAppInfo();
                } else {
                    this.data_store = "";
                }
            });
        },
        ItemToastArrMethod() {
            this.itemToastArr = [];
            for (let i = 0; i < this.data_room.length; i++) {
                this.itemToastArr.push({
                    isShow: false,
                    id: this.data_room[i].id,
                    roomTypeList:this.data_room[i].img_all, // 房型图片list
                    name: this.data_room[i].name, // 房型
                    area: this.data_room[i].area, // 面积
                    floor: this.data_room[i].floor, // 楼层
                    cigarette: this.data_room[i].cigarette, // 无烟
                    window: this.data_room[i].window, // 有窗
                    bed_type: this.data_room[i].bed_type, // 床型
                    broadband: this.data_room[i].broadband, // 宽带
                    media: this.data_room[i].media, // 媒体科技
                    food: this.data_room[i].food, //食品饮品
                    bathroom: this.data_room[i].bathroom, //浴室
                    facility: this.data_room[i].facility, //便利设施
                    bed: this.data_room[i].bed, //床品
                    other: this.data_room[i].other, // 其它
                });
            }
        },

        // 点击预定
        bookFun(isHasRoom, store_id, room_id, begin, finish) {
            let tmp = getCookie("userInfoTel");
            let tmpVipStatus = getCookie("userVipStatus");
            let tmpOpenid = getCookie("openid");
            // 判断该用户否有有手机号
            if (!tmp) {
                this.$router.push({
                    path: "/login",
                    query: {
                        loginPage: 1,
                        openId: tmpOpenid,
                        store_id: store_id
                    }
                });
                return;
            }
            // 判断用户的会员的是否是1
            if (tmpVipStatus != 1) {
                this.delayToastTxt = "正处于禁用状态，不可预订";
                this.delayToast = true;
                setTimeout(() => {
                    this.delayToast = false;
                }, 2000);
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
                this.delayToastTxt = "该房型已满房";
                this.delayToast = true;
                setTimeout(() => {
                    this.delayToast = false;
                }, 2000);
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
        // swiper的toast回调
        swiperToastCallback(val) {
            console.log(val);
        },
        // swiper-slide的点击
        swiperSlideFun(val) {
            console.log(val);
        },
        // swiper-slide的toast点击
        swiperToastSlideFun(val) {
            console.log(val);
        },
        // 点击收藏按钮逻辑
        collectCtrl() {
            if (this.is_collect == 0) {
                this.addCollect();
            } else {
                this.delCollect();
            }
        },
        addCollect() {
            let p = {
                store_id: this.watchObj.store_id
            };
            this.$http({
                method: "POST",
                url: add_collect,
                data: p
            }).then(res => {
                if (res.data.status == 1) {
                    this.delayToastTxt = "已收藏";
                    this.delayToast = true;
                    setTimeout(() => {
                        this.delayToast = false;
                    }, 2000);
                    this.fetchData(this.watchObj);
                }
            });
        },
        delCollect() {
            this.$http({
                method: "POST",
                url: del_collect,
                data: { collect_id: this.collectId }
            }).then(res => {
                if (res.data.status == 1) {
                    this.delayToastTxt = "已取消";
                    this.delayToast = true;
                    setTimeout(() => {
                        this.delayToast = false;
                    }, 2000);
                    this.fetchData(this.watchObj);
                }
            });
        },
        // 拉取公众号info进行wx.config
        getAppInfo() {
            var dataObj = {
                url: location.href.split("#")[0]
            };
            this.$http({
                url: wxShare,
                method: "POST",
                data: dataObj
            })
                .then(res => {
                    let appId = res.data.data.appid;
                    let timestamp = res.data.data.timestamp;
                    let nonceStr = res.data.data.noncestr;
                    let signature = res.data.data.signature;
                    let tmpUrl = res.data.data.url;
                    let tmpShareImg = res.data.data.share_img;
                    this.wxConfigMethod(
                        appId,
                        timestamp,
                        nonceStr,
                        signature,
                        tmpUrl,
                        tmpShareImg
                    );
                })
                .catch(err => {});
        },
        // wx.config
        wxConfigMethod(
            appId,
            timestamp,
            nonceStr,
            signature,
            tmpUrl,
            tmpShareImg
        ) {
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: appId, // 必填，公众号的唯一标识
                timestamp: timestamp, // 必填，生成签名的时间戳
                nonceStr: nonceStr, // 必填，生成签名的随机串
                signature: signature, // 必填，签名
                jsApiList: [
                    "onMenuShareAppMessage",
                    "onMenuShareTimeline",
                    "openLocation"
                ] // 必填，需要使用的JS接口列表
            });
            wx.onMenuShareAppMessage({
                title: "秋果人文精品酒店",
                desc: "拿奖金，拿奖金，拿奖金，点开拿奖金",
                link: tmpUrl,
                imgUrl: tmpShareImg,
                type: "",
                dataUrl: "",
                success: function() {}
            });
            wx.onMenuShareTimeline({
                title: "秋果人文精品酒店",
                desc: "拿奖金，拿奖金，拿奖金，点开拿奖金",
                link: tmpUrl,
                imgUrl: tmpShareImg,
                type: "",
                dataUrl: "",
                success: function() {}
            });
        },
        // 打开wx的map
        openMap() {
            // type: 'gcj02',
            // longitude:  Number('39.9219'), 
            // latitude:  Number('116.44355') ,  
            wx.openLocation({
                // 116.468762,39.963803  燕莎店（百度）
                // 39.958080,116.461950  燕莎店（腾讯）
                // 39.9219,116.44355 getLocation 
                longitude: Number(this.longitude), //经度，浮点数，范围为180 ~ -180。
                latitude: Number(this.latitude), // 纬度，浮点数，范围为90 ~ -90
                name: this.data_store.store_name, // 位置名
                address: this.data_store.address, // 地址详情说明
                scale: 18, // 地图缩放级别,整形值,范围从1~28。默认为最大
                infoUrl: "", // 在查看位置界面底部显示的超链接,可点击跳转
                success: function (res) {
                    // alert('suc'+ res);
                    // alert( 'suc' +"--"  + res.errMsg);
                },
                fail: function (res) {
                    // alert( "err"  + "--" + res.errMsg);
                }
            });
        },
        // banner重置宽高
        setBannerSize() {
            let hotelDetailBanner = document.querySelector(
                "#hotelDetailBanner"
            );
            let hotelDetailBannerW = hotelDetailBanner.clientWidth;
            let hotelDetailBannerH = (hotelDetailBannerW * 320) / 750;
            this.hotelDetailBannerH = hotelDetailBannerH;
        },
        showToastMethod(id) {
            let tmp = this.itemToastArr;
            for (let i = 0; i < tmp.length; i++) {
                tmp[i].isShow = false;
                if (tmp[i].id == id) {
                    tmp[i].isShow = true;
                }
            }
        },
        closeToast(id) {
            let tmp = this.itemToastArr;
            for (let i = 0; i < tmp.length; i++) {
                tmp[i].isShow = false;
            }
        }
    }
};
</script>

<style lang="less" scoped>
// banner
.banner-box {
    position: relative;
    // min-height: 162px;
    // max-height: 190px;
    background: url("../../assets/images/default/tupian.jpg") no-repeat center
        center;
    background-size: 100% 100%;
    .zb-swiper {
        width: 100%;
        height: 100%;
        margin: 0 auto;
    }
    .collect {
        width: 32px;
        height: 32px;
        position: absolute;
        top: 15px;
        right: 15px;
        z-index: 10;
        img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
        }
    }
    .z-swiper-intro {
        position: absolute;
        line-height: 22px;
        right: 15px;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        font-size: 10px;
        bottom: 10px;
        z-index: 10;
        padding: 0 6px 0 25px;
        border-radius: 5px;
        img {
            width: 14px;
            height: 12px;
            position: absolute;
            top: 50%;
            margin-top: -6px;
            left: 6px;
        }
    }
}
// 酒店的位置
.detail {
    padding: 10px 50px 10px 15px;
    background: #fff;
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
            no-repeat 3px center;
        background-size: 13px 15px;
    }
    .call {
        width: 32px;
        height: 32px;
        position: absolute;
        top: 50%;
        margin-top: -16px;
        right: 15px;
        z-index: 10;
        img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
        }
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
                &.all-hours {
                    background: url("../../assets/images/hotel-label/lab8.png")
                        no-repeat left center;
                    background-size: 18px 18px;
                }
                &.wifi {
                    background: url("../../assets/images/hotel-label/lab1.png")
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
            padding: 0 5px;
            line-height: 22px;
            border: 1px solid #ccc;
            border-radius: 3px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
}

// 预定的list
.roomtype-list-wrapper {
    .list {
        padding: 0 15px;
        background: #fff;
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
                background: url("../../assets/images/default/fangxing.jpg")
                    no-repeat right center;
                background-size: 83px 73px;
                border-radius: 3px; 
                margin-right: 6px;
                img {
                    display: block;
                    width: 83px;
                    height: 73px;
                    border-radius: 3px; 
                }
            }
            // 中间
            .md {
                flex: 1;
                overflow: hidden;
                height: 73px;
                padding: 8px 5px 0 0;
                color: rgba(153, 153, 153, 1);
                // 酒店名称
                .name {
                    // width: 155px;
                    height: 20px;
                    font-size: 14px;
                    color: rgba(51, 51, 51, 1);
                    line-height: 20px;
                }
                // 酒店房间标签
                .labels {
                    // width: 155px;
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
                    &.isHasRoom {
                        background: #cccccc;
                    }
                }
            }
        }
    }
}

// -------------------无酒店--------------------
.no-store {
    margin-top: 170px;
    img {
        display: block;
        width: 152px;
        height: 108px;
        margin: 0 auto;
    }
    p {
        line-height: 20px;
        font-size: 14px;
        color: #666;
        text-align: center;
    }
}

// 酒店list中的item的css
.item-toast {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    .item-toast-wrapper {
        background: #eff1f0;
        width: 100%;
        top: 65px;
        position: absolute;
        bottom: 0;
        display: flex;
        flex-direction: column;
        .item-toast-title {
            padding-left: 15px;
            background: #fff;
            .item-toast-title-wrapper {
                position: relative;
                .content {
                    line-height: 40px;
                    font-family: "PingFang SC";
                    color: #333;
                    font-size: 16px;
                }
                .close-btn {
                    width: 32px;
                    height: 32px;
                    position: absolute;
                    right: 0;
                    top: 4px;
                    .img {
                        width: 32px;
                        height: 32px;
                    }
                }
            }
        }
        .item-toast-banner {
            // height: 190px;
            // background: #ffba56;
            background: url("../../assets/images/default/tupian.jpg") no-repeat center
                center;
            background-size: 100% 100%;
            overflow: hidden;
            img {
                display: block;
                width: 100%;
            }
        }
        .item-toast-info {
            flex: 1;
            overflow: auto;
            // padding-bottom: 70px;
        }
        .item-toast-tags {
            background: #fff;
            padding: 15px;
            margin-bottom: 5px;
            .item-toast-tags-wrapper {
                &::after {
                    display: table;
                    content: "";
                    clear: both;
                }
                .tag {
                    width: 50%;
                    line-height: 19px;
                    margin-bottom: 8px;
                    float: left;
                    color: #666;
                    &:nth-last-child(1) {
                        margin-bottom: 0;
                    }
                    &:nth-last-child(1) {
                        margin-bottom: 0;
                    }
                }
            }
        }
        .item-toast-labels {
            background: #fff;
            padding-left: 15px;
            .label-item {
                padding: 10px 0;
                position: relative;
                display: flex;
                &::after {
                    content: "";
                    width: 100%;
                    height: 1px;
                    background: #e5e5e5;
                    position: absolute;
                    bottom: 0;
                    transform: scaleY(0.5);
                }
                .label-item-head {
                    width: 70px;
                    margin-right: 15px;
                    color: #666;
                    letter-spacing: 1px;
                }
                .label-item-body {
                    flex: 1;
                    line-height: 20px;
                    color: #333333;
                }
            }
        }
        .item-toast-foot {
            position: fixed;
            width: 100%;
            bottom: 0;
            height: 70px;
            padding: 10px 15px;
            background: #fff;
            box-shadow: 0 0 2px #888888;
            .item-toast-foot-wrapper {
                line-height: 50px;
                border: 1px solid #30b097;
                font-size: 16px;
                color: #30b097;
                text-align: center;
            }
        }
    }
}
</style>