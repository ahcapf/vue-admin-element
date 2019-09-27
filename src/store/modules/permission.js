import { constantRouterMap } from '@/router'
import authority from '@/assets/authority.json'
const _import = require('../../router/_import_' + process.env.NODE_ENV)//获取组件的方法
import Layout from '@/views/layout/Layout'
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.includes(role))
//   } else {
//     return true
//   }
// }

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
// function filterAsyncRouter(routes, roles) {
//   const res = []
//
//   routes.forEach(route => {
//     const tmp = { ...route }
//     if (hasPermission(roles, tmp)) {
//       if (tmp.children) {
//         tmp.children = filterAsyncRouter(tmp.children, roles)
//       }
//       res.push(tmp)
//     }
//   })
//
//   return res
// }

function generaMenu(routes, data) {
  data.forEach((item) => {
    const menu = {
      path: item.path,
      component: item.level == 1 ? Layout : () => {
        try {
          return import(`@/views${item.component}`)
        } catch (err) {
          return import(`@/views/errorPage/404`)
        }
      },
      name: item.name,
      meta: {
        title: item.name,
        icon: item.icon
      },
      redirect: item.level == 1 ? `${item.path}/index` : null,
      hidden: item.type === 'button',
      children: []
    }
    if (item.children) {
      generaMenu(menu.children, item.children)
    }
    routes.push(menu)
  })
}

const permission = {
  state: {
    routers: [],
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        let accessedRouters = []
        // 假设authority是后台返回的菜单列表
        generaMenu(accessedRouters, authority)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
