<template>
    <div class="order-detail-page m-position-ab" v-if="order_id_info">
        <!-- dialog(支付成功) -->
        <div v-show="paySuccessToast">
            <div class="z-mask-transparent-pay"></div>
            <div class="z-toast-pay">
                <p class="z-toast-pay-head">提示</p>
                <p class="z-toast-pay-body">支付完成</p>
                <p class="z-toast-pay-footer" @click="paySuccessMethod">我知道了</p>
            </div>
        </div>
        <!-- toas提示(loading) --> 
        <div id="orderListToast" v-show="loading">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">{{loadingTxt}} </p>
            </div>
        </div>
        <!-- 订单号 -->
        <div class="order-info">
            <div class="order-box">
                <div class="lf">
                    <span class="type" v-html="$options.filters.filterStatus(order_id_info.status)"></span>
                    <span class="order-num">订单号：{{order_id_info.request_no}}</span>
                </div>
                <div class="rg">
                    <template v-if="this.is_type == 0">
                        <div v-if="order_id_info.integral_status != 1">
                            <span class="price">&yen; {{order_id_info.amount}}</span> 
                        </div>
                        <div v-else>
                            <span class="price">{{order_id_info.integral_amount}}积分</span> 
                        </div>
                    </template>
                    <template v-else>
                            <div>
                                <span class="price">&yen; 0</span> 
                            </div>
                    </template>
                    <span>{{order_id_info.pay_type == 1 ? "到店付" : "在线支付"}}</span>
                    <span class="arrow" @click="fetchOrderCostDetail"><img src="../../assets/images/arrows/ic_pay_arrow.png" alt=""></span>
                </div>
            </div>
        </div>
        <!-- 酒店位置 -->
        <div class="location-info">
            <div class="location-box">
                <p class="name">{{order_id_info.name}}</p>
                <p class="location-tel location">{{order_id_info.address}}</p>
                <p class="location-tel tel">
                    <a :href="'tel:' + order_id_info.tel">{{order_id_info.tel}}</a>
                </p>
            </div>
        </div>
        <!-- 订房信息 -->
        <div class="time-contact-info time-info">
            <ul class="time-contact-box">
                <li class="li">
                    <label class="lab">入住房型</label>
                    <span class="span">{{order_id_info.room_name}}</span>
                </li>
                <li class="li">
                    <label class="lab">入住间数</label>
                    <span class="span">{{order_id_info.room_sum}}</span>
                </li>
                <template>
                    <li class="li" v-if="this.is_type == 0">
                        <label class="lab">早餐</label>
                        <span class="span">{{order_id_info.group.breakfast}}</span>
                    </li>
                    <li class="li" v-else>
                        <label class="lab">早餐</label>
                        <span class="span">活动产品不含早餐</span>
                    </li>
                </template>
                <li class="li">
                    <label class="lab">入住日期</label>
                    <span class="span">
                        <!-- {{order_id_info.start_time|filterTimeMM}}月 {{order_id_info.start_time|filterTimeDD}}日－{{order_id_info.end_time|filterTimeMM}}月 {{order_id_info.end_time|filterTimeDD}}日 共{{order_id_info.occupancy_day_num}}天 -->
                        {{order_id_info.start_time|filterTimeMM}}月 {{order_id_info.start_time|filterTimeDD}}日－{{order_id_info.end_time|filterTimeMM}}月 {{order_id_info.end_time|filterTimeDD}}日
                    </span>
                </li>
            </ul>
        </div>
        <!-- 入住人信息 -->
        <div class="time-contact-info contact-info">
            <ul class="time-contact-box contact-box">
                <li class="li">
                    <label class="lab">入住人</label>
                    <span class="span">{{order_id_info.dwell_name}}</span>
                </li>
                <li class="li">
                    <label class="lab">电话</label>
                    <span class="span">{{order_id_info.mobile}}</span>
                </li>
            </ul>
        </div>
        <!-- 下单时间 -->
        <div class="time-contact-info contact-info">
            <ul class="time-contact-box contact-box">
                <li class="li">
                    <label class="lab">下单日期</label>
                    <span class="span">{{order_id_info.add_time|filterTimeYTD_HHMM}}</span>
                </li>
                <li class="li">
                    <label class="lab">取消规则</label>
                    <span class="span">{{order_id_info.group.pre_cancel_time}}前免费取消</span>
                </li>
                <li class="li">
                    <label class="lab">退房规则</label>
                    <span class="span">延迟退房{{order_id_info.group.delay_room}}</span>
                </li>
            </ul>
        </div>

        <div class="broadcast m-ellipsis" @click="fetchUserCardRightInfo">
            <span class="broadcast-icon"></span>
            {{group_name | filterCardType}}特权：房价折扣{{promo}}，餐饮折扣{{catering_discount}}，延迟退房{{userCardRightInfo.delay_room}}
            <span class="broadcast-btn"></span>
        </div>

        <!-- 发票展示 -->
        <template v-if="this.is_type != 1">
            <template v-if="invoiceInfo">
                <div class="broadcast m-ellipsis" @click="showInvoiceMask">
                    <span class="broadcast-icon"></span>
                    发票类型：&nbsp;&nbsp;&nbsp;&nbsp;{{invoiceType | filterInvoiceInfo}}
                    <span class="broadcast-btn"></span>
                </div>
            </template>
            <template v-else>
                <div class="broadcast m-ellipsis">
                    <span class="broadcast-icon"></span>
                    发票类型：&nbsp;&nbsp;&nbsp;&nbsp;{{invoiceType | filterInvoiceInfo}}
                    <span class="broadcast-btn"></span>
                </div>
            </template>
        </template>
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
                                <dl v-if="userCardRightInfo.score_rate">
                                    <img src="../../assets/images/vip/xiaofei.png" alt="">
                                    <dt>消费积分</dt>
                                    <dd>{{userCardRightInfo.score_rate}}</dd>
                                </dl>
                                <dl v-if="userCardRightInfo.pre_cancel_time">
                                    <img src="../../assets/images/vip/mianfei.png" alt="">
                                    <dt>免费取消</dt>
                                    <dd>{{userCardRightInfo.pre_cancel_time}}</dd>
                                </dl>
                                <dl v-if="userCardRightInfo.breakfast">
                                    <img src="../../assets/images/vip/zaocan.png" alt="">
                                    <dt>免费早餐</dt>
                                    <dd>{{userCardRightInfo.breakfast}}</dd>
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
                                    <!-- <li v-if="userCardRightInfo.equity">
                                        <p class="li-desc">权益共享</p>
                                        <p class="li-intro">{{userCardRightInfo.equity}}</p>
                                    </li> -->
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
        <!-- 再次预定按钮  -->
        <div v-if="order_id_info.status!=0">
            <router-link :to="{path: 'hotelDetail',query:{store_id:order_id_info.store_id,is_type:this.is_type}}">
                <div class="re-order">再次预定</div>
            </router-link>
        </div>
        <!-- 温馨提示 -->
        <!-- <div class="tips">
            <p>温馨提示：1、酒店入住时间14:00以后，离店时间12:00以前。如您在14:00以前未能到达，请以酒店安排为准。2、普卡会员入住当天12：00之前取消订单，不收取费用，逾期扣费。银卡、金卡会员14点前取消订单，不收取费用；铂金卡18点前取消订单，不收取费用。3、普通客户12点之前退房；普卡会员13点退房；银卡会员14点退房；金卡会员15点退房；铂金卡会员延迟到16点退房。联系电话：<a href="tel:400-099-9682">400-099-9682</a> (周一至周五9:00-17:30)</p>
        </div> -->
        <!-- 交易明细弹框 -->
        <div class="deal-detail-mask-box">
            <div class="weui-mask zb-weui-mask" @click="hideDealDetailMask" :class="[{'weui-actionsheet_no_toggle_active':isDealDetailMask},{'weui-actionsheet_no_toggle':!isDealDetailMask}]"></div>
            <div class="weui-actionsheet zb-weui-actionsheet" id="weui-actionsheet" :class="[{'weui-actionsheet_toggle':isDealDetailMask}]">
                <div class="expense_msg">
                    <!-- 交易明细弹框的title -->
                    <h3>费用明细</h3>
                    <template v-if="this.is_type == 0">
                        <!-- 使用钱 -->
                        <template v-if="order_cost_info.integral_status == 0">
                            <div class="room_money">
                                <h4>房费<span><i>&yen;</i>{{order_cost_info.amount}}</span></h4>
                                <p v-for="(item,index) in order_cost_info.detail" :key="index">{{item.order_time}}<span>{{order_cost_info.room_sum}}间*&yen;{{item.money}}</span></p>
                                <template v-if="order_cost_info.coupon_id">
                                    <h4 class="room_money_coupon">优惠券</h4>
                                    <p>{{order_cost_info.coupon_str}}<span>-&yen;{{order_cost_info.coupon_sum}}</span></p>
                                </template>
                            </div>
                            <div class="room_money room_money_sum">
                                <!-- <div class="sum_discounts" v-if="initCoupon">总计优惠:<span>-&yen;{{initCoupon.coupon_amount}}</span></div> -->
                                <div class="sum_money">实付金额:<span><i>&yen;</i>{{order_cost_info.order_money}}</span></div>
                            </div>
                        </template>
                        <!-- 使用积分 -->
                        <template v-else>
                            <div class="room_money">
                                <h4>房费<span>{{order_cost_info.integral_amount}}<i>积分</i></span></h4>
                                <p v-for="(item,index) in order_cost_info.detail" :key="index">{{item.order_time}}<span>{{order_cost_info.room_sum}}间*{{item.integral_amount}}积分</span></p>
                            </div>
                            <div class="room_money room_money_sum">
                                <!-- <div class="sum_discounts" v-if="initCoupon">总计优惠:<span>-&yen;{{initCoupon.coupon_amount}}</span></div> -->
                                <div class="sum_money">实付金额:<span>{{order_cost_info.integral_amount}}<i>积分</i></span></div>
                            </div>
                        </template>
                    </template>
                    <template v-else>
                    <!-- str -- 用券明细 -- str -->
                    <div class="room_money">
                        <h4>房费<span><i>&yen;</i>0</span></h4>
                        <p v-for="(item,index) in order_cost_info.detail" :key="index">{{item.order_time}}<span>{{order_cost_info.room_sum}}间*&yen;0</span></p>
                        <template>
                            <h4 class="room_money_coupon">优惠券</h4>
                            <p>电子房券<span>*{{order_id_info.order_coupon_all}}</span></p>
                        </template>
                    </div>
                    <div class="room_money room_money_sum">
                        <!-- <div class="sum_discounts" v-if="initCoupon">总计优惠:<span>-&yen;{{initCoupon.coupon_amount}}</span></div> -->
                        <div class="sum_money">实付金额:<span><i>&yen;</i>0</span></div>
                    </div>
                    <!-- end -- 用券明细 -- end -->
                    </template>
                </div>
                <!-- 交易明细弹框的title -->
                <!-- <div class="weui-actionsheet__title zb-weui-actionsheet__title">
                    <p class="weui-actionsheet__title-text zb-weui-actionsheet__title-text">费用明细</p>
                </div> -->
                <!-- 交易明细弹框的内容 -->
                <!-- <div class="weui-actionsheet__menu" style="max-height:300px;overflow:auto;"> -->
                    <!-- <div class="zb-actionsheet__bd">
                        <div class="weui-cells zb-weui-cells weui-cells_checkbox">
                            <label class="weui-cell zb-weui-cell weui-check__label " for="deal1">
                                <div class="weui-cell__bd div zb-weui-cell__hd">
                                    <h4>{{order_cost_info.occupancy_day_num}}晚、{{order_cost_info.room_sum}}间共</h4>
                                </div>
                                <template>
                                    <div v-if="order_cost_info.integral_status != 1" class="weui-cell__hd div">&yen;{{order_cost_info.order_money}}</div>
                                    <div v-else class="weui-cell__hd div">{{order_cost_info.integral_amount}}积分</div>
                                </template>
                            </label>
                        </div>
                    </div> -->
                    <!-- 每天每间多少钱 -->
                    <!-- <div class="zb-actionsheet__bd" v-if="order_cost_info.detail" v-for="(item,index) in order_cost_info.detail" :key="index">
                        <div class="weui-cells zb-weui-cells weui-cells_checkbox">
                            <label class="weui-cell zb-weui-cell weui-check__label " for="deal1">
                                <div class="weui-cell__bd div zb-weui-cell__hd">
                                    <h4>{{item.order_time}}</h4>
                                </div>
                                <div class="weui-cell__hd div">
                                    <template>
                                        <div v-if="order_cost_info.integral_status != 1">
                                            <span style="color:#666;">{{order_cost_info.room_sum}}间 * </span>&yen;{{item.money}}
                                        </div>
                                        <div v-else>
                                            <span style="color:#666;">{{order_cost_info.room_sum}}间 * </span>{{item.integral_amount}}积分
                                        </div>
                                    </template>
                                </div>
                            </label>
                        </div>
                    </div> -->
                    <!-- 订单优惠券是否使用并展示 -->
                    <!-- <div class="zb-actionsheet__bd" v-if="order_cost_info.coupon_id">
                        <div class="weui-cells zb-weui-cells weui-cells_checkbox">
                            <label class="weui-cell zb-weui-cell weui-check__label" for="deal1">
                                <div class="weui-cell__bd div zb-weui-cell__hd">
                                    <h4>优惠券折扣</h4>
                                </div>
                                <div class="weui-cell__hd div">
                                    <span style="color:#666;">{{order_cost_info.coupon_str}}</span>
                                </div>
                            </label>
                        </div>
                    </div> -->
                    <!-- 实付 -->
                    <!-- <div class="zb-actionsheet__bd">
                        <div class="weui-cells zb-weui-cells weui-cells_checkbox">
                            <label class="weui-cell zb-weui-cell weui-check__label" for="deal1">
                                <div class="weui-cell__bd div zb-weui-cell__hd">
                                    <h4>总计</h4>
                                </div>
                                <div class="weui-cell__hd div">
                                    <template>
                                        <div v-if="order_cost_info.integral_status != 1">
                                            <span style="color:#666;">实付金额：</span>
                                            &yen;{{order_cost_info.order_money}}
                                        </div>
                                        <div v-else>
                                            <span style="color:#666;">实付金额：</span>
                                            {{order_cost_info.integral_amount}}积分
                                        </div>
                                    </template>
                                </div>
                            </label>
                        </div>
                    </div> -->
                <!-- </div> -->
            </div>
        </div>

        <!-- 发票信息弹框 -->
        <div id="invoiceMask" class="weui-mask" @click.stop="hideInvoiceMask" v-show="isShowInvoiceMask">
            <div class="inputTicket">
                <p @click.stop="hideInvoiceMask" class="invoicetitle">发票信息  <span class="invoiceClose"></span></p>
                <div class="inputTicketItem">
                    <label class="ticketLab">发票类型</label>
                    <div class="ticketContent">
                        <input type="text" v-if="invoiceInfo" :value="invoiceInfo.invoice_type|filterInvoiceInfo" disable class="ipt" placeholder="请输入单位名称...">
                    </div>
                </div>
                <div class="inputTicketItem">
                    <label class="ticketLab">单位名称</label>
                    <div class="ticketContent">
                        <input type="text" v-if="invoiceInfo" v-model="invoiceInfo.company_name" disable class="ipt" placeholder="请输入单位名称...">
                    </div>
                </div>
                <div class="inputTicketItem">
                    <label class="ticketLab">纳税识别号</label>
                    <div class="ticketContent">
                        <input type="text" v-model="invoiceInfo.taxpayer_num" disable class="ipt" placeholder="请输入税号...">
                    </div>
                </div>
                <div class="inputTicketItem">
                    <label class="ticketLab">注册地址</label>
                    <div class="ticketContent">
                        <input type="text" v-model="invoiceInfo.address" disable class="ipt" placeholder="请输入注册地址...">
                    </div>
                </div>
                <div class="inputTicketItem">
                    <label class="ticketLab">注册电话</label>
                    <div class="ticketContent">
                        <input type="text" v-model="invoiceInfo.tel" disable class="ipt" placeholder="请输入注册电话...">
                    </div>
                </div>
                <div class="inputTicketItem">
                    <label class="ticketLab">开户银行</label>
                    <div class="ticketContent">
                        <input type="text" v-model="invoiceInfo.bank" disable  class="ipt" placeholder="请输入开户银行...">
                    </div>
                </div>
                <div class="inputTicketItem">
                    <label class="ticketLab">银行账号</label>
                    <div class="ticketContent">
                        <input type="text" v-model="invoiceInfo.bank_number" disable class="ipt" placeholder="请输入银行账号...">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    order_detail,
    order_cost_detail,
    cancel_orderform,
    wx_pay,
    user_card_privilege
} from "@/api/api";
import { Toast } from 'vant';
export default {
    name: "order-detail",
    components: {},
    data() {
        return {
            isDealDetailMask: false,
            order_id: "", //接收路由传过来的order_id
            order_id_info: "", // 接收http请求的order_detail数据
            order_cost_info: "", // 接收http请求的明细接口（order_cost_info）数据
            paySuccessToast: false,
            loading: false,
            loadingTxt: "数据加载中",
            userCardRightInfo : "",
            isUserCardRightMask: false,
            group_name: "",  // 会员卡desc
            catering_discount: "", // 95折扣
            invoiceType: 0,  // 发票类型
            invoiceInfo: "" , // 发票信息
            isShowInvoiceMask: false, // 发票遮罩弹框
            is_type:""
        };
    },
    created() {
        let order_id = this.$route.query.order_id;
        this.order_id = order_id;
    },
    mounted() {
        // 拉取订单详情
        this.fetchOrderDetail();
    },
    filters: {
        filterInvoiceInfo(v) {
            if (v == 0) return '不开发票'; 
            if (v == 1) return '增值税专用发票';
            if (v == 2) return '增值税普通发票';
        }
    },
    methods: {
        // 拉取用户所属卡种的信息
        fetchUserCardRightInfo() {
            this.loading = true;
            this.$http({
                method: "POST",
                url: user_card_privilege,
                data: {
                    id: this.order_id_info.group_id
                }
            }).then(res => {
                this.loading = false;
                if(res.data.status == 1){
                    this.userCardRightInfo = res.data.data;
                    this.isUserCardRightMask = true;
                }else{
                    Toast(res.data.msg);
                }
            });
        },
        // 隐藏用户所属卡种相关权益遮罩
        hideUserCardRightMask() {
            this.isUserCardRightMask = false;
        },
        // 隐藏交易明细遮罩-ui没有设计这个交互逻辑
        hideDealDetailMask() {
            this.isDealDetailMask = false;
        },
        // 展示发票信息遮罩
        showInvoiceMask() {
            this.isShowInvoiceMask = true;
        },
        // 隐藏发票信息遮罩
        hideInvoiceMask() {
            this.isShowInvoiceMask = false;
        },

        // 订单详情
        fetchOrderDetail() {
            this.loading = true;
            this.$http({
                method: "POST",
                url: order_detail,
                data: {
                    order_id: this.order_id
                }
            }).then(res => {
                this.loading = false;
                if (res.data.status == 1) {
                    this.order_id_info = res.data.data;
                    this.group_name = res.data.data.group.name;  // 用户所属卡种-名称
                    this.promo = res.data.data.group.promo;     // 用户所属卡种-会员折扣
                    this.catering_discount = res.data.data.group.catering_discount; // 用户所属卡种-餐饮折扣
                    this.invoiceInfo = res.data.data.invoice;   // 用户发票信息
                    this.is_type = res.data.data.is_type;
                    if (this.invoiceInfo == "") {
                        this.invoiceType = 0;
                    } else {
                        this.invoiceType = this.invoiceInfo.invoice_type;
                    }
                }else{
                    Toast(res.data.msg);
                }
            });
        },
        // 明细详情
        fetchOrderCostDetail() {
            this.loading = true;
            this.$http({
                method: "POST",
                url: order_cost_detail,
                data: {
                    order_id: this.order_id
                }
            }).then(res => {
                this.loading = false;
                if (res.data.status == 1) {
                    this.order_cost_info = res.data.data;
                    this.isDealDetailMask = true;
                }else{
                    Toast(res.data.msg);
                }
            });
        },

        // 支付成功回调执行方法
        paySuccessMethod() {
            this.paySuccessToast = false;
            this.$router.push({
                path: "orderList"
            });
        },
        // 立即支付按钮
        payMethod(order_id) {
            this.loadingTxt = "微信支付调取中";
            this.loading = true;
            let _this = this;
            let jsApiParameters = {};
            let onBridgeReady = function() {
                WeixinJSBridge.invoke(
                    "getBrandWCPayRequest",
                    jsApiParameters,
                    res => {
                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                            _this.paySuccessToast = true;
                        }
                        if (res.err_msg == "get_brand_wcpay_request:cancel") {
                            alert("取消支付");
                            window.location.reload();
                        }
                    }
                );
            };
            let callpay = function() {
                if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                        document.addEventListener(
                            "WeixinJSBridgeReady",
                            onBridgeReady,
                            false
                        );
                    } else if (document.attachEvent) {
                        document.attachEvent(
                            "WeixinJSBridgeReady",
                            onBridgeReady
                        );
                        document.attachEvent(
                            "onWeixinJSBridgeReady",
                            onBridgeReady
                        );
                    }
                } else {
                    onBridgeReady();
                }
            };
            // 请求支付接口
            this.$http({
                method: "POST",
                url: wx_pay,
                data: {
                    orderid: order_id
                }
            }).then(res => {
                if (res.data.status == 1) {
                    this.loading = false;
                    jsApiParameters = JSON.parse(res.data.data);
                    callpay();
                } else {
                    _this.alert(res.data.msg);
                }
            });
        },
        // 取消订单
        cancal() {
            this.loading = true;
            this.$http({
                method: "POST",
                url: cancel_orderform,
                data: {
                    order_id: this.order_id,
                    status: this.order_id_info.status
                }
            }).then(res => {
                if (res.data.status == 1) {
                    this.loading = false;
                    this.$router.go(-1);
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
@import './OrderDetail.less';
</style>