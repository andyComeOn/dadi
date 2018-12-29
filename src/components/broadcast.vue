
<template>
    <div class="broadcast" m-ellipsis>
        <span class="broadcast-icon"></span>
        今晨6点前入住，请选择{{yesterday|filterTimeMM}}月{{yesterday|filterTimeDD}}日入住
        <span class="broadcast-btn" v-show="broadcastRgBtn" @click="Close"></span>
    </div>
</template>

<script>
import { YTDLf } from "@/utils/date";
export default {
    data() {
        return {
            broadcastRgBtn: false,
            yesterday: ""
        };
    },
    created() {
        this.yesterday = YTDLf().kebab;
    },
    methods: {
        Close(){}
    }
};
</script>

<style lang="less" scoped>
.broadcast {
    line-height: 36px;
    background: rgba(253, 252, 236, 1);
    padding: 0 15px 0 34px;
    color: #f86e21;
    font-size: 14px;
    .broadcast-icon {
        width: 16px;
        height: 16px;
        position: absolute;
        left: 15px;
        top: 10px;
        background: url("../assets/images/icon/ic-broadcast.png") no-repeat
            center center;
        background-size: 100% 100%;
    }
    .broadcast-btn {
        width: 24px;
        height: 24px;
        position: absolute;
        right: 7px;
        top: 6px;
        background: url("../assets/images/icon/ic-close-score.png") no-repeat
            center center;
        background-size: 100% 100%;
    }
}
</style>


