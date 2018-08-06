<template>
    <div class="vip-page">
        <!-- 卡片区 -->
        <div class="cards">
            <div class="box" id="cardsBox" v-if='cardList'>
                <div class="item" 
                    v-for="(item, index) in cardList" 
                    :key="index" 
                    :style="{backgroundImage: 'url('+ item.bgUrl +')', height:cardsBoxH + 'px'}"
                    v-show="item.isCardVisible"
                >
                    
                </div>   
            </div>
        </div>
        <!-- tab切换区 -->
        <div class="tab">
            <ul class="ul" v-if="tabList">
                <li v-for="(item,index) in tabList" :key="index" 
                    @click="tab(index,item.type)" 
                    :class="{active: isActive==index}">
                    <div>
                        <img :src="item.imgSrc" alt="">
                        <span></span>
                    </div>
                    <p>{{item.cardType}}</p>
                </li>
            </ul>
        </div>
        <!-- 文案展示区 -->
        <div class="desc">
            <div class="desc-box">
                <!-- 开卡权益 -->
                <div class="card-right">
                    <div class="title">
                        <span class="s1"></span>
                        开卡权益
                        <span class="s2"></span>
                    </div>
                    <div class="content">
                        <dl v-for="(item,index) in kaiCardList" :key="index">
                            <img :src="item.imgSrc" alt="">
                            <dt>{{item.intro}}</dt>
                            <dd>{{item.detail}}</dd>
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
                            <li v-for="(item,index) in vipList" :key="index" :class="{liNoBorder: index==2}">
                                <p class="li-desc">{{item.desc}}</p>
                                <p class="li-intro">{{item.intro}}</p>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import vipDescItem from "@/components/vip-desc-item";
export default {
    name: "vip",
    components: {},
    data() {
        return {
            watchObj: {},
            current: "",
            cardsBoxH: "",
            isActive:0,
            cardList: [
                {
                    bgUrl: require("../../assets/images/vip/pu.png"),
                    isCardVisible:true
                },
                {
                    bgUrl: require("../../assets/images/vip/silver.png"),
                    isCardVisible:false
                },
                {
                    bgUrl: require("../../assets/images/vip/golden.png"),
                    isCardVisible:false
                },
                {
                    bgUrl: require("../../assets/images/vip/diamond.png"),
                    isCardVisible:false
                },
                {
                    bgUrl: require("../../assets/images/vip/black.png"),
                    isCardVisible:false
                }
            ],
            kaiCardList: [
                {
                    imgSrc: require("../../assets/images/vip/kaika.png"),
                    intro: "开卡赠券",
                    detail: "5张"
                },
                {
                    imgSrc: require("../../assets/images/vip/yaoqing.png"),
                    intro: "邀请特权",
                    detail: "10位／年"
                },
                {
                    imgSrc: require("../../assets/images/vip/fangjia.png"),
                    intro: "房价折扣",
                    detail: "88折"
                },
                {
                    imgSrc: require("../../assets/images/vip/xiaofei.png"),
                    intro: "消费积分",
                    detail: "1.1倍"
                },
                {
                    imgSrc: require("../../assets/images/vip/mianfei.png"),
                    intro: "免费取消",
                    detail: "14点前"
                }
            ],
            tabList: [
                {
                    imgSrc:require("../../assets/images/vip/v1.png"),
                    type:"v1",
                    cardType:"普卡"
                },
                {
                    imgSrc:require("../../assets/images/vip/v2.png"),
                    type:"v2",
                    cardType:"银卡"
                },
                {
                    imgSrc:require("../../assets/images/vip/v3.png"),
                    type:"v3",
                    cardType:"金卡"
                },
                {
                    imgSrc:require("../../assets/images/vip/v4.png"),
                    type:"v4",
                    cardType:"铂金卡"
                },
                {
                    imgSrc:require("../../assets/images/vip/v5.png"),
                    type:"v5",
                    cardType:"黑卡"
                }
            ],
            vipList: [
                {

                    desc: "餐饮折扣",
                    intro: "赠送蔬菜沙拉 92折"
                },
                {
                    desc: "餐饮折扣",
                    intro: "赠送蔬菜沙拉 92折"
                },
                {
                    desc: "餐饮折扣",
                    intro: "赠送蔬菜沙拉 92折"
                },
                {
                    desc: "餐饮折扣",
                    intro: "赠送蔬菜沙拉 92折"
                }
            ]
        };
    },
    created() {},
    mounted() {
        this.$nextTick(() => {
            let cardsBox = document.querySelector("#cardsBox");
            let cardsBoxH = cardsBox.clientWidth * 4 / 7;
            this.cardsBoxH = cardsBoxH;
        });
    },
    methods: {
        // 点击tab切换
        tab(index,type){
            this.isActive = index;
            var tmp = this.tabList;
            var tmpC = this.cardList;
            for(let i = 0; i < tmp.length;i++){
                tmp[i].imgSrc = require("../../assets/images/vip/v"+ (i+1) + ".png");
                tmpC[i].isCardVisible = false;
                if(index==i){
                    tmp[i].imgSrc = require("../../assets/images/vip/v"+ (i+1) + "a.png");
                    tmpC[i].isCardVisible = true;
                }
            }
        }
    }
};
</script>

