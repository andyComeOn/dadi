<template>
    <div>
        <div class="deliveryBox">
            <ul class="deliveryLists">
                <li>
                    <router-link :to="{path:'shoppIngDetails'}">
                        <img src="../../../assets/images/shop/peisong_mendian.png" alt="">
                        <p>门店自提</p>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{path:'shoppIngDetails'}">
                        <img src="../../../assets/images/shop/peisong_wuliu.png" alt="">
                        <p>物流配送</p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .deliveryBox{
        position: fixed;
        top: 0;
        left: 0;
        background: #f6f6f6;
        width: 100%;
        height: 100%;
    }
    .deliveryLists{
        background: #fff;
        li{
            line-height: 50px;
            position: relative;
            padding-left: 41px;
            img{
                display: inline-block;
                position: absolute;
                top: 50%;
                left: 15px;
                width: 18px;
                height: 18px;
                transform: translateY(-50%);
            }
            p{
                font-size: 16px;
                color: #333;
            }
            &:nth-of-type(1) p{
                border-bottom: 1px solid #eee;
            }
        }
    }
</style>

