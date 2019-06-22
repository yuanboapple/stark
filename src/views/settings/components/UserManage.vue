<template>
  <div>
                   <div class="contain-footer-top">
                    <div class="contain-footer-topl">                    
                      <el-button class="sys-Btn" @click="handleClickAddUser"  type="primary">新增用户</el-button>
                      <el-button class="sys-Btn" type="primary">批量导入</el-button>
                    </div>
                    <div class="contain-footer-topr">  
                      <el-input v-model="condition.keyword" class="searchTool" placeholder="请输入用户名称或手机号">
                            <i
                             class="el-icon-search el-input__icon"
                             slot="suffix"
                             @click="handleSearchClick">
                            </i>
                      </el-input>                                          
                    </div>                        
                  </div>
                  <div class="contain-footer-bottom">
                      <el-row :gutter="10">
                          <el-col :span="24">
                                <el-table
                                  :data="userList"
                                  size="medium"
                                  :fit="true"
                                  border
                                  style="width: 100%">
                                  <el-table-column
                                    align="center"
                                    prop="username"
                                    label="姓名"
                                    width="180">
                                  </el-table-column>
                                  <!-- <el-table-column
                                    align="center"
                                    prop="department"
                                    label="部门"
                                    width="180">
                                  </el-table-column> -->
                                  <el-table-column
                                    align="center"
                                    prop="tel"
                                    label="手机号">
                                  </el-table-column>
                                  <el-table-column
                                    align="center"
                                    prop="role"
                                    label="角色">
                                  </el-table-column>
                                  <el-table-column
                                    align="center"
                                    prop="status"
                                    label="状态">
                                    <template slot-scope="scope">
                                      {{scope.row.status?'正常':'禁用'}}
                                    </template>
                                  </el-table-column>
                                  <el-table-column
                                    align="center"
                                    label="操作"
                                    width="180">
                                      <template slot-scope="scope">
                                        <el-button class="sys-text-Btn"  type="text" @click="editUser(scope.$index)" size="small">编辑</el-button>
                                        <el-button v-if="scope.row.status" class="sys-text-Btn" type="text" @click="frozenUser(scope.row.id)" size="small">禁用</el-button>
                                        <el-button v-else class="sys-text-Btn" type="text" @click="enAbleUser(scope.row.id)"  size="small">启用</el-button>
                                        <el-button class="sys-text-Btn" type="text" size="small">删除</el-button>
                                      </template>                                    
                                  </el-table-column>                                                                                                       
                                </el-table>
                          </el-col>
                      </el-row>
                  </div>  
      <el-dialog class="dialog" 
           :title="isEdit?'修改用户':'新增用户'"
           :visible.sync="addUserDialog"
           width="23%"
           @close="addUserDialogClose"
           >
             <el-form :model="addform"  ref="addform" label-width="auto" size="medium" label-position="right" class="demo-ruleForm">
               <el-form-item label="姓名"  prop="name">
                 <el-input   v-model="addform.name"></el-input>
               </el-form-item>
               <el-form-item label="手机号" prop="telephone">
                 <el-input v-model="addform.telephone"></el-input>  
               </el-form-item>
                <el-form-item label="所有角色" prop="role">
                    <el-select v-model="addform.role" placeholder="请选择角色">
                      <el-option v-for="role in roleList" :key="role.id" :label="role.roleName" :value="role.id"></el-option>
                    </el-select>
                </el-form-item>
                <template >
                   <el-form-item label="密码" prop="password">
                    <el-input v-model="addform.password"></el-input>  
                   </el-form-item>
                   <el-form-item label="确认密码" prop="password2">
                    <el-input v-model="addform.password2"></el-input>  
                   </el-form-item>  
                </template>
              
             </el-form>
           <span slot="footer" class="dialog-footer">
             <el-button v-if="!isEdit"  class="sys-Btn" type="primary" @click="addUser">确 定</el-button>
             <el-button v-else  class="sys-Btn" type="primary" @click="confirmEditUser">确 定</el-button>                  
             <el-button @click="addUserDialog = false">取 消</el-button>
           </span>
        </el-dialog>                     
  </div>