<style lang="less" scoped>
// 提取标题css
.title {
    line-height: 21px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
    font-size: 15px;
    margin-top: 30px;
    span {
        width: 72px;
        height: 8px;
        background: url("../../assets/images/vip/bg-row.png") no-repeat center
            center;
        background-size: 100% 100%;
        &.s1 {
            margin-right: 10px;
        }
        &.s2 {
            margin-left: 10px;
        }
    }
}

// 卡片
.cards {
    padding: 0 12px;
    .box {
        &::after {
            content: "";
            display: table;
            clear: both;
        }
        .item {
            width: 100%;
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 100% 100%;
        }
    }
}
// tabbar
.tab {
    padding: 15px 15px 0px;
    .ul {
        &::after {
            display: table;
            content: "";
            clear: both;
        }
        li {
            width: 20%;
            float: left;
            text-align: center;
            color: #999;
            &.active{
                color: #333;
                span{
                    background: #F78C3E;
                }
            }
            div {
                height: 20px;
                margin-bottom: 10px;
                position: relative;
                img {
                    position: absolute;
                    top: 0;
                    left: 50%;
                    margin-left: -10px;
                    width: 20px;
                    height: 20px;
                    z-index: 2;
                }
                span {
                    position: absolute;
                    width: 100%;
                    height: 1px;
                    top: 50%;
                    left: 0;
                    background: #cccccc;
                    z-index: 1;
                }
            }
            p {
                line-height: 13px;
                font-size: 13px;
            }
        }
    }
}
// 下面的文字描述
.desc {
    .card-right {
        .content {
            padding: 0 15px;
            &::after {
                display: table;
                content: "";
                clear: both;
            }
            dl {
                width: 20%;
                float: left;
                text-align: center;
                img {
                    width: 24px;
                    height: 24px;
                    display: block;
                    margin: 15px auto 10px;
                }
                dt {
                    line-height: 19px;
                    margin-bottom: 5px;
                    color: #333;
                    font-size: 13px;
                }
                dd {
                    line-height: 16px;
                    color: #999;
                    font-size: 12px;
                }
            }
        }
    }
    .vip-right {
        .content {
            padding: 15px 15px 15px;
            .ul {
                &::after {
                    content: "";
                    display: table;
                    clear: both;
                }
                li {
                    padding: 20px 30px 0;
                    height: 100px;
                    width: 33.33%;
                    float: left;
                    border-right: 1px solid #e5e5e5;
                    border-bottom: 1px solid #e5e5e5;
                    &.liNoBorder {
                        border-right: none;
                    }
                    &:last-of-type {
                        border-bottom: none;
                    }
                }
            }
        }
    }
}
</style>