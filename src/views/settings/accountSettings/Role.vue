<template>
  <div class="view-container">
    <h2 class="view-title">角色管理</h2>
    <div class="view-body">
      <el-row :gutter="20">
        <el-col :span="2">
          <el-button
            @click="showRoleDialog"
            type="primary">
            新增角色
            </el-button>
          </el-col>
        <el-col :span="22">
          <el-form ref="searchForm">
            <el-form-item>
              <el-input></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        center
        border>
        <el-table-column
          prop="role_name"
          label="角色名称"
          width="90">
        </el-table-column>
        <el-table-column
          prop="description"
          label="角色说明"
          >
        </el-table-column>
        <el-table-column
          prop="role_num"
          label="角色人数"
          width="100">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="90">
          <template slot-scope="scope">
            <el-button
            @click="showRoleDialog"
            type="primary"
            size="small">
            编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="view-footer"></div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [],
      }
    },
    mounted() {
      this.getTableData()
    },
    methods: {
      /**
       * 获取表格数据
       * @return {[type]} [description]
       */
      getTableData() {
        
        let config = {
          method: "get",
          params: {},
          url: `${this.common.basePath}/admin/admin/showRole`
        }
        this.axios(config).then(response => {
          this.tableData = response.data
        }).catch(error => {
          this.$message.error("失败")
        })
      },
      /**
       * 显示新增/编辑 对话框
       * @param  {[type]} type [description]
       * @return {[type]}      [description]
       */
      showRoleDialog(type) {

      },
    }
  }
</script>