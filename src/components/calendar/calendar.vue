<template>
	<section class="zCalendarContainer" :class="{calendarBroadcastisShow: isVisible}">
		<!-- 增添navbar -->
		<div class="navbar">
			<div class="lf" @click="wh_title_back_fun">返回</div>请选择时间
		</div>
		<!-- 增加凌晨订房tips的占位 -->
		<div class="calendarBroadcast" :class="{calendarBroadcastisShow: isVisible}">
			<myBroadcast></myBroadcast>
		</div>
		<!-- 星期几区域 -->
		<div class="zCalendarWeekBar" :class="{calendarBroadcastisShow: isVisible}">
			<div class="zCalendarWeekBarBox">
				<div class="weekItem" v-for="(tag,index) in textTop" :key="index">{{tag}}</div>
			</div>
		</div>
		<!-- 日历主内容区 -->
		<div class="zCalendarContent" v-for="(itemt,index) in list" :key="index">
			<div class="zCalendarMonthBar">{{itemt.dateTop}}</div>
			<div class="zCalendarDateWrap">  
				<div class="zCalendarDate">
					<div class="dateItem" 
						v-for="(item,index) in itemt.arry" 
						:key="index" 
						@click="clickDay(item)" 
						v-bind:class="[{selected: item.isSelected}, 
						{selectB: item.isLeave}, 
						{selectA: item.isCheckIn},
						{weekend: item.isWeekend},
						{forbiddenClick: item.isBeforeTodayAndAfterBigDayDate}]">
						<!-- {{(item.isToday) ? "今天": (item.id)}} -->
						<span>{{(item.id)}}</span>
						<span>{{(item.isCheckIn) ? "入住" : (item.isLeave ? "离店" : '')}}</span>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
	import timeUtil from './calendar';
	import myBroadcast from "@/components/broadcast";
	import { f, dateEndMinusStart, YTDLf, isBeforeDawn} from "@/utils/date"; // 引入封装时间函数
	export default {
		components:{
			myBroadcast
		},
		data() {
			return {
				textTop: ['日', '一', '二', '三', '四', '五', '六'],
				myDate: "",
				list: [],
				dateTop: '',
				startDate: '',
				endDate: '',
				isVisible: false
			};
		},
		props: {
			markDateMore: {
				type: Object,
				default: () => {}
			}
		},
		created() {
			this.myDate = new Date();
			if (this.myDate.getHours() < 6) {
				this.isVisible = true; 
			} else {
				this.isVisible = false;
			}
		},
		methods: {
			// 用户选取入住、离店的点击函数
			clickDay: function (item) {
				if (this.startDate && this.endDate) {
					return;
				}
				// 今天之前、可点击item之后的日期不能被点击
				if (item.isBeforeTodayAndAfterBigDayDate) {
					return;
				}

				if (!this.startDate) {
					this.startDate = item.date;
					this.getList(this.myDate, item.date, item.date);
					return;
				}
				if (timeUtil.timeChange(item.date) <= timeUtil.timeChange(this.startDate)) {
					this.startDate = item.date;
					this.getList(this.myDate, item.date, item.date);
					return;
				}
				if (!this.endDate) {
					this.endDate = item.date;
					this.getList(this.myDate, this.startDate, this.endDate);
				}
				var that = this;
				setTimeout(function () {
					that.$emit('isToday', [that.startDate, that.endDate]);
				}, 500)
			},
			// 从当前的日期所在月获取其后四个月（包含当前日期所在月）
			getList: function (date, pam1, pam2) {
				let arr = timeUtil.getMonthListNoOther(date, pam1, pam2);
				this.list = arr;
			},
			// 日历组件的title-若用户不选取日历，点击返回使日历弹窗消失
			wh_title_back_fun(){
				this.$emit('calendarTitleBackEmit');
			}
		},
		mounted() {
			if(this.markDateMore.is_type != 0){
				//五一零点毫秒数
				var Labour_time = new Date(1588284001000);
				var _LabourTime = Labour_time.getTime();
				var current_time= new Date();
				var _currentTime = current_time.getTime()
				if(_currentTime >= _LabourTime){ //当前时间大于五一时间时 给插件传当前时间  否则传五一时间
					current_time = current_time.setDate(current_time.getDate()+1);
					current_time = new Date(current_time);
					this.myDate = new Date(current_time);
				}else{
					Labour_time = Labour_time.setDate(Labour_time.getDate());
					Labour_time = new Date(Labour_time);
					this.myDate = new Date(Labour_time);
				}
			}
			this.getList(this.myDate, this.markDateMore.start.yyyy + '/' + this.markDateMore.start.mm + '/' + this.markDateMore.start.dd, this.markDateMore.end.yyyy + '/' + this.markDateMore.end.mm + '/' + this.markDateMore.end.dd);
		},
		watch: {
			markDateMore: {
				handler: function () {
					this.startDate = '';
					this.endDate = '';
					this.getList(this.myDate, this.markDateMore.start.yyyy + '/' + this.markDateMore.start.mm + '/' + this.markDateMore.start.dd, this.markDateMore.end.yyyy + '/' + this.markDateMore.end.mm + '/' + this.markDateMore.end.dd);
				},
				deep: true   
			}
		}
	};
