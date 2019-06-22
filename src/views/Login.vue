<template >
  <div id="login">
    <div class="logo-group">
      <img src="../assets/imgs/login/logo.png">
      <img src="../assets/imgs/login/i-Chengdu.png">
    </div>
    <div class="login-form-wrap">
        <h3 class="login-title">欢迎登录</h3>
        <el-form
          :model="loginForm"
          :rules="rules2"
          ref="loginForm"
          class="login-form"
          label-position="left"
          label-width="0px">
          <el-form-item prop="user_name">
            <el-input
              v-model="loginForm.user_name"
              auto-complete="off"
              placeholder="在此输入你的账号..."
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="loginForm.password"
              auto-complete="off"
              placeholder="在此输入你的密码..."
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitLogin"
              :loading="logining"
              class="login-button">
              登录
            </el-button>
          </el-form-item>
        </el-form>
    </div>
    <div class="right-img"><img src="../assets/imgs/login/134.png"></div>
    <div class="bottom-text-group">
      <p>i - Chengdu后台管理系统</p>
      <p>i-Chengdu Background Management System</p>
      <p>@2019 四川与燕科技有限公司 - 技术支持</p>
    </div>
  </div>
</template>


<script>
  
  export default {
    data() {
      return {
        logining: false,
        loginForm: {
          user_name: "admin",
          // admin
          password: null,
          // 123456
        },
        rules2: {
          account: [
            { required: true, message: "请输入账号", trigger: "blur" }
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: "请输入密码", trigger: "blur" }
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
       handleReset2() {
         this.$refs.loginForm.resetFields();
         console.log(this.$refs.loginForm.resetFields);
       },
       submitLogin() {
        var self = this;
        let config = {
          method: "post",
          data: self.loginForm,
          url: `${self.common.basePath}/admin/admin/adminLogin`
        }
        self.axios(config).then(response => {
          //保存相关信息至session并设置请求头
          self.$store.commit('saveUserData', JSON.stringify(response.data))
          sessionStorage.setItem("user", JSON.stringify(response.data))
          sessionStorage.setItem("userId", response.data.user_id)
          sessionStorage.setItem("token", response.data.token)
          self.axios.defaults.headers.common['token'] = response.data.token;
          self.$router.push({name: "memberManage"})
        }).catch(error => {
          self.$message.error(error.msg)
        })
      //    this.$refs.loginForm.validate(valid => {
      //      if (valid) {
      //        //_this.$router.replace('/table');
      //        this.logining = true;
      //        //NProgress.start();
      //       var loginParams = {
      //          username: this.loginForm.account,
      //          password: this.loginForm.checkPass
      //       };
      //        requestLogin(loginParams).then(data => {
      //        this.logining = true;
      //          //NProgress.done();
      //          let { msg, code, user } = data;
      //          if (code !== 200) {
      //            this.$message({
      //              message: msg,
      //              type: "error"
      //            });
      //         } else {
      //            sessionStorage.setItem("user", JSON.stringify(user));
      //          // console.log)
      //          this.$router.push({ path: "/memberDetail1" });
      //          }
      //     });
      //     } else {
      //      console.log("error submit!!");
      //        return false;
      //     }
      // });
      }
    }
  };
</script>

<style lang="scss" scoped>
  #login {
    width: 100vw;
    min-height:100vh;
    background: url(../assets/imgs/login/Group.png) fixed top no-repeat;
    background-size: 100vw 100vh;
    .logo-group {
      position: absolute;
      top: 20vh;
      left: 15vw;
      & * {
        height: 60px;
      }
      & img:first-child {
        margin-right: 20px;
      }
    }
    .login-form-wrap {
        z-index: 9;
        position: absolute;
        left: 15vw;
        top: 35vh;
        width: 326px;
      .login-title {
        color: #fff;
      }
    }
    .right-img {
      position: absolute;
      top: 300px;
      right: 15vw;
      & img  {
        width: 50vh;
      }
    }
    .bottom-text-group {
      position: fixed;
      bottom: 0;
      width: 100vw;
      & * {
        text-align: center;
      }
      & p:first-child {
        margin-bottom: 0;
        font-size: 24px;
      };
      & p:nth-child(2) {
        margin-top: 0; 
        font-size: 13px;
        color: #ccc;
      };
      & p:last-child {
        font-size: 14px;
      };
    }
  }
</style>

<style lang="scss">
  #login {
    .login-form {
      .el-form-item input {
        &::-webkit-input-placeholder {
          color: #ccc;
        }
        color: #fff;
        border: none;
        border-bottom: 1px solid #fff;
        border-radius: 0;
        background: none;
      }
      .login-button {
        width: 150px;
        color: #000;
        border-radius: 10px 0 10px 10px;
        border-color: #fff;
        background: #fff;
      }
    }
  }
</style>