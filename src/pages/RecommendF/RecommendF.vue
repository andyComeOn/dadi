<template>
    <div class="recommendfPage">
        <!-- toast提示 -->
        <div id="orderListToast" v-show="loading">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">{{loadingTxt}}</p>
            </div>
        </div>
        <!-- 主内容区 -->
        <div class="page-content">
            <!-- 个人info -->
            <div class="mine-info">
                <div class="weui-panel__bd mine-info-panel__bd">
                    <div class="weui-media-box mine-info-media-box weui-media-box_appmsg">
                        <div class="weui-media-box__hd mine-info-media-box__hd">
                            <img v-if="avatar_head !=''" class="weui-media-box__thumb mine-info-media-box__thumb" :src="avatar_head" alt="" />
                            <img v-else class="weui-media-box__thumb mine-info-media-box__thumb" src="../../assets/images/default_avatar.png" alt="" />
                        </div>

                        <div class="weui-media-box__bd mine-info-media-box__bd">
                            <h4 class="weui-media-box__title mine-info-media-box__title">{{nikeName}}</h4>
                        </div>
                        <router-link to="/rule" class="">
                            <span class="weui-cell__ft">规则</span>
                        </router-link>
                    </div>
                </div>
            </div>
            <!--卡片 -->
            <div class="card-box">
                <div class="box" id="cardBoxContent">
                    <p class="tixian-title">可提现(元)</p>
                    <p class="tixian-num din">{{use_amount}}</p>
                    <ul class="tixian-info">
                        <li class="tixian-get">
                            <span>{{await_amount}}</span>
                            <span>待领取</span>
                        </li>

                        <li class="tixian-praise">
                            <span>{{reward_amount}}</span>
                            <span>累计奖励</span>
                        </li>

                        <li class="tixian-lock">
                            <span>{{freeze_amount}}</span>
                            <span>已冻结</span>
                        </li>
                    </ul>

                    <p @click='extractHash' class="tixian-btn">
                        <span>提现</span>
                        <img src="../../assets/images/arrows/tixian.png" alt="">
                    </p>
                </div>
            </div>
            <!-- 四宫格 -->
            <div class="square-box">
                <ul class="square clearflex">
                    <!-- 跳到奖励明细 -->
                    <router-link to="/praise">
                        <li class="praise">
                            <img src="../../assets/images/distribution/jiangli.png" alt="">
                            <p>奖励明细</p>
                        </li>
                    </router-link>
                    <!-- 跳到提现明细 -->
                    <router-link to="pickCash">
                        <li class="pickCash">
                            <img src="../../assets/images/distribution/jiangli.png" alt="">
                            <p>提现明细</p>
                        </li>
                    </router-link>
                    <!-- 跳到二维码 -->
                    <router-link to="qsPush">
                        <li class="qsPush">
                            <img src="../../assets/images/distribution/tuiguang.png" alt="">
                            <p>点我推广</p>
                        </li>
                    </router-link>
                    <!-- 助力好友 -->
                    <router-link to="helpFriend">
                        <li class="helpFriend">
                            <img src="../../assets/images/distribution/xiaxian.png" alt="">
                            <p>助力好友</p>
                        </li>
                    </router-link>
                </ul>
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
    </div>
</template>
<script>
import { user_distribution } from "../../api/api.js";
import { getCookie } from "../../utils/util.js";
export default {
    name: "recommendfPage",
    components: {},
    data() {
        return {
            use_amount: "", //可提现
            freeze_amount: "", //冻结金额
            reward_amount: "", //累计金额
            await_amount: "", //待领取
            nikeName: "", //昵称
            loading: true,
            loadingTxt: "数据加载中",
            avatar_head: "", //头像
            delayToast: false,
            delayToastTxt: ""
        };
    },
    computed: {},
    methods: {
        extractHash() {
            // if (this.use_amount - 0 == 0) {
            //     this.delayToastTxt = "您的可提现额度为空噢";
            //     this.delayToast = true;
            //     setTimeout(() => {
            //         this.delayToast = false;
            //     }, 1500);
            //     return;
            // }
            this.$router.push({
                path: "/extractMoney?use_amount=" + this.use_amount
            });
        }
    },
    mounted() {
        //头像
        this.avatar_head = decodeURIComponent(getCookie("avatar"));
        //昵称
        this.nikeName = this.$route.query.nikeName;
        this.$http({
            url: user_distribution,
            method: "POST",
            data: {}
        }).then(res => {
            if (res.data.status == 1) {
                this.loading = false;
                this.await_amount = res.data.data.await_amount; //待领取
                this.use_amount = res.data.data.use_amount; //可提现
                this.freeze_amount = res.data.data.freeze_amount; //冻结金额
                this.reward_amount = res.data.data.reward_amount; //累计金额
            } else {
                this.loading = false;
            }
        });
    }
};
</script>
<style lang="less" scoped>

