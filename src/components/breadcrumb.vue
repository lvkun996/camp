<template>
    <el-breadcrumb>
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item><slot name="title"></slot> </el-breadcrumb-item>
        <el-breadcrumb-item><slot name="secondTitle"></slot> </el-breadcrumb-item>
        <el-breadcrumb-item ><el-button @click="onww"><slot name="thirdlyTitle"></slot></el-button></el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
  name: 'breadcrumb',
  methods: {
    onww () {
      console.log(1)
    }
  }
}
</script>

<style>

</style>
