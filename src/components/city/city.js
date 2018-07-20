export default {
	// 获取某年中某月有多少天
	//（例如平年2月是28天,闰年二月是29天,一三五七月等30天,四六九等31天），抛出数组
	getDaysInOneMonthArry: function (date) {
		const year = date.getFullYear();
		const month = date.getMonth();
		let arr = [];
		for (let i = 1; i < 5; i++) {
			arr.push(new Date(year, month + i, 0).getDate());
		}
		return arr;
	},
	// 判断每个月的一号是周几
	getMonthweek: function (date) {
		let arr = [];
		const year = date.getFullYear();
		let month = date.getMonth();
		for (let i = 1; i < 5; i++) {
			let dateFirstOne = new Date(year + '/' + (month + i) + '/1');
			console.log(dateFirstOne.getDay());
			arr.push(dateFirstOne.getDay() == 0 ? 0 : dateFirstOne.getDay());
		}
		return arr;
	},
	//format日期
	dateFormat: function (date) {
		date = typeof date === 'string' ? new Date(date.replace(/\-/g, '/')) : date;
		return date.getFullYear() + '/' + (date.getMonth() + 1) + '/'
			+ date.getDate();
	},
	timeChange: function (pa1) {
		let arr = pa1.split('/');
		if (arr[1].length < 2) {
			arr[1] = "0" + arr[1];
		}
		if (arr[2].length < 2) {
			arr[2] = "0" + arr[2];
		}
		let str = arr.join("");
		// console.log(Number(str));
		return Number(str);
	},
	//获取某月的列表不包括上月和下月
	getMonthListNoOther: function (date, pa1, pa2) {
		// 转换格式如2018/07/19 --> 20180719
		let opa1 = this.timeChange(pa1);
		let opa2 = this.timeChange(pa2);

		// 获取某年中某月有多少天
		//（例如平年2月是28天,闰年二月是29天,一三五七月等30天,四六九等31天），抛出数组
		const num = this.getDaysInOneMonthArry(date);

		// 某月份中对应星期栏 - 空几格
		const leftNum = this.getMonthweek(date);

		// 获取参数的年份
		const year = date.getFullYear();
		// 获取参数的月份
		const month = date.getMonth();

		// 获取当前时间
		let toDay = this.dateFormat(new Date());

		// 获取当前时间并且转换格式如2018/07/19 --> 20180719
		let todayDate = this.timeChange(toDay);

		// 初始化4个月的数组的字段
		let arr = [{ dateTop: '', arry: [] }, { dateTop: '', arry: [] }, { dateTop: '', arry: [] }, { dateTop: '', arry: [] }];
		

		let bigDay = new Date().getFullYear() + '/' + (new Date().getMonth() + 4) + '/' + (30 - (num[0] - new Date().getDate() + 1));
		let bigDayDate = this.timeChange(bigDay); //20181029
		for (let n = 0; n < 4; n++) {
			arr[n].dateTop = `${date.getFullYear()}年${(date.getMonth() + (n + 1)) < 10 ? '0' + (date.getMonth() + (n + 1)) : date.getMonth() + (n + 1)}月`;
			for (let m = 0; m < leftNum[n]; m++) {
				arr[n].arry.push({
					id: '',
					date: '1',
					isToday: false,
					isWeekDay: false,
					isTodayBefore: true,
					isSelected: false,
					isHome: false,
					isLeave: false,
					otherMonth: `pre`
				})
			}
			for (let i = 0; i < num[n]; i++) {
				const nowTime = year + '/' + (month + n + 1) + '/' + (i + 1);
				let nT = this.timeChange(nowTime);
				arr[n].arry.push({
					id: i + 1,
					date: nowTime,
					isToday: (toDay === nowTime),
					isWeekDay: (new Date(nowTime).getDay() == 6 || new Date(nowTime).getDay() == 0),
					isTodayBefore: (nT < todayDate || nT > bigDayDate),
					isSelected: ((opa1 <= nT) && (nT <= opa2)),
					isHome: (opa1 === nT),
					isLeave: (opa2 === nT),
					otherMonth: `nowMonth`
				})
			}
		}
		return arr;
	},
	//获取某月的列表 用于渲染
	getMonthList: function (date, pa1, pa2) {
		return this.getMonthListNoOther(date, pa1, pa2);
	}
}