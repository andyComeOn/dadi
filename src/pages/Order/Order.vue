<template>
    <div class="orderPage m-position-ab">

        <!-- 订单信息 -->
        <div class="order_head">
            <div class="order_head_box">
                <div class="order_head_details">
                    <p class="store_room_name">{{details.name}}</p>
                    <p class="info_time">{{beginM}}月{{beginD}}日<i></i>{{finishM}}月{{finishD}}日<span>{{howManyNight}}晚</span></p>
                    <p class="store_name">{{details.store_name}}</p>
                    <template>
                        <p class="breakfast" v-if="this.is_type == 0">{{privilege.breakfast}}</p>
                        <p class="breakfast" v-else>活动产品不含早餐</p>
                    </template>
                    <p class="breakfast">{{privilege.coupon_name}}</p>
                    <p class="cancel_time">{{privilege.pre_cancel_time}}前免费取消</p>
                </div>
            </div>
        </div>

        <!-- 疫情提示 -->
        <template v-if="this.epidemicShow == 1">
            <div class="cells_box">
                <ul class="Cells">
                    <p class="info_msg col-red" style="color:red;">温馨提示</p>
                    <div class="epidemic_hint" style="padding: 5px 15px 15px 15px;text-indent: 2em;color: red;">
                        <p>即日起根据北京市最新政策规定，入住酒店不再要求提供核酸检测阴性证明，凭健康码即可办理入住。</p>
                        <p>境外，湖北，牡丹江，哈尔滨，抚顺等高风险地域客人，依据门店属地接待相关政策执行!</p>
                    </div>
                </ul>
            </div>
        </template>

        <!-- 用户操作区 -->
        <div class="cells_box">
            <ul class="Cells">
                <p class="info_msg">入住信息</p>
                <!-- 房间数 -->
                <li class="roomCell" :class="{roomCellBorderVoid: isSelectRoom == true}" @click="selectRoom">
                    <label class="label">房间数</label>
                    <div class="roomNum">
                        {{watchObj.room_sum}}间
                        <img class="roomNumArrow" src="../../assets/images/arrows/ic_pay_arrow.png" />
                    </div>
                </li>
                <!-- 可定房间list -->
                <div class="roomList" v-show="isSelectRoom">
                    <span v-if="roomNumItems.length !=0 ">
                        <span class="roomItem" v-for="(item,index) in roomNumItems" :key="index">
                            <i :class="[{default: isActive == item.num }]" @click="selectOrder(item.num)">{{item.num}}</i>
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
                <p class="info_msg">超值优惠</p>

                <!-- 积分兑换 -->
                <li class="coupon" v-if="this.privilege.integral_status == 1" @click="exchangeMask">
                    <label class="label">积分兑换</label>
                    <div class="item-rg">
                        <div class="coupon-div">
                            <div style="display:inline-block;">
                                <span v-if="this.exchangeType == 0">不使用积分兑换</span>
                                <span v-if="this.exchangeType == 1">使用积分兑换</span>
                            </div>
                            <img src="../../assets/images/arrows/ic-arrow_10_18.png" />
                        </div>
                    </div>
                </li>

                <!-- 优惠券 -->
                <template v-if="this.is_type == 0">
                    <li class="coupon" v-if="this.payType == 2 && this.exchangeType == 0" @click="showCouponMask">
                        <label class="label">优惠券</label>
                        <div class="item-rg">
                            <div class="coupon-div">
                                <div v-show="couponBarShow" style="display:inline-block;">
                                    <span v-if="coupon.length==0">无可用优惠券</span>
                                    <span v-else>{{coupon.length}}张优惠券可用</span>
                                </div>
                                <div v-show="!couponBarShow" style="display:inline-block;">
                                    {{initCoupon.name}}
                                </div>
                                <img src="../../assets/images/arrows/ic-arrow_10_18.png" alt="">
                            </div>
                        </div>
                    </li>
                </template>

                <!-- 下面的逻辑是啥意思？ -->
                <li class="coupon" v-if="this.exchangeType == 0 && (initCoupon.coupon_type == 1 || initCoupon.coupon_type == 2 || initCoupon.coupon_type == 3)">
                    <div class="item-rg">
                        <span class="once_reduce">立减<i>&yen;</i><span>{{reduce_money}}</span></span>
                    </div>
                </li>

                <!-- 会员卡种特权 -->
                <li class="cardRight" @click="fetchUserCardRightInfo">
                    <label class="label" style="width: 90px;">{{group_name | filterCardType}}特权</label>
                    <div class="cardRightContent">
                        <div class="cardRightTxt m-ellipsis">
                            房价折扣{{promo}}折，餐饮折扣{{catering_discount}}，延迟退房{{delayCheckout}}
                        </div>
                        <img src="../../assets/images/arrows/ic-arrow_10_18.png" alt="">
                    </div>
                </li>

            </ul>
        </div>

        <div class="cells_box">
            <ul class="Cells">
                <p class="info_msg">其它服务</p>

                <li class="roomCell">
                    <label class="label">退房规则</label>
                    <div class="roomNum">延迟退房{{privilege.delay_room}}</div>
                </li>

                <!-- 发票类型 -->
                <template v-if="this.is_type != 1">
                    <li class="ticket" v-if="this.exchangeType == 0 && this.initCoupon == '' || this.initCoupon.coupon_type == 1 || this.initCoupon.coupon_type == 2">
                        <label class="label">发票类型</label>
                        <div class="ticketContent tr" @click="showTicketMask">
                            {{ ticketType | transTicketType}}
                            <img src="../../assets/images/arrows/ic-arrow_10_18.png" style="width: 5px; height: 9px;" alt="">
                        </div>
                    </li>
                </template>

                <!-- 普票、专票对应的信息收集 -->
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
                <!-- 0钱  1积分 -->
                <template v-if="this.exchangeType == 0 && this.is_type == 0">
                    <div class="money">&yen;{{totalPrice}}</div>
                    <div class="discount">省{{discount}}</div>
                </template>
                <template v-else-if="this.is_type == 1 || this.is_type == 2">
                    <div class="money">&yen;0</div>
                    <div class="discount">省0</div>
                </template>
                <template v-else>
                    <div class="money">{{this.privilege.integral_amount}}积分</div>
                </template>
                <div class="arrow">
                    <!-- <img src="../../assets/images/arrows/ic_pay_arrow.png" /> -->
                    <span @click="showDealDetailMask">明细</span>
                </div>
            </div>
            <div class="rg" @click="pay">支付</div>
        </div>

        <!-- 优惠券的弹框 -->
        <div class="weui-mask" @click.stop="hideCouponMask" v-show="isCouponMask == true">
            <div class="couponMaskWrap" id="weui-actionsheet" @click.stop="showCouponMask">
                <div class="couponTitle">
                    <span>优惠券</span>
                    <img @click.stop="hideCouponMask" src="../../assets/images/coupon/popup_close.png" alt="">
                </div>
                <!-- 弹框的内容 -->
                <ul class="weui-actionsheet__menu couponMeun" v-if="coupon.length > 0">
                    <!-- 循环下面的整体 -->
                    <li class="zb-actionsheet__bd" v-for="(item,index) in coupon" :key="index">
                        <div class="weui-cells zb-weui-cells weui-cells_checkbox">
                            <label class="weui-cell zb-weui-cell weui-check__label" :for="item.id">
                                <div class="weui-cell__bd div zb-weui-cell__hd">
                                    <h4>{{item.name}}</h4>
                                    <p>有效期:{{item.validity_end_time}}</p>
                                </div>
                                <div class="weui-cell__hd div">
                                    <input type="radio" class="weui-check" :id="item.id" :value="{id:item.id,name:item.name,coupon_type:item.coupon_type}" v-model="initCoupon">
                                    <i class="weui-icon-checked"></i>
                                </div>
                            </label>
                            <template v-if="item.coupon_type == 1">
                                <dl>
                                    <dt>&yen;<i>{{item.amount}}</i></dt>
                                    <dd>代金券</dd>
                                </dl>
                            </template>
                            <template  v-if="item.coupon_type == 2">
                                <dl>
                                    <dt><i>{{item.discount}}</i>折</dt>
                                    <dd>折扣券</dd>
                                </dl>
                            </template>
                            <template  v-if="item.coupon_type == 3">
                                <p class="free_room_coupon">免房券</p>
                            </template>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 交易明细弹框 -->
        <div class="deal-detail-mask-box">
            <div class="weui-mask zb-weui-mask" id="dealDetailMask" @click="hideDealDetailMask" :class="[{'weui-actionsheet_no_toggle_active':isDealDetailMask},{'weui-actionsheet_no_toggle':!isDealDetailMask}]"></div>
            <div class="weui-actionsheet zb-weui-actionsheet" id="weui-actionsheet" :class="[{'weui-actionsheet_toggle':isDealDetailMask}]">
                <!-- 交易明细弹框的内容 -->
                <div class="expense_msg">
                    <!-- 交易明细弹框的title -->
                    <h3>费用明细</h3>
                    <template v-if="this.exchangeType == 0 && this.is_type == 0">
                        <div class="room_money">
                            <h4>房费<span><i>&yen;</i>{{dst_totalPrice}}</span></h4>
                            <p v-for="(item,index) in price" :key="index">{{item.add_time}}<span>{{watchObj.room_sum}}间*&yen;{{item.unit_price}}</span></p>
                            <template v-if="initCoupon">
                                <h4 class="room_money_coupon">优惠券</h4>
                                <p>{{initCoupon.name}}<span>-&yen;{{reduce_money}}</span></p>
                            </template>
                        </div>
                        <div class="room_money room_money_sum">
                            <!-- <div class="sum_discounts" v-if="initCoupon">总计优惠:<span>-&yen;{{initCoupon.coupon_amount}}</span></div> -->
                            <div class="sum_money">实付金额:<span><i>&yen;</i>{{totalPrice}}</span></div>
                        </div>
                    </template>
                    <template v-if="this.exchangeType == 0 && this.is_type != 0">
                        <div class="room_money">
                            <h4>房费<span><i>&yen;</i>0</span></h4>
                            <p v-for="(item,index) in price" :key="index">{{item.add_time}}<span>{{watchObj.room_sum}}间*&yen;0</span></p>
                            <template v-if="initCoupon">
                                <h4 class="room_money_coupon">优惠券</h4>
                                <p>{{initCoupon.name}}<span>-&yen;{{reduce_money}}</span></p>
                            </template>
                        </div>
                        <div class="room_money room_money_sum">
                            <!-- <div class="sum_discounts" v-if="initCoupon">总计优惠:<span>-&yen;{{initCoupon.coupon_amount}}</span></div> -->
                            <div class="sum_money">实付金额:<span><i>&yen;</i>0</span></div>
                        </div>
                    </template>
                    <template v-if="this.exchangeType == 1">
                        <div class="room_money">
                            <h4>房费<span>{{privilege.integral_amount}}<i>积分</i></span></h4>
                            <p v-for="(item,index) in integral" :key="index">{{item.add_time}}<span>{{watchObj.room_sum}}间*{{item.integral_amount}}积分</span></p>
                        </div>
                        <div class="room_money room_money_sum">
                            <!-- <div class="sum_discounts" v-if="initCoupon">总计优惠:<span>-&yen;{{initCoupon.coupon_amount}}</span></div> -->
                            <div class="sum_money">实付金额:<span>{{privilege.integral_amount}}<i>积分</i></span></div>
                        </div>
                    </template>
                </div>
                <!-- <div class="weui-actionsheet__menu" style="max-height:300px;overflow:auto;">
                    <div class="zb-actionsheet__bd">
                        <div class="weui-cells zb-weui-cells weui-cells_checkbox">
                            <label class="weui-cell zb-weui-cell weui-check__label " for="deal1">
                                <template v-if="this.exchangeType == 0">
                                    <div class="weui-cell__bd div zb-weui-cell__hd">
                                        <h4>{{howManyNight}}晚、{{watchObj.room_sum}}间共</h4>
                                    </div>
                                    <div class="weui-cell__hd div">
                                        &yen;{{totalPrice}}
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="weui-cell__bd div zb-weui-cell__hd">
                                        <h4>{{howManyNight}}晚、{{watchObj.room_sum}}间共</h4>
                                    </div>
                                    <div class="weui-cell__hd div">
                                        {{this.privilege.integral_amount}}积分
                                    </div>
                                </template>
                            </label>
                        </div>
                    </div>

                    <template v-if="this.exchangeType == 0">
                        <div class="zb-actionsheet__bd" v-if="price" v-for="(item,index) in price" :key="index">
                            <div class="weui-cells zb-weui-cells weui-cells_checkbox">
                                <label class="weui-cell zb-weui-cell weui-check__label " for="deal1">
                                    <div class="weui-cell__bd div zb-weui-cell__hd">
                                        <h4>{{item.add_time}}</h4>
                                    </div>
                                    <div class="weui-cell__hd div">
                                        <span style="color:#666;">{{watchObj.room_sum}}间 * </span> &yen;{{item.unit_price}}
                                    </div>
                                </label>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="zb-actionsheet__bd" v-if="integral" v-for="(item,index) in integral" :key="index">
                            <div class="weui-cells zb-weui-cells weui-cells_checkbox">
                                <label class="weui-cell zb-weui-cell weui-check__label " for="deal1">
                                    <div class="weui-cell__bd div zb-weui-cell__hd">
                                        <h4>{{item.add_time}}</h4>
                                    </div>
                                    <div class="weui-cell__hd div">
                                        <span style="color:#666;">{{watchObj.room_sum}}间 * </span> {{item.integral_amount}}积分
                                    </div>
                                </label>
                            </div>
                        </div>
                    </template>
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
                    <div class="zb-actionsheet__bd">
                        <div class="weui-cells zb-weui-cells weui-cells_checkbox">
                            <label class="weui-cell zb-weui-cell weui-check__label" for="deal1">
                                <div class="weui-cell__bd div zb-weui-cell__hd">
                                    <h4>总计</h4>
                                </div>
                                <div class="weui-cell__hd div">
                                    <template v-if="this.exchangeType == 0">
                                        <span style="color:#666;">实付金额：</span> &yen;{{totalPrice}}
                                    </template>
                                    <template v-else>
                                        <span style="color:#666;">实付金额：</span> {{this.privilege.integral_amount}}积分
                                    </template>
                                </div>
                            </label>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>

        <!-- 用户所属卡种的权益 -->
        <div id="userCardRightMaskBox">
            <div class="weui-mask zb-weui-mask" @click="hideUserCardRightMask" :class="[{'weui-actionsheet_no_toggle_active':isUserCardRightMask},{'weui-actionsheet_no_toggle':!isUserCardRightMask}]"></div>
            <div class="weui-actionsheet zb-weui-actionsheet userCardRightActionsheet" id="weui-actionsheet" :class="[{'weui-actionsheet_toggle':isUserCardRightMask}]">
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

        <!-- 积分兑换弹框 -->
        <div id="ticketMask" class="weui-mask" @click.stop="isExchangeMask = false" v-show="isExchangeMask == true">
            <div class="ticketMaskWrap">
                <ul>
                    <li @click.stop="selectExchange(0)" :class="{ isActive: exchangeType == 0 }">不使用积分兑换</li>
                    <li @click.stop="selectExchange(1)" :class="{ isActive: exchangeType == 1 }">使用积分兑换</li>
                    <p @click.stop="isExchangeMask = false">取消</p>
                </ul>
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
    </div>
