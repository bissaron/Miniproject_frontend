import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
 
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView')
  },
  {
    path: '/manageTable',
    name: 'manageTable',
    component: () => import('../views/TableView')
  },
  {
    path: '/todo',
    name: 'todo',
    component: () => import('../views/TodoView.vue'),
  },
  

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
