<template>
    <div>
        <div class="contain-head">
            <div class="head-pre"></div>
            <span class="head-title">用户管理</span>
        </div> 
        <div class="contain-footer">
            <user-manage></user-manage>
        </div>
                        
    </div>
</template>
<script>
import UserManageVue from './components/UserManage.vue';
export default {
    components: {
      "user-manage": UserManageVue
    },
    data() {
        return {
            
      
        }
    },
    methods: {

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
