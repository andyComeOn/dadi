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
					<span class="weui-cell__ft"></span>
				</router-link>
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

		<!-- 我的问题的list -->
		<div class="weui-panel">
			<div class="weui-panel__bd">
				<div class="weui-media-box weui-media-box_small-appmsg">
					<div class="weui-cells">
						<!-- 推荐好友拿奖金 -->
						<div class="weui-cell weui-cell_access" @click="recommendFriend">
							<div class="weui-cell__hd"><img src="../../assets/images/my/my_tuijian.png" alt="" style="width:22px;margin-right:5px;display:block"></div>
							<div class="weui-cell__bd weui-cell_primary">
								<p>推荐好友拿奖金</p>
							</div>
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
		<mTabbarfa></mTabbarfa>
	</div>
</template>
<script>
    import mTabbarfa from "@/components/tabbarfa";
    import { userInfo } from "@/api/api";
    export default {
        name: "mine",
        components: {
            mTabbarfa
        },
        data() {
            return {
                userInfoData : {}
            };
        },
        methods: {
            //推荐好友拿奖励
            recommendFriend(){
                this.$router.push({path:'/recommendF?nikeName=' + this.userInfoData.nickname})
            }
        },
        mounted(){
            this.$http({
                method: "POST",
                url: userInfo,
                data: {}
            }).then(res => {
                if (res.data.status == 1){
                    console.log(res);
                    this.userInfoData = res.data.data;
                }
            });
        }
    };
</script>
<style lang="less" scoped>
    @import "../../assets/less/var.less";
    .mine {
        .weui-media-box {
            .weui-cell__ft {
                padding-right: 13px;
                position: relative;
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

        // 我的上面的个人icon的样式
        .mine-info-media-box {
            padding: 33px 15px;
            color: #fff;
            background: url("../../assets/images/bg/bg_my.jpg") no-repeat center
                center;
            background-size: 100% 100%;
            .mine-info-media-box__hd {
                width: 44px;
                height: 44px;
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
                    font-size: 16px;
                    line-height: 22px;
                    margin-bottom: 4px;
                }
                .mine-info-media-box__desc {
                    line-height: 16px;
                    font-size: 12px;
                    color: #fff;
                }
            }
        }

        // 订单进行中和完成
        .order-ing-ed {
            padding: 17px 0;
            margin-bottom: 10px;
            background: #ffffff;
            .lf,
            .rg {
                width: 50%;
                height: 26px;
                float: left;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                .icon {
                    width: 26px;
                    height: 26px;
                    margin-right: 10px;
                    img {
                        width: 26px;
                        height: 26px;
                    }
                }
                span {
                    height: 26px;
                    line-height: 26px;
                    color: #666;
                    font-size: 12px;
                }
            }
        }
    }
</style>