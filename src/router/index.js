import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import NoMatch from '../views/404.vue'
// import RenderRouterView from '../components/RenderRouterView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/user',
    redirect: '/user/login',
    // component: RenderRouterView,
    component: () =>
      import(/* webpackChunkName: 'user' */ '../layouts/UserLayout'),
    children: [
      {
        path: '/user/login',
        name: 'login',
        component: () =>
          import(/* webpackChunkName: 'user' */ '../views/User/Login')
      },
      {
        path: '/user/register',
        name: 'register',
        component: () =>
          import(/* webpackChunkName: 'user' */ '../views/User/Register')
      }
    ]
  },
  {
    path: '/',
    redirect: '/dashboard/analysis',
    component: () =>
      import(/* webpackChunkName: 'layout' */ '../layouts/BasicLayout'),
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        component: { render: h => h('router-view') },
        children: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: () =>
              import(
                /* webpackChunkName: 'dashboard' */ '../views/Dashboard/Analysis'
              )
          }
        ]
      },
      // form
      {
        path: '/form',
        name: 'form',
        component: { render: h => h('router-view') },
        children: [
          {
            path: '/form/basic-form',
            name: 'basicform',
            component: () =>
              import(/* webpackChunkName: 'form' */ '../views/Forms/BasicForm')
          },
          {
            path: '/form/step-form',
            redirect: '/form/step-form/info',
            name: 'stepform',
            component: () =>
              import(/* webpackChunkName: 'form' */ '../views/Forms/StepForm'),
            children: [
              {
                path: '/form/step-form/info',
                name: 'info',
                component: () =>
                  import(
                    /* webpackChunkName: 'form' */ '../views/Forms/StepForm/Step1'
                  )
              },
              {
                path: '/form/step-form/confirm',
                name: 'confirm',
                component: () =>
                  import(
                    /* webpackChunkName: 'form' */ '../views/Forms/StepForm/Step2'
                  )
              },
              {
                path: '/form/step-form/result',
                name: 'result',
                component: () =>
                  import(
                    /* webpackChunkName: 'form' */ '../views/Forms/StepForm/Step3'
                  )
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    name: '404',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: NoMatch
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // to and from are Route Object,next() must be called to resolve the hook
  NProgress.start()
  next()
})

router.afterEach(route => {
  //these hooks do not get a next function and cannot affect the navigation
  NProgress.done()
})
export default router
