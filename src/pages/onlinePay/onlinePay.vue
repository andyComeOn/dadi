<template>
    <div class="olinePay_box">
        <div class="olinePay_box_time">
            <h1>{{minutes}}:{{seconds}}</h1>
            <p>支付剩余时间</p>
        </div>
        <div class="olinePay_box_content">
            <p class="store_name">北京秋果酒店三元桥燕莎店</p>
            <div class="room_introduce">
                <img src="../../assets/images/hotel-label/my_order_hotel.png" />
                <span>动感音乐间</span>
                <span>1间</span>
                <span class="room_money">￥148.00</span>
            </div>
            <div class="calendar">
                <img src="../../assets/images/hotel-label/my_order_date.png" />
                <span>02月26日-02月27日</span>
                <span>共1晚</span>
            </div>
        </div>
        <div v-if='this.minutes != 0 || this.seconds != 0' class="onlinePay_btn">确认支付</div>
        <div v-if='this.minutes == 0 && this.seconds == 0' class="onlinePay_btn_old">已过期，请重新下单</div>
    </div>
</template>
<script>
    export default {
        name:'onlinePay',
        components:{

        },
        data(){
            return{
                minutes: 15,    //分钟
                seconds: 0,     //秒
            }
        },
        mounted () {
            this.add();
        },
        methods:{
            //15分钟倒计时
            num: function (n) {
                return n < 10 ? '0' + n : '' + n
            },
            add: function () {
                var _this = this
                var time = window.setInterval(function () {
                    if (_this.seconds === 0 && _this.minutes !== 0) {
                        _this.seconds = 59
                        _this.minutes -= 1
                    } else if (_this.minutes === 0 && _this.seconds === 0) {
                        _this.seconds = 0
                        window.clearInterval(time)
                    } else {
                        _this.seconds -= 1
                    }
                }, 1000)
            }
        },
        watch: {
            second: {
                handler (newVal) {
                    this.num(newVal)
                }
            },
            minute: {
                handler (newVal) {
                    this.num(newVal)
                }
            }
        },
        computed: {
            second: function () {
                return this.num(this.seconds)
            },
            minute: function () {
                return this.num(this.minutes)
            }
        }
    }
</script>
<style scoped>
    .olinePay_box{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: #EFF1F0;
    }
    .olinePay_box_time{
        margin-top: 5px;
        background: #fff;
        padding-top: 25px;
        padding:25px 15px 0px 15px;
    }
    .olinePay_box_time h1{
        color: #666;
        text-align: center;
        font-size: 24px;
        line-height: 24px;
    }
    .olinePay_box_time p{
        font-size: 13px;
        line-height: 13px;
        margin-top: 10px;
        color: #666;
        text-align: center;
        padding-bottom: 25px;
        border-bottom: 1px solid #E5E5E5;
    }
    .olinePay_box_content{
        padding: 14px 15px 19px 15px;
        background: #fff;
    }
    .store_name{
        font-size: 15px;
        line-height: 27px;
        color: #666;
    }
    .room_introduce{
        line-height: 25px;
        font-size: 13px;
        color: #666;
    }
    .room_introduce span:nth-of-type(1){
        margin-right: 20px;
    }
    .room_introduce img{
        display: inline-block;
        width: 15px;
        height: 15px;
    }
    .calendar{
        line-height: 25px;
        font-size: 13px;
        color: #666;
    }
    .calendar span:nth-of-type(1){
        margin-right: 20px;
    }
    .calendar img{
        display:inline-block;
        width: 13px;
        height: 13px;
    }
    .room_money{
        color: #30B097;
        float: right;
        font-size: 21px;
    }
    .onlinePay_btn{
        background: #30B097;
        color: #fff;
        font-size: 18px;
        line-height: 48px;
        text-align: center;
        border-radius: 5px;
        width: 92%;
        margin: 0 auto;
        margin-top: 25px;
    }
    .onlinePay_btn_old{
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