<template>
	<div>
        <!-- praise_content str -->
        <div class="praise_content bd-f9" v-for='(item,index) in praiseArr' @click="isShow(index)">
            <div class="praise_lists">
                <div class="praise_lists_msg pr">
                    <p class="praise_title col-666 fs12">
                        <span class="fs15 col-333">{{item.nickname}}</span>
                        <span v-if="item.level == 1">一级</span>
                        <span v-if="item.level == 2">二级</span>
                    </p>
                    <p class="fs12 col-666 lh19">{{item.sure_time}}</p>
                    <p class="praise_make_money pa fs12 col-666">
                        <span>赚</span>
                        <span class="col-yellow fw600">{{item.amount}}</span>
                    </p>
                    <img v-if="index != activeIndex" class="pa" src="../../../assets/images/arrows/ic_pay_arrow_bottom.png">
                    <img v-else class="pa" src="../../../assets/images/arrows/ic_pay_arrow.png">
                </div>
                <p class="fs13 lh23 ma-top5" v-if="index == activeIndex">
                    <span class="">订单编号:{{item.request_no}}</span>
                    <span v-if='item.status == 0' class="fr col-green">待付款</span>
                    <span v-if='item.status == 1' class="fr col-green">订单待确认</span>
                    <span v-if='item.status == 2' class="fr col-green">待入住</span>
                    <span v-if='item.status == 3' class="fr col-green">入住中</span>
                    <span v-if='item.status == 4' class="fr col-green">订单完成</span>
                    <span v-if='item.status == 5' class="fr col-green">订单关闭</span>
                </p>
            </div>
        </div>
        <!-- praise_content end -->
        <!-- not have data str -->
        <notHaveData v-if='this.praiseArr.length == 0'></notHaveData>
        <!-- not have data end -->
        <!-- toast提示 -->
        <div id="orderListToast" v-if='toash_show == true'>
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">数据加载中</p>
            </div>
        </div>
	</div>
</template>
<script>
    import { awardLists } from '../../../api/api.js';
    import notHaveData from './notHaveData.vue';
    export default {
        name: "praise",
        components: {
            notHaveData
        },
        data(){
            return {
                praiseArr:[],   //all data
                activeIndex:1,
                toash_show:true,    //loading
            }
        },
        computed: {
            
        },
        methods: {
            isShow(_index){
                this.activeIndex = _index;
            }
        },
        mounted() {
            //all data
            var param = {
                // cpid:1
            };
            this.$http({
                url:awardLists,
                method:'POST',
                data:param
            }).then((res)=>{
                console.log(res);
                if(res.data.status == 1){
                    this.toash_show = false;
                    this.praiseArr = res.data.data;
                }else{
                    this.toash_show = false;
                }
            });
        }
    };
</script>
<style lang="less">
    @import '../../../assets/css/reset.less';
    @import '../praise.less';
</style>