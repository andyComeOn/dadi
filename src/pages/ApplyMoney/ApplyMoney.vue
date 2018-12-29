<template>
    <div class="refund_bd">
        <!-- 退款金额 -->
        <p class="refund_money_title">退款金额</p>
        <div class="refund_money" v-if="order_id_info">
            <span>￥{{order_id_info.amount}}</span>
            <span @click="showDealDetailMask">明细</span>
            <img src="../../assets/images/arrows/list－更多icon@1x.png" />
        </div>
        <!-- <p class="more_refund" v-if="totalBakMoney">最多可退¥ {{totalBakMoney}} </p> -->
        <!-- 退还方式 -->
        <p class="refund_way">退还方式</p>
        <p class="refund_way_content">退回原支付方
            <span>（预计1-7个工作日内到账）</span>
        </p>
        <!-- 退款说明 -->
        <p class="refund_explain">退款说明</p>
        <div class="refund_input">
            <textarea v-model="refund_cause" placeholder="填写退款原因" @focus="focusM"></textarea>
            <span class="num-limit">{{refund_cause.length}}/60</span>
            <span class="tips" v-show="isTipsShow">退款原因不能为空哦！</span>
        </div>
        <!-- 提交申请 -->
        <div class="refund_btn" @click="submit">提交申请</div>
        <!-- toast(loading=>weui) -->
        <div v-show="loading">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">提交中...</p>
            </div>
        </div>
        <!-- toast（delay=>z） -->
        <div v-show="submitToast">
            <div class="z-mask-transparent"></div>
            <div class="z-toast">
                <i class="z-toast-icon"></i>
                <p class="z-toast-content">{{submitToastTxt}}</p>
            </div>
        </div>
        <!-- 已经退款了，用户一直按返回，由于微信中h5的goback(-1)会再次跳到该页面 -->
        <div v-show="submitTwoToast">
            <div class="z-mask-transparent-pay"></div>
            <div class="z-toast-pay">
                <p class="z-toast-pay-head">提示</p>
                <p class="z-toast-pay-body">{{submitTwoToastTxt}}</p>
                <p class="z-toast-pay-footer" @click="submitTwoToastMethod">我知道了</p>
            </div>
        </div>
        <!-- 交易明细弹框 -->
        <div class="deal-detail-mask-box">
            <div class="weui-mask zb-weui-mask" id="dealDetailMask" @click="hideDealDetailMask" :class="[{'weui-actionsheet_no_toggle_active':isDealDetailMask},{'weui-actionsheet_no_toggle':!isDealDetailMask}]"></div>
            <div class="weui-actionsheet zb-weui-actionsheet" id="weui-actionsheet" :class="[{'weui-actionsheet_toggle':isDealDetailMask}]">
                <!-- 交易明细弹框的title -->
                <div class="weui-actionsheet__title zb-weui-actionsheet__title">
                    <p class="weui-actionsheet__title-text zb-weui-actionsheet__title-text">费用明细</p>
                </div>
                <!-- 交易明细弹框的内容 -->
                <div class="weui-actionsheet__menu" style="max-height:300px;overflow:auto;">
                    <div class="zb-actionsheet__bd">
                        <div class="weui-cells zb-weui-cells weui-cells_checkbox">
                            <label class="weui-cell zb-weui-cell weui-check__label " for="deal1">
                                <div class="weui-cell__bd div zb-weui-cell__hd">
                                    <h4>{{order_cost_info.occupancy_day_num}}晚、{{order_cost_info.room_sum}}间共</h4>
                                </div>
                                <div class="weui-cell__hd div">&yen;{{order_cost_info.order_money}}</div>
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
                                    <span style="color:#666;">{{order_cost_info.room_sum}}间 * </span> &yen;{{item.money | Fixto2}}
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
                                    <span style="color:#666;">实付金额：</span>
                                    &yen;{{order_cost_info.order_money}}
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
import {
    order_detail,
    order_cost_detail,
    order_preserver,
    cancel_orderform
} from "@/api/api";
export default {
    name: "applyMoney",
    components: {},
    data() {
        return {
            isDealDetailMask: false,
            refund_cause: "", //退款原因
            order_id: "", //接收路由传过来的order_id
            order_id_info: "", //接收http请求的order_detail数据
            order_cost_info: "", //接收http请求的明细接口（order_cost_info）数据
            submitToast: false, // Toast开关
            submitToastTxt: "提交申请成功",
            submitTwoToast: false, // 已经申请过退款二次提醒
            submitTwoToastTxt: "", // 已经申请过退款二次提醒的txt
            loading: false,
            isTipsShow: false
        };
    },
    mounted() {
        let order_id = this.$route.query.order_id;
        this.order_id = order_id;
        this.fetchOrderDetail();
        // 拉取明细详情
        this.fetchOrderCostDetail();
    },
    watch: {
        refund_cause: {
            handler(newValue, oldValue) {
                if (newValue.length > 60) {
                    this.refund_cause = this.refund_cause.slice(0, 60);
                }
            },
            deep: true,
            immediate: true
        }
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
        // 拉取订单详情
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
        },
        // textarea获焦
        focusM() {
            this.isTipsShow = false;
        },
        // 提交退款维权
        submit() {
            // 工作人员没有接单，用户已经付款
            if (this.order_id_info.status == 1) {
                if (this.refund_cause == "") {
                    this.isTipsShow = true;
                    return;
                } else {
                    this.loading = true;
                    this.$http({
                        method: "POST",
                        url: cancel_orderform,
                        data: {
                            order_id: this.order_id_info.id,
                            status: this.order_id_info.status,
                            remarks: this.refund_cause
                        }
                    })
                        .then(res => {
                            if (res.data.status == 1) {
                                this.loading = false;
                                this.submitToastTxt = "提交申请成功";
                                this.submitToast = true;
                                setTimeout(() => {
                                    this.submitToast = false;
                                    this.$router.push({
                                        path: "orderList",
                                        query: {
                                            status: "ing"
                                        }
                                    });
                                }, 2000);
                            } else if (res.data.status == -3) {
                                this.loading = false;
                                this.submitToastTxt = "系统支付错误03，请联系客服400-099-9682";
                                this.submitToast = true;
                                setTimeout(() => {
                                    this.submitToast = false;
                                }, 2000);
                            }
                        })
                        .catch();
                }
            } else {
                // 工作人员接单，用户已经付款
                if (this.refund_cause == "") {
                    this.isTipsShow = true;
                    return;
                }
                this.$http({
                    method: "POST",
                    url: order_preserver,
                    data: {
                        order_id: this.order_id,
                        preserve_content: this.refund_cause
                    }
                })
                    .then(res => {
                        if (res.data.status == 1) {
                            this.submitToast = true;
                            setTimeout(() => {
                                this.submitToast = false;
                                this.$router.push({
                                    path: "orderList",
                                    query: {
                                        status: "ing"
                                    }
                                });
                            }, 2000);
                        } else {
                            this.submitTwoToastTxt = res.data.msg;
                            this.submitTwoToast = true;
                        }
                    })
                    .catch();
            }
        },
        // 提交退款维权出现二次toast，点击我知道了执行的方法
        submitTwoToastMethod() {
            this.submitTwoToast = false;
            this.$router.push({
                path: "index",
                query: {}
            });
        }
    }
};
</script>
<style lang="less" scoped>
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

