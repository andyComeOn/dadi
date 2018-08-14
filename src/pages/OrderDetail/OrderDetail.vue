<template>
    <div class="order-detail-page m-position-ab" v-if="order_id_info">
        <!-- 订单号 -->
        <div class="order-info">
            <div class="order-box">
                <div class="lf">
                    <span class="type">已关闭</span>
                    <span class="order-num">订单号：{{order_id_info.request_no}}</span>
                </div>
                <div class="rg">
                    <span class="price">&yen; {{order_id_info.amount}}</span>
                    <span class="arrow" @click="showDealDetailMask"><img src="../../assets/images/arrows/ic_pay_arrow.png" alt=""></span>
                </div>
            </div>
        </div>
        <!-- 酒店位置 -->
        <div class="location-info">
            <div class="location-box">
                <p class="name">{{order_id_info.name}}</p>
                <p class="location-tel location">{{order_id_info.address}}</p>
                <p class="location-tel tel">
                    <a :href="'tel:' + order_id_info.tel">{{order_id_info.tel}}</a>
                </p>
            </div>
        </div>
        <!-- 订房信息 -->
        <div class="time-contact-info time-info">
            <ul class="time-contact-box">
                <li class="li">
                    <label class="lab">入住房型</label>
                    <span class="span">{{order_id_info.room_name}}</span>
                </li>
                <li class="li">
                    <label class="lab">住店日期</label>
                    <span class="span">
                        {{order_id_info.start_time|filterTimeMM}}月 {{order_id_info.start_time|filterTimeDD}}日 － {{order_id_info.end_time|filterTimeMM}}月 {{order_id_info.end_time|filterTimeDD}}日 共{{order_id_info.occupancy_day_num}}天
                    </span>
                </li>
                <li class="li">
                    <label class="lab">下单日期</label>
                    <span class="span">{{order_id_info.add_time}}</span>
                </li>
            </ul>
        </div>
        <!-- 入住人信息 -->
        <div class="time-contact-info contact-info">
            <ul class="time-contact-box contact-box">
                <li class="li">
                    <label class="lab">入住人</label>
                    <span class="span">{{order_id_info.dwell_name}}</span>
                </li>
                <li class="li">
                    <label class="lab">电话</label>
                    <span class="span">{{order_id_info.mobile}}</span>
                </li>
            </ul>
        </div>
        <!-- 再次预定按钮  -->
        <router-link :to="{path: 'hotelDetail',query:{store_id:order_id_info.store_id}}">
            <div class="re-order">再次预定</div>
        </router-link>
        <!-- 交易明细弹框 -->
        <div class="deal-detail-mask-box">
            <div class="weui-mask zb-weui-mask" @click="hideDealDetailMask" :class="[{'weui-actionsheet_no_toggle_active':isDealDetailMask},{'weui-actionsheet_no_toggle':!isDealDetailMask}]"></div>
            <div class="weui-actionsheet zb-weui-actionsheet" id="weui-actionsheet" :class="[{'weui-actionsheet_toggle':isDealDetailMask}]">
                <!-- 交易明细弹框的title -->
                <div class="weui-actionsheet__title zb-weui-actionsheet__title">
                    <p class="weui-actionsheet__title-text zb-weui-actionsheet__title-text">费用明细</p>
                </div>
                <!-- 交易明细弹框的内容 -->
                <div class="weui-actionsheet__menu">
                    <div class="zb-actionsheet__bd">
                        <div class="weui-cells zb-weui-cells weui-cells_checkbox">
                            <label class="weui-cell zb-weui-cell weui-check__label " for="deal1">
                                <div class="weui-cell__bd div zb-weui-cell__hd">
                                    <h4>{{order_id_info.occupancy_day_num}}晚、{{order_detail.length}}间共</h4>
                                </div>
                                <div class="weui-cell__hd div">&yen;{{order_id_info.amount}}</div>
                            </label>
                        </div>
                    </div>
                    <!-- 每天每间多少钱 -->
                    <div class="zb-actionsheet__bd" v-if="order_cost_info.detail" v-for="(item,index) in order_cost_info.detail" :key="index">
                        <div class="weui-cells zb-weui-cells weui-cells_checkbox">
                            <label class="weui-cell zb-weui-cell weui-check__label " for="deal1">
                                <div class="weui-cell__bd div zb-weui-cell__hd">
                                    <h4>{{item.order_time}}</h4>
                                </div>
                                <div class="weui-cell__hd div">
                                    <span style="color:#666;">1间 * </span> &yen;{{item.money}}
                                </div>
                            </label>
                        </div>
                    </div>
                    <!-- 订单优惠券是否使用并展示 -->
                    <div class="zb-actionsheet__bd" v-if="order_cost_info.coupon_id">
                        <div class="weui-cells zb-weui-cells weui-cells_checkbox">
                            <label class="weui-cell zb-weui-cell weui-check__label" for="deal1">
                                <div class="weui-cell__bd div zb-weui-cell__hd">
                                    <h4>优惠券折扣</h4>
                                </div>
                                <div class="weui-cell__hd div">
                                    <span style="color:#666;">{{order_cost_info.coupon_str}}</span>
                                </div>
                            </label>
                        </div>
                    </div>
                    <!-- 实付 -->
                    <div class="zb-actionsheet__bd">
                        <div class="weui-cells zb-weui-cells weui-cells_checkbox">
                            <label class="weui-cell zb-weui-cell weui-check__label" for="deal1">
                                <div class="weui-cell__bd div zb-weui-cell__hd">
                                    <h4>总计</h4>
                                </div>
                                <div class="weui-cell__hd div">
                                    <span style="color:#666;">实付</span> &yen;{{order_cost_info.order_money}}
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { order_detail, order_cost_detail } from "@/api/api";
export default {
    name: "order-detail",
    components: {},
    data() {
        return {
            isDealDetailMask: false,
            order_id: "", //接收路由传过来的order_id
            order_id_info: "", // 接收http请求的order_detail数据
            order_cost_info: ""  // 接收http请求的明细接口（order_cost_info）数据
        };
    },
    created() {
        this.order_id = this.$route.query.order_id;
    },
    mounted() {
        // 拉取订单详情
        this.fetchOrderDetail();
        // 拉取明细详情
        this.fetchOrderCostDetail();
    },
    methods: {
        // 展示交易明细遮罩
        showDealDetailMask() {
            this.isDealDetailMask = true;
        },
        // 隐藏交易明细遮罩-ui没有设计这个交互逻辑
        hideDealDetailMask() {
            this.isDealDetailMask = false;
        },
        // 订单详情
        fetchOrderDetail() {
            this.$http({
                method: "POST",
                url: order_detail,
                data: {
                    order_id: this.order_id
                }
            })
                .then(res => {
                    if (res.data.status == 1) {
                        this.order_id_info = res.data.data;
                        this.order_detail = res.data.data.order_detail;
                    }
                })
                .catch();
        },
        // 明细详情
        fetchOrderCostDetail() {
            this.$http({
                method: "POST",
                url: order_cost_detail,
                data: {
                    order_id: this.order_id
                }
            })
                .then(res => {
                    if (res.data.status == 1) {
                        this.order_cost_info = res.data.data;
                    }
                })
                .catch();
        }
    }
};
</script>

