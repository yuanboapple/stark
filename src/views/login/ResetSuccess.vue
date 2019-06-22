<template>
    <div>
        <h2 class="resetSucess-title">设置成功!</h2>
        <div class="loginInfo-part">
            <img id="loginInfo-part-icon" src="../../assets/imgs/mylogin/succinfo.png" alt="">
            <span id="loginInfo-part-text">新密码设置成功</span>
        </div>
        <LoginButton title="去登录" @resetLogin="resetLogin"></LoginButton>       
    </div>
</template>
<script>
import LoginButton from '../../components/LoginButton.vue'
import { setInterval, clearInterval } from 'timers';
export default {
    components:{
        LoginButton
    },
    data () {
        return {
        }
    },
    methods: {
        resetLogin(){
            this.$emit("resetToLogin")
        }
    },
}
</script>
<style lang="less" >
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
</style>
