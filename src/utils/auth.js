import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// 定义函数计算异步路由
export function computedAsyncRoutes(asyncRoutes, routes) {
  return asyncRoutes.filter(item => {
    // 如果父级路由可以访问
    if (routes.indexOf(item.name) != -1) {
      // 如果包含子级路由
      if (item.children && item.children.length) {
        item.children = computedAsyncRoutes(item.children, routes);
      }
      return true
    }
  })
}