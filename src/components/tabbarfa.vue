<template>
	<m-tabbar v-model="select">
		<m-tabbar-item id='Index' isRouter>
			<img src="../assets/images/ic_tab_home_normal.png" alt="" slot="icon-normal">
			<img src="../assets/images/ic_tab_home_active.png" alt="" slot="icon-active"> 首页
		</m-tabbar-item>
		<m-tabbar-item id='Nearby' isRouter>
			<img src="../assets/images/ic_tab_subject_normal.png" alt="" slot="icon-normal">
			<img src="../assets/images/ic_tab_subject_active.png" alt="" slot="icon-active"> 附近的酒店
		</m-tabbar-item>
		<m-tabbar-item id='Mine' isRouter>
			<img src="../assets/images/ic_tab_profile_normal.png" alt="" slot="icon-normal">
			<img src="../assets/images/ic_tab_profile_active.png" alt="" slot="icon-active"> 我的
		</m-tabbar-item>
	</m-tabbar>

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
				select: "Index"
			}
		}
	}
</script>

<style>
</style>