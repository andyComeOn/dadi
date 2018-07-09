<template>
	<div class="membership-rights">
		<div class="wrapper">
			<div class="is-left" v-show="leftShow">
				秋果会员权益
			</div>
			<div class="is-right" v-show="rightShow">
				<img src="../assets/images/bak/ic_seti_arrow_right_gray.png" alt="">
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'membership-rights',
		props: {
			leftShow: {
				type: Boolean,
				default: true
			},
			rightShow: {
				type: Boolean,
				default: true
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../assets/less/var.less";
	.membership-rights {
		height: 40px;
		padding: 0 15px;
		background: #fff;
		color: #666666;
		position: relative;
		&:after {
			content: '';
			position: absolute;
			left: 0;
			bottom: 0;
			right: 0;
			height: 1px;
			background: @tabbarBorderColor;
			transform: scaleY(0.5);
		}
		.wrapper {
			display: flex;
			align-items: center;
			.is-left {
				height: 40px;
				line-height: 40px;
				flex: 1;
				font-size: 16px;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}
			.is-right {
				width: 16px;
				height: 40px;
				line-height: 40px;
				display: flex;
				align-items: center;
				justify-content: center;
				img {
					width: 16px;
					height: 16px;
				}
			}
		}
	}
</style>