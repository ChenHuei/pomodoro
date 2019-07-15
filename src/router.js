import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home'),
      children: [
        {
          path: '',
          name: 'TodoList',
          component: () => import('@/containers/TodoList')
        },
        {
          path: 'analysis',
          name: 'Analysis',
          component: () => import('@/containers/Analysis')
        },
        {
          path: 'setting',
          name: 'Setting',
          component: () => import('@/containers/Setting')
        }
      ]
    }
  ]
})
