<template>
  <el-form-item
    :label="label"
    :prop="prop"
  >
    <el-input
      :value="value"
      :type="type"
      :rows="rows"
      @keyup.enter.native="$emit('on-enter')"
      @input="$emit('input', $event)"
      :placeholder="placeholder ? placeholder : label"
      clearable
      :readonly="readonly"
    />

    <slot />
  </el-form-item>
</template>

<script>
  export default {
    props: {
      prop: {
        required: true,
        type: String
      },
      label: {
        required: true,
        type: String
      },
      value: {
        required: false,
        type: [String, Number],
        default: ''
      },
      type: {
        required: false,
        type: String,
        default: 'text'
      },
      placeholder: {
        required: false,
        type: String,
        default: undefined
      },
      readonly: {
        required: false,
        type: Boolean,
        default: false
      },
      rows: {
        required: false,
        type: Number,
        default: 3
      }
    }
  };
</script>

<style scoped lang="scss">
  /deep/ input[readonly] {
    background: #f5f5f5;
  }
</style>