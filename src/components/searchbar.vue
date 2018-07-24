<template>
    <div class="search-container">
        <div class="search-wrapper">
            <div class="city" @click="triggerCityDialog">{{whichCity}}</div>
            <span class="stick">|</span>
            <div class="date-wrapper">
                <div class="date-area">
                    <span class="start" @click="startDateDialogShow">{{startDateInit}}</span><br>
                    <span class="end" @click="endDateDialogShow">{{endDateInit}}</span>
                </div>
                <div class="date-instro">1晚</div>
            </div>
            <span class="stick">|</span>
            <div class="search">
                <input type="text" class="txt" v-model="word" placeholder="酒店位置/商圈">
            </div>

            <!-- 城市dialog -->
            <mu-dialog width="360" transition="slide-right" fullscreen :open.sync="zbCityVisible">


                <mu-appbar color="#30B097" title="请选择城市" class="city-dialog-hd">
                    <mu-button flat slot="left" @click="close">关闭</mu-button>
                </mu-appbar>
                <div style="padding: 24px 10px 0 10px;">
                    <div style="height：20px;line-height:20px;margin-bottom:8px;" v-for="(item, index) in cityList" :key="index" @click="citySelect(item.id,item.name)">{{item.name}}</div>
                </div>
            </mu-dialog>

            <!-- 入住日历弹框 -->
            <mu-dialog width="360" transition="slide-right" fullscreen :open.sync="calendarVisible">
                <mu-appbar color="#30B097" title="请选择日期">
                    <mu-button slot="right" flat  @click="startDateDialogHide">
                        关闭
                    </mu-button>
                </mu-appbar>
                <div style="padding: 24px 10px 0 10px;">
                    <mu-flex justify-content="center" align-items="center" wrap="wrap">
                        <mu-paper :z-depth="1" class="demo-date-picker">
                            <mu-date-picker :date.sync="dateStartVal" @change="triggerStartDate" display-color="#30B097" color="#30B097"></mu-date-picker>
                        </mu-paper>
                    </mu-flex>
                </div>
            </mu-dialog>

            <!-- 离店日历弹框 -->
            <mu-dialog width="360" transition="slide-right" fullscreen :open.sync="calendarVisible1">
                <!-- <mu-appbar color="#30B097" title="请选择日期">
                    <mu-button slot="right" flat  @click="endDateDialogHide">
                        关闭
                    </mu-button>
                </mu-appbar> -->
                <div style="padding: 24px 10px 0 10px;">
                    <mu-flex justify-content="center" align-items="center" wrap="wrap">
                        <mu-paper :z-depth="1" class="demo-date-picker">
                            <mu-date-picker :date.sync="dateEndVal" @change="triggerEndDate" display-color="#30B097" color="#30B097"></mu-date-picker>
                        </mu-paper>
                    </mu-flex>
                </div>
            </mu-dialog>

        </div>
    </div>
</template>
<script>
import {formatePara} from '../utils/date';
import {getStorecity} from '../api/api';

export default {
    props: [
        'city',
        'startDate',
        'endDate',
        'word'
    ],
    data() {
        return {
            zbCityVisible: false,
            whichCity:this.city,

            //入住、离店日历dialog的标志
            calendarVisible: false,
            calendarVisible1:false,

            // 日历插件的绑定默认值
            dateStartVal: new Date(),
            dateEndVal: new Date(),

            //入住、离店接收父组件
            startDateInit:this.startDate,
            endDateInit:this.endDate,

            //有效city列表
            cityList:[
                // {id:1,name:'北京'},
                // {id:21,name:'天津'},
                // {id:3,name:'深圳'}
            ]
        };
    },
    created() {
        this.fetchCityId();
    },
    mounted() {},
    methods: {
        //获取有效城市id
        fetchCityId(){
            var param = {cpid:1}
            this.$http({
                method: "POST",
                url: getStorecity,
                data:param
            }).then(res => {
                this.cityList = res.data.data;
            });
        },

        //城市dialog控制
        triggerCityDialog() {
            this.$emit("triggerCityDialogEmit");
            // this.zbCityVisible = true;
        },

        // 选取城市
        // citySelect(id,name) {
        //     this.whichCity = name;
        //     this.$emit("citySelectEmit", id, name);
        //     this.zbCityVisible = false;
        // },

        // 关闭城市dialog按钮
        close(){
            // this.zbCityVisible = false;
        },

        // 入住日历弹框控制
        startDateDialogShow() {
            this.calendarVisible = true;
        },

        // 入住日历弹框中的关闭
        startDateDialogHide() {
            this.calendarVisible = false;
        },

        // 入住日历-触发
        triggerStartDate(date) {
            this.calendarVisible = false;
            this.startDateInit = formatePara(date);
        },

        //离店日历弹框控制
        endDateDialogShow(){
            this.calendarVisible1 = true;
        },

        //离店日历弹框中的关闭
        endDateDialogHide() {
            this.calendarVisible1 = false;
        },

        // 离店日历-触发
        triggerEndDate(date) {
            this.calendarVisible1 = false;
            this.endDateInit = formatePara(date);
        },
    }
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
                width: 100%;
                height: 24px;
                outline: none;
                border: none;
                background: #f4f4f4;
                padding-left: 9px;
                color: #333;
            }
        }
    }
}

.city-dialog-hd {
    height: 44px!important;
    .mu-appbar-title{
        line-height: 44px;
        font-size: 14px; 
    }
}
</style>