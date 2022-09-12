<template>
  <div>
    <!-- Attr路由组件 -->
    <el-card style="margin: 10px">
      <CategorySelector @getAllId="getAllId" :categoryFlag="isTableShow" />
    </el-card>
    <el-card style="margin: 10px">
      <!-- 包裹table，决定table是否显示 -->
      <div v-show="isTableShow">
        <el-button
          type="primary"
          size="default"
          icon="el-icon-plus"
          style="margin: 10px 0px"
          @click="attrAdd"
          :disabled="!CategoryList3Id"
          >添加属性</el-button
        >

        <el-table :data="attrList" style="width: 100%" border>
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="200px">
          </el-table-column>
          <el-table-column label="属性值列表" width="700px">
            <template slot-scope="{ row }">
              <el-tag
                style="margin: 10px; margin-left: 0"
                type="success"
                v-for="propety in row.attrValueList"
                :key="propety.id"
                >{{ propety.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ row }">
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-edit"
                @click="attrUpdate(row)"
                >修改</el-button
              >
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="attrDelete(row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 修改/添加商品属性页面 -->
      <div v-show="!isTableShow">
        <el-form :inline="true" ref="form">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInput.attrName"
              clearable
            >
            </el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!attrInput.attrName"
          >添加属性值</el-button
        >
        <el-button @click="isTableShow = true">取消</el-button>
        <el-table
          border
          style="width: 100%; margin-top: 20px"
          :data="attrInput.attrValueList"
        >
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column label="属性值名称">
            <!-- 查看和修改模式的切换 -->
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                clearable
                :ref="$index"
                v-show="row.editFlag"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
              ></el-input>
              <span
                style="display: block"
                v-show="!row.editFlag"
                @click="toEdit(row, $index)"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`确定删除: ${row.valueName}吗？`"
                @onConfirm="confirmDelete($index)"
              >
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          style="margin-top: 20px"
          @click="addOrUpdateAttr"
          :disabled="!attrInput.attrValueList.length"
          >保存</el-button
        >
        <el-button @click="isTableShow = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: "Attr",
  data() {
    return {
      CategoryList1Id: '',
      CategoryList2Id: '',
      CategoryList3Id: '',
      attrList: [],
      isTableShow: true,//表格是否显示
      //收集添加/修改的属性数据
      attrInput: {
        attrName: '',
        attrValueList: [
          // {
          //   attrId: 0,//属性名对应属性值的id
          //   valueName: ""
          // }
        ],
        categoryId: 0,//三级分类的id
        categoryLevel: 3,// 服务器区分几级id
      },

    }
  },
  methods: {
    // 从子组件三级分类中获取三级分类id
    getAllId({ id, level }) {
      this.attrList = [];//清空表格数据
      // 如果传回的是一级分类id
      if (level == 1) {
        this.CategoryList1Id = id;
        this.CategoryList2Id = '';
        this.CategoryList3Id = '';

      } else if (level == 2) {
        // 如果传回的是二级分类id
        this.CategoryList2Id = id;
        // 清空三级id
        this.CategoryList3Id = '';
      } else {
        // 如果传回的是三级分类id
        this.CategoryList3Id = id;
        // 此时所有id都有了，可以发送请求！
        this.getAttrList();
      }
    },
    // 请求商品管理列表
    async getAttrList() {

      let result = await this.$API.attr.reqAttrList(this.CategoryList1Id, this.CategoryList2Id, this.CategoryList3Id);
      // console.log('result :>> ', result);
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    // 点击添加属性按钮
    attrAdd() {
      this.isTableShow = false;
      // 清空上次的数据,并收集3Id
      this.attrInput = {
        attrName: '',
        attrValueList: [],
        categoryId: this.CategoryList3Id,//三级分类的id
        categoryLevel: 3,// 服务器区分几级id
      };

    },
    // 点击修改属性按钮
    attrUpdate(row) {
      this.isTableShow = false;
      // console.log('row :>> ', row);
      this.attrInput = cloneDeep(row);
      this.attrInput.attrValueList.forEach(element => {
        this.$set(element, 'editFlag', false)
      });
    },
    // 点击删除属性按钮
    attrDelete(row) {
      this.$confirm(`是否删除属性:${row.attrName}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let result = await this.$API.attr.reqDeleteAttr(row.id);
        if (result.code == 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }
        // 重新请求数据
        this.getAttrList();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 点击添加属性值按钮
    addAttrValue() {
      this.attrInput.attrValueList.push({
        // 如果是添加就是undefined，如果是修改就与修改前的属性id一致
        attrId: this.attrInput.attrId,//属性名的id
        valueName: "",
        editFlag: true,//当前属性值处于修改/查看模式
      });
      this.$nextTick(() => {
        this.$refs[this.attrInput.attrValueList.length - 1].focus()
      })


    },
    // 进入编辑模式
    toEdit(row, index) {
      row.editFlag = true;
      this.$nextTick(() => {
        this.$refs[index].focus()
      });
    },
    // 进入查看模式
    toLook(row) {
      // 判断新增属性值是否合法
      if (row.valueName.trim() == "") {
        this.$message('请输入一个正常的属性值')
        return
      }
      // 判断新增属性值是否重复
      let isRepeat = this.attrInput.attrValueList.some(item => {
        // 遍历的item包含添加的row，所以需要加if判断，不包含自身
        if (row !== item) {
          return row.valueName == item.valueName
        }
      })
      // 如果有重复,添加失败
      if (isRepeat) {
        this.$message('属性值重复');
        return
      }
      row.editFlag = false;
    },
    // 在弹出框中确认删除属性值
    confirmDelete(index) {
      this.attrInput.attrValueList.splice(index, 1);
    },
    // 点击保存按钮时，将属性和属性值列表传给服务器
    async addOrUpdateAttr() {
      this.attrInput.attrValueList = this.attrInput.attrValueList.filter((element) => {
        delete element.editFlag
        return !element.valueName == ""
      })
      if (this.attrInput.attrValueList.length == 0) {
        this.$message('属性值列表为空！')
      } else {
        let result = await this.$API.attr.reqAddOrUpdateAttr(this.attrInput);
        if (result.code == 200) {
          this.$message({ message: '保存成功', type: 'success' })
          // 成功后再次请求最新的属性信息
          this.getAttrList();
          // 改为展示属性列表
          this.isTableShow = true;
        }
      }

    }
  }
}
</script>

<style>
</style>