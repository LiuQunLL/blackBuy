<template>
    <div class="center">
            <div class="el-row">
                <div class="el-col el-col-24">
                    <div class="comp">
                        <div class="goodsinfo routeanimate">
                            <div class="section">
                                <div class="location">
                                    <span>当前位置：</span>
                                    <a href="/index.html">首页</a> &gt;
                                    <a href="javascript:;">支付中心</a>
                                </div>
                            </div>
                            <div class="section">
                                <div class="wrapper">
                                    <div class="bg-wrap">
                                        <div class="nav-tit pay">
                                            <a href="javascript:;" class="selected">支付中心</a>
                                        </div>
                                        <div class="msg-tips">
                                            <div class="icon">
                                                <i class="iconfont icon-check"></i>
                                            </div>
                                            <div class="info">
                                                <strong>订单已支付成功！</strong>
                                                <p>您可以点击这里进入
                                                    <!-- <a href="/user/center/index.html">会员中心</a> -->
                                                    <router-link to="/vipCenter">会员中心</router-link>
                                                     <p>
                                                       还有
                                                       <span class="second">{{second}}</span>
                                                       <span class="num">s</span>去首页
                                                      </p>
                                                    查看订单状态！</p>
                                                <p>如有其它问题，请立即与我们客服人员联系。</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
    export default{
        name:'paySuccess',
        data:function(){
            return{
                //剩余几秒
                second:5,
                //计时器id
                timeId:0,
            }
        },
        created() {
            //开启定时器
            this.timeId=setInterval(()=>{
                this.second--;
                if(this.second==0){
                    //倒计时结束
                    this.$router.push("./index");
                    // 关闭定时器
                 clearInterval(this.timeId);
                }
            },1000)
        },
    }
</script>
<style>

.second {
  font-size: 40px;
  color: green;
  font-weight: 700;
}
.num {
  font-size: 20px;
  color: black;
  font-weight: 700;
}

</style>

