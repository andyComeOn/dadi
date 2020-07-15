<template>
    <div>
        <img class="past_due_img" src="../../../assets/images/active/staff_index/past_due_img.png" />
        <p class="past_due_hint">活动已过期</p>
        <div class="past_due_btn_box">
            <router-link :to="{path:'/'}">
                <div class="past_due_btn">返回首页</div>
            </router-link>
        </div>
    </div>
</template>
<script>
    import { staffIndexApi,createOrderApi } from '../../../api/active.js';
    import { Toast } from 'vant';
    export default {
        data(){
            return {
                pastDue:"",
                giftBagArr:[],
                loading:false,
                loadingTxt:"数据加载中",
                infoArr:[],
                hintType:this.$route.query.type
            }
        },
        methods: {
            reserveBtn(){
                for(let i=0;i<this.giftBagArr.length;i++){
                    if(this.giftBagArr[i].staff_num != 0){
                        let obj = {};
                        obj.gift_id = this.giftBagArr[i].id;
                        obj.num = this.giftBagArr[i].staff_num;
                        this.infoArr.push(obj);
                    }
                }
                if(this.infoArr.length != 0){
                    this.loading = true;
                    this.$http({
                        url: createOrderApi,
                        method: 'POST',
                        data:{
                            employee_id:this.$route.query.employee_id,
                            info:this.infoArr,
                            type:!this.$route.query.type ? 2 : this.$route.query.type
                        }
                    }).then(res => {
                        this.loading = false;
                        if(res.data.status == 1){
                            let _order_id = res.data.data;
                            this.$router.push({path:'/payStaff',query:{order_id:_order_id}})
                        }else{
                            Toast(res.data.msg);
                        }
                    });
                }else{
                    Toast('请选择礼包');
                }
            },
            minusBtn(_id){
                for(let i = 0;i<this.giftBagArr.length;i++){
                    if(this.giftBagArr[i].id == _id){
                        if(this.giftBagArr[i].staff_num == 0){
                            Toast('最小值为0');
                            return false;
                        }else{
                            this.giftBagArr[i].staff_num --
                        }
                    }
                }
            },
            pluSignBtn(_id){
                for(let i = 0;i<this.giftBagArr.length;i++){
                    if(this.giftBagArr[i].id == _id){
                        this.giftBagArr[i].staff_num ++ 
                    }
                }
            }
        },
        mounted() {
            this.loading = true;
            this.$http({
                url: staffIndexApi,
                method: "POST",
                data: {
                    type:this.$route.query.type
                }
            }).then(res => {
                this.loading = false;
                if(res.data.status == 1){
                    let _giftBagArr = res.data.data.list;
                    this.pastDue = res.data.data.show_status;
                    for(let i=0;i<_giftBagArr.length;i++){
                        _giftBagArr[i].staff_num = 0;
                    }
                    this.giftBagArr = _giftBagArr;
                }else{
                    Toast(res.data.msg);
                }
            });
        },
    }
</script>
<style lang="less" scoped>
    @import './staff_index.less';
    .van-swipe__indicators{
        bottom:120px!important;
    }
</style>