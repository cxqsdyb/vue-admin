<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div class="header">
        <span>线上热门搜索</span>
        <span>
          <el-dropdown>
            <span><i class="el-icon-more"></i></span>
            <el-dropdown-menu>
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </div>
      <!-- 两个图表展示区-->
      <el-row :gutter="10">
        <el-col :span="12">
          <div class="chartCard">
            <div class="card-header">
              <span>搜索用户数</span>
              <svg
                t="1654932478289"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2901"
                width="16"
                height="16"
              >
                <path
                  d="M512 0a512 512 0 1 0 0 1024A512 512 0 0 0 512 0z m0 896A384 384 0 0 1 512 128a384 384 0 0 1 0 768z m29.696-194.88c-11.136 10.112-24.96 17.344-31.488 15.36-6.08-1.792-9.536-7.424-8.384-13.056l89.344-248c7.424-31.488-12.736-60.16-55.424-63.872-44.8 0-110.976 40.128-151.232 90.944 0 6.08-1.344 21.12 0.128 30.208l53.632-54.208c11.008-10.176 23.808-17.344 30.336-15.424 6.592 1.92 10.112 8.384 8 14.464l-88.704 246.848c-10.176 28.864 9.152 57.152 56.192 63.616 68.928 0 109.888-39.168 150.208-89.984 0-6.08 2.368-22.08 0.96-31.104l-53.568 54.208zM575.744 192c-35.584 0-64.448 25.728-64.448 63.808 0 37.952 28.864 63.744 64.448 63.744 35.648 0 64.448-25.728 64.448-63.744 0-38.08-28.8-63.808-64.448-63.808z"
                  p-id="2902"
                  fill="#8a8a8a"
                ></path>
              </svg>
            </div>
            <div class="card-main">
              <span class="main-big">12321</span>
              <span class="main-small">
                17.1%
                <svg
                  t="1655100493168"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="1806"
                  width="16"
                  height="16"
                >
                  <path
                    d="M512 221.9L191.7 583.824c-16.472 18.61-44.912 20.346-63.524 3.874-18.61-16.47-20.346-44.91-3.874-63.52l354-400c17.908-20.236 49.488-20.236 67.396 0l354 400c16.472 18.61 14.736 47.05-3.874 63.52-18.612 16.472-47.052 14.736-63.522-3.874L512 221.9zM191.7 895.824c-16.472 18.61-44.912 20.346-63.524 3.874-18.61-16.47-20.346-44.91-3.874-63.52l354-400c17.908-20.236 49.488-20.236 67.396 0l354 400c16.472 18.61 14.736 47.05-3.874 63.52-18.612 16.472-47.052 14.736-63.522-3.874L512 533.9 191.7 895.824z"
                    p-id="1807"
                    fill="#d81e06"
                  ></path>
                </svg>
              </span>
            </div>
            <div class="card-chart" ref="Chart1"></div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="chartCard">
            <div class="card-header">
              <span>人均搜索次数</span>
              <svg
                t="1654932478289"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2901"
                width="15"
                height="15"
              >
                <path
                  d="M512 0a512 512 0 1 0 0 1024A512 512 0 0 0 512 0z m0 896A384 384 0 0 1 512 128a384 384 0 0 1 0 768z m29.696-194.88c-11.136 10.112-24.96 17.344-31.488 15.36-6.08-1.792-9.536-7.424-8.384-13.056l89.344-248c7.424-31.488-12.736-60.16-55.424-63.872-44.8 0-110.976 40.128-151.232 90.944 0 6.08-1.344 21.12 0.128 30.208l53.632-54.208c11.008-10.176 23.808-17.344 30.336-15.424 6.592 1.92 10.112 8.384 8 14.464l-88.704 246.848c-10.176 28.864 9.152 57.152 56.192 63.616 68.928 0 109.888-39.168 150.208-89.984 0-6.08 2.368-22.08 0.96-31.104l-53.568 54.208zM575.744 192c-35.584 0-64.448 25.728-64.448 63.808 0 37.952 28.864 63.744 64.448 63.744 35.648 0 64.448-25.728 64.448-63.744 0-38.08-28.8-63.808-64.448-63.808z"
                  p-id="2902"
                  fill="#8a8a8a"
                ></path>
              </svg>
            </div>
            <div class="card-main">
              <span class="main-big">2.7</span>
              <span class="main-small">
                26.2%
                <svg
                  t="1655100747053"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2104"
                  width="16"
                  height="16"
                >
                  <path
                    d="M512 486.1L832.3 124.18c16.472-18.612 44.912-20.346 63.524-3.876 18.61 16.47 20.346 44.91 3.874 63.52l-354 400c-17.908 20.238-49.488 20.238-67.396 0l-354-400c-16.472-18.61-14.736-47.05 3.874-63.52 18.612-16.47 47.052-14.736 63.522 3.876L512 486.1zM191.7 436.18L512 798.1 832.3 436.18c16.472-18.612 44.912-20.346 63.524-3.876 18.61 16.47 20.346 44.91 3.874 63.52l-354 400c-17.908 20.238-49.488 20.238-67.396 0l-354-400c-16.472-18.61-14.736-47.05 3.874-63.52 18.612-16.47 47.052-14.736 63.522 3.876z"
                    p-id="2105"
                    fill="#1afa29"
                  ></path>
                </svg>
              </span>
            </div>
            <div class="card-chart" ref="Chart2"></div>
          </div>
        </el-col>
      </el-row>
      <!-- 表格区 -->
      <el-table style="width: 100%" border>
        <el-table-column prop="date" label="排名" width="80"> </el-table-column>
        <el-table-column prop="name" label="搜索关键字">
        </el-table-column>
        <el-table-column prop="address" label="用户数" sortable>
        </el-table-column>
        <el-table-column prop="address" label="周涨幅" sortable>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: "search",
  mounted() {
    let lineChart1 = echarts.init(this.$refs.Chart1);
    lineChart1.setOption({
      xAxis: {
        show: false,//隐藏x轴
        type: 'category'
      },
      yAxis: {
        show: false,//隐藏y轴
      },
      series: [{
        type: 'line',
        data: [10, 7, 23, 12, 5, 21, 17, 10, 12, 25],
        itemStyle: {
          opacity: 0,//拐点透明
        },
        smooth: true,//设置平滑曲线
        // 线条的样式
        lineStyle: {
          color: '#6bb3e2',
        },
        // 填充颜色
        areaStyle: {
          color: {//实现渐变色
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'skyblue' // 0% 处的颜色
            }, {
              offset: 1, color: 'white' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        }

      }],
      // 布局调试
      grid: {
        left: -10,
        top: 0,
        right: 30,
        bottom: 0
      }
    })

    let lineChart2 = echarts.init(this.$refs.Chart2);
    lineChart2.setOption({
      xAxis: {
        show: false,//隐藏x轴
        type: 'category'
      },
      yAxis: {
        show: false,//隐藏y轴
      },
      series: [{
        type: 'line',
        data: [10, 7, 13, 12, 5, 11, 15, 17, 22, 30],
        itemStyle: {
          opacity: 0,//拐点透明
        },
        smooth: true,//设置平滑曲线
        // 线条的样式
        lineStyle: {
          color: '#6bb3e2',
        },
        // 填充颜色
        areaStyle: {
          color: {//实现渐变色
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'skyblue' // 0% 处的颜色
            }, {
              offset: 1, color: 'white' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        }

      }],
      // 布局调试
      grid: {
        left: -5,
        top: 0,
        right: 30,
        bottom: 0
      }
    })
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e4e7ed;
  height: 40px;
  line-height: 40px;
}
.chartCard {
  height: 100%;
  width: 100%;
}
.card-header {
  color: #5b5555;
  margin: 20px 0;
  display: flex;
  align-items: center;
}
.card-header > span {
  margin-right: 20px;
}
.card-main > span {
  margin-right: 30px;
}
.main-big {
  font-size: 25px;
}
.main-small {
  font-size: 15px;
}
.card-chart {
  width: 100%;
  height: 50px;
}
</style>