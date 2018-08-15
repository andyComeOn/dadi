<template>
    <div class="my-collect-page m-position-ab">
        <!-- toast提示 -->
        <div v-show="isMyCollectToastVisible">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">数据加载中</p>
            </div>
        </div>
        <ul class="list" v-if="list">
            <li v-for="(item,index) in list" :key="index">
                <div class="head">{{item.time|filterTimeYY}}年{{item.time|filterTimeMM}}月</div>
                <div class="body" v-if="item.list.length>0">
                    <div class="body-box" v-for="(itemSon,ind) in item.list" :key="ind">
                        <div class="lf">
                            <img :src="itemSon.img_logo" alt="">
                        </div>
                        <div class="rg">
                            <p class="name m-ellipsis">{{itemSon.name}}</p>
                            <p class="info m-ellipsis-2">{{itemSon.introduce}}</p>
                            <div class="price-wrap">
                                <div class="price">
                                    <span style="color:#30B097;font-size:10px;">&yen;</span>
                                    <span style="color:#30B097;font-size:15px;">{{itemSon.market_amount}}</span>
                                    起
                                    <span style="color:#30B097;">{{itemSon.province}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="body-box-no-data">
                    {{item.time|filterTimeYY}}年{{item.time|filterTimeMM}}月没有收藏列表，希望后台过滤！
                </div>
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
import { collect_list, login_test } from "@/api/api";
export default {
    name: "my-collect",
    components: {},
    data() {
        return {
            list: "",
            isShow: false, //toast
            isMyCollectToastVisible: true
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            this.$http({
                method: "POST",
                url: collect_list,
                data: {}
            })
                .then(res => {
                    console.log(res);
                    this.isMyCollectToastVisible = false;
                    if (res.data.status == 1) {
                        this.list = res.data.data;
                    } else {
                        this.isShow = true;
                    }
                })
                .catch(err => {});
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
            padding: 0 15px;
            background: #fff;
            .body-box {
                position: relative;
                padding: 10px 0;
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
                        margin-bottom: 3px;
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