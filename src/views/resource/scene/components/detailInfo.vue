<template>
    <div class="detatilInfo_container">
        <breadcrumb>
              <template slot="title">资源管理 </template>
              <template slot="secondTitle">情景流程</template>
              <template slot="thirdlyTitle">查看课程</template>
        </breadcrumb>
        <Card>
            <template slot="content">
                <el-table >
                    <el-table-column label="状态" >
                    </el-table-column>
                    <el-table-column label="内容">
                    </el-table-column>
                    <el-table-column label="操作">
                    </el-table-column>  
                </el-table>
                <draggable v-model="receptionData" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
                    <transition-group type="transition" :name="'flip-list'">
                        <li class="list-group-item" v-for="(element,index) in receptionData" :key="index">
                            <el-switch
                                v-model="element.status"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                class="switch"
                                :key="element.id">
                            </el-switch>
                            <!-- <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i> -->
                            <el-image v-if="element.contentType===1?true:false"  :src="element.content" style="width:50px;margin-left:400px"></el-image>

                            <span v-if="element.contentType===0?true:false" class="content"  style="width:50px;margin-left:400px">{{element.content}}</span>
    
                            <el-image v-if="element.contentType===3?true:false"  :src="element.content" style="width:50px;margin-left:400px"></el-image>
                            <el-tag type="danger"  class="tag" @click="deleteScene(index)">删除</el-tag>
                        </li>
                    </transition-group>
                </draggable>
                <el-button type="primary" @click="onEditAllContent">修改课程</el-button>
            </template>
        </Card>
    </div>
</template>

<script>
import { detailInfo , editAllContent} from '@/API/resource/course.js'
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
        }
    },
    methods: {
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
                id: this.id
            }
          const { data } = await detailInfo(params)
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
        draggable
    }

}
</script>
<style scoped lang="less">
.list-group-item{
    position: relative;
}
.tag{
    position: absolute;
    left: 1100px;
}
/deep/ .el-table__empty-block{
    display: none;
}
.content {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
</style>