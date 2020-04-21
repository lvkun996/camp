import { createAPI } from '@/utils/request.js'

// 打卡列表
export const getPunchCardList = params => createAPI(`/admin/courseClockIn?pageSize=${params.pageSize}&page=${params.page}&activityItemId=${params.activityItemId}`, 'GET')

// 添加打卡
export const addPunchCard = params => createAPI('/admin/courseClockIn', 'POST', params)

// 修改打卡
export const editPunchCard = params => createAPI('/admin/courseClockIn', 'PUT', params)

// 打卡详情
export const detailCard = params => createAPI(`/admin/courseClockIn/${params}`, 'GET')

// 删除打卡
export const deleteCard = params => createAPI(`/admin/courseClockIn/${params}`)

// 批量取消打卡
export const allCancleCard = params => createAPI('/admin/courseClockIn/many', 'PUT', params)