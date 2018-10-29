<template>
    <div>
        <ul class="shopfooter">
            <li>
                <router-link :to="{path:'index'}">
                    <p>
                        <span></span>
                        <span>订单</span>
                    </p>
                </router-link>
            </li>
            <li>
                <router-link :to="{path:'shoppIng'}">
                    <p>
                        <span></span>
                        <span>购物</span>
                    </p>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<style lang='less'>
    .shopfooter{
        width: 100%;
        height: 45px;
        background: #fff;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 100;
        li{
            width: 50%;
            height: 45px;
            float: left;
            line-height: 45px;
            text-align: center;
            border-right: 1px solid #eee;
            font-size: 13px;
            color: #666;
        }
        li:nth-of-type(1){
            p{
                color: #666;
                span:nth-of-type(1){
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    background: url('../../assets/images/shop/my_dingfang.png') no-repeat center center;
                    background-size: 100% 100%;
                    margin-right: 8px;
                }
            }
        }
        li:nth-of-type(2){
            p{
                color: #666;
                span:nth-of-type(1){
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    background: url('../../assets/images/shop/my_gouwu.png') no-repeat center center;
                    background-size: 100% 100%;
                    margin-right: 8px;
                }
            }
        }
    }
</style>

