<template>
    <div class="card_container">
        <el-card class="box_card">
            <slot name="content"></slot>
        </el-card>
    </div>
</template>

<style lang="less" scoped>
.card_container{
    .box_card{
        margin-top: 30px;
    }
}

</style>
