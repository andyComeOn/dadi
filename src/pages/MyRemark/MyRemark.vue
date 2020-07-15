<template>
  <div class="myComment">
    <div class="commentBox">
        <h3 class="commentTitle">秋果酒店燕莎店</h3>
        <ul class="starList">
            <li v-for="item in starListArr" :key="item.id">{{item.title}}
                <span>
                    <img v-for="(starFor,index) in item.starNum" :key="index" :data-name="item.id" :src="starFor" @click="starBtn(item.id,index)" />
                </span>
            </li>
        </ul>
        <ul class="checkBoxList">
            <li class="" v-for="(item,index) in this.serveOption" :key="index">
                <div @click="checkboxBtn(index)">
                    <img :src="item.checkboxImg" />
                    <span>{{item.tg_name}}</span>
                </div>
            </li>
        </ul>
        <div class="commentText">
            <textarea name="" v-model="commentText" placeholder="请输入评价..."></textarea>
            <p><span>{{commentTextLength}}/500</span></p>
            <div class="uploadingBox">
                <ul class="clearfix">
                    <li class="addImg" v-if="this.uploadImgArr.length != 6">
                        <van-uploader :after-read="onRead">
                            <img src="../../assets/images/comments/plus.png" />
                            <span>添加照片</span>
                        </van-uploader>
                    </li>
                    <li v-if="uploadImgArr.length != 0" v-for="(item,index) in uploadImgArr" :key="index">
                        <img class="uploadImg" :src="item.content" />
                        <img class="deleteImg" @click="deleteImgBtn(item.cut_img,item.file.name)" src="../../assets/images/comments/delte.png" />
                    </li>
                </ul>
            </div>
        </div>
        <div class="remarkOn">
            <span @click="remarkOn()">
                <img :src="radioImg"/>
                <i>匿名点评</i>
            </span>
        </div>
    </div>
    <div class="footerBox">
        <div class="footerBtn" @click="footerBtn()">提交</div>
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
<style lang="less" scoped>
    @import "./myRemark";
