<template>
	<div class="hotel-detail">
		<!-- swiper -->
		<m-swipe swipeid="swipeHotelDetail" :autoplay="0" paginationDirection="right">
			<div class="swiper-slide " slot="swiper-con">
				<img src="../../assets/images/banner/01.jpg" alt="">
			</div>
			<div class="swiper-slide " slot="swiper-con"><img src="../../assets/images/banner/02.jpg" alt=""></div>
			<div class="swiper-slide " slot="swiper-con"><img src="../../assets/images/banner/03.jpg" alt=""></div>
		</m-swipe>

		<!-- 酒店位置说明 -->
		<div class="detail">
			<div class="name">{{data_store.store_name}}</div>
			<ul class="location-wrapper">
				<li class="location">{{data_store.address}}</li>
				<li class="location-info"> {{data_store.introduce}}</li>
			</ul>
		</div>

		<!-- 酒店详情查看更多 -->
		<div class="detail-more-container">
			<div class="detail-more-wrapper">
				<div class="lf">
					<span class="wifi">免费wifi</span>
					<span class="luggage">免费行李寄存</span>
				</div>
				<div class="rg">


					<router-link :to=" { path: 'hotelLabel', query: { store_id: this.watchObj.store_id }}" tag="div">
						<span class="btn-more">查看更多</span>
					</router-link>
				</div>
			</div>
		</div>

		<!-- 入离时间展示 -->
		<div class="come-go-box">
			<div class="come-go">
				<div class="come">
					<span>入住</span>
					<span>03月28日</span>
				</div>
				<span class="total">
					共2晚
				</span>

				<div class="go">
					<span>离店</span>
					<span>03月30日</span>
				</div>
			</div>
		</div>

		<!-- 预定组件 -->
		<!-- <reserveItem
			:condition="watchObj">
		</reserveItem> -->

		<div class="reverse-wrapper">
			<ul class="list">
				<li v-for="(item,index) in data_room" :key="index">
					<!-- 左边图片展示 -->
					<div class="lf">
						<!-- ../assets/images/img/room.png -->
						<img :src="item.room_img" alt="">
					</div>

					<!-- 中间 -->
					<div class="md">
						<!-- 大标题 -->
						<p class="name m-ellipsis">商务间{{item.name}}</p>
						<!-- 酒店设施集合 -->
						<div class="labels">
							<!-- <span>18平</span>
                        <span>大床房</span>
                        <span>大浴缸</span> -->
							{{item.introduce}}
						</div>
						<!-- 价格（新、旧） -->
						<div class="price">
							<span class="price-new">&yen;{{item.discount_price}}</span>
							<span class="price-old">&yen;{{item.market_amount}}</span>
						</div>
					</div>
					<!-- 右侧预定按钮 -->
					<div class="rg">
						<span class="book" @click="book(item.store_id,item.id)">
							预订
						</span>
					</div>
				</li>
			</ul>
		</div>

	</div>
</template>

<script>
import mSwipe from "../../components/swipe";
import hotelLocation from "../../components/hotel-location";
import { store_detail } from "@/api/api";

