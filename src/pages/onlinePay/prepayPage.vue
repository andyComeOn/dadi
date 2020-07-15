<template>
    <div class="olinePay_box">
		<div class="olinePay_box_time" v-if="loading == false">
            <h1><img class="icon" src="../../assets/images/icon/order_sucess.png" alt="" />预订成功</h1>
            <p>等待酒店确认，确认订单后房间免费<br />保留至12:00</p>
		</div>
		<div class="olinePay_box_content" v-if="order_id_info">
            <p class="store_name m-ellipsis">{{order_id_info.name}}</p>
            <div class="room_introduce">
                <span>订单号:</span>
                <span class="col-666">{{order_id_info.request_no}}</span>
                <span class="room_money col-666">&yen; {{order_id_info.amount}}</span>
            </div>
            <div class="room_introduce">
                <span>房&nbsp;&nbsp;&nbsp;&nbsp;型:</span>
                <span class="col-666">{{order_id_info.room_name}}</span>
                <span class="col-666">{{order_id_info.room_sum}}间</span>
                <span class="room_hint col-666">到店付</span>
            </div>
            <div class="calendar">
                <span>预&nbsp;&nbsp;&nbsp;&nbsp;定:</span>
                <span class="calendar_time col-666">
                    {{order_id_info.start_time|filterTimeMM}}月{{order_id_info.start_time|filterTimeDD}}日 - {{order_id_info.end_time|filterTimeMM}}月{{order_id_info.end_time|filterTimeDD}}日
                </span>
                <span class="col-666">共{{order_id_info.occupancy_day_num}}晚</span>
            </div>
        </div>
        <!-- 下单时间 -->
        <ul class="mealList">
            <li class="wxPay">
                <p class="bd">早餐<span>{{order_id_info.group.breakfast}}</span></p>
            </li>
            <li class="walletPay">
                <p class="bd">取消规则<span>{{order_id_info.group.pre_cancel_time}}前免费取消</span></p>
            </li>
            <li class="walletPay">
                <p class="bd">退房规则<span>延迟退房{{order_id_info.group.delay_room}}</span></p>
            </li>
        </ul>
        <!-- 点击支付大按钮 -->
        <div class="payCell">
            <div class="onlinePay_btn" @click="payOrderDetails">查看订单</div>
        </div>
        <!-- toas提示(loading) -->
        <div v-show="loading">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">{{loadingTxt}}</p>
            </div>
        </div>
        <!-- toast（delay=>z）str -->
        <div v-show="delayToast">
            <div class="z-mask-transparent"></div>
            <div class="z-toast">
                <i class="z-toast-icon"></i>
                <p class="z-toast-content">{{delayToastTxt}}</p>
            </div>
        </div>
        <!-- toast（delay=>z）end -->
    </div>
</template>
<script>
import { order_detail } from "@/api/api";
export default {
    data() {
        return {
            order_id_info: "",  
            loading: true,
            loadingTxt: "数据加载中",
            delayToast:false,
            delayToastTxt:'',
        };
    },
    mounted() {
        this.fetchOrderidInfo();        // 拉取订单详情
    },
    methods: {
        // 拉取订单详情
        fetchOrderidInfo() {
            this.$http({
                method: "POST",
                url: order_detail,
                data: {
                    order_id: this.$route.query.order_id
                }
            }).then(res => {
                this.loading = false;
                if (res.data.status == 1) {
                    this.order_id_info = res.data.data;
                }else{
                    this.delayToast = true;
                    this.delayToastTxt = res.data.msg;
                    setTimeout(()=>{
                        this.delayToast = false;
                    },1500);
                }
            });
        },
        //订单详情
        payOrderDetails(){
            this.$router.push({path:"orderDetail",query:{order_id:this.$route.query.order_id}});
        }
    }
};
</script>
<style lang="less" scoped>
    @import "./onlinePay";
</style>