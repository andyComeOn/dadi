<template>
    <div class="olinePay_box" v-if="order_id_info">
        <div class="olinePay_box_time">
            <h1>{{getTime}}</h1>
            <p>支付剩余时间</p>
        </div>
        <div class="olinePay_box_content">
            <p class="store_name">{{order_id_info.name}}</p>
            <div class="room_introduce">
                <img src="../../assets/images/hotel-label/my_order_hotel.png" style="vertical-align: text-top;"/>
                <span>{{order_id_info.room_name}}</span>
                <span>{{order_id_info.room_sum}}间</span>
                <span class="room_money">&yen; {{order_id_info.amount}}</span>
            </div>
            <div class="calendar">
                <img src="../../assets/images/hotel-label/my_order_date.png" style="vertical-align: text-top;"/>
                <span>
                    {{order_id_info.start_time|filterTimeMM}}月{{order_id_info.start_time|filterTimeDD}}日 - {{order_id_info.end_time|filterTimeMM}}月{{order_id_info.end_time|filterTimeDD}}日
                </span>
                <span>共{{order_id_info.occupancy_day_num}}晚</span>
            </div>
        </div>
        <div v-if="this.setTime >= 0" class="onlinePay_btn">确认支付</div>
        <div v-else class="onlinePay_btn_old">已过期，请重新下单</div>
    </div>
</template>
<script>
import { order_detail } from "@/api/api";
export default {
    name: "onlinePay",
    components: {},
    data() {
        return {
            setTime: 60, //15分钟即900s，自己调整!
            getTime: "01:00",
            order_id_info: ""
        };
    },
    methods: {},
    watch: {},
    computed: {},
    created() {
        let para = this.$route.query.order_id;
        this.order_id = para;
        this.fetchOrderidInfo();
    },
    mounted() {
        let timer = setInterval(() => {
            if (this.setTime >= 0) {
                let tmpMin = Math.floor(this.setTime / 60);
                let min = tmpMin < 10 ? "0" + tmpMin : tmpMin;
                let tmpSec = Math.floor(this.setTime % 60);
                let sec = tmpSec < 10 ? "0" + tmpSec : tmpSec;
                this.getTime = min + ":" + sec;
                this.setTime--;
            } else {
                clearInterval(timer);
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
                        this.order_id_info = res.data.data;
                    }
                })
                .catch();
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