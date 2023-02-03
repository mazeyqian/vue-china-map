<style>
  div{
    width: 500px;
    height: 500px;
  }
</style>

<template>
  <div id="china-map"></div>
</template>

<script>
  // 主模块
  let echarts = require('echarts/lib/echarts')
  // 散点图
  require('echarts/lib/chart/scatter')
  // 散点图放大
  require('echarts/lib/chart/effectScatter')
  // 地图
  require('echarts/lib/chart/map')
  // 图例
  require('echarts/lib/component/legend')
  // 提示框
  require('echarts/lib/component/tooltip')
  // 地图geo
  require('echarts/lib/component/geo')
  // 中国地图
  require('echarts/map/js/china')
  export default {
    name: 'index',
    mounted () {
      let chinaMap = echarts.init(document.getElementById('china-map'))
      let showLoadingDefault = {
        text: '加载中...',
        color: '#23531',
        textColor: '#fff',
        // 地图背景色
        maskColor: '#272D3A',
        zlevel: 0
      }
      chinaMap.setOption({
        backgroundColor: '#272D3A',
        // 标题
        title: {
          text: '中国地图闪闪发光',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        // 地图上圆点的提示
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return params.name + ' : ' + params.value[2]
          }
        },
        // 图例按钮，点击可选择哪些不显示
        legend: {
          orient: 'vertical',
          left: 'left',
          top: 'bottom',
          data: ['地区热度', 'top5'],
          textStyle: {
            color: '#fff'
          }
        },
        // 地理坐标系组件
        geo: {
          map: 'china',
          label: {
            // `true` 会显示城市名
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            // 地图背景色
            normal: {
              areaColor: '#465471',
              borderColor: '#282F3C'
            },
            // 悬浮时
            emphasis: {
              areaColor: '#8796B4'
            }
          }
        },
        // 系列列表
        series: [
          {
            name: '地区热度',
            // 表的类型 这里是散点
            type: 'scatter',
            // 使用地理坐标系，通过 `geoIndex` 指定相应的地理坐标系组件
            coordinateSystem: 'geo',
            data: [],
            // 标记的大小
            symbolSize: 12,
            // 鼠标悬浮的时候在圆点上显示数值
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: '#ddb926'
              },
              // 鼠标悬浮的时候圆点样式变化
              emphasis: {
                borderColor: '#fff',
                borderWidth: 1
              }
            }
          },
          {
            name: 'top5',
            // 表的类型 这里是散点
            type: 'effectScatter',
            // 使用地理坐标系，通过 `geoIndex` 指定相应的地理坐标系组件
            coordinateSystem: 'geo',
            data: [],
            // 标记的大小
            symbolSize: 12,
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: '#f4e925',
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            zlevel: 1
          }
        ]
      })
      chinaMap.showLoading(showLoadingDefault)
      this.$store.commit('openLoading')
      this.$store.dispatch('fetchHeatChinaRealData', chinaMap)
      setInterval(() => {
        this.$store.dispatch('fetchHeatChinaRealData', chinaMap)
      }, 1000)
    }
  }
</script>