.refund_bd {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #eff1f0;
}
.refund_money_title {
    line-height: 39px;
    font-size: 14px;
    color: #666;
    text-indent: 15px;
}
.refund_money {
    line-height: 50px;
    background: #fff;
    position: relative;
    span:nth-of-type(1) {
        color: #ffba56;
        font-size: 14px;
        line-height: 50px;
        display: inline-block;
        text-indent: 15px;
    }
    span:nth-of-type(2) {
        color: #999;
        font-size: 14px;
        line-height: 50px;
        float: right;
        margin-right: 30px;
    }
    img {
        display: block;
        width: 8px;
        height: 12px;
        position: absolute;
        top: 50%;
        right: 15px;
        transform: translateY(-50%);
    }
}
.more_refund {
    color: #999;
    font-size: 12px;
    line-height: 24px;
    text-indent: 15px;
}
.refund_way {
    font-size: 14px;
    line-height: 39px;
    color: #666;
    text-indent: 15px;
}
.refund_way_content {
    line-height: 50px;
    font-size: 15px;
    color: #333;
    text-indent: 15px;
    background: #fff;
    span {
        color: #666;
    }
}
.refund_explain {
    line-height: 34px;
    font-size: 14px;
    color: #666;
    text-indent: 15px;
}
.refund_input {
    position: relative;
    textarea {
        display: block;
        padding: 15px;
        width: 100%;
        height: 120px;
        outline: none;
        border: 0;
        resize: none;
        font-size: 15px;
        color: #333;
        line-height: 21px;
    }
    .num-limit {
        position: absolute;
        bottom: 10px;
        right: 12px;
    }
    .tips {
        position: absolute;
        top: 0px;
        left: 15px;
        line-height: 15px;
        font-size: 12px;
        color: red;
    }
}
.refund_btn {
    width: 92%;
    height: 44px;
    line-height: 44px;
    background: #30b097;
    margin: 0 auto;
    color: #fff;
    font-size: 16px;
    text-align: center;
    border-radius: 5px;
    margin-top: 25px;
}
</style>