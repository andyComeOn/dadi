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
        <!-- 酒店详情标签 -->
        <div class="labels-box item">
            <div class="labels">
                <div class="hd item-hd">酒店设施</div>
                <div class="bd">
                    <div class="tags" v-for="(item,index) in list" :key="index">
                        <span v-for="(itemSon,index) in item.tag" :key="index" :class="'lab'+itemSon">{{itemSon|filterLabel}}</span>
                    </div>
                    <!-- <span v-for="(item,index) in info.server_tag" :key="index" :class="'lab'+item">{{item|filterLabel}}</span> -->
                </div>
            </div>
        </div>
        <!-- 酒店详情说明 -->
        <div class="desc-box item">
            <div class="desc">
                <div class="hd item-hd">酒店描述</div>
                <!-- <div class="bd">
					“秋果”品牌以自然、健康、率性的价值观，为希望能在繁华、喧嚣的都市中寻得一品净土的中产商务人士打造一处静谧之所，栖身、栖心。 秋果品牌定位：都市人文精品酒店缔造者与领导者；秋果品牌主张－我们不仅是一家高品质酒店，亦希望为旅途客人打造一个舒适的家，为有共同兴趣爱好的客人塑造一个专属社区，并引导一种生活方式。
				</div> -->
                <div class="bd" v-html="info.brief"></div>
            </div>
        </div>
        <!-- 温馨提示 -->
        <div class="tips-box">
            <div class="tips">
                <!-- <h4>温馨提示：</h4> -->
                <!-- <p>1.联系电话：
                    <a :href="'tel:' + info.tel" class="call">{{info.tel}}</a>
                </p> -->
                <!-- <p>2.入离通知：入住时间－12点以后；离店时间－次日12点以前</p> -->
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
            loading: true, //loading
            store_id: "",
            info: "", // 接受http请求过来的数据
            list: "" //标签的二次封装
        };
    },
    created() {
        this.store_id = this.$route.query.store_id;
        this.fetchData();
    },
    methods: {
        fetchData() {
            this.$http({
                method: "POST",
                url: store_introduce,
                data: { store_id: this.store_id }
            })
                .then(res => {
                    if (res.data.status == 1) {
                        this.loading = false;
                        this.info = res.data.data;
                        let tmp = res.data.data.server_tag;
                        let tmpArr = [];
                        for (var i = 0; i < tmp.length; i += 3) {
                            tmpArr.push({ tag: tmp.slice(i, i + 3) });
                        }
                        console.log(tmpArr);
                        this.list = tmpArr;
                    }
                })
                .catch();
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
        .bd {
            padding-top: 10px;
            .tags {
                span {
                    display: inline-block;
                    width: 33.33%;
                    line-height: 26px;
                    padding-left: 26px;
                    background-repeat: no-repeat;
                    background-position: left center;
                    background-size: 18px 18px;
                    &.lab1 {
                        background-image: url("../../assets/images/hotel-label/lab1.png");
                    }
                    &.lab2 {
                        background-image: url("../../assets/images/hotel-label/lab2.png");
                    }
                    &.lab3 {
                        background-image: url("../../assets/images/hotel-label/lab3.png");
                    }
                    &.lab4 {
                        background-image: url("../../assets/images/hotel-label/lab4.png");
                    }
                    &.lab5 {
                        background-image: url("../../assets/images/hotel-label/lab5.png");
                    }
                    &.lab6 {
                        background-image: url("../../assets/images/hotel-label/lab6.png");
                    }
                    &.lab7 {
                        background-image: url("../../assets/images/hotel-label/lab7.png");
                    }
                    &.lab8 {
                        background-image: url("../../assets/images/hotel-label/lab8.png");
                    }
                    &.lab9 {
                        background-image: url("../../assets/images/hotel-label/lab9.png");
                    }
                    &.lab10 {
                        background-image: url("../../assets/images/hotel-label/lab10.png");
                    }
                    &.lab11 {
                        background-image: url("../../assets/images/hotel-label/lab11.png");
                    }
                    &.lab12 {
                        background-image: url("../../assets/images/hotel-label/lab12.png");
                    }
                    &.lab13 {
                        background-image: url("../../assets/images/hotel-label/lab13.png");
                    }
                    &.lab14 {
                        background-image: url("../../assets/images/hotel-label/lab14.png");
                    }
                    &.lab15 {
                        background-image: url("../../assets/images/hotel-label/lab15.png");
                    }
                    &.lab16 {
                        background-image: url("../../assets/images/hotel-label/lab16.png");
                    }
                    &.lab17 {
                        background-image: url("../../assets/images/hotel-label/lab17.png");
                    }
                    &.lab18 {
                        background-image: url("../../assets/images/hotel-label/lab18.png");
                    }
                    &.lab19 {
                        background-image: url("../../assets/images/hotel-label/lab19.png");
                    }
                    &.lab20 {
                        background-image: url("../../assets/images/hotel-label/lab20.png");
                    }
                    &.lab21 {
                        background-image: url("../../assets/images/hotel-label/lab21.png");
                    }
                    &.lab22 {
                        background-image: url("../../assets/images/hotel-label/lab22.png");
                    }
                    &.lab23 {
                        background-image: url("../../assets/images/hotel-label/lab23.png");
                    }
                    &.lab24 {
                        background-image: url("../../assets/images/hotel-label/lab24.png");
                    }
                    &.lab25 {
                        background-image: url("../../assets/images/hotel-label/lab25.png");
                    }
                    &.lab26 {
                        background-image: url("../../assets/images/hotel-label/lab26.png");
                    }
                    &.lab27 {
                        background-image: url("../../assets/images/hotel-label/lab27.png");
                    }
                    &.lab28 {
                        background-image: url("../../assets/images/hotel-label/lab28.png");
                    }
                    &.lab29 {
                        background-image: url("../../assets/images/hotel-label/lab29.png");
                    }
                    &.lab30 {
                        background-image: url("../../assets/images/hotel-label/lab30.png");
                    }
                    &.lab31 {
                        background-image: url("../../assets/images/hotel-label/lab31.png");
                    }
                    &.lab32 {
                        background-image: url("../../assets/images/hotel-label/lab32.png");
                    }
                    &.lab33 {
                        background-image: url("../../assets/images/hotel-label/lab33.png");
                    }
                    &.lab34 {
                        background-image: url("../../assets/images/hotel-label/lab34.png");
                    }
                    &.lab35 {
                        background-image: url("../../assets/images/hotel-label/lab35.png");
                    }
                    &.lab36 {
                        background-image: url("../../assets/images/hotel-label/lab36.png");
                    }
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