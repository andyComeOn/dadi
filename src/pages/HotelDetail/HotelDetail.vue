<template>
  	<div class="hotelDetailPage">
		<!-- loading str -->
		<div v-show="loading">
			<div class="weui-mask_transparent"></div>
			<div class="weui-toast">
				<i class="weui-loading weui-icon_toast"></i>
				<p class="weui-toast__content">数据加载中</p>
			</div>
		</div>
    	<!-- loading end -->
    	<!-- toast str -->
		<div v-show="delayToast">
			<div class="z-mask-transparent"></div>
			<div class="z-toast">
				<i class="z-toast-icon"></i>
				<p class="z-toast-content">{{delayToastTxt}}</p>
			</div>
		</div>
    	<!-- toast end -->
    	<div class="main">
      		<div class="banner-box" id="hotelDetailBanner" :style="{height: hotelDetailBannerH + 'px'}">
        		<swiper class="zb-swiper" :options="swiperOption" ref="mySwiper" @someSwiperEvent="swiperCallback(1)">
					<swiper-slide v-for="(item,index) in data_store.img_logo" :key="index" @click="swiperSlideFun(index)">
						<router-link :to="{path:'hotelDetailBannerLink',query:{store_id:watchObj.store_id}}" class="hotel-detail-banner-link">
							<img :src="item" alt style="display:block;width:100%;" />
						</router-link>
					</swiper-slide>
          			<div class="swiper-pagination" style="line-height:5px;bottom:5px;" slot="pagination"></div>
        		</swiper>
				<div class="z-swiper-intro" v-if="data_store.img_logo">
					<img src="../../assets/images/icon/ic-hotel-detail.png" />
					共{{data_store.img_logo.length}}张
				</div>
				<div class="collect" @click="collectCtrl">
					<img v-if="is_collect==1" :src="collectIconActive" />
					<img v-if="is_collect==0" :src="collectIcon" />
				</div>
      		</div>
      		<!-- 酒店位置说明 -->
			<div class="detail">
				<div class="locationMainInfo">
					<p class="storeName m-ellipsis">{{data_store.store_name}}</p>
					<p class="storeAddress m-ellipsis">{{data_store.address}}</p>
					<p class="storeAddrIntro m-ellipsis">{{data_store.introduce}}</p>
				</div>
				<div class="locationViceInfo">
					<div class="callWrap">
						<a :href="'tel:' + data_store.tel" class="callBtn">
							<img src="../../assets/images/icon/detail_telephone.png" class="callIcon" />
						</a>
					</div>
					<div class="mapWrap" @click="openMap">
						<span class="mapTxt">地图</span>
					</div>
				</div>
			</div>
			<!-- 酒店详情查看更多 -->
			<div class="detail-more-container">
				<div class="detail-more-wrapper">
					<div class="lf">
						<span class="all-hours">24小时前台</span>
						<span class="wifi">免费wifi</span>
					</div>
					<div class="rg">
						<router-link :to="{path: 'hotelLabel', query:{store_id: watchObj.store_id}}" tag="div">
						<span class="btn-more">更多</span>
						</router-link>
					</div>
				</div>
			</div>
			<!-- 疫情期间提示 -->
			<template v-if="this.epidemicShow == 1">
				<div class="epidemic_hint">
					<h3>温馨提示</h3>
					<p>即日起根据北京市最新政策规定，入住酒店不再要求提供核酸检测阴性证明，凭健康码即可办理入住。</p>
					<p>境外，湖北，牡丹江，哈尔滨，抚顺等高风险地域客人，依据门店属地接待相关政策执行!</p>
				</div>
			</template>
			<!-- 入离时间展示（全日房、日租房） -->
			<div class="checkInOutWrap">
				<div class="checkInOut">
					<div class="checkIn" @click="triggerCalendar">
						<span class="checkInHead" v-show="isRouteBeforeDawn">凌晨入住</span>
						<span class="checkInHead" v-show="!isRouteBeforeDawn">入住</span>
						<span>{{zbInitCalendar.start.mm}}月{{zbInitCalendar.start.dd}}日</span>
					</div>
					<span class="total">共{{count}}晚</span>
					<div class="checkOut" @click="triggerCalendar">
						<span class="checkInHead" v-show="isRouteBeforeDawnAndNoonGo">中午离店</span>
						<span class="checkInHead" v-show="!isRouteBeforeDawnAndNoonGo">离店</span>
						<span>{{zbInitCalendar.end.mm}}月{{zbInitCalendar.end.dd}}日</span>
					</div>
				</div>
			</div>
			<div class="coupon_hint" v-if="this.$route.query.is_type != 0">
				<p>您当前使用电子房券进行预订，需要提前一天。</p>
			</div>
			<!-- 日历组件dialog -->
			<mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="zbCalendarVisible">
				<Calendar ref="Calendar" :markDateMore="zbInitCalendar" @isToday="clickToday" @calendarTitleBackEmit="calendarTitleBackEmitFun"></Calendar>
			</mu-dialog>
      		<!-- 搜索到list -->
      		<div class="roomtype-list-wrapper">
        		<ul class="list">
					<li v-for="(item,index) in data_room" :key="index">
						<div class="roomTypeItem">
							<div class="lf" @click.stop="showToastMethod(item.id)">
								<img :src="item.room_img" />
							</div>
							<div class="md" @click.stop="showPayType(item.id,item.notHide)">
								<p class="name m-ellipsis">{{item.name}}</p>
								<div class="labels m-ellipsis" >{{item.area}} 、{{item.bed_type}}、{{item.window}} 、{{item.floor}}层</div>
								<span v-if="item.integral_status" class="exchange_hint">{{item.integral_status}}</span>
								<span v-if="item.marketing_type" class="exchange_hint">{{item.marketing_type}}</span>
							</div>
							<div class="rg" @click.stop="showPayType(item.id,item.notHide)">
								<div class="price-new">
									<span>&yen;</span>
									<span class="span1">{{item.discount_price}}</span>
									<span class="span2">起</span>
									<span class="priceSort">
										<img src="../../assets/images/price_sort.png" />
									</span>
								</div>
								<div class="price-old">门市价&yen;{{item.market_amount}}</div>
							</div>
						</div>
						<div class="roomTypeFullMask" :class="{ isRoomTypeFull : item.is == 2 ? true : false}">
							<div class="watermark isFull">
								<div class="circleSolid">
									<div class="circleDashed">
										<span>已订完</span>
									</div>
								</div>
							</div>
						</div>
            			<ul class="payType" v-show="item.notHide">
							<li class="payTypeItem clearflex" v-for="(itemInd,item_index) in item.product_info" :key="item_index">
								<!-- 预付现付判断  pay_type  0 1 2 -->
								<template v-if="itemInd.pay_type == 0 || itemInd.pay_type == 2">
									<template v-if="itemInd.is == 1">
										<div class="payTypeItemLf">
											<div class="up">{{itemInd.product_name}}</div>
											<div class="down">
												<span>{{itemInd.group_name}}专享价</span>
												<span class="down_exchange" v-if="itemInd.integral_status">{{itemInd.integral_status}}</span>
												<span class="down_exchange" v-if="itemInd.marketing_type">{{itemInd.marketing_type}}</span>
												<i v-if="itemInd.marketing_type">所需免房券*{{itemInd.marketing_num}}</i>
											</div>
										</div>
										<div class="payTypeItemRg">
											<dl class="priceDing">
												<dt><i>&yen;</i>{{itemInd.discount_price}}</dt>
												<dd>日均</dd>
											</dl>
											<span class="bookBtn" @click.stop="bookFun(itemInd.is, itemInd.store_id,item.id,itemInd.id, begin, finish, itemInd.distance_int, 2,itemInd.marketing_num,itemInd.marketing_num_all)">
												<span class="ding">订</span>
												<span class="onlinePay">在线付</span>
											</span>
										</div>
									</template>
									<template v-else>
										<div class="payTypeItemLf_ccc">
											<div class="up">{{itemInd.product_name}}</div>
											<div class="down">
												<span>{{itemInd.group_name}}专享价</span>
												<span class="down_exchange" v-if="itemInd.integral_status">{{itemInd.integral_status}}</span>
												<span class="down_exchange" v-if="itemInd.marketing_type">{{itemInd.marketing_type}}</span>
												<i v-if="itemInd.marketing_type">所需免房券*{{itemInd.marketing_num}}</i>
											</div>
										</div>
										<div class="payTypeItemRg_ccc">
											<dl class="priceDing">
												<dt><i>&yen;</i>{{itemInd.discount_price}}</dt>
												<dd>日均</dd>
											</dl>
											<span class="bookBtn">
												<span class="ding">订</span>
												<span class="onlinePay">在线付</span>
											</span>
										</div>
									</template>
								</template>
								<template v-if="itemInd.pay_type == 0 || itemInd.pay_type == 1">
									<template v-if="itemInd.is == 1">
										<div class="payTypeItemLf">
											<div class="up">{{itemInd.product_name}}</div>
											<div class="down">
												<span>{{itemInd.group_name}}专享价</span>
												<span class="down_exchange" v-if="itemInd.integral_status">{{itemInd.integral_status}}</span>
												<span class="down_exchange" v-if="itemInd.marketing_type">{{itemInd.marketing_type}}</span>
												<i v-if="itemInd.marketing_type">所需免房券*{{itemInd.marketing_num}}</i>
											</div>
										</div>
										<div class="payTypeItemRg">
											<dl class="priceDing">
												<dt><i>&yen;</i>{{itemInd.discount_price}}</dt>
												<dd>日均</dd>
											</dl>
											<span class="bookBtn" @click.stop="bookFun(itemInd.is, itemInd.store_id,item.id,itemInd.id, begin, finish, itemInd.distance_int, 1,itemInd.marketing_num,itemInd.marketing_num_all)">
												<span class="ding arriveDing">订</span>
												<span class="onlinePay arrivePay">到店付</span>
											</span>
										</div>
									</template>
									<template v-else>
										<div class="payTypeItemLf_ccc">
											<div class="up">{{itemInd.product_name}}</div>
											<div class="down">
												<span>{{itemInd.group_name}}专享价</span>
												<span class="down_exchange" v-if="itemInd.integral_status">{{itemInd.integral_status}}</span>
												<span class="down_exchange" v-if="itemInd.marketing_type">{{itemInd.marketing_type}}</span>
												<i v-if="itemInd.marketing_type">所需免房券*{{itemInd.marketing_num}}</i>
											</div>
										</div>
										<div class="payTypeItemRg_ccc">
											<dl class="priceDing">
												<dt><i>&yen;</i>{{itemInd.discount_price}}</dt>
												<dd>日均</dd>
											</dl>
											<span class="bookBtn">
												<span class="ding arriveDing">订</span>
												<span class="onlinePay arrivePay">到店付</span>
											</span>
										</div>
									</template>
								</template>

							</li>
              				<!-- <li v-if="item.pay_type == 0 || item.pay_type == 2" class="payTypeItem clearflex">
								<template>
									<div class="payTypeItemLf">
										<div class="up">预付价</div>
										<div class="down">
											<span>{{item.group_name}}专享价</span>
										</div>
									</div>
								</template>
								<div class="payTypeItemRg">
									<span class="priceDing">&yen;{{item.discount_price}}</span>
									<span class="bookBtn" @click.stop="bookFun(item.is, item.store_id,item.id, begin, finish, item.distance_int, 2)">
										<span class="ding">订</span>
										<span class="onlinePay">在线付</span>
									</span>
								</div>
             				</li>
              				<li v-if="item.pay_type == 0 || item.pay_type == 1" class="payTypeItem clearflex">
								<template>
									<div class="payTypeItemLf">
										<div class="up">现付价</div>
										<div class="down">
											<span>{{item.group_name}}专享价</span>
										</div>
									</div>
								</template>
								<div class="payTypeItemRg">
									<span class="priceDing">&yen;{{item.discount_price}}</span>
									<span class="bookBtn" @click.stop="bookFun(item.is, item.store_id,item.id, begin, finish, item.distance_int, 1)">
										<span class="ding arriveDing">订</span>
										<span class="onlinePay arrivePay">到店付</span>
									</span>
								</div>
              				</li> -->
            			</ul>
          			</li>
        		</ul>
      		</div>
			<!-- 每个item点击之后出现toast，展示其详情 -->
			<div class="item-toast-container">
        		<div class="item-toast" v-for="(item,index) in this.data_room" :key="index" v-show="item.isShow">
					<div class="item-toast-wrapper">
						<div class="item-toast-title">
							<div class="item-toast-title-wrapper">
								<div class="content">{{item.name}}</div>
								<div class="close-btn" @click="closeToast(item.id)">
									<img class="img" src="../../assets/images/icon/ic-close-toast.png" />
								</div>
							</div>
						</div>
						<div class="item-toast-banner" id="hotelDetailBanner" :style="{height: hotelDetailBannerH + 'px'}">
							<swiper class="zb-swiper" :options="swiperToastOption" ref="mySwiper" @someSwiperEvent="swiperToastCallback(1)">
								<swiper-slide v-for="(itemSon,indexSon) in item.img_all" :key="indexSon" @click="swiperToastSlideFun(indexSon)">
									<img :src="itemSon" alt style="display:block;width:100%;" />
								</swiper-slide>
								<div class="swiper-pagination" style="line-height:5px;bottom:5px;" slot="pagination"></div>
							</swiper>
						</div>
						<div class="item-toast-info">
							<div class="item-toast-tags">
								<div class="item-toast-tags-wrapper">
									<span class="tag">
										<span>面积&nbsp;&nbsp;</span>
										<span class="ftc333">{{item.area}}</span>
									</span>
									<span class="tag">
										楼层&nbsp;&nbsp;
										<span class="ftc333">{{item.floor}}</span>
									</span>
									<span class="tag">
										房型&nbsp;&nbsp;
										<span class="ftc333">{{item.name}}</span>
									</span>
									<span class="tag">
										无烟&nbsp;&nbsp;
										<span class="ftc333">{{item.cigarette}}</span>
									</span>
									<span class="tag">
										窗户&nbsp;&nbsp;
										<span class="ftc333">{{item.window}}</span>
									</span>
									<span class="tag">
										宽带&nbsp;&nbsp;
										<span class="ftc333">{{item.broadband}}</span>
									</span>
									<span class="tag">
										床型&nbsp;&nbsp;
										<span class="ftc333">{{item.bed_type}}</span>
									</span>
									<span class="tag">
										加床&nbsp;&nbsp;
										<span class="ftc333">{{item.bed}}</span>
									</span>
								</div>
							</div>
							<ul class="item-toast-labels">
								<li class="label-item">
									<div class="label-item-head">媒体科技</div>
									<div class="label-item-body">{{item.media}}</div>
								</li>
								<li class="label-item">
									<div class="label-item-head">食品饮品</div>
									<div class="label-item-body">{{item.food}}</div>
								</li>
								<li class="label-item">
									<div class="label-item-head">浴室</div>
									<div class="label-item-body">{{item.bathroom}}</div>
								</li>
								<li class="label-item">
									<div class="label-item-head">便利设施</div>
									<div class="label-item-body">{{item.facility}}</div>
								</li>
								<li class="label-item">
									<div class="label-item-head">床品</div>
									<div class="label-item-body">{{item.bed}}</div>
								</li>
								<li class="label-item">
									<div class="label-item-head">其它</div>
									<div class="label-item-body">{{item.other}}</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
  	</div>
