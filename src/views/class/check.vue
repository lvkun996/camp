<template>
  <div>
    <breadcrumb>
      <template slot="title">班级管理 </template>
      <template slot="secondTitle"> 班级打卡</template>
    </breadcrumb>
    <Card>
      <template slot="content">
        <el-table
          :data="checkList"
          style="width: 100%">
          <el-table-column
            prop="teacherName"
            label="课后作业">
            <template slot-scope="scope">
              第{{ scope.row.sort}} 天
            </template>
          </el-table-column>
          <el-table-column
            prop="content"
            label="作业内容">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- <el-tag
                @click="handleEdit(scope.$index, scope.row)">编辑</el-tag> -->
              <el-tag
                type="danger"
                style="margin-left:10px"
                @click="handleDelete(scope.$index, scope.row)">删除</el-tag>
              <el-tag
                style="margin-left:10px"
                type="success"
                @click="handleClassCheck(scope.$index, scope.row)">课后打卡</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </Card>
  </div>
</template>

<script>
import Header from '@/components/header'
import Table from '@/components/table';
import { getClassList, getClassCheck } from '@/API/class/index';

export default {
  data() {
    return {
      queryParams: {
        isPage: 0,
      },
      checkList: [],
      activityItemId: '',
      clazzId: ''
    }
  },
  components: {
    // Header
    // Table
  },
  created() {
    const activityItemId = this.$route.query.activityItemId || '';
    const clazzId = this.$route.query.clazzId || '';

    if(activityItemId) {
      this.activityItemId = activityItemId;
      this.clazzId = clazzId;
      this.loadClassCheck();
    }
  },
  mounted() {

  },
  methods: {
    async loadClassCheck() {
      const { data } = await getClassCheck({
        ...this.queryParams,
        activityItemId: this.activityItemId
      });
      if(data.status === 200 ) {
        this.checkList = data.data || [];
      }
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleClassCheck(index, row) {
      this.$router.push({ path: '/class/check/comment', query: { clazzId: this.clazzId, clockInId: row.id } })
    }
  }
}
</script>

<style lang='less' scoped>
</style>
