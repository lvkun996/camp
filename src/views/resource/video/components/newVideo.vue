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
                        <el-upload
                              v-if="!uploadForm.videoUrl" class="avatar-uploader el-upload--text"
                              :limit='1'
                               action="https://training.test.luojigou.vip/training/file/uploadFile"
                               :show-file-list="false"
                               accept=".mp4"
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
            id: ''  // 视频id
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
            const { data } = await getVideoInfo(this.id)
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
            // console.log(file);
            
            // var config = {
            //     useCdnDomain: true,
            //     region: null
            // };
            // const data = await getToken();
   
            // var observer = {
            //   next(res){
            //     // ...
            //     console.log("====start=next===")
            //     console.log(res.total.percent)
            //     console.log("=====end=next==")
            //     // toast.message=parseInt(res.total.percent)+"%";
            //     this.$message({message: `${parseInt(res.total.percent)}'%'`})
            //   },
            //   error(err){
            //     // ...
            //     // Toast.fail('上传失败');
            //     this.$message.error('上传失败')
            //   }, 
            //   complete(res){
            //     console.log("====start=complete===")
            //     console.log(res)
            //     console.log("=====end=complete==")
            //     this.videoForm.videoUrl = "https://training.test.luojigou.vip/"+res.hash;
            //     this.$message({message: '上传成功',type: 'success'})
            //   }
            // }

            // var observable = qiniu.upload(file.file, null, data.data, null, config)
            // var subscription = observable.subscribe(observer)

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
                console.log(res);
                
                this.videoFlag = false;
                this.videoUploadPercent = 0;
                this.uploadForm.videoUrl = res.data
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
