<template>
    <div class="dialogContent_container">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
           <el-tab-pane label="视频" name="first">用户管理</el-tab-pane>
           <el-tab-pane label="图片" name="second">配置管理</el-tab-pane>
           <el-tab-pane label="文字" name="third">角色管理</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    name: 'dialogContentPage',

}
</script>
<style scoped lang="less">

</style>