<template>
	<div class="coupon">
		<div class="item" v-for="(item,index) in list" :key="index">
			<div class="lf">
				<div class="name">{{item.name}}</div>
				<div class="date-area">{{item.dateArea}}</div>
				<div class="desc">{{item.desc}}</div>
			</div>
			<div class="rg">
				<div class="price"> <span>&yen;</span>{{item.price}}</div>
				<div class="now-use" @click="nowUse(item.type)">立即使用</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props:{
			list: {
				type: Array,
				default: function(){
					return []
				}
			},
		}, 

		data (){
			return {
				
			}
		},
		mounted () {
			
		},
		methods: {
			nowUse(type){
				// console.log(type);
				this.$emit('nowUseEmit',type);
			}
		}
	}

</script>
<style lang="less" scoped>

	.coupon {
		.item{
			padding: 10px 15px;
			height: 90px;
			display: flex;
			position:relative;
			background: #fff;
			margin-bottom: 10px;
			&:before{
				content: "";
				width:2px;
				height: 100%;
				position: absolute;
				top:0;
				left: 0;
				background: #30B097;
			}

			.lf{
				flex: 1;
				padding-right:10px; 
				.name {
					height: 20px;
					line-height: 20px;
					margin-bottom: 4px;
					font-size:14px;
					color: #666;
				}
				.date-area , .desc{
					height: 16px;
					line-height: 16px;
					font-size:12px; 
					color: #999;
					margin-bottom: 10px;
				}
				.desc{
					color: #666;
				}
			}
			.rg{
				width: 84px;
				padding-left:24px; 
				position: relative;
				&:before{
					content: "";
					width:2px;
					height: 100%;
					position: absolute;
					top:0;
					left: 0;
					background: #cccccc;
				}
			}
		}
	}
</style>