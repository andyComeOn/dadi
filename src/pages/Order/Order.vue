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
                    {{watchObj.room_sum}}间
                    <img class="arrow-icon" src="../../assets/images/arrows/ic_pay_arrow.png" alt="">
                </div>
            </li>
            <!-- 可定房间的列表 -->
            <div class="room-num-select" v-show="isSelectRoom">
                <span v-if="roomNumItems">
                    <span class="room-num-item" v-for="(item,index) in roomNumItems" :key="index">
                        <i :class="[{default: isActive == item.num }]" @click="selectOrder(item.num)">{{item.num}}</i>
                    </span>
                </span>
                <div v-else class="room-num-empty">您今日可订限额已用完，请明天再来</div>
            </div>
            <!-- 入住人姓名 -->
            <li class="name">
                <label class="label">入住人姓名</label>
                <div class="item-rg linkman">
                    <div class="name-div">
                        <input type="text" class="input-name" id="name" placeholder="请输入姓名" v-model="orderName">
                    </div>
                    <div class="linkmanBtn" @click="showLinkmanMask"></div>
                </div>
            </li>

            <!-- 手机号 -->
            <li class="tel">
                <label class="label">手机号</label>
                <div class="item-rg">
                    <div class="tel-div">
                        <input type="tel" class="input-tel" id="tel" placeholder="请输入手机号" v-model="orderTel">
                        <!-- @blur="orderTelBlur" -->
                    </div>
                </div>
            </li>

            <!-- 分割bar -->
            <div class="divivid-bar"></div>

            <!-- 优惠券 -->
            <li class="coupon">
                <label class="label">优惠券</label>
                <div class="item-rg">
                    <div class="coupon-div" @click="showCouponMask">
                        <div v-show="couponBarShow" style="display:inline-block;">
                            <span v-if="coupon.length==0">无</span>
                            <span v-else>{{coupon.length}}张可用</span>
                        </div>
                        <div v-show="!couponBarShow" style="display:inline-block;">
                            已选择1张，抵扣{{initCoupon.amount}}元
                        </div>
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
            <!-- 分割bar -->
            <div class="divivid-bar"></div>
        </ul>
        <!-- 备注 -->
        <div class="mark">
            <label class="label">备注</label>
            <div class="markRg"><textarea name="markName" id="markTextarea" placeholder="选填"></textarea></div>
        </div>

        <!-- “广播”提示 -->
        <div class="broadcast m-ellipsis" @click="showUserCardRightMask">
            <span class="broadcast-icon"></span>
            {{group_name | filterCardType}}特权：房价折扣{{catering_discount}}，餐饮折扣餐饮折扣餐饮折扣
            <span class="broadcast-btn"></span>
        </div>
        <!-- 温馨提示 -->
        <div class="tips">
            <!-- <h3>温馨提示仅可在预定15分钟内取消订单</h3> -->
            <!-- {{$options.filters.filterVipTxt(userVipStatus)}} -->
            <p>退订规则：入住当天12点之前均可取消订单</p>
            <p>温馨提示：1、酒店入住时间14:00以后，离店时间12:00以前。如您在14:00以前未能到达，请以酒店安排为准。2、普卡会员入住当天12：00之前取消订单，不收取费用，逾期扣费。银卡、金卡会员14点前取消订单，不收取费用；铂金卡18点前取消订单，不收取费用。3、普通客户12点之前退房；普卡会员13点退房；银卡会员14点退房；金卡会员15点退房；铂金卡会员延迟到16点退房。联系电话：<a href="tel:4000-999-683">4000-999-683</a> (周一至周五9:00-17:30)</p>
        </div>
        <!-- 确认支付bar -->
        <div class="paybar">
            <div class="lf">
                <div class="money">&yen;{{totalPrice}}</div>
                <div class="discount">省{{discount}}</div>
                <div class="arrow" @click="showDealDetailMask"><img src="../../assets/images/arrows/ic_pay_arrow.png" alt=""></div>
            </div>
            <div class="rg" @click="pay">支付</div>
        </div>
        <!-- 优惠券的弹框 -->
        <div class="coupon-mask-box">
            <div class="weui-mask zb-weui-mask" @click="hideCouponMask" :class="[{'weui-actionsheet_no_toggle_active':isCouponMask},{'weui-actionsheet_no_toggle':!isCouponMask}]"></div>
            <div class="weui-actionsheet zb-weui-actionsheet" id="weui-actionsheet" :class="[{'weui-actionsheet_toggle':isCouponMask}]">
                <!-- 弹框的title -->
                <div class="weui-actionsheet__title zb-weui-actionsheet__title">
                    <p class="weui-actionsheet__title-text zb-weui-actionsheet__title-text">优惠券</p>
                </div>
                <!-- 弹框的内容 -->
                <div class="weui-actionsheet__menu" v-if="coupon">
                    <!-- 循环下面的整体 -->
                    <div class="zb-actionsheet__bd" v-for="(item,index) in coupon" :key="index">
                        <div class="weui-cells zb-weui-cells weui-cells_checkbox">
                            <label class="weui-cell zb-weui-cell weui-check__label" :for="item.id">
                                <div class="weui-cell__bd div zb-weui-cell__hd">
                                    <h4>满{{item.min_amount}}元减{{item.amount}}元</h4>
                                    <p>截止日期：{{item.validity_end_time}}</p>
                                </div>
                                <div class="weui-cell__hd div din">
                                    &yen;{{item.amount}}
                                    <input type="radio" class="weui-check" :id="item.id" :value="{id:item.id,min_amount:item.min_amount,amount:item.amount}" v-model="initCoupon">
                                    <i class="weui-icon-checked"></i>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div v-else style="line-height: 55px;background: #fff;font-size:17px;text-align:center;">暂无优惠券可用</div>
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
                <div class="weui-actionsheet__menu" style="max-height:300px;overflow:auto;">
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
                                    <span style="color:#666;">{{watchObj.room_sum}}间 * </span> &yen;{{item.unit_price | Fixto2}}
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
                            <label class="weui-cell zb-weui-cell weui-check__label" for="deal1">
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
            </div>
        </div>
        <!-- 用户所属卡种的权益 -->
        <div id="userCardRightMaskBox">
            <div class="weui-mask zb-weui-mask" @click="hideUserCardRightMask" :class="[{'weui-actionsheet_no_toggle_active':isUserCardRightMask},{'weui-actionsheet_no_toggle':!isUserCardRightMask}]"></div>
            <div class="weui-actionsheet zb-weui-actionsheet" id="weui-actionsheet" :class="[{'weui-actionsheet_toggle':isUserCardRightMask}]">
                <div class="hd">
                    {{group_name | filterCardType}}会员
                    <span class="btn" @click="hideUserCardRightMask"></span>
                </div>
                <!-- 弹框的内容 -->
                <div class="bd">
                    <div class="desc-box" v-if="userCardRightInfo">
                        <!-- 开卡权益 -->
                        <div class="card-right">
                            <div class="title">
                                <span class="s1"></span>
                                开卡权益
                                <span class="s2"></span>
                            </div>
                            <div class="content">
                                <dl>
                                    <img src="../../assets/images/vip/kaika.png" alt="">
                                    <dt>开卡赠券</dt>
                                    <dd>{{userCardRightInfo.coupon_num}}</dd>
                                </dl>
                                <dl>
                                    <img src="../../assets/images/vip/yaoqing.png" alt="">
                                    <dt>邀请特权</dt>
                                    <dd>{{userCardRightInfo.privilege_num}}</dd>
                                </dl>
                                <dl>
                                    <img src="../../assets/images/vip/fangjia.png" alt="">
                                    <dt>房价折扣</dt>
                                    <dd>{{userCardRightInfo.promo}}</dd>
                                </dl>
                                <dl>
                                    <img src="../../assets/images/vip/xiaofei.png" alt="">
                                    <dt>消费积分</dt>
                                    <dd>{{userCardRightInfo.score_rate}}</dd>
                                </dl>
                                <dl v-if="userCardRightInfo.pre_cancel_time">
                                    <img src="../../assets/images/vip/mianfei.png" alt="">
                                    <dt>免费取消</dt>
                                    <dd>{{userCardRightInfo.pre_cancel_time}}</dd>
                                </dl>
                            </div>
                        </div>
                        <!-- 会员权益 -->
                        <div class="vip-right">
                            <div class="title">
                                <span class="s1"></span>
                                会员权益
                                <span class="s2"></span>
                            </div>
                            <div class="content">
                                <ul class="ul">
                                    <li v-if="userCardRightInfo.catering_discount">
                                        <p class="li-desc">餐饮折扣</p>
                                        <p class="li-intro">{{userCardRightInfo.catering_discount}}</p>
                                    </li>
                                    <li v-if="userCardRightInfo.enjoy_channel">
                                        <p class="li-desc">优享通道</p>
                                        <p class="li-intro">{{userCardRightInfo.enjoy_channel}}</p>
                                    </li>
                                    <li v-if="userCardRightInfo.supper">
                                        <p class="li-desc">上门宵夜</p>
                                        <p class="li-intro">{{userCardRightInfo.supper}}</p>
                                    </li>
                                    <li v-if="userCardRightInfo.delay_room">
                                        <p class="li-desc">延迟退房</p>
                                        <p class="li-intro">{{userCardRightInfo.delay_room}}</p>
                                    </li>
                                    <li v-if="userCardRightInfo.birthday">
                                        <p class="li-desc">生日礼遇</p>
                                        <p class="li-intro">{{userCardRightInfo.birthday}}</p>
                                    </li>
                                    <li v-if="userCardRightInfo.equity">
                                        <p class="li-desc">权益共享</p>
                                        <p class="li-intro">{{userCardRightInfo.equity}}</p>
                                    </li>
                                    <li v-if="userCardRightInfo.user_activity">
                                        <p class="li-desc">收费会员活动</p>
                                        <p class="li-intro">{{userCardRightInfo.user_activity}}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 快速选择入住联系人 -->
        <div class="linkman-mask-box">
            <div class="weui-mask zb-weui-mask" @click="hideLinkmanMask" :class="[{'weui-actionsheet_no_toggle_active':isLinkmanMask},{'weui-actionsheet_no_toggle':!isLinkmanMask}]"></div>
            <div class="weui-actionsheet zb-weui-actionsheet" id="weui-actionsheet" :class="[{'weui-actionsheet_toggle':isLinkmanMask}]">
                <div class="hd">常用信息</div>
                <div class="bd">
                    <ul>
                        <li v-for="(item,index) in linkmanList" :key="index" @click="selectLinkman(item.id,item.username,item.mobile)">{{item.username}}
                            <span class="select"><img :src="imgSrcDefault" alt=""></span>
                        </li>
                    </ul>
                </div>
                <!-- imgSrcActive -->
            </div>
        </div>
        <!-- toast（delay=>z） -->
        <div v-show="orderDelayToast">
            <div class="z-mask-transparent"></div>
            <div class="z-toast">
                <i class="z-toast-icon"></i>
                <p class="z-toast-content">{{orderDelayToastTxt}}</p>
            </div>
        </div>
        <!-- toast(loading=>weui) -->
        <div v-show="loading">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">{{loadingTxt}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { dateEndMinusStart } from "@/utils/date"; // 引入封装时间函数
