import axios from 'axios'
import vue from 'vue';
import commonJS from "./common.js"
const Vue = new vue();
const qs = require('qs')
const http = {
    async get (url, data) {
      let _data = {}
      if(data === undefined){
        _data = data
      } else {
        _data = commonJS.objDeepCopy(data)
      }
      try {
        for (const key in _data) {
          if (_data.hasOwnProperty(key)) {
            if(!_data[key])
            {
              if(_data[key]===0);
              else {
                delete _data[key]
              }
            }
          }
        }
        
        let res = await axios.get(url, {params: _data})
        if(!res.hasOwnProperty('data')){
           res['data'] = ''
        }
        return new Promise((resolve) => {
          if (res.code === 200) {
            resolve(res)
          } else {
            reject(res)
          }
        })
      } catch (err) {
        Vue.$message.error(err.msg);
      }
    },
    async post (url, data) {

      let _data = {}
      if(data === undefined){
        _data = data
      } else {
        _data = commonJS.objDeepCopy(data)
      }
      try {
        for (const key in _data) {
          if (_data.hasOwnProperty(key)) {
            console.log(_data[key])
            if(!_data[key])
            {
              if(_data[key] === 0);
              else {
                delete _data[key]
              }
             
            }
          }
        }       
        let res = await axios.post(url, qs.stringify(_data))
         if(!res.hasOwnProperty('data')){
            res['data'] = ''
         }
        return new Promise((resolve, reject) => {
          if (res.code === 200) {
            resolve(res)
          } else {
            reject(res)
          }
        })
      } catch (err) {
        Vue.$message.error(err.msg);
        return new Promise((resolve, reject) => {
          resolve(err)
        })
      }
    },
  }
  export { http }