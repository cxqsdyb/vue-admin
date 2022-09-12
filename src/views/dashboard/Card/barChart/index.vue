<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: "barChart",
  mounted() {
    let lineChart = echarts.init(this.$refs.charts);
    lineChart.setOption({
      tooltip: {},//提示信息
      xAxis: {
        show: false,//隐藏x轴
        type: 'category'
      },
      yAxis: {
        show: false,//隐藏y轴
      },
      series: [{
        type: 'bar',
        data: [10, 7, 23, 12, 5, 21, 17, 25, 5],
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