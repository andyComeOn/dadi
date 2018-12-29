<template>
    <div>
        <!-- 编辑收货地址 str -->
        <div class="editAddress">
            <ul>
                <li>
                    <p>收货人</p>
                    <input v-model="editName" type="text" value="" placeholder="请输入收货人姓名...">
                </li>
                <li>
                    <p>手机号</p>
                    <input v-model="editMobile" type="text" value="" placeholder="请输入收货人手机号...">
                    <img v-if="editMobile != '' " class="text_close" src="../../../assets/images/shop/text_close.png" alt="" @click="editMobile = ''">
                </li>
                <li @click="shadeBox = true">
                    <p>所在地区</p>
                    <input v-model="getGoodAddress" type="text" value="" placeholder="请输入收货地址..." readonly>
                    <img class="ic_arrow" src="../../../assets/images/arrows/ic-arrow_10_18.png" alt="">
                </li>
                <li>
                    <p>详细地址</p>
                    <input v-model="editAddressDetail" type="text" value="" placeholder="请输入收货地址...">
                </li>
            </ul>
            <div class="setSite" @click="setSite()">
                <p>设置为默认地址</p>
                <img :src="setSiteImg">
            </div>
            <!-- 保存Btn str -->
            <div class="saveBtn">
                <p @click="saveBtn()">保存</p>
            </div>
            <!-- 保存Btn end -->
        </div>
        <!-- 遮罩 str -->
        <div class="shadeBox" v-show="shadeBox">
            <div class="cityLists">
                <h3>
                    <span>所在地区</span>
                    <img src="../../../assets/images/shop/popup_close.png" alt="" @click="shadeBox = false">
                </h3>
                <ul class="chooseLists">
                    <li :class="[{chooseActive:provinceId == ''},{choose_Active:provinceId != ''},{choose_bor_bot:choose_bor_Ind == 901}]" @click="provinceBtn(901)">{{provinceText}}</li>
                    <li v-if="provinceId != ''" :class="[{chooseActive:cityId == '' && provinceId != ''},{choose_Active:cityId != ''},{choose_bor_bot:choose_bor_Ind == 902}]" @click="cityBtn(902)">{{cityText}}</li>
                    <li v-if="cityId != ''" :class="[{chooseActive:districtId == '' && cityId != ''},{choose_Active:districtId != ''},{choose_bor_bot:choose_bor_Ind == 903}]" @click="districtBtn(903)">{{districtText}}</li>
                </ul>
                <div class="cityListsAll">
                    <!-- 省 str -->
                    <ul v-show="provinceBox">
                        <li :class="{cityActive: item.id==provinceId}" v-for="item in this.provinceArr" @click="getCity(item.id,item.name)">{{item.name}}</li>
                    </ul>
                    <!-- 省 end -->
                    <!-- 市 str -->
                    <ul v-show="cityBox">
                        <li :class="{cityActive: item.id==cityId}" v-for="item in this.cityArr" @click="getDistrict(item.id,item.name)">{{item.name}}</li>
                    </ul>
                    <!-- 市 end -->
                    <!-- 区 str -->
                    <ul v-show="districtBox">
                        <li :class="{cityActive: item.id==districtId}" v-for="item in this.districtArr" @click="getCityName(item.id,item.name)">{{item.name}}</li>
                    </ul>
                    <!-- 区 end -->
                </div>
            </div>
        </div>
        <!-- 遮罩 end -->
        <!-- 编辑收货地址 end -->
        <!-- toast(loading=>weui) -->
        <div v-show="loading">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">{{loadingTxt}}</p>
            </div>
        </div>
        <!-- toast（delay=>z） -->
        <div v-show="delayToast">
            <div class="z-mask-transparent"></div>
            <div class="z-toast">
                <i class="z-toast-icon"></i>
                <p class="z-toast-content">{{delayToastTxt}}</p>
            </div>
        </div>
    </div>
</template>
<style lang='less' scoped>
    @import './editAddress.less';
