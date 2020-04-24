<template>
    <div class="text_container">
        <breadcrumb>
          <template slot="title">资源管理 </template>
          <template slot="secondTitle"> 文字管理</template>
        </breadcrumb>
        <Card>
            <template slot="content">
                <Header>
                     <template slot="button">新增内容</template>
                </Header>
                <el-table :data="contentList">
                    <el-table-column label="名称" width_label="180px" prop="title">

                    </el-table-column>
                    <el-table-column label="内容" width_label="180px" >
                        <template slot-scope="scope">
                            <span class="content">{{scope.row.content}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建时间" width_label="180px" prop="createTime">

                    </el-table-column>
                    <el-table-column label="操作" width_label="180px">
                         <template slot-scope="scope" >
                             <div class="tag">
                                <el-tag @click="goEditContent(scope.row)">编辑</el-tag>
                                <el-tag type="danger" @click="onDeleteContent(scope.row)">删除</el-tag>
                             </div>
                        </template>
                    </el-table-column>
                </el-table>

                <div class="page">
                    <Pagination @currPage="accept" :total="total"/>
                </div>
                 
            </template>
        </Card>
    </div>
</template>

<script>
import Header from '@/components/header'
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
            contentList:[],
            pagintion: {
              isPage: 1,
              page: 1
              },
            total: 0
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
        Header
    },
    created () {
        this.initContentList()
    }
}
</script>
<style scoped lang="less">
.page{
    text-align: center;
}
.content{
    overflow:hidden;
	text-overflow:ellipsis;
	white-space:nowrap
}
.tag{
    width: 120px;
    display: flex;
    justify-content: space-between;
}
</style>