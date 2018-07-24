<style lang='less'>
	.wh_container {
		position: absolute;
		width: 100%;
		top: 0;
		bottom: 0;
		overflow: auto;
		padding-top: 84px;
	}

	.wh_title {
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 2;
		padding: 0 15px;
		height: 44px;
		line-height: 44px;
		text-align: center;
		background: #ccc;
		.lf {
			float: left;
		}
	}
	.wh_content_head {
		background: #f4f4f4;
		position: fixed;
		top: 44px;
		left: 0;
		width: 100%;
		z-index: 2;
	}

	.wh_top_changge {
		padding: 0 15px;
	}

	.wh_top_changge li {
		line-height: 20px;
		padding: 10px 0;
		color: #666;
		font-size: 14px;
		text-align: center;
		list-style: none;
	}

	.wh_content_all {
		font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
		"Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
		background-color: #ffffff;
		width: 100%;
		overflow: hidden;
		padding-bottom: 8px;
	}

	.wh_content {
		width: 100%;
		padding: 0 15px;
	}

	.wh_content_wrap {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		position: relative;

	}
	.wh_content_wrap::after{
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		height: 1px;
		background: #e5e5e5;
		transform: scaleY(0.5);
	}

	.wh_content_wrap_weekday::after{
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		height: 0;
		background: #e5e5e5;
		transform: scaleY(0.5);
	}

	.wh_content_wrap_weekday .wh_content_item {
		margin-bottom: 0;
	}

	.wh_content_item .wh_weekend {
		color: #FFBA56;
	}

	.wh_content_item .wh_not_click {
		color: #999;
	}

	.wh_content .selectDay {
		background-color: #30B097;
		opacity: 0.5;
	}

	.wh_content .selectB {
		background-color: #30B097;
		opacity: 0.5;
		color: #fff;
	}

	.wh_content .selectA {
		background-color: #30B097;
		opacity: 1.0;
		color: #fff;
	}

	
	.wh_content_item {
		width: 14.28%;
		height: 40px;
		text-align: center;
		color: black;
		position: relative;
		font-size: 14px;
		margin-bottom: 12px; 
	}

	.wh_top_tag {
		width: 100%;
		height: 40px;
		line-height: 40px;
		font-size: 14px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.wh_item_date {
		width: 100%;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.wh_jiantou1 {
		width: 12px;
		height: 12px;
		border-top: 2px solid #ffffff;
		border-left: 2px solid #ffffff;
		transform: rotate(-45deg);
	}

	.wh_jiantou1:active,
	.wh_jiantou2:active {
		border-color: #ddd;
	}

	.wh_jiantou2 {
		width: 12px;
		height: 12px;
		border-top: 2px solid #ffffff;
		border-right: 2px solid #ffffff;
		transform: rotate(45deg);
	}



	
</style>
<template>
	<section class="wh_container">
		<!-- 日历组件 -->
		<div class="wh_title">
			<!-- <div class="calendar-components-head"> -->
				<div class="lf" @click="wh_title_back_fun">返回</div>请选择时间
			<!-- </div> -->
		</div>
		<!-- 星期几区域 -->
		<div class="wh_content_head">
			<div class="wh_content">
				<div class="wh_content_wrap wh_content_wrap_weekday">
					<div class="wh_content_item" v-for="(tag,index) in textTop" :key="index">
						<div class="wh_top_tag">{{tag}}</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 日历主内容区 -->
		<div class="wh_content_all" v-for="(itemt,index) in list" :key="index">
			<div class="wh_top_changge">
				<li class="wh_content_li">{{itemt.dateTop}}</li>
			</div>
			<div class="wh_content">
				<div class="wh_content_wrap">
					<div class="wh_content_item" v-for="(item,index) in itemt.arry" :key="index" @click="clickDay(item,index)" v-bind:class="[{ selectDay: item.isSelected},{ selectB: item.isLeave},{ selectA: item.isHome}]">
						<div class="wh_item_date" v-bind:class="[{wh_weekend:item.isWeekDay},{wh_not_click:item.isBeforeTodayAndAfterBigDayDate}]">
							{{(item.isToday)?"今天":item.id}} <br>
							{{(item.isHome)?"入住":(item.isLeave?"离店":'')}}
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
	import timeUtil from './calendar';
	export default {
		data() {
			return {
				textTop: ['日', '一', '二', '三', '四', '五', '六'],
				myDate: [],
				list: [],
				dateTop: '',
				startDate: '',
				endDate: ''
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
		},
		methods: {
			// 用户选取入住、离店的点击函数
			clickDay: function (item, index) {
				if (this.startDate && this.endDate) {
					return;
				}
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
				this.$emit('titleBackEmit');
			}
		},
		mounted() {
			// this.getList(this.myDate, this.markDateMore[0].date, this.markDateMore[1].date);
			// this.getList(this.myDate, this.markDateMore[0].date, this.markDateMore[1].date);
			this.getList(this.myDate, this.markDateMore.start.yyyy + '/' + this.markDateMore.start.mm + '/' + this.markDateMore.start.dd , this.markDateMore.end.yyyy + '/' + this.markDateMore.end.mm + '/' + this.markDateMore.end.dd);
		
		},
		watch: {
			markDateMore: {
				handler: function () {
					this.startDate = '';
					this.endDate = '';
					this.getList(this.myDate, this.markDateMore.start.yyyy + '/' + this.markDateMore.start.mm + '/' + this.markDateMore.start.dd , this.markDateMore.end.yyyy + '/' + this.markDateMore.end.mm + '/' + this.markDateMore.end.dd);
				},
				deep: true   
			}
		}
	};
</script>