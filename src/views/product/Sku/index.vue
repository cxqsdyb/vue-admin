<template>
  <div>
    <el-table :data="skuInfo" border v-loading="loading">
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="skuName" label="名称"> </el-table-column>
      <el-table-column prop="skuDesc" label="描述"> </el-table-column>
      <el-table-column prop="prop" label="默认图片" width="150px">
        <template slot-scope="{ row }">
          <img :src="row.skuDefaultImg" style="width: 80px; height: 80px" />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(KG)" width="80px">
      </el-table-column>
      <el-table-column prop="price" label="价格(元)" width="100px">
      </el-table-column>
      <el-table-column prop="prop" label="操作" align="center">
        <template slot-scope="{ row }">
          <!-- 上/下架 -->
          <el-button
            :type="row.isSale == 0 ? 'success' : 'info'"
            :icon="row.isSale == 0 ? 'el-icon-top' : 'el-icon-bottom'"
            size="mini"
            @click="changeIsSale(row)"
          ></el-button>
          <!-- 修改 -->
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          <!-- 查看，弹出右抽屉 -->
          <el-button
            type="info"
            icon="el-icon-info"
            size="mini"
            @click="getSkuInfoById(row)"
          ></el-button>
          <!-- 删除 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--       @size-change="sizeChange"
      @current-change="currentChange" -->
    <el-pagination
      @current-change="currentChange"
      @size-change="sizeChange"
      :current-page.sync="page"
      :page-sizes="[3, 5, 7, 10]"
      :page-size="limit"
      layout=" prev,pager,next,jumper,->,sizes,total"
      :total="total"
      :pager-count="7"
      background
      style="text-align: center"
    >
      >
    </el-pagination>
    <!-- 查看详情的抽屉组件 -->
    <el-drawer
      title=""
      :visible.sync="drawer"
      :before-close="handleClose"
      :show-close="false"
      size="40%"
      v-loading="drawerLoading"
    >
      <el-row>
        <el-col :span="5" :offset="0">名称</el-col>
        <el-col :span="16" :offset="0">{{ skuInfoById.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5" :offset="0">描述</el-col>
        <el-col :span="16" :offset="0">{{ skuInfoById.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5" :offset="0">价格</el-col>
        <el-col :span="16" :offset="0">{{ skuInfoById.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5" :offset="0">平台属性</el-col>
        <el-col :span="16" :offset="0">
          <el-tag
            type="success"
            size="normal"
            effect="dark"
            v-for="attr in skuInfoById.skuAttrValueList"
            :key="attr.id"
            style="margin-right: 10px; margin-bottom: 10px"
            >{{ attr.attrName }}:{{ attr.valueName }}</el-tag
          >
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5" :offset="0">商品图片</el-col>
        <el-col :span="16" :offset="0">
          <el-carousel height="300px">
            <el-carousel-item
              v-for="img in skuInfoById.skuImageList"
              :key="img.id"
            >
              <img
                :src="img.imgUrl"
                style="display: block; margin: auto; height: 300px"
              />
            </el-carousel-item> </el-carousel
        ></el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      page: 1,//当前页
      limit: 3,//每页数据
      total: 0,//总数据量
      skuInfo: [],//sku数据列表
      loading: false,//loading
      drawer: false,//控制抽屉是否显示
      skuInfoById: {},//抽屉显示的sku信息
      drawerLoading: false,//抽屉loading
    }
  },
  methods: {
    // 获取sku列表
    async getSkuInfo() {
      this.loading = true;
      const { page, limit } = this;
      let result = await this.$API.sku.reqSkuInfo(page, limit);
      if (result.code == 200) {
        this.skuInfo = result.data.records;
        this.total = result.data.total;
      }
      this.loading = false;
    },
    // 当前页页变动
    currentChange() {
      this.getSkuInfo();
    },
    // 页面显示数据个数变化
    sizeChange(limit) {
      this.limit = limit;
      this.getSkuInfo();
    },
    // 切换上下架
    async changeIsSale(row) {
      // 发送请求
      let result = await this.$API.sku.reqChangeOnSale(row.isSale, row.id)
      if (result.code == 200) {
        this.$message({
          message: `${row.isSale == 0 ? '上架成功' : '下架成功'}`, type: `${row.isSale == 0 ? 'success' : 'info'}`
        })
        row.isSale = row.isSale == 0 ? 1 : 0;
        this.getSkuInfo();
      }
    },
    // 点击查看sku信息(打开抽屉)
    async getSkuInfoById(row) {
      this.drawer = true;
      this.drawerLoading = true;
      let result = await this.$API.sku.reqSkuById(row.id);
      if (result.code == 200) {
        this.skuInfoById = result.data;
      }
      this.drawerLoading = false;
    },
    // 关闭抽屉
    handleClose() {
      this.skuInfoById = {};//清空数据
      this.drawer = false;//关闭抽屉
    }
  },
  mounted() {
    this.getSkuInfo();
  },
}
</script>

<style scoped>
/* 设置抽屉样式 */
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}
.el-col {
  margin: 10px;
}

/* 加 >>> 表示深度选择器，使父组件的样式可以影响到子组件！*/
>>> .el-carousel__button {
  background-color: red;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
</style>