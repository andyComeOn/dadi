<template>
    <!-- 输入相关信息，兑换 -->
    <div>
        <img class="exchange_img" src="../../../assets/images/active/headline/img01.png" />
        <div class="input_box">
            <div class="phone_inp_box">
                <input v-model="phoneVal" class="phone_inp" type="text" placeholder="请输入手机号...">
            </div>
            <div class="code_box">
                <div class="code_input_box">
                    <input type="text" v-model="codeVal" placeholder="请输入短信验证码...">
                </div>
                <template>

                    <span v-if="this.sendMsgType" class="code_btn" @click="codeBtn()">获取验证码</span>
                    <span v-else class="code_btn_ccc">{{this.setTimeCode}}s后重新获取</span>
                </template>


            </div>
        </div>
        <div class="footer_box">
            <div class="footer_btn" @click="footerBtn()">点击兑换</div>
        </div>
        <!-- toast(loading=>weui) -->
        <div v-show="loading">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">{{loadingTxt}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { exchangeApi,exchange_codeApi } from "../../../api/active.js";
    import { Toast } from 'vant';
    export default {
        data() {
            return {
                phoneVal:"",
                codeVal:"",
                _codeVal:"",
                loading:false,
                loadingTxt:"",
                setTimeCode: 59,
                timer: "",
                sendMsgType:true
            }
        },
        methods: {
            timerMethod(){
                this.setTimeCode = 59; // 重新赋值
                this.sendMsgType = false;
                let timer = setInterval(() => {
                    if (this.setTimeCode > 0) {
                        let tmpSec = parseInt(this.setTimeCode);
                        this.setTimeCode--;
                    } else {
                        clearInterval(timer);
                        this.sendMsgType = true;
                    }
                }, 1000);
            },
            codeBtn(){
                let Reg = /^1[3456789]\d{9}$/;
                if(!Reg.test(this.phoneVal)){
                    Toast("手机号输入错误");
                    return false;
                }

                this.loading = true;
                this.$http({
                    url: exchange_codeApi,
                    method: "POST",
                    data: {
                        mobile:this.phoneVal,
                        type:2
                    }
                }).then(res => {
                    this.loading = false;
                    if(res.data.status == 1){
                        this._codeVal = res.data.data;
                        this.timerMethod();
                    }else{
                        Toast(res.data.msg);
                    }
                });
            },
            footerBtn(){
                let Reg = /^1[3456789]\d{9}$/;
                if(!Reg.test(this.phoneVal)){
                    Toast("手机号输入错误");
                    return false;
                }
                if(this.codeVal == ""){
                    Toast("验证码不能为空");
                    return false;
                }else if(this.codeVal != this._codeVal){
                    Toast("验证码输入有误");
                    return false;
                }
                this.loading = true;
                this.$http({
                    url: exchangeApi,
                    method: "POST",
                    data: {
                        mobile:this.phoneVal,
                    }
                }).then(res => {
                    this.loading = false;
                    if(res.data.status == 1){
                        this.$router.push({path:"/mine"})
                    }else{
                        Toast(res.data.msg);
                    }
                });
            }
        },
        mounted() {

        },
    }
</script>

<style lang="less" scoped>
    @import "./headline_index.less";
</style>
