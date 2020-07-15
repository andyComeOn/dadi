<template>
    <div class="refund_bd">
        <!-- 退款金额 -->
        <p class="refund_money_title">退款金额</p>
        <div class="refund_money" v-if="order_id_info">
            <template v-if="this.order_id_info.is_type == 0">
                <span v-if="order_id_info.integral_status != 1">&yen;{{order_id_info.amount}}</span>
                <span v-else>{{order_id_info.integral_amount}}积分</span>
            </template>
            <template>
                <span>&yen;0</span>
            </template>
            <span @click="fetchOrderCostDetail">明细</span>
            <img src="../../assets/images/arrows/list－更多icon@1x.png" />
        </div>
        <!-- <p class="more_refund" v-if="totalBakMoney">最多可退¥ {{totalBakMoney}} </p> -->
        <!-- 取消规则 -->
        <p class="refund_way">取消规则</p>
        <p class="refund_way_content">
            <span>{{order_cost_info.pre_cancel_time}} 前免费取消</span>
        </p>
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
        <div class="refund_btn_box">
            <div class="refund_btn" @click="submit">提交申请</div>
        </div>
        
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
                <div class="expense_msg">
                    <!-- 交易明细弹框的title -->
                    <h3>费用明细</h3>
                    <template v-if="this.order_id_info == 0">
                        <!-- 使用钱 -->
                        <template v-if="order_cost_info.integral_status == 0">
                            <div class="room_money">
                                <h4>房费<span><i>&yen;</i>{{order_cost_info.amount}}</span></h4>
                            
                                <p v-for="(item,index) in order_cost_info.detail" :key="index">{{item.order_time}}<span>{{order_cost_info.room_sum}}间*&yen;{{item.money}}</span></p>
                                <template v-if="order_cost_info.coupon_id">
                                    <h4 class="room_money_coupon">优惠券</h4>
                                    <p>{{order_cost_info.coupon_str}}<span>-&yen;{{order_cost_info.coupon_sum}}</span></p>
                                </template>
                            </div>
                            <div class="room_money room_money_sum">
                                <!-- <div class="sum_discounts" v-if="initCoupon">总计优惠:<span>-&yen;{{initCoupon.coupon_amount}}</span></div> -->
                                <div class="sum_money">实付金额:<span><i>&yen;</i>{{order_cost_info.order_money}}</span></div>
                            </div>
                        </template>
                        <!-- 使用积分 -->
                        <template v-else>
                            <div class="room_money">
                                <h4>房费<span>{{order_cost_info.integral_amount}}<i>积分</i></span></h4>
                                <p v-for="(item,index) in order_cost_info.detail" :key="index">{{item.order_time}}<span>{{order_cost_info.room_sum}}间*{{item.integral_amount}}积分</span></p>
                            </div>
                            <div class="room_money room_money_sum">
                                <!-- <div class="sum_discounts" v-if="initCoupon">总计优惠:<span>-&yen;{{initCoupon.coupon_amount}}</span></div> -->
                                <div class="sum_money">实付金额:<span>{{order_cost_info.integral_amount}}<i>积分</i></span></div>
                            </div>
                        </template>
                    </template>
                    <template v-else>
                        <div class="room_money">
                            <h4>房费<span><i>&yen;</i>0</span></h4>
                            <p v-for="(item,index) in order_cost_info.detail" :key="index">{{item.order_time}}<span>{{order_cost_info.room_sum}}间*&yen;0</span></p>
                            <h4 class="room_money_coupon">优惠券</h4>
                            <p>电子房券<span>*{{order_id_info.order_coupon_all}}</span></p>
                        </div>
                        <div class="room_money room_money_sum">
                            <!-- <div class="sum_discounts" v-if="initCoupon">总计优惠:<span>-&yen;{{initCoupon.coupon_amount}}</span></div> -->
                            <div class="sum_money">实付金额:<span><i>&yen;</i>0</span></div>
                        </div>
                    </template>
                </div>
                <!-- 交易明细弹框的title -->
                <!-- <div class="weui-actionsheet__title zb-weui-actionsheet__title">
                    <p class="weui-actionsheet__title-text zb-weui-actionsheet__title-text">费用明细</p>
                </div> -->
                <!-- 交易明细弹框的内容 -->
                <!-- <div class="weui-actionsheet__menu" style="max-height:300px;overflow:auto;">
                    <div class="zb-actionsheet__bd">
                        <div class="weui-cells zb-weui-cells weui-cells_checkbox">
                            <label class="weui-cell zb-weui-cell weui-check__label " for="deal1">
                                <div class="weui-cell__bd div zb-weui-cell__hd">
                                    <h4>{{order_cost_info.occupancy_day_num}}晚、{{order_cost_info.room_sum}}间共</h4>
                                </div>
                                <template>
                                    <div v-if="order_cost_info.integral_status != 1">
                                        <div class="weui-cell__hd div">&yen;{{order_cost_info.order_money}}</div>
                                    </div>
                                    <div v-else>
                                        <div class="weui-cell__hd div">{{order_cost_info.integral_amount}}积分</div>
                                    </div>
                                </template>
                            </label>
                        </div>
                    </div> -->
                    <!-- 每天每间多少钱 -->
                    <!-- <div class="zb-actionsheet__bd" v-if="order_cost_info.detail" v-for="(item,index) in order_cost_info.detail" :key="index">
                        <div class="weui-cells zb-weui-cells weui-cells_checkbox">
                            <label class="weui-cell zb-weui-cell weui-check__label " for="deal1">
                                <div class="weui-cell__bd div zb-weui-cell__hd">
                                    <h4>{{item.order_time}}</h4>
                                </div>
                                <template>
                                    <div v-if="order_cost_info.integral_status != 1" class="weui-cell__hd div">
                                        <span style="color:#666;">{{order_cost_info.room_sum}}间 * </span> &yen;{{item.money | Fixto2}}
                                    </div>
                                    <div v-else class="weui-cell__hd div">
                                        <span style="color:#666;">{{order_cost_info.room_sum}}间 * </span>{{item.integral_amount}}积分
                                    </div>
                                </template>
                            </label>
                        </div>
                    </div> -->
                    <!-- 订单优惠券是否使用并展示 -->
                    <!-- <div class="zb-actionsheet__bd" v-if="order_cost_info.coupon_id">
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
                    </div> -->
                    <!-- 实付 -->
                    <!-- <div class="zb-actionsheet__bd">
                        <div class="weui-cells zb-weui-cells weui-cells_checkbox">
                            <label class="weui-cell zb-weui-cell weui-check__label" for="deal1">
                                <div class="weui-cell__bd div zb-weui-cell__hd">
                                    <h4>总计</h4>
                                </div>
                                <template>
                                    <div v-if="order_cost_info.integral_status != 1" class="weui-cell__hd div">
                                        <span style="color:#666;">实付金额：</span>
                                        &yen;{{order_cost_info.order_money}}
                                    </div>
                                    <div v-else class="weui-cell__hd div">
                                        <span style="color:#666;">实付金额：</span>
                                        {{order_cost_info.integral_amount}}积分
                                    </div>
                                </template>
                            </label>
                        </div>
                    </div> -->
                <!-- </div> -->
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
import { Toast } from 'vant';
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
    beforeCreate () {
        document.querySelector('body').setAttribute('style', 'background-color:#eff1f0;')
    },
    beforeDestroy () {
      document.querySelector('body').removeAttribute('style')
    },
    mounted() {
        let order_id = this.$route.query.order_id;
        this.order_id = order_id;
        this.fetchOrderDetail();
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
            }).then(res => {
                if (res.data.status == 1) {
                    this.order_id_info = res.data.data;
                }
            });
        },
        // 明细详情
        fetchOrderCostDetail() {
            this.loading = true;
            this.$http({
                method: "POST",
                url: order_cost_detail,
                data: {
                    order_id: this.order_id
                }
            }).then(res => {
                this.loading = false;
                if (res.data.status == 1) {
                    this.isDealDetailMask = true;
                    this.order_cost_info = res.data.data;
                }else{
                    Toast(res.data.msg);
                }
            })
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
                    }).then(res => {
                        this.loading = false;
                        if (res.data.status == 1) {
                            this.submitToastTxt = "提交申请成功";
                            this.submitToast = true;
                            setTimeout(() => {
                                this.submitToast = false;
                                this.$router.push({
                                    path: "orderList"
                                });
                            }, 2000);
                        // } else if (res.data.status == -3) {
                        //     this.submitToastTxt = "系统支付错误03，请联系客服4008122022";
                        //     this.submitToast = true;
                        //     setTimeout(() => {
                        //         this.submitToast = false;
                        //     }, 2000);
                        }else{
                            this.submitToastTxt = res.data.msg;
                            this.submitToast = true;
                            setTimeout(() => {
                                this.submitToast = false;
                            }, 2000);
                        }
                    });
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
                }).then(res => {
                    if (res.data.status == 1) {
                        this.submitToast = true;
                        setTimeout(() => {
                            this.submitToast = false;
                            this.$router.push({
                                path: "orderList"
                            });
                        }, 2000);
                    } else {
                        this.submitTwoToastTxt = res.data.msg;
                        this.submitTwoToast = true;
                    }
                });
            }
        },
        // 提交退款维权出现二次toast，点击我知道了执行的方法
        submitTwoToastMethod() {
            this.submitTwoToast = false;
            this.$router.push({
                path: "/",
                query: {}
            });
        }
    }
};
</script>
<style lang="less" scoped>
    @import './applyMoney.less';
</style>