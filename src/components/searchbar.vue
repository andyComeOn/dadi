<template>
    <div class="search-container">
        <div class="search-wrapper">
            <div class="city" @click="cityToast">{{city}}</div>
            <span class="stick">|</span>
            <div class="date-wrapper">
                <div class="date-area">
                    <span class="start">{{startDate}}</span><br>
                    <span class="end">{{startDate}}</span>
                </div>
                <div class="date-instro"><span>1</span>晚</div>
            </div>
            <span class="stick">|</span>
            <div class="search">
                <input type="text" class="txt" placeholder="酒店位置/商圈">
            </div>

            <!-- dialog -->

            <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="isCityDialogShow">
                <mu-appbar color="#30B097" title="请选择日期">
                    <mu-button slot="right" flat>
                        关闭
                    </mu-button>
                </mu-appbar>
                <div style="padding: 24px 10px 0 10px;">
                    <div style="height：20px;line-height:20px;margin-bottom:8px;" @click="citySelect('上海')">上海</div>
                    <div style="height：20px;line-height:20px;margin-bottom:8px;" @click="citySelect('苏州')">苏州</div>
                    <div style="height：20px;line-height:20px;margin-bottom:8px;" @click="citySelect('天津')">天津</div>
                    <div style="height：20px;line-height:20px;margin-bottom:8px;" @click="citySelect('郑州')">郑州</div>
                </div>
            </mu-dialog>

        </div>
    </div>
</template>
<script>
// import '../assets/lib/swiper/js/swiper.js'
export default {
    props: [
        'city',
        'startDate',
        'endDate',
        'word'
    ],
    data() {
        return {
            isCityDialogShow: false,
            
        };
    },
    created() {},
    mounted() {},
    methods: {
        cityToast() {
            this.isCityDialogShow = true;
        },
        citySelect(val) {
            this.city = val;
            this.$emit("citySelectVal", val);
            this.isCityDialogShow = false;
        }
    }
};
</script>
<style lang="less">
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
                background: #f4f4f4;
                padding-left: 9px;
                color: #999999;
            }
        }
    }
}
</style>