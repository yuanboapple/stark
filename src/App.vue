<template>
  <div id="app">
    <!-- 根据需要显示不同的布局情况 -->
    <component :is="layout"></component>
  </div>
</template>

<script>
  import BlankLayout from "./layout/BlankLayout.vue";
  import NavLayout from "./layout/NavLayout.vue"
  import MyNavLayout from "./layout/MyNavLayout"
  import qrcode from "qrcode.vue"
import { constants } from 'crypto';

  export default {
    props: {
      layout: {
        type: String,
        default: "nav-layout"
      }
    },
    watch: {
      "$route": {
        handler (to, from) {
          //跳转到新页面时, 清空vuex的权限内容, 重新比对
          // this.$store.commit("setAuthority", null)
          // if(from.path) {
          //   sessionStorage.setItem("historyName", from.name)
          // }
        },
        deep: true
      }
    },
    components: {
      "qrcode":       qrcode,
      "nav-layout":   MyNavLayout,                                    
      "blank-layout": BlankLayout
    },
		data() {
      return {

      };
    },
    created() {
      if(!localStorage.getItem("user")) {
        this.$store.commit("saveUserData", "{}")
      } else {
        this.$store.commit("saveUserData", localStorage.getItem("user"))
      }
    },
		mounted() {
      //页面刷新 查询token 没有则不设置token
      if(!!sessionStorage.getItem("token")) {
        this.axios.defaults.headers.common['token'] = sessionStorage.getItem("token")
      } else {
        this.axios.defaults.headers.common['token'] = ""
      }
      //切换角色，切换主题
      if(localStorage.getItem("user"))
      {
        let user = JSON.parse(localStorage.getItem("user"))
        if(user.platform === "stark"){
          document.getElementById('app').className = "themea"
        } else if(user.platform === 'acceptance'){
           document.getElementById('app').className = "themeb"
        } else {
          document.getElementById('app').className = "themec"
        }
      }      
		},
    methods: {
      /**
       * 遍历树(递归遍历), 删除空白的childrens
       * @param  {object}   node         根节点(单个对象, 多个树需要重复调用)
       * @return none
       */
      traverseTree (node) {
        if (!node) {
          return;
        }
        if (node.childrens && node.childrens.length > 0) {
          var i = 0;
          for (i = 0; i < node.childrens.length; i++) {
            this.traverseTree(node.childrens[i]);
            console.log(node.childrens[i])
          }
        }
      },
    }
  }
</script>
<style lang="less">
#app
{
  width: 100%;
  height: 100%;
}
</style>

