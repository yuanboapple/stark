import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import './assets/style/common.less'
import 'font-awesome/css/font-awesome.css'

Vue.config.productionTip = false
Vue.config.devtools = true
//引用公用js
import commonJS from "./plugins/common.js"
Vue.prototype.common = commonJS;
//引用网络工具js
import {http} from "./plugins/http.js"
Vue.prototype.http = http;
// 全局引入axios 并配置
import axios from 'axios'
import qs from 'qs'
Vue.prototype.$qs = qs
//引入js-md5
import md5 from 'js-md5';
window.md5Js = md5
Vue.prototype.md5 = md5;

// 引入echarts
import echarts from 'echarts' 
Vue.prototype.echarts = echarts 

//引入markdown编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)
axios.defaults.baseURL = commonJS.basePath
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
Vue.prototype.axios = axios;

/******************axios拦截器****************/
//request 拦截 在非登录或文章相关接口调用时 获取session中的认证数据
// Vue.prototype.axios.interceptors.request.use(
//   (config, Vue) => {
//     if(config.data) {
//       config.data.token = sessionStorage.getItem("token") || null
//     }
//     if(config.params) {
//       config.params.token = sessionStorage.getItem("token") || null
//     }
    
//     return config
//   }, 
//   error => {
//     return Promise.reject(error)
//   }
// )

//response 拦截
Vue.prototype.axios.interceptors.response.use(
  (response, Vue) => {
    //请求成功的拦截
    if(response.hasOwnProperty('data'))
    {
      if(response.data.code == 200) {
        return response.data
      } else {
        return Promise.reject(response.data)
      }
    }
    else
    {
      if(response.code == 200) {
        return response
      } else {
        return Promise.reject(response)
      }
    }

    /*if (response.config.responseType != "blob") {  //非文件类型不进行处理
      if (response.data.meta.code == "401") {
        // 抛出未登录异常, 并定时跳转至登录页
        setTimeout(() => {
          window.location.href = window.location.origin + "/web/login"
        }, 1500)
        return Promise.reject("未登陆或登陆信息失效!")
      } else if (response.data.meta.code != 0) {
        // 抛出请求失的异常
        return Promise.reject(response.data.meta.message)
      } else {
        // 无异常直接返回
        return response
      }
    } else { //文件类型直接返回
      return response
    }*/
    // 当meta信息为空时，表示后台回传的文件流
    // if(!response.data.meta) return response;

    // if (response.data.meta.code != 0) { 

    //   if(response.data.meta.code == 401 || response.data.meta.code == 405) {
    //     setTimeout(() => {
    //       window.location.href = window.location.origin + "/web/login"
    //     }, 1500)
    //     return Promise.reject("登录验证失效, 请重新登录");
    //   } else if (response.data.meta.code == 403) {
    //     setTimeout(() => {
    //       window.location.href = window.location.origin + "/web/login"
    //     }, 2000)
    //     return Promise.reject("您的权限已被修改, 请重新登录");
    //   } else {
    //     return Promise.reject(response.data.meta.message)
    //   }
    // } else {
    //   return response
    // }
  }, 
  error => {
    // if (error.response.data.msg) {

    //   return Promise.reject(error.data.msg)
    // } else { //请求没有返回体, 请求失败

    //   return Promise.reject("网络错误, 请联系管理员");
    // }
  }
);

new Vue({
  router,
  store,
  render: function (createElement) {
    let routeMeta = this.$route.meta
    let props = {}
    // 控制是否显示 带导航的布局 || 空白布局
    if (routeMeta && routeMeta.showNav) {
      props.layout = 'nav-layout'
    } else {
      props.layout = 'blank-layout'
    }
    return createElement(App, {props})
  }
}).$mount('#app')
