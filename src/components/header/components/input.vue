<template>
    <div class="input_container">
        <el-input class="input" placeholder="请输入商品名称">
        </el-input>
        <el-button class="searchBtn">搜索</el-button>
    </div>
</template>

<script>
export default {

}
</script>
<style lang="less" scoped>
.input_container{
    display: flex;
    justify-content: space-between;
    .input{
        width: 80%;
    }
    .searchBtn{
        margin-left: 10px;
    }
}
</style>
