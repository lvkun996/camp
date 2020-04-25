<template>
    <div class="periods_container">
        <breadcrumb>
              <template slot="title">训练营管理 </template>
              <template slot="secondTitle"> 训练营</template>
              <template slot="thirdlyTitle">新增营期</template>
         </breadcrumb>
        <Card>
            <template slot="content">
                <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                    <el-form-item label="营期名称:" prop="title" label-width="180px">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>
                    <el-form-item label="划线价格:" prop="previousPrice" label-width="180px">
                        <el-input v-model="form.previousPrice" style="width:100px;margin-right:10px"></el-input>元
                    </el-form-item>
                    <el-form-item label="价格:" prop="price" label-width="180px">
                        <el-input v-model="form.price" style="width:100px;margin-right:10px"></el-input>元
                    </el-form-item>
                    <el-form-item label="营期图片:" prop="imgUrl" label-width="180px" >
                        <el-image style="width:146px;height:146px" v-if="form.imgUrl" :src="form.imgUrl"></el-image>
                    </el-form-item>
                    <el-form-item  label-width="180px">
                        <el-tag :type="form.imgUrl?'danger':'success'" @click="onSeleteImg"> {{form.imgUrl?'删除图片':'点击选择'}}</el-tag>
                    </el-form-item>
                    <el-form-item label="时间选择:" label-width="180px" prop="time" >
                        <el-date-picker
                        v-model="form.time"
                        @change="onSaveTime"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
            <el-button v-if="form.id" type="warning" class="addBtn"  style="margin-left:500px" @click="onEditDrillPeridos"> 完成</el-button>
            <el-button v-else type="primary" class="addBtn"  style="margin-left:500px" @click="onAddDrillPeridos">完成 </el-button>
            </template> 
        </Card>
        <el-dialog  title="提示"  :visible.sync="dialogVisible" width="30%"  >
        <Picture @middleData="reception" :key="componentKey"/>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
import { addDrillPeriods , getPeriodsInfo ,editDrillPeriods} from '@/API/training/drill.js'
// import DrillClass from './periods/drillClass'
import Picture from '@/views/resource/scene/components/tabs/picture.vue'
export default {
    name: 'periodsPage',
    data () {
        return {
          form: {
              title: '',
              previousPrice: '',
              price: '',
              imgUrl: '',
              startTime: '',
              endTime: '',
              activityId:'',
              time: []
          },
          rules: {
              title: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
              previousPrice: [{ required: true, message: '请输入划线价格', trigger: 'blur' }],
              price: [{ required: true, message: '请输入活动价格', trigger: 'blur' }],
              imgUrl: [{ required: true, message: '请输入营期图片', trigger: 'blur' }],
              time: [{ type: 'array', required: true, message: '请选择时间', trigger: 'change' }  ]
          },
          dialogVisible: false,
          componentKey: 0
        }
    },
    methods: {
        // 编辑时获取当前id详情
        async initPeriodsInfo () {
           const { data } =  await getPeriodsInfo(this.form.id)
           console.log(data);
           this.form.title =  data.data.title
           this.form.price =  data.data.price
           this.form.imgUrl =  data.data.imgUrl
           this.form.previousPrice =  data.data.previousPrice
           this.$set(this.form.time, '0' ,  data.data.startTime   )
           this.$set(this.form.time, '1' ,  data.data.endTime   )
        },
        // 选择图片
        onSeleteImg () {
            if (!this.form.imgUrl) {
                this.componentKey ++
                this.dialogVisible = true
                
            } else {
                this.form.imgUrl = ''
            }
        },
        // 接收图片
        reception (val) {
            this.form.imgUrl = val.imgUrl
        },
        // 增加训练营营期
        async onAddDrillPeridos () {
            this.$refs.form.validate( async valid => {
                if ( valid ) {
                    this.form.startTime = this.form.time[0]
                    this.form.endTime = this.form.time[1]
                    try {
                        await addDrillPeriods(this.form)
                        this.$message({ message: '新增成功', type: 'success'})
                        this.$router.go(-1)
                        this.form = {}
                        } catch (error) {
                        this.$message.error( '新增失败' )
                    }
                }
            })
        },
        // 编辑营期
        async onEditDrillPeridos () {
            this.form.startTime = this.form.time[0]
            this.form.endTime = this.form.time[1]
            console.log(this.form);
            
                 try {
                     await editDrillPeriods(this.form)  
                     this.$message({message: '编辑成功',type: 'success'})
                     this.$router.go(-1)
                 } catch (error) {
                        this.$message.error('编辑失败')
                 }

  
        },
        // 日期格式转换
        onSaveTime () {
            this.form.time[0] = this.$moment(this.form.time[0]).format('YYYY-MM-DD HH:mm:ss')
            this.form.time[1] = this.$moment(this.form.time[1]).format('YYYY-MM-DD HH:mm:ss')
        }
    },
    components: {
        Picture
    },
    created () {
        this.form.activityId = this.$route.query.campId
        this.form.id = this.$route.query.PeriodsId
        if ( this.$route.query.PeriodsId ) {
            this.initPeriodsInfo()
        }
         
     
    }
}
</script>
<style scoped lang="less">
.el-input{
    width: 300px;
}
.addBtn{
    width: 200px;
    margin-top: 50px;
}
.el-steps{
    margin-bottom: 20px;
}
/deep/ .el-image__inner{
    object-fit: cover;
}
</style>