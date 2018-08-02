<template>
	<div class="login">
		<div class="avatar">
			<img src="../../assets/images/img/room.png" alt="">
		</div>
		<div class="welcome">欢迎来到秋果酒店</div>

		<ul class="list">
			<li>
				<input type="number" class="txt" v-model="tel">
				<span class="close"><img src="../../assets/images/ic-close.png" alt=""></span>
			</li>
			<li>
				<input type="number" class="txt" v-model="testCode">
				<span class="getCode"> 获取验证码</span>
			</li>
			<div class="bind">绑定手机号</div>
			<div class="tips">未登录过的手机号，将自动创建秋果酒店帐号</div>

		</ul>
	</div>
</template>

<script>
export default {
    name: "nearby",
    components: {},
    data() {
        return {};
    }
};
</script>

<style lang="less" scoped>
.login {
    // 头像
    .avatar {
        height: 80px;
        margin: 25px auto 8px;
        img {
            display: block;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin: 0 auto;
        }
    }
    // 欢迎语
    .welcome {
        line-height: 14px;
        margin-bottom: 24px;
        font-size: 10px;
        text-align: center;
        color: #666;
    }
    .list {
        padding: 0 15px;
        li {
            height: 50px;
            position: relative;
            &:after {
                content: "";
                position: absolute;
                width: 100%;
                height: 1px;
                left: 0;
                bottom: 0;
                background: #e5e5e5;
                transform: scaleY(0.5);
            }
            .txt {
                width: 200px;
                height: 50px;
                float: left;
                border: none;
                outline: none;
            }
            .close {
                width: 14px;
                height: 14px;
                border-radius: 50%;
                position: absolute;
                right: 0;
                top: 50%;
                margin-top: -7px;
                img {
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                }
            }
            .getCode {
                line-height: 30px;
                padding: 0 13px;
                color: #999;
                border: 1px solid #e5e5e5;
                border-radius: 5px;
                position: absolute;
                top: 9px;
                right: 0;
                font-size: 12px;
            }
        }
        .bind {
            line-height: 44px;
            background: #30b097;
            text-align: center;
            color: #ffffff;
            font-size: 16px;
            border-radius: 5px;
            margin: 15px auto 8px;
        }
        .tips {
            line-height: 16px;
            font-size: 12px;
            color: #999;
            text-align: center;
        }
    }
}
</style>