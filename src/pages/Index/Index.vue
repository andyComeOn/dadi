<template>
    <div class="index-page">
        <!-- 主内容-->
        <div class="page-content pdbottom50 m-position-ab">
            <!-- 轮播 -->
            <div class="banner-box" id="indexBanner" :style="{height: indexBannerH + 'px'}">
                <swiper class="zb-swiper" :options="swiperOption" ref="mySwiper" @someSwiperEvent="swiperCallback(1)">
                    <swiper-slide v-for="item in bannerList" :key="item.id" @click="swiperSlideFun(item.id)">
                        <!-- <router-link :to="{path:'ad',query:{}}" class="hotel-detail-banner-link"></router-link> -->
                        <a :href="item.url">
                            <img :src="item.img" alt="" style="width:100%;">
                        </a>
                    </swiper-slide>
                    <div class="swiper-pagination" style="line-height:5px;bottom:5px;" slot="pagination"></div>
                </swiper>
            </div>
            <!-- 用户预定区 -->
            <div class="reserve-form">
                <div class="reserve-wrap">
                    <!-- 位置选择 -->
                    <div class="select-location">
                        <div class="lf" @click="triggerCityDialog">
                            <div class="dest-city">
                                <span class="dest">目的地</span>
                                <span class="city">{{cityname}}</span>

                            </div>
                            <div class="dest-city-arrow">
                                <img src="../../assets/images/arrows/ic-arrow_10_18.png" alt="">
                            </div>
                        </div>
                        <div class="rg" @click="getLocation">
                            <span class="my-location">
                                <img src="../../assets/images/home_location.png" alt=""><br>我的位置
                            </span>
                        </div>
                    </div>
                    <!-- 入住和离店 -->
                    <div class="time">
                        <!-- 入住模块 -->
                        <div class="lf">
                            <span class="instr">入住</span>
                            <span class="date" @click="triggerCalendar">
                                {{zbInitCalendar.start.mm}}月{{zbInitCalendar.start.dd}}日
                            </span>
                        </div>
                        <!-- 入住几晚 -->
                        <div class="md">共{{howManyNight}}晚</div>
                        <!-- 离店模块 -->
                        <div class="rg">
                            <span class="instr">离店</span>
                            <span class="date" @click="triggerCalendar">
                                {{zbInitCalendar.end.mm}}月{{zbInitCalendar.end.dd}}日
                            </span>
                        </div>
                    </div>
                    <!-- 关键词搜索 -->
                    <div class="search">
                        <input type="text" class="txt" v-model="abstract" placeholder="请输入关键词／地址／商圈">
                    </div>
                    <!-- 提交按钮 -->
                    <div class="submit" @click="submitFun">酒店预订</div>
                </div>
            </div>
        </div>
        <!-- 引入底部tabbar -->
        <mTabbarFa></mTabbarFa>
        <!-- 城市组件dialog -->
        <mu-dialog width="360" transition="slide-right" fullscreen :open.sync="zbCityVisible">
            <City @cityTitleBackEmit="cityTitleBackEmitFun" @cityItemEmit="cityItemEmitFun" :longitude="longitude" :latitude="latitude">
            </City>
        </mu-dialog>
        <!-- 日历组件dialog -->
        <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="zbCalendarVisible">
            <Calendar ref="Calendar" :markDateMore="zbInitCalendar" @isToday="clickToday" @calendarTitleBackEmit="calendarTitleBackEmitFun">
            </Calendar>
        </mu-dialog>
    </div>
</template>

<script>
import { DistributionBanner, slt_location, wxShare } from "@/api/api"; // 引入api
import { f, dateEndMinusStart } from "@/utils/date"; // 引入封装时间函数
import { getCookie, setCookie } from "@/utils/util";
import mTabbarFa from "@/components/tabbarfa";
import { swiper, swiperSlide } from "vue-awesome-swiper"; // 引入swipe组件
import City from "@/components/city/city.vue"; // 引入城市组件
import Calendar from "@/components/calendar/calendar.vue"; // 引入日历组件
import { getUrlParam } from "@/utils/util.js";
import wx from "weixin-js-sdk";

