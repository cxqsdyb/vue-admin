<template>
  <el-card class="box-card">
    <!-- 头部 -->
    <div slot="header" class="clearfix">
      <!--  @tab-click="handleClick" -->
      <el-tabs class="tabs" v-model="activeName">
        <el-tab-pane label="销售额" name="销售额"></el-tab-pane>
        <el-tab-pane label="访问量" name="访问量"></el-tab-pane>
      </el-tabs>
      <!-- 头部右侧 -->
      <div class="right">
        <span @click="setToday">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
        <!-- 日历 -->
        <el-date-picker
          v-model="date"
          class="date"
          type="daterange"
          range-separator="——"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>
    <!-- 主体 -->
    <el-row :gutter="10">
      <!-- 图表 -->
      <el-col :span="18">
        <!-- 柱状图 -->
        <div class="barChart" ref="barChart"></div>
      </el-col>
      <!-- 排名 -->
      <el-col :span="6">
        <h3>门店{{ activeName }}排名</h3>
        <ul>
          <li>
            <span class="blackIndex index">1</span>
            <span class="name">KFC</span>
            <span class="rvalue">323,416</span>
          </li>
          <li>
            <span class="blackIndex index">2</span>
            <span class="name">KFC</span>
            <span class="rvalue">323,416</span>
          </li>
          <li>
            <span class="blackIndex index">3</span>
            <span class="name">KFC</span>
            <span class="rvalue">323,416</span>
          </li>
          <li>
            <span class="index">4</span>
            <span class="name">KFC</span>
            <span class="rvalue">323,416</span>
          </li>
          <li>
            <span class="index">5</span>
            <span class="name">KFC</span>
            <span class="rvalue">323,416</span>
          </li>
          <li>
            <span class="index">6</span>
            <span class="name">KFC</span>
            <span class="rvalue">323,416</span>
          </li>
          <li>
            <span class="index">7</span>
            <span class="name">KFC</span>
            <span class="rvalue">323,416</span>
          </li>
        </ul>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import { mapState } from 'vuex'
export default {
  name: "Sale",
  data() {
    return {
      activeName: '销售额',
      barChart: null,//图表实例
      date: [],//日历收集数据(起止)
    }
  },
  computed: {
    ...mapState({
      listData: state => state.home.data
    })
  },
  watch: {
    activeName() {
      this.setBarChart();
    },
    // 一旦有数据，立刻配置图表！
    listData() {
      this.setBarChart();
    }
  },
  methods: {
    // 趋势柱状图配置
    setBarChart() {
      this.barChart.setOption({
        title: {
          text: this.activeName + '趋势'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.activeName == "销售额" ? this.listData.orderFullYearAxis : this.listData.userFullYearAxis,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '销售额',
            type: 'bar',
            barWidth: '50%',
            data: this.activeName == "销售额" ? this.listData.orderFullYear : this.listData.userFullYear,
          }
        ]
      })
    },
    // 点击本日
    setToday() {
      const day = dayjs().format('YYYY-MM-DD');
      this.date = [day, day];//起止日期都是当日
    },
    // 点击本周
    setWeek() {
      const start = dayjs().day(1).format('YYYY-MM-DD');
      const end = dayjs().day(7).format('YYYY-MM-DD');
      this.date = [start, end];
    },
    // 点击本月
    setMonth() {
      const start = dayjs().startOf('month').format('YYYY-MM-DD');
      const end = dayjs().endOf('month').format('YYYY-MM-DD');
      this.date = [start, end];
    },
    // 点击本年
    setYear() {
      const start = dayjs().startOf('year').format('YYYY-MM-DD');
      const end = dayjs().endOf('year').format('YYYY-MM-DD');
      this.date = [start, end];
    },

  },
  mounted() {
    this.barChart = echarts.init(this.$refs.barChart);
    this.setBarChart();
  }
}
</script>

<style lang="css" scoped>
.clearfix {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  position: relative;
}
.box-card {
  margin: 10px 0px;
}
>>> .el-card__header {
  border: none;
  padding-bottom: 10px;
}
>>> .el-card__body {
  padding-top: 0px;
}
.tabs {
  width: 100%;
}
.right {
  position: absolute;
  right: 0px;
}
.right span:hover {
  color: skyblue;
}
.date {
  width: 250px;
  margin-left: 10px;
}
.right span {
  margin: 0px 10px;
}
.barChart {
  width: 100%;
  height: 300px;
}
ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0;
}
ul li {
  height: 8%;
  margin: 10px;
  position: relative;
}
.blackIndex {
  border-radius: 50%;
  background: black;
  color: white;
  float: left;
}
.index {
  width: 20px;
  height: 20px;
  left: 0;
  text-align: center;
  line-height: 20px;
  position: absolute;
  left: 0px;
}
.name {
  position: absolute;
  left: 50px;
}
.rvalue {
  float: right;
}
</style>