<template>
  <a :title="title" style="margin: 5px">
    <!-- 按钮封装！ -->
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
  </a>
</template>

<script>
export default {
  name: 'hintButton',
  props: ['title'],

}
</script>

<style>
</style>