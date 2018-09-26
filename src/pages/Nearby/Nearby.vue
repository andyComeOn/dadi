<template>
    <div class="nearby-page">
        <!--  -->
        <!-- m-position-ab这个class没添加 -->
        <!-- 主内容区 -->
        <div class="page-content pdbottom50 m-position-ab">
            <!-- 搜素条 -->
            <searchbar @triggerCityDialogEmit="triggerCityDialogEmitFun" @triggerCalendarDialogEmit="triggerCalendarDialogEmitFun" @inputValEmit="inputValEmitFun" :searchbarObj="toSearchbarObj">
            </searchbar>
            <!-- 刷新用户所在地理位置 -->
            <refreshbar @refreshEmit="refreshEmitFun" :refreshBarObj="toRefreshBarObj"> </refreshbar>
            <!-- 酒店组件 -->
            <roomItem :condition="watchObj"></roomItem>
        </div>
        <!-- tabbar -->
        <mTabbarFa></mTabbarFa>
        <!-- 城市组件dialog -->
        <mu-dialog width="360" transition="slide-right" fullscreen :open.sync="zbCityVisible">
            <City v-on:cityTitleBackEmit="cityTitleBackEmitFun" v-on:cityItemEmit="cityItemEmitFun" :longitude="toRefreshBarObj.longitude" :latitude="toRefreshBarObj.latitude">
            </City>
        </mu-dialog>
        <!-- 日历组件dialog -->
        <mu-dialog width="360" transition="slide-right" fullscreen :open.sync="zbCalendarVisible">
            <Calendar ref="Calendar" :markDateMore="zbInitCalendar" @isToday="clickToday" @calendarTitleBackEmit="calendarTitleBackEmitFun">
            </Calendar>
        </mu-dialog>
    </div>
</template>

<script>
import mTabbarFa from "@/components/tabbarfa";
import mHeader from "@/components/header";
import mHotelLocation from "@/components/hotel-location";
import roomItem from "@/components/room-item";
import searchbar from "@/components/searchbar";
import sortbar from "@/components/sortbar";
import refreshbar from "@/components/refresh-bar";
import { f, dateEndMinusStart } from "@/utils/date"; // 引入封装时间函数
import City from "@/components/city/city.vue"; // 引入城市组件
import Calendar from "@/components/calendar/calendar.vue"; // 引入日历组件
import { slt_location, wxShare } from "@/api/api";
import wx from "weixin-js-sdk";
import { getCookie, setCookie } from '@/utils/util';

