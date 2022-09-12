<template>
  <div>
    <!-- Spu路由组件 -->
    <el-card style="margin: 10px">
      <CategorySelector :categoryFlag="model == 0" @getAllId="getAllId" />
    </el-card>
    <el-card style="margin: 10px">
      <!-- 包裹table，决定table是否显示 -->
      <div v-show="model == 0">
        <el-button
          type="primary"
          size="default"
          icon="el-icon-plus"
          style="margin: 10px 0px"
          @click="addSpu"
          :disabled="!CategoryList3Id"
          >添加SPU</el-button
        >
        <el-table
          :data="spuList"
          style="width: 100%"
          border
          v-loading="loading"
        >
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column label="spu名称" width="400px" prop="spuName">
          </el-table-column>
          <el-table-column label="spu描述" width="400px" prop="description">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ row }">
              <hintButton
                type="success"
                size="mini"
                icon="el-icon-plus"
                title="添加sku"
                @click="addSku(row)"
              ></hintButton>
              <hintButton
                type="warning"
                size="mini"
                icon="el-icon-edit"
                title="修改spu"
                @click="updateSpu(row)"
              ></hintButton>
              <hintButton
                type="info"
                size="mini"
                icon="el-icon-info"
                title="查看spu所有属性"
                @click="showSkuList(row)"
              ></hintButton>
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="deleteSpu(row)"
              >
                <hintButton
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  title="删除spu"
                  slot="reference"
                ></hintButton>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="text-align: center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout=" prev, pager, next,jumper,->,sizes,total"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
      <!-- 添加/修改SPU -->
      <spuForm v-show="model == 1" @changeModel="changeModel" ref="spu" />
      <!-- 添加SKU -->
      <skuForm v-show="model == 2" @changeModel="changeModel" ref="sku" />
      <!-- 查看所有SKU列表 -->
      <el-dialog
        :title="`${skuListTitle}的SKU列表`"
        :visible.sync="dialogTableVisible"
        @closed="skuListClosed"
      >
        <el-table :data="skuList" border v-loading="loading">
          <el-table-column property="skuName" label="名称"></el-table-column>
          <el-table-column property="price" label="价格"></el-table-column>
          <el-table-column property="weight" label="重量"></el-table-column>
          <el-table-column label="默认图片">
            <template slot-scope="{ row }">
              <img
                :src="row.skuDefaultImg"
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
// 引入两个子组件
import skuForm from '@/views/product/Spu/SkuForm';
import spuForm from '@/views/product/Spu/SpuForm';
export default {
  name: "Spu",
  data() {
    return {
      CategoryList1Id: '',
      CategoryList2Id: '',
      CategoryList3Id: '',
      spuList: [],
      model: 0,// 控制三个功能的显示 0 1 2
      page: 1,//当前页
      limit: 3,//每页数量
      total: 0,//数据总数
      loading: false,//加载转圈
      dialogTableVisible: false,//sku列表是否显示
      skuList: [],//sku列表
      skuListTitle: ''//sku列表的标题，与点击的spu一致
    }
  },
  methods: {
    // 从子组件三级分类中获取三级分类id
    getAllId({ id, level }) {
      this.spuList = [];//清空表格数据
      // 如果传回的是一级分类id
      if (level == 1) {
        this.CategoryList1Id = id;
        this.CategoryList2Id = '';
        this.CategoryList3Id = '';
      } else if (level == 2) {
        // 清空数据
        this.spuList = [];
        // 如果传回的是二级分类id
        this.CategoryList2Id = id;
        // 清空三级id
        this.CategoryList3Id = '';
      } else {
        // 如果传回的是三级分类id
        this.CategoryList3Id = id;
        // 此时所有id都有了，可以发送请求！
        this.getSpuList();
      }
    },
    // 请求spu列表
    async getSpuList(pager = 1) {
      this.page = pager;
      const { page, limit, CategoryList3Id } = this;
      this.loading = true;
      let result = await this.$API.spu.reqSpuList(page, limit, CategoryList3Id);
      // console.log('result :>> ', result);
      if (result.code == 200) {
        this.spuList = result.data.records;
        this.total = result.data.total;
      }
      this.loading = false;
    },
    // 点击分页器修改每页展示个数
    handleSizeChange(size) {
      this.limit = size;
      this.getSpuList();
    },
    // 当前页变化
    handleCurrentChange(page) {
      this.page = page;
      this.getSpuList(this.page);
    },
    // 三个功能页切换
    changeModel(num) {
      this.model = num;
      // 切换功能需要再次请求当前页最新的spu列表
      this.getSpuList(this.page);
    },
    // 点击添加SPU按钮
    addSpu() {
      // 切换到修改/添加SPU页面
      this.model = 1;
      // 通知子组件发送两个请求
      // 需要传3id
      this.$refs.spu.initAddSpu(this.CategoryList3Id);
    },
    // 点击修改某一个spu
    updateSpu(row) {
      this.model = 1;
      // 调用子组件中的方法发送请求
      this.$refs.spu.initSpuData(row);
    },
    // 点击删除spu
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      if (result.code == 200) {
        this.$message({ message: '删除成功', type: 'success' });
      }
      if (this.spuList.length == 1) {
        this.page = this.page - 1;
      }
      this.getSpuList(this.page);
    },
    // 点击添加sku
    addSku(row) {
      this.model = 2;
      // 调用子组件方法发送请求
      // 发送请求需要:1,2,3id和spuid
      // console.log('row :>> ', row);
      this.$refs.sku.getSkuInfo(this.CategoryList1Id, this.CategoryList2Id, row);
    },
    // 点击显示sku列表
    async showSkuList(row) {
      this.skuListTitle = row.spuName;
      this.dialogTableVisible = true;
      this.loading = true;
      let result = await this.$API.sku.reqSkuList(row.id);
      if (result.code == 200) {
        this.skuList = result.data;
      }
      this.loading = false;
    },
    // 关闭skulist的回调
    skuListClosed() {
      // 清空数据
      this.skuList = [];
      this.skuListTitle = '';
    }
  },
  components: {
    skuForm,
    spuForm
  }
}
</script>

<style>
</style>