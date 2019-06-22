<template>
  <div>
        <div class="contain-head">
            <div class="head-pre"></div>
            <span class="head-title">结算管理</span>
            <span class="head-subtitle">承兑商户操作员全部进行确认订单后的订单才会进入结算管理列表</span>
        </div>
        <el-main v-loading="loading">
        <div class="contain-footer" >
             <div class="contain-footer-top">
               <div class="contain-footer-topl">
                    <span class="jiesuan-title">系统提示：当日超过晚上20:00没有结算，系统默认自动全部结算</span>                                                                            
               </div>
               <div class="contain-footer-topr">
                 <el-button class="sys-Btn"  @click="fullSettlementOrder()">全部结算</el-button>
               </div>            
             </div>
            <div class="contain-footer-bottom">
                <el-table
                    :data="orderList"
                    border
                    style="width: 100%;">
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
                      prop="username"
                      label="用户姓名"
                      min-width="100"
                      align="center">                      
                    </el-table-column>                    
                    <el-table-column
                      prop="amount"
                      label="订单金额"
                      align="center"
                      width="130">
                    </el-table-column>
                    <el-table-column
                      prop="payTime"
                      label="支付时间"
                      align="center"
                      width="170">
                    </el-table-column>                    
                    <el-table-column
                      prop="orderType"
                      label="状态"
                      align="center"
                      min-width="140">
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      align="center"
                      min-width="140">
                      <template slot-scope="scope">
                        <el-button type="text" size="mini" class="sys-text-Btn" @click="settlementOrder(scope.row.id)">结算</el-button>
                      </template>
                    </el-table-column> 
                </el-table> 
            <div class="footerbottom-bottom">
            <div class="total-title" v-show="total">
            今日待结算&nbsp;<span class="total-count">{{total}}</span>&nbsp;单
            </div>    
             <el-pagination
                class="pagination"
                background
                layout="prev, pager, next"
                :page-size="15"
                :hide-on-single-page="orderList.length<15"
                :total="total"
                :current-page.sync="condition.page"
                @current-change="handleCurrentPage">
             </el-pagination>           
            </div>                                 
            </div>     
        </div>           
        </el-main>  
            
  </div>
</template>
<script>
  export default {
      data() {
          return {
              loading: false,
              orderList: [],
              total: null,
              condition: {
                page: null
              }
          }
      },
      methods: {
        /*
        **获取承兑待结算订单
        */
       async _getWaitOrderList(condition){
         let resData = await this.http.post('/order/getOrderWaitSettlementLists.api')
         if(resData.code === 200){
           this.orderList = resData.data.data
           this.total = resData.data.total
           this.condition.page = resData.data.current_page
         }
       },
        /*
        **处理改变页数事件
        */
        async handleCurrentPage(cur){
           this.condition.page = cur
           await this._getWaitOrderList(this.condition)
        },
        /*
        **结算订单
        */
        async settlementOrder(id){
          let _id = id
          let resData = await this.http.get('/order/settlementOrder.api', {id: _id})
          if(resData.code === 200){
            this.$message.success(resData.msg)
            await this._getWaitOrderList(this.condition)
          }
        },
        /*
        **结算多条订单
        */
       async fullSettlementOrder(){
         if(this.orderList.length){
         this.loading = true
           let ids = []
           this.orderList.forEach(order => {
             ids.push(order.id)
           });
           let resData = await this.http.get('/order/settlementOrders.api', {id: ids.join(',')})
           if(resData.code === 200){
             this.loading = false
             this.$message.success(resData.msg)
             await this._getWaitOrderList(this.condition)
           }
         }
       }
      },
      async mounted() {
        await this._getWaitOrderList(this.condition)
      },
  }
</script>
<style lang="less" scoped>

.contain-head{
    .head-subtitle{
        color: #666666;
    }

}
.contain-footer-topl{

    display: flex;
    width: 45vw;
    align-items: center;
    color: #666666;
    .jiesuan-title{
        color: #666666;
        font-size: 0.85rem;
    }
}
</style>
