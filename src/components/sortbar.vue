<template>
	<div class="sortbar-container">
		<ul class="sortbar-wrapper">
			<li class="normal" @click="sort(0)" :class="{active:active===0}">默认</li>
			<li class="price" @click="sort(1)" :class="{active:active===1}">价格</li>
			<li class="near" @click="sort(2)" :class="{active:active===2}">距离最近</li>
		</ul>
		
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
				active:0
			}
		},
		mounted () {
			
		},
		methods: {
			// 排序筛选
			sort(ind){
				this.active = ind;
			}
		}
	}

</script>
<style lang="less" scoped>

	@import '../assets/lib/swiper/css/swiper.css';

	.sortbar-container {
		height: 40px;
		padding: 10px 0;
		.sortbar-wrapper {
			height: 20px;
			li {
				width: 33.33%;
				float: left;
				height: 20px;
				line-height: 20px;
				text-align: center;
				color: #666666;
				&.active{
					color: #30B097;
				}
			}
			
		}
	}

	
</style>