import {
    order_form,
    create_order,
    user_card_privilege,
    residentList
} from "@/api/api";
import { getCookie } from "@/utils/util";
export default {
    name: "order",
    data() {
        return {
            isCouponMask: false,
            isDealDetailMask: false,
            isSelectRoom: false,
            isUserCardRightMask: false,
            isLinkmanMask: false, // 入住联系人mask控制
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
            // 订房人预留的姓名、手机号
            orderName: "",
            orderTel: "",
            // 总价
            totalPrice: "",
            // 房间的单价
            discount_price: "",
            // 该用户属于哪个会员卡种
            group_name: "",
            // 该用户所属卡种的id
            group_id: "",
            // 该用户所属的会员卡种打几折promo，原本这个页面接口已经有了
            catering_discount: "",
            // 优惠券
            coupon: [],
            // 订房人姓名输入验证
            orderNameTipsVisible: false,
            orderNameTxt: "123",
            // 订房人手机号输入验证
            orderTelTipsVisible: false,
            orderTelTxt: "",
            orderDelayToast: false,
            orderDelayToastTxt: "您今日可订限额已用完，请明天再来",
            roomNumItems: "", //循环可定房间
            quantity: "", //该用户还能再定房间数的上限
            isActive: 1,
            loading: true, //
            loadingTxt: "数据加载中",
            couponBarShow: true,
            userVipStatus: getCookie("userVipStatus"),
            userCardRightInfo: "", // 用户所属卡种的权益详情
            discount: "", // 省了多少钱
            linkmanList: "", // 联系人列表
            imgSrcDefault:require("../../assets/images/icon/ic-radio.png"),
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
        // 拉取socket方法-暂且用不到
        // this.socketMethod();
        // 拉取fetchLinkman的列表
        this.fetchLinkman();
    },
    watch: {
        initCoupon: {
            handler(newValue, oldValue) {
                if (newValue != "") {
                    this.totalPrice = (
                        Math.round(
                            (this.discount_price - newValue.amount) * 100
                        ) / 100
                    ).toFixed(2);
                    let discountTmp =
                        Math.round((this.discount + newValue.amount) * 100) /
                        100;
                    this.discount = discountTmp.toFixed(2);
                    this.couponBarShow = false;
                    this.isCouponMask = false; //选取优惠券使其dialog消失
                }
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        // 拉取联系人list
        fetchLinkman() {
            this.$http({
                method: "POST",
                url: residentList,
                data: {}
            })
                .then(res => {
                    this.linkmanList = res.data.data;
                })
                .catch(err => {});
        },

        // 展示用户所属卡种相关权益遮罩
        showLinkmanMask() {
            this.isLinkmanMask = true;
            this.orderName = "";
            this.orderTel = "";
        },
        // 隐藏入住联系人遮罩
        hideLinkmanMask() {
            this.isLinkmanMask = false;
        },
        // 选取入住联系人
        selectLinkman(id,name,tel){
            this.isLinkmanMask = false;
            this.orderName = name;
            this.orderTel = tel;
        },
        // 拉取用户所属卡种的信息
        fetchUserCardRightInfo() {
            this.$http({
                method: "POST",
                url: user_card_privilege,
                data: {
                    id: this.group_id
                }
            })
                .then(res => {
                    this.userCardRightInfo = res.data.data;
                })
                .catch(err => {});
        },
        // 展示用户所属卡种相关权益遮罩
        showUserCardRightMask() {
            this.isUserCardRightMask = true;
        },
        // 隐藏用户所属卡种相关权益遮罩
        hideUserCardRightMask() {
            this.isUserCardRightMask = false;
        },
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
        // 订单socket
        socketMethod() {
            let ws = new WebSocket("ws://172.16.0.252:2623");
            ws.onopen = function() {
                ws.send("uid" + getCookie("userUid"));
            };
            ws.onmessage = function(e) {
                console.log("收到服务端的消息：" + e.data);
                if (e) {
                }
            };
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
                        this.loading = false;
                        this.details = res.data.data.details; //给房间详情赋值
                        this.discount_price = res.data.data.discount_price; //预定房间总价赋值
                        this.coupon = res.data.data.coupon; //给房间优惠券赋值
                        this.price = res.data.data.price; // 给明细赋值
                        this.totalPrice = res.data.data.discount_price;
                        this.discount = (
                            Math.round(
                                (res.data.data.original_price -
                                    res.data.data.discount_price) *
                                    100
                            ) / 100
                        ).toFixed(2);
                        this.group_name = res.data.data.group_name; //属于哪个卡种
                        this.group_id = res.data.data.group_id; // 用户所属卡种的id
                        this.catering_discount =
                            res.data.data.catering_discount; // 用户所属卡种的折扣 -> 95折
                        this.fetchUserCardRightInfo(); // 拉取用户卡种的权益
                        let astrict = parseInt(res.data.data.astrict); // 后台配置的最大可选择几间房
                        let quantity = parseInt(res.data.data.quantity); // 当前用户能定的最大房间数
                        if (quantity > 0) {
                            let tmp = [];
                            for (let i = 1; i <= quantity; i++) {
                                tmp.push({
                                    num: i
                                });
                            }
                            this.roomNumItems = tmp;
                        } else {
                            this.roomNumItems = "";
                            this.watchObj.room_sum = 0;
                        }
                    } else if (res.data.status == -3) {
                        // 若按照新的产品思路，这个else if 就不会出现了
                        this.isUserCanOrder = false;
                        this.watchObj.room_sum -= 1; //当不能在订房时候，其实已经达到了6，马上减1使其变成5。
                    }
                })
                .catch(err => {});
        },
        // 选择房间折叠与否
        selectRoom() {
            this.isSelectRoom = !this.isSelectRoom;
        },
        // 点击按钮进行订房
        selectOrder(num, type) {
            this.watchObj.room_sum = num;
            this.isActive = num;
            this.isSelectRoom = false;
            this.fetchOrderForm();
        },
        // 订房人input姓名失焦
        orderNameBlur() {
            if (this.orderName.trim() == "") {
                this.orderDelayToastTxt = "输入姓名不能为空";
                this.orderDelayToast = true;
                setTimeout(() => {
                    this.orderDelayToast = false;
                }, 1500);
                return false;
            } else {
                let reg = new RegExp(/^[\u4E00-\u9FA5A-Za-z]+$/);
                if (!reg.test(this.orderName)) {
                    this.orderDelayToastTxt = "姓名格式不正确";
                    this.orderDelayToast = true;
                    setTimeout(() => {
                        this.orderDelayToast = false;
                    }, 1500);
                    return false;
                } else {
                    return true;
                }
            }
        },
        // 订房人input手机失焦
        orderTelBlur() {
            if (this.orderTel.trim() == "") {
                this.orderDelayToastTxt = "输入手机号不能为空";
                this.orderDelayToast = true;
                setTimeout(() => {
                    this.orderDelayToast = false;
                }, 1500);
                return false;
            } else {
                var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                if (!myreg.test(this.orderTel.trim())) {
                    this.orderDelayToastTxt = "输入手机号格式有误";
                    this.orderDelayToast = true;
                    setTimeout(() => {
                        this.orderDelayToast = false;
                    }, 1500);
                    return false;
                } else {
                    return true;
                }
            }
        },
        // 支付逻辑
        pay() {
            // 当今日可订限额已用完，禁止提交
            if (this.watchObj.room_sum == 0) {
                this.orderDelayToastTxt = "您今日可订限额已用完，请明天再来";
                this.orderDelayToast = true;
                setTimeout(() => {
                    this.orderDelayToast = false;
                }, 1500);
                return false;
            }
            if (this.orderNameBlur() && this.orderTelBlur()) {
                this.loadingTxt = "支付中...";
                this.loading = true;
                this.$http({
                    method: "POST",
                    url: create_order,
                    data: {
                        room_type: this.watchObj.room_id,
                        store_id: this.watchObj.store_id,
                        dwell_name: this.orderName.trim(),
                        dewll_mobile: this.orderTel.trim(),
                        room_sum: this.watchObj.room_sum,
                        begin: this.watchObj.begin,
                        finish: this.watchObj.finish,
                        coupon_id: this.initCoupon.id
                    }
                })
                    .then(res => {
                        if (res.data.status == 1) {
                            this.loading = false;
                            this.$router.push({
                                path: "onlinePay",
                                query: {
                                    order_id: res.data.data.order_id
                                }
                            });
                        } else {
                            this.loading = false;
                            this.orderDelayToastTxt =
                                "在您支付过程中，房被小伙伴抢光了";
                            this.orderDelayToast = true;
                            this.watchObj.room_sum = 1;
                            this.fetchOrderForm();
                            setTimeout(() => {
                                this.orderDelayToast = false;
                            }, 1500);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
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

// 后来添加的会员提示
.broadcast {
    line-height: 36px;
    background: rgba(253, 252, 236, 1);
    padding: 0 22px 0 34px;
    position: relative;
    color: #666;
    font-size: 14px;
    font-weight: 400;
    .broadcast-icon {
        width: 16px;
        height: 16px;
        position: absolute;
        left: 15px;
        top: 10px;
        background: url("../../assets/images/icon/ic-broadcast.png") no-repeat
            center center;
        background-size: 100% 100%;
    }
    .broadcast-btn {
        width: 5px;
        height: 9px;
        position: absolute;
        right: 15px;
        top: 13px;
        background: url("../../assets/images/arrows/ic-arrow_10_18.png")
            no-repeat center center;
        background-size: 100% 100%;
    }
}

.order {
    padding-bottom: 50px;
    overflow: auto;
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
        font-size: 14px;
        &.linkman {
            padding-right: 42px;
            .linkmanBtn {
                width: 24px;
                height: 24px;
                position: absolute;
                right: 15px;
                top: 13px;
                background: url("../../assets/images/icon/ic-linkman.png")
                    no-repeat center;
                background-size: 100% 100%;
            }
        }
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
                color: #333;
                height: 22px;
                line-height: 22px;
                margin-bottom: 5px;
            }
            .labels {
                line-height: 16px;
                font-size: 12px;
                margin-bottom: 8px;
                color: #666;
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
            padding: 12px 0 0;
            text-align: center;
            &::after {
                display: table;
                content: "";
                clear: both;
            }
            .room-num-item {
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
                    background: #fff;
                    border-radius: 5px;
                    color: #666;
                    &.default {
                        background: #269882;
                        color: #fff;
                    }
                }
            }
            .room-num-empty {
                line-height: 36px;
                margin-top: -12px;
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
                    padding: 0;
                    #name {
                        display: block;
                        width: 100%;
                        line-height: 50px;
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

    // 备注input提示
    .mark {
        height: 70px;
        padding: 0 15px;
        background: #fff;
        .label {
            height: 70px;
            float: left;
            margin-right: 15px;
            line-height: 35px;
        }
        .markRg {
            margin-left: 45px;
            height: 70px;
            #markTextarea {
                display: block;
                outline: none;
                border: none;
                width: 100%;
                height: 100%;
                padding-top: 6px;
                font-size: 14px;
            }
        }
    }
    // 联系人list的遮罩
    .linkman-mask-box {
        color: #333;
        .hd {
            line-height: 40px;
            font-size: 16px;
            color: #333;
            text-align: center;
            background: #ffffff;
        }
        .bd {
            padding: 0 15px;
            background: #ffffff;
            li {
                line-height: 44px;
                font-size: 14px;
                position: relative;
                &:after {
                    content: "";
                    position: absolute;
                    left: 0;
                    right: 0;
                    height: 1px;
                    bottom: 0;
                    background: #e5e5e5;
                    transform: scaleY(0.5);
                }
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
            line-height: 17px;
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
                font-size: 16px;
                font-weight: bold;
                margin: 0 10px 0 0;
                float: left;
            }
            .discount {
                text-decoration: line-through;
                line-height: 49px;
                color: #cccccc;
                font-size: 12px;
                float: left;
            }
            .arrow {
                width: 49px;
                height: 49px;
                line-height: 49px;
                text-align: center;
                float: right;
                padding: 0 10px 0 0;
                font-size: 0;
                img {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                }
            }
        }
        .rg {
            width: 125px;
            background: #30b097;
            color: #fff;
            height: 49px;
            line-height: 49px;
            text-align: center;
        }
    }
    // 广播的toast弹层
    #userCardRightMaskBox {
        .hd {
            line-height: 40px;
            font-size: 18px;
            color: #333;
            text-align: center;
            position: relative;
            background: #fff;
            .btn {
                width: 24px;
                height: 24px;
                position: absolute;
                top: 9px;
                right: 9px;
                background: url("../../assets/images/icon/ic-close-card.png")
                    no-repeat center center;
                background-size: 12px 12px;
            }
        }
        .bd {
            background: #fff;
            // 弹框公共的title
            .title {
                line-height: 21px;
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #333;
                font-size: 16px;
                padding-top: 25px;
                font-weight: 400;
                span {
                    width: 72px;
                    height: 8px;
                    background: url("../../assets/images/vip/bg-row.png")
                        no-repeat center center;
                    background-size: 100% 100%;
                    &.s1 {
                        margin-right: 10px;
                    }
                    &.s2 {
                        margin-left: 10px;
                    }
                }
            }

            .card-right {
                .content {
                    padding: 0 15px;
                    &::after {
                        display: table;
                        content: "";
                        clear: both;
                    }
                    dl {
                        width: 20%;
                        float: left;
                        text-align: center;
                        img {
                            width: 24px;
                            height: 24px;
                            display: block;
                            margin: 15px auto 10px;
                        }
                        dt {
                            line-height: 19px;
                            margin-bottom: 5px;
                            color: #333;
                            font-size: 13px;
                        }
                        dd {
                            line-height: 16px;
                            color: #666;
                            font-size: 12px;
                        }
                    }
                }
            }
            .vip-right {
                .content {
                    padding: 15px 15px 15px;
                    .ul {
                        &::after {
                            content: "";
                            display: table;
                            clear: both;
                        }
                        li {
                            // padding: 20px 30px 0;
                            padding: 15px 15px 0;
                            height: 100px;
                            width: 33.33%;
                            float: left;
                            border-bottom: 1px solid #e5e5e5;
                            .li-desc {
                                color: #333;
                                line-height: 19px;
                                font-size: 13px;
                                margin-bottom: 8px;
                                text-align: center;
                            }
                            .li-intro {
                                text-align: center;
                                color: #666;
                                line-height: 16px;
                                font-size: 12px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>