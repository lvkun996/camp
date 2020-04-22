<template>
    <div class="senceFlow_container">
        <el-table :data="senceFlowData" style="width: 100%">
            <el-table-column label="内容" >
                <template slot-scope="scope">
                    <el-image style="width:84px;height:84px" :src="scope.row.content"></el-image>
                </template>
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
import { detailInfo }  from '@/API/resource/course.js'
export default {
    name: 'senceFlow',
    data () {
        return {
            senceFlowData: [],
            pagintion: {
               isPage: 1,
               page: 1
            },
            id: '',
            total: 0,
            flag: false // 组织多选情景流程
        }
    },
    methods: {
        accept (page) {
          this.pagintion.page = page
          this.initCourseList()
        },
        // 选择课程
        confirmScene (value) {
            console.log(value);
            if ( !this.flag ) {  
              this.$emit('transmitData', value)
              this.flag = true
            }
        },
        // 初始换情景列表
        async initCourseList () {
            let params = {
                id: this.id,
                isPage: this.pagintion.isPage,
                page: this.pagintion.page
            }
          const { data } =  await detailInfo(params)
          console.log(data);
          this.senceFlowData = data.data.entityList.map( item =>  {
              if ( item.contentType === 3 ) {
                  item.content += '?vframe/jpg/offset/1'
              }
              return item
          })
        console.log( this.senceFlowData);
        
          this.total = data.data.total
        }
    },
    created () {
        this.id = this.$route.query.id
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
