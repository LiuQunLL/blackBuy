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

//导入放大镜组件
import ProductZoomer from 'vue-product-zoomer'
//注册到vue上
Vue.use(ProductZoomer)


//导入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)





// 导入 axios
// 类似于 vue-resource this.$http
import axios from 'axios'
// 设置到Vue的原型上 那么所有Vue实例化出来的对象 和组件都能够共享这个属性
// 一般来说 设置到原型上的 属性 Vue中 会使用$作为前缀 用来区分普通的属性
Vue.prototype.$axios = axios;
// 设置带上cookie
axios.defaults.withCredentials=true;//让ajax携带cookie


//导入样式
import './assets/site/css/style.css'
//导入组件
import index from './components/index.vue'
//详情页的组件
import detail from './components/02.detail.vue'
//购物车
import shopCart from "./components/03.shopCart.vue";
//结算
import order from "./components/04.order.vue";
//登录
import login from "./components/05.login.vue";
//付钱页面
import payMoney from "./components/06.payMoney.vue";
//支付成功页面
import paySuccess from "./components/07.paySuccess.vue";
//会员中心
import vipCenter from "./components/08.vipCenter.vue";
//订单列表
import orderList from "./components/09.orderList.vue";
//订单详情
import orderDetail from "./components/10.orderDetail.vue";
//
import indexinfo from "./components/11.indexinfo.vue"


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
},
  // 购物车的跳转 不需要带数据
  {
    path: "/shopCart",
    component: shopCart
  },
  //结算页面
  {
    path:"/order/:ids",
    component:order,
    meta:{
      checkLogin:true
    }
  },
  //登录页面
  {
    path:"/login",
    component:login
  },
  //支付页面,付钱页面
  {
    path:'/payMoney/:orderid',
    component:payMoney,
    meta:{
      checkLogin:true
    }
  },
  //支付成功
  {
    path:'/paySuccess',
    component:paySuccess,
    meta:{
      checkLogin:true
    }
  },
  //会员中心
  {
    path:'/vipCenter',
    component:vipCenter,
    meta:{
      checkLogin:true
    },
    //嵌套路由
    children:[
      {
        path: "",
        // 重定向到 首页/index
        redirect: "indexinfo"
      },
      {
        // /vipCenter/index
        path:'indexinfo',
        component:indexinfo
      },
      {
        // 这里的地址 不用写 / 会自动拼接上 父路由的 地址
        path:'orderList',
        component:orderList
      },
      {
        // 这里的地址 不用写 / 会自动拼接上 父路由的 地址
        path:'orderDetail/:orderId',
        component:orderDetail
      },
      // {
      //   // 这里的地址 不用写 / 会自动拼接上 父路由的 地址
      //   path:'orderList',
      //   component:goldVip
      // },


    ]
  },


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

// 增加导航守卫 回调函数(每次路由改变的时候 触发)
router.beforeEach((to, from, next) => {
  console.log("守卫啦!!!!");
  // console.log(to);
  // console.log(from);
  // if (to.path.indexOf('/order')!=-1) {
    if (to.meta.checkLogin==true) {
    // 正要去订单页
    // 必须先判断登录
    axios.get("http://111.230.232.110:8899/site/account/islogin").then(result => {
      //   console.log(result);
      if (result.data.code == "nologin") {
        // 提示用户
        Vue.prototype.$Message.warning("请先登录");
        // 跳转页面(路由)
        router.push("/login");
      }else{
        //登录成功
        next();
      }
    });
  } else {
    // next 如果不执行 就不会路由跳转
    next();
  }
});  

// // 路由跳转完毕触发
// 这种方法 是使用导航守卫的 回调函数实现 
router.afterEach((to, from) => {
  // 页面滚到顶部即可
  window.scrollTo(0,0);
})




//vuex的使用
import Vuex from 'vuex'

Vue.use(Vuex)

// 实例化仓库对象
const store = new Vuex.Store({
  // 状态
  state: {
    // count: 0
    // 购物车数据对象
    // 短路运算 || 如果没有数据 左边的值是 false 去获取 || 右边的值
    cartData:JSON.parse(window.localStorage.getItem('hm24'))||{
      // 90:6,
      // 84:7
    },
    // cartData:data

    //退出的字段
    isLogin:false
  },
  // Vuex的计算属性
  getters:{
    totalCount(state){
      // 通过state 获取 内部的数据
      // 计算并返回
      // return 998;
      let num = 0;
      for (const key in state.cartData) {
        // 循环累加
        num+=state.cartData[key]
      }
      return num;
    }
  },
  // 数据改变的方法
  mutations: {
    // 增加
    // state就是 上面的 数据 state
    // 测试用方法
    // increment (state,obj) {
    //   console.log('触发了')
    //   console.log(state);
    //   console.log(obj);
    //   // state.count+=n
    //   // state.count+=m;
    // }
    // 往购物车添加数据的方法 2->two
    // 约定 对象的属性名  goodId(商品id)  goodNum(商品个数)
    add2Cart(state,obj){
      // console.log(obj);
      // 商品已经存在{goodId:90,goodNum:6}
      if(state.cartData[obj.goodId]!=undefined){
        // 累加即可 state.carData.goodId +=10
        // state.cartData[obj.goodId]+=obj.goodNum;

        // 上面代码的 扩写
        let oldNum = state.cartData[obj.goodId];
        oldNum+=obj.goodNum;
        state.cartData[obj.goodId]=oldNum;
      }else{
        // 商品不存在
        // 动态增加键值对
        // state.cartData[obj.goodId] = obj.goodNum;
        // 如果是动态增加的属性 必须使用Vue.set才可以跟踪数据改变
        // 参数1 对象 参数2 添加的属性名 参数3 属性的值
        Vue.set(state.cartData,obj.goodId,obj.goodNum)
      }
      // 打印内容
      console.log(state);
    },
    updataCartData(state,obj){
      // console.log(obj);
      state.cartData=obj;
    },
    changeLogin(state,isLogin){
      state.isLogin=isLogin
    },
      // 删除某一条数据的方法
    // 已经被 watch中的代码 实现  只是为了 演示 Vue.delete这个方法
    delGoodsById(state, id) {
      // console.log(id);
      // 根据id 删除state中的数据
      // delete state.cartData[id];
      // delete 删除的属性 Vue无法跟踪
      // 参数1 对象 参数2 删除的属性
      // 必须使用Vue.delete才可以同步更新视图
      Vue.delete(state.cartData, id);
    },
  }
})

// 浏览器关闭保存数据
window.onbeforeunload = function () {
  window.localStorage.setItem('hm24',JSON.stringify(store.state.cartData))
  }



new Vue({
  render: h => h(App),
  //传入路由对象
  router,
  store,
    // 生命周期函数
    created() {
      // console.log('最顶级的被创建了');
      // 调用登录判断接口
      // 根据结果判断是否登录
      axios.get("http://111.230.232.110:8899/site/account/islogin").then(result => {
        console.log(result);
        if (result.data.code == "nologin") {
          // 提示用户
          // Vue.prototype.$Message.warning("请先登录");
          // 跳转页面(路由) 登录页面 编程式导航
          // router.push("/login");
          store.state.isLogin = false;
        } else {
          // 修改仓库中的状态
          store.state.isLogin = true;
          // 如果登录成功啦
          // next();
        }
      });
    }
}).$mount('#app')