export default {
    name: "nearby",
    components: {
        roomItem,
        searchbar,
        sortbar,
        refreshbar,
        City,
        Calendar,
        mHeader,
        mTabbarFa
    },
    data() {
        return {
            // 最终传给searchbar的对象
            toSearchbarObj: {
                cityname: "北京市",
                cityid: "2",
                liveinYYYY: this.$route.query.liveinYYYY,
                liveinMM: this.$route.query.liveinMM,
                liveinDD: this.$route.query.liveinDD,
                liveoutYYYY: this.$route.query.liveoutYYYY,
                liveoutMM: this.$route.query.liveoutMM,
                liveoutDD: this.$route.query.liveoutDD,
                abstract: ""
            },
            toRefreshBarObj: { longitude: "", latitude: "" }, // 最终传给refreshBar的对象
            // 监听数据的变化，用来筛选满足条件的酒店列表
            watchObj: {
                type: "SORT_ASC", //正序、降序排列
                longitude: "", // 经度
                latitude: "", //维度
                city: "2", //城市id
                px_rule: "sort", //排序（价格，距离）
                name: "", //门店名称
                begin: "", // 入住时间
                finish: "" // 离店时间
            },
            // 城市组件是否显示
            zbCityVisible: false,
            // 日历组件是否显示
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
        let longitudeTmp = getCookie("userLongitude");
        let latitudeTmp = getCookie("userLatitude");
        // 日历初始赋值
        var d = new Date();
        var dd = new Date();
        dd.setDate(dd.getDate() + 1);
        this.zbInitCalendar.start.yyyy = f(d).yyyy;
        this.zbInitCalendar.start.mm = f(d).mm;
        this.zbInitCalendar.start.dd = f(d).dd;
        this.zbInitCalendar.end.yyyy = f(dd).yyyy;
        this.zbInitCalendar.end.mm = f(dd).mm;
        this.zbInitCalendar.end.dd = f(dd).dd;
        // 附近酒店页-给searchbar赋值（默认是今天-明天）
        // 今天
        this.toSearchbarObj.liveinYYYY = f(d).yyyy;
        this.toSearchbarObj.liveinMM = f(d).mm;
        this.toSearchbarObj.liveinDD = f(d).dd;
        // 明天
        this.toSearchbarObj.liveoutYYYY = f(dd).yyyy;
        this.toSearchbarObj.liveoutMM = f(dd).mm;
        this.toSearchbarObj.liveoutDD = f(dd).dd;
        // 把searchbar默认的时间赋值给watchObj
        this.watchObj.begin = f(d).yyyy + "-" + f(d).mm + "-" + f(d).dd;
        this.watchObj.finish = f(dd).yyyy + "-" + f(dd).mm + "-" + f(dd).dd;
        this.watchObj.longitude = longitudeTmp;
        this.watchObj.latitude = latitudeTmp;
        // refreshBar组件赋值
        this.toRefreshBarObj.longitude = longitudeTmp;
        this.toRefreshBarObj.latitude = latitudeTmp;
    },
    mounted() {
        // this.getAppInfo();
    },
    methods: {
        // 搜索条组件中城市选择逻辑，子组件emit之后，执行的方法
        triggerCityDialogEmitFun() {
            this.zbCityVisible = true;
        },
        // 城市组件的title通过emit执行的方法
        cityTitleBackEmitFun() {
            this.zbCityVisible = false;
        },
        // 城市item被点击之后通过emit传过来执行的方法
        cityItemEmitFun(name, id) {
            this.zbCityVisible = false;
            // 更新监听对象（查询门店列表）中的值
            this.watchObj.city = id;
            // 给searchbar传值更新组件内容
            this.toSearchbarObj.cityname = name;
        },
        // 此页面中的searchbar组件的子组件emit之后执行的方法
        triggerCalendarDialogEmitFun() {
            this.zbCalendarVisible = true;
        },
        // 日历组件的title-若用户不选取日历，点击返回使日历弹窗消失
        calendarTitleBackEmitFun() {
            this.zbCalendarVisible = false;
        },
        // 入住-离店
        clickToday(value) {
            this.zbCalendarVisible = false;
            // 入住时间
            this.zbInitCalendar.start.yyyy = value[0].split("/")[0];
            this.zbInitCalendar.start.mm = value[0].split("/")[1];
            this.zbInitCalendar.start.dd = value[0].split("/")[2];
            // 离店时间
            this.zbInitCalendar.end.yyyy = value[1].split("/")[0];
            this.zbInitCalendar.end.mm = value[1].split("/")[1];
            this.zbInitCalendar.end.dd = value[1].split("/")[2];
            // 给searchbar重新赋值
            this.toSearchbarObj.liveinYYYY = value[0].split("/")[0];
            this.toSearchbarObj.liveinMM = value[0].split("/")[1];
            this.toSearchbarObj.liveinDD = value[0].split("/")[2];
            this.toSearchbarObj.liveoutYYYY = value[1].split("/")[0];
            this.toSearchbarObj.liveoutMM = value[1].split("/")[1];
            this.toSearchbarObj.liveoutDD = value[1].split("/")[2];
            // 给监听的watchObj，重新赋值
            this.watchObj.begin =
                value[0].split("/")[0] +
                "-" +
                value[0].split("/")[1] +
                "-" +
                value[0].split("/")[2];
            this.watchObj.finish =
                value[1].split("/")[0] +
                "-" +
                value[1].split("/")[1] +
                "-" +
                value[1].split("/")[2];
        },
        // 搜索条组件传过来的emit方法执行的函数
        inputValEmitFun(val) {
            this.watchObj.name = val;
        },
        // 刷新按钮通过emit传过来的方法
        refreshEmitFun(longitude, latitude) {
            this.watchObj.longitude = longitude;
            this.watchObj.latitude = latitude;
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
                    this.wxConfigMethod(
                        appId,
                        timestamp,
                        nonceStr,
                        signature,
                        tmpUrl
                    );
                })
                .catch(err => {});
        },
        // wx.config
        wxConfigMethod(appId, timestamp, nonceStr, signature, tmpUrl) {
            let that = this;
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: appId,
                timestamp: timestamp,
                nonceStr: nonceStr,
                signature: signature,
                jsApiList: ["getLocation"]
            });
            wx.getLocation({
                type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function(res) {
                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    that.longitude = longitude;
                    that.toRefreshBarObj.longitude = longitude;
                    that.watchObj.longitude = longitude;
                    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    that.latitude = latitude;
                    that.toRefreshBarObj.latitude = latitude;
                    that.watchObj.latitude = latitude;
                    that.getAddr(); // 在nearby页面，需要城市的id,所以拉取这个接口。
                }
            });
        },
        getAddr() {
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
                    this.toSearchbarObj.cityname = locationTmp.city;
                    this.watchObj.city = locationTmp.id;
                } else {
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
.page-content {
    overflow: auto;
}
</style>