<template>
    <div class="topUpDetailsBox">
        <p class="charge_money">入账金额<span>{{amount}}</span></p>
        <ul class="topUpDetailsLists">
            <li>
                <!-- <p>类型<span>{{pay_type}}</span></p> -->
                <p>类型<span>余额充值</span></p>
            </li>
            <li>
                <p>时间<span>{{add_time}}</span></p>
            </li>
            <li>
                <p>单号<span>{{request_no}}</span></p>
            </li>
            <li>
                <!-- <p>充值活动<span>{{give_amount}}</span></p> -->
                <p>充值活动<span>无</span></p>
            </li>
        </ul>
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
            }
        },
        computed: {
            
        },
        methods: {

        },
        mounted() {
            //获取充值详情
            this.$http({
                url:topUpDetails,
                method:'POST',
                data:{
                    id:this.$route.query.topUpId
                }
            }).then(res=>{
                if(res.data.status == 1){
                    console.log(res);
                    this.amount = res.data.data[0].amount;
                    this.pay_type = res.data.data[0].pay_type;
                    this.add_time = res.data.data[0].add_time;
                    this.request_no = res.data.data[0].request_no;
                    this.give_amount = res.data.data[0].give_amount;
                }else{
                    
                }
            });
        }
    }
</script>
<style lang='less' scoped>
    @import './topUpDetails.less';
    .charge_money{
        border:0;
    }
</style>

