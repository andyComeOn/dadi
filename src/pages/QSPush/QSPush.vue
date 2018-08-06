<template>
    <div class="qsPush">
        <div class="qsPush_box">
            <img src="../../assets/images/distribution/bg_erweima.png" />
            <div class="qsPush_msg">
                <img class='qsPush_head' src="../../assets/images/img/hotel.png">
                <p class="qsPush_nickname">乘风破浪</p>
                <p class="qsPush_invite">邀请好友赚奖励</p>
                <div class="qsPush_QRCode">
                    <img :src="this.imgurl" alt="">
                </div>
                <p class="qsPush_hint">长按识别二维码</p>
            </div>
            <div class="qsPush_logo">
                <img src="../../assets/images/distribution/logo.png" />
                <p>都市里的室外桃园</p>
            </div>
        </div>
    </div>
</template>
<script>
import wx from "weixin-js-sdk";
import { showQsCode, login_test, wxShare } from "../../api/api.js";
export default {
    name: "praise",
    components: {},
    data() {
        return {
            imgurl: "", //
            appId: "", //
            timestamp: "",
            nonceStr: "",
            signature: "",
            jsApiList: [],
            url: "",
            obj: {}
        };
    },
    computed: {},
    mounted() {
        // alert(location.href.split('#')[0]);
        var param = {
            // cpid:1
        };
        this.$http({
            method: "POST",
            url: login_test,
            data: param
        }).then(res => {
            // console.log(res);
            this.$http({
                method: "POST",
                url: showQsCode,
                data: param
            }).then(res => {
                console.log(res);
                this.imgurl = res.data.data;
            });
        });

        //获取参数
        var dataObj = {
            url: encodeURIComponent("http://www.baidu.com".split("#")[0])
            // window.location.href.split("#")[0]
            // http://172.16.1.90:6677
        };
        this.$http({
            url: wxShare,
            method: "POST",
            data: dataObj
        }).then(res => {
            console.log(res);
            this.appId = res.data.data.appid;
            this.timestamp = res.data.data.timestamp;
            this.nonceStr = res.data.data.noncestr;
            this.signature = res.data.data.signature;
            this.url = res.data.data.url;
            // this.share(res.data.data.url);

            // this.obj = res.data.data;

            wx.config({
                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: this.appId, // 必填，公众号的唯一标识
                timestamp: this.timestamp, // 必填，生成签名的时间戳
                nonceStr: this.nonceStr, // 必填，生成签名的随机串
                signature: this.signature, // 必填，签名
                jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表
            });
            wx.onMenuShareAppMessage({
                title: "测试", // 分享标题
                desc: "描述", // 分享描述
                link: this.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: "", // 分享图标
                type: "", // 分享类型,music、video或link，不填默认为link
                dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
                success: function() {
                    // 用户点击了分享后执行的回调函数
                    alert(1234);
                }
            });
        });
    },
    methods: {
        share(url) {
            // wx.config({
            //     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            //     appId: this.appId, // 必填，公众号的唯一标识
            //     timestamp: this.timestamp, // 必填，生成签名的时间戳
            //     nonceStr: this.nonceStr, // 必填，生成签名的随机串
            //     signature: this.signature, // 必填，签名
            //     jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
            // });
            // wx.onMenuShareAppMessage({
            //     title: "测试", // 分享标题
            //     desc: "描述", // 分享描述
            //     link: this.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            //     imgUrl: "", // 分享图标
            //     type: "", // 分享类型,music、video或link，不填默认为link
            //     dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
            //     success: function() {
            //         // 用户点击了分享后执行的回调函数
            //         alert(1234);
            //     }
            // });
        }
    }
};
</script>
<style lang="less" scoped>
.qsPush_box {
    position: relative;
    img {
        width: 100%;
    }
}

.qsPush_msg {
    position: absolute;
    top: 12.54%;
    left: 10%;
    width: 80%;
    height: 66.8%;
    .qsPush_head {
        width: 81px;
        height: 81px;
        display: block;
        margin: 0 auto;
        margin-top: 40px;
        border-radius: 50%;
    }
}

.qsPush_nickname {
    font-size: 10px;
    color: #666;
    text-align: center;
    line-height: 19px;
    margin-bottom: 12px;
}

.qsPush_invite {
    font-size: 17px;
    color: #ffba55;
    text-align: center;
    line-height: 37px;
}

.qsPush_QRCode {
    width: 92px;
    height: 92px;
    padding: 10px;
    border: 1px solid #e5e5e5;
    margin: 0 auto;
    img {
        display: block;
        width: 72px;
        height: 72px;
    }
}

.qsPush_hint {
    text-align: center;
    font-size: 10px;
    color: #666;
    line-height: 19px;
}

.qsPush_logo {
    position: absolute;
    bottom: 7.3%;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 60px;
    img {
        width: 46px;
        height: 30px;
        display: block;
        margin: 0 auto;
    }
    p {
        color: #fff;
        font-size: 10px;
        text-align: center;
        line-height: 21px;
        margin-top: 5px;
    }
}
</style>