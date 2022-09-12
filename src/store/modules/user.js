import { userLogin, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, computedAsyncRoutes } from '@/utils/auth'
import { asyncRoutes, constantRoutes, resetRouter, anyRoutes } from '@/router'
import router from '@/router'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    buttons: [],
    routes: [],
    // 对比结果：项目中的异步路由和服务器返回的用户可以访问的路由进行对比
    resultAsyncRoutes: [],
    resultALLRoutes: [],//合并三种路由后的所有路由（最终展示）
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, userInfo) => {
    state.name = userInfo.name;
    state.avatar = userInfo.avatar;
    state.roles = userInfo.roles;
    state.buttons = userInfo.buttons;
    state.routes = userInfo.routes;
  },
  // 计算出需要展示的异步路由，是一个对象
  SET_RESULTASYNCROUTES: (state, asyncRoutes) => {
    state.resultAsyncRoutes = asyncRoutes;
    state.resultALLRoutes = constantRoutes.concat(state.resultAsyncRoutes, anyRoutes)
    router.addRoutes(state.resultALLRoutes)
  }
}

const actions = {
  // user login
  // 改用await async方法写！
  async login({ commit }, userInfo) {
    const { username, password } = userInfo;
    // 使用api中的login函数带着用户名和密码向服务器发送请求
    let result = await userLogin({ username: username.trim(), password: password });
    // console.log('result :>> ', result);
    if (result.code == 20000) {
      // 登录成功，就保存token
      commit('SET_TOKEN', result.data.token);
      setToken(result.data.token);
      return 'ok'
    } else {
      return Promise.reject('error!')
    }
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // 获取用户信息 
  // avatar：头像|name：姓名|buttons：按钮权限|roles：用户角色信息|routes：不同用户展示的菜单标记
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        commit('SET_USERINFO', data);
        // 调用函数计算异步路由
        commit('SET_RESULTASYNCROUTES', computedAsyncRoutes(asyncRoutes, data.routes));
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

