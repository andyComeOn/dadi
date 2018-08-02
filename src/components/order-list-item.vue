<template>
    <div class="order-list-item-page">
        <ul class="list" v-if="list.length>0">
            <li v-for="(item,index) in list" :key="index">
                <!-- 主信息 -->
                <router-link to="orderDetail" tag="span">
                    <div class="bd">
                        <div class="lf">
                            <p class="hotel-name m-ellipsis">{{item.name}}</p>
                            <p class="room-type-date type m-ellipsis">{{item.room_name}}</p>
                            <p class="room-type-date date">{{item.start_time|filterTime}} 至 {{item.end_time|filterTime}} {{item.occupancy_day_num}}天</p>
                        </div>
                        <div class="rg">
                            <p class="order-status">已关闭</p>
                            <p class="order-price">&yen; {{item.marker_amount}}</p>
                        </div>
                    </div>
                </router-link>
                <!-- 可操作按钮 -->
                <!-- 按钮的名称:删除、再次预定、取消订单、申请退款 -->
                <div class="ft">
                    <span class="btn black">删除</span>
                    <span class="btn grey">取消订单</span>
                    <span class="btn orange">再次预定</span>
                    <span class="btn mcolor" @click="applyMoney">申请退款</span>
                </div>
            </li>
        </ul>
        <div v-else class="no-order">
            <img src="../assets/images/404/404-no-order.png" alt="">
            <p>暂无订单</p>
        </div>
    </div>
</template>

<script>
import { order_list } from "@/api/api";
export default {
    name: "order-list-item",
    props: ["condition"],
    watch: {
        condition: {
            handler(newValue, oldValue) {
                // if (newValue.status == 5) {
                //     this.noOrderStatusTxt = "暂无已关闭订单";
                // } else {
                //     this.noOrderStatusTxt = "暂无进行中订单";
                // }
                this.fetchData(newValue);
            },
            deep: true,
            immediate: true
        }
    },
    data() {
        return {
            list: [],
            noOrderStatusTxt: "",
            isShow: false
        };
    },
    created() {},
    mounted() {},
    filters: {
        filterTime(a) {
            const index = a.indexOf("-");
            return a.slice(index + 1, index + 6);
        }
    },
    methods: {
        fetchData(param) {
            this.$http({
                method: "POST",
                url: order_list,
                data: param
            }).then(res => {
                if (res.data.status == 1) {
                    this.list = res.data.data;
                } else {
                    this.list = [];
                    // this.isShow = true;
                }
            });
        },

        // 申请退款
        applyMoney() {
            this.$emit("applyMoneyEmit");
        }
    }
};
</script>

<style lang="less" scoped>
.list {
    padding: 10px 15px 0;
    li {
        padding: 10px;
        margin-bottom: 10px;
        position: relative;
        background: #ffffff;
        .bd {
            height: 80px;
            display: flex;
            flex-direction: row;
            position: relative;
            margin-bottom: 10px;
            &:after {
                content: "";
                position: absolute;
                left: 0;
                bottom: 0;
                right: 0;
                height: 1px;
                background: #e5e5e5;
                transform: scaleY(0.5);
            }
            .lf {
                flex: 1;
                height: 80px;
                color: #666;
                .hotel-name {
                    color: #999;
                    font-size: 15px;
                    height: 21px;
                    line-height: 21px;
                    margin-bottom: 6px;
                }
                .room-type-date {
                    height: 16px;
                    line-height: 16px;
                    padding-left: 28px;
                    margin-bottom: 5px;
                    &.type {
                        color: #999;
                        background: url("../assets/images/hotel-label/my_order_hotel.png")
                            no-repeat left center;
                        background-size: 16px 16px;
                    }
                    &.date {
                        background: url("../assets/images/hotel-label/my_order_date.png")
                            no-repeat left center;
                        background-size: 16px 16px;
                    }
                }
            }
            .rg {
                width: 70px;
                height: 80px;
                padding-top: 4px;
                text-align: right;
                .order-status {
                    height: 16px;
                    line-height: 16px;
                    margin-bottom: 8px;
                }
                .order-price {
                    height: 20px;
                    line-height: 20px;
                    font-size: 14px;
                }
            }
        }
        .ft {
            text-align: right;
            .btn {
                display: inline-block;
                height: 26px;
                line-height: 26px;
                font-size: 14px;
                padding: 0 11px;
                border-radius: 3px;
                margin-left: 10px;
                &.orange {
                    color: #f78c3e;
                    border: 1px solid #f78c3e;
                }
                &.mcolor {
                    color: #30b097;
                    border: 1px solid #30b097;
                }
                &.black {
                    color: #666;
                    border: 1px solid #ccc;
                }
                &.grey {
                    color: #999;
                    border: 1px solid #e5e5e5;
                }
            }
        }
    }
}
.no-order {
    height: 108px;
    margin-top: 120px;
    img {
        display: block;
        width: 152px;
        height: 108px;
        margin: 0 auto;
    }
    p {
        line-height: 20px;
        text-align: center;
        color: #666;
        font-size: 14px;
    }
}
</style>