<template>
    <div>
        <!-- 收货地址列表 str -->
        <div class="addressLists" v-if="addressListsBox == true">
            <ul>
                <slip-del v-for="item in addressListsArr" del-text="删除" @slip-open="slipOpen(item.id)" @del-click="delItem(item.id)">
                    <li @click="jumpPayOrder(item.id)">
                        <h3>
                            <span>{{item.name}}</span>
                            <span>{{item.mobile}}</span>
                            <span v-if="item.is_default == 1">默认</span>
                        </h3>
                        <p>
                            <span>{{item.province + item.city + item.area + item.address_detail}}</span>
                        </p>
                        <img src="../../../assets/images/shop/dizhi_bianji.png" alt="" @click.stop="editBtn(item.id)">
                    </li>
                </slip-del>
            </ul>
            <div class="newAddress" @click="newAddressBtn()">
                <p>+新建收货地址</p>
            </div>
        </div>
        <!-- 收货地址列表 end -->
        <!-- 收货地址无 str -->
        <div class="addressNot" v-if="addressNotBox == true">
            <div class="notAddress">
                <img src="../../../assets/images/shop/shouhuodizhi_404.png" alt="">
                <p>您还没有收货地址</p>
            </div>
            <div class="newAddress" @click="newAddressBtn()">
                <p>+新建收货地址</p>
            </div>
        </div>
        <!-- 收货地址无 end -->
        <!-- toast(loading=>weui) -->
        <div v-show="loading">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">{{loadingTxt}}</p>
            </div>
        </div>
        <!-- toast（delay=>z） -->
        <div v-show="delayToast">
            <div class="z-mask-transparent"></div>
            <div class="z-toast">
                <i class="z-toast-icon"></i>
                <p class="z-toast-content">{{delayToastTxt}}</p>
            </div>
        </div>
    </div>
</template>
<style lang='less' scoped>
    @import './editAddress.less';
</style>
<script>
    import SlipDel from "vue-slip-delete";
    import {NewAddress,getUserGoodsAddress,delAddress} from '../../../api/api.js';
import { setTimeout } from 'timers';
    export default {
        name: "editAddress",
        components: {
            SlipDel
        },
        data() {
            return {
                addressNotBox:true,             //404页面
                addressListsArr:"",             //用户收货地址数据
                addressListsBox:"",             //用户地址列表显示隐藏
                loading: false,              // toast控制开关
                loadingTxt: "数据加载中",    // toast中文案
                delayToast: false,          // tips开关
                delayToastTxt: "",          // tips文案
            }
        },
        computed: {
            
        },
        methods: {
            newAddressBtn(){
                this.$router.push({
                    path:'editAddress',
                    query:{
                        shopId:this.$route.query.shopId,
                        payShopNum:this.$route.query.payShopNum,
                        deliveryWay:this.$route.query.deliveryWay,
                        spec_id:this.$route.query.spec_id
                    }
                })
            },
            delItem(address_Id){
                this.$http({
                    url:delAddress,
                    method:"POST",
                    data:{
                        id:address_Id
                    }
                }).then(res=>{
                    if(res.data.status == 1){
                        this.delayToast = true;
                        this.delayToastTxt = "删除成功";
                        setTimeout(()=>{
                            this.delayToast = false;
                            this.getUserAddress();              //获取用户收货地址
                        },1500);
                    }else{
                        this.delayToast = true;
                        this.delayToastTxt = res.data.msg;
                        setTimeout(()=>{
                            this.delayToast = false;
                        },1500);
                    }
                }).catch(res=>{});
            },
            slipOpen(vm) {},            // 滑动打开后的回调
            getUserAddress(){           //获取用户收货地址列表
                this.loading = true;        //loading
                this.$http({
                    url:getUserGoodsAddress,
                    method:"POST",
                    data:{}
                }).then((res)=>{
                    this.loading = false;       //loading
                    if(res.data.status == 1){
                        this.addressListsArr = res.data.data;        //用户收货地址
                        if(res.data.data.length != 0){
                            this.addressNotBox = false;             //无地址
                            this.editAddressBox = false;            //编辑地址
                            this.addressListsBox = true;            //用户收货地址列表
                        }else{
                            this.addressNotBox = true;              //无地址
                            this.editAddressBox = false;            //编辑地址
                            this.addressListsBox = false;           //用户收货地址列表
                        }
                    }else{
                        this.delayToast = true;
                        this.delayToastTxt = res.data.msg;
                        setTimeout(()=>{
                            this.delayToast = false;
                        },false);
                    }
                });
            },
            jumpPayOrder(addressId){             //跳转到确定订单页面 
                this.$router.push({path:'payOrder',query:{shopId:this.$route.query.shopId,payShopNum:this.$route.query.payShopNum,deliveryWay:this.$route.query.deliveryWay,spec_id:this.$route.query.spec_id,addressId:addressId}})
            },
            editBtn(addressId){
                this.$router.push({path:'editAddress',query:{shopId:this.$route.query.shopId,payShopNum:this.$route.query.payShopNum,deliveryWay:this.$route.query.deliveryWay,spec_id:this.$route.query.spec_id,addressId:addressId}})
            }
        },
        mounted() {
            this.getUserAddress();              //获取用户收货地址
        }
    }
</script>

