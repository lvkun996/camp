<template>
    <div class="addOrEditPic_container">
        <breadcrumb>
              <template slot="title">资源管理 </template>
              <template slot="secondTitle"> 图片管理</template>
              <template slot="thirdlyTitle"> 新增图片</template>
        </breadcrumb>
        <Card>
            <template slot="content">
                <el-form>
                    <el-form-item label="图片名称:">
                        <el-input v-model="pictureForm.title" :disabled="!pictureForm.id"></el-input>
                    </el-form-item>
                    <el-form-item label="图片展示:" v-if="pictureForm.id">
                        <template v-if="pictureForm.imgUrl">
                           <el-image :src="pictureForm.imgUrl" style="width:146px;height:146px"></el-image>
                        </template>
                    </el-form-item>
                    <el-form-item label="上传图片:">
                        <el-upload
                        ref="myUpload"
                          action="http://training.test.luojigou.vip/training/file/uploadFile"
                          list-type="picture-card"
                          :on-preview="handlePictureCardPreview"
                          :on-remove="handleRemove"
                          :on-success="handlePictureSuccess"
                          :on-change="handleImgUrlChange"
                          :file-list='fileList'
                          :limit='pictureForm.id?1:10'
                          >
                            <i class="el-icon-plus"></i>
                            <div class="hintText">点击这里上传哦</div>
                        </el-upload>
                        <!-- <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>   -->
                    </el-form-item>
                    <el-form-item>
                        <el-button  type="danger" class="deletePic" v-if="pictureForm.id" @click="pictureForm.imgUrl = ''">删除图片</el-button>
                        <el-button type="primary" style="width:150px;margin-left:50px" v-if="!pictureForm.id" @click="onUploadPicture">点击上传</el-button>
                        <el-button type="warning" style="width:150px;margin-left:50px" v-if="pictureForm.id" @click="onEditPicture">点击修改</el-button>
                    </el-form-item>
                </el-form>
            </template>
        </Card>
    </div>
</template>

<script>
import { addPicture , getPictureInfo , editPictureInfo} from '@/API/resource/picture.js'
export default {
    name: 'addOrEditPicPage',
    data () {
        return {
            pictureForm: {
                id:'',
                title: '',
                imgUrl: ''
            },
            fileList: [],
            uploadArr: []
        }
    },
    methods: {
        // 修改图片
        async onEditPicture () {
            if ( !(this.pictureForm.title && this.pictureForm.imgUrl) ) {
                this.$message({message: '请完整填入信息', type: 'error'})
                return false
            }
            try {
                await editPictureInfo(this.pictureForm)
                this.$refs.myUpload.clearFiles()
                this.$router.push({path:'/picture'})
                this.$message({message: '修改成功', type: 'success'})
            } catch (error) {
                this.$message.error('修改失败') 
            }   
        },
        // 获取图片详情
        async initPictureInfo () {
         const { data } = await getPictureInfo(this.pictureForm.id)
         console.log(data);
         this.pictureForm = {...data.data}
         
        },
        // 图片上传
        async onUploadPicture () {
            if (this.uploadArr.length === 0) {
                this.$message({message: '需要选择图片哦', type: 'error'})
                return false
            }
            try {
                for( var i = 0 ; i < this.uploadArr.length; i++){
                 await addPicture(this.uploadArr[i])
                 this.uploadArr = []
                }
                this.pictureForm = {}
                this.$refs.myUpload.clearFiles()
                this.$message({message: '上传成功', type: 'success'})
            } catch (error) {
               this.$message.error('上传失败') 
            }
        },
        // notify 通知
        open1() {

         const h = this.$createElement;

         this.$notify({
         title: '上传提示',
         message: h('i', { style: 'color: teal'}, '最多只能上传十张图片哦,上传成功自动添加名称')})
         },
        open2() {

         const h = this.$createElement;

         this.$notify({
         title: '上传提示',
         message: h('i', { style: 'color: teal'}, '修改图片只能上传一张图片哦')})
         },
        // 文件预览
        handlePictureCardPreview () {

        },
        // 文件移除
        handleRemove (file, fileList) {
            console.log(file, fileList);
           this.pictureForm.imgUrl = ''
           this.fileList = []
        },
        // 文件上传成功
        handlePictureSuccess (res, file) {
            const arr = file.name.split('.')
            this.pictureForm.imgUrl = res.data
            this.pictureForm.title = arr[0]
            if (!this.pictureForm.id) {
                let upload = {
                imgUrl: res.data,
                title: arr[0]
                }
                this.uploadArr.push(upload)
                // this.pictureForm.title = 
                this.fileList.push(file)
            }
        },
        // 上传状态改变
        handleImgUrlChange (file, fileList) {
        }
    },
    created () {
       
        if (this.$route.query.id) {
            
            this.pictureForm.id = this.$route.query.id 
            this.initPictureInfo()
            this.open2()
        } else {
             this.open1()
        }
     
    }
}
</script>
<style scoped lang="less">
.addOrEditPic_container{
    .el-input{
        width: 300px;
    }
}
.hintText{
    position: relative;
    top: -100px;
}
.deletePic{
    margin-left: 70px;
}
/deep/ .el-form-item__content{
    display: flex;
    align-items: center;
}
</style>