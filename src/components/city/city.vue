
<template>
	<div class="city-wendor">
		<mt-search v-model="value"></mt-search>
	</div>
</template>
<script>

export default {
    data() {
        return {
			value: ''
        };
    },
    props: {},
    created() {},
    methods: {},
    mounted() {},
    watch: {}
};
</script>

<style lang="less">
	.mint-search{
		height: auto;
		background: #fff;
		.mint-searchbar {
			padding: 6px 15px;
			background: #fff!important;
		}
	}
	
	.mint-searchbar-inner {
		background-color: #F4F4F4;
	}
</style>