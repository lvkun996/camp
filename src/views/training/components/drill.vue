<template>
    <div class="drill_container">
         <breadcrumb>
              <template slot="title">训练营管理 </template>
              <template slot="secondTitle"> 训练营</template>
         </breadcrumb>
        <Card>
            <template slot="content">
                <Header>
                     <template slot="button">新增训练营</template>
                </Header>
                <el-tag >总条数:{{total}}</el-tag>
                <el-table :data="drillData">
                  <el-table-column label="训练营名称" width-label="180px" prop="title">

                  </el-table-column>
                  <el-table-column label="训练营封面" width-label="180px" prop="title">
                    <template slot-scope="scope">
                      <el-image   :src="scope.row.imgUrl"></el-image>
                    </template>
                  </el-table-column>
                  <el-table-column label="营期数" width-label="180px" prop="days">

                  </el-table-column>
                  <el-table-column label="创建时间" width-label="180px" prop="createTime">

                  </el-table-column>
                  <el-table-column label="操作" width-label="180px" >
                    <template slot-scope="scope">
                      <div class="tag">
                        <el-tag type="info" @click="goResourceDrill(scope.row)">营期管理</el-tag>
                        <el-tag @click="goEditDrill(scope.row)">训练营管理</el-tag>
                        <el-tag type="danger" @click="onDeleteDrill(scope.row)">删除</el-tag>
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

import { getDirll , deleteDrill} from '@/API/training/drill'
export default {
  name: 'drillPage',
  provide () {
    return {
      routerString: '/addDrill'
    }
  },
  data () {
    return {
      drillData: [],
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
        this.onGetDirll()
      },
    // 去编辑训练营
    goEditDrill (value) {
      this.$router.push({
        path: '/addDrill',
        query: {
          id: value.id, 
        }
    })
    },
    // 删除训练营
    async onDeleteDrill (value) {
      try {
        await deleteDrill(value.id)
        this.$message({message: '删除成功',type: 'success'})
        this.onGetDirll()
      } catch (error) {
        this.$message.error( '删除失败' )
      }
    },
    // 去营期管理
    goResourceDrill (value) {
      this.$router.push({
        path: '/resourceDrill',
        query: {
          campId : value.id
        }
      })
    },
    // 获取训练营列表
    async onGetDirll () {
    const { data } =  await getDirll(this.pagintion.page)
    console.log(data);
    this.total = data.data.total
    this.drillData = data.data.entityList
    }
  },
  components: {
    Header
  },
  created () {

    this.onGetDirll()
  }
}
</script>
<style scoped lang="less">
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
  width: 180px;
  text-align: center;
}
</style>
