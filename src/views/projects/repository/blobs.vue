<template>
  <div>
    <!--tools & last commits-->
    <tools-commit
      :project="project"
      :blob-info="blobInfo"
    />

    <!--blob-->
    <div class="content">
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
            style="cursor: pointer;color: #2e2e2e;background: #fafafa;text-decoration: none;line-height: normal;margin-top: 15px;float: right"
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
        :class="{html:true, 'markdown-editor': true, preview: preview}"
        :editable="false"
        :toolbars="{'navigation': true, help: true, htmlcode: true, readmodel: true, preview: true}"
        v-else-if="util.getFileExtension(blobInfo.fullName) === 'MD'"
        :value="blobInfo.content"
        @previewToggle="previewToggle"
      />
      <base-hljs
        v-else
        :value="blobInfo.content"
        :lang="util.getFileExtension(blobInfo.fullName).toLowerCase()"
      />
    </div>
  </div>
</template>

<script>
  import ToolsCommit from '../components/tools-commit.vue';

  export default {
    components: {ToolsCommit},
    data() {
      return {
        loading: false,
        project: {},
        blobInfo: {}
      };
    },
    methods: {
      init(route) {
        this.loading = true;
        this.axios.get('projects/' + route.params.namespace + '/' + route.params.projectPath
          + '/blob?branch=' + route.params.pathMatch + '&fullPath=' + encodeURIComponent(route.query.fullPath || '')).then(data => {
          this.project = data.project;
          this.blobInfo = data.blobInfo;
        }).catch(res => {
          this.error(res.respMsg);
        }).finally(() => {
          this.loading = false;
        });
      }
    },
    mounted() {
      this.init(this.$route);
    },
    watch: {
      '$route'(newRoute) {
        this.init(newRoute);
      }
    }
  };
</script>

<style scoped lang="scss">
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
      border-radius: 4px;
    }

    .html {
      padding: 20px 32px;
    }

    /deep/ .preview {
      .v-note-edit {
        display: none;
      }

      .v-note-show {
        display: block !important;
        flex: 0 0 100% !important;
        width: 100% !important;
      }
    }

    /deep/ .markdown-editor {
      .markdown-body {
        border: 0 !important;
        box-shadow: none !important;
        padding-top: 10px;
      }

      .v-note-edit {
        flex: 0 0 100% !important;
        width: 100% !important;
      }

      .v-note-show {
        display: none;
      }

      .v-note-op {
        position: absolute;
        right: 400px;
        width: 400px !important;
        top: -45px;
        border: 0 !important;
        text-align: right !important;
        background: #fafafa !important;

        .v-left-item {
          display: none;
        }

        .v-right-item {
          max-width: 100% !important;
          background: #fafafa;
          border: 0 !important;
        }
      }

      .v-show-content {
        background: #fff !important;
        padding: 0 !important;
      }
    }
  }
</style>
