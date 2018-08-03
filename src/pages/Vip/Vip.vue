<template>
	<div>
		<div id="showPicker" @click="checkPicker">111</div>
	</div>
</template>

<script>
    import weui from 'weui.js';
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
            checkPicker:function(){
                weui.picker(
                    [{
                        label: '飞机票',
                        value: 0
                    },{
                        label: '火车票',
                        value: 1
                    }, {
                        label: '的士票',
                        value: 2
                    },{
                        label: '公交票 (disabled)',
                        disabled: true,
                        value: 3
                    }, {
                        label: '其他',
                        value: 4
                    }], {
                        onChange: function (result) {
                            // console.log(result);
                            // console.log('改变');
                        },
                        onConfirm: function (result) {
                            // console.log(result);
                            console.log('确定');
                        }
                    }
                );
            }
        }
    };
</script>

<style lang="less" scoped>

</style>