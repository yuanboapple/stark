<template>
    <div>
    <div  class="login plateform-login">
        <div class="login-wrap">
            <el-row class="main-wrap">
               <el-col :span="10" id="wrap-left">
               </el-col>
               <el-col :span="14" id="wrap-right">
                   <div v-if="!resetflag" class="login-form-wrap">
                       <h2 class="login-title">Stark</h2>
                       <span class="login-subTitle">Stark承兑支付后台管理系统</span>
                       <el-form class="login-form" ref="form"  :rules="rules" :model="form">
                            <el-form-item prop="userName">
                                 <el-input v-model="form.userName" placeholder="请输入账号/手机号"></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                 <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
                            </el-form-item>
                        <div class="userOptions">
                           <span id="forgetPwd" @click="forgetPwdHandle">忘记密码？</span>    
                           <el-checkbox  v-model="form.checked">记住密码</el-checkbox>                           
                       </div>
                       <el-form-item>
                         <el-button class="login-Btn" @click="handleLogin">登录</el-button>
                       </el-form-item>
                       </el-form>
                   </div>
                   <div v-else-if="resetflag" class="login-form-wrap">    
                     <div v-if="resetStatus===''">
                        <h2 class="login-subTitle">设置新密码</h2>
                        <el-form  class="login-form" ref="resetForm" label-position="left" label-width="6.42vw"
                           :rules="resetRules" :model="resetForm">
                             <el-form-item prop="userName"  label="账号：">
                                  <el-input v-model="resetForm.userName" placeholder="请输入账号/手机号"></el-input>
                             </el-form-item>
                             <el-form-item prop="password" label="新密码：">
                                  <el-input v-model="resetForm.password" type="password" placeholder="新密码"></el-input>
                             </el-form-item>
                             <el-form-item prop="newPassword" label="重输新密码：">
                                  <el-input v-model="resetForm.newPassword" type="password" placeholder="请重新输入设置的新密码"></el-input>
                             </el-form-item>
                             <el-form-item prop="verifyCode" label="验证码：" class="verifyCodePart">
                                  <el-input v-model="resetForm.verifyCode" class="verifyCode-input" placeholder="请输入收到的验证码"></el-input>
                                  <el-button v-if="!awardCodeBtnRun" class="awardCode-Btn" size="mini" @click="awardCode" >{{codeTxt}}</el-button>
                                  <el-button v-else class="awardCode-Btn awardCode-Btn-run" size="mini">重新获取({{count}})s</el-button>
                             </el-form-item>
                            <el-form-item label-width="0px">
                             <el-button class="login-Btn" @click="resPwdHandle">确认</el-button>
                            </el-form-item> 
                        </el-form> 
                        <!-- <div class="bottomAside">
                            <span class="changeTitle">切换至：</span>
                            <span class="cutMerchant" @click="curContractor">承总商后台</span>
                            <span class="cutBusiness" @click="curBusiness" >商户后台</span>
                        </div>                                               -->
                     </div>
                      <div v-else-if="resetStatus">
                        <h2 class="resetSucess-title">设置成功!</h2>
                        <div class="loginInfo-part">
                          <img id="loginInfo-part-icon" src="../assets/imgs/mylogin/succinfo.png" alt="">
                          <span id="loginInfo-part-text">新密码设置成功</span>
                        </div>
                      <el-button class="login-Btn" @click="resetSuccHandle">去登录</el-button> 
                      <div class="bottomAside">
                            <span class="changeTitle">切换至：</span>
                            <span class="cutMerchant" @click='curContractor'>承总商后台</span>
                            <span class="cutBusiness" @click="curBusiness">商户后台</span>
                      </div>                     
                     </div> 
                     <div v-else>
                       <h2 class="resetSucess-title">设置失败!</h2>
                       <div class="loginInfo-part">
                           <img id="loginInfo-part-icon" src="../assets/imgs/mylogin/errorinfo.png" alt="">
                           <span id="loginInfo-part-text">请返回重新设置新密码!</span>
                       </div>
                       <el-button class="login-Btn" @click="backResetHandle">返回</el-button> 
                        <!-- <div class="bottomAside">
                            <span class="changeTitle">切换至：</span>
                            <span class="cutMerchant" @click='curContractor'>承总商后台</span>
                            <span class="cutBusiness" @click="curBusiness">商户后台</span>
                        </div>                      -->
                     
                     </div>                                                                 
                    </div>
                                      
                </el-col>
            </el-row>
        </div>
    </div>
    <!-- <div v-else-if="role === 'acceptance'" class="login contractor-login" >
        <div class="login-wrap">
            <el-row class="main-wrap">
               <el-col :span="10" id="wrap-left">
               </el-col>
               <el-col :span="14" id="wrap-right">
                   <div v-if="!resetflag" class="login-form-wrap">
                       <h2 class="login-title">Stark</h2>
                       <span class="login-subTitle">Stark承兑支付系统 - 承兑商</span>
                       <el-form class="login-form" ref="form"  :rules="rules" :model="form">
                            <el-form-item prop="userName">
                                 <el-input v-model="form.userName" placeholder="请输入账号/手机号"></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                 <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
                            </el-form-item>
                        <div class="userOptions">
                           <span id="forgetPwd" @click="forgetPwdHandle">忘记密码？</span>    
                           <el-checkbox  v-model="form.checked">记住密码</el-checkbox>                           
                       </div>
                       <el-form-item>
                         <el-button class="login-Btn" @click="handleLogin">登录</el-button>
                       </el-form-item>
                       </el-form>
                   </div>
                   <div v-else-if="resetflag" class="login-form-wrap">    
                     <div v-if="resetStatus===''">
                        <h2 class="login-subTitle">设置新密码</h2>
                        <el-form  class="login-form" ref="resetForm" label-position="left" label-width="6.42vw"
                           :rules="resetRules" :model="resetForm">
                             <el-form-item prop="userName"  label="账号：">
                                  <el-input v-model="resetForm.userName" placeholder="请输入账号/手机号"></el-input>
                             </el-form-item>
                             <el-form-item prop="password" label="新密码：">
                                  <el-input v-model="resetForm.password" type="password" placeholder="新密码"></el-input>
                             </el-form-item>
                             <el-form-item prop="newPassword" label="重输新密码：">
                                  <el-input v-model="resetForm.newPassword" type="password" placeholder="请重新输入设置的新密码"></el-input>
                             </el-form-item>
                             <el-form-item prop="verifyCode" label="验证码：" class="verifyCodePart">
                                  <el-input v-model="resetForm.verifyCode" class="verifyCode-input" placeholder="请输入收到的验证码"></el-input>
                                  <el-button v-if="!awardCodeBtnRun" class="sys-Btn awardCode-Btn" size="mini" @click="awardCode" >{{codeTxt}}</el-button>
                                  <el-button v-else class="awardCode-Btn awardCode-Btn-run" size="mini">重新获取({{count}})s</el-button>
                             </el-form-item>
                            <el-form-item label-width="0px">
                             <el-button class="login-Btn" @click="resPwdHandle">确认</el-button>
                            </el-form-item> 
                        </el-form> 
                        <div class="bottomAside">
                            <span class="changeTitle">切换至：</span>
                            <span class="cutMerchant" @click='curContractor'>承总商后台</span>
                            <span class="cutBusiness" @click="curBusiness">商户后台</span>
                        </div>                                              
                     </div>
                      <div v-else-if="resetStatus">
                        <h2 class="resetSucess-title">设置成功!</h2>
                        <div class="loginInfo-part">
                          <img id="loginInfo-part-icon" src="../assets/imgs/mylogin/succinfo.png" alt="">
                          <span id="loginInfo-part-text">新密码设置成功</span>
                        </div>
                      <el-button class="login-Btn" @click="resetSuccHandle">去登录</el-button> 
                      <div class="bottomAside">
                            <span class="changeTitle">切换至：</span>
                            <span class="cutMerchant" @click='curContractor'>承总商后台</span>
                            <span class="cutBusiness" @click="curBusiness">商户后台</span>
                      </div>                     
                     </div> 
                     <div v-else>
                       <h2 class="resetSucess-title">设置失败!</h2>
                       <div class="loginInfo-part">
                           <img id="loginInfo-part-icon" src="../assets/imgs/mylogin/errorinfo.png" alt="">
                           <span id="loginInfo-part-text">请返回重新设置新密码!</span>
                       </div>
                       <el-button class="login-Btn" @click="backResetHandle">返回</el-button> 
                        <div class="bottomAside">
                            <span class="changeTitle">切换至：</span>
                            <span class="cutMerchant" @click='curContractor'>承总商后台</span>
                            <span class="cutBusiness" @click="curBusiness">商户后台</span>
                        </div>                     
                     
                     </div>                                                                 
                    </div>
                                      
                </el-col>
            </el-row>
        </div>
    </div> -->
    <!-- <div v-else class="login business-login" >
        <div class="login-wrap">
            <el-row class="main-wrap">
               <el-col :span="10" id="wrap-left">
               </el-col>
               <el-col :span="14" id="wrap-right">
                   <div v-if="!resetflag" class="login-form-wrap">
                       <h2 class="login-title">Stark</h2>
                       <span class="login-subTitle">Stark承兑支付系统 - 商户</span>
                       <el-form class="login-form" ref="form"  :rules="rules" :model="form">
                            <el-form-item prop="userName">
                                 <el-input v-model="form.userName" placeholder="请输入账号/手机号"></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                 <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
                            </el-form-item>
                        <div class="userOptions">
                           <span id="forgetPwd" @click="forgetPwdHandle">忘记密码？</span>    
                           <el-checkbox  v-model="form.checked">记住密码</el-checkbox>                           
                       </div>
                       <el-form-item>
                         <el-button class="login-Btn" @click="handleLogin">登录</el-button>
                       </el-form-item>
                       </el-form>
                   </div>
                   <div v-else-if="resetflag" class="login-form-wrap">    
                     <div v-if="resetStatus===''">
                        <h2 class="login-subTitle">设置新密码</h2>
                        <el-form  class="login-form" ref="resetForm" label-position="left" label-width="6.42vw"
                           :rules="resetRules" :model="resetForm">
                             <el-form-item prop="userName"  label="账号：">
                                  <el-input v-model="resetForm.userName" placeholder="请输入账号/手机号"></el-input>
                             </el-form-item>
                             <el-form-item prop="password" label="新密码：">
                                  <el-input v-model="resetForm.password" type="password" placeholder="新密码"></el-input>
                             </el-form-item>
                             <el-form-item prop="newPassword" label="重输新密码：">
                                  <el-input v-model="resetForm.newPassword" type="password" placeholder="请重新输入设置的新密码"></el-input>
                             </el-form-item>
                             <el-form-item prop="verifyCode" label="验证码：" class="verifyCodePart">
                                  <el-input v-model="resetForm.verifyCode" class="verifyCode-input" placeholder="请输入收到的验证码"></el-input>
                                  <el-button v-if="!awardCodeBtnRun" class="sys-Btn awardCode-Btn" size="mini" @click="awardCode" >{{codeTxt}}</el-button>
                                  <el-button v-else class="awardCode-Btn awardCode-Btn-run" size="mini">重新获取({{count}})s</el-button>
                             </el-form-item>
                            <el-form-item label-width="0px">
                             <el-button class="login-Btn" @click="resPwdHandle">确认</el-button>
                            </el-form-item> 
                        </el-form> 
                        <div class="bottomAside">
                            <span class="changeTitle">切换至：</span>
                            <span class="cutMerchant" @click='curContractor'>承总商后台</span>
                            <span class="cutBusiness" @click="curBusiness">商户后台</span>
                        </div>                                              
                     </div>
                      <div v-else-if="resetStatus">
                        <h2 class="resetSucess-title">设置成功!</h2>
                        <div class="loginInfo-part">
                          <img id="loginInfo-part-icon" src="../assets/imgs/mylogin/succinfo.png" alt="">
                          <span id="loginInfo-part-text">新密码设置成功</span>
                        </div>
                      <el-button class="login-Btn" @click="resetSuccHandle">去登录</el-button> 
                      <div class="bottomAside">
                            <span class="changeTitle">切换至：</span>
                            <span class="cutMerchant" @click='curContractor'>承总商后台</span>
                            <span class="cutBusiness" @click="curBusiness">商户后台</span>
                      </div>                     
                     </div> 
                     <div v-else>
                       <h2 class="resetSucess-title">设置失败!</h2>
                       <div class="loginInfo-part">
                           <img id="loginInfo-part-icon" src="../assets/imgs/mylogin/errorinfo.png" alt="">
                           <span id="loginInfo-part-text">请返回重新设置新密码!</span>
                       </div>
                       <el-button class="login-Btn" @click="backResetHandle">返回</el-button> 
                        <div class="bottomAside">
                            <span class="changeTitle">切换至：</span>
                            <span class="cutMerchant" @click='curContractor'>承总商后台</span>
                            <span class="cutBusiness" @click="curBusiness">商户后台</span>
                        </div>                     
                     
                     </div>                                                                 
                    </div>
                                      
                </el-col>
            </el-row>
        </div>
    </div>     -->
    </div>

