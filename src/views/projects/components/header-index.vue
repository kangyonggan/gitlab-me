<template>
  <div class="header">
    <base-char-avatar
      v-if="project.projectName"
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
    <div
      class="empty"
      v-if="project.branches && project.branches.length"
    />
    <div
      v-if="project.branches && project.branches.length"
      class="links"
    >
      <div class="link">
        <base-svg type="commit" />
        <router-link to="/">
          <strong>
            {{ project.commitNums }}
          </strong>
          Commit
        </router-link>
      </div>

      <div class="link">
        <base-svg type="branch" />
        <router-link to="/">
          <strong>
            {{ project.branches.length }}
          </strong>
          Branch
        </router-link>
      </div>


      <div class="link">
        <i class="el-icon-price-tag" />
        <router-link to="/">
          <strong>
            {{ project.tags.length }}
          </strong>
          Tags
        </router-link>
      </div>

      <div class="link">
        <i class="el-icon-coin" />
        <router-link to="/">
          <strong>
            {{ util.formatSize(project.size) }}
          </strong>
          Storage
        </router-link>
      </div>
    </div>
    <div class="empty" />
    <div class="description">
      {{ project.description }}
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
        isStar: false
      };
    },
    methods: {
      star() {
        this.isStar = !this.isStar;
      },
      formatSize(size) {
        if (size >= 1048576) {
          return (size / 1048576).toFixed(2) + 'GB';
        } else if (size > 1024) {
          return (size / 1024).toFixed(2) + 'MB';
        } else {
          return size + 'KB';
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .header {
    .empty {
      clear: both;
      height: 10px;
    }

    .links {

      .link {
        float: left;

        svg {
          float: left;
          margin-top: 4px;
        }

        a {
          color: #000;
          margin-right: 20px;
        }
      }
    }

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
</style>