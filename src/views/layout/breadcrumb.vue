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
        <base-avatar
          :size="15"
          style="float: left;margin: 9px 5px 0 0;"
          v-if="breadcrumb.avatarType"
          :avatar="breadcrumb.avatar"
          :empty-avatar="breadcrumb.emptyAvatar"
          :type="breadcrumb.avatarType"
        />
        <base-char-avatar
          style="float: left;margin: 10px 5px 0 0;"
          v-if="breadcrumb.char"
          :char="breadcrumb.char"
          :size="15"
        />
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
    computed: {
      breadcrumbs() {
        return this.$store.getters.getBreadcrumbs;
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