import request from "@/utils/request";
// SPU图片列表
export const reqSpuImageList = spuId => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })
// 销售属性
export const reqSpuSaleAttrList = spuId => request({ url: `/admin/product/spuSaleAttrList/${spuId}`, method: 'get' })
// 平台属性
export const reqAttrInfo = (category1Id, category2Id, category3Id) => request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })
// 添加sku
export const reqAddSku = (skuInfo) => request({ url: '/admin/product/saveSkuInfo', method: 'post', data: skuInfo })
// 查询sku实例列表
export const reqSkuList = spuId => request({ url: `/admin/product/findBySpuId/${spuId}`, method: 'get' })
// SKU模块查看sku列表
export const reqSkuInfo = (page, limit) => request({ url: `/admin/product/list/${page}/${limit}`, method: 'get' })
// sku上/下架请求
export const reqChangeOnSale = (isSale, skuId) => {
  // isSale=1则表示已上架，需要下架；反之同理
  if (isSale == 1) {
    // 下架
    return request({ url: `/admin/product/cancelSale/${skuId}`, method: 'get' })
  } else {
    // 上架
    return request({ url: `/admin/product/onSale/${skuId}`, method: 'get' })
  }
}
// 查看sku详情
export const reqSkuById = skuId => request({ url: `/admin/product/getSkuById/${skuId}`, method: 'get' });