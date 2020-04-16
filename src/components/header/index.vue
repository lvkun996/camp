<template>
    <div class="header_connainer">
        <div class="header">
                <el-button type="primary" @click="onGoRouter">
                    <slot name="button">  </slot>
                </el-button>
             <Input />
        </div>
        <el-dialog
          title="添加期数"
          :visible.sync="dialogVisible"
          width="30%"
          >
          <el-input placeholder="请选择营期标题" v-model="trainingTltle"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSaveTraining">确 定</el-button>
          </span>
        </el-dialog>

    </div>
</template>

<script>
import Input from './components/input.vue'
export default {
  data () {
    return {
      dialogVisible: false,
      trainingTltle: null
    }
  },
  inject: ['routerString'],
  methods: {
    onGoRouter () {
      if (this.routerString === '/addDrill') {
        this.dialogVisible = true
      }
      if (!this.dialogVisible) {
        this.$router.push({
          path: this.routerString
        })
      }
    },
    onSaveTraining () {
      this.dialogVisible = false
      this.$router.push({
        path: this.routerString,
        query: {
          title: this.trainingTltle
        }
      })
    }
  },
  components: {
    Input
  }
}
</script>

<style lang="less" scoped>
.header_connainer{
    margin-bottom: 50px;
    .header{
        display: flex;
        justify-content: space-between
    }
}
</style>
