<template>
  <div class="form-group">
    {{ name }}
  </div>
</template>

<script>
  export default {
    props: {
      name: {
        required: true,
        type: String
      }
    }
  };
</script>

<style scoped lang="scss">
  .form-group {
    margin: 20px auto;
    border-bottom: 1px solid #e1e1e1;
    font-size: 18px;
    font-weight: 400;
    line-height: 30px;
  }
</style>