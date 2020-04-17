<template>
    <div class="newVidero_container">
         <breadcrumb>
              <template slot="title">资源管理 </template>
              <template slot="secondTitle"> 视频管理</template>
              <template slot="thirdlyTitle"> 新增视频</template>
          </breadcrumb>
          <Card>
               <template slot="content">
                    <el-form >
                        <el-form-item label="视频名称:">
                            <el-input v-model="uoloadForm.title" style="width:300px"></el-input>
                        </el-form-item>
                <el-form-item label="视频上传:" >
                <!-- action必选参数, 上传的地址 -->
                        <el-upload
                              v-if="!uoloadForm.videoUrl" class="avatar-uploader el-upload--text"
                              :limit='1'
                               action="http://training.test.luojigou.vip/training/file/uploadFile"
                               :show-file-list="false"
                               accept=".mp4"
                               :on-success="handleVideoSuccess" 
                               :before-upload="beforeUploadVideo" 
                               :on-progress="uploadVideoProcess">
                            <i  v-if="!uoloadForm.videoUrl" class="el-icon-plus avatar-uploader-icon"></i>
                        <div class="uploadText"> 点击红色区域上传视频</div>
                        <el-progress v-if="videoFlag == true"  type="circle" :percentage="videoUploadPercent" style="margin-top:30px;"></el-progress>
                        <!-- <el-button class="video-btn"slot="trigger" size="small" v-if="isShowUploadVideo"type="primary">选取文件</el-button> -->
                    </el-upload>
                    <video v-else :src="uoloadForm.videoUrl" class="avatar video-avatar" controls="controls">您的浏览器不支持视频播放</video> 
                    <P v-if="isShowUploadVideo"
                       class="text">请保证视频格式正确，且不超过20M</P>
                </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="width:200px;margin-left:100px" @click="onUpload">立即上传</el-button>
                    </el-form-item>
            </el-form>
               </template>
          </Card>
          
    </div>
</template>
<script>
// import { uploadImg } from '@/API/training/drill.js'
import { addVideo } from '@/API/resource/video.js'
export default {
    name: 'newVideoPage',
    data () {
        return {
		    videoFlag:false , //是否显示进度条
		    videoUploadPercent:"", //进度条的进度，
            isShowUploadVideo:false ,//显示上传按钮
            showVideoPath: true,
            uoloadForm: {
                title: '',
                videoUrl: ''
            }
        }
    },
    methods: {
        // 上传视频
        async onUpload () {
            try {
                await addVideo(this.uoloadForm)
                this.$message({message: '上传成功', type: 'success'})
                this.uoloadForm.title = '',
                this.uoloadForm.videoUrl = ''
            } catch (error) {
                this.$message('上传失败')
            }
        },
       //上传前回调
        beforeUploadVideo (file) {
                const isLt20M = file.size / 1024 / 1024 < 20;
                if (['video/mp4'].indexOf(file.type) == -1) { //'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'
                    this.$message.error('请上传正确的视频格式');
                    return false;
                }
                if (!isLt20M) {
                    this.$message.error('上传视频大小不能超过20MB哦!');
                    return false;
                }
                this.isShowUploadVideo = false;
            },
        //进度条
        uploadVideoProcess (event, file, fileList) {
                this.videoFlag = true;
                this.videoUploadPercent = file.percentage.toFixed(0) * 1;
            },
        
        //上传成功回调
        async handleVideoSuccess (res, file) {
                this.videoFlag = false;
                this.videoUploadPercent = 0;
                this.uoloadForm.videoUrl = res.data
                this.showVideoPath = false
            },
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
