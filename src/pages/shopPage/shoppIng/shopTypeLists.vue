<template>
    <div>
        <!-- 品牌制造商直供 str -->
        <div class="brandTypeLists">
            <ul class="brandLists">
                <li v-for="(item,index) in shopTypeListsArr" :key="index">
                    <dl>
                        <dt>
                            <img :src="item.goods_img" alt="">
                        </dt>
                        <dd>
                            <p><span v-if='item.consume_type == 2'>积分</span>{{item.goods_name}}</p>
                            <h2><span>￥</span>{{item.goods_price}}</h2>
                        </dd>
                    </dl>
                </li>
            </ul>
        </div>
        <!-- 品牌制造商直供 end -->
    </div>
</template>
<script>
import { shopTypeLists } from "../../../api/api.js";
export default {
    name: "shoppIng",
    components: {},
    data() {
        return {
            shopTypeListsArr: []
        };
    },
    computed: {},
    mounted() {
        // //获取参数
        // var dataObj = {

        // };
        // this.$http({
        //     url: shopTypeLists,
        //     method: "POST",
        //     data: dataObj
        // }).then(res => {
        //     console.log(res);
        // }).catch(err => {
        //     console.log(err);
        // });
        var shopListsData = {
            category_id: this.$route.query.shopType
        };
        this.$http({
            url: shopTypeLists,
            method: "POST",
            data: shopListsData
        }).then(res => {
            if (res.data.status == 1) {
                this.shopTypeListsArr = res.data.data;
                console.log(res);
            } else {
                console.log("获取失败");
            }
        });
    },
    methods: {}
};
</script>
<style lang="less" scoped>
@import "./shopping.less";
</style>
 