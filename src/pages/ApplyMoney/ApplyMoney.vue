<template>
    <div class="apply-tui-kuan-page m-position-ab">
        <!-- 退款金额 -->
        <div class="amount">
            <div class="title">
                退款金额
            </div>
            <div class="body">
                <span class="num">&yen;200</span>
                <span class="detail">明细</span>
            </div>
            <div class="foot">最多可退&yen;200.00</div>
        </div>
        <!-- 退款方式 -->
        <div class="type">
            <div class="title">
                退款方式
            </div>
            <div class="body">
                退回原支付方（预计1-7个工作日内到账）
            </div>
        </div>
        <!-- 退款说明 -->
        <div class="intro">
            <div class="title">
                退款说明
            </div>
            <div class="body">
                <textarea name="textareaIntro" id="textareaIntro" cols="30" rows="10"></textarea>
            </div>
        </div>

       
    </div>
</template>

<script>
export default {
    name: "apply-tui-kuan",
    components: {},
    data() {
        return {};
    },
    methods: {}
};
</script>

<style lang="less" scoped>




</style>