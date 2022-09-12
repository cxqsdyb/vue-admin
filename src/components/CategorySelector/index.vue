<template>
  <el-form
    :inline="true"
    class="demo-form-inline"
    :model="allId"
    :disabled="!categoryFlag"
  >
    <el-form-item label="一级分类">
      <el-select
        placeholder="请选择"
        v-model="allId.CategoryList1Id"
        @change="handle1"
      >
        <el-option
          v-for="Category1 in CategoryList1"
          :key="Category1.id"
          :label="Category1.name"
          :value="Category1.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="二级分类">
      <el-select
        placeholder="请选择"
        v-model="allId.CategoryList2Id"
        @change="handle2"
      >
        <el-option
          v-for="Category2 in CategoryList2"
          :key="Category2.id"
          :label="Category2.name"
          :value="Category2.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="三级分类">
      <el-select
        placeholder="请选择"
        v-model="allId.CategoryList3Id"
        @change="handle3"
      >
        <el-option
          v-for="Category3 in CategoryList3"
          :key="Category3.id"
          :label="Category3.name"
          :value="Category3.id"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'CategorySelector',
  data() {
    return {
      CategoryList1: [],
      CategoryList2: [],
      CategoryList3: [],
      allId: {
        CategoryList1Id: '',
        CategoryList2Id: '',
        CategoryList3Id: '',
      },
    }
  },
  // 父组件传回，告知三级分类是否可以使用！
  props: ['categoryFlag'],
  mounted() {
    // 组件挂在完毕时获取一级分类
    this.getCategoryList1()
  },
  methods: {
    async getCategoryList1() {
      let result = await this.$API.attr.reqgetCategory1();
      if (result.code == 200) {
        // console.log('result :>> ', result);
        this.CategoryList1 = result.data;
      }
    },
    // 选择一级分类后触发@change,请求二级分类
    async handle1() {
      this.CategoryList2 = [];
      this.allId.CategoryList2Id = '';
      this.CategoryList3 = [];
      this.allId.CategoryList3Id = '';
      let result = await this.$API.attr.reqgetCategory2(this.allId.CategoryList1Id);
      if (result.code == 200) {
        // console.log('result :>> ', result);
        this.CategoryList2 = result.data;
      }
      this.$emit('getAllId', { id: this.allId.CategoryList1Id, level: 1 });
    },
    // 选择二级分类后触发@change,请求三级分类
    async handle2() {
      this.CategoryList3 = [];
      this.allId.CategoryList3Id = '';
      let result = await this.$API.attr.reqgetCategory3(this.allId.CategoryList2Id);
      // console.log('result :>> ', result);
      if (result.code == 200) {
        this.CategoryList3 = result.data;
      }
      this.$emit('getAllId', { id: this.allId.CategoryList2Id, level: 2 });
    },
    // 选择好三级分类后触发的事件，需要触发自定义事件
    handle3() {
      // 把三级的id传给父组件！
      this.$emit('getAllId', { id: this.allId.CategoryList3Id, level: 3 });
    }

  },
}
</script>

<style>
</style>