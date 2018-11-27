<template>
  <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <ProductZoomer v-if="images.normal_size.length !=0"
                                   :base-images="images"
                                   :base-zoomer-options="zoomerOptions"
                                 />
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                              <el-input-number v-model="num1" :min="1" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button  @click="add2Cart" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">

                            <!-- 使用ivew的组件图钉 -->
                            <Affix>
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a href="javascript:;"  @click="tabIndex=0" :class="{selected:tabIndex==0}">商品介绍</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;"  @click="tabIndex=1" :class="{selected:tabIndex==1}" >商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            </Affix>
                            <div class="tab-content entry" v-show="tabIndex==0" v-html="goodsinfo.content">
                                内容
                            </div>
                            <div class="tab-content" v-show="tabIndex==1">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea 
                                                v-model.trim="comment"
                                                id="txtContent" 
                                                name="txtContent" 
                                                sucmsg=" " 
                                                datatype="*10-1000" 
                                                nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input 
                                                @click="submitComment"
                                                 id="btnSubmit"
                                                 name="submit" 
                                                 type="submit" 
                                                 value="提交评论" 
                                                 class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="totalcount==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item,index) in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | shortTimePlus}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <!-- 分页.是ivew里面的插件 -->
                                        <Page :total="totalcount"
                                        :current="pageIndex"
                                        show-sizer 
                                        placement="top" 
                                        show-elevator
                                       @on-change="pageChange"
                                        @on-page-size-change="sizeChange"
                                        :page-size-opts="[6,8,12]" 
                                        :page-size="pageSize"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item,index) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/detail/'+item.id">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                                <img :src="item.img_url">
                                            <!-- </a> -->
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/detail/'+item.id">{{item.title}}</router-link>
                                            <span>{{item.add_time | shortTime}}</span>
                                        </div>
                                    </li>
                                   
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BackTop></BackTop>
</div>
</template>

<script>
    export default{
        name:"detail",
        data:function(){
            return{
                //商品id
                artID:"",

                // 商品详情列表
                goodsinfo: {},

                //右侧热卖商品列表
                hotgoodslist:[],

                //图片列表
                imglist:[],
                
                //记录购买数量
                num1:1,

                 // 记录点击的tab栏索引
                tabIndex: 0,

                // 页码
                pageIndex: 1,
                // 页容量
                pageSize: 6,

                // 评论内容
                comments: [],
                // 总评论数
                totalcount: 0,

                //评论内容
                comment:"",

                //放大镜图片
                images: {
                   // required  必须
                normal_size: [
                    // {'id':'unique id', 'url': 'image url'},      
                    // {'id':'unique id', 'url': 'image url'}  
                    ]
             },

            //  放大镜设置
            zoomerOptions:{
                  'zoomFactor': 3,
                  'pane': 'pane',
                  'hoverDelay': 300,
                  'namespace': 'zoomer',
                  'move_by_click':false,
                  'scroll_items': 7,
                  'choosed_thumb_border_color': "#dd2c00"
            }
            }
        },
        methods:{
            initData(){
                // 初始化购买个数
                    this.num1 = 1;
                    this.artID = this.$route.params.artID;
            this.$axios
            .get(`http://111.230.232.110:8899/site/goods/getgoodsinfo/${this.artID}`)
            .then(result=>{
                //  console.log(result);
                 this.goodsinfo=result.data.message.goodsinfo;
                 this.hotgoodslist=result.data.message.hotgoodslist
                 this.imglist=result.data.message.imglist
                   // 设置给 放大镜的数据.图片地址
                this.images.normal_size = [];
                // 循环添加数据
                this.imglist.forEach(v=>{
                this.images.normal_size.push({
                  id:v.id,
                  url:v.original_path
              })
          })
                
            });
            // 调用获取评论的方法
           this.getComments();


            },
             // 获取评论数据
            getComments() {
            // 获取评论信息
            this.$axios
            .get(
              `http://111.230.232.110:8899/site/comment/getbypage/goods/${
                this.artID
              }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
            )
            .then(result => {
            //   console.log(result);
              // 评论信息
              this.comments = result.data.message;
              // 总个数
              this.totalcount = result.data.totalcount;
            });
    },

    // 页码改变
    pageChange(pageIndex) {
    //   console.log(pageSize);
      this.pageIndex = pageIndex;
      // 重新获取这一页的数据
      this.getComments();
    },
    // 页容量改变6条,8条
    sizeChange(pageSize) {
      // console.log(pageSize);
      this.pageSize = pageSize;
      // 重新获取评论数据即可
      this.getComments();
    },

    //提交评论
    submitComment(){
      if(this.comment==""){
          this.$Message.warning('不允许为空');
      }else{
           // 有内容
        this.$axios
          .post(`http://111.230.232.110:8899/site/validate/comment/post/goods/${this.artID}`, {
            commenttxt: this.comment
          })
          .then(result=>{
            //   console.log(result);
              //成功
              if(result.data.status==0){
                  this.$Message.success(result.data.message);//返回成功的内容
                  //清空评论
                  this.comment="";
                  // 初始化页面为 1 才能看到自己的评论
              this.pageIndex = 1;
              // 重新获取评论
              this.getComments();
              }else{

              }
          })
      }
    },
    // 加入购物车
    add2Cart(){
        // 获取商品id
        // 获取购买数量

        // 提交载荷
        this.$store.commit('add2Cart',{
            goodId:this.artID,
            goodNum:this.num1
        })

        //提示用户加入成功
         this.$notify({
          title: 'success',
          message: '加入购物车成功',
          type: 'success',
          duration:1000
        });
    }
        },

         created(){
             // 保存数据
           this.initData();
           this.getComments()
        },
          // 侦听器
   watch: {
    $route(newVal, oldVal) {
      //   console.log('数据变了');
      // 重新获取数据即可
      //   this.created();
      this.images.normal_size=[]

      // 初始化数据
      this.initData();

    }
  }
       

    }
</script>
<style>
.tab-content img {
  display: block;
  max-width: 100%;
}

.zoomer-zoomer-box{
    width: 380px;
    /* height: 320px; */
}
.thumb-list img{
    width: 100px;
    height: 100px;
}
</style>

