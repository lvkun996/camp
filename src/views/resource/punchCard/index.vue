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
                <Table :tableStyle="tableStyle">
                    <template slot="videoNumber" >视频数量161条</template>
                    <template slot="header">图文详情</template>
                </Table>
            </template>
        </Card>
    </div>
</template>

<script>
import Header from '@/components/header'
import Table from '@/components/table'
export default {
  name: 'punchCardPage',
  data () {
    return {
      tableStyle: { // 动态控制table 得 leble
        label1: '视屏列表',
        label2: '订阅量',
        label3: '内容',
        label4: '操作'
      }

    }
  },
  provide () {
    return {
      routerString: '/newPunchCard'
    }
  },
  methods: {
  },
  created () {

  },
  components: {
    Header,
    Table
  }
}
</script>

<style lang="less" scoped>

</style>
