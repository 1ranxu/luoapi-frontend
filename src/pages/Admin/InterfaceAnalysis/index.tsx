import {PageContainer,} from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import ReactECharts from 'echarts-for-react';
import {getTopInvokeInterfaceInfoListUsingGET} from "@/services/luoapi-backend/analysisController";

//接口统计
const InterfaceAnalysis: React.FC = () => {
  const [data, setData] = useState<API.InvokeInterfaceInfoVO[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      try {
        getTopInvokeInterfaceInfoListUsingGET().then(res=>{
          if (!res.data){
            return;
          }
          setData(res.data)
        })
      } catch (error:any){

      }
  }, [])

  const chartData=data.map(item=>{
    return {
      value:item.totalInvokeNum,
      name:item.name
    }
  })
  const option = {
    title: {
      text: '接口调用次数Top10',
      subtext: 'Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  return (
    <PageContainer>

      <ReactECharts loadingOption={{
        showLoading: loading
      }} option={option}/>
    </PageContainer>
  );
};

export default InterfaceAnalysis;
