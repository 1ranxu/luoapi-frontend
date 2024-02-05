import React, {useEffect, useState} from "react";
import ProCard from "@ant-design/pro-card";
import {Badge, Card, Image, List, Spin, Tooltip} from "antd";
import Search from "antd/es/input/Search";
import {history} from "@umijs/max";
import {listInterfaceInfoByPageUsingGet} from "@/services/luoapi-backend/interfaceInfoController";

const InterfaceSquare: React.FC = () => {
    const [data, setData] = useState<API.InterfaceInfo[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [total, setTotal] = useState<number>();
    const [pageSize] = useState<number>(12);
    const [loading, setLoading] = useState<boolean>(false);

    const loadData = async (current = 1) => {
        setLoading(true)
        const res = await listInterfaceInfoByPageUsingGet({
            current: current,
            name: searchText,
            pageSize: pageSize,
            sortField: 'totalInvokes',
            sortOrder: 'descend',
            description: searchText,
        });
        if (res.code === 0 && res.data) {
            setData(res?.data?.records || []);
            setTotal(res.data.total)
            setLoading(false)
        } else {
            setLoading(false)
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const onSearch = async () => {
        const res = await listInterfaceInfoByPageUsingGet({
            current: 1,
            description: searchText,
        });
        if (res.data) {
            setData(res?.data?.records || []);
            setTotal(res?.data?.total || 0)
        }
    };

    return (
        <>
            <Card hoverable>
                <ProCard layout="center">
                    <Search
                        showCount
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                        allowClear
                        size={"large"}
                        maxLength={50}
                        enterButton="搜索"
                        placeholder={"请输入关键词"}
                        onSearch={onSearch}
                        style={{maxWidth: 600, height: 60}}/>
                </ProCard>
            </Card>
            <br/>
            <br/>
            <Spin spinning={loading}>
                <List
                    pagination={{
                        onChange: (page) => {
                            loadData(page)
                        },
                        pageSize: pageSize,
                        total: total
                    }}
                    grid={{
                        gutter: 20,
                        xs: 1,
                        sm: 1,
                        md: 2,
                        lg: 4,
                        xl: 5,
                        xxl: 6
                    }}
                    dataSource={data}
                    renderItem={(item, index) => (
                        <List.Item>
                          <Tooltip title={item.description}>
                            <ProCard key={index} bordered hoverable direction="column" style={{height: 200}}
                                     onClick={() => {
                                       history.push(`/interface_info/${item.id}`)
                                     }}>
                              <ProCard layout="center">
                                <Badge count={item.totalInvokes} overflowCount={999999999} color='#eb4d4b'>
                                  <Image style={{width: 80, borderRadius: 8, marginLeft: 10}}
                                         src={item?.avatarUrl ?? "https://luoying-1320612776.cos.ap-chongqing.myqcloud.com/interface_avatar/1709135865515171845/18gGqm9B-wallpaper.png"}
                                         fallback={"https://luoying-1320612776.cos.ap-chongqing.myqcloud.com/interface_avatar/1709135865515171845/18gGqm9B-wallpaper.png"}
                                         alt={item.name}
                                         preview={false}
                                  />
                                </Badge>
                              </ProCard>
                              <ProCard layout="center" style={{marginTop: -10, fontSize: 16}}>
                                {item.name}
                              </ProCard>
                            </ProCard>
                          </Tooltip>
                        </List.Item>
                    )}
                />
            </Spin>
        </>
    )
};

export default InterfaceSquare;
