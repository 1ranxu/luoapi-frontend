import {ProColumns, ProFormInstance, ProTable,} from '@ant-design/pro-components';
import React, {useEffect, useRef} from 'react';
import {Modal} from "antd";

export type Props = {
    values: API.InterfaceInfo
    columns: ProColumns<API.InterfaceInfo>[];
    onCancel: () => void;
    onSubmit: (values: API.InterfaceInfo) => Promise<void>;
    visible: boolean;
};

const UpdateModal: React.FC<Props> = (props) => {
    const {values, visible, columns, onCancel, onSubmit} = props;
    const fomrRef = useRef<ProFormInstance>()
    useEffect(() => {
        if (fomrRef) {
            fomrRef.current?.setFieldsValue(values)
        }
    }, [values])
    return (
        <Modal visible={visible} onCancel={onCancel} footer={null}>
            <ProTable type='form'
                      columns={columns}
                      formRef={fomrRef}
                      onSubmit={async (value) => {
                          await onSubmit({
                              ...value,
                              id:values.id
                          })
                      }} >

            </ProTable>
        </Modal>
    );
};

export default UpdateModal;
