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
          <label>Clone with HTTP</label>
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
        <li style="margin-top: 20px;">
          <label style="color: #999">Clone with SSH<span style="color: red">（Do't support）</span></label>
          <el-input
            disabled
            :value="constants.EXTERNAL_URL.replace('http://', 'git@').replace('https://', 'git@') + '/' + project.namespace + '/' + project.projectPath + '.git'"
            size="medium"
            readonly
          >
            <el-button
              slot="append"
              icon="el-icon-document-copy"
              style="cursor: not-allowed"
            />
          </el-input>
        </li>
      </ul>
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