import { createAPI } from '@/utils/request.js'

// 获取图文列表
export const getPictureList = params => createAPI(`/admin/img?isPage=${params.isPage}&page=${params.page}`)

// 添加图片
export const addPicture = params => createAPI('/admin/img', 'POST', params)

// 删除图片
export const deletePicture = params => createAPI(`/admin/img/${params}`, 'Delete')

// 获取图片信息
export const getPictureInfo = params => createAPI(`/admin/img/${params}`)

// 修改图片信息
export const editPictureInfo = params => createAPI(`/admin/img`, 'PUt', params)