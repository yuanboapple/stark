<template>
    <div>
        <div class="contain-head">
            <div class="contain-head-l">
               <div class="head-pre"></div>
               <span class="head-title">提现统计</span>
            </div>            
        </div>
            <div class="contain-middle-head">
                <span class="head-subtitle">Stark火币余额总计：155234634634.165 USDT（包含手续费10000 UDST）</span>
                <span class="todayStatic">今日提现：1553.254（usdt）</span>
            </div>         
        <div class="contain-footer">
            <income-table></income-table>
        </div> 
    </div>        
</template>
<script>
import IncomeTable from '../../components/IncomeTable.vue'
export default {
    components:{
        "income-table":IncomeTable
     },    
}
</script>
<style lang="less" scoped>
.contain-head{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2vh;
    .contain-head-l{
        display: flex;
        align-items: center;
    }
    .head-subtitle{
        margin-left: 0.5vw;
        font-size: 0.85rem;
    }
    .todayStatic{
        font-size: 0.85rem;
    }
}
.contain-footer{
    padding: 15px 20px;
    margin-top: 2vh;
    background: #fff;
}
</style>
