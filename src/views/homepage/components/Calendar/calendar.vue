<style rel="stylesheet/scss" lang="scss" scoped>
@media screen and (min-width: 460px) {
  .wh_item_date:hover {
    background: #d95e29;
    cursor: pointer;
    border-radius: 8px;
  }
}

.wh_container {
  max-width: 410px;
  margin: auto;
}

.wh_container > li {
  list-style-type: none;
}
.wh_top_changge {
  display: flex;
}

.wh_top_changge li {
  cursor: pointer;
  display: flex;
  color: black;
  font-size: 18px;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 47px;
}

.wh_top_changge .wh_content_li {
  cursor: auto;
  flex: 2.5;
}
.wh_content_all {
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
    "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
  background-color: white;
  width: 100%;
  overflow: hidden;
  padding-bottom: 8px;
}

.wh_content {
  display: flex;
  flex-wrap: wrap;
  padding: 0 5% 0 5%;
  width: 100%;
  justify-content: space-around;
  align-items: center;
}

.wh_content:first-child .wh_content_item_tag,
.wh_content:first-child .wh_content_item {
  color: #ddd;
  font-size: 16px;
}

.wh_content_item,
wh_content_item_tag {
  font-size: 15px;
  width: 13.4%;
  text-align: center;
  color: black;
  position: relative;
}
.wh_content_item {
  height: 40px;
}

