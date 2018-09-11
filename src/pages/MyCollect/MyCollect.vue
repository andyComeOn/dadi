<template>
    <div class="my-collect-page m-position-ab">
        <!-- toast提示 -->
        <div v-show="loading">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">数据加载中</p>
            </div>
        </div>
        <ul v-if="list" class="list" id="list">
            <li v-for="(item,index) in list" :key="index">
                <div class="head">{{item.time|filterTimeYY}}年{{item.time|filterTimeMM}}月</div>
                <div class="body" v-if="item.list.length>0">
                    <!-- 下面这个才是需要侧滑的item -->
                    <slip-del class="body-box" v-for="(itemSon,ind) in item.list" :key="ind" ref="slipDel" del-text="删除" @slip-open="slipOpen(itemSon.store_id)" @del-click="del(itemSon.collect_id)">
                        <div class="body-content" @click="collectItemJump(itemSon.store_id)">
                            <div class="lf">
                                <img :src="itemSon.logo" alt="">
                            </div>
                            <div class="rg">
                                <p class="name m-ellipsis">{{itemSon.name}}</p>
                                <p class="info m-ellipsis-2">{{itemSon.introduce}}</p>
                                <div class="price-wrap">
                                    <div class="price">
                                        <span style="color:#30B097;font-size:10px;">&yen;</span>
                                        <span style="color:#30B097;font-size:15px;">{{itemSon.market_amount}}</span>
                                        起
                                        <span style="color:#30B097;">{{itemSon.city}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 侧滑的按钮 -->
                        <div slot="del" class="body-slide">删除</div>
                    </slip-del>
                </div>
                <!-- 这是之前提示后台过滤写的逻辑 -->
                <!-- <div v-else class="body-box-no-data"> -->
                <!-- {{item.time|filterTimeYY}}年{{item.time|filterTimeMM}}月没有收藏列表，希望后台过滤！ -->
                <!-- </div> -->
                <!-- 右侧label"暂停业"是否展示，问产品 -->
            </li>
        </ul>
        <div v-else v-show="isShow" class="no-collect">
            <img src="../../assets/images/404/404-no-order.png" alt="">
            <p>暂无收藏记录</p>
        </div>

    </div>
</template>

<script>
import { collect_list } from "@/api/api";
import SlipDel from "vue-slip-delete";
export default {
    name: "my-collect",
    components: {
        SlipDel
    },
    data() {
        return {
            list: "",
            isShow: false, //toast
            loading: true,

            listDemo: [
                {
                    ad: 1
                },
                {
                    ad: 2
                },
                {
                    ad: 3
                }
            ]
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        // 拉取data
        fetchData() {
            this.$http({
                method: "POST",
                url: collect_list,
                data: {}
            })
                .then(res => {
                    this.loading = false;
                    if (res.data.status == 1) {
                        this.list = res.data.data;
                    } else {
                        this.isShow = true;
                    }
                })
                .catch(err => {});
        },
        // 收藏item点击跳转该门店详情
        collectItemJump(store_id) {
            this.$router.push({
                path: "hotelDetail",
                query: { store_id: store_id }
            });
        },
        // 滑动打开后的回调
        slipOpen(vm) {
            console.log(vm);
        },
        // 点击删除的回调
        del(collect_id) {
            console.log(collect_id);
        }
    }
};
</script>

<style lang="less" scoped>
.list {
    li {
        .head {
            line-height: 30px;
            padding-left: 15px;
        }
        .body {
            background: #fff;
            .body-box {
                position: relative;
                height: 93px;
                user-select: none;
                &::before {
                    content: "";
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    height: 1px;
                    background: #e5e5e5;
                    transform: scaleY(0.5);
                    z-index: 10;
                }
                .body-content {
                    padding: 10px 15px;
                    background: #fff;
                    .lf {
                        width: 83px;
                        height: 73px;
                        float: left;
                        background: url("../../assets/images/default/fangxing.jpg")
                            no-repeat right center;
                        background-size: 83px 73px;
                        img {
                            width: 83px;
                            height: 73px;
                        }
                    }
                    .rg {
                        margin-left: 93px;
                        color: #666;
                        .name {
                            height: 21px;
                            font-size: 15px;
                            color: #333333;
                            line-height: 21px;
                        }
                        .info {
                            line-height: 16px;
                            height: 32px;
                            font-size: 12px;
                        }
                        .price-wrap {
                            height: 20px;
                            .price {
                                height: 20px;
                                vertical-align: bottom;
                                font-size: 10px;
                            }
                        }
                    }
                }
                .body-slide {
                    line-height: 93px;
                    width: 60px;
                    text-align: center;
                    background: red;
                    color: #fff;
                }
            }
        }
        .body-box-no-data {
            padding: 0 15px;
            background: #fff;
            color: red;
        }
    }
}
.no-collect {
    img {
        display: block;
        width: 152px;
        height: 108px;
        margin: 170px auto 0;
    }
    p {
        line-height: 20px;
        color: #666;
        font-size: 14px;
        text-align: center;
        font-family: PingFangSC-Regular;
    }
}
</style>