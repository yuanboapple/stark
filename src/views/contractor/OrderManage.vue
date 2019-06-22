<template>
    <div>
        <div class="contain-head">
            <div class="head-pre"></div>
            <span class="head-title">订单状态</span>
        </div>
        <div class="contain-footer">
             <div class="contain-footer-top">
               <div class="contain-footer-topl">
                   <div  v-for="(item,index) in timeSlotArr" :key="index" @click="handleChooseTimeSlot(item.value)"  :class="`date-option${item.value===condition.timeSlot?' choose':''}`">
                       <span>{{item.title}}</span>
                   </div>                                                                          
               </div>
               <div class="contain-footer-topr">
                  <el-select v-model="condition.type" class="state-input" @change="handleSelectType"  placeholder="订单状态">
                   <el-option label="全部" :value="1"></el-option>
                   <el-option label="未付款" :value="2"></el-option>
                   <el-option label="待确认" :value="3"></el-option>
                   <el-option label="已确认" :value="4"></el-option>
                   <el-option label="已结算" :value="7"></el-option>
                   <el-option label="异常" :value="9"></el-option>
                    <template v-if="$store.state.userData.platform === 'acceptance'">
                     <el-option label="已失效" :value="5"></el-option>
                     <el-option label="已取消" :value="6"></el-option>            
                    </template>
                 </el-select>
                 <template v-if="$store.state.userData.platform === 'stark'">
                  <el-select v-model="condition.searchType" class="order-input" @change="handleSelectSearchType"  placeholder="订单号">
                   <el-option label="订单号" :value="1"></el-option>
                   <el-option label="承兑商名称" :value="2"></el-option>
                   <el-option label="渠道商名称" :value="3"></el-option>
                   <el-option label="商户名称" :value="4"></el-option>
                  </el-select>
                 </template>                                   
                 <el-input v-model="condition.keyword" class="searchTool" :placeholder="$store.state.userData.platform === 'stark'?'':'请输入用户姓名或者订单号'">
                       <i
                        class="el-icon-search el-input__icon"
                        slot="suffix"
                        @click="handleSearchClick(condition.keyword)">
                       </i>
                 </el-input>
                 <el-button class="dowload-Btn" type="primary">导出</el-button>
               </div>               
             </div>
            <div class="contain-footer-bottom">
              <el-table
                    :data="orderList"
                    border
                    style="width: 100%">
                <!-- Stark平台订单管理列表     -->
                <template v-if="$store.state.userData.platform === 'stark'">
                    <el-table-column align="center"
                      prop="acceptance"
                      label="承兑商名称"
                      min-width="100">
                    </el-table-column>  
                    <el-table-column
                      prop="orderNum"
                      label="订单号"
                      min-width="100"
                      align="center">                      
                    </el-table-column>
                    <el-table-column
                      prop="user"
                      label="用户姓名"
                      min-width="120"
                      align="center">
                    </el-table-column>
                    <el-table-column
                      prop="amount"
                      label="订单金额（CNY）"
                      align="center"
                      min-width="80">
                    </el-table-column>
                    <el-table-column
                      prop="currency"
                      label="订单金额（USDT）"
                      align="center"
                      min-width="80">
                    </el-table-column>
                    <el-table-column
                      prop="payTime"
                      label="支付时间"
                      align="center"
                      min-width="90">
                    </el-table-column>                                        
                    <el-table-column
                      label="订单状态"
                      prop="status"
                      align="center"
                      min-width="120">
                      <template slot-scope="scope">
                          <el-tag v-if="scope.row.status.code === 2"  size="medium" type="info">
                            {{scope.row.status.title}}
                          </el-tag>
                          <el-tag v-else-if="scope.row.status.code === 7"  size="medium" type="success">
                            {{scope.row.status.title}}
                          </el-tag>
                          <el-tag v-else-if="scope.row.status.code === 9"  size="medium" type="danger">
                            {{scope.row.status.title}}
                          </el-tag>
                          <el-tag v-else-if="scope.row.status === 4"  size="medium" type="warning">
                            {{scope.row.status.title}}
                          </el-tag>
                          <el-tag v-else  size="medium">
                            {{scope.row.status.title}}
                          </el-tag>                                                                                                                                
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="cost"
                      label="平台手续费（USDT）"
                      align="center"
                      min-width="100">
                    </el-table-column>
                    <el-table-column
                      prop="acceptanceCommission"
                      label="承兑商佣金（USDT）"
                      align="center"
                      min-width="100">
                    </el-table-column>
                    <el-table-column
                      prop="merchant"
                      label="商户名称"
                      align="center"
                      min-width="100">
                    </el-table-column>
                    <el-table-column
                      prop="merchantCommission"
                      label="商户结算金额"
                      align="center"
                      min-width="80">
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      align="center"
                      min-width="100"
                      >
                       <template slot-scope="scope">
                           <div v-if="scope.row.status.code == 9">
                              <el-button  class="sys-text-Btn" @click="_getOrderDetail(scope.row.id)"  type="text" size="small">查看</el-button>
                              <el-button class="sys-text-Btn" @click="dealDialogShow = true;id = scope.row.id;"  type="text" size="small">处理</el-button>
                           </div>
                           <div v-else>
                               <el-button class="sys-text-Btn" @click="_getOrderDetail(scope.row.id)"  type="text" size="small">查看</el-button>                               
                           </div>
                       </template>
                    </el-table-column> 
                </template>
                <!-- 承兑商平台订单管理列表 -->
                <template v-else>
                    <el-table-column align="center"
                      type="index"
                      label="序号"
                      width="50">
                    </el-table-column>  
                    <el-table-column
                      prop="orderNum"
                      label="订单号"
                      min-width="100"
                      align="center">                      
                    </el-table-column>
                    <el-table-column
                      prop="user"
                      label="用户姓名"
                      min-width="120"
                      align="center">
                    </el-table-column>
                    <el-table-column
                      prop="amount"
                      label="订单金额（CNY）"
                      align="center"
                      min-width="80">
                    </el-table-column>
                    <el-table-column
                      prop="currency"
                      label="订单金额（USDT）"
                      align="center"
                      min-width="80">
                    </el-table-column>
                    <el-table-column
                      prop="payTime"
                      label="支付时间"
                      align="center"
                      min-width="90">
                    </el-table-column>                                        
                    <el-table-column
                      label="订单状态"
                      prop="status"
                      class-name="operator-row"
                      align="center"
                      min-width="75">
                      <template slot-scope="scope" >
                          <el-tag v-if="scope.row.status.code === 2"  size="medium" type="info">
                            {{scope.row.status.title}}
                          </el-tag>
                          <el-tag v-else-if="scope.row.status.code === 7"  size="medium" type="success">
                            {{scope.row.status.title}}
                          </el-tag>
                          <el-tag v-else-if="scope.row.status.code === 9"  size="medium" type="danger">
                            {{scope.row.status.title}}
                          </el-tag>
                          <el-tag v-else-if="scope.row.status.code === 4"  size="medium" type="warning">
                            {{scope.row.status.title}}
                          </el-tag>
                          <el-tag v-else  size="medium">
                            {{scope.row.status.title}}
                          </el-tag>                                                                                                                                
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="commission"
                      label="佣金"
                      align="center"
                      min-width="70">
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      align="center"
                      min-width="170"
                      class-name="operator-row"
                      >
                       <template slot-scope="scope" >
                         <el-button  @click="_getOrderDetail(scope.row.id)"  type="primary" class="sys-defalut-Btn" size="mini">查看</el-button> 
                         <el-button v-if="scope.row.status.code == 2"  @click="cancealOrder(scope.row.id)" class="sys-defalut-Btn"  type="warning" size="mini">取消订单</el-button>
                         <template v-else-if="scope.row.status.code == 3">
                           <el-button   @click="confirmOrder(scope.row.id)"  type="success" class="sys-defalut-Btn" size="mini">确认订单</el-button>
                           <el-button   @click="remarkErrorDialog = true;id = scope.row.id" class="sys-defalut-Btn"  type="danger" size="mini">标记异常</el-button>
                         </template>                        
                       </template>
                    </el-table-column>
                    <el-table-column
                      prop="remark"
                      label="异常备注"
                      align="center"
                      min-width="80">
                    </el-table-column> 
                </template>                
            </el-table>
            <div class="footerbottom-bottom">
            <div class="total-title" v-show="total">
            <span class="total-count">2个小时内不确认订单，系统将自动确认订单，并将订单放入结算管理</span>
            </div>    
             <el-pagination
                class="pagination"
                background
                layout="prev, pager, next"
                :page-size="per_page"
                :hide-on-single-page="orderList.length<15"
                :total="total"
                :current-page.sync="condition.page"
                @current-change="handleCurrentPage">
             </el-pagination>            
            </div>             
           </div>               
        </div>
       <el-dialog class="dialog"
           v-if="orderDetail"
           id="order-dialog"
           title="订单详情"
           :visible.sync="detailDialogShow"
           width="50%"
           >
           <el-steps v-if="orderDetail.isCancel"  :active="activeIndex" class="order-detail-step" align-center>
               <el-step class="errorStep" title="订单已取消" description="2019年05月05日16:03:30"></el-step>
           </el-steps> 
           <el-steps v-else-if="orderDetail.isAbnormal"  :active="activeIndex" class="order-detail-step" align-center>
               <el-step class="errorStep" title="订单异常" description="2019年05月05日16:03:30"></el-step>
           </el-steps>                                 
           <el-steps  v-else :active="activeIndex" class="order-detail-step" align-center>
              <el-step  title="待支付"  :description="orderDetail.orderProgress.confirmTime.hasOwnProperty('payTime')?orderDetail.orderProgress.confirmTime.payTime.time:''"></el-step>
              <el-step  title="确认收款" :description="orderDetail.orderProgress.confirmTime.hasOwnProperty('settlementTime')?orderDetail.orderProgress.confirmTime.settlementTime.time:''"></el-step>
              <el-step title="订单完成" :description="orderDetail.orderProgress.confirmTime.hasOwnProperty('confrimOrderTime')?orderDetail.orderProgress.confirmTime.settlementTime.time:''"></el-step>
           </el-steps>
           <div id="order-info" class="info-wrap">
               <span class="info-wrap-title">订单信息</span>
                   <el-row class="info-wrap-item">
                       <el-col :span="10"><span>订单编号：{{orderDetail.orderInfo.orderNum}}</span></el-col>
                       <el-col :span="8" :offset="6"><span>支付方式：{{orderDetail.orderInfo.payType}}</span></el-col>                        
                   </el-row>
                   <el-row class="info-wrap-item">
                       <el-col :span="10"><span>支付账户：{{orderDetail.orderInfo.payer}}</span></el-col>
                       <el-col :span="8" :offset="6"><span>支付时间：{{orderDetail.orderInfo.payTime}}</span></el-col>                        
                   </el-row>
                   <el-row class="info-wrap-item">
                       <el-col :span="10"><span>交易流水号：{{orderDetail.orderInfo.pipelineNum}}</span></el-col>
                       <el-col :span="8" :offset="6"><span>付款金额：{{orderDetail.orderInfo.amount}}元</span></el-col>                        
                   </el-row>
                   <el-row class="info-wrap-item">
                       <el-col :span="10"><span>付款人姓名：{{orderDetail.orderInfo.username}}</span></el-col>                     
                   </el-row>                              
           </div>
           <div id="tokenism-info" class="info-wrap" >
               <span class="info-wrap-title">分润信息</span>
                   <el-row  class="info-wrap-item" v-if="orderDetail.orderSettlement.acceptance">
                       <el-col :span="8"><span>承兑商名称：{{orderDetail.orderSettlement.acceptance.platformName}}</span></el-col>
                       <el-col :span="8" ><span>账号：{{orderDetail.orderSettlement.acceptance.account}}</span></el-col>
                       <el-col :span="8" ><span>佣金：{{orderDetail.orderSettlement.acceptance.commission}}usdt</span></el-col>                           
                   </el-row>
                   <el-row class="info-wrap-item" v-if="orderDetail.orderSettlement.channel">
                       <el-col :span="8"><span>渠道商名称：{{orderDetail.orderSettlement.channel.platformName}}</span></el-col>
                       <el-col :span="8" ><span>账号：{{orderDetail.orderSettlement.channel.account}}</span></el-col>
                       <el-col :span="8" ><span>佣金：{{orderDetail.orderSettlement.channel.commission}}usdt</span></el-col>                        
                   </el-row>
                   <el-row class="info-wrap-item" v-if="orderDetail.orderSettlement.merchant">
                       <el-col :span="8"><span>商户名称：{{orderDetail.orderSettlement.merchant.platformName}}</span></el-col>
                       <el-col :span="8" ><span>账号：{{orderDetail.orderSettlement.merchant.account}}</span></el-col>
                       <el-col :span="8" ><span>佣金：{{orderDetail.orderSettlement.merchant.commission}}usdt</span></el-col>                        
                   </el-row>
                   <el-row class="info-wrap-item">
                       <el-col :span="8"><span>平台佣金：{{orderDetail.orderSettlement.commission}}usdt</span></el-col>                     
                   </el-row>
                   <el-row class="info-wrap-item" id="tokenism-time">
                       <el-col :span="12"><span>分润时间：{{orderDetail.orderSettlement.settlementTime}}</span></el-col>                     
                   </el-row>                                                                     
           </div>
           <div id="action-log" class="info-wrap">
               <span class="info-wrap-title">操作记录</span>
                  <template v-if="orderDetail.confirm.length">
                      <div  v-for="item in orderDetail.confirm" :key="item.confirmUser">
                         <el-row  class="info-wrap-item">
                             <el-col :span="8"><span>① {{item.behavior}}</span></el-col>                         
                         </el-row>
                         <el-row class="info-wrap-item sub-item">
                             <el-col :span="10"><span>操作人：{{item.confirmUser}}</span></el-col>
                             <el-col :span="8" :offset="6"><span>操作时间：{{item.confirmTime}}</span></el-col>                        
                         </el-row>
                         <el-row class="info-wrap-item sub-item">
                             <el-col :span="10"><span>操作备注：无</span></el-col>                     
                         </el-row>                     
                      </div>
                  </template>
                  <span v-else>无</span> 
           </div>
            <span slot="footer" class="dialog-footer">
             <el-button class="sys-Btn" type="primary" @click="detailDialogShow = false">确 定</el-button>
           </span>                      
        </el-dialog>
       <el-dialog class="dialog" 
           id="deal-dialog"
           title="处理"
           :visible.sync="dealDialogShow"
           width="30%"
           >
           <div id="deal-dialog-wrap">
              <div class="dialog-radio">
                <el-radio v-model="state"  label="1">取消订单</el-radio>
              </div>
              <div class="dialog-radio">
                <el-radio v-model="state" label="2">重制订单状态</el-radio>
              </div>
              <div class="dialog-radio">
                <el-radio v-model="state" label="3">确认收款</el-radio>
              </div>
           </div>                                        
            <span slot="footer" class="dialog-footer">
             <el-button class="sys-Btn" type="primary" @click="confirmDeal(id)">确 定</el-button>
           </span>                      
        </el-dialog>
      <el-dialog 
           v-if="$store.state.userData.platform === 'acceptance'"
           class="dialog"
           id="remarkErrorDialog"
           title='提示'
           :visible.sync="remarkErrorDialog"
           width="25%"
           center
           >
        <div id="commission-dialog-wrap">
           <el-form :model="errorInfoForm"  ref="errorInfoForm" label-width="auto" size="medium" label-position="top" class="demo-ruleForm">
               <el-form-item label="异常说明：">
                    <el-input type="textarea" resize="none" v-model="errorInfoForm.remark"></el-input>
               </el-form-item>                                                
           </el-form>
        </div>   
           <span slot="footer" class="dialog-footer">
             <el-button class="sys-Btn" type="primary" @click="submitErrorIntro" >确 定</el-button>               
             <el-button id="cancealBtn" @click="remarkErrorDialog= false">取 消</el-button>
           </span>
       </el-dialog>        
    </div>
