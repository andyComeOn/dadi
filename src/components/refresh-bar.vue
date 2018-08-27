<template>
	<div class="refreshbar-container">
		<div class="refreshbar-wrapper">
			<div class="lf">当前位置：霞光里社区</div>
			<div class="rg" @click="refresh">
				<img src="../assets/images/icon/ic-refresh.png" alt="">
			</div>
		</div>
	</div>
</template>
<script>
export default {
    data() {
        return {};
    },
    mounted() {},
    methods: {
        // 刷新
        refresh() {}
    }
};
</script>
<style lang="less" scoped>
.refreshbar-container {
    height: 32px;
    padding: 0 15px;
    background: #eff1f0;
    .refreshbar-wrapper {
        font-size: 13px;
        .lf {
            float: left;
            line-height: 32px;
            color: #999999;
        }
        .rg {
            width: 32px;
            height: 32px;
            float: right;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                width: 16px;
                height: 16px;
            }
        }
    }
}
</style>