<template>
    <div class="my-collect-page m-position-ab">
        <ul class="list">
            <li>
                <div class="head">7月|2018年 </div>
                <div class="body">
                    <div class="body-box">

                        <div class="lf">
                            <!-- <img :src="item.img_logo" alt=""> -->
                            <!-- :src="item.img_logo" -->
                        </div>
                        <div class="rg">
                            <p class="name m-ellipsis">
                                <!-- {{item.name}} -->
                                秋果交通大学店
                            </p>
                            <p class="info m-ellipsis-2">
                                <!-- {{item.introduce}} -->
                                秋果－都市里的世外桃源，清新率真的设计风格，告别喧嚣的闹市生活，市里的世外桃源，市里的世外桃源。
                            </p>
                            <div class="price-wrap">
                                <div class="price">
                                    <span style="color:#30B097;font-size:10px;">&yen;</span>
                                    <span style="color:#30B097;font-size:15px;">
                                        <!-- {{item.price}} -->
                                        888
                                    </span>
                                    起
                                    <span style="color:#30B097;">北京市-朝阳区</span>

                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 右侧标记是否营业 -->
                    <!-- <div class="rg">
                        <span class="book">
                            暂停业
                        </span>
                    </div> -->

                </div>
            </li>
        </ul>
    </div>

</template>

<script>
// import City from "@/components/city/city.vue";
export default {
    name: "my-collect",
    components: {
        // City
    },
    data() {
        return {};
    },
    methods: {}
};
</script>


<style lang="less" scoped>
.list {
    // padding: 8px 15px 0;

    li {
        .head {
            height: 30px;
        }
        .body {
            padding: 0 15px;
            background: #fff;
            height: 93px;
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
                    background: palegreen;
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
    }
}
</style>