<template>
    <div class="scene_container">
        <breadcrumb>
              <template slot="title">资源管理 </template>
              <template slot="secondTitle">情景流程</template>
        </breadcrumb>
        <Card>
            <template slot="content">
                <Header>
                     <template slot="button">新增课程</template>
                </Header>
                  <el-button @click="$router.push({path: '/addScene'})">click me</el-button>
                <Table :tableStyle="tableStyle" :tableData="CourseoData">
                    <template slot="videoNumber" >课程数量{{total}}条</template>
                    <template slot="header">图文详情</template>
                    <!-- <template slot="resourceBtn" scope="val" >
                        <el-tag type="success" @click="goResour ceVideo(val)">视频管理</el-tag>
                    </template> -->
                    <template slot="resourceBtn" scope="val">
                        <el-tag type="success" @click="lookClassInfo(val)">查看课程</el-tag>
                    </template>
                    <template slot="editBtn" scope="val" >
                        <el-tag @click="$router.push({path: '/addClass',query: {id: val.single.id}})">编辑</el-tag>
                    </template>
                    <template slot="deleteBtn" scope="val" >
                        <el-tag type="danger" @click="onDeleteClass(val)">删除</el-tag>
                    </template>
                </Table>
                <Pagination @currPage="accept"  :total="total"/>
            </template>
        </Card>
        <el-dialog
          title="课程详情"
          :visible.sync="dialogVisible"
          width="30%"
         >
          <el-form>
              <el-form-item label="课程名称:">
                <el-input disabled v-model="singleClassInfo.title"></el-input>
              </el-form-item>
              <el-form-item label="老师名称:">
                <el-input disabled v-model="singleClassInfo.teacherName"></el-input>
              
              </el-form-item>
              <el-form-item label="老师头像:">
                  <el-image :src="singleClassInfo.teacherUrl"></el-image>
              </el-form-item>
              <el-form-item label="视频:">
                  <video :src="singleClassInfo.videoUrl" controls style="width:250px;height:250px"></video>
              </el-form-item>
              <el-form-item label="创建时间:">
                <el-input disabled v-model="singleClassInfo.createTime"></el-input>
              </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
import Header from '@/components/header'
import Table from '@/components/table'
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
      tableStyle: { // 动态控制table 得 leble
        label1: '课时',

        label3: '创建时间',
        label4: '操作'
      },
      CourseoData: [],
       pagintion: {
       
        page: 1
      },
      total: 0,
      dialogVisible: false,
      singleClassInfo:{}
    }
  },
  methods: {

    // 查看详情
    lookClassInfo (val) {
      // this.dialogVisible = true
      // this.singleClassInfo = val.single
      this.$router.push({
        path: '/detailInfo',
        query: {
          id: val.single.id
        }
      })
    },
    // 删除课程
    async onDeleteClass (val) {
      try {
        await deleteClass(val.single.id)
        this.$message( {message: '删除成功', type: 'success'} )
        this.initCourseList()
      } catch (error) {
        this.$message.error('删除失败')
      }
      
    },
    accept (page) {
      console.log(page);
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
  },
  components: {
    Header,
    Table
  }
}
</script>

<style lang="less" scoped>
.el-input {
  width: 250px;
}
</style>
