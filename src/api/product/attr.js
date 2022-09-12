import request from "@/utils/request";

// 获取一级分类
export const reqgetCategory1 = () => request({ url: '/admin/product/getCategory1', method: 'get' })
// 发送一级，获取二级分类
export const reqgetCategory2 = (Category1Id) => request({ url: `/admin/product/getCategory2/${Category1Id}`, method: 'get' })
// 发送二级，获取三级分类
export const reqgetCategory3 = (Category2Id) => request({ url: `/admin/product/getCategory3/${Category2Id}`, method: 'get' })
// 获取平台属性
export const reqAttrList = (category1Id, category2Id, category3Id) => request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })
// 添加/修改属性与属性值的接口 携带参数(属性与属性值)
export const reqAddOrUpdateAttr = (data) => request({ url: '/admin/product/saveAttrInfo', method: 'post', data: data })
/* {
  "attrName": "string",
  "attrValueList": [
    {
      "attrId": 0,
      "id": 0,
      "valueName": "string"
    }
  ],
  "categoryId": 0,
  "categoryLevel": 0,
  "id": 0
}
*/
// 删除属性接口
export const reqDeleteAttr = attrId => request({ url: `/admin/product/deleteAttr/${attrId}`, method: 'delete' })