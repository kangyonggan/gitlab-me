<template>
  <div>
    <div
      v-if="project.branches && project.branches.length"
      style="width: 1000px;margin: 0 auto"
    >
      <header-index :project="project" />
      <tree-content
        :project="project"
        :tree-infos="treeInfos"
        :last-commit="lastCommit"
      />
    </div>
    <div v-else-if="project.branches && !project.branches.length">
      <empty-project :project="project" />
    </div>
  </div>
</template>

<script>
  import EmptyProject from './components/empty-project';
  import HeaderIndex from './components/header-index';
  import TreeContent from './components/tree-content';

  export default {
    components: {HeaderIndex, EmptyProject, TreeContent},
    data() {
      return {
        project: {},
        treeInfos: [],
        lastCommit: {}
      };
    },
    methods: {
      init(route) {
        this.axios.get('projects/' + route.params.namespace + '/' + route.params.projectPath + '/tree').then(data => {
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
    }
  };
</script>
