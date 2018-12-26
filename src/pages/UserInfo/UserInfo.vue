<template>
    <div id="contactInfoPage" class="m-position-ab">
        <div v-if="contactList" class="list">
            <slip-del v-for="(item) in contactList" :key="item.id" class="item" ref="slipDel" del-text="删除" @slip-open="slipOpen(item.id)" @del-click="delItem(item.id)">
                <div class="bd">
                    <p class="name">{{item.username}}</p>
                    <p class="tel">{{item.mobile}}</p>
                    <span class="edit" @click="edit(item.id,item.type,item.username,item.mobile)"><img src="../../assets/images/icon/ic-edit.png" alt=""></span>
                </div>
                <div class="ft" @click="select(item.id,item.type,item.username,item.mobile)">
                    设置为默认联系人
                    <span class="select"><img :src="item.type == 1 ? imgSrcActive : imgSrcDefault" alt=""></span>
                </div>
            </slip-del>
        </div>
        <div v-else class="no-contact">
            <img src="../../assets/images/404/404contact.png" alt="">
            <p>暂无常用旅客信息</p>
        </div>
        <!-- toast（delay=>z） -->
        <div v-show="delayToast">
            <div class="z-mask-transparent"></div>
            <div class="z-toast">
                <i class="z-toast-icon"></i>
                <p class="z-toast-content">{{delayToastTxt}}</p>
            </div>
        </div>
        <router-link to="/addContact" tag="span">
            <div class="bar">
                +添加入住联系人
            </div>
        </router-link>
    </div>
</template>

<script>
import SlipDel from "vue-slip-delete";
import { residentList, addResident, deleteDntList } from "@/api/api";
export default {
    name: "contactInfoPage",
    components: { SlipDel },
    data() {
        return {
            contactList: [],
            imgSrcDefault: require("../../assets/images/icon/ic-radio.png"),
            imgSrcActive: require("../../assets/images/icon/ic-radio-ed.png"),
            delayToastTxt: "",
            delayToast: false
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        // 拉取数据
        fetchData() {
            this.$http({
                method: "POST",
                url: residentList,
                data: {}
            })
                .then(res => {
                    if (res.data.status == 1) {
                        this.contactList = "";
                        this.contactList = res.data.data;
                    } else {
                        this.contactList = "";
                    }
                })
                .catch(err => {});
        },
        // 设置默认联系人
        select(id, type, username, mobile) {
            if (type == 1) {
                type = 0;
            } else {
                type = 1;
            }
            this.$http({
                method: "POST",
                url: addResident,
                data: {
                    id: id,
                    type: type,
                    username: username,
                    mobile: mobile
                }
            })
                .then(res => {
                    if (res.data.status == 1) {
                        this.fetchData();
                    } else {
                    }
                })
                .catch(err => {});
        },
        edit(id, type, username, mobile) {
            this.$router.push({
                path: "addContact",
                query: {
                    id: id,
                    type: type,
                    username: username,
                    mobile: mobile
                }
            });
        },
        // 滑动打开后的回调
        slipOpen(vm) {},
        // 点击删除的回调
        delItem(id) {
            this.$http({
                method: "POST",
                url: deleteDntList,
                data: { resident_id: id }
            }).then(res => {
                if (res.data.status == 1) {
                    this.delayToastTxt = "删除成功";
                    this.delayToast = true;
                    setTimeout(() => {
                        this.delayToast = false;
                        this.fetchData();
                    }, 2000);
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
#contactInfoPage {
    overflow: auto;
    padding-bottom: 85px;
    background: #fff;
}

// list的css
.list {
    background: #EFF1F0;
    .item {
        background: #fff;
        margin-bottom: 10px;
        .bd {
            padding: 10px 0;
            position: relative;
            &:after {
                content: "";
                width: 100%;
                height: 1px;
                position: absolute;
                bottom: 0;
                background: #e5e5e5;
                transform: scaleY(0.5);
            }
            .name {
                padding: 0 15px;
                line-height: 21px;
                margin-bottom: 8px;
                color: #333;
                font-size: 15px;
                font-weight: 400;
                letter-spacing: 1px;
            }
            .tel {
                padding: 0 15px;
                line-height: 15px;
                color: #666;
                font-size: 13px;
                font-weight: bold;
            }
            .edit {
                position: absolute;
                width: 20px;
                height: 20px;
                right: 15px;
                top: 50%;
                transform: translateY(-50%);
                img {
                    display: block;
                    width: 20px;
                    height: 20px;
                }
            }
        }
        .ft {
            padding: 0 15px;
            line-height: 45px;
            font-size: 14px;
            position: relative;
            .select {
                width: 20px;
                height: 20px;
                position: absolute;
                right: 15px;
                top: 50%;
                transform: translateY(-50%);
                border-radius: 50%;
                img {
                    display: block;
                    width: 20px;
                    height: 20px;
                }
            }
        }
        &:last-of-type {
            margin-bottom: 0;
        }
    }
}

.bar {
    left: 15px;
    right: 15px;
    bottom: 40px;
    position: fixed;
    background: #30b097;
    line-height: 45px;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
}
// 无常用联系人
.no-contact {
    margin-top: 170px;
    img {
        display: block;
        width: 152px;
        height: 108px;
        margin: 0 auto;
    }
    p {
        line-height: 20px;
        font-size: 14px;
        color: #666;
        text-align: center;
    }
}
</style>