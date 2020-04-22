<template>
    <div class="priidosPunchCard_container">
        <el-table :data="cardData" style="width: 100%">
            <el-table-column label="内容" prop="content">

            </el-table-column>
            <el-table-column label="创建时间" prop="createTime">

            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-tag type="success" @click="confirmScene(scope.row)">选择</el-tag>
                </template>
            </el-table-column>
        </el-table>
        <Pagination class="Pagination" @currPage="accept" :total="total"/>
    </div>
    
</template>

<script>
import { punshCardTaskList } from '@/API/resource/punchCardTask.js'
export default {
    name: "priidosPunchCardPage",
    data () {
        return {
            cardData: [],
             pagintion: {
               isPage: 1,
               page: 1,
               pageSize: ''
            },
            total: 0,
            flag: false // 阻止多选打卡
        }
    },
    methods: {
         confirmScene (value) {
            console.log(value);
            
            if ( !this.flag) {
                this.$emit('transmitData', value)
                this.flag = true
            }
            
        },
        accept (page) {
          console.log(page);
          this.pagintion.page = page
          this.initPunchCard()
        },
        // 初始化打卡
        async initPunchCard () {
        const { data } = await punshCardTaskList(this.pagintion)
        console.log(data);
        this.total = data.data.total
        this.cardData = data.data.entityList
        }
    },
    created () {
        this.initPunchCard()
    }
}
</script>
<style scoped lang="less">
/deep/ .el-pagination{
    margin-left: 150px;
    margin-top: 10px;
}
</style>