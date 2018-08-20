<template>
    <div class="order m-position-ab">
        <div class="detail-container">
            <div class="detail-wrapper" v-if="details">
                <!-- 酒店名字 -->
                <div class="name m-ellipsis">{{details.store_name}}</div>
                <!-- 酒店标签 -->
                <div class="labels">
                    <span>{{details.name}}</span>
                    <span>{{details.introduce}}</span>
                </div>
                <div class="area">
                    <span class="instro">入住</span>
                    <span class="date">{{beginM}}月{{beginD}}日</span>
                    <span class="instro">离店</span>
                    <span class="date">{{finishM}}月{{finishD}}日</span>
                    <span class="date">{{howManyNight}}晚</span>
                </div>
            </div>
        </div>
        <!-- 用户信息操作区 -->
        <ul class="info">
            <!-- 房间数 -->
            <li class="room">
                <label class="label">房间数</label>
                <div class="room-info" @click="selectRoom">
                    {{quantity}}间
                    <img class="arrow-icon" src="../../assets/images/arrows/ic_pay_arrow.png" alt="">
                    <!-- <span class="span-minus" @click="minusRoomNum"><img :src="imgSrcMinus" alt=""></span>
                    <span class="span-input">
                        <input type="number" class="txt" id="" v-model="watchObj.room_sum">
                    </span>
                    <span class="span-plus" @click="plusRoomNum"><img :src="imgSrcPlus" alt=""></span> -->
                </div>
            </li>
            <!-- 可定房间的列表 -->
            <div class="room-num-select" v-show="isSelectRoom">
                <span v-for="(item,index) in roomNumItems" :key="index">
                    <i :class="[{canSel:item.isCanSel},{default: isActive == item.num }]" @click="selectOrder(item.num,item.isCanSel)">{{item.num}}</i>
                </span>
            </div>
            <!-- 入住人姓名 -->
            <li class="name">
                <label class="label">入住人姓名</label>
                <div class="item-rg">
                    <div class="name-div">
                        <input type="text" class="input-name" id="name" placeholder="请输入姓名" @blur="orderNameBlur" @focus="orderNameFocus" v-model="orderName">
                    </div>
                    <span v-show="orderNameTipsVisible" class="errTips">{{orderNameTxt}}</span>
                </div>
            </li>

            <!-- 手机号 -->
            <li class="tel">
                <label class="label">手机号</label>
                <div class="item-rg">
                    <div class="tel-div">
                        <input type="tel" class="input-tel" id="tel" placeholder="请输入手机号" @blur="orderTelBlur" @focus="orderTelFocus" v-model="orderTel">
                        <span v-show="orderTelTipsVisible" class="errTips">{{orderTelTxt}}</span>
                    </div>
                </div>
            </li>

            <!-- 分割bar -->
            <div class="divivid-bar"></div>

            <!-- 优惠券 -->
            <li class="coupon" v-if="coupon">
                <label class="label">优惠券</label>
                <div class="item-rg">
                    <div class="coupon-div" @click="showCouponMask">
                        {{coupon.length}}张可用
                        <img src="../../assets/images/arrows/ic-arrow_10_18.png" alt="">
                    </div>
                </div>
            </li>

            <!-- 发票 -->
            <li class="ticket">
                <label class="label">发票</label>
                <div class="item-rg" style="color:#666;font-size:14px;line-height:50px;">
                    酒店开具发票
                </div>
            </li>
        </ul>

        <!-- 文字提示 -->
        <div class="tips">
            <h3>温馨提示</h3>
            <p>1.酒店与住店当天13:00办理入住，离店13:00办理退房，如您在13:00前未到达，可能需要等待方能入住，具体以酒店安排为准。 </p>
            <p>2.发票由酒店开具。</p>
        </div>

        <!-- 确认支付bar -->
        <div class="paybar">
            <div class="lf">
                <div class="money">&yen;{{totalPrice}}</div>
                <div class="arrow" @click="showDealDetailMask"><img src="../../assets/images/arrows/ic_pay_arrow.png" alt=""></div>
            </div>
            <div class="rg" @click="pay">支付</div>
        </div>

        <!-- 优惠券的弹框 -->
        <div class="coupon-mask-box">
            <div class="weui-mask zb-weui-mask" id="couponMask" @click="hideCouponMask" :class="[{'weui-actionsheet_no_toggle_active':isCouponMask},{'weui-actionsheet_no_toggle':!isCouponMask}]"></div>
            <div class="weui-actionsheet zb-weui-actionsheet" id="weui-actionsheet" :class="[{'weui-actionsheet_toggle':isCouponMask}]">
                <!-- 弹框的title -->
                <div class="weui-actionsheet__title zb-weui-actionsheet__title">
                    <p class="weui-actionsheet__title-text zb-weui-actionsheet__title-text">优惠券</p>
                </div>
                <!-- 弹框的内容 -->
                <div class="weui-actionsheet__menu">
                    <!-- 循环下面的整体 -->
                    <div class="zb-actionsheet__bd" v-for="(item,index) in coupon" :key="index">
                        <div class="weui-cells zb-weui-cells weui-cells_checkbox">
                            <label class="weui-cell zb-weui-cell weui-check__label" :for="item.id">
                                <div class="weui-cell__bd div zb-weui-cell__hd">
                                    <h4>满{{item.min_amount}}元减{{item.amount}}元</h4>
                                    <p>截止日期：{{item.validity_end_time}}</p>
                                </div>
                                <div class="weui-cell__hd div" style="font-family:DIN;">
                                    &yen;{{item.amount}}
                                    <input type="radio" class="weui-check" :id="item.id" :value="{id:item.id,min_amount:item.min_amount,amount:item.amount}" v-model="initCoupon">
                                    <i class="weui-icon-checked"></i>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <!-- 弹框的取消-ui说不需要此交互 -->
                <!-- <div class="weui-actionsheet__action" style="background:#fff;"> -->
                <!-- <div class="weui-actionsheet__cell" id="coupon_actionsheet_cancel" style="font-size:16px;" @click="hideCouponMask">取消</div> -->
                <!-- </div> -->
            </div>
        </div>

        <!-- 交易明细弹框 -->
        <div class="deal-detail-mask-box">
            <div class="weui-mask zb-weui-mask" id="dealDetailMask" @click="hideDealDetailMask" :class="[{'weui-actionsheet_no_toggle_active':isDealDetailMask},{'weui-actionsheet_no_toggle':!isDealDetailMask}]"></div>
            <div class="weui-actionsheet zb-weui-actionsheet" id="weui-actionsheet" :class="[{'weui-actionsheet_toggle':isDealDetailMask}]">
                <!-- 交易明细弹框的title -->
                <div class="weui-actionsheet__title zb-weui-actionsheet__title">
                    <p class="weui-actionsheet__title-text zb-weui-actionsheet__title-text">费用明细</p>
                </div>
                <!-- 交易明细弹框的内容 -->
                <div class="weui-actionsheet__menu">
                    <!-- 循环下面的整体 -->
                    <div class="zb-actionsheet__bd">
                        <div class="weui-cells zb-weui-cells weui-cells_checkbox">
                            <label class="weui-cell zb-weui-cell weui-check__label " for="deal1">
                                <div class="weui-cell__bd div zb-weui-cell__hd">
                                    <h4>{{howManyNight}}晚、{{watchObj.room_sum}}间共</h4>
                                </div>
                                <div class="weui-cell__hd div">
                                    &yen;{{totalPrice}}
                                </div>
                            </label>
                        </div>
                    </div>
                    <div class="zb-actionsheet__bd" v-if="price" v-for="(item,index) in price" :key="index">
                        <div class="weui-cells zb-weui-cells weui-cells_checkbox">
                            <label class="weui-cell zb-weui-cell weui-check__label " for="deal1">
                                <div class="weui-cell__bd div zb-weui-cell__hd">
                                    <h4>{{item.add_time}}</h4>
                                </div>
                                <div class="weui-cell__hd div">
                                    <span style="color:#666;">{{howManyNight}}间 * </span> &yen;{{item.unit_price * howManyNight}}
                                </div>
                            </label>
                        </div>
                    </div>
                    <!-- 交易明细优惠券 -->
                    <div class="zb-actionsheet__bd" v-if="initCoupon">
                        <div class="weui-cells zb-weui-cells weui-cells_checkbox">
                            <label class="weui-cell zb-weui-cell weui-check__label " for="deal1">
                                <div class="weui-cell__bd div zb-weui-cell__hd">
                                    <h4>优惠券折扣</h4>
                                </div>
                                <div class="weui-cell__hd div">
                                    <span style="color:#666;">满{{initCoupon.min_amount}}减{{initCoupon.amount}}</span>
                                </div>
                            </label>
                        </div>
                    </div>
                    <!-- 交易明细实付 -->
                    <div class="zb-actionsheet__bd">
                        <div class="weui-cells zb-weui-cells weui-cells_checkbox">
                            <label class="weui-cell zb-weui-cell weui-check__label " for="deal1">
                                <div class="weui-cell__bd div zb-weui-cell__hd">
                                    <h4>总计</h4>
                                </div>
                                <div class="weui-cell__hd div">
                                    <span style="color:#666;">实付金额：</span> &yen;{{totalPrice}}
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <!-- 弹框的取消 -->
                <!-- <div class="weui-actionsheet__action" style="background:#fff;">
                    <div class="weui-actionsheet__cell" 
                        id="deal_detail_actionsheet_cancel" 
                        style="font-size:16px;" 
                        @click="hideDealDetailMask">取消</div>
                </div> -->
            </div>
        </div>
        <!-- toas提示 -->
        <div v-show="OrderFullToast">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-error weui-icon_toast"></i>
                <p class="weui-toast__content">您今日可订限额已用完，请明天再来</p>
            </div>
        </div>
    </div>
