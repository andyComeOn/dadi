<template>
	<div class="order-list-item-page">
		<ul class="list">
			<li>
                <!-- 主信息 -->
                <router-link to="orderDetail" tag="span">
                    <div class="bd">
                        <div class="lf">
                            <p class="hotel-name m-ellipsis">秋果酒店机场店</p>
                            <p class="room-type-date type m-ellipsis">特惠商务大床房</p>
                            <p class="room-type-date date">02-28 至 03-09 10天</p>
                        </div>
                        <div class="rg">
                            <p class="order-status">已关闭</p>
                            <p class="order-price">&yen; 368.00</p>
                        </div>
                    </div>
                </router-link>
                <!-- 可操作按钮 -->
                <div class="ft">
                    <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_plain-primary">删除</a>
                    <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_plain-primary grey"> 取消订单</a>
                    <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_plain-primary active-ori">再次预定</a>
                    <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_plain-primary active-mcolor">申请维权</a>
                    
                </div>
			</li>
			
		</ul>
	</div>
</template>

<script>

import {store_list} from '../api/api';
export default {
    name: "order-list-item",
    // props: ["condition"],
    watch: {
        // condition: {
        //     handler(newValue, oldValue) {
        //         this.fetchData(newValue)
        //     },
        //     deep: true,
        //     immediate: true
        // }
    },
    data() {
        return {
            list: [
                {
                    type: 0,
                    imgSrc: require("../assets/images/img/room.png"),
                    name: "秋果酒店机场店",
                    info:
                        "秋果都市里的世外桃源,秋果都市里的世外桃源秋果都市里的世外桃源秋果都市里的世外桃源。",
                    location: "北京市－朝阳区 距离您2.5km",
                    price: 686
                },
                {
                    type: 3,
                    imgSrc: require("../assets/images/img/room.png"),
                    name: "顺义店",
                    info:
                        "好酒店,好酒店好酒店好酒店好酒店好酒店好酒店好酒店好酒店好酒店好酒店好酒店。",
                    location: "北京市－顺义区 距离您3.5km",
                    price: 999
                },
            ],

        };
    },
    created() {
     
    },
    mounted() {
        
    },
    methods: {
        fetchData(param) {
            this.$http({
                method: "POST",
                url: store_list,
                data: param
            }).then(res => {
                this.dataList = res.data.data;
            });
        }
    }
};
</script>

<style lang="less" scoped>
@import "../assets/less/var.less";
.weui-btn_mini {
    padding: 0 11px;
    line-height: 26px;
    
}
.weui-btn_plain-primary {
    color: #666;
    border: 1px solid #ccc;
    font-size: 14px;
    &.grey {
        color: #999;
        border: 1px solid #e5e5e5;
    }
    &.active-mcolor {
        color: #30B097;
        border: 1px solid #30B097;
    }
    &.active-ori {
        color: #F78C3E;
        border: 1px solid #F78C3E;
    }
}
.list {
    padding: 10px 15px 0;
    li {
        padding: 10px;
        margin-bottom: 10px; 
        position: relative;
        background: #ffffff;
        .bd {
            height: 80px;
            display: flex;
            flex-direction: row;
            position: relative;
            &:after {
                content: "";
                position: absolute;
                left: 0;
                bottom: 0;
                right: 0;
                height: 1px;
                background: #e5e5e5;
                transform: scaleY(0.5);
            }
            .lf {
                flex: 1;
                height: 80px;
                color: #666;
                .hotel-name {
                    color: #999;
                    font-size: 15px;
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
                        color: #999;
                        background: url('../assets/images/hotel-label/my_order_hotel.png') no-repeat left center;
                        background-size: 16px 16px; 
                    }
                    &.date {
                        background: url('../assets/images/hotel-label/my_order_date.png') no-repeat left center;
                        background-size: 16px 16px; 
                    }
                }
            }
            .rg {
                width: 70px;
                height: 80px;
                padding-top: 4px;
                text-align: right;
                .order-status {
                    height: 16px;
                    line-height: 16px;
                    margin-bottom: 8px;
                }
                .order-price {
                    height: 20px;
                    line-height: 20px;
                    font-size: 14px;
                }
            }
        }
        .ft {
            text-align: right;
        }
    }
}
</style>