</style>
<script>
    import {NewAddress,getUserGoodsAddress,getAddressDetails,amendAddress,getCityLists} from '../../../api/api.js';
    export default {
        name: "editAddress",
        components: {

        },
        data() {
            return {
                editName:"",                    //姓名
                editMobile:"",                  //手机
                editProvince:"",                //省
                editCity:"",                    //市
                editArea:"",                    //区
                editAddressDetail:"",           //详细地址
                isDefault:1,                   //是否默认
                setSiteImg:require("../../../assets/images/shop/checkbox_selected@1x.png"),                  //选择状态
                setSiteImgCheckBox:require("../../../assets/images/shop/checkbox_selected@1x.png"),
                setSiteImgNo:require("../../../assets/images/shop/checkbox_normal@1x.png"),
                loading: false,              // toast控制开关
                loadingTxt: "数据加载中",    // toast中文案
                delayToast: false,          // tips开关
                delayToastTxt: "",          // tips文案
                provinceArr:[],             //省
                cityArr:[],                 //市
                districtArr:[],             //区
                provinceId:"",              //省
                cityId:"",                  //市
                districtId:"",              //区
                provinceBox:true,              //省
                cityBox:false,                 //市
                districtBox:false,             //区
                provinceText:"请选择省",        //省
                cityText:"请选择市",            //市
                districtText:"请选择区/县",     //区
                shadeBox:false,                //遮罩
                getGoodAddress:"",             //收货地址
                choose_bor_Ind:"",             //border控制
            }
        },
        computed: {
            
        },
        methods: {
            saveBtn(){              //新增地址
                let regName = /^[\u4E00-\u9FA5A-Za-z]+$/;       //姓名匹配
                let regPhone = /^1[34578]\d{9}$/;               //手机号匹配
                if(!regName.test(this.editName)){
                    this.delayToast = true;
                    this.delayToastTxt = "姓名格式不正确";
                    setTimeout(()=>{
                        this.delayToast = false;
                    },1500);
                    return false;
                }
                if(!regPhone.test(this.editMobile)){
                    this.delayToast = true;
                    this.delayToastTxt = "手机号不正确";
                    setTimeout(()=>{
                        this.delayToast = false;
                    },1500);
                    return false;
                }
                if(this.getGoodAddress == ""){
                    this.delayToast = true;
                    this.delayToastTxt = "所在地区不能为空";
                    setTimeout(()=>{
                        this.delayToast = false;
                    },1500);
                    return false;
                }
                if(this.editAddressDetail == ""){
                    this.delayToast = true;
                    this.delayToastTxt = "详细地址不能为空";
                    setTimeout(()=>{
                        this.delayToast = false;
                    },1500);
                    return false;
                }
                this.loading = true;            //loading
                let addressId = this.$route.query.addressId;            //
                if(addressId){
                    this.$http({
                        url:amendAddress,
                        method:"POST",
                        data:{
                            id:addressId,
                            is_default:this.isDefault,      //	是否默认
                            name:this.editName,             //	姓名
                            mobile:this.editMobile,         //	手机
                            province:this.provinceId,       //	省
                            city:this.cityId,               //	市
                            area:this.districtId,           //	区
                            address_detail:this.editAddressDetail,  //	详细地址
                        }
                    }).then((res)=>{
                        this.loading = false;        //loading
                        if(res.data.status == 1){
                            console.log(res);
                            this.$router.push({path:'address',query:{shopId:this.$route.query.shopId,payShopNum:this.$route.query.payShopNum,deliveryWay:this.$route.query.deliveryWay}})
                        }else{
                            this.delayToast = true;
                            this.delayToastTxt = res.data.msg;
                            setTimeout(()=>{
                                this.delayToast = false;
                            },1500);
                        }
                    });
                }else{
                    this.$http({
                        url:NewAddress,
                        method:"POST",
                        data:{
                            is_default:this.isDefault,      //	是否默认
                            name:this.editName,             //	姓名
                            mobile:this.editMobile,         //	手机
                            province:this.provinceId,       //	省
                            city:this.cityId,               //	市
                            area:this.districtId,           //	区
                            address_detail:this.editAddressDetail,  //	详细地址
                        }
                    }).then((res)=>{
                        this.loading = false;        //loading
                        if(res.data.status == 1){
                            console.log(res);
                            this.$router.push({path:'address',query:{shopId:this.$route.query.shopId,payShopNum:this.$route.query.payShopNum,deliveryWay:this.$route.query.deliveryWay}})
                        }else{
                            this.delayToast = true;
                            this.delayToastTxt = res.data.msg;
                            setTimeout(()=>{
                                this.delayToast = false;
                            },1500);
                        }
                    });
                }
            },
            setSite(){          //是否为默认收货地址
                if(this.isDefault == 0){
                    this.isDefault = 1;
                    this.setSiteImg = this.setSiteImgCheckBox;
                }else{
                    this.isDefault = 0;
                    this.setSiteImg = this.setSiteImgNo;
                }
            },
            getAddDetails(){            //获取用户收货地址详情
                let addressId = this.$route.query.addressId;
                if(addressId){
                    this.loading = true;        //loading
                    this.$http({
                        url:getAddressDetails,
                        method:"POST",
                        data:{
                            address_id:addressId
                        }
                    }).then((res)=>{
                        this.loading = false;           //loading
                        if(res.data.status == 1){
                            console.log(res);
                            let addressMsg = res.data.data;             //地址信息详情
                            this.editName = addressMsg.name;         //姓名
                            this.editMobile = addressMsg.mobile;     //手机
                            this.editProvince = addressMsg.province; //省
                            this.editCity = addressMsg.city;         //市
                            this.editArea = addressMsg.area;         //区
                            this.provinceId = addressMsg.province;   //省
                            this.cityId = addressMsg.city;           //市
                            this.districtId = addressMsg.area;       //区
                            this.editAddressDetail = addressMsg.address_detail;      //详细地址
                            this.isDefault = addressMsg.is_default;  //是否默认
                            this.provinceText = addressMsg.province_str;
                            this.cityText = addressMsg.city_str;
                            this.districtText = addressMsg.area_str;
                            this.getGoodAddress = addressMsg.province_str + addressMsg.city_str + addressMsg.area_str;
                            if(this.isDefault == 0){
                                this.setSiteImg = this.setSiteImgNo;
                            }else{
                                this.setSiteImg = this.setSiteImgCheckBox;
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
            },
            getProvince(){  //获取城市
                this.$http({
                    url:getCityLists,
                    method:"POST",
                    data:{
                        type:1
                    }
                }).then((res)=>{
                    if(res.data.status == 1){
                        console.log(res);
                        this.provinceArr = res.data.data;
                    }else{
                        this.delayToast = true;
                        this.delayToastTxt = res.data.msg;
                        setTimeout(()=>{
                            this.delayToast = false;
                        },1500);
                    }
                });
            },
            getCity(areaId,provinceName){
                this.choose_bor_Ind = 902;
                if(this.provinceId == "" || this.provinceId != areaId){
                    this.$http({
                        url:getCityLists,
                        method:"POST",
                        data:{
                            area_id:areaId,
                            type:2
                        }
                    }).then((res)=>{
                        if(res.data.status == 1){
                            console.log(res);
                            this.cityArr = res.data.data;
                            this.provinceBox = false;
                            this.cityBox = true;
                            this.districtBox = false;
                            this.provinceText = provinceName;
                            this.provinceId = areaId;
                            this.cityId = "";
                            this.districtId = "";
                            this.cityText = "请选择市";
                        }else{
                            this.delayToast = true;
                            this.delayToastTxt = res.data.msg;
                            setTimeout(()=>{
                                this.delayToast = false;
                            },1500);
                        }
                    });
                }else{
                    this.provinceBox = false;
                    this.cityBox = true;
                    this.districtBox = false;
                }
            },
            getDistrict(areaId,cityName){
                this.choose_bor_Ind = 903;
                if(this.cityId == "" || this.cityId != areaId){
                    this.$http({
                        url:getCityLists,
                        method:"POST",
                        data:{
                            area_id:areaId,
                            type:3
                        }
                    }).then((res)=>{
                        if(res.data.status == 1){
                            console.log(res);
                            this.districtArr = res.data.data;
                            this.provinceBox = false;
                            this.cityBox = false;
                            this.districtBox = true;
                            this.cityText = cityName;
                            this.cityId = areaId;
                            this.districtId = "";
                            this.districtText = "请选择区";
                        }else{
                            this.delayToast = true;
                            this.delayToastTxt = res.data.msg;
                            setTimeout(()=>{
                                this.delayToast = false;
                            },1500);
                        }
                    });
                }else{
                    this.provinceBox = false;
                    this.cityBox = false;
                    this.districtBox = true;
                }
            },
            getCityName(areaId,districtName){
                this.districtText = districtName;
                this.districtId = areaId;
                this.shadeBox = false;
                this.getGoodAddress = this.provinceText + this.cityText + this.districtText;
            },
            provinceBtn(choose_bor_Ind){        //点击选择省份
                this.choose_bor_Ind = choose_bor_Ind;
                this.provinceBox = true;
                this.cityBox = false;
                this.districtBox = false;
            },
            cityBtn(choose_bor_Ind){            //点击选择城市
                this.choose_bor_Ind = choose_bor_Ind;
                this.provinceBox = false;
                this.cityBox = true;
                this.districtBox = false;
            },
            districtBtn(choose_bor_Ind){        //点击选择区域
                this.choose_bor_Ind = choose_bor_Ind;
                this.provinceBox = false;
                this.cityBox = false;
                this.districtBox = true;
            }
        },
        mounted() {
            this.getAddDetails();           //获取用户收货地址详情
            this.getProvince();             //获取省
        }
    }
</script>

