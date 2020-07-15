<template>
    <div class="order-list-item-page">
        <!-- toas提示(loading) -->
        <div id="orderListToast" v-show="loading">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">{{loadingTxt}}</p>
            </div>
        </div>
        <ul class="list" v-if="list.length>0">
            <li v-for="(item,index) in list" :key="index">
                <!-- 主信息 -->
                <router-link :to="{path:'orderDetail', query:{order_id:item.id}}" tag="div">
                    <div class="bd">
                        <div class="lf">
                            <p class="hotel-name m-ellipsis">{{item.name}}</p>
                            <p class="room-type-date type m-ellipsis">{{item.room_name}}</p>
                            <p class="room-type-date date">{{item.start_time|filterTime}} 至 {{item.end_time|filterTime}} 共{{item.occupancy_day_num}}天</p>
                        </div>
                        <div class="rg">
                            <p class="order-status" v-html="$options.filters.filterStatus(item.status)"></p>
                            <!-- str -- 用券 -- str -->
                            <template v-if="item.is_type == 0">
                                <div v-if="item.integral_status != 1">
                                    <p class="order-price">&yen; {{item.amount}}</p>
                                </div>
                                <div v-else>
                                    <p class="order-price">{{item.integral_amount}}积分</p>
                                </div>
                            </template>
                            <template v-else>
                                <p class="order-price">&yen; 0</p>
                            </template>
                            <!-- end -- 用券 -- end -->
                            <p class="room-type-date type m-ellipsis">{{item.pay_type == 1 ? "到店付" : "在线支付"}}</p>
                        </div>
                    </div>
                    <!--  -->
                    <div class="privilege">
                        <template>
                            <p v-if="item.is_type == 0">
                                <span class="breakfast">早餐:{{item.group.breakfast}}</span>
                            </p>
                            <p v-else>
                                <span class="breakfast">早餐:活动产品不含早餐</span>
                            </p>  
                        </template>
                        
                        <p>
                            <span class="cancel_time">{{item.group.pre_cancel_time}}前免费取消</span>
                        </p>
                        <p>
                            <span class="check_out">延迟退房{{item.group.delay_room}}</span>
                        </p>
                    </div>
                </router-link>
                <!-- 可操作按钮 -->
                <!-- 按钮的名称:删除、再次预定、取消订单、申请退款 -->
                <!-- str -- 使用全面营销券 -- str -->
                <template v-if="this.is_type == 0">
                    <div class="ft">
                        <router-link :to="{path:'/hotelDetail', query:{store_id: item.store_id}}">
                            <span class="btn orange" v-show="!item.status==0">再次预定</span>
                        </router-link>
                        <span class="btn mcolor" v-if="item.status==0" @click="payMethod(item.id,item.pay_type)">立即支付</span>
                        <span class="btn grey" v-if="item.status==0" @click="cancal(item.id,item.status)">取消订单</span>
                        <span class="btn grey" v-if="item.status==1 && item.mapping_status == 0 && item.pay_type == 1" @click="cancal(item.id,item.status)">取消订单</span>
                        <span class="btn grey" v-if="item.status==1 && item.mapping_status == 0 && item.pay_type == 2" @click="applyMoney(item.id)">申请退款</span>
                        <span class="btn grey" v-if="item.status==2 && item.mapping_status == 0 && item.pay_type == 1" @click="cancal(item.id,item.status)">取消订单</span>
                        <span class="btn grey" v-if="item.status==2 && item.mapping_status == 0 && item.pay_type == 2" @click="applyMoney(item.id)">申请退款</span>
                        <span class="btn grey" v-if="item.status==2 && item.mapping_status == 1 && item.pay_type == 1" @click="cancal(item.id,item.status)">取消订单</span>
                        <span class="btn grey" v-if="item.status==2 && item.mapping_status == 1 && item.pay_type == 2" @click="applyMoney(item.id)">申请退款</span>
                        <span class="btn black" v-if="item.status==10" @click="del(item.id)">删除</span>
                    </div>     
                </template>
                <template v-else>
                    <div class="ft">
                        <router-link :to="{path:'/hotelDetail', query:{store_id: item.store_id,is_type:item.is_type}}">
                            <span class="btn orange" v-show="!item.status==0">再次预定</span>
                        </router-link>
                        <span class="btn mcolor" v-if="item.status==0" @click="payMethod(item.id,item.pay_type)">立即支付</span>
                        <span class="btn grey" v-if="item.status==0" @click="cancal(item.id,item.status)">取消订单</span>
                        <span class="btn grey" v-if="item.status==1 && item.mapping_status == 0 && item.pay_type == 1" @click="cancal(item.id,item.status)">取消订单</span>
                        <span class="btn grey" v-if="item.status==1 && item.mapping_status == 0 && item.pay_type == 2" @click="applyMoney(item.id)">申请退款</span>
                        <span class="btn grey" v-if="item.status==2 && item.mapping_status == 0 && item.pay_type == 1" @click="cancal(item.id,item.status)">取消订单</span>
                        <span class="btn grey" v-if="item.status==2 && item.mapping_status == 0 && item.pay_type == 2" @click="applyMoney(item.id)">申请退款</span>
                        <span class="btn grey" v-if="item.status==2 && item.mapping_status == 1 && item.pay_type == 1" @click="cancal(item.id,item.status)">取消订单</span>
                        <span class="btn grey" v-if="item.status==2 && item.mapping_status == 1 && item.pay_type == 2" @click="applyMoney(item.id)">申请退款</span>
                        <span class="btn black" v-if="item.status==10" @click="del(item.id)">删除</span>
                    </div>
                </template>
                <!-- end -- 使用全面营销券 -- end -->
            </li>
        </ul>
        <div v-else class="no-order">
            <img src="../assets/images/404/404-no-order.png" alt="">
            <p>{{noOrderStatusTxt}}</p>
        </div>
        <!-- toast提示(包含2s延时) -->
        <div v-show="delayToastShow">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-icon-success-no-circle weui-icon_toast"></i>
                <p class="weui-toast__content">{{delayToastTxt}}</p>
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
    </div>
