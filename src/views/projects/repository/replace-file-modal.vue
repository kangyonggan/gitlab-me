<template>
  <base-modal
    ref="modal"
    :title="'Replace ' + util.getFileSortName(blobFile.fullName)"
    :params="params"
    :rules="rules"
    :submit-disabled="status !== 'success'"
    method="PUT"
    :url="'/projects/' + project.namespace + '/' + project.projectPath + '/file'"
    @success="handleSuccess"
  >
    <el-upload
      drag
      :show-file-list="false"
      :action="axios.defaults.baseURL + 'fileUpload'"
      :on-success="uploadSuccess"
      :before-upload="beforeUpload"
      :on-progress="onProgress"
      :data="uploadData"
    >
      <div v-if="!size">
        <i class="el-icon-upload" />
        <div>
          Attach a file by drag & drop or <em>click to upload</em>
        </div>
      </div>
      <div
        v-else
        style="color: #2e2e2e;margin-top: 50px;"
      >
        <div><strong>0.4</strong> KB</div>
        <div style="margin-top: 10px;">
          {{ blobFile.fullName }}
        </div>
        <el-progress
          style="width: 80%;margin: 15px auto;"
          :text-inside="true"
          :stroke-width="18"
          :percentage="percent"
          :status="status"
        />
      </div>
    </el-upload>
    <base-input
      label="Commit message"
      v-model="params.commitMessage"
      prop="commitMessage"
      type="textarea"
    />
    <base-input
      readonly
      label="Target Branch"
      v-model="params.branchName"
      prop="branchName"
    />
  </base-modal>
</template>

<script>
  export default {
    data() {
      return {
        project: {},
        blobFile: {},
        size: 0,
        percent: 0,
        status: undefined,
        uploadData: {'x-auth-token': localStorage.getItem(this.constants.LOCAL_TOKEN_NAME)},
        params: {
          url: '',
          fullPath: '',
          branchName: '',
          commitMessage: ''
        },
        rules: {
          commitMessage: [
            {required: true, message: 'Required'}
          ]
        }
      };
    },
    methods: {
      show: function (project, blobFile) {
        this.blobFile = blobFile;
        this.project = project;
        this.params.branchName = this.$route.params.pathMatch || 'master';
        this.params.commitMessage = 'Replace ' + this.util.getFileSortName(blobFile.fullName);
        this.params.fullPath = blobFile.fullName;
        this.params.url = '';
        this.size = 0;
        this.percent = 0;
        this.status = undefined;
        this.$refs.modal.show();
      },
      beforeUpload(file) {
        if (file.size / 1024 / 1024 > this.constants.MAX_UPLOAD_SIZE) {
          this.error('File can\'t over then ' + this.constants.MAX_UPLOAD_SIZE + 'MB!');
          return false;
        }

        this.params.url = '';
        this.percent = 0;
        this.status = undefined;
        this.size = file.size;
        return true;
      },
      onProgress(event) {
        this.percent = event.percent;
      },
      uploadSuccess(res) {
        if (res.respCo !== '0000') {
          this.error(res.respMsg);
          this.status = 'exception';
          return;
        }
        this.status = 'success';
        this.params.url = res.data.url;
      },
      handleSuccess() {
        window.location.reload();
      }
    }
  };
</script>

<style scoped lang="scss">
  /deep/ .el-upload {
    width: 100% !important;

    .el-upload-dragger {
      width: 100% !important;
    }
  }
</style>