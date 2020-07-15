<template>
    <div class="indexPage">
        <!-- 主内容-->
        <div class="page-content">
            <!-- 轮播 -->
            <div class="banner-box" id="indexBanner" :style="{height: indexBannerH + 'px'}">
                <swiper class="zb-swiper" :options="swiperIndexOption" ref="mySwiper" @someSwiperEvent="swiperCallback(1)">
                    <swiper-slide v-for="item in bannerList" :key="item.id" @click="swiperSlideFun(item.id)">
                        <a v-if="!item.url == ''" :href="item.url">
                            <img :src="item.img" alt="" style="width:100%;">
                        </a>
                        <img v-else :src="item.img" alt="" style="width:100%;">
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
                                <img src="../../assets/images/arrows/list－更多icon@1x.png" alt="">
                            </div>
                        </div>
                            <div class="rg" @click="fetchLocation">
                                <span class="my-location">
                                    <img src="../../assets/images/home_location.png" alt=""><br>我的位置
                                </span>
                            </div>
                    </div>
                    <!-- 入住和离店 -->
                    <div class="time" :class="{beforeDawnAddclass: isBeforeDawn}">
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
                        <div class="beforeDawnOrderRoomBar" :class="{beforeDawnAddclass: isBeforeDawn}">
                            今晨6点前入住，请选择{{yesterday|filterTimeMM}}月{{yesterday|filterTimeDD}}日入住
                            <img src="../../assets/images/icon/ic-dawn-arrow.png" class="TaArrow" alt="">
                        </div>
                    </div>
                    <!-- 关键词搜索 -->
                    <div class="search">
                        <input type="text" class="txt" v-model="abstract" placeholder="请输入关键词／地址／商圈">
                    </div>
                    <!-- 提交按钮 -->
                    <template>
                        <div class="store_reserve_btn">
                            <div class="submit store_btn" @click="submitFun(0)">酒店预订</div>
                        </div>
                    </template>
                    <!-- str -- 房券使用 -- str -->
                    <template v-if="this.is_company == 1 || this.is_company == 3">
                        <div class="store_reserve_btn">
                            <div class="submit unit_btn" @click="submitFun(1)">单位房券预订</div>
                        </div>
                    </template>
                    <template v-if="this.is_company == 2 || this.is_company == 3">
                        <div class="store_reserve_btn">
                            <div class="submit personage_btn" @click="submitFun(2)">个人房券预订</div>
                        </div>
                    </template>
                    <!-- end -- 房券使用 -- end -->
                </div>
            </div>
        </div>
        <!-- 用户首次进入组件 -->
        <!-- <mUserFirstIn :isVisible="userComeInIsVisible" @userFirstInEmit="userFirstInEmitFun"></mUserFirstIn> -->
        <!-- 引入底部tabbar -->
        <mTabbarFa></mTabbarFa>
        <!-- 城市组件dialog -->
        <!-- <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="zbCityVisible">
            <City @cityTitleBackEmit="cityTitleBackEmitFun" @cityItemEmit="cityItemEmitFun" :longitude="longitude" :latitude="latitude">
            </City>
        </mu-dialog> -->
        <!-- 日历组件dialog -->
        <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="zbCalendarVisible">
            <Calendar ref="Calendar" :markDateMore="zbInitCalendar" @isToday="clickToday" @calendarTitleBackEmit="calendarTitleBackEmitFun">
            </Calendar>
        </mu-dialog>
    </div>
</template>

<script>
import { DistributionBanner, slt_location, wxShare } from "@/api/api"; // 引入api
import { f, dateEndMinusStart, YTDLf, isBeforeDawn} from "@/utils/date"; // 引入封装时间函数
import { getCookie, setCookie } from "@/utils/util";
import mTabbarFa from "@/components/tabbarfa";
import { swiper, swiperSlide } from "vue-awesome-swiper"; // 引入swipe组件
import City from "@/components/city/city.vue"; // 引入城市组件
import Calendar from "@/components/calendar/calendar.vue"; // 引入日历组件
import mUserFirstIn from "@/components/user-first-in.vue"; // 引入"用户首次进入toast"组件
import { getUrlParam } from "@/utils/util.js";
import wx from "weixin-js-sdk";