</template>
<script>  
import { nextTick } from 'q';
import { constants } from 'crypto';
export default {
    data () {
        let validatorUserName = (rule, value, callback)=> {
            if(value =='')
            {
                return callback(new Error('请输入账号/手机号'))
            }
            else
            {
              const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
              if(reg.test(value))
              {
                    callback();
                }
                else
                {
                    return callback(new Error('账号/手机号格式不正确'))
                }
            }
        }
        
        let validatorNewPwd = (rule, value, callback)=> {
            if (value === '') {
               callback(new Error("请再次输入新密码")) 
            } else if(value !== this.resetForm.password){
                callback(new Error("两次输入的密码不正确"))
            } else {
                callback()
            }
        }
        return {
            resetflag: false,
            // role: 'stark',
            resetStatus: '',
            timer:null,
            awardCodeBtnRun: false,
            codeTxt:"获取验证码",
            count: '',
            form:{
                userName:'',
                password:'',
                checked:false
            },
            rules:{
                userName:[
                    { validator: validatorUserName, trigger: 'blur' },
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ]                
            },
            resetForm:{
                userName:'13541150319',
                password:'',
                newPassword:'',
                verifyCode:'01Lr51',
            },
            resetRules:{
                userName:[
                    { validator: validatorUserName, trigger: 'blur' },
                ],
                password:[
                    {required: true, message: '请输入新密码', trigger: 'blur' },
                ],
                newPassword:[
                    {required: true, validator: validatorNewPwd, trigger: 'blur' },
                ],
                verifyCode:[
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                ]                
            }
        }
    },
    methods: {
        /*
        **确定重设密码事件
        */      
        forgetPwdHandle() {
            this.resetflag = true
            this.resetStatus = ''
            this.$nextTick(()=>{
              this.$refs.resetForm.resetFields()
            })
            // console.log(this.$refs)
        },
        //获取验证码事件
        awardCode(){
            let _this = this
            this.$refs.resetForm.validateField("userName", (valid)=>{
                if(!valid)
                {
                    this.awardCodeBtnRun = true
                    const Time_COUNT = 60;
                    let config = {
                      method: "GET",
                      params: {
                        //   platform: _this.role,
                          tel: _this.resetForm.userName, 
                      },
                      url: `${_this.common.basePath}/getVerifyForRest.api`
                    }
                    this.axios(config).then((result) => {
                        if(result.code === 200)
                        {
                        console.log(result)
                        }
                    }).catch((err) => {
                        _this.$message.error(err.msg)
                    });                    
                    if(!this.timer)
                    {
                        this.count = Time_COUNT;
                        this.timer = setInterval(()=>{
                            if(this.count>0 && this.count <= Time_COUNT)
                            {
                                this.count --;
                            }
                            else
                            {
                                this.awardCodeBtnRun = false
                                clearInterval(this.timer)
                                this.timer = null
                                this.codeTxt = "重新获取";
                            }
                        }, 1000)
                    }                  
                }
                
            })
        },
        /*
        **确定重设密码事件
        */
        resPwdHandle(){
         let _this = this            
         this.$refs.resetForm.validate((valid)=>{
             if(valid)
             {
               let config = {
                   method: "POST",
                   data: _this.$qs.stringify({
                       tel: _this.resetForm.userName,
                       password: _this.resetForm.password,
                       repassword: _this.resetForm.newPassword,
                    //    platform: _this.role,
                       code: _this.resetForm.verifyCode
                   }),
                   url: `${_this.common.basePath}/index/resetPassword.api`
               }  
               this.axios(config).then((result) => {
                   console.log(result)
                   if(result.code === 200)
                   {
                      this.$refs.resetForm.resetFields()
                      _this.resetStatus = true
                   }
                   else
                   {
                       _this.resetStatus = false
                   }
               }).catch((err) => {
                   _this.$message.error(err.msg)
               });
             }
         })   

        },
        /*
        **重设成功返回登录事件
        */ 
        resetSuccHandle(){
          this.resetStatus = ''
          this.resetflag = false
         
        },        
        /*
        **返回重设密码事件
        */        
        backResetHandle(){
          this.resetStatus = ''
          this.resetflag = true
        },
        /*
        **登录事件
        */
        handleLogin(){
            let _this = this
            let config = {
                method: "POST",
                data: _this.$qs.stringify({
                    username: _this.form.userName,
                    password: _this.form.password,
                    // platform: _this.role   
                }),
                url: `${_this.common.basePath}/login.api`
            }
            this.axios(config).then((result) => {
                if(result.code===200)
                {
                    let userId = result.data.userId
                    let platform = result.data.platform
                    result.data.tel = this.form.userName
                    document.getElementById('app').className = _this.handleRoleInTheme(platform)
                    localStorage.setItem("theme", _this.handleRoleInTheme(platform))
                    _this.$store.commit("saveUserData", JSON.stringify(result.data))
                    localStorage.setItem("user", JSON.stringify(result.data))
                    if(!result.data.isActive){
                        if(platform !== 'stark'){
                            _this.$router.push({name: "identityConfirm"});
                        } else {
                            _this.$router.push({name: "incomeManage"});
                        }
                        
                    } else {
                        _this.$router.push({name: "incomeManage"});
                    }
                }
            }).catch((err) => {
                _this.$message.error(err.msg)
            });
        },
        /*
        **角色匹配不同Theme
        */
        handleRoleInTheme(plateform){
            switch (plateform) {
                case 'acceptance':
                    return 'themeb'
                    break;
                case  'merchant':
                    return 'themec'
                    break;
                case  'channel':
                    return 'themec'
                    break;
                default:
                    return 'themea'
                    break;
            }
        },
        // /*
        // **切换承兑商后台
        // */        
        // curContractor(){
        //     this.resetflag = false
        //     this.$refs.resetForm.resetFields()
        //     this.role = "acceptance"
        // },
        // /*
        // **切换商户后台
        // */        
        // curBusiness(){
        //     this.resetflag = false
        //     this.$refs.resetForm.resetFields()
        //     this.role = "merchant"
        // }
    },
}
</script>
<style lang="less" scoped>
@platformLoginbkg: url(../assets/imgs/mylogin/bg.png);
@contractorLoginbkg: url(../assets/imgs/mylogin/bg1.png);
@businessLoginbkg: url(../assets/imgs/mylogin/bg2.png);

 .login{
     display: flex;
     align-items: center;
     justify-content: center;
     width: 100vw;
     height: 100vh;
     background-size: 100% 100%;
     .login-wrap{
     width: 60vw;
     height: 70vh;
     box-shadow:0px 0px 30px 0px rgba(0,0,0,0.1);
         .main-wrap
         {
             width: 100%;
             height: 100%;
         }
         #wrap-left,#wrap-right{
             height: 100%;  
         }
         #wrap-left{
             background-size: 100% 100%;
         }
         #wrap-right{
             padding-left: 6.4vw;
             padding-top: 5.5vh;
             padding-right: 6.9vw;
             background-color: #fff;
             .login-form-wrap{
                 .login-title{
                     margin: 0;
                     margin-bottom: 6.5vh;
                     font-size: 2.5rem;
                     font-family: PingFangSC-Semibold;
                 }
                 .login-subTitle{
                     color: #333333;
                     font-size: 1.25rem;
                 }
                .login-form{
                    margin-top: 6.5vh;
                 .verifyCodePart{
                   .el-form-item__content{
                       position: relative;
                  }
                 }
                 .verifyCode-input{
                     width: 50%;
                 }
                 .awardCode-Btn{
                     width: 30%;
                     position: absolute;
                     right: 0;
                     bottom: 0.2vh;
                     text-align: center;
                     border: none;
                     border-radius: 0;
                     font-size: .625rem !important;
                     color: #fff;
                  }                 
                 .awardCode-Btn-run{
                     padding-left: 2px;
                     padding-right: 2px; 
                     background-color: #CCCCCC;
                 }
                }
                .userOptions{
                    display: flex;
                    justify-content: space-between;
                    margin-top: 5vh;
                    span{
                        font-size: .8125rem;
                    }
                    #forgetPwd{
                        text-decoration: underline;
                    }
                    #forgetPwd:hover{
                        cursor: pointer;
                    }
                }
             }
             .login-Btn{
               width: 8vw;
               height: 6.2vh;
               cursor: pointer;
               text-align: center;
               padding: 0;
               border: none;
               border-radius: 0;
               font-weight: normal;
               margin-top: 3.8vh;
               font-size: 1.2rem !important;
               color: #fff;
               border-radius: 1.25rem 0 1.25rem 1.25rem;              
           } 
          .resetSucess-title
          {
             font-size: 1.25rem;
             margin-bottom: 14vh;
          }
          .loginInfo-part{
              display: flex;
              align-items: center;
              margin-bottom: 18vh;
              #loginInfo-part-icon{
                  width: 3vw;
                  height: 3vw;
                  margin-right: 1.5vw;
              }
              #loginInfo-part-text{
                  color: #333333;
                  font-size: .875rem;
              }
          }
          .bottomAside{
              position: absolute;
              right: 2vw;
              bottom: 1.3vw;
              font-size: .875rem;
              
              .changeTitle{
                  color: #999999;
              }
              .cutMerchant{
                  margin-left: 1vw;
                  cursor: pointer;
                  text-decoration: underline;
              }
              .cutBusiness{
                  margin-left: 1.2vw;
                  cursor: pointer;
                  text-decoration: underline;
              }
          }          
         }
     }
 }
 .sys-Btn{
     background-color: #54B3D9;
 }
 //Stark平台管理主题样式
 .plateform-login{
   background: @platformLoginbkg fixed top no-repeat; 
   #wrap-left{
    background: url(../assets/imgs/mylogin/leftlogo.png) no-repeat ; 
   }
   #wrap-right{
    .login-form-wrap{
        .login-title{
            color: #3126B0;
        }
    }
    .userOptions{
        #forgetPwd{
            text-decoration: underline;
            color: #3126B0;
        }
    }
    .login-Btn{
      background: linear-gradient(to right, #B4EC51 , #53A0FD);              
    }
    .bottomAside{

        .cutMerchant{
            color: #4A90E2;
        }
        .cutBusiness{
            color: #4A90E2;
        }
    }
    .awardCode-Btn{
        background-color: #8BCC9A;
    }              
   }
 }
