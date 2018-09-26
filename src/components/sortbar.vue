<template>
    <div class="sortbar-container">
        <ul class="sortbar-wrapper">
            <li class="normal" @click="sort('sort', 'SORT_ASC', 0)" :class="{active:isActive===0}">默认</li>
            <li class="price" @click="sort('price', 'SORT_DESC', 1)" :class="{active:isActive===1}">
                价格
                <img :src="imgSrc" alt="">
            </li>
            <li class="near" @click="sort('distance','SORT_ASC',2)" :class="{active:isActive===2}">距离最近</li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isActive: 0,
            imgSrc: "",
            imgSrcDefault: require("../assets/images/arrows/ic-price-up.png"),
            imgSrcActiveUp: require("../assets/images/arrows/ic-price-up-active.png"),
            imgSrcActiveDown: require("../assets/images/arrows/ic-price-down-active.png"),
            flag: true
        };
    },
    mounted() {
        this.imgSrc = this.imgSrcDefault;
    },
    methods: {
        // 排序筛选
        sort(px_rule, priceSort, ind) {
            this.isActive = ind;
            if (ind == 1) {
                if (this.flag == true) {
                    this.flag = false;
                    this.imgSrc = this.imgSrcActiveDown;
                    this.$emit("sortbarEmit", px_rule, "SORT_DESC");
                } else {
                    this.flag = true;
                    this.imgSrc = this.imgSrcActiveUp;
                    this.$emit("sortbarEmit", px_rule, "SORT_ASC");
                }
            } else {
                this.imgSrc = this.imgSrcDefault;
                this.$emit("sortbarEmit", px_rule, "SORT_ASC");
            }
        }
    }
};
</script>
<style lang="less" scoped>
.sortbar-container {
    height: 44px;
    padding: 10px 0;
    background: #fff;
    .sortbar-wrapper {
        li {
            width: 33.33%;
            float: left;
            line-height: 24px;
            color: #666666;
            font-size: 14px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            &.active {
                color: #30b097;
                font-size: 15px;
                font-weight: 500;
            }
            img {
                display: block;
                width: 6.5px;
                height: 13px;
                margin-left: 4px;
            }
        }
    }
}
</style>