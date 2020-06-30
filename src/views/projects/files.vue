<template>
  <div style="width: 1000px;margin: 0 auto">
    <tree
      :project="project"
      :tree-infos="treeInfos"
    />
  </div>
</template>

<script>
  import Tree from './tree';

  export default {
    components: {Tree},
    data() {
      return {
        project: {},
        treeInfos: []
      };
    },
    methods: {
      init(route) {
        this.axios.get('projects/' + route.params.namespace + '/' + route.params.projectPath
          + '?branch=' + route.params.pathMatch + '&fullPath=' + (route.query.fullPath || '')).then(data => {
          this.project = data.project;
          this.treeInfos = data.treeInfos;
        }).catch(res => {
          this.error(res.respMsg);
        });
      }
    },
    mounted() {
      this.init(this.$route);
    },
    beforeRouteUpdate(to, from, next) {
      console.log('beforeRouteUpdate');
      this.init(to);
      next();
    }
  };
</script>