</template>
<script>
import { async } from 'q';
export default {
    data() {
        return {
            detailDialogShow: false,
            remarkErrorDialog: false,
            state:'',
            dealDialogShow: false,
            timeSlotArr: [{title:"今天",value:1}, {title:"昨天",value:2}, {title:"近一周",value:3}, {title:"近一月",value:4}, {title:"全部",value:5}],
            id:0,
            condition: {
              timeSlot: 1,
              searchType: 1,
              type: "",
              page: null,
              keyword:'',
            },
            errorInfoForm: {
              remark: ''
            },
            activeIndex: 0,
            per_page:0,
            total:0,
            orderList: [],
            orderDetail: null
        }
    },
    methods:{
        /*
        **获取订单列表
        */
        async _getOrderList(){
         let resData =  await this.http.get(`${this.common.basePath}/order/orderLists.api`, this.condition)
         if(resData.code === 200){
         this.orderList = resData.data.data
         this.per_page = resData.data.per_page
         this.total = resData.data.total
         this.current_page = resData.data.current_page
         }

        },
        /*
        **处理改变页数事件
        */
        async handleCurrentPage(cur){
           this.condition.page = cur
           await this._getOrderListByConditon(this.condition)
        },
        /*
        **选择日期请求订单事件
        */
        async handleChooseTimeSlot(value){
          this.condition.timeSlot = value
          this.condition.page = 1
          await this._getOrderListByConditon(this.condition)
        },
        /*
        **处理下拉订单状态事件
        */
        async handleSelectType(value){
          this.condition.type = value
          this.condition.page = 1
          await this._getOrderListByConditon(this.condition)
        },
        /*
        **处理下拉渠道名称事件
        */
        async handleSelectSearchType(value){
          this.condition.searchType = value
          this.condition.page = 1
          await this._getOrderListByConditon(this.condition)
        },
        /*
        **处理搜索点击事件
        */
        async handleSearchClick(value){
          this.condition.keyword = value
          await this._getOrderListByConditon(this.condition)
          this.condition.page = 1
        },
        /*
        **根据条件请求订单列表
        */
       async _getOrderListByConditon(conditon){
          const _conditon = conditon
          if(this.$store.state.userData.platform === 'acceptance'){
            if(_conditon.hasOwnProperty('searchType'))
            delete _conditon.searchType
          }
          let resData = await this.http.get('/order/orderLists.api', _conditon)
          if(resData.code === 200){
          this.orderList = resData.data.data
          this.per_page = resData.data.per_page
          this.total = resData.data.total
          this.current_page = 1            
          }

       },
       /*
       **确定处理
       */
       async confirmDeal(id){
         let _id = id
        let resData = await this.http.get('/order/handlingExceptionalOrders', {id: _id,action: this.state})
        if(resData.code === 200){
          this.$message.success(resData.msg)
          await this._getOrderList()
          this.dealDialogShow = false
        }
       },
       /*
       **确定提交异常说明
       */ 
      async submitErrorIntro(){
        let data = {
          remark: this.errorInfoForm.remark,
          id: this.id
        }
        let resData = await this.http.post('/order/MarkExceptionalOrder', data)
        if(resData.code === 200){
          this.$message.success(resData.msg)
          this.$refs.errorInfoForm.resetFields()
          this._getOrderListByConditon(this.condition)
        }
      },
       /*
       **承兑商取消订单
       */      
      async cancealOrder(id){
        let _id = id
        let resData = await this.http.get('order/cancelOrder', {id: _id})
        if(resData.code === 200){
          this.$message.success(resData.msg)
          this._getOrderListByConditon(this.condition)
        }
      },
       /*
       **承兑商确认订单
       */
      async confirmOrder(id){
        let _id = id
        let resData = await this.http.get('order/confirmOrder', {id: _id})
        if(resData.code === 200){
          this.$message.success(resData.msg)
          this._getOrderListByConditon(this.condition)
        }
      },
       /*
       **获取订单详情
       */
      async _getOrderDetail(id){
        {
          let _id = id
          let resData = {}
          if(this.$store.state.userData.platform === 'stark'){
            resData = await this.http.get('order/starkOrderDetail', {id: _id})
          } else {
            resData = await this.http.get('order/acceptanceOrderDetail', {id: _id})
          }
          console.log(resData)
          if(resData.code === 200){
            this.orderDetail = resData.data
            this.activeIndex =  Object.keys(this.orderDetail.orderProgress).length?this.orderDetail.orderProgress.orderProgressAction-1:0
            this.detailDialogShow = true
          }
      }                   

    },
},
    async mounted() {
      let query = this.$route.query
      if(Object.keys(query).length){
        for (const key in query) {
          if (this.condition.hasOwnProperty(key)) {
            this.condition[key] = query[key]
          }
        }
      }
      await this._getOrderListByConditon(this.condition)
    },
}
</script>
<style lang="less" scoped>
.contain-footer{
   
    .state-input{
        width: 10vw;
        margin-right: 1.25rem;
    }
    .order-input{
        width: 12vw;
        margin-right: 1.25rem;
    }
    #table
    {
        width: 100%;
        height: 45vh;
        min-height: 0%
    }
}

