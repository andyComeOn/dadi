<template>
	<div class="search-result">
		<!-- <div></div>
		北京 02-26 02-27 1晚  -->
		<searchbar></searchbar>
	
		<roomItem></roomItem>

	</div>
</template>

<script>
	import mHotelLocation from '../../components/hotel-location'
	import roomItem from '../../components/room-item'
	import searchbar from '../../components/searchbar'
	
	export default {
		name: 'nearby',
		components: {
			roomItem,
			searchbar
		},

	}
</script>

<style lang="less">
</style>