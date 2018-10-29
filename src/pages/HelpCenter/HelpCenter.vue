<template>
    <div class="helpCenterPage m-position-ab">
        <template v-for="(item,index) in list">
            <div class="item" @click="operaFolder(index)" :key="index" :class="{isActive:item.showParagraph}">
                <div class="title">
                    <div class="hd">
                        {{index + 1}}
                    </div>
                    <div class="bd">
                        {{item.title}}
                    </div>
                    <span class="ft" :class="{ftActive:item.showParagraph}"></span>
                </div>
                <transition name="fade" mode="out-in">
                    <div class="context-box" v-show="item.showParagraph">
                        <div class="context">{{item.context}}</div>
                    </div>
                </transition>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: "helpCenterPage",
    components: {},
    data() {
        return {
            isFolder: 0,
            list: [
                {
                    title: "如何成为会员？",
                    showParagraph: false,
                    context:
                        "微信搜索“秋果官方服务”公众号并关注授权；或在门店扫描关注“秋果官方服务”并授权，即可成为会员。"
                },
                {
                    title: "如何兑换积分？",
                    showParagraph: false,
                    context:
                        "会员可在积分商城内兑换任何商品，以积分商城物品为准。"
                },
                {
                    title: "积分使用原则",
                    showParagraph: false,
                    context:
                        "只有通过秋果自有官方渠道注册的会员及预订房间，才可以享受会员积分。1积分=1元，2年内有效，过期清零。另外，免房券、团购、积分兑换、协议客户、团队入住、特价房的间夜，不享受会员积分。"
                },
                {
                    title: "如何取消订单？",
                    showParagraph: false,
                    context:
                        "入住当天12点之前，电话通知门店都可以取消订单并且全额退款，逾期则扣除手续费。"
                },
                {
                    title: "如何使用优惠券？",
                    showParagraph: false,
                    context:
                        "获得优惠券后，请在规定时间内使用，可直接做现金抵用，每次仅可以使用一张。"
                },
                {
                    title: "会员微信上预订房间需要交预付金吗？退全款吗？",
                    showParagraph: false,
                    context:
                        "所有线上产品都需要预付，付全款，之后如果想取消订单，都可以退。入住当天12点之前退全款，逾期扣房费。"
                },
                {
                    title:
                        "会员权益在微信上可以查到吗？比如折扣、权益、升级方式都能看到吗？",
                    showParagraph: false,
                    context:
                        "目前只能看到折扣信息，会员权益、升级方式可在公众号【会员中心】查看。"
                },
                {
                    title: "会员预定房间最多预定几间房间？？",
                    showParagraph: false,
                    context: "每人最多预订5-10间。"
                },
                {
                    title: "积分能不能补录？",
                    showParagraph: false,
                    context:
                        "会员折扣及积分都只能通过官方渠道才能享受，且必须先成为会员。"
                },
                {
                    title: "网上预订只能提前2天么？",
                    showParagraph: false,
                    context: "不是，如果当天有房也可以预订。"
                },
                {
                    title: "标间能住三个人么？",
                    showParagraph: false,
                    context:
                        "这个要根据店里的实际情况，正常每个房间最多入住两人，如果是一家三口可以入住。"
                },
                {
                    title: "机场店如何接机？",
                    showParagraph: false,
                    context:
                        "酒店接机需要提前预约（每个小时的半点接机，整点送机，每个小时一班。等候地点T2航站楼2层6号门马路对面地上停车场/T3地下停车场B13通道）接机电话：18701102736，24小时接机。如有变动，请以机场店公布为准。"
                },
                {
                    title: "客人预订使用的是其亲友账号，能否先行入住？",
                    showParagraph: false,
                    context:
                        "可以，入住时报出房间预订人姓名及联系方式即可入住。"
                }
            ]
        };
    },
    created() {},
    methods: {
        operaFolder(index) {
            let tmp = this.list;
            for (let i = 0; i < tmp.length; i++) {
                tmp[i].showParagraph = false;
            }
            tmp[index].showParagraph = !tmp[index].showParagraph;
            this.list = tmp;
        }
    }
};
</script>

<style lang="less" scoped>
.helpCenterPage {
    overflow: auto;
    padding-top: 10px;
}
.item {
    background: #fff;
    padding-left: 15px;
    position: relative;
    &:after {
        content: "";
        position: absolute;
        left: 15px;
        right: 0;
        bottom: 0;
        height: 1px;
        background: #e5e5e5;
        transform: scaleY(0.5);
    }
    &:nth-last-child(1) {
        &:after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            height: 0;
            background: #e5e5e5;
            transform: scaleY(0.5);
        }
    }
}
// 问
.title {
    position: relative;
    padding: 15px 30px 15px 34px;
    .hd {
        width: 22px;
        height: 20px;
        text-align: center;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -10px;
        background: url("../../assets/images/icon/ic-ask.png") no-repeat center
            center;
        background-size: 100% 100%;
        font-size: 12px;
        color: #fff;
    }
    .bd {
        line-height: 22px;
        font-size: 15px;
        color: #333;
    }
    .ft {
        width: 13px;
        height: 7px;
        position: absolute;
        right: 15px;
        top: 50%;
        margin-top: -4px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center center;
        background-image: url("../../assets/images/arrows/ic-up.png");
        &.ftActive {
            background-image: url("../../assets/images/arrows/ic-down.png");
        }
    }
}
// 答
.context-box {
    padding: 0 15px 15px 0;
    .context {
        padding: 12px;
        background: #f9f9f9;
        color: #666;
        font-size: 14px;
        line-height: 20px;
    }
}
</style>