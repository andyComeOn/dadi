<template>
	<div class="my-point-page">
		
		<myCoupon @nowUseEmit="fun" :list="posts"></myCoupon>
		
	</div>

</template>

<script>

import myCoupon from '../../components/coupon'
 
export default {
    name: "my-point-page",
    components: {
        myCoupon
    },
	data(){
		return {
			posts:[
				{
					name:'艺龙酒店代金券',
					dateArea:'有效期：2018.07.08 至 2018.07.20',
					desc:'满500可用',
					price:699,
					type:10
				},
				{
					name:'艺龙酒店代金券',
					dateArea:'有效期：2018.07.08 至 2018.07.20',
					desc:'满500可用',
					price:699,
					type:11
				}
			]
		}
	},
	methods:{
		fun(params) {
			console.log(params);
		}
	}
};
</script>


<style lang="less" scoped>
	@import "../../assets/less/var.less";
	
</style>