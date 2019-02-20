<template>
  <el-dialog
    :visible.sync="visible"
    append-to-body
    title="帮助"
    width="30%"
    @closed="$emit('closeDialog')">
    <span>这是一段信息</span>
  </el-dialog>
</template>

<script>

export default {
  name: 'HelpDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      visible: false
    }
  },
  watch: {
    dialogVisible(val) {
      this.visible = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
