import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login/Login'

Vue.use(Router)
//test
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect:'/login'
    },{
      path:'/login',
      component:Login
    }, {
      path: '/home',
      component: () => import(/* webpackChunkName: "about" */ './views/Home/Home'),
      meta:{title:'home',icon:'home',noCache:true},
      children:[{
        path:'/',
        redirect:'HomeShow',
        meta:{title:'用户信息',icon:'userAll',noCache:true},
      },{
        path:'HomeShow',
        component:()=>import('./views/Home/HomeShow'),
        meta:{title:'首页信息',icon:'HomeShow',noCache:true},
      },{
        name:'userAll',
        path:'userAll',
        component:() => import(/* webpackChunkName: "about" */ './views/Home/user/userAll'),
        meta:{title:'用户管理',icon:'userAll',noCache:true}
      },{
        name:'userOrder',
        path:'userOrders',
        component:() => import(/* webpackChunkName: "about" */ './views/Home/user/userOrders'),
        meta:{title:'订单信息',icon:'userOrder',noCache:true},
      },{
        name:'userHistory',
        path:'userHistory',
        component:() => import(/* webpackChunkName: "about" */ './views/Home/user/userHistory'),
        meta:{title:'历史订单',icon:'userHistory',noCache:true},
      },{
        name:'goodsAll',
        path:'GoodsAll',
        component:()=>import('./views/Home/goods/GoodsAll'),
        meta:{title:'商品管理',icon:'goodsAll',noCache:true},
      },{
        name:'importGoods',
        path:'importGoods',
        component:()=>import('./views/Home/goods/importGoods'),
        meta:{title:'导入商品',icon:'importGoods',noCache:true},
      },{
        name:'BrandAll',
        path:'BrandAll',
        component:()=>import('./views/Home/brand/BrandAll'),
        meta:{title:'品牌管理',icon:'BrandAll',noCache:true},
      },{
        name:'importBrand',
        path:'importBrand',
        component:()=>import('./views/Home/brand/importBrand'),
        meta:{title:'导入品牌',icon:'importBrand',noCache:true},
      }]
    }
  ]
})
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// children:[{
//   path:'user',
//   component:() => import(/* webpackChunkName: "about" */ './views/Home/user/userAll'),
//   meta:{title:'用户信息',icon:'userAll',noCache:true},
//   children:[{
//     path:'userAll',
//     component:()=>import(/* webpackChunkName: "about" */ './views/Home/user/userAll'),
//   },{
//     path:'userGoods',
//     component:()=>import(/* webpackChunkName: "about" */ './views/Home/user/userGoods'),
//   },{
//     path:'userHistory',
//     component:()=>import(/* webpackChunkName: "about" */ './views/Home/user/userHistory'),
//   }]
// },{
//   path:'goods',
//   component:()=>import('./views/Home/goods/GoodsAll'),
//   meta:{title:'商品信息',icon:'userAll',noCache:true},
//   children:[{
//     path:'goodsAll',
//     component:()=>import(/* webpackChunkName: "about" */ './views/Home/goods/GoodsAll'),
//   },{
//     path:'importGoods',
//     component:()=>import(/* webpackChunkName: "about" */ './views/Home/goods/importGoods'),
//   }]
// }],
