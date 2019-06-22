<template>
  <div>
         <div class="contain-head">
            <div class="head-pre"></div>
            <span class="head-title">承兑商列表</span>
        </div>
        <div class="contain-footer">
             <div class="contain-footer-top">
               <div class="contain-footer-topl"> 
                  <el-button class="sys-Btn" @click="addUser" type="primary">新增用户</el-button>                                                                          
               </div>
               <div class="contain-footer-topr">
                 <el-input v-model="conditon.keyword" class="searchTool">
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
                    :data="contractorList"
                    border
                    style="width: 100%">
                    <el-table-column align="center"
                      type="index"
                      label="ID"
                      width="50">
                    </el-table-column>  
                    <el-table-column
                      prop="account"
                      label="账号"
                      width="150"
                      align="center">                      
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="承兑扇名称"
                      width="120"
                      align="center">
                    </el-table-column>
                    <el-table-column
                      prop="company"
                      label="用户类型"
                      align="center"
                      width="100">
                    </el-table-column>
                    <el-table-column
                      prop="industry"
                      label="行业"
                      align="center"
                      width="100">
                    </el-table-column>
                    <el-table-column
                      prop="registerTime"
                      label="注册时间"
                      align="center"
                      min-width="200">
                    </el-table-column>                                        
                    <el-table-column
                      label="保证金（余额）"
                      prop="bond"
                      align="center"
                      width="180">
                      <template slot-scope="scope">
                        {{scope.row.bond}}
                        <el-button v-if="!scope.row.frozenBond" class="smini-button" type="primary"   @click="frozenBond(scope.row.id)" >冻结</el-button>
                        <el-button class="smini-button" v-else @click="thawBond(scope.row.id)" type="success" >解冻</el-button>
                      </template>                                                                                                                               
                    </el-table-column>
                    <el-table-column
                      prop="withdrawAmount"
                      label="可提现"
                      align="center"
                      min-width="160">
                      <template slot-scope="scope">
                        {{scope.row.withdrawAmount}}
                        <el-button class="smini-button" @click="setFrozenDialog = true;form.id = scope.row.id;" type="primary" v-if="!scope.row.frozenWithdraw">冻结</el-button>
                        <el-button class="smini-button" @click="thawdrawAmount(scope.row.id, scope.row.thawWithdrawTime)" type="success" v-else>解冻</el-button>                      
                        <div v-if="scope.row.frozenWithdraw"><span class="frozenTime-time">{{scope.row.thawWithdrawTime}} 解冻</span></div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      align="center"
                      min-width="280">
                       <template slot-scope="scope">
                           <div>
                              <el-button  class="sys-text-Btn"   type="text" @click="handleEditUser(scope.row.id)" size="small">编辑</el-button>
                              <el-button class="sys-text-Btn"  type="text" size="small" @click="commisionForm.account=scope.row.account;setCommisionDiaShow = true">设置佣金</el-button>
                              <el-button class="sys-text-Btn"  type="text"  size="small" @click="handlePushOrderMang(scope.row.name)"  >订单管理</el-button>
                              <el-button id="disableAcount" v-if="scope.row.isFrozen" @click="handleEnableAccount(scope.row.id, scope.$index)"   size="mini" type="success">启用</el-button>
                              <el-button id="disableAcount" v-else @click="handleFrozenAccount(scope.row.id, scope.$index)"   size="mini" type="danger">禁用账户</el-button>                              
                           </div>
                       </template>
                    </el-table-column>
                    <el-table-column 
                      label="状态"
                      align="center"
                      width="100">
                      <template slot-scope="scope">
                         <span v-if="scope.row.isActive" class="activeBtn" type="text">激活</span>
                         <span v-else type="text" clas="no-activeBtn">未激活</span>          
                      </template>
                    </el-table-column>                     
                </el-table>
            </div>
            <el-pagination
                class="pagination"
                background
                layout="prev, pager, next"
                :hide-on-single-page="!contractorList.length"
                @current-change="handleCurrentchange"
                :current-page = "conditon.page"
                :page-size="15"
                :total="total">
            </el-pagination>
            <div style="clear:both;"></div>                
        </div>    
      <el-dialog 
           class="dialog"
           :title="isEdit?'修改用户':'新增用户'"
           :visible.sync="commisionDialogShow"
           width="25%"
           >
        <div id="commission-dialog-wrap">
           <el-form :model="form" :rules="rules" ref="form" label-width="auto" size="medium" label-position="right" class="demo-ruleForm">
               <el-form-item label="账户" prop="tel">
                 <el-input v-if="isEdit" disabled v-model="form.tel"></el-input>
                 <el-input v-else v-model="form.tel"></el-input>
               </el-form-item>
               <el-form-item label="承兑商名称" prop="platformName">
                 <el-input v-model="form.platformName"></el-input>
               </el-form-item> 
               <el-form-item label="用户类型" prop="type">
                    <el-radio-group v-model="form.type">
                      <el-radio :label="0">单位</el-radio>
                      <el-radio :label="1">个人</el-radio>
                    </el-radio-group>
               </el-form-item> 
               <el-form-item label="行业" prop="industry">
                    <el-select v-model="form.industry" placeholder="去选择">
                      <el-option label="金融" value="金融"></el-option>
                      <el-option label="其他" value="其他"></el-option>
                    </el-select>
               </el-form-item>
               <template v-if="!isEdit">
                  <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" type="password"></el-input>  
                  </el-form-item> 
                  <el-form-item label="确认密码" prop="repassword">
                    <el-input v-model="form.repassword" type="password"></el-input>  
                  </el-form-item>
               </template>                                                                     
           </el-form>
        </div>   
           <span slot="footer" class="dialog-footer">
             <el-button v-if="isEdit" class="sys-Btn" type="primary" @click="handleConfirmEditUser" >修改</el-button>
             <el-button v-else class="sys-Btn" type="primary" @click="handleAddUser" >确 定</el-button>               
             <el-button @click="cancealCommisionDialog">取 消</el-button>
           </span>
       </el-dialog>
      <el-dialog class="dialog"
           id="setcommisionDialog"
           title="设置冻结"
           :visible.sync="setFrozenDialog"
           width="23%"
           >
              <el-date-picker
                v-model="frozenDate"
                type="datetime"
                placeholder="选择冻结时间"
                @change="frozendateChange"
                >
              </el-date-picker>
              <span slot="footer" class="dialog-footer">
                <el-button class="sys-Btn" type="primary" @click="frozendrawAmount(form.id, dateString)">确 定</el-button>               
                <el-button @click="concrealfrozendate">取 消</el-button>
              </span>
    </el-dialog>         
      <el-dialog class="dialog"
           id="setcommisionDialog"
           title="设置佣金"
           :visible.sync="setCommisionDiaShow"
           width="23%"
           >
             <el-form :model="commisionForm" :rules="commisionRules" ref="commisionRules" label-width="auto" size="medium" label-position="right" class="demo-ruleForm">
               <el-form-item label="确认用户名：" prop="account">
                 <el-input disabled :placeholder="commisionForm.account" ></el-input>
               </el-form-item>
               <el-form-item label="佣金比例：" prop="rate">
                 <el-input v-model="commisionForm.rate"></el-input>  
               </el-form-item>              
             </el-form>
           <span slot="footer" class="dialog-footer">
             <el-button class="sys-Btn" type="primary" @click="handleConfirmSetCommis">确 定</el-button>               
             <el-button @click="setCommisionDiaShow = false">取 消</el-button>
           </span>
    </el-dialog>       
  </div>
