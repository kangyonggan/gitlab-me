<template>
  <el-form
    :inline="true"
    :model="model"
    ref="form"
    label-width="100px"
    :rules="rules"
  >
    <slot />
    <el-row>
      <el-button
        type="primary"
        @click="search"
      >
        Search
      </el-button>
      <el-button
        type="warning"
        @click="reset"
      >
        Reset
      </el-button>
      <slot name="actions" />
    </el-row>
  </el-form>
</template>

<script>
  export default {
    props: {
      model: {
        required: true,
        type: Object
      },
      table: {
        required: false,
        type: String,
        default: 'table'
      },
      rules: {
        required: false,
        type: Object,
        default: function () {
          return {};
        }
      }
    },
    methods: {
      search() {
        let that = this;
        this.$refs.form.validate(function (res) {
          if (res) {
            that.$parent.$refs[that.table].jump();
          }
        });
      },
      reset() {
        this.$refs.form.resetFields();
        this.$emit('reset');
      }
    }
  };
</script>

<style lang="scss">
  .el-form--inline .el-form-item {
    margin-right: 40px;
  }
</style>