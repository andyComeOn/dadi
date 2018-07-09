<template>
	<div class="order">
		<div class="detail-container">
			<div class="detail-wrapper">
				<!-- 酒店名字 -->
				<div class="name m-ellipsis">秋果酒店交通大学店</div>
				<!-- 酒店标签 -->
				<div class="label">
					<span>特价标准大床房</span>
					<span>免费有线</span>
					<span>不含早</span>
					<span>不可取消</span>
				</div>
				<div class="area">
					<span class="instro">入住</span>
					<span class="date">02月26日</span>
					<span class="instro">离店</span>
					<span class="date">02月27日</span>
					<span class="date">1晚</span>
				</div>
			</div>

		</div>

		<!-- 用户操作区 -->
		<ul class="info">
			<!-- 房间数 -->
			<li class="room">
				<label>房间数</label>
				<div class="room-info">
					<span class="span-minus"><img src="../../assets/images/order-plus-reduce/ic_order_reduce_disabled.png" alt=""></span>
					<span class="span-input">
						<input type="number" class="txt" id="roomNum">
					</span>
					<span class="span-plus"><img src="../../assets/images/order-plus-reduce/ic_order_plus.png" alt=""></span>
				</div>
			</li>
			<!-- 入住人姓名 -->
			<li class="name">
				<label>入住人姓名</label>
				<div class="rg">
					<div class="name-div">
						<input type="text" class="number" id="name">
					</div>
				</div>
			</li>
			<!-- 手机号 -->
			<li class="tel">
				<label>手机号</label>
				<div class="rg">
					<div class="tel-div">
						<input type="tel" class="number" id="tel">
					</div>
				</div>
			</li>
			<!-- 优惠券 -->
			<li class="coupon"><label>优惠券</label>
				<div class="rg">
					<div class="coupon-div">
						<img src="../../assets/images/arrows/ic-arrow_10_18.png" alt="">
					</div>
				</div>
			</li>
		</ul>

		<!-- 文字小提示 -->
		<div class="tips">
			<h3>温馨提示</h3>
			<p>1.酒店与住店当天13:00办理入住，离店13:00办理退房，如您在13:00前未到达，可能需要等待方能入住，具体以酒店安排为准。 </p>
			<p>2.发票由酒店开具。</p>
		</div>

		<!-- 确认支付bar -->
		<div class="paybar">
			<div class="lf">
				<div class="money">&yen;386</div>
				<div class="arrow"><img src="../../assets/images/arrows/ic_pay_arrow.png" alt=""></div>
			</div>
			<div class="rg">
				支付
			</div>
		</div>


	</div>
</template>

<script>


export default {
    name: "order",
    components: {
        
    }
};
</script>

<style lang="less" scoped>
.order {
	background: #EFF1F0;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	// 酒店详情css
    .detail-container {
        padding: 10px 0;
        background: #eff1f0;
        .detail-wrapper {
            padding: 15px;
            background: #fff;
            .name {
                font-size: 16px;
                color: #666;
                height: 22px;
                line-height: 22px;
                margin-bottom: 5px;
            }
            .label {
                line-height: 16px;
                font-size: 12px;
                margin-bottom: 8px;
                span {
                    margin-right: 10px;
                }
            }
            .area {
                line-height: 16px;
                vertical-align: bottom;
                .instro {
                    color: #999;
                    font-size: 12px;
                    margin-right: 8px;
                }
                .date {
                    color: #666;
                    font-size: 16px;
                    margin-right: 15px;
                }
            }
        }
	}
	// 用户操作区
    .info {
		padding-left: 15px;
		background: #fff;
		font-size: 16px;
		li{
			height: 50px;
			position: relative;
			&:after {
				content: '';
                position: absolute;
                left: 0;
                bottom: 0;
                right: 0;
                height: 1px;
                background: #E5E5E5;
                transform: scaleY(0.5);
			}
			&.room{
				label{
					float: left;
					height: 50px;
					line-height: 50px;
				}
				.room-info{
					float: right;
					height: 50px;
					padding-right: 15px;
					span{
						height: 50px;
						float: left;
						&.span-minus , &.span-plus{
							width: 17px;
							line-height: 50px;
							font-size: 0; 
						}
						&.span-minus {
							img {
								display: inline-block;
								width: 17px;
								height: 17px;
							}
						} 
						&.span-plus{
							img {
								display: inline-block;
								width: 17px;
								height: 17px;
							}
						}
						&.span-input {
							width: 75px;
							padding: 10px 0;
							margin: 0 10px;
							.txt {
								display: block;
								width: 100%;
								height: 30px;
								text-align: center;
								border: 1px solid #cccccc;
							} 
						}
					}
				}
			}
			&.name , &.tel , &.coupon{
				label{
					float: left;
					height: 50px;
					line-height: 50px;
				} 
				.rg{
					float: right;
					padding-right: 15px; 
					height: 50px;
				}
			}
			&.name {
				.name-div {
					width: 160px;
					height: 50px;
					padding: 8px 0;
					#name{
						display: block;
						width: 100%;
						height: 34px;
						// border: 1px solid #cccccc;
						border: none;
						outline: none;
					}
				}	
			}

			// 手机号的输入
			&.tel{
				.tel-div {
					width: 190px;
					height: 50px;
					padding: 8px 0;
					#tel{
						display: block;
						width: 100%;
						height: 34px;
						border: none;
						outline: none;
					}
				}	
			}
			&.coupon{
				.coupon-div {
					width: 10px;
					height: 50px;
					line-height: 50px;
					img{
						display: inline-block;
						width: 10px;
						height: 18px;
					}
				}
			}
		}
	}
	// 文字小提示
	.tips{
		padding: 12px 15px 10px;
		color: #666;
		font-size: 12px;
		h3{
			line-height: 16px;
			margin-bottom: 14px;
			font-size: 12px;
		}
		p {
			line-height: 15px;
			margin-bottom: 12px;
		}
 	}

	// 支付bar
	.paybar{
		display: flex;
		flex-direction: row;
		position: fixed;
		z-index: 9;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		overflow: hidden;
		height: 49px;
		background: #fff;
		font-size: 14px;
		.lf{
			flex: 1;
			padding: 0 15px;
			.money{
				color: #FFBA56;
				height: 49px;
				line-height: 49px;
				float: left;
			}
			.arrow{
				width: 13px;
				height: 49px;
				line-height: 49px;
				text-align: center;
				float: right;
				img {
					display: inline-block;
					width: 13px;
					height: 7px;
				}
			}
		}
		.rg{
			width: 142px;
			background: #269882;
			color: #fff;
			height: 49px;
			line-height: 49px;
			text-align: center;
			

		}
	}


}
</style>