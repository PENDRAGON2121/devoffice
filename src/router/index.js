import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import RegistrarUsuario from '../views/RegistrarUsuario.vue'
import OfficeView from '../views/OfficeView.vue'
import ReservationView from '../views/ReservationView.vue'


const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: RegistrarUsuario
  },
  {
    path: '/office/info/:id',
    name: 'office',
    component: OfficeView
  },
  {
    path: '/reservation/:id',
    name: 'Reservation',
    component: ReservationView
  },
  {

    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
