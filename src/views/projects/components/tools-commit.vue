<template>
  <div>
    <!--tools-->
    <div class="tools">
      <el-select
        style="float: left"
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

      <ul class="path-breads">
        <li>
          <router-link
            v-show="project.projectPath"
            :to="'/' + project.namespace + '/' + project.projectPath + '/tree/' + $route.params.pathMatch"
          >
            {{ project.projectPath }}
          </router-link>
          <svg
            v-show="!project.projectPath"
            width="55px"
            height="20px"
            style=""
          >
            <rect
              x="0"
              y="0"
              width="100%"
              rx="3"
              ry="3"
              height="100%"
              fill="#eaeced"
            />
          </svg>

          <span>
            /
          </span>
        </li>

        <li
          v-for="(file, index) in pathBreads"
          :key="index"
        >
          <router-link
            v-if="index < pathBreads.length - 1"
            :to="'/' + project.namespace + '/' + project.projectPath
              + '/'+file.type+'/' + $route.params.pathMatch + '?fullPath=' + file.path"
          >
            {{ file.name }}
          </router-link>
          <a
            v-else
            style="text-decoration: none"
          >
            {{ file.name }}
          </a>
          <span v-if="index < pathBreads.length - 1 || file.type === 'tree'">
            /
          </span>
        </li>
      </ul>

      <!--new-->
      <new-dropdown
        :project="project"
        :tree-infos="treeInfos"
        v-if="treeInfos"
        style="float: left"
      />

      <div class="actions">
        <el-button
          plain
          size="medium"
          style="margin-right: 10px;"
        >
          History
        </el-button>
        <clone-dropdown :project="project" />
      </div>

      <div style="clear: both" />
    </div>

    <!--las commit-->
    <svg
      v-if="!project.id && lastCommit"
      width="100%"
      height="70px"
      style="border: 1px solid #e5e5e5;border-radius: 5px;margin-top: 20px;background: #fafafa"
    >
      <circle
        cx="34"
        cy="35"
        r="20"
        fill="#eaeced"
      />
      <rect
        x="69"
        y="20"
        width="150"
        height="15"
        fill="#eaeced"
      />
      <rect
        x="69"
        y="40"
        width="200"
        height="15"
        fill="#eaeced"
      />
      <rect
        x="82.5%"
        y="20"
        width="16%"
        height="35"
        fill="#eaeced"
      />
    </svg>
    <div
      class="last-commit"
      v-else-if="lastCommit"
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
          <span>{{ lastCommit.author }}</span>
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
  </div>
</template>

<script>
  import NewDropdown from '../repository/new-dropdown';
  import CloneDropdown from './clone-dropdown';

  export default {
    components: {NewDropdown, CloneDropdown},
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
      },
      blobInfo: {
        required: false,
        type: Object,
        default() {
        }
      }
    },
    data() {
      return {
        currentBranch: this.$route.params.pathMatch || 'master',
        pathBreads: []
      };
    },
    methods: {
      onBranchSelected(branch) {
        this.$router.push({
          path: '/' + this.project.namespace + '/' + this.project.projectPath + '/tree/' + branch
        });
      },
      buildPathBread(route) {
        this.pathBreads = [];
        if (!route.query.fullPath) {
          return;
        }
        let arr = route.query.fullPath.split('/');
        let path = '';
        for (let i = 0; i < arr.length; i++) {
          if (!arr[i]) {
            continue;
          }
          path += arr[i] + '/';
          this.pathBreads.push({
            path: path,
            name: arr[i],
            type: 'tree'
          });
        }
        if (this.blobInfo) {
          this.pathBreads[this.pathBreads.length - 1] = {
            name: this.pathBreads[this.pathBreads.length - 1].name,
            type: 'blob'
          };
        }
      }
    },
    mounted() {
      this.buildPathBread(this.$route);
    },
    watch: {
      '$route'(newRoute) {
        this.currentBranch = newRoute.params.pathMatch || 'master';
        this.buildPathBread(newRoute);
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
</style>