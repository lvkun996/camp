<template>
    <div class="tabsPicture_container">
        <Ground :ground="pictureData" @transmitData="middleData">
        </Ground>
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
        middleData (value) {
            this.$emit('middleData', value)
        },
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
            const { data } = await getPictureList(params)
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