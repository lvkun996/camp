<template>
    <div class="drillClass_container">
            <el-form :model="studyTask" ref="myForm" :rules="rules">
                <el-form-item label="课程名称：" prop='title'>
                    <el-input v-model="studyTask.title"></el-input>
                </el-form-item>
                <el-form-item label="排序：" prop='sort'>
                    <el-input v-model="studyTask.sort"></el-input>
                </el-form-item>
                <el-form-item label="开课时间：" prop='startTime'>
                    <el-date-picker
                        v-model="studyTask.startTime"
                        @change="onSaveTime" 
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="情景展示">
                        <div class="show"  v-for ="(item , index) in singleData" :key="index">
                            <span>{{item.title?item.title:item.content}}</span>
                        </div>
                </el-form-item>
                <el-form-item>
                    <el-button style="margin-left:60px" @click="newStudyTask">添加情景流程</el-button>
                    <el-button style="margin-left:60px" @click="deleteStudyTask">删除情景流程</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button v-if="!editOrShow" type="primary" style="margin-left:200px" @click="addStudyTask">完成</el-button>
                    <el-button v-else type="warning" style="margin-left:200px" @click="editStudyTask">编辑学习任务</el-button>
                </el-form-item>
            </el-form>

            <el-table :data="saveData">
                <el-table-column label="课程数">
                    <template slot-scope="scope">
                        <span>第{{scope.row.sort}}节课</span>
                    </template>
                </el-table-column>
                <el-table-column label="情景名称">
                    <template slot-scope="scope">
                        <span>{{scope.row.courseTitle}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="打卡内容">
                    <template slot-scope="scope">
                        <span>{{scope.row.courseClockContent}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="打卡时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.startTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope" >
                        <el-tag type="success" style="margin-right:10px" @click="onEditClassContent(scope.row)">编辑</el-tag>
                        <el-tag type="danger" @click="onDeleteClassContent(scope.row)">删除</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        <el-dialog :visible.sync="dialogVisible" width="30%">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="情景流程" name="0"><Sceneflow :key="componentsKey" @transmitData="reception"/></el-tab-pane>
                <el-tab-pane label="打卡" name="1"><PeridosPunchCard  :key="componentsKey" @transmitData="reception" /></el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import Sceneflow from './sceneFlow.vue'
import Character from '@/views/resource/scene/components/tabs/text.vue'

import PeridosPunchCard from './punchCard.vue'

import { addClassAndPunch , reasonPeriodsIdGetSecenList , editPeriodsIdGetSecenList , reasonIdDeleteCourseItem} from '@/API/training/drill.js'
import { detailInfo , deleteCourseItem } from '@/API/resource/course.js'
export default {
    name: 'drillClassPage',
    props: {
        title: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            saveData: [],
            // ----------
            dialogVisible: false,
            activeName: 0,
            singleData: [],
            componentsKey: 0,
            studyTask: {
                activityItemId: '',
                courseId: '',
                templateId: '',
                title: '',
                startTime: '',
                sort: ''
            },
            relationData: {},
            relationId: '',
            editOrShow: false,
            rules: {
                title: [{ required: true , message: '请输入标题' ,trigger: 'blur'}],
                startTime: [{ required: true ,message: '请输入时间' , trigger: 'blur'}],
                sort: [{ required: true ,message: '请输入课时数' , trigger: 'blur'}]
            }
        }
    },
    methods: {
        // 确定编辑课程
        async editStudyTask () {
            let courseId = ''
            let courseClockInId = ''
            this.singleData.forEach ( item =>  {
                if ( item.title ) {
                    courseId = item.id
                } else {
                    courseClockInId = item.id
                }
            })

            let params = {
                title: this.studyTask.title,
                startTime: this.studyTask.startTime,
                sort: this.studyTask.sort,
                relationId: this.relationId,
                courseId,
                courseClockInId
            }
            try {
                 await editPeriodsIdGetSecenList(params)
                 this.$message({message: '修改成功', type: 'success'})
                 this.initCourseItem()
                this.singleData = []
                this.studyTask.title = null
                this.studyTask.startTime = null
                this.studyTask.sort = null
            } catch (error) {
                this.$message.error('修改失败')
            }
         
        },
        // 编辑day课程
        async onEditClassContent (val) {
            console.log(val)
            this.relationId = val.relationId
        //    this.studyTask.title = val.title
           this.$set(this.studyTask, 'title' ,val.title )
           this.$set(this.studyTask, 'sort' ,val.sort )
        //    this.$set(this.singleData, 0 ,{'title': val.courseTitle})
        //    this.$set(this.singleData, 1 ,{'content': val.courseClockContent})
           this.editOrShow =true
        },
        // 初始化课程
        async initCourseItem () {
            console.log(this.studyTask.activityItemId);
            
          const { data } = await reasonPeriodsIdGetSecenList(this.studyTask.activityItemId)
          console.log(data);
          
          this.saveData = data.data
        },
        // 删除课程
        async onDeleteClassContent (value) {
            console.log(value);
            
          try {
            const { data } = await reasonIdDeleteCourseItem(value.relationId)
            console.log(data);
            
              this.$message({message: '删除成功', type: 'success'})
              this.initCourseItem()
            } catch (error) {
              this.$message.error('删除失败')
         }
        },
        //编辑时初始课程
        async initPriodsValue () {
            let params =  window.sessionStorage.getItem('id')
            const { data } =  await reasonPeriodsIdGetSecenList(params)
            console.log(data);
            this.saveData = data.data
        },
        //  删除情景
        deleteStudyTask () {
            this.singleData = []
        },
        // 打开dialog弹窗
        newStudyTask () {
            this.dialogVisible = true
            this.componentsKey ++
        },
        // 添加学习任务
        async addStudyTask () {
            this.$refs.myForm.validate( async valid => {
                if (valid) {
                    console.log(this.singleData);
                    
                    this.singleData.forEach ( item =>  {
                        if ( item.title ) {
                            this.studyTask.courseId = item.id
                        } else {
                           this.studyTask.templateId = item.id
                        }
                    })
                    console.log(this.studyTask)
                    const {data} = await addClassAndPunch(this.studyTask)
                    if ( data.status === 500 ) {
                        this.$message.error(`${data.msg}`)
                        this.singleData = []
                        this.studyTask.title = null
                        this.studyTask.startTime = null
                        this.studyTask.sort = null
                        return false
                    }
                    this.$message({message: '创建成功', type: 'success'})
                    console.log(this.singleData)
                    // this.singleData.forEach( item => {
                    //     if ( item.contentType === 3 || item.contentType === 1) {
                    //         this.saveData.push(item)
                    //     }
                    // })
                 const res  = await reasonPeriodsIdGetSecenList(this.studyTask.activityItemId)
                 console.log(res);
                 this.saveData = res.data.data
                    this.singleData = []
                    this.studyTask.title = null
                    this.studyTask.startTime = null
                    this.studyTask.sort = null
                }
            })
        },
        // 日期格式转换
        onSaveTime () {
            this.studyTask.startTime = this.$moment(this.studyTask.startTime).format('YYYY-MM-DD HH:mm:ss')
        },
        onDeleteStudy (val,index) {
            this.singleData = this.singleData.filter( item => {
                if ( item.id !== val.id ) {
                    return item
                }
            })
        },
        addStudy () {
            this.componentsKey ++
            this.dialogVisible = true
        },
        reception (val) {
            console.log(val);
            
            if (this.singleData.length >= 2) {
                return false
            }
            this.singleData.push(val)   
        },
        handleClick () {

        }
    },
    components: {
        Sceneflow,
        PeridosPunchCard
    },
    created () {
        this.studyTask.activityItemId = window.sessionStorage.getItem('id')
        this.initCourseItem()
        // this.studyTask.activityItemId = this.$route.query.id
        // if ( window.sessionStorage.getItem('periodsId') ) {
        //     this.initPriodsValue()
        // }   
      
    }
}
</script>
<style scoped lang="less">
// .show{
  
//     margin-left: 100px;
// }
.showScene{
    background-color: #ccc;
    border-radius: 10px;
        margin-top: 10px;
      display: flex;
        line-height: 84px;
      align-items: center;
    .days{
    
    }
    .showSamll{

        .elImg{
            margin-left: 50px;
            margin-right: 50px;
            margin-top: 20px;
        }
        .CardText{
            margin-left: 50px;
            margin-right: 50px;
        }
    }
}


// ---------------
.addStudy{
    margin-left:50px;
    color:blue
    
}
.addStudy:hover{    
    cursor: pointer;
}
.el-input{
    width: 300px;
}
.showInfo{
    position: relative;
    top: -10px;
    left: 10px;
}
.addClass{
    margin-top: 20px;
}
.showClass{
    height: 100px; line-height: 100px;
    padding-left: 20px;
    background-color: #ccc;
    .study{
        color: slateblue;
        cursor: pointer;
    }
}
</style>