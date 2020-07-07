<template>
  <el-dropdown
    trigger="click"
    ref="clone-dropdown"
    :placement="placement"
  >
    <el-button
      type="primary"
      size="medium"
    >
      Clone
      <i class="el-icon-arrow-down el-icon--right" />
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <ul class="clone-address-list">
        <li>
          <label>Clone with {{ constants.EXTERNAL_URL.substring(0, constants.EXTERNAL_URL.indexOf(':')).toUpperCase() }}</label>
          <el-input
            :value="constants.EXTERNAL_URL + '/' + project.namespace + '/' + project.projectPath + '.git'"
            size="medium"
            readonly
          >
            <base-copy
              slot="append"
              tip="Copy URL"
              :copy="constants.EXTERNAL_URL + '/' + project.namespace + '/' + project.projectPath + '.git'"
            />
          </el-input>
        </li>
      </ul>

      <el-dropdown-item
        divided
        command="0"
        @click.native="downloadZIP"
      >
        <i class="el-icon-download" />
        Download ZIP
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  export default {
    props: {
      project: {
        required: true,
        type: Object
      },
      placement: {
        required: false,
        type: String,
        default: 'bottom-end'
      }
    },
    methods: {
      downloadZIP() {
        this.util.downloadFile('projects/' + this.project.namespace + '/' + this.project.projectPath + '/'
          + (this.$route.params.pathMatch || 'master') + '.zip');
      }
    }
  };
</script>

<style scoped lang="scss">
  .clone-address-list {
    list-style: none;
    padding: 8px 12px;

    li {
      label {
        font-weight: 600;
      }

      .el-input {
        margin-top: 8px;
      }
    }
  }
</style>