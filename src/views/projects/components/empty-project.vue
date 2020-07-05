<template>
  <div style="width: 1000px;margin: 0 auto">
    <header-index :project="project" />

    <div class="empty" />

    <div class="options">
      <div class="title">
        The repository for this project is empty
      </div>
      <p>
        You can get started by cloning the repository or start adding files to it with one of the following options.
      </p>
      <div class="actions">
        <clone-dropdown
          :project="project"
          placement="bottom-start"
        />

        <span>
          <el-button
            size="medium"
            plain
          >
            <i class="el-icon-plus" />
            New file
          </el-button>
          <el-button
            size="medium"
            plain
          >
            <i class="el-icon-plus" />
            Add README
          </el-button>
          <el-button
            size="medium"
            plain
          >
            <i class="el-icon-plus" />
            Add LICENSE
          </el-button>
          <el-button
            size="medium"
            plain
          >
            <i class="el-icon-plus" />
            Add CHANGELOG
          </el-button>
          <el-button
            size="medium"
            plain
          >
            <i class="el-icon-plus" />
            Add CONTRIBUTING
          </el-button>
        </span>
      </div>
    </div>

    <div class="empty" />

    <div class="cmd-lines">
      <div class="title">
        Command line instructions
      </div>
      <p>
        You can also upload existing files from your computer using the instructions below.
      </p>

      <div class="cmd-line">
        <div class="cmd-name">
          Git global setup
        </div>
        <pre class="cmd-content">git config --global user.name "Administrator"
git config --global user.email "admin@example.com"</pre>
      </div>

      <div class="cmd-line">
        <div class="cmd-name">
          Create a new repository
        </div>
        <pre class="cmd-content">git remote add origin {{ constants.EXTERNAL_URL }}/{{ project.namespace }}/{{ project.projectPath }}.git
cd app-web
touch README.md
git add README.md
git commit -m "add README"
git push -u origin master</pre>
      </div>

      <div class="cmd-line">
        <div class="cmd-name">
          Push an existing folder
        </div>
        <pre class="cmd-content">cd existing_folder
git init
git remote add origin {{ constants.EXTERNAL_URL }}/{{ project.namespace }}/{{ project.projectPath }}.git
git add .
git commit -m "Initial commit"
git push -u origin master</pre>
      </div>

      <div class="cmd-line">
        <div class="cmd-name">
          Push an existing Git repository
        </div>
        <pre class="cmd-content">cd existing_repo
git remote rename origin old-origin
git remote add origin {{ constants.EXTERNAL_URL }}/{{ project.namespace }}/{{ project.projectPath }}.git
git push -u origin --all
git push -u origin --tags</pre>
      </div>
    </div>
  </div>
</template>

<script>
  import HeaderIndex from './header-index';
  import CloneDropdown from './clone-dropdown';

  export default {
    components: {CloneDropdown, HeaderIndex},
    props: {
      project: {
        required: true,
        type: Object
      }
    }
  };
</script>

<style scoped lang="scss">
  .empty {
    clear: both;
    height: 10px;
  }

  .options {
    margin-top: 30px;

    .title {
      font-weight: 600;
      line-height: 1.2;
      color: #2e2e2e;
      font-size: 21px;
    }

    .actions {
      position: relative;

      span {
        .el-button {
          margin-left: 10px;
          border: 1px dashed #b5b5b5;
        }

        .el-button:hover {
          color: #606266;
          background: #fafafa;
        }
      }
    }
  }

  .cmd-lines {
    margin-top: 20px;

    .title {
      font-weight: 600;
      line-height: 1.2;
      color: #2e2e2e;
      font-size: 19px;
    }

    .cmd-line {
      margin-top: 20px;

      .cmd-name {
        font-weight: 600;
        line-height: 1.2;
        color: #2e2e2e;
        font-size: 16px;
      }

      .cmd-content {
        background-color: #f2f2f2;
        padding: 8px 12px;
        color: #2e2e2e;
        border: 1px solid #dfdfdf;
        border-radius: 2px;
        line-height: 1.5;
      }
    }
  }
</style>