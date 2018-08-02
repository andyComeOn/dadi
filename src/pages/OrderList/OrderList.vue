<template>
    <div class="order-list-page m-position-ab">
        <div class="head">
            <div class="ing" @click="tab(0,'ing')" :class="{active:isActive===0}">
                进行中
            </div>
            <div class="done" @click="tab(5,'done')" :class="{active:isActive===5}">
                已关闭
            </div>
        </div>
        <div class="body">
            <OrderListItem :condition="watchObj">
            </OrderListItem>
            <!-- @applyMoneyEmit="applyMoneyEmitFun" -->

            <!-- <allOrderList :is="select" keep-alive></allOrderList> -->

        </div>

    </div>
</template>

<script>
import OrderListItem from "@/components/order-list-item";
// import allOrderList from "./components/allOrderList.vue";
// import orderingList from "./components/orderingList.vue";
// import orderedList from "./components/orderedList.vue";

export default {
    name: "order-list",
    components: {
        // allOrderList,
        // orderingList,
        // orderedList
        OrderListItem
    },
    data() {
        return {
            select: "ing",
            isActive: 0,
            watchObj: {
                status: "", // 订单状态
                pay_status: "" //支付状态
            }
        };
    },
    created() {
        let urlPara = this.$route.query.status;
        if (urlPara=="ing"){
            this.tab(0,"ing");
        } else{
            this.tab(5,"done");
        }
    },
    methods: {
        // 申请退款emit的方法
        applyMoneyEmitFun() {
            this.$router.push({
                path: "/applyMoney"
            });
        },
        tab(index, type) {
            this.isActive = index;
            if (index == 0) {
                this.watchObj.status = "";
            } else {
                this.watchObj.status = index;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.head {
    height: 44px;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    font-size: 15px;
    div {
        flex: 1;
        height: 44px;
        text-align: center;
        line-height: 44px;
        &.active {
            color: #30b097;
        }
    }
}
.body {
}
</style>