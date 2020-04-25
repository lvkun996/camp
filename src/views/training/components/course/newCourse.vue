<template>
    <div class="newCourse_container">
        <breadcrumb>
              <template slot="title">训练营管理 </template>
              <template slot="secondTitle"> 训练营</template>
              <template slot="thirdlyTitle"> 课程管理</template>
        </breadcrumb>
        <Card>
            <template slot="content">
                <div class="CourseMeun">
                    课程目录
                </div>
                <div class="collapseBox">
                    <el-collapse v-for="(item , index) in collapseList" :key="index">
                        <el-collapse-item  :title="item.title?item.title:'待输入标题噢'" name="1"  >
                            <el-form>
                                <el-form-item label="课程标题:" label-width="100px">
                                    <div class="flexHeader">
                                        <el-input :disabled="item.inputDisAble" v-model="item.title" placeholder="请输入课程标题"></el-input>
                                        <div class="iconArr">
                                            <i class="el-icon-edit" @click="onEditDay(item,index)"></i>
                                            <i class="el-icon-delete" @click="onDeleteDay(item)"></i>
                                        </div>
                                    </div>
                                </el-form-item>
                                <el-form-item  label="开课时间:" label-width="100px">
                                    <el-date-picker :disabled="item.inputDisAble" v-model="item.startTime"  @change="saveTime(index)" type="date"   placeholder="选择日期"> </el-date-picker>
                                </el-form-item>
                                <el-form-item label="对话流程:" label-width="100px">
                                    <div class="scene">
                                        <el-input :disabled="true" v-model="item.courseTitle" > </el-input>
                                        <el-tag @click="opendialog(index)">选择情景流程和打卡</el-tag>
                                    </div>
                                </el-form-item>
                                <el-form-item label="打卡内容:" label-width="100px">
                                    <div class="scene">
                                        <el-input :disabled="true" v-model="item.courseClockContent" > </el-input>
                                    </div>
                                </el-form-item>
                                <el-form-item label="操作:" label-width="100px">
                                    <el-tag v-if="!editOrAdd"  @click="addSceneAndPunchCard(index)">完成</el-tag>
                                    <el-tag  v-else type="warning" @click="editSceneAndPunchCard(index)">完成</el-tag>
                                </el-form-item>
                            </el-form>
                        </el-collapse-item>
                    </el-collapse>
                    <el-button  style="margin-top:20px" @click="newCourse">新增课程</el-button>
                </div>
            </template>
        </Card>
        <el-dialog :visible.sync="dialogVisible" width="30%">
            <el-tabs  type="card">
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
import Sceneflow from '../periods/sceneFlow.vue'
// import Character from '@/views/resource/scene/components/tabs/text.vue'
import PeridosPunchCard from '../periods/punchCard.vue'
import { addClassAndPunch ,  reasonPeriodsIdGetSecenList , editPeriodsIdGetSecenList , reasonIdDeleteCourseItem} from '@/API/training/drill.js'
import { log } from 'util';

export default {
    name: 'newCoursePage',
    data () {
        return {
            activityItemId: '' , //营期id
            dialogVisible: false ,// 弹窗
            componentsKey: 0 , // 组件刷新
            courseIndex: '', // 对应课程的下标
            inputDisAble: false ,// course输入框是否禁用
            editOrAdd: false,
            courseData: {
                title: '',
                courseTitle: '',
                courseId: '',
                startTime: '' ,
                courseClockContent: '',
                courseClockInId: ''
            },
            collapseList: [] 
        }
    },  
    methods: {
        // 提交编辑课程
        async editSceneAndPunchCard (index) {
        this.collapseList[index].sort = index + 1
         const { data } =  await editPeriodsIdGetSecenList(this.collapseList[index])
         if (data.status === 500) {
             this.$message.error(data.msg)
             return false
         }
         this.$message.success('编辑成功')
         this.editOrAdd = false
         this.initCourserList()
        },
        // 编辑课程
        onEditDay (item,index) {
            this.editOrAdd = true
            this.courseIndex = index
            this.collapseList[index].inputDisAble = false
        },
        // 删除课程
        async onDeleteDay (item) {
            try {
                await reasonIdDeleteCourseItem(item.relationId)
                this.$message.success('删除成功')
            } catch (error) {
                this.$message.error('删除失败')
            }
            this.initCourserList()
        },
        // 点击新增课程，每次可以新加个day
        newCourse () {
            this.courseData = {}
            this.collapseList.push(this.courseData)
        },
        // 给营期添加训练营和打卡
        async addSceneAndPunchCard (index) {
            this.courseData.activityItemId = this.activityItemId
            this.courseData.sort = index + 1
            console.log(this.courseData);
            this.courseData.templateId = this.courseData.courseClockInId
           const { data } = await addClassAndPunch(this.courseData)
           console.log(data);
           if ( data.status === 500 ) {
               this.$message.error(data.msg)
               return false
           }
           this.inputDisAble = true
           this.initCourserList()
        },
        // 接受选择的值
        reception (val) {
            console.log(val);
            if ( val.content ) {
                this.$set(this.collapseList[this.courseIndex], 'courseClockContent' , val.content )
                this.$set(this.collapseList[this.courseIndex], 'courseClockInId' , val.id )
            } else {
                 this.$set(this.collapseList[this.courseIndex], 'courseTitle' , val.title )
                 this.$set(this.collapseList[this.courseIndex], 'courseId' , val.id )
            }
        },
        // 改变日期格式
        saveTime (index) {
            this.collapseList[index].startTime = this.$moment(this.collapseList[index].startTime).format('YYYY-MM-DD HH:mm:ss')
        },
        // 打开弹窗
        opendialog ( index ) {
            this.dialogVisible = true
            this.componentsKey ++
            this.courseIndex = index
        },
        // 初始化day列表
        async initCourserList () {
            this.collapseList = []
          const { data } = await reasonPeriodsIdGetSecenList(this.activityItemId)
          console.log(data);
          
          data.data.forEach ( item => {
              this.$set( item, 'inputDisAble', true )
              this.collapseList.push(item)
          })
        }
    },
    created () {
        if (this.$route.query) {
            this.activityItemId = this.$route.query.activityItemId
            this.initCourserList()
        }
    },
    components: {
        Sceneflow,
        PeridosPunchCard
    }
}
</script>

<style lang="less" scoped>
.collapseBox{
    .scene{
        display: flex;
        justify-content: space-between;
    }
  
}
.el-input{
    width: 300px;
}
.flexHeader{
    display: flex;
    justify-content: space-between;
    .iconArr{
        width: 50px;
        display: flex;
        justify-content: space-between;
        color: red;
        cursor:pointer;
    }
}
// .collapse{
   
// }
</style>

