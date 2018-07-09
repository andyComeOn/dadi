<template>
	<div class="refreshbar-container">
		<div class="refreshbar-wrapper">
			<div class="lf">当前位置：霞光里社区</div>
			<div class="rg"><img src="../assets/images/ic-refresh.png" alt=""></div>
		</div>
		
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
			
		},
		data (){
			return {
				
			}
		},
		mounted () {
			
		},
		methods: {
			// 刷新
			sort(ind){
				this.active = ind;
			}
		}
	}

</script>
<style lang="less" scoped>

	@import '../assets/lib/swiper/css/swiper.css';

	.refreshbar-container {
		height: 32px;
		padding: 8px 15px;
		background: #EFF1F0;
		.refreshbar-wrapper {
			height: 16px;
			font-size: 12px;
			.lf {
				float: left;
				height: 16px;
				line-height: 16px;
				color: #999999;
				
			}
			.rg{
				width: 16px;
				height: 16px;
				float: right;
				img{
					width: 16px;
					height: 16px;
					vertical-align: top;
				}
			}
			
		}
	}

	
</style>