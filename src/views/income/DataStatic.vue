<template>
  <div>
        <div class="contain-head">
            <div class="head-pre"></div>
            <span class="head-title" >收益统计</span>
        </div>
     <template v-if="Object.keys(services).length">
         <!-- Stark平台收益统计 -->
        <div class="contain-middle" v-if="$store.state.userData.platform==='stark'">
        
            <!-- today -->
            <div class="contain-middle-item  stark-item statistic-Color-Block">
                  <img src="../../assets/imgs/main/orange.jpg" class="item-bkg" alt="">
                  <span class="item-title">{{services.today.title}}</span>
                   <div class="item-value">
                    <span class="item-CNY-value">{{services.today.data[0].amount}}（{{services.today.data[0].company}}）</span>
                    <span class="item-USDY-value">{{services.today.data[1].amount}}（{{services.today.data[1].company}}）</span>
                   </div>
            </div>
            <div class="contain-middle-item  stark-item statistic-Color-Block">
                  <img src="../../assets/imgs/main/blue.jpg" class="item-bkg" alt="">
                  <span class="item-title">{{services.yesterday.title}}</span>
                   <div class="item-value">
                    <span class="item-CNY-value">{{services.yesterday.data[0].amount}}（{{services.yesterday.data[0].company}}）</span>
                    <span class="item-USDY-value">{{services.yesterday.data[1].amount}}（{{services.yesterday.data[1].company}}）</span>
                   </div>
            </div> 
            <div class="contain-middle-item  stark-item statistic-Color-Block">
                  <img src="../../assets/imgs/main/red.jpg" class="item-bkg" alt="">
                  <span class="item-title">{{services.lastMonth.title}}</span>
                   <div class="item-value">
                    <span class="item-CNY-value">{{services.lastMonth.data[0].amount}}（{{services.lastMonth.data[0].company}}）</span>
                    <span class="item-USDY-value">{{services.lastMonth.data[1].amount}}（{{services.lastMonth.data[1].company}}）</span>
                   </div>
            </div> 
            <div class="contain-middle-item  stark-item statistic-Color-Block">
                  <img src="../../assets/imgs/main/purple2.jpg" class="item-bkg" alt="">
                  <span class="item-title">{{services.all.title}}</span>
                   <div class="item-value">
                    <span class="item-CNY-value">{{services.all.data[0].amount}}（{{services.all.data[0].company}}）</span>
                    <span class="item-USDY-value">{{services.all.data[1].amount}}（{{services.all.data[1].company}}）</span>
                   </div>
            </div>
            <div class="contain-middle-item  stark-item statistic-Color-Block">
                  <img src="../../assets/imgs/main/green.jpg" class="item-bkg" alt="">
                  <span class="item-title">{{services.commissionToday.title}}</span>
                  <span class="item-value">{{services.commissionToday.data.amount}}（{{services.commissionToday.data.company}}）</span>
            </div> 
            <div class="contain-middle-item  stark-item statistic-Color-Block">
                  <img src="../../assets/imgs/main/orange2.jpg" class="item-bkg" alt="">
                  <span class="item-title">{{services.commissionAll.title}}</span>
                   <span class="item-value">{{services.commissionAll.data.amount}}（{{services.commissionAll.data.company}}）</span>
            </div> 
            <div class="contain-middle-item  stark-item statistic-Color-Block">
                  <img src="../../assets/imgs/main/purple.jpg" class="item-bkg" alt="">
                  <span class="item-title">{{services.orderAmount.title}}</span>
                  <span class="item-value">{{services.orderAmount.data.amount}}</span>
            </div>                                                                                                                          
        </div>
        <!-- 承兑商平台收益统计 -->
        <div v-else class="contain-middle" >
            <div class="contain-middle-item acceptance-item  statistic-Color-Block">
                  <img src="../../assets/imgs/main/purple.jpg" class="item-bkg" alt="">
                  <span class="item-title">总交易额</span>
                  <span class="item-value">{{services.all.data.amount}}（{{services.all.data.company}}）</span>
            </div>             
            <div class="contain-middle-item acceptance-item  statistic-Color-Block">
                  <img src="../../assets/imgs/main/orange.jpg" class="item-bkg" alt="">
                  <span class="item-title">{{services.today.title}}</span>
                  <span class="item-value">{{services.today.data.amount}}（{{services.today.data.company}}）</span>
            </div>
            <div class="contain-middle-item acceptance-item  statistic-Color-Block">
                  <img src="../../assets/imgs/main/red.jpg" class="item-bkg" alt="">
                  <span class="item-title">今日订单数量</span>
                  <span class="item-value">{{services.todayOrderNum}}</span>
            </div>             
            <div class="contain-middle-item acceptance-item  statistic-Color-Block">
                  <img src="../../assets/imgs/main/blue.jpg" class="item-bkg" alt="">
                  <span class="item-title">{{services.yesterday.title}}</span>
                  <span class="item-value">{{services.yesterday.data.amount}}（{{services.yesterday.data.company}}）</span>
            </div>            
            <div class="contain-middle-item acceptance-item  statistic-Color-Block">
                  <img src="../../assets/imgs/main/red.jpg" class="item-bkg" alt="">
                  <span class="item-title">{{services.lastMonth.title}}</span>
                  <span class="item-value">{{services.lastMonth.data.amount}}（{{services.lastMonth.data.company}}）</span>
            </div>
            <div class="contain-middle-item acceptance-item  statistic-Color-Block">
                  <img src="../../assets/imgs/main/green.jpg" class="item-bkg" alt="">
                  <span class="item-title">{{services.todayCommission.title}}</span>
                  <span class="item-value">{{services.todayCommission.data.amount}}（{{services.todayCommission.data.company}}）</span>
            </div>
            <div class="contain-middle-item acceptance-item  statistic-Color-Block">
                  <img src="../../assets/imgs/main/orange2.jpg" class="item-bkg" alt="">
                  <span class="item-title">{{services.allCommission.title}}</span>
                  <span class="item-value">{{services.allCommission.data.amount}}（{{services.allCommission.data.company}}）</span>
            </div>
            <div class="contain-middle-item acceptance-item  statistic-Color-Block">
                  <img src="../../assets/imgs/main/purple2.jpg" class="item-bkg" alt="">
                  <span class="item-title">历史订单总量</span>
                  <span class="item-value">{{services.historyOrder}}</span>
            </div>                                                                                   
        </div> 
    </template>            
        <div class="contain-footer">
            <income-table></income-table>
        </div>
  </div>
