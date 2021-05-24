import Vue from 'vue'
import VueRouter from 'vue-router'
import WelcomePage from '../views/WelcomePage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'WolcomePage',
    component: WelcomePage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
