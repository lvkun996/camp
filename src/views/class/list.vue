<template>
  <div>
    <breadcrumb>
      <template slot="title">班级管理 </template>
      <template slot="secondTitle"> 班级列表</template>
    </breadcrumb>
    <Card>
      <template slot="content">
        <el-table
          :data="classList"
          style="width: 100%">
          <el-table-column
            prop="teacherName"
            label="班级信息">
            <template slot-scope="scope">
              {{ scope.row.activityItemId }} 期 {{ scope.row.number}} 班
            </template>
          </el-table-column>
          <el-table-column
            prop="teacherName"
            label="老师姓名">
          </el-table-column>
          <el-table-column
            prop="teacherUrl"
            label="老师头像">
            <template slot-scope="scope">
              <el-avatar :src="scope.row.teacherUrl"></el-avatar>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-tag
                @click="handleEdit(scope.$index, scope.row)">编辑</el-tag>
              <el-tag
                type="danger"
                style="margin-left:10px"
                @click="handleDelete(scope.$index, scope.row)">删除</el-tag>
              <el-tag
                style="margin-left:10px"
                type="success"
                @click="handleClassCheck(scope.$index, scope.row)">班级打卡</el-tag>
            </template>
          </el-table-column>
        </el-table>
        <Pagination @currPage="accept" :total="total"/>

      </template>
    </Card>
  </div>
</template>

<script>
import Header from '@/components/header'
import Table from '@/components/table';
import { getClassList } from '@/API/class/index';

export default {
  data() {
    return {
      queryParams: {
        isPage: 1,
        page: 1,
        pageSize: 10
      },
      // pagintion: {
      //   isPage: 1,
      //   page: 1
      // },
      classList: [],
      total: 0
    }
  },
  components: {
    // Header
    // Table
  },
  created() {
    this.loadClassList();
  },
  mounted() {

  },
  methods: {
    accept (page) {
      this.queryParams.page = page
      this.loadClassList()
    },
    async loadClassList() {
      const { data } = await getClassList({
        ...this.queryParams
      });
      this.classList = data.data.entityList || []
      this.total = data.data.total;
      console.log(this.total);

      console.log(this.classList);
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleClassCheck(index, row) {
      this.$router.push({ path: '/class/check', query: { activityItemId: row.activityItemId, clazzId: row.id } })
    }
  }
}
</script>

<style lang='less' scoped>

</style>
