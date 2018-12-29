<template>
    <div>
        <div class="topUpDetailsBox">
            <img class="charge" src="../../../assets/images/shop/charge.success.png" alt="">
            <p class="charge_title">充值成功</p>
            <p class="charge_money">入账金额<span>￥{{amount}}</span></p>
            <ul class="topUpDetailsLists">
                <li>
                    <p>类型<span>余额充值</span></p>
                </li>
                <li>
                    <p>时间<span>{{add_time}}</span></p>
                </li>
                <li>
                    <p>单号<span>{{request_no}}</span></p>
                </li>
                <li>
                    <p>充值活动<span>{{give_amount}}</span></p>
                </li>
            </ul>
        </div>
        <!-- toast(loading=>weui)  str -->
        <div v-show="loading">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">{{loadingTxt}}</p>
            </div>
        </div>
        <!-- toast(loading=>weui)  end -->
        <!-- toast（delay=>z）str -->
        <div v-show="delayToast">
            <div class="z-mask-transparent"></div>
            <div class="z-toast">
                <i class="z-toast-icon"></i>
                <p class="z-toast-content">{{delayToastTxt}}</p>
            </div>
        </div>
        <!-- toast（delay=>z）end -->
    </div>
</template>
<script>
    import {topUpDetails} from '../../../api/api.js';
    export default {
        name: "topUpDetails",
        components: {

        },
        data() {
            return {
                amount:'', //入账金额
                pay_type:'',    //类型
                add_time:'',    //时间
                request_no:'',  //单号
                give_amount:'',     //充值活动
                loading:false,
                loadingTxt:"",
                delayToast:false,
                delayToastTxt:""
            }
        },
        computed: {
            
        },
        methods: {

        },
        mounted() {
            //获取充值详情
            this.loading = true;
            this.$http({
                url:topUpDetails,
                method:'POST',
                data:{
                    id:this.$route.query.topUpId
                }
            }).then(res=>{
                console.log(res);
                this.loading = false;
                if(res.data.status == 1){
                    this.amount = res.data.data[0].amount;
                    this.pay_type = res.data.data[0].pay_type;
                    this.add_time = res.data.data[0].add_time;
                    this.request_no = res.data.data[0].request_no;
                    this.give_amount = res.data.data[0].give_amount;
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
<style lang='less' scoped>
    @import './topUpDetails.less';
</style>

