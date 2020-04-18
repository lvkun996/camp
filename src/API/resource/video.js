import { createAPI } from '@/utils/request.js'

// 获取视频列表
export const getVideoList = params => createAPI(`/admin/video?isPage=${params.isPage}&page=${params.page}`, 'GET')

// 添加视频
export const addVideo = params => createAPI(`/admin/video`, 'POST', params)

// 删除视频
export const deleteVideo = params => createAPI(`/admin/video/${params}`, 'DELETE')

// 修改视频
export const editVideo = params => createAPI('/admin/video', 'PUT', params)

// 获取视频详情
export const getVideoInfo = params => createAPI(`/admin/video/${params}`, 'GET')