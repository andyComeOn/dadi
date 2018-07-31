<template>
    <div>
        <img class="extract_img" src="../../assets/images/404/tixian_shenqing@1x.png" alt="">
        <p class="extract_hint">提现申请已提交，等待人工审核</p>
        <p class="extract_str_time">2018.07.06 21:45</p>
        <p class="extract_end_time">预计07月09日到账</p>
        <router-link to='/pickCash'>
            <div class="extract_btn">提现记录</div>
        </router-link>
    </div>
</template>
<style lang='less' scoped>
    .extract_img{
        width: 101px;
        height: 88px;
        display: block;
        margin: 0 auto;
        margin-top: 50px;
    }
    .extract_hint{
        font-size: 14px;
        color: #333;
        line-height: 20px;
        margin-top: 15px;
        text-align: center;
    }
    .extract_str_time{
        font-size: 14px;
        color: #666;
        line-height: 20px;
        text-align: center;
    }
    .extract_end_time{
        font-size: 12px;
        color: #666;
        line-height: 15px;
        text-align: center;
    }
    .extract_btn{
        width: 195px;
        height: 44px;
        margin: 0 auto;
        line-height: 44px;
        font-size: 15px;
        border-radius: 3px;
        text-align: center;
        background:#30B097;
        color: #fff;
        margin-top: 25px;
    }
</style>

