<template>
    <div>
        <div class="shopOrderLists"> 
            <!-- nav str -->
            <ul class="shopOrderNav">
                <li v-for="(item,index) in shopOrderArr" @click='tabsActive(item.b,index)'>
                    <span :class="{shopOrderNavActive:index == classIndex}">{{item.a}}</span>
                </li>
            </ul>
            <!-- nav end -->
            <!-- lists str -->
            <div class="shopLists">
                <allPraise :is='showView' keep-alive></allPraise>
            </div>
            <!-- lists end -->
        </div>
    </div>
</template>
<script>
    import shopOrderAll from './components/shopOrderAll.vue';
    import stayPayment from './components/stayPayment.vue';
    import stayTakeGoods from './components/stayTakeGoods.vue';
    import offStocks from './components/offStocks.vue';
    import refundMoney from './components/refundMoney.vue';
    export default {
        name: "shopOrder",
        components: {
            shopOrderAll,
            stayPayment,
            stayTakeGoods,
            offStocks,
            refundMoney
        },
        data() {  
            return {
                shopOrderArr:[{
                    a:'全部',
                    b:'shopOrderAll'
                },{
                    a:'待付款',
                    b:'stayPayment'
                },{
                    a:'待收货',
                    b:'stayTakeGoods'
                },{
                    a:'已完成',
                    b:'offStocks'
                },{
                    a:'退款',
                    b:'refundMoney'
                }],
                showView:'shopOrderAll',
                classIndex:0,
            }
        },
        methods: {
            //tab切换
            tabsActive(active_text,activeIndex){
                this.showView = active_text;    //点击的谁
                this.classIndex = activeIndex;  //点击的index
            }
        },
        mounted() {

        }
    }
</script>
<style lang='less' scoped>
    @import './shopOrder.less';
</style>
