<template>
	<div class="calendar-container">
		<mu-container>
			<mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="isVisible">
				<mu-appbar color="#30B097" title="请选择日期">
					<mu-button slot="right" flat  @click="dialogHide">
						关闭
					</mu-button>
				</mu-appbar>
				<div style="padding: 24px 10px 0 10px;">
					<mu-container>
						<mu-flex justify-content="center" align-items="center" wrap="wrap">
							<mu-paper :z-depth="1" class="demo-date-picker">
								<mu-date-picker :date.sync="selectVal" @change="triggerChange" display-color="#30B097" color="#30B097"></mu-date-picker>
							</mu-paper>
						</mu-flex>
					</mu-container>
				</div>
			</mu-dialog>
		</mu-container>
	</div>
</template>
<script>
	// import '../assets/lib/swiper/js/swiper.js'
	export default {
		props: {
			swipeid: {
				type: String,
				default: ''
			},
			transition: {
				type: String,
				default: 'slide-bottom'
			},
			dialogHide: {
				type: Function
				
			},
			isVisible: {
				type: Boolean,
				default: false
			},
			autoplay: {
				type: Number,
				default: 5000,
			},
			paginationType: {
				type: String,
				default: 'bullets'
			},
			pagination: {
				type: Boolean,
				default: true
			},
			paginationDirection: {
				type: String,
				default: 'center'
			}
		},
		data (){
			return {

			}
		},
		mounted() {
			var That = this;
			new Swiper('.' + That.swipeid, {
				//循环
				loop: That.loop,
				//分页器
				pagination: '.swiper-pagination',
				//分页类型
				paginationType: That.paginationType, //fraction,progress,bullets
				//自动播放
				autoplay: That.autoplay,
				//方向
				direction: That.direction,
				//特效
				effect: That.effect, //slide,fade,coverflow,cube
				//用户操作swiper之后，是否禁止autoplay
				autoplayDisableOnInteraction: false,
			})
		}
	}

</script>
<style lang="less">
	@import '../assets/lib/swiper/css/swiper.css';

	.swiper-container img {
		width: 100%
	}

	.swiper-pagination-bullet-active {
		background: #fff;
	}
</style>