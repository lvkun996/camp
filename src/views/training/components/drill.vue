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
  name: 'drillPage',
  provide () {
    return {
      routerString: '/addDrill'
    }
  },
  data () {
    return {
      tableStyle: { // 动态控制table 得 leble
        label1: '训练营名称',
        label2: '营期数',
        label3: '报名人数',
        label4: '操作'
      }
    }
  },
  components: {
    Header,
    Table
  }
}
</script>
<style scoped lang="less">

</style>