.info-wrap{
    display: flex;
    padding: 0 4.3333rem;
    flex-direction: column;
    justify-content: space-evenly;
    width: auto;
    border-top: 1px dashed #E6E6E6;
    .info-wrap-title{
        color: #333333;
        font-weight:  bold;
        font-size: 1.5rem;
    }
    .info-wrap-item{
        font-size: 1.3333rem;
        margin-bottom: 0.625rem;
        color: #333333;
    }


}
#order-info{
    height: 19.4167rem;
    margin-top: 3.75rem;
}
#tokenism-info{
    height: 27.3333rem;
    #tokenism-time{
      font-size: 1.8333rem;
      color: #333333;
    }
}
#action-log{
  padding-top: 2.5rem;
  min-height: 3.125rem;
  .sub-item{
    color: #999999;
  }
  .info-wrap-title{
    margin-bottom: 0.83rem;
  }

}
#deal-dialog{
  #deal-dialog-wrap{
    padding: 1.6667rem 3.6667rem;
    padding-bottom: 0; 
 }
 .dialog-radio{
   margin-bottom: 1.6667rem;

   &:last-child
   {
     margin-bottom: 0;
   }
   .el-radio{
      margin-right: 1.25rem;
     font-size: 1.3333rem;
     color: #333333;
     font-weight: normal;
   }
 }
}

</style>
<style lang="less">
#remarkErrorDialog{
  .el-dialog__body{
    padding-top: 0;
    margin-bottom: 20px;
  }
}

.errorStep{
  .el-step__title{
    color: #F56C6C !important;
    border-color: #F56C6C !important;
  }
  .el-step__head {
    color: #F56C6C !important;
    border-color: #F56C6C !important;    
  }
}
.operator-row{
  .cell{
    padding: 0;
    display: flex;
    justify-content: center;
    .el-button{
      margin-left: 5px;
      &:first-child{
        margin-left: 0;
      }
    }
  }

}
</style>

