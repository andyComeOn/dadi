<template>
	<div class="no-search-result-container">
		<div class="no-search-result-wrapper">
			<div class="img-wrapper">
				<img src="../assets/images/404/404_no hotel.pn.png" alt="">
			</div>
			<p>暂无符合您要求的酒店</p>
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