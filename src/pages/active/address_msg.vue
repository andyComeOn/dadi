<template>
    <div>
        <!-- 编辑收货地址 str -->
        <div class="editAddress">
            <div class="editAddress_hint">恭喜您抽中实物大奖，请务必保证下方信息的真实性，以便我们工作人员给你邮寄奖品</div>
            <ul>
                <li>
                    <p>收货人</p>
                    <input v-model="editName" type="text" value="" placeholder="请输入收货人姓名...">
                </li>
                <li>
                    <p>手机号</p>
                    <input v-model="editMobile" type="text" value="" placeholder="请输入收货人手机号...">
                    <img v-if="editMobile != '' " class="text_close" src="../../assets/images/shop/text_close.png" alt="" @click="editMobile = ''">
                </li>
                <li>
                    <p>详细地址</p>
                    <input v-model="editAddressDetail" type="text" value="" placeholder="请输入收货地址...">
                </li>
            </ul>
            
            <!-- 保存Btn str -->
            <div class="saveBtn">
                <p @click="saveBtn()">保存</p>
            </div>
            <!-- 保存Btn end -->
        </div>
        <!-- 编辑收货地址 end -->
        <!-- toast(loading=>weui) -->
        <div v-show="loading">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">{{loadingTxt}}</p>
            </div>
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
<style lang='less' scoped>
    @import './address_msg.less';
</style>
<script>
    import {getInformation} from '../../api/api.js';
    import { Toast } from 'vant';
    export default {
        name: "addressMsg",
        components: {

        },
        data() {
            return {
                editName:"",
                editMobile:"",
                editAddressDetail:"",
                loading: false,              // toast控制开关
                loadingTxt: "数据加载中",    // toast中文案
                delayToast: false,          // tips开关
                delayToastTxt: "",          // tips文案
            }
        },
        computed: {
            
        },
        methods: {
            saveBtn(){
                let RegName = /^[\u4E00-\u9FA5A-Za-z]+$/;
                if(this.editName == ""){
                    Toast('收货人不能为空');
                    return false;
                }else if(!RegName.test(this.editName)){
                    Toast('收货人输入错误');
                    return false;
                }
                let RegMobile = /^(1)\d{10}$/;
                if(this.editMobile == ""){
                    Toast('手机号不能为空');
                    return false;
                }else if(!RegMobile.test(this.editMobile)){
                    Toast('手机号输入错误');
                    return false;
                }
                this.$http({
                    url: getInformation,
                    method: "POST",
                    data: {
                        prize_id:this.$route.query.id,
                        name:this.editName,
                        mobile:this.editMobile,
                        address:this.editAddressDetail
                    }
                }).then(res => {
                    if(res.data.status == 1){
                        setTimeout(()=>{
                            this.delayToast = true;
                            this.delayToastTxt = "您的中奖信息提交成功，我们会尽快给您发货。";
                            setTimeout(()=>{
                                this.delayToast = false;
                                this.$router.push({path:"/shoppIng"});
                            },1500);
                        })
                    }else{
                        this.delayToast = true;
                        this.delayToastTxt = res.data.msg;
                        setTimeout(()=>{
                            this.delayToast = false;
                        },1500);
                    }
                });
            }
        }
    }
</script>

