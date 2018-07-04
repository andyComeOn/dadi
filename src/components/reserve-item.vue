<template>
    <div class="room-wrapper">
        <ul class="list">
            <li>
                <div class="lf">
                    <img src="../assets/images/img/room.png" alt="">
                </div>

                <div class="md">
                    <p class="name m-ellipsis">明星商务间</p>
                    <div class="label">
                        <span>18平</span>
                        <span>大床房</span>
                        <span>大浴缸</span>
                    </div>
                    <p class="collection">
                        <span>收藏</span>
                    </p>
                </div>
                <div class="rg">
                    <div class="price">
                        <div class="price-now">&yen;856856</div>
                        <div class="price-hty">&yen;399</div>
                    </div>
                    <div class="book">预订</div>
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
                // list : [{},{},{}]
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
            .lf {
                width: 83px;
                height: 73px;
                margin-right: 10px;
                img {
                    width: 83px;
                    height: 73px;
                }

            }
            .md {
                flex: 1;
                height: 73px;
                padding: 8px 0 0 0;
                font-family: PingFangSC-Regular;
                color: rgba(153, 153, 153, 1);
                .name {
                    height: 20px;
                    font-size: 14px;
                    color: rgba(51, 51, 51, 1);
                    line-height: 20px;
                }
                .label {
                    height: 16px;
                    font-size: 12px;
                    line-height: 16px;
                    margin-bottom: 6px;
                }
                .collection {
                    padding-left: 20px;
                    height: 17px;
                    font-size: 12px;
                    line-height: 17px;
                    /* background: url() no-repeat left center; */
                }
            }
            .rg {
                width: 110px;
                height: 73px;
                display: flex;
                flex-direction: row;
                align-items: center;
                .price {
                    flex: 1;
                    height: 73px;
                    /* display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center; */
                    padding-right: 10px;
                    .price-now {
                        width: 100%;
                        height: 19px;
                        line-height: 19px;
                        margin: 22px 0 0 0;
                        color: #FFBA56;
                        font-size: 12px;
                        text-align: right;

                    }
                    .price-hty {
                        color: #cccccc;
                        font-size: 10px;
                        line-height: 14px;
                        text-decoration: line-through;
                        text-align: right;
                    }
                }
                .book {
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