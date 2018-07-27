<template>
	<div class="sortbar-container">
		<ul class="sortbar-wrapper">
			<li class="normal" @click="sort('sort',0)" :class="{active:isActive===0}">默认</li>
			<li class="price" @click="sort('price',1)" :class="{active:isActive===1}">价格</li>
			<li class="near" @click="sort('distance',2)" :class="{active:isActive===2}">距离最近</li>
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
				isActive:0
			}
		},
		mounted () {
			
		},
		methods: {
			// 排序筛选
			sort(val,ind){
				this.isActive = ind;
				this.$emit("sortbarEmit",val);
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