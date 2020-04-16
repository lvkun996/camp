<template>
  <div class="addDrill_container">
    <breadcrumb>
      <template slot="title">训练营管理</template>
      <template slot="secondTitle">训练营</template>
      <template slot="thirdlyTitle">增加期数</template>
    </breadcrumb>
    <Card>
      <template slot="content">
        <el-form enctype="multipart/form-data">
          <el-form-item label="营期名称:">
            <el-input class="baseInput" v-model="trainingForm.title"></el-input>
          </el-form-item>
          <el-form-item label="营期天数:">
            <el-input class="baseInput" v-model="trainingForm.days"></el-input>
          </el-form-item>
          <el-form-item label="营期封面:">
            <!-- <el-image :src="fileList[0].url" style="width:300px;height:100px"></el-image> -->
            <el-upload
              action="http://training.test.luojigou.vip/training/file/uploadFile"
              list-type="picture-card"
              :on-success="handlerImageSuccess"
              :on-remove="handleImageRemove"
              :limit="1"
              :class="{hide:hideUpload}"
              :on-change="handlesmallChange"
            >
            <!--       :before-upload="beforeAvatarUpload"  -->
              <i class="el-icon-plus"></i>
            </el-upload>`
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </el-form-item>
          <el-form-item label="上传图片:">
            <el-upload
              action="http://training.test.luojigou.vip/training/file/uploadFile"
              list-type="picture-card"
              :file-list="fileList"
              :on-success="handlerHeadImageSuccess"
              :on-remove="handleHeadImageRemove"
              :on-change="handleChange"
            >
              <i class="el-icon-plus"></i>
            </el-upload>`
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </el-form-item>
          <el-form-item>
            <el-button style="width:300px" type="primary" @click="onAddDirll">增加</el-button>
          </el-form-item>
        </el-form>
      </template>
    </Card>
  </div>
</template>

<script>
import { addDirll } from '@/API/training/drill.js'
export default {
  name: 'addDrillPage',
  data () {
    return {
      trainingForm: {
        title: '',
        days: '',
        imgListEx:[],
        imgUrl:''
      },
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      hideUpload: false,
    }
  },
  methods: {
    //   增加训练营期数
    async onAddDirll () {
      try {
         await addDirll(JSON.stringify(this.trainingForm) )
         this.$message({ message:'增加成功',type:'success'})
  
      } catch (error) {
        this.$message.error('增加失败')
      }
      
    },
    handlesmallChange () {
      this.hideUpload = fileList.length >= this.limitCount;
    },
    handleImageRemove (file, fileList) {
      console.log(file, fileList)
      // this.fileList = fileList
      this.hideUpload = fileList.length >= this.limitCount
    },
    async handlerImageSuccess (response, file, fileList) {
      console.log(response)
      this.trainingForm.imgUrl = response.data
      // const imgUrl = response.data
      //   try {
      //     const { data } = await uploadImg({ file: imgUrl })
      //     console.log(data)
      //   } catch (error) {
      //   }
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-10);

    },
    async handlerHeadImageSuccess (response, file, fileList) {
      console.log(response)
      this.trainingForm.imgListEx.push(response.data)
      // const imgUrl = response.data
      //   try {
      //     const { data } = await uploadImg({ file: imgUrl })
      //     console.log(data)
      //   } catch (error) {
      //   }
    },
    handleHeadImageRemove (file, fileList) {
      console.log(file, fileList)
      // this.fileList = fileList
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpg'
      const isPNG = file.type === 'image/png'
      console.log(isJPG , isPNG);
      
      const isLt20M = file.size / 1024 / 1024 < 20
      console.log(!isJPG || !isPNG);
      if (!(isJPG || isPNG)) {
        this.$message.error('上传图片的格式只能是 JPG或PNG 格式!')
      }
      if (!isLt20M) {
        this.$message.error('上传图片的大小不能超过 20M!')
      }
      const isSize = new Promise(function (resolve, reject) {
        const width = 3000
        const height = 1000
        const _URL = window.URL || window.webkitURL
        const img = new Image()
        img.onload = function () {
          const valid = img.width <= width && img.height <= height
          valid ? resolve() : reject()
        }
        img.src = _URL.createObjectURL(file)
      }).then(
        () => {
          return file
        },
        () => {
          this.$message.error('上传的图片宽高必须是320*320!')
          return Promise.reject()
        }
      )
      return isPNG && isJPG && isSize && isLt20M
    }
    // handlePictureCardPreview (file) {
    //   this.dialogImageUrl = file.url
    //   this.dialogVisible = true
    // }
  },
  created () {
    this.trainingForm.title = this.$route.query.title
  }
}
</script>
<style scoped lang="less">
.addDrill_container {
  .baseInput {
    width: 300px;
  }
}
.hide .el-upload--picture-card {
    display: none;
}
</style>
