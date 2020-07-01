<template>
  <el-dropdown
    trigger="click"
    @command="onNewEvent"
    placement="bottom-start"
  >
    <el-button
      plain
      size="medium"
    >
      <i class="el-icon-plus" />
      <i class="el-icon-arrow-down el-icon--right" />
    </el-button>
    <el-dropdown-menu
      slot="dropdown"
      style="width: 200px"
    >
      <el-dropdown-item disabled>
        This directory
      </el-dropdown-item>
      <el-dropdown-item command="0">
        New file
      </el-dropdown-item>
      <el-dropdown-item command="1">
        Upload file
      </el-dropdown-item>
      <el-dropdown-item command="2">
        New directory
      </el-dropdown-item>
      <el-dropdown-item
        divided
        disabled
      >
        This repository
      </el-dropdown-item>
      <el-dropdown-item command="3">
        New branch
      </el-dropdown-item>
      <el-dropdown-item command="4">
        New tag
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  export default {
    methods: {
      onNewEvent(cmd) {
        switch (cmd) {
          case '2': {

            break;
          }
        }
      }
    }
  };
</script>

<style scoped>

</style>