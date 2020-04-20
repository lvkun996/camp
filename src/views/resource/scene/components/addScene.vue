<template>
    <div class="addScene_container">
        <breadcrumb>
          <template slot="title">资源管理 </template>
          <template slot="secondTitle"> 情景流程</template>
          <template slot="thirdlyTitle"> 新增情景</template>
        </breadcrumb>
        <Card>
            <template slot="content">
                <el-button type="primary" @click="addResource">增加资源</el-button>
                <el-table >
                    <el-table-column label="状态" >
                    </el-table-column>
                    <el-table-column label="信息">
                    </el-table-column>
                    <el-table-column label="操作">
                    </el-table-column>  
                </el-table>
                <draggable v-model="receptionData" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
                    <transition-group type="transition" :name="'flip-list'">
                        <li class="list-group-item" v-for="(element,index) in receptionData" :key="element.id">
                            <el-switch
                                v-model="element.status"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                class="switch"
                                @change="changeSwitch(element)"
                                :key="element.id">
                            </el-switch>
                            <!-- <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i> -->
                            <el-image  :src="element.imgUrl?element.imgUrl:element.videoUrl" style="width:50px;margin-left:300px"></el-image>
                            <span style="margin-left:10px">{{element.title}}</span>
                            <el-tag type="danger"  class="tag" @click="deleteScene(index)">删除</el-tag>
                        </li>
                    </transition-group>
                </draggable>
                <el-button  v-if="receptionData.length > 0?true:false" type="primary" @click="onUploadScene" style="margin-top:50px">上传情景流程</el-button>
            </template>
        </Card>
        <el-dialog :visible.sync="dialogVisible" width="30%">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="视频" name="0"><Video  @middleData="reception"  /></el-tab-pane>
                <el-tab-pane label="图片" name="1"><Picutrue  :key="res" @middleData="reception" /></el-tab-pane>
                <el-tab-pane label="文字" name="2"><Character/></el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmDialog">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import draggable from "vuedraggable"
import Video from './tabs/video.vue'
import Picutrue from './tabs/picture.vue'
import Character from './tabs/text.vue'
import { addCourseContent } from '@/API/resource/course.js'
export default {
    name: 'addScenePage',
    data () {
        return {
            dialogVisible: false,
            activeName: '1',
            receptionData: [],
            isDragging:false,
            editable: true,
            res: 1,
            switchValue:false,
        }
    },
    methods: {
        // 删除展示
        deleteScene (index) {
            this.receptionData.splice(index , 1)
        },
        // switch 状态改变
        changeSwitch (element,e) {
            this.receptionData.forEach(item => {
                if(item.id === element.id) {
                    this.$delete(item, status)
                    this.$set(item, status , element.status)
                }
            })
        },
        // 上传情景流程
        async onUploadScene () {
        const res = this.receptionData.map( (item , index) => {
                item.sort = index
                item.status?item.type = 1 : item.type = 2
                item.content_id = item.id
                if( item.hasOwnProperty('imgUrl') ) {
                    item.content_type = 1
                }
                else if ( item.hasOwnProperty('videoUrl') ) {
                    item.content_type = 2
                }
                return item
            })
            console.log(res);
            
          try {
            await addCourseContent(res)
            this.$message({message: '上传成功', type: 'success'})
            this.receptionData = []
          } catch (error) {
              this.$message.error( '上传失败' )
          }   
        },
        // 打开弹窗
        addResource () {
            this.dialogVisible = true
            this.res++
        },
        // 确定弹窗
        confirmDialog () {
            this.dialogVisible = false
        },
        onMove({ relatedContext, draggedContext }) {
          const relatedElement = relatedContext.element;
          const draggedElement = draggedContext.element;
          return (
              (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
          );
        },
        reception (value) {
            console.log(value);
            this.receptionData.push(value)
        },
        handleClick (value) {
            // console.log(value);
        }
    },
    
    computed: {
        dragOptions() {
         return {
            animation: 0,
            group: "description",
            disabled: !this.editable,   
            ghostClass: "ghost"
        };
      },
    },
    components: {
        Video,
        Picutrue,
        Character,
        draggable
    }
}
</script>
<style scoped lang="less">
.list-group-item{
    height: 60px;
    padding: 5px;
    display: flex;
}
/deep/ .el-table__empty-block{
    display: none;
}
.li {
   position: relative;
}
.switch{
    margin-right: 50px;
    margin-top: 20px;
    margin-left: 20px;
}
.tag{
    position: absolute;
    left: 900px;
}
</style>