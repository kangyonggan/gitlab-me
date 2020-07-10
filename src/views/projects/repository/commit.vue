<template>
  <div class="commit-panel">
    <div class="header">
      <div style="float: left;margin-top: 6px;">
        <strong style="float: left">Commit 4a6942b1</strong>
        <base-copy
          style="float: left;margin: 0 5px;"
          tip="Copy commit SHA to clipboard"
          :copy="'4a6942b1'"
        />
        <span style="float: left">authored 3 weeks ago by</span>
        <base-avatar
          style="float: left;margin: -4px 5px 0 5px"
          :size="24"
          :empty-avatar="'java@kangyonggan.com'"
        />
        <strong style="float: left">kangyonggan</strong>
      </div>
      <div style="float: right;margin-top: 0">
        <el-dropdown
          size="small"
          style="float: right"
        >
          <el-button
            size="small"
          >
            Options
            <i class="el-icon-arrow-down el-icon--right" />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>Revert</el-dropdown-item>
            <el-dropdown-item>Cherry-pick</el-dropdown-item>
            <el-dropdown-item>Tag</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        
        <el-button
          size="small"
          style="float: right;margin-right: 15px;"
        >
          Browse files
        </el-button>
      </div>
    </div>

    <h3 style="color: #2e2e2e;font-size: 24px;font-weight: 600;line-height: 1.1">
      Maven依赖分析
    </h3>

    <div class="well">
      <base-svg
        type="commit"
        style="width: 22px;height: 22px;float: left;margin-top: 5px;"
      />
      <span style="float: left">
        parent
        <router-link :to="'/' + $route.params.namespace + '/' + $route.params.projectPath + '/commit/20e89d59'">
          20e89d59
        </router-link>
      </span>

      <span style="float: left;margin-left: 10px;">
        <base-svg
          type="branch"
          style="width: 22px;height: 22px;float: left;margin-top: 3px;"
        />
        master
      </span>
      <span style="float: left;margin-left: 10px;">
        …
      </span>
      <div style="clear: both" />
    </div>

    <div class="actions">
      <div style="float: left;margin-top: 10px;">
        Showing
        <el-dropdown
          trigger="click"
          style="color: #1b69b6;font-weight: 600;outline: none"
        >
          <span class="el-dropdown-link">
            3 changed files<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        with
        <span style="color: #168f48;font-weight: bold">10 additions</span>
        and
        <span style="color: #db3b21;font-weight: bold">20 deletions</span>
      </div>

      <el-button-group style="float: right;margin-top: 5px;">
        <el-button
          size="small"
          class="active"
        >
          Inline
        </el-button>
        <el-button size="small">
          Side-by-side
        </el-button>
      </el-button-group>
    </div>

    <div class="diff-file">
      diff file
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      init() {
        this.axios.get('projects/' + this.$route.params.namespace + '/' + this.$route.params.projectPath
          + '/commit/' + this.$route.params.commitId).then(data => {
          console.log(data);
        }).catch(res => {
          this.error(res.respMsg);
        });
      }
    },
    mounted() {

    }
  };
</script>

<style scoped lang="scss">
  .commit-panel {
    width: 1000px;
    margin: 0 auto;

    .header {
      height: 40px;
      border-bottom: 1px solid #e5e5e5;
    }

    .well {
      padding: 16px;
      line-height: 1.428;
      background: #fafafa;
      color: #2e2e2e;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
    }

    .actions {
      margin-top: 20px;
      height: 45px;

      .active {
        color: #409EFF;
        border-color: #c6e2ff;
        background-color: #ecf5ff;
      }
    }

    .diff-file {
      margin-top: 20px;
    }
  }
</style>