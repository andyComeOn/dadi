<template>
    <div id="addContactPage" class="m-position-ab">
        <div class="box">
            <div class="bd">
                <div class="item name">
                    <label>入住人</label>
                    <div class="txt-wrapper">
                        <input type="text" class="txt" placeholder="请输入姓名" v-model="inputName">
                    </div>
                </div>
                <div class="item tel">
                    <label>联系电话</label>
                    <div class="txt-wrapper">
                        <input type="num" class="txt" placeholder="请输入您的手机号" v-model="inputTel" @keyup="inputTelKeyup">
                        <span class="close" v-show="inputTelBtn" @click="inputTelClose">
                            <img src="../../assets/images/ic-close.png" alt="">
                        </span>
                    </div>
                </div>
            </div>
            <div class="ft" @click="select()">
                设置为默认联系人
                <span class="select">
                    <img :src="type == 1 ? imgSrcActive : imgSrcDefault" alt="">
                </span>
            </div>
        </div>
        <!-- savebar -->
        <div class="bar" @click="submit">
            保存
        </div>
        <!-- toast（delay=>z） -->
        <div v-show="delayToast">
            <div class="z-mask-transparent"></div>
            <div class="z-toast">
                <i class="z-toast-icon"></i>
                <p class="z-toast-content">{{delayToastTxt}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { residentList, addResident } from "@/api/api";
export default {
    name: "addContactPage",
    data() {
        return {
            id: "",
            type: "",
            inputName: "",
            inputTel: "",
            delayToastTxt: "",
            delayToast: false,
            inputTelBtn: false,
            imgSrcDefault: require("../../assets/images/icon/ic-radio.png"),
            imgSrcActive: require("../../assets/images/icon/ic-radio-ed.png")
        };
    },
    created() {
        var urlPara = {
            id: this.$route.query.id,
            type: this.$route.query.type,
            username: this.$route.query.username,
            mobile: this.$route.query.mobile
        };
        if (!urlPara.id) {
            this.id = "";
            this.type = "";
            this.inputName = "";
            this.inputTel = "";
        } else {
            this.id = urlPara.id;
            this.type = urlPara.type;
            this.inputName = urlPara.username;
            this.inputTel = urlPara.mobile;
        }
    },
    mounted() {},
    methods: {
        // 验证入住联系人
        inputNameBlur() {
            if (this.inputName.trim() == "") {
                this.delayToastTxt = "入住人姓名不能为空";
                this.delayToast = true;
                setTimeout(() => {
                    this.delayToast = false;
                }, 1500);
                return false;
            } else {
                let reg = new RegExp(/^[\u4E00-\u9FA5A-Za-z]+$/);
                if (!reg.test(this.inputName)) {
                    this.delayToastTxt = "入住人姓名格式不正确";
                    this.delayToast = true;
                    setTimeout(() => {
                        this.delayToast = false;
                    }, 1500);
                    return false;
                } else {
                    return true;
                }
            }
        },
        // 订房人input手机失焦
        inputTelBlur() {
            if (this.inputTel.trim() == "") {
                this.delayToastTxt = "输入手机号不能为空";
                this.delayToast = true;
                setTimeout(() => {
                    this.delayToast = false;
                }, 1500);
                return false;
            } else {
                var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                if (!myreg.test(this.inputTel.trim())) {
                    this.delayToastTxt = "输入手机号格式有误";
                    this.delayToast = true;
                    setTimeout(() => {
                        this.delayToast = false;
                    }, 1500);
                    return false;
                } else {
                    return true;
                }
            }
        },
        // 入住人电话清空按钮
        inputTelClose() {
            this.inputTel = "";
            this.inputTelBtn = false;
        },
        // 入住人电话键盘事件
        inputTelKeyup() {
            if (this.inputTel.trim().length == 0) {
                this.inputTelBtn = false;
            } else if (this.inputTel.trim().length >= 12){
                this.inputTelBtn = true;
                this.inputTel = this.inputTel.slice(0,11);
            } else {
                this.inputTelBtn = true;
            }
        },
        // 设置为默认入住联系人
        select() {
            if (this.type == 1) {
                this.type = 0;
            } else {
                this.type = 1;
            }
        },
        // 提交
        submit() {
            if (this.inputNameBlur() && this.inputTelBlur()) {
                this.$http({
                    method: "POST",
                    url: addResident,
                    data: {
                        id: this.id,
                        type: this.type,
                        username: this.inputName,
                        mobile: this.inputTel
                    }
                })
                    .then(res => {
                        if (res.data.status == 1) {
                            this.delayToastTxt = "保存成功";
                            this.delayToast = true;
                            setTimeout(() => {
                                this.delayToast = false;
                                this.$router.push({
                                    path: "/userInfo"
                                });
                            }, 1500);
                        }
                    })
                    .catch(err => {});
            }
        }
    }
};
</script>

<style lang="less" scoped>
#addContactPage {
    background: #fff;
    overflow: auto;
}
.box {
    padding-left: 15px;
    .bd {
        position: relative;
        color: #666;
        font-size: 14px;
        &:after {
            content: "";
            width: 100%;
            height: 1px;
            position: absolute;
            bottom: 0;
            background: #e5e5e5;
            transform: scaleY(0.5);
        }
        .item {
            height: 45px;
            line-height: 45px;
        }
        label {
            width: 80px;
            float: left;
        }
        .txt-wrapper {
            margin-left: 80px;
            height: 45px;
            border: none;
            outline: none;
            position: relative;
            .txt {
                display: block;
                width: 180px;
                line-height: 45px;
                border: none;
                outline: none;
            }
            .close {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                position: absolute;
                right: 15px;
                top: 50%;
                margin-top: -8px;
                img {
                    display: block;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                }
            }
        }
    }
    .ft {
        padding: 0 15px 0 0;
        line-height: 45px;
        font-size: 14px;
        position: relative;
        .select {
            width: 20px;
            height: 20px;
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            border-radius: 50%;
            img {
                display: block;
                width: 20px;
                height: 20px;
            }
        }
    }
}
.bar {
    left: 15px;
    right: 15px;
    bottom: 40px;
    position: fixed;
    background: #30b097;
    line-height: 45px;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
}
</style>