.recommendfPage {
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    overflow: auto;
    bottom: 0;
}
.weui-media-box {
    .weui-cell__ft {
        padding-right: 15px;
        font-size: 12px;
        position: relative;
        color: #333;
        &:after {
            content: " ";
            display: inline-block;
            height: 6px;
            width: 6px;
            border-width: 2px 2px 0 0;
            border-color: #c8c8cd;
            border-style: solid;
            -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
            transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
            position: relative;
            top: -2px;
            position: absolute;
            top: 50%;
            margin-top: -4px;
            right: 2px;
        }
    }
}

.mine-info-media-box {
    .mine-info-media-box__hd {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        margin-right: 10px;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
    .mine-info-media-box__bd {
        .mine-info-media-box__title {
            font-size: 14px;
            color: #333333;
        }
    }
}

// 卡片css
.card-box {
    padding: 0 15px;
    margin-bottom: 50px;
    .box {
        padding: 16px 0;
        // background: url(../../assets/images/distribution/bg_fenxiao.png)
        //     no-repeat center center;

        background: url(../../assets/images/bg/bg_my1.jpg)
            no-repeat center center;
        background-size: 100% 100%;
        position: relative;
        border-radius: 10px;
        color: #fff;
        box-shadow: 0px 9px 20px #fcc77b;
        // 提现标题
        .tixian-title {
            line-height: 13px;
            font-size: 12px;
            margin-bottom: 4px;
            text-align: center;
            margin-bottom: 10px;
        }
        // 提现钱数
        .tixian-num {
            height: 24px;
            line-height: 24px;
            font-size: 24px;
            margin-bottom: 35px;
            letter-spacing: 2px;
            text-align: center;
        }
        // 提现详情
        .tixian-info {
            display: flex;
            flex-direction: row;
            li {
                flex: 1;
                display: flex;
                flex-direction: column;
                color: #fff;
                span {
                    text-align: center;
                    &:nth-child(1) {
                        height: 18px;
                        line-height: 18px;
                        margin-bottom: 5px;
                        font-size: 14px;
                    }
                    &:nth-child(2) {
                        line-height: 16px;
                        font-size: 12px;
                    }
                }
            }
        }
        .tixian-btn {
            position: absolute;
            top: 31px;
            right: 0;
            width: 52px;
            height: 22px;
            line-height: 22px;
            background: linear-gradient(
                -93.8deg,
                rgba(255, 208, 139, 1),
                rgba(255, 255, 255, 0.37)
            );
            border-radius: 11px 0px 0px 11px;
            padding-left: 10px;
            img {
                width: 6px;
                height: 9px;
                display: block;
                position: absolute;
                top: 50%;
                right: 7px;
                margin-top: -3px;
            }
            span {
                font-size: 12px;
                color: #fff;
            }
        }
    }
}

// 四宫格
.square-box {
    padding: 0 15px;
    .square {
        // height: 160px;
        li {
            float: left;
            width: 50%;
            height: 100px;
            padding: 10px 0 0 0px;
            display: flex;
            flex-direction: column;
            align-items: center;
            img {
                width: 44px;
                height: 44px;
                margin-bottom: 10px;
            }
            p {
                text-align: center;
                color: #666;
                font-size: 12px;
            }
        }
    }
}
.praise {
    border-right: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
}
.pickCash {
    border-bottom: 1px solid #e5e5e5;
}
.qsPush {
    border-right: 1px solid #e5e5e5;
}
.helpFriend {
    border: 0;
}
</style>