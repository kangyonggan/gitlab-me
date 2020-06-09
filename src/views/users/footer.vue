<template>
  <div class="footer">
    <div class="content">
      <router-link to="/explore">Explore</router-link>
      <router-link to="/help">Help</router-link>
      <a href="https://about.github.com" target="_blank">About GitLab</a>
    </div>
  </div>
</template>

<script>
    export default {};
</script>

<style scoped lang="scss">
  .footer {
    height: 64px;
    line-height: 64px;
    background: #fff;
    border-top: 1px solid #e1e1e1;
    clear: both;

    a {
      margin-left: 18px;
    }
  }
</style>