<template>
    <div class="detatilInfo_container">
        <breadcrumb>
              <template slot="title">资源管理 </template>
              <template slot="secondTitle">情景流程</template>
              <template slot="thirdlyTitle">查看课程</template>
        </breadcrumb>
        <Card>
            <template slot="content">
                <div class="header">
                    <el-button type="primary" @click="addScene">增加资源</el-button>
                    <el-button  v-if="!toggleTable" type="warning" @click="onEditAllContent">完成</el-button>
                    <el-button v-else type="primary" @click="toggleTable = false">返回对话列表</el-button>
                </div>
                <template v-if="!toggleTable">
                    <el-table >
                        <el-table-column label="老师or学生" width="200" >
                        </el-table-column>
                        <el-table-column label="标题" width="200">
                        </el-table-column>
                        <el-table-column label="类型" width="200">
                        </el-table-column>
                        <el-table-column label="内容" >
                        </el-table-column>
                        <el-table-column label="创建时间" >
                        </el-table-column>
                        <el-table-column label="操作">
                        </el-table-column>
                    </el-table>
                    <draggable v-model="receptionData" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
                    <transition-group type="transition" :name="'flip-list'">
                        <li class="list-group-item" v-for="(element,index) in receptionData" :key="index">
                            <div class="swtich">
                                <el-switch  v-model="element.status"   active-color="#13ce66" inactive-color="#ff4949"  :key="element.id">
                                </el-switch>
                            </div>
                            <div class="title">
                                <span class="content">{{element.title}}</span>
                            </div>
                            <div class="type">
                               <span v-if="element.contentType === 3"><i class="el-icon-video-camera icon"></i></span>
                               <span v-if="element.contentType === 1"> <i class="el-icon-picture-outline icon"></i> </span>
                               <span v-if="element.contentType === 0"><i class="el-icon-edit icon"></i></span>
                            </div>
                            <div class="content">
                                 <el-image v-if="element.contentType===1?true:false"  :src="element.content" ></el-image>
                                <span v-if="element.contentType===0?true:false">{{element.content}}</span>
                                <el-image v-if="element.contentType===3?true:false"  :src="element.content" ></el-image>
                            </div>
                            <div class="time">
                                <div> {{element.createTime}} </div>
                            </div>
                            <div class="deleteTag">
                                <el-tag type="danger"  class="tag" @click="deleteScene(element)">删除</el-tag>
                            </div>
                        </li>
                    </transition-group>
                    </draggable>
                </template>
                <template v-else>
                    <el-table >
                        <el-table-column label="老师学生" width="200" >
                        </el-table-column>
                        <el-table-column label="标题" >
                        </el-table-column>
                        <el-table-column label="内容" width="300">
                        </el-table-column>
                        <el-table-column label="创建时间" >
                        </el-table-column>
                        <el-table-column label="操作">
                        </el-table-column>
                    </el-table>
                    <draggable v-model="addSceneData" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
                        <transition-group type="transition" :name="'flip-list'">
                        <li class="list-group-item" v-for="(element,index) in addSceneData" :key="index">
                            <div class="swtich">
                                <el-switch  v-model="element.status"   active-color="#13ce66" inactive-color="#ff4949"  :key="element.id">
                                </el-switch>
                            </div>
                            <div class="title">
                                <span class="title">{{element.title}}</span>
                            </div>
                            <div class="content">
                                 <el-image  v-if="element.videoUrl" :src="element.videoUrl" ></el-image>
                                 <span v-if="element.content" >{{element.content}}</span>
                                <el-image v-if="element.imgUrl"  :src="element.imgUrl" ></el-image>
                            </div>
                            <div class="time">
                                <div> {{element.createTime}} </div>
                            </div>
                            <div class="deleteTag">
                                <el-tag type="danger"  class="tag" @click="deleteToBeConfirmScene(index)">删除</el-tag>
                            </div>
                        </li>
                        </transition-group>
                    </draggable>
                    <el-button type="primary" @click="onUploadScene">上传情景流程</el-button>
                </template>
                 <div class="page">
                   <!-- <Pagination @currPage="accept"  :total="total"/>  <el-input placeholder="输入每页条数" style="width:100px" v-model="pagintion.pageSize"></el-input><el-button @click="changePageSize">确定</el-button> -->
                      <el-pagination  @size-change="handleSizeChange" @current-change="handleCurrentChange"
                      :page-sizes="[5, 10, 15, 20]"
                      :page-size="pagintion.pageSize"
                      layout="sizes, prev, pager, next"
                      :total="total">
                    </el-pagination>
                </div>
            </template>
        </Card>
        <el-dialog :visible.sync="dialogVisible" width="30%">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="视频" name="0"><Video   :key="componentKey" @middleData="reception"  /></el-tab-pane>
                <el-tab-pane label="图片" name="1"><Picutrue  :key="componentKey" @middleData="reception" /></el-tab-pane>
                <el-tab-pane label="文字" name="2"><Character :key="componentKey"  @middleData="reception"/></el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { detailInfo , editAllContent , deleteCourseItem , addCourseContent} from '@/API/resource/course.js'
