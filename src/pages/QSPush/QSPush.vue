<template>
	<div class="qsPush">
        <div class="qsPush_box">
	        <img src="../../assets/images/distribution/bg_erweima.png" />
            <div class="qsPush_msg">
                <img class='qsPush_head' src="../../assets/images/img/hotel.png" >
                <p class="qsPush_nickname">乘风破浪</p>
                <p class="qsPush_invite">邀请好友赚奖励</p>
                <div class="qsPush_QRCode">
                    <img :src="this.imgurl" alt="">
                </div>
                <p class="qsPush_hint">长按识别二维码</p>
            </div>
            <div class="qsPush_logo">
                <img src="../../assets/images/distribution/logo.png" />
                <p>都市里的室外桃园</p>
            </div>
        </div>
	</div>
</template>
<script>
    import { showQsCode } from '../../api/api.js';
    export default {
        name: "praise",
        components: {
            
        },
        data(){
            return{
                imgurl:''
            }
        },
        computed: {
            
        },
        methods: {
        
        },
        mounted() {
            var param = {
                // cpid:1
            };
            this.$http({
                method:'POST',
                url:showQsCode,
                data:param,
            }).then((res)=>{
                console.log(res.data.data);
                this.imgurl = res.data.data;

            });
        }
    };
</script>
<style lang="less" scoped>
    .qsPush_box{
        position: relative;
        img{
            width: 100%; 
        }
    }

    .qsPush_msg{
        position: absolute;
        top: 12.54%;
        left: 10%;
        width: 80%;
        height: 66.8%;
        .qsPush_head{
            width: 81px;
            height: 81px;
            display: block;
            margin: 0 auto;
            margin-top: 40px;
            border-radius: 50%;
        }
    }

    .qsPush_nickname{
        font-size: 10px;
        color: #666;
        text-align: center;
        line-height: 19px;
        margin-bottom: 12px;
    }

    .qsPush_invite{
        font-size: 17px;
        color: #ffba55;
        text-align: center;
        line-height: 37px;
    }

    .qsPush_QRCode{
        width: 92px;
        height: 92px;
        padding:10px;
        border: 1px solid #e5e5e5;
        margin: 0 auto;
        img{
            display: block;
            width: 72px;
            height: 72px;
        }
    }

    .qsPush_hint{
        text-align: center;
        font-size: 10px;
        color: #666;
        line-height: 19px;   
    }

    .qsPush_logo{
        position: absolute;
        bottom:7.3%;
        left: 50%;
        transform: translateX(-50%);
        width: 150px;
        height: 60px;
        img{
            width: 46px;
            height: 30px;
            display: block;
            margin: 0 auto;
        }
        p{
            color: #fff;
            font-size: 10px;
            text-align: center;
            line-height: 21px;
            margin-top: 5px;
        }
    }
</style>