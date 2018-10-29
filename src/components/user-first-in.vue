
<template>
    <div class="userFirstIn">
        <div class="toast" v-show="isVisible">
            <div class="content">
                <div class="icon"><img src="../assets/images/icon/ic-first-in.png" alt=""></div>
                <p class="title">系统升级公告</p>
                <p class="desc">由于系统升级数据迁移，<br> 原系统账户的优惠券清零，<br> 新系统为每个账户补发5张优惠券。 <br>在“我的--->我的优惠券”中查看</p>
                <p class="btn"><span @click="Submit">我知道了</span></p>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "userFirstIn",
    props: ["isVisible"],
    data() {
        return {
            // isShow: this.isVisible
            // aa: 0
        };
    },
    created() {
        console.log(this.isVisible)
    },
    methods: {
        Submit(){
            this.$emit("userFirstInEmit",false);
        }
    }
};
</script>

<style lang="less" scoped>
.toast {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.65);
    z-index: 5000;
    .content {
        width: 260px;
        height: 300px;
        background: #ffffff;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -150px 0 0 -130px;
        border-radius: 5px;
        text-align: center;
        padding-top: 85px;
        .icon {
            width: 167px;
            height: 137px;
            position: absolute;
            top: -55px;
            left: 50%;
            margin-left: -84px;
            img {
                display: block;
                width: 167px;
                height: 137px;
            }
        }
        .title {
            color: #333;
            line-height: 18px;
            margin-bottom: 15px;
            font-weight:500;
            font-size: 18px;
        }
        .desc {
            font-size: 14px;
            color: #666;
            font-weight: 400;
            line-height: 20px;
            margin-bottom: 25px;
        }
        .btn {
            padding: 0 30px;
            span {
                display: block;
                line-height: 35px;
                color: #ffffff;
                font-size: 16px;
                background: rgba(48, 176, 151, 1);
                border-radius: 5px; 
            }
        }
    }
}
</style>


