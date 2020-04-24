<template>
  <div>
    <breadcrumb>
      <template slot="title">班级管理 </template>
      <template slot="secondTitle"> 班级打卡</template>
    </breadcrumb>
    <Card>
      <template slot="content">
        <el-table
          :data="checkCommentList"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="图片内容：">
                  <div v-for="(item, index) in props.row.content.imgList" :key="index">
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="item.url"></el-image>
                  </div>
                </el-form-item>
                 <el-form-item label="视频内容：">
                   <div v-for="(item, index) in props.row.content.videoList" :key="index">
                    <video-child :videoUrl="item.url"></video-child>
                   </div>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            prop="teacherName"
            width="100"
            label="打卡人姓名">
            <template slot-scope="scope">
              {{ scope.row.user.nickName }}
            </template>
          </el-table-column>
          <el-table-column
            prop="content"
            label="打卡人头像">
            <template slot-scope="scope">
              <el-avatar :src="scope.row.user.avatarUrl"></el-avatar>
            </template>
          </el-table-column>
          <el-table-column
            prop="likeCount"
            label="打卡内容">
            <template slot-scope="scope">
              {{ scope.row.content.message }}
            </template>
          </el-table-column>
          <el-table-column
            prop="likeCount"
            width="100"
            label="点赞数">
          </el-table-column>
          <el-table-column
            prop="commentCount"
            width="100"
            label="评论数">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            label="打卡性质"
            width="180">
             <template slot-scope="scope">
              <el-tag type="warning" v-if="scope.row.state === 0">重难点问题</el-tag>
              <el-tag type="success" v-else-if="scope.row.state === 1">优秀作答</el-tag>
              <el-tag  v-else-if="scope.row.state === 2">普通打卡内容</el-tag>
              <el-tag v-else>内容有误</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="重难点设置">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.state === 0" effect="plain" @click="handleSetKey(scope.$index, scope.row)">取消</el-tag>
              <el-tag  v-else @click="handleSetKey(scope.$index, scope.row)">设置</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="优秀作业">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.state === 1" effect="plain" @click="handleSetGood(scope.$index, scope.row)">取消</el-tag>
              <el-tag  v-else @click="handleSetGood(scope.$index, scope.row)">设置</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            width="180"
            label="操作">
            <template slot-scope="scope">
              <!-- <el-tag
                @click="handleEdit(scope.$index, scope.row)">编辑</el-tag> -->
              <el-tag
                type="danger"
                style="margin-left:10px"
                @click="handleDelete(scope.$index, scope.row)">删除</el-tag>
              <!-- <el-tag
                style="margin-left:10px"
                type="success"
                @click="handleClassCheck(scope.$index, scope.row)">打卡详情</el-tag> -->
            </template>
          </el-table-column>
        </el-table>
      </template>
    </Card>
  </div>
</template>

<script>
import { videoPlayer } from 'vue-video-player'

import 'video.js/dist/video-js.css'

import Header from '@/components/header'
import Table from '@/components/table';
import { getClassList, getClassCheck, getCheckComment, setGoodAnswer, setKeyProblem } from '@/API/class/index';
import VideoChild from '@/components/VideoChild';

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
    VideoChild
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
    async handleSetKey(index,item) {
      const { data } = await setKeyProblem({
        commentId: item.id
      });
      if(data.status === 200) {
        this.$message.success('成功');
        this.loadCheckComment();
      } else {
        this.$message.error(data.msg);
      }
    },
    async handleSetGood(index, item) {
      const { data } = await setGoodAnswer({
        commentId: item.id
      });
      if(data.status === 200) {
        this.$message.success('成功');
        this.loadCheckComment();
      } else {
        this.$message.error(data.msg);
      }
    },
  }
}
</script>

<style lang='less' scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
</style>
