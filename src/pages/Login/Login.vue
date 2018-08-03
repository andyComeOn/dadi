<template>
    <div class="login">
        <div class="avatar">
            <img src="../../assets/images/img/room.png" alt="">
        </div>
        <div class="welcome">欢迎来到秋果酒店</div>

        <ul class="list">
            <li>
                <input type="text" class="txt" v-model="userName" placeholder="请输入你的真实姓名" @keyup="userNameEv" @focus="userNameFocus" @blur="userNameBlur">
                <span class="close" v-show="userNameBtn" @click="userNameClose">
                    <img src="../../assets/images/ic-close.png" alt="">
                </span>
                <span v-show="userNameErrVisible" class="errTips">{{userNameErrTxt}}</span>
            </li>
            <li>
                <input type="tel" class="txt" v-model="userTel" placeholder="请输入你的手机号" @keyup="userTelEv" @focus="userTelFocus" @blur="userTelBlur">
                <span class="close" v-show="userTelBtn" @click="userTelClose">
                    <img src="../../assets/images/ic-close.png" alt="">
                </span>
                <span v-show="userTelErrVisible" class="errTips">{{userTelErrTxt}}</span>
            </li>
            <li>
                <input type="tel" class="txt" v-model="userCode" placeholder="请输入收到的验证码" @keyup="userCodeEv" @focus="userCodeFocus" @blur="userCodeBlur">
                <span class="getCode" @click="getCodeEv">获取验证码</span>
                <span v-show="userCodeErrVisible" class="errTips">{{userCodeErrTxt}}</span>
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
        return {
            // 用户姓名相关
            userName: "",
            userNameBtn: false,
            userNameErrVisible: false,
            userNameErrTxt: "",
            // 用户手机号相关
            userTel: "",
            userTelBtn: false,
            userTelErrVisible: false,
            userTelErrTxt: "",
            // 验证码相关
            userCode: "",
            userCodeErrVisible: false,
            userCodeErrTxt: ""
        };
    },
    watch: {
        // 用户姓名监听
        userName:{
            handler(newVal,oldVal){
                if(newVal==""){
                    this.userNameBtn = false;
                }
            },
            deep: true,
            immediate: true
        },
        // 用户姓名监听
        userTel:{
            handler(newVal,oldVal){
                if(newVal==""){
                    this.userTelBtn = false;
                }
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        // 用户姓名获焦
        userNameFocus() {
            this.userNameErrVisible = false;
            this.userNameBtn = true;
        },
        // 用户姓名键盘
        userNameEv() {
            if(this.userName=="") {
                this.userNameBtn = false;
            } else{
                this.userNameBtn = true;
            }
        },
        // 用户姓名失焦
        userNameBlur() {
            if (this.userName.trim() == "") {
                this.userNameErrTxt = "你的真实姓名不能为空";
                this.userNameErrVisible = true;
                return false;
            } else {
                this.userNameErrVisible = false;
                return true;
            }
        },
        // 用户姓名关闭按钮
        userNameClose(){
            this.userName = "";
        },
        // ------分割线-------
        // 用户手机号获焦
        userTelFocus() {
            this.userTelErrVisible = false;
            this.userTelBtn = true;
        },
        // 用户手机号键盘
        userTelEv() {
            if(this.userTel==""){
                this.userTelBtn = false;
            } else{
                this.userTelBtn = true;
            }
        },
        // 用户手机号失焦
        userTelBlur() {
            if (this.userTel == "") {
                this.userTelErrTxt = "输入手机号不能为空";
                this.userTelErrVisible = true;
                return false;
            } else if (this.userTel != "") {
                var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                if (!myreg.test(this.userTel.trim())) {
                    this.userTelErrTxt = "输入手机号格式有误";
                    this.userTelErrVisible = true;
                    return false;
                } else {
                    return true;
                }
            }
        },
        // 用户手机号关闭按钮
        userTelClose(){
            this.userTel = "";
        },
        // ------分割线-----
        // 验证码获焦
        userCodeFocus() {
            this.userCodeErrVisible = false;
        },
        // 验证码键盘
        userCodeEv() {
            // this.$http().then().catch();
        },
        // 点击按钮获取验证码
        getCodeEv() {},
        // 验证码失焦
        userCodeBlur() {
            if (this.userCode == "") {
                this.userCodeErrTxt = "验证码不能为空";
                this.userCodeErrVisible = true;
                return false;
            } else if (this.userCode != "") {
                var myreg = /^[0-9]{4}$/;
                if (!myreg.test(this.userCode.trim())) {
                    this.userCodeErrTxt = "验证码格式有误";
                    this.userCodeErrVisible = true;
                    return false;
                } else {
                    return true;
                }
            }
        },
        // 总的提交
        submit(){
            
        }
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
            .errTips {
                position: absolute;
                top: 31px;
                left: 0px;
                color: red;
                font-size: 8px;
            }
            .txt {
                width: 200px;
                height: 50px;
                float: left;
                border: none;
                outline: none;
                font-size: 15px;
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