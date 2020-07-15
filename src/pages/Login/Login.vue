<template>
    <div class="loginPage">
        <div class="avatar">
            <img v-if="avatarSrc !=''" :src="avatarSrc" alt="">
            <img v-else src="../../assets/images/default_avatar.png" />
        </div>
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
                <input type="tel" class="txt" v-model="userCode" placeholder="请输入验证码" @keyup="userCodeKeyUp">
                <!-- @blur="userCodeBlur"  -->
                <span class="getCode" @click="getCodeEv" :class="{getCodeActive:userTelLen==true}">{{codeBtnTxt}}</span>
            </li>
            <div class="submit" @click="bindMobile" :class="{submitActive: userCodeLen==true}">绑定手机号</div>
            <div class="tips">未登录过的手机号，将自动创建秋果酒店帐号</div>
        </ul>
        <!-- 用户协议 -->
        <div class="user_agreement">
            <span>绑定手机号代表您已同意</span>
            <router-link to="/clause">《秋果酒店服务条款》</router-link>
        </div>
        <!-- toast -->
        <div v-show="isToastShow">
            <div class="z-mask-transparent"></div>
            <div class="z-toast">
                <i class="z-toast-icon"></i>
                <p class="z-toast-content">{{toastTxt}}</p>
            </div>
        </div>
        <!-- dialog(支付成功避免二次显示倒计时支付) -->
        <div v-show="hasLoginToast">
            <div class="z-mask-transparent-pay"></div>
            <div class="z-toast-pay">
                <p class="z-toast-pay-head">提示</p>
                <p class="z-toast-pay-body">您已注册过手机</p>
                <p class="z-toast-pay-footer" @click="hasLoginMethod">我知道了</p>
            </div>
        </div>
    </div>
</template>

<script>
import { login, sendMobile, storeLogo } from "@/api/api";
import { getCookie, setCookie, fetchCheckLogin } from "@/utils/util";

