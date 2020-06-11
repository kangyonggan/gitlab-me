<template>
  <div>
    <navbar />
    <el-container>
      <sidebar />
      <el-main
        v-loading="$store.getters.getLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.5)"
      >
        <breadcrumb />
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
    import navbar from './layout/navbar';
    import sidebar from './layout/sidebar';
    import breadcrumb from './layout/breadcrumb';

    export default {
        components: {navbar, sidebar, breadcrumb}
    };
</script>

<style lang="scss">
  .el-loading-spinner .el-loading-text {
    color: #eaeaea;
  }

  .el-loading-spinner i {
    color: #eaeaea;
    font-size: 45px;
  }

  .el-main {
    padding: 5px 20px 20px 20px;
  }
</style>
