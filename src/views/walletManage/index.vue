<template>
    <div>
        <div class="contain-head">
            <div class="head-pre"></div>
            <span class="head-title">钱包管理</span>
        </div>
        <div class="contain-middle"> 
            <div id="accountOptions">
               <template  v-if="this.$store.state.userData.platform==='business'">
                   <div id="businessOptions" >
                    <div>
                     <span class="item-title">当前账户余额（usdt）</span>
                     <span class="account-item-value">
                        40000
                     </span>
                    </div>
                    <el-button class="sys-Btn">提现</el-button>
 
                   </div>
  
               </template>
               <template v-else>
                <div class="account-option-item">
                    <span class="item-title">当前账户余额（usdt）</span>
                    <span class="account-item-value">
                        40000
                    <el-button class="sys-Btn" size="mini" id="recharge-btn" @click="rechargeDialog = true">充值</el-button>    
                    </span>
                </div>
                <div class="account-option-item">
                    <span class="item-title">当前保证金余额（usdt）</span>
                    <span class="account-item-value">30000</span>
                </div>
                <div class="account-option-item">
                    <span class="item-title">当前可提现金额（usdt）</span>
                    <span class="account-item-value">
                        10000
                    <el-button class="sys-Btn" size="mini" @click="canshOutDialog = true" id="cashout-btn">提现</el-button>    
                    </span>  
                </div>
               </template> 
                                
            </div>                                             
        </div>        
        <div class="contain-footer">
             <div class="contain-footer-top">
               <div class="contain-footer-topl"> 
                   <span>财务明细</span>                                                                 
               </div>
               <div class="contain-footer-topr">
                 <el-date-picker class="date-picker"
                   v-model="dateValue"
                   type="daterange"
                   range-separator="至"
                   start-placeholder="选择开始时间"
                   end-placeholder="选择结束时间">
                 </el-date-picker>
                 <el-button class="dowload-Btn" type="primary">下载</el-button>
               </div>              
             </div>
            <div class="contain-footer-bottom"> 
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%;"> 
                    <el-table-column
                      prop="time"
                      label="时间"
                      min-width="160"
                      align="center">                      
                    </el-table-column>
                    <el-table-column
                      prop="type"
                      label="类型"
                      min-width="140"
                      align="center">                      
                    </el-table-column>                    
                    <el-table-column
                      prop="call"
                      label="金额（usdt）"
                      align="center"
                      min-width="160">
                    </el-table-column>                  
                    <el-table-column
                      prop="state"
                      label="状态"
                      align="center"
                      min-width="100">
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      align="center"
                      min-width="220">
                      <template>
                          <el-button class="sys-text-Btn" type="text" size="small">查看</el-button>
                          <el-button class="sys-text-Btn" type="text" size="small" @click="cancealPayDialog = true">取消充值</el-button>
                          <el-button class="sys-text-Btn" type="text" size="small">去付款</el-button>
                          <el-button class="sys-text-Btn" type="text" size="small" @click="hasPayDialog = true">我已付款</el-button>
                      </template>
                    </el-table-column>                    
                                                                                                                         
                </el-table>                                
                <el-pagination
                    class="pagination"
                    background
                    layout="prev, pager, next"
                    :total="1000">
                </el-pagination>
                <div style="clear:both;"></div>                
            </div>     
        </div>
       <el-dialog class="dialog"
           title="充值"
           :visible.sync="rechargeDialog"
           width="25%"
           >
             <el-form :model="rechargeForm"  label-width="auto" size="medium" label-position="right" class="demo-ruleForm">
               <el-form-item label="承兑商名称：" prop="contractor">
                   <span class="input-title">{{rechargeForm.contractor}}</span>
               </el-form-item>
                <el-form-item label="账户：" prop="account">
                 <span class="input-title">{{rechargeForm.account}}</span> 
               </el-form-item>                
                <el-form-item label="充值金额：" prop="money" id="rechargeInput">
                 <el-input v-model="rechargeForm.money" placeholder="请输入金额"></el-input> usdt
                 <div><span id="change-intro">目前兑换人民币：4000元</span></div>
               </el-form-item>                             
             </el-form>
           <span slot="footer" class="dialog-footer">
             <el-button class="sys-border-Btn" type="primary" @click="rechargeDialog = false">取消充值</el-button>
             <el-button class="sys-Btn" type="primary" >充值</el-button>               
             <el-button class="sys-border-Btn" type="primary" @click="rechargeDialog = false;hasPayDialog = true">我已付款</el-button> 
           </span>
        </el-dialog>         
       <el-dialog class="dialog"
           title="请输入充值信息"
           :visible.sync="hasPayDialog"
           width="25%"
           >
             <el-form :model="hasPayForm" :rules="hasPayRules"  ref="hasPayForm" label-width="auto" size="medium" label-position="right" class="demo-ruleForm">
               <el-form-item label="火币支付账号：" prop="account">
                   <el-input v-model="hasPayForm.account"></el-input>
               </el-form-item>               
                <el-form-item label="支付金额金额：" prop="pay" id="payInput">
                 <el-input v-model="hasPayForm.pay" placeholder="请输入金额"></el-input> usdt
               </el-form-item>
                <el-form-item label="支付时间：" prop="payTime">
                 <el-input v-model="hasPayForm.payTime"></el-input> 
               </el-form-item> 
                <el-form-item label="支付流水号：" prop="paySerialNum">
                 <el-input v-model="hasPayForm.paySerialNum"></el-input> 
               </el-form-item>                                                           
             </el-form>
           <span slot="footer" class="dialog-footer">
             <el-button class="sys-Btn" type="primary" @click="hasPayDialog = false">确定</el-button> 
             <el-button class="sys-Btn" type="primary" @click="hasPayDialog = false">取消</el-button> 
           </span>
        </el-dialog> 
       <el-dialog class="dialog"
           title="提现"
           :visible.sync="canshOutDialog"
           center
           width="25%"
           >
             <el-form :model="cashoutForm"  label-width="auto" size="medium" label-position="right" class="demo-ruleForm">
                <el-form-item id="accountInput" label="提现币安账户：" prop="account">
                 <el-input v-model="cashoutForm.money"></el-input> 
               </el-form-item>                
                <el-form-item label="提现金额：" prop="money" id="rechargeInput">
                 <el-input v-model="cashoutForm.money"></el-input> usdt
               </el-form-item>                             
             </el-form>
           <span slot="footer" class="dialog-footer">
             <el-button class="sys-Btn" type="primary" @click="canshOutDialog = false">确定</el-button>               
             <el-button class="sys-Btn" type="primary" @click="canshOutDialog = false">取消</el-button> 
           </span>
        </el-dialog>
       <el-dialog class="dialog"
           title="提示"
           :visible.sync="cancealPayDialog"
           center
           width="25%"
           >
           <span>确认取消本次充值？</span>
           <span slot="footer" class="dialog-footer">
             <el-button class="sys-Btn" type="primary" @click="cancealPayDialog = false">确定</el-button>               
             <el-button class="sys-Btn" type="primary" @click="cancealPayDialog = false">取消</el-button> 
           </span>
        </el-dialog>                                                  
    </div>
