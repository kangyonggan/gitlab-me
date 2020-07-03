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
      v-model="params.targetBranch"
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
        treeInfos: [],
        params: {
          branchName: '',
          parentPath: ''
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
        console.log('validateDirectoryName');
        if (!value) {
          callback();
        }
        console.log(value);
        let exists = false;
        for (let i = 0; i < this.treeInfos.length; i++) {
          if (this.treeInfos[i].fullName === value) {
            exists = true;
            break;
          }
        }
        console.log(exists);
        if (exists) {
          callback(new Error(value + ' has already exists.'));
        } else {
          callback();
        }
      },
      show: function (project, treeInfos) {
        this.project = Object.assign({}, project);
        this.treeInfos = treeInfos;
        this.params.targetBranch = this.$route.params.pathMatch || 'master';
        this.params.parentPath = this.$route.query.fullPath || './';
        this.$refs.modal.show();
      },
      handleSuccess() {
        this.$router.push({
          path: '/' + this.project.namespace + '/' + this.project.projectPath + '/tree/' + this.params.branchName,
          query: {
            fullPath: this.params.parentPath + this.params.directoryName + '/'
          }
        });
      }
    }
  };
</script>