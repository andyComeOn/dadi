<template>
	<div class="pad-left15 pad-right15" style="background: #fff;">
        <div class="help_lists pr" v-for="(item, index) in help_lists_arr" :key="index">
            <img class="pa" :src="item.avatar" />
            <p class="fs14 col-333 lh19">{{item.nickname}}</p>
            <p class="fs12 col-666 lh18">{{item.stair_sum}}个成员</p>
            <div class="fs12 col-666 pa">帮赚<span class="fw600 col-yellow">{{item.amount}}</span></div>
        </div>
        <!-- noLevel -->
        <noLevel v-if='this.help_lists_arr.length == 0'></noLevel>
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
    import { helpFriend } from '@/api/api.js';
    import noLevel from "./noLevel.vue";
    export default {
        name: "helpFriend",
        components: {
            noLevel
        },
        data(){
            return{
                help_lists_arr:[],      //所有数据
                oneLevel_num:'',        //一级
                twoLevel_num:'',        //二级
                toash_show:true         //loading
            }
        },
        computed: {
            
        },
        methods: {
            
        },
        mounted() {
            var param = {
                // cpid:1
                type:2
            };
            this.$http({
                method:'POST',
                url:helpFriend,
                data:param,
            }).then((res)=>{
                console.log(res.data);
                if(res.data.status == 1){
                    this.toash_show = false;
                    this.help_lists_arr = res.data.data.second;
                    this.oneLevel_num = res.data.data.stair_count;
                    this.twoLevel_num = res.data.data.second_count;
                    this.$emit('listenToChildEvent',res.data.data.stair_count,res.data.data.second_count);
                }else{
                    this.toash_show = false;
                }
            });
        }
    };
</script>
<style lang="less">
    @import '../../../assets/css/reset.less';
    @import '../helpFriend.less';
</style>