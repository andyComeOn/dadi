<template>
	<div class="recommend-f-page">
		<!-- 头部 -->
		<m-header title="推荐好友" fixed class="is-fixed" leftShow>
			<a href="javascript:;" slot="left">
				<img class="m-icon-img margin-right-10" src="../../assets/images/bak/ic_actionbar_search_icon.png" />
			</a>
			<a href="javascript:;" slot="right">
				<img class="m-icon-img" src="../../assets/images/bak/ic_chat_green.png" />
			</a>
		</m-header>

		<!-- 主内容区 -->
		<div class="page-content">
			<!-- 个人info -->
			<div class="weui-panel mine-info">
				<div class="weui-panel__bd mine-info-panel__bd">
					<div class="weui-media-box mine-info-media-box weui-media-box_appmsg">
						<div class="weui-media-box__hd mine-info-media-box__hd">
							<img class="weui-media-box__thumb mine-info-media-box__thumb" src="../../assets/images/166_146_3.png" alt="">
						</div>
						<div class="weui-media-box__bd mine-info-media-box__bd">
							<h4 class="weui-media-box__title mine-info-media-box__title">乘风破浪</h4>
						</div>
						<router-link to="/rule" class="">
							<span class="weui-cell__ft">规则</span>
						</router-link>
					</div>
				</div>
			</div>
			
			<!--卡片 -->
			<div class="card-box">
				<div class="box">
					<p class="tixian-title">可提现(元)</p>
					<p class="tixian-num">4698.00</p>
					<ul class="tixian-info">
						<li class="tixian-get">待领取 456</li>
						累计奖励 40
						<li class="tixian-lock">已冻结 34</li>
					</ul>
					<span class="tixian-btn">提现 ></span>
				</div>
			</div>

			<!-- 四宫格 -->
			<div class="square-box">
				<ul class="square clearflex">
					<li>
						<img src="../../assets/images/distribution/jiangli.png" alt="">
						<p>奖励明细</p>
					</li>
					<li>
						<img src="../../assets/images/distribution/jiangli.png" alt="">
						<p>提现明细</p>
					</li>
					
					<li>
						<img src="../../assets/images/distribution/tuiguang.png" alt="">
						<p>点我推广</p>
					</li>
					<li>
						<img src="../../assets/images/distribution/xiaxian.png" alt="">
						<p>我的下线</p>
					</li>

				</ul>
			</div>
		</div>
	</div>

</template>

<script>
import mHeader from "@/components/header";  //引入头
export default {
    name: "recommend-f",
    components: {
        mHeader
    }
};
</script>


<style lang="less" scoped>
	.weui-media-box {
		.weui-cell__ft {
			padding-right: 15px;
			position: relative;
			color: #333333;
			&:after {
				content: " ";
				display: inline-block;
				height: 6px;
				width: 6px;
				border-width: 2px 2px 0 0;
				border-color: #c8c8cd;
				border-style: solid;
				-webkit-transform: matrix(.71,.71,-.71,.71,0,0);
				transform: matrix(.71,.71,-.71,.71,0,0);
				position: relative;
				top: -2px;
				position: absolute;
				top: 50%;
				margin-top: -4px;
				right: 2px;
			}
		}
	}

	.mine-info-media-box {	
		.mine-info-media-box__hd {
			width: 45px;
			height: 45px;
			border-radius: 50%; 
			margin-right: 10px;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.mine-info-media-box__bd{
			.mine-info-media-box__title {
				font-size: 14px;
				color: #333333;
			}
		}
	}

	// 卡片css
	.card-box{
		padding: 0 15px; 
		margin-bottom: 50px;
		.box {
			padding: 20px 15px 0; 
			height: 128px;
			background: url(../../assets/images/distribution/bg_fenxiao.png) no-repeat center center;
			background-size: 100% 128px;
			position: relative;
			border-radius:10px;
			color: #fff;
			// 提现标题
			.tixian-title{
				line-height: 14px;
				font-size: 12px;
				margin-bottom: 10px;
			}
			// 提现钱数
			.tixian-num{
				line-height: 24px;
				font-size: 24px;
				margin-bottom: 20px;
				letter-spacing: 2px;
			}
			// 提现详情
			.tixian-info{
				height: 14px;
				line-height: 14px;
				font-size: 12px;
				text-align: center;
				.tixian-get {
					float: left;
				}
				.tixian-lock {
					float: right;
				}
			}
			.tixian-btn{
				position: absolute;
				top: 31px;
				right: 0;
				width:52px;
				height:22px;
				line-height:22px;
				background:linear-gradient(-93.8deg,rgba(255,208,139,1),rgba(255,255,255,0.37));
				border-radius:11px 0px 0px 11px;
				text-align: center;
				font-size: 10px;

			}
		}

	}
	
	// 四宫格
	.square-box{
		padding: 0 15px;
		.square{
			// height: 160px;
			li {
				float: left;
				width: 50%;
				height: 100px;
				padding:  10px 0 0 0px;
				display: flex;
				flex-direction: column;
				align-items: center;
				img{
					width: 44px;
					height: 44px;
					margin-bottom: 10px;
				}
				p{
					text-align: center;
					color: #666;
					font-size: 12px;
				}
				&:nth-child(1){
					border-right: 1px solid #e5e5e5; 
					border-bottom: 1px solid #e5e5e5; 
				}
				&:nth-child(2){
					border-bottom: 1px solid #e5e5e5; 
				}
				&:nth-child(3){
					border-right: 1px solid #e5e5e5; 
					
				}
				&:nth-child(4){
					
				}
			}
			
		}
	}
</style>