import { createAPI } from '@/utils/request.js'
// 上传图片
export const uploadImg = params => createAPI('/training/file/uploadFile', 'POST', params)
// 增加训练营期数
export const addDirll = params => { 
    console.log(params);
    
  return  createAPI('/admin/activity/add', 'POST', params)
 }


//  import { post } from '@/utils/request.js'

//  export const addDirll = params => {
//      console.log(params);
     
//      return post('/admin/activity/add' , params)
//  }