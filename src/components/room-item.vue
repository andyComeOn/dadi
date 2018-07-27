<template>
    <div class="room-wrapper">
        <!-- 判断是否搜索到筛选条件的酒店 -->
        <div class="no-search-result-wrapper" v-show="isShow">
            <div class="img-wrapper">
                <img src="../assets/images/404/404_no hotel.pn.png" alt="">
            </div>
            <p>暂无符合您要求的酒店</p>
        </div>

        <ul class="list">
            <li v-for="(item,index) in dataList" :key="index" @click="storeDetail(item.id,item.begin,item.finish)">
                <div class="lf">
                    <img :src="item.img_logo" alt="">
                </div>
                <div class="rg">
                    <p class="name m-ellipsis">{{item.name}}</p>
                    <p class="info m-ellipsis-2">{{item.introduce}}</p>
                    <p class="location">{{item.area}}</p>
                    <div class="price-wrap">
                        <div class="price">&yen;
                            <span>{{item.price}}</span>起</div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { store_list } from "@/api/api";
export default {
    name: "room-wrapper",
    props: ["condition"],
    watch: {
        condition: {
            handler(newValue, oldValue) {
                this.fetchData(newValue);
            },
            deep: true,
            immediate: true
        }
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
            // 门店list
            dataList: ""
        };
    },
    created() {},
    mounted() {},
    methods: {
        // 拉取门店item
        fetchData(param) {
            this.$http({
                method: "POST",
                url: store_list,
                data: param
            }).then(res => {
                if (res.data.status == 1) {
                    this.dataList = res.data.data;
                } else {
                    this.isShow = true;
                }
            });
        },

        // 门店item的点击事件
        storeDetail(id, begin, finish) {
            console.lo;
            this.$router.push({
                path: "/hotelDetail",
                query: {
                    store_id: id,
                    begin: begin,
                    finish: finish
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
@import "../assets/less/var.less";

.no-search-result-wrapper {
    padding-top: 15px;
    background: #eff1f0;
    .no-search-result-wrapper {
        .img-wrapper {
            font-size: 0;
            text-align: center;
            img {
                display: inline-block;
                width: 152px;
                height: 108px;
            }
        }
        p {
            padding: 18px 0;
            line-height: 20px;
            font-size: 14px;
            color: #666;
            text-align: center;
        }
    }
}

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