<template>
	<div>
		<!-- swiper -->
		<m-swipe swipeid="swipeHotelDetail" :autoplay="0" paginationDirection="right">
			<div class="swiper-slide " slot="swiper-con">
				<img src="../../assets/images/banner/01.jpg" alt="">
			</div>
			<div class="swiper-slide " slot="swiper-con"><img src="../../assets/images/banner/02.jpg" alt=""></div>
			<div class="swiper-slide " slot="swiper-con"><img src="../../assets/images/banner/03.jpg" alt=""></div>
		</m-swipe>
		<mHotelLocation></mHotelLocation>
		<membershipRights></membershipRights>
		<reserveItem></reserveItem>

	</div>
</template>

<script>
import mSwipe from "../../components/swipe";
import mHotelLocation from "../../components/hotel-location";
import membershipRights from "../../components/membership-rights";
import reserveItem from "../../components/reserve-item";
export default {
    name: "hotel-detail",
    components: {
        mSwipe,
        mHotelLocation,
        membershipRights,
        reserveItem
    }
};
</script>

<style lang="less">
</style>