<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div class="header">
        <span>销售额类别占比</span>
        <el-radio-group size="small" v-model="value">
          <el-radio-button label="全部渠道"></el-radio-button>
          <el-radio-button label="线上"></el-radio-button>
          <el-radio-button label="门店"></el-radio-button>
        </el-radio-group>
      </div>
      <!-- 饼图 -->
      <div class="barChart" ref="barChart"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: "",
  data() {
    return {
      value: '全部渠道'
    }
  },
  mounted() {
    let barChart = echarts.init(this.$refs.barChart);
    barChart.setOption({
      title: {
        text: '视频',
        subtext: 1048,
        // 使鼠标触碰的数据在中间以标题显示
        left: 'center',
        top: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '60%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            position: 'outside'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '15',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: true
          },
          data: [
            { value: 1048, name: '视频' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    })
    barChart.on('mouseover', (params) => {
      const { value, name } = params.data;
      barChart.setOption({
        title: {
          text: name,
          subtext: value
        }
      })
    });
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e4e7ed;
  height: 40px;
  line-height: 40px;
}
.barChart {
  height: 100%;
}
</style>