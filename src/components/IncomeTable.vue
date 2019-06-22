<template>
    <div>
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
                 <el-input placeholder="请输入账号或承兑商名称" v-model="condition.keyword" class="searchTool">
                       <i
                        class="el-icon-search el-input__icon"
                        slot="suffix"
                        @click="handleConSearchClick">
                       </i>
                 </el-input>
                 <el-button class="dowload-Btn" size="samll" type="primary">下载</el-button>
               </div>
            </div>
            <div class="contain-footer-bottom">
                <el-table
                    :data="orderList"
                    border
                    style="width: 100%">
                    <el-table-column align="center"
                      prop="time"
                      label="时间"
                      width="160">
                    </el-table-column>  
                    <el-table-column
                      prop="order_num"
                      label="订单号"
                      width="160"
                      align="center">                      
                    </el-table-column>
                    <el-table-column
                      prop="amount"
                      label="订单金额(CNY)"
                      min-width="160"
                      align="center">
                    </el-table-column>
                    <el-table-column
                      prop="currencies"
                      label="订单金额(USDT)"
                      align="center"
                      min-width="170">
                    </el-table-column>
                    <el-table-column
                      prop="currency"
                      label="实时汇率"
                      align="center"
                      min-width="120">
                    </el-table-column>
                    <el-table-column
                      prop="type"
                      label="类型"
                      align="center"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="cost"
                      label="手续费"
                      align="center"
                      min-width="180">
                    </el-table-column>
                    <el-table-column
                      prop="account"
                      label="账号"
                      align="center"
                      min-width="180">
                    </el-table-column>
                    <el-table-column
                      prop="acceptance"
                      label="承兑商名称"
                      align="center"
                      min-width="180">
                    </el-table-column>                                                                                                     
                </el-table>
            <div class="footerbottom-bottom">
            <div class="total-title" v-show="total">
            总计&nbsp;<span class="total-count">{{total}}&nbsp;</span>个订单  
            </div>    
            <el-pagination
                class="pagination"
                background
                layout="prev, pager, next"
                :hide-on-single-page="orderList.length<15"
                :page-size="15"
                :total="total"
                :current-page.sync="condition.page"
                @current-change="handleCurrentPage">
            </el-pagination>              
            </div>    
            </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dateValue:'',

            timeSlotArr: [{title:"今天",value:1}, {title:"昨天",value:2}, {title:"近一周",value:3}, {title:"近一月",value:4}, {title:"全部",value:5}],
            condition: {
              timeSlot: 1,
              page:0,
              keyword: '',
              startTime:'',
              endTime:'',
            },
            total: 0,
            orderList: [],               
        }
    },
    methods: {
        /*
        **搜索
        */      
        async handleConSearchClick(){
          await this._getStarkCountOrder(this.condition)
        },
        /*
        **获取数据统计订单
        */
       async _getStarkCountOrder(condition){
           let _condition = condition
           let resData = {}
           if(this.$store.state.userData.platform==='stark'){
             resData = await this.http.post('/statistics/countOrder', _condition)
           } else if(this.$store.state.userData.platform === 'acceptance'){
             resData = await this.http.post('/statistics/channelCountOrder', _condition)
           } else {
             resData = await this.http.post('/statistics/merchantCountOrder', _condition)
           }
           if(resData.code === 200){
               this.orderList = resData.data.data
               this.total = resData.data.total
           }
       },
        /*
        **选择日期请求订单事件
        */
        async handleChooseTimeSlot(value){
          this.condition.timeSlot = value
          let resData = await this._getStarkCountOrder(this.condition)
        },
        /*
        **处理改变页数事件
        */
        async handleCurrentPage(cur){
           this.condition.page = cur
           this._getStarkCountOrder(this.condition)
        },
        /*
        **确定选择时间
        */        
        async confirmSelectDate(date){
          let _date = date
          if(_date.length){
            this.condition.timeType = 2
            this.condition.startTime = this.common.formatDate(_date[0])
            this.condition.endTime = this.common.formatDate(_date[1])
            this.condition.timeSlot = ''
            this._getStarkCountOrder(this.condition) 
          } else {
            this.condition.timeType = ''
            delete this.condition.startTime
            delete this.condition.endTime
          }

        }
    },
    async mounted() {
      await this._getStarkCountOrder(this.condition)

    },
}
</script>
<style lang="less">


</style>
