<template>
  <base-modal
    ref="modal"
    title="Upload New File"
    :params="params"
    :rules="rules"
    :submit-disabled="status !== 'success'"
    :url="'/projects/' + project.namespace + '/' + project.projectPath + '/upload'"
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
      <div v-if="!params.fileName">
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
          {{ $route.query.fullPath || '/' }}{{ params.fileName }}
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
    <base-select
      label="Target Branch"
      v-model="params.branchName"
      prop="targetBranch"
      :clearable="false"
    >
      <el-option
        v-for="branch in project.branches"
        :key="branch"
        :value="branch"
        :label="branch"
      />
    </base-select>
  </base-modal>
</template>

<script>
  import constants from '../../../libs/constants';

  export default {
    data() {
      return {
        project: {},
        size: 0,
        percent: 0,
        status: undefined,
        uploadData: {'x-auth-token': localStorage.getItem(constants.LOCAL_TOKEN_NAME)},
        params: {
          url: '',
          fileName: '',
          branchName: '',
          parentPath: '',
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
      show: function (project) {
        this.project = Object.assign({}, project);
        this.params.branchName = this.$route.params.pathMatch || 'master';
        this.params.commitMessage = 'Upload New File';
        this.params.fileName = '';
        this.params.url = '';
        this.params.size = 0;
        this.percent = 0;
        this.status = undefined;
        this.params.parentPath = this.$route.query.fullPath || './';
        this.$refs.modal.show();
      },
      beforeUpload(file) {
        if (file.size / 1024 / 1024 > constants.MAX_UPLOAD_SIZE) {
          this.error('File can\'t over then ' + constants.MAX_UPLOAD_SIZE + 'MB!');
          return false;
        }

        this.params.url = '';
        this.percent = 0;
        this.status = undefined;
        this.params.fileName = file.name;
        this.params.size = file.size;
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
        let fullPath = this.$route.query.fullPath || '';
        let fileName = this.params.fileName;
        if (fileName.startsWith('/')) {
          fileName = fileName.substring(1);
        }
        if (fileName.endsWith('/')) {
          fileName = fileName.substring(0, fileName.lastIndexOf('/'));
        }
        fullPath += fileName;
        this.$router.push({
          path: '/' + this.project.namespace + '/' + this.project.projectPath + '/blob/' +
            this.params.branchName,
          query: {
            fullPath: fullPath
          }
        });
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