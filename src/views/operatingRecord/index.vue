<template>
    <div>
        <div class="contain-head">
            <div class="head-pre"></div>
            <span class="head-title">操作记录</span>
        </div>
        <div class="contain-footer">
             <div class="contain-footer-top">
               <div class="contain-footer-topl">
                   <div  v-for="(item,index) in timeSlotArr" :key="index" @click="handleChooseTimeSlot(item.value)"  :class="`date-option${item.value===condition.timeSlot?' choose':''}`">
                       <span>{{item.title}}</span>
                   </div>                                                                            
               </div>
               <div class="contain-footer-topr">
                  <el-select v-model="condition.u_id" class="opearateMan-input" @change="handleSelectOperator"  placeholder="操作员">
                   <el-option v-for="item in opearators" :key="item.id" :label="item.username" :value="item.id"></el-option>
                 </el-select>
                 <el-select v-model="condition.confirm" @change="handleSelectState" class="opearateAction-input"  placeholder="操作行为">
                   <el-option label="确认订单" value="6"></el-option>
                   <el-option label="结算" value="3"></el-option>
                   <el-option label="标记异常" value="2"></el-option>
                   <el-option label="取消订单" value="4"></el-option>
                   <el-option label="重置操作" value="5"></el-option>
                 </el-select>                                   
                 <el-input v-model="condition.keyword" class="searchTool">
                       <i
                        class="el-icon-search el-input__icon"
                        slot="suffix"
                        @click="handleSearchClick(condition.keyword)">
                       </i>
                 </el-input>
                 <el-button class="dowload-Btn" type="primary">下载</el-button>
               </div>               
             </div>
            <div class="contain-footer-bottom">
                <el-table
                    :data="recodeList"
                    border
                    style="width: 100%;">
                    <el-table-column align="center"
                     type="index"
                     label="序号"
                     width="50">
                    </el-table-column>
                    <el-table-column
                      prop="confirmTime"
                      label="操作时间"
                      max-width="100"
                      align="center">                      
                    </el-table-column>                      
                    <el-table-column
                      prop="orderNum"
                      label="订单号"
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
                      label="操作行为"
                      align="center"
                      width="170">
                      <template slot-scope="scope">
                        <span v-if="scope.row.behavior == 3"  type="text" class="success-text"  size="small">{{scope.row.title}}</span>
                        <span v-else-if="scope.row.behavior == 1"  type="text" class="primary-text"  size="small">{{scope.row.title}}</span>
                        <span v-else-if="scope.row.behavior == 2"  type="text" class="danger-text"  size="small">{{scope.row.title}}</span>
                        <span v-else  type="text" class="warning-text"  size="small">{{scope.row.title}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="username"
                      label="操作员"
                      align="center"
                      width="170">
                    </el-table-column>                                                                                                                                            
                </el-table> 
            <el-pagination
                class="pagination"
                background
                layout="prev, pager, next"
                :page-size="per_page"
                :hide-on-single-page="recodeList.length<15"
                :total="recodeList.length"
                :current-page.sync="current_page"
                @current-change="handleCurrentPage"                
                >
            </el-pagination>
            <div style="clear:both;"></div>
            </div>               
        </div>        

    </div>
</template>
<script>
export default {
    data() {
        return {
            condition: {
                keyword:'',
                timeSlot: 1,
                u_id:null,
                confirm:'',
                page:1
            },
            recodeList:[],
            opearators:[],
            per_page:0,//列表每页的页数
            current_page:1,
            timeSlotArr: [{title:"今天",value:1}, {title:"昨天",value:2}, {title:"近一周",value:3}, {title:"近一月",value:4}, {title:"全部",value:5}],
            tableData:[{
                opearateTime: '2017-09-19 12:23:12',
                orderNum: '20190426115521567',
                call: 8000,
                operateAction: "确认订单",
                operateMan: "客服部刘倩"
            }]        
        }
    },
    methods: {
        /*
        **搜索
        */        
        async handleSearchClick(value){
          this.condition.keyword = value
          await this._getRecordList(this.condition)
          this.condition.page = 1
        },
        /*
        **选择日期请求订单事件
        */
        async handleChooseTimeSlot(value){
          this.condition.timeSlot = value
          this.condition.page = 1
          await this._getRecordList(this.condition)
        },
        /*
        **获取操作记录列表
        */
       async _getRecordList(condition){
           let _conditon = condition
           let resData = await this.http.post("/OrderConfirmLog/getLogs.api", _conditon)
           if(resData.code === 200){
               this.recodeList = resData.data.data
               this.per_page = resData.data.per_page
           }   
       },
        /*
        **获取操作员列表
        */
       async _getOperateList(){
           let resData = await this.http.get("/platformUser/getPlatformQuick")
           if(resData.code === 200){
               this.opearators = resData.data
           }
       },       
        /*
        **处理改变页数事件
        */
        async handleCurrentPage(cur){
           this.condition.page = cur
           await this._getRecordList(this.condition)
        },
        /*
        **下拉选择状态
        */
        async handleSelectState(value){
          this.condition.type = value
          await this._getRecordList(this.condition)
          this.condition.page = 1
        },
        /*
        **下拉选择操作员
        */
        async handleSelectOperator(u_id){
          this.condition.u_id = u_id
          await this._getRecordList(this.condition)
          this.condition.page = 1
        },
    },
    async mounted() {
        await this._getOperateList()
        await this._getRecordList(this.condition)
        
    },

}
</script>
<style lang="less" scoped>
.opearateMan-input, .opearateAction-input{
    margin-right: 1.25rem
}
.confirm-btn-text{
    color: #54B3D9;
}
</style>
