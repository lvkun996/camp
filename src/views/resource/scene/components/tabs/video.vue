<template>
    <div class="tabsVideo_container">

        <Ground  :ground="videoData" @transmitData="middleData"/>
    </div>
</template>

<script>
import { getVideoList} from '@/API/resource/video'
import Ground from '@/components/ground.vue'
export default {
    name: 'tabsVideoPage',
    data () {
        return {
            videoData:[]
        }
    },
    methods: {
        middleData (value) {
            this.$emit('middleData', value)
        },
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
</style>