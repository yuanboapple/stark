<template>
    <div>
        <div class="contain-head">
            <div class="head-pre"></div>
            <span class="head-title">角色管理</span>
        </div>
        <div class="contain-footer">
            <role-manage></role-manage>                                     
        </div>            
    </div>
</template>
<script>
import RoleManage from './components/RoleManageTempl'
export default {
    components:{
        "role-manage": RoleManage
    },
    data() {
        return {

        }
    },
    methods: {   
    },    
}
</script>
