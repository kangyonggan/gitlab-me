<template>
  <div style="width: 1000px;margin: 0 auto">
    <tree-content
      :project="project"
      :tree-infos="treeInfos"
      :last-commit="lastCommit"
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
        lastCommit: {}
      };
    },
    methods: {
      init(route) {
        this.axios.get('projects/' + route.params.namespace + '/' + route.params.projectPath
          + '/tree?branch=' + route.params.pathMatch + '&fullPath=' + encodeURIComponent(route.query.fullPath || '')).then(data => {
          this.project = data.project;
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

