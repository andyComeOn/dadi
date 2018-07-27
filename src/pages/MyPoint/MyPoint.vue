<template>
	<div class="my-point-page">
		<!-- head -->
		<div class="head">
			<p class="num">568</p>
			<p class="intro">当前总积分</p>
		</div>
		<!-- body -->
		<ul class="body">
			<li>
				<div class="lf">
					<p class="jifen-type">秋果酒店消费50积分</p>
					<p class="jifen-date">2018.07.06 11:30</p>
				</div>
				<div class="rg">+50</div>
			</li>
		</ul>

		
	</div>

</template>

<script>

import {integral_detail} from '@/api/api';
 
export default {
    name: "my-point-page",
    components: {
        
    },
	data(){
		return {
			
		}
	},
	methods:{
			
	}
};
</script>


<style lang="less" scoped>
	.my-point-page{
		.head{
			width: 100%;
			height: 80px;
			background: url('../../assets/images/bg/bg-jifenmignxi.png') no-repeat center center;
			padding-top:18px; 
			color:#fff;
			text-align: center;
			.num{
				font-size:24px;
				line-height:28px;
				margin-bottom: 2px; 
			}
			.intro{

				line-height:16px;
				font-size:12px;
			}
		}
		.body{
			padding: 0 15px;
			li{
				position: relative;
				display: flex;
				flex-direction: row;
				height: 60px;
				&::after{
					content: "";
					position: absolute;
					height: 1px;
					left: 0;
					right: 0;
					bottom:0;
					background: #e5e5e5;
					transform: scaleY(0.5);

				}
				.lf{
					flex: 1;
					height: 60px;
					display: flex;
					flex-direction: column;
					// align-items: center;
					.jifen-type{
						color: #666;
						margin: 12px 0 6px 0;
						font-size: 15px;
						line-height:16px; 
					}
					.jifen-date{
						color: #999;
					}

				}
				.rg{
					width: 40px;
					height: 60px;
					line-height: 60px;
					text-align: right;
					
				}
			}
		}
	}
</style>