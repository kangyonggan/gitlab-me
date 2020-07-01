<template>
  <project-content
    :project="project"
    :blob-info="blobInfo"
    :last-commit="blobInfo.lastCommit"
  />
</template>

<script>
  import ProjectContent from './project-content';

  export default {
    components: {ProjectContent},
    data() {
      return {
        project: {},
        blobInfo: {}
      };
    },
    methods: {
      init(route) {
        this.axios.get('projects/' + route.params.namespace + '/' + route.params.projectPath
          + '/blob?branch=' + route.params.pathMatch + '&fullPath=' + (route.query.fullPath || '')).then(data => {
          this.project = data.project;
          this.blobInfo = data.blobInfo;
        }).catch(res => {
          this.error(res.respMsg);
        });
      }
    },
    mounted() {
      this.init(this.$route);
    }
  };
</script>

