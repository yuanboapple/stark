<template>
    <div>
         <div class="contain-footer-top">
           <div class="contain-footer-topl"> 
              <el-button class="sys-Btn" @click="addRoleDialogShow = true" type="primary">新增角色</el-button>                                                                          
           </div>
           <div class="contain-footer-topr">
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
                    :data="roleList"
                    border
                    style="width: 100%">  
                    <el-table-column
                      prop="roleName"
                      label="角色名称"
                      min-width="150"
                      align="center">                      
                    </el-table-column>
                    <el-table-column
                      prop="remark"
                      label="角色说明"
                      min-width="150"
                      align="center">
                    </el-table-column>
                    <el-table-column
                      prop="num"
                      label="角色人数"
                      align="center"
                      min-width="150">
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      align="center"
                      min-width="280">
                       <template slot-scope="scope">
                           <div>
                              <el-button  class="sys-text-Btn" @click="editRole(scope.$index)"   type="text" size="small">编辑</el-button>
                              <el-button class="sys-text-Btn" @click="removeRole(scope.row.id)"  type="text" size="small">删除</el-button>
                           </div>
                       </template>
                    </el-table-column>                    
                </el-table>
            <div style="clear:both;"></div>                 
        </div>
      <el-dialog class="dialog"
           :title="!isEdit?'新增角色':'修改角色'"
           :visible.sync="addRoleDialogShow"
           width="25%"
           @close="addRoleDialogClose"
           >
             <el-form :model="addform" :rules="addRules" ref="addform" label-width="auto" size="medium" label-position="right" class="demo-ruleForm"> 
               <el-form-item label="角色名称" prop="roleName">
                 <el-input v-model="addform.roleName"></el-input>
               </el-form-item>
               <el-form-item label="权限分配"  prop="permission" id="permission-radioGroup">
                   <el-checkbox-group @change="perimissionChange" v-model="addform.permission">
                     <div>
                       <el-checkbox label="1" @change="allPermissChange">所有权限</el-checkbox>
                     </div>
                     <div>
                       <el-checkbox label="2">部分权限1</el-checkbox>
                     </div>
                     <div>
                       <el-checkbox label="3">部分权限2</el-checkbox>
                     </div>     
                   </el-checkbox-group>
               </el-form-item>  
               <el-form-item label="角色说明" prop="roleIntro">
                 <el-input
                    resize="none"
                    type="textarea"
                    :rows="5"
                    v-model="addform.roleIntro">
                 </el-input>
               </el-form-item>            
             </el-form>
           <span slot="footer" class="dialog-footer">
             <el-button v-if="!isEdit" class="sys-Btn" type="primary" @click="addRole">确 定</el-button>
             <el-button v-else class="sys-Btn" type="primary" @click="confirmEditRole(id)">确 定</el-button>                
             <el-button @click="addRoleDialogShow = false">取 消</el-button>
           </span>
        </el-dialog>                
    </div>
</template>
<script>
export default {
    data() {
        return {
            addRoleDialogShow: false,
            isEdit: false,
            tableData: [
                {
                    roleName: "运营",
                    roleIntro: "运营人员使用",
                    count: "角色人数"
                }
            ],
            condition: {
              keyword: ''
            },
            roleList: [],
            id: null,
            addform: {
                roleName: "",
                permission: [],
                roleIntro: ""
            },
            addRules: {
                roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
                permission: [{ required: true, message: '请选择权限分配', trigger: 'change' }],              
            }
        }
    },
    methods: {
        /*
        **搜索
        */
        async handleSearchClick(){
          await this._getRoleList(this.condition) 
        },
        /*
        **新增角色
        */
        async addRole(){
          let data = {
            roleName: this.addform.roleName,
            powerId: this.addform.permission.join(","),
            remark: this.addform.roleIntro
          }
          let resData = await this.http.post('/platformUser/createRole', data)
          if(resData.code === 200){
            this.$message.success(resData.msg)
            await this._getRoleList()
            this.addRoleDialogShow = false
          }
        },
        /*
        **获取角色列表
        */
       async _getRoleList(condition){
         let _condition = condition
         let resData = await this.http.get('/platformUser/roleLists.api', _condition)
         if(resData.code === 200){
           this.roleList = resData.data
         }
       },
       /*
       **切换选择权限
       */
      perimissionChange(value){
        if(value.length==2 && value.indexOf('1')>=0)
        {
          this.addform.permission.splice(value.indexOf('1'), 1)
        } else if(value.length ==2 && value.indexOf('1')<0)
        {
          this.addform.permission = ['1','2','3']
        }
      },
      allPermissChange(value){
        if(value){
          this.addform.permission = ['1','2','3']
        } else {
          this.addform.permission = []
        }
        
      },
      /*
      **确定修改角色
      */
     async confirmEditRole(){
       let data = {
         id: this.id,
         roleName: this.addform.roleName,
         powerId: this.addform.permission.join(","),
         remark: this.addform.roleIntro
       }
       let resData = await this.http.post('/platformUser/updateRole.api', data)
       if(resData.code === 200){
         this.$message.success(resData.msg)
         await this._getRoleList()
         this.addRoleDialogShow = false
       } 
     },
      /*
      **编辑角色
      */
     async editRole(index){
       this.isEdit = true
       this.id = this.roleList[index].id
       this.addform.roleName = this.roleList[index].roleName
       this.addform.permission = this.roleList[index].power.split(',')
       this.addform.roleIntro = this.roleList[index].remark
       this.addRoleDialogShow = true
     },
     /*
     **删除角色
     */
    async removeRole(id){
      let _id  = id
      let resData = await this.http.get('/platformUser/deleteRole.api', {id: _id})
      if(resData.code  === 200){
        this.$message.success(resData.msg)
        this.condition.keyword = ''
        await this._getRoleList(this.condition)
      }
    },
     
      addRoleDialogClose(){
        this.addform =  {
                roleName: "",
                permission: [],
                roleIntro: ""
            }
        this.$refs.addform.resetFields()
      }
    },
    async mounted() {
      await this._getRoleList(this.condition)
    },
}
</script>
<style lang="less" scoped>
#permission-radioGroup{
  .el-radio-group{
    margin-top: 10px;
  }
  .el-radio{
    display: block;
    margin-bottom: 20px;
    &:last-child{
      margin-bottom: 0;
    }
  }

}
</style>

