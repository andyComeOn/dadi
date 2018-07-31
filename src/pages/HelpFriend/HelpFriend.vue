<template>
	<div class="pad-top44">
        <ul class='help_head'>
            <li v-for='(item,index) in levelArr'  @click='tabsActive(item.id,index)'>
                <span :class="{help_active:index == classIndex}">{{item.name}}()</span>
            </li>
        </ul>
        <p class="help_chunk"></p>
        <!-- one level -->
        <oneLevel :is='showView' keep-alive></oneLevel>
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
            }
        },
         computed: {
            
        },
        methods: {
            tabsActive(active_text,activeIndex){
                this.showView = active_text;
                this.classIndex = activeIndex;
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