<template>
    <div class="hotel-detail-banner-link-page m-position-ab">
        <ul class="list" v-if="list.length>0">
            <li v-for="(item,index) in list" :key="index">
                <div :style="{backgroundImage:'url('+ item +')'}"></div>
            </li>
        </ul>
        <div v-show="loading">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">数据加载中</p>
            </div>
        </div>
    </div>
</template>

<script>
import { store_detail } from "@/api/api";

export default {
    name: "hotel-detail-banner-link",
    components: {},
    data() {
        return {
            store_id: "",
            loading: true,
            isHasData: false,
            list: ""
        };
    },
    created() {
        // 获取路由参数
        let store_id = this.$route.query.store_id;
        this.store_id = store_id;
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            this.$http({
                method: "POST",
                url: store_detail,
                data: { store_id: this.store_id }
            }).then(res => {
                this.loading = false;
                if (res.data.status == 1) {
                    // 房间img list
                    this.list = res.data.data.data_store.img_logo;
                } else {
                    this.isHasData = true;
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
.hotel-detail-banner-link-page {
    overflow: auto;
}
.list {
    background: #eff1f0;
    padding: 8px 0 8px;
    li {
        width: 50%;
        padding: 0 1.066% 0 4%;
        margin-bottom: 1.066%;
        div {
            width: 100%;
            height: 110px;
            background-repeat: no-repeat;
            background-position:center center;
            background-size:100% 100%;   
        }
        &:nth-child(odd) {
            float: left;
            padding: 0 1.066% 0 4%;
        }
        &:nth-child(even) {
            float: right;
            padding: 0 4% 0 1.066%;
        }
    }
    &:after {
        content: "";
        display: table;
        clear: both;
    }
}
</style>

