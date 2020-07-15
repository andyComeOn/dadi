<template>
    <div>
        <div class="coupon_head">
            <van-tabs color="#30B097" title-active-color="#30B097" title-inactive-color="#666" v-model="coupon_active" @click="tabBtn">
                <van-tab v-for="(item,index) in couponTitleArr" :key="index" :title="item.title + item.num" :name="index"></van-tab>
            </van-tabs>
        </div>
        <div class="coupon_box_mar" v-if="this.couponArr.length != 0">
            <template v-if="couponType == 0">
                <div class="coupon_box" v-for="(item,index) in couponArr" :key="index">
                    <i v-if="item.coupon_range == 0" class="coupon_sign coupon_sign_com">通用</i>
                    <i v-if="item.coupon_range == 1" class="coupon_sign coupon_sign_store">酒店</i>
                    <i v-if="item.coupon_range == 2" class="coupon_sign coupon_sign_shop">商城</i>
                    <h3>{{item.name}}</h3>
                    <p class="indate_time">有效期:{{item.validity_begin_time}}-{{item.validity_end_time}}</p>
                    <p class="coupon_rule">
                        <span @click="useRuleBtn(item)">使用规则</span>
                    </p>
                    <div class="at_once_use" @click="atOnceUseBtn(item.coupon_range)">立即使用</div>
                    <dl v-if="item.coupon_type == 1 || item.coupon_type == 2">
                        <dt v-if="item.coupon_type == 1"><i>&yen;</i>{{item.amount}}</dt>
                        <dt v-if="item.coupon_type == 2">{{item.discount}}<i>折</i></dt>
                        <dd v-if="item.coupon_type == 1">代金券</dd>
                        <dd v-if="item.coupon_type == 2">折扣券</dd>
                    </dl>
                    <p v-if="item.coupon_type == 3" class="free_room">免房券</p>
                </div>
            </template>
            <template v-if="couponType == 1 || couponType == 2">
                <div class="coupon_box_ccc" v-for="(item,index) in couponArr" :key="index">
                    <i v-if="item.coupon_range == 0" class="coupon_sign coupon_sign_ccc">通用</i>
                    <i v-if="item.coupon_range == 1" class="coupon_sign coupon_sign_ccc">酒店</i>
                    <i v-if="item.coupon_range == 2" class="coupon_sign coupon_sign_ccc">商城</i>
                    <h3>{{item.name}}</h3>
                    <p class="indate_time">有效期:{{item.validity_begin_time}}-{{item.validity_end_time}}</p>
                    <p class="coupon_rule">
                        <span @click="useRuleBtn(item)">使用规则</span>
                    </p>
                    <div v-if="couponType == 1" class="have_use"></div>
                    <div v-if="couponType == 2" class="have_expired"></div>
                    <dl v-if="item.coupon_type == 1 || item.coupon_type == 2">
                        <dt v-if="item.coupon_type == 1"><i>&yen;</i>{{item.amount}}</dt>
                        <dt v-if="item.coupon_type == 2">{{item.discount}}<i>折</i></dt>
                        <dd v-if="item.coupon_type == 1">代金券</dd>
                        <dd v-if="item.coupon_type == 2">折扣券</dd>
                    </dl>
                    <p v-if="item.coupon_type == 3" class="free_room">免房券</p>
                </div>
            </template>
            <div class="wrapper" v-if="couponBoxType == true" @click="couponBoxType = false">
                <div class="block">
                    <div class="coupon_shade">
                        <div class="coupon_over">
                            <img src="../../assets/images/coupon/popup_close.png" />
                            <template v-if="couponType == 0">
                                <h3 class="h3_yellow" v-if="couponMsg.coupon_type == 1"><i>&yen;</i>{{couponMsg.amount}}</h3>
                                <h3 class="h3_yellow" v-if="couponMsg.coupon_type == 2">{{couponMsg.discount}}<i>折</i></h3>
                                <h3 class="h3_mf" v-if="couponMsg.coupon_type == 3">免房券</h3>
                            </template>
                            <template v-if="couponType == 1 || couponType == 2">
                                <h3 class="h3_ccc" v-if="couponMsg.coupon_type == 1"><i>&yen;</i>{{couponMsg.amount}}</h3>
                                <h3 class="h3_ccc" v-if="couponMsg.coupon_type == 2">{{couponMsg.discount}}<i>折</i></h3>
                                <h3 class="h3_ccc" v-if="couponMsg.coupon_type == 3">免房券</h3>
                            </template>
                            <p class="copon_name" v-if="couponMsg.coupon_type != 3">{{couponMsg.name}}</p>
                            <p class="use_condition"><i>使用条件:</i>{{couponMsg.use_str}}</p>
                            <p class="coupon_indate"><i>有&nbsp;&nbsp;效&nbsp;&nbsp;期:</i>{{couponMsg.validity_begin_time}}-{{couponMsg.validity_end_time}}</p>
                            <template>
                                <div class="coupon_hint" v-if="couponType == 0">
                                    <h4 class="h4_333">使用说明:</h4>
                                    <p>{{couponMsg.remark}}</p>
                                    <!-- <template v-if="couponMsg.coupon_range == 1 && couponMsg.stores != ''">
                                        <h4 class="h4_333">指定门店及房型:</h4>
                                        <p v-html="couponMsg.stores"></p>
                                    </template> -->
                                </div>
                                <div class="coupon_hint" v-if="couponType == 1 || couponType == 2">
                                    <h4 class="h4_999">使用说明:</h4>
                                    <p>{{couponMsg.remark}}</p>
                                    <!-- <template v-if="couponMsg.coupon_range == 1 && couponMsg.stores != ''">
                                        <h4 class="h4_999">指定门店及房型:</h4>
                                        <p v-html="couponMsg.stores"></p>
                                    </template> -->
                                </div>
                            </template>
                            <div class="at_once_use" v-if="couponType == 0">
                                <div class="at_once_use_btn" @click="atOnceUseBtn(couponMsg.coupon_range)">立即使用</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="no-coupon">
            <img src="../../assets/images/404/404-no-coupon.png" alt="">
            <p>暂无优惠券</p>
        </div>
        <!-- loading str -->
		<div v-show="loading">
			<div class="weui-mask_transparent"></div>
			<div class="weui-toast">
				<i class="weui-loading weui-icon_toast"></i>
				<p class="weui-toast__content">数据加载中</p>
			</div>
		</div>
    	<!-- loading end -->
    </div>
