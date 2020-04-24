import { createAPI } from '@/utils/request.js'

// 获取班级列表
export const getClassList = params => createAPI(`/admin/clazz`, 'GET', params)

// 获取老师列表
export const getTeachList = params => createAPI(`/admin/teacher`, 'GET', params)

// 添加老师
export const saveTeach = params => createAPI(`/admin/teacher`, 'POST', params)

// 删除老师
export const deleteTeach = id => createAPI(`/admin/teacher/${id}`, 'DELETE')

// 班级课后打卡作业
export const getClassCheck = params => createAPI(`/admin/courseClockIn`, 'GET', params)

// 打卡作业 内容列表
export const getCheckComment = params => createAPI(`/admin/clockInComment`, 'GET', params)

// 设置/取消 重难点问题
export const setGoodAnswer = params => createAPI(`/admin/goodAnswer`, 'POST', params)

// 设置/取消 优秀问题
export const setKeyProblem = params => createAPI(`/admin/keyProblem`, 'POST', params)
