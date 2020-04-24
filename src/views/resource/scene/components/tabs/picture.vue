<template>
    <div class="tabsPicture_container">
        <Ground :ground="pictureData" @transmitData="middleData" />
         <div class="page">
             <Pagination @currPage="accept" :total="total"/>
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
            res:1,
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
        // 暂存数据
        middleData (value) {
            this.$emit('middleData', value)
        },
        handleSelectionChange (selection, row) {
            this.transmitData = selection
            this.$emit('transmitData' , this.transmitData )
        },
        singleRow (selection, row) {
            this.transmitData.push(row)
             this.$emit('transmitData' , this.transmitData )
        },
        toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
            this.$refs.multipleTable.clearSelection();
        }
      },
        async initPictureList () {
            const { data } = await getPictureList(this.pagintion)
            console.log(data);
            this.total = data.data.total
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
.page{
    text-align: center;
}
</style>