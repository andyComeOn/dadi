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
		<div class="invoice_footer">
			<div class="invoiceBtn" @click="submit">保存</div>
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
import { apiAddInvoice } from '@/api/api';


export default {
	data(){
		return {
			ticketCompany: "",
			ticketTaxpayer: "",
			ticketAddress: "",
			ticketTel: "",
			ticketBank: "",
			ticketBankNum: "",
			orderDelayToast: false,
			orderDelayToastTxt: "",
		}
	},
	beforeCreate() {
        document.querySelector("body").setAttribute("style", "background-color:#fff;");
    },
    beforeDestroy() {
        document.querySelector("body").removeAttribute("style");
	},
	methods: {
		// 规则验证，添加发票模板时候不区分普、专票
		// 但是徐威针对银行卡号非空进行了校验！那就在非空状态下校验一下
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

		// 提交
		submit() {
			if (this.invoiceRule()) {
				this.orderDelayToastTxt = "数据提交中...";
				this.orderDelayToast = true;
				this.$http({
					method: "POST",
					url: apiAddInvoice,
					data: {
						company_name:  this.ticketCompany,
						taxpayer_num: this.ticketTaxpayer,
						address:  this.ticketAddress,
						tel:  this.ticketTel,
						bank:  this.ticketBank,
						bank_number: this.ticketBankNum,
					}
				}).then(res => {
					if (res.data.status == 1) {
						this.orderDelayToastTxt = "保存成功";
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
        }
	}
}
</script>
<style lang="less" scoped>
	@import './invoice.less';
</style>