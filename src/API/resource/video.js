import { createAPI } from '@/utils/request.js'

// 获取视频列表
export const getVideoList = params => createAPI(`/admin/video?isPage=${params.isPage}&page=${params.page}`, 'GET')


// 添加视频
export const addVideo = params => createAPI(`/admin/video`, 'POST', params)

// 删除视频
export const deleteVideo = params => createAPI(`/admin/video/${params}`, 'DELETE')


