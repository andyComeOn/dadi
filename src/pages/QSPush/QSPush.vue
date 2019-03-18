<template>
    <div class="qsPush">
        <div class="qsPush_box">
            <img class="bg" src="../../assets/images/distribution/bg-qr.png" />
            <div class="qsPush_msg">
                <!-- 主内容区 -->
                <div class="qsPush_msg_box">
                    <img class='qsPush_head' :src="headUrl">
                    <p class="qsPush_nickname">{{nickname}}</p>
                    <p class="qsPush_invite">邀请好友赚奖励</p>
                    <div class="qsPush_QRCode">
                        <img class="qrImg" :src="this.imgurl" alt="">
                    </div>
                    <p class="qsPush_hint">长按识别二维码</p>
                    <!-- 定位点缀 -->
                    <img class="img-decorate" src="../../assets/images/distribution/bg-qr-decorate.png" alt="">
                </div>
                <!-- 底部说明 -->
                <div class="qsPush_logo">
                    <img class="bottom-logo" :src="hotelGroupLogo" />
                    <p>都市里的世外桃园</p>
                </div>

            </div>

        </div>
    </div>
</template>
<script>
import wx from "weixin-js-sdk";
import { showQsCode, login_test, wxShare, baseCpid } from "../../api/api.js";
import { getCookie } from "@/utils/util";
export default {
    name: "praise",
    components: {},
    data() {
        return {
            imgurl: "",
            appId: "",
            timestamp: "",
            nonceStr: "",
            signature: "",
            url: "",
            headUrl: "", //头像
            nickname: "", //昵称
            hotelGroupLogo: "", // 集团logo
        };
    },
    computed: {},
    mounted() {
        //获取头像
        this.headUrl = decodeURIComponent(getCookie("avatar"));
        //获取姓名
        this.nickname = decodeURI(decodeURI(getCookie("nickname")));
        // 拉取bottom-logo
        this.groupLogo();
        //获取二维码
        this.$http({
            method: "POST",
            url: showQsCode,
            data: {}
        }).then(res => {
            // console.log(res);
            this.imgurl = res.data.data;
        });
        //获取参数
        var dataObj = {
            url: location.href.split("#")[0]
        };
        this.$http({
            url: wxShare,
            method: "POST",
            data: dataObj
        })
            .then(res => {
                console.log(res);
                this.appId = res.data.data.appid;
                this.timestamp = res.data.data.timestamp;
                this.nonceStr = res.data.data.noncestr;
                this.signature = res.data.data.signature;
                this.url = res.data.data.url;
                this.share(res.data.data.url, res.data.data.share_img);
            })
            .catch(err => {
                console.log(err);
            });
    },
    methods: {
        // 微信分享
        share(url, shareImg) {
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: this.appId, // 必填，公众号的唯一标识
                timestamp: this.timestamp, // 必填，生成签名的时间戳
                nonceStr: this.nonceStr, // 必填，生成签名的随机串
                signature: this.signature, // 必填，签名
                jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline"] // 必填，需要使用的JS接口列表
            });
            wx.onMenuShareAppMessage({
                title: "秋果人文精品酒店",
                desc: "拿奖金，拿奖金，拿奖金，点开拿奖金",
                link: url,
                imgUrl: shareImg,
                type: "",
                dataUrl: "",
                success: function() {}
            });
            wx.onMenuShareTimeline({
                title: "秋果人文精品酒店",
                desc: "拿奖金，拿奖金，拿奖金，点开拿奖金",
                link: url,
                imgUrl: shareImg,
                type: "",
                dataUrl: "",
                success: function() {}
            });
        },
        // 根据cpid来判断bottom-logo
        groupLogo () {
            if (baseCpid == 1) {
                this.hotelGroupLogo = require('../../assets/images/distribution/logo.png');
            } else {
                this.hotelGroupLogo = require('../../assets/images/distribution/logoHy.png');
            }
        }
        
    }
};
</script>
<style lang="less" scoped>
.qsPush_box {
    position: relative;
    .bg {
        width: 100%;
    }
}
.qsPush_msg {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    right: 0;
    padding: 35px 35px 0;
    .qsPush_msg_box {
        background: #fff;
        padding: 25px 0;
        margin-bottom: 20px;
        border-radius: 10px;
        position: relative;
        .qsPush_head {
            display: block;
            width: 80px;
            height: 80px;
            margin: 0 auto 4px;
            border-radius: 50%;
        }
        .qsPush_nickname {
            font-size: 12px;
            color: #666;
            text-align: center;
            line-height: 12px;
            margin-bottom: 25px;
        }
        .qsPush_invite {
            line-height: 18px;
            font-size: 18px;
            color: #ffba55;
            text-align: center;
            margin-bottom: 10px;
        }
        .qsPush_QRCode {
            width: 150px;
            height: 150px;
            padding: 1px;
            margin: 0 auto 10px;
            border: 1px solid #e5e5e5;
            .qrImg {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .qsPush_hint {
            font-size: 12px;
            color: #666;
            text-align: center;
            line-height: 12px;
        }
        // 点缀
        .img-decorate {
            display: block;
            position: absolute;
            width: 35px;
            height: 10px;
            left: -18px;
            bottom: 25px;
        }
    }
    // 底部文字logo
    .qsPush_logo {
        .bottom-logo {
            display: block;
            width: 46px;
            height: 30px;
            margin: 0 auto 10px;
        }
        p {
            line-height: 16px;
            font-size: 12px;
            color: #fff;
            text-align: center;
        }
    }
}
</style>