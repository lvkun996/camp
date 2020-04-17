<template>
    <div class="editDrill_container">
      <breadcrumb>
        <template slot="title">训练营管理</template>
        <template slot="secondTitle">训练营</template>
        <template slot="thirdlyTitle">编辑训练营</template>
      </breadcrumb>
    </div>
</template>

<script>
import { getDrillInfo } from '@/API/training/drill.js'
export default {
    name: 'editDrillPage',
    data () {
        return {
            id: ''
        }
    },
    methods: {
        // 获取训练营详情
        async initDrillInfo () {
        console.log(1);
        const { data } = await  getDrillInfo(this.id)
        console.log(data);
        }

    },
    created () {
        this.id = this.$route.query.id
        this.initDrillInfo()
    }
}
</script>
<style scoped lang="less">

</style>