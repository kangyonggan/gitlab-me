<template>
  <base-modal
    ref="modal"
    :title="'Delete ' + util.getFileSortName(blobFile.fullName)"
    :params="params"
    :rules="rules"
    method="DELETE"
    :url="'/projects/' + project.namespace + '/' + project.projectPath + '/file'"
    @success="handleSuccess"
  >
    <base-input
      label="Target branch"
      v-model="params.branchName"
      prop="branchName"
      readonly
    />
    <base-input
      label="Commit message"
      v-model="params.commitMessage"
      prop="commitMessage"
      type="textarea"
    />
  </base-modal>
</template>

<script>
  export default {
    data() {
      return {
        project: {},
        blobFile: {},
        params: {
          branchName: '',
          fullPath: '',
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
        this.project = project;
        this.blobFile = blobFile;
        this.params.fullPath = blobFile.fullName;
        this.params.branchName = this.$route.params.pathMatch || 'master';
        this.params.commitMessage = 'Delete ' + this.util.getFileSortName(blobFile.fullName);
        this.$refs.modal.show();
      },
      handleSuccess() {
        let path = '/' + this.project.namespace + '/' + this.project.projectPath + '/tree/' + (this.$route.params.pathMatch || 'master');
        let dir = this.util.getFileDir(this.blobFile.fullName);
        if (dir) {
          path += '?fullPath=' + dir;
        }

        this.$router.push({
          path: path
        });
      }
    }
  };
</script>