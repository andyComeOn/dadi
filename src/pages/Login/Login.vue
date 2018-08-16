<template>
    <div class="login">
        <div class="avatar">
            <img src="../../assets/images/img/room.png" alt="">
        </div>
        <div class="welcome">欢迎来到秋果酒店</div>

        <ul class="list">
            <li>
                <input type="text" class="txt" v-model="userName" placeholder="请输入真实姓名" @focus="userNameFocus" @blur="userNameBlur">
                <span class="close" v-show="userNameBtn" @click="userNameClose">
                    <img src="../../assets/images/ic-close.png" alt="">
                </span>
            </li>
            <li>
                <input type="tel" class="txt" v-model="userTel" placeholder="请输入手机号" @focus="userTelFocus" @blur="userTelBlur">
                <span class="close" v-show="userTelBtn" @click="userTelClose">
                    <img src="../../assets/images/ic-close.png" alt="">
                </span>
            </li>
            <li>
                <input type="tel" class="txt" v-model="userCode" placeholder="请输入验证码" @focus="userCodeFocus" @blur="userCodeBlur">
                <span class="getCode-aaa" v-if="coder_show_aaa">获取验证码</span>
                <span class="getCode" v-if="coder_show" @click="getCodeEv">获取验证码</span>
                <span class="test-code-btn" v-if="get_code_btn == true">{{getTime}}s后重新获取</span>
            </li>
            <div class="bind" @click='bindMobile' v-if='bind_show'>绑定手机号</div>
            <div class="bind_aaa" v-if='bind_aaa_show'>绑定手机号</div>
            <div class="tips">未登录过的手机号，将自动创建秋果酒店帐号</div>
        </ul>
        <!-- 用户协议 -->
        <div class="user_agreement">
            <span>注册登录代表您已同意</span>
            <a class="" href="javascript:;">《秋果酒店服务条款》</a>
        </div>
        <!-- hint str -->
        <span class="hint_box" v-if='hint_box_show == true'>{{hint_box_content}}</span>
        <!-- hint end -->
    </div>
</template>