export default {
    name: "loginPage",
    components: {},
    data() {
        let openId = getCookie('openid');
        return {
            openid: openId,
            avatarSrc: "", //头像
            isToastShow: false,
            toastTxt: "",
            //用户姓名相关
            userName: "",
            userNameBtn: false,
            //用户手机号相关
            userTel: "",
            userTelBtn: false,
            userTelLen: false,
            // 验证码
            userCode: "",
            userCodeLen: false,
            // 获取验证码btn
            codeBtnTxt: "获取验证码",
            codeBtnClickCtrl: true,

            // 时间设置
            setTime: 59,
            hasLoginToast: false
        };
    },
    watch: {
        // 用户姓名监听
        userName: {
            handler(newVal, oldVal) {
                if (newVal == "") {
                    this.userNameBtn = false;
                }
            },
            deep: true,
            immediate: true
        },
        // 用户姓名监听
        userTel: {
            handler(newVal, oldVal) {
                if (newVal == "") {
                    this.userTelBtn = false;
                }
            },
            deep: true,
            immediate: true
        },
        // 监听用户是否授权（用能否获取到getCookie("avatar")来检测是否授权）
        // openid: {
        //     handler(newVal, oldVal) {
        //         if (newVal == "" || newVal == null || newVal == undefined) {
        //             this.fetchCheckLoginPackage();
        //         } else {
        //             this.fetchCheckLoginPackage();
        //         }
        //     },
        //     deep: true,
        //     immediate: true
        // }

    },
    methods: {
        // 用户姓名获焦
        userNameFocus() {
            this.userNameBtn = true; //删除按钮显示
        },
        // 用户姓名失焦
        userNameBlur() {
            this.userNameBtn = false; //删除按钮隐藏
            if (this.userName.trim() == "") {
                this.toastTxt = "姓名不能为空";
                this.isToastShow = true;
                setTimeout(() => {
                    this.isToastShow = false;
                }, 1500);
                return false;
            } else {
                let reg = new RegExp(/^[\u4E00-\u9FA5A-Za-z]+$/);
                if (!reg.test(this.userName)) {
                    this.toastTxt = "姓名格式不正确";
                    this.isToastShow = true;
                    setTimeout(() => {
                        this.isToastShow = false;
                    }, 1500);
                    return false;
                } else if (this.userName.trim().length > 12) {
                    this.toastTxt = "姓名字数超过最大长度";
                    this.isToastShow = true;
                    setTimeout(() => {
                        this.isToastShow = false;
                    }, 1500);
                    return false;
                } else {
                    return true;
                }
            }
        },
        // 用户姓名关闭按钮
        userNameClose() {
            this.userName = "";
        },
        // 用户手机号获焦
        userTelFocus() {
            this.userTelBtn = true; //删除按钮显示
        },
        // 用户手机号失焦
        userTelBlur() {
            this.userTelBtn = false; //删除按钮隐藏
            if (this.userTel == "") {
                this.toastTxt = "输入手机号不能为空";
                this.isToastShow = true;
                setTimeout(() => {
                    this.isToastShow = false;
                }, 1500);
                return false;
            } else {
                var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                if (!myreg.test(this.userTel)) {
                    this.toastTxt = "输入手机号格式有误";
                    this.isToastShow = true;
                    setTimeout(() => {
                        this.isToastShow = false;
                    }, 1500);
                    return false;
                } else {
                    return true;
                }
            }
        },
        // 用户手机号关闭小按钮
        userTelClose() {
            this.userTel = "";
            this.userTelLen = false;
        },
        // 点击按钮获取验证码
        getCodeEv() {
            if (this.codeBtnClickCtrl == false) {
                this.toastTxt = "验证码已发送，请稍后再试";
                this.isToastShow = true;
                setTimeout(() => {
                    this.isToastShow = false;
                }, 1000);
                return;
            }
            if (this.userTelBlur()) {
                this.codeBtnClickCtrl = false;
                this.$http({
                    method: "POST",
                    url: sendMobile,
                    data: {
                        mobile: this.userTel,
                        type: 4
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
                        this.toastTxt = res.data.msg;
                        this.isToastShow = true;
                        setTimeout(() => {
                            this.isToastShow = false;
                        }, 1000);
                    }
                });
            }
        },
        // 验证码失焦
        userCodeBlur() {
            if (this.userCode == "") {
                this.toastTxt = "验证码不能为空";
                this.isToastShow = true;
                setTimeout(() => {
                    this.isToastShow = false;
                }, 1500);
                return false;
            } else {
                let myReg = /^[0-9]{4}$/;
                if (!myReg.test(this.userCode)) {
                    this.toastTxt = "验证码格式不正确";
                    this.isToastShow = true;
                    setTimeout(() => {
                        this.isToastShow = false;
                    }, 1500);
                    return false;
                } else {
                    return true;
                }
            }
        },
        userCodeKeyUp() {
            let codeReg = /^[0-9]{4}$/;
            if (codeReg.test(this.userCode) && this.userCode.length == 4) {
                this.userCodeLen = true;
            } else {
                this.userCodeLen = false;
            }
        },
        // fetchCheckLoginPackage(){
        //     fetchCheckLogin({tg:"" ,form: encodeURIComponent(window.location.href)}).then(res => {
        //         if (res.data.status == 0) {
        //             window.location.href = res.data.data;
        //         } else {
        //             setCookie("userInfoTel", res.data.data.mobile);  //手机号
        //             setCookie("userVipStatus", res.data.data.status);  //会员状态（0待审、1正常、2锁定）
        //             setCookie("userUid", res.data.data.uid);
        //             setCookie("userInfoIsRealname", res.data.data.is_realname); //真实姓名
        //             setCookie("userInfoGroupid", res.data.data.group_id);  //会员组id
        //             setCookie("nickname", encodeURI(res.data.data.nickname));		//昵称
        //             setCookie("openid", res.data.data.openid);  
        //             setCookie("avatar", res.data.data.avatar);  //avatar
        //             setCookie('avail_amount',res.data.data.avail_amount);
        //             if (res.data.data.coupon_flag == 0) {
        //                 setCookie("isYouzan", 0); // 判断是不是有赞用户 1是(弹系统维护提示) 0不是（不弹）
        //             } else {
        //                 setCookie("isYouzan", 1); // 判断是不是有赞用户 1是(弹系统维护提示) 0不是（不弹）
        //             }
                    
        //         }
        //     })
        // },
        // 总的提交
        bindMobile() {
            if (
                this.userNameBlur() &&
                this.userTelBlur() &&
                this.userCodeBlur()
            ) {
                let loginPageTyp = "";
                if(this.$route.query.loginPage == 4){
                    loginPageTyp = 1;
                }
                this.$http({
                    method: "POST",
                    url: login,
                    data: {
                        mobile: this.userTel,
                        openid: this.openid,
                        code: this.userCode,
                        realname: this.userName,
                        type:loginPageTyp
                    }
                }).then(res => {
                    if (res.data.status == 1) {
                        setCookie("userInfoTel", this.userTel); //手机号
                        // 路由跳转逻辑
                        if (this.$route.query.loginPage == 2) {
                            this.$router.push({ path: "/personalCenter" });
                        } else if (this.$route.query.loginPage == 1) {
                            this.$router.push({
                                path: "/hotelDetail",
                                query: {
                                    store_id: this.$route.query.store_id
                                }
                            });
                        }else if(this.$route.query.loginPage == 3){
                            this.$router.push({path:'shoppIngDetails',query:{shopId:this.$route.query.shopId}})
                        }else if(this.$route.query.loginPage == 4){
                            this.$router.push({path:'Mine'})
                        }
                    } else {
                        this.toastTxt = res.data.msg;
                        this.isToastShow = true;
                        setTimeout(() => {
                            this.isToastShow = false;
                        }, 1500);
                    }
                });
            }
        },
        // 注册过二次提示toast中下面的跳转首页按妞
        hasLoginMethod() {
            this.hasLoginToast = false;
            if(this.$route.query.loginPage == 3){           //商品详情页面
                this.$router.push({
                    path: "shoppIngDetails",
                    query: {shopId:this.$route.query.shopId}
                });
            }else if(this.$route.query.loginPage == 1){
                this.$router.push({
                    path: "/hotelDetail",
                    query: {store_id: this.$route.query.store_id }
                });
            } else if (this.$route.query.loginPage == 2) {
                this.$router.push({ path: "/personalCenter" });
            }
        }
    },
    mounted() {
        //头像default_avatar
        this.avatarSrc = decodeURIComponent(
            decodeURIComponent(getCookie("avatar"))
        );

        let userTelInfo = getCookie("userInfoTel");
        if (userTelInfo) {
            this.hasLoginToast = true;
        }
    }
};
</script>

<style lang="less" scoped>
.loginPage {
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    overflow: auto;
    bottom: 0;
    // 头像
    .avatar {
        height: 80px;
        margin: 25px auto 32px;
        img {
            display: block;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin: 0 auto;
        }
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
                border-radius: 5px;
                position: absolute;
                top: 9px;
                right: 0;
                font-size: 12px;
                color: #999;
                border: 1px solid #e5e5e5;
                background: #fff;
                &.getCodeActive {
                    color: #fff;
                    border: 1px solid #30b097;
                    background: #30b097;
                }
            }
        }
        .submit {
            line-height: 44px;
            text-align: center;
            color: #ffffff;
            font-size: 16px;
            border-radius: 5px;
            margin: 15px auto 8px;
            background: #e5e5e5;
            &.submitActive {
                background: #30b097;
            }
        }

        .tips {
            line-height: 16px;
            font-size: 12px;
            color: #999;
            text-align: center;
        }
    }
}

.user_agreement {
    width: 100%;
    font-size: 12px;
    line-height: 16px;
    position: fixed;
    bottom: 23px;
    left: 50%;
    text-align: center;
    transform: translateX(-50%);
    color: #999;
    a {
        color: #30b097;
    }
}

</style>