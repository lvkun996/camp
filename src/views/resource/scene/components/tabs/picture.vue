<template>
    <div class="tabsPicture_container">
        <!-- <el-table style="width:100%" :data="pictureData"  ref="multipleTable"  @select="singleRow" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" >
            </el-table-column>
            <el-table-column show-overflow-tooltip label="音频名称" style="width:200px" >
                <template slot-scope="scope">
                    <el-image :src="scope.row.imgUrl?scope.row.imgUrl:scope.row.videoUrl" alt=""  style="width:82px;height:60px" />
                    <span  style="margin-left: 10px">{{ scope.row.title }}</span>
                </template>
            </el-table-column>
            <el-table-column  label="状态">
                <template slot-scope="scope">
                    上架时间:{{scope.row.createTime}}
               </template>
            </el-table-column>
        </el-table> -->
        <Ground :ground="pictureData"  />
        <div style="margin-top: 20px">
            <el-button @click="toggleSelection([pictureData[1], pictureData[2]])">切换第二、第三行的选中状态</el-button>
            <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
    </div>
</template>

<script>
import { getPictureList } from '@/API/resource/picture.js'
import Ground from '@/components/ground.vue'
export default {
    name: 'tabsPicturePage',
    data () {
        return {
            pictureData: [],
            transmitData: [],
            res:1
        }
    },
    methods: {
        handleSelectionChange (selection, row) {
            console.log(selection, row);
            this.transmitData = selection
            this.$emit('transmitData' , this.transmitData )
        },
        singleRow (selection, row) {
            console.log(selection, row);
            this.transmitData.push(row)
             this.$emit('transmitData' , this.transmitData )
        },
         toggleSelection(rows) {
             console.log(rows);
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
        async initPictureList () {
            let params = {
                isPage: 1,
                page: 1
            }
            console.log(params);
            
            const { data } = await getPictureList(params)
            console.log(data);
            this.pictureData = data.data.entityList
        }
    },
    components: {
        Ground
    },
    created () {
        this.initPictureList()
    }
}
</script>
<style scoped lang="less">

</style>