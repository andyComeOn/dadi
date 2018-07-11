<template>
	<div class="search-result">
		<searchbar 
            v-bind:citySelectVal="citySelectValFun" 
            :city="urlGetInfo.city" 
            :startDate="urlGetInfo.startDate"
            :endDate="urlGetInfo.endDate"
            :word="urlGetInfo.word"></searchbar>
		<sortbar></sortbar>
		<!-- <div @click="watchObj.flag=!watchObj.flag">btn</div> -->
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
import {getUrlParam} from "../../utils/util";

export default {
    name: "search-result",
    components: {
        roomItem,
        searchbar,
        sortbar,
        refreshbar,
        noSearchResult
    },
    props:{

    },
    data() {
        return {
            urlGetInfo:{
                city:decodeURI(getUrlParam("city")),
                startDate: getUrlParam("startDate"),
                endDate:getUrlParam("endDate"),
                word:getUrlParam("word")
            },
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
    created() {
        
    },
    mounted() {
        // this.roomList = data.list;
        console.log(this.urlGetInfo.city);
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