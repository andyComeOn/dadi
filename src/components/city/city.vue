<template>
    <div class="light-test" :style="'min-height:' + setDivHeight + 'px' ">
        <van-search v-model="cityVal" placeholder="请输入搜索关键词" show-action shape="round" @clear="onClear" @search="onSearch">
            <div slot="action" @click="onSearch">搜索</div>
        </van-search>
        <van-index-bar :index-list="indexList">
            <van-index-anchor index="当前">当前</van-index-anchor>
            <div class="cityname">
                <van-button type="default" size="mini" @click.native="confirmCity(cityname,cityId)">{{cityname}}</van-button>
            </div>
            <van-index-anchor index="热门">热门</van-index-anchor>
            <div class="cityname">
                <van-button class="ma-right30" type="default" size="mini" v-for="(item,index) in hotCityList" :key="index" @click.native="confirmCity(item.shortname,item.id)">{{item.shortname}}</van-button>
            </div>
            <div v-for="(item,index) in cityArr" :key="index">
                <van-index-anchor :index="item.crty">{{item.crty}}</van-index-anchor>
                <van-cell v-for="(itemVal,ind) in item.letter" :key="ind"  :title="itemVal.shortname"  @click.native="confirmCity(itemVal.shortname,itemVal.id)"/>
            </div>
        </van-index-bar>
    </div>
</template>
<script>
    import { getStorecity, getCityList, slt_location } from "@/api/api";
    import { getCookie, setCookie } from '@/utils/util';
    export default {
        data() {
            return {
                cityVal: "",        //
                cityArr:"",
                cityname:"定位中...",
                cityId:"",
                setDivHeight:"",
                hotCityList:"",             //热门城市
                indexList: ['当前','热门']
            };
        },
        created() {
            this.setDivHeight = document.body.offsetHeight;
        },
        methods: {
            //获取当前城市
            getLocation(longitudeTmp,latitudeTmp) {
                this.$http({
                    method: "POST",
                    url: slt_location,
                    data: {
                        longitude:longitudeTmp,
                        latitude:latitudeTmp
                        // longitude: this.$route.query.longitude, // 经度
                        // latitude: this.$route.query.latitude //维度
                    }
                }).then(res => {
                    if (res.data.status == 1) {
                        this.cityname = res.data.data.city;
                        this.cityId = res.data.data.id;
                    } else {
                        this.cityname = "定位失败";
                    }
                });
            },
            //热门城市
            fetchHotCityList() {
                this.$http({
                    method: "POST",
                    url: getStorecity,
                    data: {
                        type:2
                    }
                }).then(res => {
                    if (res.data.status == 1) {
                        this.hotCityList = res.data.data;
                    }else{
                        this.$toast(res.data.msg);
                    }
                });
            },
            //城市列表
            fetchCityList(cityVal) {
                this.$http({
                    method: "POST",
                    url: getCityList,
                    data: {
                        shortname:cityVal
                    }
                }).then(res => {
                    if (res.data.status == 1) {
                        this.cityArr = res.data.data;
                        this.indexList = ['当前','热门'];
                        for(var i=0;i<this.cityArr.length;i++){
                            this.indexList.push(this.cityArr[i].crty);
                        }
                    }else{
                        this.$toast(res.data.msg);
                    }
                });
            },
            //搜索城市
            onSearch(){
                let reg = /^[\u4e00-\u9fa5]+$/;
                if(reg.test(this.cityVal) || this.cityVal == ""){
                    this.fetchCityList(this.cityVal);
                }else{
                    this.$toast("没找到相关城市，请试试其他城市");
                }
                
            },
            //确定城市
            confirmCity(city_name,city_id){
                if(this.$route.query.cityInd == 1){
                    this.$router.push({
                        path:'/',
                        query:{
                            city_name:city_name,
                            city_id:city_id
                        }
                    });
                }else if(this.$route.query.cityInd == 3){
                    this.$router.push({
                        path:'/nearby',
                        query:{
                            city_name:city_name,
                            city_id:city_id
                        }
                    });
                }else{
                    this.$router.push({
                        path:'/searchResult',
                        query:{
                            city_name:city_name,
                            city_id:city_id,
                            liveinYYYY:this.$route.query.liveinYYYY,
                            liveinMM:this.$route.query.liveinMM,
                            liveinDD:this.$route.query.liveinDD,
                            liveoutYYYY:this.$route.query.liveoutYYYY,
                            liveoutMM:this.$route.query.liveoutMM,
                            liveoutDD:this.$route.query.liveoutDD,
                            abstract:this.$route.query.abstract,
                            is_type:this.$route.query.is_type
                        }
                    });
                }
            },
            // 获取城市列表
            onClear(){
                this.fetchCityList();
            }
        },
        mounted() {
            let longitudeTmp = getCookie("userLongitude");
            let latitudeTmp = getCookie("userLatitude");
            this.getLocation(longitudeTmp,latitudeTmp);             //获取当前城市
            this.fetchHotCityList();        //获取热门城市
            this.fetchCityList();           //获取城市列表
        }
    };
</script>
<style lang="less" scoped>
    .cityname{
        padding:0px 15px;
    }
    .ma-right30{
        margin-right:15px;
        margin-left: 0px;
    }
    .van-button--mini+.van-button--mini{
        margin-left: 0px;
        margin-bottom: 5px;
    }
    .van-index-bar .van-index-bar__sidebar{
        position: absolute!important;
    }
    .van-field__body{
        height:100%;
    }
</style>

