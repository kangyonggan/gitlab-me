<template>
  <el-submenu
    :popper-append-to-body="false"
    :index="parentMenu.url"
    :code="parentMenu.code"
  >
    <template slot="title">
      <i
        v-if="parentMenu.icon"
        :class="parentMenu.icon"
      />

      <span slot="title">{{ parentMenu.name }}</span>
    </template>

    <template v-for="(menu, index) in parentMenu.children">
      <el-menu-item
        v-if="!menu.children || !menu.children.length"
        :index="menu.url"
        :key="index"
        :code="menu.code"
      >
        <i
          v-if="menu.icon"
          :class="menu.icon"
        />

        <span slot="title">{{ menu.name }}</span>
      </el-menu-item>

      <menus
        v-else
        :key="index"
        :parent-menu="menu"
      />
    </template>
  </el-submenu>
</template>

<script>
  export default {
    name: 'Menus',
    props: {
      parentMenu: {
        required: true,
        type: Object
      }
    }
  };
</script>
