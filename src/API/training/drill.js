import { createAPI } from '@/utils/request.js'

// 上传图片
export const uploadImg = params => createAPI('/training/file/uploadFile', 'POST', params)

// 增加训练营
export const addDirll = params =>  createAPI('/admin/activity/add', 'POST', params)

// 获取训练营列表
export const getDirll = params => createAPI(`/admin/activity/get/${params}`,'GET')

// 添加训练营期数
export const addDrillPeriods = params => createAPI(`/admin/activity/addItem`, 'POST', params)

// 根据id删除训练营
export const deleteDrill = params =>  createAPI(`/admin/activity/delete/${params}` , 'DELETE')

// 根据id获取训练营营期
export const getDrillPeriods = params => createAPI(`/admin/activity/getItem/${params.id}/${params.page}`, 'GET')

// 根据id删除训练营营期
export const deleteDrillPeriods = params => createAPI(`/admin/activity/deleteItem/${params}`, 'DELETE')

// 获取训练营详情
export const getDrillInfo = params => createAPI(`/admin/activity/getById/${params}`, 'GET')

// 修改训练营详情
export const editDrillInfo = params => createAPI(`/admin/activity/update`, 'PUT' , params)

// 给训练营期数添加课程和打卡
export const addClassAndPunch = params => createAPI('/admin/activityItem', 'POST', params)

// 根据id修改营期
export const editDrillPeriods = params => createAPI('/admin/activity/updateItem', 'PUT', params)

// 根据训练营营期id获取营期
export const getPeriodsInfo = params => createAPI(`/admin/activity/getItemById/${params}`)


// 根据营期id获取（情景对话+打卡）列表
export const reasonPeriodsIdGetSecenList = params => createAPI(`/admin/getActivityItem/${params}`, 'GET')

// 修改课程、修改情景对话与打卡
export const editPeriodsIdGetSecenList = params => createAPI('/admin/updateActivityItem', 'PUT', params)

// 根据id删除 ( 情景流程+打卡)
export const reasonIdDeleteCourseItem = params => createAPI(`/admin/activityItem/${params}`, 'DELETE')