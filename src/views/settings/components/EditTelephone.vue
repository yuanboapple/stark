<template>
    <div>
        <div class="manageOption">
            <span class="manage-title">您当前绑定的手机号码为：<span class="sys-text">187 **** 7864</span></span>
            <el-button class="sys-Btn"   type="primary" @click="editDialogShow = true">修改</el-button>
        </div> 
        
      <el-dialog class="dialog"
           title="修改手机号"
           :visible.sync="editDialogShow"
           width="35%"
           >
           <template v-if="isValidateAccount">
             <div class="top-intro-area">
                 <span class="top-intro-text">温馨提示：为了保证您的账户安全，修改密码前请先进行安全验证。</span>
             </div>
             <el-form :model="editform" :rules="editRules" ref="editform" label-width="8rem" size="medium" label-position="right" class="bindPhoneForm">
               <el-form-item label="手机号：" prop="telephone">
                 <el-input disabled v-model="editform.telephone"></el-input>
               </el-form-item>
               <el-form-item label="验证码：" id="input-code" prop="code">
                 <el-input v-model="editform.code" ></el-input>
                     <el-button v-if="!awardBtnRun" class="sys-Btn code-btn" @click="handleAwardCode"   type="primary" >验证码</el-button>
                     <el-button v-else class="sys-Btn code-btn awardCode-Btn-run"   type="primary" >重新获取({{count}})s</el-button>
               </el-form-item> 
             </el-form>               
           </template>
           <template v-else>
             <div class="top-intro-area">
                 <span class="top-intro-text">温馨提示：为了保证新的手机号为您自己的手机号码，更改新的手机需要安全验证。</span>                                  
             </div> 
             <el-form :model="neweditform" :rules="neweditRules" ref="neweditform" label-width="8rem" size="medium" label-position="right" class="bindPhoneForm">
               <el-form-item label="手机号：" prop="telephone">
                 <el-input v-model="neweditform.telephone"></el-input>
               </el-form-item>
               <el-form-item label="验证码：" id="input-code" prop="code">
                 <el-input v-model="neweditform.code" ></el-input>
                     <el-button v-if="!awardBtnRun" class="sys-Btn code-btn" @click="handleAwardCode"   type="primary" >验证码</el-button>
                     <el-button v-else class="sys-Btn code-btn awardCode-Btn-run"   type="primary" >重新获取({{count}})s</el-button>
               </el-form-item> 
             </el-form>              
           </template>

            <span slot="footer" class="dialog-footer">
             <el-button v-if="!isValidateAccount" class="sys-Btn" type="primary" @click="handleConfirmEdit">确 定</el-button> 
             <el-button v-else class="sys-Btn" type="primary" @click="handleNextTep">下一步</el-button>               
             <el-button @click="cancealDislog">取 消</el-button>
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
            editDialogShow: false,
            isValidateAccount: false,
            awardBtnRun: false,
            timer:null,
            codeTxt:"获取验证码",
            count: '',  
            neweditform: {
                telephone: '',
                code: ''
            },          
            editform: {
                telephone: JSON.parse(localStorage.getItem("user")).tel,
                code: ''
            },
             editRules:{
              telephone: [
                  { required: true, message: '请输入手机号', trigger: 'blur' },
              ],
              code: [
                  { required: true, message: '请输入验证码', trigger: 'change' },
              ], 
                newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
                resPassword: [{ required: true, message: '请再次输入新密码', trigger: 'blur' }]
            },
             neweditRules:{
              telephone: [
                  { required: true, message: '请输入手机号', trigger: 'blur' },
              ],
              code: [
                  { required: true, message: '请输入验证码', trigger: 'change' },
              ]
            }              

            
        }
    },
    methods: {
        /*
        **获取验证码事件
        */
        async handleAwardCode(){
                    let _this = this
                    let resData = await _this.http.post(_this.isValidateAccount?"/platformUser/getRePasswordVerify":"/platformUser/getRePhoneVerify" ,{tel: _this.isValidateAccount?_this.editform.telephone:_this.neweditform.telephone})
                    if(resData)
                    {
                      _this.$message.success(resData.msg)
                      _this.awardBtnRun = true 
                    const Time_COUNT = 60;
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
        },
        /*
        **点击下一步
        */        
        handleNextTep(){
          this.$refs.editform.validateField(['code'], async (valid) =>{
            if(!valid){
              let resData = await this.http.get('/platformUser/checkVerify', {code: this.editform.code})
              if(resData.data.token){
                localStorage.setItem('AVtoken', resData.data.token)
                this.isValidateAccount = false
                this.$refs.editform.clearValidate()
                this.$refs.neweditform.clearValidate()
                this.awardBtnRun = false
              }
            }
          })
        },
        /*
        **确认修改密码
        */   
        async handleConfirmEdit(){
          let data = {
            tel: this.neweditform.telephone,
            code: this.neweditform.code,
            __token__: localStorage.getItem("AVtoken")
          }
          let resData = await this.http.post('/platformUser/resetPhone', data)
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