</template>
<script>
export default {
    data() {
        return {
            dateValue:'',
            rechargeDialog: false,
            hasPayDialog: false,
            canshOutDialog: false,
            cancealPayDialog: false,
            tableData:[
                {
                    time: "2017-08-28 09:38",
                    type: "充值",
                    call: "40000.00",
                    state: "未付款"
                }
            ],
            rechargeForm: {
                contractor: "承兑商A",
                account: "178676555669",
                money: ""
            },
            hasPayForm: {
                account: "",
                pay: "",
                payTime: "",
                paySerialNum: ""
            },
            cashoutForm: {
                account: "",
                money: ""
            },
            hasPayRules:{
                account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
                pay: [{ required: true, message: '请输入金额', trigger: 'blur' }],
                payTime: [{ required: true, message: '请填写支付时间', trigger: 'blur' }],
                paySerialNum: [{ required: true, message: '请输入支付流水号', trigger: 'blur' }],
            }
        }
    },
    methods: {
    },
}
</script>
<style lang="less" scoped>
.contain-footer-topl{
    display: flex;
    align-items: center;
    font-size: 1.3333rem;
    color: #333333;
}
.contain-middle{
    #accountOptions{
        display: flex;
        align-items: center;
        width: 100%;
        height: 13.75rem;
        background-color: #fff;
        .account-option-item{
            width: 33.333%;
            height: 8.3333rem;
        }
    }
    .account-option-item{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
       
        .item-title{
            font-size: 1.3333rem;
            color: #333;
        }
        .account-item-value{
            position: relative;
            font-size: 1.8333rem;
        }
        #recharge-btn,#cashout-btn{
            position: absolute;
            left: 8.75rem;
            bottom: 0;
            color: #fff;

        }
    }
}
.input-title{
    font-size: 1.3333rem;
    color: #999999;
}
#rechargeInput,#payInput,#accountInput{
    .el-input{
        width: 80%;
    }

}
#change-intro{
    font-size: 1.3333rem;
    color: #F5A623;

}
#businessOptions{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 100px;
    .item-title{
        font-size: 1.3333rem;
        color: #333333;
    }
    .account-item-value{
        font-size: 1.6667rem;
    }

}
</style>
