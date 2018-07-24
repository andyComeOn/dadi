<template>
	<div class="vip-page">
		<div class="demo">
			<span @click="triggerCalendar">{{zbInitDate[0].date}}</span>
			<span @click="triggerCalendar">{{zbInitDate[1].date}}</span>
		</div>
		

		<mu-dialog width="360" transition="slide-right" fullscreen :open.sync="zbCalendarVisible">
			
			<!-- <div class="calendar-components-head">
				<div class="lf" @click="zbCalendarVisible = false">返回</div>请选择时间
			</div> -->

			<!-- <div class="calendar-components-body"> -->
				<Calendar ref="Calendar" :markDateMore="zbInitDate" v-on:isToday="clickToday" v-on:titleBackEmit="titleBackFun"></Calendar>
			<!-- </div> -->
        </mu-dialog>
		
		
	</div>

</template>

<script>
import Calendar  from '@/components/calendar/calendar.vue';
import {formateToday, formateTomorrow,YTDkebab}  from '@/utils/date';
export default {
    name: "vip",
    components: {
		Calendar
	},
	data (){
		return {
			zbCalendarVisible : false,
			date: '',
			zbInitDate: [
				{
					date: "",
					className: "mark1"
				},
				{
					date: "",
					className: "mark2"
				}
			]
		}
	},
	created() {
		this.date = new Date();
		this.zbInitDate[0].date = 
			this.date.getFullYear() +
			"/" +
			(this.date.getMonth() + 1) +
			"/" +
			this.date.getDate();
		
		this.zbInitDate[1].date = 
			this.date.getFullYear() +
			"/" +
			(this.date.getMonth() + 1) +
			"/" +
			(this.date.getDate() + 1);
		// this.zbInitDate[0].date = formateToday();
		// this.zbInitDate[1].date = formateTomorrow();
	},
	methods : {
		// 出发日历显示
		triggerCalendar (){
			this.zbCalendarVisible = true;
		},
		
		// 日历的选取
		clickToday(data) {
			this.zbCalendarVisible = false;
			this.zbInitDate[0].date = data[0];
			this.zbInitDate[1].date = data[1];
		},
		// 日历组件的title-若用户不选取日历，点击返回使日历弹窗消失
		titleBackFun(){
			this.zbCalendarVisible = false;
		}
	}
};
</script>


<style lang="less" scoped>
.demo {
	height:30px;
	line-height: 30px;
	background: palevioletred; 
	span {
		margin-right:20px; 
		background: tan;
	}
} 

.calendar-components-head {
	background: #ccc;
	padding: 0 15px;
	line-height: 44px;
	text-align: center;
	.lf {
		float: left;
	}
} 

.calendar-components-body {
	position: absolute;
	width: 100%;
	top: 44px;
	bottom: 0;
	overflow: auto;
}

</style>