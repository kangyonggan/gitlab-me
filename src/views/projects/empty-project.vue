<template>
  <div style="width: 1000px;margin: 0 auto">
    <div class="header">
      <base-char-avatar
        :char="project.projectName.substring(0, 1)"
        :size="68"
        shape="square"
        style="float: left"
      />
      <div style="float: left;margin-left: 20px;">
        <div style="font-size: 20px;font-weight: bold;color: #2e2e2e;margin-top: 7px;">
          {{ project.projectName }}
          <i
            v-if="project.visibilityLevel === 0"
            class="el-icon-lock"
            style="font-size: 16px;"
          />
          <i
            v-if="project.visibilityLevel === 1"
            class="el-icon-refrigerator"
            style="font-size: 16px;"
          />
          <i
            v-if="project.visibilityLevel === 2"
            class="el-icon-open"
            style="font-size: 16px;"
          />
        </div>
        <div style="font-size: 14px;line-height: 16px;color: #707070;margin-top: 8px;">
          Project ID: {{ project.id }}
        </div>
      </div>
      <div style="float: right;margin-top: 20px;position: relative">
        <router-link
          to="/"
          class="star-num"
        >
          0
        </router-link>
        <el-button
          size="mini"
          plain
          class="star-btn"
          @click="star"
        >
          <span v-if="isStar">
            <i class="el-icon-star-on" />
            Unstar
          </span>
          <span v-else>
            <i class="el-icon-star-off" />
            Star
          </span>
        </el-button>
      </div>
      <div class="empty" />
      <div class="description">
        {{ project.description }}
      </div>
    </div>

    <div class="empty" />

    <div class="options">
      <div class="title">
        The repository for this project is empty
      </div>
      <p>
        You can get started by cloning the repository or start adding files to it with one of the following options.
      </p>
      <div class="actions">
        <el-button
          type="primary"
          size="medium"
          @click="showCloneAddress = !showCloneAddress"
        >
          Clone
          <i class="el-icon-arrow-down" />
        </el-button>
        <ul
          class="clone-address"
          v-show="showCloneAddress"
        >
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
          <li>
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
        <pre class="cmd-content">git remote add origin http://127.0.0.1/fes/be.git
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
git remote add origin http://127.0.0.1/fes/be.git
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
git remote add origin http://127.0.0.1/fes/be.git
git push -u origin --all
git push -u origin --tags</pre>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      project: {
        required: true,
        type: Object
      }
    },
    data() {
      return {
        showCloneAddress: false,
        isStar: false
      };
    },
    methods: {
      copyURL(url) {
        console.log(url);
        this.success('URL Copied');
        this.showCloneAddress = false;
      },
      star() {
        this.isStar = !this.isStar;
      }
    }
  };
</script>

<style scoped lang="scss">
  .empty {
    clear: both;
    height: 10px;
  }

  .header {
    .star-btn {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      float: right;
    }

    .star-num {
      float: right;
      display: inline-block;
      height: 26px;
      color: #333;
      line-height: 26px;
      padding: 0 12px;
      border: 1px solid #DCDFE6;
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      border-left: 0;
    }

    .description {
      font-size: 16px;
      line-height: 1.5;
      color: #2e2e2e;
    }
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

      .clone-address {
        position: absolute;
        left: 0;
        top: 27px;
        z-index: 99;
        width: 360px;
        height: 168px;
        border: 1px solid #e5e5e5;
        border-radius: 3px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        list-style: none;
        padding: 0 20px 15px 20px;

        li {
          margin-top: 20px;

          label {
            font-weight: 600;
          }

          .el-input {
            margin-top: 8px;
          }
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