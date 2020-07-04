<template>
  <div>
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
        <el-dropdown-item
          disabled
        >
          This repository
        </el-dropdown-item>
        <el-dropdown-item command="1">
          New branch
        </el-dropdown-item>
        <el-dropdown-item command="2">
          New tag
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <!--New branch-->
    <new-branch ref="new-branch" />
  </div>
</template>

<script>
  import NewBranch from './new-branch';

  export default {
    components: {NewBranch},
    props: {
      project: {
        required: true,
        type: Object
      }
    },
    methods: {
      onNewEvent(cmd) {
        if (cmd === '1') {
          this.$refs['new-branch'].show(this.project);
        }
      }
    }
  };
</script>

<style scoped>

</style>