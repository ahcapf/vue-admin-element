<template>
  <div class="navbar">

    <svg-icon icon-class="woman" style="cursor:pointer" />

    <div class="right-menu">
      <div class="right-menu-item hand">工作台</div>
      <div class="right-menu-item">|</div>
      <div class="right-menu-item">技术平台</div>
      <i class="right-menu-item icon el-icon-info hand" @click="dialogVisible = true" />

      <el-dropdown class="right-menu-item" trigger="click">

        <span class="el-dropdown-link" style="cursor: pointer">
          <svg-icon icon-class="man" />
          admin
          <i class="el-icon-caret-bottom"/>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/">
              个人信息
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/">
              角色管理
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/">
              系统管理
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;text-align: center" @click="logout">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <help-dialog :dialog-visible="dialogVisible" @closeDialog="dialogVisible = false"/>
  </div>
</template>

<script>
import HelpDialog from './Dialog/HelpDialog'
export default {
  components: {
    HelpDialog
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 50px;
  z-index: 1001;
  line-height: 50px;
  border-radius: 0px !important;
  background: #d95e29;
  .right-menu {
    float: right;
    height: 100%;
    display: flex;
    align-content: space-around;
    align-items: center;
    margin-right: 8px;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      color: white;
    }
  }
}
.hand{
  cursor: pointer;
}
</style>
