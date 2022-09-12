<template>
  <div>
    <!-- 商品管理路由组件 -->
    <el-button
      type="primary"
      size="default"
      icon="el-icon-plus"
      style="margin: 10px 0px"
      @click="tradeMarkAdd"
      >添加</el-button
    >
    <el-table border stripe> </el-table>

    <el-table border style="width: 100%" :data="tradeMarkList">
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column label="品牌名称" prop="tmName"> </el-table-column>
      <el-table-column label="品牌logo" prop="logoUrl">
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" style="height: 100px; width: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            size="mini"
            icon="el-icon-edit"
            @click="tradeMarkChange(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deleteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框，用来修改商品品牌 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="myForm" :rules="rules" ref="myForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="myForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌Logo" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="myForm.logoUrl" :src="myForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark('myForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 分页器传参：当前页、总数据量、每页显示数据量、连续页码数 -->
    <!-- 可以调整分页器的先后顺序 -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="limit"
      layout=" prev, pager, next, jumper,->, sizes,total"
      :total="total"
      background
      :pager-count="7"
      @size-change="sizeChange"
      @current-change="getPageList"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "TradeMark",
  data() {
    return {
      page: 1,//当前页
      limit: 5,//每页显示数据个数
      total: 0,//数据总数
      tradeMarkList: [],//品牌列表
      dialogFormVisible: false,//对话框是否显示
      title: '',
      myForm: {
        logoUrl: "",
        tmName: ""
      },
      rules: {
        tmName: [
          // trigger触发的方式 blur:失去焦点  change:改变
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'change' }
        ],
        logoUrl: [{ required: true, message: '请上传图片' }]
      }
    }
  },
  computed: {
    // 计算得到总页数
    pageAll() {
      return Math.ceil(this.total / this.limit)
    }
  },
  mounted() {
    // 挂载时获取品牌列表
    this.getPageList();
  },
  methods: {
    async getPageList(pager = 1) {
      this.page = pager;
      let { page, limit } = this;//解构
      let result = await this.$API.tradeMark.reqTradeMarkList(page, limit);
      // console.log('result :>> ', result);
      if (result.code == 200) {
        this.total = result.data.total;
        this.tradeMarkList = result.data.records;
      }
    },
    // 分页器修改一页显示数量
    sizeChange(size) {
      this.limit = size;
      this.getPageList();
    },
    // 点击添加品牌
    tradeMarkAdd() {
      this.dialogFormVisible = true;
      this.title = "添加品牌"
      // 清空表单
      this.myForm = {
        logoUrl: "",
        tmName: ""
      }
    },
    // 点击修改品牌
    tradeMarkChange(row) {
      this.dialogFormVisible = true;
      this.title = "修改品牌"
      // console.log('row :>> ', row);
      this.myForm = { ...row };
    },
    // 上传图片成功后执行
    handleAvatarSuccess(res, file) {
      this.myForm.logoUrl = res.data;
      this.$message({
        type: 'success',
        message: '图片上传成功'
      });
      // console.log('res :>> ', res);
      // console.log('file :>> ', file);

    },
    // 上传图片成功前执行
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 对话框打开时添加/修改商品品牌
    addOrUpdateTradeMark(formName) {
      // 表单验证 valid = true/false
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 关闭对话框
          this.dialogFormVisible = false;
          // 向服务器请求
          let result = await this.$API.tradeMark.reqAddOrUpdateTradeMark(this.myForm);
          // console.log('result :>> ', result);
          if (result.code == 200) {
            // 有id就是修改，无id就是添加
            this.$message({ message: this.myForm.id ? '修改成功' : '添加成功', type: 'success' })
            // 成功后重新加载商品列表
            // 如果是修改，留在当前页；如果是添加，跳转到最后一页
            this.getPageList(this.myForm.id ? this.page : this.pageAll);
          }
        }
      })



    },
    // 点击删除按钮
    deleteTradeMark(row) {
      this.$confirm(`此操作将永久删除品牌: ${row.tmName}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // console.log('row :>> ', row);
        let result = await this.$API.tradeMark.reqDeleteTradeMark(row.id);
        if (result.code == 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          // 重新加载页面
          this.getPageList(this.tradeMarkList.length > 1 ? this.page : this.page - 1);
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '删除失败'
        });
      });
    }

  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>