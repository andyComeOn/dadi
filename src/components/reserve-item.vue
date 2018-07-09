<template>
    <div class="room-wrapper">
        <ul class="list">
            <li>
                <!-- 左边图片展示 -->
                <div class="lf">
                    <img src="../assets/images/img/room.png" alt="">
                </div>

                <!-- 中间 -->
                <div class="md">
                    <!-- 大标题 -->
                    <p class="name m-ellipsis">明星商务间</p>
                    <!-- 酒店设施集合 -->
                    <div class="labels">
                        <span>18平</span>
                        <span>大床房</span>
                        <span>大浴缸</span>
                    </div>
                    <!-- 价格（新、旧） -->
                    <div class="price">
                        <span class="price-new">&yen;856856</span>
                        <span class="price-old">&yen;399</span>
                    </div>
                </div>
                <!-- 右侧预定按钮 -->
                <div class="rg">
                    <span class="book" @click="book">预订</span>
                </div>
            </li>
            <li>
                <!-- 左边图片展示 -->
                <div class="lf">
                    <img src="../assets/images/img/room.png" alt="">
                </div>

                <!-- 中间 -->
                <div class="md">
                    <!-- 大标题 -->
                    <p class="name m-ellipsis">明星商务间</p>
                    <!-- 酒店设施集合 -->
                    <div class="labels">
                        <span>18平</span>
                        <span>大床房</span>
                        <span>大浴缸</span>
                    </div>
                    <!-- 价格（新、旧） -->
                    <div class="price">
                        <span class="price-new">&yen;856856</span>
                        <span class="price-old">&yen;399</span>
                    </div>
                </div>
                <!-- 右侧预定按钮 -->
                <div class="rg">
                    <span class="book" @click="book">预订</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'room-wrapper',
        props: {
            leftShow: {
                type: Boolean,
                default: true
            },
            rightShow: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                
            }
        },
        methods:{
            book(){
                this.$router.push('/order')
            }
        }
    }
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
                content: '';
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
                        color: #FFBA56;
                        font-size: 12px;
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
                    color:rgba(255,255,255,1);
                    font-size: 14px;
                    background: rgba(48, 176, 151, 1);
                    border-radius: 5px;
                }
            }
        }
    }
</style>