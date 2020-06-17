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
    data() {
      return {
        breadcrumbs: []
      };
    },
    methods: {
      update(breadcrumbs, title) {
        this.util.title(title);
        this.breadcrumbs = breadcrumbs;
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