<style lang="less" scoped>
// 重置weui样式
.zb-weui-mask {
    background: rgba(0, 0, 0, 0.45);
}
// 添加点击之后样式
.weui-actionsheet_no_toggle {
    opacity: 0;
    display: none;
}
// 取消点击之后样式
.weui-actionsheet_no_toggle_active {
    opacity: 1;
}
// 这是弹框的title
.zb-weui-actionsheet__title {
    height: auto;
    background: #fff;
    .zb-weui-actionsheet__title-text {
        height: 22px;
        line-height: 22px;
        margin: 12px 0;
        color: #333;
        font-size: 16px;
    }
}
// 这是弹框的内容
.zb-actionsheet__bd {
    height: 55px;
    padding: 0 15px;
    background: #fff;
    .zb-weui-cells {
        margin-top: 0;
        .zb-weui-cell {
            height: 55px;
            padding: 0;
            .div {
                height: 55px;
                &.weui-cell__bd {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    h4 {
                        line-height: 20px;
                        color: #666;
                        font-size: 14px;
                        font-weight: normal;
                        margin-bottom: 4px;
                    }
                    p {
                        line-height: 16px;
                        color: #999;
                        font-size: 12px;
                    }
                }
                &.weui-cell__hd {
                    padding-right: 0;
                    line-height: 55px;
                    color: #ffba56;
                    font-size: 14px;
                }
            }
        }
    }
}
// 重置weui样式
.order-detail-page {
    padding: 10px 15px 0;
}

// 订单信息
.order-info {
    .order-box {
        background: #ffffff;
        padding: 12px 15px;
        height: 70px;
        display: flex;
        flex-direction: row;
        .lf {
            flex: 1;
            height: 46px;
            display: flex;
            flex-direction: column;
            .type {
                width: 70px;
                line-height: 22px;
                color: #30b097;
                font-size: 15px;
                margin-bottom: 5px;
            }
            .order-num {
                line-height: 20px;
                color: #666;
                font-size: 14px;
            }
        }
        .rg {
            // width: 90px;
            height: 46px;
            padding-top: 3px;
            display: flex;
            flex-direction: row;
            .price {
                // width: 70px;
                color: #ffba56;
                line-height: 18px;
                font-size: 15px;
            }
            .arrow {
                width: 16px;
                height: 16px;
                margin-left: 10px;
                img {
                    display: block;
                    width: 16px;
                    height: 16px;
                }
            }
        }
    }
}

// 酒店位置信息
.location-info {
    margin-bottom: 10px;
    .location-box {
        background: #ffffff;
        padding: 12px 15px;
        color: #999;
        .name {
            line-height: 20px;
            color: #666;
            margin-bottom: 6px;
            font-size: 14px;
        }
        .location-tel {
            line-height: 16px;
            margin-bottom: 8px;
            padding-left: 22px;
            &.location {
                background: url("../../assets/images/hotel-label/my_order_location.png")
                    no-repeat left center;
                background-size: 13px 14px;
            }
            &.tel {
                background: url("../../assets/images/hotel-label/my_order_phone.png")
                    no-repeat left center;
                background-size: 13px 14px;
            }
        }
    }
}

// 入住和联系人信息
.time-contact-info {
    margin-bottom: 10px;
    .time-contact-box {
        background: #ffffff;
        .li {
            height: 45px;
            line-height: 45px;
            position: relative;
            &::after {
                content: "";
                position: absolute;
                left: 0;
                bottom: 0;
                right: 0;
                height: 1px;
                background: #e5e5e5;
                transform: scaleY(0.5);
            }
            .lab {
                text-align: left;
                padding-left: 15px;
                font-size: 15px;
                float: left;
            }
            .span {
                text-align: right;
                padding-right: 15px;
                color: #666;
                font-size: 14px;
                float: right;
            }
        }
    }
}

//再次预定信息
.re-order {
    margin-top: 25px;
    line-height: 44px;
    background: #30b097;
    color: #ffffff;
    border-radius: 5px;
    font-size: 16px;
    text-align: center;
}
</style>