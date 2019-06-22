<template>
  <el-menu
    id="nav"
    :default-active="activeNav"
    class="no-border-right"
    background-color="#fff"
    :unique-opened="true"
    text-color="#606266"
    @select="navClicked"
    active-text-color="#409EFF">
    <el-submenu :index="item.name" v-for="(item, index) in navArray" v-if="item.meta.showNav" :key="`${item.name}一级导航`">
        <template slot="title">{{ item.routerName }}</template>
        <el-menu-item v-for="(itemInner, indexInner) in item.children" :index="itemInner.name" :key="`${itemInner.routerName}二级导航`">{{itemInner.meta.routerName}}</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    data () {
      return {
        navArray: [],
        activeNav: 'password',
      }
    },
    props: {
    },
    watch: {
    },
    created () {
      this.activeNav = this.$route.name // 刷新导航显示
      this.buildNav()
    },
    mounted () {
    },
    methods: {
      buildNav () {
        this.navArray = this.$router.options.routes
        console.log(this.navArray)
      },
      navClicked (path, pathArray) {
        console.log(path)
        this.$router.push({name: path})
      },
    }
  }
</script>
