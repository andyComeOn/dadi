<template>
	<div class="error-page">
		error
	</div>
</template>

<script>

export default {
    name: "vip",
    components: {
        
    },
    data() {
        return {
            
        };
    },
    created() {
        
    },
    methods: {
        // 触发日历dialog显示
        triggerCalendar() {
            this.zbCalendarVisible = true;
        },

        
    }
};
</script>

<style lang="less" scoped>
.error-page {
   text-align: center;
   font-size: 24px;
}
</style>