.wh_top_tag {
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wh_item_date {
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wh_jiantou1 {
  width: 12px;
  height: 12px;
  border-top: 2px solid #000000;
  border-left: 2px solid #000000;
  transform: rotate(-45deg);
}

.wh_jiantou1:active,
.wh_jiantou2:active {
  border-color: #ddd;
}

.wh_jiantou2 {
  width: 12px;
  height: 12px;
  border-top: 2px solid #000000;
  border-right: 2px solid #000000;
  transform: rotate(45deg);
}
.wh_content_item > .wh_isMark {
  margin: auto;
  &:after{
    content:"";
    width: 5px;
    height: 5px;
    border-radius: 5px;
    background: #d95e29;
    position: absolute;
    left: 23px;
    bottom: 0;
  }
}
.wh_content_item .wh_other_dayhide {
  color: #bfbfbf;
}
.wh_content_item .wh_want_dayhide {
  color: #bfbfbf;
}
.wh_content_item .wh_isToday {
  background: #d95e29;
  border-radius: 8px;
}
.wh_content_item .wh_chose_day {
  background: #d95e29;
  border-radius: 8px;
}
</style>
<template>
  <section class="wh_container">
    <div class="wh_content_all">
      <div class="wh_top_changge">
        <li @click="PreMonth(myDate,false)">
          <div class="wh_jiantou1"/>
        </li>
        <li class="wh_content_li">{{ dateTop }}</li>
        <li @click="NextMonth(myDate,false)">
          <div class="wh_jiantou2"/>
        </li>
      </div>
      <div class="wh_content">
        <div v-for="(tag,index) in textTop" :key="index" class="wh_content_item">
          <div class="wh_top_tag">{{ tag }}</div>
        </div>
      </div>
      <hr>
      <div class="wh_content">
        <div v-for="(item,index) in list" :key="index" class="wh_content_item" @click="clickDay(item,index)">
          <div
            :class="[{ wh_isMark: item.isMark},{wh_other_dayhide:item.otherMonth!=='nowMonth'},{wh_want_dayhide:item.dayHide},{wh_isToday:item.isToday},{wh_chose_day:item.chooseDay},setClass(item)]"
            class="wh_item_date"
          >{{ item.id }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import timeUtil from './calendar'
export default {
  props: {
    markDate: {
      type: Array,
      default: () => []
    },
    markDateMore: {
      type: Array,
      default: () => []
    },
    textTop: {
      type: Array,
      default: () => ['一', '二', '三', '四', '五', '六', '日']
    },
    sundayStart: {
      type: Boolean,
      default: () => false
    },
    agoDayHide: {
      type: String,
      default: `0`
    },
    futureDayHide: {
      type: String,
      default: `2554387200`
    }
  },
  data() {
    return {
      myDate: [],
      list: [],
      historyChose: [],
      dateTop: ''
    }
  },
  watch: {
    markDate: {
      handler(val, oldVal) {
        this.getList(this.myDate)
      },
      deep: true
    },
    markDateMore: {
      handler(val, oldVal) {
        this.getList(this.myDate)
      },
      deep: true
    },
    agoDayHide: {
      handler(val, oldVal) {
        this.getList(this.myDate)
      },
      deep: true
    },
    futureDayHide: {
      handler(val, oldVal) {
        this.getList(this.myDate)
      },
      deep: true
    },
    sundayStart: {
      handler(val, oldVal) {
        this.intStart()
        this.getList(this.myDate)
      },
      deep: true
    }
  },
  created() {
    this.intStart()
    this.myDate = new Date()
  },
  mounted() {
    this.getList(this.myDate)
  },
  methods: {
    intStart() {
      timeUtil.sundayStart = this.sundayStart
    },
    setClass(data) {
      const obj = {}
      obj[data.markClassName] = data.markClassName
      return obj
    },
    clickDay: function(item, index) {
      if (item.otherMonth === 'nowMonth' && !item.dayHide) {
        this.getList(this.myDate, item.date)
      }
      if (item.otherMonth !== 'nowMonth') {
        item.otherMonth === 'preMonth'
          ? this.PreMonth(item.date)
          : this.NextMonth(item.date)
      }
    },
    ChoseMonth: function(date, isChosedDay = true) {
      date = timeUtil.dateFormat(date)
      this.myDate = new Date(date)
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate))
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay)
      } else {
        this.getList(this.myDate)
      }
    },
    PreMonth: function(date, isChosedDay = true) {
      date = timeUtil.dateFormat(date)
      this.myDate = timeUtil.getOtherMonth(this.myDate, 'preMonth')
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate))
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay)
      } else {
        this.getList(this.myDate)
      }
    },
    NextMonth: function(date, isChosedDay = true) {
      date = timeUtil.dateFormat(date)
      this.myDate = timeUtil.getOtherMonth(this.myDate, 'nextMonth')
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate))
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay)
      } else {
        this.getList(this.myDate)
      }
    },
    forMatArgs: function() {
      let markDate = this.markDate
      let markDateMore = this.markDateMore
      markDate = markDate.map(k => {
        return timeUtil.dateFormat(k)
      })
      markDateMore = markDateMore.map(k => {
        k.date = timeUtil.dateFormat(k.date)
        return k
      })
      return [markDate, markDateMore]
    },
    getList: function(date, chooseDay, isChosedDay = true) {
      const [markDate, markDateMore] = this.forMatArgs()
      this.dateTop = `${date.getFullYear()}年${date.getMonth() + 1}月`
      const arr = timeUtil.getMonthList(this.myDate)
      for (let i = 0; i < arr.length; i++) {
        let markClassName = ''
        const k = arr[i]
        k.chooseDay = false
        const nowTime = k.date
        const t = new Date(nowTime).getTime() / 1000
        // 看每一天的class
        for (const c of markDateMore) {
          if (c.date === nowTime) {
            markClassName = c.className || ''
          }
        }
        // 标记选中某些天 设置class
        k.markClassName = markClassName
        k.isMark = markDate.indexOf(nowTime) > -1
        // 无法选中某天
        k.dayHide = t < this.agoDayHide || t > this.futureDayHide
        if (k.isToday) {
          this.$emit('isToday', nowTime)
        }
        const flag = !k.dayHide && k.otherMonth === 'nowMonth'
        if (chooseDay && chooseDay === nowTime && flag) {
          this.$emit('choseDay', nowTime)
          this.historyChose.push(nowTime)
          k.chooseDay = true
        } else if (
          this.historyChose[this.historyChose.length - 1] === nowTime &&
          !chooseDay &&
          flag
        ) {
          k.chooseDay = true
        }
      }
      this.list = arr
    }
  }
}
</script>
