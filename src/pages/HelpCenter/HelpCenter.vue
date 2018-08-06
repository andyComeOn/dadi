<template>
	<div class="help-center-page m-position-ab">
		<div class="weui-panel">
			<div class="weui-panel__bd">
				<div class="weui-media-box weui-media-box_small-appmsg">
					<div class="weui-cells">
						<template v-for="(item,index) in list">
							<span class="item" @click="operaFolder(index)" :key="index" :class="{isActive:item.showParagraph}">
								<a class="weui-cell weui-cell_access" href="javascript:;">
									<div class="weui-cell__hd"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=" alt="" style="width:20px;margin-right:5px;display:block"></div>
									<div class="weui-cell__bd weui-cell_primary">
										<p>{{item.title}}</p>
									</div>
									<span class="weui-cell__ft"></span>
									
								</a>
								<transition name="fade" mode="out-in">
									<div class="context-box" v-show="item.showParagraph">
										<div class="context">{{item.context}}</div>
									</div>
								</transition>
							</span>
						</template>
					</div>
				</div>
			</div>
		</div>	
	</div>

</template>

<script>
export default {
    name: "help-center-page",
	components: {},
	data(){
		return {
			isFolder : 0,

			list:[
				{
					title:'我的积分该如何兑换？',
					showParagraph:false,
					context:'京东商城高度重视并表示：“我们认真接受批评，将在全公司范围内深入检讨和自查自纠，加强审核团队建设，落实审查管理职责，切实履行网站主体责任。'
				},
				{
					title:'如何成为会员？',
					showParagraph:false,
					context:'京东商城高度重视并表示：“我们认真接受批评，将在全公司范围内深入检讨和自查自纠，加强审核团队建设，落实审查管理职责，切实履行网站主体责任。'
				},
				{
					title:'如何取消订单？',
					showParagraph:false,
					context:'京东商城高度重视并表示：“我们认真接受批评，将在全公司范围内深入检讨和自查自纠，加强审核团队建设。'
				},
				{
					title:'优惠券的使用有什么限制？',
					showParagraph:false,
					context:'这是文字这是文字这是文字这是文字'
				},
				{
					title:'一般提前多久预订房间性价比比较高？',
					showParagraph:false,
					context:'这是文字这是文字这是文字这是文字'
				}
				

			]
		}
	},
	created() {
		
	},
	methods:{
		operaFolder(index){
			var tmp = this.list;
			tmp[index].showParagraph = !tmp[index].showParagraph;
			this.list = tmp;
		}
	}
};
</script>

<style lang="less" scoped>
.help-center-page {
	.weui-cell__ft {

	}
	.isActive {
		.weui-cell__ft{
			&::after{
				// border-color: #d61648;
			}
			
		}
	}
	.context-box{
		padding: 0 15px;
		.context{
			padding: 12px;
			background: #F9F9F9;
			color: #666;
			font-size: 14px;
			line-height: 20px;
		}
	}
}
</style>