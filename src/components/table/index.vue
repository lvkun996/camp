<template>
    <div class="table_container">
        <slot name="videoNumber" class="videoNumber1"></slot>
        <div class="table">
            <el-table style="width:100%" :data="tableData" >
                <el-table-column :label="tableStyle.label1" class="table1">
                      <template slot-scope="scope">
                        <el-image v-if="!scope.row.content" :src="scope.row.imgUrl?scope.row.imgUrl:scope.row.videoUrl" alt=""  style="width:82px;height:60px" />
                        <span style="margin-left: 10px">{{ scope.row.title}}</span>
                      </template>
                      <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.title }}</span>
                      </template>
                      <!-- <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.content }}</span>
                      </template> -->
                </el-table-column>
                <el-table-column :label="tableStyle.label2">
                      <template slot-scope="scope">
                        {{scope.row.days?scope.row.days:scope.row.content}}
                      </template>
                      <!-- <template  slot-scope="scope">
                        {{scope.row.teacherName}}
                      </template> -->
                </el-table-column>
                <el-table-column :label="tableStyle.label3">
                      <template slot-scope="scope">
                        {{scope.row.createTime}}
                      </template>
                </el-table-column>
                <el-table-column :label="tableStyle.label4"> 
                  <template slot-scope="scope">
                      <div style="margin-right:10px"><slot name="resourceBtn" :single="scope.row"></slot></div>
                      <div style="margin-right:10px"><slot name="editBtn" :single="scope.row"></slot></div>
                      <slot name="deleteBtn" :single="scope.row"></slot>
                  </template>
                </el-table-column>
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
  methods: {
    onon (value) {
      console.log(value); 
    }
  },
  props: {
    tableStyle: {
      type: Object,
      required: true
    },
    tableData: {
      type: Array,
      required: true
    }
  }
}
</script>
<style lang="less">
.table_container{
  .table1{
    display: flex;
  }
  /deep/ .cell {
    display: flex;
  }
}
</style>
