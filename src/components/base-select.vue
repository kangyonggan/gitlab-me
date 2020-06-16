<template>
  <el-form-item
    :label="label"
    :prop="prop"
  >
    <el-select
      :value="value"
      clearable
      @change="$emit('input', $event)"
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
    }
  };
</script>

<style lang="scss" scoped>
  .el-select {
    width: 100%;
  }
</style>