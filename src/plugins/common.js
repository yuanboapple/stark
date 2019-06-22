import vue from 'vue';
import { MessageBox } from 'element-ui';
import router from '.././router'
import store from '.././store'
import qs from "qs"
const Vue = new vue({router, store}); //注册router, 实例中调用

export default {
  basePath:      `${window.location.origin}/site`,
  emailReg:      /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
  mobileReg:     /^1[34578]\d{9}$/,
  /**
   * 重新查询最新的用户信息, 并保存到session和vuex
   * @return {[type]} [description]
   */
  reLogin() {
    let config = {
      url: `${this.basePath}/admin/admin/adminLogin`,
      method: "patch",
      data: null
    }
    Vue.axios(config).then(response => {
      Vue.$message.success("成功");
    }).catch(error => {
      Vue.$message.error(error);
    })
  },
  /*
  **对象深拷贝
  */
  objDeepCopy(obj){
    return JSON.parse(JSON.stringify(obj)) 
  },
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
      }
    } else {
      delete node.childrens
    }
  },
  /**
  * 将时间戳转换为某年某月某日 00：00：00
  * @params {string/number} timeSetback 时间戳
  * @params {string} format 时间格式
  */
  _convertDate(timeSetback, format){
    return timeSetback ? new Date(timeSetback).Format(format) : '无';
  },

  /**
  * 将Date对象转换为某年某月某日 00：00：00
  * @params {Date} date Date对象
  */
  formatDate (date) {
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? ('0' + m) : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    return y + '-' + m + '-' + d
  },
  formatTimeDate (date) {
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? ('0' + m) : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    var h = date.getHours();  
    var minute = date.getMinutes();  
    minute = minute < 10 ? ('0' + minute) : minute; 
    var second= date.getSeconds();  
    second = minute < 10 ? ('0' + second) : second;  
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+ second;  
  },
  /**
   * 通用方法用于返回之前浏览的页面, 当path丢失时返回首页
   * @return {[type]} [description]
   */
  backForward () {
    let path = sessionStorage.getItem("historyPath") || "/"
    Vue.$router.push({path: path})
  },
  /*
   * 性别
   */
  transferGender(sex){
    return sex == 1 ? '男' : '女'
  },
  /**
   * 根据日期字符串获取星期几
   * @param dateString 日期字符串（如：2016-12-29），为空时为用户电脑当前日期
   * @returns {String}
   */
  getWeek(dateString){ 
    var date; 
    date = new Date(dateString) 
    return "星期" + "日一二三四五六".charAt(date.getDay());
  },
  /*
   * blod 下载附件
   */
  _fileBold(response) { 
    let fileName = decodeURI(response.headers['content-disposition'].substring(20, response.headers['content-disposition'].length));
    let url = window.URL.createObjectURL(new Blob([response.data]))
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
  },
  
}
/*
*   格式化日期格式
*/
Date.prototype.Format = function (fmt) {
  var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "h+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
