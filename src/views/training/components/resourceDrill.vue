<template>
    <div class="resourceDirll_container">
        <breadcrumb>
              <template slot="title">训练营管理 </template>
              <template slot="secondTitle"> 训练营</template>
              <template slot="thirdlyTitle"> 训练营管理</template>
         </breadcrumb>
         <Card>
            <template slot="content">
                <div class="header">
                    <div class="drill">
                        <div class="title">
                            {{resourceData.title?resourceData.title:null}}
                        </div>
                        <div class="drillBottom">
                            <div class="drillNum" >
                                营期数：{{total}}
                            </div>
                            <div class="applyPeople">
                                报名人数：{{0}}
                            </div>
                        </div>
                    </div>
                    <div class="deleteText">
                        <el-tag type="danger">
                            删除
                        </el-tag>
                    </div>
                </div>
                <div class="nav">
                    <el-button type="primary" @click="$router.push({path:'/newPeriods',query:{id:initPeriods.id}})">新建营期</el-button>
                    <div class="search">
                        <el-input class="input" placeholder="输入营期名称"></el-input>
                        <el-button>搜索</el-button>
                    </div>
                </div>
                <div class="tabel">
                    <div class="tableText">
                        营期列表({{total}}条)
                    </div>
                        <el-table :data="resourceData"  style="width: 100%">
                            <el-table-column label="营期名称"  class="table1">
                                <template slot-scope="scope">
                                    <el-image :src="scope.row.imgUrl" alt=""  style="width:82px;height:60px" />
                                    <div class="showText" style="margin-left: 10px">
                                        <div style="margin-bottom:17px">{{ scope.row.title }}</div>
                                        <span class="price"> {{scope.row.price }} </span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="创建时间" width="180">
                                <template slot-scope="scope">
                                    {{scope.row.startTime}}
                                </template>
                            </el-table-column>
                            <el-table-column label="结束时间" width="180">
                                <template slot-scope="scope">
                                    {{scope.row.endTime}}
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-tag @click="handleEdit(scope.$index, scope.row)" style="margin-right:10px">编辑</el-tag>
                                <el-tag type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-tag>
                            </template>
                            </el-table-column>
                        </el-table>
                </div>
            </template>
         </Card>
    </div>
</template>

<script>
import { getDrillPeriods } from '@/API/training/drill.js'
export default {
  name: 'resoureDirllPage',
  data () {
    return {
        resourceData: [],
        initPeriods: {
            id: null,
            page: 1,
        },
        total: 0
    }
  },
  methods : {
    //   获取营期
    async initGetDrillPeriods () {
        console.log(this.initPeriods);
        
    const { data } = await  getDrillPeriods(this.initPeriods)
    console.log(data)
    this.resourceData = data.data.entityList
    this.total = data.data.total
    }
  },
  components: {
  },
  created () {
    console.log(this.$route);
    if (this.$route.query.id  ) {
        this.initPeriods.id = this.$route.query.id
        this.initGetDrillPeriods()
    }

  }
}
</script>
<style scoped lang="less">
.resourceDirll_container{
    .header{
        padding: 20px;
        height: 92px;
        background-color: #f5f7fa;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .drill{
            .title{
                font-weight: 600;
                margin-bottom: 8px;
            }
            .drillBottom{
                display: flex;
                font-size: 14px;
                color: #999;
                .drillNum{
                    margin-right: 20px;
                }
            }
        }
    }
    .nav{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        margin-bottom: 50px;
        .search{
            .input{
                width: 200px;
                margin-right: 20px;
            }
        }
    }
    
     .table1{
    display: flex;
  }
    /deep/ .cell {
    display: flex;
  }
  .price{
      color:red;
      font-Size:12px;
  }
}

</style>