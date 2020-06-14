<template>
  <el-breadcrumb
    separator-class="el-icon-arrow-right"
    v-show="breadcrumbs.length"
  >
    <el-breadcrumb-item
      v-for="(breadcrumb, index) in breadcrumbs"
      :key="index"
    >
      <router-link
        :to="breadcrumb.url"
        v-if="index !== breadcrumbs.length - 1"
      >
        {{ breadcrumb.name }}
      </router-link>

      <span v-else>
        {{ breadcrumb.name }}
      </span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  export default {
    props: {
      menus: {
        required: true,
        type: Array
      }
    },
    data() {
      return {
        breadcrumbs: []
      };
    },
    methods: {
      getPrefix(route) {
        if (route.meta.menuType === 'Admin') {
          this.breadcrumbs.push({
            name: 'Admin area',
            url: '/admin'
          });
        } else if (route.meta.menuType === 'Profile') {
          this.breadcrumbs.push({
            name: 'User Settings',
            url: '/profile'
          });
        }
      },
      getBreadcrumbs: function (route, menus) {
        let breadcrumbs = [];
        for (let i in menus) {
          let menu = menus[i];
          if (menu.url === route.path) {
            breadcrumbs.push(menu);
            return breadcrumbs;
          } else if (menu.url === route.meta.parentPath) {
            breadcrumbs.push(menu);
            breadcrumbs.push({name: route.meta.title});
            return breadcrumbs;
          }
          if (menu.children) {
            const subBreadcrumbs = this.getBreadcrumbs(route, menu.children);
            if (subBreadcrumbs.length) {
              breadcrumbs.push(menu);
              breadcrumbs = breadcrumbs.concat(subBreadcrumbs);
              return breadcrumbs;
            }
          }
        }

        return breadcrumbs;
      },
      setTitle(route) {
        if (route.meta.title) {
          this.util.title(route.meta.title);
        } else if (this.breadcrumbs.length) {
          this.util.title(this.breadcrumbs[this.breadcrumbs.length - 1].name);
        } else {
          this.util.title();
        }
      }
    },
    mounted() {
      this.breadcrumbs = [];
      this.getPrefix(this.$route);
      this.$nextTick(function () {
        this.breadcrumbs = this.breadcrumbs.concat(this.getBreadcrumbs(this.$route, this.menus));
        this.setTitle(this.$route);
      });
    },
    watch: {
      '$route'(newRoute) {
        this.breadcrumbs = [];
        this.getPrefix(newRoute);
        this.$nextTick(function () {
          this.breadcrumbs = this.breadcrumbs.concat(this.getBreadcrumbs(newRoute, this.menus));
          this.setTitle(newRoute);
        });
      }
    }
  };
</script>

<style
  scoped
  lang="scss">
  .el-breadcrumb {
    line-height: 35px;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
  }
</style>