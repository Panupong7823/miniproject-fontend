import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import SelectPage from '../views/SelectPage.vue'
import LoginHome from '../views/LoginPage.vue'
import RegisterPage from'../views/RegisterPage.vue'
import AddressPage from '../views/AddressPage.vue'
import ManageUserPage from '../views/ManageUserPage.vue'
import AddProductPage from '../views/AddProductPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home', 
    component: HomePage 
  },
  {
    path: '/select/:productid', 
    component: SelectPage,
  },
  {
    path: '/', 
    component: LoginHome
  },
  {
    path: '/register', 
    component: RegisterPage
  },
  {
    path: '/address', 
    component: AddressPage
  },
  {
    path: '/manage', 
    component: ManageUserPage
  },
  {
    path: '/addproduct', 
    component: AddProductPage
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
