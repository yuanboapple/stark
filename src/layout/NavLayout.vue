<template>
  <div id="wapper">
    <transition>
      <div class="main-container">
        <div class="header">
          <img class="header-logo" src="../assets/imgs/login/logo.png">
          <h1>i-Chengdu业务管理平台</h1>
          <!-- 用户区域 -->
          <div class="user-area">
            <img src="../assets/imgs/main/user.png">
            <span>{{ $store.state.userData.user_name || "未登录"}}</span>
            <i class="fa fa-sign-out" @click="$router.push({name: 'login'})"></i>
          </div>
        </div>
        <div class="body">
          <div class="left-nav">
            <ul>
              <li v-for="(item, index) in leftNavData" :key="`${index}左侧列表`">
                <img v-if="item.url" :src="item.url">
                <span>{{ item.name }}</span>
              </li>
            </ul>
          </div>
          <div class="second-nav"><nav-bar></nav-bar></div>
          <div class="router-container"><router-view></router-view></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import qs from "qs"
  import NavBar from "../components/NavBar.vue"
  export default {
    components: {
      "nav-bar": NavBar,
    },
    data() {
      return {
        leftNavData: [
          {
            name: "会员",
            url: require("../assets/imgs/main/hy.png")
          },
          {
            name: "微官网",
            url: require("../assets/imgs/main/wg.png")
          },
          {
            name: "营销",
            url: require("../assets/imgs/main/yx.png")
          },
          {
            name: "素材",
            url: require("../assets/imgs/main/sc.png")
          },
          {
            name: "商品",
            url: require("../assets/imgs/main/sp.png")
          },
          {
            name: "系统",
            url: require("../assets/imgs/main/pt.png")
          }
        ],
      }
    },
    
    watch: {
      // "$route": {
      //   handler (to, from) {
      //     this.mainLoading = true
      //     this.$nextTick(() => {
      //       this.mainLoading = false
      //     })
      //   },
      //   deep: true
      // }
    },
    created () {
    },
    mounted() {
      
    },
    methods: {
    },
  }
</script>

<style lang="less" scoped>
  .main-container {
    background: #efefef;
    .header {
      display: flex;
      justify-content: flex-start;
      height: 70px;
      .header-logo {
        width: 50px;
        padding: 9px;
        margin-right: 5px;
        background-color: #8FC23E;
      };
      h1 {
        display: inline-block;
        width: calc( 100vw - 308px );
        margin: 0;
        padding: 0 20px;
        background-color: #fff;
        font-size: 24px;
        line-height: 70px;
        color: #8FC23E;
      }
      .user-area {
        display: flex;
        align-items: center;
        width: 180px;
        padding: 10px;
        background-color: #fff;
        img {
          height: 50px;
          border: 2px solid #8FC23E;
          border-radius: 50px;
        }
        span {
          width: 100px;
          padding: 0 10px;
          text-align: center;
        }
      }
    }
    .body {
      display: flex;
      height: calc( 100vh - 70px);
      .left-nav {
        display: inline-block;
        width: 68px;
        ul {
          height: calc( 100% - 100px );
          margin: 0;
          padding: 100px 0 0 0;
          width: 68px;
          background: #8fc23e;
          list-style: none;
          li {
            &:hover {
              cursor: pointer;
            }
            img {
              width: 26px;
              height: 26px;
              padding: 0 calc( (68px - 26px) / 2 );
            }
            span {
              display: inline-block;
              width: 100%;
              margin-bottom: 15px;
              font-size: 14px;
              text-align: center;
              color: #fff;
            }
          }
        }
      }
      .second-nav {
        display: inline-block;
        width: 200px;
        margin: 5px;
      }
      .router-container {
        display: inline-block;
        width: calc( 100vw - 285px );
        min-height: calc( 100vh - 85px);
        margin: 5px 5px 5px 0;
        overflow-y: auto;
        box-sizing: border-box;
        background: #fff;
      }
    }
  }
</style>