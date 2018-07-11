<template>
	<div class="index-page">
		<header class="m-header is-fixed is-bg top-search">
			<div class="search-wrap">
				<img src="../../assets/images/bak/ic_search_gray.png" alt="">
				<span class="placeholder">影视 图书 唱片 小组 舞台剧等</span>
				<img src="../../assets/images/bak/ic_scan_gray.png" alt="">
			</div>
			<div class="m-header-button is-right" style="text-align: center;width: 50px;">
				<a href="javascript:;">
					<img class="m-icon-img" src="../../assets/images/bak/ic_chat_white.png" />
				</a>
			</div>
		</header>
		<div class="page-content">
			<m-swipe swipeid="swipe01" :autoplay="1000" paginationDirection="right">
				<div class="swiper-slide " slot="swiper-con">
					<router-link to="/hotelDetail">
						<img src="../../assets/images/banner/01.jpg" alt="">
					</router-link>
				</div>
				<div class="swiper-slide " slot="swiper-con">
					<img src="../../assets/images/banner/02.jpg" alt="">
				</div>
				<div class="swiper-slide " slot="swiper-con">
					<img src="../../assets/images/banner/03.jpg" alt="">
				</div>
			</m-swipe>

			<!-- <m-cell title="提醒" icon>
				<img src="../../assets/images/ic_mine_notification.png" slot="icon">
				<a href="javascript:;" slot="cell-right"><img src="../../assets/images/ic_arrow_gray_small.png" alt=""></a>
      		</m-cell> -->
			<!-- <m-cell title="设置">
        		<a href="javascript:;" slot="cell-right"><img src="../../assets/images/ic_arrow_gray_small.png" alt=""></a>
			</m-cell> -->

			<!--热门-->
			<!-- <div class="hot-wrap">
				<m-cell title="热门" label="hot">
					<a href="javascript:;" slot="cell-right">更多
						<img src="../../assets/images/ic_arrow_gray_small.png" alt="">
					</a>
				</m-cell>
				<m-cell-media :author="item.target.author.name" :column="item.source_cn" :img="item.target.cover_url" v-for="(item,index) in hotData"
				 :key="item.id">
					<span slot="title">{{item.title}}</span>
					<span slot="describe">{{item.target.desc}}</span>
				</m-cell-media>
			</div> -->

			<!--推荐-->
			<!-- <div class="recommend-wrap">
				<m-cell title="推荐" label="recommend"></m-cell>
				<m-cell-media  :author="item.target.author.name" :column="item.source_cn" :bg="item.target.cover_url" v-for="(item,index) in recommendData" :key="item.id">
					<span slot="title">{{item.title}}</span>
					<span slot="describe">{{item.target.desc}}</span>
				</m-cell-media>
			</div> -->

			<!-- 预定 -->
			<div class="reserve-form">
				<div class="reserve-wrap">
					<!-- 位置选择 -->
					<div class="select-location">
						<div class="lf">
							<div class="dest-city">
								<span class="dest">目的地</span>
									<br>
								<span class="city">{{city}}</span>
							</div>
							<div class="dest-city-more">
								<img src="../../assets/images/arrows/ic-arrow_10_18.png" alt="">
							</div>
						</div>
						<div class="rg">
							<span class="my-location">
								<img src="../../assets/images/home_location.png" alt="">
								<br> 我的位置
							</span>
						</div>
					</div>
					<!-- 入住时间 -->
					<div class="time">
						<div class="lf">
							<span class="instr">入住</span>
							<br>
							<span class="date" @click="startDateDialogShow">{{dateStartInitVal}}</span>
							<!-- 入住时间 -->
							<mu-dialog width="360" transition="slide-right" fullscreen :open.sync="calendarVisible">
								<mu-appbar color="#30B097" title="请选择日期">
									<mu-button slot="right" flat  @click="startDateDialogHide">
										关闭
									</mu-button>
								</mu-appbar>
								<div style="padding: 24px 10px 0 10px;">
									<mu-flex justify-content="center" align-items="center" wrap="wrap">
										<mu-paper :z-depth="1" class="demo-date-picker">
											<mu-date-picker :date.sync="dateStartVal" @change="triggerStartDate" display-color="#30B097" color="#30B097"></mu-date-picker>
										</mu-paper>
									</mu-flex>
								</div>
							</mu-dialog>
						</div>
						<div class="md">
							共1晚
						</div>
						<div class="rg">
							<span class="instr">离店</span>
							<br>
							<span class="date" @click="endDateDialogShow">{{dateEndInitVal}}</span>
							<!-- 离开时间 -->
							<mu-dialog width="360" transition="slide-right" fullscreen :open.sync="calendarVisible">
								<mu-appbar color="#30B097" title="请选择日期">
									<mu-button slot="right" flat  @click="endDateDialogHide">
										关闭
									</mu-button>
								</mu-appbar>
								<div style="padding: 24px 10px 0 10px;">
									
									<mu-flex justify-content="center" align-items="center" wrap="wrap">
										<mu-paper :z-depth="1" class="demo-date-picker">
											<mu-date-picker :date.sync="dateEndVal" @change="triggerEndDate" display-color="#30B097" color="#30B097"></mu-date-picker>
										</mu-paper>
									</mu-flex>
								</div>
							</mu-dialog>
						</div>
					</div>
					<!-- 关键词搜索 -->
					<div class="search">
						<input type="text" class="txt" placeholder="请输入关键词／地址／商圈">
					</div>
					<!-- 提交按钮 -->
					<div class="submit" @click="submitFun">
						酒店预订
					</div>
				</div>
			</div>
		</div>
		<mTabbarFa></mTabbarFa>
	</div>
</template>

