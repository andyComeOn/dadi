<template>
    <div class="bd-extract">
        <div class="extract_box bd-fff">
            <p>提现金额</p>
            <div class="extract_input">
                <span>￥</span>
                <input type="text" value='' placeholder="请输入金额..." />
            </div>
            <p class="extract_money">可提现金额：¥ 899.00</p>
            <router-link to='/extractCheck'>
                <div class='extract_btn'>提现</div>
            </router-link>
        </div>
        <p class="extract_hint">温馨提示：预计在3个工作日内到账</p>
    </div>
</template>
<script>
    export default {
        name: "extractMoney",
        components: {
            
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
</style>
