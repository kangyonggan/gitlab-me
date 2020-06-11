<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item
      v-for="(breadcrumb, index) in breadcrumbs"
      :key="index"
    >
      <router-link
        :to="breadcrumb.url"
        v-if="index !== breadcrumbs.length - 1"
      >
        {{ breadcrumb.title ? breadcrumb.title : breadcrumb.name }}
      </router-link>
      <span v-else>
        {{ breadcrumb.name }}
      </span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
    import adminMenus from './admin-menus';

    export default {
        data() {
            return {
                breadcrumbs: [],
                menus: adminMenus
            };
        },
        methods: {
            getBreadcrumbs: function (route, menus) {
                let breadcrumbs = [];
                for (let i in menus) {
                    let menu = menus[i];
                    if (menu.url === route.path) {
                        breadcrumbs.push(menu);
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
            }
        },
        mounted() {
            this.breadcrumbs = this.getBreadcrumbs(this.$route, this.menus);
            this.util.title(this.$route.meta.title);
        },
        watch: {
            '$route'(newRoute) {
                this.breadcrumbs = this.getBreadcrumbs(newRoute, this.menus);
                this.util.title(newRoute.meta.title);
            }
        }
    };
</script>

<style scoped lang="scss">
  .el-breadcrumb {
    line-height: 35px;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
  }
</style>