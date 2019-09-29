import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: 'homepage',
    children: [
      {
        path: 'homepage',
        component: () => import('@/views/homepage/index'),
        name: '首页',
        meta: { title: '首页', icon: 'dashboard', noCache: true }
      }
    ]
  }
]

export const asyncRouterMap = [
  {
    path: '/resourceManage',
    name: '资源管理',
    component: Layout,
    redirect: '/resourceManage/index',
    meta: { title: '资源管理', icon: '' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/resourceManage/index'),
        hidden: true
      },
      {
        path: 'add',
        component: () => import('@/views/resourceManage/add'),
        hidden: true
      },
      {
        path: 'edit',
        component: () => import('@/views/resourceManage/add'),
        hidden: true
      }
    ]
  },
  {
    path: '/registryCenter',
    name: '注册中心',
    component: Layout,
    meta: { title: '注册中心', icon: '' },
    children: [
      {
        path: 'nodeList',
        component: () => import('@/views/registryCenter/nodeList/index'),
        meta: { title: '节点列表', icon: '' }
      },
      {
        path: 'serviceList',
        component: () => import('@/views/registryCenter/serviceList/index'),
        meta: { title: '服务列表', icon: '' }
      }
    ]
  },
  {
    path: '/systemManage',
    name: '系统管理',
    component: Layout,
    meta: { title: '系统管理', icon: '', roles: ['admin'] },
    children: [
      {
        path: 'roleManage',
        name: '角色管理',
        component: () => import('@/views/systemManage/roleManage/index'),
        meta: { title: '角色管理', icon: '', roles: ['admin'] }
      },
      {
        path: 'menuManage',
        name: '菜单管理',
        component: () => import('@/views/systemManage/menuManage/index'),
        meta: { title: '菜单管理', icon: '', roles: ['admin'] }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})


