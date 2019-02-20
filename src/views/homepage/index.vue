<template>
  <div class="dashboard-container">
    <h1>敬请期待</h1>
    <calendar
      :mark-date="arr"
      @choseDay="clickDay"
      @changeMonth="changeDate"/>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import Calendar from './components/Calendar'

export default {
  name: 'Homepage',
  components: {
    Calendar
  },
  data() {
    return {
      arr: ['2019/2/1']
    }
  },
  methods: {
    clickDay(data) {
      console.log(data)
    },
    changeDate(data) {
      console.log(data)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-container{
    background: white;
    width: 100%;
  }
</style>
