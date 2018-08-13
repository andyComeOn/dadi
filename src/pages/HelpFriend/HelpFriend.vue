<template>
	<div class="pad-top44">
        <ul class='help_head'>
            <li v-for='(item,index) in levelArr'  @click='tabsActive(item.id,index)'>
                <span v-if='index == 0' :class="{help_active:index == classIndex}">{{item.name}}({{stair_count_num}})</span>
                <span v-if='index == 1' :class="{help_active:index == classIndex}">{{item.name}}({{stair_count_num}})</span>
            </li>
        </ul>
        <p class="help_chunk"></p>
        <!-- one level -->
        <oneLevel :is='showView' v-on:listenToChildEvent="showMsgFromChild" keep-alive></oneLevel>
        <!-- second level -->
	</div>
</template>
<script>
    import oneLevel from './components/oneLevel.vue';
    import twoLevel from './components/twoLevel.vue';
    export default {
        name: "helpFriend",
        components: {
            oneLevel,
            twoLevel
        },
        data(){
            return{
                levelArr:[
                    {
                        name:'一级',
                        id:'oneLevel'
                    },{
                        name:'二级',
                        id:'twoLevel'
                    }
                ],
                showView:'oneLevel',
                classIndex:0,
                stair_count_num:''
            }
        },
        computed: {
            
        },
        methods: {
            tabsActive(active_text,activeIndex){
                this.showView = active_text;
                this.classIndex = activeIndex;
            },
            showMsgFromChild(data1,data2) {
                // stair_count就是子组件传过来的值
                this.stair_count_num = data1;
                this.second_count_num = data2;
            }
        },
        mounted() {
            
        }
    };
</script>
<style lang="less" scoped>
    @import './helpFriend.less';
    .pad-top44{
        padding-top: 44px;
    }
</style>