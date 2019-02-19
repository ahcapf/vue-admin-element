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
    path: '',
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
  },
  {
    path: '/projectManagement',
    component: Layout,
    redirect: '/projectManagement/index',
    children: [
      {
        path: '',
        component: () => import('@/views/projectManagement/index'),
        name: '项目管理',
        meta: { title: '项目管理', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/myProject',
    component: Layout,
    redirect: '/myProject/index',
    children: [
      {
        path: '',
        component: () => import('@/views/myProject/index'),
        name: '我的项目',
        meta: { title: '我的项目', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/myApproval',
    component: Layout,
    redirect: '/myApproval/index',
    children: [
      {
        path: '',
        component: () => import('@/views/myApproval/index'),
        name: '我的审批',
        meta: { title: '我的审批', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/demandPreview',
    component: Layout,
    redirect: '/demandPreview/index',
    children: [
      {
        path: '',
        component: () => import('@/views/demandPreview/index'),
        name: '需求概览',
        meta: { title: '需求概览', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/efficiencyStatistics',
    component: Layout,
    redirect: '/efficiencyStatistics/index',
    children: [
      {
        path: '',
        component: () => import('@/views/efficiencyStatistics/index'),
        name: '效能统计',
        meta: { title: '效能统计', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/workflow',
    component: Layout,
    redirect: '/workflow/index',
    children: [
      {
        path: '',
        component: () => import('@/views/workflow/index'),
        name: '工作流图',
        meta: { title: '工作流图', icon: 'dashboard', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/index',
  //   alwaysShow: true, // will always show the root menu
  //   meta: {
  //     title: 'permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'directivePermission'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]
