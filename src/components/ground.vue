<template>
    <div class="ground_container">
        <template>
            <div class="flex">
                <div class="along"  v-for="item in ground" :key="item.id">
                      <el-image :src="item.imgUrl?item.imgUrl:item.videoUrl" style="width:100px;height:100px" class="img"   @click="onImg(item)"/>
                      <span  v-if="single"  class="icon iconfont icon-querenduigougouhao" :style="{display: id === item.id?'block':res?'none':'0'}"></span>
                      <span  v-else class="icon iconfont icon-querenduigougouhao" :style="{display:  id === item.id?'block':'none'}"></span>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'groundPage',
    data () {
        return {
            nikeShow: false,
            id: '',
            transmitData: '',
            res : true,

        }
    },
    props: {
        ground: {
            type: Array,
            requied: true
        },
        single: {
            type: Boolean,
            requied: true
        }
    },
    methods: {
        onImg (item) {
        console.log(item)

        if ( this.single ) {

        }
          item.status = true
          this.id = item.id 
          this.res = false
          this.transmitData = item
        //   const res = [... new Set(this.transmitData)]
        //     console.log(res);
          this.$emit('transmitData', this.transmitData)
        }
    },
    beforeDestroy () {
        this.res = false
    },
    created () {
    }
}
</script>
<style scoped lang="less">
.ground_container{
    .flex{
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        .along{
            position: relative;
            .img{
               width: 100px;
               height: 100px;
               border-radius: 10px;
               margin-top: 10px;
               box-sizing: border-box;

            }
            .icon-querenduigougouhao{
                display: inline-block;
                color: red;
                transform: scale(2.5);
                position: absolute;
                top: 45%;
                left: 40%;
                box-sizing: border-box;
            }
  
        }

    }
  
}
/deep/ .el-image__inner{
    object-fit: cover;
}
</style>