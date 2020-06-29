<template>
  <div>
    <div
      v-if="project.branches && project.branches.length"
      style="width: 1000px;margin: 0 auto"
    >
      <header-index :project="project" />
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
          <el-dropdown
            trigger="click"
            ref="clone-dropdown"
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
                    value="http://127.0.0.1/fes/be.git"
                    size="medium"
                    readonly
                  >
                    <el-tooltip
                      slot="append"
                      effect="dark"
                      content="Copy URL"
                    >
                      <el-button
                        @click="copyURL('http://127.0.0.1/fes/be.git')"
                        icon="el-icon-document-copy"
                      />
                    </el-tooltip>
                  </el-input>
                </li>
                <li style="margin-top: 20px;">
                  <label>Clone with SSH</label>
                  <el-input
                    value="git@127.0.0.1/fes/be.git"
                    size="medium"
                    readonly
                  >
                    <el-tooltip
                      slot="append"
                      effect="dark"
                      content="Copy URL"
                    >
                      <el-button
                        @click="copyURL('git@127.0.0.1/fes/be.git')"
                        icon="el-icon-document-copy"
                      />
                    </el-tooltip>
                  </el-input>
                </li>
              </ul>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>

      <div class="last-commit">
        <base-avatar
          style="float: left"
          :size="38"
          :empty-avatar="project.lastCommit.email"
        />
        <div style="float: left;margin-left: 15px;">
          <router-link
            :to="'/' + project.namespace + '/' + project.projectPath + '/commit/' + project.lastCommit.commitId"
            style="color: #2e2e2e;font-weight: 600;max-width: 500px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
          >
            {{ project.lastCommit.msg }}
          </router-link>
          <div style="margin-top: 3px;">
            <strong>{{ project.lastCommit.username }}</strong>
            <div style="color: #919191;display: inline-block;margin-left: 8px;">
              authored
              <el-tooltip
                slot="append"
                effect="dark"
                placement="top"
                :content="util.formatTimestamp(project.lastCommit.date)"
              >
                <span>
                  {{ util.relativeTime(project.lastCommit.date) }}
                </span>
              </el-tooltip>
            </div>
          </div>
        </div>
        <div style="float: right;margin-top: 3px;">
          <el-input
            :value="project.lastCommit.commitId.substring(0, 8)"
            size="medium"
            style="width: 150px;"
            readonly
          >
            <el-tooltip
              slot="append"
              effect="dark"
              placement="top"
              content="Copy commit SHA"
            >
              <el-button
                @click="copyURL(project.lastCommit.commitId)"
                icon="el-icon-document-copy"
              />
            </el-tooltip>
          </el-input>
        </div>
        <div style="clear: both" />
      </div>
    </div>
    <div
      v-else-if="project.branches && !project.branches.length"
    >
      <empty-project :project="project" />
    </div>
  </div>
</template>

<script>
  import EmptyProject from './empty-project';
  import HeaderIndex from './header-index';

  export default {
    components: {HeaderIndex, EmptyProject},
    data() {
      return {
        project: {},
        currentBranch: 'master'
      };
    },
    methods: {
      init(namespace, projectPath) {
        this.axios.get('projects/' + namespace + '/' + projectPath).then(data => {
          this.project = data.project;
        }).catch(res => {
          this.error(res.respMsg);
        });
      },
      onBranchSelected(branch) {
        this.$router.push({path: '/' + this.project.namespace + '/' + this.project.projectPath + '/tree/' + branch});
      },
      onNewEvent(cmd) {
        console.log(cmd);
      },
      download(type) {
        console.log(type);
        this.$refs['download-dropdown'].visible = false;
      },
      copyURL(url) {
        console.log(url);
        this.success('URL Copied');
        this.$refs['clone-dropdown'].visible = false;
      }
    },
    mounted() {
      this.init(this.$route.params.namespace, this.$route.params.projectPath);
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

  .last-commit {
    margin-top: 20px;
    background: #fafafa;
    color: #2e2e2e;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    padding: 14px;
  }
</style>