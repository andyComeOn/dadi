<template>
    <div class="orderPage m-position-ab">
        <!-- 订单信息 -->
        <div class="order_head">
            <div class="order_head_box">
                <div class="order_head_details">
                    <p class="store_room_name">{{order_msg.room_name}}</p>
                    <div class="info_time" @click="triggerCalendar"><i></i>{{beginM + '-' + beginD}}<i></i>{{finishM + '-' + finishD}}<span>{{howManyNight}}晚</span></div>
                    <p class="store_name">{{order_msg.store_name}}</p>
                    <p class="breakfast">&nbsp;</p>
                    <p class="cancel_time">{{order_msg.pre_cancel_time}}前免费取消</p>
                </div>
            </div>
        </div>
        <!-- 用户操作区 -->
        <div class="cells_box">
            <ul class="Cells">
                <p class="info_msg">入住信息</p>
                <!-- 房间数 -->
                <li class="roomCell" :class="{roomCellBorderVoid: isSelectRoom == true}" @click="selectRoom">
                    <label class="label">房间数</label>
                    <div class="roomNum">
                        {{this.roomSum}}间
                        <img class="roomNumArrow" src="../../assets/images/arrows/ic_pay_arrow.png" />
                    </div>
                </li>
                <!-- 可定房间list -->
                <div class="roomList" v-show="isSelectRoom">
                    <span v-if="order_msg.quantity !=0 ">
                        <span class="roomItem" v-for="(item,index) in order_msg.quantity" :key="index">
                            <i :class="[{default: isActive == item }]" @click="selectOrder(item)">{{item}}</i>
                        </span>
                    </span>
                    <div v-else class="roomListVoid">{{hint_text}}</div>
                </div>
                <!-- 入住人姓名 -->
                <li class="name">
                    <label class="label">入住人姓名</label>
                    <div class="item-rg linkman">
                        <div class="nameInputWrap">
                            <input type="text" class="nameInput" id="name" placeholder="请输入姓名" v-model="orderName">
                        </div>
                        <div class="linkmanBtn" @click="fetchLinkman"></div>
                    </div>
                </li>
                <!-- 手机号 -->
                <li class="tel">
                    <label class="label">手机号</label>
                    <div class="item-rg">
                        <div class="telInputWrap">
                            <input type="tel" class="telInput" id="tel" placeholder="请输入手机号" v-model="orderTel">
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="cells_box">
            <ul class="Cells">
                <p class="info_msg">其它服务</p>
                <li class="ticket" v-if="this.exchangeType == 0 && this.initCoupon == '' || this.initCoupon.coupon_type == 1 || this.initCoupon.coupon_type == 2">
                    <label class="label">发票类型</label>
                    <div class="ticketContent tr" @click="showTicketMask">
                        {{ ticketType | transTicketType}} 
                        <img src="../../assets/images/arrows/ic-arrow_10_18.png" style="width: 5px; height: 9px;" alt="">
                    </div>
                </li>
                <div v-if="this.exchangeType == 0 && this.initCoupon == '' || this.initCoupon.coupon_type == 1 || this.initCoupon.coupon_type == 2" class="inputTicket" v-show="isShowInputTicket">
                    <div class="inputTicketItem">
                        <label class="ticketLab">单位名称</label>
                        <div class="ticketContent ticketContentCompany">
                            <input type="text" v-model="ticketCompany" class="ipt" placeholder="请输入单位名称...">
                            <img class="invoice_company_icon" src="../../assets/images/invoice-company.png" @click.stop="fetchInvoiceLis">
                        </div>
                    </div>
                    <div class="inputTicketItem">
                        <label class="ticketLab">税号</label>
                        <div class="ticketContent">
                            <input type="text" v-model="ticketTaxpayer" class="ipt" placeholder="请输入税号...">
                        </div>
                    </div>
                    <div class="inputTicketItem">
                        <label class="ticketLab">注册地址</label>
                        <div class="ticketContent">
                            <input type="text" v-model="ticketAddress" class="ipt" placeholder="请输入注册地址...">
                        </div>
                    </div>
                    <div class="inputTicketItem">
                        <label class="ticketLab">注册电话</label>
                        <div class="ticketContent">
                            <input type="text" v-model="ticketTel" class="ipt" placeholder="请输入注册电话...">
                        </div>
                    </div>
                    <div class="inputTicketItem">
                        <label class="ticketLab">开户银行</label>
                        <div class="ticketContent">
                            <input type="text" v-model="ticketBank" class="ipt" placeholder="请输入开户银行...">
                        </div>
                    </div>
                    <div class="inputTicketItem">
                        <label class="ticketLab">银行账号</label>
                        <div class="ticketContent">
                            <input type="text" v-model="ticketBankNum" class="ipt" placeholder="请输入银行账号...">
                        </div>
                    </div>
                </div>
                <div class="mark">
                    <label class="label">备注</label>
                    <div class="markRg"><textarea name="markName" id="markTextarea" placeholder="选填" v-model="remarks"></textarea></div>
                </div>
            </ul>
        </div>
        <!-- 温馨提示 -->
        <div class="tips">
            <p>联系电话:<a href="tel:400-099-9682">400-099-9682</a></p>
            <span>周一至周五9:00-17:30</span>
        </div>
        <!-- 确认支付bar -->
        <div class="paybar">
            <div class="lf">
                <div class="money">&yen;{{order_msg.amount}}</div>
                <div class="discount">省{{order_msg.pro_money}}</div>
                <div class="arrow">
                    <span @click="showDealDetailMask">明细</span>
                </div>
            </div>
            <div class="rg" @click="pay">支付</div>
        </div>
        <!-- 交易明细弹框 -->
        <div class="deal-detail-mask-box">
            <div class="weui-mask zb-weui-mask" id="dealDetailMask" @click="hideDealDetailMask" :class="[{'weui-actionsheet_no_toggle_active':isDealDetailMask},{'weui-actionsheet_no_toggle':!isDealDetailMask}]"></div>
            <div class="weui-actionsheet zb-weui-actionsheet" id="weui-actionsheet" :class="[{'weui-actionsheet_toggle':isDealDetailMask}]">
                <!-- 交易明细弹框的内容 -->
                <div class="expense_msg">
                    <!-- 交易明细弹框的title -->
                    <h3>费用明细</h3>
                    <div class="room_money">
                        <h4>房费<span><i>&yen;</i>{{order_msg.amount}}</span></h4>
                        <p v-for="(item,index) in order_msg.unit_price" :key="index">{{item.time}}<span>{{roomSum}}间*&yen;{{item.amount}}</span></p>
                        <h4 class="room_money_coupon">优惠券</h4>
                        <p>会员折扣<span>{{order_msg.user_discount}}折</span></p>
                        <p>活动专享折扣<span>{{order_msg.discount}}折</span></p>
                    </div>
                    
                    <div class="room_money room_money_sum">
                        <div class="sum_money">实付金额:<span><i>&yen;</i>{{order_msg.amount}}</span></div>
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
                    <ul v-if="linkmanList">
                        <li v-for="(item,index) in linkmanList" :key="index" @click="selectLinkman(item.id,item.username,item.mobile)" :class="{active:isLinkmanActive==item.id}">{{item.username}}
                            <span class="select"></span>
                        </li>
                    </ul>
                    <div v-else style="line-height: 44px;font-size:14px;color:#666;text-align:center;">您还没有添加常用入住人信息</div>
                </div>    
            </div>
        </div>
        <!-- 选取发票类型弹框 -->
        <div id="ticketMask" class="weui-mask" @click.stop="hideTicketMask" v-show="isTicketMask == true">
            <div class="ticketMaskWrap">
                <ul>
                    <li @click.stop="selectTicket(0)" :class="{ isActive: ticketType == 0 }">不开发票</li>
                    <!-- <li @click.stop="selectTicket(1)" :class="{ isActive: ticketType == 1 }">增值税专票</li> -->
                    <li @click.stop="selectTicket(2)" :class="{ isActive: ticketType == 2 }">增值税普票</li>
                    <p @click.stop="hideTicketMask">取消</p>
                </ul>
            </div>
        </div>
        <!-- 发票列表弹框 -->
        <div id="invoiceListMask" class="weui-mask" @click.stop="hideInvoiceListMask" v-show="isInvoiceListMask == true">
            <div class="invoiceListMaskWrap">
                <ul v-if="invoiceList.length > 0" class="invoice_lists">
                    <li v-for="(item, index) in invoiceList" @click.stop="selectInvoiceListsItem(item.company_name, item.taxpayer_num, item.address, item.tel, item.bank, item.bank_number)">
                        <h3>{{item.company_name}}</h3>
                        <p>纳税识别号：{{item.taxpayer_num}}</p>
                        <img src="../../assets/images/arrows/list－更多icon@1x.png" />
                    </li>
                </ul>
                <p class="no_invoice" v-else>暂无历史发票信息</p>
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
        <!-- 若凌晨订房，则出现该toast弹框 -->
        <div v-show="orderBeforeDawnRoomToast">
            <div class="z-mask-transparent-pay"></div>
            <div class="z-toast-pay">
                <p class="z-toast-pay-head">提示</p>
                <p class="z-toast-pay-body beforeDawnAddclass">
                    您的订单为{{beginM}}月{{beginD}}日凌晨入住，
                    请于06:00前办理入住，
                    {{finishM}}月{{finishD}}日{{delayCheckout|filterDelayRoomNum}}:00前办理退房
                </p>
                <p class="z-toast-pay-footer beforeDawnAddclass">
                    <span class="cancelOrder" @click="CancelOrder">取消订单</span>
                    <span class="submitOrder" @click="SubmitOrder">提交订单</span>
                </p>
            </div>
        </div>
        <!-- 日历插件 -->
        <van-calendar v-model="show_calendar" :min-date="minDate" :max-date="maxDate" confirm-text="完成" confirm-disabled-text="请选择结束时间" color="#30B097" @confirm="confirmCalendar"/>
    </div>
