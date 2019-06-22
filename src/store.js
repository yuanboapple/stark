import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userData: {},
    loading: false,
  },
  mutations: {
    /**
     * 保存用户数据
     * @param {[type]} state [description]
     * @param {[type]} data  [description]
     */
    saveUserData(state, data, key) {
      state.userData = JSON.parse(data)
    },
    /*
    **启动动画
    */
   openLoading(state, data){
     state.loading = data
   },
    /**
     * 更新用户数据,按key更新
     * @param  {[type]} state [description]
     * @param  {[type]} data  [description]
     * @return {[type]}       [description]
     */
    updateUserData(state, data) {
      state.userData[data.key] = data.value
    },
  },
  actions: {

  }
})
