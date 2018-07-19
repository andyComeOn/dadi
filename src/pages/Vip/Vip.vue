<template>
	<div class="vip-page">
		<div class="demo">
			<span @click="selectDate">{{zbInitDate[0].date}}</span>
			<span @click="selectDate">{{zbInitDate[1].date}}</span>
		</div>
		

		<mu-dialog width="360" transition="slide-right" fullscreen :open.sync="isVisible">
			<!-- <mu-appbar color="#30B097" title="请选择城市" class="city-dialog-hd">
				<mu-button flat slot="left" @click="close">关闭</mu-button>
			</mu-appbar> -->
			<div class="calendar-box">
				<Calendar ref="Calendar" :markDateMore="zbInitDate" v-on:isToday="clickToday" ></Calendar>
			</div>
            
        </mu-dialog>
		
		

	</div>

</template>

<script>
import Calendar  from '@/components/calendar/calendar.vue';
import {formateToday, formateTomorrow}  from '@/utils/date';
export default {
    name: "vip",
    components: {
		Calendar
	},
	data (){
		return {
			isVisible : false,
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
		selectDate (){
			this.isVisible = true;
		},
		clickToday(data) {
			this.isVisible = false;
			this.zbInitDate[0].date = data[0];
			this.zbInitDate[1].date = data[1];
		},
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

.calendar-box {
	position: absolute;
	width: 100%;
	top: 0;
	bottom: 0;
	overflow: auto;
}

</style>