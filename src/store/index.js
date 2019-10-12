import Vue from 'vue'
import Vuex from 'vuex'
import varStyle from 'styles/common/var.scss'

Vue.use(Vuex)

const state = {
  theme: varStyle.theme
}

const getters = {
  theme: state => state.theme
}

const mutations = {
  /**
   * @description 设置配置项
   * @param { Object } state 操作对象
   * @param { Object } * 传入对象
   */
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  /**
   * @description 修改配置项
   * @param { Object } * 操作对象
   * @param { Object } data 传递参数
   */
  changeSetting ({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
