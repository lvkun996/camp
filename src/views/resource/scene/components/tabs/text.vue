<template>
  <div class="tabsText_container">
    <el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
    @select="handleSingle" @select-all="handleAll"
    >
    <el-table-column  type="selection" width="55"></el-table-column>
    <el-table-column  label="名称" width="120"> <template slot-scope="scope">{{ scope.row.title }}</template></el-table-column>
    <el-table-column  label="内容" width="120"> <template slot-scope="scope">{{ scope.row.content }}</template> </el-table-column>
    <el-table-column  label="创建时间" width="160"> <template slot-scope="scope">{{ scope.row.createTime }}</template> </el-table-column>
  </el-table>
  </div>
</template>

<script>
import { getContent } from '@/API/resource/content.js'
export default {
  name: 'tabsTextPage',
  data () {
    return {
      tableData: [],
      showSingle: {},
      showAll: []
    }
  },
  methods: {
    handleSingle (val , row) {
      if (this.showSingle.id === row.id ) {
        this.$emit('deleteRow' , row)
        this.showSingle = {}
        return false
      }
      this.showSingle = row
      this.$emit('middleData', row)
    },
    handleAll (val) {
      // let flag = false
      // if (this.showAll.length === val.length) {
      //   console.log(this.showAll.length, val.length);
        
      //     flag = true
      //     console.log(this.showAll);
          
      //     this.$emit('deleteAll', this.showAll , flag)
      //     // this.showAll = []
      //     return false
      // }
      // this.showAll = val
      // console.log(this.showAll);
      
      val.forEach( item => {
         this.$emit('middleData', item)
       
      })

    },
    // checkbox 选择出现变化
    // handleSelectionChange (val) {
    //   console.log(val);
    //   this.$emit('middleData', val[val.length-1])
    // },
    async initContentList () {
      let params = {
        isPage: 1,
        page: 1
      }
      const { data } = await getContent(params)
      console.log(data);
      this.tableData = data.data.entityList
    }
  },
  created () {
    this.initContentList()
  }
}
</script>
<style scoped lang="less">
// /deep/ .el-checkbox__original ::nth-child(1) {
//   display: none;
// }
</style>