</template>
<script>
import { async } from 'q';
  export default {
      data() {
        let accountValidate = (rule, value, callback) => {
          if(value === ''){
            callback(new Error('请输入用户名'))
          }
          else {
            if(this.common.mobileReg.test(value)){
              callback()
            } else {
              callback(new Error('请输入合法的手机号'))
            }
          }
        }
        let repasswordValidate = (rule, value, callback) => {
          if(value === '') {
            callback(new Error('请再次输入密码'))
          } else {
            if(value !== this.form.password) {
              callback(new Error('两次输入的密码不一致'))
            } else {
              callback()
            }
          }
        }
          return {
          conditon: {
            keyword: '',
            page: 1
          },
          isEdit: false,
          contractorList:[],
          commisionDialogShow: false,
          setCommisionDiaShow: false,
          setFrozenDialog: false,
          total:0,
          frozenDate:'',
          dateString:'',
          form: {
            tel: '',
            platformName: '',
            type: 0,
            industry: '',
            password: '',
            repassword: '',
            id: null,
          },
          rules: {
              tel: [
                  { required: true, validator: accountValidate, trigger: 'blur' },
              ],
              platformName: [
                  { required: true, message: '请输入承兑商名称', trigger: 'blur' },
                  { min: 2, message: '名称不少于2位', trigger: 'blur'}
              ], 
              type: [
                { required: true, message: '请选择用户类型', trigger: 'change' },
              ],
              industry: [
                { required: true, message: '请选择行业', trigger: 'change' },
              ],  
              password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 20, message: "密码长度不少于6且不大于20", trigger: 'blur' },
              ], 
              repassword: [
                { required: true, validator: repasswordValidate, trigger: 'blur' },
                { min: 6, max: 20, message: "密码长度不少于6且不大于20", trigger: 'blur' },
              ],                                           
          },
            commisionForm: {
                account: '',
                rate: ''
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
          addUser() {
              this.commisionDialogShow = true
          },
          /*
          **处理搜素事件
          */
          async handleSearchClick(){
            await this._getContractorLst(this.conditon)
          }
          ,
          /*
          **处理新增用户事件
          */
          async handleAddUser() {
            let body = this.form
            body.platform = 1
            let resData = await this.http.post(`${this.common.basePath}/platform/createNewPlatform.api`,body)
            if(resData.code === 200)
            {
              this.$message.success("注册成功")
              this.commisionDialogShow = false
              this._getContractorLst(this.conditon)
            }
          },
          /*
          **网络获取承兑商列表
          */
         async _getContractorLst(conditon) {
           let _conditon = conditon
           let resData = await this.http.get('/platform/acceptanceLists', conditon)
           if(resData.code === 200){
              this.contractorList = resData.data.data
              this.conditon.page = resData.data.current_page
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
           this.contractorList[_index].isFrozen = true
           this.contractorList[_index].isActive = false
         }
        },
        /*
         **处理启动平台账户事件
         */
       async handleEnableAccount(id, index){
         let _index = index
         let platformId = id
         let resData = await this.http.get('/platform/enablePlatform', {id: platformId})
         if(resData.code===200)
         {
           this.$message.success(resData.msg)
           this.contractorList[_index].isFrozen = false
           this.contractorList[_index].isActive = true
         }
        },        
        /*
        **处理分页当前页改变事件
        */
       handleCurrentchange(val) {
         this.conditon.page = val
         this._getContractorLst(this.conditon)
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
         let resData = await this.http.get('/platform/setAcceptanceComsion', param)
         if(resData.code == 200)
         {
           this.$message.success(resData.msg)
         }
       },
       /*
       **修改用户
       */      
       async handleEditUser(id) {
         let _id = id
         this.isEdit = true
         this.commisionDialogShow = true
         let resData = await this.http.get('/platform/acceptanceDetail', {id: _id})
         this.form.tel = resData.tel
         this.form.platformName = resData.platformName
         this.form.industry = resData.industry
         this.form.type = resData.company
         this.form.id = _id
       },
       /*
       **确认修改用户
       */ 
       async handleConfirmEditUser() {
         let data = {
           id: this.form.id,
           tel: this.form.tel,
           platformName: this.form.platformName,
           company: this.form.type,
           industry: this.form.industry,
           password: this.form.password,
           repassword: this.form.repassword
         }
         let resData = await this.http.post('/platform/editAcceptance', data)
         if(resData.code === 200){
           this.$message.success(resData.msg)
           this.commisionDialogShow = false
           await this._getContractorLst(this.conditon)
         }
       },
       /*
       **取消修改/增加用户
       */ 
       cancealCommisionDialog() {
         this.commisionDialogShow = false
        this.$refs.form.resetFields()
       },
       /*
       **承兑冻结保证金
       */
       async frozenBond(id){
         let _id = id
         let resData = await this.http.get('/platform/frozenBond', {id: _id})
         if(resData.code === 200){
           this.$message.success(resData.msg)
           this._getContractorLst(this.conditon)
         }
       },
       /*
       **承兑解冻保证金
       */
       async thawBond(id){
         let _id = id
         let resData = await this.http.get('/platform/thawBond', {id: _id})
         if(resData.code === 200){
           this.$message.success(resData.msg)
           this._getContractorLst(this.conditon)
         } 
       },
       /*
       **冻结可提现
       */
       async frozendrawAmount(id, time){
         let _id = id
         let _time = time
         let resData = await this.http.get('/platform/frozenCashBalance', {id: _id, drawTime: _time})
         if(resData.code === 200){
           this.$message.success(resData.msg)
            await this._getContractorLst(this.conditon)
           this.setFrozenDialog = false
         }
       },
       /*
       **解冻可提现
       */
      async thawdrawAmount(id, time){
        let _id = id
        let _time = time
        let resData = await this.http.get('/platform/drawCashBalance', {id: _id, drawTime: _time})
        if(resData.code === 200){
          this.$message.success(resData.msg)
          await this._getContractorLst(this.conditon)
          
        }
      },
      /*
      **确认选择的时间
      */
     frozendateChange(value){
       let currentTimeStamp = (new Date()).getTime()
       if(value.getTime() < currentTimeStamp)
       {
         this.$message.error("冻结不得早于当前时间")
         this.frozenDate = ''
         this.dateString = ''
         this.setFrozenDialog = false
       }
       else{
         this.dateString = this.common.formatDate(value)
       }
     },
      /*
      **取消设置冻结
      */
     concrealfrozendate(){
          this.frozenDate = ''
          this.dateString = ''
          this.setFrozenDialog = false
     },
     /*
     **跳转订单管理
     */
     handlePushOrderMang(name){
       let _name = name
       this.$router.push({name: 'orderManage', query:{searchType: 2, keyword: _name}})
     }
      },
      async mounted() {
        await this._getContractorLst(this.conditon)
      },
  }
</script>
<style lang="less" scoped>
.contain-footer-topr{
    .searchTool{
        margin-right: 0;
    }
}
 .contain-head{
    margin-bottom: 2vh;
 }
 #disableAcount{
   margin-left: 10px;
 }
 .state-active{
   color: #6BCC03;
 }
 .state{
   color: #f00;
 }
 .frozenTime-time{
   color: #F56C6C
 }
</style>
<style lang="less">
.el-radio__inner:hover{
  border-color: #54B3D9
}
</style>