<script>
    import {login,sendMobile} from '../../api/api.js';
    export default {
        name: "login",
        components: {
            
        },
        data() {
            return {
                //用户姓名相关
                userName: "",
                userNameBtn: false,
                userNameErrVisible: false,
                userNameErrTxt: "",
                //用户手机号相关
                userTel: "",
                userTelBtn: false,
                userTelErrVisible: false,
                userTelErrTxt:"",
                // 验证码相关
                userCode: "",
                hint_box_show:false,        //提示信息显示、隐藏
                hint_box_content:'',        //提示信息
                coder_show_aaa:true,
                coder_show:false,
                get_code_btn:false,
                setTime: 58,
                getTime:'59',
                bind_show:false,
                bind_aaa_show:true,
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
                this.userNameBtn = true;  //删除按钮显示
            },
            // 用户姓名失焦
            userNameBlur() {
                this.userNameBtn = false;  //删除按钮隐藏
                if(this.userName == ''){
                    this.bind_aaa_show = true;
                    this.bind_show = false;
                    this.hint_box_show = true;
                    this.hint_box_content = '姓名不能为空';
                    setTimeout(()=>{
                        this.hint_box_show = false;
                        this.hint_box_content = '';
                    },2000);
                }else{
                    let reg = new RegExp(/^[\u4E00-\u9FA5A-Za-z]+$/);
                    if(!reg.test(this.userName)){
                        this.hint_box_show = true;
                        this.hint_box_content = '姓名格式不正确';
                        setTimeout(()=>{
                            this.hint_box_show = false;
                            this.hint_box_content = '';
                        },2000);
                    }else{
                        if(this.userTel == '' || this.userCode == ''){
                            this.bind_aaa_show = true;
                            this.bind_show = false;
                        }else{
                            this.bind_aaa_show = false;
                            this.bind_show = true;
                        }
                    }
                }
            },
            // 用户姓名关闭按钮
            userNameClose(){
                this.userName = "";
            },
            // ------分割线-------
            // 用户手机号获焦
            userTelFocus() {
                this.userTelBtn = true;  //删除按钮显示
            },
            // 用户手机号失焦
            userTelBlur() {
                this.userTelBtn = false;   //删除按钮隐藏
                if (this.userTel == "") {
                    this.bind_aaa_show = true;
                    this.bind_show = false;
                    this.hint_box_show = true;
                    this.hint_box_content = '输入手机号不能为空';
                    setTimeout(()=>{
                        this.hint_box_show = false;
                        this.hint_box_content = '';
                    },2000);
                    this.coder_show_aaa = true;
                    this.coder_show = false;
                } else {
                    var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                    if (!myreg.test(this.userTel)){
                        this.hint_box_show = true;
                        this.hint_box_content = '输入手机号格式有误';
                        setTimeout(()=>{
                            this.hint_box_show = false;
                            this.hint_box_content = '';
                        },2000);
                        this.coder_show_aaa = true;
                        this.coder_show = false;
                    }else{
                        if(this.userName == '' || this.userCode == ''){
                            this.bind_aaa_show = true;
                            this.bind_show = false;
                        }else{
                            this.bind_aaa_show = false;
                            this.bind_show = true;
                        }
                        this.coder_show_aaa = false;
                        this.coder_show = true;
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

            },
            // 点击按钮获取验证码
            getCodeEv() {
                if(this.userTel == ''){
                    this.hint_box_show = true;
                    this.hint_box_content = '手机号不能为空';
                    setTimeout(() => {
                        this.hint_box_show = false;
                        this.hint_box_content = '';
                    }, 2000);
                }else{
                    this.$http({
                        method:'POST',
                        url:sendMobile,
                        data:{
                            mobile:this.userTel
                        }
                    }).then((res)=>{
                        console.log(res);
                        if(res.data.status == 1){
                            //倒计时
                            this.get_code_btn = true;
                            this.coder_show_aaa = false;
                            this.coder_show = false;
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
                                    this.get_code_btn = false;
                                    this.coder_show_aaa = false;
                                    this.coder_show = true;
                                    this.setTime = 58;
                                    this.getTime = 59;
                                }
                            }, 1000);
                        }else{

                        }
                    });
                }
            },
            // 验证码失焦
            userCodeBlur() {
                if (this.userCode == "") {
                    this.bind_aaa_show = true;
                    this.bind_show = false;
                    this.hint_box_show = true;
                    this.hint_box_content = '验证码不能为空';
                    setTimeout(() => {
                        this.hint_box_show = false;
                        this.hint_box_content = '';
                    }, 2000);
                } else {
                    var myreg = /^[0-9]{4}$/;
                    if(!myreg.test(this.userCode)){
                        this.hint_box_show = true;
                        this.hint_box_content = '验证码格式不正确';
                        setTimeout(() => {
                            this.hint_box_show = false;
                            this.hint_box_content = '';
                        }, 2000);
                    }else{
                        if(this.userTel == '' || this.userName == ''){
                            this.bind_aaa_show = true;
                            this.bind_show = false;
                        }else{
                            this.bind_aaa_show = false;
                            this.bind_show = true;
                        }
                    }
                }
            },
            // 总的提交
            bindMobile(){
                let openId = this.$route.query.openId;
                this.$http({
                    method:'POST',
                    url:login,
                    data:{
                        mobile:this.userTel,
                        openid:openId,
                        code:this.userCode,
                        realname:this.userName
                    }
                }).then((res)=>{
                    console.log(res);
                    if(res.data.status == 1){
                        if(this.$route.query.loginPage == 2){
                            this.$router.push({path:'/personalCenter'});
                        }else{

                        }
                    }else{
                        this.hint_box_show = true;
                        this.hint_box_content = res.data.msg;
                        setTimeout(()=>{
                            this.hint_box_show = false;
                            this.hint_box_content = '';
                        },2000);
                    }
                });
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
                color: #fff;
                border: 1px solid #30b097;
                border-radius: 5px;
                position: absolute;
                top: 9px;
                right: 0;
                font-size: 12px;
                background: #30b097;
            }
            .getCode-aaa{
                line-height: 30px;
                padding: 0 13px;
                color: #999;
                border: 1px solid #e5e5e5;
                border-radius: 5px;
                position: absolute;
                top: 9px;
                right: 0;
                font-size: 12px;
                background: #fff;
            }
            .test-code-btn{
                line-height: 30px;
                padding: 0 13px;
                color: #999;
                border: 1px solid #e5e5e5;
                border-radius: 5px;
                position: absolute;
                top: 9px;
                right: 0;
                font-size: 12px;
                background: #fff;
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
        .bind_aaa{
            line-height: 44px;
            background: #e5e5e5;
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
.hint_box{
    background:rgba(75,75,75,0.7);
    color: #fff;
    padding:5px 10px;
    font-size: 8px;
    line-height: 16px;
    border-radius: 13px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top:-13px;
    transform: translateX(-50%);
}
.user_agreement{
    width: 100%;
    font-size: 12px;
    line-height: 16px;
    position: fixed;
    bottom: 23px;
    left: 50%;
    text-align: center;
    transform: translateX(-50%);
    color: #999;
    a{
        color: #30b097;
    }
}
</style>