<template>
    <div>
        <div class="contain-head">
            <div class="head-pre"></div>
            <span class="head-title">数据统计（商户）</span>
        </div>
        <template v-if="Object.keys(service).length">
        <div class="contain-middle">
            <div class="statistic-Color-Block">
                  <img src="../../assets/imgs/main/orange.jpg" class="item-bkg" alt="">
                  <span class="item-title">{{service.all.title}}</span>
                  <span class="item-value">{{service.all.data.amount}} ({{service.all.data.company}})</span>
            </div>
            <div class="statistic-Color-Block" >
                  <img src="../../assets/imgs/main/red.jpg" class="item-bkg" alt="">
                  <span class="item-title">{{service.lastMonth.title}}</span>
                  <span class="item-value">{{service.lastMonth.data.amount}} ({{service.lastMonth.data.company}})</span>
            </div>
            <div class="statistic-Color-Block" >
                  <img src="../../assets/imgs/main/purple.jpg" class="item-bkg" alt="">
                  <span class="item-title">{{service.today.title}}</span>
                  <span class="item-value">{{service.today.data.amount}} ({{service.today.data.company}})</span>
            </div>
            <div class="statistic-Color-Block" >
                  <img src="../../assets/imgs/main/blue.jpg" class="item-bkg" alt="">
                  <span class="item-title">{{service.yesterday.title}}</span>
                  <span class="item-value">{{service.yesterday.data.amount}} ({{service.yesterday.data.company}})</span>
            </div>                                                    
        </div>
        </template>
        <div class="contain-footer">
             <div class="contain-footer-top">
               <div class="contain-footer-topl">
                   <div  v-for="(item,index) in timeSlotArr" :key="index" @click="handleChooseTimeSlot(item.value)"  :class="`date-option${item.value===condition.timeSlot?' choose':''}`">
                       <span>{{item.title}}</span>
                   </div>
                <template v-if="$store.state.userData.platform === 'channel'">
                  <el-select v-model="condition.id" class="order-input" @change="handleSelectSearchType"  >
                   <el-option  label="全部" :value="0"></el-option>
                   <el-option v-for=" business in businessList" :key="business.id" :label="business.name" :value="business.id"></el-option>
                  </el-select>
                 </template>                                                                            
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
                 <el-input v-model="condition.keyword" class="searchTool">
                       <i
                        class="el-icon-search el-input__icon"
                        slot="suffix"
                        @click="handleConSearchClick">
                       </i>
                 </el-input>
                 <el-button class="dowload-Btn" type="primary">下载</el-button>
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
                      min-width="160">
                    </el-table-column>  
                    <el-table-column
                      prop="orderNum"
                      label="订单号"
                      min-width="160"
                      align="center">                      
                    </el-table-column>
                    <el-table-column
                      prop="amount"
                      label="订单金额(CNY)"
                      min-width="120"
                      align="center">
                    </el-table-column>
                    <el-table-column
                      prop="currency"
                      label="订单金额(USDT)"
                      align="center"
                      min-width="120">
                    </el-table-column>
                    <el-table-column
                      prop="currencies"
                      label="实时汇率(USDT/CNY)"
                      align="center"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="cost"
                      label="支出手续费(USDT)"
                      align="center"
                      width="100">
                    </el-table-column>                    
                    <el-table-column
                      prop="merchantCommission"
                      label="结算金额(usdt)"
                      align="center"
                      width="100">
                    </el-table-column>
                    <!-- <el-table-column
                      prop="account"
                      label="火币账号"
                      align="center"
                      width="150">
                    </el-table-column> -->
                    <!-- <el-table-column
                      prop="merchant"
                      label="商户名称"
                      align="center"
                      width="100">
                    </el-table-column>                                                                                                      -->
                </el-table>
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
            <div style="clear:both;"></div>
            </div>
        </div>                    
    </div>
