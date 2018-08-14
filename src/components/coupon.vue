<template>
	<div class="coupon">
		123
		<div class="item" v-if="items" v-for="(item,index) in items" :key="index">
			<div class="lf">
				<div class="name">{{item.code}}</div>
				<div class="date-area">有效期：{{item.validity_begin_time}}</div>
				<div class="desc">满{{item.min_amount}}可用</div>
			</div>
			<div class="rg">
				<div class="price">
					<span>&yen;</span>{{item.amount}}</div>
				<div class="now-use" @click="nowUse(item.type)">立即使用</div>
			</div>
		</div>
	</div>
</template>
<script>
import { coupon_list } from "@/api/api";
export default {
    props: {
        // list: {
        // 	type: Array,
        // 	default: function(){
        // 		return []
        // 	}
        // },
    },

    data() {
        return {
            items: ""
        };
    },
    mounted() {
        // this.fetchCoupon();
    },
    methods: {
        nowUse(type) {
            
            this.$emit("nowUseEmit", type);
        },
        fetchCoupon() {
            this.$http({
                method: "POST",
                url: coupon_list,
                data: {}
            })
                .then(res => {
                    if (res.data.status == 1) {
                        console.log(res.data.data);
                        this.items = res.data.data;
                    }
                })
                .catch();
        }
    }
};
</script>
<style lang="less" scoped>
.coupon {
    .item {
        padding: 10px 15px;
        height: 90px;
        display: flex;
        position: relative;
        background: #fff;
        margin-bottom: 10px;
        &:before {
            content: "";
            width: 2px;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background: #30b097;
        }

        .lf {
            flex: 1;
            padding-right: 10px;
            .name {
                height: 20px;
                line-height: 20px;
                margin-bottom: 4px;
                font-size: 14px;
                color: #666;
            }
            .date-area,
            .desc {
                height: 16px;
                line-height: 16px;
                font-size: 12px;
                color: #999;
                margin-bottom: 10px;
            }
            .desc {
                color: #666;
            }
        }
        .rg {
            width: 84px;
            padding-left: 24px;
            position: relative;
            &:before {
                content: "";
                width: 2px;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                background: #cccccc;
            }
        }
    }
}
</style>