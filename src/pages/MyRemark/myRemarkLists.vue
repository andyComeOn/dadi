<template>
    <div class="remarkBd">
        <div class="userMsg" v-for="(item,index) in this.remarkMsg" :key="index">
            <div class="userHead">
                <ul v-if="item.id == modelValue">
                    <span></span>
                    <li class="modificatioIcon" @click="modificatioBtn(item.id)"><i></i>修改</li>
                    <li class="deleteIcon" @click="deleteBtn(item.id)"><i></i>删除</li>
                    <li class="cancelIcon" @click="cancelBtn()"><i></i>取消</li>
                </ul>
                <p>
                    <span>{{item.nickname}}</span>
                    <span>{{item.add_time}}</span>
                    <span @click="modelBox(item.id)">
                        <i></i>
                        <i></i>
                        <i></i>
                    </span>
                </p>
                <div class="userStar">
                    <div class="starLists">
                        <img v-for="(item,index) in item.starArr" :key="index" :src="item" alt="">
                    </div>
                    <span><i>{{item.score}}</i>分</span>
                </div>
                <img class="userPhoto" :src="item.avatar" alt="">
            </div>
            <p class="evaluateText">{{item.content}}</p>
            <ul class="evaluateTmg clearfix">
                <li v-for="(items,index) in item.img" :key="index">
                    <img :src="items" alt="">
                </li>
            </ul>
            <div class="storeMsg">
                <img :src="item.logo" alt="">
                <p>{{item.name}}</p>
                <p>{{item.address}}</p>
            </div>
        </div>
        <div class="remarkNo" v-if="this.remarkMsg.length == 0">
            <img src="../../assets/images/comments/comments_404 2.png" alt="">
            <p>暂无评论</p>
        </div>
        <!-- toast(loading=>weui)  str -->
        <div v-show="loading">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">{{loadingTxt}}</p>
            </div>
        </div>
        <!-- toast(loading=>weui)  end -->
        <!-- toast（delay=>z）str -->
        <div v-show="delayToast">
            <div class="z-mask-transparent"></div>
            <div class="z-toast">
                <i class="z-toast-icon"></i>
                <p class="z-toast-content">{{delayToastTxt}}</p>
            </div>
        </div>
        <!-- toast（delay=>z）end -->
    </div>
</template>
<script>
var starImgNor = require("../../assets/images/comments/fillnor.png");
var starImgSel = require("../../assets/images/comments/fillsel.png");
var starImgHalf = require("../../assets/images/comments/starHalf.png");
import {myRemarkLists,deleteRemark} from '@/api/api.js';
export default {
    data() {
        return {
            loading:true,
            loadingTxt:"加载中...",
            delayToast:false,
            delayToastTxt:"",
            remarkMsg:"",
            modelValue:""
        }
    },
    methods: {
        modificatioBtn(remarkId){
            this.$router.push({path:'myRemark',query:{remarkId:remarkId}});
        },
        modelBox(remarkId){        //弹出修改、删除弹框
            this.modelValue = remarkId;
        },
        cancelBtn(){            //关闭修改、删除弹框
            this.modelValue = "";
        },
        deleteBtn(remarkId){
            this.loading = true;
            this.$http({
                url:deleteRemark,
                method:"POST",
                data:{
                    id:remarkId
                }
            }).then(res=>{
                this.loading = false;
                this.delayToast = true;
                this.delayToastTxt = res.data.msg;
                setTimeout(()=>{
                    this.delayToast = false;
                    history.go(0);
                },1500);
            })
        }
    },
    mounted () {
        this.$http({
            method: "POST",
            url: myRemarkLists
        }).then(res=>{
            this.loading = false;
            if(res.data.status == 1){
                this.remarkMsg = res.data.data;
                for(var i=0;i<this.remarkMsg.length;i++){
                    this.remarkMsg[i].starArr = [];
                    let scoreNum = this.remarkMsg[i].score;
                    if(scoreNum % 1 === 0){
                        for(var j=0;j<scoreNum;j++){
                            this.remarkMsg[i].starArr.push(starImgSel);
                        }
                        let surplusNum = 5 - scoreNum;
                        if( surplusNum !=0){
                            for(var m=0;m<surplusNum;m++){
                                this.remarkMsg[i].starArr.push(starImgNor);
                            }
                        }
                    }else{
                        let parseIntScoreNum = parseInt(scoreNum);
                        for(var j=0;j<parseIntScoreNum;j++){
                            this.remarkMsg[i].starArr.push(starImgSel);
                        }
                        this.remarkMsg[i].starArr.push(starImgHalf);
                        if(5 - parseIntScoreNum - 1 != 0){
                            for(let k=0;k<5 - parseIntScoreNum - 1;k++){
                                this.remarkMsg[i].starArr.push(starImgNor);
                            }
                        }
                    }
                }
            }else{
                this.delayToast = true;
                this.delayToastTxt = res.data.msg;
                setTimeout(()=>{
                    this.delayToast = false;
                },1500);
            }
        });
    }
}
</script>
<style lang="less" scoped>
    @import './myRemark.less';
</style>
