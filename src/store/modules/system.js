import { getSetting } from '@/api/login'
import storage from '@/utils/storage'

export default {
  namespaced: true,
  state: {
    info: storage.get('app_info')
  },
  mutations: {
    SET_INFO: (state, data) => {
      state.info = data
      storage.set('app_info', data)
    }
  },
  actions: {
    settingDetail({ commit }) {
      return new Promise((resolve, reject) => {
        getSetting({ key: 'BASE_CONFIG' }).then(response => {
          const { data } = response
          commit('SET_INFO', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