</template>

<script>
import { dateEndMinusStart, YTDLf, YTD, isBeforeDawn } from "@/utils/date"; // 引入封装时间函数
import {order_form,create_order,user_card_privilege,residentList, apiInvoiceList} from "@/api/api";
import { getCookie,getUrlParam } from "@/utils/util";
import myBroadcast from "@/components/broadcast";
import { Toast } from 'vant';
export default {
    name: "orderPage",
    components: {
        myBroadcast
    },
    data() {
        return {
            is_type:this.$route.query.is_type,      // 0普通 1单位 2个人
			epidemicShow:0,
            reduce_money:"",//立减金额
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
            watchObj: {
                store_id: "",
                room_id: "",
                begin: "",
                finish: "",
                product_id:"",
                room_sum: 1, //默认的房间数
            },
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
            // 订房人预留的姓名、手机号
            orderName: "",
            orderTel: "",
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
            loading: true,
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
            privilege:{},               //全部信息（是指用户具有的权益）
            hint_text:"",
            astrict:"",              //限购
            quantity: "",             //该用户还能再定房间数的上限
            isExchangeMask:false,   //积分兑换弹窗开关
            payPassType:true,       //积分不足提示语开关
            roomSum:1,              //标记房间数
        }
    },
    created() {
        var routePara = {
            store_id: this.$route.query.store_id,
            room_id: this.$route.query.room_id,
            begin: this.$route.query.begin,
            finish: this.$route.query.finish,
            distance_int: this.$route.query.distance_int,
            product_id: this.$route.query.product_id
        };
        // 初始化数据
        this.watchObj.store_id = routePara.store_id;
        this.watchObj.room_id = routePara.room_id;
        this.watchObj.begin = routePara.begin;
        this.watchObj.finish = routePara.finish;
        this.distance_int = routePara.distance_int;
        this.watchObj.product_id =routePara.product_id;

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
        // 凌晨订单逻辑
        if (routePara.begin == YTDLf().kebab) {
            this.isBeforeDawnOrder = true;
            if (routePara.finish == YTD().kebab) {
                this.isBeforeDawnOrderAndNoonGo = true;
            }
        } else {
            this.isBeforeDawnOrder = false;
        }
        // 凌晨订房bar提示逻辑
        // if (isBeforeDawn() == true) {
        //     this.isBeforeDawn = true;
        // } else {
        //     this.isBeforeDawn = false;
        // }
        // 获取当前日期的昨天
        this.yesterday = YTDLf().kebab;
        // 拉取订单信息接口
        this.fetchOrderForm();
    },
    watch: {
        initCoupon: {
            handler(newValue, oldValue) {
                console.log(this.initCoupon);
                if (newValue != "") {
                    this.couponBarShow = false;
                    this.isCouponMask = false; //选取优惠券使其dialog消失
                    if(newValue.coupon_type == 3){
                        this.ticketType = 0;
                        this.isShowInputTicket = false;
                        this.ticketCompany = '';  // 发票中单位名称
                        this.ticketTaxpayer = ''; // 发票中纳税识别号
                        this.ticketAddress = ''; // 发票中单位注册地址
                        this.ticketTel = ''; // 发票中单位注册电话
                        this.ticketBank = ''; // 发票中单位开户行
                        this.ticketBankNum = ''; // 发票中开户行号
                    }
                    this.fetchOrderForm();
                }
            },
            deep: true,
            immediate: true
        }
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
        //选择积分类型
        selectExchange(ind){
            this.exchangeType = ind;
            if(ind == 1){
                this.ticketType = 0         // 0不开发票
            }
            if(ind == 0){
                this.payPassType = true;
            }
            this.isExchangeMask = false;
            this.fetchOrderForm();
        },
        //积分兑换弹框
        exchangeMask(){
            this.isExchangeMask = true;
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
        // 拉取用户所属卡种的权益
        fetchUserCardRightInfo() {
            this.loading = true;
            this.$http({
                method: "POST",
                url: user_card_privilege,
                data: {
                    id: this.group_id
                }
            }).then(res => {
                this.loading = false;
                if(res.data.status == 1){
                    this.isUserCardRightMask = true;
                    this.userCardRightInfo = res.data.data;
                }else{
                    Toast(res.data.msg);
                }
            });
        },
        // 隐藏用户所属卡种相关权益遮罩
        hideUserCardRightMask() {
            this.isUserCardRightMask = false;
        },
        // 展示优惠券遮罩
        showCouponMask() {
            if(this.coupon.length == 0){
                Toast('暂无优惠券');
            }else{
                this.isCouponMask = true;
            }
        },
        // 隐藏优惠券遮罩--ui说不需要此交互
        hideCouponMask() {
            this.isCouponMask = false;
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
        fetchOrderForm() {
            let _this = this;
            _this.loading = true;
            this.$http({
                method: "POST",
                url: order_form,
                data: {
                    store_id:_this.watchObj.store_id,
                    room_id:_this.watchObj.room_id,
                    begin:_this.watchObj.begin,
                    finish:_this.watchObj.finish,
                    product_id:_this.watchObj.product_id,
                    room_sum: _this.watchObj.room_sum,
                    integral_type:_this.exchangeType,          //0不使用积分  1使用积分
                    coupon_id:_this.initCoupon.id,
                    is_type:this.$route.query.is_type
                }
            }).then(res => {
                _this.loading = false;
                if (res.data.status == 1) {
                    this.epidemicShow = this.$route.query.epidemicShow;
                    this.privilege = res.data.data;
                    this.details = res.data.data.details; //给房间详情赋值
                    this.discount_price = res.data.data.discount_price; //预定房间总价赋值
                    this.original_price = res.data.data.original_price;  // 普通价
                    this.coupon = res.data.data.coupon; //给房间优惠券赋值
                    this.price = res.data.data.price; // 给明细赋值
                    this.integral = res.data.data.integral;
                    this.totalPrice = res.data.data.discount_price;  // 会员价格
                    this.dst_totalPrice = res.data.data.dst_price;
                    this.orderName = res.data.data.resident.username;  // 用户本人的信息：用户名
                    this.orderTel = res.data.data.resident.mobile;  // 用户本人的信息：手机号
                    this.discount = (
                        Math.round(
                            (res.data.data.original_price -
                                res.data.data.discount_price) *
                                100
                        ) / 100
                    ).toFixed(0);   // 告诉用户省了多少钱，普通价-会员价
                    if(res.data.data.coupon_info){
                        this.reduce_money = res.data.data.coupon_info.coupon_amount;
                    }
                    this.group_name = res.data.data.group_name; //属于哪个卡种
                    this.group_id = res.data.data.group_id; // 用户所属卡种的id
                    this.catering_discount =
                        res.data.data.catering_discount; // 用户所属卡种-餐饮折扣 -> 95折
                    this.promo = res.data.data.promo; // 用户所属卡种-会员卡折扣 -> 0.95
                    this.delayCheckout = res.data.data.delay_room; // 用户所属卡种-延迟退房时间 -> 13:00，后台返回的是“至14点”
                    this.astrict = parseInt(res.data.data.astrict); // 后台配置的最大可选择几间房        限制数量
                    this.quantity = parseInt(res.data.data.quantity); // 当前用户能定的最大房间数        可售出库存
                    if (this.quantity > 0) {
                        let tmp = [];
                        for (let i = 1; i <= this.quantity; i++) {
                            tmp.push({
                                num: i
                            });
                        }
                        this.roomNumItems = tmp;
                    } else {
                        this.roomNumItems = "";
                        this.watchObj.room_sum = 0;
                        this.hint_text = '当前房型已售完，您可以选择其它房型预订';
                    }
                    if(this.astrict == 0){
                        this.hint_text = '您今日可订限额已用完，请明天再来';
                    }
                    this.roomSum = this.watchObj.room_sum;
                    this.isActive = this.watchObj.room_sum;
                } else if (res.data.status == -3) {
                    // 若按照新的产品思路，这个else if 就不会出现了
                    this.isUserCanOrder = false;
                    this.watchObj.room_sum -= 1; //当不能在订房时候，其实已经达到了6，马上减1使其变成5。
                }else if(res.data.status == -1016){
                    Toast(res.data.msg);
                    this.payPassType = false;
                    this.watchObj.room_sum = this.roomSum;
                    this.isActive = this.roomSum;
                }else{
                    Toast(res.data.msg);
                    this.watchObj.room_sum = this.roomSum;
                    this.isActive = this.roomSum;
                }
            });
        },
        // 选择房间折叠与否
        selectRoom() {
            this.isSelectRoom = !this.isSelectRoom;
        },
        // 点击按钮进行订房
        selectOrder(num) {
            this.watchObj.room_sum = num;
            this.isSelectRoom = false;
            this.fetchOrderForm();
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
                url: create_order,
                data: {
                    room_type: this.watchObj.room_id,
                    store_id: this.watchObj.store_id,
                    dwell_name: this.orderName.trim(),
                    dewll_mobile: this.orderTel.trim(),
                    product_id:this.watchObj.product_id,
                    room_sum: this.watchObj.room_sum,
                    begin: this.watchObj.begin,
                    finish: this.watchObj.finish,
                    coupon_id: this.initCoupon.id,
                    remarks: this.remarks,
                    distance_int: this.distance_int,
                    lat_lon: getCookie("userLatitude")+','+getCookie("userLongitude"),
                    pay_type: getUrlParam("payType"),
                    invoice_type: this.ticketType,
                    company_name:  this.ticketCompany,
                    taxpayer_num: this.ticketTaxpayer,
                    address:  this.ticketAddress,
                    tel:  this.ticketTel,
                    bank:  this.ticketBank,
                    bank_number: this.ticketBankNum,
                    integral_status:this.exchangeType,
                    is_type:this.$route.query.is_type
                }
            }).then(res => {
                if (res.data.status == 1) {
                    this.loading = false;
                    this.orderBeforeDawnRoomToast = false;
                    if(getUrlParam("payType") == 1){
                        this.$router.push({
                            path: "prepayPage",
                            query: {
                                order_id: res.data.data.order_id,
                                payType:getUrlParam("payType")
                            }
                        });
                    }else{
                        this.$router.push({
                            path: "onlinePay",
                            query: {
                                order_id: res.data.data.order_id,
                                payType:getUrlParam("payType")
                            }
                        });
                    }

                } else {
                    this.loading = false;
                    this.orderBeforeDawnRoomToast = false;
                    this.orderDelayToastTxt = res.data.msg;
                    // "在您支付过程中，房被小伙伴抢光了";
                    this.orderDelayToast = true;
                    this.watchObj.room_sum = 1;
                    this.fetchOrderForm();
                    setTimeout(() => {
                        this.orderDelayToast = false;
                    }, 1500);
                }
            });
        },
        // 支付逻辑
        pay() {
            // 当今日可订限额已用完，禁止提交
            if (this.astrict == 0) {
                this.orderDelayToastTxt = "您今日可订限额已用完，请明天再来";
                this.orderDelayToast = true;
                setTimeout(() => {
                    this.orderDelayToast = false;
                }, 1500);
                return false;
            }else if(this.quantity == 0){
                this.orderDelayToastTxt = "当前房型已售完，您可以选择其它房型预订";
                this.orderDelayToast = true;
                setTimeout(() => {
                    this.orderDelayToast = false;
                }, 1500);
                return false;
            }

            if (this.orderNameBlur() && this.orderTelBlur() && this.invoiceRule()) {
                if (this.isBeforeDawnOrder == true) {
                    this.orderBeforeDawnRoomToast = true;
                } else {
                    if(this.payPassType){
                        this.fetchCreateOrder();
                    }else{
                        Toast('积分不足');
                    }
                }
            }
        }
    }
};
</script>
<style lang="less" scoped>
    @import "./Order";
    @import "./order_new";
</style>
