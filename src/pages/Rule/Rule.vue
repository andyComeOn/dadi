<template>
    <div class="rulePage">
        <p class="pTxt">1. 关注公众号并领取会员卡后才可享有分销资格</p>
        <p class="pTxt">2. 其他人通过扫描你的分销二维码进入公众号并关注，自动成为你的下线</p>
        <p class="pTxt">3. 下线是唯一性的，例：A扫B的二维码成为会员，A取关后再去扫C的码是无效的</p>
        <p class="pTxt">4. 分销等级只有1级和2级</p>
        <p class="pTxt">5. 集团后台保留更改分销员上级权限</p>
        <p class="pTxt">6. 只有预付订单才会产生佣金，现付订单无佣金</p>
        <p class="pTxt">7. 只有门店在独立后台点击【确认退房】，完成订单后方可结算佣金（关闭订单无佣金）</p>
        <p class="pTxt">8. 佣金提现要有审核（批量审核）与确认付款两步，权限都在集团后台</p>
        <p class="pTxt">9. 集团后台保留修改单独订单佣金的权限</p>
        <p class="pTxt">10. 每个账号每天预订房量，由集团确定</p>  
    </div>
</template>

<script>
export default {
    name: "rulePage",
    components: {}
};
</script>

<style lang="less" scoped>
.rulePage {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    overflow: auto;
    padding-top: 15px;
}
.pTxt{
    padding: 0 15px;
    line-height: 24px;
}
</style>