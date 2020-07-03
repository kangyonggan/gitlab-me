<template>
  <base-modal
    ref="modal"
    title="New Branch"
    :params="params"
    :rules="rules"
    :url="'/projects/' + project.namespace + '/' + project.projectPath + '/branch'"
    @success="handleSuccess"
  >
    <base-input
      label="Branch name"
      v-model="params.branchName"
      prop="branchName"
    />
    <base-select
      label="Create from"
      v-model="params.createFrom"
      prop="createFrom"
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
          createFrom: ''
        },
        rules: {
          branchName: [
            {required: true, message: 'Required'},
            {max: 64, message: 'Maximum length is 64 characters'},
            {validator: this.validateBranchName}
          ]
        }
      };
    },
    methods: {
      validateBranchName: function (rule, value, callback) {
        if (!value) {
          callback();
        }
        // 不能包含现有分支
        if (this.project.branches.includes(value)) {
          callback(new Error(value + ' has already exists.'));
        } else {
          callback();
        }
        // 其他情况提交时校验吧
      },
      show: function (project) {
        this.project = Object.assign({}, project);
        this.params.createFrom = this.$route.params.pathMatch || 'master';
        this.$refs.modal.show();
      },
      handleSuccess() {
        this.$router.push({
          path: '/' + this.project.namespace + '/' + this.project.projectPath + '/tree/' + this.params.branchName
        });
      }
    }
  };
</script>