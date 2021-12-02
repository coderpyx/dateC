<template>
  <div class="head">
    <div class="yearMonth">
      <div class="left cursor" @click="lastYear">
        <img src="../assets/img/left.png" alt="上一年" />
      </div>
      <div class="left cursor" @click="lastMonth">
        <img src="../assets/img/left.png" alt="上一月" />
      </div>
      <div class="center">{{ yearMonth }}</div>
      <div class="right cursor" @click="nextMonth">
        <img src="../assets/img/right.png" alt="下一月" />
      </div>
      <div class="right cursor" @click="nextYear">
        <img src="../assets/img/right.png" alt="下一年" />
      </div>
    </div>
    <div class="today cursor" @click="goToday">今 天</div>
  </div>
</template>

<script>
import timeUtil from "../utils/time";
export default {
  name: "head1",
  props:['date'],
  data() {
    return {

    }
  },
  computed:{
    yearMonth() {
      let month = this.date.month < 10 ? '0' + this.date.month : this.date.month
      return `${month } - ${this.date.year}`
    }
  },
  methods:{
    lastMonth() {
      this.$emit('lastMonth')
    },
    nextMonth() {
      this.$emit('nextMonth')
    },
    goToday() {
      this.$emit('goToday')
    },
    lastYear() {
      this.$emit('lastYear')
    },
    nextYear() {
      this.$emit('nextYear')
    },
  }
};
</script>

<style lang="less" scoped>
.head {
  height: 60px;
  line-height: 60px;
  position: relative;
  .yearMonth {
    position: absolute;
    width: 200px;
    height: 100%;
    margin-left: 50%;
    transform: translateX(-50%);
    display: flex;
    color: #666;
    font-weight: 600;
    font-size: 20px;
    div {
      flex: 1;
      img {
        height: 20px;
        margin-top: 20px;
      }
    }
    .center {
      flex: 5;
    }
  }
}

.today{
    position: absolute ;
    right: 20px;
    top:10px;   
    width: 80px;
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    border: 1px solid #2061FF;
    font-weight: 500;
    background-color: #fff;
}
</style>
