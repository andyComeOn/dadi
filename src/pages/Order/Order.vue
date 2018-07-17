<template>
	<div class="order m-position-ab">
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

		<!-- 用户信息操作区 -->
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
				<div class="item-rg">
					<div class="name-div">
						<input type="text" class="number" id="name" placeholder="请输入姓名">
					</div>
				</div>
			</li>

			<!-- 手机号 -->
			<li class="tel">
				<label>手机号</label>
				<div class="item-rg">
					<div class="tel-div">
						<input type="tel" class="number" id="tel" placeholder="请输入手机号">
					</div>
				</div>
			</li>

			<!-- 分割bar -->
			<div class="divivid-bar"></div>

			<!-- 优惠券 -->
			<li class="coupon">
				<label>优惠券</label>
				<div class="item-rg">
					<div class="coupon-div" @click="showCouponMask">
						2张可用
						<img src="../../assets/images/arrows/ic-arrow_10_18.png" alt="">
					</div>
				</div>
			</li>

			<!-- 发票 -->
			<li class="ticket">
				<label>发票</label>
				<div class="item-rg" style="color:#666;font-size:14px;line-height:50px;font-family:PingFangSC-Regular;">
					酒店开具
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
			<div class="rg">支付</div>
		</div>

		<!-- 优惠券的弹框 -->
		<div class="coupon-mask-box">
			<div class="weui-mask zb-weui-mask" id="couponMask" @click="hideCouponMask" :class="[{'weui-actionsheet_no_toggle_active':isCouponMask},{'weui-actionsheet_no_toggle':!isCouponMask}]"></div>
			<div class="weui-actionsheet zb-weui-actionsheet" id="weui-actionsheet" :class="[{'weui-actionsheet_toggle':isCouponMask}]">
				<div class="weui-actionsheet__title zb-weui-actionsheet__title">
					<p class="weui-actionsheet__title-text zb-weui-actionsheet__title-text">优惠券</p>
				</div>
				<div class="weui-actionsheet__menu zb-weui-actionsheet__menu">
					<div class="weui-cells zb-weui-cells weui-cells_checkbox">
						<label class="weui-cell weui-check__label" for="s11">
							<div class="weui-cell__hd">
								<p>standard is dealt for u</p>
							</div>
							<div class="weui-cell__bd">
								<input type="checkbox" class="weui-check" name="checkbox1" id="s11" checked="checked">
								<i class="weui-icon-checked"></i>
							</div>
						</label>
					</div>

				
				</div>
				<div class="weui-actionsheet__action">
					<div class="weui-actionsheet__cell" id="actionsheet_cancel" @click="hideCouponMask">取消</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    name: "order",
    components: {},
    data() {
        return {
            isCouponMask: false
        };
    },
    methods: {
        // 优惠券mask
        showCouponMask() {
            this.isCouponMask = true;
        },

        // hideCouponMask
        hideCouponMask() {
            this.isCouponMask = false;
        }
    }
};
</script>

<style lang="less" scoped>
// 重置weui样式

.zb-weui-mask {
    background: rgba(0, 0, 0, 0.45);
}
// 添加点击之后样式
.weui-actionsheet_no_toggle {
    opacity: 0;
    display: none;
}
// 取消点击之后样式
.weui-actionsheet_no_toggle_active {
    opacity: 1;
}
.zb-weui-actionsheet__title {
	height: auto;
	background: #fff;

}
.zb-weui-actionsheet__title-text {
    height: 22px;
    line-height: 22px;
    margin: 12px 0;
    color: #333;
    font-size: 16px;
}

.zb-weui-cells {
	margin-top: 0;
}

// order页的样式
.order {
    // 相同的样式提取
    label {
        float: left;
        height: 50px;
        line-height: 50px;
        color: #333;
        font-size: 15px;
    }
    .item-rg {
        float: right;
        padding-right: 15px;
        height: 50px;
    }

    // 分割bar
    .divivid-bar {
        height: 5px;
        background: #eff1f0;
        margin-left: -15px;
    }

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

    // 用户信息操作区
    .info {
        padding-left: 15px;
        background: #fff;
        li {
            height: 50px;
            position: relative;
            &:after {
                content: "";
                position: absolute;
                left: 0;
                bottom: 0;
                right: 0;
                height: 1px;
                background: #e5e5e5;
                transform: scaleY(0.5);
            }
            &.room {
                .room-info {
                    float: right;
                    height: 50px;
                    padding-right: 15px;
                    span {
                        height: 50px;
                        float: left;
                        &.span-minus,
                        &.span-plus {
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
                        &.span-plus {
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
            &.name {
                .name-div {
                    width: 160px;
                    height: 50px;
                    padding: 8px 0;
                    #name {
                        display: block;
                        width: 100%;
                        height: 34px;
                        border: none;
                        outline: none;
                        text-align: right;
                    }
                }
            }

            // 手机号的输入
            &.tel {
                .tel-div {
                    width: 190px;
                    height: 50px;
                    padding: 8px 0;
                    #tel {
                        display: block;
                        width: 100%;
                        height: 34px;
                        border: none;
                        outline: none;
                        text-align: right;
                    }
                }
            }
            &.coupon {
                .coupon-div {
                    height: 50px;
                    line-height: 50px;
                    font-size: 14px;
                    color: #666;
                    img {
                        display: inline-block;
                        width: 5px;
                        height: 9px;
                    }
                }
            }
            &.ticket {
                .ticket-div {
                    height: 50px;
                    line-height: 50px;
                    font-size: 14px;
                    color: #666;
                }
            }
        }
    }

    // 文字小提示
    .tips {
        padding: 12px 15px 10px;
        color: #666;
        font-size: 12px;
        h3 {
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
    .paybar {
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
        .lf {
            flex: 1;
            padding: 0 15px;
            .money {
                color: #ffba56;
                height: 49px;
                line-height: 49px;
                float: left;
            }
            .arrow {
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
        .rg {
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