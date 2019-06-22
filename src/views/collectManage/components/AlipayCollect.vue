<template>
    <div>
                  <div class="contain-footer-bottom">
                                <el-table
                                  :data="tableData"
                                  size="medium"
                                  border
                                  style="width: 100%">
                                  <el-table-column
                                    align="center"
                                    label="是否启用"
                                    width="80">
                                  </el-table-column>
                                  <el-table-column
                                    align="center"
                                    type="index"
                                    label="序号"
                                    width="60">
                                  </el-table-column>
                                  <el-table-column
                                    align="center"
                                    prop="owner"
                                    label="收款码所有人"
                                    min-width="150">
                                      <template slot-scope="scope">
                                         <div class="collect-addOwner" v-if="!scope.row.owner">
                                           <el-input v-model="addCollect.owner"></el-input>
                                           <el-button size="mini" class="sys-Btn">确认</el-button>
                                         </div>
                                         <template v-else>
                                           {{scope.row.owner}}
                                         </template>
                                     </template>                                  
                                  </el-table-column>
                                  <el-table-column
                                    prop="account"
                                    align="center"
                                    label="支付宝账号"
                                    min-width="150">
                                      <template slot-scope="scope">
                                         <div class="collect-addOwner" v-if="!scope.row.account">
                                           <el-input v-model="addCollect.account"></el-input>
                                           <el-button size="mini" class="sys-Btn">确认</el-button>
                                         </div>
                                         <template v-else>
                                           {{scope.row.account}}
                                         </template>
                                     </template>                                                                      
                                  </el-table-column>

                                  <el-table-column
                                    align="center"
                                    prop="shoukuanma"
                                    label="支付宝收款码"
                                    min-width="120">
                                  </el-table-column>
                                  <el-table-column
                                    align="center"
                                    prop="saleman"
                                    label="收款码业务员"
                                    min-width="120">
                                     <template slot-scope="scope">
                                         <el-dropdown v-if="!scope.row.saleman" size="mini"   trigger="click">
                                           <el-button class="sys-Btn" size="mini">
                                             选择<i class="el-icon-arrow-down el-icon--right"></i>
                                           </el-button>
                                           <el-dropdown-menu slot="dropdown">
                                             <el-dropdown-item>业务员1</el-dropdown-item>
                                             <el-dropdown-item>业务员2</el-dropdown-item>
                                             <el-dropdown-item>业务员3</el-dropdown-item>
                                           </el-dropdown-menu>
                                         </el-dropdown>
                                         <template v-else>
                                             {{scope.row.saleman}}
                                         </template>
                                     </template>
                                  </el-table-column> 
                                  <el-table-column
                                    align="center"
                                    prop="range"
                                    label="收款额度区间"
                                    min-width="120">
                                     <template slot-scope="scope">
                                         <i v-if="!scope.row.range"  class="el-icon-edit"></i>
                                         <template v-else>
                                           {{scope.row.range}}
                                         </template>
                                     </template>
                                  </el-table-column>
                                  <el-table-column
                                    align="center"
                                    label="收款链接"
                                    min-width="120">
                                    <template>
                                        <el-button   class="sys-Btn" size="small">查看</el-button>
                                    </template>
                                  </el-table-column>                                                                                                      
                                  <el-table-column
                                    align="center"
                                    label="操作"
                                    width="180">
                                      <template>
                                        <el-button   type="success" size="small">启用</el-button>
                                        <el-button   type="disabled"  size="small" disabled>禁用</el-button>
                                      </template>                                    
                                  </el-table-column>                                                                                                       
                                </el-table>
                                <div class="addNewCollectTool" @click="addCollectRow">
                                    <i   class="el-icon-circle-plus-outline"></i>
                                    <span class="addNewCollecTitle">增加新的收款信息</span>
                                </div>
                  </div>        
    </div>
</template>
<script>
export default {
    data() {
        return {
          addCollect: {
            owner: '',
            account: '',
          },
            tableData: [
                {
                owner: "张三",
                account: "13829348579",
                shoukuanma:"1231",
                saleman: "雷鸣",
                range: "0-5000",
                linking: "www.baidu.com"
                },
                {
                owner: "张三",
                account: "13829348579",
                shoukuanma:"1231",
                saleman: null,
                range: null,
                linking: "www.baidu.com"
                },                
            ]
        }
    },
    methods: {
      addCollectRow(){
        this.tableData.push({owner: '',account: '',shoukuanma: '',saleman: '',range: '',linking:''})
      }
    },
    
}
</script>
<style lang="less" scoped>
.el-icon-edit{
    color: #1989FA;
    font-size: 1.25rem;
}
.addNewCollectTool{
    display: flex;
    cursor: pointer;
    align-items: center;
    margin-top: 1.6667rem;
    color: #1989FA;
    .el-icon-circle-plus-outline{
        font-size: 1.25rem;
    }
    .addNewCollecTitle{
        font-size: 1.1667rem;
        margin-left: .9167rem;
    }

}

</style>
<style lang="less">
.collect-addOwner{
  display: flex;
  justify-content: center;
  height: 30px;
  .el-input{
    width: 60%;
    height: 30px;
    .el-input__inner{
      border-radius: 0px;
      height: 30px;
    }
  }
  .el-button{
    border-radius: 0px;
  }

}
</style>
