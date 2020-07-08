<template>
  <div style="min-width: 1300px;">
    <navbar />
    <el-container>
      <sidebar />
      <el-main>
        <breadcrumb />
        <router-view />
      </el-main>
    </el-container>

    <back-top />
  </div>
</template>

<script>
  import navbar from './layout/navbar';
  import sidebar from './layout/sidebar';
  import breadcrumb from './layout/breadcrumb';
  import BackTop from './layout/back-top';

  export default {
    components: {navbar, sidebar, breadcrumb, BackTop}
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
