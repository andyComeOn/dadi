<template>
	<div class="old-phone-num-page">
		<ul>
			

			
            <li class="tel">
                <div class="lf">当前手机号</div>
                <div class="rg">13525009999</div>
            </li>

            <li class="tel">
					<div class="lf">输入验证码</div>
					<div class="rg">13525009999</div>
			</li>
			
		</ul>
	</div>
</template>

<script>
import mHotelLocation from "../../components/hotel-location";
import roomItem from "../../components/room-item";
import searchbar from "../../components/searchbar";
import sortbar from "../../components/sortbar";
import refreshbar from "../../components/refresh-bar";
import noSearchResult from "../../components/no-search-result";

export default {
    name: "search-result",
    components: {
        roomItem,
        searchbar,
        sortbar,
        refreshbar,
        noSearchResult
    },
    data() {
        return {
            watchObj: {
                flag: true,
				searchForm:{city:''},
				sortForm:{},
				refreshForm:{}


            },
			
        };
    },
    mounted() {
        
    },
    methods: {
        
    }
};
</script>

<style lang="less" scoped>
    @import "../../assets/less/var.less";
    .old-phone-num-page{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #EFF1F0;
        ul{
			padding: 0 10px;
			li{
				position: relative;
				&:after{
					content: '';
					position: absolute;
					left: 0;
					bottom: 0;
					right: 0;
					height: 1px;
					background: @tabbarBorderColor;
					transform: scaleY(0.5);
				}
				// 头像
				&.avatar {
					height: 80px;
					padding: 10px 0;
					.lf{
						height: 60px;
						line-height: 60px;
						font-size: 14px;
						float: left;
					}
					.rg{
						width: 60px;
						height: 60px;
						border-radius: 50%;
						background: pink; 
						float: right;
					}
				}
				// 昵称
				&.nick {
					height: 44px;
					.lf{
						height: 44px;
						line-height: 44px;
						font-size: 14px;
						float: left;
					}
					.rg{
						padding-right: 10px; 
						height: 44px;
						line-height: 44px;
						float: right;
					}
				}
				// 性别
				&.sex {
					height: 44px;
					.lf{
						height: 44px;
						line-height: 44px;
						font-size: 14px;
						float: left;
					}
					.rg{
						padding-right: 10px; 
						height: 44px;
						line-height: 44px;
						float: right;
					}
				}
				
				&.birth {
					height: 44px;
					.lf {
						height: 44px;
						line-height: 44px;
						font-size: 14px;
						float: left;
					}
					.rg {
						padding-right: 10px; 
						height: 44px;
						line-height: 44px;
						float: right;
					}
				}
				&.tel {
					height: 44px;
					.lf{
						height: 44px;
						line-height: 44px;
						font-size: 14px;
						float: left;
					}
					.rg{
						padding-right: 10px; 
						height: 44px;
						line-height: 44px;
						float: right;
					}
				}				
			}
		}

    }
</style>