</template>

<script>
import { dateEndMinusStart } from "@/utils/date"; // 引入封装时间函数
import { order_form, increase_room_num, create_order } from "@/api/api";
export default {
    name: "order",
    components: {},
    data() {
        return {
            isCouponMask: false,
            isDealDetailMask: false,
            isSelectRoom: false,
            // 加减房间数按钮img的src路径
            btnPlus: require("../../assets/images/btn-plus-minus/plus.png"),
            btnPlusActive: require("../../assets/images/btn-plus-minus/plusA.png"),
            btnMinus: require("../../assets/images/btn-plus-minus/minus.png"),
            btnMinusActive: require("../../assets/images/btn-plus-minus/minusA.png"),
            watchObj: {
                store_id: "",
                room_id: "",
                begin: "",
                finish: "",
                room_sum: 1 //默认的房间数
            },

            beginY: "",
            beginM: "",
            beginD: "",

            finishY: "",
            finishM: "",
            finishD: "",

            howManyNight: "",
            // --------
            // 优惠券
            initCoupon: "",
            // 门店详情
            details: {},
            // 明细-房间单价-包含时间
            price: [],
            // 请求返回的数据
            fetchData: {},

            // 后台返回的该用户可订房信息
            userOrderMaxNum: 5,
            // 后台返回的该用户是否可订房标志
            isUserCanOrder: true,
            // 加减房间数按钮img的src的接受值
            imgSrcMinus: "",
            imgSrcPlus: "",

            // 订房人预留的姓名、手机号
            orderName: "",
            orderTel: "",
            // 总价
            totalPrice: "",
            // 总价保存
            totalPriceLast: "",
            // 房间的单价
            discount_price: "",
            // 优惠券
            coupon: [],
            // 订房人姓名输入验证
            orderNameTipsVisible: false,
            orderNameTxt: "123",
            // 订房人手机号输入验证
            orderTelTipsVisible: false,
            orderTelTxt: "",
            OrderFullToast: false,
            roomNumItems: "", //循环可定房间
            quantity: "", //该用户可定的房间数
            isActive: 1
        };
    },
    created() {
        var routePara = {
            store_id: this.$route.query.store_id,
            room_id: this.$route.query.room_id,
            begin: this.$route.query.begin,
            finish: this.$route.query.finish
        };
        // 初始化数据
        this.watchObj.store_id = routePara.store_id;
        this.watchObj.room_id = routePara.room_id;
        this.watchObj.begin = routePara.begin;
        this.watchObj.finish = routePara.finish;

        var beginArr = routePara.begin.split("-");
        this.beginY = beginArr[0];
        this.beginM = beginArr[1];
        this.beginD = beginArr[2];
        var finishArr = routePara.finish.split("-");
        this.finishY = finishArr[0];
        this.finishM = finishArr[1];
        this.finishD = finishArr[2];
        // 计算入住-离店共有几晚
        this.howManyNight = dateEndMinusStart(
            routePara.begin,
            routePara.finish
        );

        // 拉取订单信息接口
        this.fetchOrderForm();

        // 加减房间数按钮img的src的初始化赋值
        this.imgSrcMinus = this.btnMinus;
        this.imgSrcPlus = this.btnPlusActive;
    },
    watch: {
        initCoupon: {
            handler(newValue, oldValue) {
                if (newValue != "") {
                    // console.log(newValue);
                    this.totalPrice = this.discount_price - newValue.amount;
                    this.isCouponMask = false; //选取优惠券是其dialog消失
                }
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        // 展示优惠券遮罩
        showCouponMask() {
            this.isCouponMask = true;
        },
        // 隐藏优惠券遮罩--ui说不需要此交互
        hideCouponMask() {
            this.isCouponMask = false;
        },
        // 展示交易明细遮罩
        showDealDetailMask() {
            this.isDealDetailMask = true;
        },
        // 隐藏交易明细遮罩-ui没有设计这个交互逻辑
        hideDealDetailMask() {
            this.isDealDetailMask = false;
        },
        // 拉取订单预览数据
        fetchOrderForm() {
            var para = this.watchObj;
            this.$http({
                method: "POST",
                url: order_form,
                data: para
            })
                .then(res => {
                    if (res.data.status == 1) {
                        this.details = res.data.data.details; //给房间详情赋值
                        this.discount_price = res.data.data.discount_price; //预定房间总价赋值
                        this.coupon = res.data.data.coupon; //给房间优惠券赋值
                        this.price = res.data.data.price; // 给明细赋值
                        this.totalPrice = res.data.data.discount_price;
                        let quantity = parseInt(res.data.data.quantity); // 后台配置的最大可选择几间房
                        let astrict = parseInt(res.data.data.astrict); //当前用户能定的最大房间数
                        this.quantity = quantity;
                        let tmp = [];
                        for (let i = 1; i <= astrict; i++) {
                            tmp.push({
                                num: i,
                                isCanSel: i <= quantity ? true : false
                            });
                        }
                        this.roomNumItems = tmp;
                    } else if (res.data.status == -3) { // 若按照新的产品思路，这个else if 就不会出现了
                        this.isUserCanOrder = false;
                        this.watchObj.room_sum -= 1; //当不能在订房时候，其实已经达到了6，马上减1使其变成5。
                    }
                })
                .catch(err => {});
        },
        // 减房间数
        minusRoomNum() {
            if (this.watchObj.room_sum == 1) {
                this.initCoupon = "";
                this.imgSrcMinus = this.btnMinus;
                return;
            } else {
                this.imgSrcPlus = this.btnPlusActive;
                this.watchObj.room_sum -= 1;
                this.fetchOrderForm();
            }
        },
        // 加房间数
        plusRoomNum() {
            if (!this.isUserCanOrder) {
                this.OrderFullToast = true;
                this.imgSrcPlus = this.btnPlus;
                setTimeout(() => {
                    this.OrderFullToast = false;
                }, 2000);
                return;
            }
            if (this.watchObj.room_sum >= 1) {
                this.watchObj.room_sum += 1;
                this.imgSrcMinus = this.btnMinusActive;
                this.initCoupon = "";
                this.fetchOrderForm();
            }
        },
        // 选择房间折叠与否
        selectRoom() {
            this.isSelectRoom = !this.isSelectRoom;
        },
        // 点击按钮进行订房
        selectOrder(num,type){
            if (type==false) {
                this.OrderFullToast = true;
                setTimeout(() => {
                    this.OrderFullToast = false;
                }, 2000);
                return;
            }
            this.watchObj.room_sum = num;
            this.isActive = num;
            this.fetchOrderForm();
        },
        // 订房人input姓名失焦
        orderNameBlur() {
            if (this.orderName.trim() == "") {
                this.orderNameTipsVisible = true;
                this.orderNameTxt = "输入姓名不能为空";
                return false;
            } else {
                return true;
            }
        },
        // 订房人input姓名获焦
        orderNameFocus() {
            this.orderNameTipsVisible = false;
        },
        // 订房人input手机失焦
        orderTelBlur() {
            if (this.orderTel.trim() == "") {
                this.orderTelTipsVisible = true;
                this.orderTelTxt = "输入手机号不能为空";
                return false;
            } else if (this.orderTel != "") {
                var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                if (!myreg.test(this.orderTel.trim())) {
                    this.orderTelTxt = "输入手机号格式有误";
                    this.orderTelTipsVisible = true;
                    return false;
                } else {
                    return true;
                }
            }
        },
        // 订房人input手机获焦
        orderTelFocus() {
            this.orderTelTipsVisible = false;
        },
        // 支付逻辑
        pay() {
            // 再次判断预定人input输入框的手机号是都为空
            if (this.orderTel.trim() == "") {
                this.orderTelTipsVisible = true;
                this.orderTelTxt = "输入手机号不能为空";
            }
            // 再次判断入住人input输入框的名字是否为空
            if (this.orderName.trim() == "") {
                this.orderNameTipsVisible = true;
                this.orderNameTxt = "输入姓名不能为空";
            }
            // 总的判断
            if (this.orderNameBlur() && this.orderTelBlur()) {
                this.$http({
                    method: "POST",
                    url: create_order,
                    data: {
                        room_type: this.watchObj.room_id,
                        store_id: this.watchObj.store_id,
                        dwell_name: this.orderName,
                        dewll_mobile: this.orderTel,
                        room_sum: this.watchObj.room_sum,
                        begin: this.watchObj.begin,
                        finish: this.watchObj.finish,
                        coupon_id: this.initCoupon.id
                    }
                })
                    .then(res => {
                        if (res.data.status == 1) {
                            this.$router.push({
                                path: "onlinePay",
                                query: {
                                    order_id: res.data.data.order_id
                                }
                            });
                        }
                    })
                    .catch(err=>{console.log(err)});
            }
        }
    }
};
</script>

<style lang="less" scoped>
// 重置weui样式
.zb-weui-mask {
    background: rgba(0, 0, 0, 0.45);
}
// 添加点击之后样式
.weui-actionsheet_no_toggle {
    opacity: 0;
    display: none;
}
// 取消点击之后样式
.weui-actionsheet_no_toggle_active {
    opacity: 1;
}
// 这是弹框的title
.zb-weui-actionsheet__title {
    height: auto;
    background: #fff;
    .zb-weui-actionsheet__title-text {
        height: 22px;
        line-height: 22px;
        margin: 12px 0;
        color: #333;
        font-size: 16px;
    }
}
// 这是弹框的内容
.zb-actionsheet__bd {
    height: 55px;
    padding: 0 15px;
    background: #fff;
    .zb-weui-cells {
        margin-top: 0;
        .zb-weui-cell {
            height: 55px;
            padding: 0;
            .div {
                height: 55px;
                &.weui-cell__bd {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    h4 {
                        line-height: 20px;
                        color: #666;
                        font-size: 14px;
                        font-weight: normal;
                        margin-bottom: 4px;
                    }
                    p {
                        line-height: 16px;
                        color: #999;
                        font-size: 12px;
                    }
                }
                &.weui-cell__hd {
                    padding-right: 0;
                    line-height: 55px;
                    color: #ffba56;
                    font-size: 14px;
                }
            }
        }
    }
}

// order页的样式
.order {
    // 相同的样式提取
    .label {
        float: left;
        height: 50px;
        line-height: 50px;
        color: #333;
        font-size: 15px;
    }
    .item-rg {
        float: right;
        padding-right: 15px;
        height: 50px;
        position: relative;
        font-size: 13px;
        .errTips {
            position: absolute;
            top: 30px;
            right: 15px;
            color: red;
            font-size: 8px;
        }
    }

    // 分割bar
    .divivid-bar {
        height: 5px;
        background: #eff1f0;
        margin-left: -15px;
    }

    // 酒店详情css
    .detail-container {
        padding: 10px 0;
        background: #eff1f0;
        .detail-wrapper {
            padding: 15px;
            background: url("../../assets/images/bg/bg_order_page.png") repeat-x
                center;
            .name {
                font-size: 16px;
                color: #666;
                height: 22px;
                line-height: 22px;
                margin-bottom: 5px;
            }
            .labels {
                line-height: 16px;
                font-size: 12px;
                margin-bottom: 8px;
                span {
                    margin-right: 10px;
                }
            }
            .area {
                line-height: 16px;
                vertical-align: bottom;
                .instro {
                    color: #999;
                    font-size: 12px;
                    margin-right: 8px;
                }
                .date {
                    color: #666;
                    font-size: 16px;
                    margin-right: 15px;
                }
            }
        }
    }

    // 用户信息操作区
    .info {
        padding-left: 15px;
        background: #fff;
        .room-num-select {
            margin-left: -15px;
            background: #eff1f0;
            // padding: 15px 0;
            padding: 12px 0 0;
            &::after {
                display: table;
                content: "";
                clear: both;
            }
            span {
                float: left;
                width: 20%;
                padding: 0 12px;
                font-size: 14px;
                margin-bottom: 12px;
                i {
                    display: inline-block;
                    width: 100%;
                    text-align: center;
                    line-height: 34px;
                    font-style: normal;
                    background: #ccc;
                    color: #999;
                    &.canSel {
                        background: #fff;
                        color: #666;
                    }
                    &.default {
                        // background: rgba(red, green, blue, alpha);
                        background: #269882;
                        color: #fff;
                    }
                }
            }
        }
        li {
            height: 50px;
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
            &.room {
                .room-info {
                    float: right;
                    height: 50px;
                    line-height: 50px;
                    padding-right: 15px;
                    .arrow-icon {
                        display: inline-block;
                        width: 16px;
                        height: 16px;
                        margin: -2px 0 0 5px;
                    }
                    span {
                        height: 50px;
                        float: left;
                        &.span-minus,
                        &.span-plus {
                            width: 17px;
                            line-height: 50px;
                            font-size: 0;
                        }
                        &.span-minus {
                            img {
                                display: inline-block;
                                width: 17px;
                                height: 17px;
                            }
                        }
                        &.span-plus {
                            img {
                                display: inline-block;
                                width: 17px;
                                height: 17px;
                            }
                        }
                        &.span-input {
                            width: 75px;
                            padding: 10px 0;
                            margin: 0 10px;
                            .txt {
                                display: block;
                                width: 100%;
                                height: 30px;
                                text-align: center;
                                border: 1px solid #cccccc;
                            }
                        }
                    }
                }
            }
            &.name {
                .name-div {
                    width: 160px;
                    height: 50px;
                    padding: 8px 0;
                    #name {
                        display: block;
                        width: 100%;
                        height: 34px;
                        border: none;
                        outline: none;
                        text-align: right;
                    }
                }
            }

            // 手机号的输入
            &.tel {
                .tel-div {
                    width: 190px;
                    height: 50px;
                    padding: 8px 0;
                    #tel {
                        display: block;
                        width: 100%;
                        height: 34px;
                        border: none;
                        outline: none;
                        text-align: right;
                    }
                }
            }
            &.coupon {
                .coupon-div {
                    height: 50px;
                    line-height: 50px;
                    font-size: 14px;
                    color: #666;
                    img {
                        display: inline-block;
                        width: 5px;
                        height: 9px;
                    }
                }
            }
            &.ticket {
                .ticket-div {
                    height: 50px;
                    line-height: 50px;
                    font-size: 14px;
                    color: #666;
                }
            }
        }
    }

    // 文字小提示
    .tips {
        padding: 12px 15px 10px;
        color: #666;
        font-size: 12px;
        h3 {
            line-height: 16px;
            margin-bottom: 14px;
            font-size: 12px;
        }
        p {
            line-height: 15px;
            margin-bottom: 12px;
        }
    }

    // 支付bar
    .paybar {
        display: flex;
        flex-direction: row;
        position: fixed;
        z-index: 9;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        overflow: hidden;
        height: 49px;
        background: #fff;
        font-size: 14px;
        .lf {
            flex: 1;
            padding-left: 15px;
            .money {
                color: #ffba56;
                height: 49px;
                line-height: 49px;
                float: left;
            }
            .arrow {
                width: 49px;
                height: 49px;
                line-height: 49px;
                text-align: center;
                float: right;
                padding: 0 10px;
                font-size: 0;
                img {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                }
            }
        }
        .rg {
            width: 142px;
            background: #269882;
            color: #fff;
            height: 49px;
            line-height: 49px;
            text-align: center;
        }
    }
}
</style>