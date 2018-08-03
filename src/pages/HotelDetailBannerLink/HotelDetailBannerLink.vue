<template>
    <div class="hotel-detail-banner-link-page">
        <ul class="list">
            <li><div></div></li>
            <li><div></div></li>
            <li><div></div></li>
            <li><div></div></li>
            <li><div></div></li>
            <li><div></div></li>
        </ul>
    </div>
</template>

<script>
import {
    store_detail,
    DistributionBanner,
    add_collect,
    order_form
} from "@/api/api";

export default {
    name: "hotel-detail-banner-link",
    components: {},
    data() {
        return {};
    },
    created() {
        // 获取路由参数
        var routePara = {
            store_id: this.$route.query.store_id,
            begin: this.$route.query.begin,
            finish: this.$route.query.finish
        };
    },
    computed: {},
    mounted() {},
    watch: {},
    methods: {}
};
</script>

<style lang="less" scoped>
.list {
    background: #eff1f0;
    padding: 8px 0 12px ;
    li {
        width: 50%;
        padding: 0 1.066% 0 4.0%;
        margin-bottom: 1.066%;
        div{
            width: 100%;
            background: tan;
            height: 110px;
        }
        &:nth-child(odd) {
            float: left;
            padding: 0 1.066% 0 4.0%;
        }
        &:nth-child(even) {
            float: right;
            padding: 0 4.0% 0 1.066%; 
        }
    }
    &:after{
        content: "";
        display: table;
        clear: both;
    }
    
}
</style>

