<template>
	<div class="search-result">
		<searchbar v-bind:citySelectVal="citySelectValFun"></searchbar>
		<sortbar></sortbar>
		<div @click="watchObj.flag=!watchObj.flag">btn</div>
		<refreshbar></refreshbar>
		<div class="">
			<noSearchResult></noSearchResult>
		</div>
		<roomItem :condition="watchObj"></roomItem>
	</div>
</template>

<script>
import mHotelLocation from "../../components/hotel-location";
import roomItem from "../../components/room-item";
import searchbar from "../../components/searchbar";
import sortbar from "../../components/sortbar";
import refreshbar from "../../components/refresh-bar";
import noSearchResult from "../../components/no-search-result";

export default {
    name: "search-result",
    components: {
        roomItem,
        searchbar,
        sortbar,
        refreshbar,
        noSearchResult
    },
    data() {
        return {
            watchObj: {
                flag: true,
				searchForm:{city:''},
				sortForm:{},
				refreshForm:{}


            },
			roomList: [{}, {}]
			// Object.assign();
        };
    },
    mounted() {
        // this.roomList = data.list;
    },
    methods: {
        fu() {
            alert(0);
		},
		citySelectValFun(val){
			this.watchObj.searchForm.city = val;
			console.log(val);
		}
    }
};
</script>

<style lang="less" scoped>

</style>