<template>
    <div>
        <div class="contain-head">
            <div class="head-pre"></div>
            <span class="head-title">商户管理</span>
        </div>
        <div class="contain-footer">
             <el-tabs v-model="activeName" type="card" @tab-click="tabClick">
                <el-tab-pane class="tabitem active-tab" label="商户列表" name="first">
                  <business-list></business-list>
                </el-tab-pane>
                <el-tab-pane class="tabitem" label="渠道商列表" name="second">
                  <channel-list></channel-list>
                </el-tab-pane>
             </el-tabs>             
        </div>  
    </div>
</template>
<script>
import BusinessList from './components/BusinessList'
import ChannelList from "./components/ChannelList"
export default {
    components:{
      "business-list": BusinessList,
      "channel-list": ChannelList
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
    mounted() {
        
    },
    
}
</script>
<style lang="less" >
.user-state-input{
    width: 8vw;
    margin-right: 1.25rem;
}
.searchTool{
    width: 10vw;
}
.el-form-item{

    .commission-input{
            width: 40% ;
        }
    .commission-info{
        font-size: .875rem;
        color: #666666;
    }    

}
</style>
