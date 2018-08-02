<template>
	<div class="pad-top44">
        <!-- praise_head -->
        <ul class="praise_head col-666 pf bd-fff">
            <li v-for='(item,index) in tabLists'  @click='tabsActive(item.b,index)'>
                <span :class="{praise_active:index == classIndex}">{{item.a}}</span>
            </li>
        </ul>
        <div class="praise_chunk"></div>
        <!-- praise_content -->
        <allPraise :is='showView' keep-alive></allPraise>
	</div>
</template>
<script>
    import allPraise from './components/allpraise.vue';
    import stayPraise from './components/stayPraise.vue';
    import validPraise from './components/validPraise.vue';
    import invalidPraise from './components/invalidPraise.vue';
    import { login_test } from '../../api/api.js';
    export default {
        name: "praise",
        components: {
            allPraise,
            stayPraise,
            validPraise,
            invalidPraise
        },
        data(){
            return {
                tabLists:[{
                    a:'全部',
                    b:'allPraise'
                },{
                    a:'待确认',
                    b:'stayPraise'
                },{
                    a:'有效',
                    b:'validPraise'
                },{
                    a:'无效',
                    b:'invalidPraise'
                }],
                showView:'allPraise',
                classIndex:0
            }
        },
        computed: {
            
        },
        methods: {
            tabsActive(active_text,activeIndex){
                var param = {
                    cpid:'1'
                };
                this.showView = active_text;
                this.classIndex = activeIndex;
                // this.$http({
                //     url:login_test,
                //     method: "POST",
                //     data: param
                // }).then((res)=>{
                
                // });
            }
        },
        mounted() {

        }
    };
</script>
<style lang="less">
    @import '../../assets/css/reset.less';
    @import './praise.less';
</style>