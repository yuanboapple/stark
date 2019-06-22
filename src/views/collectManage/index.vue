<template>
    <div>
        <div class="contain-head">
            <div class="head-pre"></div>
            <span class="head-title">收款管理</span>
        </div> 
        <div class="contain-footer">
             <el-tabs v-model="activeName" type="card" @tab-click="tabClick">
                <el-tab-pane class="tabitem active-tab" label="支付宝收款" name="first">
                    <alipay-collect></alipay-collect>  
                </el-tab-pane>
                <el-tab-pane label="微信收款" name="second">
                </el-tab-pane>
             </el-tabs>             
        </div>         
    </div>
    
</template>
<script>
import AliPayCollect from './components/AlipayCollect.vue'
export default {
    components:{
        "alipay-collect": AliPayCollect,
    },
    data() {
        return {
            activeName:'first',
        }
    },
    methods: {
        tabClick(){

        }
    },
}
</script>

