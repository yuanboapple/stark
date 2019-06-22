<template>
    <div id="container-Wrap">
        <el-container class="container">
           <el-header id="header">
             <el-row id="headerRow"  align="middle" type="flex">
                <el-col :span="8"> 
                 <span id="logoTitle">Stark</span>
                 <span id="title">承兑支付系统 - 平台管理</span>
                </el-col>
                <el-col :span="3" :offset="13" class="userWrap">
                    <span id="loginUserName">Mr.Stuck</span>
                    <div class="devideline"></div>
                    <img id="logoutImg" src="../../assets/imgs/login/tuichudenglu.png" alt="">
                    <el-button type="text" id="logout" @click="logOut">退出</el-button>
                </el-col>
             </el-row>
           </el-header>
           <el-main class="main-container">
              <div class="contain-head">
                  <span class="head-title">信息确认</span>
              </div> 
              <div class="contain-footer">
                <div id="identity-info">
                   <div class="identity-info-row">
                     名称: <span class="identity-info">{{name}}</span>
                   </div>
                   <div class="identity-info-row">
                     类型: <span class="identity-info">单位</span>
                   </div>
                   <div class="identity-info-row">
                     行业: <span class="identity-info">金融</span>
                   </div>
                   <div class="identity-info-row">
                     账号: <span class="identity-info">{{account}}</span>
                   </div>          
                   <div class="identity-info-row">
                     佣金比例: <span class="identity-info">{{commission}}%</span>
                   </div>
                </div>
                <span id="info-remind">以上信息有疑问？请联系平台进行修改</span>
                <div id="confirmAccount">
                  <span class="accountTitle">火币账号：</span>
                  <el-input v-model="hotAccount"></el-input>
                  <!-- <el-button class="sys-Btn" >确定</el-button> -->
                </div>
                <div id="not-register">
                  还没火币账号？<span class="sys-text">前往注册</span>
                </div>
                <el-button id="startUserBtn" class="sys-Btn" size="" @click="actionPlatform">开始使用</el-button>
              </div>                   
           </el-main>
        </el-container>
    </div>

</template>
<script>
import { async } from 'q';
export default {
    data() {
        return {
          account: '' ,
          name: '',
          commission: '',
          hotAccount: '',
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
        },
        /*
        **获取确认信息
        */
       async _getConfirmInfo(){
         let resData = await this.http.get("/platform/getPlatformActivationInfo")
         if(resData.code === 200){
           this.account = resData.data.account
           this.name = resData.data.name
           this.commission = resData.data.commission
         } 
         
       },
       /*
       **激活账号
       */
      async actionPlatform() {
        let resData = await this.http.get("/platform/activationPlatform", {account: this.hotAccount})
        if(resData.code === 200){
          this.$message.success(resData.msg)
          this.$router.push({name: "incomeManage"});
        }
      }
    },
    async mounted() {
      await this._getConfirmInfo()
    },
    
}
</script>
<style lang="less" scoped>
.main-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  .contain-head{
    margin-bottom: 0;
    .head-title{
      font-size: 1.6rem;
    }
  }
  .contain-footer{
    margin-top: 0;
  }
}
#identity-info{
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
  .identity-info-row{
    margin-bottom: 12px;
    &:last-child{
      margin: 0;
    }
  }
}

#info-remind{
  font-size: 1.2rem;
}
#confirmAccount{
  margin-top: 2.5rem;
  display: flex;
  align-items: center;
    .accountTitle{
      font-size: 1.5rem;
    white-space: nowrap;
  }
}
#not-register{
  margin-top: 10px;
  font-size:1.2rem;
  color: #333; 
}
#startUserBtn{
  margin-top: 20px;
  width: 13.75rem;
}
</style>

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