export default {
    name: "index",
    components: {
        mTabbarFa,
        swiper,
        swiperSlide,
        City,
        Calendar,
        mUserFirstIn
    },
    data() {
        let isYouzan = "";
        if (getCookie("isYouzan") == 0 || getCookie("isYouzan") == undefined || getCookie("isYouzan") == "") {
            isYouzan = false;
        } else {
            isYouzan = true;
        }
        return {
            swiperIndexOption: {
                notNextTick: true,
                autoplay: 2000,
                loop:true,
                grabCursor : true,
                setWrapperSize :true,
                autoHeight: true,
                pagination : '.swiper-pagination',
                paginationType: "custom",  //自定义-分页器样式类型（前提）
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
                paginationClickable :true,
                mousewheelControl : true,
                debugger: true,
                observer:true,
                observeParents:true,
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
                },
                is_type:0
            },
            howManyNight: "", // 入住-离店共几晚
            appId: "", // 必填，公众号的唯一标识
            timestamp: "", // 必填，生成签名的时间戳
            nonceStr: "", // 必填，生成签名的随机串
            signature: "", // 必填，签名
            url: "", //分享之后link的url
            cityname: "定位中...", // 城市名称
            cityid: "", // 城市id
            abstract: "", //搜索关键字
            longitude: "", //116.309408
            latitude: "", //39.966051
            address: "", // 地址精确到街道
            userComeInIsVisible : isYouzan, // 是否是有赞用户
            isBeforeDawn: false,  // 凌晨定房提示
            yesterday: "",
            is_company:""  // 普通 单位 个人
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

        // 凌晨订房提示逻辑
        if (isBeforeDawn() == true) {
            this.isBeforeDawn = true;
        } else {
            this.isBeforeDawn = false;
        }
        // 获取当前日期的昨天
        this.yesterday = YTDLf().kebab;
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
        //获取url上面的城市地址和id
        if(this.$route.query.city_id){
            this.cityname = this.$route.query.city_name;
            this.cityid = this.$route.query.city_id;
        }else{
            this.fetchLocation();       //获取当前位置
        }
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
                    this.is_company = res.data.data.is_company;
                }
            });
        },
        // banner中js设置宽高
        setBannerSize() {
            let indexBanner = document.querySelector("#indexBanner");
            let indexBannerW = indexBanner.clientWidth;
            let indexBannerH = (indexBannerW * 380) / 750;
            this.indexBannerH = indexBannerH;
        },
        // 用户第一次进入子组件emit过来执行的方法
        // userFirstInEmitFun(status){
        //     if (status == false) {
        //         this.userComeInIsVisible = false;
        //     }
        // },
        // 获取公众号的配置info
        getAppInfo() {
            var dataObj = {
                url: location.href.split("#")[0]
            };
            this.$http({
                url: wxShare,
                method: "POST",
                data: dataObj
            }).then(res => {
                if (res.data.status == 1) {
                    this.appId = res.data.data.appid;
                    this.timestamp = res.data.data.timestamp;
                    this.nonceStr = res.data.data.noncestr;
                    this.signature = res.data.data.signature;
                    // this.url = res.data.data.url;
                    this.url = window.location.href;
                    // wx分享config配置
                    this.wxConfigMethod(
                        res.data.data.url,
                        res.data.data.share_img
                    );
                }
            });
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
                    "getLocation"
                ]
            });
            wx.ready(function() {
                wx.onMenuShareAppMessage({
                    title: "秋果人文精品酒店", // 分享标题
                    desc: "拿奖金，拿奖金，拿奖金，点开拿奖金", // 分享描述
                    link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: shareImg, // 分享图标
                    type: "", // 分享类型,music、video或link，不填默认为link
                    dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
                    success: function() {
                        // 用户点击了分享后执行的回调函数
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
                    type: "gcj02", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: function(res) {
                        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                        setCookie("userLongitude", longitude);
                        that.longitude = longitude;
                        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                        setCookie("userLatitude", latitude);
                        that.latitude = latitude;
                    }
                });
            });
        },
        // 获取当前位置
        fetchLocation() {
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
                    this.cityid = "2";
                }
            });
        },
        // city组件显示与否
        triggerCityDialog() {       //cityInd  1首页  2酒店列表  3附近酒店
            // this.zbCityVisible = true;
            this.$router.push({path:'city',query:{longitude:this.longitude,latitude:this.latitude,cityInd:1}});
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
        submitFun(isCompany) {
            let _strDate = new Date(this.zbInitCalendar.start.yyyy + '/' + this.zbInitCalendar.start.mm + '/' + this.zbInitCalendar.start.dd);
			let _endDate = new Date(this.zbInitCalendar.end.yyyy + '/' + this.zbInitCalendar.end.mm + '/' + this.zbInitCalendar.end.dd);
            _strDate.setDate(_strDate.getDate());
            _endDate.setDate(_endDate.getDate());
            this.$router.push({
                path: "/searchResult",
                query: {
                    cityname: this.cityname,
                    cityid: this.cityid,
                    liveinYYYY: f(_strDate).yyyy,
                    liveinMM: f(_strDate).mm,
                    liveinDD: f(_strDate).dd,
                    liveoutYYYY: f(_endDate).yyyy,
                    liveoutMM: f(_endDate).mm,
                    liveoutDD: f(_endDate).dd,
                    abstract: this.abstract,
                    longitude: this.longitude,
                    latitude: this.latitude,
                    is_type: isCompany
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/var";
@import "./Index";
</style>
