<template>
    <div class="page_container">
        <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            @current-change="pageChange">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: 'pagePage',
    props: {
        total: {
            type: Number,
            required: true
        }
    },
    methods: {
        pageChange (val) {
            this.$emit('currPage', val )
        }
    }
}
</script>
<style scoped lang="less">

</style>