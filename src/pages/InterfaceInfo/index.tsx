import {removeRule, updateRule} from '@/services/ant-design-pro/api';
import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns, ProDescriptionsItemProps} from '@ant-design/pro-components';
import {FooterToolbar, PageContainer, ProDescriptions, ProTable,} from '@ant-design/pro-components';
import {FormattedMessage, useIntl} from '@umijs/max';
import {Button, Drawer, message} from 'antd';
import React, {useRef, useState} from 'react';
import type {FormValueType} from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import {
  addInterfaceInfoUsingPOST,
  listInterfaceInfoByPageUsingGET,
} from "@/services/luoapi-backend/interfaceInfoController";
import {SortOrder} from "antd/lib/table/interface";
import CreateModal from "@/pages/InterfaceInfo/components/CreateModal";


/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
    const hide = message.loading('Configuring');
    try {
        await updateRule({
            name: fields.name,
            desc: fields.desc,
            key: fields.key,
        });
        hide();

        message.success('Configuration is successful');
        return true;
    } catch (error) {
        hide();
        message.error('Configuration failed, please try again!');
        return false;
    }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.RuleListItem[]) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    try {
        await removeRule({
            key: selectedRows.map((row) => row.key),
        });
        hide();
        message.success('Deleted successfully and will refresh soon');
        return true;
    } catch (error) {
        hide();
        message.error('Delete failed, please try again');
        return false;
    }
};

const TableList: React.FC = () => {
    /**
     * @en-US Pop-up window of new window
     * @zh-CN 新建窗口的弹窗
     *  */
    const [createModalOpen, handleModalOpen] = useState<boolean>(false);
    /**
     * @en-US Add node
     * @zh-CN 添加节点
     * @param fields
     */
    const handleAdd = async (fields: API.InterfaceInfo) => {
        const hide = message.loading('正在添加');
        try {
            await addInterfaceInfoUsingPOST({...fields});
            hide();
            message.success('创建成功!');
            handleModalOpen(false)
            return true;
        } catch (error:any) {
            hide();
            message.error('创建失败，'+error.message);
            return false;
        }
    };

    /**
     * @en-US The pop-up window of the distribution update window
     * @zh-CN 分布更新窗口的弹窗
     * */
    const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

    const [showDetail, setShowDetail] = useState<boolean>(false);

    const actionRef = useRef<ActionType>();
    const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
    const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

    /**
     * @en-US International configuration
     * @zh-CN 国际化配置
     * */
    const intl = useIntl();

    const columns: ProColumns<API.InterfaceInfo>[] = [
        {
            title: 'id',
            dataIndex: 'id',
            valueType: "index",
        },
        {
            title: '接口名称',
            dataIndex: 'name',
            valueType: "text",
        },
        {
            title: '接口描述',
            dataIndex: 'description',
            valueType: 'textarea',
        },
        {
            title: '请求路径',
            dataIndex: 'url',
            valueType: 'text',
        },
        {
            title: '请求方式',
            dataIndex: 'method',
            valueType: 'text',
        },
        {
            title: '请求头',
            dataIndex: 'requestHeader',
            valueType: 'text',
        },
        {
            title: '响应头',
            dataIndex: 'responseHeader',
            valueType: 'text',
        },
        {
            title: '接口状态',
            dataIndex: 'status',
            valueEnum: {
                0: {
                    text: '关闭',
                    status: 'Default'
                },
                1: {
                    text: '开启',
                    status: 'Success'
                },
            },
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            valueType: 'dateTime',
            hideInForm:true,
        },
        {
            title: '更改时间',
            dataIndex: 'updateTime',
            valueType: 'dateTime',
            hideInForm:true,
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => [
                <a
                    key="config"
                    onClick={async () => {
                        handleUpdateModalOpen(true)
                        await handleUpdate(record)
                        setCurrentRow(record);
                    }}
                >
                    修改
                </a>,
            ],
        },

    ];

    return (
        <PageContainer>
            <ProTable<API.RuleListItem, API.PageParams>
                headerTitle={intl.formatMessage({
                    id: 'pages.searchTable.title',
                    defaultMessage: 'Enquiry form',
                })}
                actionRef={actionRef}
                rowKey="key"
                search={{
                    labelWidth: 120,
                }}
                toolBarRender={() => [
                    <Button
                        type="primary"
                        key="primary"
                        onClick={() => {
                            handleModalOpen(true);
                        }}
                    >
                        <PlusOutlined/> <FormattedMessage id="pages.searchTable.new" defaultMessage="New"/>
                    </Button>,
                ]}
                request={async (params: {
                    pageSize?: number;
                    current?: number;
                    keyword?: string;
                }, sort: Record<string, SortOrder>, filter: Record<string, (string | number)[] | null>) => {
                    const res = await listInterfaceInfoByPageUsingGET({
                        ...params
                    })
                    if (res.data) {
                        return {
                            data: res.data?.records || [],
                            success: res.code === 0 ?? false,
                            total: res.data.total || 0 ,
                        }
                    } else {
                        return {
                            data: [],
                            success: false,
                            total: 0,
                        }
                    }
                }}
                columns={columns}
                rowSelection={{
                    onChange: (_, selectedRows) => {
                        setSelectedRows(selectedRows);
                    },
                }}
            />
            {selectedRowsState?.length > 0 && (
                <FooterToolbar
                    extra={
                        <div>
                            <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen"/>{' '}
                            <a style={{fontWeight: 600}}>{selectedRowsState.length}</a>{' '}
                            <FormattedMessage id="pages.searchTable.item" defaultMessage="项"/>
                            &nbsp;&nbsp;
                            <span>
                <FormattedMessage
                    id="pages.searchTable.totalServiceCalls"
                    defaultMessage="Total number of service calls"
                />{' '}
                                {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}
                                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万"/>
              </span>
                        </div>
                    }
                >
                    <Button
                        onClick={async () => {
                            await handleRemove(selectedRowsState);
                            setSelectedRows([]);
                            actionRef.current?.reloadAndRest?.();
                        }}
                    >
                        <FormattedMessage
                            id="pages.searchTable.batchDeletion"
                            defaultMessage="Batch deletion"
                        />
                    </Button>
                    <Button type="primary">
                        <FormattedMessage
                            id="pages.searchTable.batchApproval"
                            defaultMessage="Batch approval"
                        />
                    </Button>
                </FooterToolbar>
            )}

            <UpdateForm
                onSubmit={async (value) => {
                    const success = await handleUpdate(value);
                    if (success) {
                        handleUpdateModalOpen(false);
                        setCurrentRow(undefined);
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }}
                onCancel={() => {
                    handleUpdateModalOpen(false);
                    if (!showDetail) {
                        setCurrentRow(undefined);
                    }
                }}
                updateModalOpen={updateModalOpen}
                values={currentRow || {}}
            />

            <Drawer
                width={600}
                open={showDetail}
                onClose={() => {
                    setCurrentRow(undefined);
                    setShowDetail(false);
                }}
                closable={false}
            >
                {currentRow?.name && (
                    <ProDescriptions<API.RuleListItem>
                        column={2}
                        title={currentRow?.name}
                        request={async () => ({
                            data: currentRow || {},
                        })}
                        params={{
                            id: currentRow?.name,
                        }}
                        columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
                    />
                )}
            </Drawer>
            <CreateModal columns={columns} onCancel={()=>{handleModalOpen(false)}} onSubmit={(value)=>{handleAdd(value)}} visible={createModalOpen}></CreateModal>
        </PageContainer>
    );
};

export default TableList;
