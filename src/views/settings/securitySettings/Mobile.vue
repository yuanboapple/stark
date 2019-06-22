<template>
  <div class="view-container">
    <h2 class="view-title">修改手机</h2>
    <div class="view-body">
      <!-- 第一步, 验证已经绑定的手机 -->
      <el-form v-if="operationStep == 0" ref="verificationFormOld" label-width="120px" width="500px">
        <el-form-item label="手机号">
          <el-input disabled v-model="verificationFormOld.tel" type="text" placeholder="请输入您的手机号"></el-input>
        </el-form-item>
        <el-form-item label="输入验证码">
          <el-input v-model="verificationFormOld.code" type="text" placeholder="请输入短信收到的验证码">
            <el-button slot="append" @click="sendVerificationMsg('verificationFormOld')">点击获取验证码</el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitVerification('verificationFormOld')" type="primary">下一步</el-button>
        </el-form-item>
      </el-form>
      <!-- 第二步, 输入现有手机号并短信验证 -->
      <el-form v-if="operationStep == 1" ref="verificationFormNew" label-width="120px" width="500px">
        <el-form-item label="手机号">
          <el-input v-model="verificationFormNew.tel" type="text" placeholder="请输入新的手机号码"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="verificationFormNew.code" type="text" placeholder="请输入短信收到的验证码">
            <el-button slot="append" @click="sendVerificationMsg('verificationFormNew')">点击获取验证码</el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitVerification('verificationFormNew')" type="primary">提交修改</el-button>
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
        operationStep: 0, // 操作步骤 0验证旧手机 1验证新手机
        verificationFormOld: {
          tel: null,
          code: null 
        },
        verificationFormNew: {
          tel: null,
          code: null
        }
      }
    },
    mounted() {
      this.verificationFormOld.tel = this.$store.state.userData.tel
    },
    methods: {
      /**
       * 发送验证码请求, 验证新手机与旧手机使用同一个接口
       * @return {[type]} [description]
       */
      sendVerificationMsg(formName) {
        let config = {
          method: "post",
          data: {
            tel: this[formName].tel,
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
       * 提交验证码, 根据不同的情况提交手机号和验证码
       * @return {[type]} [description]
       */
      submitVerification(formName) {
        let config = {
          method: "post",
          data: this[formName],
          url: formName == "verificationFormOld" ? `${this.common.basePath}/admin/admin/bindPhone` : `${this.common.basePath}/admin/admin/newPhone`
        }
        this.axios(config).then(response => {
          formName == "verificationFormOld" ? this.operationStep = 1 : this.operationStep = 0
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
            password: this.verificationFormNew.password,
            repeatpwd: this.verificationFormNew.repeatpwd,
            tel: this.verificationFormOld.tel
          },
          url: `${this.common.basePath}/admin/admin/setNewPassword`
        }
        this.axios(config).then(response => {
          this.verificationSuccess = false
          this.verificationFormOld = {
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