<template>
	<div id="app">
		<loading v-if="$store.state.loading"></loading>
		<router-view></router-view>
	</div>
</template>

<script>
</script>

<style>
</style>