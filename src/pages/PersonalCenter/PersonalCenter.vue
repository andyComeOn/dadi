<template>
	<div class="center_bd">
		<ul class="center_lists">
			<li class="center_head">
				<span>头像</span>
				<img :src="imgUrl" />
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
			<li class="border0 center_li" @click="oldMobile">
				<span>手机号</span>
				<span class="center_date">{{mobile}}</span>
				<img class="pa" src="../../assets/images/arrows/list－更多icon@1x.png" />
			</li>
		</ul>
	</div>
</template>
<script>
	import weui from 'weui.js';
	import {userInfo,baseUrl} from '../../api/api.js';
	export default {
		name: "personalCenter",
		components: {
			
		},
		data(){
			return {
				birthdayNum:'',	//生日
				imgUrl:'',		//头像
				nickname:'',	//昵称
				sex:'',			//性别   1
				mobile:''		//手机号
			}
		},
		computed: {
            
        },
        methods: {
			//生日
			birthdayWin(){
				let that = this;
				weui.datePicker({
					start:1800,
					end: new Date(),
					defaultValue: [1991, 1, 1],
					onChange: function(result){
						console.log(result);
					},
					onConfirm: function(result){
						console.log(result);
						that.birthdayNum = result[0].value + '-' + result[1].value + '-' + result[2].value;
					},
					id: 'datePicker'
				});
			},
			//性别
			sexChoose(){
				let _this = this;
				weui.picker(
                    [{
                        label: '男'
                    },{
                        label: '女'
                    }], {
						onChange: function (result) {
                            console.log(result);
                            // console.log('改变');
                        },
                        onConfirm: function (result) {
							if(result[0].label == '男'){
								_this.sex = 1;
							}else{
								_this.sex = 2;
							}
						},
						id:'sexPrice'
                    }
                );
			},
			//跳转到
			oldMobile(){
				this.$router.push({path:'/oldPhoneNum?oldMobile=' + this.mobile})
			}
		},
		mounted() {
			var param = {

			};
			this.$http({
				url:userInfo,
                method:'POST',
                data:param
			}).then((res)=>{
				this.imgUrl = res.data.data.code_img;		//头像
				this.nickname = res.data.data.nickname;		//昵称
				this.birthdayNum = res.data.data.birthday;	//生日
				this.sex = res.data.data.sex;				//
				this.mobile = res.data.data.mobile;
				console.log(res);
			});
        }
	};
</script>
<style lang="less" scoped>
	.center_bd{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background:#EFF1F0;
		padding-top: 10px;
	}
	.center_lists{
		padding-left: 15px;
		background: #fff;
	}
	.center_lists li{
		font-size: 15px;
		color: #333;
		height: 60px;
		line-height: 60px;
		border-bottom: 1px solid #e5e5e5;
	}
	.center_head{
		position: relative;
	}
	.center_head img{
		width: 40px;
		height: 40px;
		display: block;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 15px;
	}
	.nickName{
		float: right;
		margin-right: 15px;
	}
	.center_date{
		float: right;
		margin-right: 27px;
	}
	.center_lists .border0{
		border:0;
	}
	.center_li{
		position: relative;
	}
	.center_li img{
		width: 10px;
		height: 16px;
		top: 50%;
		right: 15px;
		margin-top: -8px;
	}
</style>