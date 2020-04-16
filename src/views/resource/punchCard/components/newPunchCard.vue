<template>
    <div class="newPunchCard_container">
            <breadcrumb>
              <template slot="title">资源管理 </template>
              <template slot="secondTitle">打卡管理</template>
              <template slot="thirdlyTitle" @click="onqq">新建打卡</template>
          </breadcrumb>
        <Card>
            <template slot="content">
                <el-form>
                    <el-form-item label="打卡名称:">
                        <el-input style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item class="button">
                        <el-button type="primary" style="width:200px">新增</el-button>
                    </el-form-item>
                </el-form>
            </template>
        </Card>
    </div>
</template>
<script>

export default {
  name: 'newPunchCardPage',
  data () {
    return {

    }
  },
  methods: {
    onqq () {
    }
  },
  components: {
  }

}
</script>
<style lang="less" scoped>
.button{
    margin-left: 30px;
}
</style>
