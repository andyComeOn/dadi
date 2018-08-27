<template>
    <div class="olinePay_box">
        <!-- toas提示(loading) -->
        <div v-show="loading">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">数据加载中</p>
            </div>
        </div>
        <!-- dialog(支付成功) -->
        <div v-show="paySuccessToast">
            <div class="z-mask-transparent-pay"></div>
            <div class="z-toast-pay">
                <p class="z-toast-pay-head">提示</p>
                <p class="z-toast-pay-body">支付完成</p>
                <p class="z-toast-pay-footer" @click="paySuccessMethod">我知道了</p>
            </div>
        </div>
        <!-- 支付剩余时间 -->
        <div class="olinePay_box_time">
            <h1>{{getTime}}</h1>
            <p>支付剩余时间</p>
        </div>
        <div class="olinePay_box_content" v-if="order_id_info">
            <p class="store_name">{{order_id_info.name}}</p>
            <div class="room_introduce">
                <img src="../../assets/images/hotel-label/my_order_hotel.png" style="vertical-align: text-top;" />
                <span>{{order_id_info.room_name}}</span>
                <span>{{order_id_info.room_sum}}间</span>
                <span class="room_money">&yen; {{order_id_info.amount}}</span>
            </div>
            <div class="calendar">
                <img src="../../assets/images/hotel-label/my_order_date.png" style="vertical-align: text-top;" />
                <span>
                    {{order_id_info.start_time|filterTimeMM}}月{{order_id_info.start_time|filterTimeDD}}日 - {{order_id_info.end_time|filterTimeMM}}月{{order_id_info.end_time|filterTimeDD}}日
                </span>
                <span>共{{order_id_info.occupancy_day_num}}晚</span>
            </div>
        </div>
        <div v-if="this.setTime >= 0" class="onlinePay_btn" @click="payMethod">确认支付</div>
        <div v-else class="onlinePay_btn_old">已超时，请重新下单</div>
    </div>
</template>
<script>
import { order_detail, wx_pay } from "@/api/api";
export default {
    name: "onlinePay",
    components: {},
    data() {
        return {
            setTime: "", //15分钟即900s，自己调整!
            getTime: "", //15:00
            order_id_info: "",
            loading: true,
            paySuccessToast: false, //支付成功toast
            timer: ""
        };
    },
    methods: {},
    created() {
        let para = this.$route.query.order_id;
        this.order_id = para;
        this.fetchOrderidInfo();
    },
    mounted() {
        this.timer = setInterval(() => {
            if (this.setTime >= 0) {
                let tmpMin = Math.floor(this.setTime / 60);
                let min = tmpMin < 10 ? "0" + tmpMin : tmpMin;
                let tmpSec = Math.floor(this.setTime % 60);
                let sec = tmpSec < 10 ? "0" + tmpSec : tmpSec;
                this.getTime = min + ":" + sec;
                this.setTime--;
            } else {
                clearInterval(this.timer);
            }
        }, 1000);
    },
    methods: {
        fetchOrderidInfo() {
            this.$http({
                method: "POST",
                url: order_detail,
                data: {
                    order_id: this.order_id
                }
            })
                .then(res => {
                    if (res.data.status == 1) {
                        this.loading = false;
                        this.order_id_info = res.data.data;
                        this.setTime = res.data.data.count_down;
                    }
                })
                .catch();
        },
        // 立即支付按钮
        payMethod() {
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
                            _this.alert("取消支付");
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
                    orderid: this.order_id
                }
            }).then(res => {
                if (res.data.status == 1) {
                    jsApiParameters = JSON.parse(res.data.data);
                    callpay();
                } else {
                    _this.alert(res.data.msg);
                }
            });
        },
        // 支付成功toast中下面的点击按妞
        paySuccessMethod() {
            this.paySuccessToast = false;
            clearInterval(this.timer);
            this.$router.push({
                path: "orderList",
                query: {
                    status: "ing"
                }
            });
        }
    }
};
</script>
<style scoped>
.olinePay_box {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #eff1f0;
}
.olinePay_box_time {
    margin-top: 5px;
    background: #fff;
    padding-top: 25px;
    padding: 25px 15px 0px 15px;
}
.olinePay_box_time h1 {
    color: #666;
    text-align: center;
    font-size: 24px;
    line-height: 24px;
}
.olinePay_box_time p {
    font-size: 13px;
    line-height: 13px;
    margin-top: 10px;
    color: #666;
    text-align: center;
    padding-bottom: 25px;
    border-bottom: 1px solid #e5e5e5;
}
.olinePay_box_content {
    padding: 14px 15px 19px 15px;
    background: #fff;
}
.store_name {
    font-size: 15px;
    line-height: 27px;
    color: #666;
}
.room_introduce {
    line-height: 25px;
    font-size: 13px;
    color: #666;
}
.room_introduce span:nth-of-type(1) {
    margin-right: 20px;
}
.room_introduce img {
    display: inline-block;
    width: 15px;
    height: 15px;
}
.calendar {
    line-height: 25px;
    font-size: 13px;
    color: #666;
}
.calendar span:nth-of-type(1) {
    margin-right: 20px;
}
.calendar img {
    display: inline-block;
    width: 13px;
    height: 13px;
}
.room_money {
    color: #30b097;
    float: right;
    font-size: 21px;
}
.onlinePay_btn {
    background: #30b097;
    color: #fff;
    font-size: 18px;
    line-height: 48px;
    text-align: center;
    border-radius: 5px;
    width: 92%;
    margin: 0 auto;
    margin-top: 25px;
}
.onlinePay_btn_old {
    background: #ccc;
    color: #333;
    font-size: 14px;
    line-height: 48px;
    text-align: center;
    border-radius: 5px;
    width: 92%;
    margin: 0 auto;
    margin-top: 25px;
}
</style>