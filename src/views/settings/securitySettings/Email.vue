<template>
  <div class="view-container">
    <h2 class="view-title">邮箱设置</h2>
    <div class="view-body">
      <!-- 有邮箱, 输入邮箱并验证, 完成绑定 -->
      <el-form ref="mailForm" label-width="120px" width="500px">
        <el-form-item :label="stepText">
          <el-input :disabled="operationStep == 1" v-model="mailForm.mail" type="text"></el-input>
        </el-form-item>
        <el-form-item label="输入验证码">
          <el-input v-model="mailForm.code" type="text" placeholder="请输入短信收到的验证码">
            <el-button slot="append" @click="sendVerification('mailForm')">点击获取验证码</el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitVerification" type="primary">下一步</el-button>
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
        operationStep: 0, //操作步骤 0绑定邮箱 1验证旧邮箱 2验证新邮箱
        mailForm: { //绑定邮箱表单
          mail: null,
          code: null 
        },
      }
    },
    computed: {
      stepText () {
        switch(this.operationStep) {
          case 0:
            return "绑定邮箱"
            break;
          case 1:
            return "已有邮箱"
            break;
          case 2:
            return "输入新邮箱"
            break;
        }
      }
    },
    created () {
      //判断用户是否有邮箱, 有则赋值默认邮箱
      if(!this.$store.state.userData.email) {
        this.operationStep = 0
      } else {
        this.operationStep = 1
        this.mailForm.mail = this.$store.state.userData.email
      }
      window.w = this
    },
    methods: {
      /**
       * 发送邮件 用户获取验证码(三种验证方式 都使用同一方法)
       * @return {[type]} [description]
       */
      sendVerification(formName) {
        let config = {
          method: "post",
          data: {
            mail:   this[formName].mail,
            userid: this.$store.state.userData.user_id 
          },
          url: `${this.common.basePath}/admin/admin/sendCodeMailer`
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
        let self = this
        let config = {
          method: "post",
          data:   this.mailForm,
          url:    null
        }
        switch(this.operationStep) {
          case 0:
            config.url = `${this.common.basePath}/admin/admin/bindMail`
            break;
          case 1:
            config.url = `${this.common.basePath}/admin/admin/checkMail`
            break;
          case 2:
            config.url = `${this.common.basePath}/admin/admin/checkMailTwo`
            break;
        }
        self.axios(config).then(response => {
          //成功后步骤更迭, 并将数据保存到session和vuex中
          self.operationStep += 1
          if(self.operationStep > 2) { //新邮箱验证后 重新回到步骤1
            self.$store.commit("updateUserData", {key: "mail", value: self.mailForm.mail})
            self.operationStep = 1
          }
          self.mailForm = {
            mail: null,
            code: null
          }
          self.$message.success(response.msg)
        }).catch(error => {
          self.$message.error(error.msg)
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