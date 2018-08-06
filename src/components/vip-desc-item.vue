<template>
    <div class="vip-desc-item">
        <!-- 开卡权益 -->
        <div class="card-right">

        </div>
        <!-- 会员权益 -->
        <div class="vip-right">

        </div>
    </div>
</template>

<script>
import { store_list } from "@/api/api";
export default {
    name: "vip-desc-item",
    props: [],
    watch: {
        // condition: {
        //     handler(newValue, oldValue) {
                
        //     },
        //     deep: true,
        //     immediate: true
        // }
    },
    data() {
        return {
            isShow: false,
            list: [
                {
                    type: 0,
                    imgSrc: require("../assets/images/img/room.png"),
                    name: "秋果酒店机场店",
                    info:
                        "秋果都市里的世外桃源,秋果都市里的世外桃源秋果都市里的世外桃源秋果都市里的世外桃源。",
                    location: "北京市－朝阳区 距离您2.5km",
                    price: 686
                }
            ],
            
        };
    },
    created() {},
    mounted() {},
    methods: {
         
        }
    }
};
</script>

<style lang="less" scoped>
.list {
    padding: 8px 15px 0;
    li {
        padding: 5px 0;
        height: 130px;
        position: relative;
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
        .lf {
            width: 100px;
            height: 120px;
            float: left;
            img {
                width: 100px;
                height: 120px;
            }
        }
        .rg {
            margin-left: 100px;
            padding: 5px 0 0 10px;
            .name {
                height: 22px;
                font-size: 16px;
                color: rgba(51, 51, 51, 1);
                line-height: 22px;
                margin-bottom: 5px;
            }
            .info {
                line-height: 16px;
                font-size: 12px;
                color: rgba(102, 102, 102, 1);
            }
            .location {
                margin-top: 9px;
                margin-bottom: 9px;
                height: 14px;
                font-size: 10px;
                color: rgba(102, 102, 102, 1);
                line-height: 14px;
            }
            .price-wrap {
                height: 20px;
                .price {
                    height: 20px;
                    vertical-align: bottom;
                    font-size: 8px;
                    color: #666;
                    span {
                        font-size: 16px;
                        color: #ffba56;
                    }
                }
            }
        }
    }
}
</style>