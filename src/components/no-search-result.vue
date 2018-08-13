<template>
	<div class="no-search-result-container">
		<div class="no-search-result-wrapper">
			<div class="img-wrapper">
				<img src="../assets/images/404/404-no-hotel.png" alt="">
			</div>
			<p>暂无符合您要求的酒店</p>
			<!-- 这个小组件没有用，就是一个小文案，最后在room-item中集成了这个组件 -->
			<!-- 思考，要看项目中产品、UI的设计，对于那种多次服用的组件，单独剔出来 -->
			<!-- 一些小的文案组件（如没有搜索到相关数据），可以直接写在item组件中 -->
			<!-- 再加上该项目，无相关数据UI给的img都不一致，所以把这些小文案弄成组件，就更没有必要了 -->
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			
			
		},
		data (){
			return {
				
			}
		},
		mounted () {
			
		},
		methods: {
			
		}
	}

</script>
<style lang="less" scoped>

	.no-search-result-container {
		padding-top: 15px;
		background: #EFF1F0;
		.no-search-result-wrapper {
			.img-wrapper{
				font-size: 0;
				text-align: center;
				img{
					display: inline-block;
					width: 152px;
					height: 108px;
					
				}
			}
			p{
				padding: 18px 0;
				line-height: 20px;
				font-size: 14px;
				color: #666;
				text-align: center;
			}
		}
	}

	
</style>