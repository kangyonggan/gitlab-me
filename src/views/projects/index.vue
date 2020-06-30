<template>
  <div>
    <div
      v-if="project.branches && project.branches.length"
      style="width: 1000px;margin: 0 auto"
    >
      <header-index :project="project" />
      <tree
        :project="project"
        :tree-infos="treeInfos"
      />
    </div>
    <div
      v-else-if="project.branches && !project.branches.length"
    >
      <empty-project :project="project" />
    </div>
  </div>
</template>

<script>
  import EmptyProject from './empty-project';
  import HeaderIndex from './header-index';
  import Tree from './tree';

  export default {
    components: {HeaderIndex, EmptyProject, Tree},
    data() {
      return {
        project: {},
        treeInfos: []
      };
    },
    methods: {
      init(route) {
        this.axios.get('projects/' + route.params.namespace + '/' + route.params.projectPath).then(data => {
          this.project = data.project;
          this.treeInfos = data.treeInfos;
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
