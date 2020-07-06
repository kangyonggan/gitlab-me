<template>
  <base-modal
    ref="modal"
    title="Create New Directory"
    :params="params"
    :rules="rules"
    :url="'/projects/' + project.namespace + '/' + project.projectPath + '/mkdir'"
    @success="handleSuccess"
  >
    <base-input
      label="Directory name"
      v-model="params.directoryName"
      prop="directoryName"
    />
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
  export default {
    data() {
      return {
        project: {},
        fileNames: [],
        params: {
          directoryName: '',
          branchName: '',
          parentPath: '',
          commitMessage: ''
        },
        rules: {
          directoryName: [
            {required: true, message: 'Required'},
            {max: 64, message: 'Maximum length is 64 characters'},
            {validator: this.validateDirectoryName}
          ],
          commitMessage: [
            {required: true, message: 'Required'},
            {max: 64, message: 'Maximum length is 64 characters'}
          ]
        }
      };
    },
    methods: {
      validateDirectoryName: function (rule, value, callback) {
        if (!value) {
          callback();
        }
        if (this.fileNames.includes(value)) {
          callback(new Error(value + ' has already exists.'));
        } else {
          callback();
        }
      },
      show: function (project, treeInfos) {
        this.fileNames = [];
        for (let i = 0; i < treeInfos.length; i++) {
          this.fileNames.push(this.util.getFileSortName(treeInfos[i].fullName));
        }
        this.project = Object.assign({}, project);
        this.params.branchName = this.$route.params.pathMatch || 'master';
        this.params.commitMessage = 'Add new directory';
        this.params.directoryName = '';
        this.params.parentPath = this.$route.query.fullPath || './';
        this.$refs.modal.show();
      },
      handleSuccess() {
        this.$router.push({
          path: '/' + this.project.namespace + '/' + this.project.projectPath + '/tree/'
            + this.params.branchName + '?fullPath=' + (this.$route.query.fullPath ? this.$route.query.fullPath + '/' : '') + this.params.directoryName + '/'
        });
      }
    }
  };
</script>