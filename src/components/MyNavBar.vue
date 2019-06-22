<template>
    <el-menu 
      id="nav"
      class="el-menu-vertical-demo"
      :default-active="activeNav"
      text-color="#666666"
      active-text-color="#54B3D9"
      :unique-opened="true"
      @select="navClicked"
      @open="handleOpen"
      @close="handleClose">
      <template   v-for="(item, index) in navArr">
        <template v-if="(item.meta.showNav)&&(`${item.meta.role}`.indexOf(role)>=0)">
            <template v-if="item.hasOwnProperty('children')">
             <el-submenu   :index="item.name"  :key="`${item.name}一级导航`">
                  <template slot="title">
                    <img :src="item.meta.url" class="navIcon">
                    <span class="navTitle">{{item.meta.routerName}}</span>
                  </template>
                  <el-menu-item  class="twoNavItem" v-for="(itemInner, indexInner) in item.children" v-if="itemInner.meta.inNav&&(`${itemInner.meta.role}`.indexOf(role)>=0)" :index="itemInner.name" :key="`${itemInner.meta.routerName}二级导航`">{{itemInner.meta.routerName}}</el-menu-item>
             </el-submenu>
            </template> 
            <template v-else>
                <el-menu-item class="oneNavItem"  :index="item.name"  :key="`${item.name}一级导航`">
                        <template slot="title"> 
                          <img :src="item.meta.url" class="navIcon">
                          <span class="navTitle">{{item.meta.routerName}}</span>
                        </template>
                  </el-menu-item>
            </template>
        </template>
      </template>
    </el-menu>
</template>
<script>
import { constants } from 'crypto';

  export default {
    data() {
        return {
          openeds:[],
          role: '',
          activeNav:'',
          navArr : []
        }
    },
    watch: {
      "$route": {
        handler (to, from) {
          if(to.path)
          {
            this.activeNav = to.name
          }
        },
        deep: true
      }
    },
    created (){
        this.activeNav =  !this.$route.meta.inNav? this.$route.meta.prerouterName : this.$route.name
        this.buildTheme()
        this.buildNav()
    },
    methods: {
      navClicked(path, pathArray){
        this.$router.push({name: path})
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      buildTheme(){
        let user = JSON.parse(localStorage.getItem("user"))
        let _this = this
        this.role = user.platform
      },
      buildNav(){
          this.navArr = this.$router.options.routes
      }
    },
  }
</script>
<style lang="less">
 #nav{
     
     border-right: 0;
     .navIcon{
         width: 1.666667rem;
         height: 1.666667rem;
         margin-right: .833333rem;
     }
     .navTitle{
         font-size: 1.333333rem;
     }
     .el-submenu .el-menu-item
     {
       min-width: 260px;
       font-size: 1.333333rem;
     }
     .el-submenu__title{
         min-width: 260px;
         padding-left: 4.166667rem !important;
     }

 }
 .el-menu
 {
     width: 260px !important;
    .el-submenu:hover{
        background-color: #ffffff;
     }
    .oneNavItem{
         min-width: 260px;
         padding-left: 4.166667rem !important;       
     }
     .twoNavItem{
       padding-left: 6.666667rem !important;
       text-align: left;
     }
 }
</style>
