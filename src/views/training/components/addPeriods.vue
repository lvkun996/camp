<template>
    <div class="periods_container">
        <breadcrumb>
              <template slot="title">训练营管理 </template>
              <template slot="secondTitle"> 训练营</template>
              <template slot="thirdlyTitle">新增营期</template>
         </breadcrumb>
        <Card>
            <template slot="content">
            <el-steps :active="active" simple process-status="sucess">
                <el-step title="1 设置营期" icon="el-icon-setting"></el-step>
                <el-step title="2 添加情景流程" icon="el-icon-circle-plus-outline"></el-step>
                <!-- <el-step title="3 添加助教" icon="el-icon-user"></el-step> -->
            </el-steps>
            <template v-if="active === 0? true: false">
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
                    <!--         :value="new Date('2020-04-02 00:00:00')" -->
                        <!-- -->
                  <!-- <el-form-item>
                       default-value="Thu Apr 09 2020 00:00:00 GMT+0800"
                        <el-tag style="margin-left:50px" @click="onAddDrillPeridos">确定营期</el-tag>
                    </el-form-item>   -->
                </el-form>
            </template>
            <template v-else-if="active === 1? true: false">
                <DrillClass :title="form.title"/>
            </template>
            <!-- -->
              <!-- <el-button type="primary" class="addBtn" style="margin-left:500px" @click="active --" v-if="active === 0 || 1?false: true">上一步</el-button> -->
              <template v-if="active === 1? false : true">
                    <el-button v-if="form.id" type="primary" class="addBtn"  style="margin-left:500px" @click="onEditDrillPeridos"> 编辑去往下一步</el-button>
              </template>
              <template  v-if="!form.id" > 
                     <el-button v-if="active === 1? false : true" type="primary" class="addBtn"  style="margin-left:500px" @click="onAddDrillPeridos"> 下一步 </el-button>
              </template>
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
import DrillClass from './periods/drillClass'
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
          },
          rules: {
              title: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
              previousPrice: [{ required: true, message: '请输入划线价格', trigger: 'blur' }],
              price: [{ required: true, message: '请输入活动价格', trigger: 'blur' }],
              imgUrl: [{ required: true, message: '请输入营期图片', trigger: 'blur' }],
              startTime: [{ required: true, message: '请输入活动开始时间', trigger: 'blur' }]
          },
          time: [],
          active: 0,
          dialogVisible: false,
          componentKey: 0,
          editId: ''
        }
    },
    methods: {

        // 获取当前id详情
        async initPeriodsInfo () {
           const { data } =  await getPeriodsInfo(this.form.id)

           console.log(data);
           this.form.title =  data.data.title
           this.form.startTime =  data.data.startTime
           this.form.price =  data.data.price
           this.form.imgUrl =  data.data.imgUrl
           this.form.previousPrice =  data.data.previousPrice
           this.form.endTime =  data.data.endTime

           this.time[0] = data.data.startTime
           this.time[1] = data.data.endTime
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
                        console.log(this.form)
                        try {
                            const { data } = await addDrillPeriods(this.form)
                            console.log(data);
                            this.$message({ message: '新增成功', type: 'success'})
                            this.form = {}
                            this.time = null
                            this.active ++
                            window.sessionStorage.setItem('id', data.data.id)
                            } catch (error) {
                                this.$message.error( '新增失败' )
                        }
                    //    const { data } = await editDrillPeriods(this.form)
                    //    console.log(data);
                    //    this.active ++
                    //     window.sessionStorage.setItem('id', this.form.id)
                    //    console.log(data);
                    
                }
            })
        },
        // 编辑去往下一步
        async onEditDrillPeridos () {
               
               
                 try {
                     const { data } = await editDrillPeriods(this.form)  
                     console.log(data);
                     this.$message({message: '编辑成功',type: 'success'})
                     this.active ++
                     window.sessionStorage.setItem('id', this.form.id)
                 } catch (error) {
                        this.$message.error('编辑失败')
                 }

  
        },
        // 日期格式转换
        onSaveTime () {
            this.form.startTime = this.$moment(this.time[0]).format('YYYY-MM-DD HH:mm:ss')
            this.form.endTime = this.$moment(this.time[1]).format('YYYY-MM-DD HH:mm:ss')
        }
    },
    components: {
        DrillClass,
        Picture
    },
    created () {
        console.log(this.$route.query);
        
            
        this.form.activityId = this.$route.query.tarningId
        this.form.id = this.$route.query.PeriodsId
        //  console.log(this.$route.query.editId);
        this.initPeriodsInfo()

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