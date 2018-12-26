<template>
    <div>
        <ul class="topUpLists">
            <li v-for='item in topUopMoneyArr'>
                <router-link :to='{path:"billDetails",query:{topUpId:item.id}}'>
                    <p>余额充值</p>
                    <p>{{item.add_time}}</p>
                    <span>＋{{item.amount}}</span>
                </router-link>
            </li>
        </ul>
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
            }
        },
        computed: {
            
        },
        methods: {

        },
        mounted() {
            //获取充值列表
            this.$http({
                url:topUpLists,
                method:'POST',
                data:{

                }
            }).then(res=>{
                if(res.data.status == 1){
                    console.log(res);
                    this.topUopMoneyArr = res.data.data;
                }
            });
        }
    }
</script>
<style lang='less' scoped>
    @import './topUpLists.less';
</style>