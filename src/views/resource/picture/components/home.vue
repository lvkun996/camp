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
                <el-tag >总条数:{{total}}</el-tag>
                <el-table :data="pictureData">
                    <el-table-column label="图片名称" width-label="180px" prop="title">
                    </el-table-column>
                    <el-table-column label="图片" width-label="180px" >
                        <template slot-scope="scope">
                            <el-image  :src="scope.row.imgUrl"></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建时间" width-label="180px" prop="createTime">
                    </el-table-column>
                    <el-table-column label="操作" width-label="180px" >
                        <template  slot-scope="scope" >
                            <div class="tag">
                                <el-tag @click="goEditPicture(scope.row)">编辑</el-tag>
                                <el-tag type="danger" @click="onDeletePicture(scope.row)">删除</el-tag>
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
        total: 0
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
            await deletePicture(val.id)
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
                id: val.id
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
    //  Table
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