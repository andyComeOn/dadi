<template>
	<div class="search-result">
        <!-- 搜索条 -->
		<searchbar 
            @triggerCityDialogEmit="triggerCityDialogEmitFun"
            @triggerCalendarDialogEmit="triggerCalendarDialogEmitFun"
            :searchbarObj="toSearchbarObj">
        </searchbar>

        <!-- 排序 -->
		<sortbar></sortbar>

        <!-- 刷新用户所在地理位置 -->
		<refreshbar></refreshbar>
		
        <!-- 判断是否搜索到筛选条件的酒店 -->
		<noSearchResult v-show="true"></noSearchResult>
		
        <!-- 酒店组件 -->
		<roomItem :condition="watchObj"></roomItem>

        <!-- 城市组件dialog -->
        <mu-dialog width="360" transition="slide-right" fullscreen :open.sync="zbCityVisible">
            <City v-on:cityTitleBackEmit="cityTitleBackEmitFun"
                v-on:cityItemEmit="cityItemEmitFun">
            </City>
        </mu-dialog>

        <!-- 日历组件dialog -->
        <mu-dialog width="360" transition="slide-right" fullscreen :open.sync="zbCalendarVisible">
			<Calendar ref="Calendar" 
                :markDateMore="zbInitCalendar" 
                @isToday="clickToday"
                @calendarTitleBackEmit="calendarTitleBackEmitFun">
            </Calendar>
		</mu-dialog>



    </div>
</template>

<script>

import mHotelLocation from "../../components/hotel-location";
import roomItem from "../../components/room-item";
import searchbar from "../../components/searchbar";
import sortbar from "../../components/sortbar";
import refreshbar from "../../components/refresh-bar";
import noSearchResult from "../../components/no-search-result";
import {store_list} from '../../api/api';  
import City from "@/components/city/city.vue"; // 引入城市组件
import Calendar from "@/components/calendar/calendar.vue"; // 引入日历组件
export default {
    name: "search-result",
    components: {
        roomItem,
        searchbar,
        sortbar,
        refreshbar,
        noSearchResult,
        City,
        Calendar
    },
    props:{

    },
    data() {
        return {
            // 最终传给searchbar的对象
            toSearchbarObj:{
                

            },

            // 监听数据的变化，用来筛选满足条件的酒店列表
            watchObj: {
                cpid:'1',
                //正序、降序排列
                //type:'',
                // 经度
                //longitude:'',
                //维度
                //latitude:'',
                //城市
				city: '1',
				//排序（价格，距离）
                //px_rule:'',
                //门店名称
                //name: '',
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
            },
 
        };
    },
    created() {
        var urlPara =  {
            cityname:this.$route.query.cityname,
            cityid:this.$route.query.cityid,
            liveinYYYY:this.$route.query.liveinYYYY,
            liveinMM:this.$route.query.liveinMM,
            liveinDD:this.$route.query.liveinDD,
            liveoutYYYY:this.$route.query.liveoutYYYY,
            liveoutMM:this.$route.query.liveoutMM,
            liveoutDD:this.$route.query.liveoutDD,
            abstract:this.$route.query.abstract
        }
        // 将路由获得的一系列参数赋值给data()中的一个变量-getUrlPara
        this.toSearchbarObj = urlPara;

        // 日历初始赋值
        this.zbInitCalendar.start.yyyy = urlPara.liveinYYYY;
        this.zbInitCalendar.start.mm = urlPara.liveinMM;
        this.zbInitCalendar.start.dd = urlPara.liveinDD;
        this.zbInitCalendar.end.yyyy = urlPara.liveoutYYYY;
        this.zbInitCalendar.end.mm = urlPara.liveoutMM;
        this.zbInitCalendar.end.dd = urlPara.liveoutDD;
        
    },
    watch:{
        
    },
    mounted() {
        var param = this.watchObj;
        // this.fetchData(param);
        
    },
    methods: {
        // 加载数据
        fetchData(param) {
            this.$http({
                method: "POST",
                url: store_list,
                data:param
            }).then(res => {
                this.resData = res.data;
            });
        },
        
        // 搜索条组件中城市选择逻辑，子组件emit之后，执行的方法
        triggerCityDialogEmitFun(){
            this.zbCityVisible = true;
        },

        // 日期组件的title通过emit执行的方法
        cityTitleBackEmitFun(){
            this.zbCityVisible = false;
        },

        // 城市item被点击之后通过emit传过来执行的方法 
        cityItemEmitFun(name, id){
            console.log(name+'-'+id);
            this.zbCityVisible = false;
            // 更新监听对象（查询门店列表）中的值
            this.watchObj.city = id;
            // 给searchbar传值更新组件内容
            this.toSearchbarObj.cityname = name;
        },

        // 此页面中的searchbar组件的子组件emit之后执行的方法
        triggerCalendarDialogEmitFun(){
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
        },

    }
};
</script>

<style lang="less" scoped>

</style>