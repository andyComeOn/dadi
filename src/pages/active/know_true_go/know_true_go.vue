<template>
    <!-- 仅仅是一个文案展示页面 -->
    <div class="container_box">
        <img v-lazy='require("../../../assets/images/active/know_qiuguo/01.png")' />
        <img v-lazy='require("../../../assets/images/active/know_qiuguo/02.png")' />
        <img v-lazy='require("../../../assets/images/active/know_qiuguo/03.png")' />
        <img v-lazy='require("../../../assets/images/active/know_qiuguo/04.png")' />
        <img v-lazy='require("../../../assets/images/active/know_qiuguo/05.png")' />
        <img v-lazy='require("../../../assets/images/active/know_qiuguo/06.png")' />
        <img v-lazy='require("../../../assets/images/active/know_qiuguo/07.png")' />
        <img v-lazy='require("../../../assets/images/active/know_qiuguo/08.png")' />
        <img v-lazy='require("../../../assets/images/active/know_qiuguo/09.png")' />
        <img v-lazy='require("../../../assets/images/active/know_qiuguo/10.png")' />
        <img v-lazy='require("../../../assets/images/active/know_qiuguo/11.png")' />
        <img v-lazy='require("../../../assets/images/active/know_qiuguo/12.png")' />
        <img v-lazy='require("../../../assets/images/active/know_qiuguo/13.png")' />
        <img v-lazy='require("../../../assets/images/active/know_qiuguo/14.png")' />
        <img v-lazy='require("../../../assets/images/active/know_qiuguo/15.png")' />
        <img v-lazy='require("../../../assets/images/active/know_qiuguo/16.png")' />
        <img v-lazy='require("../../../assets/images/active/know_qiuguo/17.png")' />
        <img v-lazy='require("../../../assets/images/active/know_qiuguo/18.png")' />
        <img v-lazy='require("../../../assets/images/active/know_qiuguo/19.png")' />
        <img v-lazy='require("../../../assets/images/active/know_qiuguo/20.png")' />
        <img v-lazy='require("../../../assets/images/active/know_qiuguo/21.png")' />
        <img v-lazy='require("../../../assets/images/active/know_qiuguo/22.png")' />
        <img v-lazy='require("../../../assets/images/active/know_qiuguo/23.png")' />
        <img v-lazy='require("../../../assets/images/active/know_qiuguo/24.png")' />
        <img v-lazy='require("../../../assets/images/active/know_qiuguo/25.png")' />
        <img v-lazy='require("../../../assets/images/active/know_qiuguo/26.png")' />
        <img v-lazy='require("../../../assets/images/active/know_qiuguo/27.png")' />
        <img v-lazy='require("../../../assets/images/active/know_qiuguo/28.png")' />
        <img v-lazy='require("../../../assets/images/active/know_qiuguo/29.png")' />
        <img v-lazy='require("../../../assets/images/active/know_qiuguo/30.png")' />
        <img v-lazy='require("../../../assets/images/active/know_qiuguo/31.png")' />
        <img v-lazy='require("../../../assets/images/active/know_qiuguo/32.png")' />
        <img v-lazy='require("../../../assets/images/active/know_qiuguo/33.png")' />
        <img v-lazy='require("../../../assets/images/active/know_qiuguo/34.jpg")' />
    </div>
</template>

<script>
import wx from 'weixin-js-sdk';
import { wxShare } from "../../../api/api.js";
import { Toast } from 'vant';
export default {
    data(){
        return {
            shareData:""
        }
    },
    methods: {
        //获取微信分享的参数
        getShareData(){
            this.$http({
                url: wxShare,
                method: "POST",
                data: {
                    url: location.href
                }
            }).then(res => {
                if(res.data.status == 1){
                    this.shareData = res.data.data;
                    this.share();
                }else{
                    Toast(res.data.msg);
                }
            });
        },
        //微信分享
        share() {
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: this.shareData.appid, // 必填，公众号的唯一标识
                timestamp: this.shareData.timestamp, // 必填，生成签名的时间戳
                nonceStr: this.shareData.noncestr, // 必填，生成签名的随机串
                signature: this.shareData.signature, // 必填，签名
                jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表
            });
            //获取“分享给朋友”按钮点击状态及自定义分享内容接口
            wx.onMenuShareAppMessage({
                title: "一分钟了解秋果",  // 分享标题
                desc:'都市里的世外桃源', // 分享描述
                link: this.shareData.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: this.shareData.share_img, // 分享图标
                success: function() {
                }
            });
            //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
            wx.onMenuShareTimeline({
                title: "一分钟了解秋果",  // 分享标题
                desc:'都市里的世外桃源', // 分享描述
                link: this.shareData.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: this.shareData.share_img, // 分享图标
                success: function() {
                }
            });
        },
    },
    mounted() {
        this.getShareData();
    }
}
</script>
<style>
    .container_box{
        width: 100%;
        background: #468f62;
        /* max-width: 800px; */
        margin:0 auto;
    }
    .container_box:after{
        content:"";
        display: block;
        clear:both;
    }
    .container_box img{
        width:100%;
        display:block;
    }
</style>