export default {
    name: "index",
    components: {
        mTabbarFa,
        swiper,
        swiperSlide,
        City,
        Calendar
    },
    props: {},
    data() {
        return {
            swiperOption: {
                notNextTick: true,
                autoplay: false,
                preventClicks: true,
                direction: "horizontal",
                grabCursor: true, //设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
                setWrapperSize: true,
                autoHeight: false,
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
            bannerList: "", // 拉取banner信息
            indexBannerH: "",
            // 城市组件dialog是否显示
            zbCityVisible: false,
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
            howManyNight: "", // 入住-离店共几晚
            appId: "", // 必填，公众号的唯一标识
            timestamp: "", // 必填，生成签名的时间戳
            nonceStr: "", // 必填，生成签名的随机串
            signature: "", // 必填，签名
            url: "", //分享之后link的url
            cityname: "北京市", // 城市名称
            cityid: "2", // 城市id
            abstract: "", //搜索关键字
            myLocation: "", // 获取地址
            longitude: "116.309408",
            latitude: "39.966051",
            address: "" // 地址精确到街道
        };
    },
    created() {
        // 初始化日历日期赋值
        var d = new Date();
        var dd = new Date();
        dd.setDate(dd.getDate() + 1);
        this.howManyNight = dateEndMinusStart(d, dd);
        this.zbInitCalendar.start.yyyy = f(d).yyyy;
        this.zbInitCalendar.start.mm = f(d).mm;
        this.zbInitCalendar.start.dd = f(d).dd;
        this.zbInitCalendar.end.yyyy = f(dd).yyyy;
        this.zbInitCalendar.end.mm = f(dd).mm;
        this.zbInitCalendar.end.dd = f(dd).dd;
        // 拉取banner的方法
        this.fetchBannerData({ type_id: 1 });
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper;
        }
    },
    mounted() {
        // banner用js设置宽高
        this.setBannerSize();
        // 获取公众号的配置info
        this.getAppInfo();
    },
    methods: {
        // banner方法
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
        // banner中js设置宽高
        setBannerSize() {
            let indexBanner = document.querySelector("#indexBanner");
            let indexBannerW = indexBanner.clientWidth;
            let indexBannerH = indexBannerW * 380 / 750;
            this.indexBannerH = indexBannerH;
        },
        // 获取公众号的配置info
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
                    if (res.data.status == 1) {
                        this.appId = res.data.data.appid;
                        this.timestamp = res.data.data.timestamp;
                        this.nonceStr = res.data.data.noncestr;
                        this.signature = res.data.data.signature;
                        this.url = res.data.data.url;
                        // wx分享config配置
                        this.wxConfigMethod(
                            res.data.data.url,
                            res.data.data.share_img
                        );
                    }
                })
                .catch(err => {});
        },
        // wx分享config配置
        wxConfigMethod(url, shareImg) {
            let that = this;
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: this.appId, // 必填，公众号的唯一标识
                timestamp: this.timestamp, // 必填，生成签名的时间戳
                nonceStr: this.nonceStr, // 必填，生成签名的随机串
                signature: this.signature, // 必填，签名
                jsApiList: [
                    "onMenuShareAppMessage",
                    "onMenuShareTimeline",
                    "getLocation",
                ] // 必填，需要使用的JS接口列表
            });
            wx.onMenuShareAppMessage({
                title: "秋果人文精品酒店", // 分享标题
                desc: "拿奖金，拿奖金，拿奖金，点开拿奖金", // 分享描述
                link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: shareImg, // 分享图标
                type: "", // 分享类型,music、video或link，不填默认为link
                dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
                success: function() {
                    // 用户点击了分享后执行的回调函数
                    // alert(1234);
                }
            });
            wx.onMenuShareTimeline({
                title: "秋果人文精品酒店",
                desc: "拿奖金，拿奖金，拿奖金，点开拿奖金",
                link: url,
                imgUrl: shareImg,
                type: "",
                dataUrl: "",
                success: function() {}
            });
            wx.getLocation({
                type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function(res) {
                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    setCookie("userLongitude", longitude);
                    that.longitude = longitude;
                    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    setCookie("userLatitude", latitude);
                    that.latitude = latitude;
                }
            });
        },
        // 获取当前位置
        getLocation() {
            this.cityname = "定位中...";
            this.$http({
                method: "POST",
                url: slt_location,
                data: {
                    longitude: this.longitude, // 经度
                    latitude: this.latitude //维度
                }
            }).then(res => {
                if (res.data.status == 1) {
                    let locationTmp = res.data.data;
                    this.cityname = locationTmp.city;
                    this.cityid = locationTmp.id;
                    this.address = locationTmp.address;
                } else {
                    this.cityname = "北京市";
                    this.myLocation = "定位失败...";
                }
            });
        },
        // city组件显示与否
        triggerCityDialog() {
            this.zbCityVisible = true;
        },
        // city组件中titlebar点击返回执行的函数
        cityTitleBackEmitFun() {
            this.zbCityVisible = false;
        },
        // 城市item被点击之后通过emit传过来执行的方法
        cityItemEmitFun(name, id) {
            this.zbCityVisible = false;
            // 给city相关数据重新赋值
            this.cityname = name;
            this.cityid = id;
        },
        // 触发日历dialog显示
        triggerCalendar() {
            this.zbCalendarVisible = true;
        },
        // 入住-离店
        clickToday(value) {
            this.zbCalendarVisible = false;
            // 入住时间
            let tmpStart = value[0].split("/");
            this.zbInitCalendar.start.yyyy = tmpStart[0];
            this.zbInitCalendar.start.mm = tmpStart[1];
            this.zbInitCalendar.start.dd = tmpStart[2];
            // 离店时间
            let tmpEnd = value[1].split("/");
            this.zbInitCalendar.end.yyyy = tmpEnd[0];
            this.zbInitCalendar.end.mm = tmpEnd[1];
            this.zbInitCalendar.end.dd = tmpEnd[2];
            //共几晚
            this.howManyNight = dateEndMinusStart(value[0], value[1]);
        },
        // 日历组件的title-若用户不选取日历，点击返回使日历弹窗消失
        calendarTitleBackEmitFun() {
            this.zbCalendarVisible = false;
        },
        // 提交
        submitFun() {
            this.$router.push({
                path: "/searchResult",
                query: {
                    cityname: this.cityname,
                    cityid: this.cityid,
                    liveinYYYY: this.zbInitCalendar.start.yyyy,
                    liveinMM: this.zbInitCalendar.start.mm,
                    liveinDD: this.zbInitCalendar.start.dd,
                    liveoutYYYY: this.zbInitCalendar.end.yyyy,
                    liveoutMM: this.zbInitCalendar.end.mm,
                    liveoutDD: this.zbInitCalendar.end.dd,
                    abstract: this.abstract,
                    longitude: this.longitude,
                    latitude: this.latitude
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
@import "../../assets/less/var.less";
// 最外层容器
.page-content {
    overflow: auto;
}
.banner-box {
    position: relative;
    // min-height: 162px;
    // max-height: 190px;
    background: url("../../assets/images/default/banner.jpg") no-repeat center
        center;
    background-size: 100% 100%;
}
// 用户预定区
.reserve-form {
    width: 100%;
    // height: 340px;
    background: #eff1f0;
    // padding: 10px 10px 0;
    padding: 10px;
    .reserve-wrap {
        background: #ffffff;
        padding: 0 12px 12px 12px;
        /* 目的地、位置选择区域css */
        .select-location {
            height: 67px;
            padding: 12px 0;
            display: flex;
            flex-direction: row;
            position: relative;
            .lf {
                flex: 1;
                height: 43px;
                position: relative;
                .dest-city {
                    width: 78px;
                    height: 43px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    .dest {
                        text-align: center;
                        line-height: 16px;
                        margin-bottom: 5px;
                        font-size: 12px;
                        color: #999999;
                    }
                    .city {
                        text-align: center;
                        height: 22px;
                        line-height: 22px;
                        font-size: 16px;
                        color: #333333;
                    }
                }
                // 城市选择，箭头的css
                .dest-city-arrow {
                    width: 10px;
                    height: 18px;
                    position: absolute;
                    top: 50%;
                    margin-top: -9px;
                    right: 0px;
                    img {
                        width: 10px;
                        height: 18px;
                    }
                }
            }
            .rg {
                width: 70px;
                height: 43px;
                padding-right: 12px;
                text-align: right;
                .my-location {
                    height: 43px;
                    vertical-align: top;
                    text-align: center;
                    float: right;
                    img {
                        width: 20px;
                        height: 20px;
                        margin: 3px 0;
                    }
                }
            }
            &::after {
                content: "";
                position: absolute;
                left: 0;
                bottom: 0;
                right: 0;
                height: 1px;
                background: @tabbarBorderColor;
                transform: scaleY(0.5);
            }
        }
        /* 入住离店区域的css */
        .time {
            height: 67px;
            padding: 12px 0;
            position: relative;
            .lf {
                width: 78px;
                height: 43px;
                float: left;
                display: flex;
                flex-direction: column;
                align-items: center;
                .instr {
                    text-align: center;
                    line-height: 16px;
                    margin-bottom: 5px;
                    font-size: 12px;
                    color: #999999;
                }
                .date {
                    text-align: center;
                    height: 22px;
                    line-height: 22px;
                    font-size: 16px;
                    color: #333333;
                }
            }
            .md {
                position: absolute;
                top: 50%;
                left: 50%;
                margin-left: -22px;
                margin-top: -11px;
                width: 44px;
                height: 22px;
                line-height: 22px;
                text-align: center;
                border-radius: 3px;
                border: 1px solid rgba(204, 204, 204, 1);
            }
            .rg {
                width: 78px;
                height: 43px;
                float: right;
                display: flex;
                flex-direction: column;
                align-items: center;
                .instr {
                    text-align: center;
                    line-height: 16px;
                    margin-bottom: 5px;
                    font-size: 12px;
                    color: #999999;
                }
                .date {
                    text-align: center;
                    height: 22px;
                    line-height: 22px;
                    font-size: 16px;
                    color: #333333;
                }
            }
            &:after {
                content: "";
                position: absolute;
                left: 0;
                bottom: 0;
                right: 0;
                height: 1px;
                background: @tabbarBorderColor;
                transform: scaleY(0.5);
            }
        }
        /* 关键词选择 */
        .search {
            height: 67px;
            padding: 12px 0;
            position: relative;
            .txt {
                width: 100%;
                height: 43px;
                display: block;
                padding: 5px 0 5px 8px;
                border: none;
                font-size: 13px;
            }
            &:after {
                content: "";
                position: absolute;
                left: 0;
                bottom: 0;
                right: 0;
                height: 1px;
                background: @tabbarBorderColor;
                transform: scaleY(0.5);
            }
        }
        /* 提交按钮 */
        .submit {
            height: 44px;
            line-height: 44px;
            margin-top: 14px;
            position: relative;
            background: rgba(48, 176, 151, 1);
            border-radius: 5px;
            font-size: 16px;
            text-align: center;
            color: rgba(255, 255, 255, 1);
            box-shadow: 0 4px 4px 0 #e5e5e5;
        }
    }
}
</style>