<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: "lineChart",
  mounted() {
    let lineChart = echarts.init(this.$refs.charts);
    lineChart.setOption({
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
          color: 'purple',
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
              offset: 0, color: 'purple' // 0% 处的颜色
            }, {
              offset: 1, color: 'white' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        }

      }],
      // 布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      }
    })
  }
}
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>