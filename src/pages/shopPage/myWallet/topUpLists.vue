<template>
    <div>
        <scroller :on-refresh="refresh" :on-infinite="infinite" v-if="this.noShopLists == false">
            <ul class="topUpLists">
                <li v-for='item in topUopMoneyArr'>
                    <router-link :to='{path:"billDetails",query:{topUpId:item.id}}'>
                        <p>余额充值</p>
                        <p>{{item.add_time}}</p>
                        <span>＋{{item.amount}}</span>
                    </router-link>
                </li>
            </ul>
        </scroller>
        <!-- toast(loading=>weui)  str-->
        <div v-show="loading">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">{{loadingTxt}}</p>
            </div>
        </div> 
        <!-- toast(loading=>weui)  end -->
        <!-- toast（delay=>z）str -->
        <div v-show="delayToast">
            <div class="z-mask-transparent"></div>
            <div class="z-toast">
                <i class="z-toast-icon"></i>
                <p class="z-toast-content">{{delayToastTxt}}</p>
            </div>
        </div>
        <!-- toast（delay=>z）end -->
        <div class="noShopLists" v-show="noShopLists">
            <img src="../../../assets/images/shop/dingdan_404.png" alt="">
            <p>暂无商品</p>
        </div> 
    </div>
</template>
<script>
    import {topUpLists} from '../../../api/api.js';
    export default {
        name: "topUpLists",
        components: {

        },
        data() {
            return {
                topUopMoneyArr:[],
                pageIndex:0,                    //当前页
                loading:false,                  //loading
                loadingTxt:"",                  //
                delayToast:false,               //
                delayToastTxt:"",               //
                noShopLists:false
            }
        },
        computed: {
            
        },
        methods: {
            refresh (done) {                     //刷新时将数组清空有数据在赋值
                this.topUopMoneyArr.length = 0;     
                this.pageIndex = 1;
                setTimeout(() => {
                    this.getTopUpList(this.pageIndex);
                    done();
                }, 1500);
            },
            infinite (done) {                    //加载
                this.pageIndex++;
                setTimeout(() => {
                    this.getTopUpList(this.pageIndex);
                    done(true);
                }, 1500);
            },
            getTopUpList(pageIndex){             //获取充值列表
                this.$http({
                    url:topUpLists,
                    method:'POST',
                    data:{
                        page:pageIndex,
                        pageSize:10
                    }
                }).then(res=>{
                    if(res.data.data.length != 0){
                        this.noShopLists = false;
                        for(let i in res.data.data){
                            this.topUopMoneyArr.push(res.data.data[i]);
                        }
                    }else if(res.data.data.length == 0 && this.pageIndex == 1){
                        this.noShopLists = true;
                        this.delayToast = true;
                        this.delayToastTxt = res.data.msg;
                        setTimeout(()=>{
                            this.delayToast = false;
                        },1500);
                    }else{
                        this.delayToast = true;
                        this.delayToastTxt = res.data.msg;
                        setTimeout(()=>{
                            this.delayToast = false;
                        },1500);
                    }
                }).catch(res=>{
                    this.delayToast = true;
                    this.delayToastTxt = res.data.msg;
                    setTimeout(()=>{
                        this.delayToast = false;
                    },1500);
                });
            }
        },
        mounted() {
            
        }
    }
</script>
<style lang='less' scoped>
    @import './topUpLists.less';
</style>