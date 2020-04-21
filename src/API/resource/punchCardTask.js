import { createAPI } from '@/utils/request.js'

// 打卡任务列表
export const punshCardTaskList = params => createAPI(`/admin/courseClockInTemplate?isPage=${params.isPage}&page=${params.page}&pageSize=${params.pageSize}` , 'GET')

// 添加打卡任务
export const addPunshCardTask = params => createAPI('/admin/courseClockInTemplate', 'POST', params)

// 删除打卡任务
export const deletePunchCardTask = params => createAPI(`/admin/courseClockInTemplate/${params}`, 'DELETE')

// 编辑打卡任务
export const editPunchCardTask = params => createAPI('/admin/courseClockInTemplate', 'PUT', params)

// 打卡任务详情
export const detailCard = params => createAPI(`/admin/courseClockInTemplate/${params}`)