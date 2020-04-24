<template>
  <div>
    <breadcrumb>
      <template slot="title">班级管理 </template>
      <template slot="secondTitle"> 班级打卡 </template>
      <template slot="secondTitle"> 打卡详情 </template>
    </breadcrumb>
    <Card>
      <template slot="content">
        <div>1111</div>
      </template>  
    </Card>
  </div>
</template>

<script>
import Header from '@/components/header'
import Table from '@/components/table';
import { getClassList, getClassCheck, getCheckComment } from '@/API/class/index';

export default {
  data() {
    return {
      queryParams: {
        isPage: 1,
      },
      checkCommentList: [],
      clazzId: '',
      clockInId: ''
    }
  },
  components: {
    // Header
    // Table
  },
  created() {
    const clazzId = this.$route.query.clazzId || '';
    const clockInId = this.$route.query.clockInId || '';
    if(clazzId) {
      this.clazzId = clazzId;
      this.clockInId = clockInId;
      this.loadCheckComment()
    }
  },
  mounted() {

  },
  methods: {
    async loadCheckComment() {
      const { data } = await getCheckComment({
        ...this.queryParams,
        clazzId: this.clazzId,
        clockInId: this.clockInId
      });
      if(data.status === 200) {
        this.checkCommentList = data.data.entityList || [];
      }
    },
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
      this.$router.push({ path: '/class/check/comment/detail', query: { id: row.id } })
    },
    handleSet() {

    }
  }
}
</script>

<style lang='less' scoped>
</style>
