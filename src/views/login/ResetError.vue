<template>
    <div>
        <h2 class="resetSucess-title">设置失败!</h2>
        <div class="loginInfo-part">
            <img id="loginInfo-part-icon" src="../../assets/imgs/mylogin/errorinfo.png" alt="">
            <span id="loginInfo-part-text">请返回重新设置新密码!</span>
        </div>
        <login-button title="返回" ></login-button>       
    </div>
</template>
<script>
import LoginButton from '../../components/LoginButton.vue'
export default {
    components:{
        LoginButton
    },
    data () {
        return {
        }
    },
    methods: {
        // backReset(){
        //     this.$emit("backToreset")
        // }
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
