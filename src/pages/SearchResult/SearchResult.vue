<template>
    <div class="searchResultPage m-position-ab">
        <!-- 搜索条 -->
        <searchbar @triggerCityDialogEmit="triggerCityDialogEmitFun" @triggerCalendarDialogEmit="triggerCalendarDialogEmitFun" @inputValEmit="inputValEmitFun" :searchbarObj="toSearchbarObj">
        </searchbar>
        <div class="coupon_hint" v-if="this.zbInitCalendar.is_type != 0">您当前使用电子房券进行预订，需要提前一天。</div>
        <!-- @triggerSearchbarInputFocusEmit="triggerSearchbarInputFocusEmitFun" -->
        <!-- searchbar中输入框获焦的emit的函数-暂不使用-注释 -->

        <!-- 排序 -->
        <sortbar @sortbarEmit="sortbarEmitFun">
        </sortbar>

        <!-- 刷新用户所在地理位置 -->
        <refreshbar @refreshEmit="refreshEmitFun" :refreshBarObj="toRefreshBarObj"> </refreshbar>

        <!-- 门店组件 -->
        <storeListItem :condition="watchObj"></storeListItem>

        <!-- 城市组件dialog -->
        <!-- <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="zbCityVisible">
            <City @cityTitleBackEmit="cityTitleBackEmitFun" @cityItemEmit="cityItemEmitFun" :longitude="toRefreshBarObj.longitude" :latitude="toRefreshBarObj.latitude">
            </City>
        </mu-dialog> -->

        <!-- 日历组件dialog -->
        <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="zbCalendarVisible">
            <Calendar ref="Calendar" :markDateMore="zbInitCalendar" @isToday="clickToday" @calendarTitleBackEmit="calendarTitleBackEmitFun">
            </Calendar>
        </mu-dialog>

        <!-- 搜索弹框组件dialog -->
        <!-- <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="zbSearchVisible"> -->
        <!-- <Search @cancelSearchEmit="cancelSearchEmitFun"> -->
        <!-- </Search> -->
        <!-- </mu-dialog> -->
    </div>
</template>