</script>


<style lang='less'>
	.zCalendarContainer {
		position: absolute;
		width: 100%;
		top: 0;
		bottom: 0;
		overflow: auto;
		padding-top: 84px;
		&.calendarBroadcastisShow {
			padding-top: 120px;
		}
	}
	// 返回的navbar
	.navbar {
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 2;
		padding: 0 15px;
		line-height: 44px;
		text-align: center;
		background: #ccc;
		.lf {
			position: absolute;
            line-height: 44px;
            left: 15px;
            top: 0;
		}
	}
	// 日历中出现凌晨退房提示
	.calendarBroadcast {
		display: none;
		position: fixed;
		left: 0;
		right: 0;
		top: 44px;
		height: 36px;
		z-index: 2;
		&.calendarBroadcastisShow {
			display: block;
		}
	}
	
	.zCalendarWeekBar {
		background: #f4f4f4;
		position: fixed;
		top: 44px;
		left: 0;
		width: 100%;
		z-index: 2;
		&.calendarBroadcastisShow {
			top: 80px;
		}
	}
	.zCalendarWeekBarBox {
		padding: 0 15px;
		display: flex;
		// flex-wrap: wrap;
		flex-direction: row;
	}

	.weekItem {
		// width: 14.28%;
		line-height: 40px;
		flex: 1;
		text-align: center;
		color: #666;
		font-size: 14px;
	}

	.weekItem:nth-of-type(1) {
		color: rgba(48,176,151,1);
	}

	.weekItem:nth-last-child(1) {
		color: rgba(48,176,151,1);
	}
	
	.zCalendarMonthBar {
		padding: 0 15px;
		line-height: 40px;
		color: #666;
		font-size: 14px;
		text-align: center;
	}

	.zCalendarContent {
		background-color: #ffffff;
		padding-bottom: 8px;
	}

	.zCalendarDateWrap {
		padding: 0 15px;
	}

	.zCalendarDate {
		display: flex;
		flex-wrap: wrap;
		// position: relative;
	}

	.dateItem {
		width: 14.28%;
		height: 40px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		color: black;
		position: relative;
		font-size: 12px;
		margin-bottom: 12px; 
	}

	// .dateItem > div {
	// 	width: 100%;
	// 	height: 100%;
	// }
	.dateItem span {
		width: 100%;
		line-height: 20px;
	}

	.dateItem.weekend {
		color: #FFBA56;
	}

	.dateItem.forbiddenClick {
		color: #999;
	}

	.dateItem.selected {
		background-color: rgba(48,176,151,0.3);
	}

	.dateItem.selectB {
		background-color: rgba(48,176,151,1);
		color: #fff;
		border-radius: 0 3px 3px 0;
	}
	.dateItem.selectA {
		background-color: rgba(48,176,151,1);
		color: #fff;
		
		border-radius: 3px 0 0 3px;
	}
	.wh_jiantou1 {
		width: 12px;
		height: 12px;
		border-top: 2px solid #ffffff;
		border-left: 2px solid #ffffff;
		transform: rotate(-45deg);
	}
</style>
