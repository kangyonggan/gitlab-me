<template>
  <el-col :span="8">
    <h4>{{ title }}</h4>
    <slot />
  </el-col>
</template>

<script>
  export default {
    props: {
      title: {
        required: true,
        type: String
      }
    }
  };
</script>

<style scoped lang="scss">
  .el-col {
    padding: 0 10px;
  }

  h4 {
    font-weight: 600;
    line-height: 1.2;
    color: #2e2e2e;
    margin: 0 0 10px 0;
    font-size: 20px;
  }

  p {
    line-height: 1.5;
  }
</style>