</template>

<script>
import {getOrderId,getFillInOrder,order_form,create_order,user_card_privilege,residentList, apiInvoiceList} from "@/api/api";
import { f, dateEndMinusStart, YTDLf, isBeforeDawn} from "@/utils/date"; // 引入封装时间函数
import Calendar from "@/components/calendar/calendar.vue"; // 引入日历组件
import { getCookie,getUrlParam } from "@/utils/util";
import myBroadcast from "@/components/broadcast";
import { Toast } from 'vant';
export default {
    components: {
        myBroadcast,
        Calendar,
    },
    data() {
        return {
            // ==================new
            order_msg:"",
            orderName: "",      // 订房人预留的姓名
            orderTel: "",       // 订房人预留的手机号
            // 日历组件dialog是否显示
            show_calendar: false,
            // 初始化日历日期
            zbInitCalendar: {
                start: {
                    yyyy: "",
                    mm: "",
                    dd: ""
                },
                end: {
                    yyyy: "",
                    mm: "",
                    dd: ""
                }
            },
            roomSum:1,              //标记房间数
            minDate: new Date(),
            maxDate: new Date(2020, 2, 15),
            // ==================
            reduce_money:"",            //立减金额
            payType: getUrlParam('payType'),
            isCouponMask: false,  
            isTicketMask: false, // 发票类型遮罩控制
            isInvoiceListMask: false, // 发票list遮罩控制
            invoiceList: "", // 发票list
            ticketType: 0, // 发票类型
            exchangeType:0,     //积分兑换类型
            isShowInputTicket : false,  // 是否展示发票输入div
            ticketCompany: "",  // 发票中单位名称
            ticketTaxpayer: "", // 发票中纳税识别号
            ticketAddress: "", // 发票中单位注册地址
            ticketTel: "", // 发票中单位注册电话
            ticketBank: "", // 发票中单位开户行
            ticketBankNum: "", // 发票中开户行号
            isDealDetailMask: false,
            isSelectRoom: false,
            isUserCardRightMask: false,
            isLinkmanMask: false, // 入住联系人mask控制
            isLinkmanActive: -1,   //入住联系人默认选择第一个
            
            distance_int: "", // 距离  
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
            integral:[],
            // 后台返回的该用户是否可订房标志
            isUserCanOrder: true,
            // 总价
            totalPrice: "",
            dst_totalPrice: "",
            // 房间的单价
            discount_price: "",
            // 该用户属于哪个会员卡种
            group_name: "",
            // 该用户所属卡种的id
            group_id: "",
            // 该用户所属会员卡种-餐饮打几折  
            catering_discount: "",
            // 该用户所属会员卡种-会员卡折扣
            promo:"",
            // 用户所属卡种-延迟退房时间 -> 13:00，“至14点”
            delayCheckout :"", 
            // 优惠券
            coupon: [],
            orderDelayToast: false,
            orderDelayToastTxt: "您今日可订限额已用完，请明天再来",
            roomNumItems: "", //循环可定房间
            
            isActive: 1,
            loading: false, 
            loadingTxt: "数据加载中",
            couponBarShow: true,
            userCardRightInfo: "", // 用户所属卡种的权益详情
            discount: "", // 省了多少钱
            linkmanList: "", // 联系人列表
            imgSrcDefault: require("../../assets/images/icon/ic-radio.png"),
            remarks: "", // 若有老、幼、孕、残可以添加备注
            isBeforeDawn: false, // 是否为今天凌晨
            isBeforeDawnOrder: false, // 是否为凌晨订单
            isBeforeDawnOrderAndNoonGo: false, // 是凌晨订单且今天中午离店
            yesterday: "",
            orderBeforeDawnRoomToast: false, // 点击支付按钮控制凌晨订房toast
            privilege:{},               //全部信息
            hint_text:"",
            astrict:"",              //限购
            quantity: "",             //该用户还能再定房间数的上限
            isExchangeMask:false,   //积分兑换弹窗开关
            payPassType:true,       //积分不足提示语开关
            
        }
    },
    created() {

        // 凌晨订单逻辑
        // if (routePara.begin == YTDLf().kebab) {
        //     this.isBeforeDawnOrder = true;
        //     if (routePara.finish == YTD().kebab) {
        //         this.isBeforeDawnOrderAndNoonGo = true;
        //     }
        // } else {
        //     this.isBeforeDawnOrder = false;
        // }

        // 凌晨订房bar提示逻辑
        // if (isBeforeDawn() == true) {
        //     this.isBeforeDawn = true;
        // } else {
        //     this.isBeforeDawn = false;
        // }
        // 获取当前日期的昨天
        this.yesterday = YTDLf().kebab;
        // 拉取订单信息接口
        let _num = this.roomSum;
        let _begin = "";
        let _finish = "";
        this.fetchOrderForm(_begin,_finish,_num);
    },
    filters: {
        transTicketType(v) {
            if (v == 1) {
                return '增值税专票';
            } else if (v == 2) {
                return '增值税普票';
            } else {return '不开发票'}
        }
    },
    methods: {
        //入住日期确定
        confirmCalendar(value){
            let _value = f(value);
            let _begin = _value.yyyy + "-" + _value.mm + "-" + _value.dd;
            let d=new Date(_begin);
            if(this.$route.query.reserve_day == 7){
                d.setDate(d.getDate()+7);
            }else if(this.$route.query.reserve_day == 14){
                d.setDate(d.getDate()+14);
            }else{
               Toast("日期错误"); 
            }
            let m;
            if(Number(d.getMonth()+1) < 10){
                m = "0" + Number(d.getMonth()+1);
            }else{
                m = d.getMonth()+1;
            }
            let _day;
            if(d.getDate() < 10){
                _day = "0" + d.getDate();
            }else{
                _day = d.getDate();
            }
            let _finish = d.getFullYear() + '-'+ m + '-' + _day;
            let _num = this.roomSum;
            this.fetchOrderForm(_begin,_finish,_num);
            this.show_calendar = false;
        },
        // 触发日历dialog显示
        triggerCalendar() {
            this.show_calendar = true;
        },
        // 拉取联系人list
        fetchLinkman() {
            this.loading = true;
            this.$http({
                method: "POST",
                url: residentList,
                data: {}
            }).then(res => {
                this.loading = false;
                if (res.data.status == 1) {
                    this.isLinkmanMask = true;
                    this.linkmanList = res.data.data;
                } else {
                    this.linkmanList = "";
                    Toast(res.data.msg);
                }
            });
        },
        // 隐藏入住联系人遮罩
        hideLinkmanMask() {
            this.isLinkmanMask = false;
        },
        // 选取入住联系人
        selectLinkman(id,name,tel){
            this.isLinkmanMask = false;
            this.isLinkmanActive = id;
            this.orderName = name;
            this.orderTel = tel;
        },
        // 展示选择发票类型遮罩
        showTicketMask() {
            this.isTicketMask = true;
        },
        // 隐藏选择发票类型遮罩
        hideTicketMask(){
            this.isTicketMask = false;
        },
        // 隐藏发票列表遮罩
        hideInvoiceListMask() {
            this.isInvoiceListMask = false;
        },
        // 选取发票列表item
        selectInvoiceListsItem(name, tax, addr, tel, bank, bank_num) {
            this.ticketCompany = name;
            this.ticketTaxpayer = tax;
            this.ticketAddress = addr;
            this.ticketTel = tel;
            this.ticketBank = bank;
            this.ticketBankNum = bank_num;
            this.isInvoiceListMask = false;
        },
        // 拉取发票列表
        fetchInvoiceLis() {
            this.loading = true;
			this.$http({
				method: "POST",
				url: apiInvoiceList,
				data: {}
			}).then(res => {
                this.loading = false;
				if (res.data.status == 1) {
                    this.isInvoiceListMask = true;
                    this.invoiceList = res.data.data;
                } else {
                    this.invoiceList = [];
                    Toast(res.data.msg);
				}
            });
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
        fetchOrderForm(_begin,_finish,_num) {
            let _this = this;
            _this.loading = true;
            _this.$http({
                method:"POST",
                url:getFillInOrder,
                data:{
                    id:getUrlParam('storeId'),
                    begin:_begin,
                    finish:_finish,
                    room_sum: _num
                }
            }).then(res => {
                _this.loading = false;
                if(res.data.status == 1){
                    this.order_msg = res.data.data;
                    this.orderName = res.data.data.data.resident.username;
                    this.orderTel = res.data.data.data.resident.mobile;
                    let beginArr = this.order_msg.begin.split("-");
                    this.beginY = beginArr[0];
                    this.beginM = beginArr[1];
                    this.beginD = beginArr[2];
                    let finishArr = this.order_msg.finish.split("-");
                    this.finishY = finishArr[0];
                    this.finishM = finishArr[1];
                    this.finishD = finishArr[2];
                    // 计算入住-离店共有几晚
                    this.howManyNight = dateEndMinusStart(
                        res.data.data.begin,
                        res.data.data.finish
                    );
                    this.quantity = res.data.data.quantity;
                    this.astrict = res.data.data.astrict;
                    if (this.quantity == 0) {
                        this.hint_text = '当前房型已售完，您可以选择其它房型预订';
                        this.roomSum = 0;
                    }else if(this.astrict == 0){
                        this.hint_text = '您今日可订限额已用完，请明天再来';
                        this.roomSum = 0;
                    }else{
                        this.roomSum = _num;
                        this.isActive = _num;
                    }
                }
            })
        },
        // 选择房间折叠与否
        selectRoom() {
            this.isSelectRoom = !this.isSelectRoom;
        },
        // 点击按钮进行订房
        selectOrder(num) {
            let _num = num;
            let _begin = this.beginY + "-" + this.beginM + "-" + this.beginD;
            let _finish = this.finishY + "-" + this.finishM + "-" + this.finishD;
            this.isSelectRoom = false;
            this.fetchOrderForm(_begin,_finish,_num);
        },
        // 发票类型选取
        selectTicket(type) {
            this.ticketType = type;
            if (type != 0) {
                this.isShowInputTicket = true;
            } else {
                this.isShowInputTicket = false;
                this.ticketCompany = "";
                this.ticketTaxpayer = "";
                this.ticketAddress = "";
                this.ticketTel = "";
                this.ticketBank = "";
                this.ticketBankNum = "";
            }
            this.isTicketMask = false;
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
        // 发票相关验证逻辑
        invoiceRule() {
            // 专票
            var regNum = /^\d*$/;
            if (this.ticketType == 1) {
                // 银行卡号最多不超过19位数字（要求）
                if (!this.ticketCompany.trim() ) {
                    this.orderDelayToastTxt = "单位名称不能为空";
                    this.orderDelayToast = true;
                    setTimeout(() => {
                        this.orderDelayToast = false;
                    }, 1500);
                    return false;
                } else if (!this.ticketTaxpayer.trim()) {
                    this.orderDelayToastTxt = "纳税识别号不能为空";
                    this.orderDelayToast = true;
                    setTimeout(() => {
                        this.orderDelayToast = false;
                    }, 1500);
                    return false;

                } else if (!this.ticketAddress.trim()) {
                    this.orderDelayToastTxt = "注册地址不能为空";
                    this.orderDelayToast = true;
                    setTimeout(() => {
                        this.orderDelayToast = false;
                    }, 1500);
                    return false;
                } else if (!this.ticketTel.trim()) {
                    this.orderDelayToastTxt = "注册电话不能为空";
                    this.orderDelayToast = true;
                    setTimeout(() => {
                        this.orderDelayToast = false;
                    }, 1500);
                    return false;
                } else if (!this.ticketBank.trim()) {
                    this.orderDelayToastTxt = "开户银行不能为空";
                    this.orderDelayToast = true;
                    setTimeout(() => {
                        this.orderDelayToast = false;
                    }, 1500);
                    return false;
                } else if (!this.ticketBankNum.trim()) {
                    this.orderDelayToastTxt = "银行账号不能为空";
                    this.orderDelayToast = true;
                    setTimeout(() => {
                        this.orderDelayToast = false;
                    }, 1500);
                    return false;
                } else if (!regNum.test(this.ticketBankNum.trim())) {
                    this.orderDelayToastTxt = "请输入正确的银行账号";
                    this.orderDelayToast = true;
                    setTimeout(() => {
                        this.orderDelayToast = false;
                    }, 1500);
                    return false;
                } else { 
                    return true 
                }          
                // 普票     
            } else if (this.ticketType == 2) {   
                if (!this.ticketCompany.trim() ) {
                    this.orderDelayToastTxt = "单位名称不能为空";
                    this.orderDelayToast = true;
                    setTimeout(() => {
                        this.orderDelayToast = false;
                    }, 1500);
                    return false;
                } else if (!this.ticketTaxpayer.trim()) {
                    this.orderDelayToastTxt = "纳税识别号不能为空";
                    this.orderDelayToast = true;
                    setTimeout(() => {
                        this.orderDelayToast = false;
                    }, 1500);
                    return false;
                } else if (!regNum.test(this.ticketBankNum.trim())) {
                    this.orderDelayToastTxt = "请输入正确的银行账号";
                    this.orderDelayToast = true;
                    setTimeout(() => {
                        this.orderDelayToast = false;
                    }, 1500);
                    return false;
                } else {
                    return true;
                }    
                // 不开发票（无须校验）
            } else {return true}
        },
        // 取消订单逻辑
        CancelOrder() {
            this.orderBeforeDawnRoomToast = false;
        },
        // 提交订单逻辑
        SubmitOrder() {
            this.orderBeforeDawnRoomToast = false;
            // 调用CreateOrder方法
            this.fetchCreateOrder();
        },
        // 生成订单
        fetchCreateOrder() {
            this.loadingTxt = "支付中...";
            this.loading = true;
            this.$http({
                method: "POST",
                url: getOrderId,
                data: {
                    id:this.$route.query.storeId,
                    dwell_name: this.orderName.trim(),
                    dewll_mobile: this.orderTel.trim(),
                    room_sum: this.roomSum,
                    begin: this.order_msg.begin,
                    finish: this.order_msg.finish,
                    remarks: this.remarks,
                    company_name:  this.ticketCompany,
                    taxpayer_num: this.ticketTaxpayer,
                    address:  this.ticketAddress,
                    tel:  this.ticketTel,
                    bank:  this.ticketBank,
                    bank_number: this.ticketBankNum,
                    integral_status:this.exchangeType,
                    superior_uid:this.$route.query.userUid,
                    invoice_type: this.ticketType,
                }
            }).then(res => {
                if (res.data.status == 1) {
                    this.loading = false;
                    this.orderBeforeDawnRoomToast = false;
                    this.$router.push({
                        path: "reservePayPage",
                        query: {
                            order_id: res.data.data.order_id
                        }
                    });
                } else {
                    this.loading = false;
                    this.orderBeforeDawnRoomToast = false;
                    this.orderDelayToastTxt = res.data.msg;
                    // "在您支付过程中，房被小伙伴抢光了";
                    this.orderDelayToast = true;
                    this.roomSum = 1;
                    // this.fetchOrderForm();
                    setTimeout(() => {
                        this.orderDelayToast = false;
                    }, 1500);
                }
            });
        },
        // 支付逻辑
        pay() {
            Toast("您好，该活动已过期");
            // 当今日可订限额已用完，禁止提交
            // if (this.astrict == 0) {
            //     this.orderDelayToastTxt = "您今日可订限额已用完，请明天再来";
            //     this.orderDelayToast = true;
            //     setTimeout(() => {
            //         this.orderDelayToast = false;
            //     }, 1500);
            //     return false;
            // }else if(this.quantity == 0){
            //     this.orderDelayToastTxt = "当前房型已售完，您可以选择其它房型预订";
            //     this.orderDelayToast = true;
            //     setTimeout(() => {
            //         this.orderDelayToast = false;
            //     }, 1500);
            //     return false;
            // }
            
            // if (this.orderNameBlur() && this.orderTelBlur() && this.invoiceRule()) {
            //     if (this.isBeforeDawnOrder == true) {
            //         this.orderBeforeDawnRoomToast = true;
            //     } else {
            //         if(this.payPassType){
            //             this.fetchCreateOrder();
            //         }else{
            //             Toast('积分不足');
            //         }
            //     } 
            // }
        }
    }
};
</script>
<style lang="less" scoped>
    @import "./fill_in_order.less";
    @import "./fill_in_order_new.less";
</style>