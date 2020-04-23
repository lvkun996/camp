<template>
  <div class="addDrill_container">
    <breadcrumb>
      <template slot="title">训练营管理</template>
      <template slot="secondTitle">训练营</template>
      <template slot="thirdlyTitle">增加期数</template>
    </breadcrumb>
    <Card>
      <template slot="content">
        <el-form ref="myForm" enctype="multipart/form-data" :model="trainingForm" :rules="rules">
          <el-form-item label="营期名称:" prop="title">
            <el-input class="baseInput" v-model="trainingForm.title"></el-input>
          </el-form-item>
          <el-form-item label="营期天数:" prop="days">
            <el-input class="baseInput" v-model="trainingForm.days"></el-input>
          </el-form-item>
          <el-form-item label="营期封面:" prop="imgUrl" style="display:flex">
            <el-image v-if="trainingForm.imgUrl" :src="trainingForm.imgUrl" class="elImg"></el-image>
          </el-form-item>
          <el-form-item  >
            <el-tag type="primary" style="margin-left:100px;margin-right:20px" @click="openDialog">点击选择</el-tag>
            <el-tag type="danger" @click="showHeadImgUrl = ''">删除图片</el-tag>
          </el-form-item>
          <el-form-item label="上传图片:"  prop="imgListEx">
            <el-image v-for="(item , index ) in trainingForm.imgListEx" :key="index" :src="item" class="elImg"></el-image>
          </el-form-item>
          <el-form-item>
           <el-tag type="primary" @click="uploadMutImg" style="margin-left:100px;margin-right:20px" >上传图片</el-tag>
           <el-tag type="danger" @click="trainingForm.imgListEx = []">删除图片</el-tag>
          </el-form-item>
          <el-form-item>
            <el-button style="width:300px" type="primary" v-if="!id" @click="onAddDirll">增加</el-button>
            <el-button style="width:300px" type="warning" v-else @click="onEditDirll">修改</el-button>
          </el-form-item>
        </el-form>
      </template>
    </Card>
    <el-dialog  title="提示"  :visible.sync="dialogVisible" width="30%" >
        <Picture :key="res" @middleData="reception"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog  title="提示"  :visible.sync="dialogVisibleMut" width="30%" >
        <Picture :key="res" @middleData="receptionMut"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleMut = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleMut = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { addDirll , getDrillInfo , editDrillInfo} from '@/API/training/drill.js'
import Picture from '@/views/resource/scene/components/tabs/picture.vue' 
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
      limitCount: 1,
      showHeadImgUrl: '',
      res: 0,
      flagImg: false, // 判断是选头图还是上传图片
      dialogVisibleMut: false,
      rules: {
        title: [
          { required: true, message: '请输入营期名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        days: [
          { required: true, message: '请输入营期天数', trigger: 'blur' }
        ],
        imgUrl: [
          { required: true, message: '请选择封面图片', trigger: 'blur' }
        ],
        imgListEx: [
          { type: 'array' , required: true, message: '请选择营期图片', trigger: 'blur' }
        ]
      },
      id: '',
    }
  },
  methods: {
    // 点击多个
    receptionMut (value) {
       this.trainingForm.imgListEx.push(value.imgUrl)
    },
    reception (value) {
        console.log(value);
           this.trainingForm.imgUrl = value.imgUrl
    },
    // 打开多组图片弹窗
    uploadMutImg () {
      this.dialogVisibleMut = true
      // this.flagImg = true
      this.res ++ 
    },
    // 打开弹窗
    openDialog () {
      this.dialogVisible = true
      this.res ++ 
    },
    // 修改训练营 
    async onEditDirll () {
      this.$refs.myForm.validate( async valid => {
        if ( valid) {
          try {
          const { data } =   await editDrillInfo(this.trainingForm)
            this.trainingForm = {}
            this.$message({ message:'修改成功',type:'success'})
            this.$router.push({
              path: '/drill'
            })
            } catch (error) {
            this.$message.error('修改失败')
            }
          }
      })
    },
    //   增加训练营期数
    async onAddDirll () {
      await this.$refs.myForm.validate( async valid => {
        if (valid) {
          try {
            await addDirll(JSON.stringify(this.trainingForm) )

            this.trainingForm = {}
            this.$message({ message:'增加成功',type:'success'})
          } catch (error) {
            this.$message.error('增加失败')
          }
        } else {
          this.$message.error('请正确完整填入表单信息')
        }
      })
    },
    async initTrainingForm () {
    const { data } = await getDrillInfo(this.id)
    console.log(data);
    this.trainingForm = data.data
    },
    handlesmallChange (file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount;
    },
    handleImageRemove (file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount
      this.fileList = []
    },
    handlerImageSuccess (response, file, fileList) {
      this.trainingForm.imgUrl = response.data
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-10);
    },
    handlerHeadImageSuccess (response, file, fileList) {
      this.trainingForm.imgListEx.push(response.data)
    },
    handleHeadImageRemove (file, fileList) {
       this.fileList = []
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
      console.log(1);
      
      return isPNG && isJPG && isSize && isLt20M
    }
    // handlePictureCardPreview (file) {
    //   this.dialogImageUrl = file.url
    //   this.dialogVisible = true
    // }
  },
  components: {
    Picture
  },
  created () {
    this.id = this.$route.query.id
    this.trainingForm.title = this.$route.query.title
    if ( this.id ) {
        this.initTrainingForm()
    }
  
  }
}
</script>
<style scoped lang="less">
.addDrill_container {
  .baseInput {
    width: 300px;
  }
}
/deep/ .hide .el-upload--picture-card {
    display: none;
}
.elImg{
  width: 84px;
  height: 84px;
  margin-right: 10px;
  object-fit: cover;
}
</style>
