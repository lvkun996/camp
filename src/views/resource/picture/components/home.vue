<template>
    <div class="picture_container">
       <breadcrumb>
          <template slot="title">资源管理 </template>
          <template slot="secondTitle"> 图片管理</template>
        </breadcrumb>
        <Card>
            <template slot="content">
                <Header>
                     <template slot="button">新增图片</template>
                </Header>
                <Table :tableStyle="tableStyle" :tableData="pictureData">
                    <template slot="videoNumber" >图片数量{{total}}张</template>
                    <template slot="header">图文详情</template>
                    <template slot="editBtn" scope="val" >
                        <el-tag @click="goEditPicture(val)">编辑</el-tag>
                    </template>
                    <template slot="deleteBtn" scope="val" >
                        <el-tag type="danger" @click="onDeletePicture(val)">删除</el-tag>
                    </template>
                </Table>
                <div class="page">
                   <Pagination @currPage="accept"  :total="total"/>
                </div>
            </template>
        </Card> 
    </div>
</template>

<script>
import Header from '@/components/header'
import Table from '@/components/table'
import { getPictureList , deletePicture} from '@/API/resource/picture.js'
export default {
 name: 'picturePage',
 provide () {
    return {
      routerString: '/addOrEditPic'
    }
  },
 data () {
     return {
        tableStyle: { // 动态控制table 得 leble
        label1: '图片列表',
        label3: '创建时间',
        label4: '操作'
      },
      pictureData: [],
        pagintion: {
          isPage: 1,
          page: 1
        },
        total: ''
     }
 },

 methods: {
    accept (page) {
      console.log(page);
      this.pagintion.page = page
      this.initPictureList()
    },
    //  删除图片
    async onDeletePicture (val) {
        try {
            await deletePicture(val.single.id)
            this.$message({message: '删除成功', type: 'success'})
            this.initPictureList()   
        } catch (error) {
            this.$message.error('删除失败')
        }
    },
    //  编辑图片
    goEditPicture (val) {
        this.$router.push({
            path: '/addOrEditPic',
            query: {
                id: val.single.id
            }
        })
    },
    //  获取图片列表
    async initPictureList () {
      const { data } = await getPictureList(this.pagintion)
      console.log(data);
      this.pictureData = data.data.entityList
      this.total = data.data.total
    }
 },
 components: {
     Header,
     Table
 },
 created () {
     this.initPictureList()
 }
}
</script>
<style scoped lang="less">
.page {
    text-align: center;
}
</style>