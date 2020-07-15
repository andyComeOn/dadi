<template>
    <div>
        <!-- 卖房券页面 -->
        <div v-if="this.pastDue == 1">
            <!--  -->
            <div class="swiper_box">
                <a href="https://marketing.ddyg.cn/html/know_true_go.html">
                    <img class="swiper_box_img" src="../../../assets/images/active/staff_index/banner01.jpg" />
                </a>
                <!-- <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                    <van-swipe-item class="my-swipe-item">
                        <a href="https://marketing.ddyg.cn/html/know_true_go.html">
                            <img src="../../../assets/images/active/staff_index/banner01.jpg" />
                        </a>
                    </van-swipe-item>
                    <van-swipe-item class="my-swipe-item">
                        <a href="https://marketing.ddyg.cn/html/store_layout.html">
                            <img src="../../../assets/images/active/staff_index/banner02.jpg" />
                        </a>
                    </van-swipe-item>
                    <van-swipe-item class="my-swipe-item">
                        <a href="https://marketing.ddyg.cn/html/qg_guanhuai.html">
                            <img src="../../../assets/images/active/staff_index/banner03.jpg" />
                        </a>
                    </van-swipe-item>
                    <van-swipe-item class="my-swipe-item">
                        <img src="../../../assets/images/active/staff_index/banner04.jpg" />
                    </van-swipe-item>
                    <van-swipe-item class="my-swipe-item">
                        <img src="../../../assets/images/active/staff_index/banner05.jpg" />
                    </van-swipe-item>
                </van-swipe> -->
                
                <div class="ticket_box">
                    <ul class="ticket">
                        <li v-for="item in giftBagArr">
                            <dl>
                                <dt>{{item.name}}</dt>
                                <dd>含{{item.num}}张房劵</dd>
                            </dl>
                            <div class='ticket_num'>
                                <span>&yen;{{item.amount}}</span>
                                <span class='minusBtn' @click="minusBtn(item.id)">-</span>
                                <span>{{item.staff_num}}</span>
                                <span class='pluSignBtn' @click="pluSignBtn(item.id)">+</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- <div class="phone_box">
                <input class="phone_num" type="text" placeholder="请输入手机号..." />
                <div class="code_num">
                    <input class="code_val" type="text" placeholder="请输入验证码...">
                    <div class="code_btn" @click="getCodeBtn">获取验证码</div>
                    <div class="code_btn_ccc dis_n"></div>
                </div>
            </div> -->

            <div class="headline_explain">
                <template v-if="this.hintType == 3">
                    <h3>房券说明：</h3>
                    <p>1.本活动中所有房券为电子兑换券，使用时需要在“秋果微信官方服务”的页面中进行预订及核销；</p>
                    <p>2.本活动中每一张房券可兑换非北京、上海、深圳地区的秋果酒店基础房型住宿一晚；每二张房券可兑换北京、上海、深圳地区秋果酒店基础房型住宿一晚；</p>
                    <p>3.本活动所有房券兑换房间均不含早餐，如有需要请在秋果酒店各门店进行购买；</p>
                    <p>4.本活动所有房券有效期为2020年5月1日至2020年12月31日，购买后不支持退款；</p>
                    <p>5.本活动所有房券使用时须提前一天预订秋果酒店房间；</p>
                    <p>6.秋果酒店所有电子房券预订时，需要视门店当时房量情况，如遇房型满房请选择其他门店进行预订，亦可拨打秋果官方客服电话<a href="tel:4000999682">4000-999-682</a>寻求帮助，如需房型调换须进行加价升级，具体以秋果酒店各门店收费政策为准；</p>
                    <p>7.所有秋果酒店房券不能兑换现金，不设找零；</p>
                    <p>8.使用秋果酒店房券预订成功后，除因自然灾害、疫情等意外情况影响秋果酒店部分门店未能开业并无法预订外，电子房券过期后将不予预订及兑换并不予退款，如需取消、修改订单，房券不予返还；</p>
                    <p>9.如遇因新冠肺炎疫情导致秋果酒店不能开业的门店，请于预订时选择其他门店进行操作，如遇已经预订的秋果酒店因新冠肺炎疫情政策调控导致临时停业，请拨打秋果官方客服电话<a href="tel:4000999682">4000-999-682</a>寻求帮助，秋果酒店将竭诚为顾客办理退款或协调手续；</p>
                    <p>10.秋果酒店所有房券不能与其他优惠一同使用，不享受秋果会员政策；</p>
                    <p>11.秋果酒店房券价格均已包含税费及服务费，请于秋果酒店前台开具发票；</p>
                    <p>12.秋果酒店所有电子房券获得后不得出售他人，不得将电子房券放置于第三方售卖平台进行交易。</p>
                </template>
                <template v-else-if="this.hintType == 4">
                    <h3>房券说明：</h3>
                    <p>1.本活动中所有房券为电子兑换券，使用时需要在“秋果微信官方服务”的页面中进行预订及核销；</p>
                    <p>2.本活动中每一张房券可兑换非北京、上海、深圳地区的秋果酒店基础房型住宿一晚；每二张房券可兑换北京、上海、深圳地区秋果酒店基础房型住宿一晚；</p>
                    <p>3.本活动所有房券兑换房间均不含早餐，如有需要请在秋果酒店各门店进行购买；</p>
                    <p>4.本活动所有房券有效期为2020年5月1日至2021年4月30日，购买后不支持退款；</p>
                    <p>5.本活动所有房券使用时须提前一天预订秋果酒店房间；</p>
                    <p>6.秋果酒店所有电子房券预订时，需要视门店当时房量情况，如遇房型满房请选择其他门店进行预订，亦可拨打秋果官方客服电话<a href="tel:4000999682">4000-999-682</a>寻求帮助，如需房型调换须进行加价升级，具体以秋果酒店各门店收费政策为准；</p>
                    <p>7.所有秋果酒店房券不能兑换现金，不设找零；</p>
                    <p>8.使用秋果酒店房券预订成功后，除因自然灾害、疫情等意外情况影响秋果酒店部分门店未能开业并无法预订外，电子房券过期后将不予预订及兑换并不予退款，如需取消、修改订单，房券不予返还；</p>
                    <p>9.如遇因新冠肺炎疫情导致秋果酒店不能开业的门店，请于预订时选择其他门店进行操作，如遇已经预订的秋果酒店因新冠肺炎疫情政策调控导致临时停业，请拨打秋果官方客服电话<a href="tel:4000999682">4000-999-682</a>寻求帮助，秋果酒店将竭诚为顾客办理退款或协调手续；</p>
                    <p>10.秋果酒店所有房券不能与其他优惠一同使用，不享受秋果会员政策；</p>
                    <p>11.秋果酒店房券价格均已包含税费及服务费，请于秋果酒店前台开具发票；</p>
                    <p>12.秋果酒店所有电子房券获得后不得出售他人，不得将电子房券放置于第三方售卖平台进行交易。</p>
                </template>
                <template v-else-if="this.hintType == 5">
                    <h3>房券说明：</h3>
                    <p>1.本活动中所有房券为电子兑换券，使用时需要在“秋果微信官方服务”的页面中进行预订及核销；</p>
                    <p>2.本活动中每一张房券可兑换非北京、上海、深圳地区的秋果酒店基础房型住宿一晚；每二张房券可兑换北京、上海、深圳地区秋果酒店基础房型住宿一晚；</p>
                    <p>3.本活动所有房券兑换房间均不含早餐，如有需要请在秋果酒店各门店进行购买；</p>
                    <p>4.本活动所有房券有效期为2020年5月1日至2022年4月30日，过期后自动退款；</p>
                    <p>5.本活动所有房券使用时须提前一天预订秋果酒店房间；</p>
                    <p>6.秋果酒店所有电子房券预订时，需要视门店当时房量情况，如遇房型满房请选择其他门店进行预订，亦可拨打秋果官方客服电话<a href="tel:4000999682">4000-999-682</a>寻求帮助，如需房型调换须进行加价升级，具体以秋果酒店各门店收费政策为准；</p>
                    <p>7.所有秋果酒店房券不能兑换现金，不设找零；</p>
                    <p>8.使用秋果酒店房券预订成功后，除因自然灾害、疫情等意外情况影响秋果酒店部分门店未能开业并无法预订外，如需取消、修改订单，房券不予返还；</p>
                    <p>9.如遇因新冠肺炎疫情导致秋果酒店不能开业的门店，请于预订时选择其他门店进行操作，如遇已经预订的秋果酒店因新冠肺炎疫情政策调控导致临时停业，请拨打秋果官方客服电话<a href="tel:4000999682">4000-999-682</a>寻求帮助，秋果酒店将竭诚为顾客服务；</p>
                    <p>10.秋果酒店所有房券不能与其他优惠一同使用，不享受秋果会员政策；</p>
                    <p>11.秋果酒店房券价格均已包含税费及服务费，请于秋果酒店前台开具发票；</p>
                    <p>12.秋果酒店所有电子房券获得后不得出售他人，不得将电子房券放置于第三方售卖平台进行交易。</p>
                </template>
                <template v-else-if="this.hintType == 6">
                    <h3>房券说明：</h3>
                    <p>1.本活动中所有房券为电子兑换券，使用时需要在“秋果微信官方服务”的页面中进行预订及核销，请在底部菜单点击“会员中心”进入“我的会员”，并在“我的优惠券”中查看所购买的房券；</p>
                    <p>2.本活动中每一张房券可兑换非北京、上海、深圳地区的秋果酒店基础房型住宿一晚；每二张房券可兑换北京、上海、深圳地区秋果酒店基础房型住宿一晚；</p>
                    <p>3.本活动所有房券兑换房间均不含早餐，如有需要请在秋果酒店各门店进行购买；</p>
                    <p>4.本活动所有房券有效期为2020年5月1日至2022年4月30日，与秋果酒店的协议公司发票可于2020年5月1日后统一开具，开具发票后所有房券订单将不得单独在秋果各门店开具发票，2022年4月30日之后未能使用的房券可申请补税退款，秋果酒店房券价格均已包含税费及服务费；</p>
                    <p>5.本活动所有房券使用时须提前一天预订秋果酒店房间；</p>
                    <p>6.秋果酒店所有电子房券预订时，需要视门店当时房量情况，如遇房型满房请选择其他门店进行预订，亦可拨打秋果官方客服电话<a href="tel:4000999682">4000-999-682</a>寻求帮助，如需房型调换须进行加价升级，具体以秋果酒店各门店收费政策为准；</p>
                    <p>7.所有秋果酒店房券不能兑换现金，不设找零；</p>
                    <p>8.使用秋果酒店房券预订成功后，除因自然灾害、疫情等意外情况影响秋果酒店部分门店未能开业并无法预订外，如需取消、修改订单，房券不予返还；</p>
                    <p>9.如遇因新冠肺炎疫情导致秋果酒店不能开业的门店，请于预订时选择其他门店进行操作，如遇已经预订的秋果酒店因新冠肺炎疫情政策调控导致临时停业，请拨打秋果官方客服电话<a href="tel:4000999682">4000-999-682</a>寻求帮助，秋果酒店将竭诚为顾客服务；</p>
                    <p>10.秋果酒店所有房券不能与其他优惠一同使用，不享受秋果会员政策；</p>
                    <p>11.秋果酒店所有电子房券获得后不得出售他人，不得将电子房券放置于第三方售卖平台进行交易。</p>
                </template>
                <template v-else>
                    <h3>房券说明：</h3>
                    <p>1.本活动中所有房券为电子兑换券，使用时需要在“秋果微信官方服务”的页面中进行预订及核销；</p>
                    <p>2.本活动中每一张房券可兑换非北京、上海、深圳地区的秋果酒店基础房型住宿一晚；每二张房券可兑换北京、上海、深圳地区秋果酒店基础房型住宿一晚；</p>
                    <p>3.本活动所有房券兑换房间均不含早餐，如有需要请在秋果酒店各门店进行购买；</p>
                    <p>4.本活动所有房券有效期为2020年5月1日至2022年4月30日，过期后自动退款；</p>
                    <p>5.本活动所有房券使用时须提前一天预订秋果酒店房间；</p>
                    <p>6.秋果酒店所有电子房券预订时，需要视门店当时房量情况，如遇房型满房请选择其他门店进行预订，亦可拨打秋果官方客服电话<a href="tel:4000999682">4000-999-682</a>寻求帮助，如需房型调换须进行加价升级，具体以秋果酒店各门店收费政策为准；</p>
                    <p>7.所有秋果酒店房券不能兑换现金，不设找零；</p>
                    <p>8.使用秋果酒店房券预订成功后，除因自然灾害、疫情等意外情况影响秋果酒店部分门店未能开业并无法预订外，如需取消、修改订单，房券不予返还；</p>
                    <p>9.如遇因新冠肺炎疫情导致秋果酒店不能开业的门店，请于预订时选择其他门店进行操作，如遇已经预订的秋果酒店因新冠肺炎疫情政策调控导致临时停业，请拨打秋果官方客服电话<a href="tel:4000999682">4000-999-682</a>寻求帮助，秋果酒店将竭诚为顾客服务；</p>
                    <p>10.秋果酒店所有房券不能与其他优惠一同使用，不享受秋果会员政策；</p>
                    <p>11.秋果酒店房券价格均已包含税费及服务费，请于秋果酒店前台开具发票；</p>
                    <p>12.秋果酒店所有电子房券获得后不得出售他人，不得将电子房券放置于第三方售卖平台进行交易。</p>
                </template>
            </div>

            <div class="footer_btn" @click="reserveBtn()">立即预订</div>

            <!-- toast(loading=>weui) -->
            <div v-show="loading">
                <div class="weui-mask_transparent"></div>
                <div class="weui-toast">
                    <i class="weui-loading weui-icon_toast"></i>
                    <p class="weui-toast__content">{{loadingTxt}}</p>
                </div>
            </div>
        </div>

        <div v-else-if="this.pastDue == 0">
            <img class="past_due_img" src="../../../assets/images/active/staff_index/past_due_img.png" />
            <p class="past_due_hint">活动已过期</p>
            <div class="past_due_btn_box">
                <router-link :to="{path:'/'}">
                    <div class="past_due_btn">返回首页</div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import { staffIndexApi,createOrderApi } from '../../../api/active.js';
    import { Toast } from 'vant';
    export default {
        data(){
            return {
                pastDue:"",
                giftBagArr:[],
                loading:false,
                loadingTxt:"数据加载中",
                infoArr:[],
                hintType:this.$route.query.type
            }
        },
        methods: {
            reserveBtn(){
                for(let i=0;i<this.giftBagArr.length;i++){
                    if(this.giftBagArr[i].staff_num != 0){
                        let obj = {};
                        obj.gift_id = this.giftBagArr[i].id;
                        obj.num = this.giftBagArr[i].staff_num;
                        this.infoArr.push(obj);
                    }
                }
                if(this.infoArr.length != 0){
                    this.loading = true;
                    this.$http({
                        url: createOrderApi,
                        method: 'POST',
                        data:{
                            employee_id:this.$route.query.employee_id,
                            info:this.infoArr,
                            type:!this.$route.query.type ? 2 : this.$route.query.type
                        }
                    }).then(res => {
                        this.loading = false;
                        if(res.data.status == 1){
                            let _order_id = res.data.data;
                            this.$router.push({path:'/payStaff',query:{order_id:_order_id}})
                        }else{
                            Toast(res.data.msg);
                        }
                    });
                }else{
                    Toast('请选择礼包');
                }
            },
            minusBtn(_id){
                for(let i = 0;i<this.giftBagArr.length;i++){
                    if(this.giftBagArr[i].id == _id){
                        if(this.giftBagArr[i].staff_num == 0){
                            Toast('最小值为0');
                            return false;
                        }else{
                            this.giftBagArr[i].staff_num --
                        }
                    }
                }
            },
            pluSignBtn(_id){
                for(let i = 0;i<this.giftBagArr.length;i++){
                    if(this.giftBagArr[i].id == _id){
                        this.giftBagArr[i].staff_num ++
                    }
                }
            }
        },
        mounted() {
            this.loading = true;
            this.$http({
                url: staffIndexApi,
                method: "POST",
                data: {
                    type:this.$route.query.type
                }
            }).then(res => {
                this.loading = false;
                if(res.data.status == 1){
                    let _giftBagArr = res.data.data.list;
                    this.pastDue = res.data.data.show_status;
                    for(let i=0;i<_giftBagArr.length;i++){
                        _giftBagArr[i].staff_num = 0;
                    }
                    this.giftBagArr = _giftBagArr;
                }else{
                    Toast(res.data.msg);
                }
            });
        },
    }
</script>

<style lang="less" scoped>
    @import './staff_index.less';
    .van-swipe__indicators{
        bottom: 120px!important;
    }
</style>