<script>
import mHotelLocation from "../../components/hotel-location";
import storeListItem from "@/components/store-list-item";
import searchbar from "../../components/searchbar";
import sortbar from "../../components/sortbar";
import refreshbar from "../../components/refresh-bar";
import { store_list } from "../../api/api";
import City from "@/components/city/city.vue"; // 引入城市组件
import Calendar from "@/components/calendar/calendar.vue"; // 引入日历组件
import Search from "@/components/search/search.vue"; // 引入搜索弹层组件
import { f, dateEndMinusStart, YTDLf, isBeforeDawn} from "@/utils/date"; // 引入封装时间函数
export default {
    name: "searchResultPage",
    components: {
        storeListItem,
        searchbar,
        sortbar,
        refreshbar,
        City,
        Calendar,
        Search
    },
    props: {},
    data() {
        return {
            toSearchbarObj: {}, // 最终传给searchbar的对象
            toRefreshBarObj: { longitude: "", latitude: "" }, // 最终传给refreshBar的对象
            // 监听数据的变化，用来筛选满足条件的酒店列表
            watchObj: {
                type: "SORT_ASC", //正序、降序排列
                longitude: "", // 经度
                latitude: "", //维度
                city: "", //城市id
                px_rule: "sort", //排序（价格，距离）
                name: "", //门店名称
                begin: "", // 入住时间
                finish: "", // 离店时间
                cpid:GlobalCpid,
                is_type:""
            },
            // 城市组件是否显示
            zbCityVisible: false,
            // 日历组件是否显示
            zbCalendarVisible: false,
            // 搜索组件是否显示
            zbSearchVisible: false,
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
                is_type:this.$route.query.is_type
            }
        };
    },
    created() {
        var Labour_time = new Date(1588291200000);
        var current_time= new Date(1588377600000);
        var urlPara;
        if(this.$route.query.liveinYYYY == "2020" && this.$route.query.liveinMM == "04" && this.$route.query.is_type != 0){
            urlPara = {
                cityname: this.$route.query.cityname,
                cityid: this.$route.query.cityid,
                liveinYYYY: f(Labour_time).yyyy,
                liveinMM: f(Labour_time).mm,
                liveinDD: f(Labour_time).dd,
                liveoutYYYY: f(Labour_time).yyyy,
                liveoutMM: f(Labour_time).mm,
                liveoutDD: f(current_time).dd,
                abstract: this.$route.query.abstract,
                longitude: this.$route.query.longitude,
                latitude: this.$route.query.latitude,
                is_type:this.$route.query.is_type
            };
        }else{
            urlPara = {
                cityname: this.$route.query.cityname,
                cityid: this.$route.query.cityid,
                liveinYYYY: this.$route.query.liveinYYYY,
                liveinMM: this.$route.query.liveinMM,
                liveinDD: this.$route.query.liveinDD,
                liveoutYYYY: this.$route.query.liveoutYYYY,
                liveoutMM: this.$route.query.liveoutMM,
                liveoutDD: this.$route.query.liveoutDD,
                abstract: this.$route.query.abstract,
                longitude: this.$route.query.longitude,
                latitude: this.$route.query.latitude,
                is_type:this.$route.query.is_type
            };
        }
        // searchbar组件的赋值
        this.toSearchbarObj = urlPara;
        // refreshBar组件赋值-使用cookie了,下面的2句代码是注销的，
        // 在11.5号发现城市组件的定位城市失败，原因是经纬度是'',
        // 思考这种应该用全局的cookie取经纬度才是合理的。
        this.toRefreshBarObj.longitude = urlPara.longitude;
        this.toRefreshBarObj.latitude = urlPara.latitude;
        // 日历初始赋值
        if(this.$route.query.liveinYYYY == "2020" && this.$route.query.liveinMM == "04" && this.$route.query.is_type != 0){
            this.zbInitCalendar.start.yyyy = f(Labour_time).yyyy;
            this.zbInitCalendar.start.mm = f(Labour_time).mm;
            this.zbInitCalendar.start.dd = f(Labour_time).dd;
            this.zbInitCalendar.end.yyyy = f(Labour_time).yyyy;
            this.zbInitCalendar.end.mm = f(Labour_time).mm;
            this.zbInitCalendar.end.dd = f(current_time).dd;
        }else{
            this.zbInitCalendar.start.yyyy = urlPara.liveinYYYY;
            this.zbInitCalendar.start.mm = urlPara.liveinMM;
            this.zbInitCalendar.start.dd = urlPara.liveinDD;
            this.zbInitCalendar.end.yyyy = urlPara.liveoutYYYY;
            this.zbInitCalendar.end.mm = urlPara.liveoutMM;
            this.zbInitCalendar.end.dd = urlPara.liveoutDD;
        }

        // 把路由带过来的入店-离店的时间info赋值给watchObj
        this.watchObj.begin = urlPara.liveinYYYY + "-" + urlPara.liveinMM + "-" + urlPara.liveinDD;
        this.watchObj.finish = urlPara.liveoutYYYY + "-" + urlPara.liveoutMM + "-" + urlPara.liveoutDD;
        this.watchObj.city = urlPara.cityid;
        this.watchObj.name = urlPara.abstract;
        this.watchObj.longitude = urlPara.longitude;
        this.watchObj.latitude = urlPara.latitude;
        this.watchObj.is_type = urlPara.is_type;
    },
    mounted() {
        //获取url上面的城市地址和id
        if(this.$route.query.city_id){
            this.toSearchbarObj.cityname = this.$route.query.city_name;
            this.toSearchbarObj.cityid = this.$route.query.city_id;
            this.watchObj.city = this.$route.query.city_id;
        }
    },
    methods: {
        // 搜索条组件中城市选择逻辑，子组件emit之后，执行的方法
        triggerCityDialogEmitFun() {
            this.$router.push({
                path:'city',
                query:{
                    longitude: this.longitude,
                    latitude: this.latitude,
                    cityInd:2,
                    liveinYYYY:this.$route.query.liveinYYYY,
                    liveinMM:this.$route.query.liveinMM,
                    liveinDD:this.$route.query.liveinDD,
                    liveoutYYYY:this.$route.query.liveoutYYYY,
                    liveoutMM:this.$route.query.liveoutMM,
                    liveoutDD:this.$route.query.liveoutDD,
                    abstract:this.$route.query.abstract,
                    is_type:this.$route.query.is_type,
                }
            });
            // this.zbCityVisible = true;
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

        // searchbar中输入框获焦的emit的函数-暂不使用-注释
        // triggerSearchbarInputFocusEmitFun() {
        //     this.zbSearchVisible = true;
        // },

        // 搜索组件（不是搜索条组件）右侧的取消按钮
        // cancelSearchEmitFun() {
        //     this.zbSearchVisible = false;
        // },

        // 搜索条组件传过来的emit方法执行的函数
        inputValEmitFun(val) {
            this.watchObj.name = val;
        },

        //排序sortbar组件emit之后执行的函数
        sortbarEmitFun(px_rule, priceSort) {
            this.watchObj.px_rule = px_rule;
            this.watchObj.type = priceSort;
        },

        // 刷新按钮通过emit传过来的方法
        refreshEmitFun(longitude, latitude) {
            this.watchObj.longitude = longitude;
            this.watchObj.latitude = latitude;
        }
    }
};
</script>

<style lang="less" scoped>
.searchResultPage {
    overflow: auto;
}
.coupon_hint{
    background:#fff;
    color: red;
    padding:0 15px;
    line-height: 20px;
    font-size: 12px;
}
</style>
