<template>
  <div>
        <div class="contain-head">
            <div class="head-pre"></div>
            <span class="head-title">结算明细</span>
        </div> 
        <el-main >
        <div class="contain-footer">
             <div class="contain-footer-top">
               <div class="contain-footer-topl">
                   <div  v-for="(item,index) in timeSlotArr" :key="index" @click="handleChooseTimeSlot(item.value)"  :class="`date-option${item.value===condition.timeSlot?' choose':''}`">
                       <span>{{item.title}}</span>
                   </div>                                                                          
               </div>
               <div class="contain-footer-topr">
                 <el-date-picker class="date-picker"
                   v-model="dateValue"
                   type="daterange"
                   range-separator="至"
                   start-placeholder="选择开始时间"
                   end-placeholder="选择结束时间"
                   @change="confirmSelectDate">
                 </el-date-picker>

                 <el-button class="dowload-Btn" type="primary">下载</el-button>
               </div>              
             </div>
            <div class="contain-footer-bottom">
                <el-table
                    
                    :data="orderList"
                    border
                    style="width: 100%;">
                    <el-table-column align="center"
                      prop="settlementTime"
                      label="结算时间"
                      min-width="160">
                    </el-table-column>  
                    <el-table-column
                      prop="orderNum"
                      label="订单号"
                      min-width="140"
                      align="center">                      
                    </el-table-column>
                    <el-table-column
                      prop="commission"
                      label="结算总金额(USDT)"
                      align="center"
                      width="170">
                    </el-table-column>
                    <el-table-column
                      prop="orderType"
                      label="状态"
                      align="center"
                      max-width="140">
                    </el-table-column>                                                                                                     
                </el-table>                
            <div class="footerbottom-bottom">
            <div class="total-title" v-show="total">
            总计&nbsp;<span class="total-count">{{total}}&nbsp;</span>笔订单，结算总金额为&nbsp;<span class="total-count">209124&nbsp;</span>元  
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
              search:'',
              dateValue:'',
              orderList: [],
              
              timeSlotArr: [{title:"今天",value:1}, {title:"昨天",value:2}, {title:"近一周",value:3}, {title:"近一月",value:4}, {title:"全部",value:5}],              
              condition: {
                startTime: '',
                endTime: '',
                page: null,
                timeSlot: 5,
              },
              total: 0
          }
      },
      methods: {
        /*
        **获取承兑已结算订单
        */
       async getOrderSettlementList(condition){
         let _condition = condition
         let resData = await this.http.post('/order/getOrderSettlementLists.api', _condition)
         if(resData.code === 200){
           this.orderList = resData.data.data
           this.total = resData.data.total
          //  this.condition.page = resData.data.current_page
         }
       },
        /*
        **选择日期请求订单事件
        */
        async handleChooseTimeSlot(value){
          this.condition.timeSlot = value
          await this.getOrderSettlementList(this.condition)
          this.condition.page = 1
        },  
        /*
        **处理改变页数事件
        */
        async handleCurrentPage(cur){
           this.condition.page = cur
           await this.getOrderSettlementList(this.condition)
        },
        /*
        **确定选择时间
        */        
        async confirmSelectDate(date){
          let _date = date
          if(!_date){
             this.condition.timeType = ''
             delete this.condition.startTime
             delete this.condition.endTime
             this.condition.page = 1
             this.orderList = []
             this.total = 0  
          } else if(_date.length) {
            this.condition.timeType = 2
            this.condition.startTime = this.common.formatDate(_date[0])
            this.condition.endTime = this.common.formatDate(_date[1])
            this.condition.timeSlot = ''
            this.getOrderSettlementList(this.condition)
          }
        },                     
      },
      async mounted() {
        await this.getOrderSettlementList(this.condition)
      }, 
    
  }
</script>