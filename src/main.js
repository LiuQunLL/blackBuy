import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//导入element-ui框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//注册到vue上
Vue.use(ElementUI);

//导入ivew-ui 框架
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// 注册到Vue上
Vue.use(iView);



//导入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)





// 导入 axios
// 类似于 vue-resource this.$http
import axios from 'axios'
// 设置到Vue的原型上 那么所有Vue实例化出来的对象 和组件都能够共享这个属性
// 一般来说 设置到原型上的 属性 Vue中 会使用$作为前缀 用来区分普通的属性
Vue.prototype.$axios = axios;


//导入样式
import './assets/site/css/style.css'

//导入组件
import index from './components/index.vue'
//详情页的组件
import detail from './components/02.detail.vue'



//写路由规则
let routes=[{
  path:'/',
  //重定向首页index
  redirect:'/index'
},
{
  path:'/index',
  component:index
},
{
  path:'/detail/:artID',
  component:detail
}
]


//过滤组件
import moment from 'moment';
Vue.filter("shortTime", value => {
  //   console.log(value);
  // 处理时间数据
  // 返回处理之后的数据
  // 要显示什么 就返回什么
  return moment(value).format('YYYY~MM~DD')
});


Vue.filter("shortTimePlus", value => {
  //   return '😁😁😁😁😁😁';
  return moment(value).format("YYYY/MM/DD HH:mm:ss");
});



//实例化路由对象
let router=new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  //传入路由对象
  router
}).$mount('#app')






