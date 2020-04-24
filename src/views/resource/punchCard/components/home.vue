<template>
    <div class="punchCard_container">
        <breadcrumb>
              <template slot="title">资源管理 </template>
              <template slot="secondTitle">打卡管理</template>
        </breadcrumb>
          <Card>
            <template slot="content">
                <Header>
                  <template  slot="button">新增打卡</template>
                  <!-- <template slot="button"><el-button @click="onGoNew" type="primary"></el-button></template> -->
                </Header>
                <el-table :data="cardData">
                  <el-table-column label="内容" width-label="180px" prop="content">

                  </el-table-column>
                  <el-table-column label="创建时间" width-label="180px" prop="createTime">

                  </el-table-column>
                  <el-table-column label="操作" width-label="180px">
                    <template slot-scope="scope">
                      <div class="tag">
                        <el-tag @click="goEditCard(scope.row)">编辑</el-tag>
                        <el-tag type="danger" @click="onDeleteCardTask(scope.row)">删除</el-tag>
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
import Table from '@/components/table'

import { punshCardTaskList , deletePunchCardTask} from '@/API/resource/punchCardTask.js'
export default {
  name: 'punchCardPage',
  data () {
    return {
      cardData: [],
      pagintion: {
        isPage: 1,
        page: 1
      },
      total: 0
    }
  },
  provide () {
    return {
      routerString: '/newPunchCard'
    }
  },
  methods: {
    accept (page) {
      this.pagintion.page = page
      this.initPunchCardList()
    },
    // 跳转到编辑页
    goEditCard (val) {
      this.$router.push( {
        path: '/newPunchCard',
        query: {
          id: val.id
        }
      })
    },
    // 删除打卡接口
    async onDeleteCardTask (val) {
      try {
        await deletePunchCardTask(val.id)
        this.$message({message:'删除成功', type: 'success'})
          this.initPunchCardList()
      } catch (error) {
        this.$message.error('删除失败')
      }
    },
    // 初始化打卡
    async initPunchCardList () {
        const { data } = await punshCardTaskList(this.pagintion)
        console.log(data);
        this.total = data.data.total
        this.cardData = data.data.entityList
    }
  },
  created () {
    this.initPunchCardList()
  },
  components: {
    Header,
  }
}
</script>

<style lang="less" scoped>
.page{
  text-align: center;
}
.tag{
  width: 120px;
  display: flex;
  justify-content: space-between;
}
</style>
