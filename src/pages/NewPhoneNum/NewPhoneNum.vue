<template>
	<div class="old-phone-num-page">
		<ul>
			<!-- 新手机号 -->
            <li class="tel">
				<label>新手机号</label>
				<div class="lf">
					<div class="tel-div">
						<input type="tel" v-model="newMobile" class="tel-txt" placeholder="请输入新手机号">
					</div>
				</div>
            </li>
			<!-- 验证码 -->
			<li class="test-code">
				<div class="lf">
					<input type="tel" v-model="codeVal" class="test-txt" placeholder="请输入验证码">
				</div>
				<div class="rg">
					<input type="button" class="test-btn" @click="getCode" value="获取验证码">
				</div>
			</li>
		</ul>
		<!-- 提交 -->
		<div class="submit-box">
			<div class="submit" @click="subNewMobile">提交</div>
		</div>
	</div>
</template>
<script>
	import {sendMobile,check_mobile} from '../../api/api.js';
	export default {
		name: "old-phone-num-page",
		components: {
			
		},
		data() {
			return {
				newMobile:'',			//新手机
				codeVal:'',				//验证码
			};
		},
		methods: {
			//获取验证码
			getCode(){
				var param = {
					mobile:this.newMobile
				};
				this.$http({
					url:sendMobile,
					method:'POST',
					data:param
				}).then((res)=>{
					console.log(res);
				});
			},
			//提交新手机号
			subNewMobile(){
				var param = {
					mobile:this.newMobile,
					code:this.codeVal,
					type:2
				};
				this.$http({
					url:check_mobile,
					method:'POST',
					data:param
				}).then((res)=>{
					console.log(res);
				});
			}
		},
		mounted() {
			
		}
	};
</script>
<style lang="less" scoped>
    @import "../../assets/less/var.less";
    .old-phone-num-page{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
		background: #EFF1F0;
		padding-top: 10px; 
        ul{
			padding: 0 10px;
			background: #fff;
			li{
				position: relative;
				height: 50px;
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
				// 新手机号
				&.tel {
					label{
						float: left;
						height: 50px;
						line-height: 50px;
						font-size: 16px;
						color: #666;
						margin-right: 25px; 
					} 
					.lf{
						float: left;
						height: 50px;
						.tel-div {
							width: 200px;
							height: 50px;
							padding: 8px 0;
							.tel-txt{
								display: block;
								width: 100%;
								height: 34px;
								border: none;
								outline: none;
								font-size: 14px;
								color: #999;
							}
						}	
					}
				}
				// 验证码
				&.test-code {
					.lf{
						float: left;
						height: 50px;
						padding: 8px 0;
						.test-txt{
							display: block;
							width: 100%;
							height: 34px;
							border: none;
							outline: none;
							font-size: 14px;
							color: #999;
						}	
					}
					.rg{
						float: right;
						height: 50px;
						padding: 8px 0;
						.test-btn{
							display: block;
							padding: 0 10px;
							background: #ffffff;
							height: 34px;
							line-height: 34px;
							border: 1px solid #e5e5e5;
							border-radius:3px;
							font-size: 12px;
							color: #999;
						}
					}
				}	
			}
		}
		// 提交按钮
		.submit-box{
			padding: 0 10px;
			margin-top: 25px;
			.submit{
				text-align: center;
				height: 44px;
				line-height: 44px;
				background:#30B097;
				border-radius:5px;
				color: #fff;
				font-size: 15px;
			}
		}
	}
	.old-phone-num-page ul li:nth-of-type(2)::after{
		height: 0;
	}
</style>