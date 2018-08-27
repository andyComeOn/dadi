<template>
    <div class="room-wrapper">
        <!-- toast提示 -->
        <div v-show="isRoomItemToastVisible">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">数据加载中</p>
            </div>
        </div>
        <!-- 搜索到的酒店列表 -->
        <ul class="list" v-if="dataList">
            <li v-for="(item,index) in dataList" :key="index" @click="storeDetail(item.id,item.begin,item.finish)">
                <div class="lf">
                    <img :src="item.logo" alt="">
                </div>
                <div class="rg">
                    <p class="name m-ellipsis">{{item.name}}</p>
                    <p class="info m-ellipsis-2">{{item.introduce}}</p>
                    <p class="location">{{item.area}}</p>
                    <div class="price-wrap">
                        <span class="yen">&yen;</span>
                        <span class="price">{{item.price}}</span>
                        起
                        <!-- <div class="price">
                            
                            
                            <span>{{item.price}}</span>
                        起</div> -->
                    </div>
                </div>
            </li>
        </ul>
        <!-- 无搜索到符合条件的酒店 -->
        <div class="no-search-result-wrapper" v-else v-show="isShow">
            <div class="img-wrapper">
                <img src="../assets/images/404/404-no-hotel.png" alt="">
            </div>
            <p>暂无符合您要求的酒店</p>
        </div>
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
            dataList: "", // 门店list
            isRoomItemToastVisible: true // 搜索
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
                this.isRoomItemToastVisible = false;
                if (res.data.status == 1) {
                    this.dataList = res.data.data;
                } else {
                    this.isShow = true;
                }
            });
        },

        // 门店item的点击事件
        storeDetail(id, begin, finish) {
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
.no-search-result-wrapper {
    padding-top: 15px;
    background: #eff1f0;
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
            background: #e5e5e5;
            transform: scaleY(0.5);
        }
        .lf {
            width: 100px;
            height: 120px;
            float: left;
            background: url("../assets/images/default/jiudian.jpg") no-repeat
                right center;
            background-size: 100px 120px;
            img {
                width: 100px;
                height: 120px;
            }
        }
        .rg {
            margin-left: 100px;
            padding: 5px 0 0 10px;
            .name {
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
                margin-top: 5px;
                margin-bottom: 10px;
                line-height: 16px;
                font-size: 12px;
                color: rgba(102, 102, 102, 1);
            }
            .price-wrap {
                line-height: 21px;
                vertical-align: bottom;
                font-size: 12px;
                color: #666;
                .yen {
                    color: #ffba56;
                }
                .price {
                    font-size: 16px;
                    color: #ffba56;
                }
            }
        }
    }
}
</style>