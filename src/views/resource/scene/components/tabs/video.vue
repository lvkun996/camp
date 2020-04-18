<template>
    <div class="tabsVideo_container">
        <el-table style="width:100%" :data="videoData">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column  label="音频名称" style="width:200px">
            
                <template slot-scope="scope">
                    <el-image :src="scope.row.imgUrl?scope.row.imgUrl:scope.row.videoUrl" alt=""  style="width:82px;height:60px" />
                    <span style="margin-left: 10px">{{ scope.row.title }}</span>
                </template>
            </el-table-column>
            <el-table-column  label="状态">
                <template slot-scope="scope">
                    上架时间:{{scope.row.createTime}}
               </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { getVideoList} from '@/API/resource/video'
export default {
    name: 'tabsVideoPage',
    data () {
        return {
            videoData:[]
        }
    },
    methods: {
        // 获取视频列表
        async onGetVideoList () {
            let params = {
                isPage: 1,
                page: 1,
            }
            const { data } =  await getVideoList( params)
            const res =  data.data.entityList.map( item => {
                 item['videoUrl'] = item.videoUrl + '?vframe/jpg/offset/1'
                 return item
            })
            this.videoData = res
       }
    },
    created () {
        this.onGetVideoList()
    }
}
</script>
<style scoped lang="less">
  /deep/ .cell {
    display: flex;
  }
</style>