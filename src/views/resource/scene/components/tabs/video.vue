<template>
    <div class="tabsVideo_container">

        <Ground  :ground="videoData" @transmitData="middleData"/>
        <div class="page">
             <Pagination @currPage="accept" :total="total"/>
        </div>
    </div>
</template>

<script>
import { getVideoList} from '@/API/resource/video'
import Ground from '@/components/ground.vue'
export default {
    name: 'tabsVideoPage',
    data () {
        return {
            videoData:[],
            pagintion: {
              isPage: 1,
              page: 1
            },
            total: 0
        }
    },
    methods: {
        accept (page) {
            this.pagintion.page = page
            this.initPictureList()
        },
        middleData (value) {
            this.$emit('middleData', value)
        },
        // 获取视频列表
        async onGetVideoList () {
            const { data } =  await getVideoList( this.pagintion)
            const res =  data.data.entityList.map( item => {
                 item['videoUrl'] = item.videoUrl + '?vframe/jpg/offset/1'
                 return item
            })
            this.total = data.data.total
            this.videoData = res
       }
    },
    components: {
        Ground
    },
    created () {
        console.log('video');
        
        this.onGetVideoList()
    }
}
</script>
<style scoped lang="less">
  /deep/ .cell {
    display: flex;
  }
//   /deep/ .el-pagination{
//     margin-left: 150px;
//     margin-top: 10px;
// }
.page{
    text-align: center;
}
</style>