//承兑商平台管理主题样式
 .contractor-login{
   background: @contractorLoginbkg fixed top no-repeat;
    #wrap-left{
    background: url(../assets/imgs/mylogin/leftlogo1.png) no-repeat ; 
   }
    #wrap-right{
    .login-form-wrap{
        .login-title{
            color: #492FB4;
        }
    }
    .userOptions{
        #forgetPwd{
            text-decoration: underline;
            color: #492FB4;
        }
    }
    .login-Btn{
      background: linear-gradient(to right, #C86DD7 , #3023AE);              
    }
    .bottomAside{

        .cutMerchant{
            color: #492FB4;
        }
        .cutBusiness{
            color: #492FB4;
        }
    }
    .awardCode-Btn{
        background-color: #C86DD7;
    }                  
   }
 }
 //商户平台管理主题样式
 .business-login{
   background: @businessLoginbkg fixed top no-repeat;
    #wrap-left{
    background: url(../assets/imgs/mylogin/leftlogo2.png) no-repeat ; 
   }
    #wrap-right{
    .login-form-wrap{
        .login-title{
            color: #E07E5A;
        }
    }
    .userOptions{
        #forgetPwd{
            text-decoration: underline;
            color: #E07E5A;
        }
    }
    .login-Btn{
      background: linear-gradient(to right, #FAD972 , #E07E5A);              
    }
    .bottomAside{

        .cutMerchant{
            color: #E07E5A;
        }
        .cutBusiness{
            color: #E07E5A;
        }
    }
    .awardCode-Btn{
        background-color: #E07E5A;
    }                  
   }
 }
</style>
<style lang="less">
 .login{
     .login-form {
         .el-form-item {
          margin-bottom: 2vh;
          input{
             padding: 0;
             height: 3.5vh;
             border: none;
             border-bottom: 1px solid #B3B3B3;
             border-radius: 0;
             font-size: .75rem;
             background: none;
             }
             .el-form-item__label::before{
                 content: '';
                 margin: 0;
             }
             .el-form-item__label{
                 font-size: .8125rem;
             }
         }

     }

 }
</style>
