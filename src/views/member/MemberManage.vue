<template>
  <div class="view-container">
    <h2 class="view-title">会员管理</h2>
    <div class="view-body">
      <!-- 搜索表单 -->
      <el-form ref="searchForm" label-width="90px" class="mart20">
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="会员姓名：">
              <el-input class="fill-width" placeholder="输入会员名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="会员姓名：">
              <el-input class="fill-width" placeholder="输入会员名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="会员姓名：">
              <el-input class="fill-width" placeholder="输入会员名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button class="fill-width" type="success">搜索</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        :data="tableData"
        border 
        style="width: 100%;">
        <el-table-column
          prop="id"
          label="序号"
          align="center"
          width="90">
        </el-table-column>
        <el-table-column
          prop="message"
          label="会员信息"
          align="center"
          width="140">
        </el-table-column>
        <el-table-column
          prop="nick"
          label="微信昵称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          align="center"
          width="140">
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          align="center"
          width="90">
        </el-table-column>
        <el-table-column
          prop="grade"
          label="会员等级"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="integral"
          align="center"
          width="90"
          label="积分">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="90">
          <template slot-scope="scope">
            <el-button
            @click="handleEdit"
            type="text"
            size="small">
            详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    
      
   
      
    
    <!-- <div class="btns">
      <div class="item" style="width:230px;">
        <div class="item-title">会员姓名：</div>
        <el-input v-model="input0" placeholder="输入会员名称" style="width:128px;"></el-input>
      </div>
      <div class="item" style="width:215px;">
        <div class="item-title" style="width:64px;">手机号：</div>
        <el-input v-model="input1" placeholder="输入会员手机号" style="width:128px;"></el-input>
      </div>
      <div class="item" style="width:198px;">
        <div class="item-title" style="width:48px;">性别：</div>
        <el-select v-model="value0" placeholder="请选择" style="width:128px;">
        <el-option
          v-for="item in options0"
          :key="item.value0"
          :label="item.label"
          :value="item.value0"
        ></el-option>
        </el-select>
      </div>
      <div class="item" style="width:230px;">
        <div class="item-title">会员来源：</div>
        <el-select v-model="value1" placeholder="请选择" style="width:128px;">
        <el-option
          v-for="item in options1"
          :key="item.value1"
          :label="item.label"
          :value="item.value1"
        ></el-option>
        </el-select>
      </div>
      <el-button style="background-color:#68981E;color:#FFFFFF;width:105px;height:40px;">查询</el-button>
    </div> -->
    <div class="view-footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[15, 30, 45, 60]"
        :page-size="15"
        layout="total, sizes, prev, pager, next, jumper"
        :total="20">
      </el-pagination>
    </div>
  </div>
</template>

  <script>
  export default {
  data() {
    return {
    input0: "",
    input1: "",
    options0: [{
    value0: '选项1',
    label: '男'
  }, {
    value0: '选项2',
    label: '女'
  }],
    value0: '',
    options1: [{
    value1: '选项1',
    label: '来源1'
  }, {
    value1: '选项2',
    label: '来源2'
  }],
    value1: '',
    tableData: [{
    id: '1',
    message: '会员信息',
    nick: '会员的微信昵称',
    phone:"13100456789",
    gender:"男",
    grade:"普卡会员",
    integral:"100"
    }, {
    id: '2',
    message: '补充的会员姓名',
    nick: '会员的微信昵称',
    phone:"13100456789",
    gender:"女",
    grade:"银卡会员",
    integral:"200"
    }
    , {
    id: '3',
    message: '补充的会员姓名',
    nick: '会员的微信昵称',
    phone:"13100456789",
    gender:"女",
    grade:"银卡会员",
    integral:"200"
    }
    , {
    id: '4',
    message: '补充的会员姓名',
    nick: '会员的微信昵称',
    phone:"13100456789",
    gender:"女",
    grade:"银卡会员",
    integral:"200"
    }
    , {
    id: '5',
    message: '补充的会员姓名',
    nick: '会员的微信昵称',
    phone:"13100456789",
    gender:"女",
    grade:"银卡会员",
    integral:"200"
    }
    , {
    id: '6',
    message: '补充的会员姓名',
    nick: '会员的微信昵称',
    phone:"13100456789",
    gender:"女",
    grade:"银卡会员",
    integral:"200"
    }
    , {
    id: '6',
    message: '补充的会员姓名',
    nick: '会员的微信昵称',
    phone:"13100456789",
    gender:"女",
    grade:"银卡会员",
    integral:"200"
    }
    , {
    id: '6',
    message: '补充的会员姓名',
    nick: '会员的微信昵称',
    phone:"13100456789",
    gender:"女",
    grade:"银卡会员",
    integral:"200"
    }
    , {
    id: '6',
    message: '补充的会员姓名',
    nick: '会员的微信昵称',
    phone:"13100456789",
    gender:"女",
    grade:"银卡会员",
    integral:"200"
    }
    , {
    id: '6',
    message: '补充的会员姓名',
    nick: '会员的微信昵称',
    phone:"13100456789",
    gender:"女",
    grade:"银卡会员",
    integral:"200"
    }
    , {
    id: '6',
    message: '补充的会员姓名',
    nick: '会员的微信昵称',
    phone:"13100456789",
    gender:"女",
    grade:"银卡会员",
    integral:"200"
    }
    , {
    id: '6',
    message: '补充的会员姓名',
    nick: '会员的微信昵称',
    phone:"13100456789",
    gender:"女",
    grade:"银卡会员",
    integral:"200"
    }
    , {
    id: '7',
    message: '补充的会员姓名',
    nick: '会员的微信昵称',
    phone:"13100456789",
    gender:"女",
    grade:"银卡会员",
    integral:"200"
    }
    , {
    id: '8',
    message: '补充的会员姓名',
    nick: '会员的微信昵称',
    phone:"13100456789",
    gender:"女",
    grade:"银卡会员",
    integral:"200"
    }
    , {
    id: '15',
    message: '补充的会员姓名',
    nick: '会员的微信昵称',
    phone:"13100456789",
    gender:"女",
    grade:"银卡会员",
    integral:"200"
    }],
    currentPage1: 1,
    currentPage2: 2,
    currentPage3: 3,
    currentPage4: 4
    };
  },
  methods:{
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleEdit(){
      this.$router.push({ name: 'MemberDetail'})
    }
  }
};
</script>
<style lang="scss" scoped>
  
</style>
