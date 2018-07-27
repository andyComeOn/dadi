
<template>
	<div class="search-wendor">
		<div class="search-input-box">
			<div class="input-box">
				<input type="text" class="txt" 
					
					v-model="searchInputVal"
					placeholder="请输入区域／商圈／位置">
			</div>
			<div class="cancel" @click="cancelSearch">取消</div>
		</div>
		<div class="search-content">
			{{searchInputVal}}
		</div>
	</div>
</template>
<script>
import {getStorecity} from '@/api/api';
export default {
    data() {
        return {
			searchInputVal:''
        };
    },
    props: {},
    created() {
		// this.fetchCityInfo();
	},
    methods: {
		// 城市组件点击返回
		cityTitleBackfun(){
			this.$emit('cityTitleBackEmit');
		},

		

		// 取消搜索
		cancelSearch(){
			this.$emit('cancelSearchEmit');
		}
	},
    mounted() {},
    watch: {}
};
</script>

<style lang="less" scoped>

.search-wendor {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.45);
	z-index: 2;
	.search-input-box {
		height: 40px;
		padding: 5px 15px;
		display: flex;
		flex-direction: row;
		background: #ffffff;
		font-size: 14px;
		.input-box {
			flex: 1;
			height: 30px;
			padding-left: 30px;
			border-radius:3px 0 0 3px;
			background: url('../../assets/images/search.png')  no-repeat 6px center; 
			background-color: #F4F4F4; 
			background-size:16px 16px;
			.txt{
				width: 100%;
				display: block;
				height: 30px;
				outline: none;
				border: none;
				background: #F4F4F4;
				color: #999;
				border-radius: 0 3px 3px 0; 
			}
		}
		.cancel{
			width: 42px;
			height: 30px;
			line-height: 30px;
			color: #007AFF;
			text-align: right;
		}
		

	}
}
	
</style>