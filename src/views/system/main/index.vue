<template>
    <DefinScrollbar 
        height="100%"
        :showUpBt="true">
        <div class="page-container main-view" >
            <div class="container" 
            style="background-image: linear-gradient(to bottom right, #d0dcdc95, #d5eedf17)"
            >
                <h3>               
                    新松机器人 
                </h3>
                <p>
                    自定义页面菜单，标签页可自定义是否缓存。
                    
                </p>
                <p>
                    标签页下面有小横条的表示有缓存，有两种页面列表管理，一种是修改添加会打开新页面，另一种是以对话框形式操作数据。其中对话框已经封装完善。
                </p>
                <div class="echart-container">
                    <div class="top-container">
                        <div class="left">
                            <EchartContainer
                                ref="EchartContainerRef"></EchartContainer>
                        </div>
                        <div class="right">
                            <EchartContainer
                                ref="EchartContainerRef_1"></EchartContainer>
                        </div>
                    </div>
                    <div class="bottom-container">
                        <EchartContainer
                            ref="EchartContainerRef_2"></EchartContainer>
                    </div>
                </div>
            </div>
        </div>
    </DefinScrollbar>
</template>

<script>
/**
 * 页面例子
 */
import {
    defineComponent,onBeforeUnmount,ref,reactive,getCurrentInstance,onActivated,
    onMounted,
} from 'vue';
import { useRouter } from "vue-router";
import SvgIcon from "@/components/svgIcon/index.vue";
import EchartContainer from "@/components/EchartContainer.vue";
import DefinScrollbar from "@/components/DefinScrollbar.vue";
import * as echarts from 'echarts';
import gundongtiao from "@/views/agv_monitor/log/index.vue";
export default defineComponent({
    components: {
        SvgIcon,
        EchartContainer,
        DefinScrollbar,
    },
    setup() {
        const router = useRouter();
        const EchartContainerRef = ref();  //组件实例
        const EchartContainerRef_1 = ref();  //组件实例
        const EchartContainerRef_2 = ref();  //组件实例
        const dataContainer = reactive({
            loading:false,
            
        });
        onMounted(()=>{
            /** 初始化图表 */
            EchartContainerRef.value.initData({
                backgroundColor: '',
                title: {
                    text: '速度',
                    x: 'left',
                    textStyle: { fontSize: '15', color: "#000" },
                },
                tooltip: { trigger: 'axis' },
                legend: { data: ['理论', '实际', '差值'], right: 0 },
                grid: { top: 70, right: 80, bottom: 30, left: 80 },
                xAxis: [
                    {
                        type: 'category',
                        data: ['1', '2', '3', '4', '5', '6'],
                        boundaryGap: true,
                        axisTick: { show: false },
                    },
                ],
                yAxis: [
                    {
                        name: '速度',
                        nameLocation: 'middle',
                        nameTextStyle: { padding: [3, 4, 50, 6] },
                        splitLine: { show: true, lineStyle: { type: 'dashed', color: '#f5f5f5' } },
                        axisLine: { show: false },
                        axisTick: { show: false },
                        axisLabel: { color: "#000", formatter: '{value} ' },
                    },
                    {
                        name: '差值',
                        nameLocation: 'middle',
                        nameTextStyle: { padding: [50, 4, 5, 6] },
                        splitLine: { show: false },
                        axisLine: { show: false },
                        axisTick: { show: false },
                        axisLabel: { color: "#000", formatter: '{value} ' },
                    },
                ],
                series: [
                    {
                        name: '理论',
                        type: 'line',
                        smooth: true,
                        showSymbol: true,
                        // 矢量画五角星
                        symbol: 'path://M150 0 L80 175 L250 75 L50 75 L220 175 Z',
                        symbolSize: 12,
                        yAxisIndex: 0,
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: 'rgba(250,180,101,0.3)' },
                                { offset: 1, color: 'rgba(250,180,101,0)' },
                            ]),
                            shadowColor: 'rgba(250,180,101,0.2)',
                            shadowBlur: 20,
                        },
                        itemStyle: { color: '#FF8000' },
                        // data中可以使用对象，value代表相应的值，另外可加入自定义的属性
                        data: [
                            { value: 1000, stationName: 's1' },
                            { value: 200, stationName: 's2' },
                            { value: 500, stationName: 's3' },
                            { value: 800, stationName: 's4' },
                            { value: 400, stationName: 's5' },
                            { value: 600, stationName: 's6' },
                        ],
                    },
                    {
                        name: '实际',
                        type: 'line',
                        smooth: true,
                        showSymbol: true,
                        symbol: 'emptyCircle',
                        symbolSize: 12,
                        yAxisIndex: 0,
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    { offset: 0, color: 'rgba(199, 237, 250,0.5)' },
                                    { offset: 1, color: 'rgba(199, 237, 250,0.2)' },
                                ],
                                false
                            ),
                        },
                        itemStyle: {
                            color: '#3bbc86',
                        },
                        data: [
                            { value: 990, stationName: 's1' },
                            { value: 201, stationName: 's2' },
                            { value: 499, stationName: 's3' },
                            { value: 780, stationName: 's4' },
                            { value: 399, stationName: 's5' },
                            { value: 610, stationName: 's6' },
                        ],
                    },
                    {
                        name: '差值',
                        type: 'bar',
                        barWidth: 30,
                        yAxisIndex: 1,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: 'rgba(108,80,243,0.3)' },
                                { offset: 1, color: 'rgba(108,80,243,0)' },
                            ]),
                            //柱状图圆角
                            borderRadius: [30, 30, 0, 0],
                        },
                        data: [
                            { value: 10, stationName: 's1' },
                            { value: 1, stationName: 's2' },
                            { value: 1, stationName: 's3' },
                            { value: 20, stationName: 's4' },
                            { value: 1, stationName: 's5' },
                            { value: 10, stationName: 's6' },
                        ],
                    },
                ],
            });
            EchartContainerRef_1.value.initData({
                tooltip: {
                    trigger: 'item'
                },
                title: {
                    text: '占用',
                    x: 'left',
                    textStyle: { fontSize: '15', color: "#000" },
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: 631, name: 'CAN1' },
                        { value: 179, name: 'CAN2' },
                        { value: 190, name: 'CAN3' },
                        // { value: 484, name: 'Union Ads' },
                        // { value: 300, name: 'Video Ads' }
                    ]
                    }
                ]
            });
            EchartContainerRef_2.value.initData({
                backgroundColor: '',
                title: {
                    text: '其他',
                    x: 'left',
                    textStyle: { fontSize: '15', color: "#000000" },
                },
                grid: { top: 70, right: 20, bottom: 30, left: 30 },
                tooltip: { trigger: 'axis' },
                legend: { data: ['CAN1', 'CAN2'], right: 0 },
                xAxis: {
                    data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                },
                yAxis: [
                    {
                        type: 'value',
                        name: '占用',
                        splitLine: { show: true, lineStyle: { type: 'dashed', color: '#f5f5f5' } },
                    },
                ],
                series: [
                    {
                        name: 'CAN1',
                        type: 'line',
                        symbolSize: 6,
                        symbol: 'circle',
                        smooth: true,
                        data: [0, 41.1, 30.4, 65.1, 53.3, 53.3, 53.3, 41.1, 30.4, 65.1, 53.3, 10],
                        lineStyle: { color: '#fe9a8b' },
                        itemStyle: { color: '#fe9a8b', borderColor: '#fe9a8b' },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#fe9a8bb3' },
                                { offset: 1, color: '#fe9a8b03' },
                            ]),
                        },
                    },
                    {
                        name: 'CAN2',
                        type: 'line',
                        symbolSize: 6,
                        symbol: 'circle',
                        smooth: true,
                        data: [0, 24.1, 7.2, 15.5, 42.4, 42.4, 42.4, 24.1, 7.2, 15.5, 42.4, 0],
                        lineStyle: { color: '#9E87FF' },
                        itemStyle: { color: '#9E87FF', borderColor: '#9E87FF' },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#9E87FFb3' },
                                { offset: 1, color: '#9E87FF03' },
                            ]),
                        },
                        emphasis: {
                            itemStyle: {
                                color: {
                                    type: 'radial',
                                    x: 0.5,
                                    y: 0.5,
                                    r: 0.5,
                                    colorStops: [
                                        { offset: 0, color: '#9E87FF' },
                                        { offset: 0.4, color: '#9E87FF' },
                                        { offset: 0.5, color: '#fff' },
                                        { offset: 0.7, color: '#fff' },
                                        { offset: 0.8, color: '#fff' },
                                        { offset: 1, color: '#fff' },
                                    ],
                                },
                                borderColor: '#9E87FF',
                                borderWidth: 2,
                            },
                        },
                    },
                ],
            });
        });
        return {
            dataContainer,
            EchartContainerRef,
            EchartContainerRef_1,
            EchartContainerRef_2,
        };
    },
});
</script>

<style lang="scss" scoped>
    .main-view{
        display: flex;
        flex-direction: column;
        width: 100%;
        .container{
            background-color: white;
            width: 100%;
            min-height: 800px;
            border-radius: 5px;
            padding: 15px;
            box-sizing: border-box;
            >*{
                margin: 0 0 30px 0;
                &:last-child{
                    margin: 0;
                }
            }
            >.echart-container{
                width: 100%;
                >.top-container{
                    display: flex;
                    flex-direction: row;
                    height: 300px;
                    >.left,>.right{
                        width: 0;
                        flex: 1 1 0;
                    }
                    >.left{
                        flex: 2 1 0;
                        margin-right: 60px;
                    }
                }
                >.bottom-container{
                    width: 100%;
                    height: 400px;
                    margin-top: 30px;
                }
            }
        }
    }
</style>
