<template>
    <div class="vip-page">
        <!-- 卡片区 -->
        <div class="cards">
            <div class="box" id="cardsBox" v-if='cardList'>
                <div class="item" v-for="(item, index) in cardList" :key="index" :style="{backgroundImage: 'url('+ item.bgUrl +')', height:cardsBoxH + 'px'}" v-show="item.isCardVisible">
                    <!-- <div class="crown">夏种</div>  产品去掉了 -->
                    <div class="logo"><img src="../../assets/images/vip/logo.png" alt=""></div>
                    <div class="type">{{item.type}}</div>
                    <div class="labels">{{item.labels}}</div>
                </div>
            </div>
        </div>
        <!-- tab切换区 -->
        <div class="tab">
            <ul class="ul" id="tabBarW" v-if="tabList">
                <li v-for="(item,index) in tabList" :key="index" @click="tab(item.grade)" :class="[{flag: item.flag},{active: isActive==item.grade}]" :style="{width: tabBarItemW +'px'}">
                    <div>
                        <img :src="item.imgSrc" alt="">
                        <span></span>
                    </div>
                    <p>{{item.cardType}}</p>
                </li>
            </ul>
        </div>
        <!-- 文案展示区 -->
        <div class="desc">
            <div class="desc-box" v-if="txtList" v-for="(item,index) in txtList" :key="index" v-show="item.isTxtItemVisible">
                <!-- 开卡权益 -->
                <div class="card-right">
                    <div class="title">
                        <span class="s1"></span>
                        开卡权益
                        <span class="s2"></span>
                    </div>
                    <div class="content">
                        <dl>
                            <img src="../../assets/images/vip/kaika.png" alt="">
                            <dt>开卡赠券</dt>
                            <dd>{{item.coupon_num}}</dd>
                        </dl>
                        <dl>
                            <img src="../../assets/images/vip/yaoqing.png" alt="">
                            <dt>邀请特权</dt>
                            <dd>{{item.privilege_num}}</dd>
                        </dl>
                        <dl>
                            <img src="../../assets/images/vip/fangjia.png" alt="">
                            <dt>房价折扣</dt>
                            <dd>{{item.promo}}</dd>
                        </dl>
                        <dl>
                            <img src="../../assets/images/vip/xiaofei.png" alt="">
                            <dt>消费积分</dt>
                            <dd>{{item.score_rate}}</dd>
                        </dl>
                        <dl>
                            <img src="../../assets/images/vip/mianfei.png" alt="">
                            <dt>免费取消</dt>
                            <dd>{{item.pre_cancel_time}}</dd>
                        </dl>
                    </div>
                </div>
                <!-- 会员权益 -->
                <div class="vip-right">
                    <div class="title">
                        <span class="s1"></span>
                        会员权益
                        <span class="s2"></span>
                    </div>
                    <div class="content">
                        <ul class="ul">
                            <li>
                                <p class="li-desc">餐饮折扣</p>
                                <p class="li-intro">{{item.catering_discount}}</p>
                            </li>
                            <li>
                                <p class="li-desc">优享通道</p>
                                <p class="li-intro">{{item.enjoy_channel}}</p>
                            </li>
                            <li>
                                <p class="li-desc">上门宵夜</p>
                                <p class="li-intro">{{item.supper}}</p>
                            </li>
                            <li>
                                <p class="li-desc">延迟退房</p>
                                <p class="li-intro">{{item.delay_room}}</p>
                            </li>
                            <li>
                                <p class="li-desc">生日礼遇</p>
                                <p class="li-intro">{{item.birthday}}</p>
                            </li>
                            <li>
                                <p class="li-desc">权益共享</p>
                                <p class="li-intro">{{item.equity}}</p>
                            </li>
                            <li>
                                <p class="li-desc">收费会员活动</p>
                                <p class="li-intro">{{item.user_activity}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { user_card_privilege } from "@/api/api";
export default {
    name: "vip",
    components: {},
    data() {
        return {
            cardsBoxH: "",
            isActive: "",
            // 卡片的数组
            cardList: [],
            // tab点击数组
            tabList: [],
            // 下边的文本数组包含：开卡权益、会员权益
            txtList: [],
        };
    },
    created() {
        this.$http({
            method: "POST",
            url: user_card_privilege,
            data: {}
        })
            .then(res => {
                if (res.data.status == 1) {
                    var tmp = res.data.data;
                    // 动态获取tabbar中item的数量，使其宽度均分
                    let tabBarW = document.querySelector("#tabBarW");
                    let tabBarItemW = tabBarW.clientWidth / tmp.length;
                    this.tabBarItemW = tabBarItemW;
                    for (var i = 0; i < tmp.length; i++) {
                        // 封装卡片数组
                        this.cardList.push({
                            bgUrl: require("../../assets/images/vip/b" +
                                (i + 1) +
                                ".png"),
                            isCardVisible: tmp[i].flag == 1 ? true : false,
                            type: tmp[i].name,
                            labels: tmp[i].remark
                        });
                        // 封装tab点击数组
                        this.tabList.push({
                            imgSrc: require("../../assets/images/vip/v" +
                                (i + 1) +
                                ".png"),
                            grade: tmp[i].grade,
                            cardType: tmp[i].card,
                            flag: tmp[i].flag == 1 ? true : false
                        });

                        // 封装下边的文案数组
                        this.txtList.push({
                            isTxtItemVisible: tmp[i].flag == 1 ? true : false,

                            coupon_num: tmp[i].coupon_num, //开卡赠券
                            privilege_num: tmp[i].privilege_num, //邀请特权
                            promo: tmp[i].promo, // 房价折扣
                            score_rate: tmp[i].score_rate, // 消费积分
                            pre_cancel_time: tmp[i].pre_cancel_time, // 免费取消

                            catering_discount: tmp[i].catering_discount, // 餐饮折扣
                            enjoy_channel: tmp[i].enjoy_channel, // 优享通道
                            supper: tmp[i].supper, // 上门宵夜
                            delay_room: tmp[i].delay_room, // 延迟退房
                            birthday: tmp[i].birthday, // 生日礼遇
                            equity: tmp[i].equity, // 权益共享
                            user_activity: tmp[i].user_activity // 收费会员活动
                        });
                    }
                }
            })
            .catch();
    },
    mounted() {
        this.$nextTick(() => {
            // 由卡片的宽度-->给卡片的高赋值
            let cardsBox = document.querySelector("#cardsBox");
            let cardsBoxH = cardsBox.clientWidth * 4 / 7;
            this.cardsBoxH = cardsBoxH;
        });
    },
    filters: {
        cardTypeFormat() {}
    },
    methods: {
        // 点击tab切换
        tab(grade) {
            this.isActive = grade;
            var tmpC = this.cardList;
            var tmpT = this.tabList;
            var tmpTxt = this.txtList;
            for (let i = 0; i < tmpC.length; i++) {
                tmpC[i].isCardVisible = false;
                tmpT[i].flag = false;
                tmpT[i].imgSrc = require("../../assets/images/vip/v" +
                    (i + 1) +
                    ".png");
                tmpTxt[i].isTxtItemVisible = false;
                if (i + 1 == grade) {
                    tmpC[i].isCardVisible = true;
                    tmpT[i].imgSrc = require("../../assets/images/vip/v" +
                        (i + 1) +
                        "a.png");
                    tmpTxt[i].isTxtItemVisible = true;
                }
            }
        }
    }
};
</script>

<style lang="less" scoped>
// 提取标题css
.title {
    line-height: 21px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
    font-size: 15px;
    margin-top: 30px;
    span {
        width: 72px;
        height: 8px;
        background: url("../../assets/images/vip/bg-row.png") no-repeat center
            center;
        background-size: 100% 100%;
        &.s1 {
            margin-right: 10px;
        }
        &.s2 {
            margin-left: 10px;
        }
    }
}

// 卡片
.cards {
    padding: 0 12px;
    .box {
        &::after {
            content: "";
            display: table;
            clear: both;
        }
        .item {
            width: 100%;
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 100% 100%;
            position: relative;
            padding: 40px 0 0 30px;
            color: #fff;
            // .crown {
            //     position: absolute;
            //     right: 0;
            //     width: 49px;
            //     line-height: 22px;
            //     padding-right: 4px;
            //     text-align: right;
            //     background-image: url("../../assets/images/vip/crown.png");
            //     background-color: rgb(255, 255, 255);
            //     background-repeat: no-repeat;
            //     background-position: 6px center;
            //     background-size: 14px 11px;
            //     font-size: 10px;
            //     color: #f78c3e;
            //     border-radius: 11px 0 0 11px;
            // }
            .logo {
                height: 22px;
                margin-bottom: 50px;
                img {
                    height: 22px;
                }
            }
            .type {
                line-height: 25px;
                font-size: 18px;
                margin-bottom: 10px;
            }
            .labels {
                line-height: 18px;
                font-size: 13px;
            }
        }
    }
}
// tabbar
.tab {
    padding: 15px 15px 0px;
    .ul {
        &::after {
            display: table;
            content: "";
            clear: both;
        }
        li {
            float: left;
            text-align: center;
            color: #999;
            &.active {
                color: #333;
                span {
                    background: #f78c3e;
                }
            }
            &.flag {
                color: #333;
                span {
                    background: #f78c3e;
                }
            }
            div {
                height: 20px;
                margin-bottom: 10px;
                position: relative;
                img {
                    position: absolute;
                    top: 0;
                    left: 50%;
                    margin-left: -10px;
                    width: 20px;
                    height: 20px;
                    z-index: 2;
                }
                span {
                    position: absolute;
                    width: 100%;
                    height: 1px;
                    top: 50%;
                    left: 0;
                    background: #cccccc;
                    z-index: 1;
                }
            }
            p {
                line-height: 13px;
                font-size: 13px;
            }
        }
    }
}
// 下面的文字描述
.desc {
    .card-right {
        .content {
            padding: 0 15px;
            &::after {
                display: table;
                content: "";
                clear: both;
            }
            dl {
                width: 20%;
                float: left;
                text-align: center;
                img {
                    width: 24px;
                    height: 24px;
                    display: block;
                    margin: 15px auto 10px;
                }
                dt {
                    line-height: 19px;
                    margin-bottom: 5px;
                    color: #333;
                    font-size: 13px;
                }
                dd {
                    line-height: 16px;
                    color: #666;
                    font-size: 12px;
                }
            }
        }
    }
    .vip-right {
        .content {
            padding: 15px 15px 15px;
            .ul {
                &::after {
                    content: "";
                    display: table;
                    clear: both;
                }
                li {
                    padding: 20px 30px 0;
                    height: 100px;
                    width: 33.33%;
                    float: left;
                    border-right: 1px solid #e5e5e5;
                    border-bottom: 1px solid #e5e5e5;
                    .li-desc {
                        color: #333;
                        line-height: 19px;
                        font-size: 13px;
                        margin-bottom: 8px;
                        text-align: center;
                    }
                    .li-intro {
                        text-align: center;
                        color: #666;
                        line-height: 14px;
                        font-size: 10px;
                    }
                    &:nth-child(3) {
                        border-right: none;
                    }
                    &:nth-child(6) {
                        border-right: none;
                    }
                    &:last-of-type {
                        border-bottom: none;
                    }
                }
            }
        }
    }
}
</style>