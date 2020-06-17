<template>
  <div style="min-width: 1300px;">
    <navbar />
    <el-container>
      <sidebar
        :menus="menus"
        v-show="menus.length"
      />
      <el-main v-loading="$store.getters.getLoading">
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
  import adminMenus from '../menus/admin-menus';
  import profileMenus from '../menus/profile-menus';
  import groupsMenus from '../menus/groups-menus';
  import BackTop from './layout/back-top';
  import axios from '../libs/http';

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
        } else if (route.meta.menuType === 'Groups') {
          let code = route.params.path;
          if (!code) {
            code = route.meta.item.groupPath;
          }
          this.menus = this.getMenusWithCode(groupsMenus, code);
          axios.get('validate/getCodeType?code=' + code).then(data => {
            this.menus[0].name = data.item.groupName;
            this.menus[0].hasAvatar = true;
            this.menus[0].avatar = data.item.groupAvatar;
            this.menus[0].emptyAvatar = code;
            this.menus[0].avatarType = 'retro';
          });
        } else {
          this.menus = [];
        }
      },
      getMenusWithCode(menus, code) {
        let resultMenus = [];
        for (let i = 0; i < menus.length; i++) {
          let menu = Object.assign({}, menus[i]);
          menu.url = menu.url.replace(/\{code}/, code);
          if (menu.children && menu.children.length) {
            menu.children = this.getMenusWithCode(menu.children, code);
          }
          resultMenus[i] = menu;
        }
        return resultMenus;
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
