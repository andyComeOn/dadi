<template>
	<div class="tabbarfa">
		<m-tabbar v-model="select">
			<m-tabbar-item id='index' isRouter>
				<img src="../assets/images/tabbar/ic_tab_home_normal.png" alt="" slot="icon-normal">
				<img src="../assets/images/tabbar/ic_tab_home_active.png" alt="" slot="icon-active"> 首页
			</m-tabbar-item>
			<m-tabbar-item id='nearby' isRouter>
				<img src="../assets/images/tabbar/ic_tab_nearby_normal.png" alt="" slot="icon-normal">
				<img src="../assets/images/tabbar/ic_tab_nearby_active.png" alt="" slot="icon-active"> 附近的酒店
			</m-tabbar-item>
			<m-tabbar-item id='mine' isRouter>
				<img src="../assets/images/tabbar/ic_tab_mine_normal.png" alt="" slot="icon-normal">
				<img src="../assets/images/tabbar/ic_tab_mine_active.png" alt="" slot="icon-active"> 我的
			</m-tabbar-item>
		</m-tabbar>
	</div>

</template>

<script>
	import mTabbar from './tabbar'
	import mTabbarItem from './tabbar-item'
	export default {
		name: 'tabbarfa',
		components: {
			mTabbar,
			mTabbarItem
		},
		data() {
			return {
				select: "index"
			}
		}
	}
</script>

<style lang="less" scoped>
	.tabbarfa {
		position: fixed;
		z-index: 6;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 50px;
	}
</style>
