<template>
	<div class="search-result">
		<searchbar 
            v-bind:citySelectEmit="citySelectValFun" 
            :city="urlGetInfo.city" 
            :startDate="urlGetInfo.startDate"
            :endDate="urlGetInfo.endDate"
            :word="urlGetInfo.word">
        </searchbar>
		<sortbar></sortbar>
		<refreshbar></refreshbar>
		
		<noSearchResult v-show="true"></noSearchResult>
		
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
import {store_list} from '../../api/api';

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
            // 获取路由的参数
            urlGetInfo:{
                city:this.$route.query.city,
                startDate:this.$route.query.startDate,
                endDate:this.$route.query.endDate,
                word:this.$route.query.word,
            },


            watchObj: {
                cpid:'1',
                //正序、降序排列
                type:'',
                // 经度
                longitude:'',
                //维度
                latitude:'',
                //城市
				city:'',
				//排序（价格，距离）
                px_rule:'',
                //门店名称
                name:'',
               


            },
			
			// Object.assign();
        };
    },
    created() {
        
    },
    mounted() {
        // this.roomList = data.list;
        // console.log(this.urlGetInfo);
        var param = {
            cpid:1,
        }
        this.fetchData(param);
    },
    methods: {
        
        // 加载数据
        fetchData(param) {
            this.$http({
                method: "POST",
                url: store_list,
                data: param
            }).then(res => {
                console.log(res);
            });
        },

        // 子组件emit的方法-城市选择
		citySelectValFun(val){
			this.watchObj.city = val;
			
		}
    }
};
</script>

<style lang="less" scoped>

</style>