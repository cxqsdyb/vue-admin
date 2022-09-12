import mockRequest from '@/utils/mock-request'
const state = {
  data: []
};
const mutations = {
  GETDATA(state, data) {
    state.data = data;
  }
};
const actions = {
  async getData({ commit }) {
    let result = await mockRequest.get('/home/list')
    if (result.code == 20000) {
      commit('GETDATA', result.data)
    }
  }
};
export default {
  state,
  mutations,
  actions
}