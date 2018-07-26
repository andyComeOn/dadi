<template>
    <div class="search-container">
        <div class="search-wrapper">
            <div class="city" @click="triggerCityDialog">{{o.cityname}}</div>
            <span class="stick">|</span>
            <div class="date-wrapper">
                <div class="date-area" @click="triggerCalendarDialog">
                    <span class="start">{{o.liveinMM}}-{{o.liveinDD}}</span><br>
                    <span class="end">{{o.liveoutMM}}-{{o.liveoutDD}}</span>
                </div>
                <div class="date-instro">{{howManyNight}}晚</div>
            </div>
            <span class="stick">|</span>
            <div class="search">
                <input 
                    type="text" 
                    class="txt" 
                    v-model="o.abstract" 
                    placeholder="酒店位置/商圈"
                    @focus="triggerInputFocus"
                >
            </div>
        </div>
    </div>
</template>
<script>
import { getStorecity } from "@/api/api";
import { f, dateEndMinusStart } from "@/utils/date"; // 引入封装时间函数

export default {
    props: ["searchbarObj"],
    watch: {
        searchbarObj: {
            handler(newValue, oldValue) {
                // console.log(newValue);
                this.o = newValue;
                this.howManyNight = dateEndMinusStart(
                    newValue.liveinYYYY +
                        "-" +
                        newValue.liveinMM +
                        "-" +
                        newValue.liveinDD,
                    newValue.liveoutYYYY +
                        "-" +
                        newValue.liveoutMM +
                        "-" +
                        newValue.liveoutDD
                );
            },
            deep: true,
            immediate: true
        }
    },
    data() {
        return {
            o: {
                cityname: "",
                cityid: "",
                liveinYYYY: "",
                liveinMM: "",
                liveinDD: "",
                liveoutYYYY: "",
                liveoutMM: "",
                liveoutDD: "",
                abstract: ""
            },

            // 入住离店几晚
            howManyNight: ""
        };
    },
    created() {},
    mounted() {},
    methods: {
        //城市组件dialog控制
        triggerCityDialog() {
            this.$emit("triggerCityDialogEmit");
        },

        // 触发日历dialog显示
        triggerCalendarDialog() {
            this.$emit("triggerCalendarDialogEmit");
        },

        // 搜素框出发焦点事件
        triggerInputFocus(){
            this.$emit("triggerInputFocusEmit");
        }

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
                color: #30B097;
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
    height: 44px !important;
    .mu-appbar-title {
        line-height: 44px;
        font-size: 14px;
    }
}
</style>