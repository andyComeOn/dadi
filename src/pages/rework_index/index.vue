<template>
    <div class="rework_room">
        <van-swipe :autoplay="3000">
            <van-swipe-item>
                <img class="reserve_banner" src="../../assets/images/rework_room/reserve_banner2.jpg" />
            </van-swipe-item>
            <van-swipe-item>
                <img class="reserve_banner" src="../../assets/images/rework_room/reserve_banner1.jpg" />
            </van-swipe-item>
        </van-swipe>
        <van-tabs v-model="active_tabs" @change="activeTabs" color="#30B097">
            <van-tab :name="1" title="北京">
                <ul class="store_box">
                    <li v-for="(item,index) in this.store_arr" :key="index">
                        <div class="store_top">
                            <p>{{item.store_name}}</p>
                            <div class="price">
                                <span>折后价:<i>&yen;{{item.price}}</i></span>
                                <span class="reserve_btn" @click="reserveBtn(item.id,item.type)">预订</span>
                            </div>
                        </div>
                        <div class="store_bottom">
                            <span>{{item.room_name}}</span>
                            <!-- <span>{{item.msg}}</span> -->
                            <span><i>原价:&yen;{{item.amount}}</i>享{{item.discount}}折</span>
                        </div>
                    </li>
                </ul>
            </van-tab>
            <van-tab name="2" title="杭州">
                <ul class="store_box">
                    <li v-for="(item,index) in this.store_arr" :key="index">
                        <div class="store_top">
                            <p>{{item.store_name}}</p>
                            <div class="price">
                                <span>折后价:<i>&yen;{{item.price}}</i></span>
                                <span class="reserve_btn" @click="reserveBtn(item.id,item.type)">预订</span>
                            </div>
                        </div>
                        <div class="store_bottom">
                            <span>{{item.room_name}}</span>
                            <!-- <span>{{item.msg}}</span> -->
                            <span><i>原价:&yen;{{item.amount}}</i>享{{item.discount}}折</span>
                        </div>
                    </li>
                </ul>
            </van-tab>
            <van-tab name="3" title="成都">
                <ul class="store_box">
                    <li v-for="(item,index) in this.store_arr" :key="index">
                        <div class="store_top">
                            <p>{{item.store_name}}</p>
                            <div class="price">
                                <span>折后价:<i>&yen;{{item.price}}</i></span>
                                <span class="reserve_btn" @click="reserveBtn(item.id,item.type)">预订</span>
                            </div>
                        </div>
                        <div class="store_bottom">
                            <span>{{item.room_name}}</span>
                            <!-- <span>{{item.msg}}</span> -->
                            <span><i>原价:&yen;{{item.amount}}</i>享{{item.discount}}折</span>
                        </div>
                    </li>
                </ul>
            </van-tab>
        </van-tabs>
        <div class="wrapper_box" v-show="show" @click.prevent="show = !show">
            <div class="store_msg_box" @click.stop>
                <div class="store_msg">
                    <h3 class="store_title">门店信息</h3>
                    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                        <van-swipe-item v-for="(item,store_ind) in store_msg.img_logo" :key="store_ind">
                            <img class="swipe_img" :src="item"/>
                        </van-swipe-item>
                    </van-swipe>
                    <div class="store_name">
                        <span>{{store_msg.name}}</span>
                        <a :href="'tel:' + store_msg.inform_tel"></a>
                    </div>
                    <div class="store_address">
                        <span>{{store_msg.address}}</span>
                        <span @click.stop.prevent="openMap">地图</span>
                    </div>
                    <h3 class="room_title">房型信息</h3>
                    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                        <van-swipe-item v-for="(item,room_ind) in room_msg.img_all" :key="room_ind">
                            <img class="swipe_img" :src="item"/>
                        </van-swipe-item>
                    </van-swipe>
                    <div class="item-toast-info">
                        <div class="item-toast-tags">
                            <div class="item-toast-tags-wrapper">
                                <span class="tag">
                                    <span>面积&nbsp;&nbsp;</span>
                                    <span class="ftc333">{{room_msg.area}}</span>
                                </span>
                                <span class="tag">
                                    楼层&nbsp;&nbsp;
                                    <span class="ftc333">{{room_msg.floor}}</span>
                                </span>
                                <span class="tag">
                                    房型&nbsp;&nbsp;
                                    <span class="ftc333">{{room_msg.name}}</span>
                                </span>
                                <span class="tag">
                                    无烟&nbsp;&nbsp;
                                    <span class="ftc333">{{room_msg.cigarette}}</span>
                                </span>
                                <span class="tag">
                                    窗户&nbsp;&nbsp;
                                    <span class="ftc333">{{room_msg.window}}</span>
                                </span>
                                <span class="tag">
                                    宽带&nbsp;&nbsp;
                                    <span class="ftc333">{{room_msg.broadband}}</span>
                                </span>
                                <span class="tag">
                                    床型&nbsp;&nbsp;
                                    <span class="ftc333">{{room_msg.bed_type}}</span>
                                </span>
                                <span class="tag">
                                    加床&nbsp;&nbsp;
                                    <span class="ftc333">{{room_msg.bed}}</span>
                                </span>
                            </div>
                        </div>
                        <ul class="item-toast-labels">
                            <li class="label-item">
                                <div class="label-item-head">媒体科技</div>
                                <div class="label-item-body">{{room_msg.media}}</div>
                            </li>
                            <li class="label-item">
                                <div class="label-item-head">食品饮品</div>
                                <div class="label-item-body">{{room_msg.food}}</div>
                            </li>
                            <li class="label-item">
                                <div class="label-item-head">浴室</div>
                                <div class="label-item-body">{{room_msg.bathroom}}</div>
                            </li>
                            <li class="label-item">
                                <div class="label-item-head">便利设施</div>
                                <div class="label-item-body">{{room_msg.facility}}</div>
                            </li>
                            <li class="label-item">
                                <div class="label-item-head">床品</div>
                                <div class="label-item-body">{{room_msg.bed}}</div>
                            </li>
                            <li class="label-item">
                                <div class="label-item-head">其它</div>
                                <div class="label-item-body">{{room_msg.other}}</div>
                            </li>
                        </ul>
                    </div>
                    <div class="reserve_footer">
                        <p @click.stop="storeReserveBtn">酒店预订</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- toast（delay=>z） -->
        <div v-show="orderDelayToast">
            <div class="z-mask-transparent"></div>
            <div class="z-toast">
                <i class="z-toast-icon"></i>
                <p class="z-toast-content">{{orderDelayToastTxt}}</p>
            </div>
        </div>
        <!-- toast(loading=>weui) -->
        <div v-show="loading">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">{{loadingTxt}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import {wxShare,getStoreLists,getStoreDetail} from '@/api/api.js';
