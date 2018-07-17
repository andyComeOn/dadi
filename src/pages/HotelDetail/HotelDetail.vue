<template>
	<div class="hotel-detail">
		<!-- swiper -->
		<m-swipe swipeid="swipeHotelDetail" :autoplay="0" paginationDirection="right">
			<div class="swiper-slide " slot="swiper-con">
				<img src="../../assets/images/banner/01.jpg" alt="">
			</div>
			<div class="swiper-slide " slot="swiper-con"><img src="../../assets/images/banner/02.jpg" alt=""></div>
			<div class="swiper-slide " slot="swiper-con"><img src="../../assets/images/banner/03.jpg" alt=""></div>
		</m-swipe>

		<!-- 酒店位置说明 -->
		<hotelLocation></hotelLocation>

		<!-- 酒店详情查看更多 -->
		<div class="detail-more-container">
			<div class="detail-more-wrapper">
				<div class="lf">
					<span class="wifi">免费wifi</span>
					<span class="luggage">免费行李寄存</span>
				</div>
				<div class="rg">
					<router-link to="/hotelLabel" tag="div">
						<span class="btn-more">查看更多</span>
					</router-link>
				</div>
			</div>
		</div>

		<!-- 入离时间展示 -->
		<div class="come-go-box">
			<div class="come-go">
				<div class="come">
					<span>入住</span>
					<span>03月28日</span>
				</div>
				<span class="total">
					共2晚
				</span>
				
				<div class="go">
					<span>离店</span>
					<span>03月30日</span>
				</div>
			</div>
		</div>

		<!-- 预定组件 -->
		<reserveItem></reserveItem>
	</div>
</template>

<script>
import mSwipe from "../../components/swipe";
import hotelLocation from "../../components/hotel-location";
import reserveItem from "../../components/reserve-item";
export default {
    name: "hotel-detail",
    components: {
        mSwipe,
        hotelLocation,
        reserveItem
    }
};
</script>

<style lang="less" scoped>
	.detail-more-container{
		background: #EFF1F0;
		padding-bottom: 5px;
			.detail-more-wrapper{
				height: 40px;
				padding: 10px 15px;
				background: #fff;
				font-size: 14px;
				color: #666;
				.lf {
					height: 20px;
					float: left;
					span {
						display: inline-block;
						height: 20px;
						line-height: 20px;
						padding-left: 26px;
						margin-right: 12px;
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
				.rg{
					height: 20px;
					float: right;
					font-size: 12px;
					span {
						display: inline-block;
						line-height: 20px;	
						height: 20px;
						padding-right: 14px; 		
						background: url('../../assets/images/arrows/ic-arrow_10_18.png') no-repeat right center;
						background-size: 5px 9px;	
					}
				}
			}
	}

	// 入离店展示
	.come-go-box{
		height: 70px;
		padding-bottom: 5px;
		background: #e5e5e5; 
		.come-go{
			height: 65px;
			
			text-align: center;
			background: #fff;
			padding: 0 15px;
			position: relative;
			.come , .go {
				float: left;
				height: 65px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				span {
					&:nth-child(1){
						color: #999;
					}
					&:nth-child(2){
						color: #333;
					}
				}
			}
			.go{
				float: right;
			}
			.total{
				position: absolute;
				width: 40px;
				height: 22px;
				line-height: 22px;
				border: 1px solid #ccc;
				border-radius: 3px; 
				top: 50%;
				left: 50%;
				margin: -11px 0 0 -40px;

			}

		}
	}
	
</style>