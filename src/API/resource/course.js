import { createAPI } from '@/utils/request.js'

// 添加课程内容
export const addCourseContent = params => createAPI(`/admin/course/courseItem`, 'POST', params)

// 添加课程
export const addCourse = params => createAPI('/admin/course', 'POST', params)

// 修改课程
export const editCourse = params => createAPI('/admin/course', 'PUT', params)

// 获取课程详情
export const getClassInfo = params => createAPI(`/admin/course/${params}`, 'GET')

// 获取情景流程列表  ?activityItemId=${params.activityItemId}&isPage=${params.isPage}
export const getCourseList = params => createAPI(`/admin/course?page=${params.page}`, 'GET')

// 删除课程
export const deleteClass = params => createAPI(`/admin/course/${params}`, 'DELETE')

// 获取课程内容
export const detailInfo = params => createAPI(`/admin/course/${params.id}/courseItems`, 'GET')

// 修改课程内容
export const editAllContent = params => createAPI('/admin/course/courseItem', 'PUT', params)




// 删除课程内容
export const deleteCourseItem = params => createAPI(`/admin/courseItem/${params}`, 'DELETE')