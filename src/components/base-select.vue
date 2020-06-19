<template>
  <el-form-item
    :label="label"
    :prop="prop"
  >
    <el-select
      :size="size"
      :value="value"
      :clearable="clearable"
      @change="onChange"
      :readonly="readonly"
      :placeholder="placeholder ? placeholder : label"
    >
      <el-option
        v-for="item in items"
        :key="item[code]"
        :label="item[name]"
        :value="item[code]"
      />
      <slot />
    </el-select>
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
        required: false,
        type: String,
        default: undefined
      },
      value: {
        required: false,
        type: [String, Number],
        default: ''
      },
      size: {
        required: false,
        type: String,
        default: 'large'
      },
      clearable: {
        required: false,
        type: Boolean,
        default: true
      },
      items: {
        required: false,
        type: Array,
        default: function () {
          return [];
        }
      },
      code: {
        required: false,
        type: String,
        default: 'code'
      },
      name: {
        required: false,
        type: String,
        default: 'name'
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
      }
    },
    methods: {
      onChange(val) {
        this.$emit('input',val);
        this.$emit('change', val);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .el-select {
    width: 100%;
  }
</style>