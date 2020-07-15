<template>
    <div id="vipPage">
        <!-- 卡片区 -->
        <div class="cards">
            <div class="box" id="cardsBox" v-if='cardList'>
                <div class="item" v-for="(item, index) in cardList" :key="index" :style="{backgroundImage: 'url('+ item.bgUrl +')', height:cardsBoxH + 'px'}" v-show="item.isCardVisible">
                    <!-- <div class="crown">夏种</div>  产品去掉了 -->
                    <div class="logo"><img :src="item.logoSrc" alt=""></div>
                    <div class="type">{{item.type}}</div>
                    <div class="labels">{{item.labels}}</div>
                    <div :class="[{upMember:true},{upMember_pk:isActive == 1},{upMember_yk:isActive == 2},{upMember_jk:isActive == 3}]" v-if="Cpid == 4 && max_level == 0" @click="upMemberBtn()">
                        <span>会员升级</span>
                        <img v-if="isActive == 1" src="../../assets/images/member/more_puka.png" />
                        <img v-if="isActive == 2" src="../../assets/images/member/more_yinka.png" />
                        <img v-if="isActive == 3" src="../../assets/images/member/more_jinka.png" />
                    </div>
                </div>
            </div>
        </div>
        <!-- tab切换区 -->
        <div class="tab">
            <ul class="ul" id="tabBarW" v-if="tabList">
                <li v-for="(item,index) in tabList" :key="index" @click="tab(item.grade)" :class="[{flag:item.flag},{active: isActive==item.grade}]" :style="{width: tabBarItemW +'px'}">
                    <div>
                        <img :src="item.imgSrc" />
                        <span></span>
                    </div>
                    <p class="cardType">{{item.cardType}}</p>
                    <p class="atCardType" v-if="item.flagText != ''">
                        <img :src="item.flagSrc" />
                        <i>{{item.flagText}}</i>
                    </p>
                </li>
            </ul>
        </div>
        <!-- 文案展示区 -->
        <div class="desc">
            <div class="descBoxWrap" v-if="txtList">
                <div class="descBox" v-for="(item,index) in txtList" :key="index" v-show="item.isTxtItemVisible">
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
                            <!-- <dl>
                                <img src="../../assets/images/vip/yaoqing.png" alt="">
                                <dt>邀请特权</dt>
                                <dd>{{item.privilege_num}}</dd>
                            </dl>-->
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
                            <dl v-if="item.pre_cancel_time">
                                <img src="../../assets/images/vip/mianfei.png" alt="">
                                <dt>免费取消</dt>
                                <dd>{{item.pre_cancel_time}}</dd>
                            </dl>
                            <dl v-if="item.breakfast">
                                <img src="../../assets/images/vip/zaocan.png" alt="">
                                <dt>免费早餐</dt>
                                <dd>{{item.breakfast}}</dd>
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
                                <li v-if="item.catering_discount">
                                    <p class="li-desc">餐饮折扣</p>
                                    <p class="li-intro">{{item.catering_discount}}</p>
                                </li>
                                <li v-if="item.enjoy_channel">
                                    <p class="li-desc">优享通道</p>
                                    <p class="li-intro">{{item.enjoy_channel}}</p>
                                </li>
                                <li v-if="item.supper">
                                    <p class="li-desc">上门宵夜</p>
                                    <p class="li-intro">{{item.supper}}</p>
                                </li>
                                <li v-if="item.delay_room">
                                    <p class="li-desc">延迟退房</p>
                                    <p class="li-intro">{{item.delay_room}}</p>
                                </li>
                                <li v-if="item.birthday">
                                    <p class="li-desc">生日礼遇</p>
                                    <p class="li-intro">{{item.birthday}}</p>
                                </li>
                                <!-- <li v-if="item.equity">
                                    <p class="li-desc">权益共享</p>
                                    <p class="li-intro">{{item.equity}}</p>
                                </li> -->
                                <li v-if="item.user_activity">
                                    <p class="li-desc">收费会员活动</p>
                                    <p class="li-intro">{{item.user_activity}}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { user_card_privilege, baseCpid } from "@/api/api";
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
            Cpid:global.GlobalCpid,
            max_level:""        //1会员升级不显示
        };
    },
    created() {
        this.$http({
            method: "POST",
            url: user_card_privilege,
            data: {}
        }).then(res => {
            if (res.data.status == 1) {
                var tmp = res.data.data.data;
                this.max_level = res.data.data.max_level;
                // 动态获取tabbar中item的数量，使其宽度均分
                let tabBarW = document.querySelector("#tabBarW");
                let tabBarItemW = tabBarW.clientWidth / tmp.length;
                this.tabBarItemW = tabBarItemW;
                for (var i = 0; i < tmp.length; i++) {
                    if(tmp[i].flag == 1){       //初始化判断颜色（会员升级颜色）
                        this.isActive = i + 1;
                    }
                    // 封装卡片数组
                    this.cardList.push({
                        bgUrl: require("../../assets/images/vip/b" + (i + 1) + ".png"),
                        isCardVisible: tmp[i].flag == 1 ? true : false,
                        type: tmp[i].name,
                        labels: tmp[i].remark,
                        logoSrc: baseCpid == 1 ? require("../../assets/images/vip/logo.png") :  require("../../assets/images/vip/logoHy.png")
                    });
                    // 封装tab点击数组
                    this.tabList.push({
                        imgSrc: require("../../assets/images/vip/v" + (i + 1) + ".png"),
                        grade: tmp[i].grade,
                        cardType: tmp[i].card,
                        flag: tmp[i].flag == 1 ? true : false,
                        flagText: tmp[i].flag == 1 ? '(当前卡类型)' : '',
                        flagSrc: tmp[i].flag == 1 ? require('../../assets/images/member/jibie.png') : ''
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
                        user_activity: tmp[i].user_activity, // 收费会员活动
                        breakfast:tmp[i].breakfast          //免费早餐
                    });
                }
            }
        });
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
        },
        upMemberBtn(){
            this.$router.push({path:'/upMember'});
        }
    }
};
</script>

<style lang="less" scoped>
    @import './vip.less';
</style>