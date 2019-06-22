<template>
    <div>
        <div class="contain-head">
            <div class="head-pre"></div>
            <span class="head-title">账号管理</span>
        </div> 
        <div class="contain-footer">
             <el-tabs v-model="activeName" type="card" @tab-click="tabClick">
                <el-tab-pane class="tabitem active-tab" label="用户管理" name="first">
                  <user-manage></user-manage>
                </el-tab-pane>
                <el-tab-pane label="角色管理" name="second">
                  <role-manage></role-manage>
                </el-tab-pane>
             </el-tabs>             
        </div>
                        
    </div>
</template>
<script>
import RoleManage from './components/RoleManageTempl'
import UserManageVue from './components/UserManage.vue';
export default {
    components: {
      "role-manage": RoleManage,
      "user-manage": UserManageVue
    },
    data() {
        return {
            activeName:'first',
      
        }
    },
    methods: {
        tabClick(){

        },

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
