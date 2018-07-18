<template>
    <div class="order-detail-page m-position-ab">
        <div class="order-info">
            <div class="order-box">
                <div class="lf">
                    <span class="type">已关闭</span>
                    <span class="order-num">订单号：QG2018021318258888</span>
                </div>
                <div class="rg">
                    <span class="price">&yen; 368.00</span>
                    <span class="arrow"><img src="../../assets/images/arrows/ic_pay_arrow.png" alt=""></span>

                </div>
            </div>
        </div>

        <!-- 酒店位置 -->
        <div class="location-info">
            <div class="location-box">
                <p class="name">秋果酒店西直门店</p>
                <p class="location-tel location">北京市海淀区交通大学路上园村甲4号</p>
                <p class="location-tel tel"><a href="tel: 010-68686868">010-68686868</a></p>
            </div>
		   
        </div>
        <div class="time-contact-info time-info">
            <ul class="time-contact-box">
                <li class="li">
                    <label class="lab">入住房型</label>
                    <span class="span">商务明星间</span>
                </li>
                <li class="li">
                    <label class="lab">住店日期</label>
                    <span class="span">3月29日－3月30日 共1天</span>
                </li>
                <li class="li">
                    <label class="lab">下单日期</label>
                    <span class="span">2018.07.06 23:22</span>
                </li>
            </ul>
        </div>
        <div class="time-contact-info contact-info">
            <ul class="time-contact-box contact-box">
                <li class="li">
                    <label class="lab">姓名</label>
                    <span class="span">泡芙</span>
                </li>
                <li class="li">
                    <label class="lab">联系人电话</label>
                    <span class="span">158 0103 4588</span>
                </li>
               
            </ul>
        </div>

    </div>
</template>

<script>

import hotelLocation from "@/components/hotel-location";
export default {
    name: "order-detail",
    components: {
        hotelLocation
    },
    data() {
        return {};
    },
    methods: {}
};
</script>

<style lang="less" scoped>
// 重置weui样式
.order-detail-page{
    padding: 10px 15px 0; 
}

// 订单信息
.order-info {
    .order-box{
        background: #ffffff;
        padding: 12px 15px;
        height: 70px;
        display: flex;
        flex-direction: row;
        .lf{
            flex: 1;
            height: 46px;
            display: flex;
            flex-direction: column;
            .type {
                width: 70px;
                line-height: 22px;
                color: #30B097;
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
            width: 90px;
            height: 46px;
            padding-top: 3px;
            display: flex;
            flex-direction: row;
            .price {
                width: 70px;
                color: #FFBA56;
                line-height: 18px;
                font-size: 15px;
            }
            .arrow {
                width: 20px;
                height: 8px;
                margin-top: 2px;
                line-height: 8px;
                text-align: center;
                
                img {
                    display: inline-block;
                    width: 13px;
                    height: 7px;
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
                background: url('../../assets/images/hotel-label/my_order_location.png') no-repeat left center;
                background-size: 13px 14px;
            }
            &.tel {
                background: url('../../assets/images/hotel-label/my_order_phone.png') no-repeat left center;
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
            &::after{
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

//联系人信息

</style>