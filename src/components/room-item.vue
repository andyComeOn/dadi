<template>
	<div class="room-wrapper">
		<ul class="list">
			<!-- <li>
				<div class="lf">
					<img src="../assets/images/img/room.png" alt="">
				</div>
				<div class="rg">
					<p class="name m-ellipsis">秋果酒店机场店</p>
					<p class="info m-ellipsis-2">
						秋果都市里的世外桃源，秋果都市里的世外桃源,秋果都市里的世外桃源，秋果都市里的世外桃源,秋果都市里的世外桃源，秋果都市里的世外桃源秋果都市里的世外桃源，秋果都市里的世外桃源。
					</p>
					<p class="location">北京市－朝阳区 距离您2.5km</p>
					<div class="price-wrap">
						<div class="label">
							<span class="full">返</span>
							<span class="minus">减</span>
						</div>
						<div class="price">&yen;
							<span>686</span>起</div>
					</div>
				</div>
			</li> -->
			<li v-for="(item,index) in list" :key="index">
				<div class="lf">
					<img :src="item.imgSrc" alt="">
				</div>
				<div class="rg">
					<p class="name m-ellipsis">{{item.name}}</p>
					<p class="info m-ellipsis-2">
						{{item.info}}
					</p>
					<p class="location">{{item.name}}</p>
					<div class="price-wrap">
						<div class="label">
							<span class="full">返</span>
							<span class="minus">减</span>
						</div>
						<div class="price">&yen;
							<span>{{item.price}}</span>起
						</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>

import {store_list} from '../api/api';
export default {
    name: "room-wrapper",
    props: ["condition"],
    watch: {
        condition: {
            handler(newValue, oldValue) {
                console.log(newValue);
				console.log(oldValue);
            },
            deep: true
        }
    },
    data() {
        return {
            list: [
                {
                    type: 0,
                    imgSrc: require("../assets/images/img/room.png"),
                    name: "秋果酒店机场店",
                    info:
                        "秋果都市里的世外桃源,秋果都市里的世外桃源秋果都市里的世外桃源秋果都市里的世外桃源。",
                    location: "北京市－朝阳区 距离您2.5km",
                    price: 686
                },
                {
                    type: 3,
                    imgSrc: require("../assets/images/img/room.png"),
                    name: "顺义店",
                    info:
                        "好酒店,好酒店好酒店好酒店好酒店好酒店好酒店好酒店好酒店好酒店好酒店好酒店。",
                    location: "北京市－顺义区 距离您3.5km",
                    price: 999
                },
                {
                    type: 2,
                    imgSrc: require("../assets/images/img/room.png"),
                    name: "海淀店",
                    info: "不错,不错不错不错不错不错不错不错不错不错不错",
                    location: "北京市－海淀区 距离您1.5km",
                    price: 345
                },
                {
                    type: 1,
                    imgSrc: require("../assets/images/img/room.png"),
                    name: "海淀店",
                    info: "不错,不错不错不错不错不错不错不错不错不错不错",
                    location: "北京市－海淀区 距离您1.5km",
                    price: 345
                },
                {
                    type: 4,
                    imgSrc: require("../assets/images/img/room.png"),
                    name: "海淀店",
                    info: "不错,不错不错不错不错不错不错不错不错不错不错",
                    location: "北京市－海淀区 距离您1.5km",
                    price: 345
                }
            ]
        };
    },
    created() {
        var param = { cpid: 1 };
        this.fetchData(param);
        
    },
    mounted() {},
    methods: {
        fetchData(param) {
            this.$http({
                method: "POST",
                url: store_list,
                data: param
            }).then(res => {
                console.log(res);
            });

            
        }
    }
};
</script>

<style lang="less" scoped>
@import "../assets/less/var.less";
.list {
    padding: 8px 15px 0;
    li {
        padding: 5px 0;
        height: 130px;
        position: relative;
        &:after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            height: 1px;
            background: @tabbarBorderColor;
            transform: scaleY(0.5);
        }
        .lf {
            width: 100px;
            height: 120px;
            float: left;
            img {
                width: 100px;
                height: 120px;
            }
        }
        .rg {
            margin-left: 100px;
            padding: 5px 0 0 10px;
            .name {
                height: 22px;
                font-size: 16px;
                color: rgba(51, 51, 51, 1);
                line-height: 22px;
                margin-bottom: 5px;
            }
            .info {
                line-height: 16px;
                font-size: 12px;
                color: rgba(102, 102, 102, 1);
            }
            .location {
                margin-top: 9px;
                margin-bottom: 9px;
                height: 14px;
                font-size: 10px;
                color: rgba(102, 102, 102, 1);
                line-height: 14px;
            }
            .price-wrap {
                height: 20px;
                .label {
                    float: left;
                    height: 20px;
                    span {
                        display: inline-block;
                        padding: 0 2px;
                        line-height: 14px;
                        margin-right: 2px;
                        font-size: 10px;
                        border-radius: 1px;
                        &.full {
                            color: #5ac4fe;
                            border: 1px solid #5ac4fe;
                        }
                        &.minus {
                            color: #ffba56;
                            border: 1px solid #ffba56;
                        }
                    }
                }
                .price {
                    float: right;
                    height: 20px;
                    vertical-align: bottom;
                    font-size: 10px;
                    color: #666;
                    span {
                        font-size: 12px;
                        color: #ffba56;
                    }
                }
            }
        }
    }
}
</style>