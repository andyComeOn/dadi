<template>
	<div class="hotel-label-page m-position-ab">
		<!-- 酒店详情标签 -->
		<div class="labels-box item">
			<div class="labels">
				<div class="hd item-hd">酒店详情</div>
				<div class="bd">
					<span class="wifi">免费wifi</span>
					<span class="luggage">免费行李寄存</span>
					<span class="wifi">免费wifi</span>
					<span class="luggage">免费行李寄存</span>
					<span class="wifi">免费wifi</span>
		
					<span class="luggage">免费行李寄存</span>
					<span class="wifi">免费wifi</span>
					<span class="luggage">免费行李寄存</span>
				</div>
			</div>
		</div>

		<!-- 酒店详情说明 -->
		<div class="desc-box item">
			<div class="desc">
				<div class="hd item-hd">酒店说明</div>
				<div class="bd">
					“秋果”品牌以自然、健康、率性的价值观，为希望能在繁华、喧嚣的都市中寻得一品净土的中产商务人士打造一处静谧之所，栖身、栖心。 秋果品牌定位：都市人文精品酒店缔造者与领导者；秋果品牌主张－我们不仅是一家高品质酒店，亦希望为旅途客人打造一个舒适的家，为有共同兴趣爱好的客人塑造一个专属社区，并引导一种生活方式。
				</div>
			</div>
		</div>

		<!-- 温馨提示 -->
		<div class="tips-box">
			<div class="tips">
				<h4>温馨提示：</h4>
				<p>1.联系电话： 010-6666666</p>
				<p>2.入离通知：入住时间－12点以后；离店时间－次日12点以前</p>
			</div>
		</div>
		
	</div>
</template>

<script>

export default {
    name: "hotel-label",
    components: {
        
    }
};
</script>

<style lang="less" scoped>
	// 共有的样式
	.item {
		padding-top: 10px;
	}
	.item-hd {
		height: 20px;
		line-height: 20px;
		font-size: 15px;
		color: #333;
		padding-left: 12px;
		position: relative;
		&::before {
			content: '';
			position: absolute;
			left: 0;
			width: 3px;
			bottom: 0;
			top: 0;
			background: #30B097;
		} 
	}

	// 酒店详情标签
	.labels-box{
		padding-top: 10px;
		.labels{
			padding: 15px;
			background: #ffffff;
			.bd {
				span {
					display: inline-block;
					height: 20px;
					line-height: 20px;
					padding-left: 26px;
					margin: 10px 12px 0 0;
					&.wifi{
						background: url('../../assets/images/hotel-label/ic_wifi.png') no-repeat left center;
						background-size: 18px 18px;
					}
					&.luggage{
						background: url('../../assets/images/hotel-label/ic_luggage.png') no-repeat left center;
						background-size: 18px 18px;
					}
				} 				
			}
		}

	}

	// 酒店详情说明
	.desc-box {
		.desc {
			padding: 15px;
			background: #ffffff;
			.bd {
				margin-top: 10px;
				font-size:14px;
				font-family:PingFangSC-Regular;
				color: #666;
				line-height:24px;
			}
		}
	}

	// 温馨提示
	.tips-box {
		padding: 10px 15px 0;
		.tips {
			font-size: 12px;
			color: #666;
			line-height: 15px;
			h4 {
				margin-bottom: 5px;
			}
			p {
				margin-bottom: 5px;
			}
			
		}
 	}
</style>