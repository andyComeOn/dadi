<template>
	<div class="login">
		<mu-container class="p-t">
  			<mu-row justify-content="center">
				<mu-avatar :size="size">
					<img src="../../assets/images/img/room.png">
				</mu-avatar>
			</mu-row>
		</mu-container>
		<div class="welcome">欢迎来到秋果酒店</div>

		<ul class="">
			<!-- <li>

			</li> -->
			<!-- label="手机号" -->
			<!-- label="数字" -->
			<!-- <li>
				<input type="tel" v-model="tel">
			</li>
			<li>
				<input type="number" v-model="testCode">
			</li> -->
			<mt-field  placeholder="请输入手机号" state="success" type="tel" v-model="tel"></mt-field>
			<mt-field  placeholder="请输入验证码" type="number" v-model="testCode">

			</mt-field>
			
		</ul>
	</div>
</template>

<script>
import mSwipe from "../../components/swipe";
import mHotelLocation from "../../components/hotel-location";
import membershipRights from "../../components/membership-rights";
import reserveItem from "../../components/reserve-item";
export default {
    name: "nearby",
    components: {
        mSwipe,
        mHotelLocation,
        membershipRights,
        reserveItem
	},
	data(){
		return {
			size: 56,
			tel:'',
			testCode:''
		}
	}
	
};
</script>

<style lang="less" scoped>
	.login{
		.p-t{
	 		padding-top: 40px;
		}
		.welcome{
			height: 30px;
			line-height: 30px;
			margin-top: 12px; 
			margin-bottom: 12px; 
			font-size: 16px;
			text-align: center;
		}
		ul {
			padding: 0 30px;
		}
	}
	
</style>