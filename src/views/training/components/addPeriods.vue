<template>
    <div class="periods_container">
        <breadcrumb>
              <template slot="title">训练营管理 </template>
              <template slot="secondTitle"> 训练营</template>
              <template slot="thirdlyTitle">新增营期</template>
         </breadcrumb>

        <Card>
            <template slot="content">
            <Steps></Steps>
            <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="营期名称:">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="价格:">
                <el-input v-model="form.price" style="width:100px;margin-right:10px"></el-input>元
            </el-form-item>
            <el-form-item label="时间选择:">
                 <el-date-picker
                 v-model="time"
                 @change="onSaveTime"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="addBtn" @click="onAddDrillPeridos">下一步</el-button>
            </el-form-item>
        </el-form>
            </template> 
        </Card>
    </div>
</template>

<script>
import { addDrillPeriods } from '@/API/training/drill.js'
export default {
    name: 'periodsPage',
    data () {
        return {
          form: {
              title: '',
              price: '',
              startTime: '',
              endTime: '',
              activityId:'',
          },
          time: null,
        
        }
    },
    methods: {
        // 增加训练营营期
        async onAddDrillPeridos () {
           try {
                await addDrillPeriods(this.form)
                this.$message({ message: '新增成功', type: 'success'})
                this.form = {}
                this.time = null
           } catch (error) {
                this.$message.error( '新增失败' )  
           }
        },
        // 日期格式转换
        onSaveTime () {
            this.form.startTime = this.$moment(this.time[0]).format('YYYY-MM-DD HH:mm:ss')
            this.form.endTime = this.$moment(this.time[1]).format('YYYY-MM-DD HH:mm:ss')
        }
    },
    created () {
        this.form.activityId = this.$route.query.id
    }
}
</script>
<style scoped lang="less">
.el-input{
    width: 300px;
}
.addBtn{
    width: 100px;
}
</style>