<template>
    <div>
      <div class="contain-footer-top">
        <div class="contain-footer-topl">                    
          <el-button class="sys-Btn" @click="dialogVisible = true" type="primary">新增商户</el-button>
        </div>
        <div class="contain-footer-topr">
          <el-select v-model="userState" class="user-state-input" @change="handleSelectChange"  placeholder="状态">
             <el-option label="全部" value="1"></el-option>
             <el-option label="已激活" value="2"></el-option>
             <el-option label="未激活" value="3"></el-option>
          </el-select>  
          <el-input v-model="condition.keyword" class="searchTool">
                <i
                 class="el-icon-search el-input__icon"
                 slot="suffix"
                 @click="handleSearchClick">
                </i>
          </el-input>                                          
        </div>                        
      </div>
      <div class="contain-footer-bottom">
            <el-table
                :data="businessList"
                border
                style="width: 100%">
                <el-table-column align="center"
                  type="index"
                  label="ID"
                  width="80">
                </el-table-column>  
                <el-table-column
                  prop="account"
                  label="账号"
                  min-width="140"
                  align="center">                      
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="商户名称"
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
                  prop="channelName"
                  label="所属渠道商"
                  align="center"
                  min-width="120">
                </el-table-column>
                <el-table-column
                  prop="registerTime"
                  label="注册时间"
                  align="center"
                  min-width="180">
                </el-table-column>                    
                <el-table-column
                  label="操作"
                  align="center"
                  min-width="220">
                  <template slot-scope="scope">
                      <el-button class="sys-text-Btn" size="small" @click="handleEdit(scope.row.id)" type="text">编辑</el-button>
                      <el-button class="sys-text-Btn" size="small" @click="commisionForm.account=scope.row.account;commisionDialog = true" type="text">设置手续费</el-button>
                      <el-button class="sys-text-Btn" size="small" type="text" @click="handleViewData(scope.row.id)">数据统计</el-button>
                      <el-button v-if="scope.row.isFrozen" @click="enableAccount(scope.row.id)"  size="mini" type="success">启用</el-button>
                      <el-button v-else @click="handleFrozenAccount(scope.row.id, scope.$index)"   size="mini" type="danger">禁用账户</el-button>
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
      <el-dialog class="dialog" id="addBuisDialog"
           :title="isEdit?'修改商户':'新增商户'"
           :visible.sync="dialogVisible"
           @close="addBuisDialogClose"
           width="23%"
           >
             <el-form :model="buisform" :rules="buisRules" ref="buisform" label-width="auto" size="medium" label-position="right" class="demo-ruleForm">
               <el-form-item label="账号"  prop="account">
                 <el-input  :disabled="isEdit" v-model="buisform.account"></el-input>
               </el-form-item>
               <el-form-item label="商户名称" prop="businessName">
                 <el-input v-model="buisform.businessName"></el-input>  
               </el-form-item>
                <el-form-item label="行业" prop="industry">
                    <el-select v-model="buisform.industry" placeholder="请选择行业">
                      <el-option label="金融" value="金融"></el-option>
                      <el-option label="其他" value="其他"></el-option>
                    </el-select>
                </el-form-item>
                <template v-if="!isEdit">
                   <el-form-item label="密码" prop="password">
                    <el-input v-model="buisform.password"></el-input>  
                   </el-form-item>
                   <el-form-item label="确认密码" prop="password2">
                    <el-input v-model="buisform.password2"></el-input>  
                   </el-form-item>  
                </template>
              
             </el-form>
           <span slot="footer" class="dialog-footer">
             <el-button v-if="!isEdit" class="sys-Btn" type="primary" @click="handleAddBusiness">确 定</el-button>               
             <el-button v-else class="sys-Btn" type="primary" @click="handleAConfirmEditBusiness">修改</el-button>  
             <el-button @click="concealDialog">取 消</el-button>
           </span>
        </el-dialog> 
      <el-dialog class="dialog"
           id="setcommisionDialog"
           title="设置佣金"
           :visible.sync="commisionDialog"
           width="23%"
           >
             <el-form :model="commisionForm" :rules="commisionRules" ref="commisionRules" label-width="auto" size="medium" label-position="right" class="demo-ruleForm">
               <el-form-item label="确认用户名：" prop="account">
                 <el-input disabled :placeholder="commisionForm.account"></el-input>
               </el-form-item>
               <el-form-item label="佣金比例：" prop="rate">
                 <el-input v-model="commisionForm.rate"></el-input>  
               </el-form-item>              
             </el-form>
           <span slot="footer" class="dialog-footer">

             <el-button  class="sys-Btn" type="primary" @click="handleConfirmSetCommis">确 定</el-button>               
             
             <el-button @click="commisionDialog = false">取 消</el-button>
           </span>
    </el-dialog>
                              
    </div>