</template>
<script>
import { Tab, Tabs,Overlay, Toast } from 'vant';
import { coupon_list } from '@/api/api'
export default {
    data() {
        return {
            loading:false,
            couponBoxType:false,
            coupon_active:0,
            couponTitleArr:[{
                title:"未使用",
                num:""
            },{
                title:"已使用",
                num:""
            },{
                title:"已过期",
                num:""
            }],
            couponArr:[],
            couponType:"",
            couponDetails:"",
            couponMsg:{}
        };
    },
    methods: {
        useRuleBtn(coupon_msg){
            this.couponMsg = coupon_msg;
            this.couponMsg.stores = coupon_msg.store_product_coupon.join("；<br />");
            this.couponBoxType = true;
        },
        couponLists(_type){
            this.loading = true;
            this.$http({
                method: "POST",
                url: coupon_list,
                data: {
                    type:_type
                }
            }).then(res => {
                this.loading = false;
                if (res.data.status == 1) {
                    if(res.data.length == 0){
                        this.couponArr.length = 0;
                    }else{
                        if(_type == 0){
                            this.couponTitleArr[0].num = "(" + res.data.data.length + ")";
                        }
                        this.couponArr = res.data.data;
                    }
                } else {
                    Toast(res.data.msg);
                }
            });
        },
        tabBtn(name,title){
            this.couponType = name;
            this.couponLists(name);
        },
        atOnceUseBtn(coupon_label){
            if(coupon_label == 0 || coupon_label == 1){
                this.$router.push({path:'/'});
            }else{
                this.$router.push({path:'/shoppIng'});
            }
        }
    },
    mounted() {
        this.couponLists(0);    //未使用优惠券列表
    }
};
</script>
<style lang="less" scoped>
    @import './coupon.less';
</style>