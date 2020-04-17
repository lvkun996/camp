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
                <Table :tableStyle="tableStyle" :tableData="videoData">
                    <template slot="videoNumber" >视频数量161条</template>
                    <template slot="header">图文详情</template>
                    <template slot="resourceBtn" scope="val" >
                        <el-tag type="success" @click="goResourceVideo(val)">视频管理</el-tag>
                    </template>
                    <template slot="editBtn" scope="val" >
                        <el-tag @click="goEditVideo(val)">编辑</el-tag>
                    </template>
                    <template slot="deleteBtn" scope="val" >
                        <el-tag type="danger" @click="onDeleteVideo(val)">删除</el-tag>
                    </template>
                </Table>
            </template>
        </Card>
    </div>
</template>

<script>
import Header from '@/components/header'
import Table from '@/components/table'
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
        label2: '创建时间',
        label4: '操作'
      },
      videoData:  [],
    }
  },
  methods: {
    // 删除视频
    async onDeleteVideo (value) {
     

     try {
       await deleteVideo(value.single.id)
       this.$message({message:'删除成功', type: 'success'})
       this.onGetVideoList()
     } catch (error) {
       this.$message.error('删除失败')
     }
    },
    // 获取视频列表
    async onGetVideoList () {
        let params = {
            isPage: 1,
            page: 1,
        }
       const { data } =  await getVideoList( params)
      const res =  data.data.entityList.map( item => {
             item['videoUrl'] = item.videoUrl + '?vframe/jpg/offset/1'
             return item
             
       })
       this.videoData = res
    }
  },
  components: {
    Header,
    Table
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
</style>