</template>

<script>
import { order_list, cancel_orderform, delete_order, wx_pay } from "@/api/api";
import { getCookie } from "@/utils/util";
export default {
    name: "order-list-item",
    props: ["condition"],
    watch: {
        condition: {
            handler(newValue, oldValue) {
                if (newValue.type == 2) {
                    this.noOrderStatusTxt = "暂无已关闭订单";
                } else {
                    this.noOrderStatusTxt = "暂无进行中订单";
                }
                this.loading = true;
                this.fetchData(newValue);
                this.socketMethod();
            },
            deep: true,
            immediate: true
        }
    },
    data() {
        return {
            list: [],
            noOrderStatusTxt: "",
            loading: false,
            loadingTxt: "数据加载中",
            delayToastShow: false, //延时toast的开关
            delayToastTxt: "", //延时toast的txt提示
            paySuccessToast: false,
            routeName: "",
            socketTimer: "",
            ws: {},
            is_type:""  //券 0普通 1单位 2个人
        };
    },
    created() {
        this.routeName = this.$route.query.status;
    },
    mounted() {
        var that = this;
        // this.ws = new WebSocket("ws://172.16.0.252:8081");
        this.socketTimer = setInterval(() => {
            this.socketMethod();
        }, 50000);
    },
    // distroyed() {
    //     if (this.socketTimer) {
    //         //如果定时器还在运行 或者直接关闭，不用判断
    //         clearInterval(this.socketTimer); //关闭
    //         this.socketTimer = null;
    //     }
    // },
    beforeDestroy() {
        window.clearInterval(this.socketTimer);
        this.socketTimer = null;
    },
    methods: {
        fetchData(param) {
            this.$http({
                method: "POST",
                url: order_list,
                data: param
            }).then(res => {
                this.loading = false;
                if (res.data.status == 1) {
                    this.list = res.data.data;
                    this.is_type = res.data.data.is_type;
                } else if (res.data.status == -3) {
                    this.list = [];
                } else {
                    
                }
            });
        },
        // 订单socket
        socketMethod() {
            var that = this;
            // let ws = new WebSocket("ws://172.16.0.252:8081"); // 测试地址
            let ws = new WebSocket("ws://39.107.102.235:8081"); // 正式地址
            ws.onopen = function() {
                console.log("连接成功");
                ws.send("uid" + getCookie("userUid"));
            };
            ws.onmessage = function(e) {
                console.log("收到服务端的消息：" + e.data);
                if (e) {
                    that.fetchData(that.condition);
                }
            };
        },
        // 申请退款
        applyMoney(order_id) {
            this.$router.push({
                path: "applyMoney",
                query: {
                    order_id: order_id
                }
            });
        },
        // 取消订单
        cancal(order_id, status) {
            this.$http({
                method: "POST",
                url: cancel_orderform,
                data: {
                    order_id: order_id,
                    status: status
                }
            }).then(res => {
                if (res.data.status == 1) {
                    this.delayToastShow = true;
                    this.delayToastTxt = res.data.msg;
                    setTimeout(() => {
                        this.delayToastShow = false;
                        this.fetchData(this.condition);
                    }, 1500);
                }else{
                    this.delayToastShow = true;
                    this.delayToastTxt = res.data.msg;
                    setTimeout(() => {
                        this.delayToastShow = false;
                    }, 1500);
                }
            });
        },
        // 删除订单（假）
        del(order_id) {
            this.$http({
                method: "POST",
                url: delete_order,
                data: {
                    order_id: order_id
                }
            })
                .then(res => {
                    if (res.data.status == 1) {
                        this.fetchData(this.condition);
                    }
                })
                .catch(err => {});
        },
        // 支付成功回调执行方法
        paySuccessMethod() {
            this.paySuccessToast = false;
            this.fetchData(this.condition);
        },
        // 立即支付按钮
        payMethod(order_id,pay_type) {
            this.$router.push({path:'onlinePay',query:{order_id:order_id,payType:pay_type}});
            // this.loadingTxt = "微信支付调取中";
            // this.loading = true;
            // let _this = this;
            // let jsApiParameters = {};
            // let onBridgeReady = function() {
            //     WeixinJSBridge.invoke(
            //         "getBrandWCPayRequest",
            //         jsApiParameters,
            //         res => {
            //             if (res.err_msg == "get_brand_wcpay_request:ok") {
            //                 _this.paySuccessToast = true;
            //             } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
            //                 alert("取消支付");
            //                 window.location.reload();
            //             } else {}
            //         }
            //     );
            // };
            // let callpay = function() {
            //     if (typeof WeixinJSBridge == "undefined") {
            //         if (document.addEventListener) {
            //             document.addEventListener(
            //                 "WeixinJSBridgeReady",
            //                 onBridgeReady,
            //                 false
            //             );
            //         } else if (document.attachEvent) {
            //             document.attachEvent(
            //                 "WeixinJSBridgeReady",
            //                 onBridgeReady
            //             );
            //             document.attachEvent(
            //                 "onWeixinJSBridgeReady",
            //                 onBridgeReady
            //             );
            //         }
            //     } else {
            //         onBridgeReady();
            //     }
            // };
            // // 请求支付接口
            // this.$http({
            //     method: "POST",
            //     url: wx_pay,
            //     data: {
            //         orderid: order_id
            //     }
            // }).then(res => {
            //     if (res.data.status == 1) {
            //         this.loading = false;
            //         jsApiParameters = JSON.parse(res.data.data);
            //         callpay();
            //     } else {
            //         this.loading = false;
            //         alert(res.data.msg);
            //     }
            // });
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
            width: 100%;
            // height: 80px;
            display: flex;
            flex-direction: row;
            position: relative;
            margin-bottom: 10px;
            .lf {
                flex: 1;
                // max-width: 211px;
                // height: 80px;
                color: #666;
                overflow: hidden;
                .hotel-name {
                    color: #333;
                    font-size: 15px;
                    font-weight: 700;
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
                        color: #666;
                        background: url("../assets/images/hotel-label/my_order_hotel_grey.png")
                            no-repeat left center;
                        background-size: 16px 16px;
                    }
                    &.date {
                        background: url("../assets/images/hotel-label/my_order_date_grey.png")
                            no-repeat left center;
                        background-size: 16px 16px;
                    }
                }
            }
            .rg {
                // height: 80px;
                padding-top: 4px;
                text-align: right;
                .order-status {
                    height: 16px;
                    line-height: 16px;
                    margin-bottom: 8px;
                    color: #999;
                    padding: 0 2px;
                }
                .order-price {
                    width: 90px;
                    color: #333;
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
.privilege{
    margin-top: 15px;
    padding-bottom: 15px;
    margin-bottom: 15px;
    position: relative;
    &:after {
        content: "";
        width:100%;
        height: 1px;
        position: absolute;
        bottom: 0;
        left:0;
        border-bottom: 1px dashed #E5E5E5;
    }
    p{
        color: #666;
        font-size: 13px;
        line-height: 18px;
        margin-bottom: 5px;
        span{
            &:nth-of-type(1){
                text-align: left;
                font-size: 13px;
                color: #666;
            }
            &:nth-of-type(2){
                float: right;
                font-size: 13px;
                color: #666;
            }
        }
    }
}
.breakfast,.cancel_time,.check_out{
    position: relative;
    margin-left: 20px;
    &::after{
        content: "";
        display: inline-block;
        width:16px;
        height:16px;
        position: absolute;
        top: 50%;
        left:-20px;
        transform: translateY(-50%);
    }
}
.breakfast{
    &::after{
        background:url('../assets/images/svg/zaocan.svg') no-repeat center center;
        background-size: 100% 100%;
    }
}
.cancel_time{
    &::after{
        background:url('../assets/images/svg/quxiao.svg') no-repeat center center;
        background-size: 100% 100%;
    }
}
.check_out{
    &::after{
        background:url('../assets/images/svg/tuifang.svg') no-repeat center center;
        background-size: 100% 100%;
    }
}

</style>