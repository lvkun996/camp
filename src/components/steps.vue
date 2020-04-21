<template>
    <div class="steps_container">
        <el-steps :active="active" simple process-status="sucess">
            <el-step title="1 设置打卡信息" icon="el-icon-setting"></el-step>
            <el-step title="2 添加主题" icon="el-icon-circle-plus-outline"></el-step>
        </el-steps>
    </div>
</template>

<script>
export default {
  name: 'stepsPage',
  props: {
      actives: {
          type: Number,
          required: true
      }
  },
  data () {
      return {
          active: this.actives
      }
  }
}
</script>

<style lang="less" scoped>
.steps_container{
    margin-bottom: 20px;
}
</style>
