<template>
  <el-col :span="16">
    <slot />
  </el-col>
</template>

<script>
  export default {
    props: {}
  };
</script>

<style scoped lang="scss">
  .el-col {
    padding: 0 10px;
  }
</style>