</template>
<script>
import IncomeTable from '../../components/IncomeTable.vue'
export default {
    components:{
        "income-table":IncomeTable
     },
    data() {
        return {
            service:{},
            serviceArr:[
                {
                 title: "实时结算金额",
                 USDT: "1552.165",
                 bkg: require("../../assets/imgs/main/orange.jpg")
                },
                {
                 title: "昨日结算额",
                 USDT: "6564.98",
                 bkg: require("../../assets/imgs/main/blue.jpg")
                },
                {
                 title: "月结算量",
                 USDT: "767586.67",
                 bkg: require("../../assets/imgs/main/red.jpg")
                },
                {
                 title: "总结算金额",
                 USDT: "7697687.09",
                 bkg: require("../../assets/imgs/main/purple.jpg")
                },                                                                                                   
            ], 
            timeSlotArr: [{title:"今天",value:1}, {title:"昨天",value:2}, {title:"近一周",value:3}, {title:"近一月",value:4}, {title:"全部",value:5}],
            condition: {
                id: null,
                timeSlot: 1,
                keyword:'',
                startTime:'',
                endTime:'',
                page: null,
            },
            dateValue: '',
            orderList: [],
            businessList: [],
            total:0,
            tableData: [{
                time: "2017-09-19 12:23:12",
                orderNum: "20190426115521567",
                cny: 50,
                usdt: 50,
                rate: "1:1",
                zhichu: 20,
                jiesuan: 30,
                account: "18200113696",
                businessName: "公司A"
            }
            ]
        }
    },
    methods: {
        /*
        **搜索
        */      
        async handleConSearchClick(){
          this.condition.id = 0
          await this._getBusinessOrder(this.condition)
        },
        /*
        **获取商户数据订单
        */
        async _getBusinessOrder(condition)
        {
            let _condition = condition
            let resData = {}
            if(this.$store.state.userData.platform === 'stark'){
              resData = await this.http.post('/statistics/countMerchantOrder.api', _condition)
            } else {
              resData = await this.http.post('/statistics/merchantCountOrder.api', _condition)
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
         if(Object.keys(this.$route.query).length){
            let id = this.$route.query.id
            this.condition.id = id
          }
          this.condition.timeSlot = value
          await this._getBusinessOrder(this.condition)
        },
        /*
        **处理改变页数事件
        */
        async handleCurrentPage(cur){
           this.condition.page = cur
           this._getBusinessOrder(this.condition)
        },
        /*
        **处理下拉渠道选择商户
        */
        async handleSelectSearchType(value){
          this.condition.id = value
          this.condition.page = 1
          await this._getBusinessOrder(this.condition)
        },
        /*
        **获取渠道商下商户
        */
        async _getBusinessInChannel(){
          let resData = await this.http.get('/statistics/searchChannelMerchantQuick')
          if(resData.code === 200){
            this.businessList = resData.data
          }
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
          } else if(_date.length){
            this.condition.timeType = 2
            this.condition.startTime = this.common.formatDate(_date[0])
            this.condition.endTime = this.common.formatDate(_date[1])
            this.condition.timeSlot = ''
            this._getBusinessOrder(this.condition) 
          }
        }        
        
    },
    async mounted() {
       if(Object.keys(this.$route.query).length){
         let id = this.$route.query.id
         this.condition.id = id
       }
       else{
         await this._getBusinessOrder(this.condition)
         if(this.$store.state.userData.platform === 'channel'){
           await this._getBusinessInChannel()
         }
       }
       
    },
}
</script>
<style lang="less" scoped>
.contain-middle{
    display: flex;
}
.statistic-Color-Block{
     display: flex;
     justify-content: space-evenly;
     width: 24.25%;
     margin-right: 1%;
     height: 18vh;
     &:last-child{
         margin-right: 0;
     }
      .item-title{
     z-index: 8;
     }
      .item-value{
     z-index: 8;          
      }
 }
 .order-input{
   margin-left: 20px;
 }
</style>
