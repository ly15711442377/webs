 const loginModule = {
    namespaced:true,
      state: {
    // 代表用户登陆状态
    token:null
  },
  mutations: {
    setToken(state,token){
      state.token = token
    },
    clearToken(state){
      state.token = null
    }
  },
  actions: {
  },
 }
 export default loginModule