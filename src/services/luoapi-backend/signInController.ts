// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** doSignIn POST /api/sign/doSignIn */
export async function doSignInUsingPost(options?: { [key: string]: any }) {
  return request<API.BaseResponseboolean>('/api/sign/doSignIn', {
    method: 'POST',
    ...(options || {}),
  });
}
