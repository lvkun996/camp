<template>
    <div class="newVidero_container">
         <breadcrumb>
              <template slot="title">资源管理 </template>
              <template slot="secondTitle"> 视频管理</template>
              <template slot="thirdlyTitle">{{id?'修改视频':'新增视频'}}</template>
          </breadcrumb>
          <Card>
               <template slot="content">
                    <el-form >
                        <el-form-item label="视频名称:">
                            <el-input v-model="uploadForm.title" style="width:300px"></el-input>
                        </el-form-item>
                <el-form-item label="视频上传:" >
                <!-- action必选参数, 上传的地址 -->
                <!-- "https://training.test.luojigou.vip/training/file/uploadFile" -->
                <!-- http://upload.qiniup.com -->
                <!-- 'https://upload-z2.qiniup.com' -->
                        <el-upload
                              v-if="!uploadForm.videoUrl" class="avatar-uploader el-upload--text"
                              :limit='1'
                               action='https://up-z0.qiniup.com'
                               :show-file-list="false"
                               accept=".mp4"
                               :data="form"
                               :on-success="handleVideoSuccess" 
                               :before-upload="beforeUploadVideo" 
                               :on-progress="uploadVideoProcess">
                            <i  v-if="!uploadForm.videoUrl" class="el-icon-plus avatar-uploader-icon"></i>
                        <div class="uploadText"> 点击红色区域上传视频</div>
                        
                        <!-- <el-button class="video-btn"slot="trigger" size="small" v-if="isShowUploadVideo"type="primary">选取文件</el-button> -->
                    </el-upload>  
                     <video v-else :src="uploadForm.videoUrl" class="avatar video-avatar" controls="controls">您的浏览器不支持视频播放</video> 
                    <!-- v-if="videoFlag === true"  -->
                    <el-progress type="circle" :percentage="videoUploadPercent" style="margin-top:30px;"></el-progress>
                   
                         <!--   -->
                    <P v-if="isShowUploadVideo"
                       class="text">请保证视频格式正确，且不超过20M</P>
                </el-form-item>
                    <el-form-item>
                        <el-button v-if="uploadForm.videoUrl" type="danger" style="width:200px;margin-left:100px" @click="uploadForm.videoUrl=''">删除视频</el-button>
                        <el-button type="primary" v-if="!id" style="width:200px;margin-left:100px" @click="onUpload">立即上传</el-button>
                        <el-button type="warning" v-else style="width:200px;margin-left:100px" @click="onEditVideo">修改视频</el-button>
                    </el-form-item>
            </el-form>
               </template>
            a
          </Card>
          
    </div>
</template>
<script>
// import { uploadImg } from '@/API/training/drill.js'
import { addVideo , getVideoInfo, editVideo} from '@/API/resource/video.js'
import { getToken } from '@/API/resource/upload.js'
import * as qiniu from 'qiniu-js';
export default {
    name: 'newVideoPage',
    data () {
        return {
		    videoFlag: false , //是否显示进度条
		    videoUploadPercent: 0, //进度条的进度，
            isShowUploadVideo: false ,//显示上传按钮
            showVideoPath: true,
            uploadForm: {
                title: null,
                videoUrl: null
            },
            id: '',  // 视频id
            form: {}
        }
    },
    methods: {  
        // 修改视频
        async onEditVideo () {
            if (this.uploadForm.title === '' || this.uploadForm.videoUrl === '') {
                this.$message.error( '请完整填入视频信息' ) 
                return false
            }
            try {
                await editVideo(this.uploadForm)
                this.$message({message: '修改成功', type: 'success'})
                this.uploadForm = {}
            } catch (error) {
                this.$message.error('修改失败')
            }
        },
        // 获取视频详情
        async initVideoInfo () {
            if (!this.id) {
                return false
            }
            const { data } = await getVideoInfo(this.id) // getVideoInfo
            console.log(data)
            this.uploadForm = data.data
        },
        // 上传视频
        async onUpload () {
            if (!this.rules) {
                this.$message.error( '请完整填入视频信息' )
                return false
            } else {
                try {
                    await addVideo(this.uploadForm)
                    this.$message({message: '上传成功', type: 'success'})
                    this.uploadForm.title = '',
                    this.uploadForm.videoUrl = ''
                } catch (error) {
                    this.$message('上传失败')
                }
            }
        },
       //上传前回调
        async beforeUploadVideo (file) {
            
            const fileType = file.type
            const current = new Date().getTime()
            const key = `video_${current}` // key为上传后文件名 必填
            // const isLt20M = file.size / 1024 / 1024 < 20 // 算出文件大小
            // this.fileSize = file.size // 存储文件大小
            // if (!isLt20M) { // 这里我们限制文件大小为20M
            //     this.$message.error('最大只能上传20M!')
            //     this.$ref.upload.abort()
            //     return isLt20M
            // }
            if (fileType !== 'video/mp4') { // 限制文件类型
                this.$ref.upload.abort()
                this.$message.error('只能上传MP4格式视频!')
                return false
            }
            try {
               
                
                const { data } = await getToken()
                console.log(data);
                
                const token = data.data
                console.log(token);
                 console.log(2);
                this.form = {
                    key,
                    token,
                }
                return true
            } catch (error) {
                console.log(error);
                
                return error
            }
        },
        //进度条
        uploadVideoProcess (event, file, fileList) {
            console.log(event, file, fileList);
                this.videoFlag = true;
                console.log(file.percentage.toFixed(0) * 1);
                this.videoUploadPercent = file.percentage.toFixed(0) * 1;
            },
        //上传成功回调
        async handleVideoSuccess (res, file) {
                console.log(res,file );
                
                this.videoFlag = false;
                this.videoUploadPercent = 0;
                this.uploadForm.videoUrl = 'http://vote-teacher-video.luojigou.vip/'+res.hash
                this.showVideoPath = false
                console.log(this.uploadForm.videoUrl); 
            },
        },
        computed: {
            rules () {
              return  Object.values(this.uploadForm).every( item => {
                   return item !== null && item !== ''
               })
            }
        },
        created () {
            if (!this.$route.query.value) {
                return false
            }
            this.id = this.$route.query.value.id
            this.initVideoInfo()
        }
}
</script>

<style lang="less" scoped>
/deep/ .avatar-uploader .el-upload {
  border-radius: 6px;
  box-sizing: border-box;
  height: 238px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.video-avatar {
  width: 400px;
  height: 200px;
}
.el-icon-plus{
    width: 400px;
    height: 218px;
    border: 1px dashed red;
}
.uploadText{
    position: relative;
    top: -50px;
}
</style>
