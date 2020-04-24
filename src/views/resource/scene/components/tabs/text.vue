<template>
  <div class="tabsText_container">

    <el-table :data="tableData" >
      <el-table-column label="名称" >
        <template slot-scope="scope"><div class="content"> {{ scope.row.title }}</div></template>
      </el-table-column>
      <el-table-column label="内容" >
        <template slot-scope="scope"> <div class="content">{{ scope.row.content }}</div>  </template>
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope" >
            <el-tag type="success" @click="addContent(scope.row)">选择</el-tag>
        </template>
      </el-table-column>
    </el-table>
        <div class="page">
             <Pagination @currPage="accept" :total="total"/>
        </div>
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
      showAll: [],
      pagintion: {
        isPage: 1,
        page: 1
      },
      total: 0
    }
  },
  methods: {
    accept (page) {
      this.pagintion.page = page
      this.initContentList()
    },
    // 选择当前文字
    addContent (val) {
      console.log(val);
      this.$emit('middleData', val)
    },
    // 选择checkbox
    // handleSingle (val , row) {
    //   if (this.showSingle.id === row.id ) {
    //     this.$emit('deleteRow' , row)
    //     this.showSingle = {}
    //     return false
    //   }
    //   this.showSingle = row
    //   this.$emit('middleData', row)
    // },
    // handleAll (val) {
    //   val.forEach( item => {
    //      this.$emit('middleData', item)
       
    //   })

    // },
    async initContentList () {
      const { data } = await getContent(this.pagintion)
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
.page{
  text-align: center;
}
.content{
    display: inline-block;
    // width: 300px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
</style>