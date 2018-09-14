<template>
    <div class="refreshbar-container">
        <div class="refreshbar-wrapper">
            <div class="lf m-ellipsis">当前位置：{{address}} </div>
            <div class="rg" @click="refresh">
                <img src="../assets/images/icon/ic-refresh.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
import { slt_location, wxShare } from "@/api/api";
import wx from "weixin-js-sdk";
export default {
    props: ["refreshBarObj"],
    data() {
        return {
            myLocation: "",
            address: "",
            // longitude: "117.153959", //天津
            // latitude: "39.10149", //天津
            longitude: this.refreshBarObj.longitude,
            latitude: this.refreshBarObj.latitude,
            cityid: "",
            cityname: ""
        };
    },
    mounted() {
        this.getAddr(); // 首先通过路由带过来的经纬度拉取详细地址
    },
    methods: {
        // wx分享接口调取
        getAppInfo() {
            var dataObj = {
                url: location.href.split("#")[0]
            };
            this.$http({
                url: wxShare,
                method: "POST",
                data: dataObj
            })
                .then(res => {
                    let appId = res.data.data.appid;
                    let timestamp = res.data.data.timestamp;
                    let nonceStr = res.data.data.noncestr;
                    let signature = res.data.data.signature;
                    let tmpUrl = res.data.data.url;
                    this.wxConfigMethod(
                        appId,
                        timestamp,
                        nonceStr,
                        signature,
                        tmpUrl
                    );
                })
                .catch(err => {});
        },
        // 刷新地理位置需要进行wx.config
        wxConfigMethod(appId, timestamp, nonceStr, signature, tmpUrl) {
            let that = this;
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: appId,
                timestamp: timestamp,
                nonceStr: nonceStr,
                signature: signature,
                jsApiList: ["getLocation"]
            });
            wx.getLocation({
                type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function(res) {
                    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    that.latitude = latitude;
                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    that.longitude = longitude;
                    that.getAddr(); // 拉取获取详细地址
                }
            });
        },
        // 刷新
        refresh() {
            this.getAppInfo();
        },
        // 根据经纬度获取详细地址
        getAddr() {
            this.address = "定位中...";
            this.$http({
                method: "POST",
                url: slt_location,
                data: {
                    longitude: this.longitude, // 经度
                    latitude: this.latitude //维度
                }
            }).then(res => {
                if (res.data.status == 1) {
                    let locationTmp = res.data.data;
                    if (locationTmp.address == "") {
                        this.getAddr();
                    }
                    this.cityname = locationTmp.city;
                    this.cityid = locationTmp.id;
                    this.address = locationTmp.address;
                    this.$emit("refreshEmit", this.longitude, this.latitude);
                } else {
                    this.myLocation = "定位失败...";
                    this.address = "定位失败...";
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
.refreshbar-container {
    height: 32px;
    padding: 0 10px;
    background: #eff1f0;
    .refreshbar-wrapper {
        height: 32px;
        font-size: 13px;
        display: flex;
        flex-direction: row;
        .lf {
            line-height: 32px;
            color: #999999;
            flex: 1;
        }
        .rg {
            width: 32px;
            height: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                width: 16px;
                height: 16px;
            }
        }
    }
}
</style>