<template>
    <div class="drillClass_container">
        <div class="ImGreens" v-for="(item, index) in FLAGDAY" :key="index">
            <template >
                <el-input  style="width:200px" v-model="studyTask.title" placeholder="添加标题"></el-input>
                <el-date-picker
                v-model="time"
                style="margin-left:20px"
                @change="onSaveTime"
                type="date"
                placeholder="选择日期">
                </el-date-picker>
                <i class="el-icon-arrow-up"></i>
            </template>
            <el-collapse accordion>
                <el-collapse-item>
                    <template slot="title">
                        <el-tag>点我选择</el-tag>  <el-tag style="margin-left:20px"  @click="confirmAdd">确定添加</el-tag> 
                    </template>
                    <!-- <template slot="title">
                        <el-input  style="width:100px" v-model="studyTask.sort" placeholder="添加天数"></el-input>
                        <el-date-picker
                            style="margin-left:20px"
                            v-model="time"
                            @change="onSaveTime"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                        <i class="el-icon-arrow-up"></i>
                    </template> -->
                    <div class="addStudy" @click="addStudy">+ 添加学习任务  </div>
                  
                    <div>
                        <el-table
                            v-if="singleData.length > 0? true : false"
                            :data="singleData"
                            style="width: 100%">
                            <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="任务名称:">
                                    <span>{{ props.row.title }}</span>
                                </el-form-item>
                                <el-form-item label="所选商品:" v-if="!props.row.content">
                                    <el-image :src="props.row.teacherUrl" style="width:30px;height:30px"></el-image>
                                    <span  class="showInfo"   >{{ props.row.title }}</span>
                                </el-form-item>
                                <el-form-item label="所选内容:" v-if="props.row.content">
                                    <el-image :src="props.row.teacherUrl" style="width:30px;height:30px"></el-image>
                                    <span  class="showInfo"   >{{ props.row.content }}</span>
                                </el-form-item>
                                </el-form>
                            </template>
                            </el-table-column>
                            <el-table-column label="任务名称" prop="title">
                                <template slot-scope="scope">
                                    <el-image v-if="scope.row.contentType === 0?false : true" :src="scope.row.content" style="width:50px;height:50px"></el-image>
                                    <span  v-if="scope.row.contentType === false?true : false">{{scope.row.content}}</span>
                                </template>
                            </el-table-column>
                            <!-- <el-table-column label="已选商品" prop="videoUrl">
                                <template slot-scope="scope">
                                    <el-image :src="scope.row.content" style="width:50px;height:50px"></el-image>
                                </template>
                            </el-table-column> -->
                            <el-table-column label="操作" prop="desc">
                                <template slot-scope="scope">
                                <!-- <el-tag style="margin-right:10px"  @click="onEditStudy(scope.row)">编辑</el-tag> -->
                                <el-tag type="danger" @click="onDeleteStudy(scope.row)"> 删除</el-tag>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
        <!-- <div v-if="addClass" class="showClass">
            <div class="leave1" v-for="( item , index ) in singleData" :key="index">
                <div class="days">第1天课程</div>
                <div class="title"></div>
                <div class="content"></div>
            </div>
            <span  class="study" @click="addLeave">+ 增加学习任务</span>
        </div> -->
        <el-tag type="success" class="addClass" @click="newClass">新增一节</el-tag>
        <el-dialog :visible.sync="dialogVisible" width="30%">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="情景流程" name="0"><Sceneflow :key="componentsKey" @transmitData="reception"/></el-tab-pane>
                <el-tab-pane label="打卡" name="1"><PeridosPunchCard  :key="componentsKey" @transmitData="reception" /></el-tab-pane>
                <!-- <el-tab-pane label="文字" name="2"><Character/></el-tab-pane> -->
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

import { addClassAndPunch } from '@/API/training/drill.js'
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
            dialogVisible: false,
            activeName: 0,
            res: 0,
            singleData: [],
            componentsKey: 0,
            addClass: false, // 增加课程
            classTitle: '',
            activityItemId: '',
            studyTask: {
                activityItemId: '',
                courseId: '',
                templateId: '',
                title: '',
                startTime: ''
            },
            time: null,
            FLAGDAY: ['1'],
            singleDataNum: 0
        }
    },
    methods: {
        // 日期格式转换
        onSaveTime () {
            console.log();
            this.studyTask.startTime = this.$moment(this.time).format('YYYY-MM-DD')
        },
        // 添加流程和打卡
        async confirmAdd () {
        
            this.singleData.forEach ( item =>  {
                 if ( item.contentType === 3 ) {
                     this.studyTask.courseId = item.courseId
                 } else {
                     this.studyTask.templateId = item.id
                 }
            })
            if ( !this.studyTask.courseId && !this.studyTask.templateId) {
                this.$message.error('不能添加内容为空的课程')
                return false
            }
        try {
            const  { data } = await addClassAndPunch(this.studyTask)
            console.log(data);
            this.studyTask = {}
            this.singleData = []
            this.$message({message: '添加成功', type: 'success'})
        } catch (error) {
            console.log(error);
            
        }
            
        },
        // 新增情景流程
        addLeave () {
            this.dialogVisible = true 
        },
        // 新增一节
        newClass () {
            // this.addClass = true
            this.FLAGDAY.push(this.studyTask)
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
            if (this.singleData.length >= 2) {
                return false
            }
            console.log(val);
            
            this.singleData.push(val)
            // console.log(this.singleData);
        },
        handleClick () {

        }
    },
    components: {
        // Character,
        Sceneflow,
        PeridosPunchCard
    },
    created () {
        this.studyTask.activityItemId = this.$route.query.id
    }
}
</script>
<style scoped lang="less">
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