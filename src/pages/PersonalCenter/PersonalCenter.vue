<template>
	<div class="center_bd">
		<!-- toas提示(loading) -->
		<div class="toast" v-show="loading">
			<div class="weui-mask_transparent"></div>
			<div class="weui-toast">
				<i class="weui-loading weui-icon_toast"></i>
				<p class="weui-toast__content">{{loadingTxt}}</p>
			</div>
		</div>
		<!-- 主内容 -->
		<ul class="center_lists">
			<li class="center_head">
				<span>头像</span>
				<img v-if="imgUrl != ''" :src="imgUrl" />
				<img v-else src="../../assets/images/default_avatar.png" />
			</li>
			<li>
				<span>账号</span>
				<span class='nickName'>{{username}}</span>
			</li>
			<li>
				<span>昵称</span>
				<span class='nickName'>{{nickname}}</span>
			</li>
			<li id="datePicker pr" class="center_li" @click='birthdayWin'>
				<span>生日</span>
				<span class="center_date">{{birthdayNum}}</span>
				<img class="pa" src="../../assets/images/arrows/list－更多icon@1x.png" />
			</li>
			<li id="sexPrice" class="center_li" @click="sexChoose">
				<span>性别</span>
				<span v-if="this.sex == 1" class="center_date">男</span>
				<span v-if="this.sex == 2" class="center_date">女</span>
				<img class="pa" src="../../assets/images/arrows/list－更多icon@1x.png" />
			</li>
            <li>
				<span>房晚</span>
				<span class='nickName'>{{roomSum}}</span>
			</li>
			<li>
				<span>会员等级</span>
				<span class='nickName'>{{gradeName}} </span>
			</li>
			<li class="border0 center_li" @click="oldMobile">
				<span>手机号</span>
				<span class="center_date">{{mobile}}</span>
				<img class="pa" src="../../assets/images/arrows/list－更多icon@1x.png" />
			</li>
		</ul>
		<!-- hint str -->
		<span class="hint_box" v-if='hint_box_show == true'>{{hint_box_content}}</span>
		<!-- hint end -->
	</div>
</template>
<script>
import weui from "weui.js";
import { userInfo, baseUrl, update_user } from "../../api/api.js";
export default {
    name: "personalCenter",
    components: {},
    data() {
        return {
            loading: true,
            loadingTxt: "数据加载中",
            birthdayNum: "", //生日
            imgUrl: "", //头像
            username: "", //账号
            nickname: "", //昵称
            sex: "", //性别   1
            card: "", // 什么类型的卡
            gradeName: "", // 卡的等级
            mobile: "", //手机号
            openId: "", //openId
            roomSum: "", // 用户入住的房晚数量
            hint_box_show: false, //hint
            hint_box_content: "" //hint_content
        };
    },
    computed: {},
    methods: {
        //生日
        birthdayWin() {
            let that = this;
            weui.datePicker({
                start: 1800,
                end: new Date(),
                defaultValue: [1991, 1, 1],
                // defaultValue:3,
                onChange: function(result) {
                    console.log(result);
                },
                onConfirm: function(result) {
                    that.$http({
                        method: "POST",
                        url: update_user,
                        data: {
                            birthday:
                                result[0].value +
                                "-" +
                                result[1].value +
                                "-" +
                                result[2].value
                        }
                    }).then(res => {
                        if (res.data.status == 1) {
                            that.birthdayNum =
                                result[0].value +
                                "-" +
                                result[1].value +
                                "-" +
                                result[2].value;
                        } else {
                            that.hint_box_show = true;
                            that.hint_box_content = res.data.msg;
                            setTimeout(() => {
                                that.hint_box_show = false;
                                that.hint_box_content = "";
                            }, 2000);
                        }
                    });
                },
                id: "datePicker"
            });
        },
        //性别
        sexChoose() {
            let _this = this;
            weui.picker(
                [
                    {
                        label: "男"
                    },
                    {
                        label: "女"
                    }
                ],
                {
                    onChange: function(result) {
                        console.log(result);
                        // console.log('改变');
                    },
                    onConfirm: function(result) {
                        //修改性别
                        if (result[0].label == "男") {
                            _this.sex = 1;
                        } else {
                            _this.sex = 2;
                        }
                        _this
                            .$http({
                                method: "POST",
                                url: update_user,
                                data: {
                                    sex: _this.sex
                                }
                            })
                            .then(res => {
                                if (res.data.status == 1) {
                                    if (result[0].label == "男") {
                                        _this.sex = 1;
                                    } else {
                                        _this.sex = 2;
                                    }
                                } else {
                                    _this.hint_box_show = true;
                                    _this.hint_box_content = res.data.msg;
                                    setTimeout(() => {
                                        _this.hint_box_show = false;
                                        _this.hint_box_content = "";
                                    }, 2000);
                                }
                            });
                    },
                    id: "sexPrice"
                }
            );
        },
        //跳转到
        oldMobile() {
            //手机号为空跳转到登录页面，有值跳转到老手机号页面
            if (this.mobile == "") {
                this.$router.push({
                    path: "/login?loginPage=" + 2 + "&openId=" + this.openId
                });
            } else {
                this.$router.push({
                    path: "/oldPhoneNum?oldMobile=" + this.mobile
                });
            }
        }
    },
    mounted() {
        var param = {};
        this.$http({
            url: userInfo,
            method: "POST",
            data: param
        }).then(res => {
			this.loading = false;
            if (res.data.status == 1) {
                this.imgUrl = res.data.data.avatar; //头像
                this.nickname = res.data.data.nickname; //昵称
                this.username = res.data.data.username; // 用户名
                this.card = res.data.data.card;
                this.gradeName = res.data.data.group_name;
                this.birthdayNum = res.data.data.birthday; //生日
                this.sex = res.data.data.sex; 
                this.mobile = res.data.data.mobile;
                this.openId = res.data.data.openid;
                this.roomSum = res.data.data.room_sum;
            }
        });
    }
};
</script>
<style lang="less" scoped>
.center_lists {
    margin-top: 10px;
    padding-left: 15px;
    background: #fff;
}
.center_lists li {
    font-size: 15px;
    color: #333;
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #e5e5e5;
}
.center_head {
    position: relative;
}
.center_head img {
    width: 40px;
    height: 40px;
    display: block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 15px;
    border-radius: 50%;
}
.nickName {
    float: right;
    margin-right: 15px;
}
.center_date {
    float: right;
    margin-right: 27px;
}
.center_lists .border0 {
    border: 0;
}
.center_li {
    position: relative;
}
.center_li img {
    width: 10px;
    height: 16px;
    top: 50%;
    right: 15px;
    margin-top: -8px;
}
.hint_box {
    background: rgba(75, 75, 75, 0.7);
    color: #fff;
    padding: 5px 20px;
    font-size: 14px;
    line-height: 44px;
    border-radius: 13px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -13px;
    transform: translateX(-50%);
}
</style>