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
    @import './deliveryWay.less';
</style>

