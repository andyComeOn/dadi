<template>
    <div class="coupon">
        <!-- toast提示 -->
        <div v-show="isCouponItemToastVisible">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">数据加载中</p>
            </div>
        </div>
        <ul v-if="items.length>0">
            <li class="item" v-for="(item,index) in items" :key="index" :class="{itemStatus0:item.status==0,itemStatus1:item.status==1,itemStatus2:item.status==2}">
                <div class="lf">
                    <!-- （{{item.store_flag|filterCouponStoreflag}}） -->
                    <div class="name m-ellipsis">秋果酒店代金券</div>
                    <div class="date-area">有效期：{{item.validity_begin_time|filterTimeYTD}}至{{item.validity_end_time|filterTimeYTD}}</div>
                    <div class="desc">满 {{item.min_amount|filterMoneyInt}} 可用</div>
                </div>
                <div class="rg">
                    <div class="price">
                        &yen;
                        <span>{{item.amount|filterMoneyInt}}</span>
                    </div>
                    <div class="btn" @click="nowUse(item.status,item.id)">立即使用</div>
                </div>
                <label class="lab" :for="item.id">
                    <img v-if="item.status==1" src="../assets/images/coupon/ic-used.png" alt="">
                    <img v-if="item.status==2" src="../assets/images/coupon/ic-out-date.png" alt="">
                </label>
            </li>
        </ul>
        <!-- 用户无优惠券展示 -->
        <div v-else class="no-coupon">
            <img src="../assets/images/404/404-no-coupon.png" alt="">
            <p>暂无优惠券</p>
        </div>

    </div>
</template>
<script>
import { coupon_list } from "@/api/api";
export default {
    data() {
        return {
            items: "",
            isCouponItemToastVisible: true // 搜索
        };
    },
    mounted() {
        this.fetchCoupon();
    },
    methods: {
        nowUse(status, id) {
            this.$emit("nowUseEmit", status, id);
        },
        fetchCoupon() {
            this.$http({
                method: "POST",
                url: coupon_list,
                data: {}
            })
                .then(res => {
                    this.isCouponItemToastVisible = false;
                    if (res.data.status == 1) {
                        this.items = res.data.data;
                    } else {
                    }
                })
                .catch();
        }
    }
};
</script>
<style lang="less" scoped>
.coupon {
    .item {
        padding: 10px 30px 10px 15px;
        height: 90px;
        display: flex;
        position: relative;
        background: #fff;
        margin-bottom: 10px;
        &:before {
            content: "";
            width: 2px;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
        .lf {
            flex: 1;
            padding-right: 10px;
            .name {
                height: 20px;
                line-height: 20px;
                margin-bottom: 4px;
                font-size: 14px;
                color: #666;
            }
            .date-area,
            .desc {
                line-height: 16px;
                font-size: 12px;
                color: #999;
                margin-bottom: 10px;
            }
            .desc {
                color: #666;
            }
        }
        .rg {
            width: 84px;
            padding-left: 20px;
            position: relative;
            text-align: center;
            &:before {
                content: "";
                width: 1px;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                background: #cccccc;
            }

            .price {
                margin-bottom: 5px;
                height: 28px;
                span {
                    font-size: 20px;
                    font-family: DINAlternate-Bold;
                }
            }
            .btn {
                width: 60px;
                font-size: 12px;
                line-height: 24px;
                border-radius: 2px;
            }
        }
        .lab {
            width: 42px;
            height: 42px;
            position: absolute;
            top: 0;
            right: 0;
            z-index: 0;
            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        // 未使用，（有效）
        &.itemStatus0 {
            &:before {
                background: #30b097;
            }
            .price {
                color: #ffba56;
            }
            .btn {
                border: 1px solid #30b097;
                color: #30b097;
            }
        }
        // 已使用
        &.itemStatus1 {
            &:before {
                background: #cccccc;
            }
            .price {
                color: #cccccc;
            }
            .btn {
                border: 1px solid #e5e5e5;
                color: #ccc;
            }
        }
        // 已过期
        &.itemStatus2 {
            &:before {
                background: #cccccc;
            }
            .price {
                color: #ccc;
            }
            .btn {
                border: 1px solid #e5e5e5;
                color: #ccc;
            }
        }
    }
}
// -------------------无优惠券--------------------
.no-coupon {
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