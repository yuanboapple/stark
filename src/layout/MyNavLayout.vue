<template>
    <div id="container-Wrap">
        <el-container class="container">
           <el-header id="header">
             <el-row id="headerRow"  align="middle" type="flex">
                <el-col :span="8"> 
                 <span id="logoTitle">Stark</span>
                 <span id="title" v-if="$store.state.userData.platform==='stark'">承兑支付系统 - 平台管理后台</span>
                 <span id="title" v-else-if="$store.state.userData.platform==='acceptance'">承兑支付系统 - 承兑商管理后台</span>
                 <span id="title" v-else-if="$store.state.userData.platform==='merchant'">承兑支付系统 - 商户管理后台</span>
                 <span id="title" v-else>承兑支付系统 - 渠道商管理后台</span>
                </el-col>
                <el-col :span="3" :offset="13" class="userWrap">
                    <span id="loginUserName">Mr.Stuck</span>
                    <div class="devideline"></div>
                    <img id="logoutImg" src="../assets/imgs/login/tuichudenglu.png" alt="">
                    <el-button type="text" id="logout" @click="logOut">退出</el-button>
                </el-col>
             </el-row>
           </el-header>
            <el-container >
              <my-Nav-bar></my-Nav-bar>
              <el-main  class="main-container">
                  <div class="introWrap">
                    <i class="el-icon-message-solid"></i>
                    <span class="intro-message">消息提示：有新的订单哦</span>
                    <el-button type="text" size="mini">查看</el-button>
                  </div>
                  <router-view></router-view>
              </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import MyNavBar  from '../components/MyNavBar'  
import store from '../store'
export default {
    components:{
    "my-Nav-bar": MyNavBar
    },
    data() {
        return {
        }
    },
    methods: {
        /*
        **用户退出登录 清理登录信息
        */
        async logOut(){
            let resData = await this.http.get('/logout.api')
            if(resData.code === 200){
                this.$message.success(resData.msg)
                localStorage.clear()
                this.$router.replace({name:"mylogin"})
            }
        }
    },
    created() {
    },
}
</script>
<style lang="less" >
.container{
    width: 100%;
    height: 100%;
}
#container-Wrap{
    width: 100%;
    height: 100%;
}
.el-header{
    padding: 0 20px;
    color: #ffffff;
    background-color: #36404A;
    height: 5%;
    #headerRow{
        height: 100%;
    }
    #logoTitle{
        font-size: 1.75rem;
        margin-right: 1.2vw;
    }
    #title{
        font-size: 1.75rem;
    }
    .userWrap{
        display: flex;
        align-items: center;
      #loginUserName{
          font-size: 1rem; 
          margin-right:1.2vw;
      }
      #logoutImg{
          margin-left:1.2vw;
          margin-right: 0.4vw;
      }
      #logout{
          font-size: 1.125rem;
          color: #fff;
      }
      .devideline{
        width: 1px;
        height: 29px;
        background-color: #fff;
    }
    }

}
</style>
