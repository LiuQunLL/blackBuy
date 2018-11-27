<template>
    <div class="shopcart">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a>&gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车
                        </h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table
                            width="100%"
                            align="center"
                            class="cart-table"
                            border="0"
                            cellspacing="0"
                            cellpadding="8"
                        >
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" >商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <!-- 有数据的提示内容 -->
                                <tr v-for="(item,index) in goodsList" :key="item.id">
                                    <td>
                                        <el-switch
                                            v-model="item.isSelected"
                                            active-color="#13ce66"
                                            inactive-color="#ff4949">
                                        </el-switch>
                                    </td>
                                    <td>
                                        <img :src="item.img_url" alt="">
                                        <span>{{item.title}}</span>
                                    </td>
                                    <td>{{item.sell_price}}</td>
                                    
                                   
                                    <td>
                                        <el-input-number v-model="item.buycount" :min="0" size="mini"></el-input-number>
                                    </td>
                                     <td>{{item.buycount*item.sell_price}}</td>
                                      <td>
                                        <!-- 删除按钮 -->
                                        <el-button
                                            @click="delOne(item.id)"
                                            type="danger"
                                            icon="el-icon-delete"
                                            circle
                                        ></el-button>
                                    </td>
                                </tr>
                               <!-- 没有数据提示的时候 -->
                                <tr v-show="goodsList.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>
                                                    您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{selectCount}}</b>件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{selectPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button
                                class="button"
                                onclick="javascript:location.href='/index.html';"
                            >继续购物</button>
                            <button
                                class="submit"
                                onclick="formSubmit(this, '/', '/shopping.html');"
                            >立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "shopCart",
  data:function(){
      return{
          //购物车商品数据
         goodsList:[]
      }
  },
  methods:{
     delOne(id){
         this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            //删除成功,就写逻辑从数组中删除
        this.goodsList.forEach((ele,index)=>{
            if(ele.id==id){
               this.goodsList.splice(index,1)
            }
        });

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
     }
  },
  //计算属性
  computed:{
    //选中的个数
    selectCount(){
          let num=0;
        this.goodsList.forEach(ele=>{
          if(ele.isSelected==true){//如果是被选中的状态
             num+=ele.buycount
          }
        });
        return num;
    },
    //选中的金额
    selectPrice(){
       let price=0;
        this.goodsList.forEach(ele=>{
          if(ele.isSelected==true){//如果是被选中的状态
             price+=ele.buycount*ele.sell_price
          }
        });
        return price;
    }
  },
  created() {
       // 生成 数据 id1,id2,id3
    let ids = "";
    // 通过 Vuex获取数据
    for (const key in this.$store.state.cartData) {
      ids += key;
      ids += ",";
    }
    // 取消最后一个,
    // console.log(ids.slice(0,ids.length-1));
    ids = ids.slice(0, ids.length - 1);

      this.$axios
      .get(`http://111.230.232.110:8899/site/comment/getshopcargoods/${ids}`)
      .then(result=>{
        //    console.log(result);
           result.data.message.forEach(ele=>{
             ele.buycount=this.$store.state.cartData[ele.id];
             ele.isSelected = true;
           })
           console.log(result);
           this.goodsList = result.data.message;
           
      })
  },
  //深度监听,购物车里面
  watch:{
      goodsList:{
           handler: function (val, oldVal) {
                let obj={};
                // console.log(val);
                val.forEach(ele=>{
                    obj[ele.id]=ele.buycount
                })


     this.$store.commit('updataCartData',obj)
                
        },
      deep: true
      }
  }
};
</script>
<style >
td img{
    width: 100px;
}
td>span{
    margin-left: 10px;
}
td:nth-child(2){
    display: flex;
    align-items: center;
}
</style>