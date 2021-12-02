
// 例如输入 Wed Dec 01 2021 00:00:00 GMT+0800 (中国标准时间) ==>输出  获取年,月,日
let getYearMonthDay = (date)=> {
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()
    let num = date.getDate()
    month = month + 1
    month = month < 10 ? '0' + month : month
    num = num < 10 ? '0' + num : num

    return {
        year,
        month,
        day,
        num
    }
}

//例如输入2021,11,30 ==>输出  Wed Dec 01 2021 00:00:00 GMT+0800 (中国标准时间) 
let getDate = (year, month, day)=>{
    return new Date(year, month, day)
}


//  获取上月今天  年月日  例如输入2021,11,30 ==>输出 2021,10,30
/**
 *
 *
 * @param {*} year   年
 * @param {*} month  月
 * @param {*} day    日
 * @param {*} type   切换类型 1 上个月， 2 下个月
 */
let lastNextYearMonthDay = ({year, month, day, num}, type)=>{
    let yearMonthDay = {
        year:'', 
        month:'',
        day:'',
        num: num
    }
    if(type == 1) {   // 上个月
        if(parseInt(month) == 1) {
            month = 12;
            year --
        }else {
            month --
        }
        if(getDayInOneMonth(year, month) < day) {
            day = getDayInOneMonth(year, month)
            yearMonthDay.num = day
        }
    }else if(type == 2) {  // 下个月
        if(parseInt(month) == 12) {
            month = 1;
            year ++
        }else {
            month ++
        }

        if(getDayInOneMonth(year, month) < day) {
            day = getDayInOneMonth(year, month)
            yearMonthDay.num = day
        }
    }
    yearMonthDay.day = day
    yearMonthDay.month = month
    yearMonthDay.year = year
    return yearMonthDay
}

// let lastNextYearMonth = ( { year, month } , type  )=>{
//     let lastYear = {
//         year:'', month :""
//     }
//     if(type == 1) {  // 上一年
//         year --;
//     }else if(type == 2) {
//         year ++
//     }




// }
//  知道年月 获取该月天数
let getDayInOneMonth = (year, month)=>{
    month = parseInt(month, 10);
    let day= new Date(year, month, 0);
    return day.getDate();  
}

export default {
    getYearMonthDay,
    getDate,
    lastNextYearMonthDay,
    getDayInOneMonth
}