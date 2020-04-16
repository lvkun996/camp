<template>
    <div class="table_container">
        <slot name="videoNumber" class="videoNumber1"></slot>
        <div class="table">
            <el-table style="width:100%" >
                <el-table-column :label="tableStyle.label1">
                    <template >
                        <i class="el-icon-time"></i>
                        <span>这是一条测试数据</span>
                    </template>
                </el-table-column>
                <el-table-column :label="tableStyle.label2"> </el-table-column>
                <el-table-column :label="tableStyle.label3"> </el-table-column>
                <el-table-column :label="tableStyle.label4"> </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
  name: 'tablePage',
  data () {
    return {
    }
  },
  props: {
    tableStyle: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="less">
.table_container{
}
</style>
