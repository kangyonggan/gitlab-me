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

    <!--Upload file-->
    <upload-file-modal ref="upload-file" />

    <!--New directory-->
    <new-dir-modal ref="new-dir" />

    <!--New branch-->
    <new-branch-modal ref="new-branch" />
  </div>
</template>

<script>
  import NewDirModal from './new-dir-modal';
  import UploadFileModal from './upload-file-modal';
  import NewBranchModal from './new-branch-modal';

  export default {
    components: {NewDirModal, NewBranchModal, UploadFileModal},
    props: {
      project: {
        required: true,
        type: Object
      },
      treeInfos: {
        required: true,
        type: Array
      }
    },
    methods: {
      onNewEvent(cmd) {
        if (cmd === '0') {
          this.$router.push({
            path: '/' + this.project.namespace + '/' + this.project.projectPath + '/new/'
              + (this.$route.params.pathMatch || 'master'),
            query: {
              fullPath: this.$route.query.fullPath
            }
          });
        } else if (cmd === '1') {
          this.$refs['upload-file'].show(this.project);
        } else if (cmd === '2') {
          this.$refs['new-dir'].show(this.project, this.treeInfos);
        } else if (cmd === '3') {
          this.$refs['new-branch'].show(this.project);
        }
      }
    }
  };
</script>

<style scoped>

</style>