export default {
    name: "hotel-detail",
    components: {
        mSwipe,
        hotelLocation
        // reserveItem
    },
    data() {
        return {
            // 拉去数据传参对象
            watchObj: {
                cpid: "1",
                store_id: "",
                begin: "",
                finish: ""
            },
           

            
            data_room: [],
            data_store: {},
            count: "",
            begin: "",
            finish: ""
        };
    },
    created() {
        // 获取路由参数
        var routePara = {
            store_id: this.$route.query.store_id,
            begin: this.$route.query.begin,
            finish: this.$route.query.finish
        };

        // 给date()中监听数据进行赋值
        this.watchObj.store_id = routePara.store_id;
        this.watchObj.begin = routePara.begin;
        this.watchObj.finish = routePara.finish;

        // 拉去数据
        this.fetchData(this.watchObj);
    },
    methods: {
        // 拉取门店详情
        fetchData(param) {
            this.$http({
                method: "POST",
                url: store_detail,
                data: param
            }).then(res => {
                console.log(res.data);
                if (res.data.status == 1) {
                    // 房间类型list
                    this.data_room = res.data.data.data_room;
                    // 房间介绍
                    this.data_store = res.data.data.data_store;
                    // 入店、离店、共几晚
                    this.begin = res.data.data.begin;
                    this.finish = res.data.data.finish;
                    this.count = res.data.data.count;
                } else {
                    this.isShow = true;
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
// 酒店的位置
.detail {
    padding: 10px 15px;
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

    .name {
        height: 22px;
        line-height: 22px;
        font-size: 16px;
        color: #333333;
        letter-spacing: 0;
    }

    .location-wrapper {
        width: 100%;
        padding-left: 22px;
        background: url("../../assets/images/hotel-label/ic_dingwei.png") no-repeat 3px 3px;
        background-size: 13px 15px;
    }
}

// 查看更多
.detail-more-container {
    background: #eff1f0;
    padding-bottom: 5px;
    .detail-more-wrapper {
        height: 40px;
        padding: 10px 15px;
        background: #fff;
        font-size: 14px;
        color: #666;
        .lf {
            height: 20px;
            float: left;
            span {
                display: inline-block;
                height: 20px;
                line-height: 20px;
                padding-left: 26px;
                margin-right: 12px;
                &.wifi {
                    background: url("../../assets/images/hotel-label/ic_wifi.png")
                        no-repeat left center;
                    background-size: 18px 18px;
                }
                &.luggage {
                    background: url("../../assets/images/hotel-label/ic_luggage.png")
                        no-repeat left center;
                    background-size: 18px 18px;
                }
            }
        }
        .rg {
            height: 20px;
            float: right;
            font-size: 12px;
            span {
                display: inline-block;
                line-height: 20px;
                height: 20px;
                padding-right: 14px;
                background: url("../../assets/images/arrows/ic-arrow_10_18.png")
                    no-repeat right center;
                background-size: 5px 9px;
            }
        }
    }
}

// 入离店展示
.come-go-box {
    height: 70px;
    padding-bottom: 5px;
    background: #e5e5e5;
    .come-go {
        height: 65px;
        text-align: center;
        background: #fff;
        padding: 0 15px;
        position: relative;
        .come,
        .go {
            float: left;
            height: 65px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            span {
                &:nth-child(1) {
                    color: #999;
                }
                &:nth-child(2) {
                    color: #333;
                }
            }
        }
        .go {
            float: right;
        }
        .total {
            position: absolute;
            width: 40px;
            height: 22px;
            line-height: 22px;
            border: 1px solid #ccc;
            border-radius: 3px;
            top: 50%;
            left: 50%;
            margin: -11px 0 0 -40px;
        }
    }
}

// 预定的list
.reverse-wrapper {
    .list {
        padding: 0 15px;
        li {
            padding: 10px 0 5px 0;
            height: 88px;
            position: relative;
            display: flex;
            flex-direction: row;
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
            // 左边图片展示
            .lf {
                width: 83px;
                height: 73px;
                margin-right: 10px;
                img {
                    width: 83px;
                    height: 73px;
                }
            }
            // 中间
            .md {
                flex: 1;
                height: 73px;
                padding: 8px 0 0 0;
                color: rgba(153, 153, 153, 1);
                // 酒店名称
                .name {
                    height: 20px;
                    font-size: 14px;
                    color: rgba(51, 51, 51, 1);
                    line-height: 20px;
                }
                // 酒店房间标签
                .labels {
                    height: 16px;
                    line-height: 16px;
                    font-size: 12px;
                    margin-bottom: 6px;
                }
                // 价格
                .price {
                    height: 19px;
                    vertical-align: bottom;
                    .price-new {
                        line-height: 19px;
                        margin-right: 5px;
                        color: #ffba56;
                        font-size: 16px;
                    }
                    .price-old {
                        color: #cccccc;
                        font-size: 10px;
                        line-height: 14px;
                        text-decoration: line-through;
                    }
                }
            }
            // 右侧预定按钮
            .rg {
                width: 44px;
                height: 73px;
                line-height: 73px;
                .book {
                    display: inline-block;
                    width: 44px;
                    height: 27px;
                    line-height: 27px;
                    text-align: center;
                    color: rgba(255, 255, 255, 1);
                    font-size: 14px;
                    background: rgba(48, 176, 151, 1);
                    border-radius: 5px;
                }
            }
        }
    }
}
</style>