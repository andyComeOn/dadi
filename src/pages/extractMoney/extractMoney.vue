<template>
    <div>
        <div v-if="isShowMoney" class="bd-extract">
            <div class="extract_box bd-fff">
                <p>提现金额</p>
                <div class="extract_input">
                    <span>￥</span>
                    <input type="text" v-model="extractVal" value='' placeholder="请输入金额..." />
                </div>
                <p class="extract_money">可提现金额：¥{{use_amount}}</p>
                <!-- <router-link to='/extractCheck'> -->
                    <div class='extract_btn' @click="extractBtn">提现</div>
                <!-- </router-link> -->
            </div>
            <p class="extract_hint">温馨提示：预计在3个工作日内到账</p>
            <!-- hint str -->
            <span class="hint_box" v-if='hint_box_show == true'>{{hint_box_content}}</span>
            <!-- hint end -->
        </div>
        <!-- extractCheck str -->
        <extractCheck v-if="isShow"></extractCheck>
        <!-- extractCheck end -->
    </div>
</template>
<script>
    import extractCheck from '../extractCheck/extractCheck.vue';
    import {extractMoney} from '../../api/api.js';
    export default {
        name:"extractMoney",
        components: {
            extractCheck
        },
        data(){
            return {
                extractVal:'',          //提现额度
                use_amount:'',           //可以提现的额度
                hint_box_show: false, //提示信息显示、隐藏
                hint_box_content: "", //提示信息 
                isShow:false,
                isShowMoney:true
            }
        },
        computed: {
            
        },
        methods: {
            extractBtn(){
                if(this.extractVal > this.use_amount || this.extractVal <=0 || this.extractVal == ''){
                    this.hint_box_show = true;
                    this.hint_box_content = '信息错误';
                    setTimeout(()=>{
                        this.hint_box_show = false;
                        this.hint_box_content = '';
                    },2000);
                }else{
                    var param = {
                        money:this.extractVal
                    };
                    this.$http({
                        url:extractMoney,
                        method:'POST',
                        data:param
                    }).then((res)=>{
                        console.log(res);
                        if(res.data.status == 1){
                            // this.$router.push({path:'/extractCheck'});
                            this.isShow = true;
                            this.isShowMoney = false;
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
        },
        mounted() {
            this.use_amount = this.$route.query.use_amount;
        }
    };
</script>
<style lang='less' scoped>
    .bd-extract{
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: #EFF1F0;
        padding:10px 15px 0px;
    }
    .extract_box{
        padding:20px 15px 25px;
        border-radius: 2.5px;
        p{
            font-size: 10px;
            color: #999;
            margin-bottom: 5px;
            line-height: 20px;
        }
    }
    .extract_input{
        padding-bottom: 10px;
        border-bottom: 1px solid #e5e5e5;
        input{
            color: #333;
            font-size: 24px;
            border:0;
            line-height: 28px;
            outline:none;
        }
        span{
            font-size: 16px;
            color: #333;
        }
    }
    .extract_money{
        color: #666;
        font-size: 14px;
        line-height: 23px;
        margin-top: 10px;
    }
    .extract_btn{
        font-size: 16px;
        text-align: center;
        width: 100%;
        height: 44px;
        line-height: 44px;
        background:#30B097;
        color: #fff;
        margin-top: 20px;
        border-radius: 3px;
    }
    .extract_hint{
        line-height: 21px;
        font-size: 12px;
        color: #999;
        text-indent: 15px;
        margin-top: 10px;
    }
    .hint_box {
        background: rgba(75, 75, 75, 0.7);
        color: #fff;
        padding: 5px 20px;
        font-size: 14px;
        line-height: 44px;
        border-radius: 13px;
        position: fixed;
        top: 50%;
        left: 50%;
        margin-top: -13px;
        transform: translateX(-50%);
    }
</style>
