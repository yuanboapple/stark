<template>
    <div>
        <div class="contain-footer-top">
          <div class="contain-footer-topl">                    
            <el-button class="sys-Btn" @click="channelDialogVisible = true;" type="primary">新增渠道商</el-button>
          </div>
          <div class="contain-footer-topr"> 
            <el-input v-model="condition.keyword" class="searchTool">
                  <i
                   class="el-icon-search el-input__icon"
                   slot="suffix"
                   @click="handleConSearchClick">
                  </i>
            </el-input>                                          
          </div>                        
        </div>
        <div class="contain-footer-bottom">
            <el-table
                :data="channelList"
                border
                style="width: 100%">
                <el-table-column align="center"
                  type="index"
                  label="ID"
                  width="80">
                </el-table-column>  
                <el-table-column
                  prop="account"
                  label="币安账号"
                  min-width="140"
                  align="center">                      
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="渠道商名称"
                  width="100"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="company"
                  label="用户类型"
                  align="center"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="registerTime"
                  label="创建时间"
                  align="center"
                  min-width="180">
                </el-table-column>                    
                <el-table-column
                  label="操作"
                  align="center"
                  min-width="220">
                  <template slot-scope="scope">
                      <el-button class="sys-text-Btn" size="small" @click="handleEditChannel(scope.row.id)" type="text">编辑</el-button>
                      <el-button class="sys-text-Btn" size="small"  type="text" @click="handleViewBusiness(scope.row.id)">查看旗下商户</el-button>
                      <el-button class="sys-text-Btn" size="small" @click="handleViewData(scope.row.id)"  type="text">数据统计</el-button>
                      <el-button v-if="scope.row.isFrozen" @click="enableAccount(scope.row.id)"   size="mini" type="success">启用</el-button>
                      <el-button v-else @click="handleFrozenAccount(scope.row.id)"  size="mini" type="danger">禁用账户</el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  label="账号状态"
                  align="center"
                  width="150">
                  <template slot-scope="scope">
                      <span v-if="!scope.row.isActive" class="no-activeBtn" type="text">未激活</span>
                      <span v-else type="text" class="activeBtn">激活</span>
                  </template>
                </el-table-column>                                                                                                 
            </el-table>            
        </div>
      <el-pagination
          class="pagination"
          background
          layout="prev, pager, next"
          :hide-on-single-page="total<=15"
          @current-change="handleCurrentchange"
          :current-page = "condition.page"
          :page-size="15"
          :total="total">
      </el-pagination>
      <div style="clear:both;"></div> 
      <!-- 新增渠道商Dialog          -->
       <el-dialog class="dialog" id="addContraDialog"
           :title="isEdit?'修改渠道商':'新增渠道商'"
           :visible.sync="channelDialogVisible"
           width="35%"
           @close="addChanneldialogClose"
           >
             <el-form :model="channelForm" :rules="channelRules" ref="channelForm" label-width="auto" size="medium" label-position="right" class="demo-ruleForm">
               <el-form-item label="渠道商名称：" prop="channelName">
                 <el-input  v-model="channelForm.channelName"></el-input>  
               </el-form-item>
                <el-form-item label="账号（手机号）：" prop="account">
                 <el-input :disabled="isEdit"  v-model="channelForm.account"></el-input>  
               </el-form-item>               
                <el-form-item v-if="!isEdit" label="密码：" prop="password">
                 <el-input  v-model="channelForm.password"></el-input>  
               </el-form-item>
                <el-form-item id="chooseQxbusi" :label="isEdit?'修改旗下商户':'选择旗下商户：'" prop="goods">
                  <div class="tagInfos" v-if="businessTags.length">
                    <el-tag
                     :key="tag.id"
                     v-for="tag in businessTags"
                     closable
                     :disable-transitions="false"
                     @close="handleClose(tag)">
                     {{tag.name}}
                    </el-tag>
                  </div>
                  <el-button  class="sys-Btn" size="mini" @click="handlenBusinessDialogShow(businessTags)">去选择</el-button>
                </el-form-item>               
                <el-form-item label="设置佣金："  prop="commission">
                 <el-input  class="commission-input" v-model="channelForm.commission"></el-input> %
                 <div>
                     <span class="commission-info">商户收到的每一笔费用将抽成比例佣金返给渠道商币安账户，请谨慎操作</span>
                 </div>                   
               </el-form-item>               
             </el-form>
           <span slot="footer" class="dialog-footer">

             <el-button v-if="!isEdit" class="sys-Btn" type="primary" @click="handleAddChannel">确 定</el-button> 
             <el-button v-else class="sys-Btn" type="primary" @click="handleConfirmEditChannel">确定</el-button>              
             <el-button @click="channelDialogVisible = false">取 消</el-button>
           </span>   
        </el-dialog>  
           <!-- 选择商户模态框 -->
         <el-dialog class="dialog"
           title="选择商户"
           :visible.sync="chooseBusinessDialogVisible"
           id="chooseBusinessDia"
           width="35%"
           >
            <div id="searchBar">
             <div><el-input v-model="busiSearch" class="searchTool"></el-input>
             <el-button class="sys-Btn" @click="handleChooseBusiness">搜索</el-button></div>
           </div>
           <template v-if="businessArr">
           <div>
             <el-table  :data="businessArr"  ref="businessArrTable" border style="width:100%">
               <el-table-column type="selection" label="选择" align="center" width="50"></el-table-column>
               <el-table-column type="index" label="序号" align="center" min-width="50"></el-table-column>
               <el-table-column property="name" align="center" label="商户名称" min-width="120"></el-table-column>
             </el-table>
           </div>
            <el-pagination
                class="pagination"
                background
                layout="prev, pager, next"
                :hide-on-single-page="total<=page"
                :total="total"
                :page-size.sync="page"
                >
            </el-pagination>  
           <span slot="footer" class="dialog-footer">
             <el-button class="sys-Btn" type="primary" @click="handleConfireChoose">确 定</el-button>               
             <el-button @click="chooseBusinessDialogVisible = false">取 消</el-button>
           </span>
           </template>

        </el-dialog>
           <!-- 选择旗下商户模态框 -->
         <el-dialog class="dialog"
           title="旗下商户"
           id="viewBusinessDia"
           :visible.sync="viewBuisinessDialogShow"
           width="35%"
           >
           <div>
             <el-table    :data="inBusiness.data"  ref="businessArrTable2" border style="width:100%">
               <el-table-column type="index" label="ID" align="center" min-width="50"></el-table-column>
               <el-table-column property="name" align="center" label="商户名称" min-width="80"></el-table-column>
               <el-table-column property="commission" align="center" label="佣金" min-width="80"></el-table-column>
               <el-table-column property="createTime" align="center" label="创建时间" min-width="100"></el-table-column>
             </el-table>
           </div>
            <el-pagination
                class="pagination"
                background
                layout="prev, pager, next"
                :hide-on-single-page="inBusiness.total<=inBusiness.per_page"
                :total="inBusiness.total"
                :page-size.sync="inBusiness.per_page"
                >
            </el-pagination>  
        </el-dialog>         
 
    </div>
