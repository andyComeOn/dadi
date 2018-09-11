<template>
	<div class="my-point-page">
		<!-- head -->
		<div class="head">
			<p class="num">{{sum_num}}</p>
			<p class="intro">当前总积分</p>
		</div>
		<!-- body -->
		<ul class="body">
			<li v-for="(item,index) in pointArr" :key="index">
				<div class="lf">
					<p class="jifen-type">{{item.store_name}}</p>
					<p class="jifen-date">{{item.add_time}}</p>
				</div>
				<div class="rg">+{{item.score}}</div>
			</li>
		</ul>
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
	import {integral_detail} from '@/api/api';
	export default {
		name: "my-point-page",
		components: {
			
		},
		data(){
			return {
				sum_num:'',		//总积分
				pointArr:[],	//积分列表
				toash_show:true,		//
			}
		},
		methods:{
			
		},
		mounted(){
			var param = {
                // cpid:1
            };
            this.$http({
                method: "POST",
                url: integral_detail,
                data: param
            }).then(res => {
				console.log(res);
				if(res.data.status == 1){
					this.toash_show = false;
					this.sum_num = res.data.data.avail_points;
					this.pointArr = res.data.data.credit_log;
				}else{
					this.toash_show = false;
				}
				
            });
		}
	};
</script>
<style lang="less" scoped>
	.my-point-page{
		.head{
			width: 100%;
			height: 80px;
			background: url('../../assets/images/bg/bg-jifenmignxi.png') no-repeat center center;
			padding-top:18px; 
			color:#fff;
			text-align: center;
			.num{
				font-size:24px;
				line-height:28px;
				margin-bottom: 2px; 
			}
			.intro{

				line-height:16px;
				font-size:12px;
			}
		}
		.body{
			padding: 0 15px;
			li{
				position: relative;
				display: flex;
				flex-direction: row;
				height: 60px;
				&::after{
					content: "";
					position: absolute;
					height: 1px;
					left: 0;
					right: 0;
					bottom:0;
					background: #e5e5e5;
					transform: scaleY(0.5);

				}
				.lf{
					flex: 1;
					height: 60px;
					display: flex;
					flex-direction: column;
					// align-items: center;
					.jifen-type{
						color: #666;
						margin: 12px 0 6px 0;
						font-size: 15px;
						line-height:16px; 
					}
					.jifen-date{
						color: #999;
					}

				}
				.rg{
					width: 40px;
					height: 60px;
					line-height: 60px;
					text-align: right;
					font-weight: 600;
					color: #FFBA56;
					
				}
			}
		}
	}
</style>