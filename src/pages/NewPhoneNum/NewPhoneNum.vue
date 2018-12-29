<template>
	<div class="oldPhoneNumPage">
		<!-- toast（delay=>z） -->
        <div v-show="delayToast">
            <div class="z-mask-transparent"></div>
            <div class="z-toast">
                <i class="z-toast-icon"></i>
                <p class="z-toast-content">{{delayToastTxt}}</p>
            </div>
        </div>
		<!-- 表单主内容 -->
		<ul>
			<li class="telCell">
				<label>新手机号</label>
				<div class="rg fr">
					<div class="telInputWrap">
						<input type="tel" v-model="newPhoneNum" class="telInput" @blur="newPhoneInputBlur" @focus="newPhoneInputFocus" placeholder="请输入新手机号">
					</div>
				</div>
            </li>
			<li class="codeCell">
				<div class="lf">
					<input type="tel" v-model="codeVal" class="codeInput" @blur="codeInputBlur" @focus="codeInputFocus" placeholder="请输入验证码">
				</div>
				<div class="rg">
					<div class="codeBtn" @click="getCode">{{codeBtnTxt}}</div>
				</div>
			</li>
		</ul>
		<!-- 提交 -->
		<div class="submitBtnWrap">
			<div class="submit" @click="submitBtn">提交</div>
		</div>
	</div>
</template>
<script>
	import { sendMobile, check_mobile } from '@/api/api.js';
	export default {
		name: "oldPhoneNumPage",
		data() {
			return {
				newPhoneNum: '',		// 新手机号
				codeVal: '',			// 验证码
				setTime: 59,
				delayToast: false, // delayToast是否显示
            	delayToastTxt: "", // delayToastTxt的文案
				codeBtnTxt: "获取验证码", // 验证码btn的txt
            	codeBtnClickCtrl: true, // 验证码btn的控制
			};
		},
		methods: {
			// 新手机号获焦
			newPhoneInputFocus(){
				
			},
			// 新手机号失焦
			newPhoneInputBlur(){
				let reg = new RegExp(/^1\d{10}$/);
				if (this.newPhoneNum.trim() == "") {
					this.delayToastTxt = "手机号不能为空";
					this.delayToast = true;
					setTimeout(() => {
						this.delayToast = false;
					}, 1500);
					return false;
				} else if (!reg.test(this.newPhoneNum.trim())) {
					this.delayToastTxt = "手机号格式不正确";
					this.delayToast = true;
					setTimeout(() => {
						this.delayToast = false;
					}, 1500);
					return false;
				} else {
					return true;
				}
			},
			// 验证码失焦
			codeInputBlur() {
				let reg = new RegExp(/^\d{4}$/);
				if (this.codeVal.trim() == "") {
					this.delayToastTxt = "验证码不能为空";
					this.delayToast = true;
					setTimeout(() => {
						this.delayToast = false;
					}, 1500);
					return false;
				} else if (!reg.test(this.codeVal.trim())) {
					this.delayToastTxt = "验证码格式不正确";
					this.delayToast = true;
					setTimeout(() => {
						this.delayToast = false;
					}, 1500);
					return false;
				} else {
					return true;
				}
			},
			// 验证码获焦
			codeInputFocus() {},
			// 获取验证码
			getCode() {
				if (this.newPhoneInputBlur()) {
					// 禁止频繁点击
					if (this.codeBtnClickCtrl == false) {
						this.delayToastTxt = "验证码已发送，请稍后再试";
						this.delayToast = true;
						setTimeout(() => {
							this.delayToast = false;
						}, 1500);
						return;
					}
					this.$http({
						url: sendMobile,
						method: 'POST',
						data: {
							mobile: this.newPhoneNum,
							type: 7
						}
					}).then((res) => {
						if (res.data.status == 1) {
							this.setTime = 59; // 重新赋值
							let timer = setInterval(() => {
								if (this.setTime >= 0) {
									this.codeBtnClickCtrl = false;
									let tmpSec = parseInt(this.setTime);
									this.codeBtnTxt = tmpSec + "s后重发";
									this.setTime--;
								} else {
									this.codeBtnTxt = "重新获取";
									this.codeBtnClickCtrl = true;
									clearInterval(timer);
								}
							}, 1000);
						} else {
							this.codeBtnClickCtrl = true;
							this.delayToastTxt = res.data.msg;
							this.delayToast = true;
							setTimeout(() => {
								this.delayToast = false;
							}, 1500);
						}
					});
				}
			},
			// 提交
			submitBtn() {
				if (this.newPhoneInputBlur() && this.codeInputBlur()) {
					this.$http({
						url: check_mobile,
						method: 'POST',
						data: {
							mobile: this.newPhoneNum,
							code: this.codeVal,
							type: 2
						}
					}).then((res) => {
						if (res.data.status == 1) {
							this.$router.push({ path:'/personalCenter' });
						} else {
							this.delayToastTxt = res.data.msg;
							this.delayToast = true;
							setTimeout(() => {
								this.delayToast = false;
							}, 1500);
						}
					});
				}
			}
		},
		mounted() {}
	};
</script>
<style lang="less" scoped>
    .oldPhoneNumPage {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
		background: #EFF1F0;
		padding-top: 10px; 
        ul {
			padding: 0 10px;
			background: #fff;
			margin-bottom: 25px;
			li {
				position: relative;
				height: 50px;
				&:after{
					content: '';
					position: absolute;
					left: 0;
					bottom: 0;
					right: 0;
					height: 1px;
					background: #e5e5e5;
					transform-origin: 0 0;             
					transform: scaleY(0.5);
				}
				&:nth-last-of-type(1) {
					&::after {
						height: 0;
					}
				}
				// 新手机号
				&.telCell {
					label {
						float: left;
						height: 50px;
						line-height: 50px;
						font-size: 16px;
						color: #666;
					} 
					.rg {
						height: 50px;
						.telInputWrap {
							width: 200px;
							height: 50px;
							padding: 8px 0;
							.telInput {
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
				&.codeCell {
					.lf {
						float: left;
						height: 50px;
						padding: 8px 0;
						.codeInput {
							display: block;
							width: 100%;
							height: 34px;
							border: none;
							outline: none;
							font-size: 14px;
							color: #999;
						}	
					}
					.rg {
						float: right;
						height: 50px;
						padding: 10px 0;
                    	width: 80px;
						.codeBtn {
							height: 30px;
							line-height: 28px;
							border: 1px solid #30b097;
							border-radius: 3px;
							font-size: 12px;
							background: #ffffff;
							color: #30b097;
							outline: none;
							text-align: center;
							box-sizing: border-box;
						}
					}
				}	
			}
		}
		// 提交按钮
		.submitBtnWrap{
			padding: 0 10px;
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
</style>