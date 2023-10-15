import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import SelectPage from '../views/SelectPage.vue'
import LoginHome from '../views/LoginPage.vue'
import RegisterPage from'../views/RegisterPage.vue'
import AddressPage from '../views/AddressPage.vue'
import ManageUserPage from '../views/ManageUserPage.vue'
import AddProductPage from '../views/AddProductPage'
import ListProductPage from '../views/ListProductPage'
import ListPaidProductPage from '../views/ListPaidProductPage'
import HomeAdminPage from '../views/HomeAdminPage'
import EditProductPage from '../views/EditProductPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home', 
    component: HomePage 
  },
  {
    path: '/home/admin', 
    component: HomeAdminPage 
  },
  {
    path: '/select/:productid', 
    component: SelectPage,
  },
  {
    path: '/edit/:productid', 
    component: EditProductPage,
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
    name: 'address',
    component: AddressPage
    
  },
  {
    path: '/manage/:userID', 
    component: ManageUserPage
  },
  {
    path: '/addproduct', 
    component: AddProductPage
  },
  {
    path: '/listproduct/:userID', 
    component: ListProductPage
  },
  {
    path: '/listpaid/:userID', 
    component: ListPaidProductPage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
