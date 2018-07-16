<template>
	<div class="nearby-page">
		<!-- 头部 -->
		<m-header title="附近的酒店" fixed class="is-fixed">
			<a href="javascript:;" slot="left">
				<img class="m-icon-img margin-right-10" src="../../assets/images/bak/ic_actionbar_search_icon.png" />
			</a>
			<a href="javascript:;" slot="right">
				<img class="m-icon-img" src="../../assets/images/bak/ic_chat_green.png" />
			</a>
		</m-header>

		<!-- 主内容区 -->
		<div class="page-content">
			<!-- 搜素条 -->
			<!-- <searchbar city="北京"></searchbar> -->
			<searchbar 
				v-on:citySelectEmit="citySelectValFun" 
				city="北京" 
				:startDate="this.dateStartInitVal"
				:endDate="this.dateEndInitVal"
				:word="this.watchObj.name">
			</searchbar>

			<!-- 当前位置 -->
			<refreshbar v-show="isShow"></refreshbar>

			

			<!-- 房间的list -->
			<roomItem v-bind:condition="this.watchObj"></roomItem>
			
		</div>
		
		<!-- tabbar -->
		<mTabbarfa></mTabbarfa>
	</div>
</template>

<script>

import mHeader from "@/components/header";  //引入头
import searchbar from "@/components/searchbar"; //引入搜索条
import refreshbar from "@/components/refresh-bar"; //引入刷新条
import mTabbarfa from "@/components/tabbarfa"; //引入底部的tabbar
import roomItem from "@/components/room-item";  //引入房间组件
import {formateToday,formateTomorrow,formatePara} from '@/utils/date'; // 引入日期封装



export default {
    name: "nearby",
    components: {
        mTabbarfa,
		mHeader,
		searchbar,
		refreshbar,
		roomItem
	},
	data(){
		return {
			isShow: true,
			watchObj: {
				cpid:'1',
				city:'1',
				name:'',
				
			},
			dateStartInitVal : formateToday(),
			dateEndInitVal : formateTomorrow(),
		}
	},
	created() {
		
	},
	mounted() {
		
	},
	methods:{
		// 子组件emit的方法-城市选择
		citySelectValFun(id, name){
            console.log(id, name);
            this.watchObj.city = id;
		}
	}
};
</script>


<style lang="less">
	.is-fixed ~ .page-content {
		padding-top: 44px;
		padding-bottom: 50px;
		height: 100%;
	}
</style>