<template>
    <div class="video_container">
          <breadcrumb>
              <template slot="title">资源管理 </template>
              <template slot="secondTitle"> 视频管理</template>
          </breadcrumb>
        <Card>
            <template slot="content">
                <Header>
                     <template slot="button">新增视频</template>
                </Header>
                <el-table :data="videoData" >
                  <el-table-column label="视频名称" width-label="180px" prop="title">
                  </el-table-column>
                  <el-table-column label="视频封面" width-label="180px">
                      <template slot-scope="scope">
                        <el-image :src="scope.row.videoUrl"></el-image>
                      </template>
                  </el-table-column>
                  <el-table-column label="创建时间" width-label="180px" prop="createTime">
                  </el-table-column>
                  <el-table-column label="操作" width-label="180px">
                    <template slot-scope="scope">
                      <div class="tag">
                         <el-tag  @click="goEditVideo(scope.row)">编辑</el-tag>
                          <el-tag type="danger" @click="onDeleteVideo(scope.row)">删除</el-tag>
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
// import Table from '@/components/table'
import { getVideoList , deleteVideo } from '@/API/resource/video'
export default {
  name: 'videoPage',
  provide () {
    return {
      routerString: '/newVideo'
    }
  },
  data () {
    return {
      tableStyle: { // 动态控制table 得 leble
        label1: '视屏列表',
        label3: '创建时间',
        label4: '操作'
      },
      videoData:  [],

      pagintion: {
        isPage: 1,
        page: 1
      },
      total: 0
    }
  },
  methods: {
    accept (page) {
      this.pagintion.page = page
      this.onGetVideoList()
    },
    // 编辑视频
    goEditVideo(val) {
      this.$router.push({
        path: '/newVideo',
        query: {
          editVideoId: val.id
        }
      })
    },
    // 删除视频
    async onDeleteVideo (value) {
     try {
       await deleteVideo(value.id)
       this.$message({message:'删除成功', type: 'success'})
       this.onGetVideoList()
     } catch (error) {
       this.$message.error('删除失败')
     }
    },
    // 获取视频列表
    async onGetVideoList () {
       const { data } =  await getVideoList(this.pagintion)
       console.log(data);
       
      const res =  data.data.entityList.map( item => {
             item['videoUrl'] = item.videoUrl + '?vframe/jpg/offset/1'
             return item
       })
       this.total = data.data.total
       this.videoData = res
    }
  },
  components: {
    Header,
    // Table
  },
  created () {
    this.onGetVideoList()
  }
}
</script>

<style lang='less' scoped>
.video_container{
    .content{
        .header{

        }
    }
}
.page{
  text-align: center;
}
.el-image{
  width: 80px;
  height: 80px;
}
/deep/ .el-image__inner{
  object-fit: cover;
}
.tag{
  width: 120px;
  display: flex;
  justify-content: space-between;
}
</style>
