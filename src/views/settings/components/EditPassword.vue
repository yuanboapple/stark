<template>
    <div>
        <div class="manageOption">
            <span class="manage-title">为了您的账号安全，请妥善保管您的密码，点击前往修改。</span>
            <el-button class="sys-Btn"   type="primary" @click="editDialogShow = true">修改</el-button>
        </div>
      <el-dialog class="dialog"
           title="修改密码"
           :visible.sync="editDialogShow"
           width="35%"
           >
                <div class="top-intro-area">
                 <span v-if="!isValidateAccount" class="top-intro-text">温馨提示：请牢记修改后的密码，避免遗忘。</span>
                 <span v-else class="top-intro-text">温馨提示：为了保证您的账户安全，修改密码前请先进行安全验证。</span>
               </div>

             <el-form :model="editform" :rules="editRules" ref="editform" label-width="8rem" size="medium" label-position="right" class="bindPhoneForm">
                <template v-if="isValidateAccount">
                   <el-form-item label="手机号：" prop="telephone">
                     <el-input v-model="editform.telephone"></el-input>
                   </el-form-item>
                   <el-form-item label="验证码：" id="input-code" prop="code">
                     <el-input v-model="editform.code" ></el-input>
                     <el-button v-if="!awardBtnRun" class="sys-Btn code-btn" @click="handleAwardCode"   type="primary" >验证码</el-button>
                     <el-button v-else class="sys-Btn code-btn awardCode-Btn-run"   type="primary" >重新获取({{count}})s</el-button>
                   </el-form-item>
                </template>
                <template v-else>
                   <el-form-item label="新密码" prop="newPassword">
                     <el-input v-model="editform.newPassword"></el-input>
                   </el-form-item>
                   <el-form-item label="确认密码" prop="resPassword">
                     <el-input v-model="editform.resPassword"></el-input>  
                   </el-form-item>
                </template>             
             </el-form>
           <span slot="footer" class="dialog-footer">
             <el-button v-if="!isValidateAccount" class="sys-Btn" type="primary" @click="handleConfirmEdit">确 定</el-button> 
             <el-button v-else class="sys-Btn" type="primary" @click="handleNextTep">下一步</el-button> 
             <el-button @click="cancealDislog">取 消</el-button>
           </span>
        </el-dialog>                 
    </div>
</template>
<script>
import { async } from 'q';
export default {
    data() {
        return {
            editDialogShow: false,
            isValidateAccount: false,
            awardBtnRun: false,
            timer:null,
            codeTxt:"获取验证码",
            count: '',
            editform: {
                newPassword: "",
                resPassword: "",
                telephone: "",
                code: ""
            },
            editRules:{
              telephone: [
                  { required: true, message: '请输入手机号', trigger: 'blur' },
              ],
              code: [
                  { required: true, message: '请输入验证码', trigger: 'blur' },
              ], 
                newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
                resPassword: [{ required: true, message: '请再次输入新密码', trigger: 'blur' }]
            }            
        }
    },
    methods: {
        /*
        **获取验证码事件
        */
         handleAwardCode(){
            let _this = this
            this.$refs.editform.validateField("telephone", async function(valid) {
                if(!valid)
                {
                    _this.awardBtnRun = true
                    const Time_COUNT = 60;
                    let resData = await _this.http.get("/platformUser/getRePasswordVerify" ,{tel: _this.editform.telephone})
                    if(resData)
                    {
                      _this.$message.success(resData.msg) 
                    }            
                    if(!_this.timer)
                    {
                        _this.count = Time_COUNT;
                        _this.timer = setInterval(()=>{
                            if(_this.count>0 && _this.count <= Time_COUNT)
                            {
                                _this.count --;
                            }
                            else
                            {
                                _this.awardBtnRun = false
                                clearInterval(this.timer)
                                _this.timer = null
                                _this.codeTxt = "重新获取";
                            }
                        }, 1000)
                    }                  
                }
                
            })
        }, 
        /*
        **点击下一步
        */        
        handleNextTep(){
          this.$refs.editform.validateField(['telephone', 'code'], async (valid) =>{
            
            if(!valid){
              let resData = await this.http.get('/platformUser/checkVerify', {code: this.editform.code})
              if(resData.data.token){
                localStorage.setItem('AVtoken', resData.data.token)
                this.isValidateAccount = false
                this.$refs.editform.clearValidate()
              }
            }
          })
        },
        /*
        **确认修改密码
        */   
        async handleConfirmEdit(){
          let data = {
            tel: this.editform.telephone,
            password: this.editform.newPassword,
            repassword: this.editform.resPassword,
            code: this.editform.code,
            __token__: localStorage.getItem("AVtoken")
          }
          let resData = await this.http.post('/platformUser/resetPassword', data)
          if(resData.code === 200)
          {
            this.$message.success(resData.msg)
          }
        },
        /*
        **取消模态框
        */
      cancealDislog() {
        this.awardBtnRun = false
        this.timer = null
        this.editDialogShow = false
       }
    },
    created() {
      this.isValidateAccount = true
    },    
}
</script>
<style lang="less">
#input-code{
  margin-bottom: 1.6667rem;
  .el-input{
  width: 75%;
  }
  .code-btn{
    width: 20%;
    margin-left: 5%;
    padding: 10px;
  }

} 
</style>

