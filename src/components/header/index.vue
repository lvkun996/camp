<template>
    <div class="header_connainer">
        <div class="header">
                <el-button type="primary" @click="onGoRouter">
                    <slot name="button">  </slot>
                </el-button>
             <Input />
        </div>
    </div>
</template>

<script>
import Input from './components/input.vue'
export default {
  inject: ['routerString'],
  methods: {
    onGoRouter () {
      this.$router.push({
        path: this.routerString
      })
    }
  },
  components: {
    Input
  }
}
</script>

<style lang="less" scoped>
.header_connainer{
    margin-bottom: 50px;
    .header{
        display: flex;
        justify-content: space-between
    }
}
</style>
