<template>
    <div class="order-detail-page m-position-ab" v-if="order_id_info">
        <!-- dialog(支付成功) -->
        <div v-show="paySuccessToast">
            <div class="z-mask-transparent-pay"></div>
            <div class="z-toast-pay">
                <p class="z-toast-pay-head">提示</p>
                <p class="z-toast-pay-body">支付完成</p>
                <p class="z-toast-pay-footer" @click="paySuccessMethod">我知道了</p>
            </div>
        </div>
        <!-- toas提示(loading) -->
        <div id="orderListToast" v-show="loading">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">{{loadingTxt}} </p>
            </div>
        </div>
        <!-- 订单号 -->
        <div class="order-info">
            <div class="order-box">
                <div class="lf">
                    <span class="type" v-html="$options.filters.filterStatus(order_id_info.status)"></span>
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
                    <label class="lab">入住间数</label>
                    <span class="span">{{order_id_info.room_sum}}</span>
                </li>
                <li class="li">
                    <label class="lab">住店日期</label>
                    <span class="span">
                        {{order_id_info.start_time|filterTimeMM}}月 {{order_id_info.start_time|filterTimeDD}}日 － {{order_id_info.end_time|filterTimeMM}}月 {{order_id_info.end_time|filterTimeDD}}日 共{{order_id_info.occupancy_day_num}}天
                    </span>
                </li>
                <li class="li">
                    <label class="lab">下单日期</label>
                    <span class="span">{{order_id_info.add_time|filterTimeYTD_HHMM}}</span>
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

        <div class="broadcast m-ellipsis" @click="showUserCardRightMask">
            <span class="broadcast-icon"></span>
            {{group_name | filterCardType}}特权：房价折扣{{catering_discount}}，餐饮折扣餐饮折扣餐饮折扣
            <span class="broadcast-btn"></span>
        </div>
        <!-- 用户所属卡种的权益 -->
        <div id="userCardRightMaskBox">
            <div class="weui-mask zb-weui-mask" @click="hideUserCardRightMask" :class="[{'weui-actionsheet_no_toggle_active':isUserCardRightMask},{'weui-actionsheet_no_toggle':!isUserCardRightMask}]"></div>
            <div class="weui-actionsheet zb-weui-actionsheet" id="weui-actionsheet" :class="[{'weui-actionsheet_toggle':isUserCardRightMask}]">
                <div class="hd">
                    {{group_name | filterCardType}}会员
                    <span class="btn" @click="hideUserCardRightMask"></span>
                </div>
                <!-- 弹框的内容 -->
                <div class="bd">
                    <div class="desc-box" v-if="userCardRightInfo">
                        <!-- 开卡权益 -->
                        <div class="card-right">
                            <div class="title">
                                <span class="s1"></span>
                                开卡权益
                                <span class="s2"></span>
                            </div>
                            <div class="content">
                                <dl>
                                    <img src="../../assets/images/vip/kaika.png" alt="">
                                    <dt>开卡赠券</dt>
                                    <dd>{{userCardRightInfo.coupon_num}}</dd>
                                </dl>
                                <dl>
                                    <img src="../../assets/images/vip/yaoqing.png" alt="">
                                    <dt>邀请特权</dt>
                                    <dd>{{userCardRightInfo.privilege_num}}</dd>
                                </dl>
                                <dl>
                                    <img src="../../assets/images/vip/fangjia.png" alt="">
                                    <dt>房价折扣</dt>
                                    <dd>{{userCardRightInfo.promo}}</dd>
                                </dl>
                                <dl>
                                    <img src="../../assets/images/vip/xiaofei.png" alt="">
                                    <dt>消费积分</dt>
                                    <dd>{{userCardRightInfo.score_rate}}</dd>
                                </dl>
                                <dl v-if="userCardRightInfo.pre_cancel_time">
                                    <img src="../../assets/images/vip/mianfei.png" alt="">
                                    <dt>免费取消</dt>
                                    <dd>{{userCardRightInfo.pre_cancel_time}}</dd>
                                </dl>
                            </div>
                        </div>
                        <!-- 会员权益 -->
                        <div class="vip-right">
                            <div class="title">
                                <span class="s1"></span>
                                会员权益
                                <span class="s2"></span>
                            </div>
                            <div class="content">
                                <ul class="ul">
                                    <li v-if="userCardRightInfo.catering_discount">
                                        <p class="li-desc">餐饮折扣</p>
                                        <p class="li-intro">{{userCardRightInfo.catering_discount}}</p>
                                    </li>
                                    <li v-if="userCardRightInfo.enjoy_channel">
                                        <p class="li-desc">优享通道</p>
                                        <p class="li-intro">{{userCardRightInfo.enjoy_channel}}</p>
                                    </li>
                                    <li v-if="userCardRightInfo.supper">
                                        <p class="li-desc">上门宵夜</p>
                                        <p class="li-intro">{{userCardRightInfo.supper}}</p>
                                    </li>
                                    <li v-if="userCardRightInfo.delay_room">
                                        <p class="li-desc">延迟退房</p>
                                        <p class="li-intro">{{userCardRightInfo.delay_room}}</p>
                                    </li>
                                    <li v-if="userCardRightInfo.birthday">
                                        <p class="li-desc">生日礼遇</p>
                                        <p class="li-intro">{{userCardRightInfo.birthday}}</p>
                                    </li>
                                    <li v-if="userCardRightInfo.equity">
                                        <p class="li-desc">权益共享</p>
                                        <p class="li-intro">{{userCardRightInfo.equity}}</p>
                                    </li>
                                    <li v-if="userCardRightInfo.user_activity">
                                        <p class="li-desc">收费会员活动</p>
                                        <p class="li-intro">{{userCardRightInfo.user_activity}}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 再次预定按钮  -->
        <!-- <div></div> -->
        <div v-if="order_id_info.status!=0">
            <router-link :to="{path: 'hotelDetail',query:{store_id:order_id_info.store_id}}">
                <div class="re-order">再次预定</div>
            </router-link>
        </div>
        <!-- 当该订单是出于待付款status==0的状态展示 -->
        <div v-if="order_id_info.status==0">
            <div class="pay-cancel pay-bar" @click="payMethod(order_id)">立即支付</div>
            <div class="pay-cancel cancel-bar" @click="cancal">取消订单</div>
        </div>
        <!-- 温馨提示 -->
        <div class="tips">
            <p>温馨提示：1、酒店入住时间14:00以后，离店时间12:00以前。如您在14:00以前未能到达，请以酒店安排为准。2、普卡会员入住当天12：00之前取消订单，不收取费用，逾期扣费。银卡、金卡会员14点前取消订单，不收取费用；铂金卡18点前取消订单，不收取费用。3、普通客户12点之前退房；普卡会员13点退房；银卡会员14点退房；金卡会员15点退房；铂金卡会员延迟到16点退房。联系电话：<a href="tel:4000-999-683">4000-999-683</a> (周一至周五9:00-17:30)</p>
        </div>
        <!-- 交易明细弹框 -->
        <div class="deal-detail-mask-box">
            <div class="weui-mask zb-weui-mask" @click="hideDealDetailMask" :class="[{'weui-actionsheet_no_toggle_active':isDealDetailMask},{'weui-actionsheet_no_toggle':!isDealDetailMask}]"></div>
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
    cancel_orderform,
    wx_pay,
    user_card_privilege
} from "@/api/api";
export default {
    name: "order-detail",
    components: {},
    data() {
        return {
            isDealDetailMask: false,
            order_id: "", //接收路由传过来的order_id
            order_id_info: "", // 接收http请求的order_detail数据
            order_cost_info: "", // 接收http请求的明细接口（order_cost_info）数据
            paySuccessToast: false,
            loading: false,
            loadingTxt: "数据加载中",
            userCardRightInfo : "",
            isUserCardRightMask: false,
            group_name: "",  // 会员卡desc
            catering_discount: "" // 95折扣
            
        };
    },
    created() {
        let order_id = this.$route.query.order_id;
        this.order_id = order_id;
    },
    mounted() {
        // 拉取订单详情
        this.fetchOrderDetail();
        // 拉取明细详情
        this.fetchOrderCostDetail();
    },
    methods: {
        // 拉取用户所属卡种的信息
        fetchUserCardRightInfo() {
            this.$http({
                method: "POST",
                url: user_card_privilege,
                data: {
                    id: this.order_id_info.group_id
                }
            })
                .then(res => {
                    // console.log(res.data.data);
                    this.userCardRightInfo = res.data.data;
                })
                .catch(err => {});
        },
        // 展示用户所属卡种相关权益遮罩
        showUserCardRightMask() {
            this.isUserCardRightMask = true;
        },
        // 隐藏用户所属卡种相关权益遮罩
        hideUserCardRightMask() {
            this.isUserCardRightMask = false;
        },
        // 展示交易明细遮罩
        showDealDetailMask() {
            if (
                this.order_id_info.close_status == 4 ||
                this.order_id_info.close_status == 1
            ) {
                return;
            } else {
                this.isDealDetailMask = true;
            }
            //  || this.order_id_info.close_status == 0
        },
        // 隐藏交易明细遮罩-ui没有设计这个交互逻辑
        hideDealDetailMask() {
            this.isDealDetailMask = false;
        },
        // 订单详情
        fetchOrderDetail() {
            this.loading = true;
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
                        this.group_name = res.data.data.group.name;
                        this.catering_discount = res.data.data.group.catering_discount;
                        this.fetchUserCardRightInfo(); // 拉取用户卡种的权益
                        // this.fetchOrderCostDetail();
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
                        this.loading = false;
                        this.order_cost_info = res.data.data;
                    }
                })
                .catch();
        },

        // 支付成功回调执行方法
        paySuccessMethod() {
            this.paySuccessToast = false;
            this.$router.push({
                path: "orderList",
                query: {
                    status: "ing"
                }
            });
        },
        // 立即支付按钮
        payMethod(order_id) {
            this.loadingTxt = "微信支付调取中";
            this.loading = true;
            let _this = this;
            let jsApiParameters = {};
            let onBridgeReady = function() {
                WeixinJSBridge.invoke(
                    "getBrandWCPayRequest",
                    jsApiParameters,
                    res => {
                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                            _this.paySuccessToast = true;
                        }
                        if (res.err_msg == "get_brand_wcpay_request:cancel") {
                            alert("取消支付");
                            // window.location.reload();
                        }
                    }
                );
            };
            let callpay = function() {
                if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                        document.addEventListener(
                            "WeixinJSBridgeReady",
                            onBridgeReady,
                            false
                        );
                    } else if (document.attachEvent) {
                        document.attachEvent(
                            "WeixinJSBridgeReady",
                            onBridgeReady
                        );
                        document.attachEvent(
                            "onWeixinJSBridgeReady",
                            onBridgeReady
                        );
                    }
                } else {
                    onBridgeReady();
                }
            };
            // 请求支付接口
            this.$http({
                method: "POST",
                url: wx_pay,
                data: {
                    orderid: order_id
                }
            }).then(res => {
                if (res.data.status == 1) {
                    this.loading = false;
                    jsApiParameters = JSON.parse(res.data.data);
                    callpay();
                } else {
                    _this.alert(res.data.msg);
                }
            });
        },
        // 取消订单
        cancal() {
            this.loading = true;
            this.$http({
                method: "POST",
                url: cancel_orderform,
                data: {
                    order_id: this.order_id,
                    status: this.order_id_info.status
                }
            })
                .then(res => {
                    if (res.data.status == 1) {
                        this.loading = false;
                        this.$router.go(-1);
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

// 后来添加的会员提示
.broadcast {
    line-height: 36px;
    background: rgba(253, 252, 236, 1);
    padding: 0 22px 0 34px;
    position: relative;
    color: #666;
    font-size: 14px;
    font-weight: 400;
    .broadcast-icon {
        width: 16px;
        height: 16px;
        position: absolute;
        left: 15px;
        top: 10px;
        background: url("../../assets/images/icon/ic-broadcast.png") no-repeat
            center center;
        background-size: 100% 100%;
    }
    .broadcast-btn {
        width: 5px;
        height: 9px;
        position: absolute;
        right: 15px;
        top: 13px;
        background: url("../../assets/images/arrows/ic-arrow_10_18.png")
            no-repeat center center;
        background-size: 100% 100%;
    }
}

#userCardRightMaskBox {
    .hd {
        line-height: 40px;
        font-size: 18px;
        color: #333;
        text-align: center;
        position: relative;
        background: #fff;
        .btn {
            width: 24px;
            height: 24px;
            position: absolute;
            top: 9px;
            right: 9px;
            background: url("../../assets/images/icon/ic-close-card.png")
                no-repeat center center;
            background-size: 12px 12px;
        }
    }
    .bd {
        background: #fff;
        // 弹框公共的title
        .title {
            line-height: 21px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #333;
            font-size: 16px;
            padding-top: 25px;
            font-weight: 400;
            span {
                width: 72px;
                height: 8px;
                background: url("../../assets/images/vip/bg-row.png") no-repeat
                    center center;
                background-size: 100% 100%;
                &.s1 {
                    margin-right: 10px;
                }
                &.s2 {
                    margin-left: 10px;
                }
            }
        }

        .card-right {
            .content {
                padding: 0 15px;
                &::after {
                    display: table;
                    content: "";
                    clear: both;
                }
                dl {
                    width: 20%;
                    float: left;
                    text-align: center;
                    img {
                        width: 24px;
                        height: 24px;
                        display: block;
                        margin: 15px auto 10px;
                    }
                    dt {
                        line-height: 19px;
                        margin-bottom: 5px;
                        color: #333;
                        font-size: 13px;
                    }
                    dd {
                        line-height: 16px;
                        color: #666;
                        font-size: 12px;
                    }
                }
            }
        }
        .vip-right {
            .content {
                padding: 15px 15px 15px;
                .ul {
                    &::after {
                        content: "";
                        display: table;
                        clear: both;
                    }
                    li {
                        // padding: 20px 30px 0;
                        padding: 15px 15px 0;
                        height: 100px;
                        width: 33.33%;
                        float: left;
                        border-bottom: 1px solid #e5e5e5;
                        .li-desc {
                            color: #333;
                            line-height: 19px;
                            font-size: 13px;
                            margin-bottom: 8px;
                            text-align: center;
                        }
                        .li-intro {
                            text-align: center;
                            color: #666;
                            line-height: 16px;
                            font-size: 12px;
                        }
                    }
                }
            }
        }
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
    overflow: auto;
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
                color: #666;
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
// 立即支付和取消订单
.pay-cancel {
    margin-bottom: 15px;
    line-height: 44px;
    border-radius: 5px;
    font-size: 16px;
    text-align: center;
}
.pay-bar {
    background: #30b097;
    color: #ffffff;
    margin-top: 25px;
}
.cancel-bar {
    border: 1px solid #cccccc;
    color: #333;
}

.tips {
    padding: 12px 15px 10px;
    color: #666;
    font-size: 12px;
    p {
        line-height: 17px;
        margin-bottom: 12px;
    }
}
</style>