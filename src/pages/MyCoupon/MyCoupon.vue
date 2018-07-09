<template>
	<div class="my-coupon-page m-position-ab" >
		<mCoupon :post="list"></mCoupon>
	</div>

</template>

<script>
import mCoupon from '../../components/coupon'
export default {
    name: "my-coupon-page",
    components: {
        mCoupon
	},
	data(){
		return {
			list:[
				{
					name:'秋果酒店代金券',
					dateArea:'有效期：2018.07.08 至 2018.07.20',
					desc:'满500可用',
					price:399
				},
				{
					name:'秋果酒店代金券',
					dateArea:'有效期：2018.07.08 至 2018.07.20',
					desc:'满500可用',
					price:399
				},
				{
					name:'秋果酒店代金券',
					dateArea:'有效期：2018.07.08 至 2018.07.20',
					desc:'满500可用',
					price:399
				},

			]
		}
	}
};
</script>


<style lang="less" scoped>
	.my-coupon-page{
		padding: 10px 15px 0
	}
	
</style>