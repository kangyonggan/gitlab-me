<template>
  <div>
    <div v-if="project.size === '0B'">
      <empty-project :project="project" />
    </div>
    <div v-else>
      yyy
    </div>
  </div>
</template>

<script>
  import EmptyProject from './empty-project';

  export default {
    components: {EmptyProject},
    data() {
      return {
        project: {}
      };
    },
    methods: {
      init(namespace, projectPath) {
        this.axios.get('projects/' + namespace + '/' + projectPath).then(data => {
          this.project = data.project;
        }).catch(res => {
          this.error(res.respMsg);
        });
      }
    },
    mounted() {
      this.init(this.$route.params.namespace, this.$route.params.projectPath);
    }
  };
</script>