<template>
    <div class="scene_container">
        <breadcrumb>
              <template slot="title">资源管理 </template>
              <template slot="secondTitle">情景流程</template>
        </breadcrumb>
        <Card>
            <template slot="content">
                <Header>
                     <template slot="button">新增情景</template>
                </Header>
                  <el-tag >总条数:{{total}}</el-tag>
                <el-table :data="CourseoData">
                  <el-table-column label="课时名称" prop="title"></el-table-column>
                  <el-table-column label="创建时间" prop='createTime'></el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <div class="tag">
                          <el-tag type="success" @click="lookClassInfo(scope.row)">编辑对话</el-tag>
                          <el-tag @click="$router.push({path: '/addClass',query: {id: scope.row.id}})">编辑置顶视频</el-tag>
                          <el-tag type="danger" @click="onDeleteClass(scope.row)">删除</el-tag>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="page">
                   <Pagination @currPage="accept"  :total="total"/>
                </div>
            </template>
        </Card>
    </div>
</template>
<script>
import Header from '@/components/header'
import { getCourseList , deleteClass} from '@/API/resource/course.js'
export default {
  name: 'scenePage',
   provide () {
    return {
      routerString: '/addClass'
    }
  },
  data () {
    return {
      CourseoData: [],
      pagintion: {
        page: 1
      },
      total: 0
    }
  },
  methods: {
    // 查看详情
    lookClassInfo (val) {
      this.$router.push({
        path: '/detailInfo',
        query: {
          id: val.id
        }
      })
    },
    // 删除课程
    async onDeleteClass (val) {
      try {
       const { data } =  await deleteClass(val.id)
       console.log(data);
       if ( data.status === 500  ) {
         this.$message.error(`${data.msg}`)
         return false
       }
        this.$message( {message: '删除成功', type: 'success'} )
        this.initCourseList()
      } catch (error) {
        this.$message.error('删除失败')
      }
    },
    accept (page) {
      this.pagintion.page = page
      this.initCourseList()
    },
    // 初始化列表
    async initCourseList () {
      const { data } =  await getCourseList(this.pagintion)
      this.total = data.data.total
      this.CourseoData = data.data.entityList
    },
  },
  created () {
    this.initCourseList()
    console.log(this.$route);
    
  },
  components: {
    Header
  }
}
</script>

<style lang="less" scoped>
.el-input {
  width: 250px;
}
.page{
  text-align: center;
}
.tag{
  width: 240px;
  display: flex;
  justify-content: space-between
}
</style>
