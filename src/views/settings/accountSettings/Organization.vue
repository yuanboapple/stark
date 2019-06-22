<template>
  <div class="view-container">
    <h2 class="view-title">组织管理</h2>
    <div class="view-body">
      <el-button type="primary" size="small @click="showNodeDialog('top')">添加顶级</el-button>
      <el-tree
        v-if="orgTreeData.length > 0"
        :data="orgTreeData"
        :props="defaultProps"
        node-key="department_id"
        @node-click="handleNodeClick"
        default-expand-all
        :expand-on-click-node="false">
        <div 
          class="fill-width"
          slot-scope="{ node, data }"
          @mouseover="tempId = data.department_id"
          @mouseout="tempId = null">
          <span class="fill-width">
            {{ node.label }}
            <span v-show="tempId == data.department_id">
              <el-button
                type="text" @click.stop="addTree(data)">
                添加次级
              </el-button>
              <el-button
                type="text"
                @click.stop="editTree(data)">
                编辑
              </el-button>
              <el-button
                type="text"
                class="text-danger"
                @click.stop="deleteTree(data)">
                删除
              </el-button>
            </span>
          </span>
        </div>
      </el-tree>
    </div>
    <div class="view-footer"></div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        orgTreeData:    [],
        tempId:      null, //鼠标浮动对应的节点id
        defaultProps: {
          children: 'child',
          label: 'depart_name'
        },
      }
    },
    mounted() {
      this.getOrgTreeData()
    },
    methods: {
      /**
       * 查询树形数据 并赋予初始值
       * @return {[type]} [description]
       */
      getOrgTreeData() {
        
        let config = {
          method: "get",
          params: {},
          url: `${this.common.basePath}/admin/admin/showDepartment`
        }
        this.axios(config).then(response => {
          this.orgTreeData = response.data
        }).catch(error => {
          this.$message.error("失败")
        })
      },
      showNodeDialog(type) {

      }
    }
  }
</script>