<template>
    <div>
        <div class="contain-head">
            <div class="head-pre"></div>
            <span class="head-title">消息通知</span>
        </div>
        <div class="manageOption">
            <span class="manage-title">你的新的订单需要进行确认收款，请点击进行操作。</span>
            <div class="right-Operate">
                <el-button class="sys-Btn"  id="confire-Btn" @click="confirePayDialogShow = true">确认收款</el-button>
                <el-button class="sys-border-Btn"  >查看详情</el-button>
            </div>
        </div>
       <el-dialog class="dialog"
           id="orderConfireDialog"
           title="订单确认收款"
           :visible.sync="confirePayDialogShow"
           width="23%"
           >
             <el-form :model="form"  label-width="auto" size="medium" label-position="right" class="demo-ruleForm">
               <el-form-item label="支付账号：" prop="account">
                   <span class="input-title">{{form.account}}</span>
               </el-form-item>
                <el-form-item label="支付方式：" prop="payWay">
                 <span class="input-title">{{form.payWay}}</span> 
               </el-form-item>
                <el-form-item label="支付金额：" prop="pay">
                 <span class="input-title">{{form.pay}}</span> 
               </el-form-item>
                <el-form-item label="交易流水号：" prop="serialNum">
                 <span class="input-title">{{form.serialNum}}</span> 
               </el-form-item> 
                <el-form-item label="交易时间：" prop="payTime">
                 <span class="input-title">{{form.payTime}}</span> 
               </el-form-item>                                                                                         
             </el-form>
           <span slot="footer" class="dialog-footer">
               <el-button class="sys-Btn" @click="confirePayDialogShow = false">确认</el-button>
           </span>
        </el-dialog>                
    </div>
</template>
<script>
export default {
    data() {
        return {
            confirePayDialogShow: false,
            form: {
                account: "drinktoomuch",
                payWay: "微信支付",
                pay: "5999元",
                serialNum: "7876 6766 5667 6788",
                payTime: "2019-05-06 15:16:49"
            }
            
        }
    },
}
</script>
<style lang="less" scoped>
#confire-Btn{
    margin-left: 1.6667rem;
}
.input-title{
    font-size: 1.3333rem;
    color: #999999;
}

</style>
<style lang="less" >
.manageOption{
    display: flex;
    margin-bottom: 1.666667rem;
    border-radius: .416667rem;
    align-items: center;
    justify-content: space-between;
    padding: 0 4.166667rem;
    height: 12.5rem;
    background-color: #fff;
    .manage-title{
        font-size: 1.333333rem;
        color: #333333;
    }
}
#orderConfireDialog{
    .el-dialog__footer{
     text-align: center;
   }
   .el-button{
         width: 100px;
         height: 50px;
   }

}

</style>
