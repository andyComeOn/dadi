<template>
	<div class="detail">
		<div class="name">秋果酒店交通大学店</div>
		<ul class="location-wrapper">
			<li class="location">海淀区交通大学路上园村甲4号</li>
			<li class="location-info">距离西直门地铁站0.3公里，步行至此0.3公里，约6分钟</li>
		</ul>
	</div>
</template>

<script>
export default {
    name: "nearby",
    components: {}
};
</script>

<style lang="less" scoped>
.detail {
    padding: 10px 15px;
    position: relative;
    &:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 1px;
        background: #e5e5e5;
        transform: scaleY(0.5);
    }

    .name {
        height: 22px;
        line-height: 22px;
        font-size: 16px;
        color: #333333;
        letter-spacing: 0;
    }

    .location-wrapper {
        width: 100%;
        padding-left: 22px;
        background: url("../assets/images/hotel-label/ic_dingwei.png") no-repeat
            3px 3px;
        background-size: 13px 15px;
    }
}
</style>