</template>
<script>
import IncomeTable from '../../components/IncomeTable.vue'
import { async } from 'q';
export default {
    components:{
        "income-table":IncomeTable
     },
    data() {
        return {
            services: {
            },
            condition: {

            },
            orderList: []
        }
    },
    methods: {
        _starkDataStatic(){
            let config = {
                methods: "GET",
                params:{},
                url: `${this.common.basePath}/statistics/countStark.api`
            }
            this.axios(config).then((result) => {
                if(result.code === 200)
                {
                    this.services = result.data
                }
            }).catch((err) => {
                 this.$message.error(err.msg) 
            });
        },
        async _contractorDataStatic(){
            let resData = await this.http.get('/statistics/countAcceptance.api')
            if(resData.code === 200){
                this.services = resData.data
            }        
        },
    },
    async mounted() {
        if(this.$store.state.userData.platform==='stark'){
            this._starkDataStatic()
        }
        else{
            this._contractorDataStatic()
            
        }
        
    },
}
</script>
<style lang="less" scoped>
.contain-head{
    margin-bottom: 2vh;
}
.contain-middle{
    display: flex;
    flex-wrap: wrap;
  .contain-middle-item{
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    color: #fff;
    font-size: 1.6667rem;

    .item-bkg{
         position: absolute;
         width: 100%;
         height: 100%;
         left: 0;
         top: 0;
         z-index: 0;
     }
     .item-title{
       z-index: 9;
     }
     .item-value{
          
         display: flex;
         margin-top: 1.5vh;
         z-index: 9;
         flex-direction: column;
     }
  }
  .stark-item{
    
    width: 14%;
    height: 14.1667rem;
    margin-right: 0.333333%;
    &:last-child{
         margin-right: 0;
    }    
  }
  .acceptance-item{
    width: 24%;
    height: 14.1667rem;
    justify-content: space-evenly;
    margin-right: 1.3333%;
    margin-bottom: 1rem;
    &:nth-child(4n+4){
         margin-right: 0;
    }   
    
  }
}
</style>
<style lang="less">

</style>

