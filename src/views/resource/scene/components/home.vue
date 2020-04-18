<template>
    <div class="scene_container">
        <breadcrumb>
              <template slot="title">资源管理 </template>
              <template slot="secondTitle">情景流程</template>
        </breadcrumb>
        <Card>
            <template slot="content">
                <Header>
                     <template slot="button">新增情景</template>
                </Header>
            </template>
        </Card>
    </div>
</template>

<script>
import Header from '@/components/header'
export default {
  name: 'scenePage',
   provide () {
    return {
      routerString: '/addScene'
    }
  },
  components: {
    Header
  }
}
</script>

<style lang="less" scoped>

</style>