</style>
<script>
var starImgNor = require("../../assets/images/comments/fillnor.png");
var starImgSel = require("../../assets/images/comments/fillsel.png");
var checkboxNor = require("../../assets/images/comments/checkbox_nor.png");
var checkboxSel = require("../../assets/images/comments/checkbox_sel.png");
var radioNor = require("../../assets/images/comments/radio_nor.png");
var radioSel = require("../../assets/images/comments/radio_sel.png");
import { Toast } from 'vant';
import {image_upload,remarkTags,addRemark,deleteImg} from '../../api/api';
export default {
    data() {
        return {
            loading: true, // loading是否显示
            loadingTxt: "加载中...",
            delayToast: false,
            delayToastTxt: "",
            uploadImgArr:[],
            is_anonymity:0,         //0不匿名     1匿名
            radioImg:radioNor,
            commentText:"", //评论
            commentTextLength:0,
            starListArr:[{
                    title:'酒店位置',
                    starNum:[starImgNor,starImgNor,starImgNor,starImgNor,starImgNor],
                    value:0,
                    id:"surrounding"
                },{
                    title:'酒店服务',
                    starNum:[starImgNor,starImgNor,starImgNor,starImgNor,starImgNor],
                    value:0,
                    id:"hotel_serve"
                },{
                    title:'酒店设施',
                    starNum:[starImgNor,starImgNor,starImgNor,starImgNor,starImgNor],
                    value:0,
                    id:"facility_serve"
                },{
                    title:'酒店卫生',
                    starNum:[starImgNor,starImgNor,starImgNor,starImgNor,starImgNor],
                    value:0,
                    id:"room_health"
                }
            ],
            serveOption:[]          //评论标签
        }
    },
    watch: {
        "commentText":{
            handler(val, oldVal){
                var self = this;
                if(val.length > 500){
                    self.commentText =  String(val).slice(0,500);
                    self.commentTextLength = 500;
                }else{
                    self.commentTextLength = val.length;
                }
            }
        },
        deep: true,
        immediate: true
    },
    methods:{
        footerBtn(){            //提交
            let imgStr = "";    //提交后台需要的img字符串“，”分割  
            for(let i=0;i<this.uploadImgArr.length;i++){
                imgStr += this.uploadImgArr[i].cut_img + ",";
            }
            if(this.starListArr[0].value != "" && this.starListArr[1].value != "" && this.starListArr[2].value != "" && this.starListArr[3].value != ""){       //星星打分不能为空
                this.loading = true;        //loading
                this.$http({        //提交接口
                    url:addRemark,
                    method:"POST",
                    data:{
                        surrounding:this.starListArr[0].value,     //	string	位置	是	否		
                        hotel_serve:this.starListArr[1].value,     //	string	服务	是	否		
                        facility_serve:this.starListArr[2].value,  //	string	设施	是	否		
                        room_health:this.starListArr[3].value,     //	string	卫生	是	否		
                        order_id:119,        //	string	订单ID	是	否		
                        is_anonymity:this.is_anonymity,    //	string	是否匿名	否	否		
                        comment_img:imgStr,     //	string	评论图片	否	否		
                        content:this.commentText          //
                    }
                }).then(res=>{
                    this.loading = false;
                    if(res.data.status == 1){
                        this.$router.push({path:"myRemarkLists"});
                    }else{
                        this.delayToast = true;
                        this.delayToastTxt = res.data.msg;
                        setTimeout(()=>{
                            this.delayToast = false;
                        },1500);
                    }
                });
            }else{
                this.delayToast = true;
                this.delayToastTxt = "评分不能为空";
                setTimeout(()=>{
                    this.delayToast = false;
                },1500);
            }
        },
        deleteImgBtn(fileImg_Cut,fileImgName){         //删除图片
            this.loading = true;        
            this.$http({
                url:deleteImg,
                method:"POST",
                data:{
                    url:fileImg_Cut
                }
            }).then(res=>{
                this.loading = false;
                if(res.data.status == 1){
                    for(var i=0;i<this.uploadImgArr.length;i++){
                        if(this.uploadImgArr[i].file.name == fileImgName){
                            this.uploadImgArr.splice(i, 1);
                            break;
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
        },
        onRead(fileData) {      //上传图片
            this.loading = true;
            for(var i=0;i<this.uploadImgArr.length;i++){
                if(this.uploadImgArr[i].file.name == fileData.file.name){
                    this.loading = false;
                    Toast("重复上传图片");
                    return false;
                }
            }
            var dataObj = {
                type:"avatar",
                img:fileData.content
            }
            this.$http({
                url: image_upload,
                method: "POST",
                data: dataObj
            }).then(res => {
                this.loading = false;
                if(res.data.status == 1){
                    fileData.cut_img = res.data.data.cut_img;
                    this.uploadImgArr.push(fileData);
                    console.log(this.uploadImgArr);
                }else{
                    this.delayToast = true;
                    this.delayToastTxt = res.data.status;
                    setTimeout(()=>{
                        this.delayToast = false;
                    });
                }   
            });
        },
        starBtn(starId,starVal){        //点击传入是哪里的星星和星星的index
            for(var i=0;i<this.starListArr.length;i++){
                if(this.starListArr[i].id == starId){           //判断点击的属于哪个下面的星星
                    this.starListArr[i].value = starVal+1;      //点亮的星星有几个
                    this.starListArr[i].starNum.length = 0;     //将星星图片清空
                    for(var j=0;j<starVal+1;j++){               //添加点亮的星星
                        this.starListArr[i].starNum.push(starImgSel);
                    }
                    for(var n=0;n<4-starVal;n++){               //添加未点亮的星星
                        this.starListArr[i].starNum.push(starImgNor);
                    }
                }
            }
        },
        checkboxBtn(idx){       //勾选内容
            for(var i=0;i<this.serveOption.length;i++){
                if(this.serveOption[i].id == (idx + 1)){
                    if(this.serveOption[i].checkboxType){
                        this.serveOption[i].checkboxType = false;
                        this.serveOption[i].checkboxImg = checkboxNor;
                        this.commentText = this.commentText.replace(this.serveOption[i].tg_name,"");
                    }else{
                        this.serveOption[i].checkboxType = true;
                        this.serveOption[i].checkboxImg = checkboxSel;
                        this.commentText = this.serveOption[i].tg_name + this.commentText;
                    }
                }
            }
        },
        remarkOn(){     //匿名点评
            if(this.is_anonymity == 0){
                this.is_anonymity = 1;
                this.radioImg = radioSel;
            }else{
                this.is_anonymity = 0;
                this.radioImg = radioNor;
            }
        }
    },
    mounted () {
        //获取评论标签
        this.$http({
            url: remarkTags,
            method: "POST"
        }).then(res => {
            this.loading = false;
            if(res.data.status == 1){
                console.log(res);
                let tags = res.data.data;
                for(let i=0;i<tags.length;i++){
                    tags[i].checkboxImg = checkboxNor;
                    tags[i].checkboxType = false;
                    tags[i].tg_name = "#" + tags[i].tg_name;
                }
                this.serveOption = tags;
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