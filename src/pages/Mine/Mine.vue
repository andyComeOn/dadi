<template>
	<div class="mine">
		<ul>
			<li class="avatar">
				<div class="lf">头像</div>
				<div class="rg"></div>
			</li>

			<li class="nick">
				<div class="lf">昵称</div>
				<div class="rg">andy</div>
			</li>

			<li class="sex">
				<div class="lf">性别</div>
				<div class="rg">男</div>
			</li>

			<li class="birth">
				<div class="lf">生日</div>
				<div class="rg">0707</div>
			</li>

			<router-link to="/login" tag="span">
				<li class="tel">
					<div class="lf">手机</div>
					<div class="rg">13525009999</div>
				</li>
			</router-link>
		</ul>
		<mTabbarfa></mTabbarfa>
	</div>

</template>

<script>
import mTabbarfa from "../../components/tabbarfa";

export default {
    name: "mine",
    components: {
        mTabbarfa
    }
};
</script>


<style lang="less" scoped>
	@import "../../assets/less/var.less";
	.mine{
		ul{
			padding: 0 10px;
			li{
				position: relative;
				&:after{
					content: '';
					position: absolute;
					left: 0;
					bottom: 0;
					right: 0;
					height: 1px;
					background: @tabbarBorderColor;
					transform: scaleY(0.5);
				}
				// 头像
				&.avatar {
					height: 80px;
					padding: 10px 0;
					.lf{
						height: 60px;
						line-height: 60px;
						font-size: 14px;
						float: left;
					}
					.rg{
						width: 60px;
						height: 60px;
						border-radius: 50%;
						background: pink; 
						float: right;
					}
				}
				// 昵称
				&.nick {
					height: 44px;
					.lf{
						height: 44px;
						line-height: 44px;
						font-size: 14px;
						float: left;
					}
					.rg{
						padding-right: 10px; 
						height: 44px;
						line-height: 44px;
						float: right;
					}
				}
				// 性别
				&.sex {
					height: 44px;
					.lf{
						height: 44px;
						line-height: 44px;
						font-size: 14px;
						float: left;
					}
					.rg{
						padding-right: 10px; 
						height: 44px;
						line-height: 44px;
						float: right;
					}
				}
				
				&.birth {
					height: 44px;
					.lf {
						height: 44px;
						line-height: 44px;
						font-size: 14px;
						float: left;
					}
					.rg {
						padding-right: 10px; 
						height: 44px;
						line-height: 44px;
						float: right;
					}
				}
				&.tel {
					height: 44px;
					.lf{
						height: 44px;
						line-height: 44px;
						font-size: 14px;
						float: left;
					}
					.rg{
						padding-right: 10px; 
						height: 44px;
						line-height: 44px;
						float: right;
					}
				}
				


				
			}
		}
	}
</style>