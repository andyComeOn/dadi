<template>
    <div class="hotel-label-page m-position-ab">
        <!-- toast(loading=>weui) -->
        <div v-show="loading">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">数据加载中</p>
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
        <!-- 酒店详情标签 -->
        <div class="labels-box item">
            <div class="labels">
                <div class="hd item-hd">酒店设施</div>
                <div class="tags">
                    <div class="listTag" style="display:inline-block;" v-for="(item,index) in listArr" :key="index">
                        <i :style="'background:url(' + item.img_url +') no-repeat center center;background-size:100% 100%;'"></i>
                        <span>{{item.name}}</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 酒店详情说明 -->
        <div class="desc-box item">
            <div class="desc">
                <div class="hd item-hd">酒店描述</div>
                <div class="bd" v-html="info.brief"></div>
            </div>
        </div>
        <!-- 温馨提示 -->
        <div class="tips-box">
            <div class="tips">
                <p>温馨提示：1、酒店入住时间14:00以后，离店时间12:00以前。如您在14:00以前未能到达，请以酒店安排为准。2、普卡会员入住当天12：00之前取消订单，不收取费用，逾期扣费。银卡、金卡会员14点前取消订单，不收取费用；铂金卡18点前取消订单，不收取费用。3、普通客户12点之前退房；普卡会员13点退房；银卡会员14点退房；金卡会员15点退房；铂金卡会员延迟到16点退房。</p>
            </div>
        </div>
    </div>
</template>

<script>
import { store_introduce } from "@/api/api";
export default {
    name: "hotel-label",
    data() {
        return {
            loading: false, //loading
            delayToast:false,
            delayToastTxt:"",
            store_id: "",
            info: "", // 接受http请求过来的数据
            listArr: "" //标签的二次封装
        };
    },
    created() {
        this.store_id = this.$route.query.store_id;
        this.loading = true;
        this.fetchData();
    },
    methods: {
        fetchData() {
            this.$http({
                method: "POST",
                url: store_introduce,
                data: { store_id: this.store_id }
            }).then(res => {
                this.loading = false;
                if (res.data.status == 1) {
                    this.info = res.data.data;
                    this.listArr = res.data.data.server_tag;
                }else{
                    this.delayToast = true;
                    this.delayToastTxt = res.data.msg;
                    setTimeout(()=>{
                        this.delayToast = false;
                    },3000);
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
.hotel-label-page {
    overflow: auto;
}
// 共有的样式
.item {
    padding-top: 10px;
}
.item-hd {
    height: 20px;
    line-height: 20px;
    font-size: 15px;
    color: #333;
    padding-left: 12px;
    position: relative;
    &::before {
        content: "";
        position: absolute;
        left: 0;
        width: 3px;
        bottom: 0;
        top: 0;
        background: #30b097;
    }
}

// 酒店详情标签
.labels-box {
    padding-top: 10px;
    .labels {
        padding: 15px;
        background: #ffffff;
        .tags {
            padding-top: 10px;
            .listTag {
                display: inline-block;
                width: 33.33%;
                height: 26px;
                position: relative;
                i{
                    position: absolute;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                    display:inline-block;
                    width:18px;
                    height:18px;
                    background-size: 100% 100%;
                    vertical-align:middle;
                }
                span{
                    display: inline-block;
                    line-height: 26px;
                    width:100%;
                    padding:0px 2px 0px 26px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
}

// 酒店详情说明
.desc-box {
    .desc {
        padding: 15px;
        background: #ffffff;
        .bd {
            margin-top: 10px;
            font-size: 14px;
            font-family: PingFangSC-Regular;
            color: #666;
            line-height: 24px;
        }
    }
}

// 温馨提示
.tips-box {
    padding: 10px 15px 10px;
    background: #eff1f0;
    .tips {
        font-size: 12px;
        color: #666;
        line-height: 17px;
        h4 {
            margin-bottom: 5px;
        }
        p {
            margin-bottom: 5px;
        }
    }
}
</style>