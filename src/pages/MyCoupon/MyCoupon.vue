<template>
	<div class="my-coupon-page m-position-ab" >
		<mCoupon @nowUseEmit="nowUseFun"></mCoupon>
		
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
			posts:[
				{
					name:'秋果酒店代金券',
					dateArea:'有效期：2018.07.08 至 2018.07.20',
					desc:'满500可用',
					price:399,
					type:0
				},
				{
					name:'秋果酒店代金券',
					dateArea:'有效期：2018.07.08 至 2018.07.20',
					desc:'满500可用',
					price:399,
					type:1
				},
				{
					name:'秋果酒店代金券',
					dateArea:'有效期：2018.07.08 至 2018.07.20',
					desc:'满500可用',
					price:399,
					type:2
				},
			],
			type:0
		}
	},
	created() {
		
	},
	methods:{
		nowUseFun(val){
			console.log(val);
			this.type = val;
		},
		// 我的优惠券
	}
};
</script>


<style lang="less" scoped>
	.my-coupon-page{
		padding: 10px 15px 0
	}
	
</style>