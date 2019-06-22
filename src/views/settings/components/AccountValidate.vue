<template>
    <div>
             <div class="top-intro-area">
                 <span class="top-intro-text">温馨提示：为了保证您的账户安全，修改密码前请先进行安全验证。</span>
             </div>
             <el-form :model="form" :rules="rules" ref="form" label-width="8rem" size="medium" label-position="right" class="bindPhoneForm">
               <el-form-item label="手机号：" prop="telephone">
                 <el-input v-model="form.telephone"></el-input>
               </el-form-item>
               <el-form-item label="验证码：" id="input-code" prop="code">
                 <el-input v-model="form.code" ></el-input>
                 <el-button class="sys-Btn code-btn"   type="primary" >验证码</el-button>
               </el-form-item>                
             </el-form>     
    </div>
</template>
<script>
export default {
  data() {
    return {
      form:{
        telephone: "",
        code: ""
      },
      rules:{
              telephone: [
                  { required: true, message: '请输入手机号', trigger: 'blur' },
              ],
              code: [
                  { required: true, message: '请输入验证码', trigger: 'blur' },
              ], 
      }
    }
  },  
}
</script>
