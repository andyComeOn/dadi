<template>
    <div class="order-list-page m-position-ab">
        <div class="head">
            <div class="ing" @click="tab(1,'ing')" :class="{active:isActive===1}">
                进行中
            </div>
            <div class="done" @click="tab(2,'done')" :class="{active:isActive===2}">
                已结束
            </div>
        </div>
        <div class="body">
            <OrderListItem :condition="watchObj"></OrderListItem>
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
            isActive: 0,
            watchObj: {
                type: "", // 订单状态区分
                pay_status: "" //支付状态
            }
        };
    },
    created() {
        var that = this;
        let urlPara = this.$route.query.status;
        if (urlPara == "ing") {
            this.tab(2);
        } else {
            this.tab(1);
        }

        // this.pushHistory();
        // let bool = false;
        // setTimeout(() => {
        //     bool = true;
        // }, 1500);
        // if (bool == true) {
        //     window.addEventListener(
        //         "popstate",
        //         function(e) {
        //             that.$router.push({
        //                 path: "index",
        //                 query: {}
        //             });

        //         },
        //         false
        //     );
        // }
    },
    methods: {
        tab(index) {
            this.isActive = index;
            this.watchObj.type = index;
        }
        // pushHistory() {
        //     var state = {
        //         title: "",
        //         url: "#"
        //     };
        //     window.history.pushState(state, state.title, state.url);
        // }
    }
};
</script>

<style lang="less" scoped>
.order-list-page {
    overflow: auto;
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
}
</style>