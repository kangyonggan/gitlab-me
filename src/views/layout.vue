<template>
  <div>
    <navbar />
    <el-container>
      <sidebar
        :menus="menus"
        v-show="menus.length"
      />
      <el-main
        v-loading="$store.getters.getLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.5)"
      >
        <breadcrumb :menus="menus" />
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
    import navbar from './layout/navbar';
    import sidebar from './layout/sidebar';
    import breadcrumb from './layout/breadcrumb';
    import adminMenus from './layout/admin-menus';
    import dashboardMenus from './layout/dashboard-menus';

    export default {
        components: {navbar, sidebar, breadcrumb},
        data() {
            return {
                menus: []
            };
        },
        methods: {
            changeMenus(route) {
                if (route.meta.menuType === 'Admin' && this.$store.getters.getUser.accessLevel === 'Admin') {
                    this.menus = adminMenus;
                } else if (route.meta.menuType === 'Dashboard') {
                    this.menus = dashboardMenus;
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
