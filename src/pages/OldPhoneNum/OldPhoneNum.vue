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
				<label>原手机号</label>
				<div class="rg fr">
					<div class="telInputWrap">
						<input type="tel" v-model="oldPhoneNum" class="telInput tr" placeholder="请输入手机号" disabled>
					</div>
				</div>
			</li>
			<li class="codeCell">
				<div class="lf">
					<input type="tel" v-model="codeVal" class="codeInput" @blur="codeInputBlur" placeholder="请输入验证码">
				</div>
				<div class="rg">
					<div class="codeBtn" @click="getCode">{{codeBtnTxt}}</div>
				</div>
			</li>
		</ul>
		<!-- 提交 -->
		<div class="submitBtnWrap">
			<div class="submit" @click="submitBtn">更换手机号</div>
		</div>
		<!-- 联系我们 -->
		<div class="contactUs">
			<span>无法验证身份，</span>
			<a href="tel:400-099-9682">联系客服</a>
		</div>
	</div>
</template>

<script>
import { sendMobile, check_mobile } from "@/api/api.js";
export default {
    name: "oldPhoneNumPage",
    data() {
        return {
            oldPhoneNum: "", // 旧手机号
            codeVal: "", // 验证码
            setTime: 59,
            delayToast: false, // delayToast是否显示
            delayToastTxt: "", // delayToastTxt的文案
            codeBtnTxt: "获取验证码", // 验证码btn的txt
            codeBtnClickCtrl: true, // 验证码btn的控制
        };
    },
    methods: {
        // 验证码失焦
        codeInputBlur() {
            var reg = new RegExp(/^\d{4}$/);
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
        codeInputFocus() {
            
        },
        // 验证码满足4位，激活高亮
        codeInputKeyUp() {
            
        },
        // 获取验证码
        getCode() {
            if (this.codeBtnClickCtrl == false) {
                this.delayToastTxt = "验证码已发送，请稍后再试";
                this.delayToast = true;
                setTimeout(() => {
                    this.delayToast = false;
                }, 1500);
                return;
            }
            this.$http({
                method: "POST",
                url: sendMobile,
                data: {
                    mobile: this.oldPhoneNum,
                    type: 6  // 更换手机号，传6
                }
            }).then(res => {
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
        },
        // 提交
        submitBtn() {
            if (this.codeInputBlur()) {
                this.$http({
                    url: check_mobile,
                    method: "POST",
                    data: {
                        mobile: this.oldPhoneNum,
                        code: this.codeVal.trim(),
                        type: 1
                    }
                }).then(res => {
                    if (res.data.status == 1) {
                        this.$router.push({ path: "/newPhoneNum" });
                    } else {
                        this.delayToastTxt = res.data.msg;
                        this.delayToast = true;
                        setTimeout(() => {
                            this.delayToast = false;
                        }, 1500);
                    }
                });
            }
        },
    },
    mounted() {
        this.oldPhoneNum = this.$route.query.oldMobile; //手机号
    }
};
</script>

<style lang="less" scoped>
.oldPhoneNumPage {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #eff1f0;
    padding-top: 10px;
    ul {
        padding: 0 10px;
        background: #fff;
        margin-bottom: 25px; 
        li {
            position: relative;
            height: 50px;
            &::after {
                content: "";
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
                            background: #fff;
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
                        background: #ffffff;
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
    .submitBtnWrap {
        padding: 0 10px;
        .submit {
            text-align: center;
            line-height: 44px;
            border-radius: 5px;
            font-size: 15px;
            background: #30b097;
            color: #fff;
        }
    }
}

.contactUs {
    font-size: 12px;
    color: #999;
    text-indent: 15px;
    margin-top: 10px;
    a {
        color: #30b097;
    }
}
</style>