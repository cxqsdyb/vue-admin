// 将四个模块的接口统一暴露
import * as tradeMark from '@/api/product/tradeMark';
import * as attr from '@/api/product/attr';
import * as spu from '@/api/product/spu';
import * as sku from '@/api/product/sku';
// 引入权限相关的接口
import permission from '@/api/acl/permission';
import role from '@/api/acl/role';
import * as user from '@/api/acl/user';
export default {
  tradeMark,
  attr,
  spu,
  sku,
  permission,
  role,
  user
}