import { Swipe, SwipeItem } from 'vant';
import { getCookie, setCookie } from "@/utils/util";
import { getUrlParam } from "@/utils/util.js";
import wx from "weixin-js-sdk";
import { Lazyload } from 'vant';
export default {
    data(){
        return {
            store_arr:"",
            show:false,
            store_msg:"",
            reserve_day:"",
            room_msg:"",
            store_id:"",
            appId:"",
            timestamp:"",
            nonceStr:"",
            signature:"",
            url:"",
            orderDelayToast:false,
            orderDelayToastTxt:"",
            loadingTxt:"数据加载中",
            loading:false,
            _uid:"",
            active_tabs:0
        }
    },
    methods: {
        storeReserveBtn(){
            let _userUid = this.$route.query.userUid;
            this.$router.push({
                path:'/fillInOrder',
                query:{
                    storeId:this.store_id,
                    reserve_day:this.reserve_day,
                    userUid:_userUid
                }
            })
        },
        reserveBtn(storeId,_type){
            this.loading = true;
            this.$http({
                method: "POST",
                url: getStoreDetail,
                data:{
                    id:storeId
                }
            }).then(res =>{
                this.loading = false;
                if(res.data.status == 1){
                    this.show = true;
                    this.store_id = storeId;
                    if(_type == 1){
                        this.reserve_day = 7;
                    }else{
                        this.reserve_day = 14;
                    }
                    this.store_msg = res.data.data.store;
                    this.room_msg = res.data.data.room;
                }else{
                    Toast(res.data.msg);
                }
            })
        },
        // 获取公众号的配置info
        getAppInfo() {
            //获取 微信分享参数
            var dataObj = {
                url: location.href
            };
            this.$http({
                url: wxShare,
                method: "POST",
                data: dataObj
            }).then(res => {
                if (res.data.status == 1) {
                    this.appId = res.data.data.appid;
                    this.timestamp = res.data.data.timestamp;
                    this.nonceStr = res.data.data.noncestr;
                    this.signature = res.data.data.signature;
                    // this.link_url = location.href.split("#")[0] + "#/reserveIndex?userUid=" + res.data.data.uid;
                    this.link_url = window.location.href + "?userUid=" + res.data.data.uid;
                    // wx分享config配置
                    this.wxConfigMethod(this.link_url,res.data.data.share_img);
                }else{
                    Toast(res.data.msg);
                }
            });
        },
        wxConfigMethod(link_url,shareImg) {
            let that = this;
            // that.url = location.href.split("#")[0] + "?userUid=" + uid;
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: this.appId, // 必填，公众号的唯一标识
                timestamp: this.timestamp, // 必填，生成签名的时间戳
                nonceStr: this.nonceStr, // 必填，生成签名的随机串
                signature: this.signature, // 必填，签名
                jsApiList: [
                    "onMenuShareAppMessage",
                    "onMenuShareTimeline",
                    "getLocation",
                    "openLocation"
                ]
            });
            wx.ready(function() {
                wx.onMenuShareAppMessage({
                    title: "战疫安心住 坐享折上折", // 分享标题
                    desc: "秋果战“疫”安心住,邀您来体验,七大防疫举措,助力返工无忧", // 分享描述
                    link: link_url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: shareImg, // 分享图标
                    type: "", // 分享类型,music、video或link，不填默认为link
                    dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
                    success: function() {
                        // 用户点击了分享后执行的回调函数
                    }
                });
                wx.onMenuShareTimeline({
                    title: "战疫安心住 坐享折上折",
                    desc: "秋果战“疫”安心住,邀您来体验,七大防疫举措,助力返工无忧",
                    link: link_url,
                    imgUrl: shareImg,
                    type: "",
                    dataUrl: "",
                    success: function() {}
                });
                wx.getLocation({
                    type: "gcj02", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: function(res) {
                        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                        setCookie("userLongitude", longitude);
                        that.longitude = longitude;
                        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                        setCookie("userLatitude", latitude);
                        that.latitude = latitude;
                    }
                });
            });
        },        
        // 打开wx的map
		openMap() {
			wx.openLocation({
				longitude: Number(this.store_msg.longitude), //经度，浮点数，范围为180 ~ -180。
				latitude: Number(this.store_msg.latitude), // 纬度，浮点数，范围为90 ~ -90
				name: this.store_msg.name, // 位置名
				address: this.store_msg.address, // 地址详情说明
				scale: 18, // 地图缩放级别,整形值,范围从1~28。默认为最大
				infoUrl: "", // 在查看位置界面底部显示的超链接,可点击跳转
				success: function(res) {

				},
				fail: function(res) {

				}
			});
        },
        activeTabs(name,title){
            this.getCityStore(name);
        },
        getCityStore(cityIndex){
            this.loading = true;
            this.$http({
                method: "POST",
                url: getStoreLists,
                data:{
                    city:cityIndex
                }
            }).then(res =>{
                this.loading = false;
                if(res.data.status == 1){
                    this.store_arr = res.data.data;
                }else{
                    Toast(res.data.msg);
                }
            });
        }
    },
    mounted() {
        this.getCityStore(1);
        // 获取公众号的配置info
        this.getAppInfo();
    },
}
</script>
<style lang="less" scoped>
    @import './index.less';
</style>