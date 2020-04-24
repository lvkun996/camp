import { createAPI } from '@/utils/request.js'

// 上传
export const getToken =  () => createAPI('/training/file/token', 'GET')