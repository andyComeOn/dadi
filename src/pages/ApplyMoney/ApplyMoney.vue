<template>
    <div class="refund_bd">
        <!-- refund money str -->
        <p class="refund_money_title">退款金额</p>
        <div class="refund_money">
            <span>￥288.00</span>
            <span>明细</span>
            <img src="../../assets/images/arrows/list－更多icon@1x.png" />
        </div>
        <!-- refund money end -->
        <p class="more_refund">最多可退¥200.00</p>
        <!-- refund way str -->
        <p class="refund_way">退还方式</p>
        <p class="refund_way_content">退回原支付方<span>（预计1-7个工作日内到账）</span></p>
        <!-- refund way end -->
        <!-- refund explain str -->
        <p class="refund_explain">退款说明</p>
        <div class="refund_input">
            <textarea v-model="refund_cause" placeholder="填写退款原因"></textarea>
            <span class="">{{refund_cause.length}}/60</span>
        </div>
        <!-- refund explain end -->
        <!-- refund btn str -->
        <div class="refund_btn">提交申请</div>
        <!-- refund btn end -->
    </div>
</template>
<script>
export default {
    name: "applyMoney",
    components: {

    },
    data() {
        return {
            refund_cause:''         //退款原因
        };
    },
    methods: {

    }
};
</script>
<style lang="less" scoped>
    .refund_bd{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: #EFF1F0;
    }
    .refund_money_title{
        line-height: 39px;
        font-size: 14px;
        color: #666;
        text-indent: 15px;
    }
    .refund_money{
        line-height: 50px;
        background: #fff;
        position: relative;
        span:nth-of-type(1){
            color: #FFBA56;
            font-size: 14px;
            line-height: 50px;
            display: inline-block;
            text-indent: 15px;
        }
        span:nth-of-type(2){
            color: #999;
            font-size: 14px;
            line-height: 50px;
            float:right;
            margin-right:30px; 
        }
        img{
            display: block;
            width: 8px;
            height: 12px;
            position: absolute;
            top: 50%;
            right: 15px;
            transform: translateY(-50%);
        }
    }
    .more_refund{
        color: #999;
        font-size: 12px;
        line-height: 24px;
        text-indent: 15px;
    }
    .refund_way{
        font-size: 14px;
        line-height: 39px;
        color: #666;
        text-indent: 15px;
    }
    .refund_way_content{
        line-height: 50px;
        font-size: 15px;
        color: #333;
        text-indent: 15px;
        background: #fff;
        span{
            color: #666;
        }
    }
    .refund_explain{
        line-height: 34px;
        font-size: 14px;
        color: #666;
        text-indent: 15px;
    }
    .refund_input{
        position: relative;
        textarea{
            display: block;
            padding: 15px;
            width: 100%;
            height: 120px;
            outline:none;
            border:0;
            resize: none;
            font-size: 15px;
            color: #333;
            line-height: 21px;
        }
        span{
            position: absolute;
            bottom: 10px;
            right: 12px;
        }
    }
    .refund_btn{
        width: 92%;
        height: 44px;
        line-height: 44px;
        background: #30B097;
        margin: 0 auto;
        color: #fff;
        font-size: 16px;
        text-align: center;
        border-radius: 5px;
        margin-top: 25px;
    }
</style>