<template>
  <div>
    <breadcrumb>
      <template slot="title">班级管理 </template>
      <template slot="secondTitle"> 班级列表</template>
    </breadcrumb>
    <Card>
      <template slot="content">
        <!-- <Header>
          <template slot="button">新增老师</template>
        </Header> -->
        <el-button type="primary" @click="handleAdd">新增老师</el-button>

        <el-table
          :data="teachList"
          style="width: 100%">
          <el-table-column
            prop="teacherName"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="teacherUrl"
            label="头像">
            <template slot-scope="scope">
              <el-image
                :src="scope.row.teacherUrl"
                fit="cover"></el-image>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <Pagination @currPage="accept" :total="total" />

        <el-dialog
          title="操作"
          :visible.sync="dialogVisible"
          width="50%"
          >
          <el-form :model="teach">
            <el-form-item label="老师名称" :label-width="formLabelWidth">
              <el-input v-model="teach.teacherName" placeholder="输入老师名称" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="老师头像" :label-width="formLabelWidth">
              <el-upload
                class="avatar-uploader"
                :action="uploadServe"
                :show-file-list="false"
                :on-progress="handleProcess"
                :on-success="handleSuccess"
                :before-upload="beforeUpload">
                <img v-if="teach.teacherUrl" :src="teach.teacherUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSave">确 定</el-button>
          </span>
        </el-dialog>
      </template>

    </Card>
  </div>
</template>

<script>
import Header from '@/components/header'
import Table from '@/components/table';
import { getTeachList, saveTeach, deleteTeach } from '@/API/class/index';

export default {
  data() {
    return {
      uploadServe: 'http://training.test.luojigou.vip/training/file/uploadFile',
      queryParams: {
        isPage: 1,
        page: 1
      },
      teach: {
        teacherUrl: '',
        name: ''
      },
      teachList: [],
      total: 0,
      dialogVisible: false,
      formLabelWidth: '120px'
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
      console.log(page);
      this.pagintion.page = page
      this.queryParams.page = page;
      this.loadClassList()
    },
    async loadClassList() {
      const { data } = await getTeachList({
        ...this.queryParams
      });
      this.teachList = data.data.entityList || [];
      this.total = data.data.total
    },
    handleEdit(index, row) {
      this.dialogVisible = false;
      console.log(index, row);
    },
    async handleDelete(index, row) {
      const { data } = await deleteTeach(row.id);
      if(data.status === 200) {
        this.$message.success( {message: '删除成功'} );
        this.loadClassList();
      }
    },
    handleAdd() {
      this.dialogVisible = true;
    },
    async onSave() {
      const { data } = await saveTeach({
        ...this.teach
      });
      if(data.status === 200) {
        this.$message.success( {message: '上传成功'} )
        this.dialogVisible = false;
        this.loadClassList();
      } else {
        this.$message.error( {message: '上传失败'} )
      }
    },
    handleSuccess(res, file) {
      this.teach.teacherUrl = res.data;
    },
    beforeUpload() {
      
    },
    handleProcess() {

    }
  }
}
</script>

<style lang='less' scoped>
/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
