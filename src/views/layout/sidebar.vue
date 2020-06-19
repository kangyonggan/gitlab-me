<template>
  <el-collapse-transition>
    <el-menu
      :unique-opened="true"
      :collapse="isCollapse"
      :default-active="active"
      :style="{width: isCollapse ? '' : '200px'}"
      router
    >
      <template v-for="(menu, index) in menus">
        <el-menu-item
          v-if="!menu.children || !menu.children.length"
          :index="menu.url"
          :key="index"
        >
          <i
            v-if="menu.icon"
            :class="menu.icon"
          />
          <base-avatar
            :size="36"
            style="margin-right: 10px;"
            v-if="menu.avatarType"
            :avatar="menu.avatar"
            :empty-avatar="menu.emptyAvatar"
            :type="menu.avatarType"
          />

          <span
            slot="title"
            v-if="menu.avatarType"
            style="font-weight: 600;color: #2e2e2e"
          >{{ menu.name }}
          </span>
          <span
            slot="title"
            v-else
          >{{ menu.name }}
          </span>
        </el-menu-item>

        <menus
          v-else
          :key="index"
          :parent-menu="menu"
        />
      </template>

      <div
        class="collapse"
        @click="isCollapse = !isCollapse"
      >
        <el-tooltip
          class="item"
          effect="dark"
          content="Collapse sidebar"
          placement="right-end"
        >
          <i
            class="el-icon-d-arrow-left"
            v-show="!isCollapse"
          />
        </el-tooltip>

        <el-tooltip
          class="item"
          effect="dark"
          content="Toggle sidebar"
          placement="right-end"
        >
          <i
            class="el-icon-d-arrow-right"
            v-show="isCollapse"
          />
        </el-tooltip>
      </div>
    </el-menu>
  </el-collapse-transition>
</template>

<script>
  import ElCollapseTransition from 'element-ui/lib/transitions/collapse-transition';
  import Menus from './menus';

  export default {
    components: {ElCollapseTransition, Menus},
    data() {
      return {
        active: '',
        isCollapse: false
      };
    },
    computed: {
      menus() {
        return this.$store.getters.getMenus;
      }
    },
    watch: {
      '$route'(newRoute) {
        if (newRoute.meta.parentPath) {
          this.active = newRoute.meta.parentPath;
        } else {
          this.active = newRoute.path;
        }
      }
    },
    mounted() {
      if (this.$route.meta.parentPath) {
        this.active = this.$route.meta.parentPath;
      } else {
        this.active = this.$route.path;
      }
    }
  };
</script>

<style
  scoped
  lang="scss">
  .el-menu {
    min-height: calc(100vh - 40px);

    .collapse {
      cursor: pointer;
      text-align: center;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      line-height: 30px;

      i {
        color: #707070;
        font-size: 12px;
      }
    }
  }
</style>