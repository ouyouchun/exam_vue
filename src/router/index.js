import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/page/home'
import transQuestion from '@/page/transQuestion'
import transChoose from '@/page/transChoose'
import transResult from '@/page/transResult'
import register from '@/page/register'
import main from '@/page/main'
import Error from '@/page/500'
import NotFound from '@/page/404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/main'
    },
    {
      path: '/main',
      name: 'main',
      component: main,
    },
    {
      path: '/transQuestion',
      name: 'transQuestion',
      component: transQuestion,
    },
    {
      path: '/transChoose',
      name: 'transChoose',
      component: transChoose,
      // props: (route) => {id: route.query.id}
    },
    {
      path: '/transResult',
      name: 'transResult',
      component: transResult,
    },
    {
      path: '/register',
      name: 'Register',
      component: register
    },
    {
			path: '/500',
			name: 'error',
			component: Error
    },
    {
			path:'*',
			component:NotFound
    }
  ]
})
