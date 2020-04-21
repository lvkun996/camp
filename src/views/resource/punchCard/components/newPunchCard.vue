<template>
    <div class="newPunchCard_container">
            <breadcrumb>
              <template slot="title">资源管理 </template>
              <template slot="secondTitle">打卡管理</template>
              <template slot="thirdlyTitle" >新建打卡</template>
          </breadcrumb>
        <Card>
            <template slot="content">
                <el-form>
                    <el-form-item label="打卡名称:">
                        <el-input style="width:300px" v-model="form.content"></el-input>
                    </el-form-item>
                    <el-form-item class="button">
                        <el-button v-if="!form.id" type="primary" style="width:200px" @click="onAddPunshCardTask">新增</el-button>
                        <el-button v-else type="warning" style="width:200px" @click="onEditPunchCardTask">编辑</el-button>
                    </el-form-item>
                </el-form>
            </template>
        </Card>
    </div>
</template>
<script>
import { addPunshCardTask , detailCard, editPunchCardTask} from '@/API/resource/punchCardTask.js'
export default {
  name: 'newPunchCardPage',
  data () {
    return {
      form: {
        content: '',
        id: ''
      },
  
    }
  },
  methods: {
    // 编辑打卡任务
    async onEditPunchCardTask () {
  
      try {
        await editPunchCardTask(this.form)
        this.$message({message: '编辑成功', type: 'success'})
        this.form = {}
      }   catch (error) {
        this.$message.error('编辑失败')
      }
    },
    // 获取打卡任务详情
    async initPunshCardTask () {
    const { data } = await detailCard(this.form.id)
    console.log(data);
    
    this.form.content = data.data.content
    
    },
    // 增加打卡任务
    async onAddPunshCardTask () {
      if (this.form.content.length === 0) {
        this.$message.error('请完整填写表单')
        return false
      }
     try {
       await addPunshCardTask(this.form)
       this.$message({message: '新增成功', type: 'success'})
       this.form = {}
     } catch (error) {
      this.$message.error('新增失败')
     }
    }
  },
  created () {
    if (this.$route.query.id) {
      this.form.id = this.$route.query.id
      this.initPunshCardTask()
    }

  },
  components: {
  }

}
</script>
<style lang="less" scoped>
.button{
    margin-left: 30px;
}
</style>
