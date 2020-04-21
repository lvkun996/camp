<template>
    <div class="senceFlow_container">
        
        <el-table :data="senceFlowData" style="width: 100%">
            <el-table-column label="标题" prop="title">

            </el-table-column>
            <el-table-column label="老师名称" prop="teacherName">

            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-tag type="success" @click="confirmScene(scope.row)">选择</el-tag>
                </template>
            </el-table-column>
        </el-table>
        <Pagination class="Pagination" @currPage="accept" :total="total"/>
    </div>
</template>

<script>
import { getCourseList }  from '@/API/resource/course.js'
export default {
    name: 'senceFlow',
    data () {
        return {
            senceFlowData: [],
            pagintion: {
               isPage: 1,
               page: 1
            },
            total: 0
        }
    },
    methods: {
        accept (page) {
          console.log(page);
          this.pagintion.page = page
          this.initCourseList()
        },
        // 选择课程
        confirmScene (value) {
            console.log(value);
            this.$emit('transmitData', value)
        },
        // 初始换情景列表
        async initCourseList () {
          const { data } =  await getCourseList(this.pagintion)
          console.log(data);
          
          this.senceFlowData = data.data.entityList
          this.total = data.data.total
        }
    },
    created () {
        this.initCourseList()
    }
}
</script>
<style scoped lang="less">
.Pagination{
    margin-left: 0;
    color: green;
}
/deep/ .el-pagination{
    margin-left: 150px;
    margin-top: 10px;
}
</style>
