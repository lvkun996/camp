import { createAPI } from '@/utils/request.js'

// 获取内容列表
export const getContent = params => createAPI(`/admin/text?isPage=${params.isPage}&page=${params.page}`, 'GET')

// 添加内容
export const addContent = params => createAPI('/admin/text', 'POST', params)

// 修改内容
export const editContent = params => createAPI('/admin/text', 'PUT', params)

// 获取内容详情
export const getContentInfo = params => createAPI(`/admin/text/${params}`, 'GET')

// 删除single内容

export const deleteContent = params => createAPI(`/admin/text/${params}`, 'DELETE')