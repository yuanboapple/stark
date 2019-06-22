<template>
  <div class="view-container">
    <h2 class="view-title">修改密码</h2>
    <div class="view-body">
      <!-- 第一步, 验证手机 -->
      <el-form v-if="!verificationSuccess" ref="verificationForm" label-width="120px" width="500px">
        <el-form-item label="输入手机号">
          <el-input v-model="verificationForm.tel" type="text" placeholder="请输入您的手机号"></el-input>
        </el-form-item>
        <el-form-item label="输入验证码">
          <el-input v-model="verificationForm.code" type="text" placeholder="请输入短信收到的验证码">
            <el-button slot="append" @click="sendVerification">点击获取验证码</el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitVerification" type="primary">下一步</el-button>
        </el-form-item>
      </el-form>
      <!-- 第二步, 修改密码 -->
      <el-form v-if="verificationSuccess" ref="passwordForm" label-width="120px" width="500px">
        <el-form-item label="密码">
          <el-input v-model="passwordForm.password" type="password" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="passwordForm.repeatpwd" type="password" placeholder="请重新输入新密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitPassword" type="primary">提交修改</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="view-footer"></div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        verificationSuccess: false, // 验证是否通过, 默认未通过, 验证成功后修改此值
        verificationForm: {
          tel: null,
          code: null 
        },
        passwordForm: {
          password: null,
          repeatpwd: null,
        }
      }
    },
    methods: {
      /**
       * 发送验证码请求
       * @return {[type]} [description]
       */
      sendVerification() {
        let config = {
          method: "post",
          data: {
            tel: this.verificationForm.tel,
            userid: sessionStorage.getItem("userId") 
          },
          url: `${this.common.basePath}/admin/admin/codeMsg`
        }
        this.axios(config).then(response => {
          this.$message.success(response.msg)
        }).catch(error => {
          this.$message.error(error.msg)
        })
      },
      /**
       * 提交验证码
       * @return {[type]} [description]
       */
      submitVerification() {
        let config = {
          method: "post",
          data: this.verificationForm,
          url: `${this.common.basePath}/admin/admin/forgetPasswordStep`
        }
        this.axios(config).then(response => {
          this.verificationSuccess = true
          this.$message.success(response.msg)
        }).catch(error => {
          this.$message.error(error.msg)
        })
      },
      /**
       * 提交密码修改
       * @return {[type]} [description]
       */
      submitPassword() {
        let config = {
          method: "post",
          data: {
            password: this.passwordForm.password,
            repeatpwd: this.passwordForm.repeatpwd,
            tel: this.verificationForm.tel
          },
          url: `${this.common.basePath}/admin/admin/setNewPassword`
        }
        this.axios(config).then(response => {
          this.verificationSuccess = false
          this.verificationForm = {
            tel: null,
            code: null,
          }
          this.$message.success(response.msg)
        }).catch(error => {
          this.$message.error(error.msg)
        })
      }
    }
  }
</script>