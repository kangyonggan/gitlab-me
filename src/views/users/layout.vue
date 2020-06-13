<template>
  <div class="layout">
    <div class="container">
      <Navbar />
      <keep-alive>
        <div class="content main">
          <router-view />
        </div>
      </keep-alive>
      <div class="empty" />
    </div>
    <Footer />
  </div>
</template>

<script>
  import Navbar from './navbar';
  import Footer from './footer';

  export default {
    components: {Navbar, Footer}
  };
</script>

<style scoped lang="scss">
  .layout {
    height: 100%;
  }

  .container {
    min-height: 100%;
    margin-bottom: -64px;
  }

  .empty {
    height: 64px;
  }

  .main {
    padding: 10px;
  }

  /deep/ .content {
    width: 960px;
    margin: 0 auto;
  }
</style>
