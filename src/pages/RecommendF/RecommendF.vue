<template>
	<div class="recommend-f-page">
		<!-- 头部 -->
		<!-- <m-header title="推荐好友" fixed class="is-fixed" leftShow>
			<a href="javascript:;" slot="left">
				<img class="m-icon-img margin-right-10" src="../../assets/images/bak/ic_actionbar_search_icon.png" />
			</a>
			<a href="javascript:;" slot="right">
				<img class="m-icon-img" src="../../assets/images/bak/ic_chat_green.png" />
			</a>
		</m-header> -->
		<!-- 主内容区 -->
		<div class="page-content">
			<!-- 个人info -->
			<div class="mine-info">
				<div class="weui-panel__bd mine-info-panel__bd">
					<div class="weui-media-box mine-info-media-box weui-media-box_appmsg">
						<div class="weui-media-box__hd mine-info-media-box__hd">
							<img class="weui-media-box__thumb mine-info-media-box__thumb" src="../../assets/images/166_146_3.png" alt="">
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
				<div class="box">
					<p class="tixian-title">可提现(元)</p>
					<p class="tixian-num">{{use_amount}}</p>
					<ul class="tixian-info">
						<li class="tixian-get">待领取{{await_amount}}</li>
						累计奖励{{reward_amount}}
						<li class="tixian-lock">已冻结{{freeze_amount}}</li>
					</ul>
					<!-- <router-link to="/extractMoney"> -->
					<p @click='extractHash' class="tixian-btn">
						<span>提现</span>
						<img src="../../assets/images/arrows/list－更多icon@1x.png" alt="">
					</p>
					<!-- </router-link> -->
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
        <!-- toast提示 -->
        <div id="orderListToast" v-if='toash_show == true'>
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">数据加载中</p>
            </div>
        </div>
	</div>
</template>
<script>
	import {user_distribution} from '../../api/api.js';
 	export default {
		name: "recommend-f",
		components: {

		},
		data(){
			return{
				use_amount:'',		//可提现
				freeze_amount:'',	//冻结金额
				reward_amount:'',	//累计金额
				await_amount:'',	//待领取
                nikeName:'',		//昵称
                toash_show:true     //loadingShow
			}
		},
		computed: {

		},
		methods: {
			extractHash(){
				this.$router.push({path:'/extractMoney?use_amount=' + this.use_amount});
			}
		},
		mounted() {
			//昵称
			this.nikeName = this.$route.query.nikeName;
			var param = {
				
			};
			this.$http({
				url:user_distribution,
				method:'POST',
				data:param
			}).then((res)=>{
				// console.log(res);
				if(res.data.status == 1){
                    this.toash_show = false;
					this.await_amount = res.data.data.await_amount;		//待领取
					this.use_amount = res.data.data.use_amount;			//可提现
					this.freeze_amount = res.data.data.freeze_amount;	//冻结金额
					this.reward_amount = res.data.data.reward_amount;	//累计金额
				}else{
                    this.toash_show = false;
				}
			});
		}
	};

</script>
<style lang="less" scoped>
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
        padding: 20px 15px 0;
        height: 128px;
        background: url(../../assets/images/distribution/bg_fenxiao.png)
            no-repeat center center;
        background-size: 100% 128px;
        position: relative;
        border-radius: 10px;
        color: #fff;
        // 提现标题
        .tixian-title {
            line-height: 14px;
            font-size: 12px;
            margin-bottom: 10px;
        }
        // 提现钱数
        .tixian-num {
            line-height: 24px;
            font-size: 24px;
            margin-bottom: 20px;
            letter-spacing: 2px;
        }
        // 提现详情
        .tixian-info {
            height: 14px;
            line-height: 14px;
            font-size: 12px;
            text-align: center;
            .tixian-get {
                float: left;
            }
            .tixian-lock {
                float: right;
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