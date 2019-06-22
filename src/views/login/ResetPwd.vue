<template>
    <div>
        <div v-show="!toresetPwd">


        </div>
        <!-- <div v-show="toresetPwd">
            <reset-success v-if="!resetStatus"></reset-success> 
            <reset-error v-else  ></reset-error>
        </div>         -->
    </div>
</template>
<script>
import LoginButton from '../../components/LoginButton.vue'
import ResetSuccess from '../../views/login/ResetSuccess.vue'
import ResetError from '../../views/login/ResetError.vue'
import { setInterval, clearInterval } from 'timers';
import { constants } from 'crypto';
import { debuglog } from 'util';
export default {
    components:{
        "login-button": LoginButton,
        ResetSuccess,
        ResetError
    },
    data () {
        let validateUserName = (rule, value, callback)=> {
            if(value ==='')
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
            } else if(value !== this.form.password){
                callback(new Error("两次输入的密码不正确"))
            } else {
                callback()
            }
        }
        return {
            form:{
                userName:'',
                password:'',
                newPassword:'',
                verifyCode:'',
            },
            toresetPwd:false,
            resetStatus:false,

            awardCodeBtnRun:false,
            rules:{
                userName:[
                    { validator: validateUserName, trigger: 'blur' },
                ],
                password:[
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                ],
                newPassword:[
                    {validator: validatorNewPwd, trigger: 'blur' },
                ],
                verifyCode:[
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                ]                
            }
        }
    },
    methods: {
        awardCode(){
            this.awardCodeBtnRun = true
            const Time_COUNT = 60;
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
        },
        confirmReSet(){ 
        // this.toresetPwd = false;
        // this.resetStatus = false
        // this.$emit("resetSuccess")
        // //重设成功
        // if(true)
        // {
        //     this.resetStatus = true
        //     // this.$emit("resetSuccess")
        // }
        // else
        // {
        // //重设失败
        //     this.resetStatus = false
        // }
        },
        // resetToLogin(){
            
        // },
        // backToreset(){
        //     this.toresetPwd = false;
        // }
        
    },
}
</script>
<style lang="less" scoped>
  #bottomAside{
      position: absolute;
      right: 2vw;
      bottom: 1.3vw;
      font-size: .875rem;
      
      #changeTitle{
          color: #999999;
      }
      a{
          color: #4A90E2;
      }
      #cutMerchant{
          margin-left: 1vw;
      }
      #cutBusiness{
          margin-left: 1.2vw;
      }
  }
</style>

<style lang="less" >
 .resetForm-title
 {
    font-size: 1.25rem;
    margin-bottom: 10vh;
 }
.login-form{
    .verifyCodePart{
    .el-form-item__content{
        position: relative;
    }
}
 .verifyCode-input{
     width: 50%;
 }

 .awardCode-Btn{
     width: 42%;
     position: absolute;
     right: 0;
     bottom: 0.7vh;
     text-align: center;
     border: none;
     border-radius: 0;
     font-size: 10px !important;
     color: #fff;
     background-color: #8BCC9A;
 }
 .awardCode-Btn-run{
     padding-left: 2px;
     padding-right: 2px; 
     background-color: #CCCCCC;
 }
 
}

</style>
