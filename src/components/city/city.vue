
<template>
	<div class="city-wendor m-position-ab">
		<!-- <mt-search v-model="value"></mt-search> -->
		<div class="city-title"><div class="lf" @click="cityTitleBackfun">返回</div>请选择城市</div>
		<div class="city-content">
			<div class="city-head">搜索条</div>
			<div class="city-body">
				<!-- 定位城市和热门城市 -->
				<div class="location-hot">
					<ul class="location">
						<h4>定位城市</h4>
						<li><span>北京</span></li>
					</ul>
					<ul class="hot">
						<h4>热门城市</h4>
						<li><span>北京</span><span>天津</span></li>
					</ul>
				</div>
				
				<!-- 城市列表 -->
				<ul class="list">
					<li>北京</li>
					<li>天津</li>
					<li>北京</li>
					<li>天津</li>
					<li>北京</li>
					<li>天津</li>
					<li>北京</li>
					<li>天津</li>
				</ul>
			</div>
		</div>

	</div>
</template>
<script>
import {getStorecity} from '@/api/api';
export default {
    data() {
        return {
			value: '',
			cityList: []  //拉去城市的信息
        };
    },
    props: {},
    created() {
		this.fetchCityInfo();
	},
    methods: {
		// 城市组件点击返回
		cityTitleBackfun(){
			this.$emit('cityTitleBackEmit');
		},

		// 
		//获取有效的城市详情
        fetchCityInfo(){
            var param = {cpid:1}
            this.$http({
                method: "POST",
                url: getStorecity,
                data:param
            }).then(res => {
                this.cityList = res.data.data;
            });
        },


	},
    mounted() {},
    watch: {}
};
</script>

<style lang="less" scoped>
.city-wendor {
	padding-top: 44px;
	.city-title {
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 2;
		padding: 0 15px;
		height: 44px;
		line-height: 44px;
		text-align: center;
		background: #ccc;
		.lf {
			float: left;
		}
	}
	.city-content{
		.city-head{
			height: 40px;
			padding: 6px 15px;
			background: #F4F4F4;
			font-size: 14px; 
			text-align: center;
		}
		.city-body{
			font-size: 14px; 
			.location-hot {
				padding: 0 15px 10px;
				color: #666;
				h4{
					height: 16px;
					line-height: 16px;
					margin: 10px 0;
					font-size: 12px;
					font-weight: 400;
					
				}
				li{
					&::after{
						content: '';
						display: table;
						clear: both;
					}
					span{
						width: 75px;
						line-height: 27px;
						text-align: center;
						margin: 0 10px 10px 0;
						float: left;
						border-radius: 2px; 
						background: #fff;
					}
				}
				
			}
			.list {
				background: #fff;
				padding:0 15px;
				li{
					line-height: 40px;
					color: #333;
					position: relative;
					&::after{
						content: '';
						width:100%;
						position: absolute;
						height: 1px;
						left: 0;
						bottom: 0;
						background: #E5E5E5;
						transform: scaleY(0.5);
					}

				}
			}
		}
	}
}
	
</style>