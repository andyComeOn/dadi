<template>
    <div>
		<!-- toas提示(loading) -->
        <div id="orderListToast" v-show="loading">
            <div class="weui-mask_transparent"></div>
            <div class="weui-toast">
                <i class="weui-loading weui-icon_toast"></i>
                <p class="weui-toast__content">数据加载中</p>
            </div>
        </div>
		<template v-if="invoiceList.length > 0">
			<ul class="invoice_lists">
				<router-link 
					v-for="(item, index) in invoiceList"
					:to="{path: '/editInvoice', query: { invoice_id: item.id, invoice_company: item.company_name, taxpayer_num: item.taxpayer_num, invoice_address: item.address, invoice_tel: item.tel, invoice_bank: item.bank, invoice_bank_num: item.bank_number }}"
					>
					<li>
						<h3>{{item.company_name}}</h3>
						<p>纳税识别号：{{item.taxpayer_num}}</p>
						<img src="../../assets/images/arrows/list－更多icon@1x.png" />
					</li>
				</router-link>
			</ul>
		</template>
		<template v-else>
			<div class="invoice_no">
				<img src="../../assets/images/404/404-fapiao.png" />
				<p>暂无发票信息</p>
			</div>
		</template>
     	
		<div class="invoice_footer">
			<router-link to="/addInvoice">
				<div class="invoiceBtn">新增发票抬头</div>
			</router-link>
		</div>
    </div>
</template>
<script>
import { apiInvoiceList } from '@/api/api';
export default {
	data() {
		return {
			loading: true,
			invoiceList: [],
		}
	},
	// beforeCreate() {
    //     document.querySelector("body").setAttribute("style", "background-color:#fff;");
    // },
    // beforeDestroy() {
    //     document.querySelector("body").removeAttribute("style");
	// },

	mounted() {
		this.fetchInvoiceLis();
	},

	methods: {
		fetchInvoiceLis() {
			this.$http({
				method: "POST",
				url: apiInvoiceList,
				data: {}
			}).then(res => {
				if (res.data.status == 1) {
					this.loading = false;
					this.invoiceList = res.data.data;
				} else {
					this.loading = false;
					this.invoiceList = res.data.data;
				}
			}).catch(err => {});
		}
	},
}
</script>
<style lang="less" scoped>
	@import './invoice.less';
</style>