import Video from './tabs/video.vue'
import Picutrue from './tabs/picture.vue'
import Character from './tabs/text.vue'
import draggable from "vuedraggable"
export default {
    name: 'detatilInfoPage',
    data () {
        return {
            id: '',
            receptionData: [],
            alterNativeData: [],
            newData: [],
            isDragging:false,
            editable: true,
            dialogVisible: false,
            toggleTable: false ,// 切换table表格
            addSceneData:[],
            componentKey: 0,
            activeName: 0,
            total: 0,
            pagintion: {
              isPage: 1,
              page: 1 ,
              pageSize: 10
            },
        }
    },
    methods: {
        // 每页条数改变
        handleSizeChange (pageSize) {
            console.log(pageSize);
            this.pagintion.pageSize = pageSize
            this.initClassList()
        },
        // 改变页码
        handleCurrentChange (page) {
            console.log(page);
            this.pagintion.page = page
            this.initClassList()
        },
        // 改变每页条数
        changePageSize () {
            this.initClassList()
        },
        // 上传情景流程
        async onUploadScene () {
              const res = this.addSceneData.map( (item , index) => {
            console.log(item);
                item.sort = index
                item.status?item.type = 1 : item.type = 2
                item.contentId = item.id
                item.id = null
                item.courseId = this.$route.query.id
                if( item.hasOwnProperty('imgUrl') ) {
                    item.contentType = 1
                }
                else if ( item.hasOwnProperty('videoUrl') ) {
                    item.contentType = 3
                }
                else {
                    item.contentType = 0
                }
                return item
            })
            console.log(res);
          try {
            await addCourseContent(res)
            this.$message({message: '上传成功', type: 'success'})
            this.addSceneData = []
            this.toggleTable = false
            this.initClassList()
          } catch (error) {
              this.$message.error( '上传失败' )
          }   
        },
        // 删除待添加的情景
        deleteToBeConfirmScene (index) {
            this.addSceneData.splice(index , 1)
        },
        // 接受情景数据
          reception (value) {
            console.log(value);
             this.addSceneData.push(value)
        },
        // 打开情景流程弹窗
        addScene () {
            this.dialogVisible = true
            this.toggleTable = true
            this.componentKey ++
        },
        accept (page) {
        console.log(page);
        this.pagintion.page = page
        this.initClassList()
      },
        handleClick () {

        },
        // 删除情景流程
        async deleteScene (element) {
            console.log(element);

         try {
              await deleteCourseItem(element.id)
              this.$message.success('删除成功')
         } catch (error) {
             this.$message.error('删除失败')
         }
            this.initClassList()
        },
        async onEditAllContent () {
            console.log(this.receptionData);
            for ( var i = 0 ;  i < this.receptionData.length ; i++   ) {
                 this.alterNativeData[i].contentId = this.receptionData[i].contentId
                 this.alterNativeData[i].contentType = this.receptionData[i].contentType
                 if (this.receptionData[i].status === false  ) {
                     this.alterNativeData[i].type = 1
                 } else {
                       this.alterNativeData[i].type = 2
                 }
            }
            try {
                await editAllContent(this.alterNativeData)
                this.$message({message: '编辑成功',type: 'success'})
                this.initClassList()
            } catch (error) {
                this.$message('编辑失败')
            }
        },
        async initClassList () {
            let params = {
                id: this.id,
                page: this.pagintion.page,
                pageSize: this.pagintion.pageSize
            }
          const { data } = await detailInfo(params)
          console.log(data);
          this.total = data.data.total
          this.receptionData = data.data.entityList.map( item =>  {
              if ( item.type === 1 ) {
                this.$set( item, 'status', false )
              }
              else if (  item.type === 2) {
                this.$set( item, 'status', true )
              }
            
              return item
          })
          console.log(this.receptionData);
          this.receptionData.forEach ( item => {
              if (item.contentType === 3) {
                  this.$set(item, 'content', item.content + '?vframe/jpg/offset/1')
              }
          })
          this.alterNativeData =JSON.parse(JSON.stringify(this.receptionData))  
        },
        onMove({ relatedContext, draggedContext }) {
          const relatedElement = relatedContext.element;
          const draggedElement = draggedContext.element;
          return (
              (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
          );
        },
    },
    created () {
        this.id = this.$route.query.id
        this.initClassList()
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
        draggable,
        Video,
        Picutrue,
        Character,
    }

}
</script>
<style scoped lang="less">
.list-group-item{
    // position: relative;
    display: flex;
    // flex-wrap: wrap;
    // justify-content: space-a;
}
.tag{
    width: 45px;
    display: inline-block;
}
/deep/ .el-table__empty-block{
    display: none;
}
.content {
    display: inline-block;
    width: 300px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.el-image{
    width: 40px;
    height: 40px;
}
/deep/ .el-image__inner{
    object-fit: cover;
}
.swtich{
    width: 190px;
}
.time{
    // margin-left: 150px;
    width: 230px;
    text-align: center;
}
.deleteTag{
    width: 340px;
    text-align: center;
}   
.page{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: 20px;
}
.title{
    width: 200px;
    // padding-left: 10px;
}
.type{
    width: 200px;
}
.icon{
    color: skyblue;
}
</style>