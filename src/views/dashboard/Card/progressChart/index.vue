<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: "progressChart",
  mounted() {
    let lineChart = echarts.init(this.$refs.charts);
    lineChart.setOption({
      tooltip: {},//提示信息
      xAxis: {
        show: false,//隐藏x轴
        //  设置最小值和最大值
        max: 100,
        min: 0
      },
      yAxis: {
        show: false,//隐藏y轴
        type: 'category'
      },
      series: [{
        type: 'bar',
        data: [85],
        color:'skyblue',
        barWidth:20,//柱状图宽度
        // 设置柱状图背景颜色
        showBackground:true,
        backgroundStyle:{
          color:'#eee'
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