<template>
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
</template>

<script>
import { store_detail } from "@/api/api";
export default {
    name: "reverse-wrapper",
    props: ["condition"],
    data() {
        return {
            data_room: [],
            data_store: {},
            count: "",
            begin: "",
            finish: ""
        };
    },
    watch: {
        condition: {
            handler(newValue, oldValue) {
                this.fetchData(newValue);
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        book() {
            this.$router.push("/order");
        },

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
@import "../assets/less/var.less";
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
            background: @tabbarBorderColor;
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
</style>