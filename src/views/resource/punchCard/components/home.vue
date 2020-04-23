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
                <Table :tableStyle="tableStyle" :tableData="cardData">
                    <template slot="videoNumber" >打卡数量{{total}}条</template>
                    <template slot="header">图文详情</template>

                    <template slot="editBtn" scope="val" >
                        <el-tag @click="goEditCard(val)">编辑</el-tag>
                    </template>
                    <template slot="deleteBtn" scope="val" >
                        <el-tag type="danger" @click="onDeleteCardTask(val)">删除</el-tag>
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

import { punshCardTaskList , deletePunchCardTask} from '@/API/resource/punchCardTask.js'
export default {
  name: 'punchCardPage',
  data () {
    return {
      tableStyle: { // 动态控制table 得 leble
        label2: '内容',
        label3: '创建时间',
        label4: '操作'
      },
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
          id: val.single.id
        }
      })
    },
    // 删除打卡接口
    async onDeleteCardTask (val) {
      try {
        await deletePunchCardTask(val.single.id)
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
    Table
  }
}
</script>

<style lang="less" scoped>
.page{
  text-align: center;
}
</style>
