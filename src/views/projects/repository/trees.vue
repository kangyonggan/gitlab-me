<template>
  <div style="width: 1000px;margin: 0 auto">
    <tree-content
      :project="project"
      :tree-infos="treeInfos"
      :last-commit="lastCommit"
      :readme="readme"
    />
  </div>
</template>

<script>
  import TreeContent from '../components/tree-content';

  export default {
    components: {TreeContent},
    data() {
      return {
        project: {},
        treeInfos: [],
        lastCommit: {},
        readme: {}
      };
    },
    methods: {
      init(route) {
        this.axios.get('projects/' + route.params.namespace + '/' + route.params.projectPath
          + '/tree?branch=' + (route.params.pathMatch || 'master') + '&fullPath=' + encodeURIComponent(route.query.fullPath || '')).then(data => {
          this.project = data.project;
          this.readme = data.readme;
          this.treeInfos = data.treeInfos;
          this.lastCommit = data.lastCommit;
        }).catch(res => {
          this.error(res.respMsg);
        });
      }
    },
    mounted() {
      this.init(this.$route);
    },
    beforeRouteUpdate(to, from, next) {
      this.init(to);
      next();
    }
  };
</script>

