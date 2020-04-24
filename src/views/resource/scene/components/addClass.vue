<template>
    <div class="class_container">
        <breadcrumb>
            <template slot="title">资源管理 </template>
            <template slot="secondTitle">情景流程</template>
            <template slot="thirdlyTitle">新增课程</template>
        </breadcrumb>
          <Card>
            <template slot="content">
                <el-form  ref="myForm" :model="classForm" :rules="rules"> 
                    <el-form-item label="课程名称：" prop="title">
                        <el-input v-model="classForm.title"></el-input>
                    </el-form-item> 
                    <el-form-item label="选择视频：" prop="videoUrl">
                        <el-image  v-if="classForm.videoUrl" :src="classForm.videoUrl" style="width:146px;height:146px"></el-image>
                    </el-form-item>
                    <el-form-item>
                        <el-button v-if="!classForm.videoUrl" type="primary" style="margin-left:100px" @click="openDialog">点击选择视频</el-button>
                        <el-button v-if="classForm.videoUrl" type="danger" style="margin-left:100px" @click="classForm.videoUrl=''">点击删除</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button v-if="!classForm.id" type="primary" style="margin-left:100px" @click="onNewClass">完成</el-button>
                        <el-button v-if="classForm.id" type="warning" style="margin-left:100px" @click="onEditClass">完成</el-button>
                    </el-form-item>
                </el-form>
            </template>
        </Card>
        <el-dialog title="点击选择视频" :visible.sync="dialogVisible" width="30%">
            <Video  @middleData="reception" :single="single" :key="res" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="点击选择封面图" :visible.sync="imgdialogVisible" width="30%">
           <Picutrue  :key="res" @middleData="receptionImg" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="imgdialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="imgdialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Video from './tabs/video.vue'
// import Picutrue from './tabs/picture.vue'
import { addCourse , editCourse , getClassInfo} from '@/API/resource/course.js'
export default {
    name: 'classPage',
    data () {
        return {
            dialogVisible: false,
            imgdialogVisible: false,
            res: 0 ,
            single: true,
            classForm: {
                title: '',
                // imgUrl: '',
                videoUrl: '',
                videoId: ''
            },
            rules: {
                title: [{required: true , message: '该项不能为空', trigger: 'blur'}],
                imgUrl: [{required: true , message: '该项不能为空', trigger: 'blur'}],
                videoUrl: [{required: true , message: '该项不能为空', trigger: 'blur'}]
            }
        }
    },
    methods: {
        // 编辑Class 
        async onEditClass () {
            try {
               await editCourse(this.classForm)
               this.$message({message: '编辑成功', type: 'success'})
               this.classForm = {}
               this.$router.push( {path: '/scene'} )
            } catch (error) {
                this.$message.error( '编辑信息不全' )
            }
        },
        // 选择封面图 
        openImgDialog () {
            this.imgdialogVisible = true
        },
        // 初始化编辑
        async initEditClass () {
        const { data } = await getClassInfo(this.classForm.id)
        console.log(data);
        
        this.classForm.title = data.data.title
        // this.classForm.videoUrl = data.data.videoUrl + '?vframe/jpg/offset/1'
        },
        // 新建课程
        async onNewClass () {
            this.$refs.myForm.validate( async valid => {
                if (valid) {
                    try {
                        console.log(this.classForm);
                        
                        await addCourse(this.classForm)
                        this.$message({message: '新建成功', type: 'success'})
                        this.classForm = {}
                    } catch (error) {
                        this.$message.error( '新建失败' )
                    }
                } else {
                      this.$message.error( '表单信息不全' )
                }
            })
        },
        // 打开弹窗
        openDialog () {
            this.res ++
            this.dialogVisible = true
        },
        receptionImg (val) {
            console.log(val);
        
            this.classForm.imgUrl = val.imgUrl
        },
        reception (val) {
            console.log(val);
            this.classForm.videoId = val.id
            this.classForm.videoUrl = val.videoUrl
        }
    },
    created () {
        if (this.$route.query.id) {
            this.classForm.id = this.$route.query.id
            this.initEditClass()
        }
    },
    components: {
        Video,
        // Picutrue
    }
}
</script>
<style scoped lang="less">
.el-input{
    width: 300px;
}
</style>