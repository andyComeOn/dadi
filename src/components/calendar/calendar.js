export default {
	// 获取某年中某月有多少天
	//（例如平年2月是28天,闰年二月是29天,一三五七月等30天,四六九等31天），抛出数组
	getDaysInOneMonthArry: function (date) {
		let year = date.getFullYear();
		const month = date.getMonth();
		let arr = [];
		for (let i = 1; i < 5; i++) {
			let timeNum = month + i;
			let yearTmp = year;
			if (timeNum > 12) {
				timeNum = timeNum - 12;
				yearTmp = year + 1;
			}
			arr.push(new Date(yearTmp, timeNum, 0).getDate());
		}
		return arr;
	},
	// 判断每个月的一号是周几
	getMonthweek: function (date) {
		let arr = [];
		let year = date.getFullYear();
		let month = date.getMonth();
		for (let i = 1; i < 5; i++) {
			let timeNum = month + i;
			let yearTmp = year;
			if (timeNum > 12) {
				timeNum = timeNum - 12;
				yearTmp = year + 1;
			}
			let dateFirstOne = new Date(yearTmp + '/' + (timeNum) + '/1');
			arr.push(dateFirstOne.getDay());
		}
		return arr;
	},
	//format日期
	dateFormat: function (date) {
		console.log(date);
		console.log("dateFormat------------------------------");
		date = typeof date === 'string' ? new Date(date.replace(/\-/g, '/')) : date;
		return date.getFullYear() + '/' + (date.getMonth() + 1) + '/'
			+ date.getDate();
	},
	// 时间格式处理函数
	timeChange: function (pa1) {
		let arr = pa1.split('/');
		if (arr[1].length < 2) {
			arr[1] = "0" + arr[1];
		}
		if (arr[2].length < 2) {
			arr[2] = "0" + arr[2];
		}
		let str = arr.join("");
		return Number(str);
	},
	//获取某月的列表不包括上月和下月
	getMonthListNoOther: function (date, pa1, pa2) {
		// 转换格式如2018/07/19 --> 20180719
		let opa1 = this.timeChange(pa1);
		let opa2 = this.timeChange(pa2);
		// let opa1 = Number(pa1);
		// let opa2 = Number(pa2);

		// 获取某年中某月有多少天
		//（例如平年2月是28天,闰年二月是29天,一三五七月等30天,四六九等31天），抛出数组
		const num = this.getDaysInOneMonthArry(date);

		// 某月份中对应星期栏 - 空几格
		const leftNum = this.getMonthweek(date);

		// 获取参数的年份
		let year = date.getFullYear();
		// 获取参数的月份
		let month = date.getMonth();

		

		// 格式化时间
		let today = "";
		// 把当前日期并且转换格式如2018/07/19 --> 20180719
		let todayDate = "";



		// 获取当前日期
		// 11.26号添加需求：若是今天的00:01-06:00 则可预定昨天的房
		// 解释：若用户A在今天的00:01-06:00想要订房，即可理解为昨天预定
		// 到今天12点退房即可。（正常用户今天订房：今天晚上入住，明天12:00之前离店）

		// if (date.getHours() > 0 && date.getHours() < 6) {
		// 	today = this.dateFormat(date);
		// 	let tmpDate = date;
		// 	tmpDate.setDate(tmpDate.getDate() - 1);
		// 	// date.setDate(date.getDate() - 1);
		// 	// let dateYesterday = date.setDate(date.getDate() - 1);
		// 	console.log(tmpDate);
		// 	// console.log(dateYesterday);
		// 	// 格式化时间
		// 	let tmptoDay = this.dateFormat(tmpDate);
		// 	// 把当前日期并且转换格式如2018/07/19 --> 20180719
		// 	todayDate = this.timeChange(tmptoDay);


		// } else {
		// 	// 格式化时间
		// 	today = this.dateFormat(date);
		// 	// 把当前日期并且转换格式如2018/07/19 --> 20180719
		// 	todayDate = this.timeChange(today);
		// }



		// 格式化时间
		today = this.dateFormat(date);
		// 把当前日期并且转换格式如2018/07/19 --> 20180719
		todayDate = this.timeChange(today);
		
		// 初始化4个月的数组的字段
		let arr = [{ dateTop: '', arry: [] }, { dateTop: '', arry: [] }, { dateTop: '', arry: [] }, { dateTop: '', arry: [] }];
		
		// 获取当前月有效的天数， 用 30天作为参考， 在最后一个月中，不能点击天数的标识天（30减去当天日期之后的）
		// 例如今天是7月20， 那么日历展示的最后一个月就是10月，7月的可选日期是20号-31号，共计是12天，
		// 那么10月份就是从10月18号之后（不包含改天）的天数 不能点击   
		
		// 之前的逻辑代码
		// let bigDay = date.getFullYear() + '/' + (date.getMonth() + 4) + '/' + (30 - (num[0] - date.getDate() + 1));
		// 我修改之后的
		let monthTmp = date.getMonth() + 4;    // 新增
		let yearTmp = "";
		if (monthTmp > 12) {
			yearTmp = date.getFullYear() + 1;
			monthTmp = monthTmp - 12; 
		}
		let bigDay = yearTmp + '/' + monthTmp + '/' + (30 - (num[0] - date.getDate() + 1));
		let bigDayDate = this.timeChange(bigDay); //20181029
		for (let n = 0; n < 4; n++) {
			let monthTmp = date.getMonth() + (n + 1);    
			let yearTmp = date.getFullYear();
			if (monthTmp > 12) {
				monthTmp = monthTmp -12;
				yearTmp = date.getFullYear() + 1;
				arr[n].dateTop = `${yearTmp}年${monthTmp}月`;
			} else {
				arr[n].dateTop = `${yearTmp}年${monthTmp}月`;
			}
			// 循环每月对应weekbar的空白
			for (let m = 0; m < leftNum[n]; m++) {
				arr[n].arry.push({
					id: '',
					date: '1',
					isToday: false,
					isWeekend: false,
					isTodayDawn: false,
					isBeforeTodayAndAfterBigDayDate: true,
					isSelected: false,
					isCheckIn: false,
					isLeave: false,
					otherMonth: `pre`
				})
			}
			// 循环每月的有效date（从月初到月末）
			for (let i = 0; i < num[n]; i++) {
				let mouthTmp = (month + 1 + n);
				let newYear = year;
				if (mouthTmp >12) {
					mouthTmp = mouthTmp -12;
					newYear = year + 1;
				}
				// 昨天
				// const nowTimeYesterday = newYear + '/' + (mouthTmp < 10 ? '0' + mouthTmp : mouthTmp) + '/' + ((i + 1) < 10 ? '0' + (i + 1) : (i + 1));
				// let nTYesterday = this.timeChange(nowTimeYesterday);
				// 今天
				const nowTime = newYear + '/' + (mouthTmp < 10 ? '0' + mouthTmp : mouthTmp) + '/' + ((i + 1) < 10 ? '0' + (i + 1) : (i + 1));
				let nT = this.timeChange(nowTime);

				arr[n].arry.push({
					id: i + 1,
					date: nowTime,
					isToday: (today === nowTime),
					isWeekend: (new Date(nowTime).getDay() == 6 || new Date(nowTime).getDay() == 0),
					isTodayDawn: true,
					isBeforeTodayAndAfterBigDayDate: (nT < todayDate || nT > bigDayDate),
					isSelected: ((opa1 <= nT) && (nT <= opa2)),  // 入住-离店
					isCheckIn: (opa1 === nT),
					isLeave: (opa2 === nT),
					otherMonth: `nowMonth`
				})
			}
		}
		return arr;
	},
}