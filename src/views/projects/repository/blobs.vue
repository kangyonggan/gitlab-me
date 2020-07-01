<template>
  <project-content
    v-loading="loading"
    :project="project"
    :blob-info="blobInfo"
    :last-commit="blobInfo.lastCommit"
  />
</template>

<script>
  import ProjectContent from '../project-content';

  export default {
    components: {ProjectContent},
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
          + '/blob?branch=' + route.params.pathMatch + '&fullPath=' + (route.query.fullPath || '')).then(data => {
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

