<template>
    <div class="text_container">
        <breadcrumb>
          <template slot="title">资源管理 </template>
          <template slot="secondTitle"> 内容管理</template>
          <!-- <template slot="thirdlyTitle"> 新增情景</template> -->
        </breadcrumb>
        <Card>
            <template slot="content">
                <Header>
                     <template slot="button">新增内容</template>
                </Header>
                <Table :tableStyle="tableStyle" :tableData="contentList">
                    <template slot="videoNumber" >视频数量161条</template>
                    <template slot="header">图文详情</template>
                    <!-- <template slot="resourceBtn" scope="val" >
                        <el-tag type="success" @click="goResourceVideo(val)">视频管理</el-tag>
                    </template> -->
                    <template slot="editBtn" scope="val" >
                        <el-tag @click="goEditContent(val)">编辑</el-tag>
                    </template>
                    <template slot="deleteBtn" scope="val" >
                        <el-tag type="danger" @click="onDeleteContent(val)">删除</el-tag>
                    </template>
                </Table>
                 <Pagination @currPage="accept" :total="total"/>
            </template>
        </Card>
    </div>
</template>

<script>
import Header from '@/components/header'
import Table from '@/components/table'
import { getContent ,deleteContent } from '@/API/resource/content.js'

export default {
    name: 'textPage',
    provide () {
      return {
        routerString: '/addOrEditContent'
      }
    },
    data () {
        return {
            tableStyle: { // 动态控制table 得 leble
                label1: '名称',
                label2: '内容',
                label3: '创建时间',
                label4: '操作'
            },
            contentList:[],
            pagintion: {
              isPage: 1,
              page: 1
              },
            total: ''
        }
    },
    methods: {
        accept (page) {
          console.log(page);
          this.pagintion.page = page
          this.initContentList()
        },
        // 删除单条内容
        async onDeleteContent (val) {
            try {
                await deleteContent(val.single.id)
                this.$message({message: '删除成功', type: 'success'})
                this.initContentList()
            } catch (error) {
                this.$message.error( '删除失败' )
            }
        },
        // 去编辑页
        goEditContent (val) {
            this.$router.push({
                path: '/addOrEditContent',
                query: {
                    id: val.single.id
                }
            })
        },
        async initContentList () {
        const { data }  = await getContent(this.pagintion)
        this.total = data.data.total
        this.contentList = data.data.entityList
        }
    },
    components: {
        Header,
        Table
    },
    created () {
        this.initContentList()
    }
}
</script>
<style scoped lang="less">

</style>