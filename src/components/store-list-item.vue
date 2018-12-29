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
        <ul class="list" v-if="dataList">
            <li v-for="(item,index) in dataList" :key="index" @click="storeDetail(item.id,item.begin,item.finish)">
                <div class="lf">
                    <img :src="item.logo" alt="">
                </div>
                <div class="rg">
                    <p class="name m-ellipsis">{{item.name}}</p>
                    <p class="info m-ellipsis-2">{{item.introduce}}</p>
                    <p class="location">
                        <span>{{item.city}}</span>
                        <span class="wrapper">
                            -
                            <span style="color:#30B097;"> {{item.area}}</span> 距离您
                            <span style="color:#30B097;">{{item.distance}}</span>
                        </span>
                    </p>
                    <div class="price-wrap">
                        <span class="yen">&yen;</span>
                        <span class="price">{{item.price}}</span>
                        起
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
            immediate: true
        }
    },
    data() {
        return {
            isShow: false,
            dataList: "", // 门店list
            isRoomItemToastVisible: true // 搜索
        };
    },
    created() {},
    mounted() {},
    methods: {
        // 拉取门店item
        fetchData(param) {
            this.$http({
                method: "POST",
                url: store_list,
                data: param
            }).then(res => {
                this.isRoomItemToastVisible = false;
                if (res.data.status == 1) {
                    this.dataList = res.data.data;
                } else if (res.data.status == -1) {
                    this.dataList = "";
                    this.fetchCheckLoginPackage();
                } else if (res.data.status == -2) {
                    this.dataList = "";
                    this.isShow = true;
                } 
            });
        },
        // 门店item的点击事件
        storeDetail(id, begin, finish) {
            this.$router.push({
                path: "/hotelDetail",
                query: {
                    store_id: id,
                    begin: begin,
                    finish: finish
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
        }
        .rg {
            margin-left: 100px;
            padding: 5px 0 0 10px;
            .name {
                font-size: 16px;
                color: rgba(51, 51, 51, 1);
                line-height: 22px;
                margin-bottom: 5px;
            }
            .info {
                line-height: 16px;
                font-size: 12px;
                color: rgba(102, 102, 102, 1);
            }
            .location {
                margin-top: 5px;
                margin-bottom: 10px;
                line-height: 16px;
                font-size: 12px;
                color: rgba(102, 102, 102, 1);
            }
            .price-wrap {
                line-height: 21px;
                vertical-align: bottom;
                font-size: 12px;
                color: #666;
                .yen {
                    color: #ffba56;
                }
                .price {
                    font-size: 16px;
                    color: #ffba56;
                    line-height: 1;
                }
            }
        }
    }
}
</style>