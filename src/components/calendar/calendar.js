export default {
	yesterday() {
		var today = new Date();
		var nowTime = today.getTime();
		var ms = 24*3600*1000;
		today.setTime(parseInt(nowTime - ms))
		return this.timeChange(this.dateFormat(today))
	},

	yesterdayYMD() {
		let today = new Date();
		today.setDate(today.getDate() - 1);
		let o = {
			yyyy : today.getFullYear(),
			mm : today.getMonth() + 1 ,
			dd : today.getDate(),
		}
		return o
	},

	earlyMorning(date) {//凌晨0点到6点
		return date.getHours() < 6
	},
	isMonthFirst(data){
		return data.getDate() == 1;
	},
	// 获取某年中某月有多少天
	//（例如平年2月是28天,闰年二月是29天,一三五七月等30天,四六九等31天），抛出数组
	getDaysInOneMonthArry: function (date) {
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		let arr = [];
		if (this.isMonthFirst(date) && this.earlyMorning(date)) {
			for (let i = 0; i < 4; i++) {
				let monthNum = month + i;
				let yearTmp = year;
				if (monthNum > 12) {
					monthNum = monthNum - 12;
					yearTmp = year + 1;
				}
				arr.push(new Date(yearTmp, monthNum, 0).getDate());
			}
			let yesterdayYMDVal = this.yesterdayYMD();
			arr.unshift(new Date(yesterdayYMDVal.yyyy, yesterdayYMDVal.mm, 0).getDate());
		} else {
			for (let i = 0; i < 4; i++) {
				let monthNum = month + i;
				let yearTmp = year;
				if (monthNum > 12) {
					monthNum = monthNum - 12;
					yearTmp = year + 1;
				}
				arr.push(new Date(yearTmp, monthNum, 0).getDate());
			}
		}
		// console.log(arr);
		// for (let i = 0; i < 4; i++) {
		// 	let monthNum = month + i;
		// 	let yearTmp = year;
		// 	if (monthNum > 12) {
		// 		monthNum = monthNum - 12;
		// 		yearTmp = year + 1;
		// 	}
		// 	arr.push(new Date(yearTmp, monthNum, 0).getDate());
		// }
		return arr;
	},
	// 判断每个月的一号是周几
	getMonthweek: function (date) {
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		let arr = [];   
		if (this.isMonthFirst(date) && this.earlyMorning(date)) {
			for (let i = 0; i < 4; i++) {
				let monthNum = month + i;
				let yearTmp = year;
				if (monthNum > 12) {
					monthNum = monthNum - 12;
					yearTmp = year + 1;
				}
				let dateFirstOne = new Date(yearTmp + '/' + monthNum + '/1');
				arr.push(dateFirstOne.getDay());
			}
			let yesterdayYMDVal = this.yesterdayYMD();
			arr.unshift(new Date(yesterdayYMDVal.yyyy + '/' + yesterdayYMDVal.mm + '/1').getDay());
		} else {
			for (let i = 0; i < 4; i++) {
				let monthNum = month + i;
				let yearTmp = year;
				if (monthNum > 12) {
					monthNum = monthNum - 12;
					yearTmp = year + 1;
				}
				let dateFirstOne = new Date(yearTmp + '/' + (monthNum) + '/1');
				arr.push(dateFirstOne.getDay());
			}
		}

		// for (let i = 0; i < 4; i++) {
		// 	let monthNum = month + i;
		// 	let yearTmp = year;
		// 	if (monthNum > 12) {
		// 		monthNum = monthNum - 12;
		// 		yearTmp = year + 1;
		// 	}
		// 	let dateFirstOne = new Date(yearTmp + '/' + (monthNum) + '/1');
		// 	arr.push(dateFirstOne.getDay());
		// }
		// console.log(arr);
		return arr;
	},
	//format日期
	dateFormat: function (date) {
		date = typeof date === 'string' ? new Date(date.replace(/\-/g, '/')) : date;
		return date.getFullYear() + '/' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '/'
			+ (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) ;
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
		// 获取某年中某月有多少天
		//（例如平年2月是28天,闰年二月是29天,一三五七月等30天,四六九等31天），抛出数组
		const num = this.getDaysInOneMonthArry(date);
		// 某月份中对应星期栏 - 空几格
		const leftNum = this.getMonthweek(date);
		// 获取参数的年份
		let year = date.getFullYear();
		// 获取参数的月份
		let month = date.getMonth();
		// 判断参数的小时是否是小于凌晨6点
		let hour = this.earlyMorning(date);
		// 11.26号添加需求：若是今天的00:01-06:00 则可预定昨天的房
		// 解释：若用户A在今天的00:01-06:00想要订房，即可理解为昨天预定
		// 到今天12点退房即可。（正常用户今天订房：今天晚上入住，明天12:00之前离店）
		// 格式化时间
		let today = this.dateFormat(date);
		// 把当前日期并且转换格式如2018/07/19 --> 20180719
		let todayDate = this.timeChange(today);
		let monthTmp = date.getMonth() + 4;    
		let yearTmp = "";
		if (monthTmp > 12) {  
			yearTmp = date.getFullYear() + 1;
			monthTmp = monthTmp - 12; 
		}
		// 获取当前月有效的天数，用30天作为参考，在最后一个月中，不能点击天数的标识天（30减去当天日期之后的）
		// 例如今天是7月20， 那么日历展示的最后一个月就是10月，7月的可选日期是20号-31号，共计是12天，
		// 那么10月份就是从10月18号之后（不包含该天）的天数不能点击   
		let bigDay = yearTmp + '/' + monthTmp + '/' + (30 - (num[0] - date.getDate() + 1));
		let bigDayDate = this.timeChange(bigDay); 
		let yesterDay = this.yesterday();
		// 初始化4个月的数组的字段
		let arr = "";
		if (this.isMonthFirst(date) && hour) {
			arr = [{dateTop: '', arry: []}, {dateTop: '', arry: []}, {dateTop: '', arry: []}, {dateTop: '', arry: []}, {dateTop: '', arry: []}];
			for (let n = 0; n < arr.length; n++) {
				if (n == 0) {
					let yesterdayYMDVal = this.yesterdayYMD();
					arr[n].dateTop = `${yesterdayYMDVal.yyyy}年${yesterdayYMDVal.mm}月`;
					for (let m = 0; m < leftNum[n]; m++) {
						arr[n].arry.push({
							id: '',
							date: '1',
							isToday: false,
							isWeekend: false,
							isYesterdayNight: false,
							isBeforeDawn: false,
							isBeforeTodayAndAfterBigDayDate: true,
							isSelected: false,
							isCheckIn: false,
							isLeave: false,
							otherMonth: `pre`
						})
					}
					for (let i = 0; i < num[n]; i++) {
						const nowTime = yesterdayYMDVal.yyyy + '/' + (yesterdayYMDVal.mm < 10 ? '0' + yesterdayYMDVal.mm : yesterdayYMDVal.mm) + '/' + ((i + 1) < 10 ? '0' + (i + 1) : (i + 1));
						let nT = this.timeChange(nowTime);
						arr[n].arry.push({
							id: i + 1,
							date: nowTime,
							isToday: (today === nowTime),
							isWeekend: (new Date(nowTime).getDay() == 6 || new Date(nowTime).getDay() == 0),
							isYesterdayNight: (nT == yesterDay ? true : false),  
							isBeforeDawn: false,
							isBeforeTodayAndAfterBigDayDate: (nT == yesterDay ? false : true) ,
							isSelected: ((opa1 <= nT) && (nT <= opa2)),  // 入住-离店
							isCheckIn: (opa1 === nT),
							isLeave: (opa2 === nT),
							otherMonth: `nowMonth`
						})
					}
				} else {
					let monthTmp = date.getMonth() + n;    
					let yearTmp = date.getFullYear();
					if (monthTmp > 12) {
						monthTmp = monthTmp - 12;
						yearTmp = date.getFullYear() + 1;
						arr[n].dateTop = `${yearTmp}年${monthTmp}月`;
					} else {
						arr[n].dateTop = `${yearTmp}年${monthTmp}月`;
					}
					for (let m = 0; m < leftNum[n]; m++) {
						arr[n].arry.push({
							id: '',
							date: '1',
							isToday: false,
							isWeekend: false,
							isYesterdayNight: false,
							isBeforeDawn: false,
							isBeforeTodayAndAfterBigDayDate: true,
							isSelected: false,
							isCheckIn: false,
							isLeave: false,
							otherMonth: `pre`
						})
					}
					// 循环每月的有效date（从月初到月末）
					for (let i = 0; i < num[n]; i++) {
						let mouthTmp = (month + n);
						let newYear = year;
						if (mouthTmp > 12) {
							mouthTmp = mouthTmp -12;
							newYear = year + 1;
						}
						// 今天
						const nowTime = newYear + '/' + (mouthTmp < 10 ? '0' + mouthTmp : mouthTmp) + '/' + ((i + 1) < 10 ? '0' + (i + 1) : (i + 1));
						let nT = this.timeChange(nowTime);
						arr[n].arry.push({
							id: i + 1,
							date: nowTime,
							isToday: (today === nowTime),
							isWeekend: (new Date(nowTime).getDay() == 6 || new Date(nowTime).getDay() == 0),
							isYesterdayNight: false,
							isBeforeDawn: ((nT == todayDate && hour) ? true : false),
							isBeforeTodayAndAfterBigDayDate: (nT < todayDate),
							isSelected: ((opa1 <= nT) && (nT <= opa2)),  // 入住-离店
							isCheckIn: (opa1 === nT),
							isLeave: (opa2 === nT),
							otherMonth: `nowMonth`
						})
					}
				}	
			}
		} else {
			arr = [{dateTop: '', arry: []}, {dateTop: '', arry: []}, {dateTop: '', arry: []}, {dateTop: '', arry: []}];
			for (let n = 0; n < arr.length; n++) {
				let monthTmp = date.getMonth() + (n + 1);    
				let yearTmp = date.getFullYear();
				if (monthTmp > 12) {
					monthTmp = monthTmp - 12;
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
						isYesterdayNight: false,
						isBeforeDawn: false,
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
					if (mouthTmp > 12) {
						mouthTmp = mouthTmp -12;
						newYear = year + 1;
					}
					let isno = false;
					// 今天
					const nowTime = newYear + '/' + (mouthTmp < 10 ? '0' + mouthTmp : mouthTmp) + '/' + ((i + 1) < 10 ? '0' + (i + 1) : (i + 1));
					let nT = this.timeChange(nowTime);
					if (nT < todayDate) {
						if (nT == yesterDay && hour) {
							isno = false
						} else {
							isno = true
						}
					} else {
						isno = false
					}
					arr[n].arry.push({
						id: i + 1,
						date: nowTime,
						isToday: (today === nowTime),
						isWeekend: (new Date(nowTime).getDay() == 6 || new Date(nowTime).getDay() == 0),
						isYesterdayNight: (nT == yesterDay && hour) ? true : false,
						isBeforeDawn: ((nT == todayDate && hour) ? true : false),
						isBeforeTodayAndAfterBigDayDate: isno,
						isSelected: ((opa1 <= nT) && (nT <= opa2)),  // 入住-离店
						isCheckIn: (opa1 === nT),
						isLeave: (opa2 === nT),
						otherMonth: `nowMonth`
					})
				}	
			}
		}
		return arr;
	},
}