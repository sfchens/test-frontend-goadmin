import Vue from 'vue'
import Vuex from 'vuex'
// import VuexPersistence from 'vuex-persist'

// import app from './modules/app'
import getters from './modules/getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters
  // plugins: [
  //   new VuexPersistence({
  //     reducer: (state) => ({
  //       // user: state.user, // 这个就是存入localStorage的值
  //       app: state.app
  //       // menus: state.menus
  //       // menu: state.menu,
  //       // userInfo: state.userInfo,
  //       // userLevel: state.userLevel,
  //       // order: state.order,
  //       // media: state.media,
  //       // kefu: state.kefu,
  //       // integralOrder: state.integralOrder,
  //       // mobildConfig: state.mobildConfig,
  //       // upgrade: state.upgrade,
  //       // layout: state.layout
  //     }),
  //     storage: window.localStorage
  //   }).plugin
  // ]
  // modules: {
  //   // user,
  //   app
  //   // menus
  //   // menu,
  //   // userInfo,
  //   // userLevel,
  //   // order,
  //   // media,
  //   // goodSelect,
  //   // moren,
  //   // shopping,
  //   // fresh,
  //   // kefu,
  //   // mobildConfig,
  //   // integralOrder,
  //   // upgrade,
  //   // layout
  // }
})

export default store
