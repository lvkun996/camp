<template>
  <div>
    <breadcrumb>
      <template slot="title">班级二维码 </template>
      <template slot="secondTitle"> 二维码列表</template>
    </breadcrumb>
    <Card>
      <template slot="content">
        <el-button type="primary" @click="handleAdd">新增二维码</el-button>
        <el-table
          :data="barCodeList"
          style="width: 100%">
          <el-table-column
            prop="barCode"
            label="二维码"
            width="180">
            <template slot-scope="scope">
              <el-image :src="scope.row.barCode"></el-image>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
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
          <el-form :model="code">
            <el-form-item label="上传二维码" :label-width="formLabelWidth">
              <el-upload
                class="avatar-uploader"
                :on-error="handleError"
                :action="uploadServe"
                :show-file-list="false"
                :on-progress="handleProcess"
                :on-success="handleSuccess"
                :before-upload="beforeUpload">
                <img v-if="barCode" :src="barCode" class="avatar">
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
import { getBarCodeList , saveBarCode, deleteCode } from '@/API/class/index';

export default {
  data() {
    return {
      uploadServe: 'http://training.test.luojigou.vip/training/file/uploadFile',
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
      barCodeList: [],
      total: 0,
      dialogVisible: false,
      formLabelWidth: '120px',
      barCode: '',
      code: {

      }
    }
  },
  components: {
    // Header
    // Table
  },
  created() {
    this.loadBarCodeList();
  },
  mounted() {

  },
  methods: {
    accept (page) {
      this.queryParams.page = page
      this.loadClassList()
    },
    async loadBarCodeList() {
      const { data } = await getBarCodeList({
        ...this.queryParams
      });
      this.barCodeList = data.data.entityList || []
      this.total = data.data.total;
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    async handleDelete(index, row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data } = await deleteCode(row.id);
        if(data.status === 200) {
          this.$message.success( {message: '删除成功'} );
          this.loadBarCodeList();
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
      
    },
    handleClassCheck(index, row) {
      this.$router.push({ path: '/class/check', query: { activityItemId: row.activityItemId, clazzId: row.id } })
    },
    handleAdd() {
      this.dialogVisible = true;
    },
    async onSave() {
      const { data } = await saveBarCode({
        barCode: this.barCode
      });
      if(data.status === 200) {
        this.$message.success( {message: '上传成功'} )
        this.dialogVisible = false;
        this.loadBarCodeList();
      } else {
        this.$message.error( {message: '上传失败'} )
      }
    },
    handleSuccess(res, file) {
      if(res.status === 200) {
        this.barCode = res.data;
      } else {
        this.$message.error(data.msg)
      }
    },
    beforeUpload() {
      
    },
    handleProcess() {

    },
    handleError(err, file, fileList) {
      console.log(err);
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
