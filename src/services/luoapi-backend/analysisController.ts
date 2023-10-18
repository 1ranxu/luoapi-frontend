// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getTopInvokeInterfaceInfoList GET /api/interfaceAnalysis/top/interface/invoke */
export async function getTopInvokeInterfaceInfoListUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListInvokeInterfaceInfoVO>(
    '/api/interfaceAnalysis/top/interface/invoke',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}