</template>
<script>
import { async } from 'q';
export default {
    data() {
        return {
            dialogVisible: false,
            commisionDialog: false,
            userState:'',
            isEdit: false,
            total: 0,
            condition: {
               keyword: '',
               page:1,
               type:1
            },
            businessList: [],
            buisform: {
                account:'',
                businessName: '',
                industry: '',
                password: '',
                password2: '',
                id:0
            },
            commisionForm: {
                account: '',
                rate: ''
            },
            buisRules:{
              account: [
                  { required: true, message: '请输入账号', trigger: 'blur' },
              ],
              businessName: [
                  { required: true, message: '请输入商户名称', trigger: 'blur' },
              ],   
              industry:[
                  { required: true, message: '请选择行业', trigger: 'blur' },
              ],
              password:[
                  { required: true, message: '请输入密码', trigger: 'blur' },                  
              ],                          
              password2:[
                  { required: true, message: '请再次输入密码', trigger: 'blur' },                  
              ] 
            },
            commisionRules: {
              account: [
                  { required: true, message: '请输入用户名', trigger: 'blur' },
              ],
              rate: [
                  { required: true, message: '请输入佣金比例', trigger: 'blur' },
              ],                   
            },            
        }
    },
    methods: {
        async handleSearchClick(){
          await this._getBusinessList(this.condition)
        },
        handleViewData(id) {
          let _id = id
           this.$router.push({name: 'busiDataStatistic', query: {id: _id}})
        },
        async handleAddBusiness(){
          let body = {
            tel: this.buisform.account,
            platformName: this.buisform.businessName,
            industry: this.buisform.industry,
            password: this.buisform.password,
            repassword: this.buisform.password2,
            platform: 2
          }
          let resData = await this.http.post(`${this.common.basePath}/platform/createNewPlatform.api`, body)
          if(resData.code === 200)
          {
            this.$message.success(resData.msg)
            this.dialogVisible = false

          }
        },
        /*
        **网络获取商户列表
        */
        async _getBusinessList(condition){
          let _condition = condition
          let resData = await this.http.get('/platform/merchantLists', _condition)
          if(resData.code === 200){
            this.businessList = resData.data.data
            this.condition.page = resData.data.current_page
            this.total = resData.data.total
          }

        },
        /*
         **处理冻结平台账户事件
         */
       async handleFrozenAccount(id, index){
         let _index = index
         let platformId = id
         let resData = await this.http.get('/platform/frozenPlatform', {id: platformId})
         if(resData.code===200)
         {
           this.$message.success("禁用成功")
           this.businessList[_index].isFrozen = true
           this.businessList[_index].isActive = false
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
            await this._getBusinessList(this.condition)
          }
        },
       /*
       **处理确定设置佣金事件
       */
       async handleConfirmSetCommis(){
         let param = {
           type: 1,
           tel: this.commisionForm.account,
           proportion: this.commisionForm.rate
         }
         let resData = await this.http.get('/platform/setMerchantComsion', param)
         if(resData.code == 200)
         {

           this.$message.success(resData.msg)
           this.commisionDialog = false
         }
       }, 
        /*
        **处理分页当前页改变事件
        */
       handleCurrentchange(val) {
         this.condition.page = val
         this._getBusinessList(this.condition)
       },
        /*
        **处理slect选择事件
        */       
       async handleSelectChange(val){
         let _val = val;
         this.condition.type = _val
         await this._getBusinessList(this.condition)
       },
        /*
        **编辑商户
        */        
       async handleEdit(id) {
         let _id = id
         this.isEdit = true
         this.dialogVisible = true
         let resData = await this.http.get('/platform/merchantDetail', {id: _id})
         if(resData.code === 200){
            this.buisform.industry = resData.data.industry
            this.buisform.businessName = resData.data.platformName
            this.buisform.account = resData.data.tel
            this.buisform.id = _id
         }
       },
        /*
        **确认修改商户
        */ 
       async handleAConfirmEditBusiness() {
         let data = {
           id: this.buisform.id,
           tel: this.buisform.account,
           platformName: this.buisform.businessName,
           industry: this.buisform.industry,
           password: this.buisform.password,
           repassword: this.buisform.password2
         }
         let resData = await this.http.post('/platform/editMerchant', data)
         if(resData.code === 200){
           this.$message.success(resData.msg)
           await this._getBusinessList(this.condition)
           this.dialogVisible = false
         }
       },
      addBuisDialogClose(){
         this.isEdit = false
         this.$refs.buisform.resetFields()
       },
       /*
       **取消增加/修改商户
       */
       concealDialog() {
         this.dialogVisible = false
         this.$refs.buisform.resetFields()
       }
    },
    async mounted() {
      await this._getBusinessList(this.condition)
    },
}
</script>

