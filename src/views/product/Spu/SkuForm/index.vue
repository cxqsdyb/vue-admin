<template>
  <div>
    <el-form :model="skuInfo" ref="form" label-width="80px">
      <el-form-item label="SPU名称">
        {{ spu.spuName }}
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" v-model="skuInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input
          placeholder="重量(千克)"
          type="number"
          v-model="skuInfo.weight"
        ></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input
          placeholder="规格描述"
          type="textarea"
          rows="4"
          v-model="skuInfo.skuDesc"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form label-width="80px" :inline="true">
          <!-- 平台属性不止一个，要遍历多个！ -->
          <el-form-item
            v-for="attr in attrInfoList"
            :key="attr.id"
            :label="attr.attrName"
            style="margin: 10px"
          >
            <!-- 收集销售属性的id和对应属性值的id！ -->
            <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
              <el-option
                v-for="attrValue in attr.attrValueList"
                :key="attrValue.id"
                :label="attrValue.valueName"
                :value="`${attr.id}:${attrValue.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form label-width="80px" :inline="true">
          <el-form-item
            v-for="saleAttr in spuSaleAttrList"
            :key="saleAttr.id"
            :label="saleAttr.saleAttrName"
          >
            <el-select
              placeholder="请选择"
              v-model="saleAttr.saleAttrIdAndValueId"
            >
              <el-option
                v-for="saleAttrValue in saleAttr.spuSaleAttrValueList"
                :key="saleAttrValue.id"
                :label="saleAttrValue.saleAttrValueName"
                :value="`${saleAttr.id}:${saleAttrValue.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          border
          stripe
          :data="spuImageList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50px"> </el-table-column>
          <!-- 需要显示的是图片，而不是字符串，所以要用到作用域插槽！ -->
          <el-table-column label="图片">
            <template slot-scope="{ row }">
              <img :src="row.imgUrl" style="width: 100px; height: 100px" />
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ row }">
              <!-- 两种按钮，只显示一个 -->
              <el-button
                v-if="row.isDefault == 0"
                type="primary"
                size="default"
                @click="setImgDefault(row)"
                >设置为默认</el-button
              >
              <el-button v-else size="default" type="success">默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitSku" v-loading="loading"
          >保存</el-button
        >
        <el-button @click="cancelSubmit">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SkuForm',
  data() {
    return {
      spuImageList: [],//图片列表
      spuSaleAttrList: [],//销售属性
      attrInfoList: [],//平台属性
      spu: {//父组件传回的信息
      },
      //收集sku表单数据
      skuInfo: {
        category3Id: 0,
        price: 0,
        skuAttrValueList: [//平台属性值
          // {
          //   attrId: 0,
          //   attrName: "",
          //   id: 0,
          //   skuId: 0,
          //   valueId: 0,
          //   valueName: ""
          // }
        ],
        skuDefaultImg: "",//默认图片
        skuDesc: "",
        skuImageList: [
          // {
          //   id: 0,
          //   imgName: "",
          //   imgUrl: "",
          //   isDefault: "",
          //   skuId: 0,
          //   spuImgId: 0
          // }
        ],
        skuName: "",
        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: "",
          //   saleAttrValueId: 0,
          //   saleAttrValueName: "",
          //   skuId: 0,
          //   spuId: 0
          // }
        ],
        spuId: 0,
        tmId: 0,
        weight: ""
      },
      loading: false,
    }
  },
  methods: {
    async getSkuInfo(CategoryList1Id, CategoryList2Id, row) {
      // 获取图片的数据
      let result1 = await this.$API.sku.reqSpuImageList(row.id)
      if (result1.code == 200) {
        let imgList = result1.data;
        imgList.forEach(element => {
          element.isDefault = 0;
        });
        // 直接赋值实现响应式,无需$set!
        this.spuImageList = imgList;
      }
      // 获取销售属性
      let result2 = await this.$API.sku.reqSpuSaleAttrList(row.id)
      if (result2.code == 200) {
        this.spuSaleAttrList = result2.data;
      }
      // 获取平台属性
      let result3 = await this.$API.sku.reqAttrInfo(CategoryList1Id, CategoryList2Id, row.category3Id, row.id)
      if (result3.code == 200) {
        this.attrInfoList = result3.data;
      }
      // 收集父组件传回的有用的参数
      let { id, category3Id, tmId } = row;
      this.skuInfo.category3Id = category3Id;
      this.skuInfo.spuId = id;
      this.skuInfo.tmId = tmId;
      this.spu = row;
    },
    // 图片勾选
    handleSelectionChange(params) {
      // params为已经勾选的信息，数据结构为列表
      // 
    },
    // 点击设置默认图片,排他!
    setImgDefault(row) {
      this.spuImageList.forEach(element => {
        element.isDefault = 0;//全设为非默认
      })

      row.isDefault = 1;//点击的那个设置为默认!
      // 收集数据
      this.skuInfo.skuDefaultImg = row.imgUrl;
    },
    // 点击保存按钮
    async submitSku() {
      // loading
      this.loading = true;
      // 整理参数
      const { attrInfoList, spuSaleAttrList, spuImageList, skuInfo } = this;
      // 平台属性数据收集
      skuInfo.skuAttrValueList = attrInfoList.reduce((prev, item) => {

        if (item.attrIdAndValueId) {// 如果下拉框被选择过,有数据
          const [attrId, valueId] = item.attrIdAndValueId.split(':');
          prev.push({ attrId, valueId });
        }
        return prev//保留当前的结果作为下次的初始值
      }, []);
      // 销售属性数据收集
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, item) => {
        if (item.saleAttrIdAndValueId) {
          const [saleAttrId, saleAttrValueId] = item.saleAttrIdAndValueId.split(':');
          prev.push({ saleAttrId, saleAttrValueId });
        }
        return prev
      }, [])
      // 图片数据收集
      skuInfo.skuImageList = spuImageList.map(item => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id
        }
      })
      // 提交
      let result = await this.$API.sku.reqAddSku(skuInfo);
      if (result.code == 200) {
        this.$message({ message: '添加成功', type: 'success' })
      }
      // console.log('skuInfo :>> ', skuInfo);
      // 清空数据
      Object.assign(this._data, this.$options.data());
      this.loading = false;
      // 切换
      this.$emit('changeModel', 0);
    },
    // 点击取消按钮
    cancelSubmit() {
      // 清空数据
      Object.assign(this._data, this.$options.data());
      // 切换
      this.$emit('changeModel', 0);
    }
  },
}
</script>

<style>
</style>