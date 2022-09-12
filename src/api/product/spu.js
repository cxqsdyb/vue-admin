import request from '@/utils/request'
// 请求spu列表 三个参数：page、limit（路径）、3id（query参数）
export const reqSpuList = (page, limit, category3Id) => request({ url: `/admin/product/${page}/${limit}`, method: 'get', params: { category3Id } })
// 按id请求指定SPU信息
export const reqSpuInfoById = spuId => request({ url: `/admin/product/getSpuById/${spuId}`, method: 'get' });
// 获取品牌列表
export const reqTrademarkList = () => request({ url: '/admin/product/baseTrademark/getTrademarkList', method: 'get' });
// 获取SPU图片
export const reqSpuImageList = spuId => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })
// 获取平台全部的销售属性
export const reqSaleAttrList = () => request({ url: '/admin/product/baseSaleAttrList', method: 'get' });
// 返回修改/添加后的SPU信息
export const reqAddOrUpdateSpu = (spuInfo) => {
  //  通过有无SPUid来判断是添加还是修改
  // 有id就是修改，无id就是添加
  if (spuInfo.id) {
    return request({ url: '/admin/product/updateSpuInfo', method: 'post', data: spuInfo })
  } else {
    return request({ url: '/admin/product/saveSpuInfo', method: 'post', data: spuInfo })
  }
}
// 删除spu
export const reqDeleteSpu = spuId => request({ url: `/admin/product/deleteSpu/${spuId}`, method: 'delete' })
/**
 *
 *  {
  "category3Id": 0,
    "tmId": 0
  "description": "string",
  "id": 0,
  "spuName": "string",
  "spuImageList": [
    {
      "id": 0,
      "imgName": "string",
      "imgUrl": "string",
      "spuId": 0
    }
  ],
  "spuSaleAttrList": [
    {
      "baseSaleAttrId": 0,
      "id": 0,
      "saleAttrName": "string",
      "spuId": 0,
      "spuSaleAttrValueList": [
        {
          "baseSaleAttrId": 0,
          "id": 0,
          "isChecked": "string",
          "saleAttrName": "string",
          "saleAttrValueName": "string",
          "spuId": 0
        }
      ]
    }
  ],
}
 * 
 */