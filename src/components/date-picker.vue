<template>
  <div class="content" ref="content">
      <Head :date='yearMonthDay' @lastMonth='lastMonth' @nextMonth='nextMonth' @goToday='goToday' @nextYear="nextYear" @lastYear='lastYear'/>
      <ul class="calendar-week">
        <li v-for="(item, index) in calendarTitleArr" :key="index" class="week-item">{{item}}</li>
      </ul>
      <div class="week">
        <li @click="itemChoose(item, index)" v-for="(item, index) in dateList" :key="index" class="week-item" :class="{ cursor: item.isCurrentMonth, noCurrentMonth: !item.isCurrentMonth, isToday: item.isToDay && item.isCurrentMonth, noCursor: !item.isCurrentMonth}">
            <span class="dayNum">{{item.day}}</span>
        </li>
      </div>
  </div>
</template>

<script>
import Head from './head.vue'
import timeUtil from '../utils/time'
export default {
  name: 'date-picker',
  components:{
    Head
  },
  data() {
    let { year, month, day, num } = timeUtil.getYearMonthDay(new Date())  // 获取当前年月日
    return {
      yearMonthDay:{
        year, month, day, num
      },
      dateList:[],
      calendarTitleArr:[
        '周一',
        '周二',
        '周三',
        '周四',
        '周五',
        '周六',
        '周日',
      ],
    }
  },
  created() {

  },
  mounted() {
    this.getCurrentMonthDay()
    this.getStart()
  },
  methods:{
    // 今天
    goToday() {
      this.yearMonthDay = timeUtil.getYearMonthDay(new Date())  // 获取当前年月日
      this.getStart()
    },

    // 上个月
    lastMonth() {
      this.yearMonthDay = (timeUtil.lastNextYearMonthDay(this.yearMonthDay, 1));  
      this.getStart()
    },

    // 下个月
    nextMonth() {
      this.yearMonthDay = (timeUtil.lastNextYearMonthDay(this.yearMonthDay, 2));  
      this.getStart() 
    },

    nextYear() {
      this.yearMonthDay.year ++;
      this.getStart()
    },

    lastYear() {
      this.yearMonthDay.year --;
      this.getStart()
    },

    //  获取当前面板月份天数,并且获取修改当前面板格子数
    getCurrentMonthDay() {
      let dayNum = timeUtil.getDayInOneMonth(this.yearMonthDay.year, this.yearMonthDay.month)
      return dayNum
    },

    //  获取面板日期列表
    getStart() {
      let monthStart = new Date(this.yearMonthDay.year,  this.yearMonthDay.month - 1, 1).getDay()   // 0代表星期天  1 代表星期一  6代表星期六
      monthStart = monthStart == 0 ? 7 : monthStart
      let monthDayNum;
      let dayNum = this.getCurrentMonthDay()
      if(dayNum == 28) {        // 28天的情况
        if(monthStart == 1) {
          monthDayNum = 28
        }else {
          monthDayNum = 35
        }
      }else if(dayNum == 29) {  // 29天的情况
          monthDayNum = 35      
      }else if(dayNum == 30) {  // 30天的情况
        if(monthStart == 7) {
          monthDayNum = 42
        }else {
          monthDayNum = 35
        }
      }else{                    // 31天的情况
        if(monthStart == 6 || monthStart == 7) {
          monthDayNum = 42
        }else {
          monthDayNum = 35
        }
      }
      //  面板第一个开始时间，求出需往前推多少天
      let monthStartTime = (new Date(this.yearMonthDay.year, this.yearMonthDay.month - 1, 1)) - ((monthStart -1) * 24 * 60 * 60 * 1000);

      let monthMiddle = monthStartTime + (15 * 24 * 60 * 60 * 1000),monthMiddleMonth = new Date(monthMiddle).getMonth() + 1;  // 月中
      
      let year, month, day,isCurrentMonth = true, isToDay = false, dateList = [], clickDay = false;
      this.dateList = []
      for (let i = 0; i < monthDayNum; i++) {
        let today = timeUtil.getYearMonthDay(new Date());   // 获取当前年月日
        console.log(today);
        let time = monthStartTime + (i * 24 * 60 * 60 * 1000)
        year = new Date(time).getFullYear()
        month = new Date(time).getMonth() + 1
        day = new Date(time).getDate()
        if(monthMiddleMonth != month) {     // 判断当前日期是否为选中月
          isCurrentMonth = false
        }
        if( today.year == year && today.month == month && today.day == day  ) {
          isToDay = true
        }
        dateList.push({ year, month, day, isCurrentMonth, isToDay, clickDay })
        isCurrentMonth = true
        isToDay = false
      }
      this.dateList = dateList
    },

    // 选择某天
    itemChoose(item, index) {
 

    }
  }
}
</script>

<style scoped lang="less">
.content {
  text-align: center;
  padding: 10px;
  width: 600px;
  height: 600px;
  background-color: rgb(206, 202, 199);
  border-radius: 5px;
  box-shadow: 10px 10px 5px #888888;
  user-select: none;
}
.calendar-week {
  width: 100%;
  height: 40px;
  background-color: #fff ;

  li{
    border: 1px solid #ccc;
    border-bottom: none;
    border-left: none;
    width: 14.285%;
    float: left;
    height: 100%;
    text-align: center;
    line-height: 40px;

  }
}
.week {
  width:  100%;
  padding: 0;
  .week-item{
    width: 14.285%;
    height: 80px;
    background-color: #fff ;
    border: 1px solid #ccc;
    border-bottom: none;
    border-left: none;
    float: left;
    position: relative;
    &:hover{
      background-color: rgb(243, 242, 203);
    }
    .dayNum{
      position: absolute;
      top: 2px;
      right: 4px;
      color: rgb(150, 146, 146);
    }
  }
}

.noCurrentMonth{
  background-image: linear-gradient(45deg,rgba(000, 000, 000, .03) 25%,transparent 25%,transparent 50%,rgba(000, 000, 000, .03) 50%,rgba(000, 000, 000, .03) 75%,transparent 75%,transparent);
  background-size: 20px 20px;
}
.isToday{
  background-color: rgba(255, 230, 4, 0.2) !important;
}
.active{
  background-color: rgb(46, 41, 41);
}
</style>