</template>
<script>
import { store_detail, add_collect, del_collect, wxShare } from "@/api/api";
import { getCookie, fetchCheckLogin, getUrlParam } from "@/utils/util";
import { f, dateEndMinusStart, isBeforeDawn, YTDLf, YTD } from "@/utils/date";
import Calendar from "@/components/calendar/calendar.vue"; // 引入日历组件
import { swiper, swiperSlide } from "vue-awesome-swiper"; // 引入swipe组件
import wx from "weixin-js-sdk";
import { Toast } from 'vant';
export default {
	name: "hotelDetailPage",
	components: {
		Calendar,
		swiper,
		swiperSlide
	},
	data() {
		return {
			isType:"",
			epidemicArr:[10,274,277,281,290,292,293,295,296,9,265,266,267,269,272,273,275,276,285,2,4,3,5,6,7,1,11],
			epidemicShow:0,
			swiperOption: {	// 门店详情banner-swiper相关参数
				autoplay: 3000,
				speed: 1000, // 这个参数是一张轮播照片从左边播到右边用时1000毫秒
				loop: true,
				initialSlide: 1,
				notNextTick: true,
				preventClicks: true,
				direction: "horizontal",
				grabCursor: true,
				setWrapperSize: true,
				autoHeight: true,
				pagination: ".swiper-pagination",
				paginationType: "custom",
				paginationCustomRender: function(swiper, current, total) {
					const activeColor = "#30B097";
					const normalColor = "rgba(255,255,255,0.5)";
					let color = "";
					let paginationStyle = "";
					let html = "";
					for (let i = 1; i <= total; i++) {
						if (i === current) {
							color = activeColor;
						} else {
							color = normalColor;
						}
						paginationStyle = `background:${color};opacity:1;margin-right:4px;width:5px;height:5px;`;
						html += `<span class="swiper-pagination-bullet" style=${paginationStyle}></span>`;
					}
					return html;
				},
				paginationClickable: true,
				mousewheelControl: false,
				observeParents: true,
				debugger: true
			},
			// 房型toast中bannner-swiper的参数
			swiperToastOption: {
				notNextTick: true,
				autoplay: false,
				preventClicks: true,
				direction: "horizontal",
				grabCursor: true,
				setWrapperSize: true,
				autoHeight: true,
				pagination: ".swiper-pagination",
				paginationType: "custom",
				paginationCustomRender: function(swiper, current, total) {
					const activeColor = "#30B097";
					const normalColor = "rgba(255,255,255,0.5)";
					let color = "";
					let paginationStyle = "";
					let html = "";
					for (let i = 1; i <= total; i++) {
						if (i === current) {
						color = activeColor;
						} else {
						color = normalColor;
						}
						paginationStyle = `background:${color};opacity:1;margin-right:4px;width:5px;height:5px;`;
						html += `<span class="swiper-pagination-bullet" style=${paginationStyle}></span>`;
					}
					return html;
				},
				paginationClickable: true,
				mousewheelControl: false,
				observeParents: true,
				debugger: true
			},
			loading: true,
			delayToast: false,
			delayToastTxt: "",
			itemToast: false, //itemToast是否展示
			// 请求数据需要传的参数
			watchObj: {
				store_id: "",
				begin: "",
				finish: "",
				longitude: getCookie("userLongitude"),
				latitude: getCookie("userLatitude"),
				store_type: "1",
				is_type:this.$route.query.is_type
			},
			// 默认把这个设置为全日房
			store_type: "1",
			// 接收http请求返回的数据
			data_room: [],
			data_store: {},
			count: "", // 几晚
			begin: "",
			finish: "",
			is_collect: "", //该门店是否被收藏
			collectId: "", //收藏id
			collectIcon: require("../../assets/images/collect.png"),
			collectIconActive: require("../../assets/images/collect-active.png"),
			// 日历组件dialog是否显示
			zbCalendarVisible: false,
			// 初始化日历日期
			zbInitCalendar: {
				start: {
					yyyy: f(this.$route.query.begin).yyyy,
					mm: f(this.$route.query.begin).mm,
					dd: f(this.$route.query.begin).dd
				},
				end: {
					yyyy: f(this.$route.query.finish).yyyy,
					mm: f(this.$route.query.finish).mm,
					dd: f(this.$route.query.finish).dd
				},
				is_type:this.$route.query.is_type
			},
			// 日租房日历组件dialog是否显示
			zbSmallCalendarVisible: false,
			// 初始化日租房日历日期
			zbInitSmallCalendar: {
				start: {
				yyyy: "",
				mm: "",
				dd: ""
				}
			},
			appId: "", // 必填，公众号的唯一标识
			timestamp: "", // 必填，生成签名的时间戳
			nonceStr: "", // 必填，生成签名的随机串
			signature: "", // 必填，签名
			longitude: "", // 经度
			latitude: "", // 维度
			// longitude: getCookie("userLongitude"),
			// latitude: getCookie("userLatitude"),
			hotelDetailBannerH: "", //酒店详情banner的高
			itemToastArr: [],
			isBeforeDawn: false, // 是否是今天凌晨
			userStatus: "", // 该会员是否是处于禁用状态
			isRouteBeforeDawn: false, // 路由带过来今日凌晨入住
			isRouteBeforeDawnAndNoonGo: false, // 路由带过来今日中午离店
			flag: true
		};
  	},
	created() {
		// 获取路由参数
		var routePara = {
			store_id: this.$route.query.store_id,
			begin: this.$route.query.begin,
			finish: this.$route.query.finish,
			// 这个是多余的代码，压根路由就没有带过来该参数
			// distance_int: this.$route.query.distance_int,
			store_type: this.$route.query.store_type,
			is_type:this.$route.query.is_type
		};
		// 如果从订单列表页的“再次预定”按钮过来只带store_id参数，无begin、finish参数
		// 在3.27发现注册数据被清，点击预定，跳到/login，也会走这个判断（ios设置时间凌晨发现，isRouteBeforeDawn，isRouteBeforeDawnAndNoonGo都是false）
		if (routePara.begin == undefined || routePara.finish == undefined) {
			// 该情况就默认给赋值为全日房1
			this.store_type = 1;
			// new Date
			var d = new Date();
			var dd = new Date();
			if(this.$route.query.is_type != 0){
				d.setDate(d.getDate() + 1);
				dd.setDate(dd.getDate() + 2);
			}else{
				dd.setDate(dd.getDate() + 1);
			}
			if(f(d).yyyy == "2020" && f(d).mm == "04" && this.$route.query.is_type != 0){
				this.watchObj.begin = "2020-05-01";
				this.watchObj.finish = "2020-05-02";
				this.zbInitCalendar.start.yyyy = "2020";
				this.zbInitCalendar.start.mm = "05";
				this.zbInitCalendar.start.dd = "01";
				this.zbInitCalendar.end.yyyy = "2020";
				this.zbInitCalendar.end.mm = "05";
				this.zbInitCalendar.end.dd = "02";
			}else{
				this.watchObj.begin = f(d).yyyy + "-" + f(d).mm + "-" + f(d).dd;
				this.watchObj.finish = f(dd).yyyy + "-" + f(dd).mm + "-" + f(dd).dd;
				this.zbInitCalendar.start.yyyy = f(d).yyyy;
				this.zbInitCalendar.start.mm = f(d).mm;
				this.zbInitCalendar.start.dd = f(d).dd;
				this.zbInitCalendar.end.yyyy = f(dd).yyyy;
				this.zbInitCalendar.end.mm = f(dd).mm;
				this.zbInitCalendar.end.dd = f(dd).dd;
			}
			this.watchObj.store_id = routePara.store_id;

			// 满足该情况把routeIsBeforeDawnAndTodayGo设置为false
			this.isRouteBeforeDawn = false;
			this.isRouteBeforeDawnAndNoonGo = false;
		} else {
			// 给date()中监听数据进行赋值
			this.watchObj.store_id = routePara.store_id;
			this.watchObj.begin = routePara.begin;
			this.watchObj.finish = routePara.finish;
			this.watchObj.store_type = routePara.store_type;
			this.watchObj.is_type = routePara.is_type;
			// 初始化日历中的值
			let beginArr = routePara.begin.split("-");
			let endArr = routePara.finish.split("-");
			// 判断是全日房还是日租房，用来显示2种日历
			if (routePara.store_type == 1) {
				// 全日房日历的显示
				this.store_type = 1;
				// 对全日房的日历进行复显
				this.zbInitCalendar.start.yyyy = beginArr[0];
				this.zbInitCalendar.start.mm = beginArr[1];
				this.zbInitCalendar.start.dd = beginArr[2];
				this.zbInitCalendar.end.yyyy = endArr[0];
				this.zbInitCalendar.end.mm = endArr[1];
				this.zbInitCalendar.end.dd = endArr[2];
				// 若路由传过来的是今天凌晨订房，今天中午退房
				if (routePara.begin == YTDLf().kebab) {
				this.isRouteBeforeDawn = true;
				} else {
				this.isRouteBeforeDawn = false;
				}
				if (routePara.finish == YTD().kebab) {
				this.isRouteBeforeDawnAndNoonGo = true;
				} else {
				this.isRouteBeforeDawnAndNoonGo = false;
				}
			} else {
				// 日租房日历的显示
				this.store_type = 2;
				// 初始化日租房日历日期赋值
				this.zbInitSmallCalendar.start.yyyy = beginArr[0];
				this.zbInitSmallCalendar.start.mm = beginArr[1];
				this.zbInitSmallCalendar.start.dd = beginArr[2];
			}
		}
		// 凌晨订房提示逻辑
		if (isBeforeDawn() == true) {
			this.isBeforeDawn = true;
		} else {
			this.isBeforeDawn = false;
		}
	},
	computed: {
		swiper() {
			return this.$refs.mySwiper.swiper;
		}
	},
	watch: {
		watchObj: {
			handler(newValue, oldValue) {
				this.fetchData(newValue);
			},
			deep: true,
			immediate: true
		}
	},
	mounted() {
		// let beginTime = f(this.$route.query.begin).yyyy + '-' + f(this.$route.query.begin).mm + '-' + f(this.$route.query.begin).dd;
		// let finishTime = f(this.$route.query.finish).yyyy + '-' + f(this.$route.query.finish).mm + '-' + f(this.$route.query.finish).dd;
		// this.watchObj.begin = beginTime;
		// this.watchObj.finish = finishTime;
		// 调取banner赋值函数
		this.setBannerSize();
	},
	methods: {
		// 拉取门店详情
		fetchData(param) {
			if (this.flag == true) {
				this.flag = false;
				this.$http({
					method: "POST",
					url: store_detail,
					data: param
				}).then(res => {
					this.flag = true;
					this.loading = false;
					if (res.data.status == 1) {
						//疫情判断 [276,281,11]  //西单  和平里  崇文门 龙潭湖  十里河 望京
						if(this.epidemicArr.indexOf(res.data.data.data_store.id) != -1){
							this.epidemicShow = 1
						}
						// 房间类型list
						let _data_room = res.data.data.data_room;
						for (let i = 0; i < _data_room.length; i++) {
							if(i == 0){
								this.$set(_data_room[i], "notHide", true);
								this.$set(_data_room[i], "isShow", false);
							}else{
								this.$set(_data_room[i], "notHide", false);
								this.$set(_data_room[i], "isShow", false);
							}
						}
						this.data_room = _data_room;
						// 房间介绍
						this.data_store = res.data.data.data_store;
						// 该门店经纬度赋值
						this.longitude = this.data_store.longitude;
						this.latitude = this.data_store.latitude;
						// 入店、离店、共几晚
						this.begin = res.data.data.begin;
						this.finish = res.data.data.finish;
						this.count = res.data.data.count;
						// 是否收藏
						this.is_collect = res.data.data.is_collect;
						// 收藏的id
						this.collectId = res.data.data.collect_id;
						// 该会员是否是处于禁用状态
						this.userStatus = res.data.data.user_status;
						// 调取getAppInfo
						this.getAppInfo();
					} else if (res.data.status == -1) {
						this.data_store = "";
						this.fetchCheckLoginPackage();
					} else {
						this.data_store = "";
					}
				});
			}
		},
		fetchCheckLoginPackage() {
			fetchCheckLogin({
				tg: "",
				form: encodeURIComponent(window.location.href)
			}).then(res => {
				if (res.data.status == 0) {
					window.location.href = res.data.data;
				} else {
					setCookie("userInfoTel", res.data.data.mobile); //手机号
					setCookie("userVipStatus", res.data.data.status); //会员状态（0待审、1正常、2锁定）
					setCookie("userUid", res.data.data.uid);
					setCookie("userInfoIsRealname", res.data.data.is_realname); //真实姓名
					setCookie("userInfoGroupid", res.data.data.group_id); //会员组id
					setCookie("nickname", encodeURI(res.data.data.nickname)); //昵称
					setCookie("openid", res.data.data.openid);
					setCookie("avatar", res.data.data.avatar); //avatar
					setCookie("avail_amount", res.data.data.avail_amount);
					if (res.data.data.coupon_flag == 0) {
						setCookie("isYouzan", 0); // 判断是不是有赞用户 1是(弹系统维护提示) 0不是（不弹）
					} else {
						setCookie("isYouzan", 1); // 判断是不是有赞用户 1是(弹系统维护提示) 0不是（不弹）
					}
				}
			});
		},
		// 点击预定
		bookFun(isHasRoom,store_id,room_id,product_id,begin,finish,distance_int,payTypePara,marketingNum,marketingNumAll){
			if(marketingNum > marketingNumAll){
				Toast("您拥有的优惠券不足以支付");
				return false;
			}
			let tmp = getCookie("userInfoTel");
			let tmpVipStatus = this.userStatus;
			let tmpOpenid = getCookie("openid");
			// 判断该用户否有有手机号
			if (!tmp) {
				this.$router.push({
					path: "/login",
					query: {
						loginPage: 1,
						openId: tmpOpenid,
						store_id: store_id
					}
				});
				return;
			}
			// 判断用户的会员是否为1
			if (tmpVipStatus != 1) {
				this.delayToastTxt = "正处于禁用状态，不可预订";
				this.delayToast = true;
				setTimeout(() => {
					this.delayToast = false;
				}, 2000);
				return;
			}
			if (isHasRoom == 1) {
				this.$router.push({
					path: "/order",
					query: {
						store_id: store_id,
						store_type: this.store_type,
						payType: payTypePara,
						room_id: room_id,
						product_id:product_id,
						begin: begin,
						finish: finish,
						distance_int: distance_int,
						epidemicShow:this.epidemicShow,
						is_type:this.$route.query.is_type
					}
				});
			} else {
				this.delayToastTxt = "该房型已满房";
				this.delayToast = true;
				setTimeout(() => {
					this.delayToast = false;
				}, 2000);
			}
		},
		// 展示或隐藏现付与预付info提示
		showPayType(ind, notHide) {
			let _this = this;
			for (let i = 0; i < _this.data_room.length; i++) {
				if (_this.data_room[i].id === ind) {
					if (_this.data_room[i].notHide) {
						_this.$set(_this.data_room[i],"notHide",false);
					} else {
						_this.$set(_this.data_room[i],"notHide",true);
					}
				}
			}
		},
		// 触发日历dialog
		triggerCalendar() {
			this.zbCalendarVisible = true;
		},
		// 入住-离店
		clickToday(value) {
			this.zbCalendarVisible = false;
			// 入住时间
			let tmpB = value[0].split("/");
			this.zbInitCalendar.start.yyyy = tmpB[0];
			this.zbInitCalendar.start.mm = tmpB[1];
			this.zbInitCalendar.start.dd = tmpB[2];
			this.watchObj.begin = tmpB[0] + "-" + tmpB[1] + "-" + tmpB[2];
			// 加入今日凌晨入住判断逻辑
			if (tmpB[0] + "-" + tmpB[1] + "-" + tmpB[2] == YTDLf().kebab) {
				this.isRouteBeforeDawn = true;
			} else {
				this.isRouteBeforeDawn = false;
			}
			// 离店时间
			let tmpF = value[1].split("/");
			this.zbInitCalendar.end.yyyy = tmpF[0];
			this.zbInitCalendar.end.mm = tmpF[1];
			this.zbInitCalendar.end.dd = tmpF[2];
			this.watchObj.finish = tmpF[0] + "-" + tmpF[1] + "-" + tmpF[2];
			// 加入今日中午离店判断逻辑
			if (tmpF[0] + "-" + tmpF[1] + "-" + tmpF[2] == YTD().kebab) {
				this.isRouteBeforeDawnAndNoonGo = true;
			} else {
				this.isRouteBeforeDawnAndNoonGo = false;
			}
			//共几晚
			this.count = dateEndMinusStart(value[0], value[1]);
		},
		// 日历组件的title-若用户不选取日历，点击返回使日历弹窗消失
		calendarTitleBackEmitFun() {
			this.zbCalendarVisible = false;
		},

		// 触发日租房日历dialog显示
		triggerSmallCalendar() {
		this.zbSmallCalendarVisible = true;
		},
		// 日租房的“入住-离店”
		clickSmallToday(value) {
		this.zbSmallCalendarVisible = false;
		// 入住时间
		let tmpStart = value[0].split("/");
		this.zbInitSmallCalendar.start.yyyy = tmpStart[0];
		this.zbInitSmallCalendar.start.mm = tmpStart[1];
		this.zbInitSmallCalendar.start.dd = tmpStart[2];
		// 日租房也要重新拉取最新数据
		this.watchObj.begin = tmpStart[0] + "-" + tmpStart[1] + "-" + tmpStart[2];
		this.watchObj.finish =
			tmpStart[0] + "-" + tmpStart[1] + "-" + tmpStart[2];
		},
		// 日租房日历组件的title-若用户不选取日历，点击返回使日历弹窗消失
		smallCalendarTitleBackEmitFun() {
		this.zbSmallCalendarVisible = false;
		},
		// swiper回调
		swiperCallback(val) {
		console.log(val);
		},
		// swiper的toast回调
		swiperToastCallback(val) {
		console.log(val);
		},
		// swiper-slide的点击
		swiperSlideFun(val) {
		console.log(val);
		},
		// swiper-slide的toast点击
		swiperToastSlideFun(val) {
		console.log(val);
		},
		// 点击收藏按钮逻辑
		collectCtrl() {
			if (this.is_collect == 0) {
				this.addCollect();
			} else {
				this.delCollect();
			}
		},
		addCollect() {
			let p = {
				store_id: this.watchObj.store_id
			};
			this.$http({
				method: "POST",
				url: add_collect,
				data: p
			}).then(res => {
				if (res.data.status == 1) {
					this.delayToastTxt = "已收藏";
					this.delayToast = true;
					setTimeout(() => {
						this.delayToast = false;
					}, 2000);
					this.fetchData(this.watchObj);
				}
			});
		},
		delCollect() {
			this.$http({
				method: "POST",
				url: del_collect,
				data: { collect_id: this.collectId }
			}).then(res => {
				if (res.data.status == 1) {
					this.delayToastTxt = "已取消";
					this.delayToast = true;
					setTimeout(() => {
						this.delayToast = false;
					}, 2000);
					this.fetchData(this.watchObj);
				}
			});
		},
		// 拉取公众号info进行wx.config
		getAppInfo() {
			var dataObj = {
				url: location.href.split("#")[0]
			};
			this.$http({
				url: wxShare,
				method: "POST",
				data: dataObj
			}).then(res => {
				let appId = res.data.data.appid;
				let timestamp = res.data.data.timestamp;
				let nonceStr = res.data.data.noncestr;
				let signature = res.data.data.signature;
				let tmpUrl = res.data.data.url;
				let tmpShareImg = res.data.data.share_img;
				this.wxConfigMethod(
					appId,
					timestamp,
					nonceStr,
					signature,
					tmpUrl,
					tmpShareImg
				);
			});
		},
		// wx.config
		wxConfigMethod(appId, timestamp, nonceStr, signature, tmpUrl, tmpShareImg) {
			wx.config({
				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: appId, // 必填，公众号的唯一标识
				timestamp: timestamp, // 必填，生成签名的时间戳
				nonceStr: nonceStr, // 必填，生成签名的随机串
				signature: signature, // 必填，签名
				jsApiList: [
				"onMenuShareAppMessage",
				"onMenuShareTimeline",
				"openLocation"
				] // 必填，需要使用的JS接口列表
			});
			wx.onMenuShareAppMessage({
				title: "秋果人文精品酒店",
				desc: "拿奖金，拿奖金，拿奖金，点开拿奖金",
				link: tmpUrl,
				imgUrl: tmpShareImg,
				type: "",
				dataUrl: "",
				success: function() {}
			});
			wx.onMenuShareTimeline({
				title: "秋果人文精品酒店",
				desc: "拿奖金，拿奖金，拿奖金，点开拿奖金",
				link: tmpUrl,
				imgUrl: tmpShareImg,
				type: "",
				dataUrl: "",
				success: function() {}
			});
		},
		// 打开wx的map
		openMap() {
			wx.openLocation({
				longitude: Number(this.longitude), //经度，浮点数，范围为180 ~ -180。
				latitude: Number(this.latitude), // 纬度，浮点数，范围为90 ~ -90
				name: this.data_store.store_name, // 位置名
				address: this.data_store.address, // 地址详情说明
				scale: 18, // 地图缩放级别,整形值,范围从1~28。默认为最大
				infoUrl: "", // 在查看位置界面底部显示的超链接,可点击跳转
				success: function(res) {

				},
				fail: function(res) {

				}
			});
		},
		// banner重置宽高
		setBannerSize() {
			let hotelDetailBanner = document.querySelector("#hotelDetailBanner");
			let hotelDetailBannerW = hotelDetailBanner.clientWidth;
			let hotelDetailBannerH = (hotelDetailBannerW * 320) / 750;
			this.hotelDetailBannerH = hotelDetailBannerH;
		},
		// 点击每个房型item，弹出toast详情页
		showToastMethod(id) {
			let _self = this;
			for (let i = 0; i < _self.data_room.length; i++) {
				_self.$set(_self.data_room[i], "isShow", false);
				if (_self.data_room[i].id === id) {
				_self.$set(_self.data_room[i], "isShow", true);
				}
			}
		},
		closeToast(id) {
			let _self = this;
			for (let i = 0; i < _self.data_room.length; i++) {
				_self.$set(_self.data_room[i], "isShow", false);
			}
		}
	}
};
</script>

<style lang="less" scoped>
@import "./HotelDetail";
</style>
