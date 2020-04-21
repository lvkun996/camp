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
                <Table :tableStyle="tableStyle" :tableData="drillData">
                    <template slot="videoNumber" >训练营数量{{total}}</template>
                    <template slot="header">图文详情</template>
                    <el-button slot="editBtn">增加</el-button>
                    <template slot="resourceBtn" scope="val" >
                        <el-tag type="success" @click="goResourceDrill(val)">营期管理</el-tag>
                    </template>
                    <template slot="editBtn" scope="val" >
                        <el-tag @click="goEditDrill(val)">编辑</el-tag>
                    </template>
                    <template slot="deleteBtn" scope="val" >
                        <el-tag type="danger" @click="onDeleteDrill(val)">删除</el-tag>
                    </template>
                </Table>
                 <Pagination @currPage="accept" :total="total"/>
            </template>
        </Card>
    </div>
</template>
<script>
import Header from '@/components/header'
import Table from '@/components/table'

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
      tableStyle: { // 动态控制table 的 leble
        label1: '训练营名称',
        label2: '营期数',
        label3: '报名人数',
        label4: '操作'
      },
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
          id: value.single.id
        }
    })
    },
    // 删除训练营
    async onDeleteDrill (value) {
      try {
        await deleteDrill(value.single.id)
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
          id : value.single.id
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
    Header,
    Table
  },
  created () {
    this.onGetDirll()
  }
}
</script>
<style scoped lang="less">

</style>
