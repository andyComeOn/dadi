<template>
	<div class="room-wrapper">
		<ul class="list">
			<li>
                <div class="lf">
                    <img src="../assets/images/ic_user_info_location.png" alt="">
                </div>
                <div class="rg">
                    <p class="name m-ellipsis">秋果酒店机场店</p>
                    <p class="info">
                        秋果都市里的世外桃源，秋果都市里的世外桃源
                    </p>
                    <div class="price">
                        <span>返</span>
                        <span>减</span>
                        <span>&yen;686起</span>
                    </div>
                    <p class="location">北京市－朝阳区  距离您2.5km</p>
                </div>
            </li>
        </ul>
	</div>
</template>

<script>
	export default {
		name: 'room-wrapper',
		props: {
			leftShow: {
				type: Boolean,
				default: true
			},
			rightShow: {
				type: Boolean,
				default: true
			}
		},
        data () {
            return {
                // list : [{},{},{}]
            }
        }

	}
</script>

<style lang="less" scoped>
	@import "../assets/less/var.less";
	.list {
		padding: 0 15px;
        .li {
            padding: 5px 0;
            position: relative;
            &:after {
                content: '';
                position: absolute;
                left: 0;
                bottom: 0;
                right: 0;
                height: 1px;
                background: @tabbarBorderColor;
                transform: scaleY(0.5);
		    }
            .lf{
                width: 100px;
                height: 100px;
                float: left;
                img{
                    width: 100px;
                    height: 100px;
                }

            }
            .rg{
                margin-left: 100px;
                padding-left: 10px; 
                .name{
                    font-size: 16px;
                    color: #333333;
                    letter-spacing: 0;

                }
            }
        }
		
		.wrapper {
			display: flex;
			align-items: center;
			.is-left {
				height: 40px;
				line-height: 40px;
				flex: 1;
				font-size: 16px;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}
			.is-right {
				width: 16px;
				height: 40px;
				line-height: 40px;
				display: flex;
				align-items: center;
				justify-content: center;
				img {
					width: 16px;
					height: 16px;
				}
			}
		}
	}
</style>