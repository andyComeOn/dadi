<template>
	<div class="nearby-page">
		<!-- 头部 -->
		<m-header title="附近的酒店" fixed class="is-fixed">
			<a href="javascript:;" slot="left">
				<img class="m-icon-img margin-right-10" src="../../assets/images/bak/ic_actionbar_search_icon.png" />
			</a>
			<a href="javascript:;" slot="right">
				<img class="m-icon-img" src="../../assets/images/bak/ic_chat_green.png" />
			</a>
		</m-header>

		<!-- 主内容区 -->
		<div class="page-content">
			<!-- 搜素条 -->
			<searchbar 
				@triggerCityDialogEmit="triggerCityDialogEmitFun"
				@triggerCalendarDialogEmit="triggerCalendarDialogEmitFun"
				:searchbarObj="toSearchbarObj">
        	</searchbar>

			<!-- 刷新用户所在地理位置 -->
			<refreshbar></refreshbar>

			<!-- 酒店组件 -->
			<roomItem :condition="watchObj"></roomItem>
			
		</div>
		
		<!-- tabbar -->
		<mTabbarFa></mTabbarFa>
	</div>
</template>

<script>
import mTabbarFa from "@/components/tabbarfa";
import mHeader from "@/components/header";
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
    name: "nearby",
    components: {
        roomItem,
        searchbar,
        sortbar,
        refreshbar,
        noSearchResult,
        City,
		Calendar,
		mHeader,
		mTabbarFa
		
	},
	data(){
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
		}
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
	mounted() {
		
	},
	methods:{
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


<style lang="less">
	.is-fixed ~ .page-content {
		padding-top: 44px;
		padding-bottom: 50px;
		height: 100%;
	}

	

</style>