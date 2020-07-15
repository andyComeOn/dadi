<template>
	<div>
		<van-cell-group>
			<van-field v-model="ticketCompany" clearable label="单位名称" placeholder="请输入单位名称..." />
			<van-field v-model="ticketTaxpayer" clearable  label="纳税识别号" placeholder="请输入纳税识别号..." />
			<van-field v-model="ticketAddress" clearable  label="注册地址" placeholder="请输入注册地址..." />
			<van-field v-model="ticketTel" clearable  label="注册电话" placeholder="请输入注册电话..." />
			<van-field v-model="ticketBank" clearable  label="开户银行" placeholder="请输入开户银行..." />
			<van-field v-model="ticketBankNum" clearable  label="银行账号" placeholder="请输入银行账号..." />
		</van-cell-group>
		<div class="btnBox">
			<div class="saveBtn" @click="submit">保存</div>
			<div class="deleteBtn" @click="del">删除</div>
		</div>
		<!-- toast（delay=>z） -->
        <div v-show="orderDelayToast">
            <div class="z-mask-transparent"></div>
            <div class="z-toast">
                <i class="z-toast-icon"></i>
                <p class="z-toast-content">{{orderDelayToastTxt}}</p>
            </div>
        </div>
	</div>
</template>
<script>
import { apiInvoiceUpdate, apiDelInvoice } from '@/api/api';
export default {
	data() {
		let routeInvoiceId = this.$route.query.invoice_id;
		let routeCompanyName = this.$route.query.invoice_company;
		let routeTaxpayerNum = this.$route.query.taxpayer_num;
		let routeAddress = this.$route.query.invoice_address;
		let routeInvoiceTel = this.$route.query.invoice_tel;
		let routeInvoiceBank = this.$route.query.invoice_bank;
		let routeInvoiceBankNum = this.$route.query.invoice_bank_num;

		return {
			ticketId: routeInvoiceId,
			ticketCompany: routeCompanyName,
			ticketTaxpayer: routeTaxpayerNum,
			ticketAddress: routeAddress,
			ticketTel: routeInvoiceTel,
			ticketBank: routeInvoiceBank,
			ticketBankNum: routeInvoiceBankNum,
			orderDelayToast: false, // 控制toast显示与否
			orderDelayToastTxt: "", // toast提示文案
		}
	},
	created() {},
	beforeCreate() {
        document.querySelector("body").setAttribute("style", "background-color:#fff;");
    },
    beforeDestroy() {
        document.querySelector("body").removeAttribute("style");
	},
	methods: {
		// 数据规则验证
		invoiceRule() {
            var regNum = /^\d*$/;
			if (!this.ticketCompany.trim() ) {
				this.orderDelayToastTxt = "单位名称不能为空";
				this.orderDelayToast = true;
				setTimeout(() => {
					this.orderDelayToast = false;
				}, 1500);
				return false;
			} else if (!this.ticketTaxpayer.trim()) {
				this.orderDelayToastTxt = "纳税识别号不能为空";
				this.orderDelayToast = true;
				setTimeout(() => {
					this.orderDelayToast = false;
				}, 1500);
				return false;
			} else if (this.ticketBankNum.trim()) {
				if (!regNum.test(this.ticketBankNum.trim())) {
					this.orderDelayToastTxt = "请输入正确的银行账号";
					this.orderDelayToast = true;
					setTimeout(() => {
						this.orderDelayToast = false;
					}, 1500);
					return false;
				} else { return true }
			} else { return true }
        },
		// 编辑发票
		submit() {
			if (this.invoiceRule()) {
				this.orderDelayToastTxt = "数据提交中...";
				this.orderDelayToast = true;
				this.$http({
					method: "POST",
					url: apiInvoiceUpdate,
					data: {
						id: this.ticketId,
						company_name:  this.ticketCompany,
						taxpayer_num: this.ticketTaxpayer,
						address:  this.ticketAddress,
						tel:  this.ticketTel,
						bank:  this.ticketBank,
						bank_number: this.ticketBankNum,
					}
				}).then(res => {
					if (res.data.status == 1) {
						this.orderDelayToastTxt = res.data.msg;
						setTimeout(() => {
							this.orderDelayToast = false;
							this.$router.push({
								path: "/invoiceLists"
							});
						}, 1500);
					} else {
						this.orderDelayToastTxt = res.data.msg;
						setTimeout(() => {
							this.orderDelayToast = false;
						}, 1500);
					}
				});
            }
		},
		// 删除发票
		del() {
			this.$http({
				method: "POST",
				url: apiDelInvoice,
				data: {
					id: this.ticketId
				}
			}).then(res => {
				this.orderDelayToast = true;
				if (res.data.status == 1) {
					this.orderDelayToastTxt = "删除成功";
					setTimeout(() => {
						this.orderDelayToast = false;
						this.$router.push({
							path: "/invoiceLists"
						});
					}, 1500);
				} else {
					this.orderDelayToastTxt = res.data.msg;
					setTimeout(() => {
						this.orderDelayToast = false;
					}, 1500);
				}
			});
		}
	},
}
</script>
<style lang="less" scoped>
	@import './invoice.less';
</style>