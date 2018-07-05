<template>
	<div class="search-container">
		<div class="search-wrapper">
			<div class="city">北京</div>
			<span class="stick">|</span>
			<div class="date-wrapper">
				<div class="date-area">
					<span class="start">02-26</span><br>
					<span class="end">02-27</span>
				</div>
				<div class="date-instro">
					<span>1</span>晚</div>
			</div>
			<span class="stick">|</span>
			<div class="search">
				<input type="text" class="txt" placeholder="酒店位置/商圈">
			</div>
		</div>
	</div>
</template>
<script>
// import '../assets/lib/swiper/js/swiper.js'
export default {
    props: {},
    data() {
        return {};
    },
    mounted() {}
};
</script>
<style lang="less" scoped>
.search-container {
    height: 40px;
    padding: 6px 15px;
    .search-wrapper {
        height: 28px;
        display: flex;
        flex-direction: row;
        background: #f4f4f4;
        color: #666666;
        font-size: 12px;
        .city {
            height: 28px;
            line-height: 28px;
            padding: 0 9px;
        }
        .stick {
            height: 28px;
            line-height: 28px;
        }
        .date-wrapper {
            display: flex;
            flex-direction: row;
            height: 28px;
            padding: 0 9px;
            .date-area {
                font-size: 0;
                margin-right: 9px;
                .start,
                .end {
					line-height: 14px;
					padding: 2px 0;
                    font-size: 10px;
                }
            }
            .date-instro {
                height: 28px;
                line-height: 28px;
            }
        }
        .search {
            flex: 1;
			height: 28px;
			padding: 2px 0;
            .txt {
				// display: block;
				width: 100%;
				height: 24px;
				outline: none;
				border: none;
				background:#f4f4f4;
				padding-left: 9px;

			}
        }
    }
}
</style>