<template>
  <div style="min-width: 1300px;">
    <navbar />
    <el-container>
      <sidebar
        :menus="menus"
        v-show="menus.length"
      />
      <el-main v-loading="$store.getters.getLoading">
        <breadcrumb :menus="menus" />
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
  import adminMenus from '../menus/admin-menus';
  import profileMenus from '../menus/profile-menus';
  import BackTop from './layout/back-top';

  export default {
    components: {navbar, sidebar, breadcrumb, BackTop},
    data() {
      return {
        menus: []
      };
    },
    methods: {
      changeMenus(route) {
        if (route.meta.menuType === 'Admin' && this.$store.getters.getUser.accessLevel === 'Admin') {
          this.menus = adminMenus;
        } else if (route.meta.menuType === 'Profile') {
          this.menus = profileMenus;
        } else {
          this.menus = [];
        }
      }
    },
    mounted() {
      this.changeMenus(this.$route);
    },
    watch: {
      '$route'(newRoute) {
        this.changeMenus(newRoute);
      }
    }
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
