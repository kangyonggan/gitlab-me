<template>
  <div>
    <div class="tools">
      <el-select
        v-model="currentBranch"
        filterable
        default-first-option
        @change="onBranchSelected"
      >
        <el-option-group label="Branches">
          <el-option
            v-for="branch in project.branches"
            :key="branch"
            :label="branch"
            :value="branch"
          />
        </el-option-group>
      </el-select>
      <router-link
        :to="'/' + project.namespace + '/' + project.projectPath + '/tree/master'"
        style="margin-left: 15px;color: #2e2e2e;font-size: 16px;"
      >
        {{ project.projectPath }}
      </router-link>
      <span>
        /
      </span>
      <el-dropdown
        style="margin-left: 10px;"
        trigger="click"
        @command="onNewEvent"
        placement="bottom-start"
        ref="new-dropdown"
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

      <div class="actions">
        <el-button
          plain
          size="medium"
        >
          History
        </el-button>
        <el-button
          plain
          size="medium"
          style="margin-right: 10px;"
        >
          <i class="el-icon-search" />
          Find file
        </el-button>
        <el-dropdown
          style="margin-right: 10px;"
          trigger="click"
          ref="download-dropdown"
        >
          <el-tooltip
            effect="dark"
            content="Download"
            placement="top"
          >
            <el-button
              plain
              size="medium"
            >
              <i class="el-icon-download" />
              <i class="el-icon-arrow-down el-icon--right" />
            </el-button>
          </el-tooltip>
          <el-dropdown-menu
            slot="dropdown"
            style="width: 240px"
          >
            <div style="padding: 8px 12px;">
              <div style="font-weight: 600;line-height: 16px;">
                Download source code
              </div>
              <ul class="download-list">
                <li>
                  <a
                    style="background: #1f78d1;color: #fff;border-top-left-radius: 6px;border-bottom-left-radius: 6px;"
                    @click="download('zip')"
                  >
                    zip
                  </a>
                </li>
                <li>
                  <a @click="download('tar.gz')">
                    tar.gz
                  </a>
                </li>
                <li>
                  <a @click="download('tar.bz2')">
                    tar.bz2
                  </a>
                </li>
                <li>
                  <a
                    @click="download('tar')"
                    style="border-right: 1px solid #e5e5e5;border-top-right-radius: 6px;border-bottom-right-radius: 6px;"
                  >
                    tar
                  </a>
                </li>
              </ul>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
        <clone-dropdown :project="project" />
      </div>
    </div>

    <div
      class="last-commit"
      v-if="lastCommit"
    >
      <base-avatar
        style="float: left"
        :size="38"
        :empty-avatar="lastCommit.email"
      />
      <div style="float: left;margin-left: 15px;">
        <router-link
          :to="'/' + project.namespace + '/' + project.projectPath + '/commit/' + lastCommit.commitId"
          style="color: #2e2e2e;font-weight: 600;max-width: 500px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
        >
          {{ lastCommit.msg }}
        </router-link>
        <div style="margin-top: 3px;">
          <span>{{ lastCommit.username }}</span>
          <div style="color: #919191;display: inline-block;margin-left: 8px;">
            authored
            <base-relative-time :timestamp="lastCommit.date" />
          </div>
        </div>
      </div>
      <div style="float: right;margin-top: 3px;">
        <el-input
          :value="lastCommit.commitId.substring(0, 8)"
          size="medium"
          style="width: 150px;"
          readonly
        >
          <base-copy
            slot="append"
            tip="Copy commit SHA"
            placement="top"
            :copy="lastCommit.commitId"
          />
        </el-input>
      </div>
      <div style="clear: both" />
    </div>

    <!--tree-->
    <el-table
      v-if="treeInfos"
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
            {{ scope.row.fullName }}
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

    <!--blob-->
    <div
      class="content"
      v-if="blobInfo"
    >
      <div class="header">
        <i
          v-if="blobInfo.size > 0"
          class="el-icon-document"
        />
        <i
          v-else
          class="el-icon-document-remove"
        />
        <strong>
          {{ blobInfo.fullName }}
        </strong>
        <span style="margin-left: 8px;font-size: 13px;">
          {{ util.formatSizeOfByte(blobInfo.size) }}
        </span>

        <base-copy
          style="margin-left: 10px;"
          tip="Copy file name"
          placement="top"
          :copy="blobInfo.fullName"
        />

        <div style="float: right">
          <a
            @click="util.downloadFile('projects/' + project.namespace + '/' + project.projectPath + '/raw?branch=' + $route.params.pathMatch + '&fullPath=' + ($route.query.fullPath || ''))"
            style="cursor: pointer;color: #2e2e2e;background: #fafafa;text-decoration: none"
          >

            <el-tooltip
              slot="append"
              effect="dark"
              content="Download"
              placement="top"
            >
              <i
                class="el-icon-download"
                style="font-size: 20px;"
              />
            </el-tooltip>
          </a>
        </div>
      </div>
      <div
        v-if="!blobInfo.size"
        style="text-align: center;line-height: 60px;color: #2e2e2e"
      >
        Empty file
      </div>
      <div
        v-else-if="!blobInfo.content"
        style="text-align: center;color: #2e2e2e;"
      >
        <a
          @click="util.downloadFile('projects/' + project.namespace + '/' + project.projectPath + '/raw?branch=' + $route.params.pathMatch + '&fullPath=' + ($route.query.fullPath || ''))"
          style="cursor: pointer;color: #2e2e2e;display: inline-block;
        width: 100%;height: 100%;background: #fafafa;padding: 100px 0;text-decoration: none"
        >
          <i
            class="el-icon-download"
            style="font-size: 80px;font-weight: bold;"
          />
          <div style="font-weight: bold;font-size: 22px;margin-top: 20px;">
            Download ({{ util.formatSizeOfByte(blobInfo.size) }})
          </div>
        </a>
      </div>
      <mavon-editor
        v-else-if="getFileExtension(blobInfo.fullName) === 'MD'"
        :value="blobInfo.content"
      />
      <div
        v-else
        v-html="blobInfo.content"
      />
    </div>
  </div>
</template>

<script>
  import CloneDropdown from './clone-dropdown';

  export default {
    components: {CloneDropdown},
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
      blobInfo: {
        required: false,
        type: Object,
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
      getFileExtension(fullName) {
        if (!fullName) {
          return '';
        }
        let index = fullName.lastIndexOf('.');
        if (index > -1 && index < fullName.length - 1) {
          return fullName.substring(index + 1).toUpperCase();
        }
        return '';
      },
      onBranchSelected(branch) {
        this.$router.push({
          path: '/' + this.project.namespace + '/' + this.project.projectPath + '/tree/' + branch
        });
      },
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
      },
      onNewEvent(cmd) {
        console.log(cmd);
      },
      download(type) {
        console.log(type);
        this.$refs['download-dropdown'].visible = false;
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
  }

  .download-list {
    list-style: none;
    margin-top: 20px;
    padding-left: 0;
    height: 20px;

    li {
      float: left;

      a {
        color: #2e2e2e;
        border: 1px solid #e5e5e5;
        padding: 2px 10px;
        border-right: 0;
        text-decoration: none;
        cursor: pointer;
      }

      a:hover {
        background: #f0f0f0;
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
      font-weight: normal;
    }
  }

  .content {
    margin-top: 20px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;

    .header {
      height: 48px;
      line-height: 48px;
      padding: 0 18px;
      background: #fafafa;
      border-bottom: 1px solid #e5e5e5;
    }
  }
</style>