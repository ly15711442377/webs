import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../pages/layout'
import ProductSelect from '../pages/productSelect'
import Params from  '../pages/params'
import Login from "../pages/login"
import ContentCategory from '../pages/contentCategory'
import store from '../store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children:[
      {
        path:"/",
        name:"ProductSelect",
        component:ProductSelect,
        meta:{
          isLogin:true
        }
      },
      {
        path:"params",
        name:"Params",
        component:Params,
        meta:{
          isLogin:true
        }
      },
      {
        path:"/content",
        name:"ContentCategory",
        component:ContentCategory,
        meta:{
          isLogin:true
        }
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  }
]


const router = new VueRouter({
  mode: 'history',
  linkActiveClass:'active',
  base: process.env.BASE_URL,
  routes
})


/**
 * 路由权限
 */
router.beforeEach((to,from,next)=>{
  if(to.meta.isLogin){
    // 需要登录
    const token = store.state.loginModule.token
    if(token){
      // 登录成功
      next()
    }else{
      // 登录失败
      next({path:"/login"})
    }
  }else{
    // 不需要登录
    next()
  }
})


export default router
