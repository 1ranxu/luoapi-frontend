import {PageContainer} from '@ant-design/pro-components';
import {Card, Descriptions, DescriptionsProps, message} from 'antd';
import React, {useEffect, useState} from 'react';
import {getInterfaceInfoByIdUsingGET} from "@/services/luoapi-backend/interfaceInfoController";
import {useParams} from "@@/exports";

/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<API.InterfaceInfo>({});
    const params = useParams()
    const loadData = async () => {
        if (!params.id) {
            message.error('参数不存在');
            return;
        }
        setLoading(true);

        try {
            const res = await getInterfaceInfoByIdUsingGET({
                id: Number(params?.id)
            })
            setData(res.data || {})
        } catch (error: any) {
            message.error('查看失败，' + error.message);
        }
        setLoading(false);
    }
    useEffect(() => {
        loadData()
    }, [])
    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: '接口描述',
            children: data.description,
        },
        {
            key: '3',
            label: '请求路径',
            children: data.url,
        },
        {
            key: '2',
            label: '请求方式',
            children: data.method,
        },
        {
          key: '3',
          label: '请求参数',
          children: data.requestParams,
        },
        {
            key: '4',
            label: '请求头',
            children: data.requestHeader,
        },
        {
            key: '5',
            label: '响应头',
            children: data.responseHeader,
        },
        {
            key: '6',
            label: '接口状态',
            children: data.status ? '正常':'关闭',
        },
        {
            key: '7',
            label: '创建时间',
            children: data.createTime,
        },
    ];


    return (
        <PageContainer title={"查看接口文档"}>
            <Card>
                <Descriptions column={1} title={data.name} items={items} />
            </Card>
        </PageContainer>
    );
};

export default Index;
