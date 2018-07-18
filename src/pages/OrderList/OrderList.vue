<template>
    <div class="order-list-page m-position-ab">
        <div class="weui-tab">
            <div class="weui-navbar">
                <div class="weui-navbar__item weui-bar__item_on">
                    全部订单
                </div>
                <div class="weui-navbar__item">
                    进行中
                </div>
                <div class="weui-navbar__item">
                    已关闭
                </div>
            </div>
            <div class="weui-tab__panel">
                <OrderListItem></OrderListItem>
            </div>
        </div>
    </div>
</template>

<script>
import OrderListItem from "@/components/order-list-item";
export default {
    name: "order-list",
    components: {
        OrderListItem
    },
    data() {
        return {
            
        };
    },
    methods: {
        
    }
};
</script>

<style lang="less" scoped>
// 重置weui样式

.weui-navbar {
    height: 44px;
    background-color: #fff;
}
.weui-navbar__item {
    padding: 11px 0;
    line-height: 22px;
}
.weui-navbar__item.weui-bar__item_on {
    color: #30b097;
    background-color: #fff;
}
</style>