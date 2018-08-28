
<template>
	<div class="city-wendor m-position-ab">
		<div class="city-title">
			<div class="lf" @click="cityTitleBackfun">返回</div>
            请选择城市
        </div>
		<div class="city-content">
			<div class="city-head">搜索条</div>
			<div class="city-body">
				<!-- 定位城市和热门城市 -->
				<div class="location-hot">
					<ul class="location">
						<h4>定位城市</h4>
						<li>
							<span>暂无定位...</span>
						</li>
					</ul>
					<ul class="hot">
						<h4>热门城市</h4>
						<li>
							<span v-for="(item,index) in hotCityList" :key="index" @click="cityItem(item.name, item.id)">{{item.name}}</span>
						</li>
					</ul>
				</div>

				<!-- 城市列表 -->
				<div class="city-lists-box">
					<h4>城市列表</h4>
					<ul class="list">
						<li v-for="(item, index) in cityList" :key="index" @click="cityItem(item.shortname, item.id)">{{item.shortname}}</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { getStorecity, getCityList } from "@/api/api";
export default {
    data() {
        return {
            cityList: [], //拉取城市的信息
            hotCityList: []
        };
    },
    props: {},
    created() {
        this.fetchHotCityList();
        this.fetchCityList();
    },
    methods: {
        // 城市组件点击返回
        cityTitleBackfun() {
            this.$emit("cityTitleBackEmit");
        },
        //城市列表
        fetchCityList() {
            this.$http({
                method: "POST",
                url: getCityList,
                data: {}
            }).then(res => {
                if (res.data.status == 1) {
                    this.cityList = res.data.data;
                }
            });
        },
        //热门城市
        fetchHotCityList() {
            this.$http({
                method: "POST",
                url: getStorecity,
                data: {}
            }).then(res => {
                if (res.data.status == 1) {
                    this.hotCityList = res.data.data;
                }
            });
        },

        // 点击城市item
        cityItem(name, id) {
            this.$emit("cityItemEmit", name, id);
        }
    },
    mounted() {},
    watch: {}
};
</script>

<style lang="less" scoped>
.city-wendor {
    padding-top: 44px;
    .city-title {
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 2;
        padding: 0 15px;
        line-height: 44px;
        text-align: center;
        background: #ccc;
        .lf {
            position: absolute;
            line-height: 44px;
            left: 15px;
            top: 0;
        }
    }
    .city-content {
        .city-head {
            line-height: 28px;
            padding: 6px 15px;
            background: #f4f4f4;
            font-size: 14px;
            text-align: center;
        }
        .city-body {
            font-size: 14px;
            .location-hot {
                padding: 0 15px 10px;
                color: #666;
                h4 {
                   	line-height: 16px;
                    margin: 10px 0;
                    font-size: 13px;
                    font-weight: 400;
                }
                li {
                    &::after {
                        content: "";
                        display: table;
                        clear: both;
                    }
                    span {
                        line-height: 27px;
                        margin: 0 10px 10px 0;
                        float: left;
                        border-radius: 2px;
                        background: #fff;
                        padding: 0 20px;
                    }
                }
            }
            .city-lists-box {
                h4 {
                    line-height: 16px;
					padding: 10px 15px;
					font-size: 13px;
                    font-weight: 400;
                }
                .list {
                    max-height: 400px;
                    overflow: auto;
                    background: #fff;
                    padding: 0 15px;
                    li {
                        line-height: 40px;
                        color: #333;
                        position: relative;
                        &::after {
                            content: "";
                            width: 100%;
                            position: absolute;
                            height: 1px;
                            left: 0;
                            bottom: 0;
                            background: #e5e5e5;
                            transform: scaleY(0.5);
                        }
                    }
                }
            }
        }
    }
}
</style>