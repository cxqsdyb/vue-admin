<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12">
        <Search />
      </el-col>
      <el-col :span="12">
        <Category />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Category from '@/views/dashboard/Observer/Category';
import Search from '@/views/dashboard/Observer/Search';

export default {
  name: 'observer',
  components: {
    Category,
    Search
  }
}
</script>

<style scoped>
>>> .el-card__body {
  height: 400px;
}
</style>