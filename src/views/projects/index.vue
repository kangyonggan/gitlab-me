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
        @branch-change="onBranchChange"
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
  import qs from 'qs';

  export default {
    components: {HeaderIndex, EmptyProject, Tree},
    data() {
      return {
        project: {},
        treeInfos: []
      };
    },
    methods: {
      onBranchChange(branch) {
        this.$router.push({
          path: '/' + this.project.namespace + '/' + this.project.projectPath + '/tree',
          query: {branch: branch}
        }).then(() => {
          this.init(this.$route);
        });
      },
      init(route) {
        this.axios.get('projects/' + route.params.namespace + '/' + route.params.projectPath + '?' + qs.stringify(route.query)).then(data => {
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
