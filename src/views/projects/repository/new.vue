<template>
  <div>
    <editor
      v-model="params.content"
    />
  </div>
</template>

<script>
  import Editor from 'vue2x-ace-editor';

  export default {
    components: {
      Editor
    },
    data() {
      return {
        params: {
          content: ''
        }
      };
    },
    methods: {
    }
  };
</script>