<script>
	
	import {formateToday,formateTomorrow,formatePara} from '../../utils/date';
	import mTabbarFa from '../../components/tabbarfa'
	// import mHeader from '../../components/header'
	import mSwipe from '../../components/swipe'
	export default {
		props: {
			// dateStartVal:{
			// 	type: Date,
			// 	default: function(){
			// 		// var d = new Date();
			// 		// var mm = (d.getMonth() + 1 < 10) ? '0' + (d.getMonth() + 1): (d.getMonth() + 1) ;
			// 		// var dd = d.getDate();
			// 		// return mm + '-' + dd
			// 		return new Date()
			// 	}
			// },

			// dateEndVal:{
			// 	type: Date,
			// 	default: function(){
			// 		// var d = new Date();
			// 		// var mm = (d.getMonth() + 1 < 10) ? '0' + (d.getMonth() + 1): (d.getMonth() + 1) ;
			// 		// var dd = d.getDate();
			// 		// return mm + '-' + dd

			// 		return new Date()
			// 	}
			// }

		},
		name: 'index',
		components: {
			mTabbarFa,
			// mHeader,
			mSwipe
		},
		data() {
			return {
				recommendData: [],
				hotData: [],
				orderForm: {
					startDate: '7-22',
					endDate: '7-33'
				},
				calendarVisible: false,

				dateStartInitVal : formateToday(),
				dateEndInitVal : formateTomorrow(),
				dateStartVal: new Date(),
				dateEndVal: new Date(),
				city:'北京'
				
			}
		},
		created() {
			// this.fetchData();
		},
		methods: {
			fetchData() {
				
			},
			// 
			startDateDialogShow() {
				this.calendarVisible = true;
			},
			startDateDialogHide() {
				this.calendarVisible = false;
			},
			// 触发入住
			triggerStartDate(date) {
				this.calendarVisible = false;
				this.dateStartInitVal = formatePara(date);
			},
			endDateDialogShow(){
				this.calendarVisible = true;
			},
			endDateDialogHide() {
				this.calendarVisible = false;
			},
			// 触发离开
			triggerEndDate(date) {
				this.calendarVisible = false;
				this.dateEndInitVal = formatePara(date);
				
			},
			// 提交搜索
			// this.$route.query.id
			submitFun(){
				this.$router.push({
					path: '/searchResult',
					query: {
						city: encodeURI(this.city),
						startDate:this.dateStartInitVal,
						endDate:this.dateEndInitVal
					}
				});
			}
		}
	}

</script>

<style lang="less" scoped>
	@import "../../assets/less/var.less";
	// 最外层容器
	.index-page {
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	header.m-header {
		padding: 0 0 0 10px;
	}

	.is-fixed ~ .page-content {
		padding-top: 44px;
		padding-bottom: 50px;
		height: 100%;
	}

	.top-search {
		.search-wrap {
			width: 100%;
			height: 30px;
			background: #fff;
			border-radius: 4px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #c0c0c0;
			padding: 0 12px;
			.placeholder {
				flex: 1;
				text-align: left;
				padding-left: 12px;
			}
			img {
				width: 20px;
				height: 20px;
			}
		}
	}

	.hot-wrap,
	.recommend-wrap {
		padding-top: 12px;
	}

	.reserve-form {
		width: 100%;
		height: 340px;
		background: #EFF1F0;
		padding: 10px;
		.reserve-wrap {
			background: #ffffff;
			padding: 0 12px 12px 12px;
			/* 选择位置 */
			.select-location {
				height: 67px;
				padding: 12px 0;
				display: flex;
				flex-direction: row;

				.lf {
					flex: 1;
					height: 43px;
					position: relative;
					.dest-city{
						position: relative;
						.dest {
							padding: 0 10px;
							display: inline-block;
							line-height: 16px;
							margin-bottom: 4px;
							font-size: 12px;
							color: #999999;
						}
						.city {
							padding: 0 15px;
							display: inline-block;
							line-height: 22px;
							font-size: 16px;
							color: #333333;
						}
					}
					.dest-city-more{
						width: 10px;
						height: 18px;
						position: absolute;
						top: 50%;
						margin-top:-9px; 
						right: -2px;
						img{
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
					.more {
						width: 20px;
						height: 43px;
						line-height: 43px;
						display: inline-block;
						img {
							display: inline-block;
							width: 20px;
							height: 20px;
						}
					}
					.my-location {
						height: 43px;
						vertical-align: top;
						text-align: center;
						float:right;
						img {
							width: 20px;
							height: 20px;
							margin: 3px 0;
						}
					}
				}
				&:after {
					content: '';
					position: absolute;
					left: 0;
					bottom: 0;
					right: 0;
					height: 1px;
					background: @tabbarBorderColor;
					transform: scaleY(0.5);
				}
			}
			/* 入住时间 */
			.time {
				height: 67px;
				padding: 12px 0;
				position: relative;
				.lf {
					width: 120px;
					height: 43px;
					float: left;
					.instr {
						padding: 0 10px;
						line-height: 16px;
						margin-bottom: 5px;
						font-size: 12px;
						color: #999999;
					}
					.date {
						padding: 0 15px;
						display: inline-block;
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
					width: 120px;
					height: 43px;
					padding-right: 12px;
					float: right;
					text-align: right;
					.instr {
						padding-right:0px; 
						display: inline-block;
						line-height: 16px;
						margin-bottom: 5px;
						font-size: 12px;
						color: #999999;
					}
					.date {
						padding-right:15px; 
						display: inline-block;
						height: 22px;
						line-height: 22px;
						font-size: 16px;
						color: #333333;
					}
				}
				&:after {
					content: '';
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
					content: '';
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
			}
		}
	}
</style>