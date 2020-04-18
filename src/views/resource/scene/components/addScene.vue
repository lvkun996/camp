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
                    <el-table-column label="名称">
                    </el-table-column>
                    <el-table-column label="创建时间">
                    </el-table-column>
                    <el-table-column label="操作">
                    </el-table-column>
                </el-table>
                <draggable v-model="receptionData" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
                    <transition-group type="transition" :name="'flip-list'">
                        <li class="list-group-item" v-for="element in receptionData" :key="element.id">
                            <!-- <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i> -->
                            <el-image :src="element.imgUrl" style="width:50px;height:px"></el-image>
                            <span style="margin-left:10px">{{element.title}}</span> 
                        </li>
                    </transition-group>
                </draggable>
            </template>
        </Card>
        <el-dialog :visible.sync="dialogVisible" width="30%">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="视频" name="0"><Video/></el-tab-pane>
                <el-tab-pane label="图片" name="1"><Picutrue @transmitData="reception" :key="res"/></el-tab-pane>
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
export default {
    name: 'addScenePage',
    data () {
        return {
            dialogVisible: false,
            activeName: '1',
            receptionData: [],
            isDragging:false,
            editable: true,
            res: 1
        }
    },
    methods: {
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
            this.receptionData = value
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
</style>