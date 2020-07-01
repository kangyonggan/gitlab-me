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
        params: {
          targetBranch: ''
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
      },
      show: function (project) {
        this.project = Object.assign({}, project);
        this.params.targetBranch = this.$route.params.pathMatch;
        this.$refs.modal.show();
      },
      handleSuccess(data) {
        this.$emit('success', data);
      }
    }
  };
</script>