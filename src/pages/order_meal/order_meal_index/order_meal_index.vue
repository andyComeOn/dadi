<template>
    <div class="bg_ed">
        <div class="order_meal_banner bg_fff">
            <img class="order_meal_banner_bg" src="../../../assets/images/order_meal/banner.jpg" />
            <div class="order_meal_banner_img01">
                <img class="" src="../../../assets/images/order_meal/banner.png" />
            </div>
        </div>
        <div class="choose_store bg_fff">
            <i></i>
            <span>请选择用餐酒店</span>
        </div>
        <div class="choose_store_input_box bg_fff">
            <div class="choose_store_input">
                <span>秋果酒店（北京三元桥燕莎店）秋果酒店（北京三元桥燕莎店）秋果酒店（北京三元桥燕莎店）秋果酒店（北京三元桥燕莎店）</span>
                <i></i>
            </div>
        </div>
        <div class="hava_meal">
            <h3>
                <span>请选择用餐方式</span>
            </h3>
            <van-tabs @click="onClick" color="#30B097" title-active-color="#30B097" title-inactive-color="#333333" background="#EDEDED">
                <van-tab title="堂食">内容 1</van-tab>
                <van-tab title="房间用餐">内容 2</van-tab>
            </van-tabs>
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item>1</van-swipe-item>
                <van-swipe-item>2</van-swipe-item>
                <van-swipe-item>3</van-swipe-item>
                <van-swipe-item>4</van-swipe-item>
            </van-swipe>
        </div>
        <van-popup v-model="showPicker" position="bottom">
            <van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm"/>
        </van-popup>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    }
}
</script>
<style lang="less" scoped>
    @import './order_meal_index.less';
</style>