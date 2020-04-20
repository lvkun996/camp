<template>
    <div class="addOrEditContent_container">
        <breadcrumb>
          <template slot="title">资源管理 </template>
          <template slot="secondTitle"> 内容管理</template>
          <template slot="thirdlyTitle"> 新增内容</template>
        </breadcrumb>
        <Card>
            <template slot="content">
                <el-form :model="text" :rules="rules" ref="ruleForm">
                    <el-form-item label="名称:" prop='title'>
                        <el-input v-model="text.title"></el-input>
                    </el-form-item>
                    <el-form-item label="内容:"  prop='content'>
                        <el-input v-model="text.content" type="textarea" style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button v-if="!text.id" type="primary" @click="onAddContent">新增</el-button>
                        <el-button v-else type="warning" @click="onEditContent">编辑</el-button>
                    </el-form-item>
                </el-form>
            </template>
        </Card>
    </div>
</template>

<script>
import { addContent , editContent , getContentInfo} from '@/API/resource/content.js'
export default {
    name: 'addOrEditContentPage',
    data () {
        return {
            text: {
                title: '',
                content: '',
                id: ''
            },
            rules: {
                title: [{ required: true , message: '请输入标题' ,trigger: 'blur'}],
                content: [{ required: true ,message: '请输入内容' , trigger: 'blur'}]
            }
        }
    },
    methods: {
        async onEditContent () {
         try {
            await editContent(this.text)
            this.$message({message: '编辑成功', type: 'success'})
            this.text = {}
         } catch (error) {
              this.$message.error('编辑失败')
         }
        },
        async initContentInfo () {
         const { data } = await getContentInfo(this.text.id)
         this.text.title = data.data.title
         this.text.content = data.data.content
        },

        async onAddContent () {
        this.$refs.ruleForm.validate( async valid => {
            if (valid) {
                try {
                    await addContent(this.text)
                    this.$message({message: '新增成功', type: 'success'})
                    this.text = {}
                } catch (error) {
                    this.$message.error('新增失败')
                }
            } else {
                this.$message.error('请完整填入信息')
            }
        })
        }
    },
    created () {
        if (this.$route.query.id ) {
            this.text.id = this.$route.query.id
            this.initContentInfo()
        }

    }
}
</script>
<style scoped lang="less">
.el-input{
    width: 300px;
}
.el-button {
    width: 150px;
    margin-left: 100px;
}
</style>