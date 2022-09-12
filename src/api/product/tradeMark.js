// 配置品牌管理的api
// 获取商品品牌列表的接口：/admin/product/baseTrademark/{page}/{limit}
// 调用二次封装的axios请求
import request from '@/utils/request';
// 请求品牌列表
export const reqTradeMarkList = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' });

// 添加品牌 /admin/product/baseTrademark/save  post
// 携带两个参数：品牌名称、品牌logo
// 修改品牌 /admin/product/baseTrademark/update put
// 携带三个参数：id、品牌名称、品牌logo

// 添加和修改写成一个函数，通过携带参数有没有id来区别！
// 别漏写return！！！！！！！！！
export const reqAddOrUpdateTradeMark = (tradeMark) => {
  const { id, logoUrl, tmName } = tradeMark;
  // 如果有id，就是修改！
  if (tradeMark.id) {
    return request({ url: '/admin/product/baseTrademark/update', method: 'put', data: { id, logoUrl, tmName } })
    // 参数中没有id，就是添加！
  } else {
    return request({ url: '/admin/product/baseTrademark/save', method: 'post', data: { logoUrl, tmName } })
  }
}

// 删除商品api
// /admin/product/baseTrademark/remove/{id}
export const reqDeleteTradeMark = (id) => request({ url: `/admin/product/baseTrademark/remove/${id}`, method: 'delete' });