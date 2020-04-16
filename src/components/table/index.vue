<template>
    <div class="table_container">
        <slot name="videoNumber" class="videoNumber1"></slot>
        <div class="table">
            <el-table style="width:100%" :data="tableData" >
                <el-table-column :label="tableStyle.label1" >
                       <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                        <el-image :src="tableData[0].img" alt="" />
                      </template>
                </el-table-column>
                <el-table-column :label="tableStyle.label2"></el-table-column>
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
      // tableData: [
      //   {
      //     img: 'https://www.baidu.com/link?url=cmHY9wB_6dN543dXs2ofYVs_APyWg7A_XvMQXpvIitHGpVN4rVqRg24tBMNpQlVk3k2nm67lA-b4b3Yz42PHbCgxbeXew3xHdl3AKG2puqphak8g21KG1gu8henlQSbqM0TKfNWk9VcA7zZVnL94962rn9jbOqAFj_zvaQyameC9ZOuA3dVmXroyQ4mfef1t_ss37pYSMF9_LGFcwxNxzfMNb8hC3hYWjRDgb5LAOu_JjTw-6glle1jcjY7UnyZ-O-Rm8Ys44m-9rOfB0VhrjA6gDmG00wkpNXWslM2NyA6NIDLe9ySh3gih2Wqpd5qYC55kCaXaPD9vkJi7tmcfEviln5Ol6QGLVLfFdH1G5LbS5zQEOQHv2Y5kIrPkN6lVoSVCSJm0ElSQGOEzQOdzVrMZj4yzrB9YKdD3bqbuF1Y3LitIZweEEFGsdn8zANiwZsyyXQaPJwzT8Nwq2SBE_qivgUUyaFlLimT_eRIM6JdYcbctwgB61hfjs9ahnEj7hdnVn44W2B6HSzjPaoRa7UcuIINL6pdeAC3NoWI6xq1DX7a1uvIvy1Qqt34FIqkzn7MOnzugmeBOH1KN3WxYEqtwc_2H_Yfsluk7YwydoFm&timg=https%3A%2F%2Fss0.bdstatic.com%2F94oJfD_bAAcT8t7mm9GUKT-xh_%2Ftimg%3Fimage%26quality%3D100%26size%3Db4000_4000%26sec%3D1587023613%26di%3D429758723a1bd3fb625a1addef6b0188%26src%3Dhttp%3A%2F%2Fbbs.jooyoo.net%2Fattachment%2FMon_0905%2F24_65548_2835f8eaa933ff6.jpg&click_t=1587023624023&s_info=1903_937&wd=&eqid=929e53410001156b000000025e980efd',
      //     title: '开学季如何做好孩子的心理准备',
      //     price: '免费'
      //   }
      // ]
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        img: 'https://www.baidu.com/link?url=cmHY9wB_6dN543dXs2ofYVs_APyWg7A_XvMQXpvIitHGpVN4rVqRg24tBMNpQlVk3k2nm67lA-b4b3Yz42PHbCgxbeXew3xHdl3AKG2puqphak8g21KG1gu8henlQSbqM0TKfNWk9VcA7zZVnL94962rn9jbOqAFj_zvaQyameC9ZOuA3dVmXroyQ4mfef1t_ss37pYSMF9_LGFcwxNxzfMNb8hC3hYWjRDgb5LAOu_JjTw-6glle1jcjY7UnyZ-O-Rm8Ys44m-9rOfB0VhrjA6gDmG00wkpNXWslM2NyA6NIDLe9ySh3gih2Wqpd5qYC55kCaXaPD9vkJi7tmcfEviln5Ol6QGLVLfFdH1G5LbS5zQEOQHv2Y5kIrPkN6lVoSVCSJm0ElSQGOEzQOdzVrMZj4yzrB9YKdD3bqbuF1Y3LitIZweEEFGsdn8zANiwZsyyXQaPJwzT8Nwq2SBE_qivgUUyaFlLimT_eRIM6JdYcbctwgB61hfjs9ahnEj7hdnVn44W2B6HSzjPaoRa7UcuIINL6pdeAC3NoWI6xq1DX7a1uvIvy1Qqt34FIqkzn7MOnzugmeBOH1KN3WxYEqtwc_2H_Yfsluk7YwydoFm&timg=https%3A%2F%2Fss0.bdstatic.com%2F94oJfD_bAAcT8t7mm9GUKT-xh_%2Ftimg%3Fimage%26quality%3D100%26size%3Db4000_4000%26sec%3D1587023613%26di%3D429758723a1bd3fb625a1addef6b0188%26src%3Dhttp%3A%2F%2Fbbs.jooyoo.net%2Fattachment%2FMon_0905%2F24_65548_2835f8eaa933ff6.jpg&click_t=1587023624023&s_info=1903_937&wd=&eqid=929e53410001156b000000025e980efd'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
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
