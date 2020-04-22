<template>
    <div class="drillClass_container">
            <el-form :model="studyTask" ref="myForm" :rules="rules">
                <el-form-item label="课程名称：" prop='title'>
                    <el-input v-model="studyTask.title"></el-input>
                    <el-button style="float:right;margin-right:500px" @click="addStudyTask">增加学习任务</el-button>
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
                            <el-image style="width:84px;height:84px" :src="item.content" v-if="item.contentType === 3?true : false"></el-image>
                            <el-image style="width:84px;height:84px" :src="item.content" v-if="item.contentType === 1?true : false"></el-image>
                            <span v-else> {{item.content}}</span>
                        </div>
                </el-form-item>
                <el-form-item>
                    <el-button style="margin-left:60px" @click="newStudyTask">添加情景流程</el-button>
                    <el-button style="margin-left:60px" @click="deleteStudyTask">删除情景流程</el-button>
                </el-form-item>
            </el-form>
            <div class="showScene" v-for="(item , index) in saveData" :key="index">
                <div class="days">第{{index + 1 }}节课</div>
                <div class="showSamll" v-for="(element, i ) in item" :key="i">
                    <el-image class="elImg" v-if="element.contentType !== 3?false: true"  style="width:84px;height:84px" :src="element.content"></el-image>
                    <div  class="CardText" v-if="element.contentType === 3?false : true"> {{element.content}}</div>
                </div>
            </div>
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

import { addClassAndPunch  } from '@/API/training/drill.js'
import { getDrillInfo } from '@/API/resource/course.js'
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
                activityItemId: window.sessionStorage.getItem('id') || '',
                courseId: '',
                templateId: '',
                title: '',
                startTime: '',
                sort: 0
            },
            rules: {
                title: [{ required: true , message: '请输入标题' ,trigger: 'blur'}],
                startTime: [{ required: true ,message: '请输入时间' , trigger: 'blur'}]
            }
        }
    },
    methods: {

        async initPriodsValue () {
            let params = {
                id: window.sessionStorage.getItem('periodsId')
            }
            console.log(params);
            
         const { data } =  await getDrillInfo(params)
         console.log(data);
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
                    this.singleData.forEach ( item =>  {
                    if ( item.contentType === 3 ) {
                        this.studyTask.courseId = item.id
                    } else {
                        this.studyTask.templateId = item.id
                    }
                    })
                    ++ this.studyTask.sort
                    const {data} = await addClassAndPunch(this.studyTask)
                    if ( data.status === 500 ) {
                        this.$message.error(`${data.msg}`)
                        this.singleData = []
                        this.studyTask = {}
                        return false
                    }
                    this.$message({message: '创建成功', type: 'success'})
                    this.saveData.push( this.singleData)
                    this.singleData = []
                    this.studyTask = {}
                }
            })
        },
        // 日期格式转换
        onSaveTime () {
            this.studyTask.startTime = this.$moment(this.studyTask.startTime).format('YYYY-MM-DD HH:mm:ss')
        },
        // 添加流程和打卡
        // async confirmAdd () {
        
        //     this.singleData.forEach ( item =>  {
        //          if ( item.contentType === 3 ) {
        //              this.studyTask.courseId = item.courseId
        //          } else {
        //              this.studyTask.templateId = item.id
        //          }
        //     })
        //     if ( !this.studyTask.courseId && !this.studyTask.templateId) {
        //         this.$message.error('不能添加内容为空的课程')
        //         return false
        //     }
        // try {
        //     const  { data } = await addClassAndPunch(this.studyTask)
        //     console.log(data);
        //     if ( data.status === 500 ) {
        //         this.$message.error(`${data.msg}`)
        //     }
        //     this.studyTask = {}
        //     this.singleData = []
        //     this.$message({message: '添加成功', type: 'success'})
        // } catch (error) {
        //     console.log(error);
        // }
        // },
        // // 新增情景流程
        // addLeave () {
        //     this.dialogVisible = true
        // },
        // // 新增一节
        // newClass () {
        //     // this.addClass = true
        //     this.FLAGDAY.push(this.singleData)
        // },
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
        // this.studyTask.activityItemId = this.$route.query.id
        if ( window.sessionStorage.getItem('periodsId') ) {

            this.initPriodsValue()
        }   
      
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