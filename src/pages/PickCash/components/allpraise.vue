<template>
	<div>
        <!-- praise_content str -->
        <div class="praise_content bd-f9" v-for='(item,index) in praiseArr' @click="isShow(index)">
            <div class="praise_lists">
                <div class="praise_lists_msg pr">
                    <p class="praise_title col-666 fs12">
                        <span class="fs15 col-333">提现</span>
                    </p>
                    <p class="fs12 col-666 lh19">{{item.audit_time}}</p>
                    <p class="praise_make_money pa fs12 col-666">
                        <span>赚</span>
                        <span class="col-yellow fw600">{{item.money}}</span>
                    </p>
                    <img class="pa" src="../../../assets/images/arrows/ic_pay_arrow.png">
                </div>
                <p class="fs13 lh23 ma-top5" v-if="index == activeIndex">
                    <span v-if='item.status == -1' class="col-green">未通过</span>
                    <span v-if='item.status == 0' class="col-green">待审</span>
                    <span v-if='item.status == 1' class="col-green">打款中</span>
                    <span v-if='item.status == 2' class="col-green">打款成功</span>
                    <span v-if='item.status == 3' class="col-green">打款失败</span>
                    &nbsp;&nbsp;
                    <span>{{item.audit_note}}</span>
                </p>
            </div>
        </div>
        <!-- praise_content end -->
        <!-- not have data str -->
        <notHaveData v-if='this.praiseArr.length == 0'></notHaveData>
        <!-- not have data end -->
	</div>
</template>
<script>
    import {withdrawMoney} from '../../../api/api.js';
    import notHaveData from './notHaveData.vue';
    export default {
        name: "praise",
        components: {
            notHaveData
        },
        data(){
            return {
                praiseArr:[],   //all data
                activeIndex:1
            }
        },
        computed: {
            
        },
        methods: {
            isShow(_index){
                this.activeIndex = _index;
                console.log(_index);
            }
        },
        mounted() {
            //all data
            var param = {
                cpid:1
            };
            this.$http({
                url:withdrawMoney,
                method:'POST',
                data:param
            }).then((res)=>{
                console.log(res);
                if(res.data.status == 1){
                    this.praiseArr = res.data.data;
                }else{

                }
            });
        }
    };
</script>
<style lang="less">
    @import '../../../assets/css/reset.less';
    @import '../../Praise/praise.less';
</style>