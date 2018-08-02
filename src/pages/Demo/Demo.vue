<template>
	<div>
		<div class="demo">
			<span @click="triggerCalendar">{{zbInitCalendar.start.mm}}月{{zbInitCalendar.start.dd}}日</span>
			<span @click="triggerCalendar">{{zbInitCalendar.end.mm}}月{{zbInitCalendar.end.dd}}日</span>
			<span>共{{howManyNight}}晚</span>
		</div>

		<mu-dialog width="360" transition="slide-right" fullscreen :open.sync="zbCalendarVisible">
			<Calendar ref="Calendar" :markDateMore="zbInitCalendar" @isToday="clickToday" @titleBackEmit="calendarTitleBackFun">
			</Calendar>
		</mu-dialog>
	</div>
</template>

<script>
import Calendar from "@/components/calendar/calendar.vue";
import { YTD, f, YTDRg, dateEndMinusStart } from "@/utils/date";

export default {
    name: "vip",
    components: {
        Calendar
    },
    data() {
        return {
            zbCalendarVisible: false,
            demo: "",
            date: "",
            howManyNight: "",

            zbInitCalendar: {
                start: {
                    yyyy: "",
                    mm: "",
                    dd: ""
                },
                end: {
                    yyyy: "",
                    mm: "",
                    dd: ""
                }
            }
        };
    },
    created() {
        // 初始化日历日期赋值
        var d = new Date();
        var dd = new Date();
        dd.setDate(dd.getDate() + 1);

        this.howManyNight = dateEndMinusStart(d, dd);
        this.zbInitCalendar.start.yyyy = f(d).yyyy;
        this.zbInitCalendar.start.mm = f(d).mm;
        this.zbInitCalendar.start.dd = f(d).dd;
        this.zbInitCalendar.end.yyyy = f(dd).yyyy;
        this.zbInitCalendar.end.mm = f(dd).mm;
        this.zbInitCalendar.end.dd = f(dd).dd;
    },
    methods: {
        // 触发日历dialog显示
        triggerCalendar() {
            this.zbCalendarVisible = true;
        },

        // 入住-离店
        clickToday(value) {
            this.zbCalendarVisible = false;
            // this.zbInitDate[0].date = data[0];
            // this.zbInitDate[1].date = data[1];

            // 入住时间
            this.zbInitCalendar.start.yyyy = value[0].split("/")[0];
            this.zbInitCalendar.start.mm = value[0].split("/")[1];
            this.zbInitCalendar.start.dd = value[0].split("/")[2];

            // 离店时间
            this.zbInitCalendar.end.yyyy = value[1].split("/")[0];
            this.zbInitCalendar.end.mm = value[1].split("/")[1];
            this.zbInitCalendar.end.dd = value[1].split("/")[2];

            //共几晚
            this.howManyNight = dateEndMinusStart(value[0], value[1]);
        },

        // 日历组件的title-若用户不选取日历，点击返回使日历弹窗消失
        calendarTitleBackFun() {
            this.zbCalendarVisible = false;
        }
    }
};
</script>


<style lang="less">
.demo {
    height: 30px;
    line-height: 30px;
    background: palevioletred;
    span {
        margin-right: 20px;
        background: tan;
    }
}
</style>