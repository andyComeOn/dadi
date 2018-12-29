<template>
	<div id="myPointPage" class="m-position-ab">
		<!-- toast提示 -->
		<div v-show="loading">
			<div class="weui-mask_transparent"></div>
			<div class="weui-toast">
				<i class="weui-loading weui-icon_toast"></i>
				<p class="weui-toast__content">数据加载中</p>
			</div>
		</div>
		<!-- 主内容 -->
		<div v-if="myScore" class="content">
			<div class="broadcast" v-show="isTip">
                <span class="broadcast-icon"></span>
				订单完成7日内，审核通过生成积分
				<span class="broadcast-btn" @click="close"></span>
			</div>
			<div class="head">
				<p class="num">{{myScore}}</p>
				<p class="intro">当前总积分</p>
			</div>
			<ul class="body">
				<li v-for="(item,index) in pointArr" :key="index">
                    <div class="lf">
						<h3 class="scoreType m-ellipsis" v-if="item.store_name == null">{{item.shop_name}}</h3>
                        <h3 class="scoreType m-ellipsis" v-else>{{item.store_name}}</h3>
						<p class="scoreDate">{{item.add_time}}</p>
					</div>
					<div class="rg" v-html="$options.filters.filterScoreType(item.score)"></div>
				</li>
			</ul>
		</div>
		<!-- 暂无积分 -->
		<div v-else class="no-score">
			<img src="../../assets/images/404/404-score.png" alt="">
			<p>暂无积分</p>
		</div>
	</div>
</template>
<script>
import { integral_detail } from "@/api/api";
export default {
    name: "myPointPage",
    components: {},
    data() {
        return {
            myScore: "", //总积分
            pointArr: [], //积分列表
			loading: true ,
			isTip : true,
        };
    },
    mounted() {
		this.fetchData();
	},
    methods: {
        fetchData() {
            this.$http({
                method: "POST",
                url: integral_detail,
                data: {}
            }).then(res => {
                if (res.data.status == 1) {
                    this.loading = false;
                    this.myScore = res.data.data.avail_points;
                    this.pointArr = res.data.data.credit_log;
                } else {
                    this.loading = false;
                }
            });
		},
		close(){
			this.isTip = false;
		}
    }
};
</script>
<style lang="less" scoped>
#myPointPage {
    overflow: auto;
}
.broadcast {
	line-height: 36px;
    background:rgba(253,252,236,1);
    padding: 0 15px 0 34px;
    position: relative;
    color: #F86E21;
    font-size: 14px;
    .broadcast-icon {
        width: 16px;
		height: 16px;
		position: absolute;
		left: 15px;
        top: 10px;
        background: url("../../assets/images/icon/ic-broadcast.png") no-repeat
		center center;
		background-size: 100% 100%; 
    }
	.broadcast-btn {
		width: 24px;
		height: 24px;
		position: absolute;
		right: 7px;
		top: 6px;
		background: url("../../assets/images/icon/ic-close-score.png") no-repeat
		center center;
		background-size: 100% 100%; 
	}
}
.head {
    width: 100%;
    height: 80px;
    background: url("../../assets/images/bg/bg-jifenmignxi.png") no-repeat
        center center;
    padding-top: 18px;
    color: #fff;
    text-align: center;
    .num {
        font-size: 24px;
        line-height: 28px;
        margin-bottom: 2px;
    }
    .intro {
        line-height: 16px;
        font-size: 12px;
    }
}
.body {
    background: #fff;
    padding: 0 15px;
    li {
        height: 60px;
        position: relative;
        display: flex;
        flex-direction: row;
        padding: 10px 0; 
        &::after {
            content: "";
            position: absolute;
            height: 1px;
            left: 0;
            right: 0;
            bottom: 0;
            background: #e5e5e5;
            transform-origin: 0 0; 
            transform: scaleY(0.5);
        }
        &:nth-last-of-type(1) {
            &::after {
                height: 0;
            }
        }
        .lf {
            flex: 1;
            overflow: hidden;
            .scoreType {
                height: 15px;
                line-height: 15px;
                margin-bottom: 10px;
                font-size: 15px;
                font-weight:400;
                color: #666;
            }
            .scoreDate {
                height: 12px;
                line-height: 12px;
                font-size: 12px;
                font-weight:400;
                color: #999;
            }
        }
        .rg {
            height: 40px;
            line-height: 40px;
            span {
                display: inline-block;
                font-size: 12px;
                letter-spacing: 2px;
                font-weight: 400;
            }
        }
    }
}
// -------------------无积分--------------------
.no-score {
    margin-top: 170px;
    img {
        display: block;
        width: 152px;
        height: 108px;
        margin: 0 auto;
    }
    p {
        line-height: 20px;
        font-size: 14px;
        color: #666;
        text-align: center;
    }
}
</style>