<template>
    <div class="room-wrapper">
        <!-- toast提示 -->
        <div v-show="isRoomItemToastVisible">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">数据加载中</p>
            </div>
        </div>
        <!-- 搜索到的酒店列表 -->
        <ul class="list" v-if="dataList.length > 0">
            <li v-for="(item,index) in dataList" :key="index" @click="storeDetail(item.is, item.id,item.begin,item.finish)">
                <div class="lf">
                    <img :src="item.logo" alt="">
                    <div class="mask" :class="{isFull: (item.is != 1 ? true : false)}"></div>
                </div>
                <div class="rg">
                    <p class="name m-ellipsis" :class="{isFull: (item.is != 1 ? true : false)}">{{item.name}}</p>
                    <p class="info m-ellipsis-2" :class="{isFull: (item.is != 1 ? true : false)}">{{item.introduce}}</p>
                    <p class="location" :class="{isFull: (item.is != 1 ? true : false)}">
                        {{item.city}} - {{item.area}} 距离您<span class="distance" :class="{isFull: (item.is != 1 ? true : false)}">{{item.distance}}</span>
                    </p>
                    <div class="priceWrap" :class="{isFull: (item.is != 1 ? true : false)}">
                        <span class="yen">&yen;</span>
                        <span class="price">{{item.price}}</span>
                        <span class="txt" :class="{isFull: (item.is != 1 ? true : false)}">起</span>
                        <template v-if="item.is == 1">
                            <span v-if="item.integral_status" class="exchange_hint">{{item.integral_status}}</span>
                            <span v-if="item.is_receive_foreign == 0" class="guests">内宾</span>
                            <span v-if="item.marketing_type" class="exchange_hint">{{item.marketing_type}}</span>
                        </template>
                        <template v-else>
                            <span v-if="item.integral_status" class="exchange_hint_ccc">{{item.integral_status}}</span>
                            <span v-if="item.is_receive_foreign == 0" class="guests_ccc">内宾</span>
                            <span v-if="item.marketing_type" class="exchange_hint_ccc">{{item.marketing_type}}</span>
                        </template>
                    </div>
                </div>
                <div class="watermark" :class="{isFull: (item.is != 1 ? true : false)}">
                    <div class="circleSolid">
                        <div class="circleDashed">
                            <span>已订完</span>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <!-- 无搜索到符合条件的酒店 -->
        <div class="no-search-result-wrapper" v-else v-show="isShow">
            <div class="img-wrapper">
                <img src="../assets/images/404/404-no-hotel.png" alt="">
            </div>
            <p>暂无符合您要求的酒店</p>
        </div>
    </div>
</template>

<script>
import { store_list } from "@/api/api";
import { fetchCheckLogin } from "@/utils/util";
export default {
    name: "room-wrapper",
    props: ["condition"],
    watch: {
        condition: {
            handler(newValue, oldValue) {
               this.fetchData(newValue);
            },
            deep: true,
            immediate: true // 若放开该代码，首次进入SearchResult会执行2次，后台说是连续2次请求，他们会出错。
        }
    },
    data() {
        return {
            isShow: false,
            dataList: [], // 门店list
            isRoomItemToastVisible: true, // 搜索
            flag: true,
            globalCpid:''
        };
    },
    created() {
        this.globalCpid = Number(this.condition.cpid);      //cpid 判断价格展示/隐藏   华驿隐藏价格   
    },
    methods: {
        // 拉取门店item
        fetchData(param) {
            this.isRoomItemToastVisible = true;
            if (this.flag == true) {
                this.flag = false;
                this.$http({
                    method: "POST",
                    url: store_list,
                    data: param
                }).then(res => {
                    this.isRoomItemToastVisible = false;
                    this.flag = true;
                    if (res.data.status == 1) {
                        this.dataList = res.data.data;
                    } else {
                        this.dataList = [];
                        this.isShow = true;
                    }
                });
            }
        },
        // 门店item的点击事件
        storeDetail(isHasRoom, id, begin, finish) {
            if (isHasRoom != 1) {
                return
            }
            this.$router.push({
                path: "/hotelDetail",
                query: {
                    store_id: id,
                    begin: begin,
                    finish: finish,
                    is_type:this.$route.query.is_type
                }
            });
        },
        fetchCheckLoginPackage(){
            fetchCheckLogin({tg:"" ,form: encodeURIComponent(window.location.href)}).then(res => {
                if (res.data.status == 0) {
                    window.location.href = res.data.data;
                } else {
                    setCookie("userInfoTel", res.data.data.mobile);  //手机号
                    setCookie("userVipStatus", res.data.data.status);  //会员状态（0待审、1正常、2锁定）
                    setCookie("userUid", res.data.data.uid);
                    setCookie("userInfoIsRealname", res.data.data.is_realname); //真实姓名
                    setCookie("userInfoGroupid", res.data.data.group_id);  //会员组id
                    setCookie("nickname", encodeURI(res.data.data.nickname));		//昵称
                    setCookie("openid", res.data.data.openid);  
                    setCookie("avatar", res.data.data.avatar);  //avatar
                    setCookie('avail_amount',res.data.data.avail_amount);
                    if (res.data.data.coupon_flag == 0) {
                        setCookie("isYouzan", 0); // 判断是不是有赞用户 1是(弹系统维护提示) 0不是（不弹）
                    } else {
                        setCookie("isYouzan", 1); // 判断是不是有赞用户 1是(弹系统维护提示) 0不是（不弹）
                    }
                    
                }
            })
        },
    }
};
</script>