</template>
<script>
import { Promise } from 'q';
export default {
  data() {
    return {
            addUserDialog: false,
            isEdit: false,
            addform: {
              name: '',
              telephone: '',
              role: '',
              password: '',
              password2: ''
            },
             defaultProps: {
             children: 'children',
             label: 'label'
            },
            id: 0,
            roleList: [],
            userList: [],
            tree:[{
                label: "STARK公司",
                children: [{
                    label: "运营",
                    children: [{
                        label: "墨鱼"
                    }]
                }]
            }],
            condition:{
              keyword: ''
            },            
    }
  },
  methods: {
      handleNodeClick(data){
       console.log(data);
      },
      handleSearchClick(){

      },
      /*
      **获取管理员列表
      */
      async _getUserList(condition){
        let _condition = condition
        let resData = await this.http.get('/platformUser/lists',_condition)
        if(resData.code === 200){
          this.userList = resData.data
        }
      },
      /*
      **获取角色列表
      */
      async _getRoleList(){
        let resData = await this.http.get('/platformUser/searchRole')
        if(resData.code === 200){
          this.roleList = resData.data
        }
      },
      /*
      **点击新增用户
      */
      async handleClickAddUser(){
        await this._getRoleList()
        this.addUserDialog = true
      },
      /*
      **新增用户
      */
     async addUser(){
      let data = {
        username: this.addform.name,
        tel: this.addform.telephone,
        roleId: this.addform.role,
        password: this.addform.password,
        repassword: this.addform.password2
      }
      let resData = await this.http.post('/platformUser/createNewUser', data)
      if(resData.code === 200){
        this.$message.success(resData.msg)
        await this._getUserList(this.condition)
        this.addUserDialog = false
      }
     },
     /*
     **编辑用户
     */
    async editUser(index){
      await this._getRoleList()
      this.isEdit = true
      this.id = this.userList[index].id
      this.addform.name = this.userList[index].username
      this.addform.telephone = this.userList[index].tel
      this.addform.role  = this.userList[index].roleId
      this.addUserDialog = true
      
    },
    /*
    **确定修改用户
    */
   async confirmEditUser(){
       let data = {
         id: this.id,
         tel: this.addform.telephone,
         roleId: this.addform.role,
         password: this.addform.password,
         repassword: this.addform.password2,
       }
       let resData = await this.http.post('/platformUser/updateUser.api', data)
       if(resData.code === 200){
         this.$message.success(resData.msg)
         await this._getUserList(this.condition)
         this.addUserDialog = false
       } 
   },
     /*
     **新增用户模态框关闭
     */
     addUserDialogClose(){
       this.addform = {
              name: '',
              telephone: '',
              role: '',
              password: '',
              password2: ''
            },
       this.$refs.addform.resetFields()
     },
     /*
     **冻结用户
     */
    async frozenUser(id){
      let _id = id
      let resData = await this.http.get('/platformUser/frozenUser.api', {id: _id})
      if(resData.code === 200){
        this.$message.success(resData.msg)
        this.condition.keyword = ''
        await this._getUserList(this.condition)
      }
    },
     /*
     **启用用户
     */
    async enAbleUser(id){
      let _id = id
      let resData = await this.http.get('/platformUser/enableUser.api', {id: _id})
      if(resData.code === 200){
        this.$message.success(resData.msg)
        this.condition.keyword = ''
        await this._getUserList(this.condition)
      }
    }
  },
  async mounted() {
    await this._getUserList(this.condition)
  },
  
}
</script>
<style lang="less" scoped>
.contain-footer-topr{
    .searchTool{
        margin-right: 0;
    }
}
.contain-footer-bottom{
    #organiztion-struct{
        min-height: 45vh;
        border: 1px solid #E6E6E6;
        #organiztion-struct-top{
            height: 4vh;
            line-height: 4vh;
            border-bottom: 1px solid #E6E6E6;
            #organiztion-struct-title{
                margin-left: 0.6vw;
                font-size: .875rem;
                color: #333333;
            }
        }
        #organiztion-struct-tree{
            margin-top: 1.5vh;
            font-size: .875rem;
            
            .el-tree{
                color: #333333;
            }
        }
    }
 .contain-footer-bottom-l{
     height: 7.5rem;

 }
 .contain-footer-bottom-r{
     height: 7.5rem;
 }
}
</style>


