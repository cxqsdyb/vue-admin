<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card shadow="always" :body-style="{ padding: '20px' }">
          <Detail title="总销售额" count="￥ 645849">
            <template slot="charts">
              <span
                >周同比&nbsp;&nbsp;56.67%<svg
                  t="1654952982983"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2762"
                  width="16"
                  height="16"
                  data-spm-anchor-id="a313x.7781069.0.i3"
                >
                  <path
                    d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3c-3.8 5.3-0.1 12.7 6.5 12.7h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"
                    p-id="2763"
                    fill="#d81e06"
                  ></path></svg
              ></span>
              <span
                >&nbsp;&nbsp;日同比 &nbsp;&nbsp;13.71%<svg
                  t="1654953278556"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="6089"
                  width="16"
                  height="16"
                >
                  <path
                    d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3 0.1-12.7-6.4-12.7z"
                    p-id="6090"
                    fill="#258209"
                  ></path></svg
              ></span>
            </template>
            <template slot="footer">
              <span>日销售额￥&nbsp;&nbsp;&nbsp;12547</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always" :body-style="{ padding: '20px' }">
          <Detail title="访问量" count="123441">
            <template slot="charts">
              <!-- 折线图 -->
              <lineChart />
            </template>
            <template slot="footer">
              <span>日访问量&nbsp;&nbsp;&nbsp;7941</span>
            </template></Detail
          >
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always" :body-style="{ padding: '20px' }">
          <Detail title="支付比数" count="88451">
            <template slot="charts">
              <!-- 柱状图 -->
              <barChart />
            </template>
            <template slot="footer">
              <span>转换率&nbsp;&nbsp;&nbsp;64%</span>
            </template></Detail
          >
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always" :body-style="{ padding: '20px' }">
          <Detail title="运营活动效果" count="85%">
            <template slot="charts">
              <!-- 进度条 -->
              <progressChart />
            </template>
            <template slot="footer">
              <span
                >周同比&nbsp;&nbsp;56.67%<svg
                  t="1654952982983"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2762"
                  width="16"
                  height="16"
                  data-spm-anchor-id="a313x.7781069.0.i3"
                >
                  <path
                    d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3c-3.8 5.3-0.1 12.7 6.5 12.7h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"
                    p-id="2763"
                    fill="#d81e06"
                  ></path></svg
              ></span>
              <span
                >&nbsp;&nbsp;日同比 &nbsp;&nbsp;13.71%<svg
                  t="1654953278556"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="6089"
                  width="16"
                  height="16"
                >
                  <path
                    d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3 0.1-12.7-6.4-12.7z"
                    p-id="6090"
                    fill="#258209"
                  ></path></svg
              ></span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from '@/views/dashboard/Card/Detail'
import lineChart from '@/views/dashboard/Card/lineChart'
import barChart from '@/views/dashboard/Card/barChart'
import progressChart from '@/views/dashboard/Card/progressChart'
export default {
  name: '',
  components: {
    Detail,
    lineChart,
    barChart,
    progressChart
  }
}
</script>

<style scoped>
</style>