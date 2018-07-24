<template>
	<div class="search-result">
        <!-- 搜索条 -->
		<searchbar 
            v-on:citySelectEmit="citySelectValFun" 
            v-on:triggerCityDialogEmit="triggerCityDialogFun"
            :city="urlGetInfo.city" 
            :startDate="urlGetInfo.startDate"
            :endDate="urlGetInfo.endDate"
            :word="urlGetInfo.word">
        </searchbar>
		<sortbar></sortbar>
		<refreshbar></refreshbar>
		
		<noSearchResult v-show="true"></noSearchResult>
		
		<roomItem v-bind:condition="this.watchObj"></roomItem>

        <!-- 城市dialog -->
        <mu-dialog width="360" transition="slide-right" fullscreen :open.sync="zbCityVisible">
            <!-- <div>9090909</div> -->

            <City v-on:cityTitleBackEmit="cityTitleBackEmitFun"></City>
        </mu-dialog>

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
import City from '@/components/city/city.vue';

export default {
    name: "search-result",
    components: {
        roomItem,
        searchbar,
        sortbar,
        refreshbar,
        noSearchResult,
        City
    },
    props:{

    },
    data() {
        return {
            // 获取路由传过来的参数
            urlGetInfo:{
                city:this.$route.query.city,
                startDate:this.$route.query.startDate,
                endDate:this.$route.query.endDate,
                word:this.$route.query.word,
            },

            // 监听数据的变化，用来筛选满足条件的酒店列表
            watchObj: {
                cpid:'1',
                //正序、降序排列
                //type:'',
                // 经度
                //longitude:'',
                //维度
                //latitude:'',
                //城市
				city: '1',
				//排序（价格，距离）
                //px_rule:'',
                //门店名称
                //name: '',
            },

            cpid:'1',
            //正序、降序排列
            type:'',
            // 经度
            longitude:'',
            //维度
            latitude:'',
            //城市
            city: '1',
            //排序（价格，距离）
            px_rule:'',
            //门店名称
            name: this.$route.query.word,

            resData:'',
			// Object.assign();
            // 日历组件是否显示
            zbCityVisible: false
        };
    },
    created() {
        
    },
    watch:{
        
    },
    mounted() {
        var param = this.watchObj;
        // this.fetchData(param);
        
    },
    methods: {
        // 加载数据
        fetchData(param) {
            this.$http({
                method: "POST",
                url: store_list,
                data:param
            }).then(res => {
                this.resData = res.data;
            });
        },

        // 子组件emit的方法-城市选择
		citySelectValFun(id, name){
            console.log(id, name);
            this.watchObj.city = id;
        },
        
        // 搜索条中城市选择逻辑，子组件emit之后，执行的方法
        triggerCityDialogFun(){
            this.zbCityVisible = true;
        },

        // 日期组件的title通过emit执行的方法
        cityTitleBackEmitFun(){
            this.zbCityVisible = false;
        }

    }
};
</script>

<style lang="less" scoped>

</style>