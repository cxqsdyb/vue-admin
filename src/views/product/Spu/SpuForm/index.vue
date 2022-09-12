<template>
  <div>
    <!-- 添加/修改SPU -->
    <el-form ref="form" :model="spuInput" label-width="80px">
      <el-form-item label="SPU名称">
        <el-input v-model="spuInput.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="spuInput.tmId" placeholder="请选择品牌">
          <el-option
            v-for="tradeMark in tradeMarkList"
            :key="tradeMark.id"
            :label="tradeMark.tmName"
            :value="tradeMark.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <!-- rows控制文本框高度 -->
        <el-input
          type="textarea"
          rows="4"
          placeholder="描述"
          v-model="spuInput.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片" size="normal">
        <!-- 
            on-preview点击预览图片
            on-remove 点击移除图片
            on-success 图片上传成功
            file-list 图片列表，每个图片包含两个属性：name、url
           -->
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="SpuImageList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性" size="normal">
        <el-select
          v-model="attrSaleIdAndName"
          :placeholder="`还有${unSelectSaleAttr.length}个未选择`"
          clearable
          filterable
        >
          <!-- 收集下拉框选择的销售属性id和name -->
          <el-option
            v-for="item in unSelectSaleAttr"
            :key="item.id"
            :label="item.name"
            :value="`${item.id}:${item.name}`"
          >
          </el-option>
        </el-select>
        <!-- 没有选择销售属性时，按钮失效 -->
        <el-button
          type="primary"
          size="default"
          icon="el-icon-plus"
          @click="addSaleAttr"
          :disabled="!attrSaleIdAndName"
          style="margin: 10px"
          >添加销售属性</el-button
        >
        <el-table :data="spuInput.spuSaleAttrList" border>
          <el-table-column label="序号" type="index" width="80px">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="100px">
          </el-table-column>
          <el-table-column label="属性值名称列表">
            <template slot-scope="{ row, $index }">
              <!-- 
                disable-transitions 是否显示过渡动画
                handleClose 点击‘x’的回调函数
               -->
              <el-tag
                v-for="(tag, index) in row.spuSaleAttrValueList"
                :key="tag.id"
                closable
                type="success"
                :disable-transitions="false"
                @close="handleClose(row, index)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.saleAttrValueName"
                :ref="$index"
                size="small"
                @keyup.native.enter="$event.target.blur"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="addSaleAttrValue(row, $index)"
                >添加
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" width="80px">
            <template slot-scope="{ row }">
              <el-button
                size="mini"
                icon="el-icon-delete"
                type="danger"
                @click="deleteSaleAttrValue(row)"
              >
              </el-button> </template
          ></el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="spuSubmit">保存</el-button>
        <!-- 切换回SPU列表 -->
        <el-button @click="cancelSubmit">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SpuForm',
  data() {
    return {
      // SPU信息,这里都写上是为了添加spu的功能！
      spuInput: {
        category3Id: 0,
        tmId: undefined,//品牌
        description: "",//描述
        spuName: "",//spu名称
        spuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   spuId: 0
          // }
        ],
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,//销售属性的id
          //   saleAttrName: "",//销售属性名
          //   spuSaleAttrValueList: [//销售属性值列表
          //   ]
          // }
        ],
      },
      tradeMarkList: [], // 品牌列表
      SpuImageList: [],  // Spu图片列表
      SaleAttrList: [],  // 全平台销售属性
      dialogImageUrl: '',
      dialogVisible: false,
      attrSaleIdAndName: "",//收集的未选择的销售属性的id和name
    }
  },
  computed: {
    unSelectSaleAttr() {
      let result = this.SaleAttrList.filter(item => {
        // return item.saleAttrName in this.spuInput.spuSaleAttrList
        return this.spuInput.spuSaleAttrList.every(item2 => {
          //  只有一个都不重复，才返回true
          return item2.saleAttrName != item.name
        })
      })
      return result
    }
  },
  methods: {
    // 发送请求初始化spu页面的信息（修改spu）
    async initSpuData(spu) {
      // 可以接收父组件传回的spu信息
      // console.log('spu :>> ', spu);、

      // 获取SPu信息
      let SpuResult = await this.$API.spu.reqSpuInfoById(spu.id);
      if (SpuResult.code == 200) {
        this.spuInput = SpuResult.data;
      }
      // 获取品牌列表
      let tradeMarkResult = await this.$API.spu.reqTrademarkList();
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
      }
      // 获取Spu图片
      let SpuImgResult = await this.$API.spu.reqSpuImageList(spu.id);
      if (SpuImgResult.code == 200) {
        this.SpuImageList = SpuImgResult.data;
      }
      // 将图片列表改成满足照片墙要求的格式
      this.SpuImageList.forEach(item => {
        item.name = item.imgName;
        item.url = item.imgUrl;
      })
      // 获取全平台的销售属性
      let SaleAttrResult = await this.$API.spu.reqSaleAttrList();
      if (SaleAttrResult.code == 200) {
        this.SaleAttrList = SaleAttrResult.data;
      }
    },
    // 发送请求初始化spu页面的信息（添加spu）
    async initAddSpu(CategoryList3Id) {
      // 收集3id
      this.spuInput.category3Id = CategoryList3Id;
      // 获取品牌列表
      let tradeMarkResult = await this.$API.spu.reqTrademarkList();
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
      }
      // 获取全平台的销售属性
      let SaleAttrResult = await this.$API.spu.reqSaleAttrList();
      if (SaleAttrResult.code == 200) {
        this.SaleAttrList = SaleAttrResult.data;
      }
    },
    // 点击移除照片墙中的图片
    handleRemove(file, fileList) {
      this.SpuImageList = fileList;
    },
    // 点击预览照片墙的图片
    handlePictureCardPreview(file, fileList) {
      // 将需要预览的图片地址给dialogImageUrl
      this.dialogImageUrl = file.url;
      // 放大显示
      this.dialogVisible = true;
    },
    // 上传图片成功后执行
    handleAvatarSuccess(res, file, fileList) {
      this.SpuImageList = fileList;
      this.$message({
        type: 'success',
        message: '图片上传成功'
      });
      // console.log('res :>> ', res);
      // console.log('file :>> ', file);

    },
    // 点击添加新的销售属性的按钮
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attrSaleIdAndName.split(':');
      let newSaleAttr = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] }
      // 添加新的销售属性
      this.spuInput.spuSaleAttrList.push(newSaleAttr);
      // 清空下拉框的内容
      this.attrSaleIdAndName = ''
    },
    // 点击销售属性值的x按钮，删除
    handleClose(row, index) {
      row.spuSaleAttrValueList.splice(index, 1);
    },
    // 点击添加新的属性值
    addSaleAttrValue(row, $index) {
      // 显示输入框
      this.$set(row, 'inputVisible', true);
      this.$set(row, 'saleAttrValueName', "");
      // 自动获取焦点
      this.$nextTick(() => {
        this.$refs[$index].focus();
      })
    },
    // 确认新添加的销售属性值
    handleInputConfirm(row) {
      // 关闭输入框
      row.inputVisible = false;
      // 输入合法判断
      if (row.saleAttrValueName.trim() == '') {
        this.$message('输入不能为空');
        return
      }
      // 判断是否重复
      let isRepeat = row.spuSaleAttrValueList.some(item => {
        return item.saleAttrValueName == row.saleAttrValueName
      })
      if (isRepeat) {
        this.$message('输入属性值重复！');
        // 清空输入框内容
        row.saleAttrValueName = '';
        return
      }


      // 收集数据
      let { baseSaleAttrId, saleAttrName, saleAttrValueName } = row;
      let newSaleAttrValue = { baseSaleAttrId, saleAttrName, saleAttrValueName };
      row.spuSaleAttrValueList.push(newSaleAttrValue);
      // 清空输入框内容
      row.saleAttrValueName = '';
    },
    // 点击保存按钮
    async spuSubmit() {
      // 整理照片墙数据
      this.spuInput.spuImageList = this.SpuImageList.map(item => {
        return {
          imageName: item.name,
          imageUrl: item.response ? item.response.data : item.url
        }
      })
      // 发送请求
      let result = await this.$API.spu.reqAddOrUpdateSpu(this.spuInput);
      // console.log('result :>> ', result);
      if (result.code == 200) {
        this.$message({ message: this.spuInput.id ? '修改成功' : '添加成功', type: 'success' })
      }
      // 清空数据
      Object.assign(this._data, this.$options.data());
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
  }
}
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>