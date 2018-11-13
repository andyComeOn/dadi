<template>
	<div class="old-phone-num-page">
		<ul>
			<!-- 新手机号 -->
            <li class="tel">
				<label>新手机号</label>
				<div class="lf">
					<div class="tel-div">
						<input @blur="blurInp" @focus="focusInp" type="tel" v-model="newMobile" class="tel-txt" placeholder="请输入新手机号">
					</div>
				</div>
            </li>
			<!-- 验证码 -->
			<li class="test-code">
				<div class="lf">
					<input @blur="codeBlur" @focus="codeFocus" type="tel" v-model="codeVal" class="test-txt" placeholder="请输入验证码">
				</div>
				<div class="rg">
					<div class="test-btn" @click="getCode" v-if='get_btn == true' >获取验证码</div>
					<div class="test-code-btn" v-if="get_code_btn == true">{{getTime}}s后重新获取</div>
				</div>
			</li>
		</ul>
		<!-- 提交 -->
		<div class="submit-box" v-if='submit_show == true'>
			<div class="submit" @click="subNewMobile">提交</div>
		</div>
		<div class="submit-box-aaa" v-if='submit_show_aaa == true'>
			<div class="submit">提交</div>
		</div>
		<!-- hint -->
		<span class="hint_box" v-if='hint_box_show == true'>{{hint_box_content}}</span>
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
				setTime: 58,
				getTime:'59',
				get_btn:true,
				get_code_btn:false,
				submit_show_aaa:true,
				submit_show:false,
				hint_box_show:false,	//hint 显示 or 隐藏
				hint_box_content:'',	//hint 内容
			};
		},
		methods: {
			//手机号验证
			focusInp(){
				console.log(1);
			},
			blurInp(){
				let reg = new RegExp(/^1\d{10}$/);
				if(reg.test(this.newMobile)){
					if(this.newMobile != '' && this.codeVal != ''){
						this.submit_show = true;
						this.submit_show_aaa = false;
					}
				}else{
					this.hint_box_show = true;
					this.hint_box_content = '手机号不正确';
					setTimeout(()=>{
						this.hint_box_show = false;
						this.hint_box_content = '';
					},2000);
					this.submit_show = false;
					this.submit_show_aaa = true;
				}
			},
			//验证码验证
			codeBlur(){
				let reg = new RegExp(/^\d{4}$/);
				if(reg.test(this.codeVal)){
					if(this.newMobile != '' && this.codeVal != ''){
						this.submit_show = true;
						this.submit_show_aaa = false;
					}
				}else{
					this.hint_box_show = true;
					this.hint_box_content = '验证码格式不正确';
					setTimeout(()=>{
						this.hint_box_show = false;
						this.hint_box_content = '';
					},2000);
					this.submit_show = false;
					this.submit_show_aaa = true;
				}
			},
			codeFocus(){
				console.log(3);
			},
			//获取验证码
			getCode(){
				if(this.newMobile == ''){
					this.hint_box_show = true;
					this.hint_box_content = '手机号不能为空';
					setTimeout(()=>{
						this.hint_box_show = false;
						this.hint_box_content = '';
					},2000);
				}else{				
					var param = {
						mobile:this.newMobile,
						type:4
					};
					this.$http({
						url:sendMobile,
						method:'POST',
						data:param
					}).then((res)=>{
						if(res.data.status == 1){
							this.get_btn = false;		//关闭获取验证码按钮
							this.get_code_btn = true;	//打开倒计时
							//倒计时
							let timer = setInterval(() => {
								if (this.setTime >= 0) {
									let tmpMin = Math.floor(this.setTime / 60);
									let min = tmpMin < 10 ? "0" + tmpMin : tmpMin;
									let tmpSec = Math.floor(this.setTime % 60);
									let sec = tmpSec < 10 ? "0" + tmpSec : tmpSec;
									this.getTime = sec;
									this.setTime--;
								} else {
									clearInterval(timer);
									this.get_btn = true;
									this.get_code_btn = false;
									this.setTime = 58;
									this.getTime = 59;
								}
							}, 1000);
						}else{
							this.hint_box_show = true;
							this.hint_box_content = res.data.msg;
							setTimeout(()=>{
								this.hint_box_show = false;
								this.hint_box_content = '';
							},2000);
							this.get_btn = true;			//打开获取验证码接口
							this.get_code_btn = false;  	//关闭倒计时
						}
					});
				}
			},
			//提交新手机号
			subNewMobile(){
				if(this.newMobile != '' && this.codeVal != ''){
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
						if(res.data.status == 1){
							this.$router.push({path:'/personalCenter'});
						}else{
							this.hint_box_show = true;
							this.hint_box_content = res.data.msg;
							setTimeout(()=>{
								this.hint_box_show = false;
								this.hint_box_content = '';
							},2000);
						}
						console.log(res);
					});
				}
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
								text-align: right;
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
							border: 1px solid #30B097;
							border-radius:3px;
							font-size: 12px;
							color: #30B097;
							outline:none;
							text-align: center;
						}
						.test-code-btn{
							display: block;
							padding: 0 10px;
							background: #aaa;
							height: 34px;
							line-height: 34px;
							border: 1px solid #aaa;
							border-radius:3px;
							font-size: 12px;
							color: #fff;
							outline:none;
							text-align: center;
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
		.submit-box-aaa{
			padding: 0 10px;
			margin-top: 25px;
			.submit{
				text-align: center;
				height: 44px;
				line-height: 44px;
				background:#aaa;
				border-radius:5px;
				color: #fff;
				font-size: 15px;
			}
		}
	}
	.old-phone-num-page ul li:nth-of-type(2)::after{
		height: 0;
	}
	.hint_box{
		background: rgba(75, 75, 75, 0.7);
		color: #fff;
		padding: 5px 20px;
		font-size: 14px;
		line-height: 44px;
		border-radius: 13px;
		position: fixed;
		top: 50%;
		left: 50%;
		margin-top: -13px;
		transform: translateX(-50%);
	}
</style>