<template>
    <div>
       <div class="manageOption">
            <span class="manage-title">请绑定您的火币地址。</span>
            <el-button class="sys-Btn"   type="primary" @click="dialogShow = true">修改</el-button>
       </div>
       <el-dialog class="dialog"
           title="绑定火币账号"
           :visible.sync="dialogShow"
           width="47.91rem"
           >
             <div class="top-intro-area">
                 <span class="top-intro-text">温馨提示：为了保证您的账户安全，修改密码前请先进行安全验证。</span>
             </div>
             <el-form :model="form" :rules="hotrules" ref="form" label-width="8rem" size="medium" label-position="right" class="bindPhoneForm">
               <el-form-item label="手机号：" prop="telephone">
                 <el-input v-model="form.telephone"></el-input>
               </el-form-item>
               <el-form-item label="验证码：" id="input-code" prop="code">
                 <el-input v-model="form.code" ></el-input>
                 <el-button class="sys-Btn code-btn"   type="primary" >验证码</el-button>
               </el-form-item>                
             </el-form> 
           <span slot="footer" class="dialog-footer">
             <el-button  class="sys-Btn" type="primary" @click="handleConfirmEdit">确 定</el-button> 
             <el-button @click="dialogShow = false">取 消</el-button>
           </span>             
        </el-dialog>
    </div>

    
</template>
<script>
import AccountValidateVue from './AccountValidate.vue';
export default {
    components: {
      "account-validate": AccountValidateVue
    },
    data() {
        return {
            dialogShow: false,
            form: {
                telephone: '',
                code: ''
            },
            hotrules: {
              telephone: [
                  { required: true, message: '请输入手机号', trigger: 'blur' },
              ],
              code: [
                  { required: true, message: '请输入验证码', trigger: 'blur' },
              ],                   
            },
        }
    },
    methods: {
        async handleConfirmEdit(){
        }
    },
}
</script>
<style lang="less" scoped>
#input-code{
  margin-bottom: 1.6667rem;
  .el-input{
  width: 73%;
  }
  .code-btn{
    margin-left: 5%;
  }

}    
</style>

