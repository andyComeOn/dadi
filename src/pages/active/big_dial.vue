<template>
    <div class="bg_active">
        <img class="header_img" src="../../assets/images/active/header.png" />
        <div class="turntable_box">
            <img class="turntable_bg" :style="{'transform':num}" src="../../assets/images/active/turntable.png" />
            <img class="pointer_bg" @click.once="pointerBtn()" src="../../assets/images/active/pointer.png" />
        </div>
        <ul class="active_hint">
            <li><h3>活动规则</h3></li>
            <li>1、活动期间用户免费参与，每个用户参与一次；</li>
            <li>2、中奖后请填写个人信息；</li>
            <li>3、本次活动最终归属秋果商城所有；</li>
            <li>4、活动时间：2019年12月12日全天。</li>
        </ul>
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
<style lang="less">
    @import './big_dial.less';
</style>
<script>
    import { bigDialList,drawPrize } from "../../api/api.js";
    import { Dialog,Toast } from 'vant';
    export default {
        name: "big_dial",
        data() {
            return {
                loading:false,
                loadingTxt:"",
                delayToast:false,
                delayToastTxt:"",
                offOn:"",
                num:"",
                prize_flag:0
            }
        },
        methods: {
            pointerBtn(){
                if(this.offOn){
                    this.$http({
                        url: drawPrize,
                        method: "POST",
                        data: {}
                    }).then(res => {
                        if(res.data.status == 1){
                            this.offOn = false;
                            this.num = "rotate("+res.data.data.degrees+"deg)";
                            if(res.data.data.type == 1){
                                setTimeout(()=>{
                                    Dialog.alert({
                                        title: '恭喜您中奖!',
                                        message: '恭喜您抽中了“' + res.data.data.name + '”，请到我的优惠券查看。',
                                        confirmButtonText:"去购物"
                                    }).then(() => {
                                        this.$router.push({path:"/shoppIng"});
                                    });
                                },4000);
                            }else{
                                setTimeout(()=>{
                                    Dialog.alert({
                                        title: '恭喜您中奖!',
                                        message: '恭喜您抽中了“' + res.data.data.name + '”，请填写个人信息，我们会按照您的个人信息给您发货，请注意查收。',
                                        confirmButtonText:"填写中奖信息"
                                    }).then(() => {
                                        this.$router.push({path:"/addressMsg",query:{id:res.data.data.id}});
                                    });
                                },4000);
                            }
                            this.offOn = false;
                        }else{
                            Toast(res.data.msg);
                        }
                    });
                }else{
                    if(this.prize_flag == 1){
                        Toast('您已经参与过抽奖活动，更多精彩活动请关注“秋果官方服务”公众号');
                    }else if(this.prize_flag == 2){
                        Toast('抽奖活动暂未开始');
                    }else if(this.prize_flag == 3){
                        Toast('抽奖活动已结束');
                    }
                }
            }
        },
        mounted() {
            this.loading = true;
            this.$http({
                url: bigDialList,
                method: "POST",
                data: {}
            }).then(res => {
                this.loading = false;
                if(res.data.status == 1){
                    if(res.data.data.prize_flag == 1){   //0未参与   1参与
                        if(res.data.data.type == 1){
                            Dialog.alert({
                                title: '恭喜您中奖!',
                                message: '恭喜您抽中了“' + res.data.data.prize_name + '”，请到我的优惠券查看。',
                                confirmButtonText:"去购物"
                            }).then(() => {
                                this.$router.push({path:"/shoppIng"});
                            });
                        }else{
                            if(res.data.data.adress == 0){
                                Dialog.alert({
                                    title: '恭喜您中奖!',
                                    message: '恭喜您抽中了“' + res.data.data.prize_name + '”，请填写个人信息，我们会按照您的个人信息给您发货，请注意查收。',
                                    confirmButtonText:"填写中奖信息"
                                }).then(() => {
                                    this.$router.push({path:"/addressMsg",query:{id:res.data.data.id}});
                                });
                            }else{
                                Dialog.alert({
                                    title: '恭喜您中奖!',
                                    message: '恭喜您抽中了“' + res.data.data.prize_name + '”。',
                                    confirmButtonText:"去购物"
                                }).then(() => {
                                    this.$router.push({path:"/shoppIng"});
                                });
                            }
                        }
                        this.offOn = false;
                        this.prize_flag = 1;
                    }else if(res.data.data.prize_flag == 2){
                        Toast('抽奖活动暂未开始');
                        this.offOn = false;
                        this.prize_flag = 2;
                    }else if(res.data.data.prize_flag == 3){
                        Toast('抽奖活动已结束');
                        this.offOn = false;
                        this.prize_flag = 3;
                    }else{
                        this.offOn = true;
                    }
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
</script>
