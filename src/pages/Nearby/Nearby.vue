<template>
	<div>
		<m-header title="附近的酒店" fixed>
			<a href="javascript:;" slot="left">
				<img class="m-icon-img margin-right-10" src="../../assets/images/ic_actionbar_search_icon.png" />
			</a>
			<div class="m-header-button is-right" rightShow="true">
			
			
				<a href="javascript:;" slot="right">
					<img class="m-icon-img" src="../../assets/images/ic_chat_green.png" />
				</a>
			</div>
		</m-header>
		<mTabbarfa></mTabbarfa>
	</div>
</template>

<script>
import mTabbarfa from "../../components/tabbarfa";
import mHeader from "../../components/header";

export default {
    name: "nearby",
    components: {
        mTabbarfa,
        mHeader
    }
};
</script>


<style lang="less">
</style>