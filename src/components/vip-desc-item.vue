<template>
    <div class="vip-desc-item">
        <!-- 开卡权益 -->
        <div class="card-right">

        </div>
        <!-- 会员权益 -->
        <div class="vip-right">

        </div>
    </div>
</template>

<script>
import { store_list } from "@/api/api";
export default {
    name: "vip-desc-item",
    props: [],
    watch: {},
    data() {
        return {
            isShow: false,
            list: [
                {
                    type: 0,
                    imgSrc: require("../assets/images/img/room.png"),
                    name: "秋果酒店机场店",
                    info:
                        "秋果都市里的世外桃源,秋果都市里的世外桃源秋果都市里的世外桃源秋果都市里的世外桃源。",
                    location: "北京市－朝阳区 距离您2.5km",
                    price: 686
                }
            ]
        };
    },
    created() {},
    mounted() {},
    methods: {}
};
</script>

<style lang="less" scoped>
</style>