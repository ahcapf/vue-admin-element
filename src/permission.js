import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

let hadrouter = false


router.beforeEach((to, from, next) => {
  console.log('跳转路由为', to.path)
  if (getToken('token')) {
    // 初始化路由
    if (!hadrouter) {
      store.dispatch('GenerateRoutes').then(() => {
        console.log('初始化路由', store.getters.addRouters)
        router.addRoutes(store.getters.addRouters)
        hadrouter = true
        next({ ...to, replace: true })
      })
    } else {
      next()
    }

  } else if (to.path !== '/login') {
    next('/login')
  } else {
    next()
  }

})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
