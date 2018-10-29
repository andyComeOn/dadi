<template>
    <div class="mine m-position-ab">
        <div class="weui-panel mine-info">
            <div class="weui-panel__bd mine-info-panel__bd">
                <router-link to="/personalCenter" class="weui-media-box mine-info-media-box weui-media-box_appmsg">
                    <div class="weui-media-box__hd mine-info-media-box__hd">
                        <img v-if='userInfoData.avatar != ""' class="weui-media-box__thumb mine-info-media-box__thumb" :src="userInfoData.avatar" alt="">
                        <img v-else class="weui-media-box__thumb mine-info-media-box__thumb" src="../../assets/images/default_avatar.png" alt="">
                    </div>
                    <div class="weui-media-box__bd mine-info-media-box__bd ">
                        <h4 class="weui-media-box__title mine-info-media-box__title">{{userInfoData.nickname}}</h4>
                        <p class="weui-media-box__desc mine-info-media-box__desc">Lv{{userInfoData.grade}}&nbsp;&nbsp;{{userInfoData.card}}</p>
                    </div>
                    <span class="weui-cell__ft zb-weui-cell__ft"></span>
                </router-link>
                <!-- str -->
                <!-- <ul class="userLists">
                    <li>
                        <router-link :to=" { path: 'orderList', query: { status: 'ing' }}">
                            <dl>
                                <dt>
                                    <img src="../../assets/images/shop/my_jiudian.png" alt="" />
                                </dt>
                                <dd>酒店订单</dd>
                            </dl>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ path:'shopOrder'}">
                            <dl>
                                <dt>
                                    <img src="../../assets/images/shop/my_shangcheng.png" alt="" />
                                </dt>
                                <dd>商城订单</dd>
                            </dl>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{path:'myWallet'}">
                            <dl>
                                <dt>
                                    <img src="../../assets/images/shop/my_qianbao.png" alt="" />
                                </dt>
                                <dd>我的钱包</dd>
                            </dl>
                        </router-link>
                    </li>
                </ul> -->
                <!-- end -->
            </div>
        </div>
        <!-- 进行中订单、已完成订单 -->
        <div class="order-ing-ed clearflex">
            <router-link :to=" { path: 'orderList', query: { status: 'ing' }}">
                <div class="lf">
                    <div class="icon"><img src="../../assets/images/my/my_jinxingzhong.png" alt=""></div>
                    <span>进行中订单</span>
                </div>
            </router-link>
            <router-link :to=" { path: 'orderList', query: { status: 'done' }}">
                <div class="rg">
                    <div class="icon"><img src="../../assets/images/my/my_yiwancheng.png" alt=""></div>
                    <span>已完成订单</span>
                </div>
            </router-link>
        </div>
        
        <!-- 我的问题的list(第二部分) ma-top5 -->
        <div class="weui-panel">
            <div class="weui-panel__bd ">
                <div class="weui-media-box weui-media-box_small-appmsg">
                    <div class="weui-cells">
                        <!-- 推荐好友拿奖金 -->
                        <div v-if="userInfoData.is_distribution==1" class="weui-cell weui-cell_access" @click="recommendFriend">
                            <div class="weui-cell__hd"><img src="../../assets/images/my/my_tuijian.png" alt="" style="width:22px;margin-right:5px;display:block"></div>
                            <div class="weui-cell__bd weui-cell_primary">
                                <p>推荐好友拿奖金</p>
                            </div>
                            <span class="hot"><img src="../../assets/images/icon/ic-hot.png" alt=""></span>
                            <span class="weui-cell__ft"></span>
                        </div>
                        <!-- 我的优惠券 -->
                        <router-link to="/myCoupon" class="weui-cell weui-cell_access">
                            <div class="weui-cell__hd"><img src="../../assets/images/my/my_youhuiquan.png" alt="" style="width:22px;margin-right:5px;display:block"></div>
                            <div class="weui-cell__bd weui-cell_primary">
                                <p>我的优惠券</p>
                            </div>
                            <span class="weui-cell__ft"></span>
                        </router-link>
                        <!-- 我的积分 -->
                        <router-link to="/myPoint" class="weui-cell weui-cell_access">
                            <div class="weui-cell__hd"><img src="../../assets/images/my/my_mycomment.png" alt="" style="width:22px;margin-right:5px;display:block"></div>
                            <div class="weui-cell__bd weui-cell_primary">
                                <p>我的积分</p>
                            </div>
                            <span class="score">{{userInfoData.avail_points}}</span>
                            <span class="weui-cell__ft"></span>
                        </router-link>
                        <!-- 我的收藏 -->
                        <router-link to="/myCollect" class="weui-cell weui-cell_access">
                            <div class="weui-cell__hd"><img src="../../assets/images/my/my_shoucang.png" alt="" style="width:22px;margin-right:5px;display:block"></div>
                            <div class="weui-cell__bd weui-cell_primary">
                                <p>我的收藏</p>
                            </div>
                            <span class="weui-cell__ft"></span>
                        </router-link>
                        <!-- 常用信息 -->
                        <router-link to="/userInfo" class="weui-cell weui-cell_access">
                            <div class="weui-cell__hd"><img src="../../assets/images/my/lianxiren.png" alt="" style="width:22px;margin-right:5px;display:block"></div>
                            <div class="weui-cell__bd weui-cell_primary">
                                <p>常用信息</p>
                            </div>
                            <span class="weui-cell__ft"></span>
                        </router-link>
                        <!-- 收货地址 -->
                        <!-- <router-link to="/takeGoodsAddress" class="weui-cell weui-cell_access">
                            <div class="weui-cell__hd"><img src="../../assets/images/my/my_dizhi.png" alt="" style="width:22px;margin-right:5px;display:block"></div>
                            <div class="weui-cell__bd weui-cell_primary">
                                <p>收货地址</p>
                            </div>
                            <span class="weui-cell__ft"></span>
                        </router-link> -->

                        <!-- 会员特权 -->
                        <router-link to="/vip" class="weui-cell weui-cell_access">
                            <div class="weui-cell__hd"><img src="../../assets/images/my/my_vip.png" alt="" style="width:22px;margin-right:5px;display:block"></div>
                            <div class="weui-cell__bd weui-cell_primary">
                                <p>会员特权</p>
                            </div>
                            <span class="weui-cell__ft"></span>
                        </router-link>
                        <!-- 帮助中心 -->
                        <router-link to="/helpCenter" class="weui-cell weui-cell_access">
                            <div class="weui-cell__hd"><img src="../../assets/images/my/my_help.png" alt="" style="width:22px;margin-right:5px;display:block"></div>
                            <div class="weui-cell__bd weui-cell_primary">
                                <p>帮助中心</p>
                            </div>
                            <span class="weui-cell__ft"></span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <!-- tabbar -->
        <mTabbarfa></mTabbarfa>
        <!-- <shopFooter></shopFooter> -->
    </div>
</template>
<script>
import mTabbarfa from "@/components/tabbarfa";
import shopFooter from "@/components/shop/shopFooter.vue";
import { userInfo } from "@/api/api";

export default {
    name: "mine",
    components: {
        shopFooter,
        mTabbarfa
    },
    data() {
        return {
            userInfoData: {}
        };
    },
    methods: {
        //推荐好友拿奖励
        recommendFriend() {
            this.$router.push({
                path: "/recommendF?nikeName=" + this.userInfoData.nickname
            });
        },
        // 拉取用户信息
        fetchUserInfo() {
            this.$http({
                method: "POST",
                url: userInfo,
                data: {}
            }).then(res => {
                if (res.data.status == 1) {
                    this.userInfoData = res.data.data;
                }
            });
        }
    },
    mounted() {
        this.fetchUserInfo();
    }
};
</script>
<style lang="less" scoped>
@import "../../assets/less/var.less";
@import "./mine.less";
</style>