<style lang="less" scoped>
.no-search-result-wrapper {
    padding-top: 15px;
    background: #eff1f0;
    .img-wrapper {
        font-size: 0;
        text-align: center;
        img {
            display: inline-block;
            width: 152px;
            height: 108px;
        }
    }
    p {
        padding: 18px 0;
        line-height: 20px;
        font-size: 14px;
        color: #666;
        text-align: center;
    }
}

.list {
    padding: 8px 15px 0;
    padding: 8px 15px;
    background: #fff;
    li {
        padding: 5px 0;
        height: 130px;
        position: relative;
        &:after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            height: 1px;
            background: #e5e5e5;
            transform: scaleY(0.5);
        }
        &:nth-last-child(1) {
            &:after {
                content: "";
                position: absolute;
                left: 0;
                bottom: 0;
                right: 0;
                height: 0;
                background: #e5e5e5;
                transform: scaleY(0.5);
            }
        }
        .lf {
            width: 100px;
            height: 120px;
            float: left;
            background-image: url("../assets/images/default/jiudian.jpg");
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 100px 120px;
            overflow: hidden;
            position: relative;
            border-radius: 3px; 
            img {
                position: absolute;
                width: 100px;
                height: 120px;
                top: 50%;
                left: 50%;
                margin-left:-50px;
                margin-top: -60px;
                border-radius: 3px;
            }
            .mask {
                display: none;
                width: 100px;
                height: 120px;
                background: rgba(255, 255, 255, .5);
                position: absolute;
                top: 0;
                left: 0;
                z-index: 2;
                &.isFull {
                    display: block;
                }
            }
        }
        .rg {
            margin-left: 100px;
            padding: 5px 0 0 10px;
            .name {
                font-size: 16px;
                color: #333;
                line-height: 22px;
                margin-bottom: 5px;
                &.isFull {
                    color: #999;
                }
            }
            .info {
                line-height: 16px;
                font-size: 12px;
                color: #666;
                &.isFull {
                    color: #999;
                }
            }
            .location {
                margin-top: 5px;
                margin-bottom: 10px;
                line-height: 16px;
                font-size: 12px;
                color: #666;
                &.isFull {
                    color: #999;
                }
                .distance {
                    color:#30B097;
                    &.isFull {
                        color: #999;
                    }
                }
            }
            .priceWrap {
                line-height: 21px;
                vertical-align: bottom;
                font-size: 12px;
                color: #ffba56;
                &.isFull {
                    color: #999;
                }
                .price {
                    font-size: 16px;
                    line-height: 1;
                }
                .txt {
                    color: #666;
                    &.isFull {
                        color: #999;
                    }
                }
            }
        }
        .watermark {
            display: none;
            width: 80px;
            height: 80px;
            background: #fff;
            position: absolute;
            bottom: 5px;
            right: -2px;
            z-index: 2;
            border-radius: 50%; 
            &.isFull {
                display: block;
            }
            .circleSolid {
                width: 100%;
                height: 100%;
                border: 1px solid #999;
                padding: 5px;
                border-radius: 50%; 
                .circleDashed {
                    width: 100%;
                    height: 100%;
                    border: 1px dashed #999;
                    border-radius: 50%; 
                    text-align: center;
                    line-height: 68px;
                    span {
                        display: inline-block;
                        line-height: 24px;
                        font-size: 16px;
                        font-weight: bold;
                        color: #999;
                        border: 1px solid #999;
                        border-left: none;
                        border-right: none;
                        transform: rotate(-15deg);
                    }
                }
            }
        }
    }
}
.exchange_hint{
    padding:3px 6px;
    font-size: 11px;
    color: #F78C3E;
    background: #FFF6EC;
}
.exchange_hint_ccc{
    padding:3px 6px;
    font-size: 11px;
    color: #999;
    background:#eee;
}
.guests{
    padding:3px 6px;
    font-size: 11px;
    color: #30B097;
    background:rgba(48,176,151,0.15);
}
.guests_ccc{
    padding:3px 6px;
    font-size: 11px;
    color: #999;
    background:#eee;
}
</style>