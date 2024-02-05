import {PageContainer,} from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import ReactECharts from 'echarts-for-react';
import {listInterfaceInfoByPageUsingGet} from "@/services/luoapi-backend/interfaceInfoController";

//接口统计
const InterfaceAnalysis: React.FC = () => {
  const [data, setData] = useState<API.InterfaceInfo[]>([]);
  const [pageSize] = useState<number>(10);
  const [loading, setLoading] = useState(true)

  const loadData = async (current = 1) => {
    setLoading(true)
    const res = await listInterfaceInfoByPageUsingGet({
      current: current,
      pageSize: pageSize,
      sortField: 'totalInvokes',
      sortOrder: 'descend',
    });
    if (res.code === 0 && res.data) {
      setData(res?.data?.records || []);
      setLoading(false)
    } else {
      setLoading(false)
    }
  };
  useEffect(() => {
      try {
        loadData();
      } catch (error:any){

      }
  }, [])

  const chartData=data.map(item=>{
    return {
      value:item.totalInvokes,
      name:item.name
    }
  })
  const option = {
    title: {
      text: '',
      subtext: '',
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
