<template>
    <div class="drillClass_container"> 
    <el-collapse accordion>
        <el-collapse-item>
            <template slot="title">1.213<i class="el-icon-arrow-up"></i>
            <!-- el-icon-arrow-down -->
            </template>
            <div class="addStudy" @click="addStudy">+ 添加学习任务</div>
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
                        <el-form-item label="所选商品:" >
                            <!-- <span>{{ props.row.shop }}</span> -->
                            <el-image :src="props.row.videoUrl" style="width:30px;height:30px"></el-image>
                            <span  class="showInfo"   >{{ props.row.title }}</span>
                        </el-form-item>
                        </el-form>
                    </template>
                    </el-table-column>
                    <el-table-column label="任务名称" prop="title">
                    </el-table-column>
                    <el-table-column label="已选商品" prop="videoUrl">
                        <template slot-scope="scope">
                            <el-image :src="scope.row.videoUrl" style="width:50px;height:50px"></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" prop="desc">
                         <template slot-scope="scope">
                           <el-tag style="margin-right:10px"  @click="onEditStudy(scope.row)">编辑</el-tag>
                           <el-tag type="danger" @click="onDeleteStudy(scope.row)"> 删除</el-tag>
                        </template>
                    </el-table-column>
                </el-table>
                <el-form-item>
                    <el-tag type="success">重新选择</el-tag>
                </el-form-item>
            </div>
        </el-collapse-item>
    </el-collapse>
        <el-dialog :visible.sync="dialogVisible" width="30%">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="视频" name="0"><Video  @middleData="reception"  /></el-tab-pane>
                <el-tab-pane label="图片" name="1"><Picutrue  :key="res" @middleData="reception" /></el-tab-pane>
                <el-tab-pane label="文字" name="2"><Character/></el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Video from '@/views/resource/scene/components/tabs/video.vue'
import Picutrue from '@/views/resource/scene/components/tabs/picture.vue'
import Character from '@/views/resource/scene/components/tabs/text.vue'
export default {
    name: 'drillClassPage',
    data () {
        return {
            dialogVisible: false,
            activeName: 0,
            res: 0,
            singleData: []
        }
    },
    methods: {
        onDeleteStudy (val) {
            console.log(val);
            this.singleData = this.singleData.filter( item => {
                if ( item.id !== val.id ) {
                    return item
                }
            })
        },
        addStudy () {
            this.dialogVisible = true
            this.res ++
        },
        reception (val) {
            console.log(val);
            this.singleData.push(val)
        },
        handleClick () {

        }
    },
    components: {
        Video,
        Picutrue,
        Character
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
</style>