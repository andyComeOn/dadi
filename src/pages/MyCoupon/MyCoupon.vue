<template>
	<div class="my-coupon-page m-position-ab">
		<mCoupon @nowUseEmit="nowUseFun"></mCoupon>
	</div>
</template>

<script>
import mCoupon from "@/components/coupon";
export default {
    name: "my-coupon-page",
    components: {
        mCoupon
    },
    data() {
        return {};
    },
    created() {},
    methods: {
        nowUseFun(status, id) {
            if (status == 1 || status == 2) return;
            this.$router.push({ path: "/index" });
        }
    }
};
</script>

<style lang="less" scoped>
.my-coupon-page {
    padding: 10px 15px 0;
    overflow: auto;
}
</style>