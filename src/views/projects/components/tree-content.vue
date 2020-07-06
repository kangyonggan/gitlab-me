<template>
  <div>
    <!--tools & last commits-->
    <tools-commit
      :project="project"
      :tree-infos="treeInfos"
      :last-commit="lastCommit"
    />

    <!--tree-->
    <el-table
      :data="treeInfos"
      style="width: 100%;margin-top: 20px;border: 1px solid #e5e5e5"
    >
      <el-table-column
        prop="fullName"
        label="Name"
      >
        <template slot-scope="scope">
          <i
            v-if="scope.row.type === 'tree'"
            class="el-icon-folder"
          />
          <i
            v-else-if="scope.row.size > 0"
            class="el-icon-document"
          />
          <i
            v-else
            class="el-icon-document-remove"
          />
          <a
            @click="showFile(scope.row)"
            style="color: #2e2e2e;cursor: pointer"
          >
            {{ util.getFileSortName(scope.row.fullName) }}
          </a>
        </template>
      </el-table-column>
      <el-table-column
        prop="size"
        label="Size"
      >
        <template slot-scope="scope">
          {{ util.formatSizeOfByte(scope.row.size) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="lastCommit"
        label="Last commit"
      >
        <template slot-scope="scope">
          {{ scope.row.lastCommit.msg }}
        </template>
      </el-table-column>
      <el-table-column
        prop="lastUpdate"
        label="Last update"
        align="right"
      >
        <template slot-scope="scope">
          <base-relative-time :timestamp="scope.row.lastCommit.date" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import ToolsCommit from './tools-commit.vue';

  export default {
    components: {ToolsCommit},
    props: {
      project: {
        required: true,
        type: Object
      },
      treeInfos: {
        required: false,
        type: Array,
        default() {
        }
      },
      lastCommit: {
        required: false,
        type: Object,
        default() {
        }
      }
    },
    data() {
      return {
        currentBranch: this.$route.params.pathMatch || 'master'
      };
    },
    methods: {
      showFile(file) {
        let path = '/' + this.project.namespace + '/' + this.project.projectPath;
        if (file.type === 'tree') {
          path += '/tree/' + this.currentBranch + '?fullPath=' + file.fullName + '/';
        } else {
          path += '/blob/' + this.currentBranch + '?fullPath=' + file.fullName;
        }
        this.$router.push({
          path: path
        });
      }
    }
  };
</script>

<style scoped lang="scss">
  .tools {
    margin-top: 30px;

    /deep/ .el-input__inner {
      height: 36px;
      line-height: 36px;
    }

    /deep/ .el-input__icon {
      line-height: 36px;
    }

    .actions {
      float: right;
    }

    .path-breads {
      float: left;
      padding: 0;
      margin: 7px 20px 0 15px;
      list-style: none;

      li {
        float: left;

        a {
          color: #2e2e2e;
          margin-left: 10px;
        }

        span {
          margin-left: 5px;
        }
      }
    }
  }

  .last-commit {
    margin-top: 20px;
    background: #fafafa;
    color: #2e2e2e;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    padding: 14px;
  }

  .el-table {
    /deep/ th {
      background: #fafafa;
      color: #2e2e2e;
    }
  }
</style>