</template>
<script>
import { async } from 'q';
export default {
    data() {
        return {
            channelDialogVisible: false,
            viewBuisinessDialogShow: false,
            chooseBusinessDialogVisible: false,
            isEdit: false,
            userState:'',
            condition: {
              keyword: '',
              page: 1
            },
            busiSearch:'',
            contractorSearch:'',
            total: 0,
            inBusiness:{ 

            },//旗下商户
            businessIds: "",
            businessTags: [],
            businessArr: null, 
            channelList: [],           
            channelForm: {
                channelName: '',
                account: '',
                password: '',
                commission:''
            },
            channelRules:{
              channelName: [
                  { required: true, message: '请输入账号', trigger: 'blur' },
              ],
              account: [
                  { required: true, message: '请输入账户/手机号', trigger: 'blur' },
              ],   
              password:[
                  { required: true, message: '请输入密码', trigger: 'blur' },                  
              ],                          
              goods:[
                  { required: true, message: '请选择商品', trigger: 'blur' },                  
              ],
              commission:[
                  { required: true, message: '请输入佣金', trigger: 'blur' },                  
              ]                               
            }                         
        }
    },
    methods: {
        /*
        **处理搜索事件
        */      
        async handleConSearchClick(){
          await this._getChannelList(this.condition)
        },
        handleViewData(id) {
            let _id = id
            this.$router.push({name: 'commiInbusiStatistic',query: {id: _id}})
        },
        /*
        **处理选择商户搜索事件
        */
        async handleChooseBusiness() {
          let businesses = await this._getBusinessListByTel(this.busiSearch)
          if(businesses.code === 200){
            this.chooseBusinessDialogVisible = true
            this.businessArr = businesses.data.data
            this.total = businesses.data.total
            this.page = businesses.data.per_page
          }
          
        },
        /*
        **处理确认选择商户事件
        */
        handleConfireChoose(){
          let selections = this.$refs.businessArrTable.selection;
          if(selections.length){
           this.businessTags = selections.map(s=> {return {id: s.id , name: s.name }})
           console.log(this.businessTags)
           this.chooseBusinessDialogVisible = false
          }
        },
        /*
        **处理去选择事件
        */
        async handlenBusinessDialogShow(tags) {
          await this.handleChooseBusiness()
          let ids = tags.map(v=> {return v.id})
          for (const business of this.businessArr) {
            if(ids.indexOf(business.id) >=0)
            {
              this.$refs.businessArrTable.toggleRowSelection(business)
            }
          }
          this.chooseBusinessDialogVisible = true
        },
        /*
        **网络请求获取商户列表
        */
        async _getBusinessListByTel(tel) {
           let resData =  await this.http.get('/platform/merchantQuickSearch.api', {keyword: tel})
           return resData;
        },
        /*
        **确定添加渠道商事件
        */
        async handleAddChannel(){
          let ids = this.businessTags.map(v=> {return v.id})
          this.businessIds = ids.join(',')
          let body = {
            platformName: this.channelForm.channelName,
            password: this.channelForm.password,
            tel: this.channelForm.account,
            platform: 3,
            commission: this.channelForm.commission,
            merchantId: this.businessIds
          }
          let resData = await this.http.post('/platform/createNewPlatform.api', body)
          if(resData.code === 200)
          {
            this.$message.success(resData.msg)
            this.channelDialogVisible = false
            this._getChannelList(thsi.condition)
            this.businessIds = ''
          }
        },
        /*
        **确定修改渠道商事件
        */
        async handleConfirmEditChannel() {
          let ids = this.businessTags.map(v=> {return v.id})
          this.businessIds = ids.join(',')
          let data = {
            platformName: this.channelForm.account,
            tel: this.channelForm.account,
            password: this.channelForm.password,
            commission: this.channelForm.commission,
            merchantId: this.businessIds,
            id: this.channelForm.id
          }
          let resData = await this.http.post('/platform/updateChannel', data)
          if(resData.code === 200)
          {
            this.$message.success(resData.msg)
            this.$refs.channelForm.resetFields()
            this.channelDialogVisible = false;
            this.isEdit = false;
          }
        },
        /*
         **启动平台账户事件
         */
        async enableAccount(id) {
          let _id = id
          let resData = await this.http.get('/platform/enablePlatform', {id: _id})
          if(resData.code === 200){
            this.$message.success(resData.msg)
            await this._getChannelList(this.condition)
          }
        },        
        /*
        **网络获取渠道商列表事件
        */
       async _getChannelList(condition){
         let _condition = condition
         let resData = await this.http.get('/platform/channelLists', _condition)
         if(resData.code === 200){
           this.channelList = resData.data.data
           this.condition.page = resData.data.current_page
           this.total = resData.data.total
         }

       },
        /*
         **处理冻结平台账户事件
         */
       async handleFrozenAccount(id){
         let platformId = id
         let resData = await this.http.get('/platform/frozenPlatform', {id: platformId})
        },
        /*
        **处理查看旗下商户事件
        */
       async handleViewBusiness(id){
         this.viewBuisinessDialogShow = true
         let _id  = id;
         let resData = await this.http.get("/platform/channelMerchant",{id: _id})
         if(resData.code === 200){
           this.inBusiness = resData.data
         }
       },
        /*
        **处理分页当前页改变事件
        */
       handleCurrentchange(val) {
         this.condition.page = val
         this._getChannelList(this.condition)
       },    
        /*
        **处理编辑渠道商事件
        */       
       async handleEditChannel(id){
         let _id = id;
         let resData = await this.http.get("/platform/channelDetail.api", {id: _id})
         if(resData.code === 200){
         this.channelDialogVisible = true
         this.isEdit = true
         this.channelForm.id = _id
         this.channelForm.account = resData.data.account
         this.channelForm.channelName = resData.data.channel
         this.channelForm.commission = resData.data.commission
         this.businessTags = resData.data.merchant
         let ids = resData.data.merchant.map(e => {
              return  e.id
            });
         this.businessIds = ids.length>1?ids.join(','):ids.join('')
         }

       },
        /*
        **处理关闭tag事件
        */       
      async handleClose(tag){
        this.businessTags.splice(this.businessTags.indexOf(tag), 1)
       },
       /*
       **添加修改渠道商Dialog关闭
       */
      addChanneldialogClose() {
        this.businessIds = ''
        this.businessTags = []
        this.isEdit = false
        this.channelForm = {}
        this.$refs.channelForm.resetFields()
      }
       
    },
    async mounted() {
      await this._getChannelList(this.condition);
    },
}
</script>
<style lang="less">
#chooseBusinessDia,#viewBusinessDia{
  .el-dialog__body{
    padding-bottom:20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    // min-height: 200px;
    .el-table{
      display: inline-block;
    }
    
  }
  .pagination{
    display: block;
  }
  #searchBar{
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 20px;
    .searchTool{
      margin-right: 20px;
    }
  }


}

#chooseQxbusi{
  .el-form-item__content{
    display: flex;
    align-items: center;
  .el-tag {
    margin-right: 10px;
  }
  }
}

</style>
