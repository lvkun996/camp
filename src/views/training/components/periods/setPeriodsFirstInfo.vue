<template>
    <div class="serPeriodsFirstInfo_container">
        <el-form ref="form" :rules="rules" :model="form" label-width="80px">
            <el-form-item label="营期名称:" prop="title" label-width="180px">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="价格:" prop="price" label-width="180px">
                <el-input v-model="form.price" style="width:100px;margin-right:10px"></el-input>元
            </el-form-item>
            <el-form-item label="时间选择:" label-width="180px" prop="startTime">
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
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'serPeriodsFirstInfoPage',
    data () {
        return {
            form: {
              title: '',
              price: '',
              startTime: '',
              endTime: '',
              activityId:'',
            },
            rules: {
              title: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
              price: [{ required: true, message: '请输入活动价格', trigger: 'blur' }],
              startTime: [{ required: true, message: '请输入活动开始时间', trigger: 'blur' }]
          },
          time: null,
        }
    },
    methods: {
        // 日期格式转换
        onSaveTime () {
            this.form.startTime = this.$moment(this.time[0]).format('YYYY-MM-DD HH:mm:ss')
            this.form.endTime = this.$moment(this.time[1]).format('YYYY-MM-DD HH:mm:ss')
        }
    }
}
</script>
<style scoped lang="less">

</style>